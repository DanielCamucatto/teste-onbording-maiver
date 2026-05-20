import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingService } from './onboarding.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { NotFoundException } from '@nestjs/common';

describe('OnboardingService', () => {
  let service: OnboardingService;
  let mockSupabase: jest.Mocked<SupabaseClient>;

  function createMockChain(data: unknown, error: unknown = null) {
    const resolveValue = Promise.resolve({ data, error });
    const chain: Record<string, jest.Mock> = {
      select: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      eq: jest.fn(),
      order: jest.fn(),
      single: jest.fn(),
    };

    // Métodos intermediários retornam o próprio chain
    chain.select.mockReturnValue(chain);
    chain.insert.mockReturnValue(chain);
    chain.update.mockReturnValue(chain);
    chain.eq.mockReturnValue(chain);

    // Métodos terminais retornam uma Promise
    chain.order.mockReturnValue(resolveValue);
    chain.single.mockReturnValue(resolveValue);

    return chain;
  }

  beforeEach(async () => {
    mockSupabase = {
      from: jest.fn(),
    } as unknown as jest.Mocked<SupabaseClient>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OnboardingService,
        {
          provide: 'SUPABASE_CLIENT',
          useValue: mockSupabase,
        },
      ],
    }).compile();

    service = module.get<OnboardingService>(OnboardingService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('createSteps', () => {
    it('deve criar 6 etapas de onboarding', async () => {
      const mockSteps = Array.from({ length: 6 }, (_, i) => ({
        id: String(i + 1),
        client_id: 'client-123',
        step_name: [
          'Reunião de kickoff realizada',
          'Acesso à plataforma configurado',
          'Integração de SMS ativada',
          'Primeiro fluxo de recuperação criado',
          'Treinamento do time do cliente concluído',
          'Go-live aprovado',
        ][i],
        completed: false,
        note: null,
        created_at: new Date().toISOString(),
      }));

      const chain = createMockChain(mockSteps);
      // createSteps: from('x').insert(steps).select()
      // O select() é o ultimo da chain, entao retorna Promise directly
      chain.select.mockResolvedValue({ data: mockSteps, error: null });
      (chain as any).then = undefined;
      mockSupabase.from.mockReturnValue(chain as any);

      const result = await service.createSteps('client-123');

      expect(result).toHaveLength(6);
      expect(result[0].step_name).toBe('Reunião de kickoff realizada');
      expect(result[5].step_name).toBe('Go-live aprovado');
      expect(mockSupabase.from).toHaveBeenCalledWith('onboarding_steps');
      expect(chain.insert).toHaveBeenCalled();
      const insertedSteps = (chain.insert as jest.Mock).mock.calls[0][0];
      expect(insertedSteps).toHaveLength(6);
      expect(insertedSteps[0]).toMatchObject({
        client_id: 'client-123',
        completed: false,
      });
    });

    it('deve lancar erro quando falha ao criar etapas', async () => {
      const chain = createMockChain(null);
      chain.select.mockResolvedValue({ data: null, error: { message: 'Falha no banco' } });
      mockSupabase.from.mockReturnValue(chain as any);

      await expect(service.createSteps('client-123')).rejects.toThrow(
        'Erro ao criar etapas',
      );
    });
  });

  describe('findByClient', () => {
    it('deve retornar etapas de um cliente', async () => {
      const mockSteps = [
        { id: '1', client_id: 'client-123', step_name: 'Reunião de kickoff realizada', completed: true, completed_at: new Date().toISOString(), note: 'Ok', created_at: new Date().toISOString() },
        { id: '2', client_id: 'client-123', step_name: 'Acesso à plataforma configurado', completed: false, completed_at: null, note: null, created_at: new Date().toISOString() },
      ];

      const chain = createMockChain(mockSteps);
      // findByClient: from('x').select('*').eq('client_id', id).order(...)
      // O order() é o ultimo da chain
      mockSupabase.from.mockReturnValue(chain as any);

      const result = await service.findByClient('client-123');

      expect(result).toHaveLength(2);
      expect(result[0].completed).toBe(true);
      expect(chain.eq).toHaveBeenCalledWith('client_id', 'client-123');
    });

    it('deve lancar NotFoundException quando cliente nao tem etapas', async () => {
      const chain = createMockChain([]);
      mockSupabase.from.mockReturnValue(chain as any);

      await expect(service.findByClient('client-sem-etapas')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('deve lancar erro quando Supabase falha', async () => {
      const chain = createMockChain(null);
      // order retorna com erro
      const errResult = { data: null, error: { message: 'Erro de conexao' } };
      chain.order.mockReturnValue(Promise.resolve(errResult));
      mockSupabase.from.mockReturnValue(chain as any);

      await expect(service.findByClient('client-123')).rejects.toThrow(
        'Erro ao buscar etapas',
      );
    });
  });

  describe('updateStep', () => {
    it('deve marcar etapa como concluida', async () => {
      const mockStep = {
        id: 'step-1',
        client_id: 'client-123',
        step_name: 'Reunião de kickoff realizada',
        completed: true,
        completed_at: new Date().toISOString(),
        note: 'Kickoff realizado com sucesso',
        created_at: new Date().toISOString(),
      };

      const chain = createMockChain(mockStep);
      chain.single.mockResolvedValue({ data: mockStep, error: null });
      mockSupabase.from.mockReturnValue(chain as any);

      const result = await service.updateStep('client-123', 'step-1', {
        completed: true,
        note: 'Kickoff realizado com sucesso',
      });

      expect(result.completed).toBe(true);
      expect(result.note).toBe('Kickoff realizado com sucesso');
      expect(chain.eq).toHaveBeenCalledWith('id', 'step-1');
      expect(chain.eq).toHaveBeenCalledWith('client_id', 'client-123');
      expect(chain.update).toHaveBeenCalled();
    });

    it('deve desmarcar etapa como concluida', async () => {
      const chain = createMockChain({});
      chain.single.mockResolvedValue({
        data: {
          id: 'step-2',
          client_id: 'client-123',
          step_name: 'Acesso à plataforma configurado',
          completed: false,
          completed_at: null,
          note: null,
          created_at: new Date().toISOString(),
        },
        error: null,
      });
      mockSupabase.from.mockReturnValue(chain as any);

      const result = await service.updateStep('client-123', 'step-2', {
        completed: false,
      });

      expect(result.completed).toBe(false);
      expect(result.completed_at).toBeNull();
    });

    it('deve atualizar apenas a nota', async () => {
      const chain = createMockChain({});
      chain.single.mockResolvedValue({
        data: {
          id: 'step-3',
          client_id: 'client-123',
          step_name: 'Integração de SMS ativada',
          completed: false,
          completed_at: null,
          note: 'Nota atualizada',
          created_at: new Date().toISOString(),
        },
        error: null,
      });
      mockSupabase.from.mockReturnValue(chain as any);

      const result = await service.updateStep('client-123', 'step-3', {
        note: 'Nota atualizada',
      });

      expect(result.note).toBe('Nota atualizada');
      expect(result.completed).toBe(false);
    });

    it('deve lancar erro quando etapa nao encontrada', async () => {
      const chain = createMockChain(null);
      chain.single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
      mockSupabase.from.mockReturnValue(chain as any);

      await expect(
        service.updateStep('client-123', 'step-inexistente', { completed: true }),
      ).rejects.toThrow('Erro ao atualizar etapa');
    });
  });
});
