import React from 'react';
//import Chart from 'chart.js';
//import {Bar} from 'react-chartjs-2';
import moment from 'moment';

//CSS objects
const tableStyle = {
  border: 'solid 1px',
  borderCollapse: 'collapse'
}

const tdStyle = {
  width: '160px',
  border: 'solid 1px'
}

const tdHeaderStyle = {
  width: '140px',
  border: 'solid 1px'
}


const Sleep = (props) => {

  // This function calculates the average hours of sleep
  const reducer = (acc, cur) => acc + cur.hourCount;
  const getAverage = (arr) => {
    return arr.reduce(reducer, 0)
  };
  let average = (getAverage(props.sleepNights) / 7).toFixed(2);


  return (
    <div>
      Sleep:
      {/* Start of Sleep Table */}
      <table style={tableStyle}>
        <thead>
          {/* header row contains avg hours and dates */}
          <tr>
            <td style={tdHeaderStyle}>
            Average:
            {' ' + average + ' hrs'}  
            </td>
            {props.sleepNights.map(night => (
              <td style={tdStyle}>
                { moment(night.nightSlept).format('dddd MMM Do') }
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>
              Hours Slept:
            </td>
              {props.sleepNights.map(night => (
                <td style={tdStyle}>
                  {night.hourCount}
                </td>
              ))}
          </tr>
          <tr>
            <td style={tdStyle}>
              From:
            </td>
            {props.sleepNights.map(night => (
              <td style={tdStyle}>
                {moment(night.startHour, "HH:mm:ss").format("h:mm a") + ' '}
                to 
                {' ' + moment(night.endHour, "HH:mm:ss").format("h:mm a")}
              </td>
            ))}
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