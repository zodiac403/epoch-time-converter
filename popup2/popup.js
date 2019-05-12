// Copyright zodiac403@gmx.de
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

//
// tab navigation
//

const initialElementId = {
  'e2r': 'epoch-input',
  'rfc': 'rfc-year'
};

function updateTabView(tabElement, targetName) {
  // hide all elements with class='tab-content'
  var tabContent = document.getElementsByClassName('tab-content');
  for (var i = 0; i < tabContent.length; i++) {
    if(tabContent[i].className.indexOf('hide') === -1) {
      tabContent[i].className += ' hide';
    }
  }

  // remove the class 'active' from all elements with class='tab-links' and 
  var tabLinks = document.getElementsByClassName('tab-links');
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(' active', '');
  }

  // Show the current tab, and add an 'active' class to the button that opened the tab
  var tabContentElement = document.getElementById(targetName + '-tab-content');
  tabContentElement.className = tabContentElement.className.replace(' hide', '')
  tabElement.className += ' active';

  document.getElementById(initialElementId[targetName]).focus();
}

function openTab(event, targetName) {
  return updateTabView(event.currentTarget, targetName);
}

function openFirstTab() {
  return updateTabView(document.getElementsByClassName('tab-links')[1], 'rfc');
}

//
// epoch
//

function evaluateEpochToRfc() {
  try {
    let value = document.getElementById('epoch-input').value;
    let inputDefinition = getInputDefinition(value);

    result = convert(inputDefinition.epoch);

    document.getElementById('result').className = '';
    document.getElementById('error').className = 'hide';
    document.getElementById('input-unit').textContent = inputDefinition.unit;
    document.getElementById('result-iso').textContent = result;
    document.getElementById('result-epoch').textContent = inputDefinition.epoch;
  } catch (error) {
    document.getElementById('result').className = 'hide';
    document.getElementById('error').className = '';
    document.getElementById('error-text').textContent = error;
  }
}

function getInputDefinition(value) {
  function createInputDefinition(milliseconds, unit, precision) {
    return {
      epoch: milliseconds,
      unit: unit,
      precision: precision
    };
  }

  function isEpoch(value) {
    return value.match(/^[0-9]+$/);
  }

  let input = {};

  if (isEpoch(value)) {
    if (value.length <= 11) {
      input = createInputDefinition(Number(value) * 1000, 's', 'epoch');
    } else if (value.length <= 14) {
      input = createInputDefinition(Number(value), 'ms', 'epoch');
    } else if (value.length <= 21) {
      input = createInputDefinition(Number(value) / 1000000, 'ns', 'epoch');
    } else {
      throw Error('Unknown format: number with ' + value.length + ' digits.');
    }
  } else {
    throw Error('Unknown format: ' + value + '.');
  }

  return input;
}

function convert(value) {
  let result;

  let date = new Date(Number(value));

  if (!date.getTime()) {
    throw Error('Cannot parse to Date.');
  }

  result = date.toISOString();
  return result;
}

//
// iso
//

function evaluateRfcToEpoch() {
  try {
    let year = document.getElementById('rfc-year').value || 0;
    let month = document.getElementById('rfc-month').value || 0;
    let day = document.getElementById('rfc-day').value || 0;

    let isoString = year + '-' + month + '-' + day 

    let value = new Date(year + '-' + month + '-' + day);

    document.getElementById('result-epoch').textContent = value.valueOf();

    document.getElementById('result').className = '';
    document.getElementById('error').className = 'hide';
    document.getElementById('input-unit').textContent = 'ISO';
    document.getElementById('result-iso').textContent = value.toISOString();
    document.getElementById('result-epoch').textContent = value.valueOf();


  } catch (error) {
    document.getElementById('result').className = 'hide';
    document.getElementById('error').className = '';
    document.getElementById('error-text').textContent = error;
  }
}



//
// initialization
//

function handleInputEvent(event) {
  let eventId = event.currentTarget.activeElement.id;

  if (eventId.indexOf('epoch') !== -1) {
    evaluateEpochToRfc();
  }
  else if (eventId.indexOf('rfc') !== -1) {
    evaluateRfcToEpoch();
  }
  else {
    // ignore
  }

}

document.addEventListener('input', handleInputEvent);
openFirstTab();
