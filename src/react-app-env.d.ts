/// <reference types="react-scripts" />

// https://developers.giphy.com/docs/

interface Image {
  url: string;
  width: string;
  height: string;
}

interface GIF {
  id: string;
  url: string;
  title: string;
  images: {
    fixed_width: Image;
    fixed_width_still: Image;
    fixed_width_downsampled: Image;
  };
}
