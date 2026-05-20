import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from '../common/constants';

@Injectable()
export class ClientsService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const { data, error } = await this.supabase
      .from('clients')
      .insert([
        {
          company_name: createClientDto.company_name,
          contact_name: createClientDto.contact_name,
          email: createClientDto.email,
          phone: createClientDto.phone,
          plan: createClientDto.plan,
          start_date: createClientDto.start_date,
          consultant_name: createClientDto.consultant_name,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(`Erro ao criar cliente: ${error.message}`);
    }

    return data as Client;
  }

  async findAll(): Promise<Client[]> {
    const { data, error } = await this.supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Erro ao listar clientes: ${error.message}`);
    }

    return data as Client[];
  }

  async findOne(id: string): Promise<Client> {
    const { data, error } = await this.supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Cliente não encontrado: ${error.message}`);
    }

    return data as Client;
  }

  async findByConsultant(consultantName: string): Promise<Client[]> {
    const { data, error } = await this.supabase
      .from('clients')
      .select('*')
      .eq('consultant_name', consultantName)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Erro ao buscar clientes: ${error.message}`);
    }

    return data as Client[];
  }
}
