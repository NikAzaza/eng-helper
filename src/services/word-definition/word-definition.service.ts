import { Service } from 'typedi';
import { HttpRequestUtil } from '../utils/http-request.util';
import { WikiAudioParserService } from './wiki-audio-parser.service';
import { WikiTranslationParserService} from './wiki-translation-parser.service';

@Service()
export class WordDefinitionService {
  private requestUrl = '';

  constructor(
      private httpHelper: HttpRequestUtil,
      private wikiAudioParser: WikiAudioParserService,
      private wikiTranslationParser: WikiTranslationParserService,
  ) {
  }

  async getWordDefinition(word: string): Promise<string> {
    // TODO: complete

    return null;
  }

  async getWordTranscription(word: string): Promise<string> {
    // TODO: complete

    return null;
  }

  async getWordPronunciation(word: string): Promise<string> {
    const wordsAudios = this.wikiAudioParser.findAudioLinks(word);

    return Promise.resolve(wordsAudios[0].link || null);
  }

  async getWordTranslation(word: string): Promise<string> {
    const wordTranslations = this.wikiTranslationParser.getWordTranslations(word);

    return wordTranslations[0].meaning || '';
  }

  async getWordUsageExample(word): Promise<string> {
    // TODO: complete

    return null;
  }
}
