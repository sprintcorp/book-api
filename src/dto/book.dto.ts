import { IsNotEmpty } from "class-validator";

export class BookDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    writer: string;

    @IsNotEmpty()
    coverImage: string;

    @IsNotEmpty()
    point: number;

    @IsNotEmpty()
    tags: string[];
  }
  