import { Page } from 'ui/page';
import * as view from 'ui/core/view';
import { EventData } from 'data/observable';
import { ObservableArray } from 'data/observable-array';
import { SegmentedBar } from 'ui/segmented-bar';

import ViewModel from './view-models/todo-view-model';
import Todo from './models/todo';

var viewModel = new ViewModel();

let pageLoaded = (args: EventData) => {
    let page = <Page>args.object;
    page.bindingContext = viewModel;
}

let add = (args: EventData) => {
    viewModel.add();
}

let remove = (args: EventData) => {
    // Just getting the todo from the binding context. 
    // This weird syntax is just casting objects to please the TypeScript compiler. 
    var todo = <Todo>(<view.View>args.object).bindingContext;
    viewModel.remove(todo);
}

let check = (args: EventData) => {
    var todo = <Todo>(<view.View>args.object).bindingContext;
    viewModel.check(todo);
}

let toggleSelectAll = () => {
    viewModel.toggleSelectAll();
}

let filter = (args: any) => {
    
    // The SegmentedBar emits one event, not a separate event for each button.
    // We need to find the element that was clicked by it's index
    var segementedbar = <SegmentedBar>args.object;
    var segmentedBarItem = segementedbar.items[args.newIndex];

    viewModel.set('theFilter', segmentedBarItem.get('completed'));
}

export { pageLoaded, add, remove, filter, check, toggleSelectAll }