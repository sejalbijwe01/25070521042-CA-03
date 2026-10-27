require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());              // allows the client (another port) to call this API
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/donors', require('./routes/donorRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));
app.use('/api/stock', require('./routes/stockRoutes'));
app.use('/api/camps', require('./routes/campRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

app.get('/', (req, res) => res.send('Blood Bank API running'));

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`));