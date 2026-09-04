import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import type { Recipe } from "../shared.types";
import recipeService from '../utils/recipeService';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';


const DashboardPage = () => {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<Recipe[]>([]);


  useEffect(() => {
    async function handleRecipeSearch() {
      try {
        const results: Recipe[] = await recipeService.getAll();
        setRecipes(results);
        console.log(results[0], "this is results");
      } catch (err) {
        console.log(err, "Error fetching recipes");
      }
    }
    handleRecipeSearch();
  }, []);



  return (
    <>
      <div className="page">
        <NavBar />
        <div className="page__content">
          <div className="page-card page-card--md">
            <div className="page-card__header">
              <p>Welcome back! Manage your recipes or add a new one.</p>
              <h1>Your Recipes</h1>
            </div>
            <div className="page-card__content">
              {recipes.length === 0 ? (
                <div className="empty-state">
                  <p>Your recipes will show up here.</p>
                </div>
              ) : (
              <div className="recipe-row">
                {recipes.map((recipe, i) => (
                  <div className="card" key={recipe.title + i}>
                    <img src={recipe.image} alt={recipe.title} className="card-image" />
                    <div className="card-body">
                      <h3 className="card-title">{recipe.title}</h3>
                      <p>Created on: {recipe.createdAt?.substring(0, 10)}</p>
                      <div className="">
                        {recipe.tags.map((tag) => (
                          <span className="tag" key={tag}>{tag}</span>
                        ))}
                      </div>
                      <Link to={`/recipes/${recipe._id}`} className="link link--sm" style={{ cursor: "default", textAlign: "left", fontSize: "12px" }}>View Recipe</Link>
                    </div>
                  </div>
                ))}
              </div>)}
            </div>

            <Button type="button" onClick={() => navigate("/create")} variant="primary">Create Recipe</Button>
            <Button type="button" variant="secondary" onClick={() => navigate("/recipes")}>Browse Recipes</Button>

          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage