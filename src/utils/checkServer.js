export async function checkServerStatus(url = '/') {
  try {
    const response = await fetch(url, { method: 'GET' });
    const contentType = response.headers.get('content-type');
    if (!response.ok) return false;
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Відповідь не JSON:', await response.text());
      return false;
    }
    const data = await response.json();
    return data.status === 'healthy';
  } catch (error) {
    console.error('Error checking server status:', error);
    return false;
  }
}

export async function checkDbEmptyStatus(url) {
  try {
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) return false;
    const data = await response.json();
    return data.db_empty === true;
  } catch (error) {
    return false;
  }
}