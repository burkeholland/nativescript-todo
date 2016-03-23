import { EventData, Observable } from 'data/observable';
import { ObservableArray } from 'data/observable-array'; 

class Todo extends Observable {
    id: number;
    text: string;
    completed: boolean = false;
    parent: Observable;
    
    constructor(text: string) {
        super();
        
        this.id = new Date().getTime();
        this.text = text;
    }
}

export default Todo;