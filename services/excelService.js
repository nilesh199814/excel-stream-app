import ExcelJS from 'exceljs';
import fs from 'fs';

export const streamReadExcel = async (filePath) => {
  return new Promise(async (resolve, reject) => {
    const rows = [];
    const workbook = new ExcelJS.Workbook();

    try {
      await workbook.xlsx.readFile(filePath);
      const worksheet = workbook.getWorksheet(1);

      worksheet.eachRow({ includeEmpty: false }, (row) => {
        rows.push(row.values.slice(1)); // remove first null element
      });

      resolve(rows);
    } catch (error) {
      reject(error);
    } finally {
      fs.unlinkSync(filePath); // cleanup uploaded file
    }
  });
};

export const streamWriteExcel = async (rowCount) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('LargeData');

  for (let i = 1; i <= rowCount; i++) {
    worksheet.addRow([`Row ${i}`, Math.random()]);
  }

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};

