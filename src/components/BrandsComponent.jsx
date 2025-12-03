import React, { useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import catalogService from '../services/catalogService';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: "Ім'я" },
  { accessorKey: 'full_name', header: "Повне ім'я" },
];

const BrandsComponent = ({ addTab }) => {
  const [brands, setBrands] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    catalogService.getBrands().then(data => setBrands(data.brands));
  }, []);

  return( 
    <div >
      <h1>Список брендів</h1>
      <MaterialReactTable
        columns={columns}
        data={brands}
        enableRowSelection
        onRowSelectionChange={setRowSelection}
        state={{ rowSelection }}
        initialState={{ density: 'compact' }}
        renderTopToolbarCustomActions={() => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <IconButton onClick={handleAddUser} title="Додати">
              <AddIcon />
            </IconButton>
            <IconButton onClick={handleEditUser} title="Редагувати">
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleMarkForDelete} title="Помітка на вилучення">
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleRefresh} title="Оновити">
              <RefreshIcon />
            </IconButton>
          </div>
        )}
      />
    </div>
  );
};
export default BrandsComponent;