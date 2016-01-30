
$(document).ready(function() {

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
  
  var dispMonth = nowYear + '年' + ' ' + (nowMonth +1)+'月';
  $('#calendar').before($('<h2>').text(dispMonth).addClass('text-center'));
 

  // 月末の日を取得
  var lastDate = new Date(nowYear, nowMonth+1, 0);

  // カレンダーテーブルに要素を追加 
  // カレンダーヘッダー
  $('#calendar THEAD').append(
    $('<tr>').append(
      $('<th>').addClass(dayClass[0].className).text(dayClass[0].dayText),
      $('<th>').addClass(dayClass[1].className).text(dayClass[1].dayText),
      $('<th>').addClass(dayClass[2].className).text(dayClass[2].dayText),
      $('<th>').addClass(dayClass[3].className).text(dayClass[3].dayText),
      $('<th>').addClass(dayClass[4].className).text(dayClass[4].dayText),
      $('<th>').addClass(dayClass[5].className).text(dayClass[5].dayText),
      $('<th>').addClass(dayClass[6].className).text(dayClass[6].dayText)
    )
  );

 // カレンダーボディ

 var targetDate = new Date(nowYear, nowMonth, 1);

 var html = '';

 while(targetDate.getMonth() == lastDate.getMonth() &&
	 targetDate.getDate() <= lastDate.getDate())
 {
	html += '<tr>';
	var targetDay = 0;
	
 	while(targetDay <= 6)
	{
		var dateClass = '"' + 
				"date-cell" +
				" " + dayClass[targetDay].className + 
				'"';

		var setAtrName = '"' + 
				 targetDate.getFullYear() + '-' + 
				(targetDate.getMonth()+1) + '-' + 
				targetDate.getDate() + '"';
		
		html += '<td>'+'<div class=' + dateClass + 'data-date=' + setAtrName + '>';
		
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
	
	$(this).on("click", function(ev){
		
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
  var nowDateStr = '"' + nowDate.getFullYear() + '-' + 
		 (nowDate.getMonth()+1) + '-' + 
		 nowDate.getDate() + '"';

  $('div[data-date=' + nowDateStr +']').each(function(){
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
	
});
