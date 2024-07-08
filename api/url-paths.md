// api/server.js

app.use("/api/auth", authRoutes); // http://localhost:5000/api/auth
app.use("/api/class", classRoutes); // http://localhost:5000/api/class  
app.use("/api/attendance", attendanceRoutes); // http://localhost:5000/api/attendance
app.use("/api/face-id", faceRoutes); // http://localhost:5000/api/face-id
app.use("/api/subjects", subjectsRoutes); // http://localhost:5000/api/subjects
app.use("/api/teachers", teachersRoutes); // http://localhost:5000/api/teachers
app.use("/api/students", studentsRoutes); // http://localhost:5000/api/students
