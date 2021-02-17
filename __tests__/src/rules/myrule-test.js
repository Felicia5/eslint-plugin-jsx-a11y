/* eslint-env jest */
/**
 * @fileoverview Enforce use of button elements to display apply text
 * @author Felicia Kovacs
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/myrule';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: '',
  type: 'JSXOpeningElement',
};

ruleTester.run('myrule', rule, {
  valid: [
    { code: '<div />;' },
  ].map(parserOptionsMapper),
  invalid: [].map(parserOptionsMapper),
});
