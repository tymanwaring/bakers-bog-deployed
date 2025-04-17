import dbConnect from "../../../util/mongo";
import Recipe from "../../../models/Recipe";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
          return res.status(404).json({ success: false, message: "Recipe not found" });
        }
        res.status(200).json({ success: true, data: recipe });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "DELETE":
      try {
        // TODO: Add authentication check here
        // if (!req.session.user || !req.session.user.isAdmin) {
        //   return res.status(401).json({ success: false, message: "Unauthorized" });
        // }

        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        if (!deletedRecipe) {
          return res.status(404).json({ success: false, message: "Recipe not found" });
        }
        res.status(200).json({ success: true, data: deletedRecipe });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "PUT":
      try {
        // TODO: Add authentication check here
        // if (!req.session.user || !req.session.user.isAdmin) {
        //   return res.status(401).json({ success: false, message: "Unauthorized" });
        // }

        const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!recipe) {
          return res.status(404).json({ success: false, message: "Recipe not found" });
        }
        res.status(200).json({ success: true, data: recipe });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
