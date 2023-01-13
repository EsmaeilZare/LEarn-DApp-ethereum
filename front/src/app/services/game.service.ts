import { Injectable } from '@angular/core';
import { Web3Service } from 'src/app/blockchain/web3.service';
import { Game, GameDetails } from '../types';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private web3: Web3Service) {}

  createGameInfo(GameDetails: GameDetails) {
    this.web3.executeTransaction(
      'createGame',
      GameDetails.title,
      GameDetails.description,
      GameDetails.price,
      GameDetails.numQuestions,
      GameDetails.thumbnails
    );
  }

  async getAllGames(): Promise<Game[]> {
    try {
      const games: Game[] = [];
      const totalGamesCount = await this.web3.call('getTotalGames');

      for (let gameId = 0; gameId < totalGamesCount; gameId++) {
        const rawGame = await this.web3.call('getGame', gameId);
        games.push(this.parseGame(rawGame));
      }

      return games;
    } catch (error) {
      // alert('We could not retrieve games.\n');
      throw error;
    }
  }

  async getGame(_gameId: number): Promise<Game> {
    try {
      const rawGame = await this.web3.call('getGame', _gameId);
      return this.parseGame(rawGame);
    } catch (error) {
      // alert('We could not retrieve game.\n');
      throw error;
    }
  }

  play(gameId: number, score: number) {
    this.web3.executeTransaction('play', gameId, score);
  }

  parseGame(rawGame: any): Game {
    return {
      id: parseInt(rawGame[0]),
      words: rawGame[1].map((word: string) => this.web3.bytesToString(word)),
      meanings: rawGame[2].map((meaning: string) =>
        this.web3.bytesToString(meaning)
      ),
      title: rawGame[3][0],
      description: rawGame[3][1],
      thumbnail: rawGame[3][2],
      winnersCount: rawGame[4],
      createdByMe: rawGame[5] == 255 ? true : false,
      purchased: 0 < rawGame[5] && rawGame[5] < 255 ? true : false,
      nextLevel: rawGame[5],
    };
  }

  onEvent(name: string) {
    return this.web3.onEvents(name);
  }
}
