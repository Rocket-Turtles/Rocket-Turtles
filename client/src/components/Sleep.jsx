import React from 'react';
//import Chart from 'chart.js';
//import {Bar} from 'react-chartjs-2';
import moment from 'moment';
import DateTime from 'react-datetime';
import SleepGraph from './SleepGraph.jsx'

import "../../../node_modules/react-datetime/css/react-datetime.css";


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

  return (
    <div className='sleep'>
      <div className='sleepTitle'>
        Your Sleep Stats for the Week:
      </div>
      {/* Start of Sleep Entry Table */}
      <table>
        <tbody>
          <tr>
            <td>
              When did you go to bed?
            </td>
            <td>
              When did you wake up?
            </td>
          </tr>
          <tr>
            <td>
              <DateTime 
                onBlur={(date) => props.getSleepTime(date)}
                defaultValue={new Date()}
                />
            </td>
            <td>
              <DateTime 
                onBlur={(date) => props.getWakeTime(date)}
                defaultValue={new Date()}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button 
        onClick={() => props.postSleepEntry()}
        className='sleepSubmitbtn'>
        Submit
      </button>
      <br></br>
      {/* Start of Sleep Week Table */}
      <div>
        Average:{' ' + props.weeklyAverage + ' hrs'}
      </div>
      <SleepGraph 
        user={props.user}
        sleepWeek={props.sleepWeek}
      />
    </div>
  )
}

export default Sleep;

      // <table style={tableStyle}>
      //   <thead>
      //     {/* header row contains avg hours and dates */}
      //     <tr>
      //       <td style={tdHeaderStyle}>
      //       Average:
      //       {' ' + props.weeklyAverage + ' hrs'}  
      //       </td>
      //       {props.sleepWeek.map((night, i) => (
      //         <td key={i} style={tdStyle}>
      //           { moment(night.nightSlept).format('dddd MMM Do') }
      //         </td>
      //       ))}
      //     </tr>
      //   </thead>
      //   {/* body rows contain hour count and begin-end hours */}
      //   <tbody>
      //     <tr>
      //       <td style={tdStyle}>
      //         Hours Slept:
      //       </td>
      //         {props.sleepWeek.map((night, i) => (
      //         <td key={i} style={tdStyle}>
      //             {night.hourCount}
      //           </td>
      //         ))}
      //     </tr>
      //     <tr>
      //       <td style={tdStyle}>
      //         From:
      //       </td>
      //       {props.sleepWeek.map((night, i) => (
      //       <td key={i} style={tdStyle}>
      //           {moment(night.startHour, "HH:mm:ss").format("h:mm a") + ' '}
      //           to 
      //           {' ' + moment(night.endHour, "HH:mm:ss").format("h:mm a")}
      //         </td>
      //       ))}
      //     </tr>
      //   </tbody>
      //   <tfoot>
      //     {/* planning on putting edit buttons in footer row */}
      //   </tfoot>
      // </table>
