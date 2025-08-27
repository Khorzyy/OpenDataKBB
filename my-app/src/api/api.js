import axios from 'axios';

export const getCatalogData = async () => {
  try {
    let allFiles = [];
    let start = 0;
    let hasMore = true;

    while (hasMore) {
      const res = await axios.get('http://localhost:5000/api/catalog', {
        params: { start, rows: 100 }
      });

      const files = res.data?.result?.results || [];
      allFiles = [...allFiles, ...files];

      if (files.length < 100) {
        hasMore = false; // tidak ada data lagi
      } else {
        start += 100;
      }
    }

    return allFiles.map(item => ({
      id: item.id,
      nama: item.title || "Tanpa Nama",
      deskripsi: item.notes || "Tidak ada deskripsi",
      kategori: item.groups?.[0]?.title || "Tidak ada kategori",
      tahun: item.extras?.find(e => e.key.toLowerCase() === "tahun")?.value || "Tidak diketahui",
      sumber: item.organization?.title || "Tidak ada sumber",
      format: item.resources?.[0]?.format || "Tidak diketahui",
      ukuran: item.resources?.[0]?.size || "Tidak diketahui",
      url: item.resources?.[0]?.url || null
    }));
  } catch (err) {
    console.error('Gagal ambil data:', err);
    return [];
  }
};


export const getAllFiles = getCatalogData;

export const getFileById = async (id) => {
  const data = await getCatalogData();
  return data.find(file => String(file.id) === String(id));
};

