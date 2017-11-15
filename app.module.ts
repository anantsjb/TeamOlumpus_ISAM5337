import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { UserComponent } from './components/user.component';
import { HomeComponent } from './components/home.component';
import { UserService } from './Service/user.service';
import { CompanyService } from './Service/company.service';
import { CompanyComponent } from './components/company.component';
import { CompanyFilterPipe } from './filter/Company.pipe';
import { SearchComponent } from './Shared/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, FormsModule, HttpModule, routing, Ng2Bs3ModalModule],
    declarations: [AppComponent, UserComponent, HomeComponent, CompanyComponent, CompanyFilterPipe, SearchComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, UserService, CompanyService],
    bootstrap: [AppComponent]

})
export class AppModule { }
