let swap_mode = true;
let defaultCol = 3;
let array = [];
let u;

function swap_mode_button(){
    remove_input();
    if(swap_mode)
        create_textarea();
    else
        create_matrix_input();
    swap_mode = swap_mode?false:true;
}

function disable_button(){
    let add = document.getElementById("increment-size-button");
    let sub = document.getElementById("decrement-size-button");
    add.setAttribute('disabled', '');
    sub.setAttribute('disabled', '');
}

function enable_button(){
    let add = document.getElementById("increment-size-button");
    let sub = document.getElementById("decrement-size-button");
    add.removeAttribute('disabled');
    sub.removeAttribute('disabled');
}

function create_textarea(){
    var container = document.getElementById('container');
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    let input = document.createElement('textarea');
    input.rows = 10;
    input.cols = 50;
    input.id = "input-matrix";
    input.placeholder = "0 1 0 0 0\n1 0 1 1 1\n0 1 0 1 0\n0 1 1 0 1\n0 1 0 1 0";
    container.appendChild(input);
    disable_button();
}

function create_matrix_input(){
    let table = document.createElement('table');
    for(let i = 0; i<defaultCol;i++){
        let tr = document.createElement('tr');
        for(let j = 0; j<defaultCol;j++){
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.id='cell-'+i+'-'+j;
            input.type = 'number';
            input.min = 0;
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    container.appendChild(table);
    enable_button();
}

function remove_input(){
    var container = document.getElementById('container');
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

function add() {
    remove_input();
    defaultCol+=1;
    create_matrix_input();
}


function sub(){
    remove_input();
    defaultCol = defaultCol<2?1:--defaultCol;
    create_matrix_input();
}

function checkValidMatrix(){
    for (const row of array) {
        if(row.length != array.length)
            return false;
        for (const item of row) {
            if(!Number.isFinite(item))
                return false;
        }
    }
    for (const row of array) {
        for (const item of row) {
            if(item!=0)
                return true;
        }
    }
    return false;
}

function checkExist(){
    
}



function main(){
    array = []
    let conclusion = document.getElementById("conclusion");
    let result = document.getElementById("result");
    if(swap_mode){
            for(let i = 0; i<defaultCol;i++){
            let row = []
            for(let j = 0; j<defaultCol;j++){
                if(document.getElementById('cell-'+i+'-'+j).value!=="")
                    row.push(Number(document.getElementById('cell-'+i+'-'+j).value));
            }
            array.push(row);
        }
    }
    else{
        let matrix = document.getElementById('input-matrix').value;
        array = matrix.split('\n').map(function(row){
            return row.split(" ").map(Number);
        });
    }

    // find path
    if(checkValidMatrix()){
        let d = checkExist();
        
    }
    else {
            conclusion.innerHTML = "Ma trận kề không hợp lệ!";
            result.innerHTML = "";
    }

    
}