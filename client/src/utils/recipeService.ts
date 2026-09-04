import api from "../utils/api";
import type { Recipe, RecipeInput } from "../shared.types";

async function getAll(search?: string): Promise<Recipe[]> {
  const res = await api.get("api/recipes", {
    params: search ? { q: search } : undefined,
  });
  return res.data;
}

async function getById(id: string): Promise<Recipe> {
  const res = await api.get(`api/recipes/${id}`);
  return res.data;
}

async function create(recipe: RecipeInput): Promise<Recipe> {
  const res = await api.post("api/recipes", recipe);
  return res.data;
}

async function update(id: string, recipe: RecipeInput): Promise<Recipe> {
  const res = await api.put(`api/recipes/:${id}`, recipe);
  return res.data;
}

async function remove(id: string): Promise<void> {
  await api.delete(`api/recipes/${id}`);
}

export default { getAll, getById, create, update, remove };