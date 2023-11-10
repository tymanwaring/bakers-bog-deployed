import dbConnect from "../../../util/mongo";
import Location from "../../../models/Contact";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const location = await Location.findById(id);
      res.status(200).json(location);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    try {
      const location = await Location.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(location);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
  }
};

export default handler;
