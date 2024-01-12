import "./UpdateLessonModal.css";
import React, { useState } from 'react';
import { LessonAPI } from "../../../apis/LessonAPI";

function UpdateLessonModal({ setModalUpdateOpen, lesson }) {

  const [updatedLesson, setUpdatedLesson] = useState();

  const saveLesson = (updatedLesson, id, lessonStatus) => {
    updatedLesson['id'] = id
    updatedLesson['lessonStatus'] = lessonStatus
    LessonAPI.updateLesson(updatedLesson)
    .then(function (response) {
      console.log(response);
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
}

  return (
    <div className="modalBackgroundUpdate">
      <div className="modalContainerUpdate">
          <div className="titleCloseBtnUpdate">
            <button
              onClick={() => {
                setModalUpdateOpen(false);
              }}
            >
              X
            </button>
          </div>
          <div className="titleUpdate">
            <p>Update the selected lesson!</p>
          </div>
          <div className="containerUpdate">
            <form>
            <label htmlFor="fimage">Image</label>
              <input type="text" id="fimage" name="image" placeholder={lesson.image} onChange={(e) => { setUpdatedLesson({ ...updatedLesson, image: e.target.value }) }}></input>

              <label htmlFor="fvideo">Video</label>
              <input type="text" id="fvideo" name="video" placeholder={lesson.video} onChange={(e) => { setUpdatedLesson({ ...updatedLesson, video: e.target.value }) }}></input>

              <label htmlFor="lDescription">Description</label>
              <textarea id="description" name="lDescription" placeholder={lesson.description} onChange={(e) => { setUpdatedLesson({ ...updatedLesson, description: e.target.value }) }}></textarea>
              
            </form>
          </div>
          <div className="footerUpdate">
            <button
              onClick={() => {
                setModalUpdateOpen(false);
              }}
              id="cancelBtnUpdate"
            >
              Cancel
            </button>
            <button  onClick={(e) => saveLesson(updatedLesson, lesson.id, lesson.lessonStatus)}>Save</button>
          </div>
        </div>
    </div >
  );
}

export default UpdateLessonModal;
