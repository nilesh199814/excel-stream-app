import express from 'express';
import multer from 'multer';
import { readExcelLarge, writeExcel,  writeExcelLarge} from '../controllers/excelController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), readExcelLarge);
router.post( '/download', writeExcelLarge);
router.post( '/download/small', writeExcel);

export default router;
