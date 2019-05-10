//
// tab navigation
//

function openTab(event, targetName) {
  // hide all elements with class='tab-content'
  var tabContent = document.getElementsByClassName('tab-content');
  for (var i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = 'none'; // todo: add hide class
  }

  // remove the class 'active' from all elements with class='tab-links' and 
  var tabLinks = document.getElementsByClassName('tab-links');
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(' active', '');
  }

  // Show the current tab, and add an 'active' class to the button that opened the tab
  document.getElementById(targetName).style.display = 'block';
  event.currentTarget.className += ' active';
}

document.getElementsByClassName('tab-links')[0].className += ' active';
document.getElementById('Epoch2Rfc').style.display = 'block';