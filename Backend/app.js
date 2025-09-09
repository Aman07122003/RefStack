import express from 'express';
import cors from 'cors';
import path from 'path';
import employeeRoutes from './routes/employee.routes.js';
import companyRoutes from './routes/company.routes.js';
import githubRepoRoutes from './routes/githubrepo.routes.js';
import { fileURLToPath } from 'url';

const app = express();

// ✅ Enable CORS BEFORE any routes
app.use(cors());

// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/githubrepos', githubRepoRoutes);

// ✅ Root route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

export { app };
