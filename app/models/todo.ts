import { EventData, Observable } from 'data/observable';

class Todo extends Observable {
    text: string;
    completed: boolean = false;
    
    constructor(text: string, completed: boolean = false) {
        super();

        this.text = text;
        this.completed = completed
    }
}

export default Todo;


