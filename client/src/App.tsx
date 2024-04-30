import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import MainPage from "./pages/MainPage/MainPage";
import MainCoursePage from "./pages/Admin/Course/MainCoursePage/MainCoursePage";
import Navbar from "./components/Navbar/Navbar";
import CreateCoursePage from "./pages/Admin/Course/CreateCoursePage/CreateCoursePage";
import AllCoursesPage from "./pages/Admin/Course/AllCoursesPage/AllCoursesPage";
import MainUserPage from "./pages/Admin/User/MainUserPage/MainUserPage";
import AllUsersPage from "./pages/Admin/User/AllUsersPage/AllUsersPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PrivateRoute from "./utils/PrivateRoute";
import {AuthProvider} from "./components/Context/AuthProvider";
import ProfilePage from "./pages/Admin/User/ProfilePage/ProfilePage";
import CourseDetailPage from "./pages/LoggedUser/Course/CourseDetail/CourseDetailPage";
import UserOrdersPage from "./pages/LoggedUser/Orders/UserOrdersPage";
import UserOrderDetailPage from "./pages/LoggedUser/Orders/UserOrderDetailPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthProvider>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        /* Course routes */
                        <Route path="/admin/course" element={<PrivateRoute> <MainCoursePage/> </PrivateRoute>}/>
                        <Route path="/admin/course/create"
                               element={<PrivateRoute> <CreateCoursePage/> </PrivateRoute>}/>
                        <Route path="/admin/course/all" element={<PrivateRoute> <AllCoursesPage/> </PrivateRoute>}/>
                        <Route path="/course/detail/:courseId" element={<PrivateRoute> <CourseDetailPage/> </PrivateRoute>}/>

                        /* User routes */
                        <Route path="/admin/user" element={<PrivateRoute> <MainUserPage/> </PrivateRoute>}/>
                        <Route path="/admin/user/all" element={<PrivateRoute> <AllUsersPage/> </PrivateRoute>}/>

                        <Route path="/user/profile/orders" element={<PrivateRoute> <UserOrdersPage/> </PrivateRoute>}/>
                        <Route path="/user/profile/order/:orderId" element={<PrivateRoute> <UserOrderDetailPage/> </PrivateRoute>}/>

                        /* Profile routes */
                        <Route path="/user/profile" element={<PrivateRoute> <ProfilePage/> </PrivateRoute>}/>

                        /* Register and login routes */
                        <Route path={"/register"} element={<RegisterPage/>}/>
                        <Route path={"/login"} element={<LoginPage/>}/>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
