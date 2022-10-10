import { Route, Redirect } from 'react-router-dom';

import NavbarMenu from '~/components/layout/NavbarMenu';
import Footer from '~/components/layout/Footer';

function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <NavbarMenu />
          <Component {...rest} {...props} />
          <Footer />
        </>
      )}
    />
  );
}

export default PublicRoute;
