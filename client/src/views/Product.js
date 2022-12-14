import { ProductContext } from '~/contexts/ProductContext';
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

function Product() {
  let body = null;
  // Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    productState: { product, products, productsLoading },
    getProducts,
    deleteProduct,
    updateProduct,
  } = useContext(ProductContext);

  const {
    categoryState: { category, categorys, categorysLoading },
    getCategorys,
  } = useContext(CategoryContext);

  const [updateProductModal, setUpdateProductModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

  // FORM UPDATE
  // BEGIN
  const [alert, setAlert] = useState(null);
  const [UpdateProduct, setUpdateProduct] = useState({
    _id: '',
    id: '',
    name: '',
    image: '',
    price: '',
    priceOld: '',
    description: '',
  });

  // handleEdit
  const handleEdit = (product) => {
    setUpdateProduct({
      _id: product._id,
      id: product.id,
      name: product.name,
      image: product.image,
      priceOld: product.priceOld,
      price: product.price,
      description: product.description,
    });
    setUpdateProductModal(true);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updateProduct(UpdateProduct);
    setAlert({
      type: success === true ? 'success' : 'error',
      message: message,
    });
    if (success) setUpdateProductModal(false);

    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  const onChangeNewProductForm = (event, type) => {
    if (type == 'image') setUpdateProduct({ ...UpdateProduct, [event.target.name]: event.target.files[0] });
    else setUpdateProduct({ ...UpdateProduct, [event.target.name]: event.target.value });
  };
  // END

  // delete Product
  const [deleteProductID, setDeleteProductID] = useState({ _id: '', id: '', title: '' });

  const handleDelete = (product) => {
    setDeleteProductID({ _id: product._id, id: product.id, title: product.title });
    setDeleteConfirmModal(true);
  };

  const onDelete = async (e) => {
    e.preventDefault();
    const { success, message } = deleteProduct(deleteProductID._id);
    setTimeout(setDeleteConfirmModal(false), 4000);

    setAlert({
      type: 'success' || success,
      message: 'X??a th??nh c??ng' || message,
    });
  };

  // Start: Get all posts
  useEffect(() => {
    getProducts();
    getCategorys();
  }, []);

  if (productsLoading) {
    body = (
      <div>
        <FontAwesomeIcon className={gls('spinner--Load')} icon={faSpinner} />
      </div>
    );
  } else if (products.length === 0) {
    body = <h2>DANH S??CH TR???NG</h2>;
  } else {
    body = (
      <>
        {deleteConfirmModal && (
          <div className={cx('update_card')}>
            <form id="form_update" className={cx('wrapperFormUpdate')} onSubmit={onDelete}>
              <h2> X??c nh???n x??a m?? s???n ph???m: {deleteProductID.id} </h2>
              <div className={cx('btnLayout')}>
                <Button>X??C NH???N</Button>
                <Button
                  error
                  onClick={() => {
                    setDeleteConfirmModal(false);
                  }}
                >
                  H???Y
                </Button>
              </div>
            </form>
          </div>
        )}

        {updateProductModal && (
          <div className={cx('update_card')}>
            <form
              id="form_update"
              className={cx('wrapperFormUpdate')}
              encType="multipart/form-data"
              onSubmit={onSubmit}
            >
              <label htmlFor="blogID">
                <p>M?? s???n ph???m</p>
                <input
                  className={cx('input')}
                  type="text"
                  id="id"
                  placeholder="Type product id"
                  name="id"
                  value={UpdateProduct.id}
                  onChange={(e) => {
                    onChangeNewProductForm(e, 'text');
                  }}
                />
              </label>
              <label htmlFor="ProductName">
                <p>T??n s???n ph???m</p>
                <input
                  className={cx('input')}
                  type="text"
                  id="ProductName"
                  placeholder="Type Product name"
                  name="name"
                  value={UpdateProduct.name}
                  onChange={(e) => {
                    onChangeNewProductForm(e, 'text');
                  }}
                />
              </label>
              <label htmlFor="image">
                <p>???nh</p>
                <input
                  className={cx('input', 'inputFile')}
                  type="file"
                  id="image"
                  name="image"
                  onChange={(e) => {
                    onChangeNewProductForm(e, 'image');
                  }}
                />
              </label>
              <label htmlFor="priceOld">
                <p>Gi?? c??</p>
                <input
                  className={cx('input')}
                  type="number"
                  id="priceOld"
                  placeholder="Type priceOld"
                  name="priceOld"
                  value={UpdateProduct.priceOld}
                  onChange={(e) => {
                    onChangeNewProductForm(e, 'text');
                  }}
                />
              </label>
              <label htmlFor="price">
                <p>Gi?? m???i</p>
                <input
                  className={cx('input')}
                  type="number"
                  id="price"
                  placeholder="Type price"
                  name="price"
                  value={UpdateProduct.price}
                  onChange={(e) => {
                    onChangeNewProductForm(e, 'text');
                  }}
                />
              </label>
              <label htmlFor="description">
                <p>M?? t???</p>
                <textarea
                  className={cx('input', 'description')}
                  id="description"
                  placeholder="Type Product description"
                  name="description"
                  value={UpdateProduct.description}
                  onChange={(e) => {
                    onChangeNewProductForm(e, 'text');
                  }}
                ></textarea>
              </label>
              <div className={cx('btnSubmit')}>
                <button type="submit">C???P NH???T</button>
                <Button
                  onClick={() => {
                    setUpdateProductModal(false);
                  }}
                  error
                >
                  H???Y
                </Button>
              </div>
            </form>
          </div>
        )}

        {alert != null && <Alert info={alert} />}
        <div className={cx('wrapper')}>
          <h2 className={cx('content')}>Danh m???c s???n ph???m</h2>
          <table className={cx('table')}>
            <thead>
              <tr>
                <td>STT</td>
                <td>M?? id</td>
                <td>T??n s???n ph???m</td>
                <td>???nh</td>
                <td>M?? t???</td>
                <td>Gi?? c??</td>
                <td>Gi?? hi???n t???i</td>
                <td></td>
              </tr>
            </thead>
            {products.map((product, index) => (
              <tbody key={product._id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>
                    <img src={product.image} alt="???nh m?? t???" />
                  </td>
                  <td className={cx('tdDescription')}>{product.description}</td>
                  <td>{product.priceOld}</td>
                  <td>{product.price}</td>
                  <td>
                    <Button
                      primary
                      onClick={() => {
                        handleEdit(product);
                      }}
                    >
                      S???a
                    </Button>
                    <Button
                      error
                      onClick={() => {
                        handleDelete(product);
                      }}
                    >
                      X??a
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

export default Product;
