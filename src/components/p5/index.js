import React from "react";
import Sketch from "react-p5";

let cards = [];
let deck = 0;
let NCards = 0;
let maxCard = 10;
let positionX = 50;
let positionY = 150;
let radio;

const CardsTreatment = () => {
  const setup = (p5, canvasParentRef) => {
    let cnv = p5
      .createCanvas(p5.windowWidth, p5.windowHeight)
      .parent(canvasParentRef);

    cnv.style("display", "block");

    p5.strokeWeight(4);

    radio = p5.createRadio();
    radio.position(10, 100);
    radio.option(1, "Amarillo");
    radio.option(2, "Azul");
    radio.option(3, "Rojo");
    radio.selected("1");

    cnv.button = p5.createButton("Agregar carta");
    cnv.button.position(190, 70);
    cnv.button.mousePressed(AddCard);

    p5.input = p5.createInput();
    p5.input.position(10, 70);

    p5.button = p5.createButton("Mostrar Todas las Cartas");
    p5.button.position(320, 70);
    p5.button.mousePressed(ShowCards);

    p5.button = p5.createButton("Ocultar Todas las Cartas");
    p5.button.position(490, 70);
    p5.button.mousePressed(HideCards);

    console.log("cnv", cnv);

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

    function AddCard() {
      const contentCard = p5.input.value();
      cards.push(new Card(positionX, positionY, radio.value(), contentCard));

      for (let i = 0; i < cards.length; i++) {
        console.log(cards[i]);
      }

      positionX = positionX + 90;
      NCards = NCards + 1;
      if (NCards === maxCard) {
        positionX = 50;
        maxCard = maxCard + 10;
        positionY = positionY + 120;
      }
      return positionX;
    }
    for (let i = 0; i < deck; i++) {
      let xAxis = i * 70 + 35;
      cards.push(new Card(xAxis, 65));
    }
  };

  const draw = (p5) => {
    p5.background(3, 164, 223);
    for (let i = 0; i < cards.length; i++) {
      cards[i].display(p5);
      cards[i].id = i;
    }
    p5.rectMode(p5.CENTER);
  };

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
      let currentCard = cards[i];
      console.log(currentCard);

      if (currentCard.isInPosition(p5)) {
        currentCard.locked = true;
        if (p5.mouseButton === p5.RIGHT) {
          cards.splice(currentCard.id, 1);
        }
      } else {
        currentCard.locked = false;
      }
      currentCard.xOffset = p5.mouseX - currentCard.x;
      currentCard.yOffset = p5.mouseY - currentCard.y;
    }
  };

  const mouseDragged = (p5) => {
    console.log("Dragged", p5);
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
      this.flip = false;
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

      p5.rect(this.x, this.y, this.cardWidth, this.cardHeight);
      //circle(this.x, this.y, this.cardWidth);

      if (this.flip) {
        p5.fill(0); //color al texto
        p5.textSize(20);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.text(this.content, this.x, this.y);

        /*  p5.button = p5.createButton("x");
        p5.button.position(this.x - 40, this.y - 55);
        p5.button.mousePressed(); */
      }
    }
  }

  return (
    <Sketch
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      mouseDragged={mouseDragged}
      mousePressed={mousePressed}
      doubleClicked={doubleClicked}
    />
  );
};

export default CardsTreatment;
