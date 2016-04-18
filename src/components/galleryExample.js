import {PhotoSwipe} from 'react-photoswipe';
import {PhotoSwipeGallery} from 'react-photoswipe';
var React = require('react');

class GalleryExample extends React.Component {
  constructor (){
    super();
  }
  render(){
    let items = [
  {
    src: '/dist/img/gallery/1.jpg',
    thumbnail: '/dist/img/gallery/1.jpg',
    w: 1200,
    h: 900,
    title: 'Image 1'
  },
  {
    src: '/dist/img/gallery/2.jpg',
    thumbnail: '/dist/img/gallery/2.jpg',
    w: 1200,
    h: 900,
    title: 'Image 2'
  },
  {
    src: '/dist/img/gallery/3.jpg',
    thumbnail: '/dist/img/gallery/3.jpg',
    w: 1200,
    h: 900,
    title: 'Image 2'
  },
];

let options = {
  //http://photoswipe.com/documentation/options.html
};

const getThumbnailContent = (item) => {
  return (
    <img src={item.thumbnail} width={120} height={90}/>
  );
}

  return (
    <div>
      <a > Show PhotoSwipe </a>
      <PhotoSwipeGallery items={items} options={options} thumbnailContent={getThumbnailContent}/>
    </div>
    )
  }
}

 export default GalleryExample;
