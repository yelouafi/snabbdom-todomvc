"use strict";

import test from 'tape';
import { init, update, Action } from '../app/js/todos';
import task from '../app/js/task';

test('counter update function', (assert) => {
    
  var todos = init();
  assert.deepEqual(todos, { nextID: 1, tasks: [], editingTitle: '', filter: 'all' });
  
  todos = update(todos, Action.Add('task 1'));
  assert.deepEqual(todos, { 
    nextID: 2, 
    tasks: [{ id: 1, title: 'task 1', done: false, editing: false, editingValue: '' }], 
    editingTitle: '', 
    filter: 'all' 
  });
  
  todos = update(todos, Action.Add('task 2'));
  assert.deepEqual(todos, { 
    nextID: 3, 
    tasks: [
      { id: 1, title: 'task 1', done: false, editing: false, editingValue: '' },
      { id: 2, title: 'task 2', done: false, editing: false, editingValue: '' }
    ], 
    editingTitle: '', 
    filter: 'all' 
  });
  
  const todos2 = update(todos, Action.Modify(1, task.Action.Toggle(true)));
  assert.deepEqual(todos2, { 
    nextID: 3, 
    tasks: [
      { id: 1, title: 'task 1', done: true, editing: false, editingValue: '' },
      { id: 2, title: 'task 2', done: false, editing: false, editingValue: '' }
    ], 
    editingTitle: '', 
    filter: 'all' 
  });
  
  const todos3 = update(todos, Action.ToggleAll(true));
  assert.deepEqual(todos3, { 
    nextID: 3, 
    tasks: [
      { id: 1, title: 'task 1', done: true, editing: false, editingValue: '' },
      { id: 2, title: 'task 2', done: true, editing: false, editingValue: '' }
    ], 
    editingTitle: '', 
    filter: 'all' 
  });
  
  const todos4 = update(todos2, Action.Archive());
  assert.deepEqual(todos4, { 
    nextID: 3, 
    tasks: [
      { id: 2, title: 'task 2', done: false, editing: false, editingValue: '' }
    ], 
    editingTitle: '', 
    filter: 'all' 
  });

  assert.end();
});