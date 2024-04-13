import React from 'react';
import HTMLFlipBook from 'react-pageflip';

class MyBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 0 };
    this.flipBook = React.createRef();
  }

  nextPage = () => {
    this.flipBook.current.getPageFlip().flipNext();
    this.setState({ page: this.state.page + 1 });
  };

  prevPage = () => {
    this.flipBook.current.getPageFlip().flipPrev();
    this.setState({ page: this.state.page - 1 });
  };

  render() {
    return (
      <div>
        <button onClick={this.prevPage}>Előző oldal</button>
        <button onClick={this.nextPage}>Következő oldal</button>
        <HTMLFlipBook ref={this.flipBook} width={300} height={500} size="stretch" minWidth={100} maxWidth={1000} minHeight={100} maxHeight={1000} maxShadowOpacity={0.5} showCover={true} mobileScrollSupport={true}>
          <div className="demoPage">1. oldal</div>
          <div className="demoPage">2. oldal</div>
          <div className="demoPage">3. oldal</div>
          <div className="demoPage">4. oldal</div>
        </HTMLFlipBook>
      </div>
    );
  }
}

export default MyBook;