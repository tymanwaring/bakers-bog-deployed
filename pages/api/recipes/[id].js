import dbConnect from "../../../util/mongo";
import Recipe from "../../../models/Recipe";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
    cookies,
  } = req;

  const token = cookies.token

  await dbConnect();

  if (method === "GET") {
    try {
      const recipe = await Recipe.findById(id);
      res.status(200).json(recipe);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    try {
      const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(recipe);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
    if (!token || token !== process.env.token) {
      return res.status(401).json("Invalid Permissions")
    }
    try {
      await Recipe.findByIdAndDelete(id);
      res.status(200).json("The recipe has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
