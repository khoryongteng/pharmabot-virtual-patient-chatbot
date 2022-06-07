const mysql = require("mysql");

//Need to remove Default fallback intent so that it is not saved in the database

//DialogFlow Agent Matching based on Cid (Counselling ID)
function match(con, Cid, sessionData, result){

    var tablename;
    var intentColumn;
    var chatResponse;

    switch (Cid) {

        case "1": 

            tablename = "counselling1";
            [intentColumn, chatResponse] = matchC1(con, tablename, sessionData, result);
            break; 

        case "2": 

            tablename = "counselling2";
            [intentColumn, chatResponse] = matchC2(con, tablename, sessionData, result);
            break; 

        case "3": 

            tablename = "counselling3";
            [intentColumn, chatResponse] = matchC3(con,tablename,sessionData,result);
            break; 

    }

    if (tablename && intentColumn){

        sequenceHandler(con, sessionData, tablename, intentColumn);

    }

    if (chatResponse){

        return chatResponse;

    }
        
}

//Intent Matching 
function matchC1 (con, tablename, sessionData, result) {

    switch(result.intent.displayName) {

        case "Address Query":
            return ["address", result.fulfillmentText];

        case "Allergy Query":
            return ["allergy", result.fulfillmentText];

        case "Default Welcome Intent":
            return ["defaultWelcome", result.fulfillmentText];

        case "End":
            return ["end", endHandlerC1(con, sessionData, tablename)];

        case "Folic Acid Help":
            return ["folicAcid", result.fulfillmentText]

        case "First time taking":
            return ["firstTime", result.fulfillmentText];

        case "Further Questions":
            return ["furtherQuestions", result.fulfillmentText];

        case "Key counselling point check":
            return ["keyCounselling", result.fulfillmentText];

        case "Methotrexate Collection Doses":
            return ["mCollectionDoses", result.fulfillmentText];

        case "Methotrexate Toxicity":
            return ["mToxicity", result.fulfillmentText];
    
        case "Name Age Query":
            return ["nameAge", result.fulfillmentText];

        case "Prescription Check":
            return ["prescriptionCheck", result.fulfillmentText];

        case "Prescription Intake Explanation":
            return ["prescriptionExplanation", result.fulfillmentText];

        case "Forget":
            return ["forget", result.fulfillmentText];

        case "Previous Medication Query":
            return ["previousMedication", result.fulfillmentText];

        case "Regular Blood Tests":
            return ["bloodTests", result.fulfillmentText];

        default:
            return ["", result.fulfillmentText];
            
    }

}

function matchC2 (con, tablename, sessionData, result) {

    switch(result.intent.displayName) {

        case "Address":
            return ["address", result.fulfillmentText];    

        case "Allergies":
            return ["allergies", result.fulfillmentText];

        case "Collector's name":
            return ["collectorName", result.fulfillmentText];

        case "Consultation":
            return ["consultation", result.fulfillmentText];

        case "Counselling points":
            return ["counsellingPoints", result.fulfillmentText];

        case "Current medicine":
            return ["currentMedicine", result.fulfillmentText];

        case "Default okay":
            return ["defaultOkay", result.fulfillmentText];

        case "Default Welcome Intent":
            return ["defaultWelcome", result.fulfillmentText];

        case "Direction of use":
            return ["directionOfUse", result.fulfillmentText];

        case "End":
            return ["end", result.fulfillmentText];

        case "End feedback":
            return ["endFeedback", endHandlerC2(con, sessionData, tablename)];

        case "First time":
            return ["firstTime", result.fulfillmentText];

        case "Mother's condition":
            return ["motherCondition", result.fulfillmentText];

        case "Mother's name":
            return ["motherName", result.fulfillmentText];

        case "Questions":
            return ["question", result.fulfillmentText];

        case "question1":
            return ["question1", result.fulfillmentText];

        case "question2":
            return ["question2", result.fulfillmentText];

        case "question3":
            return ["question3", result.fulfillmentText];

        case "question4":
            return ["question4", result.fulfillmentText];

        case "question5":
            return ["question5", result.fulfillmentText];

        case "Reason of visit":
            return ["reasonOfVisit", result.fulfillmentText];

        case "Treatment description":
            return ["treatmentDescription", result.fulfillmentText];
            
        default:
            return ["", result.fulfillmentText];

    }

}

