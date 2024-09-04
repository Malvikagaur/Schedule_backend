const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./CONFIG/db');
const authRoutes = require('./ROUTES/authRoutes');
const availabilityRoutes = require('./ROUTES/availabilityRoutes');
const sessionRoutes = require('./ROUTES/sessionRoutes');
const errorMiddleware = require('./MIDDLEWARE/errorMiddleware');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/sessions', sessionRoutes);

// Error Middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
