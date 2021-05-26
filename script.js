/* Łukasz Budziak 16.10.2018
	script.js */

// konwersje
function convert(n)
{
	if(n < 10) return "0" + n;
	return n;
}

function convMonth(month)
{
	var monthName = "";
	switch(month)
	{
		case 0: monthName = "Styczeń"; break;
		case 1: monthName = "Luty"; break;
		case 2: monthName = "Marzec"; break;
		case 3: monthName = "Kwiecień"; break;
		case 4: monthName = "Maj"; break;
		case 5: monthName = "Czerwiec"; break;
		case 6: monthName = "Lipiec"; break;
		case 7: monthName = "Sierpień"; break;
		case 8: monthName = "Wrzesień"; break;
		case 9: monthName = "Październik"; break;
		case 10: monthName = "Listopad"; break;
		case 11: monthName = "Grudzień"; break;
	}
	return monthName;
}

// zegarek
function timer()
{
	var date, weekDay, day, month, year, hour, minute, second;
	date = new Date();
	weekDay = date.getDay();
	day = date.getDate();
	month = date.getMonth();
	year = date.getFullYear();
	hour = date.getHours();
	minute = date.getMinutes();
	second = date.getSeconds();
	switch(weekDay)
	{
		case 0: weekDay = "niedziela"; break;
		case 1: weekDay = "poniedziałek"; break;
		case 2: weekDay = "wtorek"; break;
		case 3: weekDay = "środa"; break;
		case 4: weekDay = "czwartek"; break;
		case 5: weekDay = "piątek"; break;
		case 6: weekDay = "sobota"; break;
	}
	switch(month)
	{
		case 0: month = "stycznia"; break;
		case 1: month = "luty"; break;
		case 2: month = "marca"; break;
		case 3: month = "kwietnia"; break;
		case 4: month = "maja"; break;
		case 5: month = "czerwca"; break;
		case 6: month = "lipca"; break;
		case 7: month = "sierpnia"; break;
		case 8: month = "września"; break;
		case 9: month = "października"; break;
		case 10: month = "listopada"; break;
		case 11: month = "grudnia"; break;
	}
	if(day < 10) day = "0" + day;
	if(hour < 10) hour = "0" + hour;
	if(minute < 10) minute = "0" + minute;
	if(second < 10) second = "0" + second;
	document.getElementById("watch").innerHTML = "Dzisiaj jest " + weekDay + " " + day + " " + month + " " + year + " roku<br>Aktualna godzina to " + hour + ":" + minute + ":" + second + "<br>";
	setTimeout("timer()", 1000);
}

// pobieranie daty
function getDate(year, month, day)
{
	var date;
	if(year == 0 && month == 0 && day == 0) date = new Date();
	else date = new Date(year, month, day);
	document.getElementById("monthSelector").value = date.getMonth();
	document.getElementById("yearSelector").value = date.getFullYear();
	calendar(date);
}

// algorytm na wielkanoc
function easterDate(r, month, day)
{
	var mi, dz;
    if(r==1981||r==2076||r==2133)
    {
        dz=19;
        mi=4;
    }
    else if(r==1954||r==2049||r==2106)
    {
        dz=18;
        mi=4;
    }
    else
    {
        var wa,wb;
        if(r>=1800&&r<1900)
        {
            wa=23;
            wb=4;
        }
        else if(r>=1900&&r<2100)
        {
            wa=24;
            wb=5;
        }
        else if(r>=2100&&r<2200)
        {
            wa=24;
            wb=6;
        }
        var a=r%19;
        var b=r%4;
        var c=r%7;
        a=a*19+wa;
        var d=a%30;
        a/=30;
        var e=(2*b+4*c+6*d+wb)%7;
        if(d+e<10)
        {
            dz=d+e+22;
            mi=3;
        }
        else
        {
            dz=d+e-9;
            mi=4;
        }
    }
    if(mi - 1 == month && dz == day) return 1;
	if(mi - 1 == month && dz + 1 == day) return 2;
	return 0;
}

// święta
const t = [
		['Nowy Rok', 0, 1],
		['Święto Trzech Króli', 0, 6],
		['Święto Pracy', 4, 1],
		['Święto Narodowe Trzeciego Maja', 4, 3],
		['Wniebowzięcie Najświętszej Marii Panny', 7, 15],
		['Wszystkich Świętych', 10, 1],
		['Narodowe Święto Niepodległości', 10, 11],
		['Wigilia', 11, 24],
		['Pierwszy Dzień Bożego Narodzenia', 11, 25],
		['Drugi Dzień Bożego Narodzenia', 11, 26],
	];
	
function holidayList(year, month)
{
	for(var i = 0; i < t.length; ++i)
	{
		if(t[i][1] == month)
		{
			document.getElementById("holidays").innerHTML += convert(t[i][2]) + '.' + convert(t[i][1] + 1) + ' - ' + t[i][0] + '<br>';
		}
	}
	for(var i = 1; i <= 31; ++i)
	{
		if(easterDate(year, month, i) == 1)
		{
			document.getElementById("holidays").innerHTML += convert(i) + '.' + convert(month + 1) + ' - ' + 'Pierwszy Dzień Wielkiej Nocy' + '<br>';
		}
		if(easterDate(year, month, i) == 2)
		{
			document.getElementById("holidays").innerHTML += convert(i) + '.' + convert(month + 1) + ' - ' + 'Drugi Dzień Wielkiej Nocy' + '<br>';
		}
	}
}

function holidays(year, month, day)
{
	if(easterDate(year, month, day) == 1 || easterDate(year, month, day) == 2 ||  easterDate(year, month, day + 1) == 2) return true;
	for(var i = 0; i < t.length; ++i)
	{
		if(t[i][1] == month && t[i][2] == day) return true;
	}
	return false;
}

