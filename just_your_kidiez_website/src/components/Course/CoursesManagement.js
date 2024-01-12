import React, { useState, useEffect } from 'react';
import "./CoursesManagement.css";
import CreateCourseModal from "../Course/CreateCourse/CreateCourseModal";
import UpdateCourseModal from "../Course/UpdateCourse/UpdateCourseModal";
import { CourseAPI } from '../../apis/CourseAPI';
import TokenManager from '../../apis/TokenManager'
import { useNavigate, Link } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';

const CoursesManagement = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [courseFound, setCourseFound] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState();

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

    const openAndPass = (course) => {
        setModalUpdateOpen(true);
        setSelectedCourse(course);
    }

    const fetchCourses = () => {
        CourseAPI.getAllCourses()
            .then(response => setCourses(response.data.courses))
            .catch(function (error) {
            });
    }

    const handleDelete = (id) => {
        CourseAPI.deleteCourse(id)
            .then(function (response) {
            })

        const updatedCourses = courseFound.filter(course => course.id !== id)
        setCourseFound(updatedCourses)
    }

    useEffect(() => {
        fetchCourses();
    })


    const [stompClient, setStompClient] = useState();
    const [messagesReceived, setMessagesReceived] = useState([]);
    const SENDER = "Coach";


    const setupStompClient = () => {
        // stomp client over websockets
        const stompClient = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000
        });

        stompClient.onConnect = () => {
            // subscribe to the backend public topic
            stompClient.subscribe('/topic/publicmessages', (data) => {
                console.log(data);
                onMessageReceived(data);
            });
        };

        // initiate client
        stompClient.activate();

        // maintain the client for sending and receiving
        setStompClient(stompClient);
    };

    // send the data using Stomp
    const sendMessage = (newMessage) => {
        const payload = { 'id': uuidv4(), 'from': SENDER, 'to': newMessage.to, 'text': newMessage.text };
        if (stompClient && stompClient.connected) {
            stompClient.publish({ 'destination': `/topic/publicmessages`, body: JSON.stringify(payload) });
        } else {
            console.log("not connected")
        }
    };

    // display the received data
    const onMessageReceived = (data) => {
        const message = JSON.parse(data.body);
        setMessagesReceived(messagesReceived => [...messagesReceived, message]);
    };

    const onUsernameInformed = () => {
        setupStompClient();
    }
    return (
        <>
            {TokenManager.getAccessToken() && checkUserRole()
                ?
                <div className="course_management">
                    <h1>Course management</h1>
                    <p className='pp'>Courses that have lessons cannot be deleted!</p>
                    <button className="openModalBtn" onClick={() => { setModalOpen(true); }}>Create Course</button>
                    {modalOpen && <CreateCourseModal onUsernameInformed={onUsernameInformed} onMessageSend={sendMessage} setOpenModal={setModalOpen} />}
                    {modalUpdateOpen && <UpdateCourseModal course={selectedCourse} setModalUpdateOpen={setModalUpdateOpen} />}

                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                courses.length > 0 ? (
                                    courses.map((course, ind) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{course.id}</td>
                                                    <td>{course.image}</td>
                                                    <td>{course.title}</td>
                                                    <td>{course.description}</td>
                                                    <td>
                                                        <button className="btn btn-primary" onClick={() => { openAndPass(course) }}>Edit</button>
                                                    </td>
                                                    <td>
                                                        <form>
                                                            <button className='btn btn-danger-delete' onClick={(e) => handleDelete(course.id)} >Delete</button>
                                                        </form>
                                                    </td>
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
                                        <td><button className='btn btn-primary-edit'>Edit</button></td>
                                        <td><button className='btn btn-danger-delete' >Delete</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <Link
                        to='/courses_details'
                    >
                        More Details
                    </Link>
                </div >
                : navigate('/log-in')
            }
        </>

    );
}

export default CoursesManagement;
