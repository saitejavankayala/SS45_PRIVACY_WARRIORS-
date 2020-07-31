'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');
const Reports=require('./clinician.js');
const reportsState=require('./clinician.js').reportStates
const register=require('./register.js');
const EHRState = require('./ehrstate.js');
const Diagnosis=require('./diagnosis.js')
const DiagnosisState=require('./diagnosis.js').diagnosisStates
const AppointmentState=require('./ehrstate.js').AppointmentStates
const ehrState = require('./ehrstate.js').ehrStates;

const EVENT_TYPE = "bcpocevent";
class PatientContext extends Context {
    constructor() {
        super();
    }
}


class PatientContract extends Contract {

    constructor() {
        // Unique namespace when multiple contracts per chaincode file
        super('org.patient.contract');
    }

    /**
     * Define a custom context for product
    */
    createContext() {
        return new PatientContext();
    }

/**
 @param {Context} ctx

*/

async init(ctx) {
        // No implementation required with this example
        // It could be where data migration is performed, if necessary
        console.log('Instantiate the contract');
    }
/** 
@param {Context} ctx
@param {String} name
@param {Integer} patient_uniqueId
@param {String} gender
@param {String} date
@param {Integer} tel
@param {String} mail
@param {string} doctor
@param {string} address
@param {string} appointment_for
@param {string} duration

*/


async registerUser(ctx,args)
{
    const userdetails= JSON.parse(args);
    const aadhar = userdetails.aadhar;
    let reg =register.createInstance(aadhar);
    reg.patientName = userdetails.name;
    reg.patientGender=userdetails.gender;
    reg.patientMobile = userdetails.mobile;
    reg.patientDob = userdetails.dob;
    reg.patientMail = userdetails.mail;
    reg.registerdate=userdetails.todaydate;
    reg.password=userdetails.password;
    reg.userType=userdetails.usertype;

    await ctx.stub.putState(aadhar, reg.toBuffer());
    const event_obj = reg;
    event_obj.event_type = "user registration";
    return reg.toBuffer();
   
}
async userprofile(ctx, aadhar) {
    console.info('============= register user===========');

   

    var orderAsBytes = await ctx.stub.getState(aadhar);
    var order = register.deserialize(orderAsBytes);
    return order;
   
}

async requestAppointment(ctx,args)
{
    console.log("hii");
    let userType = await this.getCurrentUserType(ctx);
    let userId = await this.getCurrentUserId(ctx);

    if ((userType != "admin") && // admin only has access as a precaution.
    (userType != "patient"))
    throw new Error(`This user does not have access to request appointment`);
    
   /* let user=EHRState.createInstance(userId);
    user.userid=userId;
   */
    const patient_details = JSON.parse(args);
    const patientUniqueId = patient_details.patient_uniqueId;
    console.log(patientUniqueId);
    console.log("incoming asset fields: " + JSON.stringify(patient_details));
    
    
    //var EHR =EHRState.deserialize(patient_uniqueId);

     // Check if an order already exists with id=orderId
     var orderAsBytes = await ctx.stub.getState(patientUniqueId);
     if (orderAsBytes && orderAsBytes.length > 0) {
         throw new Error(`Error Message from orderProduct. Order with orderId = ${patientUniqueId} already exists.`);
     }

     // Create a new Order object

     let EHR = EHRState.createInstance(patientUniqueId);
     EHR.userId=patient_details.aadhar;
     EHR.patientName = patient_details.name;
     EHR.patientGender=patient_details.gender;
     EHR.patientMobile = patient_details.tel;
     EHR.patientDob = patient_details.date
     EHR.patientMail = patient_details.mail;
     EHR.doctorId=patient_details.doctor;
     EHR.appontmentDate=patient_details.date1;
     EHR.patientAddress=patient_details.address;
     EHR.appointment_for=patient_details.appointment_for;
     EHR.duration=patient_details.duration;
     EHR.currentAppointmentState = AppointmentState.APPOINTMENT_REQUESTED;

   

    // Update ledger
    await ctx.stub.putState(patientUniqueId, EHR.toBuffer());

    // Define and set event
    const event_obj = EHR;
    event_obj.event_type = "appointment request";   //  add the field "event_type" for the event to be processed


    try {
        await ctx.stub.setEvent(EVENT_TYPE, event_obj.toBuffer());
    }
    catch (error) {
        console.log("Error in sending event");
    }
    finally {
        console.log("Attempted to send event = ", EHR);
    }

    EHR.setStateToAppointmentRequested();

    // Must return a serialized order to caller of smart contract
    return EHR.toBuffer();
}

async queryAllAppointments(ctx,userid) {
    console.info('============= getPatientHIstory ===========');

    let userType = await this.getCurrentUserType(ctx);

    //  For adding filters in query, usage: {"selector":{"producerId":"farm1"}}
    let queryString;
    queryString = {
        "selector": {}  //  no filter;  return all orders
    }

    // Access control done using query strings
   
    console.log("In queryAllAppointments: queryString = ");
    console.log(queryString);
    // Get all orders that meet queryString criteria
    const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    const allAppointments = [];
 
    // Iterate through them and build an array of JSON objects
    while (true) {
        const Appointment = await iterator.next();
        if (Appointment.value && Appointment.value.value.toString()) {
            console.log(Appointment.value.value.toString('utf8'));

            let Record;

            try {
                Record = JSON.parse(Appointment.value.value.toString('utf8'));
            } catch (err) {
                console.log(err);
                Record = Appointment.value.value.toString('utf8');
            }

            // Add to array of orders
            allAppointments.push(Record);
        }

        if (Appointment.done) {
            console.log('end of data');
            await iterator.close();
            console.info(allAppointments);
            return allAppointments;
        }
    }
}
async acceptreject(ctx, patient_uniqueId,currentAppointmentState) {
    console.info('============= receiveOrder ===========');

   
    // Retrieve the current order using key provided
    var orderAsBytes = await ctx.stub.getState(patient_uniqueId);
  
    // Convert order so we can modify fields
    var order =  EHRState.deserialize(orderAsBytes);

    // Access Control: This transaction should only be invoked by designated Producer
    let userId = await this.getCurrentUserId(ctx);

    
    if(currentAppointmentState=='6'){
       order.setStateToAppointmentAccepted();  
    }
    else{
        order.setStateToAppointmentRejected();
    }
    // Change currentOrderState
    
    // Track who is invoking this transaction
    order.modifiedBy = userId;

    // Update ledger
    await ctx.stub.putState(patient_uniqueId, order.toBuffer());

    // Must return a serialized order to caller of smart contract
    return order.toBuffer();
}
async acceptAppointment(ctx,args)
{
    let userType = await this.getCurrentUserType(ctx);
    

    if ((userType != "admin") && // admin only has access as a precaution.
        (userType != "doctor"))
        throw new Error(`This user does not have access to create an appointment`);

    var orderAsBytes = await ctx.stub.getState(patientUniqueId);
    if (!orderAsBytes || orderAsBytes.length === 0) {
        throw new Error(`Error Message:  patient id  = ${patientUniqueId} does not exist.`);
    }
    let EHR= EHRState.fromBuffer()

    //create object
    const appointmentDetails=JSON.parse(args);
    var appointment= EHRState.createInstance(patientUniqueId);
    appointment.patientUniqueId=appointmentDetails.patientUniqueId;
    appointment.currentAppointmentState=AppointmentState.APPOINTMENT_REQUESTED;
    await ctx.stub.putState(patientUniqueId, EHR.toBuffer());
    
    if(patientUniqueId!=null)
    {
        var appointmentId= getRandomNumber();

        appointment.setStateToAppointmentAccepted();
        return  appointmentId, appointment.tobuffer();


    }
    else
    {  
       appointment.setStateToAppointmentRejected();
       return appointmentId,appointment.tobuffer();


    }
    

}
getRandomNumber()
{
    let AppointmentId=Math.floor((Math.random() * 100000) + 1);
    return AppointmentId ;
}


async reportsStorage(ctx,args)
{

    let userType = await this.getCurrentUserType(ctx);
    

    if ((userType != "admin") && // admin only has access as a precaution.
        (userType != "clinician"))
        throw new Error(`This user does not have access to create report`);

  const reportdetails=  JSON.parse(args);
  const patientId=reportdetails.prescriptionId;
  
  let report= Reports.createInstance(patientId);
  
  report.patientUniqueId=reportdetails.patientUniqueId;
  report.aadhar=reportdetails.aadhar;
  report.name=reportdetails.name;
  report.age=reportdetails.age;
  report.gender=reportdetails.gender;
  report.pdf=reportdetails.pdf;
  await ctx.stub.putState(patientId,report.toBuffer());

  return report.toBuffer();


}
/*async queryAllAppointments(ctx,userId) {
    console.info('============= getPatientHIstory ===========');

    let userId = await this.getCurrentUserId(ctx);
    let userType = await this.getCurrentUserType(ctx);

    //  For adding filters in query, usage: {"selector":{"producerId":"farm1"}}
    let queryString;

    // Access control done using query strings
   querystring=userId;

    console.log("In queryAllAppointments: queryString = ");
    console.log(queryString);
    // Get all orders that meet queryString criteria
    const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    const allAppointments = [];

    // Iterate through them and build an array of JSON objects
    while (true) {
        const Appointment = await iterator.next();
        if (Appointment.value && Appointment.value.value.toString()) {
            console.log(Appointment.value.value.toString('utf8'));

            let Record;

            try {
                Record = JSON.parse(Appointment.value.value.toString('utf8'));
            } catch (err) {
                console.log(err);
                Record = Appointment.value.value.toString('utf8');
            }

            // Add to array of orders
            allAppointments.push(Record);
        }

        if (Appointment.done) {
            console.log('end of data');
            await iterator.close();
            console.info(allAppointments);
            return allAppointments;
        }
    }
} */

/*async getOrderHistory(ctx, userId) {
    console.info('============= getOrderHistory ===========');
    if (userId.length < 1) {
        throw new Error('orderId is required as input')
    }
    console.log("input, orderId = " + userId);

    // Retrieve the current order using key provided
    var orderAsBytes = await ctx.stub.getState(userId);

    if (!orderAsBytes || orderAsBytes.length === 0) {
        throw new Error(`Error Message from getOrderHistory: Order with orderId = ${userId} does not exist.`);
    }

    // Access Control: Only those associated with this order
    // Retrieve the current order using key provided
    var appointment = EHRState.deserialize(orderAsBytes);
    let userId = await this.getCurrentUserId(ctx);
    let userType = await this.getCurrentUserType(ctx);

    // Access Control:
    if ((userId != "admin")             // admin only has access as a precaution.
        && (userType != "patient") )     // Customers can see any order if it's in the correct state    // Regulators can see any order
       
        throw new Error(`${userId} does not have access to order ${userId}`);

    // Customer can only view order history if order has completed cycle
   /* if ((userType == "c") && (order.currentOrderState != OrderStates.SHIPMENT_RECEIVED))
        throw new Error(`Information about order ${orderId} is not available to ${userId} yet. Order status needs to be SHIPMENT_RECEIVED.`);   */

