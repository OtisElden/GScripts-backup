//Main scripting library for the website. Everything is pretty self explanitory. Most of the big hitters are listed up further. The other supplementary functions can be found at the bottom. Big scripts call little functions. Make sure to call only what you need in each larger script or else it takes quite awhile to run. Try to avoid global variables since they can conflict with everything and slow down each script. 



//This is for sorting all data input into sheets. Copies data from cache tab and moves it into appropriate truck tab. Also copies into the Big Dump Chump

function sortAll(){

  var valuesArray = [];

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var s = ss.getSheetByName("Cache");

  var truckNumberLocation = s.getRange(2, 2, 1, 1);
  var truckNumber = truckNumberLocation.getValue();

  var row = truckNumberLocation.getRow();
  var lastColomn = s.getLastColumn();

  var rangeOfValues = s.getRange(row, 1, 1, lastColomn);
  var valuesArray = rangeOfValues.getValues();

  var targetSheet = ss.getSheetByName(truckNumber);
  var targetRow = targetSheet.getLastRow() + 1;
  var targetLocation = targetSheet.getRange(targetRow, 1, 1, lastColomn);

  //Below is for the bigDumpChump

  var bigCacheDump = "1vorFk0sxYLeOFAmHPkxg-2jOfX7ZYEhkvKhHsp9UZ2Q"
  var st = SpreadsheetApp.openById(bigCacheDump);
  var sd = st.getSheetByName("Cache");

  var dumpTargetRow = sd.getLastRow() + 1;
  var dumpLastColomn = sd.getLastColumn();
  var dumpTargetLocation = sd.getRange(dumpTargetRow, 1, 1, dumpLastColomn);

  //Actually copies data and deletes from the submission cache

  targetLocation.setValues(valuesArray);
  dumpTargetLocation.setValues(valuesArray);

  s.deleteRow(row);
}



//This is for sorting all cabinet input into sheets. Copies data from cache tab and moves it into appropriate truck tab. Also copies to the Rescue Repository tab

function cabinetSort(){

  var valuesArray = [];

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var s = ss.getSheetByName("Cache");

  var truckNumberLocation = s.getRange(2, 2, 1, 1);
  var truckNumber = truckNumberLocation.getValue();

  var row = truckNumberLocation.getRow();
  var lastColomn = s.getLastColumn();

  var rangeOfValues = s.getRange(row, 1, 1, lastColomn);
  var valuesArray = rangeOfValues.getValues();

  var targetSheet = ss.getSheetByName(truckNumber);
  var targetRow = targetSheet.getLastRow() + 1;
  var targetLocation = targetSheet.getRange(targetRow, 1, 1, lastColomn);

  //Below is for the dataBase tab

  var targetPoolSheet = ss.getSheetByName("Rescue Repository");
  var targetPoolRow = targetPoolSheet.getLastRow() + 1;
  var targetPoolLocation = targetPoolSheet.getRange(targetPoolRow, 1, 1, lastColomn);

  //Actually copies data and deletes from the submission cache

  targetLocation.setValues(valuesArray);
  targetPoolLocation.setValues(valuesArray);

  s.deleteRow(row);
}




//This function is for gettng headers and copying to proper tabs. This will make things easier to setup. Just manually relink sheets and run this command for each cabinet.

