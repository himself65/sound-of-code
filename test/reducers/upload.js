import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

export default function UploadMusic() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    
    alert("File is ready to be uploaded!");
  };

  return (
    <div className="upload-music-page">
      <Helmet title='Upload Music - Sound of Code' />
      
      <h3>Upload your music</h3>
      
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="audio/*" />
        {file && <p>File ready to upload: {file.name}</p>}
        <button type="submit">Upload Music</button>
      </form>
    </div>
  );
}
