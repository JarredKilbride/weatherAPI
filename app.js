window.addEventListener('load',()=> {
    let long;
    let lat; 
    let tempDesc = document.querySelector(`.temperature-description`); 
    let tempDegree = document.querySelector(`.temperature-degree`);
    let locTime = document.querySelector(`.location-timezone`);
    let image = document.querySelector('.icon1')

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(po => {
            long = po.coords.longitude;
            lat = po.coords.latitude;
           
            const proxy = `https://cors-anywhere.herokuapp.com/`
            const api = `http://api.weatherapi.com/v1/current.json?key=58a5245caa7f4d3dbc603847210310&q=${lat},${long}&aqi=no`

            fetch(api)
                .then(resp => {
                    return resp.json(); 
                })
                .then(data => {
                    console.log(data)
                    const{condition,feelslike_c,feelslike_f} = data.current
                    tempDegree.innerHTML = feelslike_f; 
                    tempDesc.innerHTML = condition.text
                    locTime.innerHTML = data.location.name
                    //image.src = data.current.icon

                    //set icon
                    seticon(data.current.condition.text,document.querySelector(`.icon`))
                })
        })
    }
    else {
        alert('you need to me to see your loction!')
    }

    function seticon(icon,id) {
        const skycons = new Skycons({"color":'white'}); 
        const currentIcon = icon.replace(/\s+/g, '_').toUpperCase()
        console.log(currentIcon)
        skycons.play(); 
        console.log(Skycons[currentIcon])
        return skycons.set(id,Skycons[currentIcon])
    }
})