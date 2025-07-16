import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './TableDataView.css';

const TableDataView = () => {
    const { id } = useParams();
    const [dataList, setDataList] = useState([]);
    const [fields, setFields] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tableRes, dataRes] = await Promise.all([
                    API.get('/tables'),
                    API.get(`/data/${id}`)
                ]);

                const table = tableRes.data.find(t => t._id === id);
                if (table) setFields(table.fields || []);
                setDataList(dataRes.data || []);
            } catch (err) {
                console.error("Gagal ambil data:", err);
            }
        };

        fetchData();
    }, [id]);

    const handleDownloadExcel = () => {
        const formattedData = dataList.map(entry => entry.data);
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'DataTabel');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(file, 'data_tabel.xlsx');
    };

    return (
        <div className="table-container">
            <div className="table-header">
                <h2>Data Tabel</h2>
                {dataList.length > 0 && (
                    <button onClick={handleDownloadExcel} className="download-btn">
                        Download Excel
                    </button>
                )}
            </div>

            {fields.length === 0 || dataList.length === 0 ? (
                <p className="no-data">Tidak ada data tersedia.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            {fields.map((field, idx) => (
                                <th key={idx}>{field}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dataList.map((entry, rowIdx) => (
                            <tr key={rowIdx}>
                                {fields.map((field, colIdx) => (
                                    <td key={colIdx}>{entry.data?.[field] ?? '-'}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TableDataView;