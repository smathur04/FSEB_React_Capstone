import { useState, useEffect } from "react";
import Input from "../components/Input"
import Navbar from "../components/NavBar"
import recipeService from "../utils/recipeService";
import { useLoading } from "../LoadingContext";
import type { Recipe } from "../shared.types";
import { Link } from "react-router-dom";

const ExplorePage = () => {
  const [form, setForm] = useState({ search: "" });
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [attempted, setAttempted] = useState(false);
  const { setIsLoading } = useLoading();
  

  async function handleRecipeSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAttempted(true);
    setIsLoading(true);

    try {
      const results: Recipe[] = await recipeService.getAll(form.search);
      console.log(results[0]);
      setRecipes(results);
    } catch (err) {
      console.log(err, "Error fetching recipes");
    } finally {
      setIsLoading(false);
      setAttempted(false);
    }
  }

  useEffect(() => {
    recipeService.getAll("").then(setRecipes).catch(console.error);
  }, []);

  return (
    <>
        <div className="page">
            <Navbar />
            <div className="page__content">
              <div className="page-card page-card--md">
                  <div className="page-card__header">
                      <h1>Recipe List</h1>
                      <form id="recipe-search-form" onSubmit={handleRecipeSearch} className="page-card__stack">
                        <Input label="" placeholder="Search recipes" type="text" attempted = {attempted}
                        onChange={(e) => setForm({ ...form, search: e.target.value })}
                        errorMessages={["Please enter a valid search term"]} />
                      </form>
                  </div>
                  <div className="page-card__content">
                      <div className="recipe-grid">
                        {recipes.map((recipe, i) => (
                          <div className="card" key={recipe.title + i}>
                            <img src={recipe.image} alt={recipe.title} className="card-image" />
                            <div className="card-body">
                              <h3 className="card-title">{recipe.title}</h3>
                              <p>Created on: {recipe.createdAt.substring(0, 10)}</p>
                              <div className="">
                                {recipe.tags.map((tag) => (
                                  <span className="tag" key={tag}>{tag}</span>
                                ))}
                              </div>
                              <Link to={`/recipes/${recipe._id}`} className="link link--sm" style={{ cursor: "default", textAlign: "left", fontSize: "12px" }}>View Recipe</Link>
                            </div>
                          </div>
                        ))}
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default ExplorePage