const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('fs');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const SECRET_KEY = 'mysecretkey';
const expiresIn = '1h';  // Token expires in 1 hour

// Use middlewares (logger, static, cors, etc.)
server.use(middlewares);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Create a JWT token
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify a JWT token
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decoded) => decoded !== undefined ? decoded : err);
}

// Middleware to check if the user is authenticated
function isAuthenticated({ headers }, res, next) {
    const authHeader = headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            verifyToken(token);
            next();
        } catch (err) {
            res.status(401).json({ message: 'Unauthorized access, invalid token' });
        }
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
}

// Login route
server.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync('./db.json', 'UTF-8')).users;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a token and return it
    const token = createToken({ username: user.username });
    return res.status(200).json({ token });
});

// Signup route
server.post('/auth/signup', (req, res) => {
    const { username, email, password } = req.body;
    const users = JSON.parse(fs.readFileSync('./db.json', 'UTF-8')).users;
    const userExists = users.find(u => u.username === username);

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
        id: users.length + 1,
        username,
        email,
        password  // For simplicity, we're storing the password in plain text
    };

    // Add the new user to the database
    users.push(newUser);
    fs.writeFileSync('./db.json', JSON.stringify({ ...JSON.parse(fs.readFileSync('./db.json')), users }, null, 2));

    // Generate a token for the new user
    const token = createToken({ username });
    return res.status(201).json({ token });
});

// Protect animal profile route using authentication
server.use('/animals/:id', isAuthenticated);

// Default router for other endpoints (GET animals, etc.)
server.use(router);

// Start server
server.listen(8080, () => {
    console.log('JSON Server is running on http://localhost:8080');
});
