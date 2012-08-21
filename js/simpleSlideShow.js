(function($) {
	$.simpleSlideShow = function(selector, settings) {
		var config = {
			'delay': 2000,
			'fadeSpeed': 500
		};

		if(settings) {
			$.extend(config, settings);
		}

		var slideshow = $(selector),
			img = slideshow.children('img'),
			count = img.length,
			i = 0,
			timer = null;
		
		appendPagination();

		var pagination = $('#pagination');
		var paginationLink = pagination.find('a');

		getSlideshowDimension();
		
		initSlideshow();
		startSlideshow();
		bindClickOnPagination();
		return this;

		function appendPagination() {
			var paginationHtml = '<ul id="pagination">';

			for(var j = 0; j < count; j++) {
				paginationHtml += '<li><a href="#"></a></li>';
			}

			paginationHtml += '</ul>';
			slideshow.append(paginationHtml);
		}

		function getSlideshowDimension() {
			var width, height;
			img.eq(i).load(function() {
				width = $(this).width();
				height = $(this).height();
				slideshow.width(width);
				slideshow.height(height);
				pagination.css('top', height);
			});
		}

		function initSlideshow() {
			img.eq(i).show();
			paginationLink.eq(i).addClass('current');
		}

		function startSlideshow() {
			timer = setInterval(function() {
				img.eq(i).fadeOut(config.fadeSpeed);
				paginationLink.eq(i).removeClass('current');
				i = (i+1 == count) ? 0 : i+1;
				img.eq(i).fadeIn(config.fadeSpeed);
				paginationLink.eq(i).addClass('current');
			}, config.delay);
		}

		function bindClickOnPagination() {
			paginationLink.click(function() {
				$(this).addClass('current');
				$(this).parent('li').siblings().find('a').removeClass('current');
				
				img.eq(i).fadeOut(config.fadeSpeed);
				i = paginationLink.index($(this));
				img.eq(i).fadeIn(config.fadeSpeed);
				clearInterval(timer);
				startSlideshow();
				// console.log(i);
			});
		}
	}
})(jQuery);