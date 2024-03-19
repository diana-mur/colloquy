import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { Auth } from "./pages/Auth.jsx";
import { Messenger } from "./pages/Messenger.jsx";
import { Chat } from "./components/chat/Chat.jsx";
import { UserProfile } from "./components/userProfile/UserProfile.jsx";
import { SideBar } from "./components/sidebar/Sidebar.jsx";
import { Friends } from "./pages/Friends.jsx";
import { MyFriends } from "./components/friends/MyFriends.jsx";
import { InReq } from "./components/friends/InReq.jsx";
import { OutReq } from "./components/friends/OutReq.jsx";
import { AllUsers } from "./components/friends/AllUsers.jsx";
import { MyProfile } from "./pages/MyProfile.jsx";
import { EditProfile } from "./pages/EditProfile.jsx";
import { Reg } from "./pages/Reg.jsx";
import "./index.css"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Auth />
  },
  {
    path: "/reg",
    element: <Reg />
  },
  {
    path: "*",
    element: <Navigate to={"/login"} />
  },
])

const authRouter = createBrowserRouter([
  {
    path: "/",
    element: <div className="flex">
      <SideBar />
      <Outlet />
    </div>,
    children: [

      {
        path: "/myProfile",
        element: <MyProfile />
      },

      {
        path: "/editProfile",
        element: <EditProfile />
      },

      {
        path: "/messages",
        element: <>
          <Outlet />
          <Messenger />
        </>,
        children: [
          {
            path: "/messages/:chatId",
            element: <Chat />
          },
        ]
      },

      {
        path: "user/:userId",
        element: <UserProfile />
      },

      {
        path: "/users",
        element: <>
          <Outlet />
          <Friends />
        </>,
        children: [
          {
            path: "/users/myFriends",
            element: <MyFriends />
          },
          {
            path: "/users/incomingReq",
            element: <InReq />
          },
          {
            path: "/users/submittedReq",
            element: <OutReq />
          },
          {
            path: "/users",
            element: <AllUsers />
          },
        ]
      },

      // для мобильного меню должно отображаться отдельной страницей
      // создание беседы
      {
        path: "/createChat",
        element: <>createChat</>
      },
    ]
  },
  {
    path: "/login" || "/registration" || "*",
    element: <Navigate to={"/messages"} />
  },
])

function App() {
  const token = useSelector((state) => state.auth.token)

  return (
    token ?
      <RouterProvider router={authRouter} /> :
      <RouterProvider router={router} />
  )
}

export default App