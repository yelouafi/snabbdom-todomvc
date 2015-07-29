"use strict";

import test from 'tape';
import { update, Action } from '../app/js/task';

test('counter update function', (assert) => {
    
  var task;
  
  task = update(task, Action.Init(1, 'task 1'));
  assert.deepEqual(task, { id: 1, title: 'task 1', done: false, editing: false, editingValue: '' });

  task = update(task, Action.StartEdit());
  assert.deepEqual(task, { id: 1, title: 'task 1', done: false, editing: true, editingValue: 'task 1' });
  
  task = update(task, Action.CommitEdit('new task title'));
  assert.deepEqual(task, { id: 1, title: 'new task title', done: false, editing: false, editingValue: '' });
  
  task = update(task, Action.Toggle(true));
  assert.deepEqual(task, { id: 1, title: 'new task title', done: true, editing: false, editingValue: '' });
  
  task = update(task, Action.StartEdit());
  task = update(task, Action.CancelEdit());
  assert.deepEqual(task, { id: 1, title: 'new task title', done: true, editing: false, editingValue: '' });

  assert.end();
});