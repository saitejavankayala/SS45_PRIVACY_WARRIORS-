'use strict';
const State = require('../ledger-api/state.js');

const diagnosisState = {
    DIAGNOSIS_CREATED: 1,       // patient
    DIAGNOSIS_UPDATED: 2,          // pharmacist
    

};
class Diagnosis extends State {

    constructor(obj) {
        super(Diagnosis.getClass(), [obj.patientUniqueId]);
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
        setStateToDiagnosisCreated()
        {
            this.currentDiagnosisState=diagnosisState.DIAGNOSIS_CREATED;

        }
        setStateToDiagnosisUpdated(){
            this.currentDiagnosisState=diagnosisState.DIAGNOSIS_UPDATED;
            
        }
       
   
   
       static fromBuffer(buffer) {
           return Diagnosis.deserialize(Buffer.from(JSON.parse(buffer)));
       }
   
       toBuffer() {
           return Buffer.from(JSON.stringify(this));
       }
   
       /**
        * Deserialize a state data to  Order
        * @param {Buffer} data to form back into the object
        */
       static deserialize(data) {
           return State.deserializeClass(data,Diagnosis );
       }
   
       /**
        * Factory method to create a order object
        */
       static createInstance(patientUniqueId) {
           return new Diagnosis({patientUniqueId});
       }
   
       static getClass() {
           return 'org.patient.contract';
       }
   }
   
   module.exports = Diagnosis;
   module.exports.diagnosisStates = diagnosisState;
   
   