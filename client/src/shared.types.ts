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
  title: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  tags: string[];
  _id: string;
  createdAt: string;
  ownerId: string;
  updatedAt: string;
};

export type RecipeInput = {
  title: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  tags: string[];
};