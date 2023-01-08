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
  private account: string = null;

  constructor(private zone: NgZone) {
    if (window.web3) {
      this.web3 = new Web3(window.ethereum);
      this.contract = new this.web3.eth.Contract(
        contractAbi,
        this.contractAddress
      );

      window.ethereum.enable().catch((err: any) => console.log(err));
    } else {
      console.warn('Metamask not found. Install or enable Metamask.');
    }
  }

  async onInit(): Promise<void> {
    await window.ethereum.enable();
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const acc = accounts[0];
    this.account = Web3.utils.toChecksumAddress(acc);
  }

  getAccount(): string {
    if (this.account == null) {
      this.onInit();
    }
    return this.account;
  }

  async executeTransaction(fnName: string, ...args: any[]): Promise<void> {
    const acc = this.getAccount();
    this.contract.methods[fnName](...args).send({ from: acc });
  }

  async call(fnName: string, ...args: any[]) {
    const acc = this.getAccount();
    return this.contract.methods[fnName](...args).call({ from: acc });
  }

  onEvents(event: string) {
    return new Observable((observer) => {
      this.contract.events[event]().on(
        'data',
        (data: { event: string; returnValues: any }) => {
          this.zone.run(() => {
            observer.next({ event: data.event, payload: data.returnValues });
          });
        }
      );
    });
  }

  bytesToString(str: string) {
    return this.web3.utils.hexToAscii(str);
  }

  stringToBytes(str: string) {
    return this.web3.utils.asciiToHex(str);
  }
}
