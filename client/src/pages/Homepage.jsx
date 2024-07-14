import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button, Paper } from '@mui/material';
import styled from 'styled-components';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Carousel from 'react-material-ui-carousel';
import TypingEffect from '../components/TypeEffect';
import Students from "../assets/School-Girl-With-Rabbit.svg";
import stude from "../assets/bts4.svg";
import bus from "../assets/cyberscooty-two-kids.svg"
import kids from "../assets/kids.svg"
import cool from "../assets/1699413865Home School.svg"


const Homepage = React.memo(() => {
  return (
    <div className="bg-cover bg-center h-full bg-no-repeat z-50">
      <StyledNav>
        <MenuBookIcon sx={{ color: 'white', fontSize: '4rem', marginLeft: "3px", marginRight: '8px', verticalAlign: 'middle' }} />
        <h1 className='font-bold text-white text-3xl'>AcademiHub</h1>
      </StyledNav>

      <StyledContainer>
        <Grid container spacing={0} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>s
            <Carousel>
              <img src={stude} alt="student" style={{ width: '100%', height: '50%' }} loading="lazy" />
              <img src={Students} alt="students" style={{ width: '100%', height: '50%' }} loading="lazy" />
              <img src={bus} alt="School Bus" style={{ width: '100%', height: '50%' }} loading="lazy" />
              <img src={kids} alt="kids" style={{ width: '100%', height: '50%' }} loading="lazy" />
              <img src={cool} alt="Cool kid" style={{ width: '100%', height: '50%' }} loading="lazy" />
            </Carousel>
          </Grid>

          <Grid item xs={10} md={6}>
            <StyledPaper elevation={3}>
              <StyledTitle>
                <h1>Welcome To AcademiHub</h1>
              </StyledTitle>
              <TypingEffect />
              <StyledBox>
                <StyledLink to="/choose" aria-label="Login">
                  <StyledButton variant="contained">
                    Login
                  </StyledButton>
                </StyledLink>
                <StyledLink to="/Adminregister" aria-label="Register new school">
                  <StyledButton variant="outlined">
                    Register New School
                  </StyledButton>
                </StyledLink>
                <StyledText>
                  Don't have an account?{' '}
                  <Link to="/Adminregister" className='text-blue1' aria-label="Sign up">
                    Sign up
                  </Link>
                </StyledText>
              </StyledBox>
            </StyledPaper>
          </Grid>
        </Grid>
      </StyledContainer>
    </div>
  );
});

export default Homepage;

const StyledNav = styled.nav`
  display: flex;
  color:white;
  align-items: center;
  justify-content: flex-start;
  background-color: #28A745;
  height: 80px;
  padding: 0 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

const StyledPaper = styled(Paper)`
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 24px;
`;

const StyledTitle = styled.div`
  font-size: 2.5rem;
  color: #28A745;
  font-weight: bold;
  margin-bottom: 20px;
`;

const StyledText = styled.p`
  margin-top: 20px;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
  font-size: 1rem;
  color: #28A745;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;
const StyledButton = styled(Button)`
  color: #ffffff;
  background-color: #28A745;
  font-weight: bold;
  border-color: #28A745;
  border-radius: 15px;
  padding: 10px 20px;
  &:hover {
    background-color: #218838;
  }
`;


const carouselItemStyles = {
  height: '400px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  backgroundColor: '#28A745',
  fontSize: '1.5rem',
  borderRadius: '10px',
  overflow: 'hidden'
};
