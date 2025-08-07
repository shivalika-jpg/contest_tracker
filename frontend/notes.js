const token = localStorage.getItem('token');
if (!token) {
  alert('Please login first.');
  window.location.href = 'login.html';
}

// Define apiUrl globally at the top of the file
const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : window.location.origin;

const form = document.getElementById('note-form');
const contestIdInput = document.getElementById('contestId');
const solvedInput = document.getElementById('solved');
const noteInput = document.getElementById('note');
const existingNoteDiv = document.getElementById('existing-note');

// Save the note for a contest
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = {
    contestId: contestIdInput.value,
    problemsSolved: solvedInput.value,
    notes: noteInput.value
  };
const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://contest-tracker-qhfl.onrender.com';
  const res = await fetch(`${apiUrl}/api/contest-log`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  if (res.ok) {
    alert('Note saved!');
  } else {
    alert(data.message || 'Failed to save note');
  }
});

// Fetch existing note when a contest ID is entered 
document.getElementById('fetch-note-btn').addEventListener('click', async () => {
  const contestId = document.getElementById('fetch-contest-id').value;
  if (!contestId) {
    alert('Please enter a contest ID');
    return;
  }

  const res = await fetch(`${apiUrl}/api/contest-log/${contestId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (res.ok) {
    const data = await res.json();
    console.log(data);

    if (data.problemsSolved !== undefined) {
      solvedInput.value = data.problemsSolved;
    }
    if (data.notes !== undefined) {
      noteInput.value = data.notes;
    }

    existingNoteDiv.innerHTML = `<p>Note loaded for contest ${contestId}</p>`;
  } else {
    existingNoteDiv.innerHTML = `<p>No existing note found for contest ${contestId}</p>`;
  } 
});
