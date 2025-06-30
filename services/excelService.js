import ExcelJS from 'exceljs';
import fs from 'fs';

export const streamReadExcel = async (filePath) => {
  const rows = [];
  try {
    const workbook = new ExcelJS.stream.xlsx.WorkbookReader(filePath);

    for await (const worksheetReader of workbook) { // loops over each sheet
      for await (const row of worksheetReader) { // loops over each row in that sheet
        rows.push(row.values.slice(1)); // remove first null value
      }
    }

    return rows;
  } catch (error) {
    throw error;
  } finally {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // cleanup
    }
  }
};




export const streamWriteExcel = async (rowCount) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('LargeData');

  for (let i = 1; i <= rowCount; i++) {
    worksheet.addRow([`Row ${i}`, Math.random()]);
  }

//   await workbook.xlsx.writeFile(filePath); // Saves to disk
//   console.log(`Workbook saved to ${filePath}`);

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};

