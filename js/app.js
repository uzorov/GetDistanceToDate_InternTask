let timerId;

$('#date').on("change", function() {

  $("#message_under_input_field").text("");
  clearTimeout(timerId);

   let todayMLS = Date.now();
  
   //alert($("#date").val());
   let tenYearsLaterDate = new Date();
   tenYearsLaterDate.setFullYear(tenYearsLaterDate.getFullYear() + 10);
   let typedMLS = Date.parse($("#date").val());
   //alert(typedMLS);

   let todayObject = new Date(todayMLS);
   let typedObject = new Date(typedMLS);
   //alert(typedObject.toString());
   typedObject.setHours(0);
   console.log(typedObject);
   console.log($("#date").val());

   if (typedMLS - todayMLS < 0) {
    $("#message_under_input_field").text("Введённая дата уже наступила!");
    $("#date_to_string").text("");
   } else

   if (tenYearsLaterDate - typedMLS < 0)
   {
    $("#message_under_input_field").text("Введённая дата не должна превышать: " + tenYearsLaterDate.toLocaleDateString("RU-ru") + "!");
    $("#date_to_string").text("");
   } else {

    if (typedObject == "Invalid Date")
    {
   
    $("#date_to_string").text("");
    $("#message_under_input_field").text("");
    
    }
    else
    {
      setInfoAboutDate(todayObject, typedObject);
      timerId = setInterval(setInfoAboutDate, 0, todayObject, typedObject);
  
  }
   }
  });


 function setInfoAboutDate(todayObject, typedObject) {
  $("#message_under_input_field").text("");
  $("#date_to_string").html("<h4>Описание даты \"" + typedObject.toLocaleDateString("RU-ru") + "\"</h4>" +
  "<i>Порядковый номер дня в году: </i><b>" + daysIntoYear(typedObject) + "</b>\n"+
  "<i>Порядковый номер недели в году: </i><b>" + weeksIntoYear(typedObject) + "</b>\n\n" + 
  "<i>До даты  </i><b>\"" + typedObject.toLocaleDateString("RU-ru") + "\"</b><i> осталось: </i><b>\n" + 
   "- " + getYearsDiff(todayObject, typedObject) + " лет" + "\n" +
   "- " + getDaysDiff(typedObject) + " дней" + "\n" +
   "- " + getHoursDiff(typedObject) + " часов" + "\n" +
   "- " + getMinutesDiff(typedObject) + " минут" + "\n" +
   "- " + getSecondsDiff(typedObject) + " секунд" + "</b>\n"
  );
 }

 function getYearsDiff(today, typed) {
  return (typed.getFullYear() - today.getFullYear()).toString();
 }

 function getDaysDiff(typed) {
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = typed.getTime() - Date.now();
  const diffInDays = Math.round(diffInTime / oneDay);
  return diffInDays.toString();
 }

 function getHoursDiff(typed) {
  const oneHour = 1000 * 60 * 60;
  const diffInTime = typed.getTime() - Date.now();
  const diffInHours = Math.round(diffInTime / oneHour);
  return diffInHours.toString();
 }

 function getMinutesDiff(typed) {
  const oneMinute = 1000 * 60;
  const diffInTime = typed.getTime() - Date.now();
  const diffInMinutes = Math.round(diffInTime / oneMinute);
  return diffInMinutes.toString();
 }

 function getSecondsDiff(typed) {
  const oneSecond = 1000;
  const diffInTime = typed.getTime() - Date.now();
  const diffInSeconds = Math.round(diffInTime / oneSecond);
  return diffInSeconds.toString();
 }


  function daysIntoYear(date) {
    return ((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000).toString();
}

function weeksIntoYear(date){
 // return (Math.ceil((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000 / 7)).toString();
  return date.iso8601Week().toString();
}

Date.prototype.iso8601Week = function () {
  // Create a copy of the current date, we don't want to mutate the original
  const date = new Date(this.getTime());

  // Find Thursday of this week starting on Monday
  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
  const thursday = date.getTime();

  // Find January 1st
  date.setMonth(0); // January
  date.setDate(1);  // 1st
  const jan1st = date.getTime();

  // Round the amount of days to compensate for daylight saving time
  const days = Math.round((thursday - jan1st) / 86400000); // 1 day = 86400000 ms
  return Math.floor(days / 7) + 1;
};