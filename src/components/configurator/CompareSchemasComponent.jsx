import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Chip, Alert } from '@mui/material';
import configuratorServices from '../../services/configuratorServices';

const CompareSchemasComponent = () => {
  const [changesPlanned, setChangesPlanned] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await configuratorServices.getCompareSchemas();
        
        setChangesPlanned(response.changes_planned || []);
        setErrors(response.errors || []);
        
        setLoading(false);
      } catch (err) {
        console.error('Помилка завантаження:', err);
        setError('Не вдалося завантажити дані для порівняння');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Box>{error}</Box>;

  return (
    <Box>
      <h1>Порівняння схем</h1>
      
      <Box sx={{ mb: 3 }}>
        <Chip label={`Змін заплановано: ${changesPlanned.length}`} color="warning" sx={{ mr: 1 }} />
        <Chip label={`Помилок: ${errors.length}`} color={errors.length > 0 ? "error" : "default"} />
      </Box>

      {errors.length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Знайдено {errors.length} помилок
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Таблиця</TableCell>
              <TableCell>Деталі</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {changesPlanned.map((change, idx) => (
              <TableRow key={`change-${idx}`} sx={{ backgroundColor: '#fff3e0' }}>
                <TableCell>{change.table}</TableCell>
                <TableCell>
                  <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                    {JSON.stringify(change, null, 2)}
                  </pre>
                </TableCell>
              </TableRow>
            ))}
            {errors.map((err, idx) => (
              <TableRow key={`error-${idx}`} sx={{ backgroundColor: '#ffebee' }}>
                <TableCell colSpan={2}>
                  <Chip label="Помилка" color="error" size="small" sx={{ mr: 1 }} />
                  {err.message || JSON.stringify(err)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CompareSchemasComponent;