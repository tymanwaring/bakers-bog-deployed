import dbConnect from "../../../util/mongo";
import Location from "../../../models/Location";

const handler = async (req, res) => {
  const { method } = req;

  // console.log(method)

  await dbConnect();

  if (method === "GET") {
    try {
      const locations = await Location.find();
      res.status(200).json(locations);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      console.log(req.body)
      const location = await Location.create(req.body)
      res.status(201).json(location);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  }
};

export default handler;
