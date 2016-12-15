var toggle = document.querySelectorAll('.page-purpose__toggle');

document.addEventListener('click', function(event){

    if(!event.target.classList.contains('page-purpose__toggle')) return;
    event.preventDefault();
    var content = document.querySelector('.page-purpose .container');
    content.classList.toggle('hide');
    event.target.blur();

}, false);