import express from 'express';
import cors from 'cors';
import path from 'path';
import employeeRoutes from './routes/employee.routes.js';
import companyRoutes from './routes/company.routes.js';
import githubRepoRoutes from './routes/githubrepo.routes.js';
import notesRoutes from './routes/notes.routes.js'; // ✅ import notes route

const app = express();

// ✅ Enable CORS BEFORE any routes
app.use(cors());

// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/githubrepos', githubRepoRoutes);
app.use('/api/notes', notesRoutes); // ✅ add notes 
app.use("/files", express.static(path.join(process.cwd(), "Files")));

// ✅ Root route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

export { app };
