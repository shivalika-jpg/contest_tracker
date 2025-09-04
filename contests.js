// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', async function() {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Please log in first.');
    window.location.href = 'login.html';
    return;
  }

  // Debug: Check if config is loaded
  console.log('window.config:', window.config);
  console.log('apiUrl:', window.config?.apiUrl);

  if (!window.config || !window.config.apiUrl) {
    console.error('Config not loaded! window.config:', window.config);
    document.getElementById('contest-list').innerHTML = '<p>Configuration error. Please refresh the page.</p>';
    return;
  }

  try {
    console.log('Fetching contests from:', `${window.config.apiUrl}/api/contests/codeforces`);
    
    const res = await fetch(`${window.config.apiUrl}/api/contests/codeforces`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Response status:', res.status);
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const contests = await res.json();
    console.log('Fetched contests:', contests);
    
    const container = document.getElementById('contest-list');

    if (!contests || contests.length === 0) {
      container.innerHTML = '<p>No upcoming contests found.</p>';
      return;
    }

    // Filter to show only upcoming contests
    const now = new Date();
    const upcomingContests = contests.filter(contest => {
      const startTime = new Date(contest.startTime);
      return startTime > now;
    });

    console.log(`Total contests: ${contests.length}, Upcoming contests: ${upcomingContests.length}`);

    if (upcomingContests.length === 0) {
      container.innerHTML = '<p>No upcoming contests found.</p>';
      return;
    }

    // Sort upcoming contests by start time
    upcomingContests.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    container.innerHTML = '';

    upcomingContests.forEach(contest => {
      const div = document.createElement('div');
      div.classList.add('contest-card');

      const startTime = new Date(contest.startTime);
      console.log(`Contest: ${contest.name}, Start: ${startTime}, Now: ${now}`);

      div.innerHTML = `
<h3>${contest.name}</h3>
<p>Platform: ${contest.platform}</p>
<p>Start Time: ${startTime.toLocaleString()}</p>
<p>Duration: ${Math.floor(contest.duration / 60)} mins</p>
<a href="${contest.url}" target="_blank" class="view-link">View Contest</a>
<button onclick="bookmarkContest('${contest.id}', \`${contest.name.replace(/`/g, "'")}\`, '${contest.platform}', '${contest.startTime}', '${contest.duration}')">Bookmark</button>
<button onclick="openReminderModal('${contest.id}', \`${contest.name.replace(/`/g, "'")}\`, '${contest.platform}', '${contest.startTime}')">Set Reminder</button>
`;

      container.appendChild(div);
    });
  } catch (err) {
    console.error('Error fetching contests:', err);
    document.getElementById('contest-list').innerHTML = `<p>Error loading contests: ${err.message}</p>`;
  }
  
  // Handle logout button
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
      logoutBtn.addEventListener('click', async () => {
          try {
              const response = await fetch(`${window.config.apiUrl}/api/auth/logout`, {
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
  const reminderForm = document.getElementById('reminder-form');
  if (reminderForm) {
    reminderForm.addEventListener('submit', async (e) => {
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
        const res = await fetch(`${window.config.apiUrl}/api/reminders`, {
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
  }
});
