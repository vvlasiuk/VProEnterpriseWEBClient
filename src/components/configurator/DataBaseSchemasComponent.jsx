import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import configuratorServices from '../../services/configuratorServices';

const DataBaseSchemasComponent = () => {
  const [schemas, setSchemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchemas = async () => {
      try {
        const response = await configuratorServices.getDatabaseSchemas();
        
        // schemas - це масив рядків
        setSchemas(response.schemas || []);
        setLoading(false);
      } catch (err) {
        console.error('Помилка завантаження схем БД:', err);
        setError('Не вдалося завантажити схему БД');
        setLoading(false);
      }
    };
    fetchSchemas();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Box>{error}</Box>;

  return (
    <Box>
      <h1>Схема бази даних</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>№</TableCell>
              <TableCell>Назва таблиці</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schemas.map((tableName, idx) => (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{tableName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 2 }}>
        Всього таблиць: {schemas.length}
      </Box>
    </Box>
  );
};

export default DataBaseSchemasComponent;