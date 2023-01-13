import { Injectable } from '@angular/core';
import { Web3Service } from 'src/app/blockchain/web3.service';
import {
  Game,
  GameDetails,
  GameStats,
  Question,
  PlayerGameStats,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private web3: Web3Service) {}

  createGameInfo(gameDetails: GameDetails) {
    this.web3.executeTransaction(
      'createGame',
      gameDetails.title,
      gameDetails.description,
      gameDetails.price,
      gameDetails.numQuestions,
      gameDetails.thumbnails
    );
  }

  createGameQusetions(_gameId: number, _gameQuestions: Question[]) {
    const questions = [];
    for (let i = 0; i < _gameQuestions.length; i++) {
      questions.push([
        _gameQuestions[i].context,
        _gameQuestions[i].answer,
        _gameQuestions[i].wrongOption1,
        _gameQuestions[i].wrongOption2,
        _gameQuestions[i].wrongOption3,
      ]);
    }
    this.web3.executeTransaction('createGameQusetions', _gameId, questions);
  }

  async getGameInfo(_gameId: number): Promise<Game> {
    try {
      const rawGameInfo = await this.web3.call('getGameInfo', _gameId);
      return this.parseGameInfo(_gameId, rawGameInfo);
    } catch (error) {
      // alert('We could not retrieve game.\n');
      throw error;
    }
  }

  async getAllGames(): Promise<Game[]> {
    try {
      const games: Game[] = [];
      const totalGamesCount = await this.web3.call('getGamesCount');

      for (let gameId = 0; gameId < totalGamesCount; gameId++) {
        const game = await this.getGameInfo(gameId);
        games.push(game);
      }

      return games;
    } catch (error) {
      // alert('We could not retrieve games.\n');
      throw error;
    }
  }

  async getGameQuestions(_gameId: number): Promise<Question[]> {
    try {
      const questions: Question[] = [];
      const rawGameQuestions = await this.web3.call(
        'getGameQuestions',
        _gameId
      );

      rawGameQuestions.forEach((rawGameQuestion: any) => {
        questions.push(this.parseGameQuestion(rawGameQuestion));
      });
      return questions;
    } catch (error) {
      // alert('We could not retrieve game.\n');
      throw error;
    }
  }

  parseGameInfo(_gameId: number, _rawGameInfo: any): Game {
    const details: GameDetails = {
      title: _rawGameInfo[0][0],
      description: _rawGameInfo[0][1],
      price: _rawGameInfo[0][2],
      numQuestions: _rawGameInfo[0][3],
      thumbnails: _rawGameInfo[0][4],
    };

    const stats: GameStats = {
      numBuyers: parseInt(_rawGameInfo[1][0]),
      rating: parseInt(_rawGameInfo[1][1]),
      numRaters: parseInt(_rawGameInfo[1][2]),
    };

    const playerStats: PlayerGameStats = {
      isCreator: _rawGameInfo[2][0],
      isPurchased: _rawGameInfo[2][1],
      highscore: parseInt(_rawGameInfo[2][2]),
      rating: parseInt(_rawGameInfo[2][3]),
    };

    return {
      id: _gameId,
      details: details,
      stats: stats,
      questions: [],
      playerStats: playerStats,
    };
  }

  parseGameQuestion(_rawGameQuestion: any): Question {
    const question: Question = {
      context: _rawGameQuestion[0],
      answer: _rawGameQuestion[1],
      wrongOption1: _rawGameQuestion[2],
      wrongOption2: _rawGameQuestion[3],
      wrongOption3: _rawGameQuestion[4],
    };
    return question;
  }

  onEvent(name: string) {
    return this.web3.onEvents(name);
  }
}
