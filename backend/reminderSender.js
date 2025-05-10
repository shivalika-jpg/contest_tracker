const cron = require('node-cron');
const mongoose = require('mongoose');
const Reminder = require('./models/Reminder'); 
const User = require('./models/user'); 
const twilio = require('twilio');

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Cron runs every minute
cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();

    // Find reminders where (startTime - timeBefore mins) is <= now AND not sent
    const reminders = await Reminder.find({
      sent: { $ne: true },
    });

    for (const reminder of reminders) {
      const sendTime = new Date(new Date(reminder.startTime) - reminder.timeBefore * 60000);

      // If it's time to send
      if (now >= sendTime) {
        const user = await User.findById(reminder.userId);

        if (reminder.method === 'sms' && user.phone) {
          await client.messages.create({
            body: `Reminder: ${reminder.name} on ${reminder.platform} starts soon!`,
            from: process.env.TWILIO_PHONE,
            to: process.env.USER_NUMBER
          });

          console.log(`SMS sent to ${process.env.USER_NUMBER} for ${reminder.name}`);
        }


        // Mark as sent
        reminder.sent = true;
        await reminder.save();
      }
    }
  } catch (err) {
    console.error('Reminder job error:', err);
  }
});
