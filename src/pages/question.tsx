import React, { ReactElement, useState } from 'react'
import { Helmet } from 'react-helmet'
import '../styles/question.less';

export default function question(): ReactElement {
    const MAX_LENGTH = 300;
    const [question, setquestion] = useState("");

    const handleSubmit = () => {
      if (question.trim() && question.trim().length <= MAX_LENGTH) {
        window.location.href = `mailto:123@iastate.edu?subject=Code Question&body=${encodeURIComponent(question)}`;
        setquestion("");
        alert("Your question has been submitted, thank you for asking!");
        setquestion("");
      } else if (!question.trim()) {
        alert("Question cannot be empty!");
    } else {
        alert(`Your question must be less than ${MAX_LENGTH} characters!`);
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
