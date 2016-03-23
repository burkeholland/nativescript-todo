import { Page } from 'ui/page';
import { View } from 'ui/core/view';
import { EventData } from 'data/observable';
import { ObservableArray } from 'data/observable-array';
import { SegmentedBar } from 'ui/segmented-bar';

import ViewModel from './view-models/todo-view-model';
import Todo from './models/todo';

let viewModel = new ViewModel('');

let pageLoaded = (args: EventData) => {
    let page = <Page>args.object;
    page.bindingContext = viewModel;
}

let add = (args: EventData) => {
    viewModel.todos.push(new Todo(this.message));
    
    viewModel.set('message', '');
    viewModel.set('itemsLeft', this.itemsLeft + 1);
    viewModel.set('selectAll', false);
}

let remove = (args: any) => {
   
    var v = <View>args.object.parent.parent;
    var todo = <Todo>args.object.bindingContext;

    v.animate({
        translate: { x: -10, y: 0 },
        curve: "easeIn",
        duration: 100
    })
    .then(() => {
        return v.animate({
            translate: { x: 1000, y: 0 },
            curve: "easeIn",
            duration: 500
        })
    })
    .then(() => {
       viewModel.remove(todo);  
    });
}

let check = (args: any) => {
    var todo = <Todo>args.object.bindingContext;
    viewModel.check(todo);
}

let filter = (args: any) => {
    let segementedbar = <SegmentedBar>args.object;
    let segmentedBarItem = segementedbar.items[args.newIndex];
    
    switch (segmentedBarItem.rel) {
        case 'active': {
            viewModel.todos.filter({ completed: false });
            break;
        }
        case 'done': {
            viewModel.todos.filter({ completed: true });
            break;
        }
        default: {
            viewModel.todos.filter();
            break;
        }
    } 
}

export { pageLoaded, remove, filter, check }