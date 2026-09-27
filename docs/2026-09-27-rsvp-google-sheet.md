# RSVP Google Sheet

The invitation site does not store replies. Each RSVP is sent to a script that lives inside one Google Sheet. This is not a second website or Vercel project.

Guests never sign in. You open the sheet to see who replied.

## 1. Create the sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a blank spreadsheet.
2. Name it something you will recognize, such as `Wedding RSVPs`.
3. Leave the first row empty. The script adds the headers `Name`, `Dinner`, `Ceremony`, and `Updated` the first time someone replies.

## 2. Paste the script

1. In the sheet, choose **Extensions → Apps Script**.
2. Replace the sample `Code.gs` contents with the script below.
3. Save.

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  var name = String(data.name || "").trim();
  var dinner = data.dinner === "yes" ? "yes" : "no";
  var ceremony = data.ceremony === "yes" ? "yes" : "no";

  if (!name) {
    return json({ ok: false });
  }

  var values = sheet.getDataRange().getValues();
  if (values.length === 0 || values[0][0] !== "Name") {
    sheet.appendRow(["Name", "Dinner", "Ceremony", "Updated"]);
    values = sheet.getDataRange().getValues();
  }

  var row = -1;
  for (var i = 1; i < values.length; i++) {
    if (values[i][0] === name) {
      row = i + 1;
    }
  }

  var updated = new Date();
  if (row === -1) {
    sheet.appendRow([name, dinner, ceremony, updated]);
  } else {
    sheet.getRange(row, 1, 1, 4).setValues([[name, dinner, ceremony, updated]]);
  }

  return json({ ok: true });
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}
```

A second reply from the same name updates that row instead of adding another one.

## 3. Publish the script

1. In Apps Script, choose **Deploy → New deployment**.
2. Click the gear and choose **Web app**.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone**. This lets the invitation call the script. Guests still do not see or sign in to Google.
5. Click **Deploy**, authorize the script when Google asks, and copy the web app URL.

That URL is the only thing the invitation needs. Deploying here does not create another hosted site.

If you change the script later, choose **Deploy → Manage deployments → Edit → New version**, then Deploy again. The URL stays the same.

## 4. Connect the invitation

Set `RSVP_SHEET_URL` to the web app URL. Do not commit it.

Locally, add it to `.env.local`:

```bash
RSVP_SHEET_URL="https://script.google.com/macros/s/…/exec"
```

Restart `npm run dev` after saving that file.

On the existing Vercel project:

```bash
printf "%s" "$RSVP_SHEET_URL" | npx vercel env add RSVP_SHEET_URL production --scope erics-projects-a7fce7ee
```

Redeploy production after the variable is set so the live site can send replies.
