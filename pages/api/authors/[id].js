import dbConnect from "../../../utils/dbConnect";
import Author from "../../../models/Author";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const author = await Author.findById(id);

        if (!author) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: author });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        const author = await Author.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!author) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: author });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const deletedAuthor = await Author.deletedOne({ _id: id });

        if (!deletedAuthor) {
          res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
