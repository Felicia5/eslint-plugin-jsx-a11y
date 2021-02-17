/**
 * @fileoverview help avoid overue of div elements.
 * @author Ethan Cohen modified heading-has-content.js rule by Felicia Kovacs
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { elementType } from 'jsx-ast-utils';
import { generateObjSchema, arraySchema } from '../util/schemas';
import hasAccessibleChild from '../util/hasAccessibleChildMyrule';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';

const errorMessage = 'Apply text must be in button elements and not div elements.';

const div = ['div'];

const schema = generateObjSchema({ components: arraySchema });

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/heading-has-content.md',
    },
    schema: [schema],
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      const options = context.options[0] || {};
      const componentOptions = options.components || [];
      const typeCheck = div.concat(componentOptions);
      const nodeType = elementType(node);

      // Only check 'h*' elements and custom types.
      if (typeCheck.indexOf(nodeType) === -1) {
        return;
      }
      if (hasAccessibleChild(node.parent)) {
        return;
      }
      if (isHiddenFromScreenReader(nodeType, node.attributes)) {
        return;
      }

      context.report({
        node,
        message: errorMessage,
      });
    },
  }),
};
