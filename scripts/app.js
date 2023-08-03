const form = document.querySelector("#form")
const addBlogBtn = document.querySelector("#addBtn")
const blogTitleInp = document.querySelector("#blogTitle")
const starterTitleInp = document.querySelector('#st-title')
const textArea = document.querySelector("#textArea")
const createBtn = document.querySelector("#create")
const clearInp = document.querySelector("#clearInp")
const clearStrINp = document.querySelector('#clearStrInp')
const centerH1 = document.querySelector(".center")


const blogContainer = document.querySelector("#blog-container")

form.addEventListener('submit', blogCreate)

let BlogData = []

let askName = ""

function blogCreate (e) {
    e.preventDefault()
    if(!askName){
        askName = prompt("Please enter your name: ")
        if(!askName){
            return;
        }
        setItemsToLocalStorage()
    }
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
            blogName: askName,
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
                    <p>${blog.blogName}: ${blog.blogHour} : ${blog.blogMinute}</p>
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
    form.style.display = 'block'
    blogContainer.classList.add('active')
    centerH1.style.display = 'none'
})

blogContainer.addEventListener('click', (e) => {
    let index = e.target
    let t = +index.parentElement.parentElement.dataset.index
    let sibling = index.parentElement.previousElementSibling;
    if(e.target.classList.contains('deleteBtn')){
        BlogData.splice(t, 1)
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
})

