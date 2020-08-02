import { BrowserModule } from '@angular/platform-browser';

/* Routing */
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgMarqueeModule } from 'ng-marquee';
import { NgxSpinnerModule } from "ngx-spinner";
import { ApiService, AuthService, UserService } from './services/index';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';




/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Flex Layout */
import { FlexLayoutModule } from "@angular/flex-layout";

/* Components */
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterhComponent } from './components/registerh/registerh.component';
import { RegisterdComponent } from './components/registerd/registerd.component';
import { ClinicianComponent } from './components/clinician/clinician.component';
import { ResearcherComponent } from './components/researcher/researcher.component';

import { EmployeeService } from './components/shared/employee.service';
import { Employee1Service } from './components/shared/employee1.service';
import { Employee2Service } from './components/shared/employee2.service';
import { Employee3Service } from './components/shared/employee3.service';
import { CarouselComponent } from './carousel/carousel.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ResourcesComponent  } from './resources/resources.component';
import { NavbarService } from './components/shared/navbar.service';



import {PatientdashboardComponent  } from './patientdashboard/patientdashboard.component';

import {DoctorComponent   } from './doctor/doctor.component';
import {EhrComponent  } from './ehr/ehr.component';
import {PharmacyComponent   } from './pharmacy/pharmacy.component';
import {UserComponent   } from './user/user.component';

import {DoctorAppointmenthistoryComponent   } from './doctorappointmenthistory/doctorappointmenthistory.component';

import {DoctordashboardComponent } from './doctordashboard/doctordashboard.component';
import {ProfileComponent } from './profile/profile.component';
import {AppointementsComponent   } from './appointements/appointements.component';



import {HospitaldashboardComponent } from './hospitaldashboard/hospitaldashboard.component';
import {HospitaldoctorComponent } from './hospitaldoctor/hospitaldoctor.component';
import {HospitalnurseComponent  } from './hospitalnurse/hospitalnurse.component';
import { HospitalradiologistComponent   } from './hospitalradiologist/hospitalradiologist.component';
import {HospitalprofileComponent   } from './hospitalprofile/hospitalprofile.component';


import {CliniciandashboardComponent } from './cliniciandashboard/cliniciandashboard.component';
import {ClinicianpastlabreportsComponent } from './clinicianpastlabreports/clinicianpastlabreports.component';

import {ClinicianprofileComponent   } from './clinicianprofile/clinicianprofile.component';
import {ClinicianrequestsfrompatientsComponent   } from './clinicianrequestsfrompatients/clinicianrequestsfrompatients.component';


import {AdmindashboardComponent   } from './admindashboard/admindashboard.component';
import {AdminprofileComponent } from './adminprofile/adminprofile.component';

import {ResearcherdashboardComponent   } from './researcherdashboard/researcherdashboard.component';
import { ResearcherprofileComponent } from './researcherprofile/researcherprofile.component';

import { BlockchainComponent } from './blockchain/blockchain.component';
import { DaignosisFormComponent } from './daignosis-form/daignosis-form.component';





import {DoctorregisterComponent  } from './doctorregister/doctorregister.component';
import { NurseregisterComponent} from './nurseregister/nurseregister.component';

import {  RadiologistregisterComponent} from './radiologistregister/radiologistregister.component';
import {ClinicianregisterComponent } from './clinicianregister/clinicianregister.component';
import { ResearcherregisterComponent } from './researcherregister/researcherregister.component';
import {  HospitalloginComponent  } from './hospitallogin/hospitallogin.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    RegisterhComponent,
    LogInComponent,
    NewAppointmentComponent,
     RegisterdComponent ,
     CarouselComponent,
     HomeComponent,
     AboutusComponent ,
     ResourcesComponent ,
     PatientdashboardComponent ,
   
     DoctorComponent,
     EhrComponent,
     PharmacyComponent ,
     UserComponent ,



     DoctorAppointmenthistoryComponent,
  
     DoctordashboardComponent,
     AppointementsComponent  ,
     ProfileComponent,


     HospitaldashboardComponent,
     HospitaldoctorComponent,
     HospitalnurseComponent,
     HospitalradiologistComponent ,
     HospitalprofileComponent ,

    
     ClinicianComponent,
     ResearcherComponent,

     CliniciandashboardComponent,
     ClinicianpastlabreportsComponent,
     ClinicianprofileComponent,
     ClinicianrequestsfrompatientsComponent,

     AdmindashboardComponent,
     AdminprofileComponent,

     ResearcherdashboardComponent,
     ResearcherprofileComponent,

     BlockchainComponent,
     AdminLoginComponent ,
     DaignosisFormComponent ,

     DoctorregisterComponent,
     NurseregisterComponent,
     RadiologistregisterComponent,
     ClinicianregisterComponent,

     ResearcherregisterComponent ,

     HospitalloginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    LayoutModule ,
    MatButtonModule,
    MatIconModule ,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatDatepickerModule,
    NgMarqueeModule,
    NgxSpinnerModule,
    RecaptchaModule, 
    RecaptchaFormsModule
    
  ],
  providers: [EmployeeService,Employee1Service,Employee2Service,Employee3Service,HttpClientModule,ApiService, AuthService, UserService, NavbarService],
  
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }