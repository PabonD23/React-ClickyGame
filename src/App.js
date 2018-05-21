import React, { Component } from "react";
import CharacterCard from "./components/CharacterCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import characters from "./characters.json";
import "./App.css";

let topScore = 0;
let score = 0;
let clickAlert = "Click on an image card to earn points, but don't click on the image card more than once!";




class App extends Component {

  state = {
    characters,
    topScore,
    score,
    clickAlert
  };

clicked = id => {
  const characters = this.state.characters;

  const clickedCharacters = characters.filter((character => character.id === id));

    if(clickedCharacters[0].clicked){

      console.log("Top Score: " + topScore);
      console.log("Score: " + score);

      
      clickAlert = "You guessed incorrectly!"

      for(let i = 0; i < characters.length; i++){
        characters[i].clicked = false;
      }
      score = 0;
      this.setState({score});
      this.setState({clickAlert});
      this.setState({characters});

    }else if(topScore < 11){

      clickedCharacters[0].clicked = true;

      score++;

      clickAlert = "You guessed correctly!";

      if(score > topScore){
        topScore = score;
      }
      characters.sort(function(a, b){ return 0.5 - Math.random() });

      this.setState({characters});
      this.setState({topScore});
      this.setState({clickAlert});
      this.setState({score});

    }else{

      clickedCharacters[0].clicked = true;

      topScore = 0;

      clickAlert = "you did great, Try playing again!";

      topScore = 12;
      this.setState({topScore});

      for(let i = 0; i < characters.length; i++){
        characters[i].clicked = false;
      }

      characters.sort(function (a, b){ return 0.5 - Math.random() });

      this.setState({characters});
      this.setState({topScore});
      this.setState({clickAlert});

    }
  };

  render(){

    return (
      <Wrapper>
        <Title> 90's Cartoon Clicky Game!</Title>

        <h3 className="scoreSum">{this.state.clickAlert}</h3>

        <h3 className="scoreSum"> Score: {this.state.score} | Top Score: {this.state.topScore}</h3>

        {this.state.characters.map(character => (
          <CharacterCard
            clicked={this.clicked}
            id={character.id}
            key={character.id}
            image={character.image}
          />
        ))}
      </Wrapper>
    );

  }

}


export default App;



