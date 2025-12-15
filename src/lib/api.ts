const API_BASE_URL = 'http://52.2.218.198/api/v1';

export interface ApiError {
    message: string;
    status: number;
}

export const getAuthToken = () => {
    return localStorage.getItem('azebot_access_token');
};

export const setAuthTokens = (access: string, refresh: string) => {
    localStorage.setItem('azebot_access_token', access);
    localStorage.setItem('azebot_refresh_token', refresh);
};

export const clearAuthTokens = () => {
    localStorage.removeItem('azebot_access_token');
    localStorage.removeItem('azebot_refresh_token');
};

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const message = errorBody.message || errorBody.detail || 'An error occurred';
        throw { message, status: response.status } as ApiError;
    }

    // Handle 204 No Content
    if (response.status === 204) {
        return {} as T;
    }

    return response.json();
}

export const api = {
    get: async <T>(endpoint: string, authenticated = false): Promise<T> => {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        if (authenticated) {
            const token = getAuthToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers,
        });

        return handleResponse<T>(response);
    },

    post: async <T>(endpoint: string, body: any, authenticated = false): Promise<T> => {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        if (authenticated) {
            const token = getAuthToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });

        return handleResponse<T>(response);
    },

    put: async <T>(endpoint: string, body: any, authenticated = false): Promise<T> => {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        if (authenticated) {
            const token = getAuthToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body),
        });

        return handleResponse<T>(response);
    },

    delete: async <T>(endpoint: string, authenticated = false): Promise<T> => {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        if (authenticated) {
            const token = getAuthToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers,
        });

        return handleResponse<T>(response);
    },
};
