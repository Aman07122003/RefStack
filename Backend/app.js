import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employee.routes.js';
import aiRoutes from "./routes/ai.router.js";
import companyRoutes from './routes/company.routes.js';
import githubRepoRoutes from './routes/githubrepo.routes.js';
import statsRoutes from "./routes/stats.router.js";
import authRoutes from "./routes/auth.router.js";
import documentRoutes from "./routes/document.router.js";
import profileRoutes from "./routes/profile.router.js";
//import filterRoutes from "./routes/filter.router.js";

const app = express();


app.use(cors());

app.use(express.json());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/companies', companyRoutes);
app.use('/api/v1/githubrepos', githubRepoRoutes);
app.use("/api/v1/document", documentRoutes);
app.use("/api/v1/profile", profileRoutes);
//app.use("/api/v1/filter", filterRoutes);
app.use("/api/v1/stats", statsRoutes);

export { app };
