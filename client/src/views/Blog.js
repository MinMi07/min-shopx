import { BlogContext } from '~/contexts/BlogContext';
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

function Blog() {
  let body = null;
  // Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    blogState: { blog, blogs, blogsLoading },
    getBlogs,
    deleteBlog,
    updateBlog,
  } = useContext(BlogContext);

  const [updateBlogModal, setUpdateBlogModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

  // handleEdit

  const handleEdit = (blog) => {
    setUpdateBlog({ _id: blog._id, id: blog.id, title: blog.title, image: blog.image, description: blog.description });
    setUpdateBlogModal(true);
  };

  // FORM UPDATE
  // BEGIN
  const [alert, setAlert] = useState(null);

  const [UpdateBlog, setUpdateBlog] = useState({
    _id: '',
    id: '',
    title: '',
    image: '',
    description: '',
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updateBlog(UpdateBlog);
    setAlert({
      type: success === true ? 'success' : 'error',
      message: message,
    });
    if (success) setUpdateBlogModal(false);

    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  const onChangeNewBlogForm = (event, type) => {
    if (type == 'image') setUpdateBlog({ ...UpdateBlog, [event.target.name]: event.target.files[0] });
    else setUpdateBlog({ ...UpdateBlog, [event.target.name]: event.target.value });
  };
  // END

  // delete Blog
  const [deleteBlogID, setDeleteBlogID] = useState({ _id: '', id: '', title: '' });

  const handleDelete = (blog) => {
    setDeleteBlogID({ _id: blog._id, id: blog.id, title: blog.title });
    setDeleteConfirmModal(true);
  };

  const onDelete = async (e) => {
    e.preventDefault();
    const { success, message } = deleteBlog(deleteBlogID._id);
    setDeleteConfirmModal(false);

    setTimeout(() => {
      setAlert(false);
    }, 4000);
    setAlert({
      type: 'success' || success,
      message: 'X??a th??nh c??ng' || message,
    });
  };

  // Start: Get all posts
  useEffect(() => {
    getBlogs();
  }, []);

  if (blogsLoading) {
    body = (
      <div>
        <FontAwesomeIcon className={gls('spinner--Load')} icon={faSpinner} />
      </div>
    );
  } else if (blogs.length === 0) {
    body = <h2>DANH S??CH TR???NG</h2>;
  } else {
    body = (
      <>
        {deleteConfirmModal && (
          <div className={cx('update_card')}>
            <form id="form_update" className={cx('wrapperFormUpdate')} onSubmit={onDelete}>
              <h2> X??c nh???n x??a m?? blog: {deleteBlogID.id} </h2>
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

        {updateBlogModal && (
          <div className={cx('update_card')}>
            <form
              id="form_update"
              className={cx('wrapperFormUpdate')}
              encType="multipart/form-data"
              onSubmit={onSubmit}
            >
              <label htmlFor="blogID">
                <p>M?? blog</p>
                <input
                  className={cx('input')}
                  type="text"
                  id="id"
                  placeholder="Type blog id"
                  name="id"
                  value={UpdateBlog.id}
                  onChange={(e) => {
                    onChangeNewBlogForm(e, 'text');
                  }}
                />
              </label>
              <label htmlFor="BlogTitle">
                <p>Ti??u ?????</p>
                <input
                  className={cx('input')}
                  type="text"
                  id="title"
                  placeholder="Type Blog title"
                  name="title"
                  value={UpdateBlog.title}
                  onChange={(e) => {
                    onChangeNewBlogForm(e, 'text');
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
                    onChangeNewBlogForm(e, 'image');
                  }}
                />
              </label>
              <label htmlFor="description">
                <p>M?? t???</p>
                <textarea
                  className={cx('input', 'description')}
                  id="description"
                  placeholder="Type Blog description"
                  name="description"
                  value={UpdateBlog.description}
                  onChange={(e) => {
                    onChangeNewBlogForm(e, 'text');
                  }}
                ></textarea>
              </label>
              <div className={cx('btnSubmit')}>
                <button type="submit">C???P NH???T</button>
                <Button
                  onClick={() => {
                    setUpdateBlogModal(false);
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
          <h2 className={cx('content')}>Danh m???c blog s???n ph???m</h2>
          <table className={cx('table')}>
            <thead>
              <tr>
                <td>STT</td>
                <td>M?? id</td>
                <td>Ti??u ?????</td>
                <td>???nh</td>
                <td>M?? t???</td>
                <td></td>
              </tr>
            </thead>
            {blogs.map((blog, index) => (
              <tbody key={blog._id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{blog.id}</td>
                  <td>{blog.title}</td>
                  <td>
                    <img src={blog.image} alt="???nh m?? t???" />
                  </td>
                  <td className={cx('tdDescription')}>{blog.description}</td>
                  <td>
                    <Button
                      primary
                      onClick={() => {
                        handleEdit(blog);
                      }}
                    >
                      S???a
                    </Button>
                    <Button
                      error
                      onClick={() => {
                        handleDelete(blog);
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

export default Blog;
