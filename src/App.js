import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import './App.css';
import { FaSun, FaMoon, FaShare, FaDownload } from 'react-icons/fa';
import html2canvas from 'html2canvas';

// Birthday card image - using a reliable image URL
const birthdayImage = "https://www.pngmart.com/files/1/Birthday-Cake-PNG-File.png";

// Birthday tune
const birthdayTune = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

// Birthday messages array
const birthdayMessages = [
  "Wishing you a day filled with happiness and a year filled with joy!",
  "Hope your special day brings you all that your heart desires!",
  "May your birthday be as special as you are!",
  "Another adventure-filled year awaits you. Welcome it by celebrating your birthday with pomp and splendor!",
  "Count not the candles, see the light they give. Count not the years, but the life you live!",
  "May the joy that you have spread in the past come back to you on this day!",
  "Sending you smiles for every moment of your special day!",
  "Hope your day is filled with fun and celebration!",
  "Wishing you a beautiful day with joy and happiness!",
  "May all life's blessings be yours, on your birthday and always!"
];

// Background themes by month
const backgroundThemes = {
  '01': { background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', color: '#333' }, // January
  '02': { background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: '#fff' }, // February
  '03': { background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)', color: '#333' }, // March
  '04': { background: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)', color: '#333' }, // April
  '05': { background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', color: '#333' }, // May
  '06': { background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)', color: '#333' }, // June
  '07': { background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', color: '#333' }, // July
  '08': { background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: '#333' }, // August
  '09': { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }, // September
  '10': { background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', color: '#333' }, // October
  '11': { background: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)', color: '#333' }, // November
  '12': { background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', color: '#333' }  // December
};

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showWish, setShowWish] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [birthdayDate, setBirthdayDate] = useState('');
  const [backgroundTheme, setBackgroundTheme] = useState({
    background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    color: '#333'
  });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [darkMode, setDarkMode] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const wishCardRef = useRef(null);
  const audioRef = useRef(null);

  // Handle window resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate time remaining for birthday
  useEffect(() => {
    if (!countdown) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdown - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeRemaining("It's your birthday today!");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Set background theme based on selected month
  useEffect(() => {
    if (birthdayDate) {
      const month = birthdayDate.split('-')[1]; // Extract month from YYYY-MM-DD
      if (backgroundThemes[month]) {
        setBackgroundTheme(backgroundThemes[month]);
      }
    }
  }, [birthdayDate]);

  // Generate random birthday message
  const generateMessage = () => {
    const randomIndex = Math.floor(Math.random() * birthdayMessages.length);
    return birthdayMessages[randomIndex];
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') return;

    // Play birthday tune
    try {
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log("Audio play failed:", err));
      }
    } catch (error) {
      console.log("Audio error:", error);
    }

    // Set random message
    setMessage(generateMessage());
    setShowWish(true);
    setImageLoaded(false); // Reset image loaded state

    // Set countdown if birthday date is provided
    if (birthdayDate) {
      const targetDate = new Date(birthdayDate).getTime();
      setCountdown(targetDate);
    }

    // Generate share URL
    const params = new URLSearchParams();
    params.set('name', name);
    if (birthdayDate) params.set('date', birthdayDate);
    const shareableUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    setShareUrl(shareableUrl);
  };

  // Reset form
  const handleReset = () => {
    setName('');
    setMessage('');
    setShowWish(false);
    setCountdown(null);
    setTimeRemaining(null);
    setBirthdayDate('');
    setShareUrl('');
    setCopySuccess('');
  };

  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Handle image error
  const handleImageError = () => {
    console.log("Image failed to load");
    setImageLoaded(true); // Show placeholder or continue without image
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Copy share URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000);
      })
      .catch(err => {
        console.log('Failed to copy: ', err);
        setCopySuccess('Failed to copy');
      });
  };

  // Download wish as image
  const downloadWishAsImage = () => {
    if (wishCardRef.current) {
      html2canvas(wishCardRef.current).then(canvas => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `birthday-wish-for-${name}.png`;
        link.href = image;
        link.click();
      });
    }
  };

  // Check for URL params on load
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const nameParam = queryParams.get('name');
    const dateParam = queryParams.get('date');
    
    if (nameParam) {
      setName(nameParam);
      setMessage(generateMessage());
      setShowWish(true);
      
      if (dateParam) {
        setBirthdayDate(dateParam);
        const targetDate = new Date(dateParam).getTime();
        setCountdown(targetDate);
      }
    }
  }, []);

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`} style={{ 
      background: showWish ? backgroundTheme.background : 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
      color: showWish ? backgroundTheme.color : '#333'
    }}>
      <audio ref={audioRef} src={birthdayTune} />
      
      <div className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </div>
      
      {showWish && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={200}
        />
      )}

      <div className={`card ${darkMode ? 'dark-card' : ''}`} ref={wishCardRef}>
        <h1 className="title">Birthday Wish</h1>

        {!showWish ? (
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name">Enter Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Who's the birthday person?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="birthday">Birthday Date (optional):</label>
              <input
                type="date"
                id="birthday"
                value={birthdayDate}
                onChange={(e) => setBirthdayDate(e.target.value)}
              />
            </div>

            <button type="submit" className="btn">Generate Birthday Wish</button>
          </form>
        ) : (
          <div className="wish-container">
            <div className="birthday-image-container">
              {!imageLoaded && <div className="image-loading">Loading image...</div>}
              <img 
                src={birthdayImage} 
                alt="Birthday Cake" 
                className="birthday-image" 
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{ display: imageLoaded ? 'block' : 'none' }}
              />
            </div>
            <h2>Happy Birthday, {name}! 🎉</h2>
            <p className="message">{message}</p>

            {timeRemaining && (
              <div className="countdown">
                <h3>Countdown to Birthday:</h3>
                <p className="timer">{timeRemaining}</p>
              </div>
            )}

            <div className="action-buttons">
              <button onClick={handleReset} className="btn reset-btn">Create New Wish</button>
              
              {shareUrl && (
                <div className="share-container">
                  <div className="share-url-container">
                    <input 
                      type="text" 
                      value={shareUrl} 
                      readOnly 
                      className="share-url"
                      onClick={(e) => e.target.select()}
                    />
                    <button onClick={copyToClipboard} className="btn share-btn" title="Copy to clipboard">
                      <FaShare />
                    </button>
                    {copySuccess && <div className="copy-message">{copySuccess}</div>}
                  </div>
                  <button onClick={downloadWishAsImage} className="btn download-btn" title="Download as image">
                    <FaDownload />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 