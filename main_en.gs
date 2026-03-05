/**
 * --------------------------------------------------------------------------
 * pmax-search-theme-monitor - Google Ads Script for SMBs
 * --------------------------------------------------------------------------
 * Author: Thibault Fayol - Consultant SEA PME
 * Website: https://thibaultfayol.com
 * License: MIT
 * --------------------------------------------------------------------------
 */

var CONFIG = {
  TEST_MODE: true,
  SPREADSHEET_URL: "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit",
  MIN_CLICKS: 5
};
function main() {
  if (CONFIG.SPREADSHEET_URL.indexOf("YOUR_SHEET_ID") !== -1) {
    Logger.log("Please enter a valid Google Sheet URL.");
    return;
  }
  Logger.log("Running PMax Search Categories Extraction...");
  var sheet = SpreadsheetApp.openByUrl(CONFIG.SPREADSHEET_URL).getActiveSheet();
  
  if (!CONFIG.TEST_MODE) { sheet.clearContents(); sheet.appendRow(["Category", "Campaign", "Clicks", "Conversions", "Cost"]); }
  
  var query = "SELECT campaign_search_term_insight.category_label, campaign.name, metrics.clicks, metrics.conversions, metrics.cost_micros " +
              "FROM campaign_search_term_insight " +
              "WHERE metrics.clicks > " + CONFIG.MIN_CLICKS + " AND segments.date DURING LAST_30_DAYS";
              
  var report = AdsApp.search(query);
  var rowCount = 0;
  while (report.hasNext()) {
      var row = report.next();
      var cost = (row.metrics.costMicros / 1000000).toFixed(2);
      if (!CONFIG.TEST_MODE) {
          sheet.appendRow([row.campaignSearchTermInsight.categoryLabel, row.campaign.name, row.metrics.clicks, row.metrics.conversions, cost]);
      }
      rowCount++;
  }
  Logger.log(rowCount + " categories found and mapped.");
}