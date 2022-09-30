import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import './App.css'
import { useEffect, useRef, useState } from 'react'
import { formatEther, parseUnits } from 'ethers/lib/utils'

enum FAUCET_ADDRESS {
  ROPSTEN = '0x81b7e08f65bdf5648606c89998a9cc8164397647',
}

enum ChainId {
  MAIN_NET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
}

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

const ConnectWallet = () => {
  const [balance, setBalance] = useState('')
  const injectedConnector = new InjectedConnector({
    supportedChainIds: [ChainId.MAIN_NET, ChainId.ROPSTEN, ChainId.RINKEBY, ChainId.GOERLI, ChainId.KOVAN],
  })
  const { chainId, account, activate, active, library, deactivate } = useWeb3React<Web3Provider>()
  const transNumInput = useRef<HTMLInputElement>(null)
  const onClick = () => {
    activate(injectedConnector)
  }

  useEffect(() => {
    if (account) {
      library?.getBalance(account).then((result) => {
        setBalance(formatEther(result))
      })
    }
  })

  return (
    <div>
      <div>ChainId: {chainId}</div>
      <div>Account: {account}</div>
      <div>Balance: {balance}</div>

      {active ? (
        <>
          <div>✅ </div>
          <div>
            <button onClick={() => deactivate()}>disconnect</button>
          </div>
        </>
      ) : (
        <button type="button" onClick={onClick}>
          Connect Connect
        </button>
      )}
      <div>
        how many you want to transfer: <input type="number" ref={transNumInput} /> ETH
        <br />
        transfer to address: <span style={{ color: 'red' }}>{FAUCET_ADDRESS.ROPSTEN}</span>,&nbsp;
        <button
          onClick={() => {
            const value = transNumInput?.current?.value
            if (value) {
              library
                ?.getSigner()
                .sendTransaction({
                  to: FAUCET_ADDRESS.ROPSTEN,
                  value: parseUnits(value?.toString()),
                })
                .then(console.log)
                .catch(console.log)
            }
          }}
        >
          Transfer
        </button>
      </div>
    </div>
  )
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="container">
        <h1>web3-react demo</h1>
        <ConnectWallet />
      </div>
    </Web3ReactProvider>
  )
}

export default App
