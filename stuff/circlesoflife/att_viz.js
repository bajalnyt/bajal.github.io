
var AttViz = (function () {

    var cy;

    var exports = {};

    exports.startCytoscape = function (cytoscapeParentElement) {
        cy = cytoscape({
            container: document.getElementById(cytoscapeParentElement),
            boxSelectionEnabled: false,
            autounselectify: true,

            autolock: false,

            style: cytoscape.stylesheet()
                .selector('node')
                    .css({
                      'content': 'data(showText)',
                      'color': 'green'
                    })
                .selector('edge')
                  .css({
                    'curve-style': 'bezier',
                    'target-arrow-shape': 'triangle',
                    'width': 4,
                    'line-color': '#ddd',
                    'target-arrow-color': '#ddd'
            	  })
                .selector('.SPLITTER')
                  .css({
              		  'background-color': '#000',
                      'line-color': '#000',
                      'target-arrow-color': '#000',
                      'transition-property': 'background-color, line-color, target-arrow-color',
                      'transition-duration': '0.5s'
                })
                .selector('.BROKEN')
                  .css({
                    'color' : 'red',
                    'line-color': 'red',
                    'background-color': 'red',
                    'target-arrow-color': 'red'
                  })
                .selector('.highlighted')
                  .css({
                      'background-color': '#61bffc',
                      'line-color': '#61bffc',
                      'target-arrow-color': '#61bffc',
                      'transition-property': 'background-color, line-color, target-arrow-color',
                      'transition-duration': '0.5s'
                  })
              }

        );

        return cy;
    };

    exports.highlightBrokenNodes2 = function (affectedIds) {
        var ids = affectedIds.split(',');
        var affectedEls = [];
        for (var i = 0; i < ids.length; i++) {
            if (ids[i] !== '#dummy') {
                var affectedElement = cy.$(ids[i]);
                affectedElement.addClass(' BROKEN');
                var successors = affectedElement.successors();
                successors.forEach(function (ele) {
                    affectedEls.push(ele);
                    /*
                    console.log(ele.id());
                    ele.addClass(' BROKEN'); */
                })
            }
        }

        var i = 0;
        var highlightNextEle = function(){
          if( i < affectedEls.length ){
            affectedEls[i].addClass(' BROKEN');
            i++;
            setTimeout(highlightNextEle, Math.floor(2000 / affectedEls.length));
          }
        };

        // kick off first highlight
        highlightNextEle();

    }

    exports.highlightBrokenNodes = function (affectedIds) {
        // example affectedIds: "#dummy,#570069";
        var bfs = cy.elements().bfs(affectedIds, function() {}, true);

        var i = 0;
        var highlightNextEle = function(){
          if( i < bfs.path.length ){
            bfs.path[i].addClass(' BROKEN');

            i++;
            setTimeout(highlightNextEle, 250);
          }
        };

        // kick off first highlight
        highlightNextEle();
    };

    exports.doLayout = function (rootString) {
        // example roots string: '#dummy,#570062'
        var layout = cy.layout({
            name: 'breadthfirst',
            roots: rootString,
            directed: true,
            spacingFactor: 3,
            padding: 10
        });

        layout.run();
    };

    exports.showData = function (data) {

        console.log(data);

        // data example
        /*
        "edges": [
            {
                "data": {
                    "id": 621769,
                    "source": 570069,
                    "target": 570070
                }
            },
            {
                "data": {
                    "id": 621768,
                    "source": 570062,
                    "target": 570069
                }
            },
        ],
        "nodes": [
            {
                "data": {
                    "id": 570062,
                    "showText": "OLT: NWTNNCMAOL0010148531"
                },
                "classes": "OLT"
            },
            {
                "data": {
                    "id": 570132,
                    "showText": "BAN: 253690200"
                },
                "classes": "BAN"
            },
        */

        var dataToAdd = [];

        for (var i = 0; i < data.nodes.length; i++) {
            data.nodes[i]['group'] = 'nodes';
            dataToAdd.push(data.nodes[i]);
        }

        for (i = 0; i < data.edges.length; i++) {
            data.edges[i]['group'] = 'edges';
            data.edges[i].data.id = 'rel-' + data.edges[i].data.id;
            dataToAdd.push(data.edges[i]);
        }

        var eles = cy.add(dataToAdd);
    };

    exports.doPostSearch = function (query, parameters, handler) {

        var postData = {
            query: query,
            parameterMap: parameters
        }

        $.ajax({
          type: "POST",
          url: "/postTabularQuery",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(postData),
          success: handler,
          dataType: "json"
        });
    }

    exports.doPostSearch2 = function (query, parameters, username, password, handler) {

        var postData = {
            statements: [{
                statement: query,
                parameters: parameters
            }]
        };

        $.ajax({
          type: "POST",
          url: " http://localhost:11004/db/data/transaction/commit",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(postData),
          success: handler,
          headers: {
              "Authorization": "Basic " + btoa(username + ":" + password)
          },
          dataType: "json"
        });
    }

    return exports;

})();
