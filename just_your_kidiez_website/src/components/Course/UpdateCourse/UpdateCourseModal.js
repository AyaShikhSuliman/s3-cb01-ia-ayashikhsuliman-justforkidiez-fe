import "./UpdateCourseModal.css";
import React, { useState } from 'react';
import { CourseAPI } from "../../../apis/CourseAPI";

function UpdateCourseModal({ setModalUpdateOpen, course }) {

  const [updatedCourse, setUpdatedCourse] = useState();

  const saveCourse = (updatedCourse, id) => {
    updatedCourse['id'] = id
    CourseAPI.updateCourse(updatedCourse)
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
        <p>Update the selected course!</p>
      </div>
      <div className="containerUpdate">
        <form>
          <label htmlFor="fimage">Image</label>
          <input type="text" id="fimage" name="image" placeholder={course.image} onChange={(e) => { setUpdatedCourse({ ...updatedCourse, image: e.target.value }) }} ></input>

          <label htmlFor="lDescription">Description</label>
          <textarea id="description" name="lDescription" placeholder={course.description} onChange={(e) => { setUpdatedCourse({ ...updatedCourse, description: e.target.value }) }} ></textarea>
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
        <button onClick={(e) => saveCourse(updatedCourse, course.id)}>Save</button>
      </div>
    </div>
  </div >
);
}

export default UpdateCourseModal;
