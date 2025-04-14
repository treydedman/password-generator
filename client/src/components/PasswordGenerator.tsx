import { useState, useEffect } from 'react';
import './PasswordGenerator.css';
import { FaRegCopy } from 'react-icons/fa';  // Import the Clipboard Icon

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [strength, setStrength] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme');
    return stored === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const generatePassword = () => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let pwd = '';
    for (let i = 0; i < length; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pwd);
    evaluateStrength(pwd);
  };

  const evaluateStrength = (pwd: string) => {
    if (pwd.length < 8) {
      setStrength('Weak');
    } else if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) {
      setStrength('Strong');
    } else {
      setStrength('Medium');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  return (
    <div className={`generator-container ${theme}`}>
      <h2>Password Generator</h2>
      {/* Toggle Switch for Light/Dark Mode */}
      <label className="switch">
          <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
          <span className="slider"></span>
        </label>
      <div className="controls">
        <label>Password Length: {length}</label>
        <input
          type="range"
          min="4"
          max="32"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
        />
        <button onClick={generatePassword}>Generate</button>
      </div>

      <div className="output-section">
        <input type="text" className="output" value={password} readOnly />
        
        {/* Copy Icon */}
        <button className="copy-btn" onClick={copyToClipboard}>
          <FaRegCopy  size={20} />
        </button>
        
        {/* Password Strength Meter */}
        {password && (
          <div className={`strength ${strength.toLowerCase()}`}>
            Strength: {strength}
            <div className="strength-meter">
              <div className={`meter ${strength.toLowerCase()}`}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}