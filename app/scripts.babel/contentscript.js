'use strict';

const bindings = document.querySelectorAll('[data-team-name]');
if (bindings && bindings.length > 0) {
  // Get attribute value of "[data-team-name]".
  const teamName = bindings[0].dataset.teamName;
  const bgColor = localStorage.getItem('bgcolor:' + teamName);
  // Switch header bg color.
  const headers = document.getElementsByTagName('header');
  if (bgColor && headers && headers.length > 0) {
    headers[0].style.backgroundColor = bgColor;
  }
}
