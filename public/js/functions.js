
function randomize() {
	items = [
	    { image : '../images/final.png', link : 'illustration' },
	    { image : '../images/final.png', link : 'illustration' },
	    { image : '../images/final.png', link : 'illustration' },
	    { image : '../images/final.png', link : 'scaffold' }
	];
	var item = items[Math.floor(Math.random()*items.length)];
	$('.cover-image').css({ 'background-image' : 'url("public/images/final.png" + item.image + '")'});
	$('.hero-link').attr({'href' : '/projects/' + item.link });
}

function reveal() {
	window.scrollTo(0, 0);

	randomize();

	$(".gallery").imagesLoaded().progress(function(t, n) {
        $(n.img).css({ 'opacity' : 1 })
    });

	$('.cover-image').imagesLoaded({ background: true }, function() {
		$('.cover-image').css({ 'opacity' : 1 });
	});

	setTimeout(function() {
		$('#content').css({ 'opacity' : 1 });
	}, 50);
}

function showVideo(e) {
	e = e || window.event;
    var target = e.target || e.srcElement;
	$(target).css({ 'opacity' : 1 });
}

function hide() {
	$('#content').css({ 'opacity' : 0 });
}

function pin() {
	var stickyColumn   = $('.sticky-column'),
		contentHeight  = stickyColumn.outerHeight(),
		windowHeight   = $(window).height(),
		windowWidth    = $(window).width(),
		scrollPosition = $(window).scrollTop();

	if ((contentHeight > windowHeight) && (windowWidth > 1020)) {
		stickyColumn.css({ 'top' : -(contentHeight - windowHeight) });
	} else {
		stickyColumn.css({ 'top' : '' });
	}

	if (scrollPosition > (contentHeight - windowHeight)) {
		stickyColumn.addClass('pinned');
	} else {
		stickyColumn.removeClass('pinned');
	}
}

$(document).ready(function() {
	reveal();

	document.addEventListener('touchstart', function(){}, true);

	$(window).bind('load resize scroll', function() {
		pin();
	});

	var siteUrl = 'http://'+(document.location.hostname||document.location.host);

	$(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click tap", function(e) {
		e.preventDefault();
		History.pushState({}, "", this.pathname);
		hide();
	});

	History.Adapter.bind(window, 'statechange', function() {
		var State = History.getState();
		$.get(State.url, function(data){
			document.title = data.match(/<title>(.*?)<\/title>/)[1];
			setTimeout(function() {
				$('#content').html($(data).find('#content').children());
				reveal();
				pin();
			}, 500);
		});
	});

	if ('ontouchstart' in document) {
	    $('body').removeClass('no-touch');
	}
});

