import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import ViewPost from "./components/ViewPosts"
import CreatePost from "./components/CreatePost"
import OtherPost from "./components/OtherPost"
import { useSelector } from "react-redux"

import AdminPosts from "./components/Adminpage"
import { Navigate } from "react-router-dom"


function App() {
   const {user} = useSelector((state) => state.login);
  //  console.log(user.role)
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/view-post" element={<ViewPost />} />
        <Route path="/other-post" element={<OtherPost />} />
        <Route
          path="/admin"
          element={ user &&  user?.role === "admin" ? <AdminPosts/> : <Navigate to="/" />}
        />
        {/* <Route path="/admin" element={<AdminPosts/>}/> */}
      </Routes>
    </>
  )
}

export default App
