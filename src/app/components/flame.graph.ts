import * as d3 from 'd3'
import flamegraph from 'd3-flame-graph'

class FlameGraph {
  // tslint:disable-next-line:no-empty
  constructor() {}

  testFun(domId, data) {
    document.getElementById(domId).innerHTML = data
    let stacks = {
      children: [
        {
          name: 'sss111',
          value: 5,
          barColor: '#E600E6',
          children: [
            {
              name: 's1child',
              value: 2,
              barColor: '#E600E6'
            }
          ]
        },
        {
          name: 's2',
          value: 5,
          barColor: '#E600E6',
          children: [
            {
              name: 's2child',
              value: 3,
              barColor: '#E600E6'
            }
          ]
        }
      ],
      name: 'root',
      value: 25,
      barColor: '#E600E6',
      nodeId: this.uuidv4()
    }

    this.hideBars(stacks.children)
    debugger
    let flameGraph = d3
      .flamegraph()
      .width(960)
      .cellHeight(18)
      .transitionDuration(750)
      .transitionEase(d3.easeCubic)
      .sort(true)
      .inverted(true)
      .setColorMapper(function(d) {
        return d.data.barColor
      })
      .onClick(d => {
        // d.data will get the selected node
        // the below will update the graph
        debugger
        let nextLevelIds = []
        if (d.data.children.length > 0) {
          d.data.children.forEach(ele => {
            nextLevelIds.push(ele.nodeId)
          })
        }
        // debugger
        flameGraph.update(d)
      })
      // Example to sort in reverse order
      // .sort(function(a,b){ return d3.descending(a.data.name, b.data.name);})
      .title('')

    // Example on how to use custom tooltips using d3-tip.
    let tip = d3
      .tip()
      .direction('s')
      .offset([8, 0])
      .attr('class', 'd3-flame-graph-tip')
      .html(function(d) {
        return 'name: ' + d.data.name + ', value: ' + d.data.value
      })

    flameGraph.tooltip(tip)

    // Example on how to use custom labels
    // var label = function(d) {
    //  return "name: " + d.data.name + ", value: " + d.data.value;
    // }

    // flameGraph.label(label);

    // d3.json(stacks, function (error, data) {
    // if (error) return console.warn(error);
    let init = d3
      .select('#chart')
      .datum(stacks)
      .call(flameGraph)
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // tslint:disable-next-line:one-variable-per-declaration
      let r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  hideBars(arr) {
    arr.forEach(ele => {
      ele.hide = true
      ele.fade = true
      ele.barColor = '#E600E6'
      ele.nodeId = this.uuidv4()
      if (ele.children) {
        this.hideBars(ele.children)
      }
    })
  }

  openNextLevel(arr, childArr) {
    arr.forEach(ele => {
      ele.hide = false
      ele.fade = false
      ele.barColor = '#E600E6'
      ele.nodeId = this.uuidv4()
      if (ele.children) {
        this.hideBars(ele.children)
      }
    })
  }
}

export { FlameGraph }
