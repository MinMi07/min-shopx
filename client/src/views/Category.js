import { CategoryContext } from '~/contexts/CategoryContext';
import { AuthContext } from '~/contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from '~/components/TableAdmin/TableAdmin.module.scss';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import Admin from '../views/Admin';
import Alert from '~/components/Alert';
import GlobalStyles from '~/components/GlobalStyles/GlobalStyles.module.scss';

const cx = classNames.bind(styles);
const gls = classNames.bind(GlobalStyles);

function Category() {
  let body = null;
  // Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    categoryState: { category, categorys, categorysLoading },
    getCategorys,
    deleteCategory,
    updateCategory,
  } = useContext(CategoryContext);

  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

  // handleEdit
  const handleEdit = (category) => {
    setUpdateCategory({ _id: category._id, id: category.id, title: category.title });
    setUpdateCategoryModal(true);
  };

  // FORM UPDATE
  // BEGIN
  const [alert, setAlert] = useState(null);

  const [UpdateCategory, setUpdateCategory] = useState({
    _id: '',
    id: '',
    title: '',
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updateCategory(UpdateCategory);
    setAlert({
      type: success === true ? 'success' : 'error',
      message: message === 'Internal server error' ? 'Mã danh mục đã tồn tại' : message,
    });
    if (success) setUpdateCategoryModal(false);

    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  const onChangeNewCategoryForm = (event) =>
    setUpdateCategory({ ...UpdateCategory, [event.target.name]: event.target.value });
  // END

  // delete category

  const [deleteCategoryID, setDeleteCategoryID] = useState({ _id: '', id: '', title: '' });

  const handleDelete = (category) => {
    setDeleteCategoryID({ _id: category._id, id: category.id, title: category.title });
    setDeleteConfirmModal(true);
  };

  const onDelete = async (e) => {
    e.preventDefault();
    const { success, message } = deleteCategory(deleteCategoryID._id);
    setDeleteConfirmModal(false);

    setTimeout(() => {
      setAlert(false);
    }, 4000);
    setAlert({
      type: 'success' || success,
      message: 'Xóa thành công' || message,
    });
  };

  // Start: Get all posts
  useEffect(() => {
    getCategorys();
  }, [alert]);

  if (categorysLoading) {
    body = (
      <div>
        <FontAwesomeIcon className={gls('spinner--Load')} icon={faSpinner} />
      </div>
    );
  } else if (categorys.length === 0) {
    body = <h2>DANH SÁCH TRỐNG</h2>;
  } else {
    body = (
      <>
        {deleteConfirmModal && (
          <div className={cx('update_card')}>
            <form id="form_update" className={cx('wrapperFormUpdate')} onSubmit={onDelete}>
              <h2> Xác nhận xóa mã danh mục: {deleteCategoryID.id} </h2>
              <div className={cx('btnLayout')}>
                <Button>XÁC NHẬN</Button>
                <Button
                  error
                  onClick={() => {
                    setDeleteConfirmModal(false);
                  }}
                >
                  HỦY
                </Button>
              </div>
            </form>
          </div>
        )}

        {updateCategoryModal && (
          <div className={cx('update_card')}>
            <form id="form_update" className={cx('wrapperFormUpdate')} onSubmit={onSubmit}>
              <label htmlFor="categoryID">
                <p>Mã danh mục sản phẩm</p>
                <input
                  className={cx('input')}
                  type="text"
                  id="categoryID"
                  placeholder="Type category id"
                  name="id"
                  value={UpdateCategory.id}
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
                  value={UpdateCategory.title}
                  onChange={onChangeNewCategoryForm}
                />
              </label>
              <div className={cx('btnSubmit')}>
                <button type="submit">CẬP NHẬT</button>
                <Button
                  onClick={() => {
                    setUpdateCategoryModal(false);
                  }}
                  error
                >
                  HỦY
                </Button>
              </div>
            </form>
          </div>
        )}

        {alert != null && <Alert info={alert} />}
        <div className={cx('wrapper')}>
          <h2 className={cx('content')}>Danh mục sản phẩm</h2>
          <table className={cx('table')}>
            <thead>
              <tr>
                <td>STT</td>
                <td>Mã danh mục</td>
                <td>Tên danh mục</td>
                <td></td>
              </tr>
            </thead>
            {categorys.map((category, index) => (
              <tbody key={category._id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{category.id}</td>
                  <td>{category.title}</td>
                  <td>
                    <Button
                      primary
                      onClick={() => {
                        handleEdit(category);
                      }}
                    >
                      Sửa
                    </Button>
                    <Button
                      error
                      onClick={() => {
                        handleDelete(category);
                      }}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </>
    );
  }

  return (
    <>
      <Admin>{body}</Admin>
    </>
  );
}

export default Category;