//Intent Matching 
function matchC3 (con, tablename, sessionData, result) {

    switch(result.intent.displayName) {

        case "Ask for Address":
            return ["address", result.fulfillmentText];

        case "Any allergies?":
            return ["allergy", result.fulfillmentText];

        case "Default Welcome Intent":
            return ["defaultWelcome", result.fulfillmentText];

        case "End":
            return ["end", endHandlerC3(con, sessionData, tablename)];

        case "How long?":
            return ["symptomsShowing", result.fulfillmentText];

        case "Lifestyle Recommendations":
            return ["lifestyleRecommendations", result.fulfillmentText];

        case "Check Patient Name":
            return ["nameCheck", result.fulfillmentText];

        case "Actions taken so far?":
            return ["actionsSoFar", result.fulfillmentText];

        case "Other medicines":
            return ["otherMedicines", result.fulfillmentText];

        case "Over the Counter & Herbal":
            return ["OTCHerbalCheck", result.fulfillmentText];

        case "Medical History?":
            return ["MedicalHistory", result.fulfillmentText];

        case "Diet?":
            return ["diet", result.fulfillmentText];
            
        case "Joy Rides":
         return ["joyRides", result.fulfillmentText];
            
        case "Joy Rides Details":
         return ["joyRidesDetails", result.fulfillmentText];
            
        case "Joy Rides Failed":
         return ["joyRidesFailed", result.fulfillmentText];
            
        case "Kwells":
         return ["kwells", result.fulfillmentText];
            
      case "Kwells Details":
         return ["kwellsDetails", result.fulfillmentText];
            
        case "Kwells Failed":
         return ["kwellsFailed", result.fulfillmentText];
            
        case "Scopoderm":
         return ["scopoderm", result.fulfillmentText];
            
        case "Scopoderm Details":
         return ["scopodermDetails", result.fulfillmentText];
            
        case "Scopoderm Failed":
         return ["scopodermFailed", result.fulfillmentText];
            
        case "Stugeron":
         return ["stugeron", result.fulfillmentText];
            
        case "Stugeron Details":
         return ["stugeronDetails", result.fulfillmentText];
            
        case "Stugeron Failed":
         return ["stugeronFailed", result.fulfillmentText];
            
        case "PQ1":
         return ["PQ1", result.fulfillmentText];
            
        case "PQ1 Answer":
         return ["PQ1 Answer", result.fulfillmentText];
            
        case "PQ1 Wrong":
         return ["PQ1 Wrong", result.fulfillmentText];
            
        case "PQ2":
         return ["PQ2", result.fulfillmentText];
            
        case "PQ2 Answer":
         return ["PQ2 Answer", result.fulfillmentText];
            
        case "PQ2 Wrong":
         return ["PQ2 Wrong", result.fulfillmentText];
            
        case "PQ3":
         return ["PQ3", result.fulfillmentText];
            
        case "PQ3 Wrong":
         return ["PQ3 Wrong", result.fulfillmentText];
            
        case "PQ3 Answer":
         return ["PQ3 Answer", result.fulfillmentText];
         
        default:
            return ["", result.fulfillmentText];

    }

}

//Inserting and creating entry in History Table
function sequenceHandler (con, sessionData, tablename, intentColumn) {

    //Check if session has any record in selected counselling
    con.query('SELECT * FROM ?? WHERE sessionId = ?', [tablename, sessionData['sessionId']], async (error, results) => {

        if(error){

            console.log(error);

        }
        else {

            //If session has not been created, create a new session
            if(results.length == 0){

                con.query('INSERT INTO ?? (sessionId, studentId) VALUES (?, ?)', [tablename, sessionData['sessionId'], sessionData['studentId']], async (error, results)=>{
    
                    if(error){

                        console.log(error);

                    };
    
                });

            }
            
            //Check if intent is recorded
            con.query('SELECT ?? FROM ?? WHERE sessionId = ?', [intentColumn, tablename, sessionData['sessionId']], async (error, results)=>{

                if(error){

                    console.log(error);

                }
                else{

                    //If result is not recorded, record intent
                    if (results[0][intentColumn] == 0) {

                        con.query('SELECT totalIntents FROM ?? WHERE sessionId = ?', [tablename, sessionData['sessionId']], async (error, results)=> {

                            if(error){
            
                                console.log(error);
            
                            }
                            else{
            
                                var new_totalIntents = results[0].totalIntents + 1;

                                con.query('UPDATE ?? SET ?? = ?, totalIntents = ? WHERE sessionId  = ?', [tablename, intentColumn, new_totalIntents, new_totalIntents, sessionData['sessionId']], async (error, results)=>{

                                    if(error){

                                        console.log(error);

                                    }

                                });
            
                            }
            
                        });

                    }

                }

            });

            

        }

    });


}

