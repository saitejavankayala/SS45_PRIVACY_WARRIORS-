import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { UserService } from './user.service';
import { BehaviorSubject, Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  id: String = "";
  pwd: String = "";
  body: Object;
  body1:Object;
  body2:Object;
  loginbody:Object;
  patientid: String=""
  status: String;
  private OrdersData = new BehaviorSubject([]);
  orders$: Observable<any[]> = this.OrdersData.asObservable();
  statuses = {
    1: "REQUEST_CREATED",
    5: "REQUEST_PENDING",
    3: "REQUEST_ACCEPTED",
  };

  baseUrl = "http://localhost:3000";

  constructor(private httpClient: HttpClient, private userService: UserService) { }
  createUserAuthorizationHeader(headers: HttpHeaders) {
    const currentUser = this.userService.getCurrentUser();
    return headers.append('Authorization', 'Basic ' + btoa(currentUser.userid+':'+currentUser.password)); 
  }
  pharmacyDetails(user){
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.get(this.baseUrl + '/api/pharmacy-details/'+user.userid, {headers:headers})
  }

  getUser(){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('admin:adminpw')); 
    return this.httpClient.get(this.baseUrl + '/api/users/'+this.id, {headers:headers});
  }
  queryOrders(user) {
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.get(this.baseUrl + '/api/appointment/'+user.userid, {headers:headers})
  }
  queryOrdersdoctors(user) {
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.get(this.baseUrl + '/api/doctor-appointment/'+user.userid, {headers:headers})
  }
  
  orderProduct() {
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.post(this.baseUrl + '/api/request-appointment', this.body, {headers:headers})
  }
  acceptappointment(){
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.post(this.baseUrl+'/api/acceptreject',{patient:this.patientid,status:this.status},{headers:headers})
  }
  accessgranted(){
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.post(this.baseUrl+'/api/acceptreject',{patient:this.patientid,status:this.status},{headers:headers})
  }
  
  acceptdata(){
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.post(this.baseUrl + '/api/prescription',this.body1,{headers:headers});
  }
  reportdata(){
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.post(this.baseUrl + '/api/reports',this.body2,{headers:headers});
  }
  
  getAllUsers(){
    let headers = new HttpHeaders();
    //
    //  NOTE: an admin identity is needed to invoke this API since it calls the CA methods. 
    headers = headers.append('Authorization', 'Basic ' + btoa('admin:adminpw')); 
    // replace with this line to pass in the current user vs admin
    //headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.get(this.baseUrl + '/api/users/', {headers:headers});
  }
  getAllUsershosp(){
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.get(this.baseUrl + '/api/hospitalusers/', {headers:headers});
  }
  getUsers(){
    let headers = new HttpHeaders();
    const currentUser = this.userService.getCurrentUser();
    headers = headers.append('Authorization', 'Basic ' + btoa('admin:adminpw')); 
    return this.httpClient.get(this.baseUrl + '/api/getdetails/'+ currentUser.userid, {headers:headers});
  }

}
