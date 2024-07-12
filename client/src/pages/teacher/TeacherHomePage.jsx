import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Students from "../../assets/img1.png";
import Lessons from "../../assets/subjects.svg";
import Tests from "../../assets/assignment.svg";
import Time from "../../assets/time.svg";
import { motion } from 'framer-motion';

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

    const numberOfStudents = sclassStudents && sclassStudents.length;
    const numberOfSessions = subjectDetails && subjectDetails.sessions

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
                        <p className="text-xl">{currentUser.teachSclass?.name}</p>
                        <p className="text-lg mt-2">Teacher Dashboard</p>
                    </div>
                    <img src={currentUser.avatar} alt="User Image" className="w-16 h-16 rounded-full" />
                </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between"
                >
                    <img src={Students} alt="Students" className="w-16 h-16 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Class Students</h2>
                    <CountUp start={0} end={numberOfStudents} duration={2.5} className="text-3xl font-bold text-green-600" />
                </motion.div>
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between"
                >
                    <img src={Lessons} alt="Lessons" className="w-16 h-16 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Total Lessons</h2>
                    <CountUp start={0} end={numberOfSessions} duration={5} className="text-3xl font-bold text-blue-600" />
                </motion.div>
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between"
                >
                    <img src={Tests} alt="Tests" className="w-16 h-16 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Tests Taken</h2>
                    <CountUp start={0} end={24} duration={4} className="text-3xl font-bold text-indigo-600" />
                </motion.div>
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between"
                >
                    <img src={Time} alt="Time" className="w-16 h-16 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Total Hours</h2>
                    <CountUp start={0} end={30} duration={4} suffix="hrs" className="text-3xl font-bold text-purple-600" />
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
        </div>
    );
};

export default TeacherHomePage;