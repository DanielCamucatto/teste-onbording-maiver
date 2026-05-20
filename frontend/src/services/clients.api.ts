import api from './api';
import { Client, CreateClientDto } from '../models';

export const clientsApi = {
  create: async (data: CreateClientDto): Promise<Client> => {
    const response = await api.post<Client>('/clients', data);
    return response.data;
  },

  findAll: async (): Promise<Client[]> => {
    const response = await api.get<Client[]>('/clients');
    return response.data;
  },

  findOne: async (id: string): Promise<Client> => {
    const response = await api.get<Client>(`/clients/${id}`);
    return response.data;
  },
};
