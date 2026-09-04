import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import recipeService from "../utils/recipeService";
import { useLoading } from "../LoadingContext";
import type { Recipe } from "../shared.types";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    if (!id) return;

    async function fetchRecipe() {
      setIsLoading(true);
      try {
        const result = await recipeService.getById(id);
        setRecipe(result);
      } catch (err) {
        console.log(err, "Error fetching recipe");
        setError("Recipe not found");
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecipe();
  }, [id]);

  if (error) {
    return (
      <div className="page">
        <Navbar />
        <div className="page__content">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!recipe) return null;

  return (
    <div className="page">
      <Navbar />
      <div className="page__content">
        <div className="page-card page-card--md">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link to="/recipes" className="link">Recipe List</Link>
            <span>&gt;</span>
            <span>{recipe.title}</span>
          </div>

          <img src={recipe.image} alt={recipe.title} className="card-image" />
          <h1>{recipe.title}</h1>

          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing.quantity} {ing.name}</li>
            ))}
          </ul>

          <h2>Instructions</h2>
          <p>
            {recipe.instructions
              .slice()
              .sort((a, b) => a.step - b.step)
              .map((step) => step.description)
              .join(", ")}
          </p>

          <h2>Tags</h2>
          <div className="card-tags">
            {recipe.tags.map((tag) => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;