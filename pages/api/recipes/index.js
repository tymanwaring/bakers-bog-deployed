import dbConnect from "../../../util/mongo";
import Recipe from "../../../models/Recipe";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const recipe = await Recipe.find();
      res.status(200).json(recipe);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      console.log(req.body)
      const recipe = await Recipe.create(req.body)
      res.status(201).json(recipe);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  }
};

export default handler;
