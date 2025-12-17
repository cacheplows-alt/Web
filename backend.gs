/**
 * Google Apps Script to handle quote submissions from Cache Cow Snow Plows.
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste this code into Code.gs.
 * 4. Click Deploy > New Deployment.
 * 5. Select type: "Web app".
 * 6. Set "Execute as" to "Me".
 * 7. Set "Who has access" to "Anyone".
 * 8. Click Deploy and copy the Web App URL.
 * 9. Paste the URL into formatting logic in quote.html (line 88).
 */

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the JSON data sent from the frontend
    const data = JSON.parse(e.postData.contents);
    
    // Create headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Phone", "Address", "Service Type", "Size", "Details"]);
    }

    // Append the new quote request
    sheet.appendRow([
      new Date(),
      data.name,
      data.phone,
      data.address,
      data.serviceType,
      data.size,
      data.details
    ]);

    // Send Email Notification
    const recipient = Session.getActiveUser().getEmail(); // Sends to the owner of the script
    const subject = "NEW SNOW PLOW QUOTE: " + data.name;
    const body = `
      New Quote Request Received:
      
      Name: ${data.name}
      Phone: ${data.phone}
      Address: ${data.address}
      Service: ${data.serviceType}
      Size: ${data.size}
      Details: ${data.details}
      
      Timestamp: ${new Date().toString()}
    `;
    
    MailApp.sendEmail(recipient, subject, body);

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": e.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
