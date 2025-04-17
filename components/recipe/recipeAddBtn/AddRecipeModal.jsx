import { useState } from "react"
import axios from "axios"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../ui/dialog"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"
import { Button } from "../../ui/button"

const AddRecipe = ({ setClose, setRecipeList }) => {
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [prep_time, setPrep] = useState("")
    const [cook_time, setCook] = useState("")
    const [category, setCategory] = useState("")
    const [rating, setRating] = useState(4.5)
    const [videoLink, setVideoLink] = useState("none")
    const [ingredients, setIngredients] = useState([])
    const [ingredient, setIngredient] = useState("")
    const [paragraphs, setParagraphs] = useState([])
    const [paragraph, setParagraph] = useState("")
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleIngredientInput = (e) => {
        setIngredient(e.target.value)
    }

    const handleIngredients = () => {
        if (ingredient.trim()) {
            setIngredients((prev) => [...prev, ingredient.trim()])
            setIngredient("")
        }
    }

    const handleInstructInput = (e) => {
        setParagraph(e.target.value)
    }

    const handleInstructions = () => {
        if (paragraph.trim()) {
            setParagraphs((prev) => [...prev, paragraph.trim()])
            setParagraph("")
        }
    }

    const handleCreate = async () => {
        if (!file || !title || !desc || ingredients.length === 0 || paragraphs.length === 0) {
            setError("Please fill in all required fields and add at least one ingredient and instruction");
            return;
        }

        setError(null);
        setIsLoading(true);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "uploads");
        
        try {
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/du8fllxg7/image/upload",
                data
            );

            const newRecipe = {
                title,
                ingredients,
                prep_time,
                cook_time,
                desc,
                img: uploadRes.data.secure_url,
                videoLink,
                rating,
                category,
                paragraphs,
            };

            const response = await axios.post("/api/recipes", newRecipe);
            setRecipeList(prev => [...prev, response.data]);
            setClose(true);
        } catch (err) {
            console.error("Error creating recipe:", err);
            setError(err.response?.data?.message || "Error creating recipe. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={true} onOpenChange={() => setClose(true)}>
            <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 rounded-lg overflow-hidden bg-amber-50">
                <div className="bg-amber-50 px-6 pt-6 pb-4 border-b border-amber-200">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-serif text-amber-900">Add New Recipe</DialogTitle>
                        <DialogDescription className="text-amber-700 font-serif">
                            Fill in the details for your new recipe below.
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
                            <Label htmlFor="image" className="font-serif text-amber-900">Choose an image *</Label>
                            <Input
                                id="image"
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="mt-2 border-amber-200 bg-white focus:ring-amber-500"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="title" className="font-serif text-amber-900">Title *</Label>
                            <Input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter recipe title"
                                className="mt-2 border-amber-200 bg-white focus:ring-amber-500"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="description" className="font-serif text-amber-900">Description *</Label>
                            <Textarea
                                id="description"
                                rows={4}
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder="Describe your recipe"
                                className="mt-2 border-amber-200 bg-white focus:ring-amber-500"
                                required
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
                                        className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-serif"
                                    >
                                        {ingredient}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="prep_time" className="font-serif text-amber-900">Prep Time (mins)</Label>
                                <Input
                                    id="prep_time"
                                    type="number"
                                    onChange={(e) => setPrep(String(e.target.value) + " mins")}
                                    className="mt-2 border-amber-200 bg-white focus:ring-amber-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor="cook_time" className="font-serif text-amber-900">Cook Time (mins)</Label>
                                <Input
                                    id="cook_time"
                                    type="number"
                                    onChange={(e) => setCook(String(e.target.value) + " mins")}
                                    className="mt-2 border-amber-200 bg-white focus:ring-amber-500"
                                />
                            </div>
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
                            <Label className="font-serif text-amber-900">Instructions *</Label>
                            <div className="space-y-2 mt-2">
                                <Textarea
                                    id="instruct"
                                    rows={4}
                                    value={paragraph}
                                    onChange={handleInstructInput}
                                    placeholder="Preheat oven to 450 then place cookie sheet with..."
                                    className="border-amber-200 bg-white focus:ring-amber-500"
                                />
                                <Button onClick={handleInstructions} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-serif">
                                    Add Instruction
                                </Button>
                            </div>
                            <div className="mt-2 space-y-2">
                                {paragraphs.map((instruction, index) => (
                                    <div 
                                        key={index}
                                        className="p-3 bg-amber-50 text-amber-900 rounded-md"
                                    >
                                        <span className="font-medium">Step {index + 1}:</span> {instruction}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Button 
                            onClick={handleCreate} 
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-serif" 
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating Recipe..." : "Create Recipe"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddRecipe