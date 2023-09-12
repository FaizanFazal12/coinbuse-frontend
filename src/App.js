import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import Home from "./pages/Home/Home";
import style from "./App.module.css"
import Protected from "./Component/Protected/Protected";
import Error from "./pages/Error/Error";
import { useSelector } from "react-redux";
import Login from "./pages/login/login";
import Blog from "./pages/Blog/Blog";
import Signup from "./pages/signup/Signup";
import Crypto from "./pages/Crypto/Crypto";
import SubmitBlog from "./pages/SubmitBlog/SubmitBlog";
import Blogdetails from "./pages/Blogdetails/Blogdetails";
import UpdateBlog from "./pages/UpdateBlog/UpdateBlog";
import Loader from "./Component/loader/Loader";
import UseAutoLogin from "./hooks/UseAutoLogin"



function App() {
  const isAuth = useSelector((state) => state.user.auth);
  const loading=UseAutoLogin()
  return loading ? <Loader text="..."/> : (
    <div className={style.container}>
      <BrowserRouter>
        <div className={style.layout}>
          <Navbar />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <div className={style.main}>
                  <Home />
                </div>
              }
            />


            <Route
              path="/crypto"
              exact
              element={
                <div className={style.main}>
                 <Crypto/>
                </div>
              }
            />
            <Route
              path="/blogs"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={style.main}>
                  <Blog/>
                  </div>
                </Protected>
              }
            />
            <Route
              path="/blog/:id"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={style.main}>
                  <Blogdetails/>
                  </div>
                </Protected>
              }
            />
            <Route
              path="/blog-update/:id"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={style.main}>
                  <UpdateBlog/>
                  </div>
                </Protected>
              }
            />
            <Route
              path="/submit"
              exact
              element={
  
                  <Protected isAuth={isAuth}>
                    <div className={style.main}>
                    <SubmitBlog/>
                    </div>
                  </Protected>
                
              }
            />
            <Route
              path="/signup"
              exact
              element={
                <div className={style.main}>
                 <Signup/>
                </div>
              }
            />
            <Route
              path="/login"
              exact
              element={
                <div className={style.main}>
                  <Login />
                </div>
              }
            />
            <Route
              path="*"
              exact
              element={
                <div className={style.main}>
                  <Error />
                </div>
              }
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>

  );
}

export default App;
