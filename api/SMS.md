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

PORT = 5000
MONGO_URL = "mongodb+srv://smash:smash@learn.c1mgxaw.mongodb.net/?retryWrites=true&w=majority&appName=Learn"
TOKEN_SECRET = "VeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1aW5jeSBMYXJzb24iLCJpYXQiOjE1MTYyMzkwMjJ9.WcPGXClpKD7Bc1C0CCDA1060E2GGlTfamrd8-W0ghBE"

