import { useNavigate } from 'react-router-dom';

const base_url = process.env.REACT_APP_API_URL; 

const catalogService = {

  getBrands: async () => {
      const response = await fetch(`${base_url}/("/catalog/cat_products_brands`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Не вдалося отримати список брендів');
      return await response.json();
  }
};

export default catalogService;