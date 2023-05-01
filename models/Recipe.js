import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    ingrediants: {
      type: [String],
      required: true,
      maxlength: 400
    },
    prep_time: {
      type: String,
      required: true,
      maxlength: 30
    },
    cook_time: {
      type: String,
      required: true,
      maxlength: 30
    },
    desc: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    img: {
      type: String,
      required: true,
    },
    video_link: {
      type: String,
      required: false,
      maxlength: 100,
    },
    rating: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      maxlength: 50,
    },
    paragraphs: {
      type: [String],
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.models.Recipe ||
  mongoose.model("Recipe", RecipeSchema)