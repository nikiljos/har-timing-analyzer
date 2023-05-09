const fs=require("fs")

const generateCsv=(data,meta)=>{
    let csvArray=Object.keys(data).map(key=>{
        let res=[...key.split(" - ")]
        meta.forEach(elt=>{
            res.push(data[key][elt.key])
        })
        return res.join(",");
    })
    return csvArray.join("\n")
}

const saveCsv=(csvString,fileName)=>{
    // let blob = new Blob([csvString], { type: "text/csv" });
    fs.writeFileSync(fileName,csvString,"utf-8")
}

const exportCsv=(data,meta,fileName)=>saveCsv(generateCsv(data,meta),fileName)

module.exports={
    exportCsv
}