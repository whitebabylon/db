
function convertArrayToObject(arr2d){
    const obj = arr2d.reduce((acc, [table, field, value]) => {
      if (!acc[table]) {
        acc[table] = {};
      }
    
      acc[table][field] = value;
    
      return acc;
    }, {});
  
    return obj;
  }


  function util_transformJSONforHTML(rowJson){
    let rowJsonString = '';
    for (let i = 0; i < rowJson.length; i++) {
        if (rowJson[i] === "'") {
            rowJsonString += "\\'";
        } else if  (rowJson[i] === '"'){
            rowJsonString += '&quot;';
        } else {
            rowJsonString += rowJson[i];
        }
    }
    return rowJsonString;

  }

  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  function convertArrayStringToArray(string) {
    const array = JSON.parse(string);
    return array.join(',');
  }
  function convertArrayToString(arr) {
    console.log("")
    let str = '';
    for (let i = 0; i < arr.length; i++) {
      str += arr[i];
      if (i < arr.length - 1) {
        str += ',';
      }
    }
    return str;
  }


function showMessage(message) {
    const showMessageMessages = document.getElementsByClassName("alertMessages")[0].innerHTML = message ;
}

function showContainer(containerId) {
    const containers = document.querySelectorAll('.container_child');
    containers.forEach(container => {
      if (container.id === containerId) {
        container.style.display = 'block';
      } else {
        container.style.display = 'none';
      }
    });
  }