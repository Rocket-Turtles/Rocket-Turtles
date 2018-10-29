import React from 'react';
import moment from 'moment';
import DateTime from 'react-datetime';
import SleepGraph from './SleepGraph.jsx'

import "../../../node_modules/react-datetime/css/react-datetime.css";

//this is the sleep view sidebar component
//i used react-datetime for the time selector

const Sleep = (props) => {
  var today = moment();
  var valid = function(current){
      return current.isBefore(today);
  };

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
                defaultValue={(new Date())}
                viewMode={'time'}
                isValidDate={valid}
              />
            </td>
            <td>
              <DateTime 
                onBlur={(date) => props.getWakeTime(date)}
                defaultValue={new Date()}
                viewMode={'time'}
                isValidDate={valid}
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
      {/* Start of Sleep Week Graph */}
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

