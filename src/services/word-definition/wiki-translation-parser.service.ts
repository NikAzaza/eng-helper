import { Service } from 'typedi';
import { parse, HTMLElement } from 'node-html-parser';
import { ParsedWikiTranslationInfo } from '../../models/word-definitions/parsed-wiki-translation-info.model';
import { WikiWordPageService } from './wiki-word-page.service';

@Service()
export class WikiTranslationParserService {

  constructor(
      private wikiWordPage: WikiWordPageService,
  ) {
  }

  getWordTranslations(word: string): ParsedWikiTranslationInfo[] {
    const page = parse(this.wikiWordPage.getRawPage(word));

    const translationSectionText = page.getElementById('Translations');
    const sectionHeader = translationSectionText.parentNode;

    let headerSibling = sectionHeader.nextElementSibling;
    const translationMeaningPanels: HTMLElement[] = [];

    while (headerSibling.classList.contains('NavFrame')) {
      translationMeaningPanels.push(headerSibling);
      headerSibling = headerSibling.nextElementSibling;
    }

    const res = translationMeaningPanels.map(panel => this.getTranslationInfo(panel))

    console.info('getWordTranslations: ', res);

    return res;
  }

  private getTranslationInfo(wordTranslationPanel: HTMLElement): ParsedWikiTranslationInfo {
    const table = wordTranslationPanel.getElementsByTagName('table')[0];

    if (!table) {
      throw new Error('Table with word translation not found');
    }

    return new ParsedWikiTranslationInfo(
        this.getContext(wordTranslationPanel),
        this.getTranslations(wordTranslationPanel)
    );
  }

  private getContext(wordTranslationPanel: HTMLElement): string {
    const childElement = wordTranslationPanel.querySelector('div.NavHead');

    if (!childElement) {
      throw new Error('Context element for word translation not found!');
    }

    return childElement.textContent;
  }

  private getTranslations(translationTable: HTMLElement): string {
    const listItems = translationTable.getElementsByTagName('li');

    const russianTranslationIndex = listItems.findIndex(elem => elem.textContent.toLocaleLowerCase().includes('russian'));

    let translationOptionsElements = []

    if (russianTranslationIndex >= 0) {
      translationOptionsElements = listItems[russianTranslationIndex].querySelectorAll("span.Cyrl > a");
    }

    return translationOptionsElements.map(element => element.textContent).join(', ');
  }
}
