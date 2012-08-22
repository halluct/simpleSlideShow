(function($) {
	$.simpleSlideShow = function(selector, settings) {
		var config = {
			'delay': 2000,
			'fadeSpeed': 500
		};

		if(settings) {
			$.extend(config, settings);
		}

		var $slideshow = $(selector),
			$container = $slideshow.find('.container'),
			$img = $container.find('img'),
			count = $img.length,
			i = 0,
			timer = null;
		
		appendPagination();

		var $pagination = $('#pagination');
		var $paginationLink = $pagination.find('a');

		getImageDimension();
		
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
			$slideshow.append(paginationHtml);
		}

		function getImageDimension() {
			var width, height;
			$img.eq(i).load(function() {
				width = $(this).width();
				height = $(this).height();

				setSlideshowDimension(width, height);
				setPaginationPos(height);
			});
		}

		function initSlideshow() {
			$img.eq(i).show();
			$paginationLink.eq(i).addClass('current');
		}

		function startSlideshow() {
			timer = setInterval(function() {
				$img.eq(i).fadeOut(config.fadeSpeed);
				$paginationLink.eq(i).removeClass('current');
				i = (i+1 == count) ? 0 : i+1;
				$img.eq(i).fadeIn(config.fadeSpeed);
				$paginationLink.eq(i).addClass('current');
			}, config.delay);
		}

		function bindClickOnPagination() {
			$paginationLink.click(function() {
				$(this).addClass('current');
				$(this).parent('li').siblings().find('a').removeClass('current');
				
				$img.eq(i).fadeOut(config.fadeSpeed);
				i = $paginationLink.index($(this));
				$img.eq(i).fadeIn(config.fadeSpeed);
				clearInterval(timer);
				startSlideshow();
			});
		}

		function setSlideshowDimension(width, height) {
			$container.width(width).height(height);
			$slideshow.width(width).height(height).css('margin', '0 auto');
		}

		function setPaginationPos(height) {
			var slideshowWidth = $container.width();
			var paginationWidth = $pagination.width();
			var left = (slideshowWidth - paginationWidth) / 2;
			console.log(slideshowWidth);
			$pagination.css({
				'left': left,
				'top': 10
			});
		}
	}
})(jQuery);