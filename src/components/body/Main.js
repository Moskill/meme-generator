import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const ACTIONS = {
  FETCH_MEMES: 'fetch-memes',
  MEME_TEXT1: 'meme-text1',
  MEME_TEXT2: 'meme-text2',
  TEXT1_TOP: 'text1-top',
  TEXT2_TOP: 'text2-top',
  TEXT1_LEFT: 'text1-left',
  TEXT2_LEFT: 'text2-left',
  TEXT1_FONT: 'text1-font',
  TEXT2_FONT: 'text2-font',
  TEXT1_COLOR: 'text1-color',
  TEXT2_COLOR: 'text2-color',
  IMAGE_SIZE: 'image-size',
  IMAGE_UPLOAD:  'image-upaload',
  SET_FILE: 'set-file'
};

const reducer = (state, action) => {
  console.log(state)
  switch (action.type) {
    case 'text1-top':
      return {    
        text1: {
          top: action.top + '%',
          left: state.text1.left, 
          fontSize: state.text1.fontSize, 
          color: state.text1.color,
          text: state.text1.text
        },
        text2: {...state.text2}
      }

    case 'text2-top':
      return {  
        text1: {...state.text1},
        
        text2: {  
          top: action.top + '%',
          left: state.text2.left, 
          fontSize: state.text2.fontSize, 
          color: state.text2.color,
          text: state.text2.text
        }
      }

    case 'text1-left':
      return {    
        text1: {
          top: state.text1.top,
          left: action.left, 
          fontSize: state.text1.fontSize, 
          color: state.text1.color,
          text: state.text1.text
        },
        text2: {...state.text2}
      }

    case 'text2-left':
      return {  
        text1: {...state.text1},
        
        text2: {  
          top: state.text2.top,
          left: action.left, 
          fontSize: state.text2.fontSize, 
          color: state.text2.color,
          text: state.text2.text
        }
      }

    case 'text1-font':
      return {    
        text1: {
          top: state.text1.top,
          left: state.text1.left, 
          fontSize: action.fontSize, 
          color: state.text1.color,
          text: state.text1.text
        },
        text2: {...state.text2}
      }

    case 'text2-font':
      return {  
        text1: {...state.text1},
        
        text2: {  
          top: state.text2.top,
          left: state.text2.left, 
          fontSize: action.fontSize, 
          color: state.text2.color,
          text: state.text2.text
        }
      }

    case 'text1-color':
      return {    
        text1: {
          top: state.text1.top,
          left: state.text1.left, 
          fontSize: state.text1.fontSize, 
          color: action.fontColor,
          text: state.text1.text
        },
        text2: {...state.text2}
      }

    case 'text2-color':
      return {  
        text1: {...state.text1},
        
        text2: {  
          top: state.text2.top,
          left: state.text2.left, 
          fontSize: state.text2.fontSize, 
          color: action.fontColor,
          text: state.text2.text
        }
      }

    case 'meme-text1':
      return {    
        text1: {
          top: state.text1.top,
          left: state.text1.left, 
          fontSize: state.text1.fontSize, 
          color: state.text1.fontColor,
          text: action.text
        },
        text2: {...state.text2}
      }

    case 'meme-text2':
      return {  
        text1: {...state.text1},
        
        text2: {  
          top: state.text2.top,
          left: state.text2.left, 
          fontSize: state.text2.fontSize, 
          color: state.text1.fontColor,
          text: action.text
        }
      }

    default:
      return {
        text1: {
          top: 30 + '%', 
          left: 0 + '%', 
          fontSize: 18 + 'px', 
          color: '#ffffff',
          text: 'Your first text here!'
        },
        text2: {
          top: 60 + '%', 
          left: 0 + '%', 
          fontSize: 18 + 'px', 
          color: '#ffffff',
          text: 'Your second text here!'
        }
      }
  }
}

