
function json_getAllTableNames(tablePayload) {
  console.log("Entering getAllTableNames");
  //myTables.push(newTable); // Add the new table to the myTables array
  const tableNames = tablePayload.map(table => table.tableName); // Map the table names to a new array

  console.log("tableNames = " + tableNames);
  return tableNames;
}

function json_createTestTable(tableName){
  return newTable = {
    "tableName": tableName,
    "columns":  [
      { title: "Name" },
      { title: "Age" },
      { title: "Country" }
    ],
    "rows": [
      ["John", 30, "USA"],
      ["Jane", 35, "Canada"],
      ["Bob", 25, "Australia"]
    ]
  };
}

function json_checkForName(tablePayload, tableName){
  return tablePayload.find(table => table.tableName === tableName);
}

function json_pushNewTable(tablePayload, pushPayload){
  tablePayload.push(pushPayload);
  logJson(tablePayload);
}

function json_getTableByName(tablePayload, tableName){
  return tablePayload.find(t => t.tableName === tableName);
}

function json_getRows(tableObject){
  return tableObject.rows.map(r => Object.values(r));
}
function json_getColumns(tableObject){
  return  tableObject.columns ; //.map(c => ({ title: c.name }));
}


function checkRowMatch(row, currentRowValues) {
  const rowValues = row;
  const currentValues = currentRowValues.split(",").map(String);
  
  return rowValues.every((value, index) => {
    //console.log("value:", value, "currentValues[index]:", currentValues[index]);
    return String(value) === String(currentValues[index]);
  });
}

function json_updateRowData(currentRowValues, newRowValues, tableName, tableElement, rowIndex) {
  console.log("Entering json_updateRowData");
  //console.log("currentRowValues = " +  currentRowValues);
  //console.log("newRowValues = " +  newRowValues);
  // Find the table in the data structure
  const table = myTables.find(t => t.tableName === tableName);
  if (!table) {
    console.error(`Table ${tableName} not found in data structure`);
    return;
  }

  // Find the row with the current values
  const row = table.rows.find(r => {
    const rowValues = Object.values(r);
    //console.log("rowValues = " +  rowValues);
    //console.log("rowValues = " +  convertArrayStringToArray(currentRowValues));
   
    return checkRowMatch(rowValues, convertArrayStringToArray(currentRowValues));
  });
  if (!row) {
    console.error(`Row with values ${currentRowValues} not found in table ${tableName}`);
    return;
  }

  // Update the row with the new values
  Object.keys(row).forEach((key, index) => {
    row[key] = newRowValues[index];
  });

  console.log(JSON.stringify(row));
  console.log(JSON.stringify(myTables));

  //console.log("tableElement + " +JSON.stringify(tableElement));
  // remove the last child of the actionsCell node
  const lastColumnIndex = JSON.stringify(tableElement.columns()[0].length - 1);
  //console.log("columns + " +JSON.stringify(tableElement.columns()[0].length));
  console.log("lastColumnIndex + " +JSON.stringify(lastColumnIndex));


  const actionsCell = tableElement.cell(rowIndex, lastColumnIndex);
  actionsCell.data('');
  

  json_updateHistoryTable();
  
}
/*
function json_updateRowData2(currentRowValues, newRowValues, tableName) {
  console.log("currentRowValues = " +  currentRowValues);
  console.log("newRowValues = " +  newRowValues);
  // Find the table in data
  const table = myTables.find(table => table.tableName === tableName);
  if (!table) {
    console.error(`Table ${tableName} not found`);
    return;
  }

  // Find the row with currentRowValues
  const row = table.rows.find(row => {
    const values = Object.values(row);
    console.log("values = " +  values);
    console.log("currentRowValues = " +  convertArrayStringToArray(currentRowValues));
    currentRowValuesAsString = convertArrayStringToArray(currentRowValues) ;
    return arraysEqual(values, currentRowValuesAsString );
  });
  if (!row) {
    console.error(`Row with values ${currentRowValues} not found in table ${tableName} full data table is ${JSON.stringify(table)}`);
    return;
  }
  console.log("matching row is  = " +  row);
  // Update the row with newRowValues
  Object.keys(row).forEach((key, index) => {
    row[key] = newRowValues[index];
  });
  console.log("changed row is  = " +  row);
}
*/

function json_convertObjectToArray(obj) {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const arr = [];
  
  for (let i = 0; i < keys.length; i++) {
    if (!isNaN(parseInt(values[i]))) {
      arr.push(parseInt(values[i]));
    } else {
      arr.push(values[i]);
    }
  }
  
  return arr;
}

function json_updateHistoryTable(){
  console.log("Saving history");
  console.log(JSON.stringify(myTables));
  // Add the updated version of data to the array
  myTablesHistory.push(myTables);
  history_updateHistoryTable();
}