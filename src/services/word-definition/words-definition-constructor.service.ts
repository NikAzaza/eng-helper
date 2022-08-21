import { Service } from 'typedi';
import { WordDefinitionDto } from '../../models/word-definitions/word-definition-dto.model';
import { WikiWordPageService } from './wiki-word-page.service';
import { WordDefinitionService } from './word-definition.service';

@Service()
export class WordsDefinitionConstructorService {

  constructor(
      private wikiPageService: WikiWordPageService,
      private wordsDefinition: WordDefinitionService,
  ) {
  }

  async getWordsInfo(words: string[], columns?: string[]): Promise<WordDefinitionDto[]> {
    const promises = words.map(word => this.collectWordInfo(word));

    const result = await Promise.all(promises);

    this.wikiPageService.clearMap();

    return result;
  }


  private async collectWordInfo(word: string): Promise<WordDefinitionDto> {
    await this.wikiPageService.setNewPage(word);

    const resArray = await Promise.all([
      this.wordsDefinition.getWordDefinition(word),
      this.wordsDefinition.getWordTranscription(word),
      this.wordsDefinition.getWordPronunciation(word),
      this.wordsDefinition.getWordTranslation(word),
      this.wordsDefinition.getWordUsageExample(word)
    ]);

    return new WordDefinitionDto(word, resArray);
  }
}
