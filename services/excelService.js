import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
export const streamReadExcelLarge = async (filePath) => {
  const rows = [];
  try {
    const workbook = new ExcelJS.stream.xlsx.WorkbookReader(filePath);
    console.log('workbook :>> ', workbook);
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

//Uses streaming, i.e., writes rows directly to disk as you go.
export const streamWriteExcelLarge = async (rowCount) => {
  try {
    // Create a unique file name
    const filePath = path.join(process.cwd(), 'generated-excel', 'generated-large-data.xlsx');

    // Create a stream workbook writer
    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
      filename: filePath,
    });

    const worksheet = workbook.addWorksheet('LargeData');
    // Add and commit each row (stream-friendly)
    for (let i = 1; i <= rowCount; i++) {
      worksheet.addRow([`Row ${i}`, Math.random()]).commit(); // important!
    }

    await workbook.commit(); // finalize the file
    console.log(`Workbook written to ${filePath}`);
    return filePath;
  } catch (error) {
    console.error('Error writing large Excel file:', error);
    throw error;
  }
};
//Keeps entire workbook in memory.
export const writeExcelSmall = async (rowCount) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('LargeData');

  for (let i = 1; i <= rowCount; i++) {
    worksheet.addRow([`Row ${i}`, Math.random()]);
  }
  const filePath = path.join(process.cwd(), 'generated-excel', 'generated-small.xlsx');
  await workbook.xlsx.writeFile(filePath); // Saves to disk
  console.log(`Workbook generated`);

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};

