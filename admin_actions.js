
function action_createTable(tableName) {
    console.log(`Create new table with table name -> ${tableName}`);
  
    if (json_checkForName(myTables, tableName)){
        showMessage("Table name is already in use");
        return;
    }
  
    // Create a new table object
    const newTable = json_createTestTable(tableName);
  
    // Add the new table to the data structure
    json_pushNewTable(myTables, newTable);
    
    // Update the table select dropdowns
    action_setTableDropdown(elementIdForTableSelectDropdown, myTables);

    // Display the default table
    action_displayTable(myTables[0].tableName);
  }
  

  function action_setTableDropdown(dropDownID, tableList){
    const tableSelects = document.querySelectorAll(dropDownID);
    for (let i = 0; i < tableSelects.length; i++) {
        // Clear any existing options
        tableSelects[i].innerHTML = '';

        // Add a default option
        const defaultOption = document.createElement("option");
        defaultOption.text = 'Select a table';
        tableSelects[i].add(defaultOption);

        const tableListLookup = json_getAllTableNames(tableList);

        // Add options for each table in myTables
        for (let j = 0; j < tableList.length; j++) {
            const tableName = tableListLookup[j];
            const newOption = document.createElement("option");
            newOption.text = tableName;
            tableSelects[i].add(newOption);
        }

        // Add an event listener to each dropdown
        tableSelects[i].addEventListener("change", (event) => {
            const selectedTableName = event.target.value;
            action_displayTable(selectedTableName);
        });
    }

    
  }
/*
  function action_insertIntoTableDropdown(tableName){
    const tableSelects = document.querySelectorAll(elementIdForTableSelectDropdown);
    for (let i = 0; i < tableSelects.length; i++) {
      const newOption = document.createElement("option");
      newOption.text = tableName;
      tableSelects[i].add(newOption);
      tableSelects[i].addEventListener("change", (event) => {
        const selectedTableName = event.target.value;
        action_displayTable(selectedTableName);
      });
   
    }
    action_displayTable(tableName);
  }
  */
function action_deleteRow(tableName, rowJson) {
    console.log(`action_deleteRow -> ${rowJson}`);
    // Parse the row JSON back into an object
    const row = JSON.parse(rowJson);
  
    // Find the table with matching name
    const tableIndex = myTables.findIndex((table) => table.tableName === tableName);
    if (tableIndex === -1) {
      // Table not found, do nothing
      console.log("no table found");
      return;
    }
  
    // Find the row with matching values
    const rowToDeleteIndex = myTables[tableIndex].rows.findIndex((rowToCheck) => {
      // Check if all properties match
      for (const [key, value] of Object.entries(row)) {
        if (rowToCheck[key] !== value) {
          //console.log(`rowToCheck[key] = ${rowToCheck[key]}`);
          //console.log(`value = ${value}`);
          return false;
        }
      }
      return true;
    });
    if (rowToDeleteIndex === -1) {
      // Row not found, do nothing
      console.log("Row not found so we skip");
      return;
    }
  
    //console.log(`tableIndex = ${tableIndex}`);
    //console.log(`rowToDeleteIndex = ${rowToDeleteIndex}`);
    // Remove the row from the table
    myTables[tableIndex].rows.splice(rowToDeleteIndex, 1);
  
    // Re-render the table
    const columns = myTables[tableIndex].columns;
    const rows = myTables[tableIndex].rows;
    console.log(`myTables 2 = ${JSON.stringify(myTables)}`);
    //console.log(`columns 2 = ${columns}`);
    action_displayTable(tableName);

    json_updateHistoryTable();
    //createDataTable(columns, rows);
  }


  

function action_displayTable(tableName) {
    console.log("Entering action_displayTable");

    // Find the table by name
    const table = json_getTableByName(myTables, tableName);
    
    if (table) {
      // Extract the columns and rows
      const columns = json_getColumns(table);
      const rows = json_getRows(table);
      // Create the data table
      createDataTable(tableName, columns, rows);
    } else {
      console.log(`Table '${tableName}' not found.`);
    }
  }


  function action_editRow(tableName, rowIndex, rowJson, thisobj) {
    const tableElement = $(thisobj).closest('table').DataTable();
    const row = JSON.parse(rowJson);


    // Get the columns for the specified table
    const table = json_getTableByName(myTables, tableName);
    // Extract the columns and rows
    const columns = [...json_getColumns(table)];
    columns.push({ title: 'Actions' });

    console.log("columns");
    logJson(columns);

    
    // Replace the row data in the table with input fields
    html_manipulateTableRowToTurnIntoInputfields(tableElement, table, rowIndex, columns);
    saveButton = html_createSaveButtonForTableRow(tableElement, columns, rowIndex, rowJson, tableName);
  
    // Add the Save button to the end of the row
    const actionsCell = tableElement.cell(rowIndex, columns.length - 1);
    console.log("actionsCell");
    logJson(actionsCell);
    if (tableElement){
      actionsCell.data('');
    }
    actionsCell.node().appendChild(saveButton);
  }
  


  function action_updateTableRows(tableName, rowData, rowDataOriginal, rowIndex, tableElement) {
    const table = myTables.find(table => table.tableName === tableName);

    if (isRowDataEqual(rowData, JSON.parse(rowDataOriginal))){
        //console.log("Ready to update rowData = " + rowData);
       
    }
    json_updateRowData(rowDataOriginal, json_convertObjectToArray(rowData), tableName, tableElement)
    
    // update myTables with the modified copy
    // myTables = myTablesCopy;
  }

  function isRowDataEqual(rowData, rowDataOriginal) {

    
    if (Object.keys(rowData).length !== Object.keys(rowDataOriginal).length) {
      return false;
    }

    if (String(Object.values(rowData))===String(rowDataOriginal)){
        return true;
    } else {
        return false;
    }
    
  }



  function getColumnNames(tableName) {
    console.log("Entering getColumnNames");
    const table = myTables.find(table => table.tableName === tableName);
    logJson(table);
    return table.columns ; //.map(c => ({ title: c.name }));
  }
  function getValuesFromRowWithNamesAndIndex(tableName) {
    console.log("Entering getColumnNames");
    const table = myTables.find(table => table.tableName === tableName);
    logJson(table);
    return table.columns ; //.map(c => ({ title: c.name }));
  }