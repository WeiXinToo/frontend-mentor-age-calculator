"use strict";

// AGE Calculator
/*
* validation logic and display error messages.
* Animate changing text 
*/


/* Validation
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
*/

// Date-related
const today = new Date();
const currentDay = today.getUTCDate();
const currentMonth = today.getUTCMonth(); // month is zero-indexed, starting from 0.
const currentYear = today.getUTCFullYear();

// Elements
const btn = document.querySelector('.js-button');
const dayInput = document.querySelector('.js-day-input');
const monthInput = document.querySelector('.js-month-input');
const yearInput = document.querySelector('.js-year-input');

const yrOutput = document.querySelector('.js-year-output');
const mthOutput = document.querySelector('.js-month-output');
const dayOutput = document.querySelector('.js-day-output');

// check empty
function validate_empty(){
  if (item.value === '' || item.value === null) {
    return true
  };
}

// Form Validation
function validate_day(day){
  if (1 <= day <= 31){
    return true;
  }
}

function validate_month(month){
  if (1 <= month <= 12){
    return true;
  }
}
function validate_year(year, today){
  if (year <= today) {
    return true;
  }
}



// Get days according to month
function getDaysInMonth(yr, mth, currentMonth, validateLeapYear) {
  const daysInMonthArray = [31, 28, 31 ,30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  console.log("Before leap year check:", daysInMonthArray[1]);
  console.log(currentMonth);

  if (validateLeapYear(yr)) {
    daysInMonthArray[1] = 29;
  };
  console.log("After leap year check:", daysInMonthArray[1]);

  // deal with negative index issue - when current month - birth_month
  // mth - refer to the month displayed on screen
  if (mth === 0) {
    return daysInMonthArray[0];
  }
  // return days of previous month (current month - 1)
  return daysInMonthArray[currentMonth - 1];
 
}


// Check leap year  
function validateLeapYear(inputYear) {
  // Check if Feb of each year has 29 days
  const leapYear = new Date(inputYear, 1, 29).getDate() === 29;
  if (leapYear) {
    return true;
  }
  else {
    return false;
  }
}

// Click button
btn.addEventListener('click', ()=>{
  
  const inputYear = Number(yearInput.value);
  const inputMonth = Number(monthInput.value);
  const inputDay = Number(dayInput.value);
  
  // data values to be displayed
  let yr = currentYear - inputYear;
  let mth = (currentMonth + 1) - inputMonth; // current month is zero indexed, add one to make it as regular month we know
  let day = currentDay - inputDay;

  // when month is less than and equal to 0
  if (mth <= 0) {
    yr -= 1;
    mth += 12;
  }
  // when day is less than 0
  if (day < 0) {
    mth -= 1;
    day += getDaysInMonth(inputYear, mth, currentMonth, validateLeapYear);
  }

  // when month is more than equal to 12
  if (mth >=12) {
    yr += 1;
    mth -= 12;
  }

  // verify leap year - on console.
  if (validateLeapYear(inputYear)){
    console.log(`${inputYear} is a leap year!`);
  } else {
    console.log(`${inputYear} is not a leap year!`);
  }

  // DOM modification
  yrOutput.textContent = yr; 
  mthOutput.textContent = mth;
  dayOutput.textContent = day;

  })

 