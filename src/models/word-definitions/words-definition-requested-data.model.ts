import { ArrayMaxSize, IsArray, IsOptional, IsString } from 'class-validator';

export class WordsDefinitionRequestedData {
  @IsArray()
  @IsString({each: true})
  @IsOptional()
  columns?: string[];

  @IsArray()
  @ArrayMaxSize(7)
  @IsString({each: true})
  words: string[]
}
