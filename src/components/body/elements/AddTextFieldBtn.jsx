import React from 'react';
import classes from './AddTextFieldBtn.module.css';

const AddTextFieldBtn = (props) => {
  return (
    <>
      <div className={classes['btn-container']}>
        <button className={classes['add-btn']} onClick={() => props.onAddTextField(props.textCount + 1)}>+</button>
      </div>
    </>
  )
}

export default AddTextFieldBtn