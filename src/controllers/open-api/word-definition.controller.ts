import { Request, Response } from 'express';
import { Body, JsonController, Post, Req, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { WordDefinitionDto } from '../../models/word-definitions/word-definition-dto.model';
import { WordsDefinitionRequestedData } from '../../models/word-definitions/words-definition-requested-data.model';
import { WordsDefinitionConstructorService } from '../../services/word-definition/words-definition-constructor.service';

@JsonController('/open-api')
@Service()
export class WordsDefinitionController {

  constructor(
      private definitionConstructorService: WordsDefinitionConstructorService
  ) {
    console.log('WordsDefinitionController');
  }

  @Post('/word-definitions')
  getWordsDefinition(
      @Req() request: Request,
      @Res() response: Response,
      @Body() words: WordsDefinitionRequestedData
  ): Promise<WordDefinitionDto[]> {
    return this.definitionConstructorService.getWordsInfo(words.words);
  }
}
