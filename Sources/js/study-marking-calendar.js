 // 定数
 const JAPANESE_MODE = 'Japanese'; //日本語モード
 const ENGLISH_MODE = 'English'; //英語モード

 // 月の英語表現
 const EN_MONTH_ARRAY = new Array(
     'Jan',
     'Feb',
     'Mar',
     'Apr',
     'May',
     'Jun',
     'Jul',
     'Aug',
     'Sep',
     'Oct',
     'Nov',
     'Dec'
 );
 // 日付部クリック時メッセージ
 const JA_DATE_CLICK_MES = 'がクリックされました。'; // 日本語
 const EN_DATE_CLICK_MES = 'was on clicked.'; // 英語

    var showOnloadMessage = function() {
        // alert('読み込みました.');
    }

 // 曜日表示の設定
 var dayClass = [];
 // 年月表示
 var dispMonth = '';
 // クリック時メッセージ
 var clickMessage = '';



 // 言語設定
 function setLangMode(langMode, targetDate) {
     var nowYear = targetDate.getFullYear();
     var nowMonth = targetDate.getMonth();

     switch (langMode) {
         case JAPANESE_MODE:
             // 日本語
             // 曜日設定
             dayClass = [{
                 className: 'fc-sun',
                 dayText: '日'
             }, {
                 className: 'fc-mon',
                 dayText: '月'
             }, {
                 className: 'fc-tue',
                 dayText: '火'
             }, {
                 className: 'fc-wed',
                 dayText: '水'
             }, {
                 className: 'fc-thu',
                 dayText: '木'
             }, {
                 className: 'fc-fri',
                 dayText: '金'
             }, {
                 className: 'fc-sat',
                 dayText: '土'
             }];

             // 年月表示
             dispMonth = nowYear + '年' + ' ' + (nowMonth + 1) + '月';

             // クリック時メッセージ
             clickMessage = JA_DATE_CLICK_MES;

             break;

         case ENGLISH_MODE:
             // 英語

             // 曜日設定
             dayClass = [{
                 className: 'fc-sun',
                 dayText: 'Sun'
             }, {
                 className: 'fc-mon',
                 dayText: 'Mon'
             }, {
                 className: 'fc-tue',
                 dayText: 'Tue'
             }, {
                 className: 'fc-wed',
                 dayText: 'Wed'
             }, {
                 className: 'fc-thu',
                 dayText: 'Thu'
             }, {
                 className: 'fc-fri',
                 dayText: 'Fri'
             }, {
                 className: 'fc-sat',
                 dayText: 'Sat'
             }];

             // 年月設定
             dispMonth = nowYear + ' ' + EN_MONTH_ARRAY[nowMonth];

             // クリック時メッセージ
             clickMessage = EN_DATE_CLICK_MES;

             break;
     }
 }



 $(document).ready(function() {

     var showOnloadMessage = function() {
         // alert('読み込みました.');
     }

     // 言語設定
     var langMode = JAPANESE_MODE; // 曜日表示言語


     // 現在日時を取得
     var nowDate = new Date();

     var nowYear = nowDate.getFullYear();
     var nowMonth = nowDate.getMonth();

     //言語毎の設定
     setLangMode(langMode, nowDate);
  // カレンダーテーブルに要素を追加 
  // カレンダーヘッダー（曜日ヘッダー）
  $('#calendar THEAD').append($('<TR>'));
  $(dayClass).each(function() {
    $('#calendar THEAD TR').append(
      $('<TH>').addClass(this.className).text(this.dayText)
    );
  });
     // 年月表示要素をカレンダー上部に追加
     $('#calendar').before($('<h2>').text(dispMonth).addClass('text-center'));

    // 月末の日を取得
    var lastDate = new Date(nowYear, nowMonth + 1, 0);
  var targetDate = new Date(nowYear, nowMonth, 1);
 // 日付部を構成するhtml要素を作成する
  var html = '';
    // カレンダーボディ
 // 月の最終日まで繰り返し
 while(targetDate.getMonth() == lastDate.getMonth() &&
	 targetDate.getDate() <= lastDate.getDate())
 {
	html += '<tr>';
	var targetDay = 0;
	
    // 1週間単位で繰り返し
 	while(targetDay <= 6)
	{
		var dateClass = '"' + 
				'date-cell' +
				' ' + dayClass[targetDay].className + 
				'"';

		//var setAtrName = '"' + 
		//		 targetDate.getFullYear() + '-' + 
		//		(targetDate.getMonth()+1) + '-' + 
		//		targetDate.getDate() + '"';
		
		var setAtrName = targetDate.toDateString(); 

		html += '<td>'+'<div class=' + dateClass + 'data-date=' + '"' + setAtrName + '"' + '>';
		
		var tmpDate = targetDate;
		
		// 日付部の設定
		if(targetDate.getDay()== targetDay)
		{
			if(targetDate.getMonth() == nowMonth)
			{
				// 当月のみ設定
				html += targetDate.getDate();
			}
			
			// 末日でなければ日付を進める
			targetDate.setDate( targetDate.getDate() + 1 );
		}
		
		html += '</div>'

		// 予定部の設定
		html += '<div class="content-cell">';
		
		html += '</div>'; 
		
		
		html += '</td>';
		
				
		// 曜日を進める
		targetDay++;
	}
	
	html += '</tr>';
	
}

     // html要素をカレンダーに追加
     $('#calendar TBODY').append(html);　

 // メッセージ表示イベントを設定
 $('.date-cell').each(function(){
	
	// 日付表示を右寄せ
	$(this).addClass('text-right');
	
	// 日付部にカーソルを合わせたとき、指マークが表示されるようにする。
	$(this).css('cursor', 'pointer');	
	
	$(this).on('click', function(ev){
		
		// clickした日付を取得
		var showDate = new Date(Date.parse(ev.currentTarget.dataset.date));
		
		// message用に成形
		var mesMonth = showDate.getMonth()+1;
		var mesDate = showDate.getDate();
		var mesDay = showDate.getDay();
		
		if ((showDate.getMonth()+1) < 10) {
		  mesMonth = '0' + (showDate.getMonth()+1);
		}
		if (showDate.getDate() < 10) {
		  mesDate = '0' + showDate.getDate();
		}
		
		// 選択言語によってメッセージを変更
        var setMessage = '「' +
            showDate.getFullYear() + '/' +
            mesMonth + '/' +
            mesDate +
            '(' + dayClass[mesDay].dayText + ')' + clickMessage + '」';

		// messageの表示
		confirm(setMessage);	
    });
 });
  // 本日を塗りつぶす
  var nowDateStr = nowDate.toDateString();  
  $('div[data-date=' + '"' + nowDateStr + '"' +']').each(function(){
	$(this).parent().addClass('warning');
  });

  // 土日の色を変える
  $('.' +dayClass[6].className).each(function(){
		$(this).addClass('text-info');
  });
 $('.' +dayClass[0].className).each(function(){
		$(this).addClass('text-danger');
  });
  
  // カレンダーを整える
  $('#calendar').css('table-layout', 'fixed');

  // ----- Initialize.  
  showOnloadMessage();
});