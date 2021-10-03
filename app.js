window.addEventListener('load',()=> {
    let long;
    let lat; 
    let tempDesc = document.querySelector(`.temperature-description`); 
    let tempDegree = document.querySelector(`.temperature-degree`);
    let locTime = document.querySelector(`.location-timezone`);

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(po => {
            long = po.coords.longitude;
            lat = po.coords.latitude;
           
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
                    locTime.innerHTML = data.location.region
                })
        })
    }
    else {
        alert('you need to me to see your loction!')
    }
})