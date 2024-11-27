import api from './api';

export const mediaService = {
  getAll: async () => {
    const response = await api.get('/v1/media');
    return response.data.data;
  },

  upload: async (formData: FormData) => {
    const response = await api.post('/v1/media', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  delete: async (id: number) => {
    await api.delete(`/v1/media/${id}`);
  },

  addSlug: async (id: number, slug: string) => {
    const response = await api.post(`/v1/media/${id}/slug`, { slug });
    return response.data.data;
  }
};
