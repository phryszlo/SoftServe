const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();


const clientRoutes = require('./routes/clients');
const projectRoutes = require('./routes/projects');
const invoiceRoutes = require('./routes/invoices');
const invoiceItemsRoutes = require('./routes/invoice_items');
const taskRoutes = require('./routes/tasks');

const app = new express();
const PORT = process.env.PORT || 4000;
require('dotenv').config();

app.use(cors());
app.use(express.static('public'));
// app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());
app.use(express.urlencoded({ extended: false }));
app.use(jsonParser); //?

app.use(methodOverride("_method"));

// mein routen
app.use('/api/clients/', clientRoutes);
app.use('/api/projects/', projectRoutes);
app.use('/api/invoices/', invoiceRoutes);
app.use('/api/invoice_items/', invoiceItemRoutes);
app.use('/api/tasks/', taskRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let moncon = '';
mongoose.connection.once('open', () => {
  moncon = mongoose.connection;
  // console.log(mongoose.connection);     
  console.log('connected to mongo');
});

// INDEX
app.get('/', (req, res) => {
  res.redirect('/api');
})

app.get('/api', (req, res) => {
  res.json({
    message: `greetings, person or entity, from port ${PORT}.`,
  });
})


app.listen(PORT, () => {
  console.log(`server listens on ${PORT}`);
})