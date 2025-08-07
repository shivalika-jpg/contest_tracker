const token = localStorage.getItem('token');

if (!token) {
  alert('Please log in first.');
  window.location.href = 'login.html';
}
const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://contest-tracker-qhfl.onrender.com';
fetch(`${apiUrl}/api/contests/codeforces`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(contests => {
    const container = document.getElementById('contest-list');

    if (contests.length === 0) {
      container.innerHTML = '<p>No contests found.</p>';
      return;
    }

    // Sort contests by start time
    contests.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    container.innerHTML = '';

    contests.forEach(contest => {
      const div = document.createElement('div');
      div.classList.add('contest-card');

      const now = new Date();
      const startTime = new Date(contest.startTime);
      const isPast = startTime < now;

      div.innerHTML = `
<h3>${contest.name}</h3>
<p>Platform: ${contest.platform}</p>
<p>Start Time: ${startTime.toLocaleString()}</p>
<p>Duration: ${Math.floor(contest.duration / 60)} mins</p>
<a href="${contest.url}" target="_blank" class="view-link">View Contest</a>
${!isPast ? `
<button onclick="bookmarkContest('${contest.id}', \`${contest.name.replace(/`/g, "'")}\`, '${contest.platform}', '${contest.startTime}', '${contest.duration}')">Bookmark</button>
<button onclick="openReminderModal('${contest.id}', \`${contest.name.replace(/`/g, "'")}\`, '${contest.platform}', '${contest.startTime}')">Set Reminder</button>
` : ''}
`;

      container.appendChild(div);
    });
  })
  .catch(err => {
    console.error(err);
    document.getElementById('contest-list').innerHTML = '<p>Error loading contests.</p>';
  });

function bookmarkContest(contestId, name, platform, startTime, duration) {
  fetch(`${apiUrl}/api/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ contestId, name, platform, startTime, duration })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message || 'Bookmarked!');
    })
    .catch(err => {
      console.error('Bookmark error:', err);
      alert('Failed to bookmark.');
    });
}

function openReminderModal(contestId, name, platform, startTime) {
  document.getElementById('reminder-contest-id').value = contestId;
  document.getElementById('reminder-name').value = name;
  document.getElementById('reminder-platform').value = platform;
  document.getElementById('reminder-start-time').value = startTime;
  document.getElementById('reminder-modal').style.display = 'block';
}

function closeReminderModal() {
  document.getElementById('reminder-modal').style.display = 'none';
}

// Handle reminder form submission
// Handle logout
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        try {
            const response = await fetch(`${apiUrl}/api/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                localStorage.removeItem('token');
                alert('Logged out successfully');
                window.location.href = 'login.html';
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
            alert('Failed to logout. Please try again.');
        }
    });
}

// Handle reminder form submission
document.getElementById('reminder-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const body = {
    contestId: document.getElementById('reminder-contest-id').value,
    name: document.getElementById('reminder-name').value,
    platform: document.getElementById('reminder-platform').value,
    startTime: document.getElementById('reminder-start-time').value,
    method: document.getElementById('reminder-method').value,
    timeBefore: parseInt(document.getElementById('reminder-time').value)
  };

  try {
    const res = await fetch(`${apiUrl}/api/reminders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    if (res.ok) {
      alert('Reminder set successfully!');
      closeReminderModal();
    } else {
      alert(data.message || 'Failed to set reminder');
    }
  } catch (err) {
    console.error(err);
    alert('Error setting reminder');
  }
});
