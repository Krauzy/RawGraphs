"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Manipulação da DOM
var blue = '#0B6FA4';
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
var btreset = document.getElementById('reset');
var btcolor = document.getElementById('coloring');
var closepop = document.getElementById('closepopup');
var toogle = document.getElementById('myonoffswitch');
toogle.addEventListener('click', function (event) {
  if (digraf == true) digraf = false;else digraf = true;
  cont = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  vertices = [];
  setMA();
  setMI();
  setLA();
  checkSimples();
  checkRegular();
  checkCompleto();
}); //
//function DFS()
// Declaração de variávei globais

var flag_apg = false;
var digraf = false;
var simp = true;
var reg = false;
var comp = false;
var canvas = document.getElementById('canvas');
var txtValue = document.getElementById('inp');
var ctx = canvas.getContext('2d');
var vertices = [];
var vert_text = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var cont = 0; // Remodelação do Canvas para as retas ficarem mais visíveis

canvas.width = 1600;
canvas.height = 800; //

var Vertice = /*#__PURE__*/function () {
  //Classe vértice, armazena cada aresta do grafo
  function Vertice(x, y) {
    _classCallCheck(this, Vertice);

    this.x = x;
    this.y = y;
    this.arestas = [];
    this.values = [];
    this.text = vert_text[cont] + "";
  }

  _createClass(Vertice, [{
    key: "render",
    value: function render(color) {
      // renderiza do vertice na tela
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
  }, {
    key: "pushAresta",
    value: function pushAresta(v) {
      var digraf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      // Insere uma conexão de vertice (aresta) com o vertice this e já exibe em tela
      if (!this.arestas.includes(v)) {
        ctx.beginPath();

        if (this.text == v.text) {
          simp = false;
          ctx.arc(this.x + 30, this.y + 30, 30, 0, 2 * Math.PI);
          ctx.stroke();

          if (txtValue.value) {
            ctx.fillStyle = 'black';
            ctx.font = '30px Arial';
            ctx.fillText(txtValue.value, this.x + 30, this.y + 30);
            this.values.push(txtValue.value);
          } else this.values.push('1');
        } else {
          ctx.lineWidth = 2;
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(v.x, v.y);

          if (digraf == true) {
            var angle = Math.atan2(v.y - this.y, v.x - this.x) - Math.PI / 2.0;
            var sin = Math.sin(angle);
            var cos = Math.cos(angle);
            var x1 = (-1.0 / 2.0 * cos + Math.sqrt(3) / 2 * sin) * 60.0 + v.x;
            var y1 = (-1.0 / 2.0 * sin - Math.sqrt(3) / 2 * cos) * 60.0 + v.y;
            var x2 = (1.0 / 2.0 * cos + Math.sqrt(3) / 2 * sin) * 60.0 + v.x;
            var y2 = (1.0 / 2.0 * sin - Math.sqrt(3) / 2 * cos) * 60.0 + v.y;
            var arr = [];
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

          if (txtValue.value) {
            var X = (this.x + v.x) / 2;
            var Y = (this.y + v.y) / 2;
            var minX = Math.abs(this.x - v.x);
            var minY = Math.abs(this.y - v.y);
            if (minX > minY) Y += 30;else X += 10;
            ctx.moveTo(X, Y);
            ctx.fillStyle = 'black';
            ctx.font = '30px Arial';
            ctx.fillText(txtValue.value, X, Y);
            this.values.push(txtValue.value);
          } else this.values.push('1');
        }

        this.arestas.push(v);
        vertices.forEach(function (v) {
          v.render(blue);
        });
        ctx.closePath();
        return true;
      } else {
        vertices.forEach(function (v) {
          v.render(blue);
        });
        return false;
      }
    }
  }, {
    key: "checkAresta",
    value: function checkAresta(info) {
      // Checa se tem aresta entre a aresta info
      var flag = '*';

      for (var i = 0; i < this.arestas.length; i++) {
        if (this.arestas[i].text == info) flag = this.values[i];
      }

      return flag;
    }
  }]);

  return Vertice;
}();

function getTarget(pos) {
  // Return o valor do vértice clicado pelo mouse, caso contrário retorna false
  var flag = false;
  vertices.forEach(function (v) {
    if (pos.x > v.x - 30 && pos.x < v.x + 30 && pos.y > v.y - 30 && pos.y < v.y + 30) {
      flag = v;
    }
  });
  return flag;
}

function setMA() {
  // Constrói a Matriz Adjacente do grafo
  var linhas = document.querySelectorAll('table#ma tbody tr');
  linhas.forEach(function (a) {
    a.innerHTML = "";
  });
  var thead = document.querySelector('table#ma thead');
  thead.innerHTML = "";
  var t = document.createElement('th');
  t.innerText = 'MA';
  thead.appendChild(t);
  vertices.forEach(function (v) {
    var th = document.createElement('th');
    th.innerText = v.text;
    thead.appendChild(th);
    var td = document.createElement('td');
    td.innerText = v.text;
    td.setAttribute('class', 'rbox');
    var l = linhas[parseInt(v.text)];
    l.appendChild(td); //c++;
  });

  for (var l = 0; l < cont; l++) {
    for (var i = 0; i < cont; i++) {
      var t = document.createElement('td');
      t.innerText = vertices[l].checkAresta(i + "");
      linhas[l].appendChild(t);
    }
  }
}

function setMI() {
  // Constrói a Matriz Incidente do grafo
  var linhas = document.querySelectorAll('table#mi tbody tr');
  linhas.forEach(function (l) {
    l.innerHTML = "";
  });

  for (var i = 0; i < cont; i++) {
    var td = document.createElement('td');
    td.innerText = vertices[i].text;
    td.setAttribute('class', 'rbox');
    linhas[i].appendChild(td);

    for (var j = 0; j < cont; j++) {
      //console.log(vertices[j]);
      var res = vertices[j].checkAresta(td.innerText);

      if (res != '*') {
        var t = document.createElement('td');
        if (txtValue.value) t.innerText = "(" + vertices[j].text + "," + res + ")";else t.innerText = vertices[j].text;
        linhas[i].appendChild(t);
      }
    }
  }
}

function getLA(v1, v2) {
  var arestas = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var flag = false;
  arestas.forEach(function (a) {
    if (a.v1 == v1.text && a.v2 == v2.text) flag = true;
    if (a.v1 == v2.text && a.v2 == v1.text) flag = true;
  });
  return flag;
}

function setLA() {
  // Constroi a Lista de Adjacencia (Edge List)
  var tbody = document.querySelector('table#la tbody');
  var x = 0;
  tbody.innerHTML = "";
  var arestas = [];
  vertices.forEach(function (v) {
    v.arestas.forEach(function (ve) {
      var obj = {
        v1: v.text,
        v2: ve.text
      };
      var obj_rev = {
        v1: v.text,
        v2: ve.text
      };

      if (getLA(v, ve, arestas) == false) {
        arestas.push(obj);
        arestas.push(obj_rev);
        var linha = document.createElement('tr');
        var h = document.createElement('td');
        h.setAttribute('class', 'rbox');
        h.innerText = "" + x;
        x++;
        var b1 = document.createElement('td');
        b1.innerText = v.text;
        var b2 = document.createElement('td');
        b2.innerText = ve.text;
        linha.appendChild(h);
        linha.appendChild(b1);
        linha.appendChild(b2);

        if (txtValue.value) {
          var b3 = document.createElement('td');
          b3.innerText = v.checkAresta(ve.text);
          linha.appendChild(b3);
        }

        tbody.appendChild(linha);
      }
    });
  });
}

function checkSimples() {
  //Checa se o grafo é simples
  if (simp) {
    btsimp.style.backgroundColor = blue;
    btsimp.style.border = "1px solid " + blue;
    btsimp.style.color = 'white';
  } else {
    btsimp.style.backgroundColor = 'white';
    btsimp.style.border = "1px solid " + blue;
    btsimp.style.color = blue;
  }
}

function checkRegular() {
  //Checa se o grafo é regular
  var c = null;
  var flag = false;
  vertices.forEach(function (v) {
    if (c == null) c = v.arestas.length;else if (v.arestas.length != c) flag = true;
  });

  if (!flag) {
    btreg.style.backgroundColor = blue;
    btreg.style.border = "1px solid " + blue;
    btreg.style.color = 'white';
  } else {
    btreg.style.backgroundColor = 'white';
    btreg.style.border = "1px solid " + blue;
    btreg.style.color = blue;
  }
}

function checkCompleto() {
  //Checa se o grafo é completo
  var flag = false;
  vertices.forEach(function (v) {
    if (v.arestas.length != cont - 1) flag = true;
  });

  if (!flag) {
    btcomp.style.backgroundColor = blue;
    btcomp.style.border = "1px solid " + blue;
    btcomp.style.color = 'white';
  } else {
    btcomp.style.backgroundColor = 'white';
    btcomp.style.border = "1px solid " + blue;
    btcomp.style.color = blue;
  }
}

var clicked = null;
canvas.addEventListener('mousedown', function (event) {
  //Evento de click do mouse (Função de disparo de todos os eventos)
  var react = canvas.getBoundingClientRect();
  var pos = {
    x: (event.clientX - react.left) * 2,
    y: (event.clientY - react.top) * 2
  };
  var click = getTarget(pos);

  if (cont < 10 && !click) {
    vertices.push(new Vertice(pos.x, pos.y));
    vertices[cont].render(blue);
    cont++;
  }

  if (click != false) {
    if (clicked == null) {
      clicked = click;
      clicked.render('limegreen');
    } else {
      if (clicked.pushAresta(click, digraf) == true && digraf == false) click.pushAresta(clicked);
      clicked = null;
    }
  }

  setMA();
  setMI();
  setLA();
  checkSimples();
  checkRegular();
  checkCompleto();
}, false);
btreset.addEventListener('click', function (event) {
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
btcolor.addEventListener('click', function (event) {
  var pop = document.getElementsByClassName('popup');
  pop[0].style.visibility = 'visible';
});
closepop.addEventListener('click', function (event) {
  var pop = document.getElementsByClassName('popup');
  pop[0].style.visibility = 'hidden';
});
