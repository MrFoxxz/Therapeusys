import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TestCard from "../../components/cards/testCard";
import "./index.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [communication, setcommunication] = useState("");
  const [userList, setuserList] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    axios.get("http://localhost:3001/api/user/get").then((response) => {
      setuserList(response.data.rows);
    });
  }, []);

  const submitInfo = () => {
    let userInfo = {
      name: name,
      lastName: lastName,
      email: email,
      communication: communication,
    };
    axios.post("http://localhost:3001/api/user/new", userInfo);

    setuserList([
      ...userList,
      {
        name: name,
        lastName: lastName,
        email: email,
        communication: communication,
      },
    ]);
  };

  const handleChange = (event) => {
    setcommunication(event.target.value);
  };

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <div className="form">
          <TextField
            required
            id="outlined-required"
            label="Nombre"
            variant="outlined"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Apellido"
            variant="outlined"
            onChange={(e) => {
              setlastName(e.target.value);
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Email"
            variant="outlined"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={communication}
              onChange={handleChange}
              label="Canal de comunicacion"
            >
              <MenuItem value={"Zoom"}>Zoom</MenuItem>
              <MenuItem value={"Skype"}>Skype</MenuItem>
              <MenuItem value={"Discord"}>Discord</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button variant="outlined" color="primary" onClick={submitInfo}>
          Primary
        </Button>
      </form>
      <div style={{ display: "flex" }}>
        {userList.map((val) => {
          return (
            <TestCard
              id={val.id}
              name={val.name}
              lastName={val.lastName}
              email={val.email}
              comunnication={val.communication}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Register;
