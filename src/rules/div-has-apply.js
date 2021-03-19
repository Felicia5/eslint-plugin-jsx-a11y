/**
 * @fileoverview check if div has apply text
 * @author Felicia
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { elementType } from 'jsx-ast-utils';
// import type { JSXOpeningElement } from 'ast-types-flow';
import { generateObjSchema, arraySchema } from '../util/schemas';
import hasAccessibleChild from '../util/hasApplyText';

const errorMessage = 'Div should not have text apply. Use button native HTML element instead.';

const headings = [
  'div',
];
const actionVerbs = 'apply' || 'submit';
const schema = generateObjSchema({ components: arraySchema });

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      const literalChildValue = node.parent.children.find((child) => child.type === 'Literal' || child.type === 'JSXText' || child.type === 'Unknown');
      /*   if (literalChildValue && literalChildValue.value === 'apply') {
           errorMessage = 'Div should not have text apply. Use button native HTML element instead.';
         } else {
           errorMessage = 'it is valid';
         } */
      const options = context.options[0] || {};
      const componentOptions = options.components || [];
      const typeCheck = headings.concat(componentOptions);
      const nodeType = elementType(node);

      // Only check 'div*' elements and custom types.
      if (typeCheck.indexOf(nodeType) === -1) {
        return;
      }
      if (hasAccessibleChild(node.parent) === false) {
        return;
      }
      if (literalChildValue && literalChildValue.value.toLowerCase() !== actionVerbs) {
        return;
      }
      context.report({
        node,
        message: errorMessage,
      });
    },
  }),
};
