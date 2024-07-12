import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user);

    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    return (
        <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-blue-50 to-indigo-50">
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={3}>
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between h-48"
                        >
                            <img src={Students} alt="Students" className="w-16 h-16 mb-4" aria-label="Students Icon" />
                            <h2 className="text-xl font-semibold mb-2">Total Students</h2>
                            <CountUp start={0} end={numberOfStudents} duration={2.5} className="text-3xl font-bold text-green-600" />
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between h-48"
                        >
                            <img src={Classes} alt="Classes" className="w-16 h-16 mb-4" aria-label="Classes Icon" />
                            <h2 className="text-xl font-semibold mb-2">Total Classes</h2>
                            <CountUp start={0} end={numberOfClasses} duration={5} className="text-3xl font-bold text-blue-600" />
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between h-48"
                        >
                            <img src={Teachers} alt="Teachers" className="w-16 h-16 mb-4" aria-label="Teachers Icon" />
                            <h2 className="text-xl font-semibold mb-2">Total Teachers</h2>
                            <CountUp start={0} end={numberOfTeachers} duration={2.5} className="text-3xl font-bold text-indigo-600" />
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between h-48"
                        >
                            <img src={Fees} alt="Fees" className="w-16 h-16 mb-4" aria-label="Fees Icon" />
                            <h2 className="text-xl font-semibold mb-2">Total Fees Paid</h2>
                            <CountUp start={0} end={854672} duration={20} prefix="Ksh " className="text-3xl font-bold text-purple-600" />
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white rounded-lg shadow-md p-6"
                        >
                            <SeeNotice />
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default AdminHomePage;
