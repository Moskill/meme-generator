import React from 'react';
import TextOptions from './TextOptions';
import AddTextFieldBtn from '../elements/AddTextFieldBtn';

const OptionsBar = (props) => {
  // let myVar = JSON.Stringify(props.props)
  return (
    <div className="text-option">
      <TextOptions 
        textNumber={props.textNumber[0]}
        onChangeTop={props.onChangeTop}
        onChangeLeft={props.onChangeLeft}
        onChangeFont={props.onChangeFont}
        onChangeColor={props.onChangeColor}
        onChangeInput={props.onChangeInput}
        textCount={props.textCount} 
        onCloseTextField={props.onCloseTextField}
      />
      {props.textCount > 1 && (<TextOptions 
        textNumber={props.textNumber[1]}
        onChangeTop={props.onChangeTop}
        onChangeLeft={props.onChangeLeft}
        onChangeFont={props.onChangeFont}
        onChangeColor={props.onChangeColor}
        onChangeInput={props.onChangeInput}
        textCount={props.textCount} 
        onCloseTextField={props.onCloseTextField}
      />)}
      {props.textCount > 2 && (<TextOptions 
        textNumber={props.textNumber[2]}
        onChangeTop={props.onChangeTop}
        onChangeLeft={props.onChangeLeft}
        onChangeFont={props.onChangeFont}
        onChangeColor={props.onChangeColor}
        onChangeInput={props.onChangeInput}
        textCount={props.textCount} 
        onCloseTextField={props.onCloseTextField}
      />)}
      {props.textCount > 3 && (<TextOptions 
        textNumber={props.textNumber[3]}
        onChangeTop={props.onChangeTop}
        onChangeLeft={props.onChangeLeft}
        onChangeFont={props.onChangeFont}
        onChangeColor={props.onChangeColor}
        onChangeInput={props.onChangeInput}
        textCount={props.textCount} 
        onCloseTextField={props.onCloseTextField}
      />)}
      
      {props.textCount <= 3 && <AddTextFieldBtn textCount={props.textCount} onAddTextField={props.onCloseTextField}/>}

      <div className='upload-section'>
        <button className="upload-btn" onClick={props.uploadImageHandler}>Upload image</button>
        {props.imageUpload && 
          <form className="text-option-form" action="#" method="post" onSubmit={props.submitUploadFile}>
            <input type="file" onChange={props.fileUploadHandler} />
            <button type="submit" >Upload</button>
          </form> 
        }
        <button className="upload-btn" onClick={props.doCapture}>Capture</button>
        <br/>
        
        <label className="image-resize"  for="image-height">Resize Image</label>
          <input 
            type="range" 
            value={props.imageSize}
            name="image-height" 
            min="100" max="1200" 
            onChange={props.imageSizeHandler}
          />
      </div>
    </div>
  )
}

export default OptionsBar