const { tokenize: { TYPE } } = require('css-tree');
const IDENT = TYPE.Ident;
const DOLLARSIGN = 0x0024; // U+0024 DOLLAR SIGN ($)

module.exports = {
    name: 'SassVariable',
    structure: {
        name: 'Identifier'
    },
    parse: function SassVariable() {
        const start = this.scanner.tokenStart;

        if (!this.scanner.isDelim(DOLLARSIGN)) {
            this.error();
        }

        this.scanner.next();

        return {
            type: 'SassVariable',
            loc: this.getLocation(start, this.scanner.tokenEnd),
            name: this.consume(IDENT)
        };
    }
};
