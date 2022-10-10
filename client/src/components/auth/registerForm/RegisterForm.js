import styles from '../AuthForm.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import images from '~/asset/images';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { useContext, useState } from 'react';
import { AuthContext } from '~/contexts/AuthContext';
import Alert from '~/components/Alert';

const cx = classNames.bind(styles);

const Register = () => {
  // Context
  const { registerUser } = useContext(AuthContext);

  // Local storage
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [alert, setAlert] = useState(null);

  const { username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert({ type: 'error', message: 'Confirm password isnot correct' });
      setTimeout(() => {
        setAlert(null);
      }, 4000);
      return;
    }
    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({ type: 'error', message: registerData.message });
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
      <div className={cx('modalAlter')} id="modalAlterID"></div>
      <Alert info={alert} />
      <div className={cx('auth')}>
        <div className={cx('auth_left')}></div>

        <div className={cx('auth_right', 'flex_align_justifile_center')}>
          <div className={cx('auth_right_width')}>
            <div className={cx('head_auth', 'flex_align_justifile_center')}>
              <img className={cx('logo_avatar')} src={images.logo} alt="logo" />
              <h1 className={cx('auth_content')}>Hello Again!</h1>
              <p className={cx('auth_content')}></p>
            </div>

            <form id="form_login" onSubmit={register}>
              <div className={cx('form_auth', 'flex_align_justifile_center')}>
                <div className={cx('auth_item')}>
                  <input
                    type="text"
                    id="form_login_email"
                    className={cx('form-control-imput')}
                    placeholder="Type account"
                    name="username"
                    value={username}
                    onChange={onChangeRegisterForm}
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
                    name="password"
                    placeholder="Type password"
                    value={password}
                    onChange={onChangeRegisterForm}
                  />
                  <label htmlFor="form_login_password" className={cx('auth_item_icon')}>
                    <FontAwesomeIcon icon={faLock} />
                  </label>
                </div>
                <div className={cx('auth_item')}>
                  <input
                    type="password"
                    id="form_login_confirmPassword"
                    className={cx('form-control-imput')}
                    name="confirmPassword"
                    placeholder="Type confirm password"
                    value={confirmPassword}
                    onChange={onChangeRegisterForm}
                  />
                  <label htmlFor="form_login_confirmPassword" className={cx('auth_item_icon')}>
                    <FontAwesomeIcon icon={faLock} />
                  </label>
                </div>
              </div>
              <div>
                <p id="error_message"></p>
              </div>
              <button type="submit" className={cx('btn_auth', 'btn')}>
                REGISTER
              </button>
            </form>

            <div className={cx('auth_google_register')}>
              <Link to="/" className={cx('auth_google')}>
                <FontAwesomeIcon icon={faGoogle} />
                Sign in with Google
              </Link>
              <Link to="/" className={cx('auth_register')}>
                LOGIN
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
