import Figure from "../figure.js";


export default function Figure_S(posX, posY, color) {
    Figure.apply(this, arguments);
    this.slug[0].setPosX_Y(posX + 1, posY);
    this.slug[1].setPosX_Y(posX, posY);
    this.slug[2].setPosX_Y(posX, posY + 1);
    this.slug[3].setPosX_Y(posX - 1, posY + 1);

    this.map[0] = [{
        posX: 0, posY: -2
    },
    { posX: -1, posY: -1 },
    { posX: 0, posY: 0 },
    { posX: -1, posY: 1 },
    ];
    this.map[1] = [{
        posX: 0, posY: 2
    },
    { posX: 1, posY: 1 },
    { posX: 0, posY: 0 },
    { posX: 1, posY: -1 },
    ];

}

Figure_S.size = 2;
Figure_S.prototype = Object.create(Figure.prototype);
Figure_S.prototype.constructor = Figure_S;