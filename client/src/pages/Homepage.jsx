import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';
import TypingEffect from '../components/TypeEffect';

const Homepage = React.memo(() => {
    return (
<<<<<<< HEAD
        <>
            <nav className='p-2 bg-blue1 sticky rounded-xl aria w-full h-[150px] text-3xl font-bold pt-12 pb-auto'>
                <h1 className='[color:white]'>SCHOOL IN</h1>
            </nav>
`

            <StyledContainer>
                
=======
        <StyledContainer>
           
>>>>>>> 08ae3d66e05b1c70ea110fd31e09e7a25cd6ebef
            <Grid container spacing={0}>
                <Grid item xs={12} md={6}>
                    <img src={Students} alt="students" style={{ width: '100%' }} loading="lazy" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledPaper elevation={3}>
                        <StyledTitle>
                           <span className=''>Welcome to</span>
                            <br />
                            SCHOOL IN
                            <br />
                        </StyledTitle>
                        <TypingEffect/>
                        {/* <StyledText>
                            Streamline school management, class organization, and add students and faculty.
                            Seamlessly track attendance,and provide feedback.
                            Access records, view marks, and communicate effortlessly.
                        </StyledText> */}
                        <StyledBox>
                            <StyledLink to="/choose" aria-label="Login">
                                <Button sx={{color: "#2135EF"}}  variant="outlined" fullWidth>
                                    Login
                                </Button>
                            </StyledLink>
                            <StyledLink to="/chooseasguest" aria-label="Login as Guest">
                                <Button variant="outlined" fullWidth
                                    sx={{ mt: 1, mb: 3, color: "#008000", borderColor: "#008000", pill: true }}>
                                
                                    
                                    Admin Login with Google
                                </Button>
                            </StyledLink>
                            <StyledText>
                                Don't have an account?{' '}
                                <Link to="/Adminregister" style={{color:"#550080"}} aria-label="Sign up">
                                    Sign up
                                </Link>
                            </StyledText>
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
        </>
        
    );
});

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  gap: 10px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  font-weight: bold;
  padding-top: 50px;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  margin-top: 50px;
  margin-bottom: 30px; 
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
