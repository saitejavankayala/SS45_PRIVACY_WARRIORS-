/*
* Copyright IBM Corp All Rights Reserved
*
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
const express = require('express');
const utils = require('./org1.js');

const supplychainRouter = express.Router();

// Bring key classes into scope, most importantly Fabric SDK network class
const Ehr = require('../../contract/lib/ehrstate.js');
const reports = require('../../contract/lib/clinician.js');
const diagnosis = require('../../contract/lib/diagnosis.js');

const org1 = require('./org1.js');
const register = require('../../contract/lib/register.js');

const STATUS_SUCCESS = 200;
const STATUS_CLIENT_ERROR = 400;
const STATUS_SERVER_ERROR = 500;

//  USER Management Errors
const USER_NOT_ENROLLED = 1000;
const INVALID_HEADER = 1001;

//  application specific errors
const SUCCESS = 0;
const ORDER_NOT_FOUND = 2000;

async function getAppointment(request) {
    // check for basic auth header
    if (!request.headers.authorization || request.headers.authorization.indexOf('Basic ') === -1) {
        return new Promise().reject('Missing Authorization Header');  //  status 401
    }

    // get auth credentials
    const base64Credentials = request.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [name, gender,date,mail,tel,address,tele,appointment_for,appointment_description,doctor,date1,duration] = credentials.split(':');

    //  At this point, username + password could be verified for auth -
    //  but NOT BEING VERIFIED here.  Username and password are
    //  verified with Fabric-Certificate-Authority at enroll-user time.
    //  Once enrolled,
    //  certificate is retrieved from CA and stored in local wallet.
    //  After that, password will not be used.  username will be used
    //  to pick up certificate from the local wallet.

    if (!name || !gender||!date || !mail || !tel || !address || !tele || !appointment_for|| !appointment_description|| !doctor|| !date1|| !duration) {
        return new Promise().reject('Invalid Authentication Credentials');  //  status 401
    }

    // attach username and password to request object
    request.name = name;
    request.gender = gender;
    request.date=date;
    request.mail=mail;
    request.tel=tel;
    request.address=address;
    request.tele=tele;
    request.appointment_for=appointment_for;
    request.appointment_description=appointment_description;
    request.doctor=doctor;
    request.date1=date1;
    request.duration=duration;
    return request;
}


async function getUsernamePassword(request) {
    // check for basic auth header
    if (!request.headers.authorization || request.headers.authorization.indexOf('Basic ') === -1) {
        return new Promise().reject('Missing Authorization Header');  //  status 401
    }

    // get auth credentials
    const base64Credentials = request.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [userid, password] = credentials.split(':');

    //  At this point, username + password could be verified for auth -
    //  but NOT BEING VERIFIED here.  Username and password are
    //  verified with Fabric-Certificate-Authority at enroll-user time.
    //  Once enrolled,
    //  certificate is retrieved from CA and stored in local wallet.
    //  After that, password will not be used.  username will be used
    //  to pick up certificate from the local wallet.

    if (!userid || !password) {
        return new Promise().reject('Invalid Authentication Credentials');  //  status 401
    }

    // attach username and password to request object
    request.userid = userid;
    request.password = password;

    return request;
}

async function submitTx(request, txName, ...args) {
    try {
        //  check header; get username and pwd from request
        //  does NOT verify auth credentials
        await getUsernamePassword(request);
        return org1.setUserContext(request.userid, request.password).then((contract) => {
            // Insert txName as args[0]
            args.unshift(txName);
            // Insert contract as args[0]
            args.unshift(contract);
            // .apply applies the list entries as parameters to the called function
            return org1.submitTx.apply("unused", args)
                .then(buffer => {
                    return buffer;
                }, error => {
                    return Promise.reject(error);
                });
        }, error => {
            return Promise.reject(error);
        });
    }
    catch (error) {
        return Promise.reject(error);
    }
}
supplychainRouter.route('/request-appointment/').post(function (request, response) {

       console.log("hiii");
       submitTx(request, 'requestAppointment', JSON.stringify(request.body))
        .then((result) => {
            // process response
            console.log('\nProcess requesting appointment.');
            let ehr = Ehr.fromBuffer(result);
            //console.log(`userid ${ehr.patientUniqueId},name=${ehr.patientName}, mobile = ${ehr.patientMobile}, dob = ${ehr.patientDob},gender=${ehr.patientGender},mail=${ehr.patientMail},doctorname=${ehr.doctorId},specialisttype=${ehr.appointment_for},date=${ehr.appontmentDate},duration=${ehr.duration}, state = ${ehr.currentAppointmentState},CurrentUserId = ${ehr.userId}`);
            response.status(STATUS_SUCCESS);
            response.send(ehr);
        }, (error) => {
            response.status(STATUS_SERVER_ERROR);
            response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                "There was a problem placing the appointment request."));
        });
});
supplychainRouter.route('/doctor-appointment/:userid').get(function (request, response) {
    console.log(request.params.userid);
    submitTx(request, 'queryAllAppointments', request.params.userid)
        .then((queryOrderResponse) => {
            //  response is already a string;  not a buffer
            let appointments = queryOrderResponse;
            response.status(STATUS_SUCCESS);
            //console.log(appointments);
            response.send(appointments);
        }, (error) => {
            response.status(STATUS_SERVER_ERROR);
            response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                "There was a problem getting the list of appointments."));
        });
});
supplychainRouter.route('/acceptreject/').post(function (request, response) {
    let userType = request.body.patient;
    console.log(userType);
    submitTx(request, 'acceptreject', userType,request.body.status)
        .then((queryOrderResponse) => {
            //  response is already a string;  not a buffer
 
            let order =Ehr.fromBuffer(queryOrderResponse);
            //console.log(`user ${order.patientUniqueId} : state = ${order.currentAppointmentState}`);
            response.status(STATUS_SUCCESS);
           response.send(order);
        }, (error) => {
            response.status(STATUS_SERVER_ERROR);
            response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                "There was a problem getting the list of appointments."));
        });
}); 
supplychainRouter.route('/accessrevoke/').post(function (request, response) {
    let userType = request.body.patient;
    let status=request.body.status;
    console.log(userType,status);
    submitTx(request, 'accessrevoke', userType,request.body.status)
        .then((queryOrderResponse) => {
            //  response is already a string;  not a buffer
           // console.log(queryOrderResponse)
            let order =Ehr.fromBuffer(queryOrderResponse);
            
            //console.log(`user ${order.patientUniqueId} : state = ${order.currentAppointmentState}`);
            response.status(STATUS_SUCCESS);
           response.send(order);
        }, (error) => {
            response.status(STATUS_SERVER_ERROR);
            response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                "There was a problem getting the list of appointments."));
        });
}); 

supplychainRouter.route('/appointment/:userid').get(function (request, response) {
    console.log(request.params.userid);
    submitTx(request, 'queryAllAppointments', request.params.userid)
        .then((queryOrderResponse) => {
            //  response is already a string;  not a buffer
            let appointments = queryOrderResponse;
            response.status(STATUS_SUCCESS);
          // console.log(appointments);
            response.send(appointments);
        }, (error) => {
            response.status(STATUS_SERVER_ERROR);
            response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                "There was a problem getting the list of appointments."));
        });
});  //  process route orders/
supplychainRouter.route('/pharmacy-details/:userid').get(function (request, response) {
    console.log(request.params.userid);
    submitTx(request, 'queryAlldata', request.params.userid)
        .then((queryOrderResponse) => {
            //  response is already a string;  not a buffer
            let appointments = queryOrderResponse;
            response.status(STATUS_SUCCESS);
          // console.log(appointments);
            response.send(appointments);
        }, (error) => {
            response.status(STATUS_SERVER_ERROR);
            response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                "There was a problem getting the list of appointments."));
        });
});
supplychainRouter.route('/getdetails/:userid').get(function (request, response) {
    console.log(request.params.userid);
    submitTx(request, 'queryAlldata', request.params.userid)
        .then((queryOrderResponse) => {
            //  response is already a string;  not a buffer
            let appointments = queryOrderResponse;
            response.status(STATUS_SUCCESS);
           console.log(appointments);
            response.send(appointments);
        }, (error) => {
            response.status(STATUS_SERVER_ERROR);
            response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                "There was a problem getting the list of appointments."));
        });
});
supplychainRouter.route('/accept-appointment/').post(function (request, response) {
    console.log("hiii");
    submitTx(request, 'acceptAppointment', JSON.stringify(request.body))
     .then((result) => {
         // process response
         console.log('\nProcess requesting appointment.');
         let ehr = Ehr.fromBuffer(result);
         let status="pending"
         console.log(ctx);
         
        // console.log(`userid ${ehr.patientUniqueId},name=${ehr.patientName}, mobile = ${ehr.patientMobile}, dob = ${ehr.patientDob},gender=${ehr.patientGender},mail=${ehr.patientMail},doctorname=${ehr.doctorId},specialisttype=${ehr.appointment_for},date=${ehr.appontmentDate},duration=${ehr.duration}, status = ${status  }`);
         response.status(STATUS_SUCCESS);
         response.send(ehr);
     }, (error) => {
         response.status(STATUS_SERVER_ERROR);
         response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
             "There was a problem in accepting request."));
     });
});
supplychainRouter.route('/prescription/').post(function (request, response) {
    console.log("hiii");
    submitTx(request, 'createPrescription', JSON.stringify(request.body))
     .then((result) => {
         // process response
         console.log('\nProcess requesting appointment.');
         let diag = diagnosis.fromBuffer(result);
      //   console.log(`userid ${diag.patientUniqueId},name=${diag.name} ,age=${diag.age},gender=${diag.gender},mobile=${diag.mobile},prescription=${diag.diagnosis}`);
         response.status(STATUS_SUCCESS);
         response.send(diag);
     }, (error) => {
         response.status(STATUS_SERVER_ERROR);
         response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
             "There was a problem in accepting request."));
     });
});
supplychainRouter.route('/reports/').post(function (request, response) {
    console.log("hiii");
    console.log(request.body);
    submitTx(request, 'reportsStorage', JSON.stringify(request.body))
     .then((result) => {
         // process response
         console.log('\nProcess report storage.');
         let rep = reports.fromBuffer(result);
         
      //   console.log(`userid ${rep.patientUniqueId},name=${rep.name} , age = ${rep.age  },gender=${rep.gender},aadhar=${rep.aadhar},pdf=${rep.pdf}`);
         response.status(STATUS_SUCCESS);
         response.send(rep);
     }, (error) => {
         response.status(STATUS_SERVER_ERROR);
         response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
             "There was a problem in accepting request."));
     });
});










      
        //  only admin can call this api;  get admin username and pwd from request header
       
                //  1.  No need to call setUserContext
                //  Fabric CA client is used for register-user;
                //  2.  In this demo application UI, only admin sees the page "Manage Users"
                //  So, it is assumed that only the admin has access to this api
                //  register-user can only be called by a user with admin privileges.
  /*              
let name=request.body.name;
let gender= request.body.gender;
 let  date= request.body.date;
 let mail=request.body.mail;
 let tel=request.body.tel;
 let address=request.body.address;
 let tele=request.body.tele;
 let appointment_for=request.body.appointment_for;
 let appointment_description=request.body.appointment_description;
 let doctor=request.body.doctor;
 let date1=request.body.date1;
 let duration=request.body.duration;
console.log(name,gender,date,mail,tel,address,tele,appointment_for,appointment_description,doctor,date1,duration);

         } catch (error) {
        response.status(STATUS_SERVER_ERROR);
        response.send(org1.prepareErrorResponse(error, STATUS_SERVER_ERROR,
            "Internal server error; User, " + name + " could not be registered."));
    }
});*/

