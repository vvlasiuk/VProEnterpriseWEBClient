import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ToolEntryForSharpeningForm = ({ addTab }) => {
  const getTodayDate = () => new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    dateOfSending: localStorage.getItem('formData') 
      ? JSON.parse(localStorage.getItem('formData')).dateOfSending 
      : getTodayDate(),
  });
  const [expandedParameters, setExpandedParameters] = useState(
    localStorage.getItem('expandedParameters') === 'true' ? true : false
  );

  // Автоматично зберігає весь formData при кожній зміні
  React.useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  // Автоматично зберігає expandedParameters
  React.useEffect(() => {
    localStorage.setItem('expandedParameters', expandedParameters);
  }, [expandedParameters]);

  return (
    <div>
      <div style={{ display: 'flex', gap: 8 }}>
        <IconButton title="Назад" size="small">
          <ArrowBackIcon />
        </IconButton>
        <IconButton title="Оновити" size="small">
          <ReplayIcon />
        </IconButton>
        <IconButton title="Вперед" size="small">
          <ArrowForwardIcon />
        </IconButton>
      </div>

      <button
        onClick={() => setExpandedParameters(!expandedParameters)}
        style={{
          background: 'none',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          color: 'var(--color-text)',
          padding: '12px 0',
        }}
      >
        Параметри {expandedParameters ? '↑' : '↓'}
      </button>

      {expandedParameters && (
        <div style={{ padding: '12px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label htmlFor="dateOfSending" style={{ color: 'var(--color-text)', whiteSpace: 'nowrap' }}>
              Дата відправлення
            </label>
            <input
              id="dateOfSending"
              type="date"
              value={formData.dateOfSending}
              onChange={(e) => setFormData({ ...formData, dateOfSending: e.target.value })}
              style={{ padding: '8px', borderRadius: '4px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolEntryForSharpeningForm;