const base_url = process.env.REACT_APP_API_URL; 

const documentService = {

  getToolEntryForSharpening: async (skip = 0, limit = 50) => {
    const response = await fetch(
      `${base_url}/com_1c8/tool-entry-for-sharpening?skip=${skip}&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    if (!response.ok) throw new Error('Не вдалося отримати дані');
    return await response.json();  // Просто повертаємо відповідь
  }

};

export default documentService;