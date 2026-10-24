// Requires an existing Sharp installation, not an application dependency.
// SHARP_MODULE=/absolute/path/to/sharp node docs/brand/tools/rasterize-production-assets.cjs
const path=require('path');
const sharp=require(process.env.SHARP_MODULE||'sharp');
const root=path.resolve(__dirname,'../../..');
const pub=path.join(root,'public');
(async()=>{
  for(const size of [16,24,32,48,64])await sharp(path.join(pub,'brand/favicon.svg')).resize(size,size).png().toFile(path.join(pub,`brand/favicon-${size}.png`));
  for(const [name,size]of [['logo192.png',192],['logo512.png',512],['apple-touch-icon.png',180]])await sharp(path.join(pub,'brand/app-icon.svg')).resize(size,size).png().toFile(path.join(pub,name));
  await sharp(path.join(pub,'brand/app-icon.svg')).resize(512,512).png().toFile(path.join(pub,'brand/icon-maskable-512.png'));
  await sharp(path.join(pub,'brand/social-share.svg')).png().toFile(path.join(pub,'brand/social-share.png'));
  console.log('Rendered favicons 16–64, app icons 180/192/512, maskable icon and 1200×630 share image.');
})().catch(error=>{console.error(error);process.exitCode=1});
