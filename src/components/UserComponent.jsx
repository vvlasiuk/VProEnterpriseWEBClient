import React, { useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import authService from '../services/authService';

const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: "Ім'я" },
  { accessorKey: 'fullname', header: "Повне ім'я" },
];

const UserComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    authService.getUsers().then(data => setUsers(data.users));
  }, []);

  return (
    <div >
      <h1>Користувачі список</h1>
      <MaterialReactTable columns={columns} data={users} 
  />
    </div>
  );
};

export default UserComponent;