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
  isSameDay,
} from 'date-fns';

const format_style = 'eeee dd MMMM yyyy';
const format_ = (date) => format(date, format_style);

const today = new Date();
var current = today;
var savedEvents = new Array(0);

$('nav button').on('click', change_current_month);

function init() {
  create_nav_buttons();
  display_month();

  $('#currentEventsDiv').hide();
  $('#addEventForm').hide();
  $('#addEventButton').on('click', showEventForm);
  $('#submitButton').on('click', addEvent);
  $('#cancelButton').on('click', cancelEventAdd);

  $('.day').on('click', change_current_day);
  $('.day').on('click', showCurrentEvents);

  console.log(format_(current));
}

$(document).ready(init);

function display_month() {
  $('section').empty();
  let month_arr = filter_by_days(get_days());
  Object.values(month_arr).map((elt) => display_week(elt));
  //console.log($('section'));
}

function change_current_day() {
  var obj = $(this);
  current = new Date(getYear(today), obj.attr('value'), obj[0].innerHTML);
  init();
}

function change_current_month() {
  var id_ = $(this).attr('id');
  current =
    id_ == 'last_month' ? addMonths(current, -1) : addMonths(current, 1);
  init();
}

function display_week(week_arr) {
  //console.log(week_arr.map((elt) => format_(elt)));
  let div_arr = week_arr.map(
    (elt) =>
      `<button value='${getMonth(elt)}' class='day'> ${getDate(elt)} </button>`
  );

  div_arr = div_arr.reduce(create_week_container);

  var day_week = format(week_arr[0], 'EEEE');

  $('section').append(`<div id=${day_week}> 
  <h3>${day_week}</h3> <div> ${div_arr} </div> </div>`);
}

function create_week_container(total, string_day) {
  return total + '\n' + string_day;
}

function filter_by_days(arr) {
  let all = {};
  for (let i = 0; i < 7; i++) {
    all[i] = arr.filter((elt) => getDay(elt) == i);
  }
  return all;
}

function change_current_day() {
  var obj = $(this);
  current = new Date(getYear(today), obj.attr('value'), obj[0].innerHTML);
  init();
}

function change_current_month() {
  var id_ = $(this).attr('id');
  current =
    id_ == 'last_month' ? addMonths(current, -1) : addMonths(current, 1);
  init();
}

function display_days() {
  let days_arr = get_days();
  //console.log(days_arr.map((elt) => format_(elt)));
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

function showCurrentEvents() {
  let currentEvents = [];
  for (let elt of savedEvents) {
    let presence = 0;
    for (let day of eachDayOfInterval({
      start: elt['startDate'],
      end: elt['endDate'],
    })) {
      if (isSameDay(current, day)) {
        presence = 1;
      }
    }
    if (presence == 1) {
      currentEvents.append(elt);
    }
  }
  for (let elt of currentEvents) {
    let newElt = $('<div>');
    newElt.addClass('eventDetails');
    newElt.innerHTML = '<span>' + elt[title] + '</span>';
    newElt.innerHTML += '<span>Début: ' + elt[startDate] + '</span>';
    newElt.innerHTML += '<span>Fin: ' + elt[endDate] + '</span>';
    newElt.innerHTML += '<span>Description: ' + elt[description] + '</span>';
    $('#currentEventsDiv').append(newElt);
  }
  $('#currentEventsDiv').show();
}

function isEventful(selectedDay) {
  let presence = false;
  for (let elt of savedEvents) {
    for (let day of eachDayOfInterval({
      start: elt['startDate'],
      end: elt['endDate'],
    })) {
      if (isSameDay(selectedDay, day)) {
        presence = true;
      }
    }
  }
  return presence;
}
