import React, { useState } from 'react';
import styled from 'styled-components';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';

const ChatbotComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleChat = () => {
    setIsVisible(!isVisible);
  };

  return (
    <ChatbotContainer>
      <ChatToggleButton onClick={toggleChat}>
        {isVisible ? <CloseIcon /> : <ChatBubbleOutlineIcon />}
      </ChatToggleButton>
      {isVisible && (
        <ChatWindow>
          <ChatHeader>AcademiHub Copilot</ChatHeader>
          <ChatFrame
            src="https://echuo-ai.onrender.com/"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="microphone *"
          ></ChatFrame>
        </ChatWindow>
      )}
    </ChatbotContainer>
  );
};

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;

`;

const ChatToggleButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #008000;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background-color: #006400;
    transform: scale(1.05);
  }

  svg {
    width: 30px;
    height: 30px;
  }
`;

const ChatWindow = styled.div`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 500px;
  height: 600px;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
`;

const ChatHeader = styled.div`
  background-color: #008000;
  color: white;
  padding: 15px;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChatFrame = styled.iframe`
  flex-grow: 1;
  border: none;
`;

export default ChatbotComponent;