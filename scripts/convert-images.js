import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import imageminSvgo from 'imagemin-svgo';

const convertImagesToWebP = async () => {
  const inputPath = 'src/assets/images';
  const outputPath = 'src/assets/webp';
  console.log('inputPath', inputPath);
  await imagemin([`${inputPath}/*.{jpg,png,svg}`], {
    destination: outputPath,
    plugins: [
      imageminWebp({
        quality: 75, // Adjust the quality (0 to 100)
      }),
      imageminSvgo({
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
        ],
      }),
    ],
  });

  console.log('Images converted to WebP!');
};

convertImagesToWebP();
