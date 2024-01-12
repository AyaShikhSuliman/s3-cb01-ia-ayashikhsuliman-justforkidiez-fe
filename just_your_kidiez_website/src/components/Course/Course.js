import './Course.css';
import CourseItem from './CourseItem';
import React, { useState, useEffect, Link } from 'react';
import { CourseAPI } from '../../apis/CourseAPI';


const Course = () => {

  const [courses, setCourses] = useState([])

  const fetchCourses = () => {
    CourseAPI.getAllCourses()
      .then(response => setCourses(response.data.courses))
  }

  useEffect(() => {
    fetchCourses();
  }, []);


  return (
    <>
      <h1>Check out these courses for your kid!      </h1>
      <div className='course'>
        <div className='course__container'>
          <div className='course__wrapper'>
            {
              courses.length > 0 ? (
                courses.map((course, ind) => {
                  return (
                    <ul className='course__items'>
                      <CourseItem
                        id={course.id}
                        src={course.image}
                        text={course.description}
                        label={course.title}
                        path='/lessons'
                      />
                    </ul>
                  );

                }
                )
              ) : (
                <ul className='course__items'>
                  <CourseItem
                    id=''
                    src=''
                    text=''
                    label=''
                    path=''
                  />
                </ul>
              )
            }
          </div>
        </div>
      </div>
    </>)
}

export default Course;