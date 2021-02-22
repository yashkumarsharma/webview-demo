import React, {useState} from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  const [title, saveTitle] = useState('')

  const handleSubmit = () => {
    console.log('Got title', title)
    window.postMessage(title);
  }

  const handleChange = e => saveTitle(e?.target?.value || '')

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          Update Header Title from Webview: <br />
          <input type="text" value={title} onChange={handleChange} />
          <input type="submit" value="Submit" /><br />
        </form>
      </header>
    </div>
  );
}

export default App;
