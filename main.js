let swap_mode = true;
let defaultCol = 3;
let array,node,mark,countCircuit,resutl,u;

function swap_mode_button(){
    remove_input();
    if(swap_mode)
        create_textarea();
    else
        create_matrix_input();
    swap_mode = swap_mode?false:true;
}

function clear_input(){
    remove_input();
    if(swap_mode){
        create_matrix_input();
    }
    else{
        create_textarea();
    }
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

function create_circuit(B){
    resutl.push(B.join("->"));
    countCircuit++;
}

function hamilton_circuit(B, C, i){
    for (let j = 0; j < array.length; j++) {
        if(array[B[i-1]][j] > 0 && C[j]==0 && j!=B[i-1]){
            B[i] = j;
            C[j] = 1;
            if(i<array.length)
                hamilton_circuit(B,C,i+1);
            else
                if(B[i]==B[0])
                    create_circuit(B);
            C[j] = 0;
        }
    }
}

function create_path(B){
    resutl.push(B.join("->"));
}

function hamilton_path(B,C,i){
    if(i===array.length)
        create_path(B);
    else{
        for (let j = 0; j < array.length; j++) {
            if(array[B[i-1]][j]>0 && C[j] == 0 && j!=B[0] && j!=B[i-1]){
                B[i]=j;
                C[j]=1;
                hamilton_path(B,C,i+1);
                C[j]=0;
            }
        }
    }
}

function main(){
    array = [];
    resutl = [];
    countCircuit = 0;
    let conclusion = document.getElementById("conclusion");
    let path = document.getElementById("result");
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
            return row.trim().split(" ").map(Number);
        });
    }
    // init array node, mark
    node = Array(array.length)
    mark = Array(array.length).fill(0)

    // find path
    if(checkValidMatrix()){
        for (let i = 0; i < array.length; i++) {
            node[0] = i;
            hamilton_circuit(node,mark,1);
        }
        if(countCircuit>0){
            conclusion.innerHTML = "Đồ thị là đồ thị Hamilton có chu trình Hamilton:";
            path.innerHTML = resutl[0];
        }
        else {
            node = Array(array.length).fill(0)
            for (let i = 0; i < array.length; i++) {
                node[0] = i;
                hamilton_path(node,mark,1);
            }
            if(resutl.length>0){
                conclusion.innerHTML = "Đồ thị là đồ thị nửa Hamilton có đường đi Hamilton:";
                path.innerHTML = resutl[0];
            }
            else{
                conclusion.innerHTML = "Đồ thị không tồn tại chu trình và đường đi Hamilton!";
                path.innerHTML = "";
            }
        }
    }
    else {
            conclusion.innerHTML = "Ma trận kề không hợp lệ!";
            path.innerHTML = "";
    }    
}