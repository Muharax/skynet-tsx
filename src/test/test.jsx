import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faHeart } from '@fortawesome/free-solid-svg-icons';
import './test.css';

const Test = () => {
  const [tweetContent, setTweetContent] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleSendTweet = () => {
    // Tutaj możesz dodać logikę wysyłania tweeta
    console.log(`Wysyłam tweet: ${tweetContent}`);
  };

  const handleContentChange = (e) => {
    const content = e.target.value.slice(0, 255); // Ogranicz treść tweeta do 255 znaków
    setTweetContent(content);
  };

  return (
    <div className="tweet-container">
      <div className="tweet-content">
        {/* Pole tekstowe do wpisywania treści tweeta */}
        <textarea
          value={tweetContent}
          onChange={handleContentChange}
          placeholder="Napisz swój tweet..."
          maxLength={255}
        />
      </div>
      <div className="tweet-actions">
        {/* Przycisk Wyślij */}
        <button className="send-button" onClick={handleSendTweet}>
          Wyślij
        </button>

        {/* Przycisk Dodaj załącznik */}
        <FontAwesomeIcon icon={faPaperclip} className="icon" />

        {/* Przycisk Dodaj do zakładek */}
        <FontAwesomeIcon
          icon={faHeart}
          className={`icon ${isBookmarked ? 'bookmarked' : ''}`}
          onClick={handleBookmarkClick}
        />
      </div>
    </div>
  );
}

export default Test;
