function readSheet() {
   var doc = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('sheet1')
   doc.clear();
  var conn = Jdbc.getConnection('jdbc:mysql://<yourAddress>:3306/test', { user: '<YourUserName>', password: '<YourPassword>' });
  if (!conn) {
    Logger.log('Connection error');
  }
    var stmt = conn.createStatement();
    var start = new Date();
    var resultSet = stmt.executeQuery("SELECT * from testPurpose");
    Logger.log(resultSet.getMetaData().getColumnCount())
    Logger.log(resultSet.getMetaData().getColumnName(1))

   

    var cell = doc.getRange(1, 1);
    Logger.log(cell)
    var row = 0;
    var getCount = resultSet.getMetaData().getColumnCount(); // Mysql table column name count.

    for (var i = 0; i < getCount; i++) {
      cell.offset(row, i).setValue(resultSet.getMetaData().getColumnName(i + 1)); // Mysql table column name will be fetch and added in spreadsheet.
    }

    var row = 1;
    while (resultSet.next()) {
      for (var col = 0; col < resultSet.getMetaData().getColumnCount(); col++) {
        cell.offset(row, col).setValue(resultSet.getString(col + 1)); // Mysql table column data will be fetch and added in spreadsheet.
      }
      row++;
    }

    resultSet.close();
    stmt.close();
    conn.close();
  

  var end = new Date();
  Logger.log('Time elapsed: ' + (end.getTime() - start.getTime()));
}

function writeSheet(){
    var conn = Jdbc.getConnection('jdbc:mysql://<yourAddress>:3306/test', { user: '<YourUserName>', password: '<YourPassword>' });
    if(!conn){
      Logger.log("Connection error");
    }
    var stmt = conn.createStatement();
    var start = new Date();
    var resultSet = stmt.executeUpdate("UPDATE testPurpose SET NumberOfSubscriber = '410493' WHERE id='3'");
    //maybe put function to update other sheet
    /**
     * Stupid function here
     */
    stmt.close();
    conn.close();
    var end = new Date();
    Logger.log('Time elapsed:' + (end.getTime() - start.getTime()));
}

function deleteSheet(){
  var conn = Jdbc.getConnection('jdbc:mysql://<yourAddress>:3306/test', { user: '<YourUserName>', password: '<YourPassword>' });
  if(!conn){
    Logger.log("Connection error");
  }
  var stmt = conn.createStatement();
  var start = new Date();
  var resultSet = stmt.executeUpdate("DELETE FROM testPurpose WHERE id='9'");
  stmt.close();
  var end = new Date();
  Logger.log('Time elapsed:' + (end.getTime() - start.getTime));
}

