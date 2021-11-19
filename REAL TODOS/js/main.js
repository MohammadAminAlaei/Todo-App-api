const input = document.getElementById("input");
const button = document.getElementById("submit");
const edit = document.getElementById('edit');
const subInput = document.getElementById('subInputText');
const textarea = document.getElementById('description')
const datedue = document.getElementById('dueDate');

let checkUrl = window.location.search;

if (checkUrl.includes('=')) {
    handleEdit();

    async function handleEdit() {

        let index = checkUrl.split('=')[1];
        if (isNaN(index))
            return
        button.style.display = 'none'
        edit.style.display = 'block';
        console.log("aaaaa", index)

        let BASE = await fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${index}`).then(res => {
            return res.json()
        }).catch((e) => {
            console.log("errrr", e)
        });

        if (BASE === "Not found" || status === '404') {
            //not found
            window.location.href = 'http://localhost:63342/REAL%20TODOS/notFound.html?_ijt=80ca01rine4sbiugt912ljdgcl&_ij_reload=RELOAD_ON_SAVE'
            return;
        }

        input.value = BASE.title;
        edit.addEventListener('click', async (e) => {
            e.preventDefault()
            if (input.value === '') return;
            let options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: input.value,
                    description: textarea.value || BASE.description,
                    updatedAt: new Date().toISOString(),
                    dueDate: datedue.value ? (new Date(datedue.value).toISOString()) : BASE.dueDate,
                })
            }

            await fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${index}`, options);

            const divEdite = document.createElement('div');
            const editeClose = document.createElement('button');
            editeClose.innerHTML = '&times';
            editeClose.classList.add('teastButton');
            divEdite.innerHTML = 'Your Todo has been Eddited successfully';
            divEdite.classList.add('toastt');
            divEdite.appendChild(editeClose)
            document.body.appendChild(divEdite)

            editeClose.addEventListener('click', (e) => {
                e.target.parentElement.style.opacity = '0';
                window.location.href = "http://localhost:63342/REAL%20TODOS/index.html"
            });

            setTimeout(() => {
                divEdite.remove();
                window.location.href = "http://localhost:63342/REAL%20TODOS/index.html"
            }, 3900);

            input.value = '';
            textarea.value = '';
            datedue.value = '';

            button.style.display = 'block'
            edit.style.display = 'none';

            window.history.pushState("", "", "http://localhost:63342/REAL%20TODOS/index.html");
        });
    }
}

input.addEventListener('keyup', (e) => {
    if (e.target.value.trim() === '') {
        input.style.border = '1px solid red';
        subInput.innerHTML = 'Please Enter Word';
        subInput.style.color = 'red';
        subInput.classList.add('anime');
        input.classList.add('anime');
    } else {
        subInput.innerHTML = '';
        input.style.border = '1px solid #ccc';
        subInput.classList.remove('anime');
        input.classList.remove('anime');
    }
});

const handleAdd = async (event) => {
    event.preventDefault();

    if (input.value.trim() === '') return;

    let data = await fetch('https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos').then(res => res.json())

    let myObj = {};
    myObj.dueDate = datedue.value ? new Date(datedue.value).toISOString() : '';
    myObj.title = input.value;
    myObj.description = textarea.value;
    myObj.id = data.length + 1;
    myObj.createdAt = Date.now();
    myObj.updatedAt = Date.now();
    myObj.checked = false;

    let option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myObj)
    }

    await fetch('https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos', option)

    input.value = "";
    textarea.value = '';
    datedue.value = '';

    const div = document.createElement('div');
    const newButton = document.createElement('button');
    newButton.innerHTML = '&times';
    newButton.classList.add('teastButton');
    div.innerHTML = 'Your Todo has been added successfully';
    div.classList.add('toastt');
    div.appendChild(newButton)
    document.body.appendChild(div)

    newButton.addEventListener('click', (e) => {
        e.target.parentElement.style.opacity = '0';
    })

    setTimeout(() => {
        div.remove();
    }, 3900)

};

button.addEventListener('click', handleAdd);





