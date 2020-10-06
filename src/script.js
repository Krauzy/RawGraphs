// Manipulação da DOM
const blue = '#0B6FA4';
const colorlist = [
    '#5f0f40',
    '#8338ec',
    '#fb8b24', 
    '#9a031e',     
    '#0f4c5c',     
    '#161a1d', 
    '#ee6c4d', 
    '#f20089', 
    '#cca000', 
    '#b56576'
];
var btreg = document.getElementById('reg');
btreg.style.backgroundColor = 'white';
btreg.style.border = "1px solid " + blue;
btreg.style.color = blue;
var btsimp = document.getElementById('simp');
btsimp.style.backgroundColor = 'white';
btsimp.style.border = "1px solid " + blue;
btsimp.style.color = blue;
var btcomp = document.getElementById('comp');
btcomp.style.backgroundColor = 'white';
btcomp.style.border = "1px solid " + blue;
btcomp.style.color = blue;
const btreset = document.getElementById('reset');
const btcolor = document.getElementById('coloring');
const closepop = document.getElementById('closepopup');
const toogle = document.getElementById('myonoffswitch');
const tabfila = document.querySelector('table#fila tbody');
const tabcolor = document.querySelector('table#colors tbody');
toogle.addEventListener('click', function(event) {
    if(digraf == true)
        digraf = false;
    else
        digraf = true;
    cont = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    vertices = [];
    setMA();
    setMI();
    setLA();
    checkSimples();
    checkRegular();
    checkCompleto();
});
//

// Declaração de variávei globais
var flag_apg = false;
var digraf = false;
var simp = true;
var reg = false;
var comp = false;
const canvas = document.getElementById('canvas');
const txtValue = document.getElementById('inp');
const ctx = canvas.getContext('2d');
var vertices = [];
const vert_text = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var cont = 0;

// Remodelação do Canvas para as retas ficarem mais visíveis
canvas.width = 1600; 
canvas.height = 800;
//

function Coloring() { // Coloração
    tabfila.innerHTML = '';
    let colors = [];
    vertices.forEach(function(v) {
        let line = [];
        line.push(v.text);
        colors.push(line);
    });
    let order = vertices.copyWithin(vertices.length, 0);
    order.sort(function(a, b) {
        return b.grau - a.grau;
    });
    let fila = [];
    let last = [];    
    console.clear();
    order.forEach(function(v) {
        let aresta = v.arestas;
        if(!last.includes(v)) {
            fila.push(v);
            last.push(v);
        }
        aresta.sort(function(a, b) {
            return a.index - b.index;
        });
        aresta.forEach(function(ve) {
            if(!last.includes(ve)) {
                fila.push(ve);
                last.push(ve);
            }
        });
        addFila(fila);
        let V = fila.shift();
        let arr = [];
        let index = V.index;
        let a = V.arestas;
        a.forEach(function(vv) {
            arr.push(vv.text);
        });
        //
        let mov = 0;
        if(colors[index].includes('*') == false) {
            for(let i = 0; i < colors.length; i++) {
                if(colors[i][0] == arr[mov]) {
                    colors[i].push('x');
                    mov++;
                }
                else {
                    if(i == index) {
                        colors[i].push(colors[i].length - 1);
                    }
                    else
                        colors[i].push('*');
                }  
            }
        }
        else {
            let id = parseInt(colors[index].indexOf('*'));
            colors[index][id] = id - 1;
            for(let i = 0; i < colors.length; i++) {
                if(colors[i][0] == arr[mov]) {
                    colors[i][id] = 'x';
                    mov++;
                }
            }
        }
        
    });
    for(let i = 0; i < colors.length; i++) {
        for(let j = 0; j < colors[i].length; j++) {
            if(colors[i][j] == '*')
                colors[i][j] = 'x';
        }
    }
    console.clear();
    colors.forEach(function(c) {
        console.log(c.map(function(value, index) {
            return value;
        }));
    });
    vertices = vertices.sort(function(a, b) {
        return a.index - b.index;
    });
    setColorList(colors);
    for(let i = 0; i < colors.length; i++) {
        let cor;
        for(let x = 1; x < colors[i].length; x++) {
            if(colors[i][x] != 'x') {
                console.log('[' + i +'][' + x + ']: ' + colors[i][x]);
                cor = parseInt(colors[i][x]);
            }
                
        }
        vertices[i].render(colorlist[cor]);
    }
}

function addFila(array) {
    let linha = document.createElement('tr');
    array.forEach(function(it) {
        let td = document.createElement('td');
        td.innerText = it.text;
        linha.appendChild(td);
    });
    tabfila.appendChild(linha);
}

function setColorList(colors) {
    tabcolor.innerHTML = '';
    colors.forEach(function(l) {
        let linha = document.createElement('tr'); 
        let td = document.createElement('td');
        td.setAttribute('class', 'rbox');
        td.innerText = l[0];
        linha.appendChild(td);
        for(let i = 1; i < l.length; i++) {
            let t = document.createElement('td');
            t.innerText = l[i];
            linha.appendChild(t);
        }
        tabcolor.appendChild(linha);
    });
}

