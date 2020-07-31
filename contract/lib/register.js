'use strict';
const State = require('../ledger-api/state.js');

const registerState = {
    REGISTRATION_COMPLETED: 1,     // patient         // pharmacist
    

};
class register extends State {

    constructor(obj) {
        super(register.getClass(), [obj.aadhar]);
        Object.assign(this, obj);

    }
    
       getId() {
           return this.aadhar;
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

     /*   setStateToDiagnosisCreated()
        {
            this.currentDiagnosisState=diagnosisState.DIAGNOSIS_CREATED;

        }
        setStateToDiagnosisUpdated(){
            this.currentDiagnosisState=diagnosisState.DIAGNOSIS_UPDATED;
            
        }
       
   */
   
       static fromBuffer(buffer) {
           return register.deserialize(Buffer.from(JSON.parse(buffer)));
       }
   
       toBuffer() {
           return Buffer.from(JSON.stringify(this));
       }
   
       /**
        * Deserialize a state data to  Order
        * @param {Buffer} data to form back into the object
        */
       static deserialize(data) {
           return State.deserializeClass(data,register );
       }
   
       /**
        * Factory method to create a order object
        */
       static createInstance(aadhar) {
           return new register({aadhar});
       }
   
       static getClass() {
           return 'org.patient.contract';
       }
   }
   
   module.exports = register;
   module.exports.registerStates = registerState;
   
   