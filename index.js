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
