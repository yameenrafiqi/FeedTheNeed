const express = require('express');
const router = express.Router();
const Data = require('../models/Data');

// Create a new data entry
router.post('/', async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const newData = new Data({ name, description, price });
    await newData.save();
    res.json(newData);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all data entries
router.get('/', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a data entry by ID
router.put('/:id', async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const updatedData = await Data.findByIdAndUpdate(
      req.params.id,
      { name, description, price },
      { new: true }
    );
    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a data entry by ID
router.delete('/:id', async (req, res) => {
  try {
    await Data.findByIdAndDelete(req.params.id);
    res.json({ message: 'Data deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;