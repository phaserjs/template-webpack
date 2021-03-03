const { tokenize: { TYPE } } = require('css-tree');
const ATKEYWORD = TYPE.AtKeyword;

module.exports = {
    name: 'LessVariable',
    structure: {
        name: 'Identifier'
    },
    parse: function LessVariable() {
        const start = this.scanner.tokenStart;

        this.eat(ATKEYWORD);

        return {
            type: 'LessVariable',
            loc: this.getLocation(start, this.scanner.tokenEnd),
            name: this.scanner.substrToCursor(start + 1)
        };
    }
};