class Vertice { //Classe vértice, armazena cada aresta do grafo
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.arestas = [];
        this.values = [];
        this.text = vert_text[cont] + "";
        this.index = parseInt(this.text);
        this.grau = 0;
    }

    render(color) { // renderiza do vertice na tela
        ctx.beginPath();
        ctx.arc(this.x, this.y, 25, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.font = "30px Arial";
        ctx.stroke();
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.fillText(this.text, this.x - 8, this.y + 11);
        ctx.closePath();
    }

    pushAresta(v, digraf = false) { // Insere uma conexão de vertice (aresta) com o vertice this e já exibe em tela
        if(!this.arestas.includes(v)) {
            ctx.beginPath();
            if(this.text == v.text) {
                simp = false;
                ctx.arc(this.x + 30, this.y + 30, 30, 0, 2 * Math.PI);
                ctx.stroke();
                if(txtValue.value) {
                    ctx.fillStyle = 'black';
                    ctx.font = '30px Arial';
                    ctx.fillText(txtValue.value, this.x + 30, this.y + 30);
                    this.values.push(txtValue.value);
                }
                else
                    this.values.push('1');
            }
            else {
                ctx.lineWidth = 2;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(v.x, v.y);    
                
                if(digraf == true) {

                    let angle = Math.atan2((v.y - this.y), (v.x - this.x)) - Math.PI / 2.0;
                    let sin = Math.sin(angle);
                    let cos = Math.cos(angle);

                    let x1 = (-1.0 / 2.0 * cos + Math.sqrt(3) / 2 * sin) * 60.0 + v.x;
                    let y1 = (-1.0 / 2.0 * sin - Math.sqrt(3) / 2 * cos) * 60.0 + v.y;
                    
                    let x2 = (1.0 / 2.0 * cos + Math.sqrt(3) / 2 * sin) * 60.0 + v.x;
                    let y2 = (1.0 / 2.0 * sin - Math.sqrt(3) / 2 * cos) * 60.0 + v.y;
                    
                    let arr = [];
                    
                    
                    x1 = parseInt(x1);
                    y1 = parseInt(y1);
                    x2 = parseInt(x2);
                    y2 = parseInt(y2);

                    ctx.lineTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.lineTo(v.x, v.y);
                    ctx.fillStyle = "#000000";
                }
                ctx.fill();
                ctx.stroke();
                if(txtValue.value) {
                    var X = (this.x + v.x) / 2;
                    var Y = (this.y + v.y) / 2;
                    var minX = Math.abs(this.x - v.x);
                    var minY = Math.abs(this.y - v.y);
                    if(minX > minY)
                        Y += 30;
                    else
                        X += 10;
                    ctx.moveTo(X, Y);
                    ctx.fillStyle = 'black';
                    ctx.font = '30px Arial';
                    ctx.fillText(txtValue.value, X, Y);
                    this.values.push(txtValue.value);
                }
                else
                    this.values.push('1');
            }
            this.arestas.push(v);
            vertices.forEach(function(v) {
                v.render(blue);
            });
            this.grau++;
            ctx.closePath();
            return true;
        }
        else {
            vertices.forEach(function(v) {
                v.render(blue);
            });
            return false;
        }
    }

    checkAresta(info) { // Checa se tem aresta entre a aresta info
        var flag = '*';
        for(var i = 0; i < this.arestas.length; i++) {
            if(this.arestas[i].text == info)
                flag = this.values[i];
        }
        return flag;
    }
}


function getTarget(pos) {  // Return o valor do vértice clicado pelo mouse, caso contrário retorna false
    var flag = false;
    vertices.forEach(function(v){
        if(pos.x > v.x - 30 && pos.x < v.x + 30 && pos.y > v.y - 30 && pos.y < v.y + 30) {
            flag = v;
        }
    });
    return flag;
}

function setMA() {  // Constrói a Matriz Adjacente do grafo
    var linhas = document.querySelectorAll('table#ma tbody tr');
    linhas.forEach(function(a) {
        a.innerHTML = "";
    })
    var thead = document.querySelector('table#ma thead');
    thead.innerHTML = "";
    var t = document.createElement('th');
    t.innerText = 'MA';
    thead.appendChild(t);
    vertices.forEach(function(v) {
        var th = document.createElement('th');
        th.innerText = v.text;
        thead.appendChild(th);
        var td = document.createElement('td');
        td.innerText = v.text;
        td.setAttribute('class', 'rbox');
        var l = linhas[parseInt(v.text)];
        l.appendChild(td);
        //c++;
    });

    for(var l = 0; l < cont; l++) {
        for(var i = 0; i < cont; i++) {
            var t = document.createElement('td');
            t.innerText = vertices[l].checkAresta(i + "");
            linhas[l].appendChild(t);
        }
    }
}

