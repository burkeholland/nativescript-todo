import { EventData, Observable } from 'data/observable';
import { ObservableArray } from 'data/observable-array';
import Todo from '../models/todo';
import DataSource from '../shared/data-source';

class ViewModel extends Observable {
    
    message: string;
    todos: DataSource<Todo>;
    
    hasThings: boolean = true;
    itemsLeft: number = 0; 
    
    barAll: boolean = true;
    barActive: boolean = false;
    barDone: boolean = false;
    
    selectAll: boolean = false;
    
    constructor(message) {
        super();
        
        let todos = [
            new Todo('Install NativeScript'),
            new Todo('Copy Todo MVC Project'),
            new Todo('Come Up With Fake Todo Items'),
            new Todo('Debug In VS Code')
        ];
        
        this.todos = new DataSource<Todo>(todos, this);
        
        this.itemsLeft = this.todos.view.length;
        
        this.todos.on(ObservableArray.changeEvent, (args: any) => {
            if (this.todos.view.length > 0) {
                this.set('hasThings', true);
            }
            else {
                this.set('hasThings', false);
            }
        });
        
        this.set('todos', this.todos);
    }
    
    add() {
        this.todos.push(new Todo(this.message));
    
        this.set('message', '');
        this.set('itemsLeft', this.itemsLeft + 1);
        this.set('selectAll', false);
    }
    
    remove(todo: Todo) {
        this.todos.remove(todo);
        this.set('itemsLeft', this.itemsLeft - 1); 
    }
    
    check(todo: Todo) {
        if (todo.completed) {
            todo.set('completed', false);
            this.set('itemsLeft', this.itemsLeft--);
        }    
        else {
            todo.set('completed', true);
            this.set('itemsLeft', this.itemsLeft++);
        }
        
        this.todos.set('completed', todo);
    }
    
    private clearThenSetSelected(property: string) {
        this.set('barAll', false);
        this.set('barActive', false);
        this.set('barDone', false);
        
        this.set(`bar${property}`, true);
    }
    
    updateBar(arg) {
       this.clearThenSetSelected(arg);
    }
    
    toggleSelectAll() {
        
        this.set('selectAll', !this.selectAll);
        
        this.todos.data.forEach((todo) => {
            this.selectAll ? todo.set('completed', true) : todo.set('completed', false);
        });
        
        this.set('itemsLeft', !this.selectAll ? this.todos.data.length: 0);
    }
    
    clearCompleted() {
        let activeTodos = this.todos.data.filter((thing, index) => {
            return !thing.completed;
        });

        this.todos.reset(activeTodos);
    }
    
    filter() {
        
    }
}

export default ViewModel;