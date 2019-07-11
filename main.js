import Box from "./moduls/box.js";
import Figure from "./moduls/figure.js";
import Figure_box from "./moduls/figures/Figure_box.js";
import Figure_I from "./moduls/figures/Figure_I.js";
import Figure_J from "./moduls/figures/Figure_J.js";
import Figure_L from "./moduls/figures/Figure_L.js";
import Figure_S from "./moduls/figures/Figure_S.js";
import Figure_Z from "./moduls/figures/Figure_Z.js";
import Figure_T from "./moduls/figures/Figure_T.js";

  

window.onload = function () {
    tetris.draw_grid();
    tetris.start();
}

export let tetris = {};
tetris.occupiedCell = [];
tetris.component = [];
tetris.numbCurrentFigure = 0;
tetris.size = {
    rows: 19,
    columns : 11
}
tetris.row_cost_point = 100;
tetris.row_cost_next_level_points = 400;
tetris.change_delay_in_next_lev = 50;
tetris.minDelay = 150; 
tetris.level = 1;
tetris.points = 0;
tetris.create_pos = {
    x: 4,
    y: 0,
}

tetris.delay_row_move_down = 300;
tetris.delay_figure_move_down = 1000;
tetris.move_down_timeInterval;
tetris.color = {
    diapazon: {
        r: {
            max: 210,
            min: 100,
        },
        g: {
            max: 210,
            min: 100,
        },
        b: {
            max: 210,
            min: 100,
        }
    }
};
tetris.points_div = document.querySelector(".points");
tetris.level_div = document.querySelector(".level");

tetris.show_points = function () {
    this.points_div.innerHTML = `Points: ${tetris.points}`;
}

tetris.show_level = function () {
    this.level_div.innerHTML = `Level: ${tetris.level} (speed: ${tetris.delay_figure_move_down}ms);`
}

tetris.getColor = function () {
    function getRandomColor(objectColor) {

        return Math.round(Math.random() * (objectColor.max - objectColor.min) + objectColor.min);
    }
    return `rgb(${getRandomColor(this.color.diapazon.r)},${getRandomColor(this.color.diapazon.g)},${getRandomColor(this.color.diapazon.b)})`;
}

tetris.addComponent = function (nameComponent, posX, posY) {
    let new_length;
    if (nameComponent == 'O') {
        if (tetris.canCreateNewFigure(Figure_box.size)) return new_length = tetris.component.push(new Figure_box(posX, posY, this.getColor()));
        else tetris.game_over();

    }
    if (nameComponent == 'I') {
        if (tetris.canCreateNewFigure(Figure_I.size)) return new_length = tetris.component.push(new Figure_I(posX, posY, this.getColor()));
        else tetris.game_over();
    }
    if (nameComponent == 'J') {
        if (tetris.canCreateNewFigure(Figure_J.size))  return new_length = tetris.component.push(new Figure_J(posX, posY, this.getColor()));
        else tetris.game_over();
    }
    if (nameComponent == 'L') {
        if (tetris.canCreateNewFigure(Figure_L.size))  return new_length = tetris.component.push(new Figure_L(posX, posY, this.getColor()));
        else tetris.game_over();
    }
    if (nameComponent == 'T') {
        if (tetris.canCreateNewFigure(Figure_T.size)) return new_length = tetris.component.push(new Figure_T(posX, posY, this.getColor()));
        else tetris.game_over();
    }
    if (nameComponent == 'S') {
        if (tetris.canCreateNewFigure(Figure_S.size)) return new_length = tetris.component.push(new Figure_S(posX, posY, this.getColor()));
        else tetris.game_over();
    }
    if (nameComponent == 'Z') {
        if (tetris.canCreateNewFigure(Figure_Z.size)) return new_length = tetris.component.push(new Figure_Z(posX, posY, this.getColor()));
        else tetris.game_over();
    }
}

tetris.canCreateNewFigure = function (size) {
    let ArrObjPosXPosY = [];
    for (let i = 0; i < size; i++) {
        ArrObjPosXPosY[i] = { posX: tetris.create_pos.x, posY: i };
    }
    
    return tetris.isFreeSpace(ArrObjPosXPosY);

}

tetris.game_over = function () {
    console.log("game_over");
    clearTimeout(tetris.move_down_timeInterval);
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
    this.addRandFigure(tetris.create_pos.x, tetris.create_pos.y);
    this.addEventListener();
    tetris.move_down_timeInterval = setInterval(function () {
        tetris.component[tetris.numbCurrentFigure].muveDown();
    }, tetris.delay_figure_move_down);
    tetris.show_points();
    tetris.show_level();
}

