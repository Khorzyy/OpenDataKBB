/* eslint-disable no-restricted-globals */
import * as XLSX from 'xlsx';

self.onmessage = async (e) => {
  try {
    const { buffer, type } = e.data;
    let workbook;

    if (type === 'csv') {
      const csvText = new TextDecoder().decode(buffer);
      workbook = XLSX.read(csvText, { type: 'string' });
    } else {
      workbook = XLSX.read(buffer, { type: 'array' });
    }

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

    postMessage({ success: true, data: jsonData });
  } catch (err) {
    postMessage({ success: false, error: err.message });
  }
};
