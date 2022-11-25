import {
  addDays,
  addWeeks,
  addMonths,
  format,
  getDate,
  getDay,
  getDaysInMonth,
  getWeek,
  getMonth,
  getYear,
  startOfToday,
} from 'date-fns';

const format_style = 'eeee dd MMMM yyyy';
const format_ = (date) => format(date, format_style);

const today = startOfToday();
var current_date = today;

function init() {
  console.log(format_(today));
  console.log(getDaysInMonth(today));
  console.log(getWeek(today));
  create_nav_buttons();
  display_days();
}

$(document).ready(init);

function display_days() {
  var length = getDaysInMonth(current_date);
  var first_day = new Date(getYear(current_date), getMonth(current_date), 1);
  var last_day = new Date(getYear(current_date), getMonth(current_date), length);
  console.log(format_(first_day));
  console.log(format_(last_day));
  console.log(getWeek(first_day));
  console.log(getWeek(last_day));
  for (let w=getWeek(first_day);w<=getWeek(last_day);w++) {

  }
  find_last_sunday(first_day);
}

function create_nav_buttons() {
  $('#last_month').text(format(addMonths(current_date, -1), 'MMMM'));
  $('#next_month').text(format(addMonths(current_date, +1), 'MMMM'));
  $('nav h2').text(format(current_date, "MMMM"));
  $('nav h1').text(format_(current_date));
}

function find_last_sunday(date) {
  console.log(format_(date), getDay(date));
  while (getDay(date) != 0) {
    date = addDays(date, -1);
    console.log(format_(date));
  }
}