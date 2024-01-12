import axios from "axios";
import TokenManager from "./TokenManager";

const BASE_URL = "http://localhost:8080/";

const ParentAPI = {
  getParent: (parentId) => axios.get(`http://localhost:8080/parents/${parentId}`,
    {
      headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    })
    .then(response => {
      return response.data
    })
}

export default ParentAPI;