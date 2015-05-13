var M, Q, app, drawBezier, util;

util = require("util");

M = function(x, y) {
  return "M " + x + " " + y;
};

Q = function(items) {
  var pos, res;
  res = ((function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      pos = items[_i];
      _results.push(Math.round(pos));
    }
    return _results;
  })()).join(" ");
  return "q " + res;
};

drawBezier = function(svg, path, x0, y0, x1, y1) {
  return path.attr('d', M(x0, y0) + " " + Q([x0 * 0.9 + x1 * 0.1, y0 * 1.0 + y1 * 0.0, x0 * 0.5 + x1 * 0.5, y0 * 0.5 + y1 * 0.5]) + " " + Q([x0 * 0.1 + x1 * 0.9, y1, x1, y1]));
};

app = angular.module("amberApp", []).controller("amberCtrl", function($scope) {
  return this.nodes = [
    {
      head: "Node Title",
      inputs: ["X", "Y"],
      outputs: ["I"]
    }, {
      head: "Other Title",
      inputs: ["X", "Y"],
      outputs: ["I"]
    }, {
      head: "Hi Mom",
      inputs: ["X", "Y"],
      outputs: ["I"]
    }
  ];
}).directive("node", function() {
  return {
    templateUrl: 'angular/node.html',
    link: function(scope, el, attr) {
      return angular.element(el).pep({
        velocityMultiplier: 0.6,
        allowDragEventPropagation: false,
        shouldPreventDefault: false
      });
    }
  };
}).directive("nodeSocket", function() {
  return {
    templateUrl: 'angular/nodeSocket.html',
    scope: {
      type: "@type",
      name: "@name",
      target: "@nodetarget",
      x: "@xpos",
      y: "@ypos",
      svg: "@socket",
      path: "@wire"
    },
    link: function(scope, el, attr) {
      scope.x = 0;
      scope.y = 0;
      scope.target = null;
      scope.svg = angular.element(el).find("svg");
      scope.path = scope.svg.find("path");
      return angular.element(el).find(".pick").pep({
        moveTo: function(dx, dy) {
          eval("scope.x" + dx);
          eval("scope.y" + dy);
          return drawBezier(scope.svg, scope.path, 0, 0, parseInt(scope.x * 0.7), parseInt(scope.y * 0.7));
        },
        allowDragEventPropagation: false,
        droppable: ".glyphicon",
        revert: true,
        revertIf: function(ev, obj) {
          return !this.activeDropRegions.length;
        },
        startPos: {
          top: 0,
          left: null
        }
      });
    }
  };
}).directive("nodeCenter", function() {
  return {
    transclude: true
  };
});
