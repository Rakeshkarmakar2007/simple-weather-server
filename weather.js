const http = require('http');

const PORT = process.env.PORT || 3000;
const HOSTNAME = '0.0.0.0';

let temperature;
let condition;


const server = http.createServer((req, res) => {

     res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
     res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.url === '/weather') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            location: "Dayer bazar",
            temperature: temperature || "25°C",
            condition: condition
        }));
    return;
    }

    else if (req.url.startsWith('/update-weather')) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        temperature = url.searchParams.get('temperature');
        if(temperature < 10){
            condition = "ঠান্ডায় জমে গেলাম 🥶| ";
        }else if(temperature >= 10 && temperature <= 15){
            condition = "বেশ ঠান্ডা লাগছে❄️|";
        }
else if(temperature >= 15 && temperature <= 35){
            condition = "বেশ গরম|";
        }

else{
            condition = "প্রচন্ড গরম 🔥|";
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            message: "Weather updated successfully",
            temperature: temperature,
            condition: condition
        }));
        return; 
    }

});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});



