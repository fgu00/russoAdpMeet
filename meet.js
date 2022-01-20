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
console.log("insert student "+request.query.user+" and "+request.query.password);
sf.readFile("studenti.js",(err,data)=>{
    if(err){ console.log("error:"+err);
}else{
    var students=JSON.parse(data);
    for(var a=0;a<students.length;a++){
        fifo.push(students[a]);    
    }
}
})
var scrivere=request.query.user+","+request.query.password;
fs.writeFile("studenti.js",scrivere,err=>{
    if(err){
         console.log("error:"+err);
    }else{
response.send("student save");
}
})
});
apiserver.post("/control",(request,response)=>{          
    console.log("student "+request.query.user+" and "+request.query.password);
    //leggere file
    sf.readFile("studenti.js",(err,data)=>{
        if(err){ console.log("error:"+err);
    }else{
        var students=JSON.parse(data);
        console.log("students:"+students[0].surname);
        for(var a=0;a<students.length;a++){
            if(students[a].user==request.query.user && students[a].password==students.query.password){
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
            if(request.query.user==fifo.shift()){
                response.send("cancelled user");
            }else{
                response.send("user don't exist ")
            }
        }
    }
})
});