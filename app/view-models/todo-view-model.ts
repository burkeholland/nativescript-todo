import { EventData, Observable } from 'data/observable';
import { ObservableArray } from 'data/observable-array';
import TodosService from '../services/todos-service';
import Todo from '../models/todo';

class ViewModel extends Observable {
    
    // controls the value of the new item box
    newTodo: string;
    
    // to handle filtering, two collections of items are used
    // _allTodos holds the true collection
    // todos is a subset of the true collection that the view is bound to
    private _allTodos: Array<Todo>;
    todos: ObservableArray<Todo>;
    
    // Stores a reference to the current filter applied to the _allTodos collection
    private _filter: Object;
    
    // control visual state of items in the view, such as the bottom bar, the select all arrow
    // and the "items left" label
    hasItems: boolean = true;
    itemsLeft: number = 0; 
    selectAll: boolean = false;
    
    constructor() {
        super();

        // retrieve a collection of all todos from application settings (AKA local storage)
        // if there is no collection returned, an empty array is used
        this._allTodos = TodosService.get('todos');

        // initialize an observable array that the view will be bound to        
        this.todos = new ObservableArray<Todo>(this._allTodos);
        
        // calculate the number of items remaining to be completed
        this._itemsLeft();
        
        // determine if the collection contains any items
        this._hasItems();

        // determine the state of the "select all" arrow        
        this._selectAll();
    }
    
    private _itemsLeft() {
        var counter = 0;
        this._allTodos.forEach((todo: Todo) => {
            if (!todo.completed) {
                counter++;
            }
        })
        this.set('itemsLeft', counter);
    }
    
    private _hasItems() { 
        this.set('hasItems', this._allTodos.length > 0);
    }
    
    private _selectAll() {
        // if there are still todos, and all of them are marked completed, set selectAll to true.
        // this stops the select all arrow from being in the wrong state when all items are completed, but the list
        // has been completely cleared
        this.set('selectAll', this.hasItems && this.itemsLeft == 0);
    }
    
    add() {
        if (this.newTodo.trim().length > 0) {
            this._allTodos.push(new Todo(this.newTodo.trim()));
        
            this.set('newTodo', '');
            
            this._refresh();
        }
    }
    
    remove(todo: Todo) {
        var index = this._allTodos.indexOf(todo);
        this._allTodos.splice(index, 1);
        
        this._refresh(); 
    }
    
    check(todo: Todo) {
        todo.set('completed', !todo.completed);
        
        this._refresh();
    }
    
    clearCompleted() {
        var activeTodos = this._allTodos.filter((thing, index) => {
            return !thing.completed;
        });

        this._allTodos = activeTodos;
        
        this._refresh();
    }
    
    toggleSelectAll() {
        this._allTodos.forEach((todo) => {
           todo.set('completed', !this.selectAll); 
        });
        
        this._refresh();
    }
    
    filter(filter?: Object) {
        
        // store the filter that was passed in. it may be null.
        this._filter = filter;
        
        // if a valid filter was passed in and not null or undefined
        if (filter) {

            // filter out the items in the array that match the filter condition        
            let filteredItems = <Array<any>>this._allTodos.filter((item) => {
                for (var key in filter) {
                    if (item[key] == filter[key]) {
                        return true;
                    }
                } 
            });

            // splicing the todos collection empties it so that it can be repopulated with only
            // the filtered items
            this.todos.splice(0, this.todos.length);
            this.todos.push(filteredItems);
        }
        else {
           // clear the todos array and reset it to be the same as the _allTodos true collection
           this.todos.splice(0, this.todos.length);
           this.todos.push(this._allTodos);
        }
    }
    
    private _refresh() {

        // this method is called virtually every time something on the model changes. This is done
        // so that the true collection (_allTodos) and the filtered collection (todos) stay in sync.

        this.filter(this._filter);
        
        TodosService.set('todos', this._allTodos);
        
        // reset some of the visual state that requires computation
        
        this._hasItems();
        
        this._itemsLeft();
        
        this._selectAll();
    }
}

export default ViewModel;