import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Button } from "../../../components/ui/button"
import { X, Pencil, Loader2 } from "lucide-react"

const EditRecipe = ({ recipe, setEditRecipe, setRecipeList }) => {
  const [title, setTitle] = useState(recipe.title);
  const [desc, setDesc] = useState(recipe.desc);
  const [img, setImg] = useState(recipe.img);
  const [file, setFile] = useState(null);
  const [ingredients, setIngredients] = useState(recipe.ingredients || []);
  const [ingredient, setIngredient] = useState("");
  const [paragraphs, setParagraphs] = useState(recipe.paragraphs || []);
  const [paragraph, setParagraph] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prep_time, setPrep_time] = useState(recipe.prep_time || "");
  const [cook_time, setCook_time] = useState(recipe.cook_time || "");
  const [video_link, setVideo_link] = useState(recipe.video_link || "");
  const [category, setCategory] = useState(recipe.category || "");

  const handleIngredientInput = (e) => {
    setIngredient(e.target.value);
  };

  const handleIngredients = () => {
    if (ingredient.trim()) {
      setIngredients((prev) => [...prev, ingredient.trim()]);
      setIngredient("");
    }
  };

  const deleteIngredient = (indexToDelete) => {
    setIngredients(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  const handleInstructInput = (e) => {
    setParagraph(e.target.value);
  };

  const handleInstructions = () => {
    if (paragraph.trim()) {
      if (editingIndex >= 0) {
        // Edit existing instruction
        setParagraphs(prev => prev.map((p, i) => i === editingIndex ? paragraph.trim() : p));
        setEditingIndex(-1);
      } else {
        // Add new instruction
        setParagraphs(prev => [...prev, paragraph.trim()]);
      }
      setParagraph("");
    }
  };

  const startEditingInstruction = (index) => {
    setParagraph(paragraphs[index]);
    setEditingIndex(index);
  };

  const deleteInstruction = (indexToDelete) => {
    setParagraphs(prev => prev.filter((_, index) => index !== indexToDelete));
    if (editingIndex === indexToDelete) {
      setEditingIndex(-1);
      setParagraph("");
    }
  };

  const handleSubmit = async () => {
    if (!title || !desc || ingredients.length === 0 || paragraphs.length === 0) {
      setError("Please fill in all required fields and add at least one ingredient and instruction");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      let imageUrl = img;
      
      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "uploads");
        
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/du8fllxg7/image/upload",
          data
        );
        imageUrl = uploadRes.data.secure_url;
      }

      const res = await axios.put(`/api/recipes/${recipe._id}`, {
        title,
        desc,
        img: imageUrl,
        ingredients,
        paragraphs,
        prep_time,
        cook_time,
        video_link,
        category,
      });
      
      setRecipeList(prev => 
        prev.map(item => item._id === recipe._id ? res.data.data : item)
      );
      setEditRecipe(null);
    } catch (err) {
      console.error("Error updating recipe:", err);
      setError(err.response?.data?.message || "Error updating recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => setEditRecipe(null)}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 rounded-lg overflow-hidden bg-amber-50">
        <div className="bg-amber-50 px-6 pt-6 pb-4 border-b border-amber-200">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-amber-900">Edit Recipe</DialogTitle>
            <DialogDescription className="text-amber-700 font-serif">
              Update the recipe details below.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-6 overflow-y-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md mb-4 font-serif">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <Label htmlFor="image" className="font-serif text-amber-900">Choose a new image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="mt-2 border-amber-200 bg-white focus:ring-amber-500"
              />
              {img && !file && (
                <p className="mt-2 text-sm text-amber-700">Current image will be kept if no new image is selected</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="prep_time" className="font-serif text-amber-900">Preparation Time *</Label>
                <Input
                  id="prep_time"
                  type="text"
                  value={prep_time}
                  onChange={(e) => setPrep_time(e.target.value)}
                  placeholder="e.g., 30 minutes"
                  className="mt-2 border-amber-200 bg-white focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="cook_time" className="font-serif text-amber-900">Cooking Time *</Label>
                <Input
                  id="cook_time"
                  type="text"
                  value={cook_time}
                  onChange={(e) => setCook_time(e.target.value)}
                  placeholder="e.g., 1 hour"
                  className="mt-2 border-amber-200 bg-white focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="video_link" className="font-serif text-amber-900">Video Link (Optional)</Label>
                <Input
                  id="video_link"
                  type="url"
                  value={video_link}
                  onChange={(e) => setVideo_link(e.target.value)}
                  placeholder="Enter YouTube video URL"
                  className="mt-2 border-amber-200 bg-white focus:ring-amber-500"
                />
              </div>

              <div>
                <Label htmlFor="category" className="font-serif text-amber-900">Category</Label>
                <Input
                  id="category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Desserts, Main Course"
                  className="mt-2 border-amber-200 bg-white focus:ring-amber-500"
                />
              </div>

              <div>
                <Label className="font-serif text-amber-900">Ingredients *</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="ingreds"
                    type="text"
                    placeholder="2 tablespoons butter"
                    value={ingredient}
                    onChange={handleIngredientInput}
                    onKeyPress={(e) => e.key === 'Enter' && handleIngredients()}
                    className="border-amber-200 bg-white focus:ring-amber-500"
                  />
                  <Button 
                    onClick={handleIngredients}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-serif"
                  >
                    Add
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {ingredients.map((ingredient, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-serif flex items-center gap-2"
                    >
                      {ingredient}
                      <button
                        onClick={() => deleteIngredient(index)}
                        className="hover:text-amber-900 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <Label>Instructions *</Label>
                <div className="space-y-2 mt-2">
                  <Textarea
                    id="instruct"
                    rows={4}
                    value={paragraph}
                    onChange={handleInstructInput}
                    placeholder="Preheat oven to 450 then place cookie sheet with..."
                    onKeyPress={(e) => e.ctrlKey && e.key === 'Enter' && handleInstructions()}
                  />
                  <Button onClick={handleInstructions} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-serif">
                    {editingIndex >= 0 ? "Update Instruction" : "Add Instruction"}
                  </Button>
                </div>
                <div className="mt-2 space-y-2">
                  {paragraphs.map((instruction, index) => (
                    <div 
                      key={index}
                      className="p-3 bg-muted text-muted-foreground rounded-md flex items-start gap-2"
                    >
                      <div className="flex-1">
                        <span className="font-medium">Step {index + 1}:</span> {instruction}
                      </div>
                      <div className="flex gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => startEditingInstruction(index)}
                          className="hover:text-amber-900 transition-colors"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteInstruction(index)}
                          className="hover:text-amber-900 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleSubmit} 
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-serif" 
                disabled={isLoading}
              >
                {isLoading ? "Updating Recipe..." : "Update Recipe"}
              </Button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-amber-50 border-t border-amber-200 flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => setEditRecipe(null)}
            className="font-serif border-amber-200 text-amber-900 hover:bg-amber-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-amber-600 hover:bg-amber-700 text-white font-serif"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Recipe'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditRecipe; 