import axios from "axios";
import router from "../router/index";
import store from "../store/index";

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;
let token = localStorage.getItem("userToken");
console.log(token);
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  // If token expired go to login
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        console.log("error 401");
        localStorage.clear("userToken");
        //  we need to dispatch this user to null
        store.dispatch("user", null);
        router.push({ name: "login" });
      }
      return Promise.reject(error);
    }
  );
}