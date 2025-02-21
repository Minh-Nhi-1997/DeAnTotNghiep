import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// admin pages
import './admin/styles/global.css';
import AppAdmin from './AppAdmin.jsx';
import ProductPageAdmin from './admin/pages/product.jsx';
import CreateItemPageAdmin from './admin/pages/createItem.jsx';
import RegisterPageAdmin from './admin/pages/register.jsx';
import UserPageAdmin from './admin/pages/user.jsx';
import HomePageAdmin from './admin/pages/home.jsx';
import LoginPageAdmin from './admin/pages/login.jsx';
import CreateTablePageAdmin from './admin/pages/createTable.jsx';
import TablePageAdmin from './admin/pages/table.jsx';
import TablePage from './user/pages/table.jsx';

// user pages
import App from './App.jsx';
import HomePage from './user/pages/home.jsx';
import LoginPage from './user/pages/login.jsx';

import { AuthWrapper } from './components/context/auth.context.jsx';


const router = createBrowserRouter([
  {
    path: "/admin/",
    element: <AppAdmin />,
    children: [
      {
        index: true,
        element: <HomePageAdmin />
      },
      {
        path: "user",
        element: <UserPageAdmin />
      },
      {
        path: "post-item/:i_id?",
        element: <CreateItemPageAdmin />
      },
      {
        path: "product",
        element: <ProductPageAdmin />
      },
      {
        path: "register",
        element: <RegisterPageAdmin />
      },
      {
        path: "post-table/:t_id?",
        element: < CreateTablePageAdmin />
      },
      {
        path: "table",
        element: < TablePageAdmin />
      },
    ]
  },
  {
    path: "/admin/login",
    element: <LoginPageAdmin />
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "table",
        element: <TablePage />
      },
    ]
  },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>

  </React.StrictMode>
)

