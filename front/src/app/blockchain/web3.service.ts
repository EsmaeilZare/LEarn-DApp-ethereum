import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { environment } from 'src/environments/environment';

const contractAbi = require('./contractABI.json');
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private web3: Web3;
  private contract: Contract;
  private contractAddress = environment.CONTRACT_ADDRESS;
  private account: string = '';

  constructor(private zone: NgZone) {
    if (window.web3) {
      this.web3 = new Web3(window.ethereum);
      this.contract = new this.web3.eth.Contract(
        contractAbi,
        this.contractAddress
      );
    } else {
      console.warn('Metamask not found. Install or enable Metamask.');
    }
  }

  async onInit(): Promise<void> {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const acc = accounts[0];
    if (acc != null) {
      this.account = Web3.utils.toChecksumAddress(acc);
    } else {
      console.warn('Ethereum account is not available');
    }
  }

  async getAccount(): Promise<string> {
    if (this.account == '') {
      return this.onInit().then(() => {
        return this.account;
      });
    } else {
      return this.account;
    }
  }

  async executeTransaction(fnName: string, ...args: any[]): Promise<void> {
    const acc = await this.getAccount();
    return this.contract.methods[fnName](...args)
      .send({ from: acc })
      .catch(this.handleError);
  }

  async call(fnName: string, ...args: any[]) {
    const acc = await this.getAccount();
    return this.contract.methods[fnName](...args)
      .call({ from: acc })
      .catch(this.handleError);
  }

  onEvents(event: string) {
    return new Observable((observer) => {
      this.contract.events[event]().on('data', async (data: any) => {
        console.log('hey look what I found! => ', data.returnValues);
        if (data.returnValues.playerId) {
          const acc = await this.getAccount();
          if (acc != data.returnValues.playerId) {
            console.log('TaDAAAAAAAAAAAaa => ', data.returnValues.playerId);
            // return;
          }
        }
        this.zone.run(() => {
          observer.next({
            event: data.event,
            payload: data.returnValues,
          });
        });
      });
    });
  }

  bytesToString(str: string) {
    return this.web3.utils.hexToAscii(str);
  }

  stringToBytes(str: string) {
    return this.web3.utils.asciiToHex(str);
  }

  private handleError(error: any) {
    let reason = 'unknown';

    let begin = error.message.indexOf('{');
    if (begin > 0) {
      let data = JSON.parse(error.message.substr(begin))['data'];
      for (const e in data) {
        if ('reason' in data[e]) {
          reason = data[e]['reason'];
          console.warn(reason);
        }
      }
    }
    throw new Error(reason);
  }
}
