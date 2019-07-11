import Figure from "../figure.js";


export default function Figure_box(posX, posY, color) {
    Figure.apply(this, arguments);
    this.slug[0].setPosX_Y(posX, posY);
    this.slug[1].setPosX_Y(posX + 1, posY);
    this.slug[2].setPosX_Y(posX, posY + 1);
    this.slug[3].setPosX_Y(posX + 1, posY + 1);


}
Figure_box.size = 2;
Figure_box.prototype = Object.create(Figure.prototype);
Figure_box.prototype.constructor = Figure_box;