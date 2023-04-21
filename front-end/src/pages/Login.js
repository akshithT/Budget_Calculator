import React, { useState ,useEffect} from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
// import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import './index.css';
//import "bootstrap/dist/css/bootstrap.min.css";
import split from './split.gif'
import ClipLoader from "react-spinners/CircleLoader";
import { useHistory } from 'react-router-dom'

function Login() {

  const [justifyActive, setJustifyActive] = useState('tab1');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showComponent, setShowComponent] = useState(false);
  const [errorEmail, setError] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [invalidDetails, setInvalidDetails] = useState(null);
  //const navigate = useNavigate();
  const history = useHistory();
  const [inputs, setInputs] = useState({
    // name: "",
    username:"",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = event => {
    console.log("user input:" + event.target.name);
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    });
    console.log(inputs);
  };

  // useEffect(() => {
  //   validateForm();
  // }, [inputs]);

  const validateForm = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    let newErrors = {};
    // if (!inputs.name) {
    //   newErrors.name = "Name is required";
    // }
    if (!inputs.username) {
      newErrors.username = "UserName is required";
    }
    if (!inputs.email) {
      newErrors.email = "Email is required";
    }
    else if(!emailRegex.test(inputs.email)){
      console.log(emailRegex.test(inputs.email));
      newErrors.email = "Invalid Email";
    }
    
    if (!inputs.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return newErrors;
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
   const errorsForm =  validateForm();
    if(Object.keys(errorsForm).length === 0) {
      console.log("Register api called");
      fetch("http://localhost:5000/www/Register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username:inputs.username,
          email: inputs.email ,
          password: inputs.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log({data});
          if (data) {
            console.log("if loop entered");
            setErrors(null);
            setShowComponent(true);
            setJustifyActive("tab1");
            console.log(data);
          } else {
            setInvalidDetails("Invalid login credentials"); // set the error message
          }
        });
    } 
    console.log({errorsForm});
  };
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  const handleChangeEmail = (event) =>{
    setEmail(event.target.value);
  }
  const handleChangePassword = (event) =>{
    setPassword(event.target.value);
  }
  const handleSubmit = () => {
    if(email === ""){
      setError("Please enter Email address.");
    }
     if(password === ""){
      setErrorPassword("Please enter Password.");
    }
    else {
      fetch("http://localhost:5000/www/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name:"",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log({data});
          if (data.userId) {
            setErrors(null);
            localStorage.setItem('user_data',JSON.stringify(data));
            setShowComponent(true);
            history.push("/dashboard");
            
            //navigate('/dashboard');
            //console.log(data);
          } else {
            setInvalidDetails("Invalid login credentials"); // set the error message
          }
        });
    }
   console.log(email);
   console.log(password);
  };
console.log(inputs.username);
console.log({justifyActive})
  return (
    <>
      <div className='header'>
      <h1>Budget Planner</h1>
      </div>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBTabs
          pills
          justify
          className="mb-3 d-flex flex-row justify-content-between"
        >
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab1")}
              active={justifyActive === "tab1"}
            >
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab2")}
              active={justifyActive === "tab2"}
            >
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === "tab1"}>
            <MDBInput
              wrapperClass="mb-4"
              value={email}
              placeholder="Email address"
              id="email"
              type="email"
              onChange={handleChangeEmail}
            />
            {errorEmail && <p style={{ color: "red" }}>{errorEmail}</p>}
            <MDBInput
              wrapperClass="mb-4"
              id="password"
              value={password}
              type="password"
              placeholder="Password"
              onChange={handleChangePassword}
            />
            {errorPassword && <p style={{ color: "red" }}>{errorPassword}</p>}
            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#">Forgot password?</a>
              
            </div>
            {invalidDetails && <p style={{ color: "red" }}>{invalidDetails}</p>}

            <MDBBtn className="mb-4 w-100" onClick={handleSubmit}>
              Sign in
            </MDBBtn>
            <p className="text-center">
              Not a member?{" "}
              <a
                href="#"
                onClick={() => handleJustifyClick("tab2")}
                active={justifyActive === "tab2"}
              >
                Register
              </a>
            </p>
          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === "tab2"}>
            <form onSubmit={handleRegisterSubmit}>
              {/* <MDBInput
                wrapperClass="mb-4"
                placeholder="Name"
                id="nameRegister"
                value={inputs.name}
                type="text"
                name='name'
                onChange={handleInputChange}
              />
               {errors.name && <div style={{ color: "red" }}>{errors.name}</div>} */}
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Username"
                value={inputs?.username}
                id="usernameRegister"
                type="text"
                name="username"
                onChange={handleInputChange}
              />
               {errors?.username && <div style={{ color: "red" }}>{errors.username}</div>}
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Email"
                value={inputs.email}
                id="emailRegister"
                type="text"
                name="email"
                onChange={handleInputChange}
              />
              {errors?.email && <div style={{ color: "red" }}>{errors.email}</div>}
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Password"
                id="passwordRegister"
                value={inputs.password}
                type="password"
                name="password"
                onChange={handleInputChange}
              />
               {errors?.password && <div style={{ color: "red" }}>{errors.password}</div>}

              <div className="d-flex justify-content-center mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  id="flexCheckDefault"
                  label="I have read and agree to the terms"
                />
              </div>

              <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
            </form>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    </>
  );
}

export default Login;