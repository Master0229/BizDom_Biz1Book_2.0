import { Component } from '@angular/core'

@Component({
  selector: 'app-charts-chartist',
  templateUrl: './chartist.component.html',
})
export class ChartsChartistComponent {
  animationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
      [1, 2, 2.7, 0, 3, 5, 3, 4, 8, 10, 12, 7],
      [0, 1.2, 2, 7, 2.5, 9, 5, 8, 9, 11, 14, 4],
      [10, 9, 8, 6.5, 6.8, 6, 5.4, 5.3, 4.5, 4.4, 3, 2.8],
    ],
    type: 'Line',
  }
  animationOptions = {
    axisX: {
      labelInterpolationFnc(value, index) {
        return index % 2 !== 0 ? !1 : value
      },
    },
  }
  smilData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    series: [
      [12, 9, 7, 8, 5, 4, 6, 2, 3, 3, 4, 6],
      [4, 5, 3, 7, 3, 5, 5, 3, 4, 4, 5, 5],
      [5, 3, 4, 5, 6, 3, 3, 4, 5, 6, 3, 4],
      [3, 4, 5, 6, 7, 6, 4, 5, 6, 7, 6, 3],
    ],
  }
  smilOptions = {
    low: 0,
  }
  smilEvents = {
    created() {},
    draw(data) {
      let seq = 0
      const delays = 80
      const durations = 500
      if (data.type === 'line') {
        seq += 1
        data.element.animate({
          opacity: {
            begin: seq * delays + 1e3,
            dur: durations,
            from: 0,
            to: 1,
          },
        })
      }
      if (data.type === 'label' && data.axis === 'x') {
        data.element.animate({
          y: {
            begin: seq * delays,
            dur: durations,
            from: data.y + 100,
            to: data.y,
            easing: 'easeOutQuart',
          },
        })
      }
      if (data.type === 'label' && data.axis === 'y') {
        data.element.animate({
          x: {
            begin: seq * delays,
            dur: durations,
            from: data.x - 100,
            to: data.x,
            easing: 'easeOutQuart',
          },
        })
      }
      if (data.type === 'point') {
        data.element.animate({
          x1: {
            begin: seq * delays,
            dur: durations,
            from: data.x - 10,
            to: data.x,
            easing: 'easeOutQuart',
          },
          x2: {
            begin: seq * delays,
            dur: durations,
            from: data.x - 10,
            to: data.x,
            easing: 'easeOutQuart',
          },
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'easeOutQuart',
          },
        })
      }
      if (data.type === 'grid') {
        const pos1Animation = {
          begin: seq * delays,
          dur: durations,
          from: data[`${data.axis.units.pos}1`] - 30,
          to: data[`${data.axis.units.pos}1`],
          easing: 'easeOutQuart',
        }
        const pos2Animation = {
          begin: seq * delays,
          dur: durations,
          from: data[`${data.axis.units.pos}2`] - 100,
          to: data[`${data.axis.units.pos}2`],
          easing: 'easeOutQuart',
        }
        const ctAnimations = {}
        ctAnimations[`${data.axis.units.pos}1`] = pos1Animation
        ctAnimations[`${data.axis.units.pos}2`] = pos2Animation
        data.element.animate(ctAnimations)
      }
    },
  }
  lineData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    series: [
      [12, 9, 7, 8, 5],
      [2, 1, 3.5, 7, 3],
      [1, 3, 4, 5, 6],
    ],
  }
  lineOptions = {
    fullWidth: !0,
    chartPadding: {
      right: 40,
    },
  }
  areaData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    series: [[5, 9, 7, 8, 5, 3, 5, 4]],
  }
  areaOptions = {
    low: 0,
    showArea: true,
  }
  scatterData = Array(...new Array(52))
    .map(Math.random)
    .reduce(
      (scatter, rnd, index) => {
        const data = scatter
        data.labels.push(index + 1)
        data.series.forEach(series => {
          series.push(Math.random() * 100)
        })
        return data
      },
      {
        labels: [],
        series: Array(...new Array(4)).map(() => []),
      },
    )
  scatterOptions = {
    showLine: false,
    axisX: {
      labelInterpolationFnc(value, index) {
        return index % 13 === 0 ? `W${value}` : null
      },
    },
  }
  scatterResponsiveOptions = [
    [
      'screen and (min-width: 640px)',
      {
        axisX: {
          labelInterpolationFnc(value, index) {
            return index % 4 === 0 ? `W${value}` : null
          },
        },
      },
    ],
  ]
  horizontalData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    series: [
      [5, 4, 3, 7, 5, 10, 3],
      [3, 2, 9, 5, 4, 6, 4],
    ],
  }
  horizontalOptions = {
    seriesBarDistance: 10,
    reverseData: !0,
    horizontalBars: !0,
    axisY: {
      offset: 70,
    },
  }
  biPolarLineData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    series: [
      [1, 2, 3, 1, -2, 0, 1, 0],
      [-2, -1, -2, -1, -2.5, -1, -2, -1],
      [0, 0, 0, 1, 2, 2.5, 2, 1],
      [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5],
    ],
  }
  biPolarLineOptions = {
    high: 3,
    low: -3,
    showArea: !0,
    showLine: !1,
    showPoint: !1,
    fullWidth: !0,
    axisX: {
      showLabel: false,
      showGrid: false,
    },
  }
  biPolarBarData = {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
    series: [[1, 2, 4, 8, 6, -2, -1, -4, -6, -2]],
  }
  biPolarBarOptions = {
    high: 10,
    low: -10,
    axisX: {
      labelInterpolationFnc(value, index) {
        return index % 2 === 0 ? value : null
      },
    },
  }
  stackedBarData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
      [8e5, 12e5, 14e5, 13e5],
      [2e5, 4e5, 5e5, 3e5],
      [1e5, 2e5, 4e5, 6e5],
    ],
  }
  stackedBarOptions = {
    stackBars: !0,
    axisY: {
      labelInterpolationFnc(value) {
        return `${value / 1e3}k`
      },
    },
  }
  overlappingBarData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
      [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
      [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4],
    ],
  }
  overlappingBarOptions = {
    seriesBarDistance: 10,
  }
  overlappingResponsiveOptions = [
    [
      '',
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc(value) {
            return value[0]
          },
        },
      },
    ],
  ]
  labelsPieData = {
    labels: ['Bananas', 'Apples', 'Grapes'],
    series: [20, 15, 40],
  }
  labelsPieOptions = {
    labelInterpolationFnc(value) {
      return value[0]
    },
  }
  labelsPieResponsiveOptions = [
    [
      'screen and (min-width: 640px)',
      {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: 'explode',
        labelInterpolationFnc(value) {
          return value
        },
      },
    ],
    [
      'screen and (min-width: 1024px)',
      {
        labelOffset: 80,
        chartPadding: 20,
      },
    ],
  ]
  simplePieData = {
    series: [20, 15, 40],
  }
  simplePieOptions = {}
}
