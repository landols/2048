var Engine = new Class({
    container: null,
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
        this.pieces.push(this.createPiece());
        this.pieces.push(this.createPiece());

        this.printPieces();
    },
    createPiece: function() {
        var check, x, y;

        do {
            x = $random(0, 3);
            y = $random(0, 3);

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
            var pieceElement = new Element("div", {
                class: "piece " + this.colourClasses[piece.value],
                html: piece.value,
                styles: {
                    top: piece.y * 100,
                    left: piece.x * 100
                }
            });

            pieceElement.inject(this.container);
        }.bind(this));
    }
});