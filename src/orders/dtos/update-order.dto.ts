import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class UpdateOrdertDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10, 20)
  clientId: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 40)
  address: string;
}
