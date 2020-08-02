'use strict';
const State = require('../ledger-api/state.js');
const ehrState = {
    EHR_VIEW: 2,          // pharmacist
    EHR_CREATED:1,
    EHR_CLOSED: 4    // Not currently used
};
const AppointmentState= {
      APPOINTMENT_REQUESTED:5,
      APPOINTMENT_ACCEPTED: 6,
      APPOINTMENT_REJECTED: 7,
      
};
class EHRState extends State {

    constructor(obj) {
        super(EHRState.getClass(), [obj.patientUniqueId]);
        Object.assign(this, obj);

    }
    
       getId() {
           return this.patientUniqueId;
       }
   /*  //  should never be called explicitly;
       //  id is set at the time of constructor call.
       setId(newId) {
           this.id = newId;
       }
   */
       /**
        * Useful methods to encapsulate  Order states
        */
        setStateToAppointmentRequested()
        {
            this.currentAppointmentState=AppointmentState.APPOINTMENT_REQUESTED;
        }
        setStateToAppointmentAccepted(){
            this.currentAppointmentState=AppointmentState.APPOINTMENT_ACCEPTED;
        }
        setStateToAppointmentRejected(){
            this.currentAppointmentState=AppointmentState.APPOINTMENT_REJECTED;
        }
        
       setStateToEHRCreated() {
           this.currentEHRState = ehrState.EHR_CREATED;
   
       }
   
       setStateToEHRView() {
           this.currentEHRState = ehrState.EHR_VIEW;
       }
       setStateToEHRCLOSED() {
        this.currentEHRState = ehrState.EHR_CLOSED;
    }

       setStateToEHRUpdated() {
           this.currentEHRState = ehrState.EHR_UPDATED;
       }
   
   
       static fromBuffer(buffer) {
           return EHRState.deserialize(Buffer.from(JSON.parse(buffer)));
       }
   
       toBuffer() {
           return Buffer.from(JSON.stringify(this));
       }
   
       /**
        * Deserialize a state data to  Order
        * @param {Buffer} data to form back into the object
        */
       static deserialize(data) {
           return State.deserializeClass(data,EHRState );
       }
   
       /**
        * Factory method to create a order object
        */
       static createInstance(patientUniqueId) {
           return new EHRState({patientUniqueId});
       }
   
       static getClass() {
           return 'org.patient.contract';
       }
   }
   
   module.exports = EHRState;
   module.exports.ehrStates = ehrState;
   module.exports.AppointmentStates=AppointmentState;
   