import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';
import TypingEffect from '../components/TypeEffect';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GoogleIcon from '@mui/icons-material/Google';

const Homepage = React.memo(() => {
    return (
        <>
            <nav className='p-2 bg-blue1 sticky rounded-xl aria w-full h-[150px] text-3xl font-bold pt-12 pb-auto flex '>
                <MenuBookIcon sx={{ color: 'white', fontSize: '4rem',marginLeft:"3px", marginRight: '8px', alignItems: 'center', display: 'inline-flex', verticalAlign: 'middle' }} /><h1 className='[color:white] items-center'>SCHOOL IN</h1>
            </nav>

            <StyledContainer>
                
                <StyledContainer>
           
                    <Grid container spacing={0}>
                        <Grid item xs={12} md={6}>
                            <img src={Students} alt="students" style={{ width: '100%' }} loading="lazy" />
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <StyledPaper elevation={3}>
                                <StyledTitle>
                                  <h1><span className='text-4xl mb-2'>WELCOME TO SCHOOL IN</span></h1>  
                                </StyledTitle>
                                <TypingEffect/>
                                <StyledBox>
                                    <StyledLink to="/choose" aria-label="Login">
                                        <Button sx={{color: "#2135EF", marginBottom: "1rem"}}  variant="outlined" fullWidth>
                                            Login
                                        </Button>
                                    </StyledLink>
                                    <StyledLink to="/Adminlogin" aria-label="Login as Guest">
                                        <Button variant="outlined" fullWidth
                                            sx={{ mt: 2, mb: 2, color: "#008000", borderColor: "#008000" }}>
                                        
                                            <GoogleIcon sx={{marginRight:"5px"}}/>
                                            Login with Google
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
  padding: 18px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  text-align: center;
`;

const StyledText = styled.p`
  margin-top: 50px;
  margin-bottom: 30px; 
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;
