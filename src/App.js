import React, {useEffect, useState} from 'react'

import Api from './api';

import './App.css';
import logo from './logo.svg';


const gobalWebview = window ?? global?.window

const findGetParameter = (parameterName) => {
  var result = null,
      tmp = [];
  window.location.search
      .substr(1)
      .split("&")
      .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
  return result;
}


// token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYjYwYzZmZDItYmI0YS00NWZlLWFkZGUtNzU3MzFmNmM1OGM0In0sImlhdCI6MTYxNDA2MTEzNX0.1AKaPqiA-4Q3fiYQZdRd68hoTRem1N2y1ztL5la3V_U

function App() {
  const [title, saveTitle] = useState('')
  const [workspaces, setWorkspaces] = useState([])

  useEffect(() => {
    const token = findGetParameter('token')
    console.log('Getting token', findGetParameter('token'))
    if(!token) return
    const getWorkSpaces = async () => {
      const response = await Api.get('workspaces', { token })
      setWorkspaces(response?.data || [])
    }
    getWorkSpaces()
  }, [])

  // useEffect(() => {
  //   window.addEventListener("message", function(data) {
  //     alert(data.data);
  //     saveTitle(title);
  //   });
  // }, []);
    
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Got title', title)
    gobalWebview.postMessage(title);
  }

  const handleChange = e => saveTitle(e?.target?.value || '')

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          Demo Input: {global?.window?.testMessage || 'Not Found'}<br />
          <input type="text" value={title} onChange={handleChange} />
          <input type="submit" value="Submit" /><br />
        </form>
      </header> */}
      Workspaces found
      <ul>
        {workspaces.map(workspace => {
          const {id, spaceName} = workspace;
          return (
            <li key={id}>{spaceName}</li>
          )
        })}

      </ul>
    </div>
  );
}

export default App;
