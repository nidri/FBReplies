(function(){
    //console.log("Immediate function from ArticleScripts.js");
    /*setTimeout(function() {
        $("#article").text("Changed text from Jquery");
    }, 3000);*/
})();

var ArticlesPath = "/Public/Articles/";

function GetArticle(Article) {
    console.log("Getting article - " + ArticlesPath + Article);
    // Using a fetch to get article content.
    fetch(ArticlesPath + Article).then(function(response) {
        console.log("From fetch - " + response);
        return response.text();
    }).then(function(data) {
        //console.log("Fetch data - " + data);
        $(".main-container").html(data);
        //$("body").html(data);
        componentHandler.upgradeDom();
    });
    toggle_drawer();
    //return false;
}

function toggle_drawer() {
    var drawer = document.getElementsByClassName('mdl-layout__drawer')[0];
    var drawer_obfuscator = document.getElementsByClassName('mdl-layout__obfuscator')[0];
    drawer.classList.toggle("is-visible");
    drawer_obfuscator.classList.toggle("is-visible");
}