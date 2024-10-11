const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const morgan = require('morgan');

const app = express();

dotenv.config();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const vehicleRouter = require('../routes/vehicle.route');
const officeRouter = require('../routes/office.route');
const userRouter = require('../routes/user.route');
const clientRouter = require('../routes/client.route');
const rentalRouter = require('../routes/rental.route');
const invoiceRouter = require('../routes/invoice.route');

app.use('/vehicles', vehicleRouter);
app.use('/offices', officeRouter);
app.use('/auth', userRouter);
app.use('/clients', clientRouter);
app.use('/rentals', rentalRouter);
app.use('/invoices', invoiceRouter);

app.use(function (req, res, next) {
    res.status(404).send('Lo siento, no puedo encontrar eso!');
});

module.exports = app;
