"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var btapagar = document.getElementById('apg');
var flag_apg = false;
var simp = true;
var reg = false;
var comp = false;
var canvas = document.getElementById('canvas');
var txtValue = document.getElementById('txt');
var ctx = canvas.getContext('2d');
var vertices = [];
var vert_text = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var cont = 0;
canvas.width = 1600;
canvas.height = 800;

var Vertice = /*#__PURE__*/function () {
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
      ctx.beginPath();
      ctx.arc(this.x, this.y, 30, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.font = "35px Arial";
      ctx.stroke();
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.fillText(this.text, this.x - 10, this.y + 13);
      ctx.closePath();
    }
  }, {
    key: "pushAresta",
    value: function pushAresta(v) {
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
          ctx.stroke();
          ctx.fill();

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
  var flag = false;
  vertices.forEach(function (v) {
    if (pos.x > v.x - 30 && pos.x < v.x + 30 && pos.y > v.y - 30 && pos.y < v.y + 30) {
      flag = v;
    }
  });
  return flag;
}

function setMA() {
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
      if (clicked.pushAresta(click) == true) ;
      click.pushAresta(clicked);
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
btapagar.addEventListener('click', function () {
  if (!flag_apg) {
    flag_apg = true;
    btapagar.setAttribute('id', 'apg-active');
    btapagar.innerText = 'Pronto';
  } else {
    flag_apg = false;
    btapagar.setAttribute('id', 'apg');
    btapagar.innerText = 'Apagar';
  }
});
