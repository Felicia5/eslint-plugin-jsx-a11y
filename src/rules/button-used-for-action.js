"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _jsxAstUtils = require("jsx-ast-utils");

var _schemas = require("../util/schemas");

var _hasDivInteractiveChild = _interopRequireDefault(require("../util/hasDivInteractiveChild"));

var _isHiddenFromScreenReader = _interopRequireDefault(require("../util/isHiddenFromScreenReader"));

/**
 * @fileoverview Enforce action words e.g.: "Apply" to be in button (<button> </button>) elements.
 * used eslint-plugin-jsx-a11y > lib > rules > heading-has-content.js created by author Ethan Cohen for this rule as a template for this rule
 * @author Felicia Kovacs
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
var errorMessage = 'Action words must be surrounded by button elements to be accessible by a screen reader and a voice controller.';
var div = ['div'];
var schema = (0, _schemas.generateObjSchema)({
  components: _schemas.arraySchema
});
module.exports = {
  meta: {
    docs: {
     // url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/heading-has-content.md'
    },
    schema: [schema]
  },
  create: function create(context) {
    return {
      JSXOpeningElement: function JSXOpeningElement(node) {
        var options = context.options[0] || {};
        var componentOptions = options.components || [];
        var typeCheck = div.concat(componentOptions);
        var nodeType = (0, _jsxAstUtils.elementType)(node); // Only check 'div*' elements and custom types.

        if (typeCheck.indexOf(nodeType) === -1) {
          return;
        }

        if ((0, _hasDivInteractiveChild["default"])(node.parent)) {
          return;
        }

        if ((0, _isHiddenFromScreenReader["default"])(nodeType, node.attributes)) {
          return;
        }

        context.report({
          node,
          message: errorMessage
        });
      }
    };
  }
};
