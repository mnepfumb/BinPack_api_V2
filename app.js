const express = require('express');
// const cors = require('cors');
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

// const corsOptions = {
//     origin:'*', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200,
//     allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
//     methods: ["OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE"],
//     preflightContinue: true,
// };

// app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true"); // Access-Control-Allow-Credentials, true);
    
    console.log("Request received:" + req.method, req.url);
    
    next();
});

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
