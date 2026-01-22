const base_url = process.env.REACT_APP_API_URL; 

const documentService = {

  getToolEntryForSharpening: async (skip = 0, limit = 50, filters = []) => {
      
    const transformedFilters = filters.map(f => ({
        field: f.id,
        operator: "contains",  // або логіку вибору оператора
        value: f.value
      }));

    const response = await fetch(
      `${base_url}/com_1c8/tool-entry-for-sharpening`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          skip: skip,
          limit: limit,
          filters: transformedFilters  // [{ field: "number", operator: "contains", value: "123" }]
        })
      }
    );
    if (!response.ok) throw new Error('Не вдалося отримати дані');
    return await response.json();
  }

};

export default documentService;