import { useState, useEffect, useRef } from "react";
import Input from "../components/Input"
import Navbar from "../components/NavBar"
import recipeService from "../utils/recipeService";
import { useLoading } from "../LoadingContext";
import type { Recipe } from "../shared.types";
import { Link } from "react-router-dom";

const ExplorePage = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { setIsLoading } = useLoading();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    async function fetchRecipes() {
      //setIsLoading(true);
      try {
        const results = await recipeService.getAll(
          search ? { title: search } : undefined
        );
        setRecipes(results);
      } catch (err) {
        console.log(err, "Error fetching recipes");
      } finally {
        //setIsLoading(false);
      }
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchRecipes(); // load everything immediately on page load, no delay
    } else {
      debounceRef.current = setTimeout(fetchRecipes, 400); // debounce actual typing
    }

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search]);

  return (
    <>
      <div className="page">
        <Navbar />
        <div className="page__content">
          <div className="page-card page-card--md">
            <div className="page-card__header">
              <h1>Recipe List</h1>
              <Input
                label=""
                placeholder="Search recipes"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="page-card__content">
              <div className="recipe-grid">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExplorePage