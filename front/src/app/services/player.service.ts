import { Injectable } from '@angular/core';
import { Web3Service } from 'src/app/blockchain/web3.service';
import { Player } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private web3: Web3Service) {}

  register() {
    this.web3.executeTransaction('registerPlayer');
  }

  async getPlayer(): Promise<Player> {
    const rawPlayer = await this.web3.call('getPlayer');
    return this.parsePlayer(rawPlayer);
  }

  parsePlayer(rawPlayer: any): Player {
    return {
      id: rawPlayer[0],
      credit: rawPlayer[1],
      createdGames: rawPlayer[2].map((gameId: string) => parseInt(gameId)),
      purchasedGames: rawPlayer[3].map((gameId: string) => parseInt(gameId)),
    };
  }
}
