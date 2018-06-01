// Copyright zodiac403@gmx.de
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

function handleInputEvent(event) {
  try {
    let value = document.getElementById('input').value;
    let inputDefinition = getInputDefinition(value);

    result = convert(inputDefinition.epoch);

    document.getElementById('result').className = '';
    document.getElementById('error').className = 'hidden';
    document.getElementById('input-unit').textContent = inputDefinition.unit;
    document.getElementById('result-iso').textContent = result;
    document.getElementById('result-epoch').textContent = inputDefinition.epoch;
  } catch (error) {
    document.getElementById('result').className = 'hidden';
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

document.addEventListener('input', handleInputEvent);
document.getElementById('input').focus();
