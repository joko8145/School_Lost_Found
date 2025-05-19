// --- 기본 설정 ---
var SPREADSHEET_ID = "1nrdJVkWkq16yVhfSd6tPC6ZdPODYFzSlrq8WZRc0rec"; // <<-- ❗️여기에 실제 구글 시트 ID를 입력하세요!
var DATA_SHEET_NAME = "분실물_데이터베이스"; // <<-- ❗️분실물 데이터가 있는 시트 이름을 입력하세요! (보통 '설문지 응답 시트 1' 등)
var ITEMS_PER_PAGE = 9; // 한 페이지에 보여줄 아이템 수 (3의 배수가 카드형 UI에 좋음)

// --- 웹 앱 진입 라우팅 ---
function doGet(e) {
  var page = e.parameter.page; // URL 파라미터 (예: ?page=register)

  // 만약 등록 페이지도 이 앱스 스크립트 URL로 관리하고 싶다면:
  if (page === 'register') {
    // 'register_page.html' 파일을 앱스 스크립트 프로젝트에 추가하고 아래 코드 주석 해제
    // var template = HtmlService.createTemplateFromFile('register_page');
    // template.scriptUrl = ScriptApp.getService().getUrl(); // 현재 앱 URL 전달 (목록보기 링크용)
    // template.googleFormUrl = "YOUR_GOOGLE_FORM_SHARE_LINK_HERE"; // 구글폼 URL 전달
    // return template.evaluate().setTitle('분실물 등록 안내').addMetaTag('viewport', 'width=device-width, initial-scale=1');
    // 지금은 register_page.html을 별도 호스팅한다고 가정하고, 이 로직은 사용하지 않음.
  }

  // 기본적으로 조회 페이지('index.html')를 렌더링
  var template = HtmlService.createTemplateFromFile('index');
  template.scriptUrl = ScriptApp.getService().getUrl(); // 웹 앱 URL을 HTML 템플릿에 전달 (페이징, 검색 등)
  template.registerPageUrl = "YOUR_REGISTER_PAGE_HOSTED_URL_HERE"; // 별도 호스팅된 등록 페이지 URL 전달
                                                              // 또는 위 if문과 연동하여 template.scriptUrl + "?page=register"
  var htmlOutput = template.evaluate();
  htmlOutput.setTitle('학교 분실물 조회');
  htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1'); // 모바일 뷰포트 최적화
  return htmlOutput;
}

// --- 시트 데이터 가져오기 (핵심 로직) ---
function getLostItemsData(searchQuery, pageNumber) {
  try {
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(DATA_SHEET_NAME);
    if (!sheet) {
      Logger.log("시트를 찾을 수 없습니다: " + DATA_SHEET_NAME + " (ID: " + SPREADSHEET_ID + ")");
      return { items: [], totalPages: 0, currentPage: 1, error: "데이터 시트를 찾을 수 없습니다." };
    }

    // 데이터 범위가 너무 크면 getValues()가 느릴 수 있으므로, 실제 데이터가 있는 범위만 가져오도록 개선 가능
    var lastRow = sheet.getLastRow();
    if (lastRow < 2) { // 헤더만 있거나 데이터 없음
      return { items: [], totalPages: 0, currentPage: 1, totalItems: 0 };
    }
    var dataRange = sheet.getRange(1, 1, lastRow, sheet.getLastColumn()); // 헤더 포함 전체 데이터
    var allValues = dataRange.getValues();

    var headers = allValues[0].map(function(header) { return String(header).trim(); }); // 헤더 공백 제거
    var allItems = [];

    // 두 번째 행부터 실제 데이터 처리
    for (var i = 1; i < allValues.length; i++) {
      var row = allValues[i];
      var item = {};
      var isEmptyRow = true; // 빈 행인지 체크
      for (var j = 0; j < headers.length; j++) {
        var cellValue = row[j];
        if (cellValue !== "" && cellValue !== null && typeof cellValue !== 'undefined') {
            isEmptyRow = false;
        }
        // 날짜/시간 데이터는 ISO 형식 문자열로 변환 (클라이언트에서 Date 객체로 파싱 용이)
        if (cellValue instanceof Date) {
          item[headers[j]] = cellValue.toISOString();
        } else {
          item[headers[j]] = cellValue ? String(cellValue) : ""; // 모든 값을 문자열로, 빈 값은 빈 문자열로
        }
      }
      if (!isEmptyRow) { // 내용이 있는 행만 추가
          allItems.push(item);
      }
    }

    // 최근 등록된 순서로 정렬 (Google Form 응답은 보통 위에서부터 쌓이므로, reverse)
    allItems.reverse();

    // 검색어 필터링 (대소문자 구분 없이 여러 필드에서 검색)
    var filteredItems = allItems;
    if (searchQuery && String(searchQuery).trim() !== "") {
      searchQuery = String(searchQuery).toLowerCase();
      filteredItems = allItems.filter(function(item) {
        // 검색 대상 필드 (시트의 실제 헤더 이름과 일치해야 함)
        var searchFields = ['물품명', '카테고리', '특징', '발견장소', 'ID']; // 'ID'는 보통 시트에 없지만 예시
        return searchFields.some(function(field) {
          return item[field] && String(item[field]).toLowerCase().includes(searchQuery);
        });
      });
    }

    // 페이징 처리
    pageNumber = parseInt(pageNumber) || 1;
    var startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
    var paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    var totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

    return {
      items: paginatedItems,
      totalPages: totalPages,
      currentPage: pageNumber,
      totalItems: filteredItems.length // 필터링된 전체 아이템 수
    };

  } catch (e) {
    Logger.log("getLostItemsData 오류: " + e.toString() + "\n스택: " + e.stack);
    // 사용자에게 보여줄 오류 메시지는 좀 더 일반적인 것으로
    return { items: [], totalPages: 0, currentPage: 1, error: "데이터를 가져오는 중 오류가 발생했습니다. 관리자에게 문의하세요. (세부사항: " + e.message +")" };
  }
}