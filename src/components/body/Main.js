import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Main() {

  const fetchUrl = 'https://api.imgflip.com/get_memes';

  const [meme, setMeme] = useState([]); 
  const [memeCount, setMemeCount] = useState(0);
  const [memeTexts, setMemeTexts] = useState({text1: 'Your first text here', text2: 'Your second text here'});
  const [optionsText1, setOptionsText1] = useState({top: 30 + '%', left: 0 + '%', fontSize: 18 + 'px', color: '#ffffff'});
  const [optionsText2, setOptionsText2] = useState({top: 60 + '%', left: 0 + '%', fontSize: 18 + 'px', color: '#ffffff'});
  const [imageSize, setImageSize] = useState();
  const [imageUpload, setImageUpload] = useState(false);
  const [file, setFile] = useState(null);

  const fileUploadHandler = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]) // Funzt das hier?
  }

  const submitUploadFile = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', file);

    axios.post('//localhost:3000/upload', data)
      .then((e) => {console.log('Success')})
      .catch((e) => console.log(e))
  }
  
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
  const handleTextinput1 = (e) => {
    setMemeTexts({text1: e.target.value, text2: memeTexts.text2});
  }
  
  const handleText1Top = (e) => {
    setOptionsText1({top: e.target.value + '%', left: optionsText1.left + '%', fontSize: optionsText1.fontSize + 'px', color: optionsText1.color})
  }
  
  const handleText1Left = (e) => {
    setOptionsText1({top: optionsText1.top, left: e.target.value + '%', fontSize: optionsText1.fontSize + 'px', color: optionsText1.color})
  }
  
  const handleText1Font = (e) => {
    setOptionsText1({top: optionsText1.top, left: optionsText1.left + '%', fontSize: e.target.value + 'px', color: optionsText1.color})
  }

  const handleText1Color = (e) => {
    console.log(e.target.value)
    setOptionsText1({top: optionsText1.top, left: optionsText1.left + '%', fontSize: optionsText1.fontSize + 'px', color: e.target.value})
  }
  // Options for Text1 END
  
  // Options for Text2 START
  const handleTextinput2 = (e) => {
    setMemeTexts({text1: memeTexts.text1, text2: e.target.value});
  }
  
  const handleText2Top = (e) => {
    setOptionsText2({top: e.target.value + '%', left: optionsText2.left + '%', fontSize: optionsText2.fontSize + 'px', color: optionsText2.color})
  }
  
  const handleText2Left = (e) => {
    setOptionsText2({top: optionsText2.top, left: e.target.value + '%', fontSize: optionsText2.fontSize + 'px', color: optionsText2.color})
  }
  
  const handleText2Font = (e) => {
    setOptionsText2({top: optionsText2.top, left: optionsText2.left + '%', fontSize: e.target.value + 'px', color: optionsText2.color})
  }

  const handleText2Color = (e) => {
    setOptionsText2({top: optionsText2.top, left: optionsText2.left + '%', fontSize: optionsText2.fontSize + 'px', color: e.target.value})
  }
  // Options for Text1 END

  const imageSizeHandler = (e) => {
    setImageSize(e.target.value)
  }

  const uploadImageHandler = (e) => {
    imageUpload === false ? setImageUpload(true) : setImageUpload(false);
  }
  
  return (
    <>
      <div className="text-option">
        <div className="text1-options">
          <h3>Text 1</h3>
          <label for text1-top>Top: </label>
            <input name="text1-top" type="range" min="20" max="100" step="0.3" onChange={handleText1Top}/><br/>
          <label for text1-left>Left: </label>
            <input name="text1-left" type="range" min="0" max="20" step="0.3" onChange={handleText1Left}/><br/>
          <label for text1-font>Font-Size: </label>
            <input name="text1-font" type="range" min="20" max="80" step="0.5" onChange={handleText1Font}/><br/>
          <label for="color-tex1">Choose color: </label>
            <input name="color-text1" type="color" value={optionsText1.color} onChange={handleText1Color} /><br/><br/>
            <input type="text" placeholder={memeTexts.text1} onChange={handleTextinput1} /><br/><br/>
        </div>

        <div className="text2-options">
          <h3>Text 2</h3>
          <label for text2-top>Top: </label>
            <input name="text2-top" type="range" min="20" max="100" step="0.3" onChange={handleText2Top}/><br/>
          <label for text2-left>Left: </label>
            <input name="text2-left" type="range" min="0" max="20" step="0.3" onChange={handleText2Left}/><br/>
          <label for text2-font>Font-Size: </label>
            <input name="text2-font" type="range" min="20" max="80" step="0.5" onChange={handleText2Font}/><br/>
          <label for="color-text2">Choose color: </label>
            <input name="color-text2" type="color" value={optionsText2.color} onChange={handleText2Color} /><br/><br/>
            <input type="text" placeholder={memeTexts.text2} onChange={handleTextinput2} /><br/><br/>
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
        <input type="range" name="image-height" min="0" max="1200" onChange={imageSizeHandler} />
      <div className="random-meme">
        <img style={{width: imageSize + 'px'}} src={meme.memes && meme.memes[memeCount].url} /><br/>
          <p className="meme-text-1" style={{top: optionsText1.top, left: optionsText1.left, fontSize: optionsText1.fontSize, color: optionsText1.color, width: imageSize/2.2 + 'px'}} onChange={handleText1Top}>{memeTexts.text1}</p>
          <p className="meme-text-2" style={{top: optionsText2.top, left: optionsText2.left, fontSize: optionsText2.fontSize, color: optionsText2.color, width: imageSize/2.2 + 'px'}} onChange={handleText2Top}  >{memeTexts.text2}</p>
      </div>
      
      <div className="pagination">
        {memeCount !== 0 ? <div className="last-btn" onClick={handleLastMeme}>Back</div> : <div className="last-btn" inactive>Back</div>}
        <div className="next-btn" onClick={() => setMemeCount(memeCount + 1)}>Next</div><br/><br/>
      </div>
      
    </>
  )
}

export default Main
