import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './features/footer/footer.component';
import { HeaderComponent } from './features/header/header.component';
import { LoginComponent } from './features/login/login.component';
import { AddEditProdutoComponent } from './features/produto/add-edit-produto/add-edit-produto.component';
import { ProdutoComponent } from './features/produto/produto.component';
import { UserComponent } from './features/user/user.component';
import { VendaComponent } from './features/venda/venda.component';



@NgModule({
  declarations: [
    AppComponent,
    ProdutoComponent,
    UserComponent,
    VendaComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AddEditProdutoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
