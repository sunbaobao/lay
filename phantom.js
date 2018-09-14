var page = require('webpage').create();

page.onConsoleMessage = function (msg) {
    console.log('Page title is ' + msg);
};
page.viewportSize = {width: 1440, height: 1080};
page.settings.userAgent = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36";
//	page.settings.loadImages = false;	//	禁止加载图片
//	page.settings.userAgent = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.31 (KHTML, like Gecko) PhantomJS/19.0";

page.open('http://jishi.woniu.com/resources/9yin/toServerList.html', function (s) {
    if (s === "success") {
        /* */
        // console.log(title);
            setTimeout(function () {
                var title = page.evaluate(function () {
                    $("li[data-garea-id='1362965283936']").trigger("click");
                    setTimeout(function () {
                        $(".login-btn").trigger("click");

                    }, 1000);
                    return document.title;
                });
                setTimeout(function () {
                  /*  $.ajax({
                        url:"http://jishi.woniu.com/9yin/findSellingGoods.do?filterItem=4",
                        type:"get",
                        success:function (d) {
                            console.log(d)
                        }
                    });*/
                  setTimeout(function () {
                      console.log(page.render('./google_home.jpeg', {format: 'jpeg', quality: '100'}));

                  },4000);

                    console.log(page.render('./google_home.jpeg', {format: 'jpeg', quality: '100'}));
                    // phantom.exit();
                },2000);

            }, 3000);

    } else {
        console.log("err" + s);
        phantom.exit();
    }

});