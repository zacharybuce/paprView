import dbConnect from "../../../utils/dbConnect";
import Comment from "../../../models/Comment";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const comment = await Comment.findById(id);

        if (!comment) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: comment });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        const comment = await Comment.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!comment) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: comment });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const deletedComment = await Comment.deletedOne({ _id: id });

        if (!deletedComment) {
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