function Main() {
  const [textState, dispatch] = useReducer(reducer, {
    text1: {
      top: 40 + '%', 
      left: 0 + '%', 
      fontSize: 18 + 'px', 
      color: '#ffffff',
      text: 'This is your first text...'
    },
    text2: {
      top: 70 + '%', 
      left: 0 + '%', 
      fontSize: 18 + 'px', 
      color: '#ffffff',
      text: 'This is your second text...'
    }
  });

  // Hier werden die Images per API gefetcht
  const fetchUrl = 'https://api.imgflip.com/get_memes';

  const [meme, setMeme] = useState([]); 
  const [memeCount, setMemeCount] = useState(0);
  const [imageSize, setImageSize] = useState();
  const [imageUpload, setImageUpload] = useState(false);
  const [file, setFile] = useState(null);
  // const [imageLoad, setImageLoad] = useState(null);

  const fileUploadHandler = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]) // Funzt das hier?
  }

  // Hier ist der Upload für ein eigenes Bild
  const submitUploadFile = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', file);

    console.log('In der Variable data steht: ', file)

    axios.post('http://localhost:8000/upload', data)
      .then((e) => {console.log('Success')})
      // .then(displayUploadedImage(file.name))
      .catch((e) => console.log(e))
  }

  // console.log(file);

  // const displayUploadedImage = (filename) => {
  //   axios.get(`http://localhost:8000/upload/${filename}`)
  //     .then(res => setImageLoad(res))
  //     .catch(err => console.log('Error getting file!'))
  // }

  // console.log(`http://localhost:8000/upload/${file.name}`)
  
  useEffect(() => {
    fetch(fetchUrl)
    .then(res => res.json())
    .then(data => setMeme(data.data))
    .catch(err => console.log(err))
  }, []);
  
  const handleLastMeme = () => {
    console.log('Count - 1');
    setMemeCount(memeCount - 1);
  }

  // Options for Text1 START
  const handleTextinput = (e) => {
    console.log(e.target.name)
    if(e.target.name === 'text1') {
      dispatch({type: ACTIONS.MEME_TEXT1, text: e.target.value});
    } else if(e.target.name === 'text2') {
      dispatch({type: ACTIONS.MEME_TEXT2, text: e.target.value});
    }
  }
  
  const handleTextTop = (e) => {
    if(e.target.name === 'text1-top') {
      dispatch({type: ACTIONS.TEXT1_TOP, top: e.target.value});
    } else if(e.target.name === 'text2-top') {
      dispatch({type: ACTIONS.TEXT2_TOP, top: e.target.value});
    }
  }
  
  const handleTextLeft = (e) => {
    if(e.target.name === 'text1-left') {
      dispatch({type: ACTIONS.TEXT1_LEFT, left: e.target.value + '%'});
    } else if(e.target.name === 'text2-left') {
      dispatch({type: ACTIONS.TEXT2_LEFT, left:  e.target.value + '%'});
    }
  }
  
  const handleTextFont = (e) => {
    if(e.target.name === 'text1-font') {
      dispatch({type: ACTIONS.TEXT1_FONT, fontSize: e.target.value + 'px'});
    } else if(e.target.name === 'text2-font') {
      dispatch({type: ACTIONS.TEXT2_FONT, fontSize: e.target.value + 'px'});
    }
  }

  const handleTextColor = (e) => {
    if(e.target.name === 'text1-color') {
      dispatch({type: ACTIONS.TEXT1_COLOR, fontColor: e.target.value});
    } else if(e.target.name === 'text2-color') {
      dispatch({type: ACTIONS.TEXT2_COLOR, fontColor: e.target.value});
    }
  }

  const imageSizeHandler = (e) => {
    setImageSize(e.target.value);
  }

  const uploadImageHandler = (e) => {
    imageUpload === false ? setImageUpload(true) : setImageUpload(false);
  }
  
  return (
    <>
    {console.log(parseInt(textState.text1.fontSize.substr(0,2)))}
      <div className="text-option">
        <div className="text1-options">
          <h3>Text 1</h3>
          <label for="text1-top">Top: </label>
          <input 
            name="text1-top" 
            value={parseInt(textState.text1.top.substr(0,2))}
            type="range" 
            min="20" 
            max="100" 
            step="1" 
            onChange={handleTextTop}/>
          <br/>
          <label for="text1-left">Left: </label>
            <input 
              name="text1-left" 
              value={parseInt(textState.text1.left.substr(0,2))}
              type="range" 
              min="0" 
              max="20" 
              step="1" 
              onChange={handleTextLeft}/>
            <br/>
          <label for="text1-font">Font-Size: </label>
            <input 
              name="text1-font" 
              value={parseInt(textState.text1.fontSize.substr(0,2))}
              type="range" 
              min="20" 
              max="80" 
              step="1" 
              onChange={handleTextFont}/>
            <br/>
          <label for="text1-color">Choose color: </label>
            <input 
              name="text1-color" 
              type="color" 
              value={textState.text1.fontColor} 
              onChange={handleTextColor} />
              <br/><br/>
            <input 
              type="text" 
              name="text1" 
              placeholder='This here ist the first text...' 
              onChange={handleTextinput} />
            <br/><br/>
        </div>

        <div className="text2-options">
          <h3>Text 2</h3>
          <label for="text2-top">Top: </label>
            <input 
              name="text2-top" 
              value={parseInt(textState.text2.top.substr(0,2))}
              type="range" 
              min="20" 
              max="100" 
              step="1" 
              onChange={handleTextTop}/>
            <br/>

          <label for="text2-left">Left: </label>
            <input 
              name="text2-left" 
              value={parseInt(textState.text1.left.substr(0,2))}
              type="range" 
              min="0" 
              max="20" 
              step="1" 
              onChange={handleTextLeft}/>
            <br/>

          <label for="text2-font">Font-Size: </label>
            <input 
              name="text2-font" 
              value={parseInt(textState.text2.fontSize.substr(0,2))}
              type="range" 
              min="20" 
              max="80" 
              step="1" 
              onChange={handleTextFont}/>
            <br/>
          <label for="text2-color">Choose color: </label>
            <input 
              name="text2-color" 
              type="color" 
              value={textState.text2.fontColor} 
              onChange={handleTextColor} />
            <br/><br/>
            <input 
              type="text" 
              name="text2"  
              placeholder='This here is the second text...' 
              onChange={handleTextinput} />
            <br/><br/>
        </div>
      </div>
      <button className="upload-btn" onClick={uploadImageHandler}>Upload image</button>
      {imageUpload && 
        <form className="text-option-form" action="#" method="post" onSubmit={submitUploadFile}>
          <input type="file" onChange={fileUploadHandler} />
          <button type="submit" >Upload</button>
        </form> 
      }
      <br/>
      
      <label className="image-resize"  for="image-heigth">Resize Meme</label>
        <input 
          type="range" 
          name="image-height" 
          min="100" max="1200" 
          onChange={imageSizeHandler}
        />

      <div className="random-meme">
        <img style={{width: imageSize + 'px'}} src={meme.memes && meme.memes[memeCount].url} /><br/>
          <p className="meme-text-1" style={{
            top: textState && textState.text1.top, 
            left: textState && textState.text1.left, 
            fontSize: textState && textState.text1.fontSize, 
            color: textState && textState.text1.color, 
            width: imageSize/2.2 + 'px'}} 
            onChange={handleTextTop}>{textState && textState.text1.text}
          </p>
          
          <p className="meme-text-2" style={{
            top: textState && textState.text2.top, 
            left: textState && textState.text2.left, 
            fontSize: textState && textState.text2.fontSize, 
            color: textState && textState.text2.color, 
            width: imageSize/2.2 + 'px'}} 
            onChange={handleTextTop}>{textState && textState.text2.text}
          </p>
      </div>
      
      <div className="pagination">
        {memeCount !== 0 ? <div className="last-btn" onClick={handleLastMeme}>Back</div> : <div className="last-btn" inactive="true">Back</div>}
        <div className="next-btn" onClick={() => setMemeCount(memeCount + 1)}>Next</div><br/><br/>
      </div>
      
    </>
  )
}

export default Main
