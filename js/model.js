import view from "./view.js";
const model = (function(){
    let elements = {
        Mode : '',
        prevPlace : '',
        timerStatus : false , 
        timerStart : 5,
    }
    function process(className){
        for (let i = 0;i < view.elements.tab.length;i++){
            document.querySelector(`.${view.elements.tab[i].dataset.name}`).style.display = 'none'
        }
        document.querySelector(`.${className}`).style.display = 'block';
    }
    function changingPosition(parentElement,Mode){
        parentElement.style.display = 'none';
        document.querySelector(`.${Mode}`).style.display = 'block';
    }
    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }
    return {
        elements , 
        process , 
        changingPosition , 
        b64toBlob , 
    }
})()
export default model;