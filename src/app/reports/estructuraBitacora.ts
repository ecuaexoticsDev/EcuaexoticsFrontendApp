import * as json from 'src/assets/json/imgBase64Logo.json';

const ImgLogo = () => {
    return {
      image: json.imageLogo,
      width: 100,
      height: 80,
    };
  };
  
  export const HeaderControl = () => {
    return {
      stack: [
        ImgLogo(),
        {
          text: 'Control de Calidad',
          bold: true,
          fontSize: 16,
          margin: [0, 5, 0, 0],
        },
        {
          text: 'Francisco Boloña 604 y la décima. Edificio Cedipe ',
          fontSize: 8,
        },
        { text: 'Phone: +593 4503-8248', fontSize: 8 },
        {
          text: 'www.ecuaexotics.com',
          fontSize: 8,
          color: '#058FBD',
          link: 'sales@ecuaexotics.com',
        },
        {
          text: 'sales@ecuaexotics.com',
          fontSize: 8,
          color: '#058FBD',
          link: 'sales@ecuaexotics.com',
        },
      ],
      alignment: 'center',
    };
  };