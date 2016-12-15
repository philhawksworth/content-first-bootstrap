var toggle = document.querySelectorAll('.page-purpose__toggle');

document.addEventListener('click', function(event){

    if(event.target.classList.contains('page-purpose__toggle')) {

        event.preventDefault();
        event.target.blur();

        // toggle the infoe drawer
        var content = document.querySelector('.page-purpose .container');
        content.classList.toggle('hide');

        // toggle the sections info
        var sections = document.querySelectorAll('section');
        for(var section in sections) {
            sections[section].classList.toggle('quiet');
        }
    }
    
}, false);