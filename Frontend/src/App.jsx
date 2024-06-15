import React, { useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import Home from './components/Home/Home.jsx';
import Application from './components/Application/Application.jsx';
import MyApplication from './components/Application/MyApplications.jsx';
import Header from './components/Layout/Navbar.jsx'
import Footer from './components/Layout/Footer.jsx'
import Job from './components/Job/Job.jsx'
import JobDetail from './components/Job/JobDetail.jsx'
import MyJobs from './components/Job/MyJobs.jsx'
import Postjob from './components/Job/Postjob.jsx'
import NotFound from './components/Notfound/NotFound.jsx'
import axios from 'axios'
import { Toaster } from 'react-hot-toast';
import { Context } from './main.jsx'

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/getuser", { withCredentials: true });

        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized])

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Job />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/job/post" element={<Postjob />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/application/me" element={<MyApplication />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  )
}

export default App
