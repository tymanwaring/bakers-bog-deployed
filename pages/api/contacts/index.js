import dbConnect from "../../../util/mongo";
import Contact from "../../../models/Contact";

const handler = async (req, res) => {
  const { method } = req;

  // console.log(method)

  await dbConnect();

  if (method === "GET") {
    try {
      const contacts = await Contact.find();
      res.status(200).json(contacts);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      console.log(req.body)
      const contact = await Contact.create(req.body)
      res.status(201).json(contact);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  }
};

export default handler;
