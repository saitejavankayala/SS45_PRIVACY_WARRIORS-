import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterhComponent } from './components/registerh/registerh.component';
import { RegisterdComponent } from './components/registerd/registerd.component';
import {  AboutusComponent  } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { ResourcesComponent  } from './resources/resources.component';
import {PatientdashboardComponent  } from './patientdashboard/patientdashboard.component';

import {DoctorComponent   } from './doctor/doctor.component';
import {EhrComponent  } from './ehr/ehr.component';
import {PharmacyComponent   } from './pharmacy/pharmacy.component';
import {UserComponent   } from './user/user.component';
import {DoctorAppointmenthistoryComponent   } from './doctorappointmenthistory/doctorappointmenthistory.component';

import {DoctordashboardComponent } from './doctordashboard/doctordashboard.component';
import {ProfileComponent } from './profile/profile.component';
import {AppointementsComponent   } from './appointements/appointements.component';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';

import {HospitaldashboardComponent } from './hospitaldashboard/hospitaldashboard.component';
import {HospitaldoctorComponent } from './hospitaldoctor/hospitaldoctor.component';
import {HospitalnurseComponent  } from './hospitalnurse/hospitalnurse.component';
import { HospitalradiologistComponent   } from './hospitalradiologist/hospitalradiologist.component';
import {HospitalprofileComponent   } from './hospitalprofile/hospitalprofile.component';


import { ClinicianComponent } from './components/clinician/clinician.component';
import { ResearcherComponent } from './components/researcher/researcher.component';



import {CliniciandashboardComponent } from './cliniciandashboard/cliniciandashboard.component';
import {ClinicianpastlabreportsComponent } from './clinicianpastlabreports/clinicianpastlabreports.component';
import {ClinicianprofileComponent   } from './clinicianprofile/clinicianprofile.component';
import {ClinicianrequestsfrompatientsComponent   } from './clinicianrequestsfrompatients/clinicianrequestsfrompatients.component';


import { AdminLoginComponent } from './admin-login/admin-login.component';
import {AdmindashboardComponent   } from './admindashboard/admindashboard.component';
import {AdminprofileComponent } from './adminprofile/adminprofile.component';

import {ResearcherdashboardComponent   } from './researcherdashboard/researcherdashboard.component';
import { ResearcherprofileComponent } from './researcherprofile/researcherprofile.component';
import { DaignosisFormComponent } from './daignosis-form/daignosis-form.component';
import { BlockchainComponent } from './blockchain/blockchain.component';


const routes: Routes = [
  { path: '',redirectTo: 'home',pathMatch: 'full' },
   { path: 'home', component: HomeComponent },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registerh', component: RegisterhComponent },
  { path: 'registerd', component: RegisterdComponent },
  { path: 'aboutus', component: AboutusComponent  },
  { path: 'resource', component:ResourcesComponent},
  { path: 'patientdashboard', component:PatientdashboardComponent},

  { path: 'doctor', component:DoctorComponent  },
  { path: 'ehr', component:EhrComponent },
  { path: 'pharmacy', component:PharmacyComponent},
  { path: 'user', component:UserComponent  },
  { path: 'appointmenthistory', component:DoctorAppointmenthistoryComponent },
  { path: 'appointments', component:AppointementsComponent   },

  { path: 'doctordashboard', component:DoctordashboardComponent},
  { path: 'profile', component:ProfileComponent  },
  { path: 'new-appointment', component: NewAppointmentComponent},

  { path: 'hospitaldashboard', component:HospitaldashboardComponent},
  { path: 'hospitaldoctor', component:HospitaldoctorComponent},
  { path: 'hospitalnurse', component:HospitalnurseComponent   },
  { path: 'hospitalradiologist', component: HospitalradiologistComponent },
  { path: 'hospitalprofile', component: HospitalprofileComponent },

  { path: 'researcher', component:ResearcherComponent  },
  
  { path: 'clinician', component: ClinicianComponent},



  { path: 'cliniciandashboard', component:CliniciandashboardComponent   },
  { path: 'clinicianpastlabreports', component:ClinicianpastlabreportsComponent},
  { path: 'clinicianprofile', component: ClinicianprofileComponent },
  { path: 'clinicianrequestsfrompatients', component: ClinicianrequestsfrompatientsComponent },


  { path: 'admindashboard', component:AdmindashboardComponent   },
  { path: 'adminprofile', component:AdminprofileComponent},

  { path: 'researcherdashboard', component:ResearcherdashboardComponent   },
  { path: 'researcherprofile', component:ResearcherprofileComponent},

  { path: 'blockchain', component:BlockchainComponent },
  {path: 'admin-login', component:AdminLoginComponent},

  {path: 'daignosis-form', component:DaignosisFormComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }