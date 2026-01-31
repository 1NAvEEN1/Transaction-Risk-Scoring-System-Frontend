import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LoginImage from "../../assets/LoginImage.png";
const Login = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"100svh"}
    >
      <Grid container pl={2} pr={2}>
        <Grid item xs={12} lg={6}>
          <Grid container>
            <Grid
              item
              xs={12}
              textAlign={"center"}
              sx={{
                display: {
                  xs: "block",
                  lg: "none",
                },
              }}
            >
              <Typography variant="h2">WELCOME BACK TO</Typography>
              <Typography variant="h1">MEO-WA</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box maxWidth={660}>
                <Box
                  component="img"
                  alt="Image"
                  src={LoginImage}
                  width={"100%"}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          p={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box maxWidth={500}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                textAlign={"center"}
                sx={{
                  display: {
                    xs: "none",
                    lg: "block",
                  },
                }}
              >
                <Typography variant="h2">WELCOME BACK TO</Typography>
                <Typography variant="h1">MEO-WA</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography fontWeight={700} fontSize={20} mb={1}>
                  Email
                </Typography>
                <TextField fullWidth />
              </Grid>
              <Grid item xs={12} mt={2}>
                <Typography fontWeight={700} fontSize={20} mb={1}>
                  Password
                </Typography>
                <TextField fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6} display={"flex"} alignItems={"center"}>
                    <Checkbox size="small" />
                    <Typography
                      color={"#808080"}
                      display={"inline"}
                      fontWeight={500}
                    >
                      Remember Me
                    </Typography>
                  </Grid>
                  <Grid item xs={6} display={"flex"} justifyContent={"end"}>
                    <Typography
                      color={"#0582CA"}
                      display={"inline"}
                      fontWeight={500}
                    >
                      <a>Forgot your password?</a>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                mt={2}
                display={"flex"}
                justifyContent={"center"}
              >
                <Button variant="contained" sx={{ width: 228, height: 50 }}>
                  <Typography fontSize={20} fontWeight={700}>
                    Log In
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
