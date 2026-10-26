# LEarn DApp

Ethereum quiz marketplace. Players register, create or buy quizzes, play on-chain, and earn or lose in-contract credits. Solidity contract + Angular client talking to it through MetaMask and Web3.js.

Educational project (2023). Not production-hardened.

## Stack

- Solidity `>=0.7.0 <0.9.0` — `GameContract` in [`front/src/app/blockchain/Game.sol`](front/src/app/blockchain/Game.sol)
- Angular 15 + TypeScript
- Web3.js 1.8 + MetaMask
- Contract ABI: [`front/src/app/blockchain/contractABI.json`](front/src/app/blockchain/contractABI.json)

## What the contract does

In-contract credit (not ETH transfers). New players get **500** credit.

| Action | Rule |
|---|---|
| Register | Once per address |
| Create game | 10–100 questions, price 10–50, cost = `price * 5` credit |
| Purchase | Buyer pays game price in credit; cannot buy own game |
| Play | Score 0–100. Below 50 loses credit; at/above 50 gains credit vs high score |
| Rate | 1–100 (UI can show as 0–10). Buyers only |

Access is enforced with modifiers (registered player, valid game id, credit check, creator vs buyer). Events: `PlayerRegistered`, `GameCreated`, `GamePurchased`, `GameResult`, `GameRated`. Custom revert strings use `__TX_ERROR__...__TX_ERROR__` so the client can show the reason.

## Repo layout

```
front/src/app/blockchain/Game.sol     # contract
front/src/app/blockchain/web3.service.ts
front/src/app/components/             # register, create, list, play, profile
```

There is no Hardhat/Foundry project in this repo. Deploy `Game.sol` yourself (Remix is enough), then point the app at the address.

## Run

Needs Node, MetaMask, and a deployed `GameContract`.

```bash
cd front
cp .env.example .env
# set CONTRACT_ADDRESS=0x...
npm install
npm start
```

`npm start` writes `CONTRACT_ADDRESS` into `src/environments/environment.ts` via `scripts/setenv.ts`, then serves the app.

## Notes

- Correct answers are stored on-chain, so this is not a cheat-proof quiz.
- Credits are an in-contract balance, not ETH.
- License on the contract: GPL-3.0.
