


function SetDate(date)
{
  currentDate = date;

  var dateuid = DateUidString(currentDate);

  if (currentDate)
  {
    var element;
    
    element = document.getElementById("monthtitle");
    if (element)
    {
      element.innerHTML = GetMonth(currentDate)+" "+currentDate.getFullYear();
    }
    element = document.getElementById("dayofweek");
    if (element)
    {
      element.innerHTML = GetDayOfWeek(currentDate);
    }
    element = document.getElementById("datestr");
    if (element)
    {
      element.innerHTML = GetDate(currentDate)+" "+GetMonth(currentDate)+" "+GetYear(currentDate);
    }

    var daysinmonth = DaysInMonth(currentDate);
    var previousmonth = GoStepMonth(CloneDate(currentDate), -1);
    var daysinpreviousmonth = DaysInMonth(previousmonth);
    var nextmonth = GoStepMonth(CloneDate(currentDate), +1);
    var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0, 0);
    var firstdayinweek = firstDay.getDay()-1;
    if (firstdayinweek < 0) firstdayinweek+=7;


    var afterto = (35-daysinmonth-firstdayinweek);
    if (afterto<0)
    {
      afterto+=7;
    }

    RePopulateMonthView([daysinpreviousmonth-firstdayinweek+1, daysinpreviousmonth], [1,daysinmonth], [1,afterto]);


  }
}


var currentDate;

var prev_onload = window.onload;
window.onload = onloadThisScript;
function onloadThisScript()
{
  if (prev_onload)
  {
    prev_onload();
  }
  SetDate(TodayDate());
}

function GoStepMonth(date, step)
{
  var year  = date.getFullYear();
  var month = (date.getMonth() + step);
  while (month < 0)
  {
    year--;
    month += 12;
  }
  while (month > 11)
  {
    year++;
    month -= 12;
  }

  date.setFullYear(year);
  date.setMonth(month);
  return date;
}


function GoMonth(step)
{
  currentDate = GoStepMonth(currentDate, step);
  SetDate(currentDate);
}

function SetDayOfMonth(dayofmonth)
{
  currentDate.setDate(dayofmonth);
  SetDate(currentDate);
}


var weekday = 
[
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

var monthName = 
[
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];


/*
  Relevant getter methods from date:
    getDate()       day of month (1-31)
    getDay()        day of week (0-6)
    getFullYear()   year
    getMonth()      month 0-11
*/

function GetDayOfWeek(date)
{
  return weekday[date.getDay()];
}

function GetDate(date)
{
  return ""+date.getDate();
}

function GetMonth(date)
{
  return monthName[date.getMonth()];
}

function GetYear(date)
{
  return date.getFullYear();
}

function TodayDate()
{
  return new Date();
}

function CreateDate(year, month, day)
{
  return new Date(year, month, day, 0, 0, 0, 0);
}

function CloneDate(date)
{
  return new Date(date.getFullYear(),date.getMonth(),date.getDate(),0,0,0,0);
}

function DateUidString(date)
{
  return ""+date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
}

function RePopulateMonthView(pre, month, post)
{
  var innerHTML = "";
  var i;

  for (i=pre[0];i<=pre[1];i++)
  {
    innerHTML = innerHTML + "<li class='previousmonth unselectable'>"+i+"</li>";
  }

  var todatDate = GetDate(currentDate);
  for (i=month[0];i<=month[1];i++)
  {
    var activeStr = "";
    if (i == todatDate)
    {
      activeStr = " active ";
    }
    innerHTML = innerHTML + "<li class='thismonth unselectable "+activeStr+"' onclick='javascript:SetDayOfMonth("+i+");'>"+i+"</li>";
  }
  for (i=post[0];i<=post[1];i++)
  {
    innerHTML = innerHTML + "<li class='previousmonth'>"+i+"</li>";
  }

  var element = document.getElementById("days");
  if (element)
  {
    element.innerHTML = innerHTML;
  }
}




function DaysInMonth(date)
{
  var leapyear = ((date.getFullYear() % 4) == 0 ? 1 : 0);
  switch (date.getMonth())
  {
  case  0: return 31; // jan
  case  1: return 28+leapyear; // feb
  case  2: return 31; // mar
  case  3: return 30; // apr
  case  4: return 31; // may
  case  5: return 30; // jun
  case  6: return 31; // jul
  case  7: return 31; // aug
  case  8: return 30; // sep
  case  9: return 31; // oct
  case 10: return 30; // nov
  case 11: return 31; // dec
  }
}
