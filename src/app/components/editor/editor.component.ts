import { Component, ElementRef, ComponentFactoryResolver , ViewChild, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  timestamp = new Date().getTime();
  @ViewChild('editorBox') editorBox: ElementRef;
  @ViewChild('styleBox') styleBox: ElementRef;

  public constructor
    (
      private dragulaService:DragulaService, 
      private componentFactoryResolver: ComponentFactoryResolver
    )
    {
        dragulaService.drop.subscribe((value) => {
          this.onDrop(value.slice(1));
        });
        dragulaService.over.subscribe((value) => {
          this.onOver(value.slice(1));
        });

        const bag2: any = this.dragulaService.find('choose-component');
        if (bag2 !== undefined ){
          this.dragulaService.destroy('choose-component');
        }
  
        dragulaService.setOptions('choose-component', {
          copy: function (el, source) {
            return source === document.getElementById("componentsBox")
          },
          accepts: function (el, target) {
            return target !== document.getElementById("componentsBox")
          },
        });
        
    }

  ngOnInit() {
    console.log(this.editorBox);
    console.log(this.styleBox);
  }

  private onDrop(args) {
    let [e, el] = args;
  }
  
  private onDrop(args) {
    let [e, el] = args;
  }
}
