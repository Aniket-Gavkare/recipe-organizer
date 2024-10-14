import { useState } from 'react';
import axios from 'axios';

const AddRecipePage = () => {
  const [recipe, setRecipe] = useState({ title: '', ingredients: '', category: '', instructions: '' });

  const handleChange = (e) => setRecipe({ ...recipe, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/recipes', recipe);
    alert('Recipe added!');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input name="title" placeholder="Title" onChange={handleChange} className="block mb-2" />
      <input name="ingredients" placeholder="Ingredients" onChange={handleChange} className="block mb-2" />
      <input name="category" placeholder="Category" onChange={handleChange} className="block mb-2" />
      <textarea name="instructions" placeholder="Instructions" onChange={handleChange} className="block mb-2" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Recipe</button>
    </form>
  );
};

export default AddRecipePage;
