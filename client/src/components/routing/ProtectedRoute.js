import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '~/contexts/AuthContext';
import { useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import NavbarMenu from '~/components/layout/NavbarMenu';
import Footer from '~/components/layout/Footer';

import classNames from 'classnames/bind';
import GlobalStyles from '~/components/GlobalStyles/GlobalStyles.module.scss';

const gls = classNames.bind(GlobalStyles);
function ProtectedRoute({ component: Component, ...rest }) {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div>
        <FontAwesomeIcon className={gls('spinner--Load')} icon={faSpinner} />
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <>
            <NavbarMenu />
            <Component {...rest} {...props} />
            <Footer />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default ProtectedRoute;
