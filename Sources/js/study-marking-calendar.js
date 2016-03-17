$(document).ready(function() {

    var showOnloadMessage = function() {
        // alert('読み込みました.');
    }


  // 曜日class-表示名 配列
  var dayClass = [
	{ className: 'fc-sun', dayText: 'Sun' },
	{ className: 'fc-mon', dayText: 'Mon' },
	{ className: 'fc-tue', dayText: 'Tue' },
	{ className: 'fc-wed', dayText: 'Wed' },
	{ className: 'fc-thu', dayText: 'Thu' },
	{ className: 'fc-fri', dayText: 'Fri' },
	{ className: 'fc-sat', dayText: 'Sat'}
  ];

    // 現在日時を取得
    var nowDate = new Date();

    var nowYear = nowDate.getFullYear();
    var nowMonth = nowDate.getMonth();
  // カレンダーテーブルに要素を追加 
  // カレンダーヘッダー（曜日ヘッダー）
  $('#calendar THEAD').append($('<TR>'));
  $(dayClass).each(function() {
    $('#calendar THEAD TR').append(
      $('<TH>').addClass(this.className).text(this.dayText)
    );
  });
    var dispMonth = nowYear + '年' + ' ' + (nowMonth + 1) + '月';
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
		
		
		var setMessage = '「' +
				 showDate.getFullYear() + '/' + 
				 mesMonth + '/' +
				 mesDate +
				 '(' + dayClass[mesDay].dayText + ')'
				 + ' がクリックされました。」';
		
		// messageの表示
		confirm(setMessage);

	});
 });


  // 本日を塗りつぶす
  var nowDateStr = nowDate.toDateString();

  $('div[data-date=' + '"' + nowDateStr + '"' +']').each(function(){
	$(this).parent().addClass('warning');
  });



 $('.' +dayClass[0].className).each(function(){
		$(this).addClass('text-danger');
  });
  
  // カレンダーを整える
  $('#calendar').css('table-layout', 'fixed');



  // ----- Initialize.

  showOnloadMessage();
});



    // ----- Initialize.

    showOnloadMessage();
});