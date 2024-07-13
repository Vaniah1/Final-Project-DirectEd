import React, { useState, useEffect } from 'react'
import { Button, Alert } from 'antd'
import styled, { keyframes } from 'styled-components'



const TeacherLesson = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [lessonLink, setLessonLink] = useState('')

  useEffect(() => {
    // Simulating an upcoming lesson notification for the teacher
    // In a real application, this would be replaced with actual data fetching or websocket
    const timer = setTimeout(() => {
      setShowAlert(true)
      setLessonLink('https://v-learn.vercel.app/personal-room')
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleStartLesson = () => {
    window.open(lessonLink, '_blank')
  }

  return (
    <>
      
      {showAlert && (
        <Alert
          message="Upcoming Lesson"
          description="You have a lesson scheduled to start soon. Click the button to begin."
          type="info"
          showIcon
          action={
            <Button size="medium" type="primary" onClick={handleStartLesson}>
              Start Lesson
            </Button>
          }
          closable
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  )
}

export default TeacherLesson