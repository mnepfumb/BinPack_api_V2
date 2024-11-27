const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const authRouter = require("./routes/authRouter");
const usersRouter = require("./routes/usersRouter");
const requisitionsRouter = require("./routes/requisitionsRouter");
const companyRouter = require("./routes/companiesRouter");
const hospitalRouter = require("./routes/hospitalRouter");
const manifestRouter = require("./routes/manifestRouter");
const locationTrackingRouter = require("./routes/locationTrackingRouter");
const requisitionStatusRouter = require("./routes/requisitionStatusRouter");
const wasteTypesRouter = require("./routes/wasteTypesRouter");
// const dashboardsRouter = require("./routes/dashboardsRouter");

const app = express();
app.use(morgan("dev"));

// Load environment variables
require('dotenv').config();

const corsOptions = {
    origin:process.env.ORIGIN_URL,// Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowable methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowable headers
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight for all routes

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/requisition", requisitionsRouter);
app.use("/company", companyRouter);
app.use("/hospital", hospitalRouter);
app.use("/manifest", manifestRouter);
app.use("/locationTracking", locationTrackingRouter);
app.use("/requisitionStatus", requisitionStatusRouter);
app.use("/wasteTypes", wasteTypesRouter);
// app.use("/dashboards", dashboardsRouter);

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
