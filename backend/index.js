import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import applicationRoute from "./routes/application.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import userRoute from "./routes/user.route.js";
import connectDB from "./utils/db.js";

import path from "path";

dotenv.config({});

const app = express();

const __dirname = path.resolve();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
    origin: 'https://jobportal-rvte.onrender.com/', //'http://localhost:5173'
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);


app.use(express.static(path.join(__dirname, "./frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend" , "dist" , "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong!",
        success: false
    });
});

// Handle 404
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
        success: false
    });
});

app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server running at port ${PORT}`);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
});