"use strict";

import h from 'snabbdom/h';
import Type from 'union-type';
import { bind, sequence, isBoolean }  from './helpers';

const KEY_ENTER = 13;

// model : {id: Number, title: String, done: Boolean, editing: Boolean, editingValue: String }
const Action = Type({
  SetTitle      : [String],
  Toggle        : [isBoolean],
  StartEdit     : [],
  CommitEdit    : [String],
  CancelEdit    : []
});

const targetChecked = e => e.target.checked;
const targetValue = e => e.target.value;

function onInput(handler, e) {
  if(e.keyCode === KEY_ENTER)
    handler(Action.CommitEdit(e.target.value))
}

function view(task, handler, remove) {
  return h('li', {
    class: {completed: !!task.done && !task.editing, editing: task.editing},
    key: task.id,
  }, [
    h('div.view', [
      h('input.toggle', {
        props: {checked: !!task.done, type: 'checkbox'},
        on: {
          click: sequence(targetChecked, Action.Toggle, handler)
        },
      }),
      
      h('label', {
        on: { 
          dblclick: bind(handler, Action.StartEdit()) 
        }
      }, task.title ),
      
      h('button.destroy', {
        on: {
          click: bind(remove, task.id)
        }
      })
      
    ]),
    
    h('input.edit', {
      props: { value: task.title },
      on: {
        blur: bind(handler, Action.CancelEdit()),
        keydown: bind(onInput, handler),
      }
    })
  ]);
}

function init(id, title) {
  return { id, title, done: false, editing: false, editingValue: '' };
}

function update(task, action) {
  return Action.case({
    Toggle      : done  => ({...task, done}),
    StartEdit   : () => ({...task, editing: true, editingValue: task.title}),
    CommitEdit  : title => ({...task, title, editing: false,  editingValue: ''}),
    CancelEdit  : title => ({...task, editing: false,  editingValue: ''})
  }, action);
}

export default { view, init, update, Action }