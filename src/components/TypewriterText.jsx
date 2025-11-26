import React, { useState, useEffect } from 'react';

const TypewriterText = ({ text, speed = 50 }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    
    useEffect(() => {
        if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
            setDisplayText(prev => prev + text[currentIndex]);
            setCurrentIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed]);
    
    useEffect(() => {
        const interval = setInterval(() => {
        setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <span>
        {displayText}
        <span style={{ opacity: showCursor ? 1 : 0, color: '#00ffc8' }}>|</span>
        </span>
    );
};

export default TypewriterText;