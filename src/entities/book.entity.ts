import { ApiProperty } from '@nestjs/swagger';

export class Book {
    @ApiProperty({ type: Number })
    id: number;
  
    @ApiProperty({ type: String })
    title: string;
  
    @ApiProperty({ type: String })
    writer: string;
  
    @ApiProperty({ type: String })
    coverImage: string;
  
    @ApiProperty({ type: Number })
    point: number;
  
    @ApiProperty({isArray: true, type: String })
    tags: string[];
}
