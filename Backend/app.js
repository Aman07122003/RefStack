import express from 'express';
import cors from 'cors';
import path from 'path';
import employeeRoutes from './routes/employee.routes.js';
import companyRoutes from './routes/company.routes.js';
import githubRepoRoutes from './routes/githubrepo.routes.js';
import notesRoutes from './routes/notes.routes.js'; // ✅ import notes route
import { fileURLToPath } from 'url';

const app = express();

// ✅ Enable CORS BEFORE any routes
app.use(cors());

// ✅ Body parser
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/githubrepos', githubRepoRoutes);
app.use('/api/notes', notesRoutes); // ✅ add notes 
app.use("/files", express.static(path.join(process.cwd(), "Files")));
app.use('/static', express.static(path.join(__dirname, 'Data/Graph/Media')));

// ✅ Root route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

export { app };
