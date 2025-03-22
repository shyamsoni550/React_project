import React, { useState, useRef } from 'react';
import Confetti from 'react-confetti';
import './App.css';
import { FaSun, FaMoon, FaShare, FaDownload } from 'react-icons/fa';
import html2canvas from 'html2canvas';

// Birthday card image - using a reliable image URL
const birthdayImage = "https://www.pngmart.com/files/1/Birthday-Cake-PNG-File.png";

// Birthday tune
const birthdayTune = "https://cdn.pixabay.com/download/audio/2023/07/11/audio_7bc34a1d10.mp3";

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

// Random background themes
const backgroundThemes = [
  { background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', color: '#333' },
  { background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: '#fff' },
  { background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)', color: '#333' },
  { background: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)', color: '#333' },
  { background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', color: '#333' },
  { background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)', color: '#333' },
  { background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', color: '#333' },
  { background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: '#333' },
  { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' },
  { background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', color: '#333' },
  { background: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)', color: '#333' },
  { background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', color: '#333' }
];

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showWish, setShowWish] = useState(false);
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
  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate random birthday message
  const generateMessage = () => {
    const randomIndex = Math.floor(Math.random() * birthdayMessages.length);
    return birthdayMessages[randomIndex];
  };

  // Get random background theme
  const getRandomBackgroundTheme = () => {
    const randomIndex = Math.floor(Math.random() * backgroundThemes.length);
    return backgroundThemes[randomIndex];
  };

  // Handle form submission - Directly celebrate birthday
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
    
    // Set random background theme
    setBackgroundTheme(getRandomBackgroundTheme());
    
    // Show celebration
    setShowWish(true);
    setImageLoaded(false); // Reset image loaded state

    // Generate share URL
    const params = new URLSearchParams();
    params.set('name', name);
    const shareableUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    setShareUrl(shareableUrl);
  };

  // Reset form
  const handleReset = () => {
    setName('');
    setMessage('');
    setShowWish(false);
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
  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const nameParam = queryParams.get('name');
    
    if (nameParam) {
      setName(nameParam);
      setMessage(generateMessage());
      setBackgroundTheme(getRandomBackgroundTheme());
      setShowWish(true);
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

            <button type="submit" className="btn">Celebrate Birthday!</button>
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