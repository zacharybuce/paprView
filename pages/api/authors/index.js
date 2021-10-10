import dbConnect from "../../../utils/dbConnect";
import Author from "../../../models/Author";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const authors = await Author.find({});

        res.status(200).json({ success: true, data: authors });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const author = await Author.create(req.body);

        res.status(201).json({ success: true, data: author });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
