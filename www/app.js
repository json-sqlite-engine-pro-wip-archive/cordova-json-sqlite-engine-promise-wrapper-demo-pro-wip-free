var databaseConnection = null;

var nextUser = 101;

function initDatabase() {
  window.jsonSQLiteEngine.openDatabaseHandle([':memory:'], function(x) {
    var databaseHandle = x[0];
    databaseConnection =
      window.jsonSQLiteEnginePromiseWrapper.newDatabaseConnection(
        window.jsonSQLiteEngine, databaseHandle);
    databaseConnection.executeStatement(
      'CREATE TABLE SampleTable (name, score)');
  });
}

function reload() {
  location.reload();
}

function stringTest1() {
  databaseConnection.executeStatement(
    "SELECT upper('Test string') AS upperText")
    .then(function(rs) {
      showMessage(
        'received upperText result value (ALL CAPS): ' +
         rs[0].rows[0].upperText);
    })
    .catch(function(error) {
      showMessage('SELECT value error: ' + error.message);
    });
}

function stringTest2() {
  databaseConnection.executeStatement(
    'SELECT upper(?) AS upperText', ['Test string'])
    .then(function(rs) {
      showMessage('received upperText result value (ALL CAPS): ' + rs[0].rows[0].upperText);
    })
    .catch(function(error) {
      showMessage('SELECT value error: ' + error.message);
    });
}

function showCount() {
  databaseConnection.executeStatement(
    'SELECT count(*) AS recordCount FROM SampleTable')
    .then(function(rs) {
      showMessage('RECORD COUNT: ' + rs[0].rows[0].recordCount);
    })
    .catch(function(error) {
      showMessage('SELECT value error: ' + error.message);
    });
}

function addRecord() {
  databaseConnection.executeStatement(
    'INSERT INTO SampleTable VALUES (?,?)', ['User '+nextUser, nextUser])
    .then(function() {
      showMessage('INSERT OK');
      ++nextUser;
    })
    .catch(function(error) {
      showMessage('INSERT error: ' + error.message);
    });
}

function deleteRecords() {
  databaseConnection.executeStatement('DELETE FROM SampleTable')
    .then(function() {
      showMessage('DELETE OK');
    })
    .catch(function(error) {
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
