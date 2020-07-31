'use strict';
const State = require('../ledger-api/state.js');
const reportsState = {
    REPORTS_CREATED: 1,       // patient
    REPORTS_UPDATED: 2,          // pharmacist
    

};
class Reports extends State {

    constructor(obj) {
        super(Reports.getClass(), [obj.patientUniqueId]);
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
        setStateToReportsCreated()
        {
            this.currentReportsState=ReportsState.REPORTS_CREATED;

        }
        setStateToReportsUpdated(){
            this.currentReportsState=ReportsState.REPORTS_UPDATED;
            
        }
       
   
   
       static fromBuffer(buffer) {
           return Reports.deserialize(Buffer.from(JSON.parse(buffer)));
       }
   
       toBuffer() {
           return Buffer.from(JSON.stringify(this));
       }
   
       /**
        * Deserialize a state data to  Order
        * @param {Buffer} data to form back into the object
        */
       static deserialize(data) {
           return State.deserializeClass(data,Reports );
       }
   
       /**
        * Factory method to create a order object
        */
       static createInstance(patientUniqueId) {
           return new Reports({patientUniqueId});
       }
   
       static getClass() {
           return 'org.patient.contract';
       }
   }
   
   module.exports = Reports;
   module.exports.reportStates = reportsState;
   
   