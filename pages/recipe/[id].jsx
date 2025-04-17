import Image from "next/image";
import axios from 'axios';
import Navbar from "../../components/main/navbar/Navbar";
import { Clock, ClipboardList, ChefHat, Timer } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";

const Recipe = ({ recipe }) => {
  // Add error handling for missing recipe data
  if (!recipe) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-700">Recipe not found</p>
      </div>
    );
  }

  // Ensure recipe data has default values
  const {
    title = 'Untitled Recipe',
    desc = '',
    prep_time = 'N/A',
    cook_time = 'N/A',
    ingredients = [],
    paragraphs = [],
    img = '/img/default-recipe.jpg'
  } = recipe;

  return (
    <div className="overflow-x-hidden">
      <div className="h-screen bg-[url('/img/bakery_inside.png')] bg-cover bg-fixed bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 backdrop-blur-[2px]" />
        <div className="relative h-full flex flex-col">
          <Navbar />
          
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 py-12">
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4">
                  <h1 className="font-serif text-5xl text-white drop-shadow-sm">{title}</h1>
                  <p className="text-xl text-white/95 font-light max-w-2xl mx-auto drop-shadow-sm leading-relaxed">{desc}</p>
                </div>

                {/* Recipe Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-white/95 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6 flex items-center gap-4">
                      <Timer className="w-8 h-8 text-amber-500" />
                      <div>
                        <p className="text-base text-gray-700 font-light">Prep Time</p>
                        <p className="text-lg font-medium text-gray-900">{prep_time}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/95 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6 flex items-center gap-4">
                      <Clock className="w-8 h-8 text-amber-500" />
                      <div>
                        <p className="text-base text-gray-700 font-light">Cook Time</p>
                        <p className="text-lg font-medium text-gray-900">{cook_time}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/95 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6 flex items-center gap-4">
                      <ChefHat className="w-8 h-8 text-amber-500" />
                      <div>
                        <p className="text-base text-gray-700 font-light">Difficulty</p>
                        <Badge variant="secondary" className="bg-amber-500 text-white text-base font-medium">Easy</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Recipe Image */}
                  <div className="order-first md:order-last">
                    <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                      <Image 
                        src={img} 
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                    </div>
                  </div>

                  {/* Ingredients */}
                  <Card className="bg-white/95 backdrop-blur-sm border-white/20">
                    <div className="p-6 space-y-6">
                      <div className="flex items-center gap-2">
                        <ClipboardList className="w-6 h-6 text-amber-500" />
                        <h2 className="font-serif text-3xl text-gray-900">Ingredients</h2>
                      </div>
                      <Separator className="bg-amber-500/20" />
                      {ingredients.length > 0 ? (
                        <ul className="space-y-4">
                          {ingredients.map((ingredient, index) => (
                            <li 
                              key={index}
                              className="flex items-center gap-3 text-gray-900"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              <span className="text-lg font-light">{ingredient}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic">No ingredients listed</p>
                      )}
                    </div>
                  </Card>
                </div>

                {/* Instructions */}
                <Card className="bg-white/95 backdrop-blur-sm border-white/20">
                  <div className="p-6 space-y-6">
                    <h2 className="font-serif text-3xl text-gray-900">Instructions</h2>
                    <Separator className="bg-amber-500/20" />
                    {paragraphs.length > 0 ? (
                      <ol className="space-y-8">
                        {paragraphs.map((paragraph, index) => (
                          <li key={index} className="flex gap-6">
                            <span className="flex-none">
                              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 text-xl font-medium">
                                {index + 1}
                              </span>
                            </span>
                            <p className="text-lg text-gray-900 font-light mt-1 leading-relaxed">{paragraph}</p>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-gray-500 italic">No instructions available</p>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes/${params.id}`);
    
    // Check if the API call was successful
    if (!res.data.success) {
      return {
        props: {
          recipe: null
        }
      };
    }

    // Return the actual recipe data from the nested structure
    return {
      props: {
        recipe: res.data.data
      }
    };
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return {
      props: {
        recipe: null
      }
    };
  }
};

export default Recipe;
