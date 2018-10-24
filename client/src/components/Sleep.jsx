import React from 'react';
//import Chart from 'chart.js';
//import {Bar} from 'react-chartjs-2';

const tableStyle = {
  border: 'solid 1px',
  borderCollapse: 'collapse'
}

const tdStyle = {
  width: '80px',
  border: 'solid 1px'
}

const tdHeaderStyle = {
  width: '140px',
  border: 'solid 1px'
}

const Sleep = (props) => {



  return (
    <div>
      Sleep:
      <table
        style={tableStyle}
      >
        <thead>
          <tr>
            <td
              style={tdHeaderStyle}
            ></td>
            <td
              style={tdStyle}
            >
              Sunday:
            </td>
            <td
              style={tdStyle}
            >
              Monday:
            </td>
            <td
              style={tdStyle}
            >
              Tuesday:
            </td>
            <td
              style={tdStyle}
            >
              Wednesday:
            </td>
            <td
              style={tdStyle}
            >
              Thursday:
            </td>
            <td
              style={tdStyle}
            >
              Friday:
            </td>
            <td
              style={tdStyle}
            >
              Saturday:
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style={tdStyle}
            >
              Hours Slept:
            </td>
            <td
              style={tdStyle}
            >
              {props.sleepNights[0].hourCount}
            </td>
            <td
              style={tdStyle}
            >
              {props.sleepNights[1].hourCount}
            </td>
            <td
              style={tdStyle}
            >
              {props.sleepNights[2].hourCount}
            </td>
            <td
              style={tdStyle}
            >
              {props.sleepNights[3].hourCount}
            </td>
            <td
              style={tdStyle}
            >
              {props.sleepNights[4].hourCount}
            </td>
            <td
              style={tdStyle}
            >
              {props.sleepNights[5].hourCount}
            </td>
            <td
              style={tdStyle}
            >
              {props.sleepNights[6].hourCount}
            </td>
          </tr>
          <tr>
            <td
              style={tdStyle}
            >
              From:
            </td>
          </tr>
        </tbody>
        <tfoot>

        </tfoot>
      </table>
    </div>
  )
}

export default Sleep;


/*
chart.js stuff to use later
const barData = {
  labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dataSet: {
    label: 'Weekly Sleep Tracker',
    backgroundColor: [
      "rgba(26, 188, 156, 0.2)",  
      "rgba(46, 204, 113, 0.2)",
      "rgba(52, 152, 219, 0.2)", 
      "rgba(155, 89, 182, 0.2)",
      "rgba(231, 76,  60, 0.2)",
      "rgba(230, 126, 34, 0.2)",
      "rgba(241, 196, 15, 0.2)"
    ],
    borderColor: [
      "rgba(26, 188, 156, 0.8)",  
      "rgba(46, 204, 113, 0.8)",
      "rgba(52, 152, 219, 0.8)", 
      "rgba(155, 89, 182, 0.8)",
      "rgba(231, 76,  60, 0.8)",
      "rgba(230, 126, 34, 0.8)",
      "rgba(241, 196, 15, 0.8)"
    ],
    borderWidth: 1,
    hoverBackgroundColor: [
    "rgba(26, 188, 156, 0.6)",  
    "rgba(46, 204, 113, 0.6)",
    "rgba(52, 152, 219, 0.6)", 
    "rgba(155, 89, 182, 0.6)",
    "rgba(231, 76,  60, 0.6)",
    "rgba(230, 126, 34, 0.6)",
    "rgba(241, 196, 15, 0.6)"
  ],
    hoverBorderColor: [
      "rgba(26, 188, 156, 1.0)",  
      "rgba(46, 204, 113, 1.0)",
      "rgba(52, 152, 219, 1.0)", 
      "rgba(155, 89, 182, 1.0)",
      "rgba(231, 76,  60, 1.0)",
      "rgba(230, 126, 34, 1.0)",
      "rgba(241, 196, 15, 1.0)"
    ],
    data: [8, 7, 6, 7, 6, 8, 4],
  }
}

const options = {
  maintainAspectRatio: false,
};
*/