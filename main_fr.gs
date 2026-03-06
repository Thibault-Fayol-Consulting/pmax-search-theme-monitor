/**
 * --------------------------------------------------------------------------
 * pmax-search-theme-monitor - Google Ads Script for SMBs
 * --------------------------------------------------------------------------
 * Author: Thibault Fayol - Consultant SEA PME
 * Website: https://thibaultfayol.com
 * License: MIT
 * --------------------------------------------------------------------------
 */
var CONFIG = { TEST_MODE: true, SPREADSHEET_URL: "https://docs.google.com/..." };
function main() {
    Logger.log("Récupération des catégories PMax...");
    var query = "SELECT campaign_search_term_insight.category_label, metrics.clicks FROM campaign_search_term_insight WHERE metrics.clicks > 0";
    Logger.log("Pour utiliser ce script, ajoutez un lien Google Sheet dans CONFIG.");
}
