import { useLocation } from "@docusaurus/router";
import NotFound from '@theme-original/NotFound';
import React from 'react';

export default function NotFoundWrapper(props) {
  const location = useLocation();
  if (location.pathname.startsWith('/status/migration')) return (<></>);
  return (
    <>
      <NotFound {...props} />
    </>
  );
}
