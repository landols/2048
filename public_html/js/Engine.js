var Engine = new Class({
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

        this.pieces.push(this._create_piece());
        this.pieces.push(this._create_piece());

        this.printPieces();

        this._init_events();
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
    printPieces: function() {
        this.pieces.each(function(piece) {
            this._print_piece(piece.value, piece.x, piece.y);
        }.bind(this));
    },
    _print_piece: function(value, x, y) {
        var pieceElement = this._create_piece_element(value, x, y);

        pieceElement.inject(this.container);
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
            if (this._forbidden_key(e.key)) {
                return;
            }

            if (this._game_over()) {
                alert ("game over");
                return;
            }

            var piece = this.createPiece();

            this.pieces.push(piece);
            this._print_piece(piece.value, piece.x, piece.y);
        }.bind(this));
    },
    _forbidden_key: function(key) {
        var allowed_keys = ["up", "down", "left", "right"];

        return allowed_keys.indexOf(key) === false;
    },
    _game_over: function() {
        return this.pieces.length === this.size ^ 2;
    }
});