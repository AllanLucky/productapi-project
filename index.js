const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./models/indexStart')

const app = express();

// CORS options with corrected URL
var corOptions = {
    origin: 'http://localhost:8081' // Correct the typo
};

// Middleware
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const productRoute = require('./routes/productRoute');
const reviewRoute = require('./routes/reviewRoute')

app.use('/Products', productRoute);
app.use('/Reviews', reviewRoute); // Used the correct route for reviews

// Port setup and server listening
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
