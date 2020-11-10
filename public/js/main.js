



function updatechar() {

    var zone = document.getElementById("selectBox");

    if (zone.value == "Serigrafia"){

        zone.style.backgroundColor = "green"
        zone.style.color = "white"
    }
    if (zone.value == "Plotter"){

        zone.style.backgroundColor = "blue"
        zone.style.color = "white"
    }
    if (zone.value == "Design"){

        zone.style.backgroundColor = "orange"
        zone.style.color = "white"
    }
    if (zone.value == "Front-Office"){

        zone.style.backgroundColor = "yellow"
        zone.style.color = "white"
    }
    if (zone.value == "Grafica"){

        zone.style.backgroundColor = "red"
        zone.style.color = "white"
    }
}

const seccao = document.querySelectorAll("#seccao")
updateBG()
function updateBG(){
    seccao.forEach(text => {
        
        if(text.innerHTML == "Design"){
        color = text.style.backgroundColor = "orange"
        
        }
        if(text.innerHTML == "Plotter"){
            color = text.style.backgroundColor = "blue"
            
            
            
        }
        if(text.innerHTML == "Grafica"){
            color = text.style.backgroundColor = "red"
           
            
           
        }
        if(text.innerHTML == "Serigrafia"){
            color = text.style.backgroundColor = "green"
           
        }
        if(text.innerHTML == "Front-Office"){
            color = text.style.backgroundColor = "yellow"
            
        }

    })
    }

    



const troca = document.querySelectorAll("#coluna3")
var cont = 0;
var arr=[]
var arr2 = []

troca.forEach(time=>{
    arr[cont] = time.innerHTML
    cont++
    
})

Temporestante()
state()

const obs = document.querySelectorAll("#coluna4")
var cont2 = 0
obs.forEach(time=>{
    arr2[cont2] = time.textContent
    cont2++
    
})







function Temporestante() {
    

    const hora = document.querySelectorAll("#coluna3")
    var cont1 = 0
    hora.forEach(time=>{
        var date = arr[cont1]
        var now = new Date()
        const data = new Date(date)
        


        
        var currentTime = now.getTime()
        var eventTime = data.getTime()

        var remTime = eventTime - currentTime


        var s = Math.floor(remTime / 1000)
        var m = Math.floor(s / 60)
        var h = Math.floor(m / 60)
        var d = Math.floor((h) / 24)


        h %= 24
        m %= 60
        s %= 60

        

        h = (h < 10 && h > 0 && h > -10) ?'0'+ Math.abs(h) : h
        m = (m < 10 && m > 0 && m > -10) ? '0'+Math.abs(m): Math.abs(m)
        s = (s  < 10 && s > 0 && s > -10) ? '0' + Math.abs(s) : Math.abs(s)

    
       
      
       
       var tempoR = `${d} DIAS, ${h}:${m}:${s}`

       

       
   
       
    
        time.textContent = tempoR
        time.innerHTML = tempoR

        if(arr2[cont] == "ATRASADO"){
            
            time.style.color = "red"
            time.textContent = tempoR
        }


        
    
       

        

          

        cont1++

    })
      
    
    setTimeout(Temporestante,1000)
    
}



function state(){
    var arr1 =[]
    var contS = 0
    const obs = document.querySelectorAll("#coluna4")

    obs.forEach(time=>{

        var obj = document.querySelectorAll("#coluna3")
        arr1 = obj.item(contS).innerHTML
        contS++
        
    
        
   
        

        
        if (parseInt(arr1[9]) <= 6 && (parseInt(arr1[8]) >= 0) && parseInt(arr1[0]) == 0) {
           estado = "ENTREGAR"
            

        }

        if(arr1[0] == 0 && arr1[8] == 0 && arr1[10]== 0 && arr1[12] == 0){
    
            $('#myModal').on('show.bs.modal', function (e) {
                e.textContent = "ok"
              })
        }
        else if ((arr1[0]) == "-" || ((arr1[9]) =="-")) {
            
           estado = "ATRASADO"
           time.style.color = "red"
        

            
         

        }
        else {

            
            estado = "EM TEMPO"

        }
       
        
        time.textContent = estado
        time.innerHTML = estado
        
      
    })
    setTimeout(state,1000)
}








