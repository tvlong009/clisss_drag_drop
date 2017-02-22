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

let pages = [
DesignProjectComponent
];


let components = [
 NavbarComponent,
 SidebarComponent,
 EditorComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ...pages,
    ...components,
    StyleboxComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DragulaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
