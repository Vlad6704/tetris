import { tetris } from "../main.js";

export default function Box(color, posX, posY, main_object, parent_querySelector) {

    this.id = Box.id;
    tetris.occupiedCell[this.id] = {};
    this.div = document.createElement('div');
    this.setColor(color);
    this.setPosX(posX);
    this.setPosY(posY);
    this.main_object = main_object;
    this.parent_querySelector = parent_querySelector;
    Box.id++;
    this.createDiv('box');

}


Box.id = 0;

Box.prototype.createDiv = function (class_e) {

    this.div.className = class_e;
    let container = document.querySelector(this.parent_querySelector);
    container.appendChild(this.div);
}


Box.prototype.setColor = function (color) {
    this.color = color;
    this.div.style.backgroundColor = color;
}

Box.prototype.setPosX = function (posX) {
    tetris.occupiedCell[this.id].posX = posX;
    this.posX = posX;
    this.div.style.left = (100 / tetris.size.columns) * posX + '%';
}
Box.prototype.setPosY = function (posY) {
    tetris.occupiedCell[this.id].posY = posY;
    this.posY = posY;
    this.div.style.top = (100 / tetris.size.rows) * posY + '%';
}

Box.prototype.setPosX_Y = function (posX, posY) {
    this.setPosX(posX);
    this.setPosY(posY);
}
