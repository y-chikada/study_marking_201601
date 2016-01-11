
$(document).ready(function() {

  var showOnloadMessage = function() {
  	// alert('読み込みました.');
  }

  var getCalenderObj = function(){

  }
  

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
  var nowDate = new Date(2015,1,29); // 指定日時テスト
  
  var nowYear = nowDate.getFullYear();
  var nowMonth = nowDate.getMonth();
  
  var dispMonth = (nowMonth +1)+'月';
  $('#calendar').before($('<h2>').text(dispMonth).addClass('text-center'));
 

  // 月末の日にちを取得
  var lastDate = new Date(nowYear, nowMonth+1, 0).getDate();

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
 var html = '';
  
  for(var i=1; i<=(lastDate/7+1); i++ )
  {
    html += '<tr>';
	
	for(var j=0; j<=6; j++)
	{
	 html += '<td>'+'<div class="date-cell"></div><div class="content-cell"></div>' +'</td>';
	
	}
        
   html += '</tr>';
     
  } 
  
  $('#calendar TBODY').append(html);
  
  var rowNum = 0;
  var num = 0; 

  $('#calendar td').each(function(){
	$(this).addClass(dayClass[num].className);
	
	if(num == 0)
	{
	 $(this).parent().addClass('row'+ rowNum);
	}

        if(num < 6){
        	num++;
	}
	else{
		num = 0;
		rowNum++;
	}
      
  });
  
  
　// 日付部の表示
  var targetDate = new Date(nowYear, nowMonth, 1);
  $('#calendar td').each(function(){
	
	var dayNum = targetDate.getDay();
	
	if($(this).index() == dayNum)
	{
		var setClassName = targetDate.getFullYear() + '-' + (targetDate.getMonth()+1) + '-' + targetDate.getDate();
		
		
		// message用に成形
		var mesMonth = targetDate.getMonth()+1;
		var mesDate = targetDate.getDate();
		
		if ((targetDate.getMonth()+1) < 10) {
		  mesMonth = '0' + (targetDate.getMonth()+1);
		}
		if (targetDate.getDate() < 10) {
		  mesDate = '0' + targetDate.getDate();
		}
		
		
		var setMessage = '「' +
				 targetDate.getFullYear() + '/' + 
				 mesMonth + '/' +
				 mesDate +
				 '(' + dayClass[dayNum].dayText + ')'
				 + ' がクリックされました。」';
		
		//日付入力、日付クラス設定、日付イベント
		$(this).children().eq(0)
		.text(targetDate.getDate())
		.addClass(setClassName)
		.on("click", function(eo){
				confirm(setMessage)
				});


		
		if(targetDate.getDate() != lastDate)
		{
			// 末日でなければ1日進める。
			targetDate.setDate( targetDate.getDate() + 1 );
		}
	}

  });

  // 本日を塗りつぶす
  var nowDateStr = nowDate.getFullYear() + '-' + 
		 (nowDate.getMonth()+1) + '-' + 
		 nowDate.getDate();

  $('.' +nowDateStr).each(function(){
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
