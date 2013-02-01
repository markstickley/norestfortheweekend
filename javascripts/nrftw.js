(function(d){

    function setBanner() {
        var banner = d.getElementById('banner');
        banner.parentNode.className = getSeason();
    }

    function addRss() {
        var i, rssElement,
            articleMetas = d.querySelectorAll('article footer .meta:first-of-type');

        for(i=0; i<articleMetas.length; i++) {
            rssElement = document.createElement('p');
            rssElement.className = 'rssCta';
            rssElement.innerHTML = '<a href="'+d.rssUrl+'" title="Subscribe to the RSS feed now!">Subscribe to the RSS feed now!</a>';

            insertAfter(articleMetas[i], rssElement);
        }
    }

    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function getSeason(){
        var date = new Date(),
            month = date.getMonth()+1,
            day = date.getDay();

        if(
            (month === 3 && day >= 21) ||
            month === 4 ||
            month === 5 ||
            (month === 6 && day < 21)
        ){
            return 'spring';
        }

        else if(
            (month === 6 && day >= 21) ||
            month === 7 ||
            month === 8 ||
            (month === 9 && day < 23)
        ){
            return 'summer';
        }

        else if(
            (month === 9 && day >= 23) ||
            month === 10 ||
            month === 11 ||
            (month === 12 && day < 21)
        ){
            return 'autumn';
        }

        else{
            return 'winter';
        }
    }

    setBanner();
    addRss();

})(window.document);