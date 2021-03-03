const { List, tokenize: { TYPE } } = require('css-tree');
const LEFTCURLYBRACKET = TYPE.LeftCurlyBracket;
const RIGHTCURLYBRACKET = TYPE.RightCurlyBracket;
const NUMBERSIGN = 0x0023; // U+0023 NUMBER SIGN (#)

module.exports = {
    name: 'SassInterpolation',
    structure: {
        children: [[]]
    },
    parse: function SassInterpolation(recognizer, readSequence) {
        const start = this.scanner.tokenStart;
        let children = new List();

        if (!this.scanner.isDelim(NUMBERSIGN)) {
            this.error();
        }

        this.scanner.next();
        this.eat(LEFTCURLYBRACKET);
        children = readSequence.call(this, recognizer);
        this.eat(RIGHTCURLYBRACKET);

        return {
            type: 'SassInterpolation',
            loc: this.getLocation(start, this.scanner.tokenStart),
            children: children
        };
    }
};
