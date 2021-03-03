const { tokenize } = require('css-tree');
const TYPE = tokenize.TYPE;
const NUMBERSIGN = 0x0023;     // U+0023 NUMBER SIGN (#)
const DOLLARSIGN = 0x0024;     // U+0024 DOLLAR SIGN ($)
const PERCENTAGESIGN = 0x0025; // U+0025 PERCENTAGE SIGN (%)
const COMMERCIALAT = 0x0040;   // U+0040 COMMERCIAL AT (@)
const TILDE = 0x007E;          // U+007E TILDE (~)

// custom 
const PreprocessorExtensionError = function() {
    this.type = 'PreprocessorExtensionError';
};

module.exports = function extendParser(syntaxConfig) {
    // new node types
    syntaxConfig.node.LessVariableReference = require('./less/LessVariableReference');
    syntaxConfig.node.LessVariable = require('./less/LessVariable');
    syntaxConfig.node.LessEscaping = require('./less/LessEscaping');
    syntaxConfig.node.SassVariable = require('./sass/SassVariable');
    syntaxConfig.node.SassInterpolation = require('./sass/SassInterpolation');

    // extend parser value parser
    const originalGetNode = syntaxConfig.scope.Value.getNode;
    syntaxConfig.scope.Value.getNode = function(context) {
        let node = null;

        switch (this.scanner.tokenType) {
            case TYPE.AtKeyword:    // less: @var
                node = this.LessVariable();
                break;
            
            case TYPE.Delim:
                switch (this.scanner.source.charCodeAt(this.scanner.tokenStart)) {
                    case COMMERCIALAT: // less: @@var
                        if (this.scanner.lookupType(1) === TYPE.Atrule) {
                            node = this.LessVariableReference();
                        }
                        break;
        
                    case TILDE:        // less: ~"asd" | ~'asd'
                        node = this.LessEscaping();
                        break;

                    case DOLLARSIGN:   // sass: $var
                        node = this.SassVariable();
                        break;
        
                    case NUMBERSIGN:   // sass: #{ }
                        if (this.scanner.lookupType(1) === TYPE.LeftCurlyBracket) {
                            node = this.SassInterpolation(this.scope.Value, this.readSequence);
                        }
                        break;
        
                    case PERCENTAGESIGN:  // sass: 5 % 4
                        node = this.Operator();
                        break;
                }
                break;
        }

        // currently we can't validate values that contain less/sass extensions
        if (node !== null) {
            throw new PreprocessorExtensionError();
        }

        return originalGetNode.call(this, context);
    };

    return syntaxConfig;
};
