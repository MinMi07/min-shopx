import LoginForm from '~/components/auth/loginForm/LoginForm';
import RegisterForm from '~/components/auth/registerForm/RegisterForm';
import { AuthContext } from '~/contexts/AuthContext';
import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import GlobalStyles from '~/components/GlobalStyles/GlobalStyles.module.scss';

const gls = classNames.bind(GlobalStyles);

const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated, user },
  } = useContext(AuthContext);

  let body;

  if (authLoading) {
    body = (
      <div>
        <FontAwesomeIcon className={gls('spinner--Load')} icon={faSpinner} />
      </div>
    );
  } else if (isAuthenticated && user.level === 'admin') return <Redirect to="/admin" />;
  else if (isAuthenticated && user.level === null) return <Redirect to="/home" />;
  else
    body = (
      <>
        {authRoute === 'login' && <LoginForm />}
        {authRoute === 'register' && <RegisterForm />}
        {/* {authRoute === 'register' && <RegisterForm />} */}
      </>
    );

  return <div>{body}</div>;
};

export default Auth;
