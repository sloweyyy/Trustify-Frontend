import React from 'react';

// Outlined SVG lettering keeps the approved mark independent of font loading.
const BrandLogo = ({ variant = 'color', width = 150 }) => (
  <img
    src={`${process.env.PUBLIC_URL || ''}/brand/logo-${variant}.svg`}
    alt="Trustify"
    width={width}
    height={(width * 64) / 240}
    style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
  />
);

export default BrandLogo;
