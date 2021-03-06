import React, {useState, useEffect} from 'react';
import RockPaperScissors from './contracts/RockPaperScissors.json';
import HumanToken from './contracts/HumanToken.json';
import AnimalWorldCollectionABI from './contracts/AnimalWorldCollection.json'
import  Web3 from 'web3';
import { getWeb3 } from './utils.js.js';
import {ethers} from 'ethers'

//img
import rockImg from './assets/img/rock.jpg';
import paperImg from './assets/img/paper.jpg';
import scissorsImg from './assets/img/scissors.jpg';
//material ui
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
//

//Grid
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
//

function RockPaperScissorsPage() {
  const [web3, setWeb3] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [tokenContract, setTokenContract] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [testValue, setTestValue] = useState(undefined);
  const [choice, setChoice] = useState(undefined);
  const [result, setResult] = useState(undefined);


  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = RockPaperScissors.networks[networkId];

      const contract = new web3.eth.Contract(
          RockPaperScissors.abi,
          deployedNetwork && deployedNetwork.address,
      );

      const tokenContract = new web3.eth.Contract(
          AnimalWorldCollectionABI.abi,
           "0x9b154439b7351E8d347f66844D19796C2eF81F5E",
      );

      setWeb3(web3);
      setAccounts(accounts);
      setContract(contract);
      setTokenContract(tokenContract);
    }
    init();
    window.ethereum.on('accountsChanged', accounts => {
      setAccounts(accounts);
    });

  }, []);

  // async function makeChoice(e){
  //   e.preventDefault();
  //   const re = await contract.methods.test2().call();
  //   setTestValue(re);
  //   console.log(re);
  //   console.log(testValue);
  // }
  async function setToken(e){
    e.preventDefault();
    await contract.methods.setTokenAddress("0x29B3f5358ADF061c696bd2FF3d9113fdfAC547dC").send({from: accounts[0]});
    console.log( contract.methods.getTokenAddress().call());
    // console.log(tokenContract);
    // console.log( await tokenContract.methods.totalSupply().call());

  }

  async function join(e){
    e.preventDefault();
    await tokenContract.methods.approve("0xED9cb36ad1520E14e2bE91e23C9442D16299747D",ethers.utils.parseUnits("1000000000","ether")).send({from: accounts[0]});
    // await contract.methods.approveToken().send({from: accounts[0]});
    await contract.methods.join().send({from: accounts[0]});
    console.log(accounts[0]);
  }

  async function rock(e){
    e.preventDefault();
    const mc = await contract.methods.makeChoice("Rock").send({from: accounts[0]});
    const re =   await contract.methods.showChoice().call();
    console.log(re);
  }

  async function paper(e){
    e.preventDefault();
    const mc = await contract.methods.makeChoice("Paper").send({from: accounts[0]});
    const re =   await contract.methods.showChoice().call();
    console.log(("Paper"));
  }

  async function scissor(e){
    e.preventDefault();
    const mc = await contract.methods.makeChoice("Scissor").send({from: accounts[0]});
    const re =   await contract.methods.showChoice().call();
    console.log("Scissor");
  }

  async function showResult(e){
    e.preventDefault();
    var re =   await contract.methods.showResult().call();
    if(re == 3){
      re = "Player2 wins";
    }
    if(re == 2){
      re = "Player1 wins";
    }
    if(re == 1){
      re = "Deuce";
    }
    if(re == 0){
      re = "Please make choice";
    }
    setResult(re);
    console.log(re);
    // await contract.methods.finishGame().send({from: accounts[0]});
  }

  async function newGame(e){
    e.preventDefault();
    await contract.methods.finishGame().send({from: accounts[0]});


    console.log(34);
  }

  async function mint(e){
    e.preventDefault();
    await tokenContract.methods.mint(1).send({from: accounts[0]});


    console.log(34);
  }

  async function test2(e){
    e.preventDefault();
    const re = await contract.methods.test3().call();
    setTestValue(re);
    console.log(re);
    console.log(testValue);
  }

  if (!web3) {
    return <div>Loading...</div>;
  }

  return (

  <React.Fragment>
    <CssBaseline />
    <Container maxWidth="md">
      <div className="App">
        <div className="desk">

        </div>
        <Button variant="contained" disableElevation onClick = {e => setToken(e)}>
          ----- Set Token Address ------
        </Button>
        <h1>10 tokens bet for every game.10% token will go to funds for charity.</h1>
        <Button variant="contained" disableElevation onClick = {e => join(e)}>
          ----- Join the Game ------
        </Button>
        <h2>Moves: </h2>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4} md={4}>
              <Item onClick = {e => rock(e)} ><img src={rockImg} width="200" height="160"/></Item>
            </Grid>
            <Grid item xs={4} md={4}>
              <Item  onClick = {e => paper(e)} ><img src={paperImg} width="200" height="160"/></Item>
            </Grid>
            <Grid item xs={4} md={4}>
              <Item onClick = {e => scissor(e)} ><img src={scissorsImg} width="200" height="160"/></Item>
            </Grid>
          </Grid>
        </Box>
        {/*<div>*/}
        {/*  <div onClick = {e => rock(e)} >Rock</div>*/}
        {/*  <div onClick = {e => paper(e)}>Paper</div>*/}
        {/*  <div onClick = {e => scissor(e)}>Scissor</div>*/}
        {/*  <div>Current Choice:</div>*/}
        {/*</div>*/}
        <h2>Current Choice: </h2>

        <form onSubmit={e => showResult(e)}>
          {/*<button type="submit">Submit</button>*/}
          <button type="submit">Reveal Result and new a game</button>
          <p>{testValue && `Result: ${testValue}`}</p>
          <p>{result && `Result: ${result}`}</p>
        </form>
        <div> <button type="submit" onClick = {e => newGame(e)}>New Game</button></div>
        <div> <button type="submit" onClick = {e => mint(e)}>Mint</button></div>
      </div>
      {/*<Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />*/}
    </Container>
  </React.Fragment>
  );
}

export default RockPaperScissorsPage;