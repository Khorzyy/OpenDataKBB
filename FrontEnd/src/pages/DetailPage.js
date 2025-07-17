// pages/DetailPage.js
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchData } from '../api/api';
import { Container, Button, Table, Spinner } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as XLSX from 'xlsx';

function DetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData().then((data) => {
      const found = data.find((d) => d.id === parseInt(id));
      setItem(found);
    });
  }, [id]);

  useEffect(() => {
    if (item && item.url) {
      setLoading(true);
      fetch(item.url)
        .then((res) => res.arrayBuffer())
        .then((ab) => {
          const workbook = XLSX.read(ab, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          setExcelData(json);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Gagal membaca file Excel:', err);
          setLoading(false);
        });
    }
  }, [item]);

  return (
    <>
      <Header />
      <Container className="py-4">
        {item ? (
          <>
            <h2>{item.nama}</h2>
            <p>{item.deskripsi}</p>
            <Button variant="success" href={item.url} target="_blank" className="mb-3">
              Download File
            </Button>

            {loading ? (
              <Spinner animation="border" />
            ) : (
              <>
                {excelData.length > 0 ? (
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        {excelData[0].map((head, i) => (
                          <th key={i}>{head}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {excelData.slice(1).map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td key={j}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p>File kosong atau tidak dapat dibaca.</p>
                )}
              </>
            )}
          </>
        ) : (
          <p>Data tidak ditemukan.</p>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default DetailPage;
