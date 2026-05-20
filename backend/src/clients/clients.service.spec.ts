import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateClientDto } from './dto/create-client.dto';

describe('ClientsService', () => {
  let service: ClientsService;
  let mockSupabase: jest.Mocked<SupabaseClient>;

  function createMockQuery(data: unknown[] | null, error: unknown = null) {
    return {
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data, error }),
    };
  }

  function createMockSingleQuery(data: unknown, error: unknown = null) {
    return {
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data, error }),
    };
  }

  beforeEach(async () => {
    mockSupabase = {
      from: jest.fn(),
    } as unknown as jest.Mocked<SupabaseClient>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: 'SUPABASE_CLIENT',
          useValue: mockSupabase,
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar um cliente com sucesso', async () => {
      const dto: CreateClientDto = {
        company_name: 'Nova Empresa',
        contact_name: 'João Silva',
        email: 'joao@empresa.com',
        phone: '11999999999',
        plan: 'Pro',
        start_date: '2025-06-01',
        consultant_name: 'Consultor Teste',
      };

      const mockCreated = {
        id: 'uuid-123',
        ...dto,
        created_at: new Date().toISOString(),
      };

      const mockQuery = createMockSingleQuery(mockCreated);
      mockSupabase.from.mockReturnValue(mockQuery as any);

      const result = await service.create(dto);

      expect(result.company_name).toBe('Nova Empresa');
      expect(result.consultant_name).toBe('Consultor Teste');
      expect(mockSupabase.from).toHaveBeenCalledWith('clients');
      expect(mockQuery.insert).toHaveBeenCalledWith([
        {
          company_name: 'Nova Empresa',
          contact_name: 'João Silva',
          email: 'joao@empresa.com',
          phone: '11999999999',
          plan: 'Pro',
          start_date: '2025-06-01',
          consultant_name: 'Consultor Teste',
        },
      ]);
    });

    it('deve lancar erro quando Supabase falha ao criar', async () => {
      const dto: CreateClientDto = {
        company_name: 'Falha Ltda',
        contact_name: 'Maria',
        email: 'maria@teste.com',
        phone: '11988888888',
        plan: 'Básico',
        start_date: '2025-06-01',
        consultant_name: 'Consultor',
      };

      const mockQuery = createMockSingleQuery(null, new Error('Falha no banco'));
      mockSupabase.from.mockReturnValue(mockQuery as any);

      await expect(service.create(dto)).rejects.toThrow(
        'Erro ao criar cliente',
      );
    });
  });

  describe('findAll', () => {
    it('deve retornar lista de clientes', async () => {
      const mockClients = [
        {
          id: '1',
          company_name: 'Empresa A',
          contact_name: 'Ana',
          email: 'ana@a.com',
          phone: '111',
          plan: 'Pro',
          start_date: '2025-01-01',
          consultant_name: 'Cons A',
          created_at: '2025-01-01T00:00:00Z',
        },
        {
          id: '2',
          company_name: 'Empresa B',
          contact_name: 'Bob',
          email: 'bob@b.com',
          phone: '222',
          plan: 'Básico',
          start_date: '2025-02-01',
          consultant_name: 'Cons B',
          created_at: '2025-02-01T00:00:00Z',
        },
      ];

      const mockQuery = createMockQuery(mockClients);
      mockSupabase.from.mockReturnValue(mockQuery as any);

      const result = await service.findAll();

      expect(result).toHaveLength(2);
      expect(result[0].company_name).toBe('Empresa A');
      expect(result[1].company_name).toBe('Empresa B');
    });

    it('deve retornar array vazio quando nao ha clientes', async () => {
      const mockQuery = createMockQuery([]);
      mockSupabase.from.mockReturnValue(mockQuery as any);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('deve retornar cliente por ID', async () => {
      const mockClient = {
        id: 'abc-123',
        company_name: 'Cliente Unico',
        contact_name: 'Carlos',
        email: 'carlos@teste.com',
        phone: '333',
        plan: 'Enterprise',
        start_date: '2025-03-01',
        consultant_name: 'Cons C',
        created_at: '2025-03-01T00:00:00Z',
      };

      const mockQuery = createMockSingleQuery(mockClient);
      mockSupabase.from.mockReturnValue(mockQuery as any);

      const result = await service.findOne('abc-123');

      expect(result.id).toBe('abc-123');
      expect(result.company_name).toBe('Cliente Unico');
      expect(mockQuery.eq).toHaveBeenCalledWith('id', 'abc-123');
    });

    it('deve lancar erro quando cliente nao encontrado', async () => {
      const mockQuery = createMockSingleQuery(null, new Error('Not found'));
      mockSupabase.from.mockReturnValue(mockQuery as any);

      await expect(service.findOne('id-inexistente')).rejects.toThrow(
        'Cliente não encontrado',
      );
    });
  });

  describe('findByConsultant', () => {
    it('deve filtrar clientes por consultor', async () => {
      const mockClients = [
        {
          id: '1',
          company_name: 'Empresa A',
          contact_name: 'Ana',
          email: 'ana@a.com',
          phone: '111',
          plan: 'Pro',
          start_date: '2025-01-01',
          consultant_name: 'Consultor X',
          created_at: '2025-01-01T00:00:00Z',
        },
      ];

      const mockQuery = createMockQuery(mockClients);
      mockSupabase.from.mockReturnValue(mockQuery as any);

      const result = await service.findByConsultant('Consultor X');

      expect(result).toHaveLength(1);
      expect(mockQuery.eq).toHaveBeenCalledWith('consultant_name', 'Consultor X');
    });
  });
});
