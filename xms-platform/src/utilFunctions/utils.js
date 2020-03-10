export const utils = {
    elementsPushHandler: (array, element) => {
        if(!array.includes(element)) 
            array.push(element)
    },
    elementPopHandler: (array, element) => {
        let index = array.indexOf(element);
        let temp = array.splice(index, 1);
    },
    imageToBase64Converter: (image, callback) => {
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
          callback(reader.result)
        }
      }
}
