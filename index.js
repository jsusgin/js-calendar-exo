import {
  format,
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  startOfToday,
} from 'date-fns';

const format_style = 'eeee dd MMMM yyyy';
const format_ = (date) => format(date, format_style);

const today = startOfToday();

function init() {
  console.log(format_(today));
  console.log(date_to_obj(today));
  console.log(format_(obj_to_date(date_to_obj(today))));
  console.log(getDaysInMonth(today));
  create_nav_buttons();
}

$(document).ready(init);

function date_to_obj(date) {
  return {
    day_week: getDay(date),
    day_month: getDate(date),
    month: getMonth(date),
    year: getYear(date),
  };
}

function obj_to_date(obj) {
  return new Date(obj.year, obj.month, obj.day_month);
}

function create_nav_buttons() {
  month = getMonth(today);
  console.log(month);
  $('#last_month').text(month);
}
