const ui = (function(){
    let elements = {
        tab : document.getElementsByClassName('tab'),
        btn : document.querySelector('.btn'),
        line : document.getElementsByClassName('line'),
        startChoosing : document.getElementsByClassName('startChoosing'),
        new_classes : document.getElementsByClassName('new-classes'),
        OpenCamera : document.getElementsByClassName('OpenCamera'),
        timer : document.querySelector('.timer'),
    }
    return {
        elements,
    }
})()
const model = (function(){
    let elements = {
        Mode : '',
        prevPlace : '',
        timerStatus : false , 
        timerStart : 5,
    }
    function process(className){
        for (let i = 0;i < ui.elements.tab.length;i++){
            document.querySelector(`.${ui.elements.tab[i].dataset.name}`).style.display = 'none'
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
const controller = (function(){
    function init(){
        ui.elements.timer.innerText = model.elements.timerStart;
       for (let i = 0;i < ui.elements.tab.length;i++){
           ui.elements.tab[i].addEventListener('click',function(e){
                model.process(this.dataset.name);
                for (let i = 0;i < ui.elements.tab.length;i++){
                    ui.elements.tab[i].classList.toggle("active-tab");
                }
                for (let i = 0;i < ui.elements.new_classes.length;i++){
                    ui.elements.new_classes[i].style.display = 'none'
                }
                if (ui.elements.btn.classList.contains('left')){
                    ui.elements.btn.classList.replace('left','right')
                }
                else {
                    ui.elements.btn.classList.replace('right','left')
                }
           })
       }
       for (let i = 0;i < ui.elements.line.length;i++){
           ui.elements.line[i].addEventListener('click',function(){
               for (let x = 0;x < ui.elements.line.length;x++){
                   ui.elements.line[x].classList.remove('active-line');
               }
               ui.elements.line[i].classList.add('active-line');
           })
       }
       for (let i = 0;i < ui.elements.startChoosing.length;i++){
           ui.elements.startChoosing[i].addEventListener('click',function(e){
               if (this.parentElement.querySelector('.active-line') !== undefined && this.parentElement.querySelector('.active-line') !== ""){
                    let mode = this.parentElement.querySelector('.active-line').dataset.mode;
                    if (typeof(mode) == "string") {
                        model.elements.Mode = mode;
                        model.elements.prevPlace = this.parentElement.className;
                        model.changingPosition(this.parentElement,mode)
                    }
               }
           })
       }
       for (let i = 0;i < ui.elements.OpenCamera.length;i++){
           ui.elements.OpenCamera[i].addEventListener('click',function(){
            const webcamElement = document.getElementById('webcam');
            const canvasElement = document.getElementById('canvas');
            const snapSoundElement = document.getElementById('snapSound');
            const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement)
            document.querySelector('.video').style.display = 'block'
            webcam.start()
            .then(result =>{
                let animation = setInterval(start,1000)
                function start(){
                    let time = Number(ui.elements.timer.innerText);
                    if (time === 0){
                        let form = document.getElementById("myAwesomeForm");
                        let ImageURL  = webcam.snap()
                        var block = ImageURL.split(";");
                        var contentType = block[0].split(":")[1];
                        var realData = block[1].split(",")[1];
                        var blob = model.b64toBlob(realData, contentType);
                        var formDataToUpload = new FormData(form);
                        formDataToUpload.append("image", blob,"filename.png");
                        // const url = 'https://api.github.com/users/shrutikapoor08/repos';
                        // fetch(url)
                        // .then(response => response.json())
                        // .then(repos => {
                        //     const reposList = repos.map(repo => repo.name);
                        //     console.log(reposList);
                        // }) Need to change
                        // .catch(err => console.log(err))
                        console.log(formDataToUpload.getAll("image"))
                        clearInterval(animation)
                        webcam.stop();
                        for (let i = 0;i < document.getElementsByTagName('button').length;i++){
                            document.getElementsByTagName('button')[i].disabled = true;
                        }
                        document.querySelector('.video').style.left = '-400px';
                        model.elements.timerStatus = true;
                        console.log(ImageURL)
                    }
                    else {
                        ui.elements.timer.innerText = time - 1;
                    }
                }
            })
            .catch(err => {
                alert(err)
            });
           })
       }
    }
    return {
        init
    }
})()
controller.init()