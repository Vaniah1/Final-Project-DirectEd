// api/server.js

app.use("/api/auth", authRoutes); // http://localhost:5000/api/auth
app.use("/api/class", classRoutes); // http://localhost:5000/api/class  
app.use("/api/attendance", attendanceRoutes); // http://localhost:5000/api/attendance
app.use("/api/face-id", faceRoutes); // http://localhost:5000/api/face-id
app.use("/api/subjects", subjectsRoutes); // http://localhost:5000/api/subjects
app.use("/api/teachers", teachersRoutes); // http://localhost:5000/api/teachers
app.use("/api/students", studentsRoutes); // http://localhost:5000/api/students
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import authRoutes from "./routes/auth.route.js";
// import classRoutes from "./routes/class.route.js";
// import attendanceRoutes from "./routes/attendance.route.js";
// import faceRoutes from "./utils/facial.js"
// import subjectsRoutes from "./routes/subject.route.js"
// import teachersRoutes from "./routes/admin.route.js"
// import studentsRoutes from "./routes/user.route.js"
// import assignmentsRoutes from "./routes/assignment.route.js"

// import path from "path";

// dotenv.config();
// const port = process.env.PORT || 5000;
// const app = express();
// app.use(express.json());
// app.use(cors());
// const MONGO_URL = process.env.MONGO_URL




// app.use("/api/auth",authRoutes)
// app.use("/api/class",classRoutes)
// app.use("/api/attendance",attendanceRoutes)
// app.use("/api/face-id",faceRoutes)
// app.use("/api/subjects", subjectsRoutes)
// app.use("/api/teachers", teachersRoutes)
// app.use("/api/students", studentsRoutes)
// app.use("/api/assignments", assignmentsRoutes)

// mongoose.connect(MONGO_URL).then(() => {
//     console.log('Connected to MongoDB server');
//     app.listen(port, () => {
//         console.log(`Server is running on port ${port}`)
//     })
// }).catch(err => {
//     console.error('Failed to connect to MongoDB', err);
// });

// const __dirname = path.resolve()




http://localhost:4000/api/register/signin
http://localhost:4000/api/register/admin
http://localhost:4000/api/announcements/getall
http://localhost:4000/api/announcements
http://localhost:4000/api/assignments
http://localhost:4000/api/assignments/getall
http://localhost:4000/api/attendance
http://localhost:4000/api/attendance/getall
http://localhost:4000/api/class/getall
http://localhost:4000/api/class
http://localhost:4000/api/events/getall
http://localhost:4000/api/events
http://localhost:4000/api/exam/getall
http://localhost:4000/api/exam
http://localhost:4000/api/library/getall
http://localhost:4000/api/library/books
http://localhost:4000/api/students/getall
http://localhost:4000/api/students
http://localhost:4000/api/teachers
http://localhost:4000/api/teachers/getall
http://localhost:4000/api/users/student/signin
http://localhost:4000/api/users/teacher/signin
