
   // Save myTables array to localStorage
   function operation_saveTables() {
        localStorage.setItem("myTables", JSON.stringify(myTables));
        showMessage("Tables saved to localStorage");

        loadTables() 
  }

  function operation_deleteTables() {
    localStorage.removeItem("myTables");
  }

   // Load myTables array from localStorage
   function operation_loadTables() {
    const tables = JSON.parse(localStorage.getItem("myTables"));
    if (tables) {
      myTables.splice(0, myTables.length, ...tables);
      showMessage("Tables loaded from localStorage");
      logJson(myTables);
      // Populate table select dropdowns with all available table names
      //populateTablesDropdown();
      action_setTableDropdown();
    } else {
      showMessage("No tables found in localStorage");
    }
  }
