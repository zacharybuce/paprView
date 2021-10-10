import dbConnect from "../../../utils/dbConnect";
import Summary from "../../../models/Summary";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const summary = await Summary.findById(id);

        if (!summary) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: summary });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        const summary = await Summary.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!summary) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: summary });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const deletedSummary = await Summary.deletedOne({ _id: id });

        if (!deletedSummary) {
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
