import React from 'react';
import classes from './TextOptions.module.css';

const TextOptions = (props) => {
  return (
    <>
    {console.log(props)}
    <div>
      <div className={props.textNumber + "-options"}>
        <h3>Text {Object.keys(props.textNumber)[props.textCount]}<div className={classes['close-btn']} onClick={() => props.onCloseTextField(props.textCount - 1)}>x</div></h3>
        <label htmlFor={props.textNumber + "-top"}>Top: </label>
        <input 
          name={props.textNumber} 
          value={props.valueTextTop}
          type="range" 
          min="35" 
          max="90" 
          step="1" 
          onChange={props.onChangeTop}/>
        <br/>
        <label htmlFor={props.textNumber + "-left"}>Left: </label>
        <input 
          name={props.textNumber} 
          value={props.valueTextLeft}
          type="range" 
          min="20" 
          max="60" 
          step="1" 
          onChange={props.onChangeLeft}/>
        <br/>
        <label htmlFor={props.textNumber + "-font"}>Font-Size: </label>
        <input 
          name={props.textNumber} 
          value={props.valueFontSize}
          type="range" 
          min="20" 
          max="80" 
          step="1" 
          onChange={props.onChangeFont}/>
        <br/>
        <label htmlFor={props.textNumber + "-color"}>Choose color: </label>
        <input 
          name={props.textNumber} 
          type="color" 
          value={props.valueTextColor} 
          onChange={props.onChangeColor} />
          <br/><br/>
        <input 
          type="text" 
          name={props.textNumber}
          placeholder={"This here is text" + props.textNumber + "..."}
          onChange={props.onChangeInput} />
        <br/><br/>
      </div>
      </div>
    </>
  )
}

export default TextOptions