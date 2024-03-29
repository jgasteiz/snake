/**
 * [Floor description]
 */
app.Floor = function() {
    this.el = document.getElementById('table');
    var tr = this.el.getElementsByTagName('tr')[0];
    this.sizeX = tr.children.length - 1;
    this.sizeY = this.el.getElementsByTagName('tr').length - 1;

    // Mapping for floor text.
    this.letters = {
        // Siete
        // S
        's': [{
            x: 6,
            y: 2
        }, {
            x: 5,
            y: 2
        }, {
            x: 4,
            y: 2
        }, {
            x: 4,
            y: 3
        }, {
            x: 4,
            y: 4
        }, {
            x: 5,
            y: 4
        }, {
            x: 6,
            y: 4
        }, {
            x: 6,
            y: 5
        }, {
            x: 6,
            y: 6
        }, {
            x: 5,
            y: 6
        }, {
            x: 4,
            y: 6
        }],
        // I
        'i1': [{
            x: 8,
            y: 2
        }, {
            x: 8,
            y: 3
        }, {
            x: 8,
            y: 4
        }, {
            x: 8,
            y: 5
        }, {
            x: 8,
            y: 6
        }],
        // E
        'e1': [{
            x: 10,
            y: 2
        }, {
            x: 11,
            y: 2
        }, {
            x: 12,
            y: 2
        }, {
            x: 10,
            y: 3
        }, {
            x: 10,
            y: 4
        }, {
            x: 11,
            y: 4
        }, {
            x: 10,
            y: 5
        }, {
            x: 10,
            y: 6
        }, {
            x: 11,
            y: 6
        }, {
            x: 12,
            y: 6
        }],
        // T
        't': [{
            x: 14,
            y: 2
        }, {
            x: 15,
            y: 2
        }, {
            x: 16,
            y: 2
        }, {
            x: 15,
            y: 3
        }, {
            x: 15,
            y: 4
        }, {
            x: 15,
            y: 5
        }, {
            x: 15,
            y: 6
        }],
        // E
        'e2': [{
            x: 18,
            y: 2
        }, {
            x: 19,
            y: 2
        }, {
            x: 20,
            y: 2
        }, {
            x: 18,
            y: 3
        }, {
            x: 18,
            y: 4
        }, {
            x: 19,
            y: 4
        }, {
            x: 18,
            y: 5
        }, {
            x: 18,
            y: 6
        }, {
            x: 19,
            y: 6
        }, {
            x: 20,
            y: 6
        }],
        // De
        // D
        'd': [{
            x: 10,
            y: 8
        }, {
            x: 10,
            y: 9
        }, {
            x: 10,
            y: 10
        }, {
            x: 10,
            y: 11
        }, {
            x: 10,
            y: 12
        }, {
            x: 11,
            y: 12
        }, {
            x: 11,
            y: 8
        }, {
            x: 12,
            y: 9
        }, {
            x: 12,
            y: 10
        }, {
            x: 12,
            y: 11
        }],
        // E
        'e': [{
            x: 14,
            y: 8
        }, {
            x: 15,
            y: 8
        }, {
            x: 16,
            y: 8
        }, {
            x: 14,
            y: 9
        }, {
            x: 14,
            y: 10
        }, {
            x: 15,
            y: 10
        }, {
            x: 14,
            y: 11
        }, {
            x: 14,
            y: 12
        }, {
            x: 15,
            y: 12
        }, {
            x: 16,
            y: 12
        }],
        // Junio
        // J
        'j': [{
            x: 4,
            y: 14
        }, {
            x: 5,
            y: 14
        }, {
            x: 6,
            y: 14
        }, {
            x: 6,
            y: 15
        }, {
            x: 6,
            y: 16
        }, {
            x: 6,
            y: 17
        }, {
            x: 6,
            y: 18
        }, {
            x: 5,
            y: 18
        }, {
            x: 4,
            y: 18
        }, {
            x: 4,
            y: 17
        }],
        // U
        'u': [{
            x: 8,
            y: 14
        }, {
            x: 8,
            y: 15
        }, {
            x: 8,
            y: 16
        }, {
            x: 8,
            y: 17
        }, {
            x: 8,
            y: 18
        }, {
            x: 9,
            y: 18
        }, {
            x: 10,
            y: 14
        }, {
            x: 10,
            y: 15
        }, {
            x: 10,
            y: 16
        }, {
            x: 10,
            y: 17
        }, {
            x: 10,
            y: 18
        }],
        // N
        'n': [{
            x: 12,
            y: 14
        }, {
            x: 12,
            y: 15
        }, {
            x: 12,
            y: 16
        }, {
            x: 12,
            y: 17
        }, {
            x: 12,
            y: 18
        }, {
            x: 13,
            y: 15
        }, {
            x: 14,
            y: 16
        }, {
            x: 15,
            y: 14
        }, {
            x: 15,
            y: 15
        }, {
            x: 15,
            y: 16
        }, {
            x: 15,
            y: 17
        }, {
            x: 15,
            y: 18
        }],
        // I
        'i2': [{
            x: 17,
            y: 14
        }, {
            x: 17,
            y: 15
        }, {
            x: 17,
            y: 16
        }, {
            x: 17,
            y: 17
        }, {
            x: 17,
            y: 18
        }],
        // O
        'o': [{
            x: 19,
            y: 14
        }, {
            x: 19,
            y: 15
        }, {
            x: 19,
            y: 16
        }, {
            x: 19,
            y: 17
        }, {
            x: 19,
            y: 18
        }, {
            x: 20,
            y: 14
        }, {
            x: 20,
            y: 18
        }, {
            x: 21,
            y: 14
        }, {
            x: 21,
            y: 15
        }, {
            x: 21,
            y: 16
        }, {
            x: 21,
            y: 17
        }, {
            x: 21,
            y: 18
        }]
    };

    this.init();
};

app.Floor.prototype.init = function() {
    this.remainingWords = [];
    for (var _i in this.letters) {
        this.remainingWords.push({
            letter: _i,
            coordinates: this.letters[_i],
            timesEated: 0
        });
    }
};

/**
 * Clear the snake from the floor.
 *
 * @return {[type]} [description]
 */
app.Floor.prototype.clear = function() {
    for (var i = 0; i <= this.sizeX; i++) {
        for (var j = 0; j <= this.sizeY; j++) {
            document.getElementById(i + '_' + j).classList.remove('head');
            document.getElementById(i + '_' + j).classList.remove('body');
        }
    }
};

app.Floor.prototype.getRandomItem = function(list) {
    return list[Math.floor(Math.random() * list.length)];
};

app.Floor.prototype.containsCoordinates = function(coordinates, list) {
    for (var _i = 0; _i < list.length; _i++) {
        var _item = list[_i];
        if (coordinates.x === _item.x && coordinates.y === _item.y) {
            return true;
        }
    }
    return false;
};

app.Floor.prototype.renderLetter = function(i) {
    for (var _i in this.letters[i]) {
        document.getElementById(this.letters[i][_i].x + '_' + this.letters[i][_i].y).classList.add('bit');
    }
};

app.Floor.prototype.renderWord = function() {
    for (var _i in this.letters) {
        for (var _j in this.letters[_i]) {
            document.getElementById(this.letters[_i][_j].x + '_' + this.letters[_i][_j].y).classList.add('bit');
        }
    };
};
