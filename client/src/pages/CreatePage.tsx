import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import Input from "../components/Input";
import Button from "../components/Button";
import recipeService from "../utils/recipeService";
import { useLoading } from "../LoadingContext";
import type { RecipeInput } from "../shared.types";

interface CreateRecipePageProps {
  onSuccess?: () => void;
}

const CreateRecipePage = ({ onSuccess }: CreateRecipePageProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (!id) return;
    const recipeId = id;

    async function fetchRecipe() {
      setIsLoading(true);
      try {
        const recipe = await recipeService.getById(recipeId);
        setTitle(recipe.title);
        setIngredients(recipe.ingredients.map((ing) => ing.name).join(", "));
        setInstructions(
          recipe.instructions
            .slice()
            .sort((a, b) => a.step - b.step)
            .map((step) => step.description)
            .join(", ")
        );
        setTags(recipe.tags.join(", "));
        setImage(recipe.image);
      } catch (err) {
        console.log(err, "Error fetching recipe for edit");
        setError("Could not load this recipe for editing.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecipe();
  }, [id]);

  async function handleSave() {
    setIsLoading(true);
    setError(null);

    const recipe: RecipeInput = {
      title,
      description: "No description provided",
      image,
      ingredients: ingredients
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean)
        .map((name) => ({ name, quantity: "to taste" })),
      instructions: instructions
        .split(",")
        .map((description) => description.trim())
        .filter(Boolean)
        .map((description, i) => ({ step: i + 1, description })),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      if (id) {
        await recipeService.update(id, recipe);
      } else {
        await recipeService.create(recipe);
      }
      onSuccess?.();
      navigate("/dashboard");
    } catch (err: any) {
      console.log(err.response?.data, "this is the actual validation error");
      setError("Something went wrong saving this recipe.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="page">
      <Navbar />
      <div className="page__content">
        <div className="page-card page-card--sm">
          <div className="page-card__header" style={{ alignItems: "center", textAlign: "center" }}>
            <h1>{id ? "Edit Recipe" : "Create a Recipe"}</h1>
          </div>

          <div className="page-card__stack">
            <Input label="Title" placeholder="" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input label="Ingredients" placeholder="" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
            <Input label="Instructions" placeholder="" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
            <Input label="Tags" placeholder="" value={tags} onChange={(e) => setTags(e.target.value)} />

            <div className="form-group">
              <label className="form-label">Image</label>
              <input
                className="form-input"
                style={{ minHeight: "160px", textAlign: "center", color: "var(--color-green-300)" }}
                placeholder="+ Add Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            {error && <p className="form-error-text">{error}</p>}
          </div>

          <div className="page-card__actions">
            <Button type="button" variant="primary" onClick={handleSave}>Save</Button>
            <Button type="button" variant="secondary" onClick={() => navigate("/dashboard")}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipePage;