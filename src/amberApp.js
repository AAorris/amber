var app, dm, drag_over, drag_start, drop, mouse_down, wheel;

dm = document.getElementById('dragme');

if (!dm) {
  console.log("No dm! Oh no!");
} else {
  console.log("DM! " + dm);
}

mouse_down = function(event) {
  if (event.button === 1) {
    return console.log("middle mouse down");
  }
};

drag_start = function(event) {
  var data, style;
  style = window.getComputedStyle(event.target, null);
  data = (parseInt(style.getPropertyValue('left')) - event.clientX) + "," + (parseInt(style.getPropertyValue('top')) - event.clientY);
  event.dataTransfer.setData('text/plain', data);
};

drag_over = function(event) {
  event.preventDefault();
  return false;
};

drop = function(event) {
  var data, offset;
  data = event.dataTransfer.getData('text/plain');
  offset = data.split(',');
  dm.style.left = event.clientX + parseInt(offset[0], 10) + 'px';
  dm.style.top = event.clientY + parseInt(offset[1], 10) + 'px';
  event.preventDefault();
  return false;
};

wheel = function(event) {
  return console.log(event.deltaX + "," + event.deltaY + "," + event.deltaZ);
};

dm.addEventListener('dragstart', drag_start, false);

document.body.addEventListener('dragover', drag_over, false);

document.body.addEventListener('drop', drop, false);

document.body.addEventListener('mousedown', mouse_down, false);

document.body.addEventListener('wheel', wheel, false);

app = angular.module("amberApp", []).controller("amberCtrl", function($scope) {
  $scope.position = {
    x: 0,
    y: 0
  };
  return this.test = function() {
    return console.log("success.");
  };
}).directive("node", function() {
  return function(scope, element) {
    var el;
    el = element[0];
    el.draggable = true;
    el.addEventListener('dragstart', function(e) {
      var data, style;
      style = window.getComputerStyle(event.target, null);
      data = (parseInt(style.getPropertyValue('left')) - event.clientX) + "," + (parseInt(style.getPropertyValue('top')) - event.clientY);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('Text', this.id);
      this.classList.add('drag');
      return false;
    }, false);
    el.addEventListener('dragend', function(e) {
      this.classList.remove('drag');
      return false;
    });
  };
});
