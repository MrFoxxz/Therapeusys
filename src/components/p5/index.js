import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Sketch from "react-p5";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

let cards = [];
let deletedCards = [];
let deck = 0;
let NCards = 0;
let maxCard = 10;
let positionX = 50;
let positionY = 150;

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const CardsTreatment = (props) => {
  const classes = useStyles();
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [newCard, setNewCard] = useState({
    content: "",
    color: "",
  });
  const [content, setContent] = useState("");
  const [color, setColor] = useState("1");
  const [currentCardHook, setcurrentCardHook] = useState({});

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleOpenEdit = (currentCard) => {
    setContent(currentCard.content);
    setColor(currentCard.color);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const submitInfo = () => {
    let id = currentCardHook.id;
    let userInfo = {
      content: content,
      color: color,
    };
    console.log("id", id);
    cards[id].content = userInfo.content;
    cards[id].color = userInfo.color;
    console.log(userInfo);
    setOpenEdit(false);
  };
  const handleChange = (event) => {
    setColor(event.target.value);
  };

  const addNewCard = () => {
    const contentCard = newCard.content;
    cards.push(new Card(positionX, positionY, newCard.color, contentCard));

    positionX = positionX + 50;
    NCards = NCards + 1;
    if (NCards === maxCard) {
      positionX = 50;
      maxCard = maxCard + 10;
      positionY = positionY + 100;
    }
    setNewCard({
      content: "",
      color: "",
    });
    handleCloseCreate();
    return positionX;
  };

  const setup = (p5, canvasParentRef) => {
    let cnv = p5
      .createCanvas(p5.windowWidth, p5.windowHeight)
      .parent(canvasParentRef);

    cnv.style("display", "block");

    /*p5.strokeWeight(4); */
    p5.strokeCap(p5.ROUND);

    cnv.button = p5.createButton("Agregar carta");
    cnv.button.position(10, 100);
    cnv.button.mousePressed(handleOpenCreate);

    cnv.button = p5.createButton("Mezclar");
    cnv.button.position(10, 70);
    cnv.button.mousePressed(mixCards);

    p5.button = p5.createButton("Mostrar Todas las Cartas");
    p5.button.position(120, 70);
    p5.button.mousePressed(ShowCards);

    p5.button = p5.createButton("Ocultar Todas las Cartas");
    p5.button.position(120, 100);
    p5.button.mousePressed(HideCards);

    function ShowCards() {
      for (let i = 0; i < cards.length; i++) {
        let currentCard = cards[i];
        currentCard.flip = true;
      }
    }

    function HideCards() {
      for (let i = 0; i < cards.length; i++) {
        let currentCard = cards[i];
        currentCard.flip = false;
      }
    }

    for (let i = 0; i < deck; i++) {
      let xAxis = i * 70 + 35;
      cards.push(new Card(xAxis, 65));
    }
  };
  const draw = (p5) => {
    p5.background(42, 42, 66);

    for (let i = 0; i < cards.length; i++) {
      cards[i].display(p5);
      cards[i].id = i;
    }
    for (let i = 0; i < deletedCards.length; i++) {
      deletedCards[i].deleted(p5);
    }
    p5.rectMode(p5.CENTER);
    p5.textSize(16);
    p5.fill(0, 0, 0);
    p5.text("Cartas creadas", 540, 30);
    p5.text(cards.length, 540, 65);
    p5.text("Cartas Eliminadas", 700, 30);
    p5.text(deletedCards.length, 700, 65);
  };

  function mixCards() {
    cards.sort(() => Math.random() - 0.5);

    for (let i = 0; i < cards.length; i++) {
      var currentCard = cards[i];
      currentCard.x = Math.floor(Math.random() * (610 - 190) + 190);
      currentCard.y = Math.floor(Math.random() * (395 - 275) + 275);
    }
  }
  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
  const doubleClicked = (p5) => {
    for (let i = 0; i < cards.length; i++) {
      let currentCard = cards[i];

      if (currentCard.isInPosition(p5)) {
        currentCard.locked = true;

        if (currentCard.flip) {
          currentCard.flip = false;
        } else {
          currentCard.flip = true;
        }
      } else {
        currentCard.locked = false;
      }
    }
  };
  const mousePressed = (p5) => {
    for (let i = 0; i < cards.length; i++) {
      var currentCard = cards[i];

      if (currentCard.isInPosition(p5)) {
        currentCard.locked = true;
        //cards.push(currentCard);
        cards.push(cards.splice(cards.indexOf(currentCard), 1)[0]);

        if (p5.mouseButton === p5.RIGHT) {
          deletedCards.push(currentCard);
          cards.splice(cards.indexOf(currentCard), 1);
        } else if (p5.mouseButton === p5.CENTER) {
          setcurrentCardHook(currentCard);
          handleOpenEdit(currentCard);
        }
      } else {
        currentCard.locked = false;
      }
      currentCard.xOffset = p5.mouseX - currentCard.x;
      currentCard.yOffset = p5.mouseY - currentCard.y;
    }
  };
  const mouseDragged = (p5) => {
    for (let i = 0; i < cards.length; i++) {
      let currentCard = cards[i];
      if (currentCard.locked) {
        currentCard.x = p5.mouseX - currentCard.xOffset;
        currentCard.y = p5.mouseY - currentCard.yOffset;
      }
    }
  };

  class Card {
    constructor(x, y, color, content) {
      this.content = content;
      this.id = 0;
      this.color = color;
      //Card sizes
      this.cardWidth = 80;
      this.cardHeight = 110;
      //Card position
      this.x = x;
      this.y = y;
      this.xOffset = 0.0;
      this.yOffset = 0.0;
      //Card State
      this.locked = false;
      this.overBox = false;
      this.flip = true;
    }

    isInPosition(p5) {
      if (
        p5.mouseX > this.x - 40 &&
        p5.mouseX < this.x + 40 &&
        p5.mouseY > this.y - 55 &&
        p5.mouseY < this.y + 55
      ) {
        return true;
      } else {
        return false;
      }
    }

    deleted(p5) {
      if (this.color === "1") {
        p5.fill(214, 248, 11); //amarillo
      } else if (this.color === "2") {
        p5.fill(24, 11, 248); //azul
      } else {
        p5.fill(248, 15, 11); //rojo
      }

      for (let i = 0; i < deletedCards.length; i++) {
        p5.rect(
          p5.windowWidth - 100,
          80 + 10 * i,
          this.cardWidth,
          this.cardHeight,
          5
        );
      }
    }

    display(p5) {
      if (this.isInPosition(p5)) {
        this.overBox = true;
        if (!this.locked) {
        }
      } else {
        this.overBox = false;
      }

      if (this.flip) {
        if (this.color === "1") {
          p5.fill(214, 248, 11); //amarillo
        } else if (this.color === "2") {
          p5.fill(24, 11, 248); //azul
        } else {
          p5.fill(248, 15, 11); //rojo
        }
      } else {
        //gris
        p5.fill(217, 217, 217);
      }

      p5.rect(this.x, this.y, this.cardWidth, this.cardHeight, 5);
      //circle(this.x, this.y, this.cardWidth);

      if (this.flip) {
        p5.fill(0); //color al texto
        p5.textSize(20);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.text(this.content, this.x, this.y);
      }
    }
  }

  return (
    <div>
      <Sketch
        setup={setup}
        draw={draw}
        windowResized={windowResized}
        mouseDragged={mouseDragged}
        mousePressed={mousePressed}
        doubleClicked={doubleClicked}
      />
      <Modal //CREATE CARD
        open={openCreate}
        onClose={handleCloseCreate}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Color</FormLabel>
            <RadioGroup
              aria-label="color"
              name="newcolor"
              value={newCard.color}
              onChange={(e) => {
                setNewCard({
                  ...newCard,
                  color: e.target.value,
                });
              }}
              row
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Amarillo"
              />
              <FormControlLabel value="2" control={<Radio />} label="Azul" />
              <FormControlLabel value="3" control={<Radio />} label="Rojo" />
            </RadioGroup>

            <TextField
              required
              id="outlined-required"
              label="contenido"
              variant="outlined"
              onChange={(e) =>
                setNewCard({
                  ...newCard,
                  content: e.target.value,
                })
              }
            />
          </FormControl>

          <button onClick={handleCloseCreate}>Cerrar</button>
          <button onClick={addNewCard}>Crear</button>
        </div>
      </Modal>

      <Modal //EDIT CARD
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Color</FormLabel>
            <RadioGroup
              aria-label="color"
              name="color"
              value={color}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Amarillo"
              />
              <FormControlLabel value="2" control={<Radio />} label="Azul" />
              <FormControlLabel value="3" control={<Radio />} label="Rojo" />
            </RadioGroup>

            <TextField
              required
              id="outlined-required"
              defaultValue={currentCardHook.content}
              label="contenido"
              variant="outlined"
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </FormControl>

          <button onClick={handleCloseEdit}>Cerrar</button>
          <button onClick={submitInfo}>Editar</button>
        </div>
      </Modal>
    </div>
  );
};

export default CardsTreatment;