function holiday()
{
	var date, day, month, year;
	date = new Date();
	year = date.getFullYear();
	month = date.getMonth();
	day = date.getDate();
	for(var i = 0; i < t.length; ++i)
	{
		if(t[i][1] == month && t[i][2] == day)
		{
			document.getElementById("holiday").innerHTML += 'Dzisiaj jest: ' + t[i][0] + '<br>';
		}
	}
	if(easterDate(year, month, day) == 1)
	{
		document.getElementById("holiday").innerHTML = 'Dzisiaj jest: Pierwszy Dzień Wielkiej Nocy <br>';
	}
	if(easterDate(year, month, day) == 2)
	{
		document.getElementById("holiday").innerHTML = 'Dzisiaj jest: Drugi Dzień Wielkiej Nocy <br>';
	}
}

// listy rozwijane
function selectors()
{
	var date = new Date();
	for(var i = 0; i <= 11; ++i)
	{
		if(date.getMonth() == i) document.getElementById("monthSelector").innerHTML += '<option value="' + i + '" selected="selected">' + convMonth(i) + '</option>';
		else document.getElementById("monthSelector").innerHTML += '<option value="' + i + '">' + convMonth(i) + '</option>';
	}
	for(var i = 1900; i <= 2100; ++i)
	{
		if(date.getFullYear() == i) document.getElementById("yearSelector").innerHTML += '<option value="' + i + '" selected="selected">' + i + '</option>';
		else document.getElementById("yearSelector").innerHTML += '<option value="' + i + '">' + i + '</option>';
	}
}

function proceed()
{
	var e = document.getElementById("yearSelector");
	var y = e.options[e.selectedIndex].value;
	e = document.getElementById("monthSelector");
	var m = e.options[e.selectedIndex].value;
	clear();
	var date = new Date();
	getDate(y, m, date.getDate());
}

// kalendarz funkcje główne
var day, month, year;
function calendar(data, b)
{
	var date, thisMonthLastDay, prevMonthLastDay, thisMonthFirstDay, monthName;
	for(var j = 0; j <= 2; ++j)
	{
		if(j == 0) ID = "prevMonth";
		else if(j == 1) ID = "month";
		else ID = "pastMonth";
		date = data;
		day = date.getDate();
		month = date.getMonth() - 1 + j;
		year = date.getFullYear();
		if(month < 0)
		{
			year --;
			month = 11;
		}
		if(month > 11)
		{
			year ++;
			month = 0;
		}
		if(j == 1) holidayList(year, month);
		date = new Date(year, month + 1, 0);
		thisMonthLastDay = date.getDate();
		date = new Date(year, month, 1);
		thisMonthFirstDay = date.getDay();
		date = new Date(year, month, 0);
		prevMonthLastDay = date.getDate();
		date = new Date();
		if(thisMonthFirstDay == 0) thisMonthFirstDay = 7;
		monthName = convMonth(month);
		document.getElementById(ID+"Name").innerHTML = monthName + "<hr>";
		var n = 1;
		for(var i = prevMonthLastDay - thisMonthFirstDay + 2; i <= prevMonthLastDay; ++i)
		{
			document.getElementById(ID).innerHTML += '<div class = "day" id = "pastMonthDay">' + i + '</div>';
			if(n % 7 == 0) document.getElementById(ID).innerHTML += '<div style = "clear: both"></div>';
			++n;
		}
		for(var i = 1; i <= thisMonthLastDay; ++i)
		{
			if(i == day && month == date.getMonth() && year == date.getFullYear() && (n % 7 == 0 || (n + 1) % 7 == 0)) document.getElementById(ID).innerHTML += '<div class = "day" id = "thisAndWeekDay">' + i + '</div>';
			else if(holidays(year, month, i) && (n % 7 == 0 || (n + 1) % 7 == 0)) document.getElementById(ID).innerHTML += '<div class = "day" id = "holyAndWeekDay">' + i + '</div>';
			else if(i == day && month == date.getMonth() && year == date.getFullYear()) document.getElementById(ID).innerHTML += '<div class = "day" id = "thisDay">' + i + '</div>';
			else if(n % 7 == 0 || (n + 1) % 7 == 0) document.getElementById(ID).innerHTML += '<div class = "day" id = "weekDay">' + i + '</div>';
			else if(holidays(year, month, i)) document.getElementById(ID).innerHTML += '<div class = "day" id = "holiday">' + i + '</div>';
			else document.getElementById(ID).innerHTML += '<div class = "day" id = "monthDay">' + i + '</div>';
			if(n % 7 == 0) document.getElementById(ID).innerHTML += '<div style = "clear: both"></div>';
			++n;
		}
		for(var i = 1; i <= 14; ++i)
		{
			document.getElementById(ID).innerHTML += '<div class = "day" id = "pastMonthDay">' + i + '</div>';
			if(n == 42) break;
			++n;
		}
	}
	date = data;
	day = date.getDate();
	month = date.getMonth();
	year = date.getFullYear();
	document.getElementById("date").innerHTML = convMonth(month) + ' ' + year;
}

function clear()
{
	document.getElementById("pastMonth").innerHTML = '<div id="pastMonthName"></div>';
	document.getElementById("month").innerHTML = '<div id="monthName"></div>';
	document.getElementById("prevMonth").innerHTML = '<div id="prevMonthName"></div>';
	document.getElementById("holidays").innerHTML = '';
}

function nextMonth()
{
	month++;
	clear();
	getDate(year, month, day);
}

function lastMonth()
{
	month--;
	clear();
	getDate(year, month, day);
}

function currentDate()
{
	var date = new Date();
	clear();
	getDate(date.getFullYear(), date.getMonth(), date.getDate());
}