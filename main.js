let url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");
// functions are also treated as objects in javascript
const getRepoPageHtml = require("./repoPage");
request(url,cb);
function cb (err,response,html){
    if(err){
        console.log(err);
    } else if (response.statusCode == 404) {
        console.log("page not found");
    } else {
        // console.log(html);
        getTopicLinks(html);
    }
}
function getTopicLinks(html){
    let $ = cheerio.load(html);
    let linkArr = $(".no-underline.d-flex.flex-column.flex-justify-center");
    for( let i = 0; i < linkArr.length; i++){
        let href = $(linkArr[i]).attr("href");
        // .pop() remove last element of array
        let topic = href.split("/").pop();
        let fullLink = `https://github.com/${href}`;
        getRepoPageHtml(fullLink,topic);
    }
}


