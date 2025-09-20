const BASE_URL = 'http://localhost:3000';

function getAuthHeaders() {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export async function apiGet(path) {
  try {
    const res = await fetch(BASE_URL + path, { 
      headers: getAuthHeaders() 
    });
    
    if (res.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return;
    }
    
    return await res.json();
  } catch (error) {
    console.error('API GET Error:', error);
    throw error;
  }
}

export async function apiPost(path, body) {
  try {
    const res = await fetch(BASE_URL + path, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(body)
    });
    
    if (res.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return;
    }
    
    return await res.json();
  } catch (error) {
    console.error('API POST Error:', error);
    throw error;
  }
}

export async function apiPut(path, body) {
  try {
    const res = await fetch(BASE_URL + path, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(body)
    });
    
    if (res.status === 401) {
      localStorage.removeRemoveItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return;
    }
    
    return await res.json();
  } catch (error) {
    console.error('API PUT Error:', error);
    throw error;
  }
}

export async function apiDelete(path) {
  try {
    const res = await fetch(BASE_URL + path, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    if (res.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return;
    }
    
    return await res.json();
  } catch (error) {
    console.error('API DELETE Error:', error);
    throw error;
  }
}