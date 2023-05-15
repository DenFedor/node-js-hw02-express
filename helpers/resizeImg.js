const Jimp = require("jimp");

// const resizeImg =(tmpPath) => {
//  return Jimp.read(tmpPath, (err, image) => {
//     if (err) throw err;
//     image
//       .resize(250, 250) // resize
//       .write(tmpPath); // save
//   });
// };
const resizeImg = async (tmpPath) => {
 await Jimp.read(tmpPath)
    .then((image) => {
      console.log("inside Jimp");
      return image
        .resize(250, 250) // resize
        .write(tmpPath); // save
    })
    .catch((err) => {
      console.error(err);
    });
  console.log("after Jimp in resizeImg");
};
module.exports = resizeImg;
