(() => {
	var e = {
			283: e => {
				function t(e, t) {
					for (var a = 0; a < t.length; a++) {
						var n = t[a];
						n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
					}
				}
				e.exports = function() {
					function e(t, a) {
						! function(e, t) {
							if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
						}(this, e), this.x = t, this.y = a
					}
					var a, n;
					return a = e, (n = [{
						key: "dist",
						value: function(e) {
							return Math.sqrt(Math.pow(e.x - this.x, 2) + Math.pow(e.y - this.y, 2))
						}
					}, {
						key: "clone",
						value: function() {
							return new e(this.x, this.y)
						}
					}]) && t(a.prototype, n), e
				}()
			},
			849: (e, t, a) => {
				"use strict";
				a.d(t, {
					Z: () => x
				});
				var n = a(645),
					o = a.n(n),
					r = a(667),
					s = a.n(r),
					i = a(239),
					c = a(5),
					d = a(338),
					l = a(294),
					h = a(4),
					u = o()((function(e) {
						return e[1]
					})),
					p = s()(i.Z),
					m = s()(c.Z),
					g = s()(d.Z),
					f = s()(l.Z),
					y = s()(h.Z);
				u.push([e.id, "canvas {\n  position: absolute;\n  display: block;\n  cursor: default;\n}\n\nhtml {\n  background-image: url(" + p + ");\n  margin: 0px;\n  font-family: Verdana, Arial, Times, serif;\n}\n\np {\n  margin: 0px;\n  font-size: 20px;\n  color: #FFF\n}\n\na,\na:hover,\na:focus,\na:active {\n  text-decoration: none;\n  color: inherit;\n}\n\n#main {\n  position: fixed;\n  left: 0px;\n  top: 0px;\n  width: 100%;\n  height: 100%;\n  z-index: 20;\n  margin-top: 20px;\n}\n\n.message {\n  color: #FFF\n}\n\n#logo {\n  position: relative;\n  top: 20px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 600px;\n  height: 250px;\n  user-drag: none;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-drag: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\n\n#centralPannel {\n  margin: 0 auto;\n  margin-top: 10px;\n  max-width: 1100px;\n  display: block;\n}\n\n\n#bottom {\n  padding: 7px;\n  position: absolute;\n  bottom: 10px;\n  left: 5px;\n}\n\n#mapEditorButton {\n  padding: 10px;\n  background-color: rgb(82, 71, 89);\n  text-align: center;\n  font-size: 27px;\n  color: rgb(215, 215, 215);\n  margin-right: 13px;\n  border-radius: 10px;\n}\n\n\n#iogamesText {\n  padding: 7px;\n  background-color: rgb(29, 121, 149);\n  text-align: center;\n  font-size: 27px;\n  margin-right: 13px;\n  color: rgb(215, 215, 215);\n}\n\n#discordDiv {\n  text-align: center;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n\n#discordText {\n  color: #FFF;\n}\n\n#name {\n  display: block;\n  margin: 0 auto;\n  text-align: center;\n  width: 250px;\n  height: 30px;\n  font-size: 20px;\n}\n\n#loginInputs {\n  display: block;\n  margin: 0 auto;\n  text-align: center;\n  width: 400px;\n}\n\n.inputs {\n  margin: 3px;\n  font-size: 25px;\n}\n\n.inputSelectItem{\n  cursor: pointer;\n}\n\n#play {\n  border-radius: 9px;\n  border: 3px solid #728f9d;\n  /*background: linear-gradient(to bottom, rgb(0, 86, 202) 0%, black 50%, #000000 50%, black 50%, rgb(202, 0, 0) 100%);*/\n  background: rgb(171, 44, 30);\n  color: white;\n  padding: 28px 46px;\n  text-decoration: none;\n  display: block;\n  margin: 0 auto;\n  margin-top: 10px;\n  text-align: center;\n  font-size: 24px;\n  cursor: pointer;\n  font-family: DejaVu Sans Mono, monospace;\n}\n\n#guest {\n  text-decoration: none;\n  display: block;\n  margin: 0 auto;\n  margin-top: 5px;\n  text-align: center;\n  font-size: 19px;\n}\n\n.buttons {\n  font-size: 20px;\n  padding: 2px 30px;\n  margin: 4px 0;\n}\n\n.Gamebuttons {\n  font-size: 18px;\n  padding: 2px 20px;\n  margin: 0 5px;\n}\n\n.backButton {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  font-size: 21px;\n}\n\n#logoutInputs {\n  display: block;\n  margin: 0 auto;\n  text-align: center;\n  width: 400px;\n}\n\n#dressing {\n  width: 50px;\n  height: 50px;\n  padding: 0px;\n}\n\n\n#cursor {\n  user-drag: none;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-drag: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\n\n#chat-input {\n  width: 100%;\n  height: 25px;\n  border-radius: 15px;\n  box-sizing: border-box;\n  position: absolute;\n  bottom: 0;\n}\n\n#info {\n  color: rgb(88, 104, 99);\n  margin: 0 auto;\n  margin-top: 10px;\n  display: block;\n  max-width: 1100px;\n  text-align: center;\n}\n\n#createInfo {\n  color: rgb(65, 78, 74);\n  margin: 0 auto;\n  margin-top: 10px;\n  display: block;\n  max-width: 1100px;\n  text-align: center;\n}\n\n#createInfo2 {\n  color: rgb(65, 78, 74);\n  margin: 0 auto;\n  margin-top: 10px;\n  display: block;\n  max-width: 1100px;\n  text-align: center;\n}\n\n.gameButton {\n  font-size: 20px;\n  padding: 2px 30px;\n  text-align: center;\n  border-radius: 9px;\n  border: 3px solid #3f4461;\n  background: rgb(201, 201, 201);\n  color: black;\n  padding: 18px 46px;\n  margin: 6px;\n  text-align: center;\n  font-size: 24px;\n  cursor: pointer;\n  display: inline-block;\n}\n\n.mapButton {\n  font-size: 20px;\n  padding: 6px 10px;\n  border: 3px solid #3f4461;\n  color: rgb(201, 201, 201);\n  background-color: rgb(3, 9, 43);\n  margin: 6px;\n  font-size: 24px;\n}\n\n.plays {\n  font-size: 14px;\n  right: 1px;\n}\n\n#restrictionPanel {\n  text-align: center;\n}\n\n#restrictionPanel2 {\n  text-align: center;\n}\n\n#games_list {\n  margin: 0 auto;\n  margin-top: 10px;\n  max-width: 1000px;\n}\n\n#maps_list {\n  margin: 0 auto;\n  margin-top: 10px;\n  max-width: 1000px;\n}\n\n#files {\n  text-align: center;\n  margin-top: 30px;\n}\n\n#files2 {\n  text-align: center;\n  margin-top: 30px;\n}\n\n#gameName {\n  text-align: center;\n  margin-top: 30px;\n}\n\n#gameNameInput {\n  text-align: center;\n  font-size: 26px;\n}\n\n#gameName2 {\n  text-align: center;\n  margin-top: 30px;\n}\n\n#gameNameInput2 {\n  text-align: center;\n  font-size: 26px;\n}\n\n#passwordGame {\n  text-align: center;\n  margin-top: 3px;\n}\n\n#passwordGameInput {\n  text-align: center;\n  font-size: 16px;\n}\n\n#passwordGame2 {\n  text-align: center;\n  margin-top: 3px;\n}\n\n#passwordGameInput2 {\n  text-align: center;\n  font-size: 16px;\n}\n\n.customGameSwitch {\n  text-align: center;\n  margin-top: 20px;\n  color: rgb(88, 104, 99);\n  font-size: 26px;\n}\n\n#createGame {\n  font-size: 24px;\n}\n\n#createGame2 {\n  font-size: 24px;\n}\n\n#searchInputDiv {\n  text-align: center;\n  margin-top: 3px;\n}\n\n#searchInput {\n  text-align: center;\n  font-size: 16px;\n}\n\n#loadMoreButton {\n  font-size: 19px;\n}\n\n#createButton {\n  text-align: center;\n  margin-top: 20px;\n}\n\n#createButton2 {\n  text-align: center;\n  margin-top: 20px;\n}\n\n#loadMore {\n  text-align: center;\n  margin-top: 20px;\n}\n\n.games_buttons {\n  margin-top: 20px;\n  text-align: center;\n}\n\n.image {\n  width: 50px;\n  height: 50px;\n}\n\n#thingsToKnow {\n  margin-top: 20px;\n  text-align: center;\n  color: rgb(88, 104, 99);\n  font-size: 20px;\n}\n\n#thingsToKnow2 {\n  margin-top: 20px;\n  text-align: center;\n  color: rgb(88, 104, 99);\n  font-size: 20px;\n}\n\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 60px;\n  height: 34px;\n}\n\n.switch input {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\n.slider:before {\n  position: absolute;\n  content: \"\";\n  height: 26px;\n  width: 26px;\n  left: 4px;\n  bottom: 4px;\n  background-color: white;\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\ninput:checked+.slider {\n  background-color: #2196F3;\n}\n\ninput:focus+.slider {\n  box-shadow: 0 0 1px #2196F3;\n}\n\ninput:checked+.slider:before {\n  -webkit-transform: translateX(26px);\n  -ms-transform: translateX(26px);\n  transform: translateX(26px);\n}\n\n/* Rounded sliders */\n.slider.round {\n  border-radius: 34px;\n}\n\n.slider.round:before {\n  border-radius: 50%;\n}\n\n.label-file {\n  cursor: pointer;\n  color: white;\n  background-color: black;\n  font-size: 24px;\n}\n\n#fileLabel2 {\n  color: white;\n  font-size: 24px;\n}\n\n.label-file:hover {\n  color: #bfbfbf;\n}\n\n.input-file {\n  display: none;\n}\n\n.title {\n  color: white;\n  font-size: 30px;\n  text-align: center;\n  margin-top: 20px;\n}\n\n#color{\n  margin: 0 auto;\n  margin-top: 50px;\n  text-align: center;\n  color: white\n}\n#hat{\n  margin: 0 auto;\n  margin-top: 50px;\n  text-align: center;\n  color: white;\n}\n\n.hatBox{\n  width: 120px;\n  padding: 10px;\n}\n\n#hatSelection{\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  justify-content: center;\n  width: 570px;\n  margin: 0 auto;\n  padding: 10px;\n  border-radius: 5px;\n}\n\n.hatImage{\n  width: 50px;\n  height: 50px;\n  cursor: pointer;\n  background-color: rgba(171, 171, 171, 0.1);\n}\n\n\n@font-face {\n  font-family: 'yes';\n  src: url(" + m + ") format('truetype');\n}\n\n@font-face {\n  font-family: 'yes1';\n  src: url(" + g + ") format('truetype');\n}\n\n@font-face {\n  font-family: 'yes2';\n  src: url(" + f + ") format('truetype');\n}\n\n@font-face {\n  font-family: 'Mogena';\n  src: url(" + y + ") format('truetype');\n}\n\n#settings {\n  background-color: rgba(106, 106, 106, 0.45);\n  margin: 5px;\n  padding: 13px;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  color: white;\n  border-radius: 10px;\n}\n\ninput.switch-border {\n  display: none;\n}\n\ninput.switch-border+label>img {\n  border: 2px solid transparent;\n  cursor: pointer;\n}\n\ninput.switch-border:checked+label>img {\n  border-color: grey;\n}\n\n.shake {\n  -webkit-animation: .06s linear 0s 5 alternate shake;\n  animation: .06s linear 0s 5 alternate shake;\n}\n\n@-webkit-keyframes shake {\n  from {\n    margin-left: 31.5%;\n  }\n\n  to {\n    margin-left: 32.5%;\n  }\n}\n\n@keyframes shake {\n  from {\n    margin-left: 31.5%;\n  }\n\n  to {\n    margin-left: 32.5%;\n  }\n}\n\n.grecaptcha-badge { visibility: hidden; }\n\n.leaderboard-dead {\n  color: red;\n}\n\n.leaderboard-normal {\n  color: white;\n}\n\n.leaderboard-frozen {\n  color: #4beaf2;\n}\n\n.leaderboard {\n  font: 17px Andika;\n  line-height: 20px;\n}\n\n.chat-dev {\n  color: rgb(105, 142, 100)\n}\n\n.chat-mod {\n  color: rgb(191, 184, 85)\n}\n\n.chat-guest {\n  color: rgb(190, 190, 190);\n}\n\n.chat-discord {\n  color: rgb(189, 201, 255);\n}\n\n.chat-normal {\n  color: rgb(255,255,255)\n}\n\n#leaderboard {\n  margin-left: 3px;\n  margin-top: 3px;\n  margin-right: 3px;\n  padding-left: 3px;\n  padding-right: 3px;\n  padding-top: 1px;\n  padding-bottom: 1px;\n  background-color: rgba(30, 30, 30, 0.73);\n  border-radius: 10px;\n  position: absolute;\n  top: 3px;\n  width: 290px;\n  height: 200px;\n  overflow: scroll;\n  -ms-overflow-style: none;  /* IE and Edge */\n  scrollbar-width: none;  /* Firefox */\n  z-index: 9;\n  line-height: 20px;\n}\n\n#leaderboard::-webkit-scrollbar {\n  display: none;\n}\n\n#chat {\n  /* position: absolute; */\n  bottom: 15px;\n  border-radius: 15px 15px 0px 0px;\n  background-color: rgba(40, 40, 40, 0.8);\n  z-index: 10;\n  width: 300px;\n  height: 200px;\n  max-height: 200px;\n  overflow-y: scroll;\n  overflow-x: wrap;\n  -ms-overflow-style: none;  /* IE and Edge */\n  scrollbar-width: none;  /* Firefox */\n  font: 16px Andika;\n  line-height: 19px;\n}\n\n.chat {\n  margin-left: 3px;\n}\n\n#chat::-webkit-scrollbar {\n  display: none;\n}\n\n#textInput {\n  width: 290px;\n  overflow: scroll;\n  /* position: absolute; */\n  -ms-overflow-style: none;  /* IE and Edge */\n  scrollbar-width: none;  /* Firefox */\n  border: 3px solid rgba(40, 40, 40, 0.8);\n  background-color:rgb(190, 190, 190);\n  height: 20px;\n}\n\n#textInput::-webkit-scrollbar {\n  display: none;\n}\n\n#chatui {\n  position: absolute;\n  bottom: 0px;\n}\n\n#gameadsbanner{\n  bottom: 10px;\n  left: 10px;\n}\n", ""]);
				const x = u
			},
			645: e => {
				"use strict";
				e.exports = function(e) {
					var t = [];
					return t.toString = function() {
						return this.map((function(t) {
							var a = e(t);
							return t[2] ? "@media ".concat(t[2], " {").concat(a, "}") : a
						})).join("")
					}, t.i = function(e, a, n) {
						"string" == typeof e && (e = [
							[null, e, ""]
						]);
						var o = {};
						if (n)
							for (var r = 0; r < this.length; r++) {
								var s = this[r][0];
								null != s && (o[s] = !0)
							}
						for (var i = 0; i < e.length; i++) {
							var c = [].concat(e[i]);
							n && o[c[0]] || (a && (c[2] ? c[2] = "".concat(a, " and ").concat(c[2]) : c[2] = a), t.push(c))
						}
					}, t
				}
			},
			667: e => {
				"use strict";
				e.exports = function(e, t) {
					return t || (t = {}), "string" != typeof(e = e && e.__esModule ? e.default : e) ? e : (/^['"].*['"]$/.test(e) && (e = e.slice(1, -1)), t.hash && (e += t.hash), /["'() \t\n]/.test(e) || t.needQuotes ? '"'.concat(e.replace(/"/g, '\\"').replace(/\n/g, "\\n"), '"') : e)
				}
			},
			5: (e, t, a) => {
				"use strict";
				a.d(t, {
					Z: () => n
				});
				const n = a.p + "d7660a09bf0c699d3ff8a7f5c789482f.ttf"
			},
			338: (e, t, a) => {
				"use strict";
				a.d(t, {
					Z: () => n
				});
				const n = a.p + "e4ab19d93a8c776e7b258d9e9cb327ee.ttf"
			},
			294: (e, t, a) => {
				"use strict";
				a.d(t, {
					Z: () => n
				});
				const n = a.p + "fb304cfb22003d6c591e174b670d9ff4.ttf"
			},
			4: (e, t, a) => {
				"use strict";
				a.d(t, {
					Z: () => n
				});
				const n = a.p + "87096688e5d48b50fa81ba9a721ef38b.ttf"
			},
			239: (e, t, a) => {
				"use strict";
				a.d(t, {
					Z: () => n
				});
				const n = a.p + "cedfa3acd1f40a351d5f942634e5a278.png"
			},
			379: (e, t, a) => {
				"use strict";
				var n, o = function() {
						var e = {};
						return function(t) {
							if (void 0 === e[t]) {
								var a = document.querySelector(t);
								if (window.HTMLIFrameElement && a instanceof window.HTMLIFrameElement) try {
									a = a.contentDocument.head
								} catch (e) {
									a = null
								}
								e[t] = a
							}
							return e[t]
						}
					}(),
					r = [];

				function s(e) {
					for (var t = -1, a = 0; a < r.length; a++)
						if (r[a].identifier === e) {
							t = a;
							break
						} return t
				}

				function i(e, t) {
					for (var a = {}, n = [], o = 0; o < e.length; o++) {
						var i = e[o],
							c = t.base ? i[0] + t.base : i[0],
							d = a[c] || 0,
							l = "".concat(c, " ").concat(d);
						a[c] = d + 1;
						var h = s(l),
							u = {
								css: i[1],
								media: i[2],
								sourceMap: i[3]
							}; - 1 !== h ? (r[h].references++, r[h].updater(u)) : r.push({
							identifier: l,
							updater: g(u, t),
							references: 1
						}), n.push(l)
					}
					return n
				}

				function c(e) {
					var t = document.createElement("style"),
						n = e.attributes || {};
					if (void 0 === n.nonce) {
						var r = a.nc;
						r && (n.nonce = r)
					}
					if (Object.keys(n).forEach((function(e) {
							t.setAttribute(e, n[e])
						})), "function" == typeof e.insert) e.insert(t);
					else {
						var s = o(e.insert || "head");
						if (!s) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
						s.appendChild(t)
					}
					return t
				}
				var d, l = (d = [], function(e, t) {
					return d[e] = t, d.filter(Boolean).join("\n")
				});

				function h(e, t, a, n) {
					var o = a ? "" : n.media ? "@media ".concat(n.media, " {").concat(n.css, "}") : n.css;
					if (e.styleSheet) e.styleSheet.cssText = l(t, o);
					else {
						var r = document.createTextNode(o),
							s = e.childNodes;
						s[t] && e.removeChild(s[t]), s.length ? e.insertBefore(r, s[t]) : e.appendChild(r)
					}
				}

				function u(e, t, a) {
					var n = a.css,
						o = a.media,
						r = a.sourceMap;
					if (o ? e.setAttribute("media", o) : e.removeAttribute("media"), r && "undefined" != typeof btoa && (n += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r)))), " */")), e.styleSheet) e.styleSheet.cssText = n;
					else {
						for (; e.firstChild;) e.removeChild(e.firstChild);
						e.appendChild(document.createTextNode(n))
					}
				}
				var p = null,
					m = 0;

				function g(e, t) {
					var a, n, o;
					if (t.singleton) {
						var r = m++;
						a = p || (p = c(t)), n = h.bind(null, a, r, !1), o = h.bind(null, a, r, !0)
					} else a = c(t), n = u.bind(null, a, t), o = function() {
						! function(e) {
							if (null === e.parentNode) return !1;
							e.parentNode.removeChild(e)
						}(a)
					};
					return n(e),
						function(t) {
							if (t) {
								if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
								n(e = t)
							} else o()
						}
				}
				e.exports = function(e, t) {
					(t = t || {}).singleton || "boolean" == typeof t.singleton || (t.singleton = (void 0 === n && (n = Boolean(window && document && document.all && !window.atob)), n));
					var a = i(e = e || [], t);
					return function(e) {
						if (e = e || [], "[object Array]" === Object.prototype.toString.call(e)) {
							for (var n = 0; n < a.length; n++) {
								var o = s(a[n]);
								r[o].references--
							}
							for (var c = i(e, t), d = 0; d < a.length; d++) {
								var l = s(a[d]);
								0 === r[l].references && (r[l].updater(), r.splice(l, 1))
							}
							a = c
						}
					}
				}
			}
		},
		t = {};

	function a(n) {
		var o = t[n];
		if (void 0 !== o) return o.exports;
		var r = t[n] = {
			id: n,
			exports: {}
		};
		return e[n](r, r.exports, a), r.exports
	}
	a.n = e => {
		var t = e && e.__esModule ? () => e.default : () => e;
		return a.d(t, {
			a: t
		}), t
	}, a.d = (e, t) => {
		for (var n in t) a.o(t, n) && !a.o(e, n) && Object.defineProperty(e, n, {
			enumerable: !0,
			get: t[n]
		})
	}, a.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), a.p = "/";
	var n = {};
	(() => {
		"use strict";
		a.d(n, {
			Z: () => F
		});
		var e = a(379),
			t = a.n(e),
			o = a(849);
		t()(o.Z, {
			insert: "head",
			singleton: !1
		}), o.Z.locals;
		var r, s = a(283),
			i = a.n(s),
			c = document.getElementById("game"),
			d = c.width,
			l = c.height,
			h = {
				"-1": "Left Click",
				"-2": "Right Click",
				"-3": "Middle Click",
				8: "backspace",
				9: "tab",
				13: "enter",
				16: "shift",
				17: "ctrl",
				18: "alt",
				19: "pausebreak",
				20: "capslock",
				27: "escape",
				32: "space",
				33: "pageup",
				34: "pagedown",
				35: "end",
				36: "home",
				37: "left",
				38: "up",
				39: "right",
				40: "down",
				43: "+",
				44: "printscreen",
				45: "insert",
				46: "delete",
				112: "f1",
				113: "f2",
				114: "f3",
				115: "f4",
				116: "f5",
				117: "f6",
				118: "f7",
				119: "f8",
				120: "f9",
				121: "f10",
				122: "f11",
				123: "f12",
				144: "numlock",
				145: "scrolllock"
			};

		function u() {
			var e = window.innerWidth,
				t = window.innerHeight,
				a = e / d,
				n = t / l;
			for (var o in scale = a, n < a && (scale = n), gamed.childNodes) 1 == gamed.childNodes[o].nodeType && (gamed.childNodes[o].style.transform = "scale(".concat(scale, ")"), gamed.childNodes[o].style.left = "".concat((e - d) / 2, "px"), gamed.childNodes[o].style.top = "".concat((t - l) / 2, "px"))
		}
		window.onresize = function() {
			u()
		}, window.onload = function() {
			if (u(), localStorage.keybinds && 10 != localStorage.keybinds.split(",").length && localStorage.clear(), localStorage.getItem("keybinds"))
				for (var e in keysInput = localStorage.getItem("keybinds").split(","), document.getElementsByClassName("inputSelectItem"))
					if (keysInput[e]) {
						var t = h[keysInput[e]];
						if (t || (t = String.fromCharCode(keysInput[e])), 11 == document.getElementsByClassName("inputSelectItem")[e]) continue;
						document.getElementsByClassName("inputSelectItem")[e].innerHTML = t.charAt(0).toUpperCase() + t.slice(1)
					} localStorage.getItem("aim") && (aim = localStorage.getItem("aim"), 1 == aim && (document.getElementsByClassName("inputSelectItem")[8].innerHTML = "Keyboard")), localStorage.getItem("roomTransition") && (window.roomTransition = "true" == localStorage.getItem("roomTransition"), document.getElementById("roomTransition").innerHTML = window.roomTransition), document.addEventListener("keydown", (function(e) {
				if (null != changingKey) {
					var t = h[e.keyCode];
					t || (t = String.fromCharCode(e.keyCode)), t.trim() ? (changingElement.innerHTML = t.charAt(0).toUpperCase() + t.slice(1), keysInput[changingKey] = e.keyCode) : changingElement.innerHTML = previousElementContent, changingElement = null, changingKey = null, localStorage.setItem("keybinds", keysInput)
				} else if (!window.inMenu) {
					if (!states.chat.inChat) {
						if (e.repeat) return;
						85 == e.keyCode && fov--, 73 == e.keyCode && fov++, fov < 1 && (fov = 1), fov > 13 && (fov = 13), 79 == e.keyCode && (debug = !debug), 80 == e.keyCode && (states.settings.showChat = !states.settings.showChat, states.settings.showChat ? document.getElementById("chatui").style.display = "" : document.getElementById("chatui").style.display = "none"), 76 == e.keyCode && (states.settings.showLeaderboard = !states.settings.showLeaderboard, states.settings.showLeaderboard ? states.leaderboard.leaderboard.style.display = "" : states.leaderboard.leaderboard.style.display = "none"), x(e.keyCode, !0)
					}
					if (13 == e.keyCode) {
						if (e.repeat) return;
						states.chat.inChat ? (document.getElementById("textInput").value.length > 0 && ("/clear" == document.getElementById("textInput").value ? (states.chat.messages = [], states.chat.chat.innerHTML = "") : F.send(msgpack.encode({
							e: "message",
							message: document.getElementById("textInput").value
						}))), document.getElementById("textInput").value = "", states.chat.cursor = states.chat.message.length, states.chat.inChat = !1, document.getElementById("textInput").blur()) : (states.chat.inChat = !0, document.getElementById("textInput").focus())
					}
					8 == e.keyCode && states.chat.inChat && states.chat.message.length > 0 && (states.chat.message = states.chat.message.substring(0, states.chat.cursor - 1) + states.chat.message.substring(states.chat.cursor, states.chat.message.length), states.chat.cursor > 0 && (states.chat.cursor--, states.animations.cursor = [states.time])), 37 == e.keyCode && states.chat.inChat && states.chat.cursor > 0 && (states.chat.cursor--, states.animations.cursor = [states.time]), 39 == e.keyCode && states.chat.inChat && states.chat.cursor < states.chat.message.length && (states.chat.cursor++, states.animations.cursor = [states.time]), 32 == e.keyCode && (states.chat.inChat || "reward1" in states.animations && (states.animations.reward1[0] = states.time, states.animations.reward1[1]++))
				}
			}), !1), document.addEventListener("keyup", (function(e) {
				window.inMenu || x(e.keyCode, !1)
			}), !1), document.addEventListener("mousemove", (function(e) {
				var t = cursor.getBoundingClientRect();
				mousePos = new(i())((e.pageX - t.left) / scale, (e.pageY - t.top) / scale)
			}), !1), document.getElementById("play").onclick = function() {
				if (loggedIn) {
					for (window.refreshInterval = 1, F.send(msgpack.encode({
							e: "games"
						})); document.getElementById("games_list").firstChild;) document.getElementById("games_list").removeChild(document.getElementById("games_list").lastChild);
					document.getElementById("mainScreen").style.display = "none", document.getElementById("games").style.display = "block"
				}
			}, document.getElementById("refresh").onclick = function() {
				F.send(msgpack.encode({
					e: "games"
				}))
			}, document.getElementById("create").onclick = function() {
				document.getElementById("mainMenu").style.display = "none", document.getElementById("createMenu").style.display = "block"
			}, document.getElementById("browser").onclick = function() {
				document.getElementById("mainMenu").style.display = "none", document.getElementById("mapMenu").style.display = "block", F.send(msgpack.encode({
					e: "maps",
					s: 0,
					o: document.getElementById("dropdown").selectedIndex,
					c: ""
				}))
			}, document.getElementById("loadMoreButton").onclick = function() {
				F.send(msgpack.encode({
					e: "maps",
					s: document.getElementsByClassName("mapButton").length,
					o: document.getElementById("dropdown").selectedIndex,
					c: ""
				}))
			}, document.getElementById("register").onclick = function() {
				var e = document.getElementById("username"),
					t = document.getElementById("password");
				t.value.length > 3 ? F.send(msgpack.encode({
					e: "register",
					m: {
						username: e.value,
						password: m(e.value + t.value)
					}
				})) : document.getElementById("info").innerHTML = "the password must be longer than 3 characters"
			}, document.getElementById("login").onclick = function() {
				grecaptcha.ready((function() {
					grecaptcha.execute("6Ld2wFMaAAAAAIL8fjR5Bwg6kn3fP2t-b9NFoK_R", {
						action: "submit"
					}).then((function(e) {
						var t = document.getElementById("username"),
							a = document.getElementById("password");
						F.send(msgpack.encode({
							e: "login",
							m: {
								username: t.value,
								password: m(t.value + a.value)
							},
							t: e
						}))
					}))
				}))
			}, document.getElementById("guest").onclick = function() {
				grecaptcha.ready((function() {
					grecaptcha.execute("6Ld2wFMaAAAAAIL8fjR5Bwg6kn3fP2t-b9NFoK_R", {
						action: "submit"
					}).then((function(e) {
						document.getElementById("username"), document.getElementById("password"), F.send(msgpack.encode({
							e: "guest",
							t: e
						}))
					}))
				}))
			}, document.getElementById("logout").onclick = function() {
				F.send(msgpack.encode({
					e: "logout"
				})), document.getElementById("info").innerHTML = ""
			}, document.getElementById("dressing").onclick = function() {
				document.getElementById("mainScreen").style.display = "none", document.getElementById("dressingScreen").style.display = "block", F.send(msgpack.encode({
					e: "getStyle"
				}))
			}, document.getElementById("colorPicker").addEventListener("change", (function(e) {
				var t;
				F.send(msgpack.encode({
					e: "colorChange",
					c: (t = e.target.value, [parseInt(t.substring(1, 3), 16), parseInt(t.substring(3, 5), 16), parseInt(t.substring(5, 7), 16)])
				}))
			}), !1), document.onmousedown = function(e) {
				if (window.inMenu) null != changingKey && (0 == e.button && (changingElement.innerHTML = "Left Click", keysInput[changingKey] = -1, changingElement = null, changingKey = null, localStorage.setItem("keybinds", keysInput)), 1 == e.button && (changingElement.innerHTML = "Middle Click", keysInput[changingKey] = -3, changingElement = null, changingKey = null, localStorage.setItem("keybinds", keysInput)), 2 == e.button && (changingElement.innerHTML = "Right Click", keysInput[changingKey] = -2, changingElement = null, changingKey = null, localStorage.setItem("keybinds", keysInput)));
				else {
					var t, a = !0;
					if (1 == e.buttons)
						for (var n in p(mousePos, new(i())(5, l - 35), new(i())(290, 30)) ? (a = !1, e.preventDefault(), states.chat.inChat = !0, document.getElementById("textInput").focus()) : (states.chat.inChat && (a = !1), states.chat.inChat = !1, c.focus()), states.powers) p(mousePos, f(n, states.powers.length), new(i())(41, 41)) && (a = !1, states.grabbing = !0, states.grabbed = n);
					a && (0 == e.button && (t = -1), 2 == e.button && (t = -2), 1 == e.button && (t = -3), x(t, !0))
				}
			}, document.onmouseup = function(e) {
				if (!window.inMenu)
					if (states.grabbing) {
						states.grabbing = !1;
						var t = !1,
							a = -1,
							n = [states.powers[0], states.powers[1]];
						for (var o in states.powers) p(mousePos, f(o, states.powers.length), new(i())(41, 41)) && (t = !0, a = o);
						if (t && !states.datas.players[states.datas.infos.id].states.includes("Died")) {
							var r = states.powers[a];
							states.powers[a] = states.powers[states.grabbed], states.powers[states.grabbed] = r;
							var s = f(a, states.powers.length);
							states.powers[a].targetPos = new(i())(s.x + 20, s.y + 20), states.powers[0] !== n[0] && F.send(msgpack.encode({
								e: "powerChange",
								m: 0,
								i: states.powers[0].type
							})), states.powers[1] !== n[1] && F.send(msgpack.encode({
								e: "powerChange",
								m: 1,
								i: states.powers[1].type
							}))
						}
						var c = f(states.grabbed, states.powers.length);
						states.powers[states.grabbed].targetPos = new(i())(c.x + 20, c.y + 20)
					} else {
						var d;
						0 == e.button && (d = -1), 2 == e.button && (d = -2), 1 == e.button && (d = -3), x(d, !1)
					}
			}, document.addEventListener("wheel", (function(e) {
				window.inMenu || (p(mousePos, new(i())(7, l - 300), new(i())(293, 263)) && (states.chat.scroll -= e.deltaY / 5, states.chat.scroll < 0 && (states.chat.scroll = 0), states.chat.messages.height - 263 < states.chat.scroll && (states.chat.messages.height - 263 > 0 ? states.chat.scroll = states.chat.messages.height - 263 : states.chat.scroll = 0)), p(mousePos, new(i())(3, 3), new(i())(293, 200)) && (states.leaderboard.scroll -= e.deltaY / 5, states.leaderboard.scroll < 0 && (states.leaderboard.scroll = 0), states.leaderboard.scroll + 200 > states.leaderboard.leaderboard.height && (states.leaderboard.leaderboard.height - 200 > 0 ? states.leaderboard.scroll = states.leaderboard.leaderboard.height - 200 : states.leaderboard.scroll = 0)))
			}), !1), document.getElementById("file").addEventListener("change", (function() {
				var e = this.files[0],
					t = new FileReader;
				t.onloadend = function(t) {
					t.target.readyState == FileReader.DONE && (r = JSON.parse(t.target.result), document.getElementById("fileLabel").innerHTML = e.name)
				}, t.readAsBinaryString(e)
			}), !1), document.getElementById("createGame").onclick = function() {
				if (document.getElementById("switch4").checked) F.send(msgpack.encode({
					e: "createGame",
					s: {
						s: !0
					}
				}));
				else {
					var e = {
						n: document.getElementById("gameNameInput").value,
						p: document.getElementById("switch").checked,
						g: document.getElementById("switch1").checked,
						r: document.getElementById("switch2").checked,
						u: document.getElementById("switch3").checked
					};
					if (document.getElementById("switch").checked && (e.pa = document.getElementById("passwordGameInput").value), document.getElementById("switch2").checked) {
						var t = [];
						document.getElementById("shrinker").checked || t.push(0), document.getElementById("explosion").checked || t.push(1), document.getElementById("wall").checked || t.push(2), document.getElementById("meteor").checked || t.push(3), document.getElementById("refuel").checked || t.push(4), document.getElementById("feather").checked || t.push(5), document.getElementById("dash").checked || t.push(7), document.getElementById("lantern").checked || t.push(8), document.getElementById("shield").checked || t.push(6), document.getElementById("ghost").checked || t.push(9), e.rd = t
					}
					F.send(msgpack.encode({
						e: "createGame",
						j: r,
						s: e
					}))
				}
			};
			var a = document.getElementById("switch");
			a.addEventListener("change", (function(e) {
				e.target.checked ? document.getElementById("passwordGame").style.display = "" : document.getElementById("passwordGame").style.display = "none"
			})), document.getElementById("switch2").addEventListener("change", (function(e) {
				e.target.checked ? document.getElementById("restrictionPanel").style.display = "" : document.getElementById("restrictionPanel").style.display = "none"
			})), document.getElementById("switch4").addEventListener("change", (function(e) {
				e.target.checked ? (document.getElementById("gameName").style.display = "none", document.getElementById("files").style.display = "none", document.getElementById("perms").style.display = "none", document.getElementById("private").style.display = "none", document.getElementById("passwordGame").style.display = "none", document.getElementById("restriction").style.display = "none", document.getElementById("restrictionPanel").style.display = "none", document.getElementById("upload").style.display = "none") : (document.getElementById("gameName").style.display = "", document.getElementById("files").style.display = "", document.getElementById("perms").style.display = "", document.getElementById("private").style.display = "", document.getElementById("restriction").style.display = "", document.getElementById("upload").style.display = "")
			})), document.getElementById("dropdown").addEventListener("change", (function(e) {
				F.send(msgpack.encode({
					e: "maps",
					s: 0,
					o: document.getElementById("dropdown").selectedIndex,
					c: document.getElementById("searchInput").value
				}))
			})), document.getElementById("createGame2").onclick = function() {
				var e = {
					n: document.getElementById("gameNameInput2").value,
					p: document.getElementById("switch02").checked,
					g: document.getElementById("switch12").checked,
					r: document.getElementById("switch22").checked
				};
				if (document.getElementById("switch02").checked && (e.pa = document.getElementById("passwordGameInput2").value), document.getElementById("switch22").checked) {
					var t = [];
					document.getElementById("shrinker2").checked || t.push(0), document.getElementById("explosion2").checked || t.push(1), document.getElementById("wall2").checked || t.push(2), document.getElementById("meteor2").checked || t.push(3), document.getElementById("refuel2").checked || t.push(4), document.getElementById("feather2").checked || t.push(5), document.getElementById("dash2").checked || t.push(7), document.getElementById("lantern2").checked || t.push(8), document.getElementById("shield2").checked || t.push(6), document.getElementById("ghost2").checked || t.push(9), e.rd = t
				}
				F.send(msgpack.encode({
					e: "createGame2",
					i: window.currentId,
					s: e
				}))
			}, (a = document.getElementById("switch02")).addEventListener("change", (function(e) {
				e.target.checked ? document.getElementById("passwordGame2").style.display = "" : document.getElementById("passwordGame2").style.display = "none"
			})), document.getElementById("switch22").addEventListener("change", (function(e) {
				e.target.checked ? document.getElementById("restrictionPanel2").style.display = "" : document.getElementById("restrictionPanel2").style.display = "none"
			})), document.getElementById("mainMenuBack").onclick = function() {
				clearInterval(window.refreshInterval), window.refreshInterval = null, document.getElementById("games").style.display = "none", document.getElementById("mainScreen").style.display = "block"
			}, document.getElementById("createMenuBack").onclick = function() {
				document.getElementById("createMenu").style.display = "none", document.getElementById("mainMenu").style.display = "block"
			}, document.getElementById("createMenu2Back").onclick = function() {
				document.getElementById("createMenu2").style.display = "none", document.getElementById("mapMenu").style.display = "block"
			}, document.getElementById("mapMenuBack").onclick = function() {
				document.getElementById("mapMenu").style.display = "none", document.getElementById("mainMenu").style.display = "block"
			}, document.getElementById("dressingMenuBack").onclick = function() {
				document.getElementById("dressingScreen").style.display = "none", document.getElementById("mainScreen").style.display = "block"
			}
		}, window.keybindChange = function(e, t) {
			null != changingKey && null != changingElement && (changingElement.innerHTML = previousElementContent), previousElementContent = e.innerHTML, e.innerHTML = "Press any Key", changingElement = e, changingKey = t
		}, window.searchInputFunc = function() {
			for (; document.getElementById("maps_list").firstChild;) document.getElementById("maps_list").removeChild(document.getElementById("maps_list").lastChild);
			F.send(msgpack.encode({
				e: "maps",
				s: 0,
				o: document.getElementById("dropdown").selectedIndex,
				c: document.getElementById("searchInput").value
			}))
		}, window.changeOption = function() {
			for (; document.getElementById("maps_list").firstChild;) document.getElementById("maps_list").removeChild(document.getElementById("maps_list").lastChild);
			F.send(msgpack.encode({
				e: "maps",
				s: 0,
				o: document.getElementById("dropdown").selectedIndex,
				c: document.getElementById("searchInput").value
			}))
		}, window.changeRoomAnimation = function() {
			window.roomTransition = !window.roomTransition, document.getElementById("roomTransition").innerHTML = window.roomTransition, localStorage.setItem("roomTransition", String(window.roomTransition))
		};
		var p = function(e, t, a) {
			return e.x > t.x && e.x < t.x + a.x && e.y > t.y && e.y < t.y + a.y
		};

		function m(e) {
			function t(e, t) {
				var a = (65535 & e) + (65535 & t);
				return (e >> 16) + (t >> 16) + (a >> 16) << 16 | 65535 & a
			}

			function a(e, t) {
				return e >>> t | e << 32 - t
			}

			function n(e, t) {
				return e >>> t
			}

			function o(e, t, a) {
				return e & t ^ ~e & a
			}

			function r(e, t, a) {
				return e & t ^ e & a ^ t & a
			}

			function s(e) {
				return a(e, 2) ^ a(e, 13) ^ a(e, 22)
			}

			function i(e) {
				return a(e, 6) ^ a(e, 11) ^ a(e, 25)
			}

			function c(e) {
				return a(e, 7) ^ a(e, 18) ^ n(e, 3)
			}
			return function(e) {
				for (var t = "0123456789abcdef", a = "", n = 0; n < 4 * e.length; n++) a += t.charAt(e[n >> 2] >> 8 * (3 - n % 4) + 4 & 15) + t.charAt(e[n >> 2] >> 8 * (3 - n % 4) & 15);
				return a
			}(function(e, d) {
				var l, h, u, p, m, g, f, y, x, v, w, b = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298),
					M = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225),
					I = new Array(64);
				e[d >> 5] |= 128 << 24 - d % 32, e[15 + (d + 64 >> 9 << 4)] = d;
				for (var k = 0; k < e.length; k += 16) {
					l = M[0], h = M[1], u = M[2], p = M[3], m = M[4], g = M[5], f = M[6], y = M[7];
					for (var E = 0; E < 64; E++) I[E] = E < 16 ? e[E + k] : t(t(t(a(w = I[E - 2], 17) ^ a(w, 19) ^ n(w, 10), I[E - 7]), c(I[E - 15])), I[E - 16]), x = t(t(t(t(y, i(m)), o(m, g, f)), b[E]), I[E]), v = t(s(l), r(l, h, u)), y = f, f = g, g = m, m = t(p, x), p = u, u = h, h = l, l = t(x, v);
					M[0] = t(l, M[0]), M[1] = t(h, M[1]), M[2] = t(u, M[2]), M[3] = t(p, M[3]), M[4] = t(m, M[4]), M[5] = t(g, M[5]), M[6] = t(f, M[6]), M[7] = t(y, M[7])
				}
				return M
			}(function(e) {
				for (var t = Array(), a = 0; a < 8 * e.length; a += 8) t[a >> 5] |= (255 & e.charCodeAt(a / 8)) << 24 - a % 32;
				return t
			}(e = function(e) {
				e = e.replace(/\r\n/g, "\n");
				for (var t = "", a = 0; a < e.length; a++) {
					var n = e.charCodeAt(a);
					n < 128 ? t += String.fromCharCode(n) : n > 127 && n < 2048 ? (t += String.fromCharCode(n >> 6 | 192), t += String.fromCharCode(63 & n | 128)) : (t += String.fromCharCode(n >> 12 | 224), t += String.fromCharCode(n >> 6 & 63 | 128), t += String.fromCharCode(63 & n | 128))
				}
				return t
			}(e)), 8 * e.length))
		}

		function g(e) {
			for (var t = "".concat(e, "="), a = document.cookie.split(";"), n = 0; n < a.length; n++) {
				for (var o = a[n];
					" " == o.charAt(0);) o = o.substring(1, o.length);
				if (0 == o.indexOf(t)) return o.substring(t.length, o.length)
			}
			return null
		}

		function f(e, t) {
			var a = d - 50,
				n = l / 2 - 22 + 55 * (e - 1) - (t - 1) / 2 * 55;
			return e < 2 && (a = d - 110, n = l / 2 + (55 * e - 50)), new(i())(a, n)
		}

		function y(e, t, a) {
			var n = e;
			return n < t && (n = t), n > a && (n = a), n
		}

		function x(e, t) {
			for (var a in keysInput) e == keysInput[a] && F.send(msgpack.encode({
				e: "input",
				input: {
					keys: a,
					value: t
				}
			}))
		}

		function v(e) {
			var t = new Image;
			return t.src = e, t
		}
		CanvasRenderingContext2D.prototype.roundRect = function(e, t, a, n, o) {
			return a < 2 * o && (o = a / 2), n < 2 * o && (o = n / 2), this.beginPath(), this.moveTo(e + o, t), this.arcTo(e + a, t, e + a, t + n, o), this.arcTo(e + a, t + n, e, t + n, o), this.arcTo(e, t + n, e, t, o), this.arcTo(e, t, e + a, t, o), this.closePath(), this
		}, CanvasRenderingContext2D.prototype.drawBubble = function(e, t, a, n, o, r, s) {
			var i, c = e + a,
				d = t + n;
			if (s < t || s > t + n) var l = Math.min(Math.max(e + o, r - 10), c - o - 20),
				h = Math.min(Math.max(e + o + 20, r + 10), c - o);
			else l = Math.min(Math.max(t + o, s - 10), d - o - 20), h = Math.min(Math.max(t + o + 20, s + 10), d - o);
			return s < t && (i = 2), s > t && (i = 3), r < e && s >= t && s <= d && (i = 0), r > e && s >= t && s <= d && (i = 1), r >= e && r <= c && s >= t && s <= d && (i = -1), this.beginPath(), this.moveTo(e + o, t), 2 == i ? (this.lineTo(l, t), this.lineTo(r, s), this.lineTo(h, t), this.lineTo(c - o, t)) : this.lineTo(c - o, t), this.quadraticCurveTo(c, t, c, t + o), 1 == i ? (this.lineTo(c, l), this.lineTo(r, s), this.lineTo(c, h), this.lineTo(c, d - o)) : this.lineTo(c, d - o), this.quadraticCurveTo(c, d, c - o, d), 3 == i ? (this.lineTo(h, d), this.lineTo(r, s), this.lineTo(l, d), this.lineTo(e + o, d)) : this.lineTo(e + o, d), this.quadraticCurveTo(e, d, e, d - o), 0 == i ? (this.lineTo(e, h), this.lineTo(r, s), this.lineTo(e, l), this.lineTo(e, t + o)) : this.lineTo(e, t + o), this.quadraticCurveTo(e, t, e + o, t), this.closePath(), this
		}, window.addEventListener("contextmenu", (function(e) {
			e.preventDefault()
		}), !1);
		var w = {};
		w.background = v("../../textures/images/background11.png"), w.enemies = {}, w.coin = v("../../textures/images/coin.png"), w.enemies.normal = v("../../textures/enemies/normal.svg"), w.enemies.reverse = v("../../textures/enemies/reverse.svg"), w.enemies.spike = v("../../textures/enemies/spike.svg"), w.enemies.bouncer = v("../../textures/enemies/bouncer.svg"), w.enemies.freezer = v("../../textures/enemies/freezer.svg"), w.enemies.rotating = v("../../textures/enemies/rotating.svg"), w.enemies.following = v("../../textures/enemies/following.svg"), w.enemies.bomb = v("../../textures/enemies/bomb.svg"), w.enemies.bomb1 = v("../../textures/enemies/bomb-1.svg"), w.enemies.monster = v("../../textures/enemies/monster.svg"), w.enemies.taker = v("../../textures/enemies/taker.svg"), w.enemies.contractor = v("../../textures/enemies/contractor.svg"), w.enemies.contractor1 = v("../../textures/enemies/contractor-1.svg"), w.enemies.immune = v("../../textures/enemies/immune.svg"), w.enemies.expander = v("../../textures/enemies/expander.svg"), w.enemies.megaBouncer = v("../../textures/enemies/megaBouncer.svg"), w.enemies.wavy = v("../../textures/enemies/wavy.svg"), w.enemies.shooter = v("../../textures/enemies/shooter.svg"), w.enemies.snek = v("../../textures/enemies/snake.svg"), w.enemies.snekBody = v("../../textures/enemies/snakeBody.svg"), w.enemies.stutter = v("../../textures/enemies/stutter.svg"), w.enemies.gravityUp = v("../../textures/enemies/gravityUp.svg"), w.enemies.gravityLeft = v("../../textures/enemies/gravityLeft.svg"), w.enemies.gravityRight = v("../../textures/enemies/gravityRight.svg"), w.enemies.disabler = v("../../textures/enemies/disabler.svg"), w.enemies.harmless = v("../../textures/enemies/harmless.svg"), w.enemies.accelerator = v("../../textures/enemies/accelerator.svg"), w.enemies.decelerator = v("../../textures/enemies/decelerator.svg"), w.enemies.drainer = v("../../textures/enemies/drainer.svg"), w.powers = [], w.powers[-2] = v("../../textures/enemies/default.svg"), w.powers[-1] = v("../../textures/enemies/default.svg"), w.powers[0] = v("../../textures/powers/shrinker.svg"), w.powers[1] = v("../../textures/powers/explosion.svg"), w.powers[2] = v("../../textures/powers/wall.svg"), w.powers[3] = v("../../textures/powers/meteor.svg"), w.powers[4] = v("../../textures/powers/refuel.svg"), w.powers[5] = v("../../textures/powers/feather.svg"), w.powers[6] = v("../../textures/powers/shield.svg"), w.powers[7] = v("../../textures/powers/dash.svg"), w.powers[8] = v("../../textures/powers/lantern.svg"), w.powers[9] = v("../../textures/powers/ghost.svg"), w.powers[10] = v("../../textures/powers/frost.svg"), w.powers[11] = v("../../textures/powers/shell.svg"), w.powers[12] = v("../../textures/powers/shell.svg"), w.powers[13] = v("../../textures/powers/feather.svg"), w.particles = [], w.particles[0] = v("../../textures/particles/heart.png"), w.particles[1] = v("../../textures/particles/sparkles.png"), w.particles[2] = v("../../textures/particles/greyPaw.png"), w.particles[3] = v("../../textures/particles/whitePaw.png"), w.particles[4] = v("../../textures/particles/pinkPaw.png"), w.particles[5] = v("../../textures/particles/blackHeart.png"), w.particles[6] = v("../../textures/particles/apple.png"), w.hats = {}, w.hats.none = {
			offset: [0, 0],
			size: [0, 0],
			texture: v("../../textures/hats/none.png"),
			layer: 1
		}, w.hats.catEars = {
			offset: [-1.09, -2],
			size: [2.2, 2.2],
			texture: v("../../textures/hats/catEars.png"),
			layer: 1
		}, w.hats.catEars1 = {
			offset: [-1.4, -2],
			size: [2.8, 2.8],
			texture: v("../../textures/hats/catEars1.png"),
			layer: 0
		}, w.hats.catEars111 = {
			offset: [-1.4, -2],
			size: [2.8, 2.8],
			texture: v("../../textures/hats/catEars111.png"),
			layer: 0
		}, w.hats.tophat = {
			offset: [-1.3, -2.4],
			size: [2.6, 2.6],
			texture: v("../../textures/hats/topHat.png"),
			layer: 1
		}, w.hats.guest = {
			offset: [0, 0],
			size: [0, 0],
			texture: v("../../textures/hats/none.png"),
			layer: 1
		}, w.hats.santa = {
			offset: [-1.4, -2.4],
			size: [3.4, 3.4],
			texture: v("../../textures/hats/santa.png"),
			layer: 1
		}, w.hats.militaryHat = {
			offset: [-1.55, -2],
			size: [3, 3],
			texture: v("../../textures/hats/militaryHat.png"),
			layer: 1
		}, w.hats.nookyHat = {
			offset: [-1.2, -2.8],
			size: [2.6, 2.6],
			texture: v("../../textures/hats/nookyHat.png"),
			layer: 1
		}, w.hats.ravelHat = {
			offset: [-1.2, -2.8],
			size: [2.6, 2.6],
			texture: v("../../textures/hats/eggplant.png"),
			layer: 1
		}, w.hats.wolf = {
			offset: [-1.5, -2],
			size: [3, 3],
			texture: v("../../textures/hats/wolf.png"),
			layer: 1
		}, w.hats.trumpHat = {
			offset: [-1.53, -2.1],
			size: [3.2, 3.2],
			texture: v("../../textures/hats/trumpHat1.png"),
			layer: 1
		}, w.hats.bunnyEars = {
			offset: [-1.4, -3],
			size: [3, 3],
			texture: v("../../textures/hats/bunnyEars.png"),
			layer: 1
		}, w.hats.crown = {
			offset: [-1.55, -2.65],
			size: [3.2, 3.2],
			texture: v("../../textures/hats/crown.png"),
			layer: 1
		}, w.hats.kite = {
			offset: [-.8, -.8],
			size: [1.6, 1.6],
			texture: v("../../textures/hats/kite.png"),
			layer: 1
		}, w.hats.sakura = {
			offset: [-1.05, -1.4],
			size: [2, 2],
			texture: v("../../textures/hats/sakura.png"),
			layer: 1
		}, w.hats.cowboy = {
			offset: [-1.6, -2.4],
			size: [3.2, 3.2],
			texture: v("../../textures/hats/cowboy.png"),
			layer: 1
		}, w.hats.party = {
			offset: [-1.36, -2.1],
			size: [2.65, 2.65],
			texture: v("../../textures/hats/party.png"),
			layer: 1
		}, w.hats.bimbo = {
			offset: [-1.2, -1.8],
			size: [2.4, 2.4],
			texture: v("../../textures/hats/bimbo.png"),
			layer: 1
		}, w.hats.uwu = {
			offset: [-2.8, -3.5],
			size: [5.6, 5.6],
			texture: v("../../textures/hats/wowo.png"),
			layer: 1
		}, w.hats.flowerHat = {
			offset: [-1.55, -2.4],
			size: [3.2, 3.2],
			texture: v("../../textures/hats/flowerHat.png"),
			layer: 1
		}, w.hats.panties = {
			offset: [-1.2, -1.2],
			size: [2.4, 2.4],
			texture: v("../../textures/hats/panties.png"),
			layer: 1
		}, w.hats.panties2 = {
			offset: [-1.3, -1.3],
			size: [2.6, 2.6],
			texture: v("../../textures/hats/panties2.png"),
			layer: 1
		}, w.hats.bimboPurple = {
			offset: [-1.45, -2],
			size: [2.9, 2.9],
			texture: v("../../textures/hats/bimboPurple.png"),
			layer: 1
		}, w.hats.bimboGreen = {
			offset: [-1.45, -2],
			size: [2.9, 2.9],
			texture: v("../../textures/hats/bimboGreen.png"),
			layer: 1
		}, w.hats.moustache = {
			offset: [-1.3, -1.6],
			size: [2.8, 2.8],
			texture: v("../../textures/hats/moustache.png"),
			layer: 1
		}, w.hats.onigiri = {
			offset: [-1.05, -1.9],
			size: [2.1, 2.1],
			texture: v("../../textures/hats/onigiri.png"),
			layer: 1
		}, w.hats.ramen = {
			offset: [-1.45, -2.5],
			size: [2.9, 2.9],
			texture: v("../../textures/hats/ramen.png"),
			layer: 1
		}, w.hats.salmonSushi = {
			offset: [-1.3618, -2.4],
			size: [2.8, 2.8],
			texture: v("../../textures/hats/salmonSushi.png"),
			layer: 1
		}, w.hats.horns = {
			offset: [-1.8, -2],
			size: [3.5, 3.5],
			texture: v("../../textures/hats/horns.png"),
			layer: 1
		}, w.hats.devil = {
			offset: [-1.8, -2],
			size: [3.5, 3.5],
			texture: v("../../textures/hats/devil.png"),
			layer: 0
		}, w.hats.taria = {
			offset: [-1.34, -2.1],
			size: [2.7, 2.7],
			texture: v("../../textures/hats/taria.png"),
			layer: 1
		};
		const b = w;

		function M(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}

		function I(e, t) {
			for (var a = 0; a < t.length; a++) {
				var n = t[a];
				n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
			}
		}

		function k(e, t, a) {
			return t && I(e.prototype, t), a && I(e, a), e
		}
		var E = function() {
				function e(t, a, n, o, r, s, c, d, l, h, u, p, m, g, f, y, x, v) {
					var w = arguments.length > 18 && void 0 !== arguments[18] ? arguments[18] : void 0;
					M(this, e), this.type = t, this.time = a, this.pos = new(i())(Math.random() * (o - n) + n, Math.random() * (s - r) + r);
					var b = Math.random() * (d - c) + c,
						I = Math.random() * (h - l) + l;
					this.vel = new(i())(Math.cos(b) * I, Math.sin(b) * I), this.friction = u, this.alphaDim = m, this.alpha = p, this.color = [g, f, y], this.size = x, this.sizeChange = v, this.texture = w
				}
				return k(e, [{
					key: "update",
					value: function(e) {
						this.time -= e, this.pos.x += this.vel.x * (e / 16), this.pos.y += this.vel.y * (e / 16), this.vel.x *= Math.pow(this.friction, e / 16), this.vel.y *= Math.pow(this.friction, e / 16), this.alpha -= this.alphaDim * (e / 16), this.size += this.sizeChange * (e / 16)
					}
				}]), e
			}(),
			B = function() {
				function e(t, a, n) {
					M(this, e), this.type = t, this.image = document.createElement("CANVAS"), this.image.width = 41, this.image.height = 41, this.image.getContext("2d").drawImage(b.powers[this.type], 0, 0, 41, 41), this.pos = f(a, n);
					var o = f(a, n);
					this.targetPos = new(i())(o.x + 20, o.y + 20)
				}
				return k(e, [{
					key: "recreate",
					value: function(e, t) {
						var a = f(e, t);
						this.targetPos = new(i())(a.x + 20, a.y + 20)
					}
				}]), e
			}();

		function z(e, t, a, n, o) {
			return r = e - t < 0 ? 0 : e - t > o ? o : e - t, s = a, i = n - a, (r /= o / 2) < 1 ? i / 2 * r * r + s : -i / 2 * (--r * (r - 2) - 1) + s;
			var r, s, i
		}

		function C(e, t) {
			context.beginPath(), context.save(), context.translate(Math.round(-states.camera.x * fov), Math.round(-states.camera.y * fov));
			var a = e[t.toLowerCase()],
				n = e["moving" + t],
				o = e["circular" + t],
				r = e["rotating" + t];
			for (var s in a) context.moveTo(Math.round(states.camera.x * fov + width / 2 + (a[s].pos.x - states.camera.x) * fov), Math.round(states.camera.y * fov + height / 2 + (a[s].pos.y - states.camera.y) * fov)), context.rect(Math.round(states.camera.x * fov + width / 2 + (a[s].pos.x - states.camera.x) * fov), Math.round(states.camera.y * fov + height / 2 + (a[s].pos.y - states.camera.y) * fov), Math.round(a[s].size.x * fov), Math.round(a[s].size.y * fov));
			for (var i in n) context.moveTo(Math.round(states.camera.x * fov + width / 2 + (n[i].pos.x - states.camera.x) * fov), Math.round(states.camera.y * fov + height / 2 + (n[i].pos.y - states.camera.y) * fov)), context.rect(Math.round(states.camera.x * fov + width / 2 + (n[i].pos.x - states.camera.x) * fov), Math.round(states.camera.y * fov + height / 2 + (n[i].pos.y - states.camera.y) * fov), Math.round(n[i].size.x * fov), Math.round(n[i].size.y * fov));
			for (var c in o) context.moveTo(Math.round(states.camera.x * fov + width / 2 + (o[c].pos.x + o[c].size.x / 2 - states.camera.x) * fov), Math.round(states.camera.y * fov + height / 2 + (o[c].pos.y + o[c].size.y / 2 - states.camera.y) * fov)), context.arc(Math.round(states.camera.x * fov + width / 2 + (o[c].pos.x + o[c].size.x / 2 - states.camera.x) * fov), Math.round(states.camera.y * fov + height / 2 + (o[c].pos.y + o[c].size.y / 2 - states.camera.y) * fov), Math.round(o[c].radius * fov), 0, 2 * Math.PI);
			for (var d in r) context.save(), context.translate(Math.round(states.camera.x * fov + width / 2 + (r[d].center.x - states.camera.x) * fov), Math.round(states.camera.y * fov + height / 2 + (r[d].center.y - states.camera.y) * fov)), context.rotate(r[d].angle * Math.PI / 180), context.rect(-Math.round(r[d].size.x / 2 * fov), -Math.round(r[d].size.y / 2 * fov), Math.round(r[d].size.x * fov), Math.round(r[d].size.y * fov)), context.restore();
			context.fill(), context.restore()
		}
		var S = document.getElementById("game"),
			T = S.getContext("2d");
		window.canvas = S, window.context = T;
		var P = S.width,
			A = S.height;
		window.width = P, window.height = A, window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
			window.setTimeout(e, 1e3 / 60)
		}), window.inMenu = !0, window.fov = 6, window.mousePos = new(i())(0, 0), window.states = null, window.debug = !1, window.loggedIn = !1, window.keysInput = [87, 65, 83, 68, 16, 32, -1, -2, -3, 82], window.dir = [1, 0], new(i())(0, 0), window.scale = 1;
		var L = 0,
			R = [];
		window.roomTransition = !0, window.refreshInterval = null;
		var j = [];
		window.previousElementContent = null, window.changingElement = null;
		var H = ["rotatingLava", "movingLava", "movingObstacle", "movingIce", "movingSlime"];
		window.changingKey = null;
		var N = new WebSocket(location.origin.replace(/^http/, "ws"));
		const F = N;
		N.binaryType = "arraybuffer", N.addEventListener("open", (function(e) {
			console.log(g("session")), g("session") && N.send(msgpack.encode({
				e: "session",
				cookie: g("session")
			}))
		})), window.totalSize = 0, window.mapUpdates = 0, window.byteSize = 0, window.pingCount = 0, window.totalPing = 0, window.pingAverage = 0, N.addEventListener("ping", (function(e) {
			window.pingCount++, window.totalPing += e, window.pingAverage = window.totalPing / window.pingCount
		})), N.onmessage = function(e) {
			var t, a, n, o, r, s = msgpack.decode(new Uint8Array(e.data));
			switch (s.e) {
				case "join":
					if (0 == s.m) {
						for (var c in clearInterval(window.refreshInterval), window.refreshInterval = null, window.inMenu = !1, menu.style.display = "none", gamed.style.display = "inline-block", states = ((a = {
								datas: {},
								particles: []
							}).camera = new(i())(0, 0), a.time = 0, a.animations = {}, a.animations.cursor = [a.time], a.powers = [], a.grabbing = !1, a.grabbed = -1, a.combo = !1, a.chat = {}, a.chat.inChat = !1, a.chat.message = "", a.chat.cursor = 0, a.chat.chat = document.getElementById("chat"), a.chat.messages = [], a.leaderboard = {}, a.leaderboard.leaderboard = document.getElementById("leaderboard"), a.leaderboard.scroll = 0, a.settings = {}, a.settings.showChat = !0, a.settings.showLeaderboard = !0, a.update = function(e) {
								for (var t in this.time += e, a.grabbing && (states.powers[a.grabbed].targetPos = mousePos), this.particles) this.particles[t].update(e);
								for (var n in this.particles = this.particles.filter((function(e) {
										return e.alpha > 0 && e.size > 0 && e.time > 0
									})), this.powers) {
									var o = .2 * (this.powers[n].targetPos.x - this.powers[n].pos.x - 20);
									this.powers[n].pos.x += .2 * (this.powers[n].targetPos.x - this.powers[n].pos.x - 20), Math.abs(o) < .01 && (this.powers[n].pos.x = this.powers[n].targetPos.x - 20);
									var r = .2 * (this.powers[n].targetPos.y - this.powers[n].pos.y - 20);
									this.powers[n].pos.y += .2 * (this.powers[n].targetPos.y - this.powers[n].pos.y - 20), Math.abs(r) < .01 && (this.powers[n].pos.y = this.powers[n].targetPos.y - 20)
								}
								for (var s in this.datas.players) {
									if (this.datas.players[s].states.includes("jetpack"))
										for (var i = 0; i < 8; i++) {
											var c = void 0,
												d = void 0,
												l = void 0,
												h = void 0;
											0 == this.datas.players[s].gravDir && (c = this.datas.players[s].pos.x - 2, d = this.datas.players[s].pos.x + 2, l = this.datas.players[s].pos.y + .5 * this.datas.players[s].radius, h = this.datas.players[s].pos.y + .5 * this.datas.players[s].radius), 1 == this.datas.players[s].gravDir && (c = this.datas.players[s].pos.x - .5 * this.datas.players[s].radius, d = this.datas.players[s].pos.x - .5 * this.datas.players[s].radius, l = this.datas.players[s].pos.y - 2, h = this.datas.players[s].pos.y + 2), 2 == this.datas.players[s].gravDir && (c = this.datas.players[s].pos.x - 2, d = this.datas.players[s].pos.x + 2, l = this.datas.players[s].pos.y - .5 * this.datas.players[s].radius, h = this.datas.players[s].pos.y - .5 * this.datas.players[s].radius), 3 == this.datas.players[s].gravDir && (c = this.datas.players[s].pos.x + .5 * this.datas.players[s].radius, d = this.datas.players[s].pos.x + .5 * this.datas.players[s].radius, l = this.datas.players[s].pos.y - 2, h = this.datas.players[s].pos.y + 2);
											var u = 1 / (1 + Math.exp(-(this.datas.players[s].fuel - 5)));
											this.particles.push(new E("circle", 1e4, c, d, l, h, 0, Math.PI, .15, .15, 1, .5, .01, 156 * (1 - u), 86 * u + 20, 133 * u + 23, 1, .01))
										}
									this.datas.players[s].states.includes("Feather") && Math.random() < .05 && this.particles.push(new E("circle", 1e4, this.datas.players[s].pos.x, this.datas.players[s].pos.x, this.datas.players[s].pos.y, this.datas.players[s].pos.y, 0, Math.PI, .05, .06, 1, .1, .005, 134, 30 * Math.random() + 151, 181, 2.5, .5))
								}
								this.camera.x = states.datas.players[states.datas.infos.id].pos.x, this.camera.y = states.datas.players[states.datas.infos.id].pos.y
							}, a.updateStates = function(e) {
								if (this.datas.infos = e.infos, this.datas.players = e.players, ! function(e, t) {
										if (t.length != e.length) return !1;
										for (var a = 0; a < (e.length || 0); a++)
											for (var n = 0; n < e[a].length; n++)
												if (e[a][n] != t[a][n]) return !1;
										return !0
									}(this.datas.playerList || ["a"], e.playerList || ["b"])) {
									a.leaderboard.leaderboard.height = 20 * e.playerList.length + 34;
									var t = "";
									for (var n in e.playerList) {
										0 != n && (t += "<br>");
										var o = "normal";
										e.playerList[n][2] ? o = "dead" : e.playerList[n][3] && (o = "frozen"), t += "<span class='leaderboard leaderboard-".concat(o, "'>").concat(e.playerList[n][0], ": ").concat(e.playerList[n][1], "</span >")
									}
									a.leaderboard.leaderboard.innerHTML = t
								}
								for (var r in this.datas.playerList = e.playerList, this.datas.particles = e.particles, this.datas.entities = e.entities, this.datas.particles) {
									var s = this.datas.particles[r];
									if ("shrinking" == s.type)
										for (var i = 0; i < 13; i++) states.particles.push(new E("circle", 1e6, s.x, s.x, s.y, s.y, Math.PI, 2 * Math.PI, .5, 1, .9, 1, .01, 140, 0, 170, 2, -.1));
									if ("refuel" == s.type)
										for (var c = 0; c < 10; c++) states.particles.push(new E("circle", 1e6, s.x - 2, s.x + 2, s.y - 2, s.y + 2, 0, 0, 0, 0, 0, 1, .03, 255, 255, 0, 1.5, 0));
									if ("explosion" == s.type && states.particles.push(new E("circle", 1e6, s.x, s.x, s.y, s.y, 0, 0, 0, 0, 1, 1, .08, 110, 110, 110, 0, 3.5)), "dash" == s.type)
										for (var d = 0; d < 2; d++) states.particles.push(new E("circle", 1e6, s.x, s.x, s.y, s.y, s.dir + Math.PI - .1, s.dir + Math.PI + .1, .4, .5, 1, 1, .08, 79, 214, 156, 3, .2));
									if ("bombExplosion" == s.type)
										for (var l = 0; l < 40; l++) {
											var h = Math.random() * Math.PI * 2,
												u = Math.random() * s.region,
												p = s.x + Math.cos(h) * u,
												m = s.y + Math.sin(h) * u;
											states.particles.push(new E("circle", 1e6, p, p, m, m, h, h, .1, .1, 1, .5, .01, 200, 0, 0, 2, -.01))
										}
									if ("healing" == s.type)
										for (var g = 0; g < 2; g++) states.particles.push(new E("circle", 1e6, s.x - 1, s.x + 1, s.y - 1, s.y + 1, 0, 0, 0, 0, 1, 1, .08, 119, 205, 92, 1.5, -.1))
								}
							}, a.initMap = function(e) {
								delete this.datas.objects, this.datas.areaSize = e.areaSize, this.datas.objects = {};
								for (var t = 0; t < e.objects.length; t++) e.objects[t].type = H[e.objects[t].type] || e.objects[t].type, e.objects[t].type in this.datas.objects || (this.datas.objects[e.objects[t].type] = {}), this.datas.objects[e.objects[t].type][e.objects[t].id] = e.objects[t];
								"rainbow" == e.backgroundColor ? this.datas.backgroundColor = ["hsl", 0] : this.datas.backgroundColor = e.backgroundColor, this.datas.areaColor = e.areaColor
							}, a.updateMap = function(e) {
								for (var t in e.update)
									if (e.update[t].type = H[e.update[t].type] || e.update[t].type, e.update[t].type in this.datas.objects && e.update[t].id in this.datas.objects[e.update[t].type])
										for (var a in e.update[t]) this.datas.objects[e.update[t].type][e.update[t].id][a] = e.update[t][a];
								for (var n in e.add) e.add[n].type = H[e.add[n].type] || e.add[n].type, e.add[n].type in this.datas.objects || (this.datas.objects[e.add[n].type] = {}), this.datas.objects[e.add[n].type][e.add[n].id] = e.add[n];
								for (var o in e.remove) e.remove[o].type = H[e.remove[o].type] || e.remove[o].type, delete this.datas.objects[e.remove[o].type][e.remove[o].id]
							}, a.changeMap = function() {
								window.roomTransition && (L = 0)
							}, a), states.updateStates(s.i.states), states.initMap(s.i.map), s.i.powers) states.powers.push(new B(s.i.powers[c], c, s.i.powers.length));
						u()
					} else 1 == s.m && (document.getElementById("loginInputs").classList.remove("shake"), setTimeout("document.getElementById('loginInputs').className += 'shake';", 100), console.error("error"));
					break;
				case "leave":
					window.inMenu = !0, menu.style.display = "", gamed.style.display = "none";
					break;
				case "games":
					for (; document.getElementById("games_list").firstChild;) document.getElementById("games_list").removeChild(document.getElementById("games_list").lastChild);
					var d = function(e) {
						if (0 == Array.from(document.getElementsByClassName("gameButton")).filter((function(t) {
								return t.gameId == s.g[e].id
							})).length) {
							var t = document.createElement("div"),
								a = document.createTextNode(s.g[e].name);
							t.appendChild(a);
							var n, o = document.createElement("br");
							t.appendChild(o), n = s.g[e].private ? document.createTextNode("".concat(s.g[e].players, "/").concat(s.g[e].capacity, " players [private]")) : document.createTextNode("".concat(s.g[e].players, "/").concat(s.g[e].capacity, " players")), t.appendChild(n), o = document.createElement("br"), t.appendChild(o);
							var r = document.createElement("span"),
								i = document.createTextNode("".concat(s.g[e].mapName, " by ").concat(s.g[e].creator));
							r.style.fontSize = "14px", r.appendChild(i), t.appendChild(r), t.classList.add("gameButton"), t.gameId = s.g[e].id, t.private = s.g[e].private, t.addEventListener("click", (function() {
								if (this.private) {
									var e = prompt("password:");
									N.send(msgpack.encode({
										e: "join",
										g: this.gameId,
										p: e
									}))
								} else N.send(msgpack.encode({
									e: "join",
									g: this.gameId
								}))
							})), document.getElementById("games_list").appendChild(t)
						}
					};
					for (var l in s.g) d(l);
					break;
				case "maps":
					var h = function(e) {
						if (0 == Array.from(document.getElementsByClassName("mapButton")).filter((function(t) {
								return t.id == s.m[e].id
							})).length) {
							var t = document.createElement("div"),
								a = document.createTextNode('"'.concat(s.m[e].name, '" by ').concat(s.m[e].creator, ",  "));
							t.appendChild(a);
							var n = document.createElement("div"),
								o = document.createTextNode("".concat(s.m[e].plays, " plays "));
							n.style.fontSize = "14px", n.style.right = "5px", n.style.display = "inline", n.appendChild(o), t.appendChild(n);
							var r = document.createElement("button"),
								i = document.createTextNode("load");
							if (r.appendChild(i), r.onclick = function() {
									document.getElementById("mapMenu").style.display = "none", document.getElementById("createMenu2").style.display = "block", window.currentId = this.parentElement.id, document.getElementById("fileLabel2").innerHTML = this.parentElement.name
								}, t.appendChild(r), s.m[e].own) {
								var c = document.createElement("button"),
									d = document.createTextNode("delete");
								c.appendChild(d), c.onclick = function() {
									if (confirm("are you sure?"))
										for (N.send(msgpack.encode({
												e: "delete",
												m: this.parentElement.id
											})); document.getElementById("maps_list").firstChild;) document.getElementById("maps_list").removeChild(document.getElementById("maps_list").lastChild);
									N.send(msgpack.encode({
										e: "maps",
										s: 0,
										o: document.getElementById("dropdown").selectedIndex
									}))
								}, t.appendChild(c)
							}
							t.classList.add("mapButton"), t.id = s.m[e].id, t.name = s.m[e].name, t.own = s.m[e].own, document.getElementById("maps_list").appendChild(t)
						}
					};
					for (var p in s.m) h(p);
					break;
				case "create":
					1 == s.m && (document.getElementById("createInfo").innerHTML = s.t);
					break;
				case "power":
					for (var m in states.powers) states.powers[m].recreate(m, states.powers.length + s.m.length);
					var g = states.powers.length;
					for (var f in s.m) states.powers.push(new B(s.m[f], f + g, s.m.length + g));
					break;
				case "updateStates":
					states.updateStates(s.m);
					break;
				case "initMap":
					states.particles = [], states.initMap(s.m), states.changeMap(), window.totalSize = 0, window.mapUpdates = 0, window.byteSize = 0;
					break;
				case "updateMap":
					states.updateMap(s.m), window.mapUpdates++, window.totalSize += new Uint8Array(e.data).byteLength, window.byteSize = Math.round(window.totalSize / window.mapUpdates), (isNaN(window.byteSize) || null == window.byteSize) && (window.byteSize = 0, window.mapUpdates = 0, window.totalSize = 0);
					break;
				case "particles":
					for (var y in s.m) {
						var x = s.m[y];
						if ("shrinking" == x.type)
							for (var v = 0; v < 13; v++) states.particles.push(new E("circle", 1e6, x.x, x.y, x.x, x.y, Math.PI, 2 * Math.PI, .5, 1, .9, 1, .01, 140, 0, 170, 2, -.1))
					}
					break;
				case "reward":
					states.animations.reward1 = [states.time, 0, s.m];
					break;
				case "hatReward":
					states.animations.hatReward1 = [states.time, 0, s.m];
					break;
				case "coinReward":
					states.animations.coinReward1 = [states.time, 0, s.m];
					break;
				case "message":
					var w = states.chat.chat.scrollHeight - states.chat.chat.clientHeight <= states.chat.chat.scrollTop;
					s.m.time = Date.now(), states.chat.messages.push(s.m);
					var M = function(e) {
						for (var t = decodeURIComponent(escape(window.atob("Y3VudCB3aG9yZSBzaGl0IGZ1Y2sgZmFnZ290IG5pZ2dlciBuaWdnYSBkaWNrIHZhZ2luYSBtaW5nZSBjb2NrIHJhcGUgY3VtIHNleCB0aXRzIHBlbmlzIGNsaXQgcHVzc3kgbWVhdGN1cnRhaW4gaml6eiBwcnVuZSBkb3VjaGUgd2Fua2VyIGplcms="))).split(" "), a = 0; a < t.length; ++a)
							if (e.toLowerCase().indexOf(t[a]) > -1) {
								tmpString = "";
								for (var n = 0; n < t[a].length; ++n) tmpString += "*";
								e = e.replace(new RegExp(t[a], "gi"), tmpString)
							} return e
					}(s.m.m);
					M = M.replaceAll("\n", "<br />");
					var I = "".concat(s.m.s, ": ").concat(M),
						k = "normal"; - 1 == s.m.r ? k = "guest" : 1 == s.m.r ? k = "dev" : 2 == s.m.r ? k = "mod" : -2 == s.m.r && (k = "discord"), "" != states.chat.chat.innerHTML && (states.chat.chat.innerHTML += "<br>"), states.chat.chat.innerHTML += '<span class="chat chat-'.concat(k, '">').concat(I, "</span>"), w && (states.chat.chat.scrollTop = states.chat.chat.scrollHeight - states.chat.chat.clientHeight);
					break;
				case "result":
					0 == s.m ? (document.getElementById("loginInputs").style.display = "none", document.getElementById("logoutInputs").style.display = "block", n = s.cookie, o = "", (r = new Date).setTime(r.getTime() + 6048e5), o = "; expires=".concat(r.toUTCString()), document.cookie = "".concat("session", "=").concat(n || "").concat(o, "; path=/"), document.getElementById("info").innerHTML = s.t, loggedIn = !0) : 1 == s.m && (document.getElementById("info").innerHTML = s.t);
					break;
				case "logout":
					document.getElementById("loginInputs").style.display = "block", document.getElementById("logoutInputs").style.display = "none", loggedIn = !1;
					break;
				case "style":
					for (var z in document.getElementById("colorPicker").value = (t = s.c, "#".concat(((1 << 24) + (t[0] << 16) + (t[1] << 8) + t[2]).toString(16).slice(1))), document.getElementById("hatSelection").innerHTML = "", s.h) {
						var C = document.createElement("div");
						C.classList.add("hatBox");
						var S = document.createElement("img");
						S.src = b.hats[s.h[z]].texture.src, S.classList.add("hatImage"), s.h[z] == s.s && (S.style.backgroundColor = "rgba(48, 147, 48, 0.4)"), S.name = s.h[z], S.onclick = function() {
							N.send(msgpack.encode({
								e: "hatChange",
								c: this.name
							}))
						}, C.appendChild(S);
						var T = document.createElement("div"),
							P = document.createTextNode(s.h[z]);
						T.appendChild(P), C.appendChild(T), document.getElementById("hatSelection").appendChild(C)
					}
					break;
				case "combo":
					states.combo = s.m;
					break;
				default:
					console.log(e), N.close()
			}
		}, N.onclose = function(e) {
			console.log("closed", e)
		};
		var G = 0;
		window.requestAnimationFrame((function e(t) {
			for (var a = t - G, n = performance.now(); R.length > 0 && R[0] <= n - 1e3;) R.shift();
			if (R.push(n), window.fps = R.length, !window.inMenu) {
				L += a;
				var o = [Math.round((mousePos.x - P / 2) / fov + states.datas.players[states.datas.infos.id].pos.x), Math.round((mousePos.y - A / 2) / fov + states.datas.players[states.datas.infos.id].pos.y)];
				o[0] == j[0] && o[1] == j[1] || N.send(msgpack.encode({
					e: "aim",
					m: [Math.round((mousePos.x - P / 2) / fov + states.datas.players[states.datas.infos.id].pos.x), Math.round((mousePos.y - A / 2) / fov + states.datas.players[states.datas.infos.id].pos.y)]
				})), j = o, states.update(a), L >= 150 && function(e) {
					cursor.style.cursor = "default";
					var t = context.createPattern(b.background, "repeat");
					context.save(), context.translate(-e.camera.x * fov, -e.camera.y * fov), context.fillStyle = t, context.fillRect(e.camera.x * fov, e.camera.y * fov, width, height), "hsl" == e.datas.backgroundColor[0] ? context.fillStyle = "hsl(".concat(e.datas.backgroundColor[1], ", 75%, 40%)") : context.fillStyle = "rgba(".concat(e.datas.backgroundColor[0], ", ").concat(e.datas.backgroundColor[1], ", ").concat(e.datas.backgroundColor[2], ", ").concat(e.datas.backgroundColor[3], ")"), context.fillRect(e.camera.x * fov, e.camera.y * fov, width, height), context.restore(), context.fillStyle = "rgba(".concat(e.datas.areaColor[0], ", ").concat(e.datas.areaColor[1], ", ").concat(e.datas.areaColor[2], ", 1)"), context.fillRect(Math.round(width / 2 + -e.camera.x * fov), Math.round(height / 2 + -e.camera.y * fov), Math.round(e.datas.areaSize.x * fov), Math.round(e.datas.areaSize.y * fov)), context.fillStyle = t, C(e.datas.objects, "Obstacle"), "hsl" == e.datas.backgroundColor[0] ? context.fillStyle = "hsl(".concat(e.datas.backgroundColor[1], ", 75%, 40%)") : context.fillStyle = "rgba(".concat(e.datas.backgroundColor[0], ", ").concat(e.datas.backgroundColor[1], ", ").concat(e.datas.backgroundColor[2], ", ").concat(e.datas.backgroundColor[3], ")"), C(e.datas.objects, "Obstacle");
					var a = e.datas.objects.teleporter;
					for (var n in a) {
						var o = 1,
							r = 1;
						1 == a[n].dir && (o = 0), 2 == a[n].dir && (r = 0), 3 == a[n].dir && (o = 2), 0 == a[n].dir && (r = 2);
						var s = context.createLinearGradient(Math.round(width / 2 + (a[n].pos.x + a[n].size.x / 2 * o - e.camera.x) * fov), Math.round(height / 2 + (a[n].pos.y + a[n].size.y / 2 * r - e.camera.y) * fov), Math.round(width / 2 + (a[n].pos.x + a[n].size.x / 2 * (2 - o) - e.camera.x) * fov), Math.round(height / 2 + (a[n].pos.y + a[n].size.y / 2 * (2 - r) - e.camera.y) * fov));
						"hsl" == e.datas.backgroundColor[0] ? s.addColorStop(0, "hsl(".concat(e.datas.backgroundColor[1], ", 75%, 40%)")) : s.addColorStop(0, "rgba(".concat(240 + (e.datas.backgroundColor[0] - 240) * e.datas.backgroundColor[3], ", ").concat(240 + (e.datas.backgroundColor[1] - 240) * e.datas.backgroundColor[3], ", ").concat(240 + (e.datas.backgroundColor[2] - 240) * e.datas.backgroundColor[3], ", 1)")), s.addColorStop(1, "rgba(".concat(e.datas.areaColor[0], ", ").concat(e.datas.areaColor[1], ", ").concat(e.datas.areaColor[2], ", 1)")), context.fillStyle = s, context.fillRect(Math.round(width / 2 + (a[n].pos.x - e.camera.x) * fov), Math.round(height / 2 + (a[n].pos.y - e.camera.y) * fov), Math.round(a[n].size.x * fov), Math.round(a[n].size.y * fov))
					}
					context.fillStyle = "#b74038", C(e.datas.objects, "Lava"), context.fillStyle = "#7cabd2", C(e.datas.objects, "Ice"), context.fillStyle = "rgb(0,202,0)", C(e.datas.objects, "Slime");
					var i = e.datas.objects.button;
					for (var c in context.beginPath(), context.fillStyle = "#494949", i) 0 == i[c].dir && (context.moveTo(Math.round(width / 2 + (i[c].pos.x - e.camera.x + 2) * fov), Math.round(height / 2 + (i[c].pos.y - e.camera.y) * fov)), context.lineTo(Math.round(width / 2 + (i[c].pos.x - e.camera.x - 2) * fov) + Math.round(i[c].size.x * fov), Math.round(height / 2 + (i[c].pos.y - e.camera.y) * fov)), context.lineTo(Math.round(width / 2 + (i[c].pos.x - e.camera.x) * fov) + Math.round(i[c].size.x * fov), Math.round(height / 2 + (i[c].pos.y - e.camera.y) * fov) + Math.round(i[c].size.y * fov)), context.lineTo(Math.round(width / 2 + (i[c].pos.x - e.camera.x) * fov), Math.round(height / 2 + (i[c].pos.y - e.camera.y) * fov) + Math.round(i[c].size.y * fov)), context.lineTo(Math.round(width / 2 + (i[c].pos.x - e.camera.x + 2) * fov), Math.round(height / 2 + (i[c].pos.y - e.camera.y) * fov))), 1 == i[c].dir && (context.moveTo(Math.round(width / 2 + (i[c].pos.x - e.camera.x) * fov), Math.round(height / 2 + (i[c].pos.y - e.camera.y) * fov)), context.lineTo(Math.round(width / 2 + (i[c].pos.x - e.camera.x) * fov) + Math.round(i[c].size.x * fov), Math.round(height / 2 + (i[c].pos.y - e.camera.y + 2) * fov)), context.lineTo(Math.round(width / 2 + (i[c].pos.x - e.camera.x) * fov) + Math.round(i[c].size.x * fov), Math.round(height / 2 + (i[c].pos.y - e.camera.y - 2) * fov) + Math.round(i[c].size.y * fov)), context.lineTo(Math.round(width / 2 + (i[c].pos.x - e.camera.x) * fov), Math.round(height / 2 + (i[c].pos.y - e.camera.y) * fov) + Math.round(i[c].size.y * fov)), context.lineTo(Math.round(width / 2 + (i[c].pos.x - e.camera.x) * fov), Math.round(height / 2 + (i[c].pos.y - e.camera.y) * fov))), 2 == i[c].dir && (context.moveTo(Math.round(width / 2 + (i[c].pos.x - e.camera.x) * fov), Math.round(height / 2 + (i[c].pos.y - e.camera.y) * fov)), context.lineTo(Math.round(width / 2 + (i[c].pos.x - e.camera.x) * fov) + Math.round(i[c].size.x * fov), Math.round(height / 2 + (i[c].pos.y - e.camera.y) * fov)), context.lineTo(Math.round(width / 2 + (i[c].pos.x - e.camera.x - 2) * fov) + Math.round(i[c].size.x * fov), Math.round(height / 2 + (i[c].pos.y - e.camera.y) * fov) + Math.round(i[c].size.y * fov)), context.lineTo(Math.round(width / 2 + (i[c].pos.x - e.camera.x + 2) * fov), Math.round(height / 2 + (i[c].pos.y - e.camera.y) * fov) + Math.round(i[c].size.y * fov)), context.lineTo(Math.round(width / 2 + (i[c].pos.x - e.camera.x) * fov), Math.round(height / 2 + (i[c].pos.y - e.camera.y) * fov))), 3 == i[c].dir && (context.moveTo(Math.round(width / 2 + (i[c].pos.x - e.camera.x) * fov), Math.round(height / 2 + (i[c].pos.y - e.camera.y + 2) * fov)), context.lineTo(Math.round(width / 2 + (i[c].pos.x - e.camera.x) * fov) + Math.round(i[c].size.x * fov), Math.round(height / 2 + (i[c].pos.y - e.camera.y) * fov)), context.lineTo(Math.round(width / 2 + (i[c].pos.x - e.camera.x) * fov) + Math.round(i[c].size.x * fov), Math.round(height / 2 + (i[c].pos.y - e.camera.y) * fov) + Math.round(i[c].size.y * fov)), context.lineTo(Math.round(width / 2 + (i[c].pos.x - e.camera.x) * fov), Math.round(height / 2 + (i[c].pos.y - e.camera.y - 2) * fov) + Math.round(i[c].size.y * fov)), context.lineTo(Math.round(width / 2 + (i[c].pos.x - e.camera.x) * fov), Math.round(height / 2 + (i[c].pos.y - e.camera.y + 2) * fov)));
					context.fill();
					var d = e.datas.objects.switch;
					for (var l in d) {
						context.beginPath(), context.fillStyle = "#494949";
						var h = 0,
							u = 1;
						d[l].switch && (h = 1, u = 0, context.fillStyle = "#747474"), 0 == d[l].dir && (context.moveTo(Math.round(width / 2 + (d[l].pos.x - e.camera.x) * fov), Math.round(height / 2 + (d[l].pos.y - e.camera.y - h) * fov)), context.lineTo(Math.round(width / 2 + (d[l].pos.x - e.camera.x) * fov) + Math.round(d[l].size.x * fov), Math.round(height / 2 + (d[l].pos.y - e.camera.y - u) * fov)), context.lineTo(Math.round(width / 2 + (d[l].pos.x - e.camera.x) * fov) + Math.round(d[l].size.x * fov), Math.round(height / 2 + (d[l].pos.y - e.camera.y) * fov) + Math.round(d[l].size.y * fov)), context.lineTo(Math.round(width / 2 + (d[l].pos.x - e.camera.x) * fov), Math.round(height / 2 + (d[l].pos.y - e.camera.y) * fov) + Math.round(d[l].size.y * fov))), 1 == d[l].dir && (context.moveTo(Math.round(width / 2 + (d[l].pos.x - e.camera.x) * fov), Math.round(height / 2 + (d[l].pos.y - e.camera.y) * fov)), context.lineTo(Math.round(width / 2 + (d[l].pos.x - e.camera.x + h) * fov) + Math.round(d[l].size.x * fov), Math.round(height / 2 + (d[l].pos.y - e.camera.y) * fov)), context.lineTo(Math.round(width / 2 + (d[l].pos.x - e.camera.x + u) * fov) + Math.round(d[l].size.x * fov), Math.round(height / 2 + (d[l].pos.y - e.camera.y) * fov) + Math.round(d[l].size.y * fov)), context.lineTo(Math.round(width / 2 + (d[l].pos.x - e.camera.x) * fov), Math.round(height / 2 + (d[l].pos.y - e.camera.y) * fov) + Math.round(d[l].size.y * fov))), 2 == d[l].dir && (context.moveTo(Math.round(width / 2 + (d[l].pos.x - e.camera.x) * fov), Math.round(height / 2 + (d[l].pos.y - e.camera.y) * fov)), context.lineTo(Math.round(width / 2 + (d[l].pos.x - e.camera.x) * fov) + Math.round(d[l].size.x * fov), Math.round(height / 2 + (d[l].pos.y - e.camera.y) * fov)), context.lineTo(Math.round(width / 2 + (d[l].pos.x - e.camera.x) * fov) + Math.round(d[l].size.x * fov), Math.round(height / 2 + (d[l].pos.y - e.camera.y + h) * fov) + Math.round(d[l].size.y * fov)), context.lineTo(Math.round(width / 2 + (d[l].pos.x - e.camera.x) * fov), Math.round(height / 2 + (d[l].pos.y - e.camera.y + u) * fov) + Math.round(d[l].size.y * fov))), 3 == d[l].dir && (context.moveTo(Math.round(width / 2 + (d[l].pos.x - e.camera.x - h) * fov), Math.round(height / 2 + (d[l].pos.y - e.camera.y) * fov)), context.lineTo(Math.round(width / 2 + (d[l].pos.x - e.camera.x) * fov) + Math.round(d[l].size.x * fov), Math.round(height / 2 + (d[l].pos.y - e.camera.y) * fov)), context.lineTo(Math.round(width / 2 + (d[l].pos.x - e.camera.x) * fov) + Math.round(d[l].size.x * fov), Math.round(height / 2 + (d[l].pos.y - e.camera.y) * fov) + Math.round(d[l].size.y * fov)), context.lineTo(Math.round(width / 2 + (d[l].pos.x - e.camera.x - u) * fov), Math.round(height / 2 + (d[l].pos.y - e.camera.y) * fov) + Math.round(d[l].size.y * fov))), context.fill(), context.closePath()
					}
					var p = e.datas.objects.door;
					for (var m in p) p[m].opened ? (context.strokeStyle = "#9d9d9d", context.lineWidth = 1 * fov, context.strokeRect(Math.round(width / 2 + (p[m].pos.x - e.camera.x + .5) * fov), Math.round(height / 2 + (p[m].pos.y - e.camera.y + .5) * fov), Math.round((p[m].size.x - 1) * fov), Math.round((p[m].size.y - 1) * fov))) : (context.fillStyle = "#525252", context.fillRect(Math.round(width / 2 + (p[m].pos.x - e.camera.x) * fov), Math.round(height / 2 + (p[m].pos.y - e.camera.y) * fov), Math.round(p[m].size.x * fov), Math.round(p[m].size.y * fov)), context.fillStyle = "#8c8c8c", context.fillRect(Math.round(width / 2 + (p[m].pos.x - e.camera.x + 1) * fov), Math.round(height / 2 + (p[m].pos.y - e.camera.y + 1) * fov), Math.round((p[m].size.x - 2) * fov), Math.round((p[m].size.y - 2) * fov)));
					for (var g in context.save(), context.lineWidth = fov, context.setLineDash([25 * fov / 6, 40 * fov / 6]), context.lineDashOffset = e.time * fov / 6 / 20, context.lineCap = "round", p)
						for (var x in p[g].linkIds) {
							var v = p[g].linkIds[x],
								w = !1;
							for (var M in "-" == v.toString()[0] && (v = v.toString().substring(1), w = !0), i) i[M].linkId == v && (i[M].pressed ^ w ? context.strokeStyle = "rgba(147, 142, 23, 0.5)" : context.strokeStyle = "rgba(96, 98, 80, 0.5)", context.beginPath(), context.moveTo(Math.round(width / 2 + (p[g].pos.x - e.camera.x) * fov) + Math.round(p[g].size.x * fov) / 2, Math.round(height / 2 + (p[g].pos.y - e.camera.y) * fov) + Math.round(p[g].size.y * fov) / 2), context.lineTo(Math.round(width / 2 + (i[M].pos.x - e.camera.x) * fov) + Math.round(i[M].size.x * fov) / 2, Math.round(height / 2 + (i[M].pos.y - e.camera.y) * fov) + Math.round(i[M].size.y * fov) / 2), context.stroke());
							for (var I in d) d[I].linkId == v && (d[I].switch ^ w ? context.strokeStyle = "rgba(147, 142, 23, 0.5)" : context.strokeStyle = "rgba(96, 98, 80, 0.5)", context.beginPath(), context.moveTo(Math.round(width / 2 + (p[g].pos.x - e.camera.x) * fov) + Math.round(p[g].size.x * fov) / 2, Math.round(height / 2 + (p[g].pos.y - e.camera.y) * fov) + Math.round(p[g].size.y * fov) / 2), context.lineTo(Math.round(width / 2 + (d[I].pos.x - e.camera.x) * fov) + Math.round(d[I].size.x * fov) / 2, Math.round(height / 2 + (d[I].pos.y - e.camera.y) * fov) + Math.round(d[I].size.y * fov) / 2), context.stroke())
						}
					context.restore();
					var k = e.datas.objects.block;
					for (var E in k) 0 == k[E].layer && (context.fillStyle = "rgb(".concat(k[E].color[0], ",").concat(k[E].color[1], ",").concat(k[E].color[2], ",").concat(k[E].opacity, ")"), context.fillRect(Math.round(width / 2 + (k[E].pos.x - e.camera.x) * fov), Math.round(height / 2 + (k[E].pos.y - e.camera.y) * fov), Math.round(k[E].size.x * fov), Math.round(k[E].size.y * fov)));
					var B = e.particles;
					for (var S in B) "circle" == B[S].type ? (context.beginPath(), context.fillStyle = "rgba(".concat(B[S].color[0], ",").concat(B[S].color[1], ",").concat(B[S].color[2], ",").concat(B[S].alpha, ")"), context.arc(Math.round(width / 2 + (B[S].pos.x - e.camera.x) * fov), Math.round(height / 2 + (B[S].pos.y - e.camera.y) * fov), Math.round(B[S].size * fov), 0, 2 * Math.PI, !0), context.fill(), context.closePath()) : "rectangle" == B[S].type ? (context.fillStyle = "rgba(".concat(B[S].color[0], ",").concat(B[S].color[1], ",").concat(B[S].color[2], ",").concat(B[S].alpha, ")"), context.fillRect(Math.round(width / 2 + (B[S].pos.x - e.camera.x - B[S].size) * fov), Math.round(height / 2 + (B[S].pos.y - e.camera.y - B[S].size) * fov), Math.round(2 * B[S].size * fov), Math.round(2 * B[S].size * fov))) : "image" == B[S].type && (context.globalAlpha = B[S].alpha, context.drawImage(B[S].texture, Math.round(width / 2 + (B[S].pos.x - e.camera.x - B[S].size) * fov), Math.round(height / 2 + (B[S].pos.y - e.camera.y - B[S].size) * fov), Math.round(2 * B[S].size * fov), Math.round(2 * B[S].size * fov)), context.globalAlpha = 1);
					for (var T = e.datas.entities, P = 0; P < T.length; P++) {
						if ("normal" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.normal, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "reverse" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.reverse, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "spike" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.spike, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "bouncer" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.bouncer, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "freezer" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.freezer, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "rotating" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.save(), context.translate(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov + T[P].radius * fov * 2, height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov + T[P].radius * fov * 2), context.rotate(T[P].angle + Math.PI / 2), context.drawImage(b.enemies.rotating, -T[P].radius * fov * 2, -T[P].radius * fov * 2, T[P].radius * fov * 4, T[P].radius * fov * 4), context.restore()), "following" == T[P].type && (context.beginPath(), context.fillStyle = "rgba(0, 0, 0, ".concat(.02 * (null == T[P].opacity ? 1 : T[P].opacity), ")"), context.arc(Math.round(width / 2 + (T[P].pos.x - e.camera.x) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y) * fov), Math.round((T[P].radius + T[P].region) * fov), 0, 2 * Math.PI, !0), context.fill(), context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.following, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "monster" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.monster, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "taker" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.taker, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "disabler" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.disabler, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "decelerator" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.decelerator, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "accelerator" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.accelerator, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "megaAccelerator" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.megaAccelerator, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "harmless" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.harmless, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "contractor" == T[P].type && (context.beginPath(), T[P].triggered ? context.fillStyle = "rgba(50, 0, 200, ".concat(.1 * (null == T[P].opacity ? 1 : T[P].opacity), ")") : context.fillStyle = "rgba(0, 0, 0, ".concat(.02 * (null == T[P].opacity ? 1 : T[P].opacity), ")"), context.arc(Math.round(width / 2 + (T[P].pos.x - e.camera.x) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y) * fov), Math.round((T[P].radius + T[P].region) * fov), 0, 2 * Math.PI, !0), context.fill(), T[P].triggered ? (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.contractor1, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))) : (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.contractor, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4)))), "drainer" == T[P].type && (context.beginPath(), T[P].draining ? context.fillStyle = "rgba(217, 159, 0, ".concat(.1 * (null == T[P].opacity ? 1 : T[P].opacity), ")") : context.fillStyle = "rgba(0, 0, 0, ".concat(.02 * (null == T[P].opacity ? 1 : T[P].opacity), ")"), context.arc(Math.round(width / 2 + (T[P].pos.x - e.camera.x) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y) * fov), Math.round((T[P].radius + T[P].region) * fov), 0, 2 * Math.PI, !0), context.fill(), T[P].draining, context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.drainer, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "immune" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.immune, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "expander" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.expander, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "bomb" == T[P].type && (context.beginPath(), T[P].exploding ? context.fillStyle = "rgba(255, 0, 0, ".concat(.1 * (null == T[P].opacity ? 1 : T[P].opacity), ")") : context.fillStyle = "rgba(0, 0, 0, ".concat(.02 * (null == T[P].opacity ? 1 : T[P].opacity), ")"), context.arc(Math.round(width / 2 + (T[P].pos.x - e.camera.x) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y) * fov), Math.round((T[P].radius + T[P].region) * fov), 0, 2 * Math.PI, !0), context.fill(), T[P].phase ? (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.bomb1, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))) : (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.bomb, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4)))), "megaBouncer" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.megaBouncer, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "wavy" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.wavy, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "shooter" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.shooter, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "dropper" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.dropper, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "snek" == T[P].type) {
							for (var A in context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, T[P].states.reverse()) context.drawImage(b.enemies.snekBody, Math.round(width / 2 + (T[P].states[A].x - e.camera.x - 2 * T[P].states[A].radius) * fov), Math.round(height / 2 + (T[P].states[A].y - e.camera.y - 2 * T[P].states[A].radius) * fov), Math.round(T[P].states[A].radius * fov * 4), Math.round(T[P].states[A].radius * fov * 4));
							context.save(), context.translate(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov + T[P].radius * fov * 2, height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov + T[P].radius * fov * 2), context.rotate(T[P].dir), context.drawImage(b.enemies.snek, -T[P].radius * fov * 2, -T[P].radius * fov * 2, T[P].radius * fov * 4, T[P].radius * fov * 4), context.restore()
						}
						"stutter" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.stutter, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "gravityUp" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.gravityUp, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "gravityLeft" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.gravityLeft, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "gravityRight" == T[P].type && (context.globalAlpha = null == T[P].opacity ? 1 : T[P].opacity, context.drawImage(b.enemies.gravityRight, Math.round(width / 2 + (T[P].pos.x - e.camera.x - 2 * T[P].radius) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y - 2 * T[P].radius) * fov), Math.round(T[P].radius * fov * 4), Math.round(T[P].radius * fov * 4))), "turretBullet" == T[P].type && (context.beginPath(), context.fillStyle = "#e23e2b", context.arc(Math.round(width / 2 + (T[P].pos.x - e.camera.x) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y) * fov), Math.round(T[P].radius * fov), 0, 2 * Math.PI, !0), context.fill(), context.closePath()), "meteorBullet" == T[P].type && (context.beginPath(), context.fillStyle = "#d29100", context.arc(Math.round(width / 2 + (T[P].pos.x - e.camera.x) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y) * fov), Math.round(T[P].radius * fov), 0, 2 * Math.PI, !0), context.fill(), context.closePath()), "enemyBullet" == T[P].type && (context.beginPath(), context.fillStyle = "#e23e2b", context.arc(Math.round(width / 2 + (T[P].pos.x - e.camera.x) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y) * fov), Math.round(T[P].radius * fov), 0, 2 * Math.PI, !0), context.fill(), context.closePath()), "path" == T[P].type && (context.beginPath(), context.fillStyle = "rgba(62, 115, 218, 0.08)", context.arc(Math.round(width / 2 + (T[P].pos.x - e.camera.x) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y) * fov), Math.round(T[P].radius * fov), 0, 2 * Math.PI, !0), context.fill(), context.closePath()), "shield" == T[P].type && (context.save(), context.translate(Math.round(width / 2 + (T[P].pos.x - e.camera.x) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y) * fov)), context.rotate(T[P].dir), context.lineWidth = T[P].size.y * fov * 2, context.lineCap = "round", context.beginPath(), context.strokeStyle = "rgb(57, 57, 57)", context.moveTo(-T[P].size.x * fov, 0), context.lineTo(T[P].size.x * fov, 0), context.stroke(), context.restore()), "healingGhost" == T[P].type && (context.beginPath(), context.fillStyle = "rgb(119, 205, 92)", context.arc(Math.round(width / 2 + (T[P].pos.x - e.camera.x) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y) * fov), Math.round(T[P].radius * fov), 0, 2 * Math.PI, !0), context.fill(), context.closePath()), "playerBomb" == T[P].type && (context.beginPath(), context.fillStyle = "red", context.arc(Math.round(width / 2 + (T[P].pos.x - e.camera.x) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y) * fov), Math.round(T[P].radius * fov), 0, 2 * Math.PI), context.fill(), context.beginPath(), context.fillStyle = "rgba(224, 224, 224, .5)", context.arc(Math.round(width / 2 + (T[P].pos.x - e.camera.x) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y) * fov), Math.round(T[P].blastRadius * fov), 0, 2 * Math.PI), context.fill()), "tail" == T[P].type && (context.beginPath(), context.fillStyle = "rgba(84, 69, 38, 0.61)", context.arc(Math.round(width / 2 + (T[P].pos.x - e.camera.x) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y) * fov), Math.round(T[P].radius * fov), 0, 2 * Math.PI, !0), context.fill(), context.closePath()), "frostEntity" == T[P].type && (context.beginPath(), context.globalAlpha = T[P].opacity, context.fillStyle = "rgba(0, 198, 210, 0.3)", context.arc(Math.round(width / 2 + (T[P].pos.x - e.camera.x) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y) * fov), Math.round(T[P].radius * fov), 0, 2 * Math.PI, !0), context.fill(), context.closePath()), "restZone" == T[P].type && (context.beginPath(), context.fillStyle = "rgba(160, 118, 172, 0.47)", context.arc(Math.round(width / 2 + (T[P].pos.x - e.camera.x) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y) * fov), Math.round(T[P].radius * fov), 0, 2 * Math.PI, !0), context.fill(), context.closePath()), "blueFrisbeeEntity" == T[P].type && (context.beginPath(), context.fillStyle = "blue", context.arc(Math.round(width / 2 + (T[P].pos.x - e.camera.x) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y) * fov), Math.round(T[P].radius * fov), 0, 2 * Math.PI), context.fill()), "redFrisbeeEntity" == T[P].type && (context.beginPath(), context.fillStyle = "red", context.arc(Math.round(width / 2 + (T[P].pos.x - e.camera.x) * fov), Math.round(height / 2 + (T[P].pos.y - e.camera.y) * fov), Math.round(T[P].radius * fov), 0, 2 * Math.PI), context.fill()), context.globalAlpha = 1
					}
					var L = e.datas.objects.turret;
					for (var R in L) context.translate(Math.round(width / 2 + (L[R].pos.x + L[R].size.x / 2 - e.camera.x) * fov), Math.round(height / 2 + (L[R].pos.y + L[R].size.y / 2 - e.camera.y) * fov)), context.rotate(L[R].dir), context.fillStyle = "#525252", context.fillRect(2 * -fov, 2 * -fov, 3.5 * fov * 2, 2 * fov * 2), context.resetTransform(), context.beginPath(), context.fillStyle = "#626262", context.arc(Math.round(width / 2 + (L[R].pos.x - e.camera.x) * fov) + Math.round(L[R].size.x * fov) / 2, Math.round(height / 2 + (L[R].pos.y - e.camera.y) * fov) + Math.round(L[R].size.x * fov) / 2, +Math.round(L[R].size.x * fov) / 2, 0, 2 * Math.PI, !0), context.fill(), context.closePath();
					for (var j in e.datas.players) 0 == b.hats[e.datas.players[j].hat].layer && (context.save(), context.translate(Math.round(width / 2 + (e.datas.players[j].pos.x - e.camera.x) * fov), Math.round(height / 2 + (e.datas.players[j].pos.y - e.camera.y) * fov)), context.rotate(e.datas.players[j].gravDir * Math.PI / 2), context.drawImage(b.hats[e.datas.players[j].hat].texture, Math.round(e.datas.players[j].radius * b.hats[e.datas.players[j].hat].offset[0] * fov), Math.round(e.datas.players[j].radius * b.hats[e.datas.players[j].hat].offset[1] * fov), Math.round(e.datas.players[j].radius * fov * b.hats[e.datas.players[j].hat].size[0]), Math.round(e.datas.players[j].radius * fov * b.hats[e.datas.players[j].hat].size[1])), context.restore()), context.beginPath(), context.fillStyle = "rgb(".concat(e.datas.players[j].color[0], ", ").concat(e.datas.players[j].color[1], ", ").concat(e.datas.players[j].color[2], ")"), e.datas.players[j].states.includes("Freeze") && (context.fillStyle = "#7cabd2"), e.datas.players[j].states.includes("Died") && (context.fillStyle = "red"), context.arc(Math.round(width / 2 + (e.datas.players[j].pos.x - e.camera.x) * fov), Math.round(height / 2 + (e.datas.players[j].pos.y - e.camera.y) * fov), e.datas.players[j].radius * fov, 0, 2 * Math.PI, !0), context.fill(), context.lineWidth = 3, context.strokeStyle = "rgb(".concat(e.datas.players[j].color[0] / 2, ", ").concat(e.datas.players[j].color[1] / 2, ", ").concat(e.datas.players[j].color[2] / 2, ")"), context.arc(Math.round(width / 2 + (e.datas.players[j].pos.x - e.camera.x) * fov), Math.round(height / 2 + (e.datas.players[j].pos.y - e.camera.y) * fov), e.datas.players[j].radius * fov, 0, 2 * Math.PI, !0), context.stroke(), context.closePath(), 1 == b.hats[e.datas.players[j].hat].layer && (context.save(), context.translate(Math.round(width / 2 + (e.datas.players[j].pos.x - e.camera.x) * fov), Math.round(height / 2 + (e.datas.players[j].pos.y - e.camera.y) * fov)), context.rotate(e.datas.players[j].gravDir * Math.PI / 2), context.drawImage(b.hats[e.datas.players[j].hat].texture, Math.round(e.datas.players[j].radius * b.hats[e.datas.players[j].hat].offset[0] * fov), Math.round(e.datas.players[j].radius * b.hats[e.datas.players[j].hat].offset[1] * fov), Math.round(e.datas.players[j].radius * fov * b.hats[e.datas.players[j].hat].size[0]), Math.round(e.datas.players[j].radius * fov * b.hats[e.datas.players[j].hat].size[1])), context.restore());
					for (var H in context.font = "".concat(2.5 * fov, "px Tahoma, Verdana, Segoe, sans-serif"), context.textAlign = "center", context.textBaseline = "middle", e.datas.players) {
						context.fillStyle = "black", e.datas.players[H].states.includes("Freeze") && (context.fillStyle = "#41d1d9"), e.datas.players[H].states.includes("Died") && (context.fillStyle = "red"), context.save(), context.translate(y(Math.round(width / 2 + (e.datas.players[H].pos.x - e.camera.x) * fov), context.measureText(e.datas.players[H].name).width / 2 + 5, width - context.measureText(e.datas.players[H].name).width / 2 - 5), y(Math.round(height / 2 + (e.datas.players[H].pos.y - e.camera.y) * fov), 15, height - 15)), context.rotate(e.datas.players[H].gravDir * Math.PI / 2);
						var N = -e.datas.players[H].radius * fov * 1.5;
						e.datas.players[H].radius * b.hats[e.datas.players[H].hat].offset[1] * fov < N && (N = e.datas.players[H].radius * b.hats[e.datas.players[H].hat].offset[1] * fov), context.fillText(e.datas.players[H].name, 0, N), context.restore()
					}
					for (var F in k = e.datas.objects.block) 1 == k[F].layer && (context.fillStyle = "rgb(".concat(k[F].color[0], ",").concat(k[F].color[1], ",").concat(k[F].color[2], ",").concat(k[F].opacity, ")"), context.fillRect(Math.round(width / 2 + (k[F].pos.x - e.camera.x) * fov), Math.round(height / 2 + (k[F].pos.y - e.camera.y) * fov), Math.round(k[F].size.x * fov), Math.round(k[F].size.y * fov)));
					var G = e.datas.objects.reward;
					for (var D in G) context.drawImage(b.powers[G[D].reward], Math.round(width / 2 + (G[D].pos.x - e.camera.x) * fov), Math.round(height / 2 + (G[D].pos.y - e.camera.y + 2 * Math.sin(e.time / 500)) * fov), Math.round(fov * G[D].size.x), Math.round(fov * G[D].size.y));
					var Z = e.datas.objects.hatReward;
					for (var _ in Z) context.drawImage(b.hats[Z[_].reward].texture, Math.round(width / 2 + (Z[_].pos.x - e.camera.x) * fov), Math.round(height / 2 + (Z[_].pos.y - e.camera.y + 2 * Math.sin(e.time / 500)) * fov), Math.round(fov * Z[_].size.x), Math.round(fov * Z[_].size.y));
					var O = e.datas.objects.coinReward;
					for (var K in O) context.drawImage(b.coin, Math.round(width / 2 + (O[K].pos.x - e.camera.x) * fov), Math.round(height / 2 + (O[K].pos.y - e.camera.y + 2 * Math.sin(e.time / 500)) * fov), Math.round(fov * O[K].size.x), Math.round(fov * O[K].size.y));
					var U = e.datas.objects.box;
					for (var W in U) context.fillStyle = "rgba(24, 24, 24, 0.6)", context.fillRect(Math.round(width / 2 + (U[W].pos.x - e.camera.x) * fov), Math.round(height / 2 + (U[W].pos.y - e.camera.y) * fov), Math.round(U[W].size.x * fov), Math.round(U[W].size.y * fov));
					var q = e.datas.objects.gravityZone;
					for (var V in context.save(), context.setLineDash([5, 20]), context.lineCap = "round", context.lineWidth = 3, q) {
						var Y = 0,
							X = 0,
							J = 0;
						1 == q[V].dir && (Y = 255), 2 == q[V].dir && (J = 255), 3 == q[V].dir && (X = 255), context.fillStyle = "rgba(".concat(Y, ",").concat(X, ",").concat(J, ",0.06)"), context.strokeStyle = "rgb(".concat(Y, ",").concat(X, ",").concat(J, ")"), context.fillRect(Math.round(width / 2 + (q[V].pos.x - e.camera.x) * fov), Math.round(height / 2 + (q[V].pos.y - e.camera.y) * fov), Math.round(q[V].size.x * fov), Math.round(q[V].size.y * fov)), context.strokeRect(width / 2 + (q[V].pos.x - e.camera.x) * fov, height / 2 + (q[V].pos.y - e.camera.y) * fov, q[V].size.x * fov, q[V].size.y * fov)
					}
					context.restore();
					var Q = e.datas.objects.fuelZone;
					for (var $ in context.beginPath(), context.fillStyle = "rgba(196, 196, 196, 0.5)", Q) context.moveTo(Math.round(width / 2 + (Q[$].pos.x - e.camera.x) * fov), Math.round(height / 2 + (Q[$].pos.y - e.camera.y) * fov)), context.rect(Math.round(width / 2 + (Q[$].pos.x - e.camera.x) * fov), Math.round(height / 2 + (Q[$].pos.y - e.camera.y) * fov), Math.round(Q[$].size.x * fov), Math.round(Q[$].size.y * fov));
					context.fill();
					var ee = e.datas.objects.text;
					for (var te in ee) context.lineWidth = 2 * fov / 6, context.textAlign = "center", context.textBaseline = "middle", context.font = "".concat(5 * fov, "px Russo One"), context.strokeStyle = "#000000", context.strokeText(ee[te].text, Math.round(width / 2 + (ee[te].pos.x - e.camera.x) * fov), Math.round(height / 2 + (ee[te].pos.y - e.camera.y) * fov)), context.fillStyle = "white", context.fillText(ee[te].text, Math.round(width / 2 + (ee[te].pos.x - e.camera.x) * fov), Math.round(height / 2 + (ee[te].pos.y - e.camera.y) * fov));
					for (var ae in k) 1 == k[ae].layer && (context.fillStyle = "rgb(".concat(k[ae].color[0], ",").concat(k[ae].color[1], ",").concat(k[ae].color[2], ",").concat(k[ae].opacity, ")"), context.fillRect(Math.round(width / 2 + (k[ae].pos.x - e.camera.x) * fov), Math.round(height / 2 + (k[ae].pos.y - e.camera.y) * fov), Math.round(k[ae].size.x * fov), Math.round(k[ae].size.y * fov)));
					if (debug) {
						for (var ne in e.datas.objects)
							for (var oe in e.datas.objects[ne]) context.strokeStyle = "#f6f41b", context.lineWidth = 1.5, context.strokeRect(Math.round(width / 2 + (e.datas.objects[ne][oe].pos.x - e.camera.x) * fov), Math.round(height / 2 + (e.datas.objects[ne][oe].pos.y - e.camera.y) * fov), Math.round(e.datas.objects[ne][oe].size.x * fov), Math.round(e.datas.objects[ne][oe].size.y * fov));
						context.font = "22px yes, yes1", context.fillStyle = "black", context.textAlign = "right", context.textBaseline = "middle", context.fillText("".concat(window.fps, " fps"), width, 12), context.fillText("".concat(window.byteSize || 0, " bytes"), width - 60, 12), context.fillText("".concat(window.pingAverage, " ms"), width - 130 - 5 * window.byteSize.toString().length, 12)
					}
					if (context.fillStyle = "#ffff3d", context.fillRect(width / 2 - 300, height - 40, e.datas.infos.fuel / 10 * 600, 30), context.strokeStyle = "rgba(0,0,0,0.5)", context.lineWidth = 6, context.strokeRect(width / 2 - 300, height - 40, 600, 30), e.combo) {
						var re = f(0, e.powers.length),
							se = f(1, e.powers.length);
						context.fillStyle = "rgba(0, 111, 201, 0.75)", context.roundRect(re.x - 5, re.y - 5, 55, se.y - re.y + 45 + 10, 6).fill()
					}
					for (var ie in e.powers) {
						context.fillStyle = "rgba(237,255,252,0.9)", context.strokeStyle = "rgb(18,18,18)", context.lineWidth = 4;
						var ce = f(ie, e.powers.length);
						if (context.roundRect(ce.x, ce.y, 45, 45, 6).fill(), 0 == ie) {
							var de = 45 * e.datas.infos.oneCooldown;
							context.fillStyle = "rgba(228, 21, 21, 0.67)", context.fillRect(ce.x, ce.y + (45 - de), 45, 45 - (45 - de)), de = 45 * e.datas.infos.oneHeat, context.fillStyle = "rgba(21, 85, 228, 0.67)", context.fillRect(ce.x, ce.y + (45 - de), 45, 45 - (45 - de))
						}
						if (1 == ie) {
							var le = 45 * e.datas.infos.twoCooldown;
							context.fillStyle = "rgba(228, 21, 21, 0.67)", context.fillRect(ce.x, ce.y + (45 - le), 45, 45 - (45 - le)), le = 45 * e.datas.infos.twoHeat, context.fillStyle = "rgba(21, 85, 228, 0.67)", context.fillRect(ce.x, ce.y + (45 - le), 45, 45 - (45 - le))
						}
						context.roundRect(ce.x, ce.y, 45, 45, 6).stroke()
					}
					for (var he in e.powers) e.powers[he].type in b.powers && context.drawImage(e.powers[he].image, Math.round(e.powers[he].pos.x + 2), Math.round(e.powers[he].pos.y + 2), 41, 41);
					if ("reward1" in e.animations) {
						var ue = 0,
							pe = 0;
						0 == e.animations.reward1[1] ? (context.fillStyle = "rgba(56, 56, 56, 0.82)", context.fillRect(z(e.time - e.animations.reward1[0], 0, width / 2, width / 2 - 250, 500), z(e.time - e.animations.reward1[0], 0, height / 2, height / 2 - 250, 500), z(e.time - e.animations.reward1[0], 0, 0, 500, 500), z(e.time - e.animations.reward1[0], 0, 0, 390, 500)), context.textAlign = "center", context.textBaseline = "middle", context.font = "bold 37px Russo One", context.fillStyle = "rgba(255,255,255,".concat(z(e.time - e.animations.reward1[0], 3200, 0, 1, 500), ")"), context.fillText("new power unlocked", width / 2, height / 2 + 50), context.font = "30px Russo One", context.fillStyle = "rgba(255,255,255,".concat(z(e.time - e.animations.reward1[0], 3600, 0, 1, 500), ")"), context.fillText("press space to continue", width / 2, height / 2 + 100), context.fillStyle = "rgba(165, 186, 189, ".concat(z(e.time - e.animations.reward1[0], 3200, 0, .8, 300), ")"), context.fillRect(width / 2 - 96, height / 2 - 100 - 96, 192, 192), ue = width / 2 + 3 * Math.cos(e.time / 430), pe = z(e.time - e.animations.reward1[0], 1500, -100, height / 2 - 100, 1200) + 6 * Math.cos(e.time / 250)) : 1 == e.animations.reward1[1] && (context.fillStyle = "rgba(56, 56, 56, 0.82)", context.fillRect(z(e.time - e.animations.reward1[0], 1e3, width / 2 - 250, width / 2, 500), z(e.time - e.animations.reward1[0], 1e3, height / 2 - 250, height / 2, 500), z(e.time - e.animations.reward1[0], 1e3, 500, 0, 500), z(e.time - e.animations.reward1[0], 1e3, 390, 0, 500)), context.textAlign = "center", context.textBaseline = "middle", context.font = "bold 37px Russo One", context.fillStyle = "rgba(255,255,255,".concat(z(e.time - e.animations.reward1[0], 500, 1, 0, 500), ")"), context.fillText("new power unlocked", width / 2, height / 2 + 50), context.font = "30px Russo One", context.fillStyle = "rgba(255,255,255,".concat(z(e.time - e.animations.reward1[0], 500, 1, 0, 500), ")"), context.fillText("press space to continue", width / 2, height / 2 + 100), context.fillStyle = "rgba(165, 186, 189, ".concat(z(e.time - e.animations.reward1[0], 200, .8, 0, 300), ")"), context.fillRect(width / 2 - 96, height / 2 - 100 - 96, 192, 192), ue = width / 2 + 3 * Math.cos(e.time / 430), pe = z(e.time - e.animations.reward1[0], 0, height / 2 - 100, -100, 1200) + 6 * Math.cos(e.time / 250)), context.drawImage(b.powers[e.animations.reward1[2]], ue - 90, pe - 90, 180, 180), 1 == e.animations.reward1[1] && e.time - e.animations.reward1[0] > 1500 && delete e.animations.reward1
					}
					e.datas.players[e.datas.infos.id].states.includes("Died") ? (context.lineWidth = 1, context.textAlign = "center", context.textBaseline = "middle", context.font = "bold ".concat(30, "px Russo One"), context.fillStyle = "white", context.fillText("you are dead.", width / 2, 30), context.fillText("you can wait for someone to revive you or you can press 'r' to respawn", width / 2, 55), context.strokeStyle = "black", context.strokeText("you are dead.", width / 2, 30), context.strokeText("you can wait for someone to revive you or you can press 'r' to respawn", width / 2, 55), "block" !== document.getElementById("gameadsbanner").style.display && (GameAdsRenew("gameadsbanner"), document.getElementById("gameadsbanner").style.display = "block")) : "none" !== document.getElementById("gameadsbanner").style.display && (document.getElementById("gameadsbanner").style.display = "none"), "hsl" == e.datas.backgroundColor[0] && e.datas.backgroundColor[1]++
				}(states)
			}
			L < 300 && (T.beginPath(), T.fillStyle = "rgba(0, 0, 0, ".concat(1 - Math.abs(L / 150 - 1), ")"), T.fillRect(0, 0, P, A), T.closePath()), G = t, window.requestAnimationFrame(e)
		}))
	})()
})();