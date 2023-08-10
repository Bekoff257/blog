const form = document.querySelector("#form")
const blog = document.querySelector('.blog')
const addBlogBtn = document.querySelector("#addBtn")
const blogTitleInp = document.querySelector("#blogTitle")
const starterTitleInp = document.querySelector('#st-title')
const textArea = document.querySelector("#textArea")
const createBtn = document.querySelector("#create")
const clearInp = document.querySelector("#clearInp")
const clearStrINp = document.querySelector('#clearStrInp')
const centerH1 = document.querySelector(".center")
const login = document.querySelector('#login')
const loginBtn = document.querySelector('#loginBtn')
const loginForm = document.querySelector('#loginForm')
const nameLogin = document.querySelector('#nameLogin')
const pass = document.querySelector('#pass')
const checkDoubleIcon = document.querySelector('#checkDouble')
const timesCircleIcon = document.querySelector('#times')
const logout = document.querySelector('#logout')
const log = document.querySelector('.log')
const pinned = document.querySelector('.pinned')

const blogContainer = document.querySelector("#blog-container")

form.addEventListener('submit', blogCreate)

let BlogData = []

// let askName = ""

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
})

logout.addEventListener('click', (e) => {
    e.preventDefault()
    login.style.display = 'block'
    blog.style.display = 'none'
    log.style.display = 'none'
})

function showBlogsByAdminPassAndEmail (){
    blog.style.display = 'block'
    login.style.display = 'none'
    log.style.display = 'block'

    localStorage.setItem('logined', true)
}

loginBtn.addEventListener('click', (e) => {
    if(nameLogin.value === "admin@gmail.com" && pass.value === "admin123"){
        nameLogin.style.borderColor = 'green'
        pass.style.borderColor = 'green'
        showBlogsByAdminPassAndEmail()
    }else{
        nameLogin.style.borderColor = 'red'
        pass.style.borderColor = 'red'
    }
})

function blogCreate (e) {
    e.preventDefault()
    // if(!askName){
    //     askName = prompt("Please enter your name: ")
    //     if(!askName){
    //         return;
    //     }
    //     setItemsToLocalStorage()
    // }
    if(blogTitleInp.value && starterTitleInp.value && textArea.value.trim().length > 0){
        const blogData = {
            blogTitle: blogTitleInp.value,
            blogStrInpt: starterTitleInp.value,
            blogareInp: textArea.value,
            blogDate: addZeroToDates(new Date().getDate()),
            blogMonth: addZeroToDates(new Date().getMonth()),
            blogYear: new Date().getFullYear(),
            blogHour: addZeroToDates(new Date().getHours()),   
            blogMinute: addZeroToDates(new Date().getMinutes()),
            blogName: nameLogin.value = "Admin",
            taskEdited: false
        }
        BlogData.unshift(blogData);
        clearInput(blogTitleInp, starterTitleInp, textArea)
        render()
        closeForm()
        setItemsToLocalStorage()
        console.log(BlogData);
        blogContainer.classList.remove('active')
        centerH1.style.display = 'block'
    }
}

const render = () => {
    while(blogContainer.firstChild){
        blogContainer.removeChild(blogContainer.firstChild)
    }
    if(BlogData.length === 0){
        const msg = document.createElement('div')
        msg.className = 'warning';
        msg.textContent = 'No blogs...'
        blogContainer.appendChild(msg)
    }
    BlogData.map((blog, index) => {
        const div = document.createElement('div')
        div.className = 'blog-done'
        div.setAttribute('data-blog', index)
        div.innerHTML = `
            <div class="sec">
                <h2 class="blogmini">${blog.blogTitle}</h2>
                <div class="dynamic">
                    <button class="deleteBtn"><i class="fas fa-trash"></i></button>
                    <button class="edit"><i class="fas fa-edit"></i></button>
                </div>
            </div>
            <h3 class="blogTitle">${blog.blogStrInpt}</h3>
            <p class="blogSec">${blog.blogareInp}</p>
            <div class="time">
                <div>
                    <p>${blog.blogName} <i class="fa-solid fa-circle-check" style="color: #2f75ee;"></i> ${blog.blogHour} : ${blog.blogMinute}</p>
                </div>
                <p>${blog.blogDate}/${blog.blogMonth}/${blog.blogYear}</p>
            </div>
        `
        blogContainer.appendChild(div)
    })
}

function clearInput (inp, sr, pr){
    inp.value = ""
    sr.value = ""
    pr.value = ""
}

clearInp.addEventListener('click', (e) => {
   blogTitleInp.value = ""
})

clearStrINp.addEventListener('click', (e) => {
   starterTitleInp.value = ""
})

addBlogBtn.addEventListener('click', () => {
    pinned.style.display = 'none'
    form.style.display = 'block'
    blogContainer.classList.add('active')
    centerH1.style.display = 'none'
})

blogContainer.addEventListener('click', (e) => {
    let index = e.target
    let t = +index.parentElement.parentElement.dataset.index
    let sibling = index.parentElement.previousElementSibling;
    if(e.target.classList.contains('deleteBtn')){
        const asked = window.confirm('Are you sure to Delete your blog?')
        if(asked){
            const propmFromUser = prompt("Why you're delete your blog?")
            if(propmFromUser){
                BlogData.splice(t, 1)
            }
        }
        render()
        setItemsToLocalStorage()
    }else if(index.classList.contains('edit')){
        window.alert("Sorry this function in development!")
        // sibling.setAttribute('contenteditable', true)
        // sibling.style.border = '1px solid gray'
        // sibling.style.paddingRight = '5px'
        // index.innerHTML = '<i class="fas fa-check-double"></i>'
        // index.classList.add('done')
        // index.classList.remove('edit')
    // }else if(index.classList.contains('done')){
    //     sibling.setAttribute('contenteditable', false);
    //     index.innerHTML = '<i class="fas fa-edit"></i>'
    //     index.classList.remove('done')
    //     index.classList.add('edit')

    //     if (BlogData[t] && sibling.textContent !== BlogData[t].blogTitle) {
    //         BlogData[t].blogTitle = sibling.textContent;
    //         BlogData[t].taskEdited = true
    //         setItemsToLocalStorage();
    //     }
    //     render();
    }
})

function closeForm (){
    form.style.display = 'none'
    pinned.style.display = 'block'
}


function addZeroToDates(n){
    return String(n).padStart(2, "0")
}

function setItemsToLocalStorage () {
    localStorage.setItem('item', JSON.stringify(BlogData))
}

document.addEventListener('DOMContentLoaded', () => {
    let ls = localStorage.getItem('item')
    if(ls){
        BlogData = JSON.parse(ls)
        render()
    }

    const isLogged = localStorage.getItem('logined')
    if(isLogged === 'true'){
        showBlogsByAdminPassAndEmail()
    }
})

