/* Register Page:
    On Register Page we will show a form for user to enter name, email, password
    We will send those information by using axios, and receive in our server-side in req.body
    Then our server-side will save that user in database
*/

import { useState } from "react";
import { toast } from "react-toastify";
import RegisterForm from "../components/RegisterForm";
import { register } from "../actions/auth";

const Register = ({ history }) => {
  //create a state:
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //'submit' button event handler
  const handleSubmit = async (event) => {
    event.preventDefault(); //make sure when click the button, the page will not reload

    try {
      const res = await register({
        //the request information will be stored in 'request.body' in the server side
        name: name,
        email: email,
        password: password,
      });

      console.log("Register a user: ", res);
      toast.success("Registration success!");
      history.push("/login");
    } catch (error) {
      console.log("Error:", error.response.data);
      toast.error("Registration Failed: " + error.response.data);
    }
  };

  //------------------------------------return----------------------------------
  return (
    <>
      <div className="container-fluid p-5 text-center bg-secondary">
        <h1>Register</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <RegisterForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
