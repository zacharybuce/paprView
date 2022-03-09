import dbConnect from "../../../utils/dbConnect";
import Discipline from "../../../models/Discipline";

dbConnect("disciplines-index");

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const discipline = await Discipline.find({});

        res.status(200).json({ success: true, data: discipline });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
