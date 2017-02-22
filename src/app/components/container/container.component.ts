import { Component, forwardRef ,ViewContainerRef, ComponentFactoryResolver , ViewChild, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

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
     if (componentName == 'childcontainer-component'){
        let Component = this.componentFactoryResolver.resolveComponentFactory(ContainerComponent);
        let viewContainerRef = this.childcontainer;
        if ("container_" + viewContainerRef.element.nativeElement.id == el.id){
          this.childcontainer.createComponent(Component);
        }
     }
  }

}
