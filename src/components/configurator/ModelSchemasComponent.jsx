import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import configuratorServices from '../../services/configuratorServices';

const ModelSchemasComponent = () => {
  const [schemas, setSchemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchemas = async () => {
      try {
        const response = await configuratorServices.getModelSchemas();

        // Перетворити об'єкт схем на масив
        const schemasArray = Object.entries(response.schemas).map(([key, value]) => ({
          model_name: key,
          ...value
        }));

        setSchemas(schemasArray);
        setLoading(false);
      } catch (err) {
        console.error('Помилка завантаження схем:', err);
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
      <h1>Схема БД (моделі)</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Модель</TableCell>
              <TableCell>Схема</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schemas.map((schema, idx) => (
              <TableRow key={idx}>
                <TableCell>{schema.model_name || 'N/A'}</TableCell>
                <TableCell>
                  <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                    {JSON.stringify(schema, null, 2)}
                  </pre>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ModelSchemasComponent;