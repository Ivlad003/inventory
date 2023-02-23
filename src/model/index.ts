import { ApiProperty } from '@nestjs/swagger';

export class Model {
  @ApiProperty()
  name: string;
  @ApiProperty()
  year: number;
}

export class Specs {
  @ApiProperty()
  screen: string;
  @ApiProperty()
  cpu: string;
  @ApiProperty()
  ram: string;
}
