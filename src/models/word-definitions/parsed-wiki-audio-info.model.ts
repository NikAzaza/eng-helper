export class ParsedWikiAudioInfo {
  language: string;
  link: string;

  constructor(_language: string, _link: string) {
    this.language = _language;
    this.link = _link;
  }
}
