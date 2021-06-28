import React, { Component } from "react";
import SimpleStorageContract from "./contracts/TestOne.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, contract: null, numberBox: 0 };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runInit);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runInit = async () => {
    const { accounts, contract } = this.state;

  };

  handleChangeNumberBox = (event) => {
    this.setState({numberBox: event.target.value});
  }

  handleSubmitBuyBox = async (event) => {
    const { accounts, contract, numberBox } = this.state;
    event.preventDefault();
    await contract.methods.mintTest(accounts[0], event.target.numberBox.value).send({ from: accounts[0], value: await contract.methods.price(numberBox).call() });
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h2>Smart Contract Example TestOne ERC721</h2>
        <form onSubmit={this.handleSubmitBuyBox}>
            <label>
              Nombre de Box :
              <input name="numberBox" type="text" value={this.state.numberBox} onChange={this.handleChangeNumberBox} />
            </label>
          <input type="submit" value="Acheter" />
          </form>
      </div>
    );
  }
}

export default App;
