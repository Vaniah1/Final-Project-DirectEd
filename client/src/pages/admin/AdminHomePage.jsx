  import React from 'react'
  import { useSelector } from 'react-redux'
  import { Container, Grid, Paper, Typography } from '@mui/material'
  import { motion } from 'framer-motion'
  import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
  import SeeNotice from '../../components/SeeNotice'

  const AdminHomePage = () => {
      const { currentUser } = useSelector((state) => state.user)

      // Sample data for charts
      const studentData = [
          { month: 'Jan', count: 400 },
          { month: 'Feb', count: 450 },
          { month: 'Mar', count: 500 },
          { month: 'Apr', count: 480 },
          { month: 'May', count: 520 },
          { month: 'Jun', count: 550 },
      ]

      const classData = [
          { subject: 'Math', count: 30 },
          { subject: 'Science', count: 25 },
          { subject: 'English', count: 35 },
          { subject: 'History', count: 20 },
      ]

      const teacherData = [
          { department: 'Science', count: 15 },
          { department: 'Arts', count: 20 },
          { department: 'Commerce', count: 10 },
      ]

      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

      return (
          <div className="bg-gray-100 min-h-screen py-12">
              <Container maxWidth="lg">
                  <Typography variant="h3" component="h1" gutterBottom className="mb-8 text-gray-800 font-bold text-center">
                      Admin Dashboard
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
                                  <Typography variant="h5" gutterBottom className="font-bold text-gray-700 mb-4">Student Enrollment Trend</Typography>
                                  <ResponsiveContainer width="100%" height={300}>
                                      <LineChart data={studentData}>
                                          <CartesianGrid strokeDasharray="3 3" />
                                          <XAxis dataKey="month" />
                                          <YAxis />
                                          <Tooltip />
                                          <Legend />
                                          <Line type="monotone" dataKey="count" stroke="#4C51BF" strokeWidth={2} activeDot={{ r: 8 }} />
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
                                  <Typography variant="h5" gutterBottom className="font-bold text-gray-700 mb-4">Class Distribution</Typography>
                                  <ResponsiveContainer width="100%" height={300}>
                                      <BarChart data={classData}>
                                          <CartesianGrid strokeDasharray="3 3" />
                                          <XAxis dataKey="subject" />
                                          <YAxis />
                                          <Tooltip />
                                          <Legend />
                                          <Bar dataKey="count" fill="#4FD1C5" />
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
                                  <Typography variant="h5" gutterBottom className="font-bold text-gray-700 mb-4">Teacher Distribution</Typography>
                                  <ResponsiveContainer width="100%" height={300}>
                                      <PieChart>
                                          <Pie
                                              data={teacherData}
                                              cx="50%"
                                              cy="50%"
                                              labelLine={false}
                                              outerRadius={80}
                                              fill="#8884d8"
                                              dataKey="count"
                                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                          >
                                              {teacherData.map((entry, index) => (
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
      )
  }

  export default AdminHomePage