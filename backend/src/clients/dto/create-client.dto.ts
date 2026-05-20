import { IsEmail, IsIn, IsNotEmpty, IsPhoneNumber, IsString, Matches } from 'class-validator';
import { PLANS } from '../../common/constants';

export class CreateClientDto {
  @IsString({ message: 'Nome da empresa deve ser texto' })
  @IsNotEmpty({ message: 'Nome da empresa é obrigatório' })
  company_name: string;

  @IsString({ message: 'Nome do responsável deve ser texto' })
  @IsNotEmpty({ message: 'Nome do responsável é obrigatório' })
  contact_name: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  email: string;

  @IsString({ message: 'Telefone deve ser texto' })
  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  phone: string;

  @IsIn(PLANS, {
    message: `Plano deve ser um dos: ${PLANS.join(', ')}`,
  })
  @IsNotEmpty({ message: 'Plano é obrigatório' })
  plan: string;

  @IsString({ message: 'Data deve ser texto no formato YYYY-MM-DD' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Data deve estar no formato YYYY-MM-DD',
  })
  start_date: string;

  @IsString({ message: 'Nome do consultor deve ser texto' })
  @IsNotEmpty({ message: 'Consultor responsável é obrigatório' })
  consultant_name: string;
}
