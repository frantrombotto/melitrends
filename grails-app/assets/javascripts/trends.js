var padding = 8;

var bubbleCounter = 0;
var width;
var height;

var timeUp = 10000;

var blockChange = false;

var colors = ["rgb(0, 174, 239)",
              "rgb(42, 51, 143)",
              "rgb(129, 190, 75)",
              "rgb(255, 222, 85)",
              "rgb(238, 51, 66)",
              "rgb(146, 117, 207)",
              "rgb(59, 71, 81)",
              // "rgb(192, 85, 39)"
]

var fonts = ["Font1",
             "Font2",
             "Font3",
             "Font4",
             "Font5",
             "Font6"]

$(document).ready(function() {

	var rows = $("#rowCount").val();
	var cols = $("#colCount").val();
	
	$("a").each(function(index, value) {
		
		$(value).css("font-family", fonts[Math.floor(Math.random() * fonts.length)]);
	});

	width = 100 / cols;
	height = 100 / rows;
	
	$("a").each(function(index, value) {
		
		$(value).css("font-size", Math.floor(width)+ "px");
	});
	
	$("td").css("width", width + "%");
	$("td").css("height", height + "%");
	
	$("img").each(function(index, value){

		var tamW = $(value).parent().css("width");
		var tamH = $(value).parent().css("height");

		$(value).width(Math.min($(value).parent().width(),
								$(value).parent().height()));
		
		$(value).height(Math.min($(value).parent().width(),
						    	 $(value).parent().height()));
		
	});
	
	var trendsCount = $("input[type=\"hidden\"].trend").length;
	
	var trends = new Array();
	
	$("input[type=\"hidden\"].trend").each(function(index, value) {
		
		trends.push(" \"" + $(value).val() + "\"");
	});
	
	$("a").each(function(index, value) {
		
		$(value).parent().parent().css("background-color", colors[Math.floor(Math.random() * colors.length)]);
		
		trends = shuffle(trends);
		
		$(value).attr("data-type", "[" + trends + "]");
	});

	typewriterAnimation();
	
	window.setInterval(function(){

		var td = $("td").eq(Math.floor(Math.random()*$("td").length));

		var h1 = td.find("h1").eq(0);
		
		var img = td.find("img").eq(0);

		h1.animate({
			
		    opacity: 0
		},1000,"swing");
		
		setTimeout(function(){

			h1.hide();
			img.show();

			var lastColor = td.css("background-color");
			td.css("background-color","white");
			td.css("text-align","center");
			td.css("padding","0");
			blockChange = true;
			
			img.animate({
				
			    opacity: 1
			},1000,"swing");
			
			setTimeout(function() {
		
				img.animate({
					
				    opacity: 0
				},1000,"swing");
				
				setTimeout(function(){

					img.hide();
					h1.show();

					td.css("background-color",lastColor);
					td.css("text-align","left");
					td.css("padding","5px");
					blockChange = false;
					
					h1.animate({
						
					    opacity: 1
					},1000,"swing");
				},1000);
			}, 4000);
		},1000);
	}, 20000);

	var trendsArray = $("input[type=\"hidden\"].trendUrl");

	window.setInterval(function(){
		
		subirBurbuja(0,$(".bubble"));
	},130000);
	
	if(trendsArray.length > 0) {

		getImageAjax(0,trendsArray);
	}
});

function subirBurbuja(indice, array) {

	if(indice < array.length) {
		
		var tRandom = Math.random();
		
		var value = array.eq(indice);
		
		value.css({
			
			top: "80%",
			opacity: 0,
			left : Math.floor(Math.random()*100 + 1) + "%"
		});

		value.animate({
			
			opacity: 1
		}, timeUp/4, "linear");
		
		value.animate({
			
			top: "-300px"
		}, timeUp, "linear");
		
		setTimeout(function(){
			
			subirBurbuja(indice+1,$(".bubble"));
		},2000);
	}
}

function getImageAjax(c,a) {
	
	jQuery.ajax({
		type:'GET',
		data:{'url': a.eq(c).val()},
		url:'/trend/getImage',
		success: function(data,textStatus) {

			var bubble = "";
			
			bubble += "<div class=\"ball bubble\" id=\"bubble";
		    bubble += bubbleCounter;
		    bubble += "\">";
			bubble += "<img class=\"bubbleImg\" src=\"";
			bubble += data;
			bubble += "\"/>"
			bubble += "</div>";
			
			$("#bubbles").append(bubble);

			var tRandom = Math.random();
			$(".bubble#bubble" + bubbleCounter).css({
				
				left : Math.floor(Math.random()*100 + 1) + "%",
				width : 100 + Math.floor(tRandom * 100 + 1) + "px",
				height: 100 + Math.floor(tRandom * 100 + 1) + "px"
			});

			$(".bubble#bubble" + bubbleCounter).animate({
				
				opacity: 1
			}, timeUp/4, "linear");
			
			$(".bubble#bubble" + bubbleCounter).animate({
				
				top: "-300px"
			}, timeUp, "linear");
			
			bubbleCounter++;
			
			if((c+1) < a.length) {
				
				getImageAjax(c+1,a);
			}
		},
		error : function() {

			if((c+1) < a.length) {
				
				getImageAjax(c+1,a);
			}
		}
	});
}


var TxtType = function(el, toRotate, period) {
	
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
	
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if(this.txt==='') {
    	
    	$(this.el).css("font-family", fonts[Math.floor(Math.random() * fonts.length)]);
    	
    	if(!blockChange) {
    		
    		$(this.el).parent().parent().css("background-color", colors[Math.floor(Math.random() * colors.length)]);
    	}
    }
    
    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    	
    this.isDeleting = false;
    
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

var typewriterAnimation = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {

        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}