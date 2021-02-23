import React, {useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';

const gobalWebview = window ?? global?.window

function App() {
  const [title, saveTitle] = useState('')

  useEffect(() => {
    alert('in componentdidmount', global?.window?.testMessage || 'Not Found')
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          Demo Input: {global?.window?.testMessage || 'Not Found'}<br />
          <input type="text" value={title} onChange={handleChange} />
          <input type="submit" value="Submit" /><br />
        </form>
      </header>
    </div>
  );
}

export default App;
