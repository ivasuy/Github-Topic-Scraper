const request = require("request");
const cheerio = require("cheerio");
const getIssuePageHtml = require("./issue")
function getRepoPageHtml(url,topic){
    request(url,cb);                            
    function cb (err,response,html){
        if(err){
            console.log(err);
        } else if (response.statusCode == 404) {
            console.log("page not found");
        } else {
            getRepoLink(html);
            // console.log(html);
        }
    }
    function getRepoLink(html){
        /*cheerio only brings inital page and pages are dynamic 
         so some contents also comes after */
        let $ = cheerio.load(html);
        let headingArr = $(".f3.color-fg-muted.text-normal.lh-condensed");
        console.log(topic);

        // we only want issues in top 8 repos
        for (let i = 0; i < 8; i++) {
            let twoAnchors = $(headingArr[i]).find("a");
            let link = $(twoAnchors[1]).attr("href");
            // console.log(link);
            let fullLink = `https://github.com${link}/issues`;
            // console.log(fullLink);
            let repoName = link.split("/").pop();
            getIssuePageHtml(fullLink, topic, repoName);
        }
        console.log("------------------")
    }
}
module.exports = getRepoPageHtml;