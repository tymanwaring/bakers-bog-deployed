import Image from "next/image";
import styles from "./RecipeCard.module.css";
import Link from "next/link";
import { Timer } from "lucide-react";

const RecipeCard = ({ recipe }) => {
    let prep_time = parseInt(recipe.prep_time.replace(/\D/g, ''))
    let cook_time = parseInt(recipe.cook_time.replace(/\D/g, ''))
    let total_time = prep_time + cook_time

    return (
        <Link href={`/recipe/${recipe._id}`} className="block">
            <div className="relative group overflow-hidden rounded-2xl">
                <div className="relative aspect-square">
                    <Image 
                        src={recipe.img} 
                        alt={recipe.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h2 className="font-serif text-2xl text-white mb-2">{recipe.title}</h2>
                    <div className="flex items-center gap-2 text-white/90">
                        <Timer className="w-5 h-5" />
                        <span className="text-sm font-light">{total_time} mins</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default RecipeCard;
