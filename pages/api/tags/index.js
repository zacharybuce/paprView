import dbConnect from "../../../utils/dbConnect";
import Tag from "../../../models/Tag";

dbConnect("tags-index");

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const tags = await Tag.find({});

        res.status(200).json({ success: true, data: tags });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const tag = await Tag.create(req.body);

        res.status(201).json({ success: true, data: tag });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
