import React, { useState, useEffect } from 'react';
import HTMLFlipBook from "react-pageflip";
import axios from 'axios';
import integetosFiu from './img/IntegetosFiu.png';
import integetosLany from './img/IntegetosLany.png';
import urhajok from './img/urhajok.png';
import logo from './img/logo inverz.png';


const tortenet = (bigStory) => {
  const sorok = bigStory.split('\n');
  const formattedStory = sorok.join('<br>');

  return { __html: formattedStory };
}

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        
        <div class="container-egyedi">
          <div class="row">
            <div class="col-4">
              <h6 className="page-header">{props.cim}</h6>
            </div>
            <div class="col-4">

            </div>
            <div class="col-4">
              <div className="page-number">{parseInt(props.number) + 1}. oldal</div>
            </div>
          </div>
        </div>

        <br />

        <div className="page-image"></div>
        <div dangerouslySetInnerHTML={tortenet(props.children)}></div>

        <div className='number-container'>
          {parseInt(props.number) % 2 === 0 ? (
            <div className="page-number-bottom-ptlan">{parseInt(props.number) + 1}. oldal</div>
          ) : null}
          {parseInt(props.number) % 2 !== 0 ? (
            <div className="page-number-bottom-prs">{parseInt(props.number) + 1}. oldal</div>
          ) : null}
        </div>
      </div>
    </div>
  );
});

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <div className='top-right'>
          <img src={logo} alt="nem tolt be"  className='kep' />
        </div>

        <h2 className='book-title'>{props.children}</h2>
        <hr className='hr' />
        <p>Készítette: <span className='bold italic'>Ujj Norbert</span></p>

        <div className='bottom-right'>
          <img src={integetosLany} alt="nem tolt be"  className='kep'/>
        </div>

        <div className='bottom-left'>
          <img src={integetosFiu} alt="nem tolt be" className='kep' />
        </div>
      </div>
      
    </div>
  );
});
  
function MyBook(props) {
  const oldalakraBontottSzavak = (bigStory, szavakPerOldal) => {
    const szavak = bigStory.split(' ');
    const oldalak = [];
  
    let currentIndex = 0;
    while (currentIndex < szavak.length) {
      const currentOldalSzavai = szavak.slice(currentIndex, currentIndex + szavakPerOldal);
      oldalak.push(currentOldalSzavai.join(' '));
      currentIndex += szavakPerOldal;
    }
  
    return oldalak;
  }

  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/stories', {  // Figyelj a hivatkozásra!
      headers: {
        'Access-Control-Allow-Origin': '*',  // Engedélyezed az összes eredetet
        'Content-Type': 'application/json',
      },
      withCredentials: true
    })
    .then(response => {
      setStories(response.data);
    })
    .catch(error => {
      console.error('Error fetching stories:', error);
    });
  }, []);

  const szavakPerOldal = 60;
  let oldal = 1;

  return (
    <HTMLFlipBook 
      width={850}
      height={1000}
      size="stretch"
      minWidth={315}
      maxWidth={850}
      minHeight={400}
      maxHeight={1000}
      maxShadowOpacity={0.5}
      showCover={true}
      mobileScrollSupport={true}>

      <PageCover>Amigos történetek</PageCover>
      
      {stories.map((story, index) => (
        oldalakraBontottSzavak(story?.story, szavakPerOldal).map((item, index) => (
          <Page key={index + 1} number={oldal++} cim={story.title}>{item}</Page>
        ))
      ))}


    </HTMLFlipBook>
  );
}

export default MyBook