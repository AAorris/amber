# ---
# generated by js2coffee 2.0.4

util = require("util");

#moveto
M = (x,y) ->
  "M "+x+" "+y

#curveto
Q = (items) ->
  res = (Math.round(pos) for pos in items).join(" ")
  "q " + res

drawBezier = (svg, path, x0, y0, x1, y1) ->
  #path.attr('d', M(x0,y0) + " " + Q([x0*0.5+x1*0.5,y1, x1,y1]) );
  path.attr('d', (M(x0,y0) + " " + Q([x0*0.9+x1*0.1, y0*1.0+y1*0.0, x0*0.5+x1*0.5, y0*0.5+y1*0.5])+" " + Q([x0*0.1+x1*0.9, y1, x1,y1]))
  );

# ---
# generated by js2coffee 2.0.4

app = angular.module "amberApp", []
  .controller "amberCtrl", ($scope) ->
    this.nodes = [
      {
        head:"Node Title",
        inputs: ["X","Y"],
        outputs: ["I"]
      },
      {
        head:"Other Title",
        inputs: ["X","Y"],
        outputs: ["I"]
      },
      {
        head:"Hi Mom",
        inputs: ["X","Y"],
        outputs: ["I"]
      }
    ]
  .directive "node", () ->
    {
      templateUrl: 'angular/node.html',
      link: (scope,el,attr)->
        angular.element(el).pep {
          velocityMultiplier:0.6
          allowDragEventPropagation:false
          shouldPreventDefault: false
        }
    }
  .directive "nodeSocket", () ->
    {
      #angular here
      templateUrl: 'angular/nodeSocket.html'
      scope:
        type: "@type"
        name: "@name"
        target: "@nodetarget"
        x: "@xpos"
        y: "@ypos"
        svg: "@socket"
        path:"@wire"
      #link here
      link: (scope,el,attr)->
        scope.x = 0
        scope.y = 0
        scope.target = null
        scope.svg = angular.element(el).find("svg");
        scope.path = scope.svg.find("path");
        #console.log(scope.svg);
        #console.log(scope.path);
        #pep here
        angular.element(el).find(".pick").pep {
          moveTo: (dx,dy)->
            eval("scope.x"+dx) #evals like 'scope.x'+'-=10'
            eval("scope.y"+dy)
            drawBezier(scope.svg,scope.path,0,0,parseInt(scope.x*0.7),parseInt(scope.y*0.7));
          allowDragEventPropagation:false
          droppable:".glyphicon"
          revert:true
          revertIf: (ev,obj)->
            !this.activeDropRegions.length
          startPos: {
            top:0
            left:null
          }
        }
    }
  .directive "nodeCenter", () ->
    {
      transclude: true
    }
