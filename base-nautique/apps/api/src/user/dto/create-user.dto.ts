import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'strongPassword123' })
    @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'strongPassword123' })
    @IsNotEmpty()
  role: string;

  
}