//paitent
supplychainRouter.route('/enroll-user/').post(function (request, response) {
    try {
       
        let userType = request.body.usertype;
        //  only admin can call this api;  get admin username and pwd from request header
        getUsernamePassword(request)
            .then(request => {
                //  1.  No need to call setUserContext
                //  Fabric CA client is used for register-user;
                //  2.  In this demo application UI, only admin sees the page "Manage Users"
                //  So, it is assumed that only the admin has access to this api
                //  register-user can only be called by a user with admin privileges.
let userid=request.userid;
console.log(userid);
                org1.enrollUser(userid, request.password,userType).
                    then((result) => {
                        if (result == true) {
                            submitTx(request, 'registerUser', JSON.stringify(request.body))
                            .then((result2) => {
                                console.log('\n registered user successfully');
                               let result3='true';
                               let rep = register.fromBuffer(result2);
            console.log(`userid ${rep.aadhar},name=${rep.patientName} , patientGender = ${rep.patientGender  },patientMobile=${rep.patientMobile},patientDob=${rep.patientDob},patientMail=${rep.patientMail}`);

                               console.log()

                                  response.send(result3);
                            }, (error) => {
                                response.status(STATUS_SERVER_ERROR);
                                response.send(org1.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                                    "Could not get user details for user, " + userid));
                            });}
                            else{
                                response.status(STATUS_SUCCESS);
                                response.send(result);
                           
                            }
                         
                     }, (error) => {
                        response.status(STATUS_CLIENT_ERROR);
                        response.send(utils.prepareErrorResponse(error, STATUS_CLIENT_ERROR,
                            "User, " + userId + " could not be registered. "
                            + "Verify if calling identity has admin privileges."));
                    });
            }, error => {
                response.status(STATUS_CLIENT_ERROR);
                response.send(utils.prepareErrorResponse(error, INVALID_HEADER,
                    "Invalid header;  User, " + userId + " could not be registered."));
            });
    } catch (error) {
        response.status(STATUS_SERVER_ERROR);
        response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
            "Internal server error; User, " + userId + " could not be registered."));
    }
});
supplychainRouter.route('/enroll-doctor/').post(function (request, response) {
    try {
       
        let userType = request.body.usertype;
        console.log(request.body);
        //  only admin can call this api;  get admin username and pwd from request header
        getUsernamePassword(request)
            .then(request => {
                //  1.  No need to call setUserContext
                //  Fabric CA client is used for register-user;
                //  2.  In this demo application UI, only admin sees the page "Manage Users"
                //  So, it is assumed that only the admin has access to this api
                //  register-user can only be called by a user with admin privileges.
let userid=request.userid;
console.log(userid);
                org1.enrollUser(userid, request.password,userType).
                    then((result) => {
                        if (result == true) {
                            submitTx(request, 'registerDoctor', JSON.stringify(request.body))
                            .then((result2) => {
                                console.log('\n registered user successfully');
                               let result3='true';

                                  response.send(result3);
                            }, (error) => {
                                response.status(STATUS_SERVER_ERROR);
                                response.send(org1.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                                    "Could not get user details for user, " + userid));
                            });}
                            else{
                                response.status(STATUS_SUCCESS);
                                response.send(result);
                           
                            }
                       
                        
                        response.status(STATUS_SUCCESS);
                        response.send(result);
                    }, (error) => {
                        response.status(STATUS_CLIENT_ERROR);
                        response.send(utils.prepareErrorResponse(error, STATUS_CLIENT_ERROR,
                            "User, " + userId + " could not be registered. "
                            + "Verify if calling identity has admin privileges."));
                    });
            }, error => {
                response.status(STATUS_CLIENT_ERROR);
                response.send(utils.prepareErrorResponse(error, INVALID_HEADER,
                    "Invalid header;  User, " + userId + " could not be registered."));
            });
    } catch (error) {
        response.status(STATUS_SERVER_ERROR);
        response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
            "Internal server error; User, " + userId + " could not be registered."));
    }
}); 
supplychainRouter.route('/enroll-clinician/').post(function (request, response) {
    try {
       
        let userType = request.body.usertype;
        //  only admin can call this api;  get admin username and pwd from request header
        getUsernamePassword(request)
            .then(request => {
                //  1.  No need to call setUserContext
                //  Fabric CA client is used for register-user;
                //  2.  In this demo application UI, only admin sees the page "Manage Users"
                //  So, it is assumed that only the admin has access to this api
                //  register-user can only be called by a user with admin privileges.
let userid=request.userid;
console.log(userid);
                org1.enrollUser(userid, request.password,userType).
                    then((result) => {
                        if (result == true) {
                            submitTx(request, 'registerUser', JSON.stringify(request.body))
                            .then((result2) => {
                                console.log('\n registered user successfully');
                               let result3='true';

                                  response.send(result3);
                            }, (error) => {
                                response.status(STATUS_SERVER_ERROR);
                                response.send(org1.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                                    "Could not get user details for user, " + userid));
                            });}
                            else{
                                response.status(STATUS_SUCCESS);
                                response.send(result);
                           
                            
                            }
                    }, (error) => {
                        response.status(STATUS_CLIENT_ERROR);
                        response.send(org1.prepareErrorResponse(error, STATUS_CLIENT_ERROR,
                            "User, " + userId + " could not be registered. "
                            + "Verify if calling identity has admin privileges."));
                    });
            }, error => {
                response.status(STATUS_CLIENT_ERROR);
                response.send(org1.prepareErrorResponse(error, INVALID_HEADER,
                    "Invalid header;  User, " + userId + " could not be registered."));
            });
    } catch (error) {
        response.status(STATUS_SERVER_ERROR);
        response.send(org1.prepareErrorResponse(error, STATUS_SERVER_ERROR,
            "Internal server error; User, " + userId + " could not be registered."));
    }
});

