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

                        /* User routes */
                        <Route path="/admin/user" element={<PrivateRoute> <MainUserPage/> </PrivateRoute>}/>
                        <Route path="/admin/user/all" element={<PrivateRoute> <AllUsersPage/> </PrivateRoute>}/>

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
