import axios from "axios";

const BASE_URL = "http://localhost:8080/";

const SignUpAPI = {
    createParent: async function (props) {
        console.log("response create")
        try {
            const response = await axios
                .post(BASE_URL + "parents/", {
                    name: props.name,
                    last_name: props.last_name,
                    age: props.age,
                    phone_number: props.phone_number,
                    email_address: props.email_address,
                    country: props.country,
                    password: props.password
                });
            console.log(response);
        } catch (error) {
            console.log("error", error);
        }
    }
}

export default SignUpAPI;

