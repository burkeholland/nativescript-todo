import { EventData, Observable } from 'data/observable';
import { ObservableArray } from 'data/observable-array'; 

class Todo extends Observable {
    id: number;
    text: string;
    completed: boolean = false;
    
    constructor(text: string) {
        super();
        
        // we assign each item a unique id by datetime stamp
        this.id = new Date().getTime();
        this.text = text;
    }
}

export default Todo;