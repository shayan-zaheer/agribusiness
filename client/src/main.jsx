import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/index.js'
import App from './App.jsx'
import "./utils/i18n.js";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Products from './pages/Products.jsx'
import Profile from './pages/Profile.jsx'
import Messages from './pages/Messages.jsx'
import WelcomeSection from './components/WelcomeSection.jsx'
import UserSelection from './components/UserSelection.jsx'
import InitialPage from './pages/InitialPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Settings from './pages/Settings.jsx'
import AddProduct from './components/AddProduct.jsx'
import DeleteProduct from './components/DeleteProduct.jsx'
import UpdateProduct from './components/UpdateProduct.jsx'
// import ChangePassword from './components/ChangePassword.jsx'
// import ChangeUsername from './components/ChangeUsername.jsx'
import SettingsNav from './components/SettingsNav.jsx'

const router = createBrowserRouter([
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/",
        element: <InitialPage />,
        children: [
            {
                path: "/",
                element: <WelcomeSection />
            },
            {
                path: "/users",
                element: <UserSelection />
            }
        ]
    },
    {
        element: <App />,
        children: [
            {
                path: "/products",
                element: <Products />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/messages",
                element: <Messages />
            },
            {
                path: "/settings",
                element: <Settings />,
                children: [
                    {
                        path: "/settings",
                        element: <SettingsNav />
                    },{
                        path: "/settings/add-product",
                        element: <AddProduct />
                    },
                    {
                        path: "/settings/delete-product",
                        element: <DeleteProduct />
                    },
                    {
                        path: "/settings/update-product",
                        element: <UpdateProduct />
                    },
                    // {
                    //     path: "/settings/change-password",
                    //     element: <ChangePassword />
                    // },
                    // {
                    //     path: "/settings/change-username",
                    //     element: <ChangeUsername />
                    // },
                ]
            },
            
        ]
    }
    // {
    //     path: "/orders",
    //     element: <App />
    // },
    // {
    //     path: "/profile",
    //     element: <App />
    // },
    // {
    //     path: "/settings",
    //     element: <App />
    // }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
