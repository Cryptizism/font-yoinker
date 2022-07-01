const searchBar = document.querySelector('#website-input');
const searchButton = document.querySelector('#search-button');
const searchContainer = document.querySelector('.search-container');

searchButton.addEventListener('click', sendToFont);

searchBar.addEventListener('change', sendToFont);

searchButton.addEventListener('click', e => {
    e.targ
});

function sendToFont(e) {
    if(searchContainer.childElementCount > 2){ return; }
    const searchTerm = searchBar.value;
    if(searchTerm.length == 0) { return; }
    window.location.href = `/font/${encodeURIComponent(searchTerm)}`;

    const div = document.createElement('div');
    div.className = 'loader';
    
    searchContainer.appendChild(div);
}

const dropDownButtons = document.querySelectorAll('.font-dropdown');

dropDownButtons.forEach(button => {
    button.addEventListener('click', dropDown);
});

function dropDown(e){
    console.log(e.currentTarget);
    var id = e.currentTarget.dataset.id;
    console.log(id);
    var dropdownElem = document.querySelector(`#\\3${id} -drop`);
    console.log(dropdownElem);
    var button = document.querySelector(`div[data-id="${id}"]`);
    if(dropdownElem.style.display == 'none'){
        dropdownElem.style.display = 'block';
        button.className = 'font-dropdown closed';
    } else {
        dropdownElem.style.display = 'none';
        button.className = 'font-dropdown';
    }
}