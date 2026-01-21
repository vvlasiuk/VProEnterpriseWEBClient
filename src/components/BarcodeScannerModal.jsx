import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const BarcodeScannerModal = ({ open, onClose, onScanSuccess }) => {
  const html5QrcodeRef = useRef(null);
  const isScanning = useRef(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!open) {
      setError(null);
      setIsLoading(true);
      return;
    }

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 150 },
      formatsToSupport: [
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.CODE_39,
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.EAN_8,
        Html5QrcodeSupportedFormats.QR_CODE,
      ],
    };

    const startScanner = async () => {
      // Перевірка існування елемента
      const element = document.getElementById('barcode-reader');
      if (!element) {
        setError('Елемент barcode-reader не знайдено');
        setIsLoading(false);
        return;
      }

      if (isScanning.current) return;

      try {
        const html5Qrcode = new Html5Qrcode('barcode-reader');
        html5QrcodeRef.current = html5Qrcode;
        isScanning.current = true;

        // Спробувати задню камеру
        try {
          await html5Qrcode.start(
            { facingMode: 'environment' },
            config,
            (decodedText) => {
              onScanSuccess(decodedText);
            },
            (errorMessage) => {
              // Ігноруємо помилки сканування (код не знайдено)
            }
          );
          setIsLoading(false);
          setError(null);
        } catch (backCameraError) {
          // Якщо задня не працює, спробувати фронтальну
          console.log('Задня камера недоступна, використовую фронтальну');
          await html5Qrcode.start(
            { facingMode: 'user' },
            config,
            (decodedText) => {
              onScanSuccess(decodedText);
            },
            (errorMessage) => {
              // Ігноруємо помилки сканування
            }
          );
          setIsLoading(false);
          setError(null);
        }
      } catch (err) {
        console.error('Помилка запуску сканера:', err);
        isScanning.current = false;
        setIsLoading(false);

        // Детальні повідомлення про помилки
        let errorMsg = 'Не вдалося запустити камеру';

        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          errorMsg = 'Доступ до камери заборонено. Надайте дозвіл у налаштуваннях браузера.';
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          errorMsg = 'Камера не знайдена на пристрої';
        } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
          errorMsg = 'Камера зайнята іншим додатком або відсутній дозвіл';
        } else if (err.name === 'OverconstrainedError') {
          errorMsg = 'Камера не підтримує запитані налаштування';
        } else if (err.toString().includes('https') || err.toString().includes('secure')) {
          errorMsg = '⚠️ Камера працює тільки через HTTPS з\'єднання. Використовуйте https:// замість http://';
        } else if (err.message) {
          errorMsg = `Помилка: ${err.message}`;
        }

        setError(errorMsg);
      }
    };

    const stopScanner = async () => {
      if (html5QrcodeRef.current && isScanning.current) {
        try {
          await html5QrcodeRef.current.stop();
          html5QrcodeRef.current = null;
          isScanning.current = false;
        } catch (err) {
          console.error('Помилка зупинки сканера:', err);
        }
      }
    };

    // Затримка для рендерингу DOM
    const timer = setTimeout(() => {
      startScanner();
    }, 150);

    return () => {
      clearTimeout(timer);
      stopScanner();
    };
  }, [open, onScanSuccess]);

  const handleClose = async () => {
    if (html5QrcodeRef.current && isScanning.current) {
      try {
        await html5QrcodeRef.current.stop();
        html5QrcodeRef.current = null;
        isScanning.current = false;
      } catch (err) {
        console.error('Помилка при закритті:', err);
      }
    }
    setError(null);
    setIsLoading(true);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Сканування штрих-коду
        <IconButton
          onClick={handleClose}
          style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {isLoading && !error && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <CircularProgress />
            <p style={{ marginTop: '10px' }}>Запуск камери...</p>
          </div>
        )}

        {error && (
          <Alert severity="error" style={{ marginBottom: '16px' }}>
            {error}
          </Alert>
        )}

        {!error && !isLoading && (
          <Alert severity="info" style={{ marginBottom: '16px' }}>
            Наведіть камеру на штрих-код
          </Alert>
        )}

        <div
          id="barcode-reader"
          style={{ width: '100%', minHeight: '300px' }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BarcodeScannerModal;