import React, { useState } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Courses from './pages/Courses';
import LogIn from './pages/LogIn';
import Lesson from './pages/Lessons';
import CourseManagement from './pages/CourseManagement';
import LessonManagement from './pages/LessonManagement';
import LessonDetails from './pages/LessonDetails';
import CoursesDetails from './pages/CoursesDetails';
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import CreateCourseModal from './components/Course/CreateCourse/CreateCourseModal';
import Notification from './pages/Notification';

function App() {
  const [isCoach, setIsCoach] = useState()

  const setDataIsCoach = (data) => {
    setIsCoach(data)
  }

  const [stompClient, setStompClient] = useState();
  const [messagesReceived, setMessagesReceived] = useState([]);
  const SENDER = "Coach";


  const setupStompClient = () => {
    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    stompClient.onConnect = () => {
      stompClient.subscribe('/topic/publicmessages', (data) => {
        console.log(data);
        onMessageReceived(data);
      });
    };

    stompClient.activate();

    setStompClient(stompClient);
  };

  const sendMessage = (newMessage) => {
    const payload = { 'id': uuidv4(), 'from': SENDER, 'to': newMessage.to, 'text': newMessage.text };
    if (stompClient && stompClient.connected) {
      stompClient.publish({ 'destination': `/topic/publicmessages`, body: JSON.stringify(payload) });
    } else {
      console.log("not connected")
    }
  };

  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    setMessagesReceived(messagesReceived => [...messagesReceived, message]);
  };

  const onUsernameInformed = () => {
    setupStompClient();
  }

  return (
    <>
      <Router>
        <Navbar isCouch={isCoach} />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/courses" exact element={<Courses />} />
          <Route path="/log-in" exact element={<LogIn setDataIsCoach={setDataIsCoach} />} />
          <Route path="/lesson/:id" exact element={<Lesson />} />
          <Route path="/course_management" exact element={<CourseManagement onUsernameInformed={onUsernameInformed} isCouch={isCoach}/>} />
          <Route path="/lesson_management" exact element={<LessonManagement />} />
          <Route path="/lesson_details/:id" exact element={<LessonDetails />} />
          <Route path="/courses_details" exact element={<CoursesDetails />} />
          <Route path="/create_course" exact element={<CreateCourseModal onUsernameInformed={onUsernameInformed} onMessageSend={sendMessage} isCouch={isCoach} />} />
          <Route path="/notification" exact element={<Notification onUsernameInformed={onUsernameInformed} messagesReceived={messagesReceived} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;