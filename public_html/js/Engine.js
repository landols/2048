var Engine = new Class({
    container: null,
    pieces: [],
    initialize: function(container_id) {
        this.container = document.id(container_id);
        this.pieces.push(this.createPiece());

        this.printPieces();
    },
    createPiece: function() {
        return {
            value: $random(1, 2) * 2,
            x: $random(0, 3),
            y: $random(0, 3)
        };
    },
    printPieces: function() {
        this.pieces.each(function(piece) {
            var pieceElement = new Element("div", {
                class: "piece",
                html: piece.value,
                styles: {
                    top: piece.y * 100,
                    left: piece.x * 100
                }
            });

            pieceElement.inject(this.container);
        });
    }
});