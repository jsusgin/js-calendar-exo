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
  console.log(format_(today));
  console.log(getDaysInMonth(today));
  console.log(getWeek(today));
  create_nav_buttons();
  display_days();
}

$(document).ready(init);

function display_days() {
  var first_day = startOfMonth(current);
  var last_day = endOfMonth(current);
  console.log(format_(first_day));
  console.log(format_(last_day));
  for (let w = getWeek(first_day); w <= getWeek(last_day); w++) {}
  var last_sunday = startOfWeek(first_day);
  console.log(format_(last_sunday));
  var next_saturday = endOfWeek(last_day);
  console.log(format_(next_saturday));

  const weekDays = eachDayOfInterval({
    start: startOfWeek(today),
    end: endOfWeek(today),
  });

  const monthDays = eachDayOfInterval({
    start: last_sunday,
    end: next_saturday,
  });

  console.log(weekDays.map((elt) => format_(elt)));
  console.log(monthDays.map((elt) => format_(elt)));
}

function create_nav_buttons() {
  $('#last_month').text(format(addMonths(current, -1), 'MMMM'));
  $('#next_month').text(format(addMonths(current, +1), 'MMMM'));
  $('nav h2').text(format(current, 'MMMM'));
  $('nav h1').text(format_(current));
}
