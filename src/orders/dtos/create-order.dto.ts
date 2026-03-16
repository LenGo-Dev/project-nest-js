import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateOrdertDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10, 20)
  client: string;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 40)
  address: string;
}
