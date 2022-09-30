# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


## Purpose
1. this demo aim to make a concrete example on how to make a ETH transaction
in minimum code
2. reader can have more derived knowledge from the involved entity like provider, signer, etc
## Prerequisite

1. [common terms of ethers.js](https://docs.ethers.io/v5/getting-started/#getting-started--glossary)
2. connect to MetaMask (testnet **Ropsten** is working in this demo)
3. balance of ETH is stored as **Wei** on chain, so when you get balance from chain, you need to call `formatEther` to format to ETH, and when you want to send transaction request, you need to call `parseUnits` to format to **Wei**

## Transfer Process

1. add web3-react context - `Web3ReactProvider` ([source code](https://github.com/Uniswap/web3-react/blob/v6/packages/core/src/provider.tsx))
   ```tsx
   <Web3ReactProvider getLibrary={getLibrary}>
     <App>
   </Web3ReactProvider>
   ```
   this make the data in hooks available
2. call activate to connect to wallet
   [InjectedConnector](https://github.com/Uniswap/web3-react/blob/v6/packages/injected-connector/src/index.ts#L27) is to handle modified behavior like account change, blockchain change, etc
   call `activate` will connect to wallet

   ```ts
   enum ChainId {
     MAIN_NET = 1,
     ROPSTEN = 3,
     RINKEBY = 4,
     GOERLI = 5,
     KOVAN = 42,
   }

   const injectedConnector = new InjectedConnector({
     supportedChainIds: [ChainId.MAIN_NET, ChainId.ROPSTEN, ChainId.RINKEBY, ChainId.GOERLI, ChainId.KOVAN],
   })

   const { activate } = useWeb3React<Web3Provider>()
   ```

3. send transaction to transfer ETH

   ```ts
   enum FAUCET_ADDRESS {
     ROPSTEN = '0x81b7e08f65bdf5648606c89998a9cc8164397647',
   }

   const { library } = useWeb3React<Web3Provider>()

   library?.getSigner().sendTransaction({
     to: FAUCET_ADDRESS.ROPSTEN,
     value: parseUnits(value?.toString()),
   })
   ```
