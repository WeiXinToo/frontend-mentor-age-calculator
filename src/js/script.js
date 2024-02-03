"use strict";

/* || Current Date*/
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth(); // month is zero-indexed, starting from 0.
const currentYear = today.getFullYear();

/* || Element*/

// Form
const form = document.querySelector('.js-form');

// Label
const dayLabel = document.querySelector('.js-day-input-label');
const monthLabel = document.querySelector('.js-month-input-label');
const yearLabel = document.querySelector('.js-year-input-label');

//Input
const dayInput = document.querySelector('.js-day-input');
const monthInput = document.querySelector('.js-month-input');
const yearInput = document.querySelector('.js-year-input');

//Error
const dayError = document.querySelector('.js-error-day');
const monthError = document.querySelector('.js-error-month');
const yearError = document.querySelector('.js-error-year');

// Output
const yearOutput = document.querySelector('.js-year-output');
const monthOutput = document.querySelector('.js-month-output');
const dayOutput = document.querySelector('.js-day-output');

/* || Form Validation
ValidateDay
* param: day (dayInputValue - type: Number), birthDate (date object constructed using year, month & day inputValue in Number)
* check empty input - where inputValue = Number("") => 0   
* check input range between 1 & 31
* check valid date (e.g., 2000-4-31 => false)

validateMonth
* param: month (monthInputValue - type: Number)
* check empty input - where inputValue = Number("") => 0
* check input range between 1 & 12

validateYear
* param: year (yearInputValue - type: Number)
* check empty input - where inputValue = Number("") => 0
* check year < 1900 & year > current year

*/

// Day
function validateDay(day, birthDate){
  if (day === 0) {
    dayError.textContent = 'this field is required';
    dayInput.classList.add('js-day-input-add');
    dayLabel.classList.add('js-day-input-label-add');
    return false;
  }

  if (birthDate.getDate() <= 0 || birthDate.getDate() > 31 || birthDate.getDate() !== day){
    dayError.textContent = 'must be a valid day';
    dayInput.classList.add('js-day-input-add');
    dayLabel.classList.add('js-day-input-label-add');
    return false;
  } else {
    dayError.textContent = '';
    dayInput.classList.remove('js-day-input-add');
    dayLabel.classList.remove('js-day-input-label-add');
    return true;
  }
  
}

// Month
function validateMonth(month){
  if (month === 0) {
    monthError.textContent = 'this field is required';
    monthInput.classList.add('js-month-input-add');
    monthLabel.classList.add('js-month-input-label-add');
    return false;
  }
  if (month <= 0 || month > 12){
    monthError.textContent = 'must be a valid month';
    monthInput.classList.add('js-month-input-add');
    monthLabel.classList.add('js-month-input-label-add');
    return false;
  } else {
    monthError.textContent = '';
    monthInput.classList.remove('js-month-input-add');
    monthLabel.classList.remove('js-month-input-label-add');
    return true;
  }
}

// Year
function validateYear(year){
  
  if (year === 0) {
    yearError.textContent = 'this field is required';
    yearInput.classList.add('js-year-input-add');
    yearLabel.classList.add('js-year-input-label-add');
    return false;
  }
  // note: use birthDate.getFullyear is not reliable - inputYear < 100 bypass the validation!
  if (year < 1900 || year > today.getFullYear()) {
    yearError.textContent = 'must be in the past';
    yearInput.classList.add('js-year-input-add');
    yearLabel.classList.add('js-year-input-label-add');
    return false;
  } else {
    yearError.textContent = '';
    yearInput.classList.remove('js-year-input-add');
    yearLabel.classList.remove('js-year-input-label-add');
    return true;
  }
}

/* || Utilities

validateLeapYear
* param: yearInputValue - type: Number
* Creates an Date object to check leap year.
* If Date object.getDate() is 29, it is leap year => true.
* In case where it's not a leap year, Date object will autocorrect to March 1, and dateObject.getDate() is not 29 => false.

getDaysInMonth
* param: yearInputValue - type: Number, monthDifference - type: Number, validateLeapYear - type: function
* Borrows days based on month before the current month for calculation purposes.
* uses validateLeapYear function to check leap year and change default Feb days to 29 if it is.
* Special case when monthDifference is 0 - when there is no previous month to borrow from, set the number of days to be 31 (similar to Jan).


*/

// Check leap year  
function validateLeapYear(yearInputValue) {
  const leapYear = new Date(yearInputValue, 1, 29).getDate() === 29;
  if (leapYear) {
    return true;
  }
  else {
    return false;
  }
}


function getDaysInMonth(yearInputValue, monthDifference, validateLeapYear) {

  const daysInMonthArray = [31, 28, 31 ,30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (validateLeapYear(yearInputValue)) {
    daysInMonthArray[1] = 29;
  };
  // deal with negative index issue - when current month - birth_month
  // mth - refer to the month displayed on screen
  if (monthDifference === 0) {
    return daysInMonthArray[0];
  }
  return daysInMonthArray[currentMonth - 1];
 
}


// Click button
form.addEventListener('submit', (e)=>{
  // cancel form default behaviours, preventing it from submitting a form
  e.preventDefault();

  const yearInputValue = Number(yearInput.value.trim());
  const monthInputValue = Number(monthInput.value.trim());
  const dayInputValue = Number(dayInput.value.trim());
  const birthDate = new Date(yearInputValue, monthInputValue -1, dayInputValue);

  const validateDayResult =  validateDay(dayInputValue, birthDate);
  const validateMonthResult = validateMonth(monthInputValue);
  const validateYearResult = validateYear(yearInputValue, today);

  // validate date - early return to stop calculation
  if (!validateDayResult || !validateMonthResult || !validateYearResult) {
    return;
  } 
  
  // difference - values to be displayed
  let yearDifference = currentYear - yearInputValue;
  let monthDifference = (currentMonth + 1) - monthInputValue; // current month is zero indexed, add one to make it as regular month we know
  let dayDifference = currentDay - dayInputValue;

  // when month is less than and equal to 0
  if (monthDifference <= 0) {
    yearDifference -= 1;
    monthDifference += 12;
  }
  // when day is less than 0
  if (dayDifference < 0) {
    monthDifference -= 1;
    dayDifference += getDaysInMonth(yearInputValue, monthDifference, validateLeapYear);
  }

  // when month is more than equal to 12
  if (monthDifference >=12) {
    yearDifference += 1;
    monthDifference -= 12;
  }

  // DOM modification
  yearOutput.textContent = yearDifference; 
  monthOutput.textContent = monthDifference;
  dayOutput.textContent = dayDifference;
});

 