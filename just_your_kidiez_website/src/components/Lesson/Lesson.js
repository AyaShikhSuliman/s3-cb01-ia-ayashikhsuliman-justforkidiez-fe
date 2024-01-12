import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LessonAPI } from '../../apis/LessonAPI';
import LessonItem from './LessonItem'
import './Lesson.css';
import TokenManager from '../../apis/TokenManager'


const Lesson = () => {

    const navigate = useNavigate()

    let { id } = useParams();

    const [lessons, setLessons] = useState([])

    const fetchLessons = () => {
        LessonAPI.getLessonEntitiesByCourse_Id(id)
            .then(response => setLessons(response.data.lessons))
    }

    // const checkUserRole = () => {
    //     const claims = TokenManager.getClaims();
    //     console.log(claims)
    //     if (claims && claims?.roles?.includes('PARENT')) {
    //         return true;
    //     } else if (claims && claims?.roles?.includes('COACH')) {
    //         return true;
    //     } else if (!claims) {
    //         return false;
    //     }
    // }

    useEffect(() => {
        if (id !== '') {
            fetchLessons()
        }
        else {
            setLessons([])
        }
    }, [id])

    return (
        <>
            <h1>Check out these lessons!</h1>
            {TokenManager.getAccessToken() 
                ?
                <div className='lesson'>
                    <div className='lesson__container'>
                        <div className='lesson__wrapper' style={{ display: 'flex' }}>
                            {
                                lessons.length > 0 ? (
                                    lessons.map((lesson, ind) => {
                                        if (lesson.lessonStatus === "FINISHED") {
                                            return (
                                                <ul className='lesson__items'>
                                                    <LessonItem
                                                        id={lesson.id}
                                                        src={lesson.image}
                                                        text={lesson.description}
                                                        label={lesson.lessonStatus}
                                                        path='/lesson_details'
                                                    />
                                                </ul>
                                            );
                                        }
                                        else {
                                            return (

                                                <ul className='lesson__items'>
                                                    <LessonItem
                                                        id={lesson.id}
                                                        src={lesson.image}
                                                        text={lesson.description}
                                                        label={''}
                                                        path='/lesson_details'
                                                    />
                                                </ul>
                                            );
                                        }
                                    }
                                    )
                                ) : (
                                    <ul className='lesson__items'>
                                        <LessonItem
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
                : navigate('/log-in')
            }
        </>)
}

export default Lesson
