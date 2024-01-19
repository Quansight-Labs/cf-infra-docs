export default function (_, options) {
  return {
      name: 'plugin-migration-urls',
      async contentLoaded({ actions }) {
          const { routes } = options
          const { addRoute } = actions
          routes.map(route => addRoute(route))
      }
  }
}
