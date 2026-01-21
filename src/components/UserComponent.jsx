import React, { useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import authService from '../services/authService';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import BarcodeScannerModal from './BarcodeScannerModal';

const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: "Ім'я" },
  { accessorKey: 'full_name', header: "Повне ім'я" },
];

const UserComponent = ({ addTab }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [barcodeInput, setBarcodeInput] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  useEffect(() => {
    authService.getUsers().then(data => {
      setUsers(data.users);
      setFilteredUsers(data.users);
    });
  }, []);

  const handleRefresh = () => {
    authService.getUsers().then(data => {
      setUsers(data.users);
      setFilteredUsers(data.users);
    });
  };

  const handleAddUser = () => {
    addTab({ title: 'Новий користувач', command: 'addUser' });
  };

  const handleEditUser = () => {
    authService.getUsers().then(data => setUsers(data.users));
  };

  const handleMarkForDelete = () => {
    authService.getUsers().then(data => setUsers(data.users));
  };

  const handleBarcodeChange = (e) => {
    const value = e.target.value;
    setBarcodeInput(value);
  };

  const performSearch = (searchValue) => {
    if (searchValue.trim() === '') {
      setFilteredUsers(users);
      return;
    }

    const searchId = parseInt(searchValue, 10);
    if (isNaN(searchId)) {
      setFilteredUsers([]);
      return;
    }

    const filtered = users.filter(user => user.id === searchId);
    setFilteredUsers(filtered);
  };

  const handleBarcodeSearch = () => {
    performSearch(barcodeInput);
  };

  const handleClearFilter = () => {
    setBarcodeInput('');
    setFilteredUsers(users);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBarcodeSearch();
    }
  };

  const handleOpenScanner = () => {
    setIsScannerOpen(true);
  };

  const handleCloseScanner = () => {
    setIsScannerOpen(false);
  };

  const handleScanSuccess = (decodedText) => {
    setBarcodeInput(decodedText);
    performSearch(decodedText);
    setIsScannerOpen(false);
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Insert') {
        handleAddUser();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <div>
      <h1>Користувачі список</h1>
      <MaterialReactTable
        columns={columns}
        data={filteredUsers}
        enableRowSelection
        onRowSelectionChange={setRowSelection}
        state={{ rowSelection }}
        initialState={{ density: 'compact' }}
        renderTopToolbarCustomActions={() => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <TextField
              size="small"
              placeholder="Штрих-код (ID)"
              value={barcodeInput}
              onChange={handleBarcodeChange}
              onKeyDown={handleKeyDown}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <QrCodeScannerIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 200 }}
            />
            <IconButton onClick={handleOpenScanner} title="Відкрити камеру" color="primary">
              <CameraAltIcon />
            </IconButton>
            <IconButton onClick={handleClearFilter} title="Скинути фільтр" color="primary">
              <FilterAltOffIcon />
            </IconButton>
            <div style={{ width: 1, height: 24, backgroundColor: '#ddd', margin: '0 4px' }} />
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
      
      <BarcodeScannerModal
        open={isScannerOpen}
        onClose={handleCloseScanner}
        onScanSuccess={handleScanSuccess}
      />
    </div>
  );
};

export default UserComponent;