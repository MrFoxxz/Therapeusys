import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IntlMessages from "../../intlGetText";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const TestCard = (props) => {
  const deleteReview = (id) => {
    axios.delete(`http://localhost:3001/api/user/delete/${id}`);
  };

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.lastName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.email}
        </Typography>
        <Typography variant="body2" component="p">
          {props.comunnication}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            deleteReview(props.id);
          }}
          size="small"
        >
          <IntlMessages id="component.delete" />
        </Button>
      </CardActions>
    </Card>
  );
};

export default TestCard;
