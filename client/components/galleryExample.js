import React, { Component } from 'react';
import { PhotoSwipeGallery } from 'react-photoswipe';

class GalleryExample extends Component {
  constructor() {
    super();
  }
  render() {
    let items = [
      {
        src: '/client/dist/img/gallery/1.png',
        thumbnail: '/client/dist/img/gallery/1.png',
        w: 1200,
        h: 900,
        title: 'Image 1',
      }, {
        src: '/client/dist/img/gallery/2.png',
        thumbnail: '/client/dist/img/gallery/2.png',
        w: 1200,
        h: 900,
        title: 'Image 2',
      }, {
        src: '/client/dist/img/gallery/3.png',
        thumbnail: '/client/dist/img/gallery/3.png',
        w: 1200,
        h: 900,
        title: 'Image 3',
      },
    ];

    let options = {
      //http://photoswipe.com/documentation/options.html
    };

    const getThumbnailContent = (item) => {
      return <img src = {item.thumbnail} width = {120} height = {90} />;
    };

    return (<div>
      <a>{'Show PhotoSwipe'}</a>
      <PhotoSwipeGallery items = {items}
        options = {options}
        thumbnailContent = {getThumbnailContent}
        />
    </div>
    );
  }
}

export default GalleryExample;
