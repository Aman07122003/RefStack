import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employee.routes.js';
import companyRoutes from './routes/company.routes.js';
import githubRepoRoutes from './routes/githubrepo.routes.js';

const app = express();


app.use(cors());

app.use(express.json());


app.use('/api/employees', employeeRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/githubrepos', githubRepoRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

export { app };
