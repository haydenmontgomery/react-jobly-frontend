import React, { useEffect, useState } from 'react'
import JoblyApi from './helpers/Api'
import './App.css'
import background from "./assets/WoodBG.jpg"
import NavBar from './NavBar'
import RouteList from './RouteList';
 // @ts-ignore  
import { jwtDecode } from "jwt-decode"
import LoadingSign from './common/LoadingSign'
import useLocalStorageState from './hooks/useLocalStorageState'
import UserContext from './UserContext'

export const TOKEN_STORAGE = "react-token";


/*  Jobly App  
 *  App for applying to jobs.
 *  User can search companies by name to find a company's page and listed jobs
 *  User can also fileter jobs by job title and apply to the jobs listed.
*/

function App() {

  const [token, setToken] = useLocalStorageState(TOKEN_STORAGE);
  const [applicationIds, setApplicationIds] = useState(new Set([]))
  const [currentUser, setCurrentUser] = useState({
    data: null,
    infoLoaded: false
  });

  useEffect(
    function loadUser() {
      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = jwtDecode(token)
            JoblyApi.token = token;
            let currentUser = await JoblyApi.getCurrentUser(username);
            setCurrentUser({
              infoLoaded: true,
              data: currentUser
            });
            setApplicationIds(new Set(currentUser.applications));
          } catch (err) {
            console.log("ERR STATEMENT", err)
            setCurrentUser({
              data: null,
              infoLoaded: true,
            });
          }
        } else {
          console.log("ELSE STATEMENT")
          setCurrentUser({
            infoLoaded: true,
            data: null
          });
        }
      }
      getCurrentUser();
      //Checks token change
    }, [token]);


  // Signup funciton. Calls the signup request on our api and sets the current token to the user.
  async function signupUser(signupData) {
    let token = await JoblyApi.signUp(signupData);
    setToken(token);
  }

  // login funciton. Calls the login request on our api and sets the current token to the user.
  async function loginUser(loginData) {
    const token = await JoblyApi.loginUser(loginData);
    setToken(token);
  }

  // Handles logging out.
  function logout() {
    setApplicationIds(new Set([]));
    setCurrentUser({
      infoLoaded: true,
      data: null
    });
    setToken(null);
  }

  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  /** Apply to a job: make API call and update set of application IDs. */
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.data.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  // Spinner display while loading or if it loads at all.
  if (!currentUser.infoLoaded) return <LoadingSign />;
  return (
    <UserContext.Provider
      value={{
        currentUser: currentUser.data,
        setCurrentUser,
        hasAppliedToJob,
        applyToJob,
      }}
    >
    <div style={{backgroundImage: `url(${background})`,
                 backgroundRepeat: "no-repeat",
                 backgroundPosition: "center",
                 backgroundSize: "cover",
                 backgroundAttachment: "fixed",
                 height: "100%"}}>
    <main>
    <NavBar logout={logout} />
      <RouteList currentUser={currentUser.data} loginUser={loginUser} signupUser={signupUser} ></RouteList>
    </main>
    </div>
    </UserContext.Provider>
  )
}

export default App
