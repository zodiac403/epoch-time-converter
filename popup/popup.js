// Copyright zodiac403@gmx.de
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

//
// tab navigation
//

const initialElementId = {
  'epoch': 'epoch-input',
  'iso': 'iso-year'
};

function updateTabView(tabElement, targetName) {
  // hide all elements with class='tab-content'
  let tabContent = document.getElementsByClassName('tab-content');
  for (let i = 0; i < tabContent.length; i++) {
    if (tabContent[i].className.indexOf('hide') === -1) {
      tabContent[i].className += ' hide';
    }
  }

  // remove the class 'active' from all elements with class='tab-links' and 
  let tabLinks = document.getElementsByClassName('tab-links');
  for (let j = 0; j < tabLinks.length; j++) {
    tabLinks[j].className = tabLinks[j].className.replace(' active', '');
  }

  // Show the current tab, and add an 'active' class to the button that opened the tab
  let tabContentElement = document.getElementById(targetName + '-tab-content');
  tabContentElement.className = tabContentElement.className.replace(' hide', '')
  tabElement.className += ' active';

  document.getElementById(initialElementId[targetName]).focus();
}

function openTab(event, targetName) {
  console.log('open', targetName);
  return updateTabView(event.currentTarget, targetName);
}

function openFirstTab() {
  return updateTabView(document.getElementsByClassName('tab-links')[0], 'epoch');
}

//
// epoch
//

function evaluateEpochToIso() {
  try {
    let value = document.getElementById('epoch-input').value;
    let inputDefinition = getInputDefinition(value);
    let result = convert(inputDefinition.epoch);

    document.getElementById('epoch-result').className = '';
    document.getElementById('epoch-error').className = 'hide';
    document.getElementById('epoch-input-unit').textContent = inputDefinition.unit;
    document.getElementById('epoch-result-iso').textContent = result;
    document.getElementById('epoch-result-epoch').textContent = inputDefinition.epoch;
  } catch (error) {
    document.getElementById('epoch-result').className = 'hide';
    document.getElementById('epoch-error').className = '';
    document.getElementById('epoch-error-text').textContent = error;
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

function evaluateIsoToEpoch() {
  try {
    let year = document.getElementById('iso-year').value || 1970;
    let month = document.getElementById('iso-month').value || 1;
    let day = document.getElementById('iso-day').value || 1;
    let hour = document.getElementById('iso-hour').value || 0;
    let minute = document.getElementById('iso-minute').value || 0;
    let second = document.getElementById('iso-second').value || 0;
    let milliseconds = document.getElementById('iso-millisecond').value || 0;

    let value = new Date();
    value.setUTCFullYear(year);
    value.setMonth(month - 1, day);
    value.setUTCHours(hour, minute, second, milliseconds);

    document.getElementById('iso-result').className = 'show';
    document.getElementById('iso-error').className = 'hide';
    document.getElementById('iso-result-iso').textContent = value.toISOString();
    document.getElementById('iso-result-epoch').textContent = value.getTime();
  } catch (error) {
    document.getElementById('iso-result').className = 'hide';
    document.getElementById('iso-error').className = 'show';
    document.getElementById('iso-error-text').textContent = error;
  }
}

function initializeIsoFields() {
  function setValue(id, value) {
    document.getElementById(id).value = value;
  }

  let date = new Date();
  setValue('iso-year', date.getUTCFullYear());
  setValue('iso-month', date.getUTCMonth() + 1);
  setValue('iso-day', date.getUTCDate());
  setValue('iso-hour', date.getUTCHours());
  setValue('iso-minute', date.getUTCMinutes());
  setValue('iso-second', 0);
  setValue('iso-millisecond', 0);

}

//
// initialization
//

function handleInputEvent(event) {
  let eventId = event.currentTarget.activeElement.id;

  if (eventId.indexOf('epoch') !== -1) {
    evaluateEpochToIso();
  } else if (eventId.indexOf('iso') !== -1) {
    evaluateIsoToEpoch();
  } else {
    // ignore
  }
}

document.addEventListener('input', handleInputEvent);
document.getElementById("tab-link-epoch").addEventListener("click", function (event) {
  openTab(event, 'epoch');
});
document.getElementById("tab-link-iso").addEventListener("click", function (event) {
  openTab(event, 'iso');
});

openFirstTab();
initializeIsoFields();
