import dbConnect from "../../../utils/dbConnect";
import Summary from "../../../models/Summary";
import User from "../../../models/User";

const rankCred = (upvote, downvote) => {
  const incAmount = 10;

  if (upvote == 1 && downvote == 0) {
    return incAmount;
  } else if (upvote == 0 && downvote == 1) {
    return incAmount * -1;
  } else if (upvote == -1 && downvote == 0) {
    return incAmount * -1;
  } else if (upvote == 0 && downvote == -1) {
    return incAmount;
  } else if (upvote == 1 && downvote == -1) {
    return incAmount * 2;
  } else if (upvote == -1 && downvote == 1) {
    return incAmount * -2;
  }
};

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
        const summary = await Summary.findByIdAndUpdate(
          id,
          {
            $inc: { upvotes: req.body.upvote, downvotes: req.body.downvote },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        const incAmount = rankCred(req.body.upvote, req.body.downvote);

        var bulkOps = [];
        console.log(summary.user.toString());
        for (const tag of req.body.tags) {
          console.log(tag);
          let doc = {
            updateOne: {
              filter: {
                _id: summary.user.toString(),
                "ranks.tag": tag,
              },
              update: { $inc: { "ranks.$.value": incAmount } },
            },
          };
          console.log(doc);
          bulkOps.push(doc);
        }
        // var user = await User.findByIdAndUpdate(
        //   summary.user.toString(),
        //   {
        //     $inc: { credibility: incAmount },
        //   },
        //   {
        //     new: true,
        //     runValidators: true,
        //   }
        // );

        bulkOps.push({
          updateOne: {
            filter: {
              _id: summary.user.toString(),
            },
            update: { $inc: { credibility: incAmount } },
          },
        });

        const user = await User.bulkWrite(bulkOps);
        console.log(user);
        if (!summary) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: summary });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: error });
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
