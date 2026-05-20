import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { OnboardingStatus } from '../common/constants';

describe('DashboardService', () => {
  let service: DashboardService;
  let mockSupabase: jest.Mocked<SupabaseClient>;

  // Helper para criar mock do Supabase query builder
  function createMockQuery(data: unknown[] | null, error: unknown = null) {
    return {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data, error }),
    };
  }

  beforeEach(async () => {
    mockSupabase = {
      from: jest.fn(),
    } as unknown as jest.Mocked<SupabaseClient>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: 'SUPABASE_CLIENT',
          useValue: mockSupabase,
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('getDashboard', () => {
    it('deve retornar dashboard vazio quando nao ha clientes', async () => {
      const mockQuery = createMockQuery([]);
      mockSupabase.from.mockReturnValue(mockQuery as any);

      const result = await service.getDashboard();

      expect(result).toEqual([]);
      expect(mockSupabase.from).toHaveBeenCalledWith('clients');
    });

    it('deve retornar cliente com status Em andamento quando tem menos de 30 dias e 0/6 etapas', async () => {
      const hoje = new Date().toISOString().split('T')[0];
      const mockClient = {
        id: '123',
        company_name: 'Teste Ltda',
        contact_name: 'João',
        email: 'joao@teste.com',
        phone: '11999999999',
        plan: 'Pro' as const,
        start_date: hoje,
        consultant_name: 'Consultor A',
        created_at: new Date().toISOString(),
      };

      const clientsQuery = createMockQuery([mockClient]);
      const stepsQuery = createMockQuery(
        [
          {
            id: 'step1',
            client_id: '123',
            step_name: 'Reunião de kickoff realizada',
            completed: false,
            completed_at: null,
            note: null,
            created_at: new Date().toISOString(),
          },
        ],
      );

      mockSupabase.from
        .mockReturnValueOnce(clientsQuery as any)  // 1a chamada: clients
        .mockReturnValueOnce(stepsQuery as any);    // 2a chamada: steps

      const result = await service.getDashboard();

      expect(result).toHaveLength(1);
      expect(result[0].client.company_name).toBe('Teste Ltda');
      expect(result[0].progress).toBe('0/6');
      expect(result[0].status).toBe(OnboardingStatus.EM_ANDAMENTO);
    });

    it('deve retornar status Concluido quando todas as 6 etapas estao completas', async () => {
      const hoje = new Date().toISOString().split('T')[0];
      const mockClient = {
        id: '456',
        company_name: 'Concluida Ltda',
        contact_name: 'Maria',
        email: 'maria@teste.com',
        phone: '11988888888',
        plan: 'Enterprise' as const,
        start_date: hoje,
        consultant_name: 'Consultor B',
        created_at: new Date().toISOString(),
      };

      const clientSteps = [
        'Reunião de kickoff realizada',
        'Acesso à plataforma configurado',
        'Integração de SMS ativada',
        'Primeiro fluxo de recuperação criado',
        'Treinamento do time do cliente concluído',
        'Go-live aprovado',
      ].map((name, i) => ({
        id: `step${i}`,
        client_id: '456',
        step_name: name,
        completed: true,
        completed_at: new Date().toISOString(),
        note: null,
        created_at: new Date().toISOString(),
      }));

      const clientsQuery = createMockQuery([mockClient]);
      const stepsQuery = createMockQuery(clientSteps);

      mockSupabase.from
        .mockReturnValueOnce(clientsQuery as any)
        .mockReturnValueOnce(stepsQuery as any);

      const result = await service.getDashboard();

      expect(result).toHaveLength(1);
      expect(result[0].progress).toBe('6/6');
      expect(result[0].status).toBe(OnboardingStatus.CONCLUIDO);
    });

    it('deve retornar status Atrasado quando onboarding tem mais de 30 dias', async () => {
      const dataAntiga = '2024-01-01';  // mais de 30 dias atras
      const mockClient = {
        id: '789',
        company_name: 'Atrasada Ltda',
        contact_name: 'Carlos',
        email: 'carlos@teste.com',
        phone: '11977777777',
        plan: 'Básico' as const,
        start_date: dataAntiga,
        consultant_name: 'Consultor C',
        created_at: '2024-01-01T00:00:00Z',
      };

      const clientsQuery = createMockQuery([mockClient]);
      const stepsQuery = createMockQuery([]);

      mockSupabase.from
        .mockReturnValueOnce(clientsQuery as any)
        .mockReturnValueOnce(stepsQuery as any);

      const result = await service.getDashboard();

      expect(result).toHaveLength(1);
      expect(result[0].progress).toBe('0/6');
      expect(result[0].status).toBe(OnboardingStatus.ATRASADO);
    });

    it('deve filtrar por consultor quando parametro informado', async () => {
      const mockClient = {
        id: '101',
        company_name: 'Filtro Ltda',
        contact_name: 'Ana',
        email: 'ana@teste.com',
        phone: '11966666666',
        plan: 'Pro' as const,
        start_date: new Date().toISOString().split('T')[0],
        consultant_name: 'Consultor Especifico',
        created_at: new Date().toISOString(),
      };

      const clientsQuery = createMockQuery([mockClient]);
      const stepsQuery = createMockQuery([]);

      mockSupabase.from
        .mockReturnValueOnce(clientsQuery as any)
        .mockReturnValueOnce(stepsQuery as any);

      const result = await service.getDashboard('Consultor Especifico');

      expect(result).toHaveLength(1);
      // Verifica se passou o filtro na query
      expect(mockSupabase.from).toHaveBeenNthCalledWith(1, 'clients');
      expect(clientsQuery.eq).toHaveBeenCalledWith(
        'consultant_name',
        'Consultor Especifico',
      );
    });

    it('deve lancar erro quando Supabase falha', async () => {
      const mockQuery = createMockQuery([], new Error('Falha no banco'));
      mockSupabase.from.mockReturnValue(mockQuery as any);

      await expect(service.getDashboard()).rejects.toThrow(
        'Erro ao buscar dados do dashboard',
      );
    });
  });
});
