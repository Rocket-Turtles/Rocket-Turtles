import React from 'react';
import '../../css/style.css'

const Welcome = (props) => {
  return (
    <div> 
      <header>
        
      </header>
      <nav>
        <div 
          className='logo'
          onClick={() => props.handleViewChange('login')}>
          Rocket Turtle
        </div>
        <div 
          className={props.view === 'nutrition' ? 'navbtnSelected' : 'navbtn'}
          onClick={() => props.handleViewChange('nutrition')}
        >
          Nutrition
        </div>
        <div 
          className={props.view === 'sleep' ? 'navbtnSelected' : 'navbtn'}
          onClick={() => props.handleViewChange('sleep')}
        >
          Sleep
        </div>
      </nav>
    </div>
  )
}

export default Welcome;