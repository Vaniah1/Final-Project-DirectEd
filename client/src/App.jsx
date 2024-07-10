import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const App = () => {
  const { currentRole } = useSelector(state => state.user);

  return (
    <Router>
      {currentRole === null && 
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/choose" element={<ChooseUser visitor="normal" />} />
          <Route path="/chooseasguest" element={<chooseUser visitor="guest" />} />
          
          <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
          <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
          <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} /> 

          <Route path="/AdminRegister" element={<AdminRegisterPage />} />
          
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