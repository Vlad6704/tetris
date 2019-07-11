import Box from "./box.js";
import { tetris } from "../main.js";

export default function Figure(posX, posY, color) {
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
            this.cantMuveDown();
        }
    }
    else this.cantMuveDown();
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
            this.cantMuveDown();
        }
    }


}

Figure.prototype.cantMuveDown = function () {
    this.freeze();
    tetris.DeleteFullLineAndShiftAboveFigure();
    tetris.addRandFigure(4, 0);

}

Figure.prototype.freeze = function () {
    this.frozen = true;

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
    }, this);

    return arrObjWithoutCurPos;
}