   /* console.info('start GetHistoryForOrder: %s', userId);

    // Get list of transactions for order
    const iterator = await ctx.stub.getHistoryForKey(userId);
    const patientHistory = [];

    while (true) {
        let history = await iterator.next();

        if (history.value && history.value.value.toString()) {
            let jsonRes = {};
            jsonRes.TxId = history.value.tx_id;
            jsonRes.IsDelete = history.value.is_delete.toString();
            // Convert Timestamp date
            var d = new Date(0);
            d.setUTCSeconds(history.value.timestamp.seconds.low);
            jsonRes.Timestamp = d.toLocaleString("en-US", { timeZone: "America/Chicago" }) + " CST";
            // Store Order details
            try {
                jsonRes.Value = JSON.parse(history.value.value.toString('utf8'));
            } catch (err) {
                console.log(err);
                jsonRes.Value = history.value.value.toString('utf8');
            }

            // Add to array of transaction history on order
            patientHistory.push(jsonRes);
        }

        if (history.done) {
            console.log('end of data');
            await iterator.close();
            console.info(orderHistory);
            return orderHistory;
        }
    } //  while (true)
} */

/**
 * getOrderHistory
 *
 * @param {Context} ctx the transaction context
 * @param {String}  args
 * Usage:  getOrderHistory ('Order001')
 */
/*async getPatientHistory(ctx, patientUniqueId) {
    console.info('============= getOrderHistory ===========');
    if (patientUniqueId.length < 1) {
        throw new Error('orderId is required as input')
    }
    console.log("input, patientUniqueId = " + patientUniquId);

    // Retrieve the current order using key provided
    var orderAsBytes = await ctx.stub.getState(patientUniqueId);

    if (!orderAsBytes || orderAsBytes.length === 0) {
        throw new Error(`Error Message from getOrderHistory: Order with orderId = ${patientUniqueId} does not exist.`);
    }

    // Access Control: Only those associated with this order
    // Retrieve the current order using key provided
    var appointment = EHRState.deserialize(orderAsBytes);
    let userId = await this.getCurrentUserId(ctx);
    let userType = await this.getCurrentUserType(ctx);

    // Access Control:
    if ((userId != "admin")             // admin only has access as a precaution.
        && (userType != "customer")      // Customers can see any order if it's in the correct state
        && (userType != "regulator")     // Regulators can see any order
        && (userId != order.producerId) // Only producer, retailer, shipper associated
        && (userId != order.retailerId) //      with this order can see its details
        && (userId != order.shipperId))
        throw new Error(`${userId} does not have access to order ${patientUniqueId}`);

    // Customer can only view order history if order has completed cycle
    if ((userType == "patient") && (appointment.currentAppointmentState != AppointmentState.APPOINTMENT_ACCEPTED))
        throw new Error(`Information about patient ${patientUniqueId} is not available to ${userId} yet. Order status needs to be SHIPMENT_RECEIVED.`);

    console.info('start GetHistoryForPatient: %s', patientUniqueId);

    // Get list of transactions for order
    const iterator = await ctx.stub.getHistoryForKey(patientUniqueId);
    const patientHistory = [];

    while (true) {
        let history = await iterator.next();

        if (history.value && history.value.value.toString()) {
            let jsonRes = {};
            jsonRes.TxId = history.value.tx_id;
            jsonRes.IsDelete = history.value.is_delete.toString();
            // Convert Timestamp date
            var d = new Date(0);
            d.setUTCSeconds(history.value.timestamp.seconds.low);
            jsonRes.Timestamp = d.toLocaleString("en-US", { timeZone: "America/Chicago" }) + " CST";
            // Store Order details
            try {
                jsonRes.Value = JSON.parse(history.value.value.toString('utf8'));
            } catch (err) {
                console.log(err);
                jsonRes.Value = history.value.value.toString('utf8');
            }

            // Add to array of transaction history on order
            patientHistory.push(jsonRes);
        }

        if (history.done) {
            console.log('end of data');
            await iterator.close();
            console.info(patientHistory);
            return patientHistory;
        }
    } //  while (true)
}
*/
 
async getAppointmentStatus(ctx,args)

