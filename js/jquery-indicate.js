/*
 The MIT License (MIT)

 Copyright (c) 2014 Irrelon Software Limited
 http://www.irrelon.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice, url and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 Source: https://github.com/coolbloke1324/jquery-indicate

 Changelog:
 Version 1.0.0:
 First commit
 */
var Indicate = (function ($) {
	var Indicate = function () {
		var isObject,
			isArray;

		if (arguments[0] instanceof Object && !arguments[0].jquery) {
			// We are processing an object
			isObject = true;
		}

		if (arguments[0] instanceof Array) {
			// We are processing an array
			isArray = true;
		}

		if (isArray) {
			// We are processing an array of jQuery selectors
			this._indicateArray.apply(this, arguments);
		} else if (isObject && !isArray) {
			// We are processing an object
		} else if (!isObject && !isArray) {
			// We are processing a jQuery selector object
			this._indicateSelector.apply(this, arguments);
		}
	};

	Indicate.prototype._indicateArray = function (arr, options) {
		// Loop the array and call indicateSelector on each selector
		for (var i = 0; i < arr.length; i++) {
			this._indicateSelector(arr[i], options);
		}
	};

	Indicate.prototype._indicateSelector = function (elem, options) {
		var self = this;

		// Normalise options
		options = options || {};
		options.padding = options.padding !== undefined ? options.padding : 0;
		options.paddingLeft = options.paddingLeft !== undefined ? options.paddingLeft : options.padding;
		options.paddingTop = options.paddingTop !== undefined ? options.paddingTop : options.padding;
		options.paddingRight = options.paddingRight !== undefined ? options.paddingRight : options.padding * 2;
		options.paddingBottom = options.paddingBottom !== undefined ? options.paddingBottom : options.padding * 2;
		options.x = options.x !== undefined ? options.x : 0;
		options.y = options.y !== undefined ? options.y : 0;
		options.w = options.w !== undefined ? options.w : 0;
		options.h = options.h !== undefined ? options.h : 0;

		// Loop selector elements
		elem.each(function (index, arrElem) {
			arrElem = $(arrElem);

			// Get the element's position and size
			var position = arrElem.offset(),
				width = arrElem.width(),
				height = arrElem.height(),
				indicate;

			// Now indicate this element
			indicate = self._createIndicate(
				position.left + options.x - options.paddingLeft,
				position.top + options.y - options.paddingTop,
				width + options.w + options.paddingRight,
				height + options.h + options.paddingBottom
			);

			// Animate it
			self._animateIndicator(indicate, function () {
				indicate.remove();
			});
		});
	};

	Indicate.prototype._createIndicate = function (x, y, w, h) {
		// Create a new indicate element with the given dimensions and position
		var elem = $('<div class="indicate"></div>').appendTo('body');

		elem.css({
			left: x,
			top: y,
			width: w,
			height: h
		});

		return elem;
	};

	Indicate.prototype._animateIndicator = function (indicate, onComplete) {
		indicate
			.css('opacity', 0)
			.animate({
				opacity: 1
			})
			.animate({
				opacity: 0
			})
			.animate({
				opacity: 1
			})
			.animate({
				opacity: 0
			}, onComplete);
	};

	return Indicate;
})($);