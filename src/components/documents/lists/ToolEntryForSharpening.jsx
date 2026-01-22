import React, { useState, useEffect, useRef } from 'react';
import { MaterialReactTable } from 'material-react-table';
// import catalogService from '../services/catalogService';
import IconButton from '@mui/material/IconButton';
// import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
import documentService from '../../../services/documentService';

const columns = [
  // { accessorKey: '_id', header: 'ID' },
  { accessorKey: 'number', header: "Номер" },
  { accessorKey: 'date', header: "Дата" },
  { accessorKey: 'company_text', header: "Організація" },
  { accessorKey: 'counterparty_text', header: "Контрагент" },
];

const ToolEntryForSharpening = ({ addTab }) => {
  const [entries, setEntries] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 50 });
  const [total, setTotal] = useState(0);
  const fileInputRef = useRef(null);

  const handleRefresh = () => {
    const skip = pagination.pageIndex * pagination.pageSize;
    documentService.getToolEntryForSharpening(skip, pagination.pageSize)
      .then(response => {
        // Захист від undefined/null - завжди використовуємо масив
        setEntries(response?.data || []);
        setTotal(response?.total || 0);
      })
      .catch(error => {
        console.error('Помилка:', error);
        // У разі помилки встановлюємо порожній масив
        setEntries([]);
        setTotal(0);
      });
  };

  useEffect(() => {
    const skip = pagination.pageIndex * pagination.pageSize;
    documentService.getToolEntryForSharpening(skip, pagination.pageSize)
      .then(response => {
        // Захист від undefined/null - завжди використовуємо масив
        setEntries(response?.data || []);
        setTotal(response?.total || 0);
      })
      .catch(error => {
        console.error('Помилка:', error);
        // У разі помилки встановлюємо порожній масив
        setEntries([]);
        setTotal(0);
      });
  }, [pagination.pageIndex, pagination.pageSize]);

  // const handleUploadClick = () => {
  //   fileInputRef.current.click();
  // };

  // const handleFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
    
  //   try {
  //     await catalogService.uploadExcelFile(file, 'products_brands_import');
  //     alert('Файл успішно завантажено');
  //     handleRefresh();
  //   } catch (error) {
  //     console.error('Помилка:', error);
  //     alert('Помилка завантаження файлу');
  //   }

  //   e.target.value = '';
  // };

  return( 
    <div>
      <h1>Список надходжень на сервіс</h1>
      <MaterialReactTable
        columns={columns}
        data={entries}  // Завжди буде масив, навіть якщо порожній
        manualPagination
        rowCount={total}
        state={{ pagination }}
        onPaginationChange={setPagination}
        initialState={{ density: 'compact' }}
        renderTopToolbarCustomActions={() => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {/* <IconButton onClick={handleUploadClick} title="Завантажити файл">
              <UploadFileIcon />
            </IconButton> */}
            <IconButton onClick={handleRefresh} title="Оновити">
              <RefreshIcon />
            </IconButton>
          </div>
        )}
      />
      {/* <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".xlsx,.csv"
      /> */}
    </div>
  );
};

export default ToolEntryForSharpening;