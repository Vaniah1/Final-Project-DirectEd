import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <LogoutWrapper>
            <LogoutContainer>
                <h1>{currentUser.name}</h1>
                <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
                <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
                <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
            </LogoutContainer>
        </LogoutWrapper>
    );
};

export default Logout;

const LogoutWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index:100;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #D9D9D9;
`;

const LogoutContainer = styled.div`
  border: 1px solid #08E43A;
  border-radius: 10px;
  padding: 40px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  background-color: #08E43A;
  color: black;
  font-size: 24px;
  font-weight: bold;
`;


const LogoutMessage = styled.p`
  margin-bottom: 20px;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`;

const LogoutButton = styled.button`
  width: 200px;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #333;
  }
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #ea0606;
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background-color: rgb(99, 60, 99);
`;