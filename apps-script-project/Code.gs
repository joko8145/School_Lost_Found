// --- 기본 설정 ---
var SPREADSHEET_ID = "1nrdJVkWkq16yVhfSd6tPC6ZdPODYFzSlrq8WZRc0rec"; // <<-- ❗️여기에 실제 구글 시트 ID를 입력하세요!
var DATA_SHEET_NAME = "분실물_데이터베이스"; // <<-- ❗️분실물 데이터가 있는 시트 이름을 입력하세요! (예: '설문지 응답 시트 1')
var ITEMS_PER_PAGE = 9; // 한 페이지에 보여줄 아이템 수

// --- 웹 앱 진입 라우팅 ---
function doGet(e) {
  var pageParameter = ""; // page 파라미터 값을 저장할 변수, 기본값은 빈 문자열

  // e 객체와 e.parameter, 그리고 e.parameter.page가 존재하는지 안전하게 확인합니다.
  // Apps Script 편집기에서 직접 실행하면 e 또는 e.parameter가 undefined일 수 있습니다.
  if (e && e.parameter && typeof e.parameter.page !== 'undefined') {
    pageParameter = e.parameter.page;
  }

  // 만약 URL에 "?page=register"와 같이 'register' 파라미터가 있다면
  // 'register_page.html'을 앱스 스크립트 프로젝트 내에 만들고 아래 코드를 사용할 수 있습니다.
  // (현재는 register_page.html을 외부 GitHub Pages로 호스팅한다고 가정합니다)
  if (pageParameter === 'register') {
    // var template = HtmlService.createTemplateFromFile('register_page_apps_script'); // 앱스 스크립트 내 html 파일 이름
    // template.scriptUrl = ScriptApp.getService().getUrl();
    // template.googleFormUrl = "YOUR_GOOGLE_FORM_SHARE_LINK_HERE"; // 실제 구글폼 URL
    // return template.evaluate().setTitle('분실물 등록 안내').addMetaTag('viewport', 'width=device-width, initial-scale=1');
    // 위 주석 처리된 부분은 register_page.html을 앱스 스크립트 내부에서 관리할 경우 사용합니다.
    // 지금은 외부 호스팅된 페이지로 안내하므로, 이 if 블록은 특별한 동작을 하지 않습니다.
    // 사용자가 .../exec?page=register 로 접속해도 기본 조회 페이지(index.html)가 보입니다.
  }

  // 기본적으로 조회 페이지('index.html')를 렌더링합니다.
  var template = HtmlService.createTemplateFromFile('index');
  template.scriptUrl = ScriptApp.getService().getUrl(); // 현재 웹 앱의 URL을 index.html에 전달

  // ❗️❗️❗️ [ 매우 중요 ] ❗️❗️❗️
  // 여기에 실제 register_page.html이 호스팅된 GitHub Pages URL을 정확하게 입력해야 합니다.
  // 예시: "https://joko8145.github.io/School_Lost_Found/register_page.html"
  // 또는 "https://joko8145.github.io/School_Lost_Found/apps-script-project/register_page.html" (파일 위치에 따라 다름)
  template.registerPageUrl = "https://joko8145.github.io/School_Lost_Found/apps-script-project/register_page.html";

  var htmlOutput = template.evaluate();
  htmlOutput.setTitle('학교 분실물 조회');
  htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return htmlOutput;
}

// --- 시트 데이터 가져오기 (핵심 로직) ---
function getLostItemsData(searchQuery, pageNumber) {
  try {
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(DATA_SHEET_NAME);
    if (!sheet) {
      Logger.log("시트를 찾을 수 없습니다: " + DATA_SHEET_NAME + " (ID: " + SPREADSHEET_ID + ")");
      return { items: [], totalPages: 0, currentPage: 1, error: "데이터 시트를 찾을 수 없습니다. 관리자에게 문의하세요." };
    }

    var lastRow = sheet.getLastRow();
    if (lastRow < 2) { // 헤더만 있거나 데이터가 없는 경우
      return { items: [], totalPages: 0, currentPage: 1, totalItems: 0 };
    }
    // 헤더를 포함하여 실제 데이터가 있는 마지막 행까지만 범위를 가져옵니다.
    var dataRange = sheet.getRange(1, 1, lastRow, sheet.getLastColumn());
    var allValues = dataRange.getValues();

    // 헤더의 앞뒤 공백을 제거하여 정확한 키로 사용합니다.
    var headers = allValues[0].map(function(header) { return String(header).trim(); });
    var allItems = [];

    // 두 번째 행부터 실제 데이터 처리 (i는 1부터 시작)
    for (var i = 1; i < allValues.length; i++) {
      var row = allValues[i];
      var item = {};
      var isEmptyRow = true; // 행 전체가 비어있는지 확인하기 위한 플래그

      for (var j = 0; j < headers.length; j++) {
        var cellValue = row[j];
        // 셀 값이 비어있지 않은 경우 isEmptyRow 플래그를 false로 설정
        if (cellValue !== "" && cellValue !== null && typeof cellValue !== 'undefined') {
            isEmptyRow = false;
        }
        // 날짜/시간 데이터는 ISO 형식 문자열로 변환 (클라이언트에서 Date 객체로 파싱 용이)
        if (cellValue instanceof Date) {
          item[headers[j]] = cellValue.toISOString();
        } else {
          // 셀 값이 존재하면 문자열로, 없으면 빈 문자열로 통일
          item[headers[j]] = cellValue ? String(cellValue) : "";
        }
      }
      // 내용이 있는 행만 allItems 배열에 추가
      if (!isEmptyRow) {
          allItems.push(item);
      }
    }

    // 최근 등록된 순서로 정렬 (Google Form 응답은 보통 위에서부터 쌓이므로, reverse)
    allItems.reverse();

    // 검색어 필터링
    var filteredItems = allItems;
    if (searchQuery && String(searchQuery).trim() !== "") {
      searchQuery = String(searchQuery).toLowerCase(); // 검색어 소문자 변환
      filteredItems = allItems.filter(function(item) {
        // 검색 대상 필드 (Google Sheets의 실제 헤더 이름과 정확히 일치해야 함)
        var searchFields = ['물품명', '카테고리', '특징', '발견장소']; // 'ID'는 시트에 있다면 추가 가능
        return searchFields.some(function(field) {
          // 해당 필드가 item 객체에 존재하고, 그 값이 검색어를 포함하는지 확인
          return item[field] && String(item[field]).toLowerCase().includes(searchQuery);
        });
      });
    }

    // 페이징 처리
    pageNumber = parseInt(pageNumber) || 1; // pageNumber가 없거나 유효하지 않으면 1로 설정
    var startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
    var paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    var totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

    return {
      items: paginatedItems,
      totalPages: totalPages,
      currentPage: pageNumber,
      totalItems: filteredItems.length // 필터링된 아이템의 총 개수
    };

  } catch (e) {
    // 오류 발생 시 로그를 남기고, 사용자에게는 일반적인 오류 메시지를 전달
    Logger.log("getLostItemsData 오류: " + e.toString() + "\n스택: " + e.stack);
    return {
      items: [],
      totalPages: 0,
      currentPage: 1,
      error: "데이터를 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 관리자에게 문의하세요. (오류 상세: " + e.message +")"
    };
  }
}
