import { parse, HTMLElement } from 'node-html-parser';
import { Service } from 'typedi';
import { ParsedWikiAudioInfo } from '../../models/word-definitions/parsed-wiki-audio-info.model';
import { WikiWordPageService } from './wiki-word-page.service';

@Service()
export class WikiAudioParserService {
  private languageFromDescriptionRegExp = /\([A-Z]+\)/;

  constructor(
      private wikiPageService: WikiWordPageService,
    ) {
  }

  findAudioLinks(sourceWord: string): ParsedWikiAudioInfo[] {
    const page = parse(this.wikiPageService.getRawPage(sourceWord));
    const pronunciationEl = page.getElementById('Pronunciation');

    if (!pronunciationEl) {
      console.error('Source page: ', this.wikiPageService.getRawPage(sourceWord))
      throw new Error('An element with id "Pronunciation" does not exist. Can not parse the wiki page');
    }

    const headerEl = pronunciationEl.parentNode;
    const audioListEl = headerEl.nextElementSibling;

    return this.foundAllAudio(audioListEl);
  }

  private foundAllAudio(listElement: HTMLElement): ParsedWikiAudioInfo[] {
    const tables = listElement.getElementsByTagName('table');

    return tables.map(
        table => new ParsedWikiAudioInfo(this.parseLanguageFromTable(table), this.parseAudioFromTable(table))
    );
  }

  private parseAudioFromTable(tableElement: HTMLElement): string {
    const sourcesCollection = tableElement.getElementsByTagName('source');
    const sourceElement = sourcesCollection[0];

    if (!sourceElement) {
      throw new Error('Can not parse audio element');
    }

    return 'https:'+ sourceElement.getAttribute('src');
  }

  private parseLanguageFromTable(tableElement: HTMLElement): string {
    const descriptionCollection = tableElement.getElementsByTagName('td');
    const filteredDescriptionCollection = descriptionCollection.filter(elem => elem.classList.contains('audiolink'))

    if (filteredDescriptionCollection.length !== 1) {
      console.table(filteredDescriptionCollection)
      throw new Error('An inappropriate count of audio descriptions found');
    }

    const matchArray = filteredDescriptionCollection[0].textContent.match(this.languageFromDescriptionRegExp);
    const matchResult = matchArray[0];

    if (!matchResult) {
      throw new Error('Can not parse audio language')
    }

    return matchResult;
  }
}
