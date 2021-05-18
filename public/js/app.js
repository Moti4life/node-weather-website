//console.log('client side js file')

//client side js 


//
const weatherButton = document.querySelector('#search-button')
const search = document.querySelector('input')
const messageOne = document.querySelector('#para1')
const messageTwo = document.querySelector('#para2')
const locationButton = document.querySelector('#send-location-button')


//

search.value = ''
messageOne.textContent = 'Get weather'
messageTwo.textContent = ''

weatherButton.addEventListener('click', (event) => {
    event.preventDefault()
    const locationQuery = search.value
    weatherButton.setAttribute('disabled', 'disabled')
    messageOne.textContent = 'loading.'
    messageTwo.textContent = ' '

    fetch('/weather?address='+ locationQuery).then( (response) => {
    response.json().then( (data) => {
        if (data.error) {
            console.log(data.error)
            messageOne.textContent = data.error
            messageTwo.textContent = ' '
            weatherButton.removeAttribute('disabled')
        }
        else {
            //gets res.send value from src/app.js
            //console.log(data.address)
            console.log(data.forecast)
            console.log(data.location)
            //console.log(data)
            messageOne.textContent = data.forecast
            messageTwo.textContent = data.location
            weatherButton.removeAttribute('disabled')
            
        }

    })

    })  
   
    /* console.log('test test!!')
    console.log(locationQuery) */
} )


locationButton.addEventListener('click', (event) => {
    event.preventDefault()
    
    if(!navigator.geolocation) {
        
        return alert('Geolocation is not supported.')
    }
    //console.log('clicked on locbtn')

    // disable while loading
    locationButton.setAttribute('disabled', 'disabled')

    //get navigator.geolocation
    navigator.geolocation.getCurrentPosition( (position, error) => {
        if(!error) {
            console.log(position)
            //console.log(position.coords.latitude)
            const lat = position.coords.latitude
            const lon = position.coords.longitude

            fetch(`/weatherCurrentLocation?latitude=${lat}&longitude=${lon}`).then( (response) => {
                response.json().then( (data) => {
                    if (data.error) {
                        console.log(data.error)
                        messageOne.textContent = data.error
                        messageTwo.textContent = ' '
                        locationButton.removeAttribute('disabled')
                    }
                    else {
                        //gets res.send value from src/app.js
                        //console.log(data.address)
                        console.log(data.forecast)
                        console.log(data.location)
                        //console.log(data)
                        messageOne.textContent = data.forecast
                        messageTwo.textContent = data.location
                        locationButton.removeAttribute('disabled')
                        console.log('location has been shared')
                        search.value = data.location
                    }

                })
            })
        }
        

    })



})