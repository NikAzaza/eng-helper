import { IConvertibleToDto } from '../../interfaces/dto/convertible-to-dto.interface';
import { ParsedWikiAudioInfo } from './parsed-wiki-audio-info.model';
import { WordDefinitionDto } from './word-definition-dto.model';

export class WordDefinition implements IConvertibleToDto<WordDefinitionDto>{
  word: string;
  transcription: string;
  pronunciationLinks: ParsedWikiAudioInfo[];
  translation: string;
  usageExample: string;

  constructor() {
  }

  toDto(): WordDefinitionDto {
    return null;
  }
}
