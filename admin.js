// Admin2

// Import all functions and variables from myModule.js


// The JSON data structure
let myTables = [];
// history of data structure
let myTablesHistory = [];


const tableNameFieldReference = "table-name";
const elementIdForTableSelectDropdown = "#table-selecter";
const elementIdForDataTable = "dataTable_viewTable";
//let tableElement; // define tableElement in a higher scope



function processFormData(button) {
  const form = button.closest('form');
  const formData = new FormData(form);
  const tableId = form.getAttribute('data-form-id');
  const json = { tableId, fields: {} };

  for (const [name, value] of formData.entries()) {
    const input = form.querySelector(`[name=${name}]`);
    const id = input.getAttribute("id");

    json.fields[id] = { name, value };
  }

  logJson(json);
  processJsonData(json);
  
  // You can use the json object as needed here (e.g. send it to a server)

  return false; // Prevents the form from being submitted normally
}
function processJsonData(json) {
  if (json.tableId === "create-table-form"){
    performAction_createTable(json);
  }
}

function performAction_createTable(json){
  const fields = json.fields;
  const tableId = json.tableId ;

  const arr2d = [];
  for (const [id, { name, value }] of Object.entries(fields)) {
    logJson_tableId(tableId, id, name, value);
    arr2d.push([tableId, name, value]);
  }
  
  const obj = convertArrayToObject(arr2d);
  action_createTable( obj[tableId][tableNameFieldReference] );

}


function extractInputValues(inputObj) {
  console.log(Object.values(inputObj));

  return Object.values(inputObj).map(input => {
    const strValue = String(input);
    const match = strValue.match(/value="(.*?)"/);
    return match ? match[1] : strValue;
  });
}

function getValuesFromInputObject(inputObj) {
  let values = [];
  for (let key in inputObj) {
    if (inputObj.hasOwnProperty(key)) {
      let inputString = inputObj[key];
      let inputElement = document.createElement("div");
      inputElement.innerHTML = inputString;
      let input = inputElement.firstChild;
      if (input.tagName === "INPUT") {
        values.push(input.value);
      }
    }
  }
  return values;
}
function createDataTable(tableName,columns, rows) {
  // Get a reference to the div
  const dataTableDiv = document.getElementById(elementIdForDataTable);
  dataTableDiv.innerHTML = "";
  // Clear and destroy the existing table, if any
 

  // Create a new table element
  var tableElement = document.createElement('table');
  tableElement.id = 'example'; // set an ID for the table element

  // Append the table to the div
  dataTableDiv.appendChild(tableElement);
  const clonedColumns = columns.slice();
  // Add a new column with a button to delete the row
  clonedColumns.push({ title: 'Actions' });
  console.log("Creating a data table ");
  // Initialize the DataTable with columns and rows
  $(document).ready(function () {
    tableElement = $('#example').DataTable({
      destroy: true,
      data: rows,
      columns: clonedColumns.map((column, index) => {
        if (index === clonedColumns.length - 1) {
          // Add a button column to the end
          return {
            title: column.title,
            render: function (data, type, row) {
              let rowData = Object.assign({}, row); // Create a copy of the row object
              //rowData = getInputFieldValues(rowData);
              console.log("rowdata is " + JSON.stringify(rowData));
              let extractedData = extractInputValues(rowData) ;
              console.log( "extract " + extractedData);

              const rowJson = JSON.stringify(extractedData);
              console.log("RowJSON is = " + rowJson );
              const rowJsonString = util_transformJSONforHTML(rowJson)
              const rowIndex = rows.indexOf(row); // Get the row index
              console.log("Rendering with " + JSON.stringify(rowJsonString));
              return `<button onclick="action_editRow('${tableName}', ${rowIndex}, '${rowJsonString}',  this)">Edit</button>
                      <button onclick="action_deleteRow('${tableName}', '${rowJsonString}')">Delete</button>`;
            
            }

          };
        } else {
          // Regular data column
          return { title: column.title, data: column.name };
        }
      })
    });
  });
}


$(document).ready(function () {
  history_createDataTable();
} );

//  admin 2

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
