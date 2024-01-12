import axios from "axios";

const BASE_URL = "http://localhost:8080/";

export const CourseAPI = {
  getAllCourses: function () {
    return axios.get(BASE_URL + "courses");
  },
  getAllCoursesWithNumberOfLessons: function () {
    return axios.get(BASE_URL + "courses/coursesWithNumber");
  },
  createCourse: async function (props) {
    console.log("response create")
    try {
      const response = await axios
        .post(BASE_URL + "courses/", {
          image: props.image,
          title: props.title,
          description: props.description,
        });
      console.log(response);
    } catch (error) {
      console.log("error", error);
    }
  },

  updateCourse: async function (course) {
    console.log("course update from api", course)
    try {
      const response = await axios
        .put(BASE_URL + "courses/" + course.id, {
          id: course.id,
          image: course.image,
          description: course.description,
        });
      console.log("response update", response);
    } catch (error) {
      console.log("error", error);
    }
  },
  deleteCourse: function (id) {
    return axios.delete(BASE_URL + "courses/" + id);
  },
  getCourseById: function (id) {
    return axios.get(BASE_URL + "courses/" + id);
  },
};
