import api from './api';

export const authService = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/login', { email, password });
      return response.data;
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  }
};
