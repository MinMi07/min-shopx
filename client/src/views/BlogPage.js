import { useContext, useEffect } from 'react';
import HeadPage from '~/components/layout/HeadPage';
import { BlogContext } from '~/contexts/BlogContext';
import LayoutDefault from '~/components/layout/LayoutDefault/LayoutDefault.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(LayoutDefault);

function BlogPage() {
  const {
    blogState: { blog, blogs, blogsLoading },
    getBlogs,
  } = useContext(BlogContext);

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <HeadPage>BLOG</HeadPage>
      <div className={cx('listBlogs')}>
        {blogs.map((blog, index) => (
          <div className={cx('wrapperBlog')} key={index}>
            <div className={cx('imgBlog')}>
              <img src={blog.image} alt={blog.title} />
            </div>
            <div className={cx('contentBlog')}>
              <div className={cx('titleBlog')}>{blog.title}</div>
              <div className={cx('descriptionBlog')}>{blog.description}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default BlogPage;
