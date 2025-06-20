const express = require('express'); // Import Express framework
const mongoose = require('mongoose'); // MongoDB object modeling tool
const cors = require('cors'); // Allows cross-origin requests

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON in request bodies

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userform', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  password: String,
  gender: String,
  phone: String,
  address: String
});

// Create User model from schema
const User = mongoose.model('User', userSchema);

// Fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create new user
app.post('/users', async (req, res) => {
  const { name, email, age, password, gender, phone, address } = req.body;

  // Simple validation
  if (!name || !email || !age || !password || !gender || !phone || !address) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newUser = new User({ name, email, age, password, gender, phone, address });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// Delete user by ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Update user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// Handle login request
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password }); // Match plain text (for now)
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Send back user object
    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
