window.onload = function () {
    tetris.draw_grid();
    tetris.start();
}

let tetris = {};
tetris.occupiedCell = [];
tetris.component = [];
tetris.numbCurrentFigure = 0;
tetris.size = {
    rows: 19,
    columns : 11
}
tetris.color = {
    diapazon: {
        r: {
            max: 255,
            min: 100,
        },
        g: {
            max: 255,
            min: 100,
        },
        b: {
            max: 255,
            min: 100,
        }
    }
};



tetris.getColor = function () {
    function getRandomColor(objectColor) {

        return Math.round(Math.random() * (objectColor.max - objectColor.min) + objectColor.min);
    }
    return `rgb(${getRandomColor(this.color.diapazon.r)},${getRandomColor(this.color.diapazon.g)},${getRandomColor(this.color.diapazon.b)})`;
}

tetris.addComponent = function (nameComponent, posX, posY) {
    if (nameComponent == 'O') {
        return new_length = tetris.component.push(new Figure_box(posX, posY, this.getColor()));
    }
    if (nameComponent == 'I') {
        return new_length = tetris.component.push(new Figure_I(posX, posY, this.getColor()));
    }
    if (nameComponent == 'J') {
        return new_length = tetris.component.push(new Figure_J(posX, posY, this.getColor()));
    }
    if (nameComponent == 'L') {
        return new_length = tetris.component.push(new Figure_L(posX, posY, this.getColor()));
    }
    if (nameComponent == 'T') {
        return new_length = tetris.component.push(new Figure_T(posX, posY, this.getColor()));
    }
    if (nameComponent == 'S') {
        return new_length = tetris.component.push(new Figure_S(posX, posY, this.getColor()));
    }
    if (nameComponent == 'Z') {
        return new_length = tetris.component.push(new Figure_Z(posX, posY, this.getColor()));
    }
}

tetris.isFreeSpace = function (ArrObjPosXPosY) {
    let return_bool = true;
      this.component.forEach(function (figure) {
         figure.slug.forEach(function (figure_slug) {
             ArrObjPosXPosY.forEach(function (ObjPosXPosY_item) {
                 if (ObjPosXPosY_item.posX == figure_slug.posX && ObjPosXPosY_item.posY == figure_slug.posY) return_bool = false;
                
            }
            )
        });
       
    })
    return return_bool;
}

tetris.start = function () {
    this.addRandFigure(4, 0);
    this.addEventListener();
    var timerId = setInterval(function () {
        tetris.component[tetris.numbCurrentFigure].muveDown();
    }, 1000);
    
}

tetris.setNumbCurrentFigure = function (numbCurrentFigure) {
    this.numbCurrentFigure = numbCurrentFigure;
}

tetris.addRandFigure = function (posX,posY) {
    let rand_numb = Math.round(Math.random() * (7 - 1) + 1);
    let new_length = 0;
    if (rand_numb == 1) new_length = tetris.addComponent('I', posX, posY);
    if (rand_numb == 2) new_length = tetris.addComponent('J', posX, posY);
    if (rand_numb == 3) new_length = tetris.addComponent('O', posX, posY);
    if (rand_numb == 4) new_length = tetris.addComponent('L', posX, posY);
    if (rand_numb == 5) new_length = tetris.addComponent('T', posX, posY);
    if (rand_numb == 6) new_length = tetris.addComponent('S', posX, posY);
    if (rand_numb == 7) new_length = tetris.addComponent('Z', posX, posY);
    this.setNumbCurrentFigure(new_length - 1);
}

tetris.addEventListener = function () {
    addEventListener("keydown", function (event) {
        if (event.keyCode == 83) tetris.component[tetris.numbCurrentFigure].muveDown();
        if (event.keyCode == 68) tetris.component[tetris.numbCurrentFigure].muveRight();
        if (event.keyCode == 65) tetris.component[tetris.numbCurrentFigure].muveLeft();
        if (event.keyCode == 87) tetris.component[tetris.numbCurrentFigure].rotate();
    });
}

