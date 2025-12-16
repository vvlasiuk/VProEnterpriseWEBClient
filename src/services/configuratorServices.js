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
  }
};

export default configuratorServices;