import React, { useState } from 'react';
import './Qr.css';

function QrGenerator() {
  const [inputText, setInputText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const generateQRCode = () => {
    if (inputText.trim() !== '') {
      const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(inputText)}`;
      setQrCodeUrl(apiUrl);
    } else {
      alert('Please enter text to generate a QR code.');
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className="qr-generator">
      <h1>QR Code Generator</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter text to generate QR code"
          value={inputText}
          onChange={handleInputChange}
        />
        <button onClick={generateQRCode}>Generate QR Code</button>
      </div>
      {qrCodeUrl && (
        <div className="qr-code">
          <img src={qrCodeUrl} alt="Generated QR Code" />
          <a href={qrCodeUrl} download="qrcode.png">Download QR Code</a>
        </div>
      )}
    </div>
  );
}

export default QrGenerator;