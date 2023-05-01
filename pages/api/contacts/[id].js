import dbConnect from "../../../util/mongo";
import Contact from "../../../models/Contact";

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
      const contact = await Contact.findById(id);
      res.status(200).json(contact);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    try {
      const contact = await Contact.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(contact);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
    if (!token || token !== process.env.token) {
      return res.status(401).json("Invalid Permissions")
    }
    try {
      await Contact.findByIdAndDelete(id);
      res.status(200).json("The order has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
