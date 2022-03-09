import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Typography, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import memoryHeader from "../../images/memorieHeader.png";
import navbarStyles from "./navbarStyles";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";
const Navbar = () => {
  const classes = navbarStyles();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setCurrentUser(null);
  };

  useEffect(() => {
    const token = currentUser?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
    }

    setCurrentUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Link to="/">
          <Typography className={classes.heading} variant="h2" align="center">
            Memories
          </Typography>{" "}
        </Link>

        <img
          className={classes.image}
          src={memoryHeader}
          alt="memorie"
          height="60"
        />
      </div>

      <Toolbar className={classes.toolbar}>
        {currentUser ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={currentUser.result.name}
              src={currentUser.result.imageUrl}
            >
              {/*    */}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {currentUser.result.name}
            </Typography>
            <Button
              className={classes.Logout}
              variant="contained"
              color="secondary"
              onClick={logOut}
            >
              LogOut
            </Button>
          </div>
        ) : (
          <div>
            <Link to="/auth">
              {" "}
              <Button color="primary" variant="contained">
                Sign In
              </Button>{" "}
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
