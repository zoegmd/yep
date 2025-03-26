const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;
const users = []; // Simulating a user database

app.use(express.json()); // Middleware to parse JSON

// Register endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword }); // Store hashed password
    res.status(201).send('User registered!');
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    
    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
