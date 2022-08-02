var headers = {
    'content-type': "application/json",
    'cache-control': "no-cache",
};

var data = {"url":url}

r=requests.get(url='http://127.0.0.1:5000/predictions',headers=headers,data=json.dumps(data))

console.log("dentro del script")
d3.json().then(function(datos){
    console.log("datos cargados")

})