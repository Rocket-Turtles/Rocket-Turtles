import React from "react";
import Background from "./Background.jsx";
import Blob from "./BlobBuddy.jsx";


export default class BlobWindow extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <Background globalTimeOfDay={this.props.globalTimeOfDay} />
        <Blob 
          blobCondition = {this.props.blobCondition}
          weeklyAverage={this.props.weeklyAverage}
          totalCalories={this.props.totalCalories}
          globalTimeOfDay={this.props.globalTimeOfDay}
        />
      </div>
    );
  }
}

//this component was intended to be a parent to the blob and the unused background component
// const BlobWindow = ({globalTimeOfDay, weeklyAverage, totalCalories}) => {
//   return (
//     <div>
//       <Background
//         globalTimeOfDay={globalTimeOfDay}
//       />
//       <Blob

//         weeklyAverage={weeklyAverage}
//         totalCalories={totalCalories}
//         globalTimeOfDay={globalTimeOfDay}
//       />
//     </div>
//   )
// }

// export default BlobWindow;