supplychainRouter.route('/enroll-hospital/').post(function (request, response) {
    try {
       
        let userType = request.body.usertype;
        //  only admin can call this api;  get admin username and pwd from request header
        getUsernamePassword(request)
            .then(request => {
                //  1.  No need to call setUserContext
                //  Fabric CA client is used for register-user;
                //  2.  In this demo application UI, only admin sees the page "Manage Users"
                //  So, it is assumed that only the admin has access to this api
                //  register-user can only be called by a user with admin privileges.
let userid=request.userid;
console.log(userid);
                org1.enrollUser(userid, request.password,userType).
                    then((result) => {
                        if (result == true) {
                            submitTx(request, 'registerUser', JSON.stringify(request.body))
                            .then((result2) => {
                                console.log('\n registered user successfully');
                               let result3='true';

                                  response.send(result3);
                            }, (error) => {
                                response.status(STATUS_SERVER_ERROR);
                                response.send(org1.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                                    "Could not get user details for user, " + userid));
                            });}
                            else{
                                response.status(STATUS_SUCCESS);
                                response.send(result);
                           
                            }
                       
                        
                        response.status(STATUS_SUCCESS);
                        response.send(result);
                    }, (error) => {
                        response.status(STATUS_CLIENT_ERROR);
                        response.send(org1.prepareErrorResponse(error, STATUS_CLIENT_ERROR,
                            "User, " + userId + " could not be registered. "
                            + "Verify if calling identity has admin privileges."));
                    });
            }, error => {
                response.status(STATUS_CLIENT_ERROR);
                response.send(org1.prepareErrorResponse(error, INVALID_HEADER,
                    "Invalid header;  User, " + userId + " could not be registered."));
            });
    } catch (error) {
        response.status(STATUS_SERVER_ERROR);
        response.send(org1.prepareErrorResponse(error, STATUS_SERVER_ERROR,
            "Internal server error; User, " + userId + " could not be registered."));
    }
}); //  post('/api/enroll-user/', (request, response) )

