import React, { useState } from "react";

export default function MusicUpload() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files).map((file) => file.name);
    setUploadedFiles(uploadedFiles.concat(files));
  };

  return (
    <div>
      <h2>Upload Music</h2>
      <input
        type="file"
        accept="audio/*"
        multiple
        onChange={handleFileUpload}
      />

      {uploadedFiles.length > 0 && (
        <div>
          <h4>Uploaded Music Files</h4>
          <ul>
            {uploadedFiles.map((fileName, index) => (
              <li key={index}>{fileName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
