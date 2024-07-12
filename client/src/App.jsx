import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/admin/AdminDashboard';
const StudentDashboard = React.lazy(() => import('./pages/Homepage-student/StudentDashboard'));
import TeacherDashboard from './pages/teacher/TeacherDashboard.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AdminRegisterPage from './pages/admin/AdminRegisterPage.jsx';
import ChooseUser from './pages/ChooseUser';
import ChatbotComponent from "./components/ChatBot";
const App = () => {
  const { currentRole } = useSelector(state => state.user);

  return (

    <Router>
      <ChatbotComponent />
      {currentRole === null &&
        
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/choose" element={<ChooseUser visitor="normal" />} />
          <Route path="/chooseasguest" element={<ChooseUser visitor="guest" />} />

          <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
          <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
          <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />

          <Route path="/Adminregister" element={<AdminRegisterPage />} />

          <Route path='*' element={<Navigate to="/" />} />
        </Routes>}

      {currentRole === "Admin" &&
        <>
          <AdminDashboard />
        </>
      }

      {currentRole === "Student" &&
        <>
          <StudentDashboard />
        </>
      }

      {currentRole === "Teacher" &&
        <>
          <TeacherDashboard />
        </>
      }
    </Router>
  )
}

export default App