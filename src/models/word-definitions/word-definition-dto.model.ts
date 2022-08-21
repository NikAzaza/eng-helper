import { IsOptional, IsString } from 'class-validator';

export class WordDefinitionDto {
  @IsString()
  word: string;

  @IsString()
  transcription: string;

  @IsString()
  @IsOptional()
  pronunciationLinks?: string;

  @IsString()
  translation: string;

  @IsString()
  usageExample: string;

  constructor(word: string, [definition, transcription, pronunciation, translation, example]: string[]) {
    this.word = word;
    this.transcription = transcription;
    this.pronunciationLinks = pronunciation;
    this.translation= translation;
    this.usageExample = example;
  }
}
