import dbConnect from "../../../utils/dbConnect";
import Tag from "../../../models/Tag";

dbConnect("tags[id]");

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const tag = await Tag.findById(id);

        if (!tag) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: tag });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        const tag = await Tag.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!tag) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: tag });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
