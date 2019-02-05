import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';
import { start } from 'ember-qunit';

setResolver(resolver);
start();
