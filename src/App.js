import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  const [title, saveTitle] = useState('')

  // useEffect(() => {
  //   window.addEventListener("message", function(data) {
  //     alert(data.data);
  //     saveTitle(title);
  //   });
  // }, []);
    
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Got title', title)
    window.postMessage(title);
  }

  const handleChange = e => saveTitle(e?.target?.value || '')

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          Demo Input: <br />
          <input type="text" value={title} onChange={handleChange} />
          <input type="submit" value="Submit" /><br />
        </form>
      </header>
    </div>
  );
}

export default App;
