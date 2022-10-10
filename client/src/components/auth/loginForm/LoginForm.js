import styles from '../AuthForm.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import images from '~/asset/images';

import { useState, useContext } from 'react';
import { AuthContext } from '~/contexts/AuthContext';
import Alert from '~/components/Alert';

const cx = classNames.bind(styles);

// const login = () => {};
const LoginForm = () => {
  // Context
  const {
    authState: { user, isAuthenticated },
    loginUser,
  } = useContext(AuthContext);

  // Local storage
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;

  const onChangeLoginForm = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({ type: 'error', message: loginData.message });
        setTimeout(() => {
          setAlert(null);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Alert info={alert} />
      <div className={cx('modalAlter')} id="modalAlterID"></div>
      <div className={cx('auth')}>
        <div className={cx('auth_left')}></div>

        <div className={cx('auth_right', 'flex_align_justifile_center')}>
          <div className={cx('auth_right_width')}>
            <div className={cx('head_auth', 'flex_align_justifile_center')}>
              <img className={cx('logo_avatar')} src={images.logo} alt="logo" />
              <h1 className={cx('auth_content')}>Hello Again!</h1>
              <p className={cx('auth_content')}></p>
            </div>

            <form id="form_login" onSubmit={login}>
              <div className={cx('form_auth', 'flex_align_justifile_center')}>
                <div className={cx('auth_item')}>
                  <input
                    type="text"
                    id="form_login_email"
                    className={cx('form-control-imput')}
                    placeholder="Type account"
                    name="username"
                    value={username}
                    onChange={onChangeLoginForm}
                  />
                  <label htmlFor="form_login_email" className={cx('auth_item_icon')}>
                    <FontAwesomeIcon icon={faUser} />
                  </label>
                </div>
                <div className={cx('auth_item')}>
                  <input
                    type="password"
                    id="form_login_password"
                    className={cx('form-control-imput')}
                    placeholder="Type password"
                    name="password"
                    value={password}
                    onChange={onChangeLoginForm}
                  />
                  <label htmlFor="form_login_password" className={cx('auth_item_icon')}>
                    <FontAwesomeIcon icon={faLock} />
                  </label>
                </div>
              </div>
              <div>
                <p id="error_message"></p>
              </div>
              <div className={cx('auth_option')}>
                <Link to="/" className={cx('disable_text')}>
                  Remember Me
                </Link>
                <Link to="/">Recovery Password</Link>
              </div>
              <button type="submit" className={cx('btn_auth', 'btn')}>
                Login
              </button>
            </form>

            <div className={cx('auth_google_register')}>
              <Link to="/" className={cx('auth_google')}>
                <FontAwesomeIcon icon={faGoogle} />
                Sign in with Google
              </Link>
              <Link to="/register" className={cx('auth_register')}>
                REGISTER
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
