//validar se está preenchido ou não, pega o valor ID FORM 
document.querySelector("#search-form").addEventListener('submit', async (event) => {
    event.preventDefault();

    //pega o nome do input do search
    const cityName = document.querySelector('#search-form-input').value;

    //pega o main
    const weatherCotainer = document.querySelector('#main-section');

    //valida se estiver preenchido segue, caso não returna algo.
    if (!cityName) {
        return showAlert('Ops...Something wrong, please check and try again!');
    }

    const apiKey = `bc95dac79ca9d494e2701f30fcfe5adc`
    const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=pt_br`

    const results = await fetch(apiUrl);
    const json = await results.json();

    //remove a class hide para mostrar o menu quando clicar
    weatherCotainer.classList.remove("hide");

    //valida se a API está funcionando 200 = oK
    if (json.cod === 200) {
        //capturado as informações necessárias da API
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            hum: json.main.humidity,
            windSpeed: json.wind.speed,
            description: json.weather[0].description,
            windDeg: json.wind.deg,
            tempIcon: json.weather[0].icon,
        });
        //caso não achar a cidade..
    }else {
        showAlert('city not found..')
    }

});

function showInfo(json) {
    showAlert('');

    document.querySelector("#main-section").classList.add('.hiden');

    // Cidade e pais
    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;

    //description do tempo
    document.querySelector('#temp-description').innerHTML = `${json.description}`;

    //temperatura - o fixed (adiciona casas) - to string e replace vai trocar o . para ,
    document.querySelector('#temp-value').innerHTML = `${json.temp.toFixed(0).toString().replace('.', ',')}°C`;
   
    //Humidade do ar
    document.querySelector('#temp-humi').innerHTML = `${json.hum.toFixed(1).toString().replace('.', ',')}%`;

    //vento
    document.querySelector('#temp-wind').innerHTML = `${json.windSpeed.toFixed(0).toString().replace('.', ',')} km/h`;

    //vento deg
    document.querySelector('#temp-rain').innerHTML = `${json.windDeg}`;

    document.querySelector('#temp-img').setAttribute('src' , `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
}

//funcao mostrar o alerta
function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}



