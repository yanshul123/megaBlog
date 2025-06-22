import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout, Login} from './components/index.js'

import Home from "./Pages/Home.jsx";
import AddPost from "./Pages/AddPost";
import Signup from "./Pages/Signup";
import EditPost from "./Pages/EditPost";
import Post from "./Pages/post.jsx"
import AllPosts from "./Pages/AllPost.jsx"

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children : [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: '/login',
        element:(
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element:(
          <AuthLayout authentication={false}>
            <Signup/>
          </AuthLayout>
        )
      },
      {
        path: "/all-posts",
        element:(
          <AuthLayout authentication>
            {" "}
            <AllPosts/>
          </AuthLayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPost/>
          </AuthLayout>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost/>
          </AuthLayout>
        )
      },
      {
        path: "/post/:slug",
        element: <Post/>
      },
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
