import React, { useState, useRef, useEffect } from 'react';

const ReadMoreText = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current.scrollHeight > 125) {
      setShowReadMore(true);
    }
  }, [text]);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div
        ref={textRef}
        style={{
         maxHeight: isExpanded ? 'none' : '125px',
          overflow: 'hidden',
          position: 'relative', 
        }}
      >
        {text}
      </div>
      {showReadMore && (
        <div className="read-more" onClick={toggleReadMore}>
          {isExpanded ? 'Read less' : 'Read more'}
        </div>
      )}
    </div>
  );
};

export default ReadMoreText;