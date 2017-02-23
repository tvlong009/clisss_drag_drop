import { Component, ViewContainerRef, ElementRef, ComponentFactoryResolver , ViewChild, OnInit } from '@angular/core';
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
  event: any;

  @ViewChild('editorBox', { read: ViewContainerRef})
  editorBox: ViewContainerRef;

  @ViewChild('styleBox', { read: ViewContainerRef})
  styleBox: ViewContainerRef;

  @ViewChild('getHTML') 
  html: ElementRef;

  public constructor(
    private dragulaService:DragulaService, 
    private componentFactoryResolver: ComponentFactoryResolver,
    
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
    let  viewContainerRef = null;
    switch(componentName){
      case 'container-component': 
        Component = this.componentFactoryResolver.resolveComponentFactory(ContainerComponent);
        viewContainerRef = this.editorBox;
        if (el.id == IdEditorBox){
           viewContainerRef.createComponent(Component);
           el.removeChild(e);
        }
        break;
    }
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

  private saveHTMlToJson(event){
    let htmlEL = this.html.nativeElement;
    let json = this.convertHTMLToJson(htmlEL, true);

    //Conver String Json Object
    let JsonObject = JSON.parse(json);
    let selector = this.html.nativeElement;

    //Show Preview
    this.convertJsonToHTML(JsonObject, selector);

  }
  public convertHTMLToJson(element, json) {
        var treeObject = {};
        //Recursively loop through DOM elements and assign properties to object
        function treeHTML(element, object) {
            object["tag"] = element.nodeName;
            var nodeList = element.childNodes;
            if (nodeList != null) {
                if (nodeList.length) {
                    object["html"] = [];
                    for (var i = 0; i < nodeList.length; i++) {
                        if (nodeList[i].nodeType == 3) {
                            object["html"] = nodeList[i].nodeValue
                        } else {
                            object["html"].push({});
                            treeHTML(nodeList[i], object["html"][object["html"].length -1]);
                        }
                    }
                }
            }
            if (element.attributes != null) {
                if (element.attributes.length) {
                    for (var i = 0; i < element.attributes.length; i++) {
                        object[element.attributes[i].nodeName] = element.attributes[i].nodeValue;
                    }
                }
            }
        }
        treeHTML(element, treeObject);
        return JSON.stringify(treeObject);
    }

    public convertJsonToHTML(JsonObject, selector){
      let options = [{}];
      selector.innerHTML = json2html.transform(options, JsonObject, {});  
    }
  
}
