import React from "react";
import { useState } from "react";
import fetch from "isomorphic-unfetch";
import {
  Box,
  Typography,
  Link,
  Button,
  Grid,
  Divider,
  Alert,
  AlertTitle,
} from "@mui/material";
import Summary from "../../components/Summary";
import ArticleHeading from "../../components/ArticleHeading";
import LoginDialog from "../../components/LoginDialog";
import NextLink from "next/link";
import { useSession, signIn } from "next-auth/react";
import { styled } from "@mui/material/styles";
import "braft-editor/dist/index.css";
import { CreateBountyButton } from "../../components/CreateBountyButton";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const DynamicBountyDialog = dynamic(() =>
  import("../../components/BountyDialog")
);
const DynamicBountyChip = dynamic(() => import("../../components/BountyChip"));
const DynamicCreateIcon = dynamic(() => import("@mui/icons-material/Create"));

const AddBountyContainer = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    marginRight: "15vw",
    marginLeft: "15vw",
  },
  [theme.breakpoints.down("sm")]: {
    marginRight: "5vw",
    marginLeft: "5vw",
  },
}));

const SummariesContainer = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    marginRight: "25vw",
    marginLeft: "25vw",
  },
  [theme.breakpoints.down("sm")]: {
    marginRight: "5vw",
    marginLeft: "5vw",
  },
}));

const summaries = ({ summaries, docData }) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [openBountyDialog, setOpenBountyDialog] = useState(false);
  const router = useRouter();

  const awardBounty = async (awardeeId, summaryId) => {
    try {
      var article = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: {
          bounty: {},
        },
      };

      var summary = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: {
          bounty: true,
          tags: docData.tags,
          userId: awardeeId,
          credibility: docData.bounty.value,
        },
      };

      //remove bounty from current article
      article.body = JSON.stringify(article.body);
      const putRes = await fetch(
        process.env.NEXT_PUBLIC_ROOT_URL + "/api/articles/" + docData._id,
        article
      );
      const putData = await putRes.json();

      console.log(putData);

      //add Credibility to user and add bounty to summary
      summary.body = JSON.stringify(summary.body);
      console.log(summary);
      const userPutRes = await fetch(
        process.env.NEXT_PUBLIC_ROOT_URL + "/api/summaries/" + summaryId,
        summary
      );

      const userPutData = await userPutRes.json();
      console.log(userPutData);
      router.reload(window.location.pathname);
    } catch (error) {
      console.log(error);
    }
  };

  if (!summaries) return <Box sx={{ mt: "100vh" }}></Box>;
  return (
    <Box sx={{ mt: "8vh" }}>
      <Box sx={{ ml: "10vw", mr: "10vw" }}>
        <ArticleHeading
          title={docData.title}
          authors={docData.authors}
          tags={docData.tags}
        />
        <AddBountyContainer>
          {!docData.bounty.value && session ? (
            <CreateBountyButton setOpenBountyDialog={setOpenBountyDialog} />
          ) : (
            <DynamicBountyChip bountyAmount={docData.bounty.value} />
          )}
        </AddBountyContainer>
        <Divider sx={{ backgroundColor: "#808080" }} sx={{ mt: "2vh" }} />
      </Box>
      <SummariesContainer>
        {summaries.length ? (
          summaries.map((summary, index) => {
            return (
              <Box key={index}>
                <Summary
                  summary={summary}
                  tags={docData.tags}
                  awardBounty={awardBounty}
                  articleBounty={docData.bounty}
                  sessionId={session ? session.user._id : ""}
                />
                <Divider />
              </Box>
            );
          })
        ) : (
          <Box>
            <Box sx={{ height: "30vh", alignItems: "center" }}>
              <Alert
                severity="warning"
                icon={<DynamicCreateIcon />}
                sx={{ mt: "1vh" }}
              >
                <AlertTitle>There are no Summaries...</AlertTitle>
                Click the button below to submit your own!
              </Alert>
            </Box>
            <Divider />
          </Box>
        )}
      </SummariesContainer>
      <Grid container alignContent="center" alignItems="center">
        <Grid item xs={12} sx={{ mt: "3vh", ml: "25vw", mr: "25vw" }}>
          <Typography variant="h6">
            Contribute your knowledge to the community
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ mt: "3vh", mb: "3vh", ml: "25vw", mr: "25vw" }}
        >
          {session ? (
            <NextLink href={"/editor?articleId=" + docData._id} passHref>
              <Link style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ pt: "1.5vh", pb: "1.5vh" }}
                >
                  Submit a Summary
                </Button>
              </Link>
            </NextLink>
          ) : (
            <Button
              onClick={() => setOpen(true)}
              variant="contained"
              color="secondary"
              sx={{ pt: "1.5vh", pb: "1.5vh" }}
            >
              Submit a Summary
            </Button>
          )}
        </Grid>
      </Grid>
      <LoginDialog open={open} setOpen={setOpen} signIn={signIn} />
      {openBountyDialog && session ? (
        <DynamicBountyDialog
          credibility={session.user.credibility}
          userId={session.user._id}
          articleId={docData._id}
          openBountyDialog={openBountyDialog}
          setOpenBountyDialog={setOpenBountyDialog}
        />
      ) : (
        ""
      )}
    </Box>
  );
};

// export const getStaticPaths = async () => {
//   // const res = await fetch(process.env.NEXT_PUBLIC_ROOT_URL + "/api/articles/");
//   // const data = await res.json();

//   // const paths = data.data.map((article) => {
//   //   return {
//   //     params: { id: article._id },
//   //   };
//   // });

//   return {
//     paths: [],
//     fallback: true,
//   };
// };

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  var summaries = [];

  const articalRes = await fetch(
    process.env.NEXT_PUBLIC_ROOT_URL + "/api/articles/" + id
  );
  const { data } = await articalRes.json();

  if (!data) {
    return {
      redirect: {
        destination: "/redirect",
        permenent: false,
      },
    };
  }

  for (const summary of data.summaries) {
    var summaryRes = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL + "/api/summaries/" + summary
    );
    const summaryData = await summaryRes.json();
    summaries.push(summaryData.data);
  }

  summaries.sort((a, b) => {
    if (a.upvotes - a.downvotes < b.upvotes - b.downvotes) return 1;
    if (a.upvotes - a.downvotes > b.upvotes - b.downvotes) return -1;
    return 0;
  });

  return {
    props: { summaries: summaries, docData: data },
  };
};

export default summaries;
