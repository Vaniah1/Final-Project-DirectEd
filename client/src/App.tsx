import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>Homepage</>} />
        <Route path="/about" element={<>About</>} />
        <Route path="/sign-in" element={<>Sign In</>} />
        <Route path="/sign-up" element={<>Sign Up</>} />
        <Route path="/search" element={<>Search</>} />
        <Route element={<>Private Route</>}>
          <Route path="/dashboard" element={<>Dashboard</>} />
        </Route>
        <Route element={<>Only Admins</>}>
          <Route path="/create-class" element={<>Create Class</>} />
          <Route path="/update-class/:id" element={<>Update Class</>} />
          <Route path="/create-subject/" element={<>Create Subject</>} />
          <Route path="/update-subject/:id" element={<>Update Subject</>} />
          <Route path="/add-student/" element={<>Add Student</>} />
          <Route path="/update-student/:id" element={<>Update Student</>} />
        </Route>

        <Route path="/ask-doubt" element={<>Ask Doubt</>} />
      </Routes>
      
    </BrowserRouter>
  );
}