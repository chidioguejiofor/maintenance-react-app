/* eslint react/no-array-index-key: off */
import React from 'react';

const social = [
  {
    name: 'facebook',
    link: '#',
    imgSrc: 'https://image.flaticon.com/icons/svg/145/145802.svg',
    width: '30px',
  },
  {
    name: 'linkedin',
    link: '#',
    imgSrc: 'https://image.flaticon.com/icons/svg/145/145807.svg',
    width: '30px',
  },
  {
    name: 'twitter',
    link: '#',
    imgSrc: 'https://image.flaticon.com/icons/svg/145/145812.svg',
    width: '30px',
  },
  {
    name: 'google',
    link: '#',
    imgSrc: 'https://image.flaticon.com/icons/svg/145/145804.svg',
    width: '30px',
  },
];
const SocialLogoGrid = (() => (
  <ul className=" horizontal-list flex-center-box">
    {social instanceof Array
    && social.map(({ link, imgSrc, name, width, height }, index) => (
      <li key={index}>
        <a href={link}>
          <img
            src={imgSrc}
            alt={name}

            width={width || 'auto'}
            height={height || 'auto'}
          />
        </a>
      </li>
    ))}
  </ul>
)
);


export default SocialLogoGrid;
