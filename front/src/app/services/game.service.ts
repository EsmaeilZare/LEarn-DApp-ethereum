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

  createGame(_gameDetails: GameDetails, _questions: Question[]): boolean {
    try {
      this.web3.executeTransaction(
        'createGame',
        _gameDetails.title,
        _gameDetails.description,
        _gameDetails.price,
        _gameDetails.numQuestions,
        _gameDetails.thumbnail,
        _questions
      );
      return true;
    } catch (error: any) {
      console.error('could not create the game! Due to: ', error.message);
      return false;
    }
  }

  async getGameInfo(_gameId: number): Promise<Game> {
    try {
      const rawGameInfo = await this.web3.call('getGameInfo', _gameId);
      return this.parseGameInfo(_gameId, rawGameInfo);
    } catch (error: any) {
      console.warn('could not retrieve game details due to : ', error.message);
      return null;
    }
  }

  async getAllGames(): Promise<Game[]> {
    try {
      const games: Game[] = [];
      const totalGamesCount = await this.getGamesCount();

      for (let gameId = 0; gameId < totalGamesCount; gameId++) {
        const game = await this.getGameInfo(gameId);
        games.push(game);
      }

      return games;
    } catch (error: any) {
      console.warn(
        'could not retrieve any game details due to : ',
        error.message
      );
      return [];
    }
  }

  async getGameQuestions(_gameId: number): Promise<Question[]> {
    const questions: Question[] = [];
    try {
      const respond = await this.web3.call('getGameQuestions', _gameId);
      const numQuestions = respond[0];
      const rawGameQuestions = respond[1];
      for (let i = 0; i < numQuestions; i++) {
        questions.push(this.parseGameQuestion(rawGameQuestions[i]));
      }
      return questions;
    } catch (error: any) {
      console.warn(
        'could not retrieve game questions details due to : ',
        error.message
      );
      return questions;
    }
  }

  async getGamesCount(): Promise<number> {
    try {
      const totalGamesCount = await this.web3.call('getGamesCount');
      return totalGamesCount;
    } catch (error: any) {
      console.warn(
        'could not retrieve number of games due to : ',
        error.message
      );
      return 0;
    }
  }

  parseGameInfo(_gameId: number, _rawGameInfo: any): Game {
    const details: GameDetails = {
      title: _rawGameInfo[0][0],
      description: _rawGameInfo[0][1],
      price: _rawGameInfo[0][2],
      numQuestions: _rawGameInfo[0][3],
      thumbnail: _rawGameInfo[0][4],
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
      text: _rawGameQuestion[0],
      options: _rawGameQuestion[1],
      answer: parseInt(_rawGameQuestion[2]),
    };
    return question;
  }

  onEvent(name: string) {
    return this.web3.onEvents(name);
  }
}
