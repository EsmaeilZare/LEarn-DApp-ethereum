import { Injectable } from '@angular/core';
import { Web3Service } from 'src/app/blockchain/web3.service';
import { Player } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private web3: Web3Service) {}

  registerPlayer(): boolean {
    try {
      this.web3.executeTransaction('registerPlayer');
      return true;
    } catch (error: any) {
      console.error('could not register to the game! Due to: ', error.message);
      if (error.message == 'This user has already been registered') {
        return true;
      } else {
        return false;
      }
    }
  }

  async getPlayer(): Promise<Player> {
    try {
      const rawPlayer = await this.web3.call('getPlayer');
      return this.parsePlayer(rawPlayer);
    } catch (error: any) {
      console.warn(
        'could not retrieve player details due to : ',
        error.message
      );
      return null;
    }
  }

  async getPlayersCount(): Promise<number> {
    try {
      const totalPlayersCount = await this.web3.call('getPlayersCount');
      return totalPlayersCount;
    } catch (error: any) {
      console.warn(
        'could not retrieve number of players due to : ',
        error.message
      );
      return 0;
    }
  }

  purchase(_gameId: number) {
    try {
      this.web3.executeTransaction('purchase', _gameId);
      return true;
    } catch (error: any) {
      console.error('could not purchase the game! Due to: ', error.message);
      return false;
    }
  }

  play(_gameId: number, _score: number) {
    try {
      this.web3.executeTransaction('play', _gameId, _score);
      return true;
    } catch (error: any) {
      console.error(
        'could not save the result of game played! Due to: ',
        error.message
      );
      return false;
    }
  }

  rateGame(_gameId: number, _rating: number) {
    try {
      this.web3.executeTransaction('rateGame', _gameId, _rating);
      return true;
    } catch (error: any) {
      console.error(
        'could not save the rating of game you entered! Due to: ',
        error.message
      );
      return false;
    }
  }

  parsePlayer(rawPlayer: any): Player {
    return {
      id: rawPlayer[0],
      isRegistered: true,
      credit: rawPlayer[1],
      createdGames: rawPlayer[2].map((gameId: string) => parseInt(gameId)),
      purchasedGames: rawPlayer[3].map((gameId: string) => parseInt(gameId)),
    };
  }

  onEvent(name: string) {
    return this.web3.onEvents(name);
  }
}
