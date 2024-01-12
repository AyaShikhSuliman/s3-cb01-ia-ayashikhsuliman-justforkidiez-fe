import axios from "axios";
import TokenManager from "./TokenManager";

const BASE_URL = "http://localhost:8080/";

const CoachAPI = {
  getCoach: (coachId) => axios.get(`http://localhost:8080/coaches/${coachId}`,
    {
      headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    })
    .then(response => response.data)
}

export default CoachAPI;