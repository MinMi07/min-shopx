import { faCircleExclamation, faCircleInfo, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Alert.module.scss';

const cx = classNames.bind(styles);

const Alert = ({ info }) => {
  if (info) {
    switch (info.type) {
      case 'success':
        return (
          <div className={cx('wrapper', 'success')}>
            <span>
              <FontAwesomeIcon icon={faCircleInfo} />{' '}
            </span>
            {info.message}
          </div>
        );
      case 'infor':
        return (
          <div className={cx('wrapper', 'infor')}>
            <span>
              <FontAwesomeIcon icon={faCircleInfo} />{' '}
            </span>
            {info.message}
          </div>
        );
      case 'warning':
        return (
          <div className={cx('wrapper', 'warning')}>
            <span>
              <FontAwesomeIcon icon={faCircleExclamation} />
            </span>
            {info.message}
          </div>
        );
      case 'error':
        return (
          <div className={cx('wrapper', 'error')}>
            <span>
              <FontAwesomeIcon icon={faCircleXmark} />
            </span>
            {info.message}
          </div>
        );
      default:
        throw new Error('error');
    }
  } else return null;
};
export default Alert;
