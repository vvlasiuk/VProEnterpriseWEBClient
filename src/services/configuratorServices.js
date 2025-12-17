const base_url = process.env.REACT_APP_API_URL;

const configuratorServices = {
  getModelSchemas: async () => {
    const response = await fetch(`${base_url}/configurator/models_schemas`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Не вдалося отримати схеми моделей');
    return await response.json();
  },
  getDatabaseSchemas: async () => {
    const response = await fetch(`${base_url}/configurator/db_schemas`, {
      headers: {  
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Не вдалося отримати схеми бази даних');
    return await response.json();
  },
  getCompareSchemas: async () => {
    const response = await fetch(`${base_url}/configurator/compare_schemas`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Не вдалося отримати порівняння схем');
    return await response.json();
  }
};

export default configuratorServices;