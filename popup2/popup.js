//
// tab navigation
//

function updateTabView(tabElement, targetName) {
  // hide all elements with class='tab-content'
  var tabContent = document.getElementsByClassName('tab-content');
  for (var i = 0; i < tabContent.length; i++) {
    tabContent[i].className = tabContent[i].className.replace(' tab-content-show', ' tab-content-hide');
  }

  // remove the class 'active' from all elements with class='tab-links' and 
  var tabLinks = document.getElementsByClassName('tab-links');
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(' active', '');
  }

  // Show the current tab, and add an 'active' class to the button that opened the tab
  document.getElementById(targetName).className = document.getElementById(targetName).className.replace(' tab-content-hide', ' tab-content-show')
  tabElement.className += ' active';
}

function openTab(event, targetName) {
  return updateTabView(event.currentTarget, targetName);
}

function openFirstTab() {
  return updateTabView(document.getElementsByClassName('tab-links')[0], 'Epoch2Rfc');
}

//
// initialization
//

openFirstTab();