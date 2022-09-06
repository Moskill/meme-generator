import React from 'react'

const MemeText = (props) => {
  console.log(props)
  return (
  <>
    <p className="meme-text-1" style={{
      top: props && props.top, 
      left: props && props.left, 
      fontSize: props && props.fontSize, 
      color: props && props.color, 
      width: (props.imageSize)/1.2 + 'px'}} 
      onChange={props.handleTextTop}>
        {props.text}
    </p>
  </>
  )
}

export default MemeText