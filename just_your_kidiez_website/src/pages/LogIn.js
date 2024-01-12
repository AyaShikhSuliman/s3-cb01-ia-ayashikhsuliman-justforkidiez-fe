import React, { useState, useEffect } from 'react';
import '../App.css';
import LoginForm from '../components/LoginForm';
import AuthAPI from '../apis/AuthAPI';
import TokenManager from '../apis/TokenManager';
import ParentAPI from '../apis/ParentAPI';
import ParentDetailsComponent from '../components/ParentDetails';

function LogIn(props) {
  const [claims, setClaims] = useState(TokenManager.getClaims());
  const [parentDetails, setParentDetails] = useState(null);

  const handleLogin = (username, password) => {
    AuthAPI.login(username, password)
      .catch(() => alert("Login failed!"))
      .then(claims => {
        setClaims(claims)
        console.log(claims)
        if (claims?.roles?.includes('PARENT') && claims?.parentId) {
          console.log('parent')
          getParentDetails(claims.parentId)
        } else {
          console.log('couch')
          props.setDataIsCoach(true)
        }
      })
      .catch(error => console.error(error));
  }
  const getParentDetails = (pId) => {
    ParentAPI.getParent(pId)
      .then(parent => setParentDetails(parent))
      .catch(error => console.error(error));
  }

  const handleLogout = () => {
    props.setDataIsCoach(false)
    setParentDetails(null)
    TokenManager.clear();
    setClaims(null);
  }

  useEffect(() => {
    // console.log(setDataIsCouch)
    if (claims) {
      getParentDetails(claims.parentId)
    }
  }, [claims]);
  
  return (
    <div>
      {claims ? 
      (
        <div>
          <p>Welcome, {claims.sub}</p>
          {parentDetails &&
            <ParentDetailsComponent parentDetails={parentDetails} />
          }
          <button className='openModalBtn' onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <LoginForm onLogin={handleLogin} />

      )}
    </div>
  );
}

export default LogIn;