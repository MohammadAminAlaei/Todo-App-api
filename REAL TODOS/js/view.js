const button = document.getElementById("submit");
const main = document.querySelector('main');
const myModal = document.querySelector('.classModal');
const modalCancel = document.getElementById('modalCancel')
const modalClose = document.getElementById('modalClose')
const modalDelete = document.getElementById('modalDelete');
const showInformations = document.getElementById('showInformations');
const saveInd = document.getElementById('saveInd');
const modalId = document.getElementById('modalId');

const displayTodo = async (page) => {

    //page=1
    //page=1  0-10
    //page=2  10-20
    //page=3  20-30

    let url = await fetch('https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos')

    let data = await url.json()

    console.log(data)

    let htmlCode = "";

    console.log(data)
    data.reverse()

    data = data.filter(function (value, index, arr) {
        return index >= (page - 1) * 10 && index < (page) * 10;
    });

    console.log(data.length)

    data.forEach((list) => {
        let index = list.id;
        htmlCode += `
            <div class="row justify-content-align-content-between my-5">
                <div class="col-10 d-flex align-items-center padd">
                    <input type="checkbox" onclick="checkFunction(this,${index})" id="checkBox${index}" ${list.checked === true ? 'checked' : ''}> <label for="checkBox${index}" class="w-100 ms-4 p-1 fs-5"> <a class="${list.checked === true ? 'delete' : ''}">${list.title}</a> </label>
                </div>
                <div class="col-2 d-flex justify-content-end">
                <button class="icon btn-edite" onclick="editor(${index}, this)"><i class="fas fa-pencil-alt"></i></button>
                <button class="icon btn-delete" onclick="handleDelete(${index})"><i class="fas fa-trash-alt"></i></button>
            </div>
            </div>`;
    });

    main.innerHTML = htmlCode;
};


const checkFunction = async (event, index) => {
    console.log("here")
    const tagA = event.nextElementSibling.querySelector('a');
    tagA.classList.toggle('delete');

    //ahsant
    let checked;

    let oldTodo = await fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${index}`);
    oldTodo = await oldTodo.json()
    if (oldTodo.checked === false) {
        checked = true
    } else {
        checked = false
    }
    let option = {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            checked
        })
    }
    let updatedTodo = await fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${index}`, option);
    console.log(await updatedTodo.json())
    //re

    displayTodo(page);
};

const handleDelete = async (index) => {

    myModal.style.display = 'block';

    modalCancel.addEventListener('click', () => {
        myModal.style.display = 'none';
    });

    modalClose.addEventListener('click', async () => {
        myModal.style.display = 'none';
    });

    let getUrl = await fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${index}`).then(res => res.json());

    showInformations.innerHTML = `
        <b>id</b> <span>${getUrl.id}</span><br>
        <b>Title</b>: ${getUrl.title}<br>
        <b>Description</b>: ${getUrl.description}<br>
        <b>Due Date</b>: ${getUrl.dueDate}<br>
        <b>Created Date</b>: ${getUrl.createdAt}<br>
        <b>Updated Date</b>: ${getUrl.updatedAt}<br>
        <b>Checked</b>: ${getUrl.checked}<br>
        `;

    displayTodo(page);

};

//modalDelete.addEventListener('click', handleDeleteId)

async function handleDeleteId(event) {
    let index = event.parentElement.parentElement.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.innerHTML;
    console.log(index)

    myModal.style.display = 'none'
    let option = {
        method: "DELETE"
    }

    let deletedTodo = await fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${index}`, option);

    console.log(await deletedTodo.json());


    deletedTodo === "Not found" ? 'http://localhost:63342/REAL%20TODOS/notFound.html?_ijt=80ca01rine4sbiugt912ljdgcl&_ij_reload=RELOAD_ON_SAVE' : false


    let divSuccessDelete = document.createElement('div');
    let buttonSuccessDelete = document.createElement('button');
    buttonSuccessDelete.innerHTML = '&times';
    buttonSuccessDelete.classList.add('teastButton');
    divSuccessDelete.innerHTML = 'Your Todo has been successfully Deleted';
    divSuccessDelete.classList.add('toastt');
    divSuccessDelete.append(buttonSuccessDelete)
    document.body.append(divSuccessDelete);
    buttonSuccessDelete.addEventListener('click', (e) => {
        e.target.parentElement.style.opacity = '0';
    })
    setTimeout(() => {
        divSuccessDelete.remove();
    }, 3900);
    displayTodo(page)
    //modalDelete.removeEventListener('click', successDelete)
}

const editor = (index) => {
    window.location.href = `http://localhost:63342/REAL%20TODOS/index.html?id=${index}`;
};

window.addEventListener('click', (e) => {
    e.target === myModal ? myModal.style.display = "none" : false;
});

let page = 1;

if (window.location.search.split("=")[1]) {
    page = Number(window.location.search.split("=")[1])
}

document.addEventListener('DOMContentLoaded', () => {
    displayTodo(page);
});


