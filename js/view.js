const view = (function(){
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
export default view;