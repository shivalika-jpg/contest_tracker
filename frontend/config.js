// Configuration file for frontend
window.config = {
  apiUrl: window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://contest-tracker-qhfl.onrender.com'
};
