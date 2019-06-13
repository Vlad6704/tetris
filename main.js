window.onload = function () {
    draw_grid();
   
}

let tetris = {};
tetris.occupiedCell = [];
tetris.component = [];
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
        tetris.component.push(new Figure_box(posX, posY, this.getColor()));
    }
    if (nameComponent == 'I') {
        tetris.component.push(new Figure_I(posX, posY, this.getColor()));
    }
    if (nameComponent == 'J') {
        tetris.component.push(new Figure_J(posX, posY, this.getColor()));
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




function draw_grid(rows, columns) {
    if (rows === undefined) rows = 19;
    if (columns === undefined) columns = 11;

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
    this.div.style.left = (100 / 11) * posX + '%';
}
Box.prototype.setPosY = function (posY) {
    tetris.occupiedCell[this.id].posY = posY;
    this.posY = posY;
    this.div.style.top = (100 / 19) * posY + '%';
}

Box.prototype.setPosX_Y = function (posX, posY) {
    this.setPosX(posX);
    this.setPosY(posY);
}



function Figure(posX, posY, color) {
    this.posX = posX;
    this.posY = posY;
    this.color = color;
    this.slug = [
        new Box(color, posX, posY, '', '.container'),
        new Box(color, posX, posY, '', '.container'),
        new Box(color, posX, posY, '', '.container'),
        new Box(color, posX, posY, '', '.container')

    ];




}

Figure.prototype.muve = function (arrObjNewPosXPoxY) {
    this.slug.forEach(function (slug_item, item) {
        slug_item.setPosX(arrObjNewPosXPoxY[item].posX);
        slug_item.setPosY(arrObjNewPosXPoxY[item].posY);
    });
    
}

Figure.prototype.muveDown = function () {
    let ShiftPos = this.getShiftPos(0, 1);
    let ArrObjWithoutCurPos = this.retArrObjWithoutCurPos(ShiftPos);
    if (tetris.isFreeSpace(ArrObjWithoutCurPos)) {
 
        this.muve(ShiftPos);
    } 
}

Figure.prototype.muveRight = function () {
    let ShiftPos = this.getShiftPos(1, 0);
    let ArrObjWithoutCurPos = this.retArrObjWithoutCurPos(ShiftPos);
    if (tetris.isFreeSpace(ArrObjWithoutCurPos)) {

        this.muve(ShiftPos);
    }
}

Figure.prototype.muveLeft = function () {
    let ShiftPos = this.getShiftPos(-1, 0);
    let ArrObjWithoutCurPos = this.retArrObjWithoutCurPos(ShiftPos);
    if (tetris.isFreeSpace(ArrObjWithoutCurPos)) {

        this.muve(ShiftPos);
    }
}

Figure.prototype.getShiftPos = function (shiftX, shiftY) {
    let retArrObjPosXPosY = [

    ];
    this.slug.forEach(function (slug_item, i) {
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


}

Figure_I.prototype = Object.create(Figure.prototype);
Figure_I.prototype.constructor = Figure_box;

function Figure_J(posX, posY, color) {
    Figure.apply(this, arguments);
    this.slug[0].setPosX_Y(posX, posY);
    this.slug[1].setPosX_Y(posX, posY + 1);
    this.slug[2].setPosX_Y(posX, posY + 2);
    this.slug[3].setPosX_Y(posX - 1, posY + 2);


}

Figure_J.prototype = Object.create(Figure.prototype);
Figure_J.prototype.constructor = Figure_box;

console.time('df');
tetris.addComponent('J', 1, 0);
tetris.addComponent('O', 0, 6);
tetris.addComponent('O', 4, 0);
tetris.addComponent('O', 4, 0);
console.timeEnd('df')

addEventListener("keydown", function (event) {
    if (event.keyCode == 83)    tetris.component[0].muveDown();
    if (event.keyCode == 68)    tetris.component[0].muveRight();
    if (event.keyCode == 65)    tetris.component[0].muveLeft();
});