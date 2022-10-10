import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import { CategoryContext } from '~/contexts/CategoryContext';

const cx = classNames.bind(styles);

function Sidebar() {
  const {
    categoryState: { categorys },
  } = useContext(CategoryContext);

  return (
    <>
      <div className={cx('sidebar')}>
        <ul>
          <li>
            <Link to="/">Danh mục sản phẩm</Link>
          </li>

          {categorys.map((category, index) => {
            let linkCategory = `/home/${category.title}`;
            return (
              <li key={index}>
                <Link to={linkCategory}>{category.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