function setMI() {  // Constrói a Matriz Incidente do grafo
    let linhas = document.querySelectorAll('table#mi tbody tr');
    linhas.forEach(function(l) {
        l.innerHTML = "";
    });
    for(let i = 0; i < cont; i++) {
        let td = document.createElement('td');
        td.innerText = vertices[i].text;
        td.setAttribute('class', 'rbox');
        linhas[i].appendChild(td);
        for(let j = 0; j < cont; j++) {
            let res = vertices[j].checkAresta(td.innerText);
            if(res != '*') {
                let t = document.createElement('td');
                if(txtValue.value)
                    t.innerText = "(" + vertices[j].text + "," + res + ")";
                else
                    t.innerText = vertices[j].text;
                linhas[i].appendChild(t);
            }
        }
    }
}

function getLA(v1, v2, arestas = []) {
    var flag = false;
    arestas.forEach(function(a) {
        if(a.v1 == v1.text && a.v2 == v2.text) 
            flag = true;
        if(a.v1 == v2.text && a.v2 == v1.text)
            flag = true;            
    });
    return flag;
}

function setLA() {  // Constroi a Lista de Adjacencia (Edge List)
    var tbody = document.querySelector('table#la tbody');
    var x = 0;
    tbody.innerHTML = "";
    var arestas = [];
    vertices.forEach(function(v) {
        v.arestas.forEach(function(ve) {
            let obj = {
                v1: v.text,
                v2: ve.text
            }
            let obj_rev = {
                v1: v.text,
                v2: ve.text
            }
            if(getLA(v, ve, arestas) == false) {
                arestas.push(obj);
                arestas.push(obj_rev);
                let linha = document.createElement('tr');
                let h = document.createElement('td');
                h.setAttribute('class', 'rbox');
                h.innerText = "" + x;
                x++;
                let b1 = document.createElement('td');
                b1.innerText = v.text;
                let b2 = document.createElement('td');
                b2.innerText = ve.text;
                
                linha.appendChild(h);
                linha.appendChild(b1);
                linha.appendChild(b2);
                if(txtValue.value) {
                    let b3 = document.createElement('td');
                    b3.innerText = v.checkAresta(ve.text);
                    linha.appendChild(b3);
                }
                tbody.appendChild(linha);
            }
        })
    });
}

function checkSimples() {   //Checa se o grafo é simples
    if(simp) {
        btsimp.style.backgroundColor = blue;
        btsimp.style.border = "1px solid " + blue;
        btsimp.style.color = 'white';
    }
    else {
        btsimp.style.backgroundColor = 'white';
        btsimp.style.border = "1px solid " + blue;
        btsimp.style.color = blue;
    }
}

function checkRegular() {   //Checa se o grafo é regular
    var c = null;
    var flag = false;
    vertices.forEach(function(v) {
        if(c == null)
            c = v.arestas.length;
        else 
            if(v.arestas.length != c)
                flag = true;
    });
    if(!flag) {
        btreg.style.backgroundColor = blue;
        btreg.style.border = "1px solid " + blue;
        btreg.style.color = 'white';
    }
    else {
        btreg.style.backgroundColor = 'white';
        btreg.style.border = "1px solid " + blue;
        btreg.style.color = blue;
    }    
}

function checkCompleto() {  //Checa se o grafo é completo
    var flag = false;
    vertices.forEach(function(v) {
        if(v.arestas.length != cont - 1)
            flag = true;
    });
    if(!flag) {
        btcomp.style.backgroundColor = blue;
        btcomp.style.border = "1px solid " + blue;
        btcomp.style.color = 'white';
    }
    else {
        btcomp.style.backgroundColor = 'white';
        btcomp.style.border = "1px solid " + blue;
        btcomp.style.color = blue;
    }
}

var clicked = null;
canvas.addEventListener('mousedown', function(event) { //Evento de click do mouse (Função de disparo de todos os eventos)
    var react = canvas.getBoundingClientRect();
    var pos = {
        x: (event.clientX - react.left) * 2,
        y: (event.clientY - react.top) * 2
    };
    var click = getTarget(pos);
    if(cont < 10 && !click) {
        vertices.push(new Vertice(pos.x, pos.y));
        vertices[cont].render(blue);
        cont++;
    }
    if(click != false) {
        if(clicked == null) {
            clicked = click;
            clicked.render('limegreen');
        }
        else {
            if(clicked.pushAresta(click, digraf) == true && digraf == false)
                click.pushAresta(clicked);
            clicked = null;
        }
    }
    vertices.sort(function(a, b) {
        return a.index - b.index;
    });
    setMA();
    setMI();
    setLA();
    checkSimples();
    checkRegular();
    checkCompleto();
}, false);

btreset.addEventListener('click', function(event) {
    cont = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    vertices = [];
    tabcolor.innerHTML = "";
    tabfila.innerHTML = "";
    setMA();
    setMI();
    setLA();
    checkSimples();
    checkRegular();
    checkCompleto();
});

btcolor.addEventListener('click', function(event) {
    var pop = document.getElementsByClassName('popup');
    pop[0].style.visibility = 'visible';
    Coloring();
});

closepop.addEventListener('click', function(event) {
    var pop = document.getElementsByClassName('popup');
    pop[0].style.visibility = 'hidden';
});