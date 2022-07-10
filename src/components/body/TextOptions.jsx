import React from 'react';
import classes from './TextOptions.module.css';

const TextOptions = (props) => {
  return (
    <>
      <div className={props.textNumber + "-options"}>
        <h3>Text {props.textNumber}</h3>
        <label htmlFor={"text" + props.textNumber + "-top"}>Top: </label>
        <input 
          name={"text" + props.textNumber} 
          value={props.valueTextTop}
          type="range" 
          min="35" 
          max="90" 
          step="1" 
          onChange={props.onChangeTop}/>
        <br/>
        <label htmlFor={"text" + props.textNumber + "-left"}>Left: </label>
        <input 
          name={"text" + props.textNumber} 
          value={props.valueTextLeft}
          type="range" 
          min="20" 
          max="60" 
          step="1" 
          onChange={props.onChangeLeft}/>
        <br/>
        <label htmlFor={"text" + props.textNumber + "-font"}>Font-Size: </label>
        <input 
          name={"text" + props.textNumber} 
          value={props.valueFontSize}
          type="range" 
          min="20" 
          max="80" 
          step="1" 
          onChange={props.onChangeFont}/>
        <br/>
        <label htmlFor={"text" + props.textNumber + "-color"}>Choose color: </label>
        <input 
          name={"text" + props.textNumber} 
          type="color" 
          value={props.valueTextColor} 
          onChange={props.onChangeColor} />
          <br/><br/>
        <input 
          type="text" 
          name={"text" + props.textNumber}
          placeholder={"This here is text" + props.textNumber + "..."}
          onChange={props.onChangeInput} />
        <br/><br/>
      </div>
    </>
  )
}

export default TextOptions