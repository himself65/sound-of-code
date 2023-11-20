import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MusicUpload from './MusicUpload';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/upload-music" component={MusicUpload} />
      </Switch>
    </Router>
  );
  return (
    <React.Fragment>
      <div className='row'>
        <h3 className='col-md-offset-1 col-md-10'>Sound Table</h3>
      </div>
      <div className='row'>
        <div className='col-md-offset-1 col-md-10'>
          <input type="file" accept="audio/*" multiple onChange={handleFileUpload} />
          {uploadedFiles.map((fileName, index) => (
            <div key={index}>{fileName}</div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
