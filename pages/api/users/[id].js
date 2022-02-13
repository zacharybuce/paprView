import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

dbConnect("users[id]");

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const user = await User.findById(id);

        if (!user) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        var user;
        console.log(req.body);
        if (req.body.date) {
          user = await User.findByIdAndUpdate(
            id,
            { $set: { joinDate: req.body.date } },
            {
              new: true,
              runValidators: true,
            }
          );
        } else if (req.body.votes) {
          user = await User.findByIdAndUpdate(
            id,
            { $set: { votes: [] } },
            {
              new: true,
              runValidators: true,
            }
          );
        } else if (req.body.id) {
          user = await User.findByIdAndUpdate(
            id,
            {
              $push: {
                summaries: req.body.id,
              },
            },
            {
              new: true,
              runValidators: true,
            }
          );

          var bulkOps = [];

          for (const tag of req.body.articleTags) {
            console.log(tag);
            let doc = {
              updateOne: {
                filter: { _id: id, "ranks.tag": { $ne: tag.tag } },
                update: { $push: { ranks: tag } },
              },
            };

            bulkOps.push(doc);
          }
          console.log(bulkOps);
          user = await User.bulkWrite(bulkOps);
        } else {
          let hasDoc = await User.countDocuments({
            _id: id,
            "votes.summaryId": req.body.vote.summaryId,
          });

          console.log("hasDoc: " + hasDoc);

          if (hasDoc > 0) {
            user = await User.updateOne(
              { _id: id, "votes.summaryId": req.body.vote.summaryId },
              { $set: { "votes.$": req.body.vote } },
              {
                new: true,
                runValidators: true,
              }
            );
          } else {
            console.log("add new vote");
            user = await User.findByIdAndUpdate(
              id,
              { $push: { votes: req.body.vote } },
              {
                new: true,
                runValidators: true,
              }
            );
          }
        }

        console.log(user);
        if (!user) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;

    case "DELETE":
      try {
        const deletedUser = await User.deletedOne({ _id: id });

        if (!deletedUser) {
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
