import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateStepDto {
  @IsBoolean({ message: 'completed deve ser verdadeiro ou falso' })
  @IsOptional()
  completed?: boolean;

  @IsString({ message: 'Nota deve ser texto' })
  @MaxLength(500, { message: 'Nota deve ter no máximo 500 caracteres' })
  @IsOptional()
  note?: string;
}
