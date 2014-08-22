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

        this._add_piece();
        this._add_piece();

        this._init_events();
    },
    _add_piece: function() {
        var piece = this._create_piece();
        var pieceElement = this._create_piece_element(piece.value, piece.x, piece.y);

        pieceElement.inject(this.container);
        piece.element = pieceElement;

        this.pieces.push(piece);
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
        for (i = 0; i < this.pieces.length; i++) {
            if ((this.pieces[i].x == x) && (this.pieces[i].y == y)) {
                return false;
            }
        }

        return true;
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

            this.pieces.each(function(piece) {
                this._move_piece(piece, e.key);
            }.bind(this));

            this._add_piece();
        }.bind(this));
    },
    _forbidden_key: function(key) {
        var allowed_keys = ["up", "down", "left", "right"];

        return allowed_keys.indexOf(key) === -1;
    },
    _game_over: function() {
        return this.pieces.length === Math.pow(this.size, 2);
    },
    _move_piece: function(piece, direction) {
        if (direction == "up") {
            this._move_up(piece);
        }
        else if (direction == "down") {
            this._move_down(piece);
        }
        else if (direction == "left") {
            this._move_left(piece);
        }
        else if (direction == "right") {
            this._move_right(piece);
        }
    },
    _move_up: function(piece) {
        var y_up = this._find_y_up(piece.x, piece.y);
        console.log(piece);
        console.log(y_up);

        piece.y = y_up;
        piece.element.setStyle("top", y_up * 100);
    },
    _move_down: function(piece) {
        var y_down = this._find_y_down(piece.x, piece.y);
        console.log(piece);
        console.log(y_down);

        piece.y = y_down;
        piece.element.setStyle("top", y_down * 100);
    },
    _move_left: function(piece) {
        var x_left = this._find_x_left(piece.x, piece.y);
        console.log(piece);
        console.log(x_left);

        piece.x = x_left;
        piece.element.setStyle("left", x_left * 100);
    },
    _move_right: function(piece) {
        var x_right = this._find_x_right(piece.x, piece.y);
        console.log(piece);
        console.log(x_right);

        piece.x = x_right;
        piece.element.setStyle("left", x_right * 100);
    },
    _find_y_up: function(x, y) {
        var y_up = 0;

        this.pieces.each(function(piece) {
            if (piece.x != x) {
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

        this.pieces.each(function(piece) {
            if (piece.x != x) {
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

        this.pieces.each(function(piece) {
            if (piece.y != y) {
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

        this.pieces.each(function(piece) {
            if (piece.y != y) {
                return;
            }

            if ((piece.x > x) && (piece.x <= x_right)) {
                x_right = piece.x - 1;
            }
        });

        return x_right;
    }
});