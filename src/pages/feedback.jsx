import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import '../styles/feedback.less';
import { getDatabase, ref, onValue, push } from 'firebase/database';

export default function Feedback() {
  const MAX_LENGTH = 300;
  const MAX_NICKNAME_LENGTH = 20;
  const [feedback, setFeedback] = useState("");
  const [nickname, setNickname] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [lastSubmitTime, setLastSubmitTime] = useState(null);

  useEffect(() => {
    const database = getDatabase();
    const feedbackRef = ref(database, 'feedback');

    onValue(feedbackRef, (snapshot) => {
      const feedbackData = snapshot.val();
      const feedbackArray = [];
      for (let key in feedbackData) {
        feedbackArray.push({ id: key, ...feedbackData[key] });
      }
      setFeedbackList(feedbackArray.reverse());
    });
  }, []);

  const handleSubmit = () => {
    const currentTime = Date.now();
    const oneMinute = 60000;

    if (lastSubmitTime && currentTime - lastSubmitTime < oneMinute) {
      alert("You can only submit feedback once every minute.");
      return;
    }

    if (nickname.trim().length > MAX_NICKNAME_LENGTH) {
      alert("Nickname is too long.");
      return;
    }

    if (feedback.trim() && feedback.trim().length <= MAX_LENGTH) {
      const database = getDatabase();
      const feedbackRef = ref(database, 'feedback');
      const newFeedback = {
        nickname: nickname.trim(), 
        content: feedback.trim(),
        timestamp: new Date().toISOString()
      };
      push(feedbackRef, newFeedback)
        .then(() => {
          alert("Your feedback has been submitted, thank you!");
          setFeedback("");
          setNickname("");
          setLastSubmitTime(currentTime);
        })
        .catch((error) => {
          console.error("Error submitting feedback:", error);
          alert("Error submitting feedback.");
        });
    } else {
      alert(`Your feedback must be less than ${MAX_LENGTH} characters!`);
    }
  };

  return (
    <div className="feedback-page">
      <Helmet title='Feedback - Sound of Code' />
      <h3>Do you have anything to share?</h3>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Enter your nickname..."
        maxLength={MAX_NICKNAME_LENGTH}
      />
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Please share your feedback here..."
        maxLength={MAX_LENGTH}
      />
      <button onClick={handleSubmit}>Submit Feedback</button>
      <div className="feedback-list">
        {feedbackList.map((feedbackItem) => (
          <div key={feedbackItem.id} className="feedback-item">
            <div className="feedback-nickname">Nickname: {feedbackItem.nickname}</div>
            <div className="feedback-content">Feedback: {feedbackItem.content}</div>
            <div className="feedback-timestamp">{feedbackItem.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
