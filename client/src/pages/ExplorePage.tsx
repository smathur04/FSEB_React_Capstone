import { useState, useEffect } from "react";
import Input from "../components/Input"
import Navbar from "../components/NavBar"
import recipeService from "../utils/recipeService";
import { useLoading } from "../LoadingContext";
import type { Recipe } from "../shared.types";


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
                      <ul className="recipe-list">
                          {recipes.map((recipe) => (
                              <li key={recipe.title} className="">
                                  <h2>{recipe.title}</h2>
                                  <p>{recipe.description}</p>
                              </li>
                          ))}
                      </ul>
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default ExplorePage