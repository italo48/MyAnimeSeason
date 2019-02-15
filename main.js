let btnElement = document.querySelectorAll('main#app button');
let inputElement = document.querySelectorAll('main#app input');
let listElement = document.querySelectorAll('main#app ul');
let optionElement = document.querySelector('main#app select');

let animes = JSON.parse(localStorage.getItem('animes')) || [];

function isValidInput(input) {
    if (input.value.length === 0 || !input.value.trim(' ')) {
        return false;
    }
    return true;
}

// renderiza o conteudo de 'data' que é um vetor de ojetos do localStorage 
// com base no 'idList' que o id de um elemento ul dentro de listElement
function render(idList, dataStorage) {
    if (dataStorage.length === 0) {
        listElement[idList].innerHTML = 'Não há animes';    
    } else {
        listElement[idList].innerHTML = ' ';
        for (data of dataStorage) {
            let itemElement = document.createElement('li');
            let textElement = document.createTextNode(data);
    
            let btnDeleteElement = document.createElement('a');
            let textBtnDeleteElement = document.createTextNode('x');
    
            let pos = animes.indexOf(data);
    
            btnDeleteElement.appendChild(textBtnDeleteElement);
            btnDeleteElement.setAttribute('href', '#');
            btnDeleteElement.setAttribute('onclick', `remove(${idList}, ${pos})`);
    
            itemElement.appendChild(textElement);
            itemElement.appendChild(btnDeleteElement);
    
            listElement[idList].appendChild(itemElement);
        }
    }
}

function add(idList, nameDataStorage, dataStorage, idInput) {
    // existe uma forma mais correta de fazer isso, porem não é tao simples.
    let itemText = inputElement[idInput].value + ' - ' + optionElement.value;

    dataStorage.push(itemText);
    inputElement[idInput].value = '';
    render(idList, dataStorage);
    saveToStorage(nameDataStorage, dataStorage);
}


function remove(idDataStorage, pos) {
    if (idDataStorage === 0){
        animes.splice(pos, 1);
        render(0, animes)
        saveToStorage('animes', animes);
    } else if (idDataStorage === 1) {
        links.splice(pos, 1);
        render(1, links)
        saveToStorage('links', links);
    }
}

function saveToStorage(nameDataStorage, dataStorage) {
    localStorage.setItem(nameDataStorage, JSON.stringify(dataStorage));
}

render(0, animes);

btnElement[0].onclick = () => {
    if (!isValidInput(inputElement[0])) {
        alert("O campo não pode ser vazio ou conter apenas espaços!!");
        inputElement[0].value = '';
        return;
    }
    add(0, 'animes', animes, 0);
};
