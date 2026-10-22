require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const sequelize = require('./config/db');
const Customer = require('./models/Customer');
const Product = require('./models/Product');
const ServiceRecord = require('./models/ServiceRecord');

const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', async (req, res) => {
  const customerCount = await Customer.count();
  const productCount = await Product.count();
  const serviceCount = await ServiceRecord.count();
  res.render('index', { customerCount, productCount, serviceCount });
});

app.use('/customers', customerRoutes);
app.use('/products', productRoutes);
app.use('/services', serviceRoutes);

// Start server after DB connection + sync
async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    await sequelize.sync(); // creates tables if they don't exist
    console.log('Models synced.');

    app.listen(PORT, () => {
      console.log(`Digital Warranty & Service Record System running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Unable to start the app:', err.message);
    process.exit(1);
  }
}

start();
