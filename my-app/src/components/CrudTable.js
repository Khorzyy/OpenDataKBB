import { Table, Button } from 'react-bootstrap';
import { deleteFile } from '../api/api';

function CrudTable({ data, refreshData }) {
  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      await deleteFile(id);
      refreshData();
    }
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Nama</th>
          <th>Deskripsi</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={item.id}>
            <td>{idx + 1}</td>
            <td>{item.nama}</td>
            <td>{item.deskripsi}</td>
            <td>
              <Button variant="warning" size="sm" className="me-2">
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(item._id)}
              >
                Hapus
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CrudTable;
