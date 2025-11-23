export async function checkServerStatus(url = '/') {
  try {
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) return false;
    const data = await response.json();
    return data.status === 'healthy';
  } catch (error) {
    return false;
  }
}