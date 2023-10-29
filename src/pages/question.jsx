import React, { useState }  from 'react'
import { Helmet } from 'react-helmet'
import '../styles/feedback.less';

export default function question() {
    const [question, setquestion] = useState("");
  
    const handleSubmit = () => {
      if (question) {
        // 在此处添加发送反馈到服务器的代码
        alert("Your question has been submitted, thank you for asking!");
        setquestion("");
      } else {
        alert("Question cannot be empty!");
      }
    };
  
    return (
      <div className="question-page">
        <Helmet title='question - Sound of Code' />
        
        <h3>Do you have a coding question to ask?</h3>
        <textarea
          value={question}
          onChange={(e) => setquestion(e.target.value)}
          placeholder="Please enter your code issue here..."
        />
        <button onClick={handleSubmit}>Submit a question</button>
      </div>
    );
  }