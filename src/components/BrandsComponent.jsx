import React, { useState, useEffect, useRef } from 'react';
import { MaterialReactTable } from 'material-react-table';
import catalogService from '../services/catalogService';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const columns = [
  { accessorKey: '_id', header: 'ID' },
  { accessorKey: 'name', header: "Ім'я" },
  { accessorKey: 'full_name', header: "Повне ім'я" },
];



const BrandsComponent = ({ addTab }) => {
  const [brands, setBrands] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 50 });
  const [total, setTotal] = useState(0);
  const fileInputRef = useRef(null);

  const handleRefresh = () => {
    const skip = pagination.pageIndex * pagination.pageSize;
    catalogService.getBrands(skip, pagination.pageSize)
      .then(response => {
        setBrands(response.data);
        setTotal(response.total);
      })
      .catch(error => console.error('Помилка:', error));
  };

  useEffect(() => {
    const skip = pagination.pageIndex * pagination.pageSize;
    catalogService.getBrands(skip, pagination.pageSize)
      .then(response => {
        setBrands(response.data);
        setTotal(response.total);
      })
      .catch(error => console.error('Помилка:', error));
  }, [pagination.pageIndex, pagination.pageSize]);

  const handleUploadClick = () => {
    // console.log('Кнопка натиснута');
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    // console.log('Файл вибрано, event:', e);
    const file = e.target.files[0];
    // console.log('Файл:', file);
    if (!file) return;
    
    try {
      await catalogService.uploadExcelFile(file, 'products_brands_import');
      alert('Файл успішно завантажено');
      handleRefresh(); // Оновити список
    } catch (error) {
      console.error('Помилка:', error);
      alert('Помилка завантаження файлу');
    }

     e.target.value = '';

  };

  return( 
    <div >
      <h1>Список брендів</h1>
      <MaterialReactTable
        columns={columns}
        data={brands}
        manualPagination
        rowCount={total}
        state={{ pagination }}
        onPaginationChange={setPagination}
        initialState={{ density: 'compact' }}
        renderTopToolbarCustomActions={() => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <IconButton onClick={handleUploadClick} title="Завантажити файл">
              <UploadFileIcon />
            </IconButton>
            <IconButton onClick={handleRefresh} title="Оновити">
              <RefreshIcon />
            </IconButton>
          </div>
        )}
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".xlsx,.csv" // опціонально — обмежте типи файлів
      />
    </div>
  );
};
export default BrandsComponent;