async function endHandlerC1(con, sessionData, tablename) {

    var res;

    res =   "Counselling Session Ended<br><br>" + 
            "Expected Sequence<br>" +
            "------------------------------------------------------------------<br>" +
            "1. Greeting the patient<br>" +
            "2. Ask for name and age<br>" +
            "3. Ask for address<br>" +
            "4. Ask for presence of previous medication<br>" +
            "5. Ask for allergies<br>" +
            "6. Check if prescription given is correct<br>" +
            "7. Ask if first time this medication is perscribed<br>" +
            "8. Ask if it is okay to give counselling<br>" +
            "9. Prescription Explanation<br>" +
            "10. Answer patient question of what to do when forget to take medicine<br>" +
            "11. Remind patient to check strength of methotrexate during collection<br>" +
            "12. Methotrexate toxicity warning<br>" +
            "13. Remind patient to get regular blood tests<br>" +
            "14. Let patients know what does Folic Acid do<br>" +
            "15. Ask for Further Questions<br>" +
            "16. Goodbye<br><br>" +
            
            "Actual Sequence<br>" +
            "------------------------------------------------------------------<br>";

    function getIntentSequence(con, sessionData, tablename){

        return new Promise(function(resolve,reject){

            con.query('SELECT * FROM ?? WHERE sessionId = ?', [tablename, sessionData['sessionId']], async (error, results) => {

                var resAppend = "";
    
                if(error){
        
                    return reject(error);
        
                }
                else {
        
                    var i;
                    var intents = {};
                    var intentKeys = Object.keys(results[0]);
    
                    //for all objects in a row
                    for(i = 3;i < intentKeys.length;i++){
        
                        //if the object does not have a value of zero and the object is not "totalIntents" and if the object is less than or equals to the value of total intents
                        if(((results[0][intentKeys[i]]) != 0) && (intentKeys[i] != "totalIntents") && (results[0][intentKeys[i]] <= results[0].totalIntents)){
                                
                             //set the intent according to their value to the array
                            intents[results[0][intentKeys[i]] - 1] = intentKeys[i];
        
                        }
        
                    }
        
                    for(i = 0;i < (Object.keys(intents).length);i++){
                            
                        switch(intents[i]){
                            
                            case 'address':
                                resAppend = resAppend + "3. Ask for address<br>";
                                break;
        
                            case 'allergy':
                                resAppend = resAppend + "5. Ask for allergies<br>";
                                break;
        
                            case 'defaultWelcome':
                                resAppend = resAppend + "1. Greeting the patient<br>";
                                break;
        
                            case 'firstTime':
                                resAppend = resAppend + "7. Ask if first time this medication is prescribed<br>";
                                break;
        
                            case 'folicAcid':
                                resAppend = resAppend + "14. Let patients know what does Folic Acid do<br>";
                                break;

                            case 'furtherQuestions':
                                resAppend = resAppend + "12. Ask for Further Questions<br>";
                                break;
        
                            case 'keyCounselling':
                                resAppend = resAppend + "8. Ask if it is okay to give counselling<br>";
                                break;
        
                            case 'mCollectionDoses':
                                resAppend = resAppend + "11. Remind patient to check strength of methotrexate during collection<br>";
                                break;

                            case 'mToxicity':
                                resAppend = resAppend + "12. Methotrexate toxicity warning<br>";
                                break;

                            case 'nameAge':
                                resAppend = resAppend + "2. Ask for name and age<br>";
                                break;
        
                            case 'prescriptionCheck':
                                resAppend = resAppend + "6. Check if prescription given is correct<br>";
                                break;
        
                            case 'prescriptionExplanation':
                                resAppend = resAppend + "9. Prescription Explanation<br>";
                                break;
        
                            case 'forget':
                                resAppend = resAppend + "10. Answer patient question of what to do when forget to take medicine<br>";
                                break;
        
                            case 'previousMedication':
                                resAppend = resAppend + "4. Ask for presence of previous medication<br>";
                                break;

                            case 'bloodTests':
                                resAppend = resAppend + "13. Remind patient to get regular blood tests<br>";
                                break;
        
                        }
        
                    }
                    
                    resAppend = resAppend + "16. Goodbye<br>";

                    resolve(resAppend);

                }
            });

        });

    }

    res = res + await getIntentSequence(con, sessionData, tablename);
    return res;

}

