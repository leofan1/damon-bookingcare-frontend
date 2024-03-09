import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Home } from './layout/Home';
import { DoctorDetail } from './layout/DoctorDetail';
import { SpecialtyDetail } from './layout/SpecialtyDetail';
import { Login } from './layout/Auth';
import { TopDoctorViewAll } from './layout/TopDoctorViewAll';
import { TopSpecialtyViewAll } from './layout/TopSpecialtyViewAll';

import UserIsNotAuthenticated from './hoc/UserIsNotAuthenticated';
import UserIsAuthenticated from './hoc/UserIsAuthenticated';

import { System, UserManage, DoctorManage, ManageShedule, DoctorManageShedule, SpecialtyManage } from './layout/System';

function App() {
    return (
        <React.Fragment>
            <div className="App">
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <UserIsNotAuthenticated>
                                <Login />
                            </UserIsNotAuthenticated>
                        }
                    />

                    <Route
                        path="system"
                        element={
                            <UserIsAuthenticated>
                                <System />
                            </UserIsAuthenticated>
                        }
                    >
                        <Route path="" element={<UserManage />} />
                        <Route path="user-manager" element={<UserManage />} />
                        <Route path="doctor-manager" element={<DoctorManage />} />
                        <Route path="doctor-schedule" element={<ManageShedule />} />
                        <Route path="doctor-schedule/:id" element={<DoctorManageShedule />} />
                        <Route path="specialty-manager" element={<SpecialtyManage />} />
                    </Route>

                    <Route path="/" element={<Home />} />
                    <Route path="/doctors" element={<TopDoctorViewAll />} />
                    <Route path="/specialties" element={<TopSpecialtyViewAll />} />
                    <Route path="/doctor-detail/:id" element={<DoctorDetail />} />
                    <Route path="/specialty-detail/:id" element={<SpecialtyDetail />} />
                </Routes>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </React.Fragment>
    );
}

export default App;
