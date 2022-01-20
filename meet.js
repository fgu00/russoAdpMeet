const{response}=require("express");
var express=require("express");
var apiserver=express();
var fs=require("fs");

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
            if(students[a].id==request.query.id){
                response.send("lo studente è: "+students[a].id+" "+students[a].surname+" "+students[a].name); 
            }
        }
    }
})
});