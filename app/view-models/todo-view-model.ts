import { Observable } from 'data/observable';
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

        // Initialize an observable array that the view will be bound to.        
        this.todos = new ObservableArray<Todo>(TodosService.get('todos'));
    }
    
    private _update() {
        // Save the todo state to local storage.
        TodosService.set('todos', this.todos);
        
        // Trigger a UI update since changing an item in the toodo location
        // will not trigger this automatically. The name of the event and argument
        // passed are irrelevant.
        this.notifyPropertyChange('todos-change', null);
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
        
        this._update();
    }
    
    check(todo: Todo) {
        todo.set('completed', !todo.completed);   
                
        this._update();
    }
    
    clearCompleted() {
        var activeTodos = this.todos.filter((todo: Todo) => {
            if (todo.completed == false) {
                return true;
            }
        });
        
        this.set('todos', activeTodos);
          
        this._update();
    }
    
    toggleSelectAll() {
        this.todos.forEach((todo) => {
           todo.set('completed', !this.selectAll); 
        });
        
        this.set('selectAll', !this.selectAll);
        
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
    
    hasCompletedItems() {
        return this.todos.some((todo: Todo) => {
            if (todo.completed) {
                return true;
            }
        })
    }
    
    filterCompleted = {
        toView: (todos: ObservableArray<Todo>) => {            
            let filteredTodos = todos.filter((todo: Todo) => {
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