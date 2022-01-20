const{response, request}=require("express");
var express=require("express");
var apiserver=express();
var fs=require("fs");
var fifo=require("fifo");

console.log("api in function");

var port=3000;
var host="localhost";
apiserver.listen(port,host,()=>{
    console.log("server running at http://%s%d",host,port);
});
apiserver.get("/",(request,response)=>{
    console.log("sono in GET",request);
    response.send("ciao client sei in home");
});
apiserver.post("/registrazione",(request,response)=>{
console.log("insert student "+request.body.user+" and "+request.body.password);
var scrivere=request.body.user+","+request.body.password;
fs.writeFile("studenti.js",scrivere,err=>{
    if(err){
         console.log("error:"+err);
    }else{
response.send("student save");
}
})
});
apiserver.post("/control",(request,response)=>{          
    console.log("student "+request.body.user+" and "+request.body.password);
    //leggere file
    sf.readFile("studenti.js",(err,data)=>{
        if(err){ console.log("error:"+err);
    }else{
        var students=JSON.parse(data);
        console.log("students:"+students[0].surname);
        for(var a=0;a<students.length;a++){
            if(students[a].user==request.body.user && students[a].password==students.body.password){
                response.send("student present"); 
            }
        }
    }
})
});
apiserver.post("/delete",(err,response)=>{
    console.log("delate student");
    sf.readFile("studenti.js",(err,data)=>{
        if(err){ console.log("error:"+err);
    }else{
        var students=JSON.parse(data);
        for(var a=0;a<students.length;a++){
            fifo.push(students[a]);    
        }
        for(var a=0;a<students.length;a++){
            if(request.body.user==fifo.shift()){
                response.send("cancelled user");
            }else{
                response.send("user don't exist ")
            }
        }
    }
})
});