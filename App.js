import React, { Component } from 'react';
import Web3 from 'web3'
import NavBar from './NavBar'
import './App.css';

class App extends Component {
    
   async componentWillMount() {
       await this.loadWeb3()
       await this.loadBlockchainData()
   }
    
   async loadBlockchainData() {
     const web3 = window.web3
     
     const accounts = await web3.eth.getAccounts()
     this.setState({ account: accounts[0] })
     console.log(this.state.accounts)
       
     const ethBalance = await web3.eth.getbalnce(this.state.account) 
     this.setState({ eathBalance: ethBalance })
   } 
    
   async loadWeb3() {
window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});
    }
    
    constructor(props) {
    super(props)
    this.state = {
       account: '',
       ethBalance: '0' 
    }
  }
    
  render() {
    return (
      <div>
        <NavBar accounts= {this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
                <h1>Hello, World!</h1>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
