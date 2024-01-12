import "./CreateLessonModal.css";
import { LessonAPI } from '../../../apis/LessonAPI';
import React, { useState, useEffect } from 'react';
import { CourseAPI } from "../../../apis/CourseAPI";

function CreateLessonModal({ setOpenModal }) {

    const [saveLesson, setSaveLesson] = useState({})
    const [courses, setCourses] = useState([])


    function handleSave() {
        LessonAPI.createLesson(saveLesson)
            .then(function (response) {
                console.log(response);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const fetchCourses = () => {
        CourseAPI.getAllCourses()
            .then(response => setCourses(response.data.courses))
    }

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="input">
                    <p>Write something to create a lesson!</p>
                </div>
                <div className="container-create">
                    <form>
                        <label htmlFor="fimage">Image</label>
                        <input type="text" id="fimage" name="image" placeholder="An image.." onChange={(e) => { setSaveLesson({ ...saveLesson, image: e.target.value }) }}></input>

                        <label htmlFor="fimage">Video</label>
                        <input type="text" id="fvideo" name="video" placeholder="A video.." onChange={(e) => { setSaveLesson({ ...saveLesson, video: e.target.value }) }}></input>

                        <label htmlFor="lTitle">Title</label>
                        <input type="text" id="lTitle" name="title" placeholder="Title.." onChange={(e) => { setSaveLesson({ ...saveLesson, title: e.target.value }) }}></input>

                        <label htmlFor="lDescription">Description</label>
                        <textarea id="description" name="lDescription" placeholder="Describe the course .." onChange={(e) => { setSaveLesson({ ...saveLesson, description: e.target.value }) }}></textarea>
                        <select aria-label="Default select example" onChange={(e) => {
                            setSaveLesson({ ...saveLesson, courseId: e.target.value });
                        }}>
                            <option>Choose course</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id} >{course.title}</option>
                            ))}
                        </select>
                    </form>
                </div>
                <div className="footer">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                        id="cancelBtn"
                    >
                        Cancel
                    </button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default CreateLessonModal;
