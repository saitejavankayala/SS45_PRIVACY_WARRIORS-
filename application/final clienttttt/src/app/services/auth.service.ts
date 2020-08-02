import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
// import { User } from '../_models/user';
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  pbody: Object;
  cbody:Object;
  dbody:Object;
  hbody:Object;
  rbody:Object;
  nbody:Object;
  rabody:Object;
  constructor(private httpClient: HttpClient, private api: ApiService, private userService: UserService, private router: Router) { }

  baseUrl = "http://localhost:3000";

  register(user){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(user.userid+':'+user.password)); 
    return this.httpClient.post(this.baseUrl + '/api/enroll-user',this.pbody, {headers:headers,responseType:'text'});
  }
  registerd(user){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(user.duserid+':'+user.dpassword)); 
    return this.httpClient.post(this.baseUrl + '/api/enroll-doctor',this.dbody, {headers:headers,responseType:'text'});
  }
  registerh(user){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(user.hname+':'+user.hpassword)); 
    return this.httpClient.post(this.baseUrl + '/api/enroll-hospital',this.hbody, {headers:headers,responseType:'text'});
  }
 
  registerc(user){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(user.cuserid+':'+user.cpassword)); 
    return this.httpClient.post(this.baseUrl + '/api/enroll-clinician',this.cbody, {headers:headers,responseType:'text'});
  }
  registerr(user){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(user.ruserid+':'+user.rpassword)); 
    return this.httpClient.post(this.baseUrl + '/api/enroll-researcher',this.rbody, {headers:headers,responseType:'text'});
  }
  registern(user){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(user.nuserid+':'+user.npassword)); 
    return this.httpClient.post(this.baseUrl + '/api/enroll-nurse',this.nbody, {headers:headers,responseType:'text'});
  }
  registerra(user){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(user.rauserid+':'+user.rapassword)); 
    return this.httpClient.post(this.baseUrl + '/api/enroll-radiologist',this.rabody, {headers:headers,responseType:'text'});
  }
  appointment(users){
    //let headers = new HttpHeaders();
    //headers = headers.append('Authorization', 'Basic ' + btoa(users.name+':'+users.gender+':'+users.date+':'+users.mail+':'+users.tel+':'+users.address+':'+users.tele+':'+users.appointment_for+':'+users.appointment_description+':'+users.doctor+':'+users.date1+':'+users.duration)); 
    return this.httpClient.post(this.baseUrl + '/api/request-appointment/', {name:users.name,gender:users.gender,date:users.date,maill:users.mail,tel:users.tel,address:users.address,appointment_for:users.appointment_for,doctor:users.doctor,date1:users.date1,duration:users.duration});
  }
  
}
