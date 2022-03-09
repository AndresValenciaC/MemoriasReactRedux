import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Typography,
  Grid,
  Container,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import authStyles from "./authStyles";
import Input from "../Input/Input";
import Icon from "./Icon";
import { sigIn, sigUp } from "../../actions/authAction";
/** Form initial State */
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  Password: "",
  confirmPassword: "",
};
const Auth = () => {
  const classes = authStyles();
  let navigate = useNavigate();
  const [isSingUp, setIsSignUp] = useState(false);
  const [showPassWord, setShowPassWord] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSingUp) {
      dispatch(sigUp(formData, navigate));
    } else {
      dispatch(sigIn(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () =>
    setShowPassWord((prevShowPssWord) => !prevShowPssWord);

  const switchMode = () => {
    setIsSignUp((prevSingUp) => !prevSingUp);
    setShowPassWord(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sing In was unsuccessful. Try Again Later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {" "}
          {isSingUp ? "Sing Up" : "Sing In"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSingUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassWord ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSingUp && (
              <Input
                name="confirmPassword"
                label="repeatPassword"
                handleChange={handleChange}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSingUp ? "Sing Up" : "Sing In"}
          </Button>
          <GoogleLogin
            clientId="545011097616-ca6jbd8r6ut6482neo1eo4e32ofgcalc.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sing In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSingUp
                  ? "Already have an account? Sing in"
                  : "Dont have an account? Sing Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
