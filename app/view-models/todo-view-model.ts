import { EventData, Observable } from 'data/observable';
import { ObservableArray } from 'data/observable-array';
import TodosService from '../services/todos-service';
import Todo from '../models/todo';

class ViewModel extends Observable {
    
    newTodo: string;
    todos: ObservableArray<Todo>;    
    theFilter: boolean = null;
    selectAll: boolean = false;
    
    constructor() {
        super();

        // initialize an observable array that the view will be bound to        
        this.todos = new ObservableArray<Todo>(TodosService.get('todos'));
    }
    
    private _update() {
        TodosService.set('todos', this.todos);
    }
    
    add() {
        if (this.newTodo.trim().length > 0) {
            this.todos.push(new Todo(this.newTodo.trim()));
        
            this.set('newTodo', '');
        }
        
        this._update();
    }
    
    remove(todo: Todo) {
        var index = this.todos.indexOf(todo);
        this.todos.splice(index, 1);
        
        // It seems that simply modifying the collection won't trigger an update
        // so we have to do it manually. Hope there is a better way.
        this.notifyPropertyChange('remove', todo);
        
        this._update();
    }
    
    check(todo: Todo) {
        todo.set('completed', !todo.completed);   
        
        // It seems that simply modifying the collection won't trigger an update
        // so we have to do it manually. Hope there is a better way.
        this.notifyPropertyChange('check', todo);
        
        this._update();
    }
    
    itemsLeft() {
        let itemsLeft = this.todos.filter((todo: Todo) => {
            return todo.completed == false;
        })
        
        return itemsLeft.length;
    }
    
    hasItems() {
        return this.todos.length > 0;
    }
    
    clearCompleted() {
        this.todos.forEach((todo: Todo, index: number) => {
            if (todo.completed) {
                this.todos.splice(index, 1);
            }
        });
        
        this._update();
    }
    
    toggleSelectAll() {
        this.todos.forEach((todo) => {
           todo.set('completed', !this.selectAll); 
        });
        
        this.set('selectAll', !this.selectAll);
    }
    
    filterCompleted = {
        toView: (todos: ObservableArray<Todo>) => {            
            let filteredTodos = this.todos.filter((todo: Todo) => {
                if (this.theFilter == undefined) {
                    return true;
                }
                else {
                    return todo.completed == this.theFilter;
                }
            });

            return filteredTodos;
        }
    }
}

export default ViewModel;