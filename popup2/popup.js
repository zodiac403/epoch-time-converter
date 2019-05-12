//
// tab navigation
//

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

  document.getElementById(targetName + '-input').focus();
}

function openTab(event, targetName) {
  return updateTabView(event.currentTarget, targetName);
}

function openFirstTab() {
  return updateTabView(document.getElementsByClassName('tab-links')[0], 'e2r');
}

//
// epoche2rfc339
//

function handleInputEvent(event) {
  try {
    let value = document.getElementById('e2r-input').value;
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
// initialization
//

document.addEventListener('input', handleInputEvent);
openFirstTab();
