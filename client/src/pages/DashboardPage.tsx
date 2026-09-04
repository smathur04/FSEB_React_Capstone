import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import type { Recipe } from "../shared.types";
import recipeService from '../utils/recipeService';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import pencil from "../assets/pencil.png";
import trash from "../assets/trash.png";

interface DashboardPageProps {
  onSuccess?: () => void;
}

const DashboardPage = ({ onSuccess }: DashboardPageProps) => {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [mightdelete, setMight] = useState("");

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

  async function handleDelete() {
    try {
      await recipeService.remove(mightdelete);
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== mightdelete));
      onSuccess?.();
    } catch (err: any) {
      console.log(err.response?.data, "this is the actual validation error");
    } finally {
      setMight("");
    }
  }

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
                      <div style={{ display: "flex", justifyContent: "flex-end",  gap: "16px" }}>
                      <Link to={`/create/${recipe._id}`} className="" style={{ cursor: "default", textAlign: "right", fontSize: "12px" }}><img style={{ width: "32px", height: "32px" }} src={pencil} alt="Edit" /> </Link>
                      <a onClick = {() => setMight(recipe._id)} style={{ cursor: "default", textAlign: "right", fontSize: "12px" }}><img style={{ width: "32px", height: "32px" }} src={trash} alt="Delete" /> </a>
                      </div>
                    </div>
                  </div>

                ))}
              </div>)}
            </div >
            
            <div className="page-card__actions">
            <Button type="button" onClick={() => navigate("/create")} variant="primary">Create Recipe</Button>
            <Button type="button" variant="secondary" onClick={() => navigate("/recipes")}>Browse Recipes</Button>
            </div>
            
            <div>
              {mightdelete
                ? <div className="modal-overlay">
                    <div className="modal-box">
                      <h2>Delete recipe?</h2>
                      <p>Do you want to delete this recipe? This action cannot be undone.</p>
                      <div className="page-card__actions">
                      <Button type="button" onClick={() => handleDelete()} variant="primary">Yes, Delete Recipe</Button>
                      <Button type="button" variant="secondary" onClick={() => setMight("")}>Nevermind</Button>
                      </div>
                    </div>
                  </div>
                : <></>
              }
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage