var he_jsApiKey = 'DE44F0D5D122B2322E7114114A9957A9';
var goldTab = false;
(function () {
	// prepare and cache some basic variables
	var d = document,
		heurekaDiv = [],
		heurekaDivId = 'hw-87kwowifjjowiklsadh666',
		showDivTimer = [],
		widthIfr = 320,
		heightIfr = 317,
		widthTab = 36,
		heightTab = 188,
		baseTop = 60,
		ifrLoaded = [],
		zIndex = 2147483647,
		clearMe = [],
		ifrWidthBox = [],
		Widget = null;

	Widget = {
			/**
			 * Language ID
			 *
			 * @var string
			 */
			language: 'cz',

			/**
			 * Widget type ID
			 *
			 * @var int
			 */
			type: null,

			/**
			 * base url
			 *
			 * @var string
			 */
			baseUrl: 'https://cz.im9.cz',

			/**
			 * Url to widget
			 *
			 * @var string
			 */
			url: '/direct/i/widget.php?',

			apiKey: null,

			im9: '',

			ssl: false,

			/**
			 * Sets API key to url
			 *
			 * @param string apiKey API key
			 */
			setKey: function (apiKey) {
				if (apiKey === '' || apiKey === undefined || Widget.url.toString().search('key=') !== -1) {
					return;
				}

				if (typeof he_jsApiKey === 'undefined' || he_jsApiKey !== apiKey) {
					// if shop uses two different api keys (one for obtain this javascript and second for obtain content for iframe)
					return;
				}

				Widget.apiKey = apiKey;
				Widget.url += "key=" + apiKey;
			},

			setTopPos: function (top) {
				if (!isNaN(top)) {
					baseTop = top;
				}
			},

			enableSSL: function (enable) {
				Widget.ssl = enable ? true : false;
			},

			showWidget: function (type) {
				// is widget disabled for this shop?
				if ((typeof dwdgt !== 'undefined' && dwdgt === true) || null === Widget.apiKey) {
					return;
				}

				if (Widget.url.toString().search('http') == -1) {
					Widget.url = Widget.baseUrl + Widget.url;
				}

				Widget.im9 = 'https://im9.cz/';

				var argv = this.showWidget.arguments;
				var argc = argv.length;

				switch(type) {
					case '1':
					case '2':
					case '3':
					case '11':
					case '12':
						if (argc !== 4) {
							//not enough params
							return;
						}
						showBadge(type, argv[1], argv[2], argv[3]);
					  break;
					case '21':
					case '22':
						var position = type === '21' ? 'left' : 'right';
						ifrLoaded[position] = false;
						createRollElement(position, type);
						break;
				}
			},

			/**
			 * Calls object methods using arguments array
			 */
			push: function() {
				var i,
					queueLen,
					methodName,
					argumentsArr = [],
					item;

				for (i = 0, queueLen = arguments.length; i < queueLen; i++) {
					item = arguments[i];

					methodName = item.slice(0, 1).toString();
					argumentsArr = item.slice(1);
					if (Widget.hasOwnProperty(methodName)) {
						Widget[methodName].apply(Widget, argumentsArr);
					}
				}
			}
		};

		function showBadge(type, shopId, name, seoId) {
			switch(type) {
				case '1':
					height = width = 76;
					break;
				case '2':
					height = width = 105;
					break;
				case '3':
					height = width = 130;
					break;
				case '11':
					width = 340;
					height = 130;
					break;
				case '12':
					width = 130;
					height = 160;
					break;
			}

			var badge = '<a href="https://obchody.heureka.cz/' + seoId + '/recenze/" target="_blank" title="Heureka.cz - ověřené hodnocení obchodu ' + name + '">'
			+ '<img src="' + Widget.im9 + 'cb/' + shopId + '-' + type +'.png" height="' + height + '" width="' + width + '" alt="Heureka.cz - ověřené hodnocení obchodu ' + name + '" style="border: 0;" /></a>';
			if (d.getElementById('showHeurekaBadgeHere-' + type)) {
				d.getElementById('showHeurekaBadgeHere-' + type).innerHTML = badge;
			}
		}

		function createRollElement(position, widgetType) {
			//create tab
			var tElm = d.createElement('div'),
				floating = (position === 'left' ? 'right' : 'left');
			var tabName = position + '-zalozka-only';
			if (goldTab) {
				tabName = tabName + '-gold';
			}
			tElm.style.cssText = 'float:' + floating + '; background:url(' + Widget.im9 + 'css-v2/images/widget/' + tabName + '.png?1) 0 0 no-repeat;';
			tElm.id = 'heurekaTab' + position;
			tElm.style.position = 'relative';
			tElm.style.display = 'block';
			tElm.style.width = widthTab + 'px';
			tElm.style.height = heightTab + 'px';
			tElm.style.zIndex = zIndex;
			tElm.style.marginTop = ((heightIfr - 187) / 2) + 'px';
			tElm.style[floating] = (-1 * widthTab) + 'px';


			//create the main div
			var wElm = d.createElement('div');
			wElm.id = heurekaDivId + position;
			wElm.style.cssText = 'position: fixed !important; position: absolute;';
			wElm.style.height = heightIfr + 'px';
			wElm.style.width = widthTab + 'px';
			//wElm.style.overflow = 'hidden';
			wElm.style.top = baseTop + 'px';
			wElm.style[position] = (-1 * widthTab) + 'px';

			wElm.style.zIndex = zIndex;
			//add tab to main div
			wElm.appendChild(tElm);

			//create iframe
			var src = Widget.url + '&wt=' + widgetType,
				iframe = d.createElement('iframe'),
				ifrBox = d.createElement('div');
			ifrBox.id = 'heurekaIfrBox' + position;
			ifrBox.style.cssText = 'float:' + floating + '; overflow:hidden; position: relative;';
			ifrBox.style.width = '0px';
			ifrBox.style.top = '-188px';

			iframe.id = 'iframe-widget' + position;
			iframe.setAttribute('allowtransparency', 'true');
			iframe.setAttribute('frameBorder', 0);
			iframe.setAttribute('scrolling', 'no');
			iframe.src = src;
			iframe.width = widthIfr + 'px';
			iframe.height = heightIfr + 'px';
			iframe.style.cssText = 'float:' + floating + '; position: relative;';
			iframe.onmouseout = function () {
				clearTimeout(clearMe[position]);
				return false;
			};
			ifrBox.appendChild(iframe);

			wElm.onmouseover = function () {
				clearTimeout(clearMe[position]);
				//load iframe only on first mouseover event
				if (!ifrLoaded[position]) {
					wElm.appendChild(ifrBox);
					ifrWidthBox[position] = d.getElementById('heurekaIfrBox' + position);
					//roll it after iframe load
					if (iframe.attachEvent) {
						iframe.attachEvent('onload', function () {
							rollIt(position);
						});
					} else {
						iframe.onload = function () {
							rollIt(position);
						};
					}
				} else {
					showDiv(position);
				}
				return false;
			};

			wElm.onmouseout = function () {
				clearMe[position] = setTimeout(function () {
					//wElm.style.width = widthTab + 'px';
					hideDiv(position);
				}, 50);

				return false;
			};

			var loaded = false;
			var addDiv = function () {
				//add main div to page
				var body = d.getElementsByTagName('body')[0];
				body.insertBefore(wElm, body.firstChild);
				heurekaDiv[position] = d.getElementById(heurekaDivId + position);
			};

			if (document.readyState === "complete" ) {
				addDiv();
				loaded = true;
				return;
			}

			// If IE event model is used
			if ( document.attachEvent ) {
				document.attachEvent("onreadystatechange", function() {
					if ( document.readyState === "complete" ) {
						document.detachEvent( "onreadystatechange", arguments.callee );
						addDiv();
						loaded = true;
					}
				});

				// continually check to see if the document is ready
				if ( document.documentElement.doScroll ) (function(){
					if ( loaded ) {
						return;
					}

					try {
						// If IE is used, use the trick by Diego Perini
						// http://javascript.nwbox.com/IEContentLoaded/
						document.documentElement.doScroll("left");
					} catch( error ) {
						setTimeout( arguments.callee, 0 );
						return;
					}

					addDiv();
					loaded = true;
				})();
			}
			// Mozilla, Opera and webkit nightlies currently support this event
			else if ( window.addEventListener ) {
				// Use the handy event callback
				window.addEventListener('load', addDiv, false );
			} else if ( document.addEventListener ) {
				// Use the handy event callback
				document.addEventListener('DOMContentLoaded', addDiv, false );
			}
		}

		function rollIt(position) {
			ifrLoaded[position] = true;
			setTimeout(function () {
				showDiv(position);
			}, 300);
		}

		function showDiv(pos) {
			var b, c = 20;
			if (isNaN(parseInt(getStyle(pos),10))) {
				b = c + "px";
				setStyle(pos, b);
			} else {
				if (parseInt(getStyle(pos),10) + c > widthIfr) {
					c = widthIfr - parseInt(getStyle(pos),10);
				}
				b = parseInt(getStyle(pos),10) + c + "px";
				setStyle(pos, b);
			}
			if (parseInt(getStyle(pos),10) < widthIfr) {
				showDivTimer[pos] = setTimeout(function () {
					showDiv(pos);
				}, 30);
			} else if (parseInt(getStyle(pos),10) === widthIfr && showDivTimer[pos] !== undefined) {
				clearTimeout(showDivTimer[pos]);
			}
		}

		function hideDiv (pos) {
			setStyle(pos, 0);
		}

		function setStyle(pos, val) {
			ifrWidthBox[pos].style.width = parseInt(val,10) + widthTab + "px";
			heurekaDiv[pos].style.width = parseInt(val,10) + widthTab + "px";
		}

		function getStyle(pos) {
			return ifrWidthBox[pos].style.width;
		}

		function differentDomains(referrer, location)
		{

			if (referrer === '' && location === '') {
				return false;
			} else if (referrer === '' || location === '') {
				return true;
			} else if (referrer === location) {
				return false;
			}

			var rl = document.createElement('a'),
				ll = document.createElement('a');
			rl.href = referrer;
			ll.href = location;

			var arrHost = rl.hostname.split('.');
			if (arrHost.length < 2) {
				return false;
			}
			var referrerHost = arrHost[arrHost.length - 2] + '.' + arrHost[arrHost.length - 1];

			arrHost = ll.hostname.split('.');
			if (arrHost.length < 2) {
				return false;
			}
			var locationHost= arrHost[arrHost.length - 2] + '.' + arrHost[arrHost.length - 1];

			return referrerHost === locationHost ? false : true;
		}

		function init () {
			// switch _hwq array with Widget object
			var tmpQueue = window['_hwq'];

			if (tmpQueue && "function" === typeof tmpQueue.push) {
				if (tmpQueue.constructor === Array) {
					// process the queue
					Widget.push.apply(Widget, tmpQueue);
				}
			}

			_hwq = Widget;
		}

		// spin that shit ;)
		init();
}());
