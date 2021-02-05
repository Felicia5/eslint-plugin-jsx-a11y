/**
 * @fileoverview Enforce use of button elements to display apply text
 * @author Felicia Kovacs
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import type { JSXOpeningElement } from 'ast-types-flow';
import { generateObjSchema } from '../util/schemas';

const errorMessage = '';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context: ESLintContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      context.report({
        node,
        message: errorMessage,
      });
    },
  }),
};
