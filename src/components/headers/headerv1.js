import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import IntlMessages from "../intlGetText";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Headerv1 = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Therapeusys
          </Typography>
          <Link to="/register">
            <IntlMessages id="component.register" />
          </Link>
          <Link to="/treatment">treatment</Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Headerv1;
