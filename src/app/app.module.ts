import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { appRoutes } from './routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { DocumentCreateComponent } from './product/document-create/document-create.component';
import { FormDocumentFieldsComponent } from './product/document-create/form-document-fields/form-document-fields.component';
import { PreviewDocumentComponent } from './product/document-create/preview-document/preview-document.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { DocumentCreateService } from './product/document-create/document-create.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    DocumentCreateComponent,
    FormDocumentFieldsComponent,
    PreviewDocumentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DocumentCreateService],
  bootstrap: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    DocumentCreateComponent,
    FormDocumentFieldsComponent,
    PreviewDocumentComponent
  ]
})
export class AppModule { }
