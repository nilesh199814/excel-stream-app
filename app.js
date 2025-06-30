import express from 'express';
import excelRoutes from './routes/excelRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

app.use(express.json());
app.use('/api/excel', excelRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
