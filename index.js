import {
  addDays,
  addWeeks,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDate,
  getDay,
  getDaysInMonth,
  getWeek,
  getMonth,
  getYear,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

const format_style = 'eeee dd MMMM yyyy';
const format_ = (date) => format(date, format_style);

const today = new Date();
var current = today;

function init() {
  create_nav_buttons();
  display_days();
  
  $("#currentEventsDiv").hide();
  $('#addEventForm').hide();
  $('#addEventButton').on('click', showEventForm);
  $('#submitButton').on('click', addEvent);
  $('#cancelButton').on('click', cancelEventAdd);
}

$(document).ready(init);

function display_days() {
  let days_arr = get_days();
  console.log(days_arr.map((elt) => format_(elt)));
}

function get_days() {
  var first_day = startOfMonth(current);
  var last_day = endOfMonth(current);
  var last_sunday = startOfWeek(first_day);
  var next_saturday = endOfWeek(last_day);

  const monthDays = eachDayOfInterval({
    start: last_sunday,
    end: next_saturday,
  });

  return monthDays;
}

function create_nav_buttons() {
  $('#last_month').text(format(addMonths(current, -1), 'MMMM'));
  $('#next_month').text(format(addMonths(current, +1), 'MMMM'));
  $('nav h2').text(format(current, 'MMMM'));
  $('nav h1').text(format_(current));
}

var savedEvents = [];

function addEvent(evt) {
  evt.preventDefault();

  let newEvent = {
    title: $('#title').val(),
    startDate: new Date($('#startDate').val()),
    endDate: new Date($('#endDate').val()),
    description: $('#description').val(),
  };
  if (newEvent['startDate'].getTime() <= newEvent['endDate'].getTime()) {
    savedEvents.push(newEvent);
  } else {
    window.alert('La date de fin doit arriver après la date de début');
  }
  localStorage.setItem('contactStorage', JSON.stringify(savedEvents));
  $('#addEventForm').hide();
}

function cancelEventAdd() {
  $('#title').val('');
  $('#startDate').val('');
  $('#endDate').val('');
  $('#description').val('');
  $('#addEventForm').hide();
}



function showEventForm() {
  $('#addEventForm').show();
}

function showCurrentEvents(selectedDay){
  let currentEvents=[];
  for (let elt of savedEvents){
    let presence=0;
    for (let day of eachDayOfInterval({start:elt['startDate'],end:elt['endDate']})){
      if (isSameDay(selectedDay,day)){
        presence=1;
      }
    }
    if (presence==1){
      currentEvents.append(elt);
    }
  }
  for (let elt of currentEvents){
    let newElt=$('<div>');
    newElt.addClass('eventDetails');
    newElt.innerHTML='<span>'+elt[title]+'</span>';
    newElt.innerHTML+='<span>Début: '+elt[startDate]+'</span>';
    newElt.innerHTML+='<span>Fin: '+elt[endDate]+'</span>';
    newElt.innerHTML+='<span>Description: '+elt[description]+'</span>';
    $("#currentEventsDiv").append(newElt);
  }
  $("#currentEventsDiv").show();
}