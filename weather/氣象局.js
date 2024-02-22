const cities = [
    ['基隆市', '新北市', '臺北市', '桃園市', '新竹市', '新竹縣', '苗栗縣', '臺中市', '南投縣', '彰化縣', '雲林縣', '嘉義市', '嘉義縣', '臺南市', '高雄市', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣'],
    ['基隆市', '新北市', '臺北市', '桃園市', '新竹市', '新竹縣', '苗栗縣'],
    ['臺中市', '南投縣', '彰化縣', '雲林縣', '嘉義市', '嘉義縣'],
    ['臺南市', '高雄市', '屏東縣'],
    ['宜蘭縣', '花蓮縣', '臺東縣'],
    ['澎湖縣', '金門縣', '連江縣'],
];

let nowCities = cities[0];
const orgDeta = {};

const btnBox = document.querySelectorAll('.btn-box');
const allBtn = document.querySelectorAll('.btn');
const hamMenu = document.querySelector('#menu');

let isMenuVisible = false;

hamMenu.addEventListener('click', function () {
    btnBox.forEach(box => {
        box.style.display = isMenuVisible ? 'none' : 'flex';
    });

    isMenuVisible = !isMenuVisible;
});

window.addEventListener('resize', function () {
    isMenuVisible = false;

    if (window.innerWidth) {
        btnBox.forEach(box => {
            box.style.display = 'flex';
        });
    } else {
        btnBox.forEach(box => {
            box.style.display = 'none';
        });
    }
});

const webid = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-D0FD3F83-DF9C-4255-97BD-DB2427FFBCE9&format=JSON';


fetch_data();

allBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        console.log(btn, index);
        nowCities = cities[index];
        fetch_data();
    });
});

function fetch_data() {
    fetch(webid)
        .then(function (response) {
            return response.json();
        })
        .then(function (detas) {
            console.log(detas);
            arrangeJson(detas);
            arrangeCites();
        });
}

function arrangeJson(detas) {
    console.log(detas.records.location);
    const jsonAll = detas.records.location;
    jsonAll.forEach(location => {
        // Wx
        const ctName = location.locationName; //城市
        const ctWeather = location.weatherElement[0].time[0]; //重新命名
        const ctParameter = ctWeather.parameter.parameterName;//天氣狀況
        const starTime = ctWeather.startTime;//開始時間
        const endTime = ctWeather.endTime;//結束時間
        //pop
        const pop = location.weatherElement[1].time[0].parameter.parameterName;//降雨機率
        //MinT
        const minT = location.weatherElement[2].time[0].parameter.parameterName;//最低溫度
        //CI
        const ci = location.weatherElement[3].time[0].parameter.parameterName;//體感溫度
        //MaxT
        const maxT = location.weatherElement[4].time[0].parameter.parameterName;//最高溫度

        orgDeta[ctName] = {
            ctParameter: ctParameter,
            starTime: starTime,
            endTime: endTime,
            pop: pop,
            minT: minT,
            maxT: maxT,
            ci: ci,
        }
    });
}

function arrangeCites() {
    const cardRegion = document.querySelector('.ct-card');
    cardRegion.innerHTML = '';
    nowCities.forEach((city, index) => {
        const cityData = orgDeta[city];
        const validDate = document.getElementsByClassName('valid-date');
        const cityCard = document.createElement('div');
        cityCard.classList.add('card');

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        cityCard.innerHTML +=
            `
        <br/>
        <h1 class="cityName"> ${city} </h1><br/>
        <div class="photo"></div><br/>
        <span class="city"> 今日日期:${year}-${month}-${day} </span><br/>
        <span class="city"> 溫度: ${cityData.minT}~${cityData.maxT}度</span><br/>
        <span class="city"> 降雨機率: ${cityData.pop} %</span><br/>
        <span class="city"> 體感溫度:${cityData.ci} </span><br/>
        <span class="city"> 天氣概況:${cityData.ctParameter} </span><br/>
        `;

        validDate.innerHTML = `${cityData.starTime} ${cityData.endTime}`;

        // 尋找城市卡片內部的 .photo 元素
        let photoElement = cityCard.querySelector('.photo');

        // 插入相應的照片
        if (cityData.ctParameter === '多雲短暫雨') {
            photoElement.innerHTML = '<img class="img" src="./img/5.svg">';
        } else if (cityData.ctParameter === '晴時多雲') {
            photoElement.innerHTML = '<img class="img" src="./img/1.svg">';
        } else if (cityData.ctParameter === '多雲短暫陣雨') {
            photoElement.innerHTML = '<img class="img" src="./img/4.svg">';
        } else if (cityData.ctParameter === '多雲') {
            photoElement.innerHTML = '<img class="img" src="./img/2.svg">';
        } else if (cityData.ctParameter === '陰天') {
            photoElement.innerHTML = '<img class="img" src="./img/3.svg">';
        } else if (cityData.ctParameter === '多雲時晴') {
            photoElement.innerHTML = '<img class="img" src="./img/6.svg">';
        } else if (cityData.ctParameter === '陰時多雲短暫陣雨') {
            photoElement.innerHTML = '<img class="img" src="./img/4.svg">';
        } else if (cityData.ctParameter === '陰短暫雨') {
            photoElement.innerHTML = '<img class="img" src="./img/4.svg">';
        } else if (cityData.ctParameter === '陰時多雲短暫雨') {
            photoElement.innerHTML = '<img class="img" src="./img/5.svg">';
        } else if (cityData.ctParameter === '多雲時陰短暫雨') {
            photoElement.innerHTML = '<img class="img" src="./img/5.svg">';
        } else if (cityData.ctParameter === '陰時多雲') {
            photoElement.innerHTML = '<img class="img" src="./img/3.svg">';
        } else if (cityData.ctParameter === '多雲時陰') {
            photoElement.innerHTML = '<img class="img" src="./img/3.svg">';
        }
        // 插入城市卡片到 .ct-card 中
        cardRegion.appendChild(cityCard);
    });
};