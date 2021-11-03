import { useSession, signIn, signOut } from "next-auth/react";
import { Box, Button } from "@mui/material";
export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Box sx={{ mt: "10vh" }}>
        Signed in as {session.user.email} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </Box>
    );
  }
  return (
    <Box sx={{ mt: "10vh" }}>
      Not signed in <br />
      <Button onClick={() => signIn()}>Sign in</Button>
    </Box>
  );
}
