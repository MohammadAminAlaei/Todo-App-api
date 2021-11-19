const ulPagination = document.getElementById("pagination")

async function handlePagesCount(currentPage) {
    let todos = await fetch('https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos')
    todos = await todos.json()
    let page = Math.ceil(todos.length / 10)
    for (let index = -1; index <= page; index++) {
        const liPagination = document.createElement("li")
        const aPagination = document.createElement("a")
        if (index === -1) {
            liPagination.classList.add("page-item", currentPage === 1 ? "disabled" : null)
            aPagination.classList.add("page-link")
            aPagination.setAttribute("href", "http://localhost:63342/REAL%20TODOS/view.html?page=" + (Number(currentPage) - 1))
            aPagination.innerText = "«"
            liPagination.appendChild(aPagination)
            ulPagination.appendChild(liPagination)
        } else if (index === page) {
            liPagination.classList.add("page-item", currentPage === page ? "disabled" : null)
            aPagination.classList.add("page-link")
            aPagination.setAttribute("href", "http://localhost:63342/REAL%20TODOS/view.html?page=" + (Number(currentPage) + 1))
            aPagination.innerText = "»"
            liPagination.appendChild(aPagination)
            ulPagination.appendChild(liPagination)
        } else {
            liPagination.classList.add("page-item", Number(currentPage) === index + 1 ? "active" : null)
            aPagination.classList.add("page-link")
            aPagination.setAttribute("href", "http://localhost:63342/REAL%20TODOS/view.html?page=" + (index + 1))
            aPagination.innerText = index + 1
            liPagination.appendChild(aPagination)
            ulPagination.appendChild(liPagination)
        }
    }
}

let pagee = 1;

if (window.location.search.split("=")[1]) {
    pagee = Number(window.location.search.split("=")[1])
}

handlePagesCount(pagee)