   {   
        /**acceptAppointment is a method in hsp org confirming the requestl  */
       if (acceptAppointment(patientAppointment)==null)
       {
           console.log("request not confirmed")
       }
       else{
           let patientAppointment= acceptAppointment(patientAppointment)
           // Check if an EHR already exists with id=patientId
           var orderAsBytes = await ctx.stub.getState(patientUniqueId);
           if (orderAsBytes && orderAsBytes.length > 0) {
                console.log("EHR exists with patient "+patientUniqueId);
            }

             else{

    
            /**create a new EHR with details */
             let EHR = EHRState.createInstance(patientUniqueId);
            EHR.patientUniqueId = patient_details.patient_uniqueId.toString();
            EHR.patientName = patient_details.patient_name
            EHR.patientAge = patient_details.patient_age.toString();
            EHR.patientGender = patient_details.patient_gender.toString();
            EHR.patientMobile = patient_details.patient_mobile.toString();
            EHR.currentEHRState = ehrState.EHR_CREATED;
            }
   
       }
       EHR.setStateEHRCreated();

       // Track who is invoking this transaction
       EHR.modifiedBy = userId;

       // Update ledger
       await ctx.stub.putState(orderId, order.toBuffer());

       // Must return a serialized order to caller of smart contract
       return order.toBuffer();
   }

