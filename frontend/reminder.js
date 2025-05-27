document.addEventListener('DOMContentLoaded', async () => {
    const reminderList = document.getElementById('reminder-list');
    const token = localStorage.getItem('token'); // Get the user's token from localStorage

    // Check if token is available for authenticated requests
    if (!token) {
        alert("Please log in.");
        window.location.href = 'login.html'; // Redirect to login if not authenticated
    }

    // Fetch reminders for the authenticated user
    const response = await apiCall('/reminders', 'GET', null, token);

    if (response.success) {
        const reminders = response.reminders;
        reminders.forEach(reminder => {
            const reminderItem = document.createElement('li');
            reminderItem.textContent = `${reminder.name} - ${reminder.date}`;
            reminderList.appendChild(reminderItem);
        });
    } else {
        reminderList.innerHTML = "<li>No reminders found.</li>";
    }
});
