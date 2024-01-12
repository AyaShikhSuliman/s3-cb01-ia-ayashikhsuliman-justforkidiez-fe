import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LessonAPI } from '../../apis/LessonAPI';
import './LessonInformation.css';
import TokenManager from '../../apis/TokenManager'


const LessonInformation = () => {

    let { id } = useParams();
    const [lesson, setLesson] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        LessonAPI.getLessonById(id)
            .then(res => {
                return res.data;
            })
            .then((response) => {
                setLesson(response);
            },
                (err) => {
                    return navigate('/log-in')
                })
    }, [])

    const saveLesson = (lesson) => {
        lesson.lessonStatus = "FINISHED";
        LessonAPI.updateLesson(lesson)
            .then(function (response) {
                console.log(response)
                alert('You finished the lesson successfully!'); 
                window.location = 'http://localhost:3000/courses';
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    return (
        <>
            <h1 className='h1'>Lesson {lesson.id}</h1>
            {TokenManager.getAccessToken()
                ?
                <div>
                    <div className="container-video" >
                        <iframe className="responsive-iframe" src={lesson.video}></iframe>
                    </div>
                    <button className='btn-finsih' onClick={(e) => saveLesson(lesson)} >FINISH</button>
                </div>
                : navigate('/log-in')
            }

        </>
    )
}

export default LessonInformation
