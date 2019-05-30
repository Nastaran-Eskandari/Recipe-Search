import React from 'react';
import { Component } from 'react';
import './App.css';
import Form from './components/Form';
import Recipes from './components/Recipes';

const APIkey ="ccd06b465d98454616b53e9c44d340f8";

class App extends Component {

  constructor(props) {
    super(props);

    this.state ={
      recipes :[]
    }

    this.getRecipe = this.getRecipe.bind(this);
}
 

  getRecipe(e) {
    const recipeName = e.target.recipeName.value;
    e.preventDefault();  
    fetch(`https://www.food2fork.com/api/search?key=899ef69fb0af62bf8d8abf5f76e4a1fc&q=${recipeName}&count=10`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        recipes: data.recipes
      });
    })
    .catch(err=>{
      console.log(err)
    });
  }

  componentDidUpdate(){
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem('recipes' , recipes);
  }

  componentDidMount(){
    const json = localStorage.getItem('recipes');
    const recipes = JSON.parse(json);
    this.setState({
      recipes : recipes
    })
  }
  render() {
    let recipes = this.state.recipes;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;