//  Purpose:    To check if user is enrolled with Fabric CA;
//  Input:  request.params.id = { userid }
//  Iutput:  Certificate on successful enrollment
//  Usage:  ""
/*
app.get('/api/is-user-enrolled/:id', (request, response) => {
*/
 

//userlogin
supplychainRouter.route('/users/:id').get(function (request, response) {
    //  Get admin username and pwd from request header
    //  Only admin can call this api; this is not verified here;
    //  Possible future enhancement
    getUsernamePassword(request)
        .then(request => {
           
            org1.isUserEnrolled(request.params.id).then(result1 => {

                if (result1 == true) {
                    console.log(request.params.id);
                    console.log(request.userid);
                    org1.getUser(request.params.id, request.userid).then((result2) => {
                        response.status(STATUS_SUCCESS);
                        console.log(result2);
                        response.send(result2);
                    }, (error) => {
                        response.status(STATUS_SERVER_ERROR);
                        response.send(org1.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                            "Could not get user details for user, " + request.params.id));
                    });
                } else {
                    let error = {};
                    response.status(STATUS_CLIENT_ERROR);
                    response.send(org1.prepareErrorResponse(error, USER_NOT_ENROLLED,
                        "Verify if the user is registered and enrolled."));
                }
            }, error => {
                response.status(STATUS_SERVER_ERROR);
                response.send(org1.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                    "Problem checking for user enrollment."));
            });
        }, ((error) => {
            response.status(STATUS_CLIENT_ERROR);
            response.send(org1.prepareErrorResponse(error, INVALID_HEADER,
                "Invalid header;  User, " + request.params.id + " could not be enrolled."));
        }));
});

supplychainRouter.route('/users').get(function (request, response) {
    console.log(request.userid);
    getUsernamePassword(request)
        .then(request => {
            org1.getAllUsers(request.userid).then((result) => {
                
                response.status(STATUS_SUCCESS);
                console.log(result);
                response.send(result);
            }, (error) => {
                response.status(STATUS_SERVER_ERROR);
                response.send(utils.prepareErrorResponse (error, STATUS_SERVER_ERROR,
                    "Problem getting list of users."));
            });
        }, ((error) => {
            response.status(STATUS_CLIENT_ERROR);
            response.send(utils.prepareErrorResponse(error, INVALID_HEADER,
                "Invalid header;  User, " + request.username + " could not be enrolled."));
        }));
});





module.exports = supplychainRouter;
