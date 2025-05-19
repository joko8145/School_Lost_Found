// --- 기본 설정 ---
var SPREADSHEET_ID = "1nrdJVkWkq16yVhfSd6tPC6ZdPODYFzSlrq8WZRc0rec"; // 실제 구글 시트 ID
var DATA_SHEET_NAME = "분실물_데이터베이스"; // 실제 데이터 시트 이름
var ITEMS_PER_PAGE = 9; // 한 페이지에 보여줄 아이템 수

// --- 웹 앱 진입 라우팅 ---
function doGet(e) {
  var template = HtmlService.createTemplateFromFile('index');
  template.scriptUrl = ScriptApp.getService().getUrl(); // 현재 웹 앱의 URL을 index.html에 전달

  // ▼▼▼ [다시 추가] register_page.html의 GitHub Pages URL을 전달합니다. ▼▼▼
  template.registerPageUrl = "https://joko8145.github.io/School_Lost_Found/apps-script-project/register_page.html";
  // ▲▲▲ 이 URL은 실제 호스팅된 register_page.html의 주소여야 합니다. ▲▲▲

  var htmlOutput = template.evaluate();
  htmlOutput.setTitle('학교 분실물 센터'); // 웹 페이지 제목 수정
  htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return htmlOutput;
}

// --- 시트 데이터 가져오기 (핵심 로직) ---
function getLostItemsData(searchQuery, pageNumber) {
  // ... (이전 답변의 getLostItemsData 함수 내용과 동일하게 유지) ...
  try {
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(DATA_SHEET_NAME);
    if (!sheet) {
      Logger.log("시트를 찾을 수 없습니다: " + DATA_SHEET_NAME + " (ID: " + SPREADSHEET_ID + ")");
      return { items: [], totalPages: 0, currentPage: 1, totalItems: 0, error: "데이터 시트를 찾을 수 없습니다. 관리자에게 문의하세요." };
    }
    var lastRow = sheet.getLastRow();
    if (lastRow < 2) {
      return { items: [], totalPages: 0, currentPage: 1, totalItems: 0 };
    }
    var dataRange = sheet.getRange(1, 1, lastRow, sheet.getLastColumn());
    var allValues = dataRange.getValues();
    var headers = allValues[0].map(function(header) { return String(header).trim(); });
    var allItems = [];
    for (var i = 1; i < allValues.length; i++) {
      var row = allValues[i];
      var item = {};
      var isEmptyRow = true;
      for (var j = 0; j < headers.length; j++) {
        var cellValue = row[j];
        if (cellValue !== "" && cellValue !== null && typeof cellValue !== 'undefined') {
            isEmptyRow = false;
        }
        if (cellValue instanceof Date) {
          item[headers[j]] = cellValue.toISOString();
        } else {
          item[headers[j]] = cellValue ? String(cellValue) : "";
        }
      }
      if (!isEmptyRow) {
          allItems.push(item);
      }
    }
    allItems.reverse();
    var filteredItems = allItems;
    if (searchQuery && String(searchQuery).trim() !== "") {
      searchQuery = String(searchQuery).toLowerCase();
      filteredItems = allItems.filter(function(item) {
        var searchFields = ['물품명', '카테고리', '특징', '발견장소', 'ID'];
        return searchFields.some(function(field) {
          return item[field] && String(item[field]).toLowerCase().includes(searchQuery);
        });
      });
    }
    pageNumber = parseInt(pageNumber) || 1;
    var startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
    var paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    var totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    if (totalPages === 0 && filteredItems.length > 0) totalPages = 1;
    return {
      items: paginatedItems,
      totalPages: totalPages,
      currentPage: pageNumber,
      totalItems: filteredItems.length
    };
  } catch (e) {
    Logger.log("getLostItemsData 오류: " + e.toString() + "\n스택: " + e.stack);
    return {
      items: [], totalPages: 0, currentPage: 1, totalItems: 0,
      error: "데이터를 가져오는 중 오류가 발생했습니다. (상세: " + e.message +")"
    };
  }
}