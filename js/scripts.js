// widget
var currPage = 10; //month
var year ;
var day;
var mos=['January','February','March','April','May','June','July','August','September','October','Novemeber','Decemeber'];
var i = 1900;
var html = "";

function getVal(e) {
     //lert(document.getElementById(e.id).value);
     day = document.getElementById(e.id).value;
     document.getElementById("waha").value = year +"/"+  (currPage + 1)  + "/" + day;
     $("#timer2").runner('stop');
     $("#timer4").runner('stop');
     $("#timer6").runner('stop');

}

function changeMonthText(i){
    $('#month').text(i.innerText);
    currPage = mos.indexOf(i.innerText);
    getDays(currPage);
}

function changeYearText(i){
    $('#year2').text(i.innerText);
    getDays(currPage);
}

$(document).ready(function(){
    for(var m=0; m<12; m++){
        html += "<li value='" + mos[m] + "'><a onclick='changeMonthText(this)' tabindex='-1' href=\"#\">" + mos[m] + "</a></li>"
    }
    $("#month-li").append(html);
    html = "";
    for(i=1900; i<2040; i += 10){
        html += "<li class='dropdown-submenu' value='" + i + "'><a onclick='changeYearText(this)' tabindex='-1' href='#'>" + i + "<span class='caret'></span></a>";
        html += "<div class=\"mini-zone\"></div>";
        html += "<ul class='dropdown-menu year-ul-2'>";
        for( var j=i; j<i+10; j++){
            html += "<li value='" + j + "'><a onclick='changeYearText(this)' href=\"#\">" + j + "</a></li>"
        }
        html += "</ul></li>"
    }
    $("#year-li").append(html);
    html = "";

    $("#waha").focus(function(){
            year = 2018;
            $('#year2').text("2018");
            getDays(10);
            $("#newdatepicker").css("display"," block");
        });
    $("#next-month").click(function(){
        if(currPage < 12){
            currPage =  currPage+1;
            getDays(currPage);
            // getDays(currPage);
        }
        if(currPage == 12){
            currPage = 0;
            getDays(currPage);
        }
    });
    $("#prev-month").click(function(){
            if(currPage > 0) {
                currPage =  currPage-1;
                getDays(currPage);
            }
            if(currPage == 0){
                currPage = 11;
                getDays(currPage);
            }
    });
    $("#next-y").click(function(){
        // $("#year").text(parseInt($("#year").text())+1);
        $('#year2').text(parseInt($("#year2").text())+1);
        getDays(currPage);
    });
    $("#prev-y").click(function(){
        // $("#year").text(parseInt($("#year").text())-1);
        $('#year2').text(parseInt($("#year2").text())-1);
        getDays(currPage);
    });


});
function getDays(month){
    $("#dt-able").empty();
    var day=['Sun', 'Mon', 'Tue', 'Wed' , 'Thu', 'Fri', 'Sat']
    year = parseInt($("#year2").text());

    // $("#month-title").html(mos[month]);
    $("#month").text(mos[month]);

    $("#dt-able").append('<tr>');
    for(i = 0; i < 7; i++) {
        $('#dt-able').append("<td id='dt-head'>"  + day[i] + "</td>");
    }

    $("#dt-able").append('</td>');

    var firstDay = new Date(year,month, 1);
    var lastDay = new Date(year, month+1, 0);
    var offset = firstDay.getDay();
    var dayCount = 1;
    for (i = 0; i < 5; i++){
        $('#dt-able').append("<tr id=row-"+ i +">");
        for(rw = 0; rw < 7; rw++ ){
            if(offset == 0){
                $('#' + "row-"+ i).append("<td  id='"  + "cell-" + dayCount+ "'>"
                 +   "<input type='button' id ='day_val" +dayCount +"'"+   " onclick='getVal(this)' value= '" +  dayCount + "' >"  + '</td>' );

                if(dayCount >= lastDay.getDate()) {
                    break;
                }
                dayCount++;
            }else{
                $('#' + "row-"+ i).append('<td>' +'</td>' );
                 offset--;
            }
        }
        $('#dt-able').append('</tr>');
    }
}



$(function() {
  if (!$.fn.bootstrapDP && $.fn.datepicker && $.fn.datepicker.noConflict) {
    var datepicker = $.fn.datepicker.noConflict();
    $.fn.bootstrapDP = datepicker;
  }
    $('#datepicker-old1').bootstrapDP();
    $('#datepicker-old2').bootstrapDP();
    $('#datepicker-old3').bootstrapDP();

    $("#unfinisheddatepicker").datepicker({
        changeMonth: true,
        changeYear: true
    });
});

function appendDatepicker(num){
    $("#input-area-" + parseInt(num)).append($(".single-datepicker-area"));
    resetAll();
}


// application
$('#timer1').runner();
$('#timer2').runner();
$('#timer3').runner();
$('#timer4').runner();
$('#timer5').runner();
$('#timer6').runner();
function startTimer(num){
    $("#timer" + num).runner('start');
}

function pauseTimer(num){
    $("#timer" + num).runner('stop');
}
// $("#waha").on("oninput onpropertychange", function () {
//      $("#timer2").runner('stop');
// });

function resetAll(){
    $('#timer1').runner('reset');
    $("#timer2").runner("reset");
    $('#timer3').runner('reset');
    $("#timer4").runner("reset");
    $('#timer5').runner('reset');
    $("#timer6").runner("reset");
    $('#timer1').runner('stop');
    $("#timer2").runner("stop");
    $('#timer3').runner('stop');
    $("#timer4").runner("stop");
    $('#timer5').runner('stop');
    $("#timer6").runner("stop");

    $('#datepicker-old1').val('');
    $('#datepicker-old2').val('');
    $('#datepicker-old3').val('');
    $("#waha").val('');
    $("#newdatepicker").css("display","none");
}