tetris.setNumbCurrentFigure = function (numbCurrentFigure) {
    this.numbCurrentFigure = numbCurrentFigure;
}

tetris.addRandFigure = function (posX,posY) {
    let rand_numb = Math.round(Math.random() * (7 - 1) + 1);
    let new_length = 0;
    if (rand_numb == 1) new_length = tetris.addComponent('I', posX, posY);
    if (rand_numb == 2) new_length = tetris.addComponent('O', posX, posY);
    if (rand_numb == 3) new_length = tetris.addComponent('J', posX, posY);
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

tetris.DeleteFullLineAndShiftAboveFigure = function () {
    
    this.doIfFullRow(this.getArrRows(), 18,0,1);
}

tetris.changePointsAndShowP = function (multiplier) {
    tetris.points += tetris.row_cost_point * multiplier;
    tetris.show_points();
}

tetris.changeLevelAndShowL = function () {
    if (tetris.points > 0 && tetris.points % tetris.row_cost_next_level_points == 0) {
        tetris.level += 1;
        tetris.setNextFigureDelay();
        tetris.show_level();


        clearTimeout(tetris.move_down_timeInterval);
        tetris.move_down_timeInterval = setInterval(function () {
            tetris.component[tetris.numbCurrentFigure].muveDown();
        }, tetris.delay_figure_move_down);


    }
}

tetris.setNextFigureDelay = function () {
    if (tetris.delay_figure_move_down > tetris.minDelay) tetris.delay_figure_move_down -= tetris.change_delay_in_next_lev;
}

tetris.doIfFullRow = function (ArrRows, current_row, shift, multiplier) {
            

    if (ArrRows[current_row] !== undefined && ArrRows[current_row].length == 11) {
        
        tetris.deleteRow(ArrRows[current_row]);
        tetris.changePointsAndShowP(multiplier);
        tetris.changeLevelAndShowL();



            function func() {
                
                tetris.muveRowsAbove(1, current_row + shift);
                shift++;
                if (current_row > 0) tetris.doIfFullRow(ArrRows, current_row - 1, shift, multiplier + 0.5);
               
            }

            setTimeout(func, tetris.delay_row_move_down);
        
    } else {
        if (current_row > 0) tetris.doIfFullRow(ArrRows, current_row - 1, shift, multiplier);
        
    }
}


tetris.getArrRows = function () {
    let arrPos = [];
    tetris.component.forEach(function (figure) {
        figure.slug.forEach(function (box) {
            if (box.posY < 50) {
                if (arrPos[box.posY] === undefined) arrPos[box.posY] = [];
                arrPos[box.posY].push(box);
            }
        });
    });
    //console.log(arrPos);
    return arrPos;
/*    arrPos.forEach(function (item, i) {
        if (item.length == 11) {
            while (can_go == true) {
                
            }
            
            function func() {
                console.log(123);
            }

            setTimeout(func, 2000);
            callback_row(1,i);
        }

    });*/

/*    if(arrPos[current_el].length == 11){
        callback_item(item);
    }*/
    //
}

tetris.muveRowsAbove = function (distance, start_pos) {
    tetris.component.forEach(function (figure) {
        figure.slug.forEach(function (box) {
            if (box.posY < start_pos) {
                box.setPosY(box.posY + 1);

            }
        });
    });
}

tetris.deleteRow = function (arr_box) {

    arr_box.forEach(function (box) {
        box.div.classList.add("delate_row");
        box.posY = 100;
    });

/*    tetris.component.forEach(function (figure) {
        figure.slug.forEach(function (box, i) {
            arr_box.forEach(function (box_from_arr_box) {
                if (box === box_from_arr_box) {
                    figure.slug.splice(i, i);
                }
            });
        });
    });*/












/*    tetris.component.forEach(function (figure) {
        figure.slug.forEach(function (box, i) {
            if (box.posY == number_row) {
                box.div.classList.add("delate_row");
                //box.div.remove();
                //figure.slug.splice(i,i);
                console.log(111);
            }
            
        });
    });*/
/*    for (let i = tetris.component.length - 1; i >= 0; i--) {

        for (let ii = tetris.component[i].slug.length - 1; ii >= 0; ii--) {
            if (tetris.component[i].slug[ii].posY == number_row) {
                tetris.component[i].slug[ii].div.classList.add("delate_row");
                //box.div.remove();
                //figure.slug.splice(i,i);
                console.log(111);
            }
        }

    }
    tetris.component.forEach(function (figure) {
        figure.slug.forEach(function (box, i) {
            if (box.posY == number_row) {
                console.log(222);
                figure.slug.splice(i,i);
            }

        });
    });*/

}
