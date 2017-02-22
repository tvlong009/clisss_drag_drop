import { Component, ViewContainerRef, ComponentFactoryResolver , ViewChild, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

import {ContainerComponent} from '../container/container.component';
import {SelectComponent} from '../select/select.component';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  timestamp = new Date().getTime();
  @ViewChild('editorBox', { read: ViewContainerRef})
  editorBox: ViewContainerRef;

  @ViewChild('styleBox', { read: ViewContainerRef})
  styleBox: ViewContainerRef;

  public constructor(
    private dragulaService:DragulaService, 
    private componentFactoryResolver: ComponentFactoryResolver
  )
  {
    // Get el and e from draula service value 
    dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
     dragulaService.drop.subscribe((value) => {
      this.onOver(value.slice(1));
    });

    // Destroy bag if existed
    const bag: any = this.dragulaService.find('choose-component');
    if (bag !== undefined ){
      this.dragulaService.destroy('choose-component');
    }
    // Set bag 
    dragulaService.setOptions('choose-component', {
      copy: function (el, source) {
        return source === document.getElementById("componentsBox");
      },
      accepts: function (el, target) {
        return target !== document.getElementById("componentsBox");
      }
    });
  }
 
  ngOnInit() {
    console.log(this.editorBox);
    console.log(this.styleBox);
  }

  private onDrop(args) {
    let [e, el] = args;
    let componentName = e.getAttribute('data-component-name');
    let IdEditorBox = 'bodyHTML';

    // Hide title 
    let Component = null;
    let  EL = null;
    switch(componentName){
      case 'container-component': 
        Component = this.componentFactoryResolver.resolveComponentFactory(ContainerComponent);
        EL = this.editorBox;
        if (el.id == IdEditorBox){
           EL.createComponent(Component);
        }
        break;
      case 'select-component':
        Component = this.componentFactoryResolver.resolveComponentFactory(SelectComponent);
        EL = this.editorBox;
        EL.createComponent(Component);
      break;
    }
    el.removeChild(e);
  }

  private onOver(args) {
    let [e, el, container] = args;
     let componentName = e.getAttribute('data-component-name');
     let check = el.getAttribute('data-is-child-container');

    // do something
    if(check == 'yes' && componentName == 'container-component'){
      e.setAttribute('data-component-name', 'childcontainer-component');
    }else if(check != 'yes' && componentName == 'childcontainer-component'){
      e.setAttribute('data-component-name', 'container-component');
    }
  }
}
