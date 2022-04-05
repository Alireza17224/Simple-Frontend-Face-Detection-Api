
const controller = (function(){
    function init(view,model){
        view.elements.timer.innerText = model.elements.timerStart;
       for (let i = 0;i < view.elements.tab.length;i++){
           view.elements.tab[i].addEventListener('click',function(e){
                model.process(this.dataset.name);
                for (let i = 0;i < view.elements.tab.length;i++){
                    view.elements.tab[i].classList.toggle("active-tab");
                }
                for (let i = 0;i < view.elements.new_classes.length;i++){
                    view.elements.new_classes[i].style.display = 'none'
                }
                if (view.elements.btn.classList.contains('left')){
                    view.elements.btn.classList.replace('left','right')
                }
                else {
                    view.elements.btn.classList.replace('right','left')
                }
           })
       }
       for (let i = 0;i < view.elements.line.length;i++){
           view.elements.line[i].addEventListener('click',function(){
               view.elements.line[i].classList.toggle('active-line');
           })
       }
       for (let i = 0;i < view.elements.startChoosing.length;i++){
           view.elements.startChoosing[i].addEventListener('click',function(e){
               if (this.parentElement.querySelector('.active-line') !== undefined && this.parentElement.querySelector('.active-line') !== null){
                    if (this.parentElement.querySelector('.active-line').dataset.mode !== undefined){
                        let mode = this.parentElement.querySelector('.active-line').dataset.mode;
                        if (typeof(mode) == "string") {
                            model.elements.Mode = mode;
                            model.elements.prevPlace = this.parentElement.className;
                            model.changingPosition(this.parentElement,mode)
                        }
                        else {
                            alert('Please choose 1 option')
                        }
                    }
                    else {
                        alert('Please choose 1 option')
                    }
               }
               else {
                alert('Please choose 1 option')
            }
           })
       }
       for (let i = 0;i < view.elements.OpenCamera.length;i++){
           view.elements.OpenCamera[i].addEventListener('click',function(){
            const webcamElement = document.getElementById('webcam');
            const canvasElement = document.getElementById('canvas');
            const snapSoundElement = document.getElementById('snapSound');
            const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement)
            document.querySelector('.video').style.display = 'block'
            webcam.start()
            .then(result =>{
                let animation = setInterval(start,1000)
                function start(){
                    let time = Number(view.elements.timer.innerText);
                    if (time === 0){
                        let form = document.getElementById("myAwesomeForm");
                        let ImageURL  = webcam.snap()
                        var block = ImageURL.split(";");
                        var contentType = block[0].split(":")[1];
                        var realData = block[1].split(",")[1];
                        var blob = model.b64toBlob(realData, contentType);
                        var formDataToUpload = new FormData(form);
                        formDataToUpload.append("photos", blob,"filename.png");
                        // const url = 'API_URL';
                        // fetch(url)
                        // .then(response => response.json())
                        // .then(repos => {
                        //     const reposList = repos.map(repo => repo.name);
                        //     console.log(reposList);
                        // }) Need to change
                        // .catch(err => console.log(err))
                        // Hi , For Making this application run you need to change the above url with your API URL & you might need to change fetch 😎'
                        console.log(formDataToUpload.getAll("photos"))
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
                        view.elements.timer.innerText = time - 1;
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
export default controller;