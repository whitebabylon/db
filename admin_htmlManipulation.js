
function html_manipulateTableRowToTurnIntoInputfields(tableElement, table, rowIndex, columns){
    console.log("entering html_manipulateTableRowToTurnIntoInputfields");
     // Replace the row data in the table with input fields
     for (let i = 0; i < (columns.length-1); i++) {
        const columnName = columns[i];
        const cell = tableElement.cell(rowIndex, i);

        const cellData = html_getCellDataFromTableRow(tableElement, cell, i);
        const textObject = html_createInputElement(cellData);

        cell.data(textObject.outerHTML);
      }
}

function html_createSaveButtonForTableRow(tableElement, columns, rowIndex, rowJson, tableName){
    console.log("entering html_createSaveButtonForTableRow");
    // Add a Save button to the end of the row
    const saveButton = document.createElement('button');
    saveButton.innerHTML = 'Save';
    html_setupOnClickForSaveButton(saveButton, tableElement, columns, rowIndex, rowJson, tableName);
    return saveButton;
}

function html_setupOnClickForSaveButton(saveButton, tableElement, currcolumns, rowIndex, rowJson, tableName){
    console.log("entering html_setupOnClickForSaveButton");
    saveButton.onclick = function () {
        // Build a JSON object of column names and input values
        const formData = {};
        for (let i = 0; i < (currcolumns.length-1); i++) {
          const columnName = currcolumns[i].title;
          const inputElement = tableElement.cell(rowIndex, i).node().querySelector('input');
          
          // we have to set the CELL back to the VALUE after , which removes the INPUT FIELD
          tableElement.cell(rowIndex, i).data(inputElement.value);
          // Somehow calling this re renders the DataTAble, reinsantiating row data in the process .
          //tableElement.cell(rowIndex, i).data('');
          formData[columnName] = inputElement.value;
        }
        const rowData = rowJson;
        action_updateTableRows(tableName, formData, rowData, rowIndex, tableElement);
      };
}

function html_createInputElement(textValue, cellData){
    console.log("entering html_createInputElement");
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = textValue;
    inputElement.setAttribute('value',textValue);
    return inputElement ;
}

function html_getCellDataFromTableRow(tableElement, cell, i){
    console.log("entering html_getCellDataFromTableRow");
    const rowData = tableElement.row(cell.index().row).data();
    const cellData = rowData[i];
    return cellData ;

}