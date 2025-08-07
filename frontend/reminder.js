// Define apiUrl globally at the top of the file
const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : window.location.origin;

document.addEventListener('DOMContentLoaded', async () => {
    const reminderList = document.getElementById('reminder-list');
    const token = localStorage.getItem('token'); // Get the user's token from localStorage

    // Check if token is available for authenticated requests
    if (!token) {
        alert("Please log in.");
        window.location.href = 'login.html'; // Redirect to login if not authenticated
    }

    // Fetch reminders for the authenticated user
    try {
        const response = await fetch(`${apiUrl}/api/reminders`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const reminders = await response.json();
            if (reminders.length > 0) {
                reminders.forEach(reminder => {
                    const reminderItem = document.createElement('li');
                    reminderItem.textContent = `${reminder.name} - ${reminder.startTime}`;
                    reminderList.appendChild(reminderItem);
                });
            } else {
                reminderList.innerHTML = "<li>No reminders found.</li>";
            }
        } else {
            reminderList.innerHTML = "<li>Error loading reminders.</li>";
        }
    } catch (error) {
        console.error('Error fetching reminders:', error);
        reminderList.innerHTML = "<li>Error loading reminders.</li>";
    }
});
