import express from 'express';
import multer from 'multer';
import { readExcel, writeExcel } from '../controllers/excelController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), readExcel);
router.post('/download', writeExcel);

export default router;
