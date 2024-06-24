import './App.css';
import Cookies from 'universal-cookie';
import { useState, useEffect } from "react";

const BASE_URL = "http://127.0.0.1:8000"

function App() {

  const [nameOfUser, setNameOfUser] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [authToken, setAuthToken] = useState(null)
  const [authTokenType, setAuthTokenType] = useState(null);
  const [userId, setUserId] = useState("");

  // console.log(userId);

  // useEffect(() => {
  //   setAuthToken(window.localStorage.getItem('authToken'));
  //   setAuthTokenType(window.localStorage.getItem('authTokenType'))
  //   setUsername(window.localStorage.getItem('username'))
  //   setUserId(window.localStorage.getItem('userId'))
  // }, [])

  // useEffect(() => {
  //   const cookies = new Cookies();
  //   cookies.get('authToken')
  //   cookies.get('authTokenType')
  //   cookies.get('username')
  //   cookies.get('userId')

  // }, [])

  useEffect(() => {
    const cookies = new Cookies();

    if (authToken != null) {
      window.localStorage.setItem('authToken', authToken)
      cookies.set('authToken', authToken)
    } else {
      // window.localStorage.removeItem('authToken')
      console.log("authToken - " + authToken)
    }

    if (authTokenType != null) {
      window.localStorage.setItem('authTokenType', authTokenType)
      cookies.set('authTokenType', authTokenType)
    } else {
      // window.localStorage.removeItem('authTokenType')
      console.log("authTokenType - " + authTokenType)
    }

    if (username != null) {
      window.localStorage.setItem('username', username)
      cookies.set('username', username)
    } else {
      // window.localStorage.removeItem('username')
      console.log("username - " + username)
    }

    if (userId != null) {
      window.localStorage.setItem('userId', userId)
      cookies.set('userId', userId)
    } else {
      // window.localStorage.removeItem('userId')
      console.log("userId - " + userId)
    }

  }, [authToken, authTokenType, username])

  function userLogin(event) {
    event?.preventDefault();


    // console.log("Login - e.target.value");
    // console.log(LOGIN_URL);
    // console.log(username);
    // console.log(password);

    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const requestOptions = {
      method: 'POST',
      body: formData
    }

    fetch(BASE_URL + '/login', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response
      })
      .then(data => {
        console.log(data);
        setAuthToken(data.access_token)
        setAuthTokenType(data.token_type)
        setUserId(data.user_id)
        setUsername(data.username)
      })
      .catch(error => {
        console.log(error);
        alert(error)
      })

  }

  function userSignUp(event) {
    event?.preventDefault();

    // console.log("Signup - e.target.value");

    const json_string = JSON.stringify({
      name: nameOfUser,
      email: email,
      active: true,
      username: username,
      password: password,
      // access_level: "qa",
    })

    const requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: json_string
    }

    console.log(json_string);
    console.log(requestOption);


    fetch(BASE_URL + '/api/v1/users/?access_level=read_only', requestOption)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response
      })
      .then(data => {
        console.log(data);
        userLogin();
      })
      .catch(error => {
        console.log(error);
        alert(error);
      })
  }

  function performAction(event) {
    event?.preventDefault();

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`, // notice the Bearer before your token
      }
    }

    fetch(BASE_URL + '/api/v1/users/', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
        // alert(error)
      })
  }


  return (
    <div className="App">
      <h1>Form in React</h1>

      <fieldset>

        <form action="#" method="get">

          <label for="name">
            name
          </label>
          <input
            type="text"
            name="nameOfUser"
            id="nameOfUser"
            value={nameOfUser}
            onChange={(e) =>
              setNameOfUser(e.target.value)
            }

            placeholder="Enter Name"
            required
          />

          <label for="email">
            email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }

            placeholder="Enter Email"
            required
          />

          <label for="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }

            placeholder="Enter Username"
            required
          />

          <label for="password">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter Last Name"
            required
          />

          <button
            onClick={(e) => userLogin(e)}
          >
            Login
          </button>


          <button
            onClick={(e) => userSignUp(e)}
          >
            Sign Up
          </button>

          <button
            onClick={(e) => performAction(e)}
          >
            Signed In Activity
          </button>


        </form>
      </fieldset>
    </div>
  );
}

export default App;
