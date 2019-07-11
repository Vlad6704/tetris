import Figure from "../figure.js";


export default function Figure_L(posX, posY, color) {
    Figure.apply(this, arguments);
    this.slug[0].setPosX_Y(posX, posY);
    this.slug[1].setPosX_Y(posX, posY + 1);
    this.slug[2].setPosX_Y(posX, posY + 2);
    this.slug[3].setPosX_Y(posX + 1, posY + 2);

    this.map[0] = [{
        posX: 1, posY: -1
    },
    { posX: 0, posY: 0 },
    { posX: -1, posY: 1 },
    { posX: 0, posY: 2 },
    ];
    this.map[1] = [{
        posX: 1, posY: 1
    },
    { posX: 0, posY: 0 },
    { posX: -1, posY: -1 },
    { posX: -2, posY: 0 },
    ];
    this.map[2] = [{
        posX: -1, posY: 1
    },
    { posX: 0, posY: 0 },
    { posX: 1, posY: -1 },
    { posX: 0, posY: -2 },
    ];
    this.map[3] = [{
        posX: -1, posY: -1
    },
    { posX: 0, posY: 0 },
    { posX: 1, posY: 1 },
    { posX: 2, posY: 0 },
    ];
}

Figure_L.size = 3;
Figure_L.prototype = Object.create(Figure.prototype);
Figure_L.prototype.constructor = Figure_L;