   async createPrescription(ctx,args)
   {
        
    let userType = await this.getCurrentUserType(ctx);
    

    if ((userType != "admin") && // admin only has access as a precaution.
        (userType != "doctor"))
        throw new Error(`This user does not have access to create prescription`);
    

    const prescriptionDetails = JSON.parse(args);
    const patientId = prescriptionDetails.patientid;
  /*  var orderAsBytes = await ctx.stub.getState(paientId);
    if (orderAsBytes && orderAsBytes.length > 0) {
            throw new Error(`Error Message from orderProduct. Order with orderId = ${patientUniqueId} already exists.`);
        }*/
   
        // Create a new prescription object
        let prescription = Diagnosis.createInstance(patientId);
        prescription.name = prescriptionDetails.name;
        prescription.age = prescriptionDetails.age;
        prescription.gender = prescriptionDetails.gender;
        prescription.mobile = prescriptionDetails.mobile;
        prescription.diagnosis = prescriptionDetails.diagnosis;
        prescription.modifiedBy = await this.getCurrentUserId(ctx);
        prescription.currentDiagnosisState = DiagnosisState.Diagnosis_CREATED;
        await ctx.stub.putState(patientId, prescription.toBuffer());
        const event_obj = prescription;
        event_obj.event_type = "createPrescription";   //  add the field "event_type" for the event to be processed
 
        try {
            await ctx.stub.setEvent(EVENT_TYPE, event_obj.toBuffer());
        }
        catch (error) {
            console.log("Error in sending event");
        }
        finally {
            console.log("Attempted to send event = ", prescription);
        }

        // Must return a serialized order to caller of smart contract
        return prescription.toBuffer();
    }

