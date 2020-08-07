// 功能一：头部地址部分添加选择地址的点击事件
var subnavAddress = document.querySelector(".subnav-address");
var addressdiv = document.querySelectorAll(".subnav-address div");
var address = document.querySelectorAll(".subnav-address div a");
var addresstit = document.querySelector(".addresstit");

// 初始化默认选择的样式
address[0].style.backgroundColor = "#f10215";
address[0].style.color = "#fff";
subnavAddress.onclick = function (e) {
  var tar = e.target;
  if (tar.tagName == "A") {
    addresstit.innerText = tar.innerText;
    for (var i = 0; i < addressdiv.length; i++) {
      if (address[i].innerText == tar.innerText) {
        address[i].style.backgroundColor = "#f10215";
        address[i].style.color = "#fff";
      } else {
        address[i].style.background = "";
        address[i].style.color = "";
      }
    }
  }
};

//京东的搜索框的请求
$(".jdsearch").on("keyup", function () {
  $.ajax({
    type: "get",
    url:
      "https://suggest.taobao.com/sug?code=utf-8&q=" +
      $(".jdsearch").val +
      "&_ksTS=1596500199172_236&callback=jsonp237&k=1&area=c2c&bucketid=4",
    dataType: "json",
    jsonp: "jQuery9240212",
    cache: false,
    success: function (json) {
      json.forEach(function (item, index) {
        $(".jdsearch-tips").append(
          $(`<li><div class="search-item">$(item.key)</div>
            <div class="search-count">$(item.qre)</div></li>`)
        );
      });
    },
    error: function () {
      console.log("我还没有写完，你请求个球？");
    },
  });
});

// menu的大长框的显示
$(".home-menu-ul li").hover(
  function () {
    $(".home-menu-detail").css("display", "block");
  },
  function () {
    $(".home-menu-detail").css("display", "none");
  }
);
// home-banner的运动
var timer = null;
var preindex = 0;
var curindex = 0;
var imgwidth = Math.ceil($(".home-bbanner-ul li").eq(0).width());
$(".home-bbanner-ul li a img").eq(0).css("opacity", 1);

function dotstyle() {
  var cur = curindex;
  var pre = preindex;
  if (cur == 8) cur = 0;
  if (pre == 8) pre = 0;
  $(".bbanner-bottom-ul li").eq(cur).addClass("bbanner-bottom-ul-active");
  $(".bbanner-bottom-ul li").eq(pre).removeClass("bbanner-bottom-ul-active");
}

function movenext() {
  //向后移，先处理下一次下标
  //再处理样式
  //再更新上一次
  curindex++;
  if (curindex >= $(".home-bbanner-ul li").length) {
    $(".home-bbanner-window").scrollLeft(0);
    curindex = 1;
  }
  $(".home-bbanner-ul li a img").eq(preindex).animate(
    {
      opacity: 0.2,
    },
    400
  );

  $(".home-bbanner-ul li a img").eq(curindex).animate(
    {
      opacity: 1,
    },
    400
  );
  $(".home-bbanner-window").scrollLeft(imgwidth * curindex);
  dotstyle();
  preindex = curindex;
}
function moveprev() {
  //向前移，先处理下一次下标
  //再处理样式
  //再更新上一次
  curindex--;
  if (curindex < 0) {
    $(".home-bbanner-window").scrollLeft($(".home-bbanner-ul li").length - 1);
    curindex = $(".home-bbanner-ul li").length - 2;
  }
  $(".home-bbanner-ul li a img").eq(preindex).animate(
    {
      opacity: 0.2,
    },
    400
  );
  $(".home-bbanner-ul li a img").eq(curindex).animate(
    {
      opacity: 1,
    },
    400
  );
  $(".home-bbanner-window").scrollLeft(imgwidth * curindex);
  dotstyle();
  preindex = curindex;
}

timer = setInterval(movenext, 3000);

$(".home-bbanner").on("mouseenter", function () {
  clearInterval(timer);
});
$(".bbanner-left").on("click", function () {
  moveprev();
});
$(".bbanner-right").on("click", function () {
  movenext();
});
$(".home-bbanner").on("mouseleave", function () {
  timer = setInterval(movenext, 3000);
});
