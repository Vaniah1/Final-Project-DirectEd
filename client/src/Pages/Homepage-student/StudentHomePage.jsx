import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import { Pie, Bar } from 'react-chartjs-2';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { motion } from 'framer-motion';
import 'chart.js/auto';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [date, setDate] = useState(new Date());

    const classID = currentUser.sclassName._id;

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const pieData = {
        labels: ['Present', 'Absent'],
        datasets: [
            {
                label: 'Attendance',
                data: [overallAttendancePercentage, overallAbsentPercentage],
                backgroundColor: ['#4caf50', '#f44336'],
                hoverBackgroundColor: ['#66bb6a', '#e57373'],
            },
        ],
    };

    const barData = {
        labels: ['Math', 'English', 'Science', 'History'],
        datasets: [
            {
                label: 'Attendance',
                data: [75, 85, 90, 80],
                backgroundColor: '#42a5f5',
            },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-blue-50 to-indigo-50">
            <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg p-6 mb-8"
            >
                <div className="flex justify-between items-center">
                    <div className="text-white">
                        <h1 className="text-3xl font-bold">Welcome back, {currentUser.name}</h1>
                        <p className="text-xl">{currentUser.sclassName.name}</p>
                        <p className="text-lg mt-2">Overall performance</p>
                    </div>
                    <img src={currentUser.avatar} alt="User Image" className="w-16 h-16 rounded-full" />
                </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between"
                >
                    <img src={Subject} alt="Subjects" className="w-16 h-16 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Total Subjects</h2>
                    <CountUp start={0} end={numberOfSubjects} duration={2.5} className="text-3xl font-bold text-green-600" />
                </motion.div>
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between"
                >
                    <img src={Assignment} alt="Assignments" className="w-16 h-16 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Total Assignments</h2>
                    <CountUp start={0} end={15} duration={4} className="text-3xl font-bold text-blue-600" />
                </motion.div>
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between"
                >
                    <h2 className="text-xl font-semibold mb-4">Attendance</h2>
                    {response ? (
                        <p className="text-xl font-semibold">No Attendance Found</p>
                    ) : loading ? (
                        <p className="text-xl font-semibold">Loading...</p>
                    ) : subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                        <div className="w-full h-48">
                            <Pie data={pieData} />
                        </div>
                    ) : (
                        <p className="text-xl font-semibold">No Attendance Found</p>
                    )}
                </motion.div>
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg shadow-md p-6"
                >
                    <h2 className="text-xl font-semibold mb-4">Current Date & Time</h2>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-indigo-600">{date.toLocaleDateString()}</p>
                        <p className="text-2xl font-semibold text-indigo-400">{date.toLocaleTimeString()}</p>
                    </div>
                </motion.div>
            </div>
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 bg-white rounded-lg shadow-md p-6"
            >
                <SeeNotice />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white rounded-lg shadow-md p-6"
                >
                    <h2 className="text-xl font-semibold mb-4">Student Detail</h2>
                    <p className="mb-2">Date of Birth: {currentUser.dateOfBirth}</p>
                    <p className="mb-2">Class: {currentUser.sclassName.name}</p>
                    <p className="mb-2">Roll Number: {currentUser.rollNum}</p>
                    <p className="mb-2">Phone Number: {currentUser.phoneNumber}</p>
                    <p className="mb-2">Father Name: {currentUser.fatherName}</p>
                    <p>Address: {currentUser.address}</p>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-white rounded-lg shadow-md p-6"
                >
                    <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
                    <div className="flex items-center mb-2">
                        <CalendarTodayIcon className="mr-2 text-green-500" />
                        <p>Golf Tournaments</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <CalendarTodayIcon className="mr-2 text-blue-500" />
                        <p>Volleyball</p>
                    </div>
                    <div className="flex items-center">
                        <CalendarTodayIcon className="mr-2 text-indigo-500" />
                        <p>Swimming</p>
                    </div>
                </motion.div>
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg shadow-md p-6 mt-8"
                >
                    <h2 className="text-xl font-semibold mb-4">Subject-wise Attendance</h2>
                    <div className="h-48 w-full">
                        <Bar data={barData} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default StudentHomePage;
