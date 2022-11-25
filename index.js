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
  display_month();
}

$(document).ready(init);

function display_month() {
  let month_arr = filter_by_days(get_days());
  display_week(month_arr[2]);
}

function display_week(week_arr) {
  console.log(week_arr.map((elt) => format_(elt)));
  let div_arr = week_arr.map(
    (elt) =>
      `<button value='${getDate(elt)}' class='day'> ${getDate(elt)} </button>`
  );
  console.log(div_arr);

  div_arr = div_arr.reduce(create_week_container);
  console.log(div_arr);

  let week = format(getDay(week_arr[0]), 'EEEE');

  $('section').html(`<div id=${week}> ${div_arr} </div>`);
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
