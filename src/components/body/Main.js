import React, { useState, useEffect, useReducer, createRef, useRef } from 'react';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import html2canvas from 'html2canvas';
import axios from 'axios';
import TextOptions from './TextOptions';
import AddTextFieldBtn from './elements/AddTextFieldBtn';

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
  switch(action['field']) {
    case 'text1': 
      return {
        text1:{
          top: action['action'] === 'top' ? action['value'] + '%' : state.text1.top, 
          left: action['action'] === 'left' ? action['value'] + '%' : state.text1.left, 
          fontSize: action['action'] === 'fontSize' ? action['value'] + 'px' : state.text1.fontSize, 
          color: action['action'] === 'color' ? action['value'] : state.text1.color,
          text: action['action'] === 'text' ? action['value'] : state.text1.text
        },
        text2: {...state.text2},
        text3: {...state.text3},
        text4: {...state.text4}
      }
      
    case 'text2': 
      return {
        text1: {...state.text1},
        text2:{
          top: action['action'] === 'top' ? action['value'] + '%' : state.text2.top, 
          left: action['action'] === 'left' ? action['value'] + '%' : state.text2.left, 
          fontSize: action['action'] === 'fontSize' ? action['value'] + 'px' : state.text2.fontSize, 
          color: action['action'] === 'color' ? action['value'] : state.text2.color,
          text: action['action'] === 'text' ? action['value'] : state.text2.text
        },
        text3: {...state.text3},
        text4: {...state.text4}
      }

    case 'text3': 
      return {
        text1: {...state.text1},
        text2: {...state.text2},
        text3:{
          top: action['action'] === 'top' ? action['value'] + '%' : state.text3.top, 
          left: action['action'] === 'left' ? action['value'] + '%' : state.text3.left, 
          fontSize: action['action'] === 'fontSize' ? action['value'] + 'px' : state.text3.fontSize, 
          color: action['action'] === 'color' ? action['value'] : state.text3.color,
          text: action['action'] === 'text' ? action['value'] : state.text3.text
        },
        text4: {...state.text4}
      }

    case 'text4': 
      return {
        text1: {...state.text1},
        text2: {...state.text2},
        text3: {...state.text3},
        text4:{
          top: action['action'] === 'top' ? action['value'] + '%' : state.text4.top, 
          left: action['action'] === 'left' ? action['value'] + '%' : state.text4.left, 
          fontSize: action['action'] === 'fontSize' ? action['value'] + 'px' : state.text4.fontSize, 
          color: action['action'] === 'color' ? action['value'] : state.text4.color,
          text: action['action'] === 'text' ? action['value'] : state.text4.text
        }
      }
    
    default:
      return {
        text1: {
          top: 38 + '%', 
          left: 45 + '%', 
          fontSize: 18 + 'px', 
          color: 'ffffff',
          text: 'Your first text here!'
        },
        text2: {
          top: 70 + '%', 
          left: 45 + '%', 
          fontSize: 18 + 'px', 
          color: '#ffffff',
          text: 'Your second text here!'
        },
        text3: {
          top: 80 + '%', 
          left: 0 + '%', 
          fontSize: 18 + 'px', 
          color: '#ffffff',
          text: 'Your second text here!'
        },
        text4: {
          top: 90 + '%', 
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
      top: 38 + '%', 
      left: 45 + '%', 
      fontSize: 18 + 'px', 
      color: 'ffffff',
      text: 'This is your first text...'
    },
    text2: {
      top: 70 + '%', 
      left: 45 + '%', 
      fontSize: 18 + 'px', 
      color: '#ffffff',
      text: 'This is your second text...'
    },
    text3: {
      top: 80 + '%', 
      left: 45 + '%', 
      fontSize: 18 + 'px', 
      color: '#ffffff',
      text: 'This is your 3rd text...'
    },
    text4: {
      top: 90 + '%', 
      left: 45 + '%', 
      fontSize: 18 + 'px', 
      color: '#ffffff',
      text: 'This is your 4th text...'
    }
  });

  // Hier werden die Images per API gefetcht
  const fetchUrl = 'https://api.imgflip.com/get_memes';

  const [meme, setMeme] = useState([]); 
  const [memeCount, setMemeCount] = useState(0);
  const [imageSize, setImageSize] = useState();
  const [imageUpload, setImageUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [textCount, setTextCount] = useState(1);
  
  // Hier beginnt die ganze Meme Capture Geschichte
  const ref = createRef();

  // Hier ist die Capture Function
  const doCapture = () => {
    html2canvas(ref.current, {letterRendering: 1, allowTaint : true}).then(canvas => {
      document.body.appendChild(canvas)
    })
  }

  const fileUploadHandler = (e) => {
    setFile(e.target.files[0]);
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

  const handleTextinput = (e) => {
    console.log(e.target.name)
    if(e.target.name === 'text1') {
      dispatch({type: ACTIONS.MEME_TEXT1, text: e.target.value});
    } else if(e.target.name === 'text2') {
      dispatch({type: ACTIONS.MEME_TEXT2, text: e.target.value});
    }
  }
  
  const handleTextTop = (e) => {
    dispatch({field: e.target.name, action: 'top', value: e.target.value});
  }
  
  const handleTextLeft = (e) => {
    dispatch({field: e.target.name, action: 'left', value: e.target.value})
  }
  
  const handleTextFont = (e) => {
    dispatch({field: e.target.name, action: 'fontSize', value: e.target.value})
  }

  const handleTextColor = (e) => {
    dispatch({field: e.target.name, action: 'color', value: e.target.value})
  }

  const imageSizeHandler = (e) => {
    setImageSize(e.target.value);
  }

  const uploadImageHandler = (e) => {
    imageUpload === false ? setImageUpload(true) : setImageUpload(false);
  }
  
  return (
    <>
      {/* Die Text-Edit-Felder */}
      <div className="text-option">
        <TextOptions 
          valueTextTop={parseInt(textState.text1.top.substr(0,2))} 
          valueTextLeft={parseInt(textState.text1.left.substr(0,2))}
          valueFontSize={parseInt(textState.text1.fontSize.substr(0,2))}
          valueTextColor={textState.text1.fontColor} 
          onChangeTop={handleTextTop}
          onChangeLeft={handleTextLeft}
          onChangeFont={handleTextFont}
          onChangeColor={handleTextColor}
          onChangeInput={handleTextinput}
          textNumber={1}
          textCount={textCount} 
          onCloseTextField={setTextCount}
        />

        {textCount > 1 && (
          <TextOptions 
            valueTextTop={parseInt(textState.text2.top.substr(0,2))} 
            valueTextLeft={parseInt(textState.text2.left.substr(0,2))}
            valueFontSize={parseInt(textState.text2.fontSize.substr(0,2))}
            valueTextColor={textState.text2.fontColor} 
            onChangeTop={handleTextTop}
            onChangeLeft={handleTextLeft}
            onChangeFont={handleTextFont}
            onChangeColor={handleTextColor}
            onChangeInput={handleTextinput}
            textNumber={2}
            textCount={textCount} 
            onCloseTextField={setTextCount}
          />
        )}
        {textCount > 2 && (
          <TextOptions 
            valueTextTop={parseInt(textState.text3.top.substr(0,2))} 
            valueTextLeft={parseInt(textState.text3.left.substr(0,2))}
            valueFontSize={parseInt(textState.text3.fontSize.substr(0,2))}
            valueTextColor={textState.text3.fontColor} 
            onChangeTop={handleTextTop}
            onChangeLeft={handleTextLeft}
            onChangeFont={handleTextFont}
            onChangeColor={handleTextColor}
            onChangeInput={handleTextinput}
            textNumber={3}
            textCount={textCount} 
            onCloseTextField={setTextCount}
          />
        )}
        {textCount > 3 && (
          <TextOptions 
            valueTextTop={parseInt(textState.text4.top.substr(0,2))} 
            valueTextLeft={parseInt(textState.text4.left.substr(0,2))}
            valueFontSize={parseInt(textState.text4.fontSize.substr(0,2))}
            valueTextColor={textState.text4.fontColor} 
            onChangeTop={handleTextTop}
            onChangeLeft={handleTextLeft}
            onChangeFont={handleTextFont}
            onChangeColor={handleTextColor}
            onChangeInput={handleTextinput}
            textNumber={4}
            textCount={textCount} 
            onCloseTextField={setTextCount}
          />
        )}
        
        {textCount <= 3 && <AddTextFieldBtn textCount={textCount} onAddTextField={setTextCount}/>}

        <div className='upload-section'>
          <button className="upload-btn" onClick={uploadImageHandler}>Upload image</button>
          {imageUpload && 
            <form className="text-option-form" action="#" method="post" onSubmit={submitUploadFile}>
              <input type="file" onChange={fileUploadHandler} />
              <button type="submit" >Upload</button>
            </form> 
          }
           <button className="upload-btn" onClick={doCapture}>Capture</button>
          <br/>
          
          <label className="image-resize"  for="image-heigth">Resize Image</label>
            <input 
              type="range" 
              value={imageSize}
              name="image-height" 
              min="100" max="1200" 
              onChange={imageSizeHandler}
            />
        </div>
      </div>
      <div className="main-body" >
        <div className="random-meme">
        {memeCount !== 0 ? <div className="last-btn" onClick={handleLastMeme}>◀️</div> : <div className="last-btn" inactive="true">◀️</div>}
          <div className="meme-container" ref={ref}>
          <img style={{width: imageSize + 'px'}} src={meme.memes && meme.memes[memeCount].url} />
              <p className="meme-text-1" style={{
                top: textState && textState.text1.top, 
                left: textState && textState.text1.left, 
                fontSize: textState && textState.text1.fontSize, 
                color: textState && textState.text1.color, 
                width: imageSize/1.2 + 'px'}} 
                onChange={handleTextTop}>{textState && textState.text1.text}
              </p>

              {textCount > 1 && (
                <p className="meme-text-2" style={{
                  top: textState && textState.text2.top, 
                  left: textState && textState.text2.left, 
                  fontSize: textState && textState.text2.fontSize, 
                  color: textState && textState.text2.color, 
                  width: imageSize/1.2 + 'px'}} 
                  onChange={handleTextTop}>{textState && textState.text2.text}
                </p>
              )}
              {textCount > 2 && (
                <p className="meme-text-2" style={{
                  top: textState && textState.text3.top, 
                  left: textState && textState.text3.left, 
                  fontSize: textState && textState.text3.fontSize, 
                  color: textState && textState.text3.color, 
                  width: imageSize/1.2 + 'px'}} 
                  onChange={handleTextTop}>{textState && textState.text3.text}
                </p>
              )}

              {textCount > 3 && (
                <p className="meme-text-2" style={{
                  top: textState && textState.text4.top, 
                  left: textState && textState.text4.left, 
                  fontSize: textState && textState.text4.fontSize, 
                  color: textState && textState.text4.color, 
                  width: imageSize/1.2 + 'px'}} 
                  onChange={handleTextTop}>{textState && textState.text4.text}
                </p>
              )}

            </div>
            <div className="lat-btn-big" onClick={() => setMemeCount(memeCount + 1)}>▶️</div>
        </div>
      </div>
    </>
  )
}

export default Main