async function endHandlerC2(con, sessionData, tablename) {

    var res;

    res =   "Counselling Session Ended<br><br>" + 
            "Expected Sequence<br>" +
            "------------------------------------------------------------------<br>" +
            "1. Greeting the patient<br>" +
            "2. Ask for name<br>" +
            "3. Reason of visit<br>" + 
            "4. Ask for mother's name<br>" +
            "5. Verify address<br>" +
            "6. Check if prescription given is correct<br>" +
            "7. Ask if it's the first time being prescribed<br>" +
            "8. Ask if it is okay to give counselling<br>" +
            "9. Prescription Explanation<br>" +
            "10. Explain direction of use<br>" +
            "11. Ask if have any allergies<br>" +
            "12. Ask for current medication<br>" +
            "13. Ask if have any question<br>" +
            "14. Goodbye<br><br>" +
            
            "Actual Sequence<br>" +
            "------------------------------------------------------------------<br>";

    function getIntentSequence(con, sessionData, tablename){

        return new Promise(function(resolve,reject){

            con.query('SELECT * FROM ?? WHERE sessionId = ?', [tablename, sessionData['sessionId']], async (error, results) => {

                var resAppend = "";
    
                if(error){
        
                    return reject(error);
        
                }
                else {
        
                    var i;
                    var intents = {};
                    var intentKeys = Object.keys(results[0]);
    
                    //for all objects in a row
                    for(i = 3;i < intentKeys.length;i++){
        
                        //if the object does not have a value of zero and the object is not "totalIntents" and if the object is less than or equals to the value of total intents
                        if(((results[0][intentKeys[i]]) != 0) && (intentKeys[i] != "totalIntents") && (results[0][intentKeys[i]] <= results[0].totalIntents)){
                                
                             //set the intent according to their value to the array
                            intents[results[0][intentKeys[i]] - 1] = intentKeys[i];
        
                        }
        
                    }
        
                    for(i = 0;i < (Object.keys(intents).length);i++){
                            
                        switch(intents[i]){
                            
                            case 'address':
                                resAppend = resAppend + "5. Verify address<br>";
                                break;
        
                            case 'allergies':
                                resAppend = resAppend + "11. Ask if have any allergies<br>";
                                break;

                             case 'reasonOfVisit':
                                resAppend = resAppend + "3. Reason of visit<br>";
                                break;
        
                            case 'defaultWelcome':
                                resAppend = resAppend + "1. Greeting the patient<br>";
                                break;
        
                            case 'firstTime':
                                resAppend = resAppend + "7. Ask if it's the first time being prescribed<br>";
                                break;
        
                            case 'anyQuestions':
                                resAppend = resAppend + "13. Ask if have any question<br>";
                                break;
        
        
                            case 'collectorName':
                                resAppend = resAppend + "2. Ask for name<br>";
                                break;
        
                            case 'motherName':
                                resAppend = resAppend + "4. Ask for mother's name<br>";
                                break;
        
                            case 'consultation':
                                resAppend = resAppend + "6. Check if prescription given is correct<br>";
                                break;
        
                            case 'counsellingPoints':
                                resAppend = resAppend + "8. Ask if it is okay to give counselling<br>";
                                break;
        
                            case 'directionOfUse':
                                resAppend = resAppend + "10. Explain direction of use<br>";
                                break;
        
                            case 'currentMedicine':
                                resAppend = resAppend + "12. Ask for current medication<br>";
                                break;

                            case 'treatmentDescription':
                                resAppend = resAppend + "9. Prescription Explanation<br>";
                                break;
        
                        }
        
                    }
                    
                    resAppend = resAppend + "14. Goodbye<br>";

                    resolve(resAppend);

                }
            });

        });

    }

    res = res + await getIntentSequence(con, sessionData, tablename);
    return res;

}

