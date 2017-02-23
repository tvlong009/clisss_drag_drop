import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DesignProjectComponent } from './pages/design-project/design-project.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DragulaModule } from 'ng2-dragula';
import { EditorComponent } from './components/editor/editor.component';
import { StyleboxComponent } from './components/stylebox/stylebox.component';
import { ContainerComponent } from './components/container/container.component';
import { SelectComponent } from './components/select/select.component';
import { MultipleSelectComponent } from './components/multiple-select/multiple-select.component';

let pages = [
  DesignProjectComponent
];


let components = [
  NavbarComponent,
  SidebarComponent,
  EditorComponent,
  StyleboxComponent,
  ContainerComponent,
  SelectComponent,
  MultipleSelectComponent
];

let EntryComponents = [
  ContainerComponent,
  SelectComponent,
  MultipleSelectComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ...pages,
    ...components
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DragulaModule
  ],
  providers: [],
  entryComponents:[
    ...EntryComponents
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
