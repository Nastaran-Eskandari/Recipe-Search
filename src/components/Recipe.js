import React from 'react';
import {Link} from 'react-router-dom';

class Recipe extends React.Component{

    state ={
        activerecipe : []
    }
    
    componentDidMount(){
        const title = this.props.location.state.recipe;
        fetch(`https://www.food2fork.com/api/search?key=899ef69fb0af62bf8d8abf5f76e4a1fc&q=${title}`)
        .then(response => response.json())
        .then(data => {
        this.setState({activerecipe : data.recipes[0]});
        console.log(this.state.activerecipe)
        })
        .catch(err=>{
        console.log(err)
        });
        }
    render(){
        const recipe = this.state.activerecipe;
        return(
            <div className="container">
                { this.state.activerecipe.length !==0 &&
                <div className="active-recipe">
                    <img className="active-recipe__img" src={recipe.image_url} alt={recipe.title} />
                <h3 className="active-recipe__title">{recipe.title}</h3>
                <h4 className="active-recipe__publisher">publisher : <span>{recipe.publisher}</span></h4>
                <p className="active-recipe__website">Website : <span>< a href={recipe.publisher_url}>{recipe.publisher_url}</a></span></p>
                <button  className="active-recipe__button">
                    <Link to="/" >
                    go home</Link>
                    </button>
                    
                    </div>
                }
            </div>
        )
    }
}

export default Recipe ;