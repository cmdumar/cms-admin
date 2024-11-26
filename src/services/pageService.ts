import api from './api';

interface Page {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export const pageService = {
  getAll: async (): Promise<Page[]> => {
    const response = await api.get('/v1/pages');
    return response.data.data;
  },

  getById: async (id: number): Promise<Page> => {
    const response = await api.get(`/v1/pages/${id}`);
    return response.data.data;
  },

  create: async (data: { title: string; body: string }): Promise<Page> => {
    const response = await api.post('/v1/pages', data);
    return response.data.data;
  },

  update: async (id: number, data: { title: string; body: string }): Promise<Page> => {
    const response = await api.put(`/v1/pages/${id}`, data);
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/v1/pages/${id}`);
  }
};
