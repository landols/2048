var Engine = new Class({
    gameOver: false,
    container: null,
    size: 4,
    pieces: [],
    colourClasses: {
        2: "one",
        4: "two",
        8: "three",
        16: "four",
        32: "five",
        64: "six",
        128: "seven",
        256: "eight",
        512: "nine",
        1024: "ten",
        2048: "final"
    },
    initialize: function(container_id) {
        this.container = document.id(container_id);

        this._init_pieces();

        this._add_piece();
        this._add_piece();

        this._init_events();
    },
    _init_pieces: function() {
        for (i = 0; i < this.size; i++) {
            var row = [];

            for (j = 0; j < this.size; j++) {
                row.push(null);
            }

            this.pieces.push(row);
        }
    },
    _add_piece: function() {
        var piece = this._create_piece();
        var pieceElement = this._create_piece_element(piece.value, piece.x, piece.y);

        pieceElement.inject(this.container);
        piece.element = pieceElement;

        this.pieces[piece.x][piece.y] = piece;
    },
    _create_piece: function() {
        var check, x, y;

        do {
            x = $random(0, this.size - 1);
            y = $random(0, this.size - 1);

            check = this._check_piece_position(x, y);
        }
        while (!check);

        return {
            value: $random(1, 2) * 2,
            x: x,
            y: y
        };
    },
    _check_piece_position: function(x, y) {
        return this.pieces[x][y] === null;
    },
    _create_piece_element: function(value, x, y) {
        return new Element("div", {
            class: "piece " + this.colourClasses[value],
            html: value,
            styles: {
                top: y * 100,
                left: x * 100
            }
        });
    },
    _init_events: function() {
        document.addEvent("keyup", function(e) {
            if (this.gameOver) {
                return;
            }

            if (this._forbidden_key(e.key)) {
                return;
            }

            if (this._game_over()) {
                alert ("Game Over");
                this.gameOver = true;

                return;
            }

            this._move_pieces(e.key);

            this._add_piece();
        }.bind(this));
    },
    _forbidden_key: function(key) {
        var allowed_keys = ["up", "down", "left", "right"];

        return allowed_keys.indexOf(key) === -1;
    },
    _game_over: function() {
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                if (this.pieces[x][y] === null) {
                    return false;
                }
            }
        }

        return true;
    },
    _move_pieces: function(direction) {
        var x, y;

        if (direction == "up") {
            for (y = 0; y < this.size; y++) {
                for (x = 0; x < this.size; x++) {
                    this._move_up(this.pieces[x][y]);
                }
            }
        }
        else if (direction == "down") {
            for (y = this.size -1 ; y >= 0; y--) {
                for (x = 0; x < this.size; x++) {
                    this._move_down(this.pieces[x][y]);
                }
            }
        }
        else if (direction == "left") {
            for (x = 0; x < this.size; x++) {
                for (y = 0; y < this.size; y++) {
                    this._move_left(this.pieces[x][y]);
                }
            }
        }
        else if (direction == "right") {
            for (x = 0; x < this.size; x++) {
                for (y = this.size -1 ; y >= 0; y--) {
                    this._move_right(this.pieces[x][y]);
                }
            }
        }
    },
    _move_up: function(piece) {
        if (piece === null) {
            return;
        }

        this.pieces[piece.x][piece.y] = null;

        var y_up = this._find_y_up(piece.x, piece.y);

        piece.y = y_up;
        piece.element.setStyle("top", y_up * 100);

        this.pieces[piece.x][y_up] = piece;
    },
    _move_down: function(piece) {
        if (piece === null) {
            return;
        }

        this.pieces[piece.x][piece.y] = null;

        var y_down = this._find_y_down(piece.x, piece.y);

        piece.y = y_down;
        piece.element.setStyle("top", y_down * 100);

        this.pieces[piece.x][y_down] = piece;
    },
    _move_left: function(piece) {
        if (piece === null) {
            return;
        }

        this.pieces[piece.x][piece.y] = null;

        var x_left = this._find_x_left(piece.x, piece.y);

        piece.x = x_left;
        piece.element.setStyle("left", x_left * 100);

        this.pieces[x_left][piece.y] = piece;
    },
    _move_right: function(piece) {
        if (piece === null) {
            return;
        }

        this.pieces[piece.x][piece.y] = null;

        var x_right = this._find_x_right(piece.x, piece.y);

        piece.x = x_right;
        piece.element.setStyle("left", x_right * 100);

        this.pieces[x_right][piece.y] = piece;
    },
    _find_y_up: function(x, y) {
        var y_up = 0;

        this.pieces[x].each(function(piece) {
            if (piece === null) {
                return;
            }

            if ((piece.y < y) && (piece.y >= y_up)) {
                y_up = piece.y + 1;
            }
        });

        return y_up;
    },
    _find_y_down: function(x, y) {
        var y_down = this.size - 1;

        this.pieces[x].each(function(piece) {
            if (piece === null) {
                return;
            }

            if ((piece.y > y) && (piece.y <= y_down)) {
                y_down = piece.y - 1;
            }
        });

        return y_down;
    },
    _find_x_left: function(x, y) {
        var x_left = 0;

        this.pieces[y].each(function(piece) {
            if (piece === null) {
                return;
            }

            if ((piece.x < x) && (piece.x >= x_left)) {
                x_left = piece.x + 1;
            }
        });

        return x_left;
    },
    _find_x_right: function(x, y) {
        var x_right = this.size - 1;

        this.pieces[y].each(function(piece) {
            if (piece === null) {
                return;
            }

            if ((piece.x > x) && (piece.x <= x_right)) {
                x_right = piece.x - 1;
            }
        });

        return x_right;
    }
});