import { useState } from 'react';

import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SortOption.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faGrip, faGripHorizontal } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SortOption() {
  const [stateSelectOption, setSelectOption] = useState(false);

  return (
    <div className={cx('sort')}>
      <label htmlFor="">
        <div className={cx('fream')}>
          <p
            className={cx('sort-option')}
            onClick={() => {
              setSelectOption(!stateSelectOption);
            }}
          >
            Sắp xếp{' '}
            <span>
              <FontAwesomeIcon className={cx('icon-select--downt')} icon={faCaretDown} />
            </span>
            {stateSelectOption && (
              <ul className={cx('sort-option-items')}>
                <li>
                  <Link to="/sortUp">Giá giảm dần</Link>
                </li>
                <li>
                  <Link to="/sortDown">Giá tăng dần</Link>
                </li>
                <li>
                  <Link to="/topSale">Bán chạy nhât</Link>
                </li>
              </ul>
            )}
          </p>
          <p className={cx('line')}>|</p>
          <p>6 products</p>
        </div>
        <div>
          <FontAwesomeIcon icon={faGrip} />
          <FontAwesomeIcon icon={faGripHorizontal} />
        </div>
      </label>
    </div>
  );
}

export default SortOption;
