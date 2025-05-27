const Reminder = require('../models/Reminder');

const setReminder = async (req, res) => {
    try {
      console.log('User from request:', req.user);  // Log user attached to the request
      console.log('Request body:', req.body);  // Log the body of the request
      
      const { contestId, name, platform, startTime, method, timeBefore } = req.body;
      
      const reminder = new Reminder({
        userId: req.user._id,
        contestId,
        name,
        platform,
        startTime,
        method,
        timeBefore
      });
  
      // Log reminder object before saving
      console.log('Reminder to be saved:', reminder);
  
      await reminder.save();
      res.status(201).json({ message: 'Reminder set successfully' });
    } catch (err) {
      console.error('Error setting reminder:', err);  // Log the error if it happens
      res.status(500).json({ message: 'Failed to set reminder' });
    }
  };
  module.exports = { setReminder };
  