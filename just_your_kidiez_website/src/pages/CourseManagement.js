import React from 'react';
import '../App.css';
import CoursesManagement from '../components/Course/CoursesManagement';
import { useNavigate } from 'react-router-dom';
import TokenManager from '../apis/TokenManager'


function CourseManagement() {
  const navigate = useNavigate()

  return (
    <>
      {TokenManager.getAccessToken()
        ?
        <CoursesManagement />
        : navigate('/log-in')
      }
    </>
  );
}

export default CourseManagement;