
let setTheme = localStorage.getItem('theme')

if(!setTheme == null){
    swapStyle('/css/styles.css')
}
else{
    swapStyle(setTheme)
}

function swapStyle(sheet) {
    document.getElementById('currentStyle').href = sheet
    localStorage.setItem('theme', sheet)
}

const darkButton = document.querySelector('#dark-theme-button')
const lightButton = document.querySelector('#light-theme-button')


// DONT FORGET TO USE /css/dark.css just like how you applied styles in html
darkButton.addEventListener('click' , () => {
    swapStyle('/css/dark.css')
})

lightButton.addEventListener('click' , () => {
    swapStyle('/css/styles.css')
})

