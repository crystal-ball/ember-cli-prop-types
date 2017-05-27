import Ember from 'ember';
import Extended from '../models/extended';
import DS from 'ember-data';

const { PromiseArray } = DS;
const { Route } = Ember;

export default Route.extend({
  model: function() {
    let promiseArray = PromiseArray.create({
      promise: new Ember.RSVP.Promise(function(resolve) {
        resolve([1, 2, 4, 4]);
      })
    });
    return {
      object: Extended.create(),
      array: Ember.A([1, 2, 3]),
      promiseArray: promiseArray
     };
  }
});
