import dbConnect from "../../../utils/dbConnect";
import Summary from "../../../models/Summary";

dbConnect("sumamries-index");

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const summaries = await Summary.find({});

        res.status(200).json({ success: true, data: summaries });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const summary = await Summary.create(req.body);

        res.status(201).json({ success: true, data: summary });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
