import React, { useState } from 'react';
import styled from 'styled-components';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
import { useNavigate } from 'react-router-dom'
import { authLogout } from '../../redux/userRelated/userSlice';
import { Button, Collapse, Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper, TextField } from '@mui/material';

const TeacherProfile = () => {
  const [showTab, setShowTab] = useState(false);
  const buttonText = showTab ? 'Cancel' : 'Edit profile';

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { currentUser, response, error } = useSelector((state) => state.user);
  const address = "Teacher"

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState("");
  const [sclassName, setSclassName] = useState(currentUser.teachSclass.sclassName);
  const [subName, setSubName] = useState(currentUser.teachSubject.subName);
  const [schoolName, setSchoolName] = useState(currentUser.school.schoolName);

  const fields = password === "" ? { name, email, sclassName, subName, schoolName } : { name, email, password, sclassName, subName, schoolName }

  const submitHandler = (event) => {
      event.preventDefault()
      dispatch(updateUser(fields, currentUser._id, address))
  }

  const deleteHandler = () => {
      try {
          dispatch(deleteUser(currentUser._id, "Students"));
          dispatch(deleteUser(currentUser._id, address));
          dispatch(authLogout());
          navigate('/');
      } catch (error) {
          console.error(error);
      }
  }

  return (
      <Container maxWidth="md">
          <StyledPaper elevation={3}>
              <Grid container spacing={2}>
                  <Grid item xs={12}>
                      <Box display="flex" justifyContent="center">
                          <Avatar alt="Teacher Avatar" sx={{ width: 150, height: 150 }}>
                              {String(currentUser.name).charAt(0)}
                          </Avatar>
                      </Box>
                  </Grid>
                  <Grid item xs={12}>
                      <Box display="flex" justifyContent="center">
                          <Typography variant="h5" component="h2" textAlign="center">
                              {currentUser.name}
                          </Typography>
                      </Box>
                  </Grid>
                  <Grid item xs={12}>
                      <Box display="flex" justifyContent="center">
                          <Typography variant="subtitle1" component="p" textAlign="center">
                              Email: {currentUser.email}
                          </Typography>
                      </Box>
                  </Grid>
                  <Grid item xs={12}>
                      <Box display="flex" justifyContent="center">
                          <Typography variant="subtitle1" component="p" textAlign="center">
                              Class: {currentUser.teachSclass.sclassName}
                          </Typography>
                      </Box>
                  </Grid>
                  <Grid item xs={12}>
                      <Box display="flex" justifyContent="center">
                          <Typography variant="subtitle1" component="p" textAlign="center">
                              Subject: {currentUser.teachSubject.subName}
                          </Typography>
                      </Box>
                  </Grid>
                  <Grid item xs={12}>
                      <Box display="flex" justifyContent="center">
                          <Typography variant="subtitle1" component="p" textAlign="center">
                              School: {currentUser.school.schoolName}
                          </Typography>
                      </Box>
                  </Grid>
                  <Grid item xs={12}>
                      <Box display="flex" justifyContent="center" gap={2}>
                          <Button variant="contained" color="error" onClick={deleteHandler}>Delete</Button>
                          <Button variant="contained"
                              onClick={() => setShowTab(!showTab)}>
                              {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}{buttonText}
                          </Button>
                      </Box>
                  </Grid>
              </Grid>
          </StyledPaper>
          <Collapse in={showTab} timeout="auto" unmountOnExit>
              <StyledCard>
                  <CardContent>
                      <Typography variant="h6" gutterBottom>
                          Edit Details
                      </Typography>
                      <form onSubmit={submitHandler}>
                          <Grid container spacing={3}>
                              <Grid item xs={12}>
                                  <TextField
                                      fullWidth
                                      label="Name"
                                      variant="outlined"
                                      value={name}
                                      onChange={(event) => setName(event.target.value)}
                                      required
                                  />
                              </Grid>
                              <Grid item xs={12}>
                                  <TextField
                                      fullWidth
                                      label="Class"
                                      variant="outlined"
                                      value={sclassName}
                                      onChange={(event) => setSclassName(event.target.value)}
                                      required
                                  />
                              </Grid>
                              <Grid item xs={12}>
                                  <TextField
                                      fullWidth
                                      label="Subject"
                                      variant="outlined"
                                      value={subName}
                                      onChange={(event) => setSubName(event.target.value)}
                                      required
                                  />
                              </Grid>
                              <Grid item xs={12}>
                                  <TextField
                                      fullWidth
                                      label="School"
                                      variant="outlined"
                                      value={schoolName}
                                      onChange={(event) => setSchoolName(event.target.value)}
                                      required
                                  />
                              </Grid>
                              <Grid item xs={12}>
                                  <TextField
                                      fullWidth
                                      label="Email"
                                      variant="outlined"
                                      type="email"
                                      value={email}
                                      onChange={(event) => setEmail(event.target.value)}
                                      required
                                  />
                              </Grid>
                              <Grid item xs={12}>
                                  <TextField
                                      fullWidth
                                      label="Password"
                                      variant="outlined"
                                      type="password"
                                      value={password}
                                      onChange={(event) => setPassword(event.target.value)}
                                  />
                              </Grid>
                              <Grid item xs={12}>
                                  <Button variant="contained" type="submit" fullWidth>Update</Button>
                              </Grid>
                          </Grid>
                      </form>
                  </CardContent>
              </StyledCard>
          </Collapse>
      </Container>
  )
}

export default TeacherProfile

const StyledPaper = styled(Paper)`
padding: 20px;
margin-bottom: 20px;
`;

const StyledCard = styled(Card)`
padding: 20px;
background-color: #f5f5f5;
`;