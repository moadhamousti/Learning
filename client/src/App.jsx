import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
// import '../src/components/Navbar'
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import Home from '../src/pages/Home';
import HomeNavbar from '../src/components/HomeNavbar';
import Formation from '../src/pages/Formation';
import Form from '../src/pages/Form';
import axios from 'axios';
import {Toaster} from 'react-hot-toast'
import {UserContextProvider} from '../context/userContext/'
import Dashboard from './pages/Dashboard';
import ViewUser from './pages/ViewUser';
import EditUser from './pages/EditUser';
import AddUser from './pages/AddUser';
import AddCourse from './pages/AddCourse';
import ViewCourse from './pages/ViewCourse';
import EditCourse from './pages/EditCourse';
import Profile from './pages/Profile';
import CourseDetails from './pages/CourseDetails';
import CourseVideos from './pages/CourseVideos';
import ViewForm from './pages/ViewForm';
import EditForm from './pages/EditForm';
import ProtectedRoute from './components/ProtectedRoute';
import TestUserContext from './components/TestUserContext';


axios.defaults.baseURL= 'https://learning-cm37.onrender.com';
axios.defaults.withCredentials = true;

function App() {
  
  return (
    <UserContextProvider>
    <Toaster position='bottom-right' toatOption={{duration:2000}} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<HomeNavbar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/formation" element={<Formation />} /> */}
        <Route path="/formation" element={<ProtectedRoute element={<Formation />}/>}/>
        {/* <Route path="/formation" element={<Formation />} /> */}
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/formation/course/:courseId" element={<CourseDetails />} />
        <Route path="/formation/videos/:courseId" element={<CourseVideos />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/view-course/:courseId" element={<ViewCourse />} />
        <Route path="/view-form/:formId" element={<ViewForm />} />
        <Route path="/edit-form/:formId" element={<EditForm />} />
        <Route path="/courses/edit/:courseId" element={<EditCourse />} />
        <Route path="/view-user/:userId" element={<ViewUser />} />
        <Route path="/edit-user/:userId" element={<EditUser />} />
        <Route path="/form" to="/form" element={<Form />} />
        <Route path="/test" to="/test" element={<TestUserContext />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </UserContextProvider>
      )
}

export default App
