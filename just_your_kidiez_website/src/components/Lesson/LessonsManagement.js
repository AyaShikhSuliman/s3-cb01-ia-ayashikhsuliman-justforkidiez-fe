import React, { useState, useEffect } from 'react';
import "./LessonsManagement.css";
import CreateLessonModal from "../Lesson/CreateLesson/CreateLessonModal";
import UpdateLessonModal from "../Lesson/UpdateLesson/UpdateLessonModal";
import { LessonAPI } from '../../apis/LessonAPI';
import TokenManager from '../../apis/TokenManager';
import { useNavigate } from 'react-router-dom';


const LessonsManagement = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    const [lessons, setLessons] = useState([])
    const [lessonFound, setLessonFound] = useState([])
    const [selectedLesson, setSelectedLesson] = useState();
    const navigate = useNavigate()

    const openAndPass = (lesson) => {
        setModalUpdateOpen(true);
        setSelectedLesson(lesson);
    }

    const checkUserRole = () => {
        const claims = TokenManager.getClaims();
        console.log(claims)
        if (claims && claims?.roles?.includes('PARENT')) {
            return false;
        } else if (claims && claims?.roles?.includes('COACH')) {
            return true;
        } else if (!claims) {
            return false;
        }
    }

    const fetchLessons = () => {
        LessonAPI.getAllLessons()
            .then(response => setLessons(response.data.lessons))
    }

    function handleDelete(id) {
        LessonAPI.deleteLesson(id)
            .then(function (response) {
                console.log(response);
            })

        const updatedLessons = lessonFound.filter(lesson => lesson.id !== id)
        setLessonFound(updatedLessons)
    }

    useEffect(() => {
        fetchLessons();
    }, []);

    return (
        <>
            {TokenManager.getAccessToken() && checkUserRole()
                ?
                <div className="lessons_management">

                    <h1>Lesson management</h1>
                    <button className="openModalBtn" onClick={() => { setModalOpen(true); }}>Create lesson</button>
                    {modalOpen && <CreateLessonModal setOpenModal={setModalOpen} />}
                    {modalUpdateOpen && <UpdateLessonModal lesson={selectedLesson} setModalUpdateOpen={setModalUpdateOpen} />}
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Video</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Course</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lessons.length > 0 ? (
                                    lessons.map((lesson, ind) => {
                                        console.log(lessons)
                                        return (
                                            <>
                                                <tr>
                                                    <td>{lesson.id}</td>
                                                    <td>{lesson.video}</td>
                                                    <td>{lesson.image}</td>
                                                    <td>{lesson.title}</td>
                                                    <td>{lesson.description}</td>
                                                    <td>{lesson.course.title}</td>
                                                    <td>{lesson.lessonStatus}</td>
                                                    <td>
                                                        {
                                                            console.log(lesson)
                                                        }
                                                        <button className="btn btn-primary" onClick={() => { openAndPass(lesson) }}>Edit</button>
                                                    </td>
                                                    <td>
                                                        <form>
                                                            <button className='btn btn-danger-delete-lesson' onClick={(e) => handleDelete(lesson.id)} >Delete</button>
                                                        </form>
                                                    </td>
                                                </tr>
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
                                        <td><button className='btn btn-danger-delete'>Delete</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div >
                : navigate('/log-in')
            }
        </>
    );
}

export default LessonsManagement;
