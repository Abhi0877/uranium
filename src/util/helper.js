printDate=()=>{
    const d = new Date();
    console.log(d)
}
printMonth=()=>{
    const d = new Date();
    console.log(d.getMonth())
    

}
getBatchInfo=()=>{
    
console.log("Uranium, Uranium 1, the topic for today is Nodejs module system")
}

module.exports={printDate,printMonth,getBatchInfo}