import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthPayload {
    @ApiProperty({
      description: 'Identificador de usuario',
      type: Number
    })
    @IsNotEmpty()
    id: number;

  }
  
  export class AuthToken {
    @ApiProperty({
      description: 'El token de autenticación de usuario',
      type: String
    })
    @IsNotEmpty()
    access_token: string
  }

  export class AuthUser {
    @ApiProperty({
      description: 'ID del usuario',
      type: Number
    })
    @IsNotEmpty()
    id: number
  }

  export class AuthLogin {
    
    @ApiProperty({
      description: 'Username is required',
      type: String,
      required: true
    })
    readonly username: string
  
    @ApiProperty({
      description: 'Password is required',
      type: String,
      required: true,
      minLength: 5
    })
    @IsNotEmpty()
    readonly password: string
  }
