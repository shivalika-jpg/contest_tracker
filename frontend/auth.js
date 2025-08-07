// frontend/js/auth.js
const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://contest-tracker-qhfl.onrender.com';
// LOGIN
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const res = await fetch(`${apiUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token);
    alert('Login successful');
    window.location.href = 'index.html';
  } else {
    alert(data.message || 'Login failed');
  }
});

// REGISTER
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  const res = await fetch(`${apiUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (res.ok) {
    alert('Registration successful');
    window.location.href = 'login.html';
  } else {
    alert(data.message || 'Registration failed');
  }
});

  
  
