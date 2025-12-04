import { useNavigate } from 'react-router-dom';

const base_url = process.env.REACT_APP_API_URL; 

const catalogService = {

  getBrands: async (skip = 0, limit = 50) => {
      const response = await fetch(
        `${base_url}/catalog?model_name=Cat_ProductBrand&skip=${skip}&limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (!response.ok) throw new Error('Не вдалося отримати список брендів');
      return await response.json();
  }
};

export default catalogService;