import { ApiProperty } from '@nestjs/swagger';

export class UserDto {

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly lastName: string;

  @ApiProperty()
  readonly middleName: string;
}
