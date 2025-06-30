import { streamReadExcelLarge, streamWriteExcelLarge, writeExcelSmall } from '../services/excelService.js';

export const readExcelLarge = async (req, res) => {
  try {
    const filePath = req.file.path;
    const rows = await streamReadExcelLarge(filePath);
    res.status(200).json({ success: true, rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to read Excel file.' });
  }
};

export const writeExcelLarge = async (req, res) => {
  try {
      const { rowCount } = req.body;
    if (!rowCount || isNaN(rowCount) || rowCount <= 0) {
      return res.status(400).json({ error: 'Invalid or missing "rowCount" in request body.' });
    }
    const rows = await streamWriteExcelLarge(Number(rowCount));
    res.status(200).json({ success: true, rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to write Excel file.' });
  }
};

export const writeExcel = async (req, res) => {
  try {
    const { rowCount } = req.body;

    if (!rowCount || isNaN(rowCount) || rowCount <= 0) {
      return res.status(400).json({ error: 'Invalid or missing "rowCount" in request body.' });
    }

    const workbookBuffer = await writeExcelSmall(Number(rowCount));
    res.setHeader('Content-Disposition', 'attachment; filename=generated.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(workbookBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate Excel file.' });
  }
};

