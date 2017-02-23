import { Component, forwardRef ,ViewContainerRef, ComponentFactoryResolver , ViewChild, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

import {SelectComponent} from '../select/select.component';
import {MultipleSelectComponent} from '../multiple-select/multiple-select.component';
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
    @ViewChild('childcontainer', { read: ViewContainerRef })
    childcontainer : ViewContainerRef;
    timestamp = new Date().getTime();
  public constructor
  (
    private dragulaService:DragulaService, 
    private componentFactoryResolver: ComponentFactoryResolver
  ) 
  {
    dragulaService.drop.subscribe((value) => {
    this.onDrop(value.slice(1));
    });
  }

  ngOnInit() {

  }
  
  private onDrop(args) {
    let [e, el] = args;
     let componentName = e.getAttribute('data-component-name');
     let Component = null;
     let viewContainerRef = null;
     switch(componentName){
      case 'childcontainer-component':
          Component = this.componentFactoryResolver.resolveComponentFactory(ContainerComponent);
          viewContainerRef = this.childcontainer;
          if ("container_" + viewContainerRef.element.nativeElement.id == el.id){
            this.childcontainer.createComponent(Component);
            el.removeChild(e);            
          }
          break;
      case 'select-component':
          Component = this.componentFactoryResolver.resolveComponentFactory(SelectComponent);
          viewContainerRef = this.childcontainer;
          if ("container_" + viewContainerRef.element.nativeElement.id == el.id ){
              this.childcontainer.createComponent(Component);
              el.removeChild(e);
          }
          break;
      case 'multselect-component':
          Component = this.componentFactoryResolver.resolveComponentFactory(MultipleSelectComponent);
          viewContainerRef = this.childcontainer;
          if ("container_" + viewContainerRef.element.nativeElement.id == el.id){
              this.childcontainer.createComponent(Component);
              el.removeChild(e);
          }
          break;
     }
  }

}
