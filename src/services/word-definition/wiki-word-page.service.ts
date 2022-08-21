import { Service } from 'typedi';
import { HttpRequestUtil } from '../utils/http-request.util';

@Service()
export class WikiWordPageService {
  private getPageUrl = (word: string) => `https://en.wiktionary.org/wiki/${word}`;

  private wordToPage: Map<string, string> = new Map();

  constructor(
      private httpRequests: HttpRequestUtil,
  ) {
  }

  async setNewPage(word: string): Promise<void> {
    const wordAsUrlParam = word.split(' ').join('_');

    const rawPage = await this.httpRequests.get(this.getPageUrl(wordAsUrlParam));

    this.wordToPage.set(word, rawPage);

    console.info(`Page has been set up for word: "${word}"`);
  }

  getRawPage(word: string): string {
    if (!this.wordToPage.has(word)) {
      throw new Error(`The page for the word "${word}"has not been specified!`)
    }

    return this.wordToPage.get(word);
  }

  clearMap(): void {
    this.wordToPage.clear();
  }

}
