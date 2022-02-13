import dbConnect from "../../../utils/dbConnect";
import Discipline from "../../../models/Discipline";

dbConnect("disciplines[id]");

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const discipline = await Discipline.findById(id);

        if (!discipline) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: discipline });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        const discipline = await Discipline.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!discipline) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: discipline });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const deletedDiscipline = await Discipline.deletedOne({ _id: id });

        if (!deletedDiscipline) {
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
