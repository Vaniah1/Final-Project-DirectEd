import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import SeeNotice from '../../components/SeeNotice';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id
    const subjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    // Sample data for charts
    const studentAttendanceData = [
        { month: 'Jan', attendance: 90 },
        { month: 'Feb', attendance: 85 },
        { month: 'Mar', attendance: 88 },
        { month: 'Apr', attendance: 92 },
        { month: 'May', attendance: 95 },
        { month: 'Jun', attendance: 91 },
    ];

    const testScoresData = [
        { subject: 'Test 1', avgScore: 75 },
        { subject: 'Test 2', avgScore: 80 },
        { subject: 'Test 3', avgScore: 85 },
        { subject: 'Test 4', avgScore: 78 },
    ];

    const classParticipationData = [
        { activity: 'Discussions', percentage: 40 },
        { activity: 'Assignments', percentage: 30 },
        { activity: 'Projects', percentage: 20 },
        { activity: 'Quizzes', percentage: 10 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <Container maxWidth="lg">
                <Typography variant="h3" component="h1" gutterBottom className="mb-8 text-gray-800 font-bold text-center">
                    Teacher Dashboard
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom className="mb-6 text-gray-700 font-semibold text-center">
                    Welcome, {currentUser.name}!
                </Typography>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Paper className="p-6 shadow-lg rounded-lg">
                                <Typography variant="h5" gutterBottom className="font-bold text-gray-700 mb-4">Student Attendance Trend</Typography>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={studentAttendanceData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="attendance" stroke="#4C51BF" strokeWidth={2} activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Paper>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Paper className="p-6 shadow-lg rounded-lg">
                                <Typography variant="h5" gutterBottom className="font-bold text-gray-700 mb-4">Test Scores</Typography>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={testScoresData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="subject" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="avgScore" fill="#4FD1C5" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Paper>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Paper className="p-6 shadow-lg rounded-lg">
                                <Typography variant="h5" gutterBottom className="font-bold text-gray-700 mb-4">Class Participation</Typography>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={classParticipationData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="percentage"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {classParticipationData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Paper>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <Paper className="p-6 shadow-lg rounded-lg">
                                <Typography variant="h5" gutterBottom className="font-bold text-gray-700 mb-4">Notices</Typography>
                                <SeeNotice />
                            </Paper>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default TeacherHomePage;