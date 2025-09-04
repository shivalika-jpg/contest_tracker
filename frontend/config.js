// Configuration file for frontend
window.config = {
  apiUrl: window.location.hostname === 'localhost' 
    ? 'http://localhost:5001' 
    : window.location.origin
};
