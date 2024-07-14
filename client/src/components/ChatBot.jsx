import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';

const ChatbotComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const chatbotRef = useRef(null);

  const toggleChat = () => {
    setIsVisible(!isVisible);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <ChatbotContainer ref={chatbotRef}>
      <ChatToggleButton onClick={toggleChat} aria-label={isVisible ? "Close chat" : "Open chat"}>
        {isVisible ? <CloseIcon aria-hidden="true" /> : <ChatBubbleOutlineIcon aria-hidden="true" />}
      </ChatToggleButton>
      {isVisible && (
        <ChatWindow role="dialog" aria-label="Chat window">
          <ChatHeader>
            <span aria-label="Chat title">AcademiHub Copilot</span>
            <CloseButton onClick={toggleChat} aria-label="Close chat">
              <CloseIcon aria-hidden="true" />
            </CloseButton>
          </ChatHeader>
          <ChatFrame
            src="https://echuo-ai.streamlit.app/"
            width="100%"
            height="100%"
            allow="microphone *"
            referrerPolicy="no-referrer"
            title="Chat interface"
            aria-label="AcademiHub Copilot"
          ></ChatFrame>
        </ChatWindow>
      )}
    </ChatbotContainer>
  );
};

export default ChatbotComponent;

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100000;
`;

const ChatToggleButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index:9999;
  width: 60px;
  height: 60px;
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
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 20000;
  width: 100%;
  height: 90%;
  background-color: white;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    position: absolute;
    bottom: 80px;
    right: 0;
    width: 400px;
    height: 550px;
    border-radius: 12px;
  }
`;

const ChatHeader = styled.div`
  background-color: #008000;
  color: white;
  padding: 15px;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const ChatFrame = styled.iframe`
  flex-grow: 1;
  border: none;
`;

