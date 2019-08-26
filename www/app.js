var databaseHandle = null;

var nextUser = 101;

function initDatabase() {
  window.jsonSQLiteEngine.openDatabaseHandle([':memory:'], function(x) {
    databaseHandle = x[0];
    window.jsonSQLiteEngine.jsonExecuteStatement([
      databaseHandle,
      JSON.stringify(
        [null, 'CREATE TABLE SampleTable (name, score)', 0, null])
    ]);
  });
}

function reload() {
  location.reload();
}

function stringTest1() {
  window.jsonSQLiteEngine.jsonExecuteStatement([
    databaseHandle,
    JSON.stringify(
      [null, "SELECT upper('Test string') AS upperText", 0, null])
  ], function(res) {
    var rs = JSON.parse(res);
    showMessage('received upperText result value (ALL CAPS): ' + rs[0].rows[0].upperText);
  }, function(error) {
    showMessage('SELECT value error: ' + error.message);
  });
}

function stringTest2() {
  window.jsonSQLiteEngine.jsonExecuteStatement([
    databaseHandle,
    JSON.stringify(
      [null, 'SELECT upper(?) AS upperText', 1, 'Test string', null])
  ], function(res) {
    var rs = JSON.parse(res);
    showMessage('received upperText result value (ALL CAPS): ' + rs[0].rows[0].upperText);
  }, function(error) {
    showMessage('SELECT value error: ' + error.message);
  });
}

function showCount() {
  window.jsonSQLiteEngine.jsonExecuteStatement([
    databaseHandle,
    JSON.stringify(
      [null, 'SELECT count(*) AS recordCount FROM SampleTable', 0, null])
  ], function(res) {
    var rs = JSON.parse(res);
    showMessage('RECORD COUNT: ' + rs[0].rows[0].recordCount);
  }, function(error) {
    showMessage('SELECT count error: ' + error.message);
  });
}

function addRecord() {
  window.jsonSQLiteEngine.jsonExecuteStatement([
    databaseHandle,
    JSON.stringify(
      [null, 'INSERT INTO SampleTable VALUES (?,?)', 2, 'User '+nextUser, nextUser, null])
  ], function(res) {
    showMessage('INSERT OK');
    ++nextUser;
  }, function(error) {
    showMessage('INSERT error: ' + error.message);
  });
}

function deleteRecords() {
  window.jsonSQLiteEngine.jsonExecuteStatement([
    databaseHandle,
    JSON.stringify(
      [null, 'DELETE FROM SampleTable', 0, null])
  ], function(res) {
    showMessage('DELETE OK');
  }, function(error) {
    showMessage('DELETE error: ' + error.message);
  });
}

function alertTest() {
  showMessage('Alert test message');
}

function goToPage2() {
  window.location = "page2.html";
}

function showMessage(message) {
  console.log(message);
  if (window.cordova.platformId === 'osx') window.alert(message);
  else navigator.notification.alert(message);
}

document.addEventListener('deviceready', function() {
  $('#alert-test').click(alertTest);

  $('#reload').click(reload);

  $('#string-test-1').click(stringTest1);
  $('#string-test-2').click(stringTest2);
  $('#show-count').click(showCount);
  $('#add-record').click(addRecord);
  $('#delete-records').click(deleteRecords);

  $('#location-page2').click(goToPage2);

  initDatabase();
});
