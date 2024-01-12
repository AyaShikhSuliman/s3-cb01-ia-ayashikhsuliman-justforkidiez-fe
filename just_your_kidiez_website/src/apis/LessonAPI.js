import axios from "axios";

const BASE_URL = "http://localhost:8080/";

export const LessonAPI = {
  getAllLessons: function () {
    return axios.get(BASE_URL + "lessons");
  },
  getLessonEntitiesByCourse_Id: function (courseId) {
    return axios.get(BASE_URL + "lessons/lesson/" + courseId);
  },
  getLessonById: function (id) {
    return axios.get(BASE_URL + "lessons/" + id);
  },
  createLesson: function (lesson) {
    return axios.post(BASE_URL + "lessons/", lesson);
  },
  updateLesson: async function (lesson) {
    try {
      const response = await axios
        .put(BASE_URL + "lessons/" + lesson.id, {
          id: lesson.id,
          image: lesson.image,
          video: lesson.video,
          description: lesson.description,
          lessonStatus: lesson.lessonStatus,
          // courseId: lesson.course.id
        });
      console.log("response update", response);
    } catch (error) {
      console.log("error", error);
    }
  },
  deleteLesson: function (id) {
    return axios.delete(BASE_URL + "lessons/" + id);
  }
};
