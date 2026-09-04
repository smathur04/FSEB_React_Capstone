export type User = {
  email: string;
  password: string;
};

export type Ingredient = {
  name: string;
  quantity: string;
};

export type Instruction = {
  step: number;
  description: string;
};

export type Recipe = {
  _id: string;
  title: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  tags: string[];
  owner?: string; // adjust/remove based on what your API actually returns
  createdAt?: string;
};

// Shape sent to the API when creating/updating — no _id, owner, or createdAt
export type RecipeInput = {
  title: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  tags: string[];
};