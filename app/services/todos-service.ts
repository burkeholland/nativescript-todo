import Todo from '../models/todo';
import { ObservableArray } from 'data/observable-array';

// A quick and wrapper for application-settings which already behaves very much like HTML5 LocalStorage
let TodosService = {
    get: (key: string) => {
        var value = localStorage.getItem(key);
        var result = new Array<Todo>();
        if (value) {
            let rawTodos = <Array<Todo>>JSON.parse(value);
            // we need to convert these raw todos into observables
            rawTodos.forEach((todo) => {
                result.push(new Todo(todo.text));
            });
            return result;
        }
        else return [];
    },   
    
    set: (key: string, value: ObservableArray<Todo>) => {
        localStorage.setItem(key, JSON.stringify(value));   
    }
}

export default TodosService;