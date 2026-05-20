import { useState, useCallback } from 'react';
import { Client, CreateClientDto } from '../models';
import { clientsApi } from '../services/clients.api';

interface UseClientsReturn {
  clients: Client[];
  loading: boolean;
  error: string | null;
  fetchClients: () => Promise<void>;
  createClient: (data: CreateClientDto) => Promise<Client>;
}

export function useClients(): UseClientsReturn {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await clientsApi.findAll();
      setClients(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao carregar clientes',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const createClient = useCallback(async (data: CreateClientDto) => {
    setLoading(true);
    setError(null);
    try {
      const client = await clientsApi.create(data);
      return client;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao criar cliente';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { clients, loading, error, fetchClients, createClient };
}
