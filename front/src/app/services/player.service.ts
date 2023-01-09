import { Injectable } from '@angular/core';
import { Web3Service } from 'src/app/blockchain/web3.service';
import { Player } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private web3: Web3Service) {}

  register() {
    try {
      this.web3.executeTransaction('registerPlayer');
    } catch (error) {
      alert('there was an error while registering in the game.\n');
      throw error;
    }
  }

  async getPlayer(): Promise<Player> {
    try {
      const rawPlayer = await this.web3.call('getPlayer');
      return this.parsePlayer(rawPlayer);
    } catch (error) {
      alert('We could not retrieve your account detail on the game.\n');
      throw error;
    }
  }

  parsePlayer(rawPlayer: any): Player {
    return {
      id: rawPlayer[0],
      credit: rawPlayer[1],
      createdGames: rawPlayer[2].map((gameId: string) => parseInt(gameId)),
      purchasedGames: rawPlayer[3].map((gameId: string) => parseInt(gameId)),
    };
  }

  onEvent(name: string) {
    return this.web3.onEvents(name);
  }
}
