import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import AuthContextProvider from '~/contexts/AuthContext';
import GlobalStyle from '~/components/GlobalStyles';
import PublicRoute from '~/components/routing/PublicRoute';
import ProtectedRouteAdmin from '~/components/routing/ProtectedRouteAdmin';
import ProtectedRoute from '~/components/routing/ProtectedRoute';
import Home from './views/Home';
import CategoryPage from './views/CategoryPage';
import BlogPage from './views/BlogPage';
import Detail from './views/Detail';
import Cart from './views/Cart';

import Admin from './views/Admin';

import Category from './views/Category';
import Blog from './views/Blog';
import Product from './views/Product';
import Bill from './views/Bill';
import Account from './views/Account';

import AddCategory from './views/AddCategory';
import AddBlog from './views/AddBlog';
import AddProduct from './views/AddProduct';
import AddBill from './views/AddBill';
import AddAccount from './views/AddAccount';

import CategoryContextProvider from './contexts/CategoryContext';
import BlogContextProvider from './contexts/BlogContext';
import ProductContextProvider from './contexts/ProductContext';
import BillContextProvider from './contexts/BillContext';
import UserContextProvider from './contexts/UserContext';
import TableAdmin from './components/TableAdmin';

function App() {
  return (
    <AuthContextProvider>
      <GlobalStyle>
        <TableAdmin>
          <Router>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" render={(props) => <Auth {...props} authRoute="login" />} />
              <Route exact path="/register" render={(props) => <Auth {...props} authRoute="register" />} />

              <CategoryContextProvider>
                <BlogContextProvider>
                  <ProductContextProvider>
                    <BillContextProvider>
                      <UserContextProvider>
                        <ProtectedRouteAdmin exact path="/admin" component={Admin} />
                        <PublicRoute exact path="/home" component={Home} />
                        <PublicRoute exact path="/blog" component={BlogPage} />
                        <ProtectedRoute exact path="/cart" component={Cart} />

                        <PublicRoute exact path="/home/detail/:id" component={Detail} />
                        <PublicRoute exact path="/home/:categoryName" component={CategoryPage} />

                        <ProtectedRouteAdmin exact path="/admin/category" component={Category} />
                        <ProtectedRouteAdmin exact path="/admin/category/add" component={AddCategory} />

                        <ProtectedRouteAdmin exact path="/admin/blog" component={Blog} />
                        <ProtectedRouteAdmin exact path="/admin/blog/add" component={AddBlog} />

                        <ProtectedRouteAdmin exact path="/admin/product" component={Product} />
                        <ProtectedRouteAdmin exact path="/admin/product/add" component={AddProduct} />

                        <ProtectedRouteAdmin exact path="/admin/bill" component={Bill} />
                        <ProtectedRouteAdmin exact path="/admin/bill/add" component={AddBill} />

                        <ProtectedRouteAdmin exact path="/admin/user" component={Account} />
                        <ProtectedRouteAdmin exact path="/admin/user/add" component={AddAccount} />
                      </UserContextProvider>
                    </BillContextProvider>
                  </ProductContextProvider>
                </BlogContextProvider>
              </CategoryContextProvider>
            </Switch>
          </Router>
        </TableAdmin>
      </GlobalStyle>
    </AuthContextProvider>
  );
}

export default App;
