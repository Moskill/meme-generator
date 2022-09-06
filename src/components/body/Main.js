import React, { useState, useEffect, useReducer, createRef, useRef } from 'react';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import html2canvas from 'html2canvas';
import axios from 'axios';
// import TextOptions from './TextOptions';
import AddTextFieldBtn from './elements/AddTextFieldBtn';
import OptionsBar from './OptionsBar/OptionsBar';
import MemeText from './elements/MemeText';


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
  const canvasContainer = createRef();
  const customCanvas = document.getElementById('customCanvas');
  
  // Hier ist die Capture Function
  const doCapture = () => {
    // html2canvas(ref.current, {letterRendering: 1, allowTaint : true, canvas: true}).then(canvas => {
    //   document.body.appendChild(canvas)
    // })
    html2canvas(ref.current, {letterRendering: 1, allowTaint : true, canvas: customCanvas, scale: 1}).then(canvas => {
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
    dispatch({field: e.target.name, action: 'text', value: e.target.value})
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
      <OptionsBar
        textValues={textState}
        onChangeTop={handleTextTop}
        onChangeLeft={handleTextLeft}
        onChangeFont={handleTextFont}
        onChangeColor={handleTextColor}
        onChangeInput={handleTextinput}
        textNumber={["text1", "text2", "text3", "text4"]}
        textCount={textCount} 
        onCloseTextField={setTextCount}
      />
      <div className="main-body" >
        <div className="random-meme">
        {memeCount !== 0 ? <div className="last-btn" onClick={handleLastMeme}>◀️</div> : <div className="last-btn" inactive="true">◀️</div>}
          <div className="meme-container" ref={ref}>
          <img style={{width: imageSize + 'px'}} src={meme.memes && meme.memes[memeCount].url} />
            <MemeText
              handleTextTop={handleTextTop}
              top={textState && textState.text1.top}
              left={textState && textState.text1.left}
              fontSize={textState && textState.text1.fontSize}
              color={textState && textState.text1.color}
              width={imageSize/1.2}
              text={textState && textState.text1.text}
            />
              {/* <p className="meme-text-1" style={{
                top: textState && textState.text1.top, 
                left: textState && textState.text1.left, 
                fontSize: textState && textState.text1.fontSize, 
                color: textState && textState.text1.color, 
                width: imageSize/1.2 + 'px'}} 
                onChange={handleTextTop}>{textState && textState.text1.text}
              </p> */}

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
      <div className="canvas-container" ref={canvasContainer}>
        <canvas className="custom-canvas" id="customCanvas" height={imageSize} width="auto"></canvas>
      </div>
    </>
  )
}

export default Main
