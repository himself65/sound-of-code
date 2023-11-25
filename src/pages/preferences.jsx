import React, { useState } from 'react'
import { Helmet } from 'react-helmet'

import PlaybackControls from '../components/PlaybackControls'
import SoundTable from '../components/SoundTable'
import '../styles/main.less';
import '../styles/preferences.less';

export function Preferences () {
  const [darkMode, setDarkMode] = useState(false);

  const [uploadedSounds, setUploadedSounds] = useState([]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newSound = {
          name: file.name,
          data: e.target.result
        };
        setUploadedSounds([...uploadedSounds, newSound]);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <React.Fragment>
      <Helmet title='Preferences | Sound of Code' />

      <div className='row'>
        <h1 className='col-md-offset-1 col-md-10'>
          Preferences
          <button 
            onClick={toggleDarkMode} 
            className="dark-mode-toggle">
            {darkMode ? 'Day Mode' : 'Night Mode'}
          </button>
        </h1>
      </div>

      <br></br>

      <div className='row'>
        <div className='col-md-offset-1 col-md-10'>
        <p>In the preferences page you can see the sounds that correspond to each operation of the code. You can also adjust the Theme from
          from Default to Easy Listening depending on what your preference is. It's a good idea to listen to each sound in preferences before
          you run your code so it's easier to recognize the sounds and their meaning.
        </p>
        </div>
      </div>

      <br></br>
      
      <div className='row'>
        <div className='col-lg-offset-3' />
        <button 
          className="upload"
          onClick={() => document.getElementById('fileUpload').click()} 
        >
          Upload
        </button>
        <input
          id="fileUpload"
          type="file"
          accept="audio/*"
          onChange={handleUpload}
          style={{ display: 'none' }}
        />
        <PlaybackControls />
      </div>
      
      <SoundTable uploadedSounds={uploadedSounds} />
    </React.Fragment>
  )
}

export default Preferences
