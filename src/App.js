import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from "styled-components";

let TeamContainer = styled.div`
display: inline-block;
width: ${props => props.width ? props.width : '50%'};
height: 100vh;
background: ${props => props.bg ? props.bg : 'white'};
color: ${props => props.color ? props.color : 'palevioletred'};
`

class Team extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let {name: teamName, points, color, bg, balance, move, bet, overall} = this.props;
        return <TeamContainer color={color} bg={bg} width={`${overall}%}`}>
        <div>{teamName} : {points}</div>
        <input type="number" onChange={this.props.updateInput} min={0} max={balance} value={this.props.input}/>
        <br/>
        <button onClick={this.props.bet}>BET</button>
        <br/>
        <button>MOVE</button>
        </TeamContainer>
        
    }
}

class App extends Component {
    state = {
        balance: 100,
        teams: ["rcb", "csk"],
        rcb: {
            name: "rcb",
            points: 0,
            overall: 40,
            input: 0,
            color: "rgb(224, 189, 99)",
            bg: "rgb(241, 52, 69, 0.1)"
        }, 
        csk: {
            name: "csk",
            points: 0,
            overall: 60,
            input: 0,
            bg: "rgb(239, 184, 43, 0.1)",
            color: "rgb(18, 50, 118)"
        }
    }

    updateInput(team, e) {
        let t = this.state[team];
        this.setState({
            [team]: {
                ...t,
                input: e.target.value
            }
        })
    }
    
    bet = (team) => {
        let t = this.state[team];
        let input = t.input;
        let balance = parseInt(this.state.balance) - parseInt(input);
        let points = parseInt(t.points) + parseInt(input);
        this.setState({
            balance: balance,
            [team]: {
                ...t,
                points,
                input: 0
            }
        })
    }
    
    move = () => {
        
    }
    
    render() {
        let teams = this.state.teams;
        return (
            <div className="App">
            <div>{this.state.balance}</div>
            {teams.map(team => 
                <Team 
                    bet={this.bet.bind(this, team)} 
                    updateInput={this.updateInput.bind(this, team)}
                    move={this.move} 
                    balance={this.state.balance} 
                    key={team}
                    {...this.state[team]} />)}
                </div>
            );
        }
    }
    
    export default App;
    