tetris.draw_grid = function (rows, columns) {
    if (rows === undefined) rows = this.size.rows;
    if (columns === undefined) columns = this.size.columns;

    for (let i = 1; i < columns; i++) {
        let div = document.createElement('div');
        div.className = 'grid_columns';
        div.style.left = (100 / columns) * i + '%';
        let container = document.querySelector('.container');
        container.appendChild(div);
    }

    for (let i = 1; i < rows; i++) {
        let div = document.createElement('div');
        div.className = 'grid_rows';
        div.style.top = (100 / rows) * i + '%';
        let container = document.querySelector('.container');
        container.appendChild(div);
    }
}



function Box(color, posX, posY, main_object, parent_querySelector) {
    
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



function Figure(posX, posY, color) {
    this.id = Figure.id;
    Figure.id++;
    this.posX = posX;
    this.posY = posY;
    this.color = color;
    this.slug = [
        new Box(color, posX, posY, '', '.container'),
        new Box(color, posX, posY, '', '.container'),
        new Box(color, posX, posY, '', '.container'),
        new Box(color, posX, posY, '', '.container')

    ];
    this.map = [];
    this.number_current_map = 0;
    this.frozen = false;
}

Figure.id = 0;

Figure.prototype.setPosForSlug = function (arrObjNewPosXPoxY) {
    this.slug.forEach(function (slug_item, item) {
        slug_item.setPosX(arrObjNewPosXPoxY[item].posX);
        slug_item.setPosY(arrObjNewPosXPoxY[item].posY);
    });
    
}

Figure.prototype.muveDown = function () {
    let ShiftPos = this.getShiftPos(0, 1, this.slug);
    let ArrObjWithoutCurPos = this.retArrObjWithoutCurPos(ShiftPos);
    if (tetris.isFreeSpace(ArrObjWithoutCurPos)) {
        let cross = this.crossBorder(ShiftPos);
        if (cross == false) {
            this.setPosForSlug(ShiftPos);
        } 
         else if (cross == 'bottom') {
            this.freeze();
        }
    }
    else this.freeze();
}

Figure.prototype.muveRight = function () {
    let ShiftPos = this.getShiftPos(1, 0, this.slug);
    let ArrObjWithoutCurPos = this.retArrObjWithoutCurPos(ShiftPos);
    if (tetris.isFreeSpace(ArrObjWithoutCurPos)) {
        if (this.crossBorder(ShiftPos) == false) {
            this.setPosForSlug(ShiftPos);
        }
    }
}

Figure.prototype.muveLeft = function () {
    let ShiftPos = this.getShiftPos(-1, 0, this.slug);
    let ArrObjWithoutCurPos = this.retArrObjWithoutCurPos(ShiftPos);
    if (tetris.isFreeSpace(ArrObjWithoutCurPos)) {
        if (this.crossBorder(ShiftPos) == false) {
            this.setPosForSlug(ShiftPos);
        }
    }
}

Figure.prototype.rotate = function () {
    let number_map = this.getNumberNextMap();
    let arrObjPosXPosY = this.getArrObjPosAcordingMap(number_map);
    let ArrObjWithoutCurPos = this.retArrObjWithoutCurPos(arrObjPosXPosY);
    if (tetris.isFreeSpace(ArrObjWithoutCurPos)) {
        let cross = this.crossBorder(arrObjPosXPosY);
        if (cross == false) {
            this.setPosForSlug(arrObjPosXPosY);
            this.number_current_map = number_map;

        }
        else if (cross == 'right') {
            for (let i = 1; i <= 2; i++) {
                let ShiftPos = this.getShiftPos(i * -1, 0, arrObjPosXPosY);
                let ArrObjWithoutCurPos = this.retArrObjWithoutCurPos(ShiftPos);
                if (tetris.isFreeSpace(ArrObjWithoutCurPos)) {
                    if (this.crossBorder(ShiftPos) == false) {
                        this.setPosForSlug(ShiftPos);
                        this.number_current_map = number_map;
                        break;
                    }
                }
            }
        }
        else if (cross == 'left') {
            for (let i = 1; i <= 2; i++) {
                let ShiftPos = this.getShiftPos(i * 1, 0, arrObjPosXPosY);
                let ArrObjWithoutCurPos = this.retArrObjWithoutCurPos(ShiftPos);
                if (tetris.isFreeSpace(ArrObjWithoutCurPos)) {
                    if (this.crossBorder(ShiftPos) == false) {
                        this.setPosForSlug(ShiftPos);
                        this.number_current_map = number_map;
                        break;
                    }
                }
            }
        }
        else if (cross == 'bottom') {
            this.freeze();
        }
    }


}

Figure.prototype.freeze = function () {
    this.frozen = true;
    tetris.addRandFigure(4,0);
}

Figure.prototype.getArrObjPosAcordingMap = function (number_map) {
    let arrObjPosXPoxY = [];
    this.map[number_map].forEach(function (map_item, i) {
        arrObjPosXPoxY[i] = {
            posX: this.slug[i].posX + map_item.posX,
            posY: this.slug[i].posY + map_item.posY,

        }

    }, this);
    return arrObjPosXPoxY;
}

Figure.prototype.crossBorder = function (arrObjPosXPosY) {
    if (arrObjPosXPosY.some(item => item.posX == -1)) return 'left';
    else if (arrObjPosXPosY.some(item => item.posX == tetris.size.columns)) return 'right';
    else if (arrObjPosXPosY.some(item => item.posY == tetris.size.rows)) return 'bottom';
    else return false;
}

Figure.prototype.getNumberNextMap = function () {
    let number_next_map = this.number_current_map + 1;
    if (number_next_map >= this.map.length) number_next_map = 0;
    return number_next_map;
}

Figure.prototype.getShiftPos = function (shiftX, shiftY, arrObjPosXPosY) {
    let retArrObjPosXPosY = [

    ];
    arrObjPosXPosY.forEach(function (slug_item, i) {
        retArrObjPosXPosY[i] = {
            posX: slug_item.posX + shiftX,
            posY: slug_item.posY + shiftY,

        }

    })

    
    return retArrObjPosXPosY;
}

Figure.prototype.retArrObjWithoutCurPos = function (arrObjWithCurPos) {
    let arrObjWithoutCurPos = arrObjWithCurPos.filter(function (ObjWithCurPos) {
        return this.slug.every(function (slug_item, i) {         
            if (slug_item.posX == ObjWithCurPos.posX && slug_item.posY == ObjWithCurPos.posY) return false;
            else return true;
        });
    },this);
    
    return arrObjWithoutCurPos;
}

function Figure_box(posX, posY, color) {
    Figure.apply(this, arguments);
    this.slug[0].setPosX_Y(posX, posY);
    this.slug[1].setPosX_Y(posX + 1, posY);
    this.slug[2].setPosX_Y(posX, posY + 1);
    this.slug[3].setPosX_Y(posX + 1, posY + 1);


}

Figure_box.prototype = Object.create(Figure.prototype);
Figure_box.prototype.constructor = Figure_box;

function Figure_I(posX, posY, color) {
    Figure.apply(this, arguments);
    this.slug[0].setPosX_Y(posX, posY);
    this.slug[1].setPosX_Y(posX, posY + 1);
    this.slug[2].setPosX_Y(posX, posY + 2);
    this.slug[3].setPosX_Y(posX, posY + 3);

    this.map[0] = [{ posX: -2, posY: -2 },
                   { posX: -1, posY: -1 },
                   { posX: 0, posY: 0 },
                   { posX: +1, posY: +1 },
    ];
    this.map[1] = [{ posX: 2, posY: 2 },
                   { posX: 1, posY: 1 },
                   { posX: 0, posY: 0 },
                   { posX: -1, posY: -1},
    ];
    
    

}

Figure_I.prototype = Object.create(Figure.prototype);
Figure_I.prototype.constructor = Figure_I;

function Figure_J(posX, posY, color) {
    Figure.apply(this, arguments);
    this.slug[0].setPosX_Y(posX, posY);
    this.slug[1].setPosX_Y(posX, posY + 1);
    this.slug[2].setPosX_Y(posX, posY + 2);
    this.slug[3].setPosX_Y(posX - 1, posY + 2);

    this.map[0] = [{
        posX: 1, posY: -1
    },
        { posX: 0, posY: 0 },
        { posX: -1, posY: 1 },
        { posX: -2, posY: 0 },
    ];
    this.map[1] = [{ 
      posX: 1, posY: 1 },
    { posX: 0, posY: 0 },
    { posX: -1, posY: -1 },
    { posX: 0, posY: -2 },
    ];
    this.map[2] = [{
      posX: -1, posY: 1    },
    { posX: 0, posY: 0 },
    { posX: 1, posY: -1 },
    { posX: 2, posY: 0 },
    ];
    this.map[3] = [{
        posX: -1, posY: -1    },
    { posX: 0, posY: 0 },
    { posX: 1, posY: 1 },
    { posX: 0, posY: 2 },
    ];
}

Figure_J.prototype = Object.create(Figure.prototype);
Figure_J.prototype.constructor = Figure_J;

function Figure_L(posX, posY, color) {
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

Figure_L.prototype = Object.create(Figure.prototype);
Figure_L.prototype.constructor = Figure_L;

function Figure_T(posX, posY, color) {
    Figure.apply(this, arguments);
    this.slug[0].setPosX_Y(posX, posY);
    this.slug[1].setPosX_Y(posX, posY + 1);
    this.slug[2].setPosX_Y(posX + 1, posY + 1);
    this.slug[3].setPosX_Y(posX , posY + 2);

    this.map[0] = [{
        posX: 1, posY: -1
    },
    { posX: 0, posY: 0 },
    { posX: 1, posY: 1 },
    { posX: -1, posY: 1 },
    ];
    this.map[1] = [{
        posX: 1, posY: 1
    },
    { posX: 0, posY: 0 },
    { posX: -1, posY: 1 },
    { posX: -1, posY: -1 },
    ];
    this.map[2] = [{
        posX: -1, posY: 1
    },
    { posX: 0, posY: 0 },
    { posX: -1, posY: -1 },
    { posX: 1, posY: -1 },
    ];
    this.map[3] = [{
        posX: -1, posY: -1
    },
    { posX: 0, posY: 0 },
    { posX: 1, posY: -1 },
    { posX: 1, posY: 1 },
    ];
}

Figure_T.prototype = Object.create(Figure.prototype);
Figure_T.prototype.constructor = Figure_T;

function Figure_S(posX, posY, color) {
    Figure.apply(this, arguments);
    this.slug[0].setPosX_Y(posX + 1, posY);
    this.slug[1].setPosX_Y(posX, posY );
    this.slug[2].setPosX_Y(posX , posY + 1);
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

Figure_S.prototype = Object.create(Figure.prototype);
Figure_S.prototype.constructor = Figure_S;


function Figure_Z(posX, posY, color) {
    Figure.apply(this, arguments);
    this.slug[0].setPosX_Y(posX - 1, posY);
    this.slug[1].setPosX_Y(posX, posY);
    this.slug[2].setPosX_Y(posX, posY + 1);
    this.slug[3].setPosX_Y(posX + 1, posY + 1);

    this.map[0] = [{
        posX: -1, posY: 0
    },
    { posX: 0, posY: -1 },
    { posX: 1, posY: 0 },
    { posX: 2, posY: -1 },
    ];
    this.map[1] = [{
        posX: 1, posY: 0
    },
    { posX: 0, posY: 1 },
    { posX: -1, posY: 0 },
    { posX: -2, posY: 1 },
    ];

}

Figure_Z.prototype = Object.create(Figure.prototype);
Figure_Z.prototype.constructor = Figure_Z;