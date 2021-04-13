console.log('client side js file')

//client side js


//this gets 'form'
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#para1')
const messageTwo = document.querySelector('#para2')

messageOne.textContent = 'From Javascript'
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const locationQuery = search.value
    messageOne.textContent = 'loading.'
    messageTwo.textContent = ' '

    fetch('http://127.0.0.1:3000/weather?address='+ locationQuery).then( (response) => {
    response.json().then( (data) => {
        if (data.error) {
            console.log(data.error)
            messageOne.textContent = data.error
            messageTwo.textContent = ' '
        }
        else {
            //gets res.send value from src/app.js
            //console.log(data.address)
            console.log(data.forecast)
            console.log(data.location)
            //console.log(data)
            messageOne.textContent = data.forecast
            messageTwo.textContent = data.location
            
        }

    })

    })  
   
    /* console.log('test test!!')
    console.log(locationQuery) */
} )