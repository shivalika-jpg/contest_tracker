const token = localStorage.getItem('token');
if (!token) {
  alert("Please log in to view bookmarks.");
  window.location.href = "login.html";
}

const now = new Date();
const upcomingContainer = document.getElementById('upcoming-bookmarks');
const pastContainer = document.getElementById('past-bookmarks');
const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://contest-tracker-qhfl.onrender.com';
fetch(`${apiUrl}/api/bookmarks`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(bookmarks => {
    if (bookmarks.length === 0) {
      upcomingContainer.innerHTML = '<p>No bookmarks yet.</p>';
      return;
    }

    bookmarks.forEach(bookmark => {
      const div = document.createElement('div');
      div.classList.add('bookmark-card');

      const start = new Date(bookmark.startTime);
      const isPast = start < now;

      div.innerHTML = `
        <h3>${bookmark.name}</h3>
        <p>Platform: ${bookmark.platform}</p>
        <p>Start: ${start.toLocaleString()}</p>
        <button onclick="removeBookmark('${bookmark.contestId}')">Remove</button>
      `;

      if (isPast) {
        pastContainer.appendChild(div);
      } else {
        upcomingContainer.appendChild(div);
      }
    });
  })
  .catch(err => {
    console.error('Bookmark fetch error:', err);
  });

function removeBookmark(contestId) {
  fetch(`${apiUrl}/api/bookmarks/${contestId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message || 'Bookmark removed');
      window.location.reload();
    })
    .catch(() => alert('Failed to remove bookmark'));
}
