import React, { useState, useEffect } from 'react'
import { Button, Alert } from 'antd'

const IncomingLessonAlert = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [lessonLink, setLessonLink] = useState('')

  useEffect(() => {
    // Simulating an incoming lesson notification
    // In a real application, this would be replaced with actual data fetching or websocket
    const timer = setTimeout(() => {
      setShowAlert(true)
      setLessonLink('https://v-learn.vercel.app/meeting/user_2ioYFFqFzOssQB6aBePuoPXf4c8?personal=true')
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleRedirect = () => {
    window.open(lessonLink, '_blank')
  }

  return (
    <>
      {showAlert && (
        <Alert
          message="Incoming Lesson"
          description="You have an upcoming lesson. Click the button to join."
          type="info"
          showIcon
          action={
            <Button size="medium" type="primary" onClick={handleRedirect}>
              Join Lesson
            </Button>
          }
          closable
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  )
}

export default IncomingLessonAlert
