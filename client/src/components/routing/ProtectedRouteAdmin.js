import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '~/contexts/AuthContext';
import { useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import GlobalStyles from '~/components/GlobalStyles/GlobalStyles.module.scss';

const gls = classNames.bind(GlobalStyles);
function ProtectedRouteAdmin({ component: Component, ...rest }) {
  const {
    authState: { authLoading, isAuthenticated, user },
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
        isAuthenticated && user.level === 'admin' ? (
          <>
            <Component {...rest} {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default ProtectedRouteAdmin;