function copyHeaders(){

  const arrayTruckNumbers = ["150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161"];

  const arrayTruckNumbersForHeader = ["cache", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161"];

  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  var s = ss.getSheetByName("Cache");
  var numColumns = s.getLastColumn();

  for (var i = 0; i < arrayTruckNumbers.length; i++){

    s.getRange(1, 1, 1, numColumns).copyTo(ss.getSheetByName(arrayTruckNumbers[i]).getRange(1, 1, 1, 1));
  }


  for (var i = 0; i < arrayTruckNumbersForHeader.length; i++){

  ss.getSheetByName(arrayTruckNumbersForHeader[i]).setColumnWidths(1, numColumns, 180);  
  }

}



//For adding names tabs to each sheet inside of each truck, because fuck that

function addTabs(){

  var ss = SpreadsheetApp.getActiveSpreadsheet();

  const truckArrayNumber = ["150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161"];

  for (var i = 0; i < truckArrayNumber.length; i++){

    ss.insertSheet(truckArrayNumber[i]);
    }

  copyHeaders();
}



//Grabs the data from the whiteboard and dumps it into the big dump chump cahce.

function whiteboardToChump(){

  var bigChungus = "1vorFk0sxYLeOFAmHPkxg-2jOfX7ZYEhkvKhHsp9UZ2Q"
  var ss = SpreadsheetApp.openById(bigChungus);
  var s = ss.getSheetByName("Whiteboard");

  var whiteboardSheet = "1eqQwxlhKkQ_K4HjbCmzVM5fsBN8u8MxdWC6Q95odUdQ"
  var st = SpreadsheetApp.openById(whiteboardSheet);
  var t = st.getSheetByName("Whiteboard");

  var namesList = grabWhiteboardNames();
  var namesListlength = namesList.length;

  var lastRow = s.getLastRow() + 1;

  var writeToChungusLocation = s.getRange(lastRow, 1, namesListlength);

  writeToChungusLocation.setValues(namesList);
}



//Auto updates the date when a supervisor changes values in the whiteboard

function updateDateOnEdit(){

  var whiteboardSheet = "1eqQwxlhKkQ_K4HjbCmzVM5fsBN8u8MxdWC6Q95odUdQ"
  var ss = SpreadsheetApp.openById(whiteboardSheet);
  var s = ss.getSheetByName("Whiteboard");

  var time = new Date();

  var timeRange = s.getRange(2, 2);
  timeRange.setValue(time);
}




////////////////////////////////////////////////////////////////////////////////////
//                                                                                //
//Below here is the smaller functions that return values for the larger functions.//
//                                                                                //
////////////////////////////////////////////////////////////////////////////////////






//TESTERINO.

function testerino(){

  

}






//Updates the cabinet and critical forms with the data from the employee sheet. Will update names, shifts and truck numbers.

function updatingForms(){

  var cabinetCheckID = "1l8a9J1COuHJAmyxES3RqZQ-BAmD91o4GbfpRiTzQQys"
  cabinetForm = FormApp.openById(cabinetCheckID);

  var criticalCheckID = "1yb4FNz_CW8CaanIWWLSZSKQvJKJ8ShCkeM1fT_6I9RM"
  criticalForm = FormApp.openById(criticalCheckID);

  cabinetFormQuestions = cabinetForm.getItems();
  criticalFormQuestions = criticalForm.getItems();

  var listOfNames = employeeSheet("names");
  var listOfTrucks = employeeSheet("trucks");
  var listOfShifts = employeeSheet("shifts");
  console.log(listOfShifts);
  var listOfComputers = employeeSheet("computers");
  var listOfRadios = employeeSheet("radios");

  for (var i = 0; i < cabinetFormQuestions.length; i++){
    var question = cabinetFormQuestions[i];
    if (question.getTitle() === "What is your name?"){
  question.asListItem().setChoiceValues(listOfNames);
    }
  }

  for (var i = 0; i < cabinetFormQuestions.length; i++){
    var question = cabinetFormQuestions[i];
    if (question.getTitle() === "What is your partners name?"){
  question.asListItem().setChoiceValues(listOfNames);
    }
  }

  for (var i = 0; i < criticalFormQuestions.length; i++){
    var question = criticalFormQuestions[i];
    if (question.getTitle() === "What truck are you checking?"){
  question.asListItem().setChoiceValues(listOfTrucks);
    }
  }

  for (var i = 0; i < criticalFormQuestions.length; i++){
    var question = criticalFormQuestions[i];
    if (question.getTitle() === "What is your name?" || question.getTitle() === "What is your partners name?"){
  question.asListItem().setChoiceValues(listOfNames);
    }
  }

  for (var i = 0; i < criticalFormQuestions.length; i++){
    var question = criticalFormQuestions[i];
    if (question.getTitle() === "What shift are you on?"){
  question.asListItem().setChoiceValues(listOfShifts);
    }
  }

  for (var i = 0; i < criticalFormQuestions.length; i++){
    var question = criticalFormQuestions[i];
    if (question.getTitle() === "What computer are you taking?"){
  question.asListItem().setChoiceValues(listOfComputers);
    }
  }

  for (var i = 0; i < criticalFormQuestions.length; i++){
    var question = criticalFormQuestions[i];
    if (question.getTitle() === "What computer is your partner taking?"){
  question.asListItem().setChoiceValues(listOfComputers);
    }
  }

  for (var i = 0; i < criticalFormQuestions.length; i++){
    var question = criticalFormQuestions[i];
    if (question.getTitle() === "What radio are you taking?"){
  question.asListItem().setChoiceValues(listOfRadios);
    }
  }

  for (var i = 0; i < criticalFormQuestions.length; i++){
    var question = criticalFormQuestions[i];
    if (question.getTitle() === "What radio is your partner taking?"){
  question.asListItem().setChoiceValues(listOfRadios);
    }
  }


}



//Grabs and returns values from the repeatables sheet.

function employeeSheet(request){

  var employeeSheetID = "1Crmzv798Y0LXfrmDR-NQneBF7qSqVrBQpdQVvHjPxW8"
  var ss = SpreadsheetApp.openById(employeeSheetID);
  var s = ss.getSheetByName("Peeps");

  var lastRow = s.getLastRow();

  switch(request) {
    
    case "names":
      var paramedicNames = s.getRange(2, 1, lastRow - 1, 1).getValues();
      var emtNames = s.getRange(2, 3, lastRow - 1, 1).getValues();
      var captainNames = s.getRange(2, 5, lastRow - 1, 1).getValues();

      var fullNames = paramedicNames.concat(emtNames).concat(captainNames).sort().filter(isNaN);
  
      return fullNames;
      break;

    case "trucks":
      var truckRange = s.getRange(2, 7, lastRow - 1, 1).getValues();
      truckNumbers = truckRange.filter(Number);
  
      return truckNumbers;
      break;

    case "shifts":
      var shiftsRange = s.getRange(2, 9, lastRow - 1, 1).getValues();
      let finalShifts = shiftsRange.filter(value => value != "");
      //console.log("shifts: " + finalShifts);
      return finalShifts;

      break;

    case "computers":
      var computerRange = s.getRange(2, 11, lastRow - 1, 1).getValues();
      let finalComputers = computerRange.filter(value => value != "");
      //console.log("Computers: " + finalComputers)
      return finalComputers
      break;

    case "radios":
      var radioRange = s.getRange(2, 13, lastRow - 1, 1).getValues();
      let finalRadios = radioRange.filter(value => value != "");
      //console.log("Radios: " + finalRadios);
      return finalRadios;
      break;

    default:
      break;
  }
}













//grabs the names of people submitted into the whiteboard and returns it as an array. Will have to grab both sets of names from each colum and splice the arrays together.

function grabWhiteboardNames(){

  var whiteboardSheet = "1eqQwxlhKkQ_K4HjbCmzVM5fsBN8u8MxdWC6Q95odUdQ"
  var ss = SpreadsheetApp.openById(whiteboardSheet);
  var s = ss.getSheetByName("Whiteboard");

  var time = new Date();
  var todayDate = time.getDate().toString();
  var todayMonth = time.getMonth().toString();
  var todayMonthPeopleEdition = time.getMonth()+1;
  var todayMonthPeopleEditionString = todayMonthPeopleEdition.toString();
  var currentTimeCompare = todayMonth + "/" + todayDate;
  var presentedDayandMonth = todayMonthPeopleEditionString + "/" + todayDate;

  var timeRange = s.getRange(2, 2);
  var timeValue = timeRange.getValue();

  var toDay = timeValue.getDate().toString();
  var toMonth = timeValue.getMonth();
  var toMonthPeopleEdition = time.getMonth()+1;
  var toMonthPeopleEditionString = toMonthPeopleEdition.toString();
  var writtenTimeCompare = toMonth + "/" + toDay;
  var writtenPresentedDayandMonth = toMonthPeopleEditionString + "/" + toDay;

  if(currentTimeCompare != writtenTimeCompare){

    console.log("Whiteboard days are fucked up, figure it out.")
    return [["Wrong Date present, double check for correct dates, day presented is " + writtenPresentedDayandMonth + " Current date is " + presentedDayandMonth]]
  }


  var paramedicRange = s.getRange(4, 4, 20, 1);
  var paramedicGrabValues = paramedicRange.getValues();

  var emtRange = s.getRange(4, 6, 20, 1);
  var emtGrabValues = emtRange.getValues();

  var paramedicNameList = paramedicGrabValues.filter(isNaN);
  var emtNameList = emtGrabValues.filter(isNaN);

  var combinedNameList = paramedicNameList.concat(emtNameList);

  return combinedNameList;
}



//Test function for checking all of array vs grabbing last row. Maybe make a function to return all values in an array. Might also double check for a way to find location of data better/faster. 

function testArrayVSLastRow(){

  var chungusLocation = "1vorFk0sxYLeOFAmHPkxg-2jOfX7ZYEhkvKhHsp9UZ2Q"

  var lastEntry = returnArrayFromSheet(chungusLocation, "Cache", 2, 2, 20, 5, "last");




  console.log(lastEntry);
}
  



//Returns array of a location. Just supply it with the nessescary location values of sheetID, sheetname, startRow, startCol, endRow, endCol and if you want the last item in the list include, last at the end. ex id, sheetname, 1, ... , 1, last. If you want all rows use "allrows". Keep in mind that this will most likley return an array full of arrays. You might need to use a map and reference the first entry aka: array[i][0].

function  returnArrayFromSheet(locationID, sheetName, startPointRow, startPointCol, endPointRow, endPointCol, last){

  var ss = SpreadsheetApp.openById(locationID);
  var s = ss.getSheetByName(sheetName);

  var lastRow = s.getLastRow();


  if (last == "allrows"){

  var grabArray = s.getSheetValues(startPointRow, startPointCol, lastRow, endPointCol);
  return grabArray
  }

  if (last == "last"){

  var lastEntry = grabArray.pop();
  return lastEntry
  }

  var grabArray = s.getSheetValues(startPointRow, startPointCol, endPointRow, endPointCol);

  return grabArray;
}



//function for generating random truck audits. Currently set to work on 2 cabinets.

function randomAudit(){

  var cabinetArray = ["Adult Bag", "Airway ALS", "Airway BLS", "Cabinets", "I.V.", "Medications", "OB", "Peds Bag", "Trauma"]

  var randomNumber = Math.floor(Math.random() * 8);

  var randomCabinet = cabinetArray[randomNumber];

  return randomCabinet;
}



//function to send values as a text

function textTacular(){

  var cabinet = randomAudit();

  var EmailTo = "3072204338@txt.att.net";
  var subject = "Whatever";
  var body = cabinet;

  MailApp.sendEmail(EmailTo, subject, body);


}

//get the last date of each sheet submitted. Designed to run as a called function and not standalone. Return all dates as a MM/dd format. So 11/29/2022 10:10:30 would return as 11/29.

function grabLastDateSimplified(sheetname){

  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var e = ss.getSheetByName(sheetname);
  var lastRow = e.getLastRow();
  var rangeSelection = e.getRange(lastRow, 1)
  var pullData = rangeSelection.getValue();
  var lastDate = convertToSimpleDate(pullData);

  return lastDate;
}


//get the last date of each sheet submitted. Designed to run as a called function and not standalone. Same as above just returns the full date

function grabLastDateFull(sheetname){

  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var e = ss.getSheetByName(sheetname);
  var lastRow = e.getLastRow();
  var rangeSelection = e.getRange(lastRow, 1)
  var pullData = rangeSelection.getValue();

  return pullData;
}



// Checks if the last date was within 12 hours.

function convertDatetoWithinHours(passthrough){

  time = new Date();

  var last12 = new Date(time.getTime() - 43200000);

  if(passthrough >= last12 && passthrough <= time){

    return true
  }
  else{

    return false
  }
}



//Checks if the last value of the critical check is the same as today and submits a value for if it was completed. 

function checkCriticalTruck(sheetname){

  var criticalID = "18W7I4oftbodMIjhG-dvIUnrU3P55UL5AWuoZdBBe6Tk"
  var st = SpreadsheetApp.openById(criticalID);

  var time = new Date();
  var todayDate = time.getDate();
  var stringTodayDate = todayDate.toString();

  var e = st.getSheetByName(sheetname);
  var lastRow = e.getLastRow();
  var rangeSelection = e.getRange(lastRow, 1)
  var pullData = rangeSelection.getValue();
  var lastCriticalDate = convertToSimpleDate(pullData);

  if (lastCriticalDate == stringTodayDate) {
    var criticalCompleted = 1
    return criticalCompleted;
  }
  else{
    var criticalCompleted = 0
    return criticalCompleted;
  }
}



//Grabs the last set of names from the truck check for each truck. Designed to run as a called function. 

function grabLastNames(sheetname){

  var truckCheckID = "18W7I4oftbodMIjhG-dvIUnrU3P55UL5AWuoZdBBe6Tk"
  var st = SpreadsheetApp.openById(truckCheckID);

  var e = st.getSheetByName(sheetname);
  var lastRow = e.getLastRow();
  var rangeSelection = e.getRange(lastRow, 3, 1, 2);
  var names = rangeSelection.getValues();

  return names;
}



//Grabs an array of all the dates on compliance and matches to the current date and returns the position in the array. Somehow works for 30 days or 31 days. No idea why, but when changed to +1 for 30 days it puts the values one day behind. No need for if else to evaluate. 

function matchComplianceDate(sheetname){

  var complianceDataSheetID = "1IR7bS-zbKj7AzV-lMn2J040qHVCWQXu1bJuNa1ZLnAE"
  var ss = SpreadsheetApp.openById(complianceDataSheetID);

  var arraySetup = [];
  
  var today = convertToSimpleDate(new Date());

  var e = ss.getSheetByName(sheetname);
  var lastRow = e.getLastRow();
  var grabRange = e.getRange(2, 1, lastRow, 1);
  var arraySetup = grabRange.getValues();

  var convertedArray = arraySetup.map(convertToSimpleDate);

  var positionInArray = convertedArray.indexOf(today);

  return positionInArray
}


//Checks to see if the trucks have been checked in the last few days. If not sends an email to the captains group. Should run every day and will check if that truck has been checked at all in the past 7 days. 

function latencyTruckCheck(){

  const truckArray = [150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161];

  let timeNow = new Date();

  const timeInDay = 86400000

  let arrayCheckedTruck = [];

  //grabs trucks

  let truckNumberArray = returnArrayFromSheet("1SnZf4S8TlnIxMiZYhK6hqkH6j2yMTS5KGPjU9Wxjh-0", "Rescue Repository", 2, 2, 1, 1, "allrows").flat();

  //grabs times

  let timeTempArray = returnArrayFromSheet("1SnZf4S8TlnIxMiZYhK6hqkH6j2yMTS5KGPjU9Wxjh-0", "Rescue Repository", 2, 1, 1, 1, "allrows");

  let timeArray = timeTempArray.map(d => new Date(d)).filter(Number).flat();

  for (var i = 0; i < timeArray.length; i++)
  ((timeNow - timeArray[i]) / timeInDay <= 7) && arrayCheckedTruck.push(truckNumberArray[i]);

  let test = truckArray.filter( i => !arrayCheckedTruck.includes(i));


  console.log(test);


  //Sends email if list is found.


}






//Support function for daily compliance generation. Checks if submiitted date is today.

function checkIfValuesAreEqual(passthrough){

  var time = new Date();
  var timeConverted = convertToSimpleDate(time);

  return passthrough == timeConverted;
}



//Converts dates into MM/dd format and returns to other functions. 

function convertToSimpleDate(inputDate){

  var exportedDate = Utilities.formatDate(new Date(inputDate), "GMT-07:00", "MM/dd");
  return exportedDate;
}



//Converts dates into MM format and returns to other functions. 

function convertToSimpleDateMonth(inputDate){

  var exportedDate = Utilities.formatDate(new Date(inputDate), "GMT-07:00", "MM");
  return exportedDate;
}



//Set night shift all dates back 12 hours. This would make them 6am instead of 6pm and the math would all work out. We do not need to display any dates as such the numbers would add up. Might have to add today string as +1 to make it work. Will test later. 

function nightToDay(){

  var time = new Date();
  var todayDate = time.getDate();

  console.log(todayDate);

  var remove12Hours = 43200000

  const yesterday = new Date(time.getTime() - remove12Hours);

  console.log(yesterday);

  var correctedNightShiftTime = convertToSimpleDate(yesterday);

  console.log(correctedNightShiftTime);

  //return correctedNightShiftTime;
}



//Pre assigned days for each month. Returns the amount of days in a month. 

function getDaysofMonth(passthrough){

  switch (passthrough){

    case 0:
          return 31
    case 1:
          return 28
    case 2:
          return 31
    case 3:
          return 30
    case 4:
          return 31
    case 5:
          return 30
    case 6:
          return 31
    case 7:
          return 31
    case 8:
          return 30
    case 9:
          return 31
    case 10:
          return 30
    case 11:
          return 31
  }
}



// Function that returns a single console.log for getting auth

function test(){

  console.log("TEST");
}
