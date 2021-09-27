import { assign } from 'lodash';

// FILE FOR CUSTOM THEME - COPIED INITIAL STYLES FROM MATERIAL THEME CODE IN DOCS:
// https://formidable.com/open-source/victory/guides/themes

// COLOURS FROM FIGMA DESIGNS
const lightBlue = '#c0deee';
export const darkBlue = '#005889';
const orange = '#E58A2E';

// TEXT
const sansSerif = "'Helvetica Neue', 'Helvetica', sans-serif";
const fontSize = 8;
const fontWeight = 'bold';

// Layout
const padding = 14;
const baseProps = {
  width: 350,
  height: 350,
  padding: 40
};

//  DEFAULT LABEL STYLES
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  padding,
  fill: darkBlue,
  stroke: 'transparent',
  strokeWidth: 0
};

// DATA POINTS ALONG GRAPH LINE
const dataLabelStyles = {
  fontSize: 8,
  padding: 16,
  fill: 'black',
  fontWeight: 'bold'
};

// USING ONLY INSIDE CHART FOR THE SELECTED DATA POINTS
const areaLabelStyles = {
  fontSize: 8,
  padding: 16,
  fill: 'red',
  fontWeight: 'bold'
};

const centeredLabelStyles = assign({ textAnchor: 'middle' }, baseLabelStyles);

// Strokes
const strokeDasharray = '10, 5';
const strokeLinecap = 'round';
const strokeLinejoin = 'round';

export const theme = {
  area: assign(
    {
      style: {
        data: {
          fill: lightBlue,
          stroke: orange,
          strokeWidth: 1
        },
        labels: areaLabelStyles
      }
    },
    baseProps
  ),
  axis: assign(
    {
      style: {
        axis: {
          fill: 'transparent',
          stroke: darkBlue,
          strokeWidth: 0,
          strokeLinecap,
          strokeLinejoin
        },
        axisLabel: assign({}, centeredLabelStyles, {
          padding,
          stroke: 'transparent'
        }),
        grid: {
          fill: 'none',
          stroke: 'black',
          strokeDasharray,
          strokeWidth: 0,
          strokeLinecap,
          strokeLinejoin,
          pointerEvents: 'painted'
        },
        tickLabels: assign({}, baseLabelStyles, {
          fill: darkBlue
        })
      }
    },
    baseProps
  ),
  chart: baseProps,
  // MAIN GRAPH LINE
  line: assign(
    {
      style: {
        data: {
          fill: 'transparent',
          opacity: 1,
          stroke: orange,
          strokeWidth: 1
        },
        labels: dataLabelStyles
      }
    },
    baseProps
  ),

  scatter: assign(
    {
      style: {
        data: {
          fill: darkBlue,
          opacity: 1,
          stroke: 'transparent',
          strokeWidth: 0
        },
        labels: dataLabelStyles
      }
    },
    baseProps
  )
};