    async viewPrescription()
    {

    }
   async updatePrescription(ctx,args)
   {
    if ((userType != "admin") && // admin only has access as a precaution.
    (userType != "doctor"))
    throw new Error(`This user does not have access to update prescription`);

    
    

   }
    /**
      * getCurrentUserId
      * To be called by application to get the type for a user who is logged in
      *
      * @param {Context} ctx the transaction context
      * Usage:  getCurrentUserId ()
     */
    async getCurrentUserId(ctx) {

        let id = [];
        id.push(ctx.clientIdentity.getID());
        var begin = id[0].indexOf("/CN=");
        var end = id[0].lastIndexOf("::/C=");
        let userid = id[0].substring(begin + 4, end);
        return userid;
    }

    /**
      * getCurrentUserType
      * To be called by application to get the type for a user who is logged in
      *
      * @param {Context} ctx the transaction context
      * Usage:  getCurrentUserType ()
     */
    async getCurrentUserType(ctx) {

        let userid = await this.getCurrentUserId(ctx);

        //  check user id;  if admin, return type = admin;
        //  else return value set for attribute "type" in certificate;
        if (userid == "admin") {
            return userid;
        }
        return ctx.clientIdentity.getAttributeValue("usertype");
    }



}    
 module.exports=PatientContract;