async function endHandlerC3(con, sessionData, tablename) {

    var res;

    res =   "Counselling Session Ended<br><br>" + 
            "Expected Sequence<br>" +
            "------------------------------------------------------------------<br>" +
            "1. Greeting the patient<br>" +
            "2. Checking for patients name<br>" +
            "3. Checking for patients address<br>" +
            "4. Check how long symptoms showing<br>" +
            "5. Ask for actions taken so far<br>" +
            "6. Check for other medicines being taken<br>" +
            "7. Check for over the counter and herbal medicines being taken<br>" +
            "8. Ask for allergies<br>" +
            "9. Medical history check<br>" +
            "10. Diet check<br>" +
           "<br>" +
          "<u>Any Sequence</u><br>" +
        "Joy Rides(Hyoscine Hydrobromide 150mcg tablets)<br>" +
            "Joy Rides Details<br>" +
            "Kwells(Hyoscine Hydrobromide 300mcg) tablets<br>" +
          "Kwells Details<br>" +
           "Scopoderm(Scopolamine) patches<br>" +
         "Scopoderm Details<br>" +
          "Stugeron 15(Cinnazarine) Tablets <br>" +
           "Stugeron Details<br>" +
        "<br>" +
            "11. Understand direction of use?<br>" +
            "12. Ask for Further Questions<br>" +
         "13. Give Lifestyle Recommendations<br>" +
            "14. Goodbye<br><br>" +
            
            "Actual Sequence<br>" +
            "------------------------------------------------------------------<br>";

    function getIntentSequence(con, sessionData, tablename){

        return new Promise(function(resolve,reject){

            con.query('SELECT * FROM ?? WHERE sessionId = ?', [tablename, sessionData['sessionId']], async (error, results) => {

                var resAppend = "";
    
                if(error){
        
                    return reject(error);
        
                }
                else {
        
                    var i;
                    var intents = {};
                    var intentKeys = Object.keys(results[0]);
    
                    //for all objects in a row
                    for(i = 3;i < intentKeys.length;i++){
        
                        //if the object does not have a value of zero and the object is not "totalIntents" and if the object is less than or equals to the value of total intents
                        if(((results[0][intentKeys[i]]) != 0) && (intentKeys[i] != "totalIntents") && (results[0][intentKeys[i]] <= results[0].totalIntents)){
                                
                             //set the intent according to their value to the array
                            intents[results[0][intentKeys[i]] - 1] = intentKeys[i];
        
                        }
        
                    }
        
                    for(i = 0;i < (Object.keys(intents).length);i++){
                            
                        switch(intents[i]){
                            
                            case 'address':
                                resAppend = resAppend + "3. Checking for patients address<br>";
                                break;
        
                            case 'allergy':
                                resAppend = resAppend + "8. Ask for allergies<br>";
                                break;
        
                            case 'defaultWelcome':
                                resAppend = resAppend + "1. Greeting the patient<br>";
                                break;
                    
        
                            case 'symptomsShowing':
                                resAppend = resAppend + "4. Check how long symptoms showing<br>";
                                break;
        
                            case 'PQ1':
                            resAppend = resAppend + "12. Ask for Further Questions<br>";
                            break;

                            case 'PQ2':
                            resAppend = resAppend + "12. Ask for Further Questions<br>";
                            break;

                            case 'PQ3':
                            resAppend = resAppend + "12. Ask for Further Questions<br>";
                            break;

                            case 'nameCheck':
                                resAppend = resAppend + "2. Checking for patients name<br>";
                                break;
        
                            case 'actionsSoFar':
                                resAppend = resAppend + "5. Ask for actions taken so far<br>";
                                break;
        
                            case 'otherMedicines':
                                resAppend = resAppend + "6. Check for other medicines being taken<br>";
                                break;
        
                            case 'OTCHerbalCheck':
                                resAppend = resAppend + "7. Check for over the counter and herbal medicines being taken<br>";
                                break;
        
                            case 'MedicalHistory':
                                resAppend = resAppend + "9. Medical history check<br>";
                                break;
        
                            case 'diet':
                                resAppend = resAppend + "10. Diet check<br>";
                                break;
                                
                            case 'joyRides':
                                resAppend = resAppend + "Joy Rides(Hyoscine Hydrobromide 150mcg tablets)<br>";
                                break;
                                
                            case 'joyRidesDetails':
                                resAppend = resAppend + "Joy Rides Details<br>";
                                break;
                                
                             case 'kwells':
                                resAppend = resAppend + "Kwells(Hyoscine Hydrobromide 300mcg) tablets<br>";
                                break;
                                
                            case 'kwellsDetails':
                                resAppend = resAppend + "Kwells Details<br>";
                                break;
        
                            case 'scopoderm':
                                resAppend = resAppend + "Scopoderm(Scopolamine) patches<br>";
                                break;
                                
                             case 'scopodermDetails':
                                resAppend = resAppend + "Scopoderm Details<br>";
                                break;
                                
                            case 'stugeron':
                                resAppend = resAppend + "Stugeron 15(Cinnazarine) Tablets <br>";
                                break;
                                
                            case 'stugeronDetails':
                                resAppend = resAppend + "Sturegon Details<br>";
                                break;
                                
                            case 'lifestyleRecommendations':
                                resAppend = resAppend + "13. Give Lifestyle Recommendations<br>";
                                break;
        
                        }
        
                    }
                    
                    resAppend = resAppend + "14. Goodbye<br>";

                    resolve(resAppend);

                }
            });

        });

    }

    res = res + await getIntentSequence(con, sessionData, tablename);
    return res;

}

module.exports = {

    match

};