import Component from 'ember-component';
import Extended from '../models/extended';
import Ember from 'ember';
import DS from 'ember-data';
import hbs from 'htmlbars-inline-precompile';
import { instanceOf } from 'prop-types';
const { PromiseArray } = DS;

export default Component.extend({

  propTypes: {
    emberObject: instanceOf(Extended),
    emberArray: instanceOf(Ember.A),
    promiseArray: instanceOf(PromiseArray)
  },

  layout: hbs`
    <p>{{emberObject}}</p>
    <p>{{emberArray}}</p>
    <p>{{promiseArray}}</p>
  `
});
