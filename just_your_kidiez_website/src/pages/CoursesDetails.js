import React, { useState, useEffect } from 'react';
import "../components/Course/CoursesManagement.css"
import { CourseAPI } from '../apis/CourseAPI';
import TokenManager from '../apis/TokenManager'
import { useNavigate, Link } from 'react-router-dom';


function CoursesDetails() {
    const [numberOfLessonsPerCourseEntities, setCoursesWithNumber] = useState([]);

    const navigate = useNavigate()

    const checkUserRole = () => {
        const claims = TokenManager.getClaims();
        if (claims && claims?.roles?.includes('PARENT')) {
            return false;
        } else if (claims && claims?.roles?.includes('COACH')) {
            return true;
        } else if (!claims) {
            return false;
        }
    }

    const fetchCourses = () => {
        CourseAPI.getAllCoursesWithNumberOfLessons()
            .then(response => setCoursesWithNumber(response.data.numberOfLessonsPerCourseEntities
            ))
    }

    useEffect(() => {
        fetchCourses();
    })
    // console.log(coursesWithNumber)
    return (
        <>
            {TokenManager.getAccessToken() && checkUserRole()
                ?
                <div className="course_management">
                    <h1>Course that have lessons</h1>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Number Of Lessons</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                numberOfLessonsPerCourseEntities.length > 0 ? (
                                    numberOfLessonsPerCourseEntities.map((courseWithNumber, ind) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{courseWithNumber.course.id}</td>
                                                    <td>{courseWithNumber.course.image}</td>
                                                    <td>{courseWithNumber.course.title}</td>
                                                    <td>{courseWithNumber.course.description}</td>
                                                    <td>{courseWithNumber.count}</td>
                                                </tr >
                                            </>
                                        );
                                    }
                                    )
                                ) : (
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <Link
                        to='/course_management'
                    >
                        Back
                    </Link>
                </div >
                : navigate('/log-in')
            }
        </>

    );
}

export default CoursesDetails;
