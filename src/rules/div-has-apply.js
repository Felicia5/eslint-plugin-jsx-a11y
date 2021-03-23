/**
 * @fileoverview check if div has apply text
 * @author Felicia
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import {
  elementType,
  getProp,
  getPropValue,
} from 'jsx-ast-utils';
import { generateObjSchema, arraySchema } from '../util/schemas';

const actionVerbs = [
  'advise', 'amplify', 'apply', 'arrange', 'ask',
  'boost', 'build',
  'call', 'click', 'close', 'commit', 'consult', 'compile', 'collect', 'contribute', 'create', 'cut',
  'decrease', 'delete', 'divide', 'drink',
  'eat', 'earn', 'enable', 'enter', 'execute', 'exit', 'expand', 'explain',
  'finish', 'forecast', 'fix',
  'generate',
  'handle', 'help', 'hire', 'hit',
  'improve', 'increase',
  'join', 'jump',
  'leave', 'let\'/s', 'list', 'listen',
  'magnify', 'make', 'manage', 'minimize', 'move',
  'ok', 'open', 'organise', 'oversee',
  'play', 'push',
  'read', 'reduce', 'run',
  'save', 'send', 'shout', 'sing', 'submit', 'support',
  'talk', 'trim',
  'visit', 'volunteer', 'vote',
  'watch', 'win', 'write',
];
const schema = generateObjSchema({ components: arraySchema });

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      const TextChildValue = node.parent.children.find((child) => child.type === 'Literal' || child.type === 'JSXText' || child.type === 'Unknown');
      // TextChildValue.value is the text within the tag elements
      // const VariableChildValue = node.parent.children.find((child) => child.type === 'JSXExpressionContainer' || child.type === 'Unknown');
      const options = context.options[0] || {}; // [object Object]
      const componentOptions = options.components || []; // Apply - comming from .eslintrc.js file
      const typeCheck = ['div'].concat(componentOptions); // div, Apply
      const nodeType = elementType(node); // Apply

      // Only check 'div*' elements and custom types.
      if (typeCheck.indexOf(nodeType) === -1) { // answers the question: is the current node, which is Apply is defined in the componentOptions?
        // for example, is the Apply custom component present in div,Apply
        return;
      }

      // if (actionVerbs.includes(VariableChildValue && VariableChildValue.value.toLowerCase()) === false) {
      //   return;
      // }

      // if (actionVerbs.includes(TextChildValue && TextChildValue.value.toLowerCase()) === false) {
      //   return;
      // }
      if (actionVerbs.includes(TextChildValue.value.toLowerCase()) === false) {
        return;
      }


      const tabindexProp = getProp(node.attributes, 'tabIndex');
      const roleProp = getProp(node.attributes, 'role');
      const tabindexValue = getPropValue(tabindexProp);
      const roleValue = getPropValue(roleProp);
      // Missing tabindex and role prop error.
      if (((tabindexProp === undefined) && (roleProp === undefined)) || ((tabindexValue !== '0') && (roleValue !== 'button'))
      || ((tabindexProp === undefined) && (roleValue !== 'button')) || ((tabindexValue !== '0') && (roleProp === undefined))) {
        context.report({
          node,
          message: `${TextChildValue} meh ${TextChildValue.value}  meh ${TextChildValue.type}  Missing and/or incorrect attributes. Action verbs should be contained preferably within a native HTML button element(see first rule of ARIA) or within a div element that has tabIndex="0" attribute and role="button" aria role. Refer to https://w3c.github.io/aria-practices/examples/button/button.html and https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#accessibility_concerns `,
        });
        return;
      }

      if ((tabindexValue !== '0') || (tabindexProp === undefined)) {
        context.report({
          node,
          message: 'Missing or incorrect tabIndex attribute value. Action verbs should be contained preferably within a native HTML button element(see first rule of ARIA) or within a div element that has tabIndex="0" attribute and role="button" aria role. Refer to https://w3c.github.io/aria-practices/examples/button/button.html and https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#accessibility_concerns',
        });
        return;
      }

      if ((roleValue !== 'button') || (roleProp === undefined)) {
        context.report({
          node,
          message: 'Missing or incorrect role value. Action verbs should be contained preferably within a native HTML button element(see first rule of ARIA) or within a div element that has tabIndex="0" attribute and role="button" aria role. Refer to https://w3c.github.io/aria-practices/examples/button/button.html and https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#accessibility_concerns',
        });
      }
    },
  }),
};
