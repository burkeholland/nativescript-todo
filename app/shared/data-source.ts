import observable = require("data/observable");
import { ObservableArray } from 'data/observable-array';
import { EventData, Observable } from 'data/observable';

class DataSource<T> extends Observable {
    
    data: Array<any>;
    view: ObservableArray<any>;
    private _filter: Object;
    private _parent: Observable;
    
    constructor(items: Array<any>, parent: Observable){
        
        super();
        
        this.data = items;
        this.view = new ObservableArray(items);
        
        this._parent = parent;
    }
    
    filter(filter?: Object) {
        
        this._filter = filter;
        
        if (filter) {
        
            let filteredItems = <ObservableArray<any>>this.data.filter((item) => {
                for (var key in filter) {
                    if (item[key] == filter[key]) {
                        return true;
                    }
                } 
            });
            
            this._refresh(filteredItems);
        }
        else {
            this._refresh(this.data);
        }
        
    }
    
    reset(items: Array<any>) {
        this.data = items;
        
        this.filter(this._filter);
    }
    
    private _refresh(items: Array<any>) {
        this.view.splice(0, this.view.length);
        this.view.push(items);
    }
    
    push(item: any) {
        this.data.push(item);
        this.filter(this._filter);
    }
    
    remove(item: any) {
        let index = this.data.indexOf(item);
        this.data.splice(index, 1);
        
        this.filter(this._filter);
    }
    
    set(property: string, item: any) {   
        this.filter(this._filter);
    }
}

export default DataSource;