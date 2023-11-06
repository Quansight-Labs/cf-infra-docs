"""
Given the JSON output of a sphinx site, generate HTML files in the correct place for Docusaurus
"""
import json
import sys
from pathlib import Path

from ruamel.yaml import YAML
from bs4 import BeautifulSoup

yaml = YAML(typ="safe")
yaml.default_flow_style = False


def get_fjsons(basedir):
    for path in Path(basedir).glob("**/*.fjson"):
        yield path


def get_mds(basedir):
    for path in Path(basedir).glob("**/*.md"):
        yield path


def clean_html(html):
    soup = BeautifulSoup(html, 'html.parser')
    for span in soup.select("code>span"):
        span.unwrap()
    for code in soup.select("pre.code"):
        code.parent.unwrap()
    for codeblock in soup.select("div.highlight"):
        codeblock.parent.wrap(soup.new_tag("triple-backtick"))
    for admonition in soup.select("blockquote>div>div.admonition"):
        admonition.parent.parent.unwrap()
    html_text = str(soup)
    return html_text


def json_to_md(jsonpath, targetdir):
    data = json.loads(Path(jsonpath).read_text())
    target_path = Path(targetdir, f"{data['current_page_name']}.md")
    # if target_path.is_file():
    #     print(f"! Warning, path '{target_path}' exists. Skipping.")
    #     return
    frontmatter = {
        "title": data["title"],
        "hide_title": True,
    }
    target_path.parent.mkdir(parents=True, exist_ok=True)
    with open(target_path, "w") as f:
        if frontmatter:
            f.write("---\n")
            yaml.dump(frontmatter, f)
            f.write("---\n")
        f.write(clean_html(data["body"]))


def sphinx_md_to_docusaurus_md(basedir, mdpath, targetdir):
    target_path = Path(targetdir, mdpath.relative_to(basedir))
    target_path.parent.mkdir(parents=True, exist_ok=True)
    text = mdpath.read_text()
    if text.lstrip().startswith("<a"):
        text = "\n".join(text.split("\n")[1:])
    text = text.replace("00_intro.md", "index.md")
    if mdpath.name == "00_intro.md":
        target_path = target_path.parent / "index.md"
    target_path.write_text(text)


def main(build_dir, targetdir):
    md_dir = Path(build_dir, "markdown")
    for path in md_dir.glob("**/*.md"):
        print("Processing MD", path)
        sphinx_md_to_docusaurus_md(md_dir, path, targetdir)

    # for path in get_fjsons(Path(build_dir, "json")):
    #     print("Processing JSON", path)
    #     json_to_md(path, targetdir)
        

if __name__ == "__main__":
    build_dir, targetdir = sys.argv[1:3]
    main(build_dir, targetdir)
