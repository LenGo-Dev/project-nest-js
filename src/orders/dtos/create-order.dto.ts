import { IsNotEmpty, IsString, Length, IsUUID } from 'class-validator';

export class CreateOrdertDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10, 20)
  clientId: string | null;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  productId: string | null;

  @IsNotEmpty()
  @IsString()
  @Length(10, 40)
  address: string;
}
