const site1Har=require("./data/site1.har.json")
const site2Har=require("./data/site2.har.json")
const {exportCsv}=require("./csvHandler")
const open=require("open")

const harCollection = [site1Har,site2Har];
const harMeta = [
    {
        domain: "d1.example.com",
        key: "site1",
    },
    {
        domain: "d2.example.com",
        key: "site2",
    },
];

const formatData = (entry) => {
    const urlData = entry.request.url.split("/");
    const domain = urlData[2];
    const endpoint = urlData.slice(3).join("/");
    return {
        method: entry.request.method,
        domain,
        endpoint,
        time: entry.time.toFixed(2),
        response: entry.response.status,
    };
};

harData = harCollection.map((har) => har.log.entries.map(formatData));

harLog = harData.map((har,i) =>
    har.filter((elt) => elt.domain === harMeta[i].domain)
);

let comparisonData = {
    "Method - Endpoint":{}
};

harMeta.forEach(elt=>{
    comparisonData["Method - Endpoint"][elt.key]=elt.key
})

const setData = (entry, provider) => {
    if (!comparisonData[`${entry.method} - ${entry.endpoint}`])
        comparisonData[`${entry.method} - ${entry.endpoint}`] = {};
    comparisonData[`${entry.method} - ${entry.endpoint}`][provider] =
        entry.time;
};

harLog.forEach((har,i) => har.forEach((entry) => setData(entry, harMeta[i].key)));

console.log(comparisonData);

const fileName = "result/har-" + new Date().toJSON().replace(/[:.]/g, "-")+".csv"
exportCsv(comparisonData,harMeta,fileName)
open(fileName)