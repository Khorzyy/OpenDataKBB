import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';
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

    return (
        <div className="table-container">
            <h2>Data Tabel</h2>
            {fields.length === 0 || dataList.length === 0 ? (
                <p style={{ textAlign: "center" }}>Tidak ada data tersedia.</p>
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
