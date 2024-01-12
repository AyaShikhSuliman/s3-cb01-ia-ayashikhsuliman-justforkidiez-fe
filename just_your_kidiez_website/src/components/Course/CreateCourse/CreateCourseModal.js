import "./CreateCourseModal.css";
import { CourseAPI } from '../../../apis/CourseAPI';
import React, { useEffect, useState } from 'react';

function CreateCourseModal(props) {

  const [saveCourse, setSaveCourse] = useState({})
  const destinationUsername = "";

  useEffect(() => {
    props.onUsernameInformed();
  }, []);
  
  function handleSave() {
    CourseAPI.createCourse(saveCourse)
      .then(function (response) {
        window.location.reload();
        props.setDataIsCoach(true)
      })
      .catch(function (error) {
        console.log(error);
      });
    props.onMessageSend({ 'text': 'New course has been added!', 'to': destinationUsername });
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              props.setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <p>Create a course!</p>
        </div>
        <div className="container-create">
          {/* <form> */}
          <label htmlFor="fimage">Image</label>
          <input type="text" id="fimage" name="image" placeholder="An image.." onChange={(e) => { setSaveCourse({ ...saveCourse, image: e.target.value }) }}></input>

          <label htmlFor="lTitle">Title</label>
          <input type="text" id="lTitle" name="title" placeholder="Title.." onChange={(e) => { setSaveCourse({ ...saveCourse, title: e.target.value }) }}></input>

          <label htmlFor="lDescription">Description</label>
          <textarea id="description" name="lDescription" placeholder="Describe the course .." onChange={(e) => { setSaveCourse({ ...saveCourse, description: e.target.value }) }}></textarea>
          {/* </form> */}
        </div>
        <div className="footer">
          <button
            onClick={() => {
              props.setOpenModal(false);
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

export default CreateCourseModal;
