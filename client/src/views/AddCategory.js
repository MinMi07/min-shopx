import { CategoryContext } from '~/contexts/CategoryContext';
import { useContext, useState } from 'react';
import Alert from '~/components/Alert';
import Admin from '../views/Admin';
import classNames from 'classnames/bind';
import styles from '~/components/FormInputAdmin/FormInputAdmin.module.scss';

const cx = classNames.bind(styles);
function AddCategory() {
  // Contexts
  const { addCategory } = useContext(CategoryContext);

  // State
  const [newCategory, setNewCategory] = useState({
    id: '',
    title: '',
  });

  const [alert, setAlert] = useState(null);
  const { id, title } = newCategory;

  const onChangeNewCategoryForm = (event) =>
    setNewCategory({ ...newCategory, [event.target.name]: event.target.value });

  const resetAddCategoryData = () => {
    setNewCategory({ id: '', title: '' });
    setAlert(null);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addCategory(newCategory);
    setTimeout(() => {
      resetAddCategoryData();
    }, 4000);

    setAlert({
      type: success === true ? 'success' : 'error',
      message: message === 'Internal server error' ? 'Danh mục không thỏa mãn' : message,
    });
  };

  const body = (
    <>
      {alert != null && <Alert info={alert} />}
      <form id="form_login" className={cx('wrapper')} onSubmit={onSubmit}>
        <label htmlFor="categoryID">
          <p>Mã danh mục sản phẩm</p>
          <input
            className={cx('input')}
            type="text"
            id="categoryID"
            placeholder="Type category id"
            name="id"
            value={id}
            onChange={onChangeNewCategoryForm}
          />
        </label>
        <label htmlFor="categoryName">
          <p>Tên danh mục</p>
          <input
            className={cx('input')}
            type="text"
            id="categoryName"
            placeholder="Type category name"
            name="title"
            value={title}
            onChange={onChangeNewCategoryForm}
          />
        </label>
        <div className={cx('btnSubmit')}>
          <button type="submit">THÊM</button>
        </div>
      </form>
    </>
  );

  return (
    <>
      <Admin>{body}</Admin>
    </>
  );
}

export default AddCategory;
