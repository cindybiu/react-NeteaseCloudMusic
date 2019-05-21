/* global it expect */
import { utils } from './tools'

it('add 0.1 + 10 to equal 1', () => {
  expect(utils.multiply(0.1, 10)).toEqual(1);
})

it('add 0.1 + 0.2 to equal 0.3', () => {
  expect(utils.plus(0.1, 0.2)).toEqual(0.3);
  expect(utils.plus(0.2, 0.4)).toEqual(0.6)
})
