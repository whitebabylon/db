function history_createDataTable() {
    // Get the HistoryClass div
    const historyDiv = document.querySelector('.HistoryClass');
  
    // Create a table element
    const table = document.createElement('table');
  
    // Create the table headers
    const headers = ['Data', 'Actions'];
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    table.id = "historyTable";
    // Create the table body
    const tbody = document.createElement('tbody');
    myTablesHistory.forEach(historyItem => {
      // Create a row for each history item
      const tr = document.createElement('tr');
  
      // Create the data cell with JSON stringified data
      const dataTd = document.createElement('td');
      dataTd.textContent = JSON.stringify(historyItem);
      tr.appendChild(dataTd);
  
      // Create the restore button cell
      const restoreTd = document.createElement('td');
      const restoreButton = document.createElement('button');
      restoreButton.textContent = 'Restore Data';
      restoreButton.addEventListener('click', () => {
        // Code to restore the data here
      });
      restoreTd.appendChild(restoreButton);
      tr.appendChild(restoreTd);
  
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
  
    // Add the table to the history div
    historyDiv.appendChild(table);
  
    // Initialize the DataTable
    $(table).DataTable();
  }


  function history_updateHistoryTable() {
    console.log("Updating history_updateHistoryTable");
    const tableData = myTablesHistory.map((record) => ({
      json: JSON.stringify(record),
      restore: '<button onclick="restoreRecord()">Restore Data</button>'
    }));
    console.log("tableData history_updateHistoryTable " + JSON.stringify(tableData));
    const table = $('#historyTable').DataTable({
      destroy: true,
      data: tableData,
      columns: [
        { title: 'JSON', data: 'json' },
        { title: 'Restore Data', data: 'restore' }
      ]
    });
  }
  
  function history_restoreRecord() {
    // Add your code to restore the data here
  }
  