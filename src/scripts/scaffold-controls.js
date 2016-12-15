var toggle = document.querySelectorAll('.page-purpose__toggle');

document.addEventListener('click', function(event){

    if(event.target.classList.contains('page-purpose__toggle')) {
        event.preventDefault();
        var content = document.querySelector('.page-purpose .container');
        content.classList.toggle('hide');
        event.target.blur();
    }
    else if(event.target.classList.contains('page-sections__toggle')) {
        event.preventDefault();
        var sections = document.querySelectorAll('section');
        for(var section in sections) {
            sections[section].classList.toggle('quiet');
        }
        event.target.blur();
    }
    

}, false);