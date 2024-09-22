import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/index.js'
import App from './App.jsx'
import "./utils/i18n.js";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Orders from './pages/Orders.jsx'
import Profile from './pages/Profile.jsx'
import Messages from './pages/Messages.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/orders",
                element: <Orders />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/messages",
                element: <Messages />
            }
        ]
    },
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
