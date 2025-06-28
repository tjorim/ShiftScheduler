define(['exports', 'react'], (function (exports, React2) { 'use strict';

	function _interopNamespaceDefault(e) {
		var n = Object.create(null);
		if (e) {
			Object.keys(e).forEach(function (k) {
				if (k !== 'default') {
					var d = Object.getOwnPropertyDescriptor(e, k);
					Object.defineProperty(n, k, d.get ? d : {
						enumerable: true,
						get: function () { return e[k]; }
					});
				}
			});
		}
		n.default = e;
		return Object.freeze(n);
	}

	var React2__namespace = /*#__PURE__*/_interopNamespaceDefault(React2);

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var dayjs_min$1 = {exports: {}};

	var dayjs_min = dayjs_min$1.exports;

	var hasRequiredDayjs_min;

	function requireDayjs_min () {
		if (hasRequiredDayjs_min) return dayjs_min$1.exports;
		hasRequiredDayjs_min = 1;
		(function (module, exports) {
			!function (t, e) {
			  module.exports = e() ;
			}(dayjs_min, function () {

			  var t = 1e3,
			    e = 6e4,
			    n = 36e5,
			    r = "millisecond",
			    i = "second",
			    s = "minute",
			    u = "hour",
			    a = "day",
			    o = "week",
			    c = "month",
			    f = "quarter",
			    h = "year",
			    d = "date",
			    l = "Invalid Date",
			    $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
			    y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
			    M = {
			      name: "en",
			      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
			      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
			      ordinal: function (t) {
			        var e = ["th", "st", "nd", "rd"],
			          n = t % 100;
			        return "[" + t + (e[(n - 20) % 10] || e[n] || e[0]) + "]";
			      }
			    },
			    m = function (t, e, n) {
			      var r = String(t);
			      return !r || r.length >= e ? t : "" + Array(e + 1 - r.length).join(n) + t;
			    },
			    v = {
			      s: m,
			      z: function (t) {
			        var e = -t.utcOffset(),
			          n = Math.abs(e),
			          r = Math.floor(n / 60),
			          i = n % 60;
			        return (e <= 0 ? "+" : "-") + m(r, 2, "0") + ":" + m(i, 2, "0");
			      },
			      m: function t(e, n) {
			        if (e.date() < n.date()) return -t(n, e);
			        var r = 12 * (n.year() - e.year()) + (n.month() - e.month()),
			          i = e.clone().add(r, c),
			          s = n - i < 0,
			          u = e.clone().add(r + (s ? -1 : 1), c);
			        return +(-(r + (n - i) / (s ? i - u : u - i)) || 0);
			      },
			      a: function (t) {
			        return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
			      },
			      p: function (t) {
			        return {
			          M: c,
			          y: h,
			          w: o,
			          d: a,
			          D: d,
			          h: u,
			          m: s,
			          s: i,
			          ms: r,
			          Q: f
			        }[t] || String(t || "").toLowerCase().replace(/s$/, "");
			      },
			      u: function (t) {
			        return void 0 === t;
			      }
			    },
			    g = "en",
			    D = {};
			  D[g] = M;
			  var p = "$isDayjsObject",
			    S = function (t) {
			      return t instanceof _ || !(!t || !t[p]);
			    },
			    w = function t(e, n, r) {
			      var i;
			      if (!e) return g;
			      if ("string" == typeof e) {
			        var s = e.toLowerCase();
			        D[s] && (i = s), n && (D[s] = n, i = s);
			        var u = e.split("-");
			        if (!i && u.length > 1) return t(u[0]);
			      } else {
			        var a = e.name;
			        D[a] = e, i = a;
			      }
			      return !r && i && (g = i), i || !r && g;
			    },
			    O = function (t, e) {
			      if (S(t)) return t.clone();
			      var n = "object" == typeof e ? e : {};
			      return n.date = t, n.args = arguments, new _(n);
			    },
			    b = v;
			  b.l = w, b.i = S, b.w = function (t, e) {
			    return O(t, {
			      locale: e.$L,
			      utc: e.$u,
			      x: e.$x,
			      $offset: e.$offset
			    });
			  };
			  var _ = function () {
			      function M(t) {
			        this.$L = w(t.locale, null, !0), this.parse(t), this.$x = this.$x || t.x || {}, this[p] = !0;
			      }
			      var m = M.prototype;
			      return m.parse = function (t) {
			        this.$d = function (t) {
			          var e = t.date,
			            n = t.utc;
			          if (null === e) return new Date(NaN);
			          if (b.u(e)) return new Date();
			          if (e instanceof Date) return new Date(e);
			          if ("string" == typeof e && !/Z$/i.test(e)) {
			            var r = e.match($);
			            if (r) {
			              var i = r[2] - 1 || 0,
			                s = (r[7] || "0").substring(0, 3);
			              return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s);
			            }
			          }
			          return new Date(e);
			        }(t), this.init();
			      }, m.init = function () {
			        var t = this.$d;
			        this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
			      }, m.$utils = function () {
			        return b;
			      }, m.isValid = function () {
			        return !(this.$d.toString() === l);
			      }, m.isSame = function (t, e) {
			        var n = O(t);
			        return this.startOf(e) <= n && n <= this.endOf(e);
			      }, m.isAfter = function (t, e) {
			        return O(t) < this.startOf(e);
			      }, m.isBefore = function (t, e) {
			        return this.endOf(e) < O(t);
			      }, m.$g = function (t, e, n) {
			        return b.u(t) ? this[e] : this.set(n, t);
			      }, m.unix = function () {
			        return Math.floor(this.valueOf() / 1e3);
			      }, m.valueOf = function () {
			        return this.$d.getTime();
			      }, m.startOf = function (t, e) {
			        var n = this,
			          r = !!b.u(e) || e,
			          f = b.p(t),
			          l = function (t, e) {
			            var i = b.w(n.$u ? Date.UTC(n.$y, e, t) : new Date(n.$y, e, t), n);
			            return r ? i : i.endOf(a);
			          },
			          $ = function (t, e) {
			            return b.w(n.toDate()[t].apply(n.toDate("s"), (r ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e)), n);
			          },
			          y = this.$W,
			          M = this.$M,
			          m = this.$D,
			          v = "set" + (this.$u ? "UTC" : "");
			        switch (f) {
			          case h:
			            return r ? l(1, 0) : l(31, 11);
			          case c:
			            return r ? l(1, M) : l(0, M + 1);
			          case o:
			            var g = this.$locale().weekStart || 0,
			              D = (y < g ? y + 7 : y) - g;
			            return l(r ? m - D : m + (6 - D), M);
			          case a:
			          case d:
			            return $(v + "Hours", 0);
			          case u:
			            return $(v + "Minutes", 1);
			          case s:
			            return $(v + "Seconds", 2);
			          case i:
			            return $(v + "Milliseconds", 3);
			          default:
			            return this.clone();
			        }
			      }, m.endOf = function (t) {
			        return this.startOf(t, !1);
			      }, m.$set = function (t, e) {
			        var n,
			          o = b.p(t),
			          f = "set" + (this.$u ? "UTC" : ""),
			          l = (n = {}, n[a] = f + "Date", n[d] = f + "Date", n[c] = f + "Month", n[h] = f + "FullYear", n[u] = f + "Hours", n[s] = f + "Minutes", n[i] = f + "Seconds", n[r] = f + "Milliseconds", n)[o],
			          $ = o === a ? this.$D + (e - this.$W) : e;
			        if (o === c || o === h) {
			          var y = this.clone().set(d, 1);
			          y.$d[l]($), y.init(), this.$d = y.set(d, Math.min(this.$D, y.daysInMonth())).$d;
			        } else l && this.$d[l]($);
			        return this.init(), this;
			      }, m.set = function (t, e) {
			        return this.clone().$set(t, e);
			      }, m.get = function (t) {
			        return this[b.p(t)]();
			      }, m.add = function (r, f) {
			        var d,
			          l = this;
			        r = Number(r);
			        var $ = b.p(f),
			          y = function (t) {
			            var e = O(l);
			            return b.w(e.date(e.date() + Math.round(t * r)), l);
			          };
			        if ($ === c) return this.set(c, this.$M + r);
			        if ($ === h) return this.set(h, this.$y + r);
			        if ($ === a) return y(1);
			        if ($ === o) return y(7);
			        var M = (d = {}, d[s] = e, d[u] = n, d[i] = t, d)[$] || 1,
			          m = this.$d.getTime() + r * M;
			        return b.w(m, this);
			      }, m.subtract = function (t, e) {
			        return this.add(-1 * t, e);
			      }, m.format = function (t) {
			        var e = this,
			          n = this.$locale();
			        if (!this.isValid()) return n.invalidDate || l;
			        var r = t || "YYYY-MM-DDTHH:mm:ssZ",
			          i = b.z(this),
			          s = this.$H,
			          u = this.$m,
			          a = this.$M,
			          o = n.weekdays,
			          c = n.months,
			          f = n.meridiem,
			          h = function (t, n, i, s) {
			            return t && (t[n] || t(e, r)) || i[n].slice(0, s);
			          },
			          d = function (t) {
			            return b.s(s % 12 || 12, t, "0");
			          },
			          $ = f || function (t, e, n) {
			            var r = t < 12 ? "AM" : "PM";
			            return n ? r.toLowerCase() : r;
			          };
			        return r.replace(y, function (t, r) {
			          return r || function (t) {
			            switch (t) {
			              case "YY":
			                return String(e.$y).slice(-2);
			              case "YYYY":
			                return b.s(e.$y, 4, "0");
			              case "M":
			                return a + 1;
			              case "MM":
			                return b.s(a + 1, 2, "0");
			              case "MMM":
			                return h(n.monthsShort, a, c, 3);
			              case "MMMM":
			                return h(c, a);
			              case "D":
			                return e.$D;
			              case "DD":
			                return b.s(e.$D, 2, "0");
			              case "d":
			                return String(e.$W);
			              case "dd":
			                return h(n.weekdaysMin, e.$W, o, 2);
			              case "ddd":
			                return h(n.weekdaysShort, e.$W, o, 3);
			              case "dddd":
			                return o[e.$W];
			              case "H":
			                return String(s);
			              case "HH":
			                return b.s(s, 2, "0");
			              case "h":
			                return d(1);
			              case "hh":
			                return d(2);
			              case "a":
			                return $(s, u, !0);
			              case "A":
			                return $(s, u, !1);
			              case "m":
			                return String(u);
			              case "mm":
			                return b.s(u, 2, "0");
			              case "s":
			                return String(e.$s);
			              case "ss":
			                return b.s(e.$s, 2, "0");
			              case "SSS":
			                return b.s(e.$ms, 3, "0");
			              case "Z":
			                return i;
			            }
			            return null;
			          }(t) || i.replace(":", "");
			        });
			      }, m.utcOffset = function () {
			        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
			      }, m.diff = function (r, d, l) {
			        var $,
			          y = this,
			          M = b.p(d),
			          m = O(r),
			          v = (m.utcOffset() - this.utcOffset()) * e,
			          g = this - m,
			          D = function () {
			            return b.m(y, m);
			          };
			        switch (M) {
			          case h:
			            $ = D() / 12;
			            break;
			          case c:
			            $ = D();
			            break;
			          case f:
			            $ = D() / 3;
			            break;
			          case o:
			            $ = (g - v) / 6048e5;
			            break;
			          case a:
			            $ = (g - v) / 864e5;
			            break;
			          case u:
			            $ = g / n;
			            break;
			          case s:
			            $ = g / e;
			            break;
			          case i:
			            $ = g / t;
			            break;
			          default:
			            $ = g;
			        }
			        return l ? $ : b.a($);
			      }, m.daysInMonth = function () {
			        return this.endOf(c).$D;
			      }, m.$locale = function () {
			        return D[this.$L];
			      }, m.locale = function (t, e) {
			        if (!t) return this.$L;
			        var n = this.clone(),
			          r = w(t, e, !0);
			        return r && (n.$L = r), n;
			      }, m.clone = function () {
			        return b.w(this.$d, this);
			      }, m.toDate = function () {
			        return new Date(this.valueOf());
			      }, m.toJSON = function () {
			        return this.isValid() ? this.toISOString() : null;
			      }, m.toISOString = function () {
			        return this.$d.toISOString();
			      }, m.toString = function () {
			        return this.$d.toUTCString();
			      }, M;
			    }(),
			    k = _.prototype;
			  return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function (t) {
			    k[t[1]] = function (e) {
			      return this.$g(e, t[0], t[1]);
			    };
			  }), O.extend = function (t, e) {
			    return t.$i || (t(e, _, O), t.$i = !0), O;
			  }, O.locale = w, O.isDayjs = S, O.unix = function (t) {
			    return O(1e3 * t);
			  }, O.en = D[g], O.Ls = D, O.p = {}, O;
			}); 
		} (dayjs_min$1));
		return dayjs_min$1.exports;
	}

	var dayjs_minExports = requireDayjs_min();
	var dayjs = /*@__PURE__*/getDefaultExportFromCjs(dayjs_minExports);

	var utc$2 = {exports: {}};

	var utc$1 = utc$2.exports;

	var hasRequiredUtc;

	function requireUtc () {
		if (hasRequiredUtc) return utc$2.exports;
		hasRequiredUtc = 1;
		(function (module, exports) {
			!function (t, i) {
			  module.exports = i() ;
			}(utc$1, function () {

			  var t = "minute",
			    i = /[+-]\d\d(?::?\d\d)?/g,
			    e = /([+-]|\d\d)/g;
			  return function (s, f, n) {
			    var u = f.prototype;
			    n.utc = function (t) {
			      var i = {
			        date: t,
			        utc: !0,
			        args: arguments
			      };
			      return new f(i);
			    }, u.utc = function (i) {
			      var e = n(this.toDate(), {
			        locale: this.$L,
			        utc: !0
			      });
			      return i ? e.add(this.utcOffset(), t) : e;
			    }, u.local = function () {
			      return n(this.toDate(), {
			        locale: this.$L,
			        utc: !1
			      });
			    };
			    var o = u.parse;
			    u.parse = function (t) {
			      t.utc && (this.$u = !0), this.$utils().u(t.$offset) || (this.$offset = t.$offset), o.call(this, t);
			    };
			    var r = u.init;
			    u.init = function () {
			      if (this.$u) {
			        var t = this.$d;
			        this.$y = t.getUTCFullYear(), this.$M = t.getUTCMonth(), this.$D = t.getUTCDate(), this.$W = t.getUTCDay(), this.$H = t.getUTCHours(), this.$m = t.getUTCMinutes(), this.$s = t.getUTCSeconds(), this.$ms = t.getUTCMilliseconds();
			      } else r.call(this);
			    };
			    var a = u.utcOffset;
			    u.utcOffset = function (s, f) {
			      var n = this.$utils().u;
			      if (n(s)) return this.$u ? 0 : n(this.$offset) ? a.call(this) : this.$offset;
			      if ("string" == typeof s && (s = function (t) {
			        void 0 === t && (t = "");
			        var s = t.match(i);
			        if (!s) return null;
			        var f = ("" + s[0]).match(e) || ["-", 0, 0],
			          n = f[0],
			          u = 60 * +f[1] + +f[2];
			        return 0 === u ? 0 : "+" === n ? u : -u;
			      }(s), null === s)) return this;
			      var u = Math.abs(s) <= 16 ? 60 * s : s,
			        o = this;
			      if (f) return o.$offset = u, o.$u = 0 === s, o;
			      if (0 !== s) {
			        var r = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
			        (o = this.local().add(u + r, t)).$offset = u, o.$x.$localOffset = r;
			      } else o = this.utc();
			      return o;
			    };
			    var h = u.format;
			    u.format = function (t) {
			      var i = t || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
			      return h.call(this, i);
			    }, u.valueOf = function () {
			      var t = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
			      return this.$d.valueOf() - 6e4 * t;
			    }, u.isUTC = function () {
			      return !!this.$u;
			    }, u.toISOString = function () {
			      return this.toDate().toISOString();
			    }, u.toString = function () {
			      return this.toDate().toUTCString();
			    };
			    var l = u.toDate;
			    u.toDate = function (t) {
			      return "s" === t && this.$offset ? n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : l.call(this);
			    };
			    var c = u.diff;
			    u.diff = function (t, i, e) {
			      if (t && this.$u === t.$u) return c.call(this, t, i, e);
			      var s = this.local(),
			        f = n(t).local();
			      return c.call(s, f, i, e);
			    };
			  };
			}); 
		} (utc$2));
		return utc$2.exports;
	}

	var utcExports = requireUtc();
	var utc = /*@__PURE__*/getDefaultExportFromCjs(utcExports);

	var timezone$2 = {exports: {}};

	var timezone$1 = timezone$2.exports;

	var hasRequiredTimezone;

	function requireTimezone () {
		if (hasRequiredTimezone) return timezone$2.exports;
		hasRequiredTimezone = 1;
		(function (module, exports) {
			!function (t, e) {
			  module.exports = e() ;
			}(timezone$1, function () {

			  var t = {
			      year: 0,
			      month: 1,
			      day: 2,
			      hour: 3,
			      minute: 4,
			      second: 5
			    },
			    e = {};
			  return function (n, i, o) {
			    var r,
			      a = function (t, n, i) {
			        void 0 === i && (i = {});
			        var o = new Date(t),
			          r = function (t, n) {
			            void 0 === n && (n = {});
			            var i = n.timeZoneName || "short",
			              o = t + "|" + i,
			              r = e[o];
			            return r || (r = new Intl.DateTimeFormat("en-US", {
			              hour12: !1,
			              timeZone: t,
			              year: "numeric",
			              month: "2-digit",
			              day: "2-digit",
			              hour: "2-digit",
			              minute: "2-digit",
			              second: "2-digit",
			              timeZoneName: i
			            }), e[o] = r), r;
			          }(n, i);
			        return r.formatToParts(o);
			      },
			      u = function (e, n) {
			        for (var i = a(e, n), r = [], u = 0; u < i.length; u += 1) {
			          var f = i[u],
			            s = f.type,
			            m = f.value,
			            c = t[s];
			          c >= 0 && (r[c] = parseInt(m, 10));
			        }
			        var d = r[3],
			          l = 24 === d ? 0 : d,
			          h = r[0] + "-" + r[1] + "-" + r[2] + " " + l + ":" + r[4] + ":" + r[5] + ":000",
			          v = +e;
			        return (o.utc(h).valueOf() - (v -= v % 1e3)) / 6e4;
			      },
			      f = i.prototype;
			    f.tz = function (t, e) {
			      void 0 === t && (t = r);
			      var n,
			        i = this.utcOffset(),
			        a = this.toDate(),
			        u = a.toLocaleString("en-US", {
			          timeZone: t
			        }),
			        f = Math.round((a - new Date(u)) / 1e3 / 60),
			        s = 15 * -Math.round(a.getTimezoneOffset() / 15) - f;
			      if (!Number(s)) n = this.utcOffset(0, e);else if (n = o(u, {
			        locale: this.$L
			      }).$set("millisecond", this.$ms).utcOffset(s, !0), e) {
			        var m = n.utcOffset();
			        n = n.add(i - m, "minute");
			      }
			      return n.$x.$timezone = t, n;
			    }, f.offsetName = function (t) {
			      var e = this.$x.$timezone || o.tz.guess(),
			        n = a(this.valueOf(), e, {
			          timeZoneName: t
			        }).find(function (t) {
			          return "timezonename" === t.type.toLowerCase();
			        });
			      return n && n.value;
			    };
			    var s = f.startOf;
			    f.startOf = function (t, e) {
			      if (!this.$x || !this.$x.$timezone) return s.call(this, t, e);
			      var n = o(this.format("YYYY-MM-DD HH:mm:ss:SSS"), {
			        locale: this.$L
			      });
			      return s.call(n, t, e).tz(this.$x.$timezone, !0);
			    }, o.tz = function (t, e, n) {
			      var i = n && e,
			        a = n || e || r,
			        f = u(+o(), a);
			      if ("string" != typeof t) return o(t).tz(a);
			      var s = function (t, e, n) {
			          var i = t - 60 * e * 1e3,
			            o = u(i, n);
			          if (e === o) return [i, e];
			          var r = u(i -= 60 * (o - e) * 1e3, n);
			          return o === r ? [i, o] : [t - 60 * Math.min(o, r) * 1e3, Math.max(o, r)];
			        }(o.utc(t, i).valueOf(), f, a),
			        m = s[0],
			        c = s[1],
			        d = o(m).utcOffset(c);
			      return d.$x.$timezone = a, d;
			    }, o.tz.guess = function () {
			      return Intl.DateTimeFormat().resolvedOptions().timeZone;
			    }, o.tz.setDefault = function (t) {
			      r = t;
			    };
			  };
			}); 
		} (timezone$2));
		return timezone$2.exports;
	}

	var timezoneExports = requireTimezone();
	var timezone = /*@__PURE__*/getDefaultExportFromCjs(timezoneExports);

	var isSameOrBefore$2 = {exports: {}};

	var isSameOrBefore$1 = isSameOrBefore$2.exports;

	var hasRequiredIsSameOrBefore;

	function requireIsSameOrBefore () {
		if (hasRequiredIsSameOrBefore) return isSameOrBefore$2.exports;
		hasRequiredIsSameOrBefore = 1;
		(function (module, exports) {
			!function (e, i) {
			  module.exports = i() ;
			}(isSameOrBefore$1, function () {

			  return function (e, i) {
			    i.prototype.isSameOrBefore = function (e, i) {
			      return this.isSame(e, i) || this.isBefore(e, i);
			    };
			  };
			}); 
		} (isSameOrBefore$2));
		return isSameOrBefore$2.exports;
	}

	var isSameOrBeforeExports = requireIsSameOrBefore();
	var isSameOrBefore = /*@__PURE__*/getDefaultExportFromCjs(isSameOrBeforeExports);

	var isSameOrAfter$2 = {exports: {}};

	var isSameOrAfter$1 = isSameOrAfter$2.exports;

	var hasRequiredIsSameOrAfter;

	function requireIsSameOrAfter () {
		if (hasRequiredIsSameOrAfter) return isSameOrAfter$2.exports;
		hasRequiredIsSameOrAfter = 1;
		(function (module, exports) {
			!function (e, t) {
			  module.exports = t() ;
			}(isSameOrAfter$1, function () {

			  return function (e, t) {
			    t.prototype.isSameOrAfter = function (e, t) {
			      return this.isSame(e, t) || this.isAfter(e, t);
			    };
			  };
			}); 
		} (isSameOrAfter$2));
		return isSameOrAfter$2.exports;
	}

	var isSameOrAfterExports = requireIsSameOrAfter();
	var isSameOrAfter = /*@__PURE__*/getDefaultExportFromCjs(isSameOrAfterExports);

	// Extend dayjs with plugins
	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.extend(isSameOrBefore);
	dayjs.extend(isSameOrAfter);
	const addDays = (date, days) => {
	    return dayjs(date).add(days, "day").toDate();
	};
	const getDurationInMinutes = (start, end) => {
	    return dayjs(end).diff(dayjs(start), "minute");
	};
	const formatDateForShift = (date) => {
	    return dayjs(date).format("YYYY-MM-DD");
	};

	// src/observe.ts
	var observerMap = /* @__PURE__ */new Map();
	var RootIds = /* @__PURE__ */new WeakMap();
	var rootId = 0;
	var unsupportedValue = void 0;
	function getRootId(root) {
	  if (!root) return "0";
	  if (RootIds.has(root)) return RootIds.get(root);
	  rootId += 1;
	  RootIds.set(root, rootId.toString());
	  return RootIds.get(root);
	}
	function optionsToId(options) {
	  return Object.keys(options).sort().filter(key => options[key] !== void 0).map(key => {
	    return `${key}_${key === "root" ? getRootId(options.root) : options[key]}`;
	  }).toString();
	}
	function createObserver(options) {
	  const id = optionsToId(options);
	  let instance = observerMap.get(id);
	  if (!instance) {
	    const elements = /* @__PURE__ */new Map();
	    let thresholds;
	    const observer = new IntersectionObserver(entries => {
	      entries.forEach(entry => {
	        var _a;
	        const inView = entry.isIntersecting && thresholds.some(threshold => entry.intersectionRatio >= threshold);
	        if (options.trackVisibility && typeof entry.isVisible === "undefined") {
	          entry.isVisible = inView;
	        }
	        (_a = elements.get(entry.target)) == null ? void 0 : _a.forEach(callback => {
	          callback(inView, entry);
	        });
	      });
	    }, options);
	    thresholds = observer.thresholds || (Array.isArray(options.threshold) ? options.threshold : [options.threshold || 0]);
	    instance = {
	      id,
	      observer,
	      elements
	    };
	    observerMap.set(id, instance);
	  }
	  return instance;
	}
	function observe(element, callback, options = {}, fallbackInView = unsupportedValue) {
	  if (typeof window.IntersectionObserver === "undefined" && fallbackInView !== void 0) {
	    const bounds = element.getBoundingClientRect();
	    callback(fallbackInView, {
	      isIntersecting: fallbackInView,
	      target: element,
	      intersectionRatio: typeof options.threshold === "number" ? options.threshold : 0,
	      time: 0,
	      boundingClientRect: bounds,
	      intersectionRect: bounds,
	      rootBounds: bounds
	    });
	    return () => {};
	  }
	  const {
	    id,
	    observer,
	    elements
	  } = createObserver(options);
	  const callbacks = elements.get(element) || [];
	  if (!elements.has(element)) {
	    elements.set(element, callbacks);
	  }
	  callbacks.push(callback);
	  observer.observe(element);
	  return function unobserve() {
	    callbacks.splice(callbacks.indexOf(callback), 1);
	    if (callbacks.length === 0) {
	      elements.delete(element);
	      observer.unobserve(element);
	    }
	    if (elements.size === 0) {
	      observer.disconnect();
	      observerMap.delete(id);
	    }
	  };
	}
	function useInView({
	  threshold,
	  delay,
	  trackVisibility,
	  rootMargin,
	  root,
	  triggerOnce,
	  skip,
	  initialInView,
	  fallbackInView,
	  onChange
	} = {}) {
	  var _a;
	  const [ref, setRef] = React2__namespace.useState(null);
	  const callback = React2__namespace.useRef(onChange);
	  const [state, setState] = React2__namespace.useState({
	    inView: !!initialInView,
	    entry: void 0
	  });
	  callback.current = onChange;
	  React2__namespace.useEffect(() => {
	    if (skip || !ref) return;
	    let unobserve;
	    unobserve = observe(ref, (inView, entry) => {
	      setState({
	        inView,
	        entry
	      });
	      if (callback.current) callback.current(inView, entry);
	      if (entry.isIntersecting && triggerOnce && unobserve) {
	        unobserve();
	        unobserve = void 0;
	      }
	    }, {
	      root,
	      rootMargin,
	      threshold,
	      // @ts-ignore
	      trackVisibility,
	      // @ts-ignore
	      delay
	    }, fallbackInView);
	    return () => {
	      if (unobserve) {
	        unobserve();
	      }
	    };
	  },
	  // We break the rule here, because we aren't including the actual `threshold` variable
	  // eslint-disable-next-line react-hooks/exhaustive-deps
	  [
	  // If the threshold is an array, convert it to a string, so it won't change between renders.
	  Array.isArray(threshold) ? threshold.toString() : threshold, ref, root, rootMargin, triggerOnce, skip, trackVisibility, fallbackInView, delay]);
	  const entryTarget = (_a = state.entry) == null ? void 0 : _a.target;
	  const previousEntryTarget = React2__namespace.useRef(void 0);
	  if (!ref && entryTarget && !triggerOnce && !skip && previousEntryTarget.current !== entryTarget) {
	    previousEntryTarget.current = entryTarget;
	    setState({
	      inView: !!initialInView,
	      entry: void 0
	    });
	  }
	  const result = [setRef, state.inView, state.entry];
	  result.ref = result[0];
	  result.inView = result[1];
	  result.entry = result[2];
	  return result;
	}

	/**
	 * Custom hook for managing scroll synchronization and infinite loading
	 * Ensures unified scrolling experience and handles lazy loading of additional timeline data
	 */
	const useScrollNavigation = () => {
	    // Refs for scroll synchronization
	    const headerScrollRef = React2.useRef(null);
	    const contentScrollRef = React2.useRef(null);
	    const isScrolling = React2.useRef(false);
	    // Infinite scroll / lazy loading with intersection observer
	    const { ref: infiniteScrollRef, inView: isInfiniteScrollVisible } = useInView({
	        rootMargin: "0px",
	        threshold: 1
	    });
	    // Scroll synchronization between header and content
	    const syncScroll = React2.useCallback((source, target) => {
	        if (isScrolling.current) {
	            return;
	        }
	        isScrolling.current = true;
	        target.scrollLeft = source.scrollLeft;
	        setTimeout(() => {
	            isScrolling.current = false;
	        }, 10);
	    }, []);
	    // Set up scroll event listeners for synchronization
	    React2.useEffect(() => {
	        const headerEl = headerScrollRef.current;
	        const contentEl = contentScrollRef.current;
	        if (!headerEl || !contentEl) {
	            return;
	        }
	        const handleHeaderScroll = () => syncScroll(headerEl, contentEl);
	        const handleContentScroll = () => syncScroll(contentEl, headerEl);
	        headerEl.addEventListener("scroll", handleHeaderScroll, { passive: true });
	        contentEl.addEventListener("scroll", handleContentScroll, { passive: true });
	        return () => {
	            headerEl.removeEventListener("scroll", handleHeaderScroll);
	            contentEl.removeEventListener("scroll", handleContentScroll);
	        };
	    }, [syncScroll]);
	    return {
	        headerScrollRef,
	        contentScrollRef,
	        isScrolling,
	        infiniteScrollRef,
	        isInfiniteScrollVisible
	    };
	};

	/**
	 * Custom hook for managing team-based access control and role-based filtering
	 * Handles permissions for engineers vs team leaders vs managers
	 */
	const useTeamAccess = (engineers, shifts, config) => {
	    // Determine user permissions based on role
	    const userPermissions = React2.useMemo(() => {
	        const basePermissions = {
	            readOnly: false,
	            canEdit: false,
	            canCreate: false,
	            canDelete: false,
	            canBatch: false,
	            crossTeamAccess: false
	        };
	        switch (config.userRole) {
	            case "admin":
	                return {
	                    ...basePermissions,
	                    canEdit: true,
	                    canCreate: true,
	                    canDelete: true,
	                    canBatch: true,
	                    crossTeamAccess: true
	                };
	            case "manager":
	                return {
	                    ...basePermissions,
	                    canEdit: true,
	                    canCreate: true,
	                    canDelete: true,
	                    canBatch: true,
	                    crossTeamAccess: config.allowCrossTeamView ?? true
	                };
	            case "team_leader":
	                return {
	                    ...basePermissions,
	                    canEdit: config.allowShiftEditing ?? true,
	                    canCreate: true,
	                    canDelete: config.allowShiftEditing ?? true,
	                    canBatch: config.allowBatchOperations ?? true,
	                    crossTeamAccess: config.allowCrossTeamView ?? false
	                };
	            case "engineer":
	            default:
	                return {
	                    ...basePermissions,
	                    readOnly: true,
	                    crossTeamAccess: false
	                };
	        }
	    }, [config]);
	    // Filter engineers based on team access
	    const filteredEngineers = React2.useMemo(() => {
	        if (userPermissions.crossTeamAccess || !config.userTeam) {
	            return engineers;
	        }
	        // Filter to user's team only
	        return engineers.filter(engineer => engineer.header === config.userTeam);
	    }, [engineers, userPermissions.crossTeamAccess, config.userTeam]);
	    // Filter shifts based on accessible engineers
	    const filteredShifts = React2.useMemo(() => {
	        const accessibleEngineerIds = new Set(filteredEngineers.map(e => e.id));
	        return shifts.filter(shift => accessibleEngineerIds.has(shift.engineerId));
	    }, [shifts, filteredEngineers]);
	    // Permission check functions
	    const canViewTeam = (teamName) => {
	        if (userPermissions.crossTeamAccess) {
	            return true;
	        }
	        return teamName === config.userTeam;
	    };
	    const canEditShift = (shift) => {
	        if (!userPermissions.canEdit) {
	            return false;
	        }
	        // Check if shift belongs to an accessible engineer
	        const engineer = filteredEngineers.find(e => e.id === shift.engineerId);
	        if (!engineer) {
	            return false;
	        }
	        // Team leaders can only edit shifts in their team
	        if (config.userRole === "team_leader") {
	            return engineer.header === config.userTeam;
	        }
	        return true;
	    };
	    const canCreateShift = (engineerId) => {
	        if (!userPermissions.canCreate) {
	            return false;
	        }
	        // Check if engineer is accessible
	        const engineer = filteredEngineers.find(e => e.id === engineerId);
	        if (!engineer) {
	            return false;
	        }
	        // Team leaders can only create shifts for their team
	        if (config.userRole === "team_leader") {
	            return engineer.header === config.userTeam;
	        }
	        return true;
	    };
	    const canDeleteShift = (shift) => {
	        if (!userPermissions.canDelete) {
	            return false;
	        }
	        // Same logic as edit
	        return canEditShift(shift);
	    };
	    return {
	        filteredEngineers,
	        filteredShifts,
	        canEditShift,
	        canCreateShift,
	        canDeleteShift,
	        canViewTeam,
	        canPerformBatchOperations: userPermissions.canBatch,
	        userPermissions
	    };
	};

	/**
	 * Empty state component when no data is available
	 */
	const EmptyState = ({ message = "No Data Available", description = "No engineers found. Please check your data source configuration.", className = "", style, tabIndex }) => (React2.createElement("div", { className: `shift-scheduler ${className}`, style: style, tabIndex: tabIndex },
	    React2.createElement("div", { className: "shift-scheduler-empty" },
	        React2.createElement("h3", null,
	            "\uD83D\uDCC5 ",
	            message),
	        React2.createElement("p", null, description))));
	class SchedulerErrorBoundary extends React2.Component {
	    constructor(props) {
	        super(props);
	        this.state = { hasError: false };
	    }
	    componentDidCatch(error, errorInfo) {
	        console.error("Shift Scheduler Error Boundary caught an error:", error);
	        console.error("Error Info:", errorInfo);
	        this.setState({
	            hasError: true,
	            error,
	            errorInfo
	        });
	    }
	    render() {
	        if (this.state.hasError) {
	            return (React2.createElement("div", { className: `shift-scheduler ${this.props.className || ""}`, style: this.props.style, tabIndex: this.props.tabIndex },
	                React2.createElement("div", { className: "shift-scheduler-error-boundary" },
	                    React2.createElement("h3", null, "\uD83D\uDEE0\uFE0F Something went wrong"),
	                    React2.createElement("p", null, "The Shift Scheduler encountered an unexpected error."),
	                    React2.createElement("details", { className: "error-boundary-details" },
	                        React2.createElement("summary", null, "Error Details"),
	                        React2.createElement("h4", null, "Error:"),
	                        React2.createElement("pre", null, this.state.error?.toString()),
	                        this.state.errorInfo && (React2.createElement("div", null,
	                            React2.createElement("h4", null, "Component Stack:"),
	                            React2.createElement("pre", null, this.state.errorInfo.componentStack)))),
	                    React2.createElement("button", { onClick: () => this.setState({ hasError: false, error: undefined, errorInfo: undefined }), className: "error-boundary-retry" }, "Try Again"))));
	        }
	        return this.props.children;
	    }
	    static getDerivedStateFromError(error) {
	        return {
	            hasError: true,
	            error
	        };
	    }
	}
	/**
	 * Higher-order component to wrap any component with error boundary
	 */
	const withErrorBoundary = (Component) => {
	    const WrappedComponent = props => (React2.createElement(SchedulerErrorBoundary, { className: props.className, style: props.style, tabIndex: props.tabIndex },
	        React2.createElement(Component, { ...props })));
	    WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
	    return WrappedComponent;
	};

	// Shift color mappings
	const SHIFT_COLORS = {
	    M: "#2196F3", // Morning - Blue
	    E: "#4CAF50", // Evening - Green
	    N: "#FF9800", // Night - Orange
	    D: "#F44336", // Day off - Red
	    H: "#9E9E9E", // Holiday - Gray
	    T: "#FFEB3B" // Training - Yellow
	};
	/**
	 * Get the color for a shift type
	 */
	const getShiftColor = (shiftType) => {
	    return SHIFT_COLORS[shiftType] || "#607D8B"; // Default gray-blue
	};
	/**
	 * Get short display text for a shift (used in day cells)
	 */
	const getShiftDisplayText = (shiftType) => {
	    return shiftType || "?";
	};

	const DayCell = ({ date, engineer, shift, isToday = false, isWeekend = false, isSelected = false, shiftsLoading = false, onDoubleClick, onCellClick, onContextMenu, readOnly = false }) => {
	    // Memoize cell styling and content for performance
	    const cellData = React2.useMemo(() => {
	        const dayNumber = date.getDate();
	        const shiftColor = shift ? getShiftColor(shift.shift) : null;
	        const shiftText = shift ? getShiftDisplayText(shift.shift) : null;
	        return {
	            dayNumber,
	            shiftColor,
	            shiftText,
	            hasShift: !!shift,
	            isError: shift?.status === "error"
	        };
	    }, [date, shift]);
	    const handleContext = (e) => {
	        if (readOnly || !onContextMenu) {
	            return;
	        }
	        const dateString = date.toISOString().split("T")[0];
	        onContextMenu(e, engineer, dateString, shift);
	    };
	    const handleDoubleClick = () => {
	        if (readOnly) {
	            return;
	        }
	        try {
	            onDoubleClick();
	        }
	        catch (error) {
	            console.error(`Error in DayCell onDoubleClick for ${engineer.name} on ${date.toDateString()}:`, error);
	        }
	    };
	    const handleClick = (e) => {
	        // Prevent text selection when using Shift+click for range selection
	        if (e.shiftKey) {
	            e.preventDefault();
	        }
	        try {
	            onCellClick(e);
	        }
	        catch (error) {
	            console.error(`Error in DayCell onClick for ${engineer.name} on ${date.toDateString()}:`, error);
	        }
	    };
	    const handleMouseDown = (e) => {
	        // Prevent text selection on mousedown for all modifier key combinations
	        if (e.shiftKey || e.ctrlKey || e.metaKey) {
	            e.preventDefault();
	        }
	    };
	    // Build CSS classes
	    const cellClasses = [
	        "day-cell",
	        isToday && "day-cell-today",
	        isWeekend && "day-cell-weekend",
	        isSelected && "day-cell-selected",
	        cellData.hasShift && "day-cell-has-shift",
	        cellData.isError && "day-cell-error",
	        readOnly && "day-cell-readonly"
	    ]
	        .filter(Boolean)
	        .join(" ");
	    return (React2.createElement("div", { className: cellClasses, onDoubleClick: handleDoubleClick, onClick: handleClick, onMouseDown: handleMouseDown, onContextMenu: handleContext, title: `${engineer.name} - ${date.toLocaleDateString()}${shift ? ` (${shift.shift}${shift.status ? ` - ${shift.status}` : ""})` : " - No shift"}`, style: {
	            backgroundColor: cellData.shiftColor || undefined,
	            cursor: readOnly ? "default" : "pointer"
	        } },
	        React2.createElement("div", { className: "day-number" }, cellData.dayNumber),
	        cellData.hasShift ? (React2.createElement("div", { className: "shift-content" },
	            React2.createElement("span", { className: "shift-text" }, cellData.shiftText),
	            shift?.status === "error" && (React2.createElement("span", { className: "shift-error-indicator", title: "Error loading shift data" }, "\u26A0\uFE0F")))) : shiftsLoading ? (React2.createElement("div", { className: "day-cell-loading", title: "Loading shifts..." }, "...")) : (React2.createElement("div", { className: "day-cell-empty", title: "No shift" }, "-"))));
	};

	const ContextMenu = ({ x, y, options, onClose, visible }) => {
	    const menuRef = React2.useRef(null);
	    React2.useEffect(() => {
	        const handleClickOutside = (event) => {
	            if (menuRef.current && !menuRef.current.contains(event.target)) {
	                onClose();
	            }
	        };
	        const handleEscape = (event) => {
	            if (event.key === "Escape") {
	                onClose();
	            }
	        };
	        if (visible) {
	            document.addEventListener("mousedown", handleClickOutside);
	            document.addEventListener("keydown", handleEscape);
	        }
	        return () => {
	            document.removeEventListener("mousedown", handleClickOutside);
	            document.removeEventListener("keydown", handleEscape);
	        };
	    }, [visible, onClose]);
	    if (!visible) {
	        return null;
	    }
	    return (React2.createElement("div", { ref: menuRef, className: "context-menu", style: {
	            position: "fixed",
	            left: x,
	            top: y,
	            zIndex: 1000
	        }, onClick: e => e.stopPropagation() }, options.map((option, index) => option.separator ? (React2.createElement("div", { key: index, className: "context-menu-separator" })) : (React2.createElement("div", { key: index, className: `context-menu-item ${option.disabled ? "disabled" : ""}`, onClick: () => {
	            if (!option.disabled) {
	                option.action();
	                onClose();
	            }
	        } },
	        option.icon && React2.createElement("span", { className: "context-menu-icon" }, option.icon),
	        React2.createElement("span", { className: "context-menu-label" }, option.label))))));
	};
	// Context menu factory functions
	const createEmptyCellMenu = (engineer, date, onCreateShift) => [
	    {
	        label: `Create shift for ${engineer.name}`,
	        icon: "➕",
	        action: () => onCreateShift(engineer.id, date)
	    }
	];
	const createExistingShiftMenu = (shift, engineer, onEditShift, onDeleteShift) => [
	    {
	        label: `${engineer.name} - ${shift.date}`,
	        icon: "📅",
	        action: () => { }, // eslint-disable-line @typescript-eslint/no-empty-function
	        disabled: true
	    },
	    {
	        label: `${shift.shift} Shift`,
	        icon: getShiftIcon(shift.shift),
	        action: () => { }, // eslint-disable-line @typescript-eslint/no-empty-function
	        disabled: true
	    },
	    { separator: true },
	    {
	        label: "Edit Shift",
	        icon: "✏️",
	        action: () => onEditShift(shift)
	    },
	    { separator: true },
	    {
	        label: "Delete Shift",
	        icon: "🗑️",
	        action: () => onDeleteShift(shift)
	    }
	];
	const createMultiSelectMenu = (selectedCount, onBatchCreate, onBatchEdit, onBatchDelete, onClearSelection) => [
	    {
	        label: `${selectedCount} cells selected`,
	        icon: "📊",
	        action: () => { }, // eslint-disable-line @typescript-eslint/no-empty-function
	        disabled: true
	    },
	    { separator: true },
	    {
	        label: "Batch Create",
	        icon: "➕",
	        action: onBatchCreate
	    },
	    {
	        label: "Batch Edit",
	        icon: "✏️",
	        action: onBatchEdit
	    },
	    { separator: true },
	    {
	        label: "Batch Delete",
	        icon: "🗑️",
	        action: onBatchDelete
	    },
	    { separator: true },
	    {
	        label: "Clear Selection",
	        icon: "❌",
	        action: onClearSelection
	    }
	];
	function getShiftIcon(shiftType) {
	    switch (shiftType) {
	        case "M":
	            return "🌅";
	        case "E":
	            return "🌆";
	        case "N":
	            return "🌙";
	        case "D":
	            return "🏠";
	        case "H":
	            return "🏖️";
	        case "T":
	            return "📚";
	        default:
	            return "⏰";
	    }
	}

	// Helper functions for disabled actions with correct signatures
	const noOpShiftFunction = (_shift) => {
	    // Intentionally empty - used for disabled shift menu actions
	};
	const noOpFunction = () => {
	    // Intentionally empty - used for disabled menu actions
	};
	const ScheduleGrid = ({ engineers: _engineers, shifts, getShiftsForEngineer: _getShiftsForEngineer, getEngineersByTeam, onEditShift, onCreateShift, onDeleteShift, onBatchCreate, onBatchEdit, onBatchDelete, readOnly = false, className = "", teamAccess, showDebugInfo, shiftsLoading, debugInfo }) => {
	    // Team access control - use provided config or default to engineer role
	    const defaultTeamAccess = {
	        userRole: "engineer",
	        allowCrossTeamView: false,
	        allowShiftEditing: false,
	        allowBatchOperations: false
	    };
	    const accessConfig = teamAccess || defaultTeamAccess;
	    const { filteredShifts, canEditShift, canDeleteShift, canPerformBatchOperations, userPermissions } = useTeamAccess(_engineers, shifts, accessConfig);
	    // Use filtered data based on user permissions
	    // TODO: Filter teamsData to respect user access permissions
	    const accessibleShifts = filteredShifts;
	    // Calculate date range from accessible shift data
	    const dateRange = React2.useMemo(() => {
	        if (accessibleShifts.length === 0) {
	            return {
	                start: new Date(),
	                end: addDays(new Date(), 30)
	            };
	        }
	        const shiftDates = accessibleShifts.map(shift => new Date(shift.date)).filter(date => !isNaN(date.getTime()));
	        if (shiftDates.length === 0) {
	            return {
	                start: new Date(),
	                end: addDays(new Date(), 30)
	            };
	        }
	        const earliestDate = new Date(Math.min(...shiftDates.map(d => d.getTime())));
	        const latestDate = new Date(Math.max(...shiftDates.map(d => d.getTime())));
	        return {
	            start: earliestDate,
	            end: latestDate
	        };
	    }, [accessibleShifts]);
	    const [startDate] = React2.useState(dateRange.start);
	    const [endDate, setEndDate] = React2.useState(dateRange.end);
	    const [selectedCells, setSelectedCells] = React2.useState([]);
	    const [lastSelectedCell, setLastSelectedCell] = React2.useState(null);
	    // Context menu state
	    const [contextMenu, setContextMenu] = React2.useState({
	        visible: false,
	        x: 0,
	        y: 0,
	        options: []
	    });
	    // Scroll navigation hook for unified scrolling and infinite loading
	    const { headerScrollRef, contentScrollRef, infiniteScrollRef, isInfiniteScrollVisible } = useScrollNavigation();
	    // Helper functions for multi-select
	    const isCellSelected = React2.useCallback((engineerId, date) => {
	        return selectedCells.some(cell => cell.engineerId === engineerId && cell.date === date);
	    }, [selectedCells]);
	    // Handle infinite scroll loading when sentinel comes into view
	    React2.useEffect(() => {
	        if (isInfiniteScrollVisible) {
	            setEndDate(d => addDays(d, 15));
	        }
	    }, [isInfiniteScrollVisible]);
	    // Memoize teams data for performance
	    const teamsData = React2.useMemo(() => {
	        try {
	            return getEngineersByTeam();
	        }
	        catch (error) {
	            console.warn("Error getting engineers by team:", error);
	            return {};
	        }
	    }, [getEngineersByTeam]);
	    // Group engineers by Header → Subheader → Engineers (data-driven with fallback)
	    const { headerSubheaderStructure, allEngineers, groupingDebugInfo } = React2.useMemo(() => {
	        const debugMessages = [];
	        // Check if we have any header grouping configured
	        const hasHeaderGrouping = !!debugInfo && debugInfo.attributesConfigured?.header;
	        const hasSubheaderGrouping = !!debugInfo && debugInfo.attributesConfigured?.subheader;
	        debugMessages.push(`Processing ${Object.keys(teamsData).length} header groups`);
	        debugMessages.push(`Header grouping: ${hasHeaderGrouping ? "✅" : "❌"}`);
	        debugMessages.push(`Subheader grouping: ${hasSubheaderGrouping ? "✅" : "❌"}`);
	        if (!hasHeaderGrouping) {
	            // No grouping - flat list of all engineers
	            const flatEngineers = Object.values(teamsData).flat();
	            debugMessages.push("No header grouping - showing all engineers in single group");
	            return {
	                headerSubheaderStructure: [
	                    {
	                        headerName: "All Engineers",
	                        headerId: "all-engineers",
	                        subheaders: [
	                            {
	                                name: "General",
	                                engineers: flatEngineers
	                            }
	                        ]
	                    }
	                ],
	                allEngineers: flatEngineers,
	                groupingDebugInfo: debugMessages
	            };
	        }
	        const structure = Object.entries(teamsData).map(([headerName, engineers]) => {
	            debugMessages.push(`Header "${headerName}": ${engineers.length} engineers`);
	            if (!hasSubheaderGrouping) {
	                // Only header grouping - no subheader grouping
	                debugMessages.push(`  No subheader grouping for ${headerName}`);
	                return {
	                    headerName,
	                    headerId: headerName.toLowerCase().replace(/\s+/g, "-"),
	                    subheaders: [
	                        {
	                            name: "General",
	                            engineers
	                        }
	                    ]
	                };
	            }
	            // Both header and subheader grouping
	            const subheaderGroups = {};
	            engineers.forEach((engineer, index) => {
	                // Use engineer's subheader, default to 'General' if not specified
	                const engineerSubheader = engineer.subheader || "General";
	                if (!subheaderGroups[engineerSubheader]) {
	                    subheaderGroups[engineerSubheader] = [];
	                }
	                subheaderGroups[engineerSubheader].push(engineer);
	                // Debug first few engineers
	                if (index < 2) {
	                    debugMessages.push(`  Engineer ${index}: ${engineer.name} (${engineer.header}/${engineer.subheader})`);
	                }
	            });
	            // Sort subheaders alphabetically (data-driven, no hardcoded order)
	            const sortedSubheaders = Object.keys(subheaderGroups).sort();
	            debugMessages.push(`  Subheaders: ${sortedSubheaders.join(", ")}`);
	            return {
	                headerName,
	                headerId: headerName.toLowerCase().replace(/\s+/g, "-"),
	                subheaders: sortedSubheaders.map(subheader => ({
	                    name: subheader,
	                    engineers: subheaderGroups[subheader]
	                }))
	            };
	        });
	        const flatEngineers = structure.flatMap(header => header.subheaders.flatMap(subheader => subheader.engineers));
	        return { headerSubheaderStructure: structure, allEngineers: flatEngineers, groupingDebugInfo: debugMessages };
	    }, [teamsData, debugInfo]);
	    // Generate date columns
	    const dateColumns = React2.useMemo(() => {
	        const daysCount = Math.ceil(getDurationInMinutes(startDate, endDate) / (60 * 24));
	        return Array.from({ length: daysCount }, (_, idx) => {
	            const date = addDays(startDate, idx);
	            return {
	                date,
	                dateString: formatDateForShift(date),
	                isToday: formatDateForShift(date) === formatDateForShift(new Date()),
	                isWeekend: date.getDay() === 0 || date.getDay() === 6
	            };
	        });
	    }, [startDate, endDate]);
	    // Multi-select cell function (defined after allEngineers and dateColumns are available)
	    const selectCell = React2.useCallback((engineerId, date, ctrlKey, shiftKey) => {
	        const newCell = { engineerId, date };
	        if (shiftKey && lastSelectedCell) {
	            // Shift+click: select range from last selected to current
	            const engineerStart = allEngineers.findIndex(e => e.id === lastSelectedCell.engineerId);
	            const engineerEnd = allEngineers.findIndex(e => e.id === engineerId);
	            const dateStart = dateColumns.findIndex(d => d.dateString === lastSelectedCell.date);
	            const dateEnd = dateColumns.findIndex(d => d.dateString === date);
	            const minEngineer = Math.min(engineerStart, engineerEnd);
	            const maxEngineer = Math.max(engineerStart, engineerEnd);
	            const minDate = Math.min(dateStart, dateEnd);
	            const maxDate = Math.max(dateStart, dateEnd);
	            const rangeCells = [];
	            for (let e = minEngineer; e <= maxEngineer; e++) {
	                for (let d = minDate; d <= maxDate; d++) {
	                    if (allEngineers[e] && dateColumns[d]) {
	                        rangeCells.push({
	                            engineerId: allEngineers[e].id,
	                            date: dateColumns[d].dateString
	                        });
	                    }
	                }
	            }
	            if (ctrlKey) {
	                // Ctrl+Shift: add range to existing selection
	                setSelectedCells(prev => {
	                    const newSelection = [...prev];
	                    rangeCells.forEach(cell => {
	                        if (!newSelection.some(existing => existing.engineerId === cell.engineerId && existing.date === cell.date)) {
	                            newSelection.push(cell);
	                        }
	                    });
	                    return newSelection;
	                });
	            }
	            else {
	                // Shift only: replace selection with range
	                setSelectedCells(rangeCells);
	            }
	        }
	        else if (ctrlKey) {
	            // Ctrl+click: toggle single cell
	            setSelectedCells(prev => {
	                const isSelected = prev.some(cell => cell.engineerId === engineerId && cell.date === date);
	                if (isSelected) {
	                    return prev.filter(cell => !(cell.engineerId === engineerId && cell.date === date));
	                }
	                else {
	                    return [...prev, newCell];
	                }
	            });
	            setLastSelectedCell(newCell);
	        }
	        else {
	            // Regular click: select single cell
	            setSelectedCells([newCell]);
	            setLastSelectedCell(newCell);
	        }
	    }, [lastSelectedCell, allEngineers, dateColumns]);
	    // Context menu handlers
	    const handleCellContextMenu = React2.useCallback((e, engineer, date, shift) => {
	        e.preventDefault();
	        e.stopPropagation();
	        let options;
	        // Check permissions before showing context menu options
	        if (selectedCells.length > 1) {
	            if (canPerformBatchOperations) {
	                // Multi-selection context menu (full permissions)
	                options = createMultiSelectMenu(selectedCells.length, () => {
	                    if (onBatchCreate) {
	                        onBatchCreate(selectedCells);
	                    }
	                }, () => {
	                    if (onBatchEdit) {
	                        onBatchEdit(selectedCells);
	                    }
	                }, () => {
	                    if (onBatchDelete) {
	                        onBatchDelete(selectedCells);
	                    }
	                }, () => {
	                    setSelectedCells([]);
	                    setLastSelectedCell(null);
	                });
	            }
	            else {
	                // Limited menu when no batch permissions
	                options = [
	                    {
	                        label: `${selectedCells.length} cells selected`,
	                        icon: "📊",
	                        action: noOpFunction,
	                        disabled: true,
	                        separator: false
	                    },
	                    { separator: true },
	                    {
	                        label: "Clear Selection",
	                        icon: "✕",
	                        action: () => {
	                            setSelectedCells([]);
	                            setLastSelectedCell(null);
	                        },
	                        disabled: false,
	                        separator: false
	                    },
	                    {
	                        label: "Batch operations not permitted",
	                        icon: "🔒",
	                        action: noOpFunction,
	                        disabled: true,
	                        separator: false
	                    }
	                ];
	            }
	        }
	        else if (shift) {
	            // Existing shift context menu (check edit/delete permissions)
	            options = createExistingShiftMenu(shift, engineer, canEditShift(shift)
	                ? shift => {
	                    if (onEditShift) {
	                        onEditShift(shift);
	                    }
	                }
	                : noOpShiftFunction, canDeleteShift(shift)
	                ? shift => {
	                    if (onDeleteShift) {
	                        onDeleteShift(shift);
	                    }
	                }
	                : noOpShiftFunction);
	        }
	        else if (onCreateShift) {
	            // Empty cell context menu (only if create action is available)
	            options = createEmptyCellMenu(engineer, date, (engineerId, date) => {
	                if (onCreateShift) {
	                    onCreateShift(engineerId, date);
	                }
	            });
	        }
	        else {
	            // No permissions - show limited menu
	            options = [
	                {
	                    label: "No permissions",
	                    icon: "🔒",
	                    action: noOpFunction,
	                    disabled: true,
	                    separator: false
	                }
	            ];
	        }
	        setContextMenu({
	            visible: true,
	            x: e.clientX,
	            y: e.clientY,
	            options
	        });
	    }, [
	        onCreateShift,
	        selectedCells,
	        canPerformBatchOperations,
	        canEditShift,
	        canDeleteShift,
	        onEditShift,
	        onDeleteShift,
	        onBatchCreate,
	        onBatchEdit,
	        onBatchDelete,
	        setSelectedCells,
	        setLastSelectedCell
	    ]);
	    const closeContextMenu = React2.useCallback(() => {
	        setContextMenu(prev => ({ ...prev, visible: false }));
	    }, []);
	    // Create shift lookup for performance with targeted debugging
	    const shiftLookup = React2.useMemo(() => {
	        const lookup = {};
	        // Force console output for critical debugging
	        console.log("🔍 SHIFTS DEBUG - Total shifts:", accessibleShifts.length);
	        accessibleShifts.forEach((shift, index) => {
	            const key = `${shift.engineerId}-${shift.date}`;
	            lookup[key] = shift;
	            // Debug only first 2 shifts due to large dataset
	            if (index < 2) {
	                console.log(`🔍 SHIFT ${index}:`, {
	                    engineerId: shift.engineerId,
	                    date: shift.date,
	                    shift: shift.shift,
	                    type: typeof shift.date,
	                    key
	                });
	            }
	        });
	        console.log("🔍 LOOKUP DEBUG - Total keys:", Object.keys(lookup).length);
	        console.log("🔍 SAMPLE KEYS:", Object.keys(lookup).slice(0, 3));
	        return lookup;
	    }, [accessibleShifts]);
	    // Helper function to get shift for engineer and date
	    const getShift = React2.useCallback((engineerId, dateString) => {
	        const key = `${engineerId}-${dateString}`;
	        const shift = shiftLookup[key];
	        // Debug first few lookups only
	        if (Math.random() < 0.001) {
	            // Sample 0.1% of lookups
	            console.log("🔍 LOOKUP TEST:", {
	                engineerId,
	                dateString,
	                key,
	                found: !!shift,
	                shift: shift ? `${shift.shift}` : "none"
	            });
	        }
	        return shift;
	    }, [shiftLookup]);
	    // Enhanced cell click handler with multi-select support
	    const handleCellClick = React2.useCallback((engineerId, dateString, ctrlKey, shiftKey) => {
	        selectCell(engineerId, dateString, ctrlKey, shiftKey);
	    }, [selectCell]);
	    // Keyboard navigation with multi-select support
	    React2.useEffect(() => {
	        const handleKeyDown = (e) => {
	            if (selectedCells.length === 0 || allEngineers.length === 0 || dateColumns.length === 0) {
	                return;
	            }
	            // Use the last selected cell for navigation
	            const currentCell = lastSelectedCell || selectedCells[selectedCells.length - 1];
	            const currentEngineerIndex = allEngineers.findIndex(eng => eng.id === currentCell.engineerId);
	            const currentDateIndex = dateColumns.findIndex(col => col.dateString === currentCell.date);
	            if (currentEngineerIndex === -1 || currentDateIndex === -1) {
	                return;
	            }
	            let newEngineerIndex = currentEngineerIndex;
	            let newDateIndex = currentDateIndex;
	            switch (e.key) {
	                case "ArrowUp":
	                    newEngineerIndex = Math.max(0, currentEngineerIndex - 1);
	                    e.preventDefault();
	                    break;
	                case "ArrowDown":
	                    newEngineerIndex = Math.min(allEngineers.length - 1, currentEngineerIndex + 1);
	                    e.preventDefault();
	                    break;
	                case "ArrowLeft":
	                    newDateIndex = Math.max(0, currentDateIndex - 1);
	                    e.preventDefault();
	                    break;
	                case "ArrowRight":
	                    newDateIndex = Math.min(dateColumns.length - 1, currentDateIndex + 1);
	                    e.preventDefault();
	                    break;
	                case "Enter":
	                case " ":
	                    if (selectedCells.length === 1) {
	                        // Single selection: edit the selected cell
	                        try {
	                            const shift = getShift(currentCell.engineerId, currentCell.date);
	                            if (onEditShift && shift) {
	                                onEditShift(shift);
	                            }
	                        }
	                        catch (error) {
	                            console.error("Error in keyboard edit:", error);
	                        }
	                    }
	                    else {
	                        // Multi-selection: could batch edit or show context menu
	                        console.log(`Multi-edit for ${selectedCells.length} cells`);
	                    }
	                    e.preventDefault();
	                    break;
	                case "Escape":
	                    setSelectedCells([]);
	                    setLastSelectedCell(null);
	                    e.preventDefault();
	                    break;
	                default:
	                    return;
	            }
	            if (newEngineerIndex !== currentEngineerIndex || newDateIndex !== currentDateIndex) {
	                selectCell(allEngineers[newEngineerIndex].id, dateColumns[newDateIndex].dateString, e.ctrlKey || e.metaKey, e.shiftKey);
	            }
	        };
	        document.addEventListener("keydown", handleKeyDown);
	        return () => document.removeEventListener("keydown", handleKeyDown);
	    }, [selectedCells, lastSelectedCell, allEngineers, dateColumns, getShift, onEditShift, selectCell]);
	    // Global click handler to close context menu
	    React2.useEffect(() => {
	        const handleGlobalClick = () => {
	            closeContextMenu();
	        };
	        if (contextMenu.visible) {
	            document.addEventListener("click", handleGlobalClick);
	        }
	        return () => {
	            document.removeEventListener("click", handleGlobalClick);
	        };
	    }, [contextMenu.visible, closeContextMenu]);
	    // Calculate shift statistics
	    const shiftStats = React2.useMemo(() => {
	        const stats = {
	            M: 0,
	            E: 0,
	            N: 0,
	            D: 0,
	            H: 0,
	            T: 0,
	            total: accessibleShifts.length
	        };
	        accessibleShifts.forEach(shift => {
	            const shiftType = shift.shift.charAt(0); // Get first character (M, E, N, D, H, T)
	            if (Object.prototype.hasOwnProperty.call(stats, shiftType)) {
	                stats[shiftType]++;
	            }
	        });
	        return stats;
	    }, [accessibleShifts]);
	    // Error handling for empty data
	    if (headerSubheaderStructure.length === 0 || allEngineers.length === 0) {
	        return (React2.createElement(EmptyState, { message: "No Engineers Available", description: userPermissions.crossTeamAccess
	                ? "No engineers found. Please check your data configuration."
	                : "No engineers found in your accessible teams. Contact your administrator if this seems incorrect.", className: className }));
	    }
	    return (React2.createElement("div", { className: `shift-scheduler-unified ${className}` },
	        showDebugInfo && (React2.createElement("div", { style: {
	                background: "#e0f2fe",
	                padding: "12px",
	                fontSize: "11px",
	                borderBottom: "1px solid #0284c7",
	                color: "#0c4a6e",
	                fontFamily: "monospace"
	            } },
	            React2.createElement("div", null,
	                "\uD83D\uDD0D Debug: Headers: ",
	                headerSubheaderStructure.length,
	                ", Engineers: ",
	                allEngineers.length,
	                ", Shifts:",
	                " ",
	                shifts.length),
	            React2.createElement("div", null,
	                "\uD83D\uDCCA Shift Lookup Keys: ",
	                Object.keys(shiftLookup).length),
	            React2.createElement("div", null,
	                "\uD83C\uDFD7\uFE0F Grouping:",
	                " ",
	                Array.isArray(groupingDebugInfo) ? groupingDebugInfo.join(" | ") : "Debug info unavailable"),
	            debugInfo && (React2.createElement("div", null,
	                "\u2699\uFE0F Config: Name=",
	                debugInfo.attributesConfigured.name ? "✅" : "❌",
	                ", Header=",
	                debugInfo.attributesConfigured.header ? "✅" : "❌",
	                ", Subheader=",
	                debugInfo.attributesConfigured.subheader ? "✅" : "❌",
	                ", SPUser=",
	                debugInfo.attributesConfigured.spUserAssociation ? "✅" : "❌",
	                ", Shift=",
	                debugInfo.attributesConfigured.shiftAssociation ? "✅" : "❌",
	                ", ShiftDate=",
	                debugInfo.attributesConfigured.shiftDate ? "✅" : "❌")),
	            shifts.length > 0 && (React2.createElement("div", null,
	                React2.createElement("div", null,
	                    "\uD83C\uDFAF First Shift: ID=",
	                    shifts[0]?.engineerId,
	                    ", Date=",
	                    shifts[0]?.date,
	                    ", Type=",
	                    typeof shifts[0]?.date,
	                    ", Shift=",
	                    shifts[0]?.shift),
	                React2.createElement("div", null,
	                    "\uD83D\uDD11 Sample Keys: ",
	                    Object.keys(shiftLookup).slice(0, 3).join(", ")))),
	            allEngineers.length > 0 && (React2.createElement("div", null,
	                "\uD83D\uDC64 First Engineer: ID=",
	                allEngineers[0]?.id,
	                ", Name=",
	                allEngineers[0]?.name)),
	            dateColumns.length > 0 && (React2.createElement("div", null,
	                "\uD83D\uDCC5 Timeline: ",
	                dateColumns[0]?.dateString,
	                " to",
	                " ",
	                dateColumns[dateColumns.length - 1]?.dateString,
	                " (",
	                dateColumns.length,
	                " days)")),
	            React2.createElement("div", null,
	                "\uD83D\uDD0D Test Lookup: Key=",
	                allEngineers[0]?.id,
	                "-",
	                dateColumns[0]?.dateString,
	                " Found=",
	                !!shiftLookup[`${allEngineers[0]?.id}-${dateColumns[0]?.dateString}`]),
	            React2.createElement("div", null,
	                "\uD83D\uDD0D Engineer ID Types: Engineer=",
	                typeof allEngineers[0]?.id,
	                ", Shift=",
	                typeof shifts[0]?.engineerId),
	            React2.createElement("div", null,
	                "\uD83D\uDD0D Date Match Test: Timeline=",
	                dateColumns[0]?.dateString,
	                ", Shift=",
	                shifts[0]?.date),
	            React2.createElement("div", null,
	                "\uD83D\uDCC8 Performance: ",
	                Object.keys(shiftLookup).length,
	                " lookup keys,",
	                " ",
	                allEngineers.length * dateColumns.length,
	                " total cells"),
	            React2.createElement("div", null,
	                "\uD83D\uDCCA Shift Stats: M:",
	                shiftStats.M,
	                " E:",
	                shiftStats.E,
	                " N:",
	                shiftStats.N,
	                " D:",
	                shiftStats.D,
	                " H:",
	                shiftStats.H,
	                " T:",
	                shiftStats.T),
	            selectedCells.length > 0 && (React2.createElement("div", null,
	                "\uD83C\uDFAF Selected: ",
	                selectedCells.length,
	                " cell(s)",
	                " ",
	                selectedCells.length === 1
	                    ? `(${allEngineers.find(e => e.id === selectedCells[0].engineerId)?.name} on ${selectedCells[0].date})`
	                    : "",
	                " ",
	                "- Ctrl+click: toggle, Shift+click: range, Arrows: navigate, Enter/Space: edit, Esc: clear")),
	            React2.createElement("div", { style: {
	                    marginTop: "8px",
	                    fontSize: "10px",
	                    backgroundColor: "#f0f0f0",
	                    padding: "8px",
	                    borderRadius: "4px"
	                } },
	                React2.createElement("div", null,
	                    React2.createElement("strong", null, "\uD83D\uDD0D Find engineers with shifts:")),
	                React2.createElement("pre", { style: { fontSize: "9px", overflow: "auto", maxHeight: "80px" } }, (() => {
	                    const engineersWithShifts = allEngineers
	                        .filter(eng => {
	                        const hasShift = shiftLookup[`${eng.id}-${dateColumns[0]?.dateString}`];
	                        return hasShift;
	                    })
	                        .slice(0, 3);
	                    return JSON.stringify(engineersWithShifts.map(eng => ({
	                        id: eng.id,
	                        name: eng.name,
	                        header: eng.header,
	                        subheader: eng.subheader,
	                        hasShiftOnFirstDate: !!shiftLookup[`${eng.id}-${dateColumns[0]?.dateString}`]
	                    })), null, 2);
	                })()),
	                React2.createElement("div", { style: { marginTop: "4px" } },
	                    React2.createElement("strong", null, "\uD83D\uDD0D Sample shift engineer IDs:")),
	                React2.createElement("pre", { style: { fontSize: "9px", overflow: "auto", maxHeight: "80px" } }, JSON.stringify(shifts.slice(0, 5).map(shift => ({
	                    shiftId: shift.id,
	                    engineerId: shift.engineerId,
	                    shift: shift.shift,
	                    date: shift.date
	                })), null, 2)),
	                React2.createElement("div", { style: { marginTop: "4px" } },
	                    React2.createElement("strong", null, "\uD83D\uDCA1 Check: Do any engineer IDs match shift engineer IDs?")),
	                React2.createElement("pre", { style: { fontSize: "9px", overflow: "auto", maxHeight: "60px" } }, (() => {
	                    const shiftEngineerIds = new Set(shifts.map(s => s.engineerId));
	                    const engineerIds = new Set(allEngineers.map(e => e.id));
	                    const matches = [...shiftEngineerIds].filter(id => engineerIds.has(id));
	                    const totalShiftEngineers = shiftEngineerIds.size;
	                    const totalEngineers = engineerIds.size;
	                    return JSON.stringify({
	                        matchingIds: matches.slice(0, 3),
	                        totalMatches: matches.length,
	                        totalShiftEngineers,
	                        totalEngineers,
	                        sampleShiftIds: [...shiftEngineerIds].slice(0, 3),
	                        sampleEngineerIds: [...engineerIds].slice(0, 3)
	                    }, null, 2);
	                })()),
	                React2.createElement("div", { style: { marginTop: "8px" } },
	                    React2.createElement("strong", null, "\uD83D\uDD0D Raw SPUser Object Properties:")),
	                React2.createElement("pre", { style: { fontSize: "9px", overflow: "auto", maxHeight: "80px" } }, allEngineers.length > 0
	                    ? JSON.stringify({
	                        id: allEngineers[0].mendixObject.id,
	                        allOwnProperties: Object.getOwnPropertyNames(allEngineers[0].mendixObject),
	                        allPrototypeProperties: Object.getOwnPropertyNames(Object.getPrototypeOf(allEngineers[0].mendixObject)),
	                        objectKeys: Object.keys(allEngineers[0].mendixObject),
	                        directAccess: {
	                            Username: allEngineers[0].mendixObject.Username,
	                            Name: allEngineers[0].mendixObject.Name,
	                            Email: allEngineers[0].mendixObject.Email,
	                            Abbreviation: allEngineers[0].mendixObject.Abbreviation,
	                            id: allEngineers[0].mendixObject.id
	                        },
	                        typeofCheck: typeof allEngineers[0].mendixObject,
	                        constructorName: allEngineers[0].mendixObject.constructor.name
	                    }, null, 2)
	                    : "No engineers"),
	                React2.createElement("div", { style: { marginTop: "8px" } },
	                    React2.createElement("strong", null, "\uD83D\uDD0D Raw CalendarEvent Object Properties:")),
	                React2.createElement("pre", { style: { fontSize: "9px", overflow: "auto", maxHeight: "80px" } }, shifts.length > 0
	                    ? JSON.stringify({
	                        id: shifts[0].mendixObject.id,
	                        allProperties: Object.keys(shifts[0].mendixObject),
	                        directAccess: {
	                            SPUser: shifts[0].mendixObject.SPUser,
	                            CalendarEvents_SPUser: shifts[0].mendixObject
	                                .CalendarEvents_SPUser,
	                            Engineer: shifts[0].mendixObject.Engineer,
	                            User: shifts[0].mendixObject.User
	                        }
	                    }, null, 2)
	                    : "No shifts")))),
	        React2.createElement("div", { className: "scheduler-container" },
	            React2.createElement("div", { className: "scheduler-header" },
	                React2.createElement("div", { className: "engineer-column-header" }, "Engineer"),
	                React2.createElement("div", { className: "timeline-container", ref: headerScrollRef },
	                    React2.createElement("div", { className: "timeline-header" }, dateColumns.map((col, idx) => (React2.createElement("div", { key: idx, className: `date-header ${col.isToday ? "date-header-today" : ""} ${col.isWeekend ? "date-header-weekend" : ""}` },
	                        React2.createElement("div", { className: "date-day" }, col.date.getDate()),
	                        React2.createElement("div", { className: "date-month" }, col.date.toLocaleDateString("en", { month: "short" })))))))),
	            React2.createElement("div", { className: "scheduler-content" },
	                React2.createElement("div", { className: "engineer-names-column" }, headerSubheaderStructure.map(headerData => (React2.createElement("div", { key: headerData.headerId },
	                    React2.createElement("div", { className: "team-name-cell" }, headerData.headerName),
	                    headerData.subheaders.map(subheader => (React2.createElement("div", { key: `${headerData.headerId}-${subheader.name}` },
	                        React2.createElement("div", { className: "lane-name-cell" }, subheader.name),
	                        subheader.engineers.map(engineer => (React2.createElement("div", { key: engineer.id, className: "engineer-name-cell" }, engineer.name)))))))))),
	                React2.createElement("div", { className: "timeline-container", ref: contentScrollRef },
	                    React2.createElement("div", { className: "timeline-content" }, headerSubheaderStructure.map(headerData => (React2.createElement("div", { key: headerData.headerId },
	                        React2.createElement("div", { className: "team-timeline-row" }, dateColumns.map((_, idx) => (React2.createElement("div", { key: idx, className: "team-timeline-cell" })))),
	                        headerData.subheaders.map(subheader => (React2.createElement("div", { key: `${headerData.headerId}-${subheader.name}` },
	                            React2.createElement("div", { className: "lane-timeline-row" }, dateColumns.map((_, idx) => (React2.createElement("div", { key: idx, className: "lane-timeline-cell" })))),
	                            subheader.engineers.map(engineer => (React2.createElement("div", { key: engineer.id, className: "engineer-timeline-row" }, dateColumns.map((col, idx) => {
	                                const shift = getShift(engineer.id, col.dateString);
	                                return (React2.createElement(DayCell, { key: `${engineer.id}-${idx}`, date: col.date, engineer: engineer, shift: shift, isToday: col.isToday, isWeekend: col.isWeekend, isSelected: isCellSelected(engineer.id, col.dateString), shiftsLoading: shiftsLoading, onDoubleClick: () => {
	                                        try {
	                                            if (shift) {
	                                                // Existing shift: edit it (same as context menu edit)
	                                                if (onEditShift) {
	                                                    onEditShift(shift);
	                                                }
	                                            }
	                                            else {
	                                                // Empty cell: create new shift
	                                                if (onCreateShift) {
	                                                    onCreateShift(engineer.id, col.dateString);
	                                                }
	                                            }
	                                        }
	                                        catch (error) {
	                                            console.error(`Error in onDoubleClick for ${engineer.name}:`, error);
	                                        }
	                                    }, onCellClick: e => handleCellClick(engineer.id, col.dateString, e.ctrlKey || e.metaKey, e.shiftKey), onContextMenu: handleCellContextMenu, readOnly: readOnly }));
	                            })))))))))))))),
	        React2.createElement("div", { ref: infiniteScrollRef, className: "sentinel", style: { height: "20px", visibility: "hidden" } }),
	        React2.createElement(ContextMenu, { visible: contextMenu.visible, x: contextMenu.x, y: contextMenu.y, options: contextMenu.options, onClose: closeContextMenu })));
	};
	// Export with error boundary for production resilience
	var ScheduleGrid$1 = withErrorBoundary(ScheduleGrid);

	const useShiftData = ({ engineersSource, shiftsSource, nameAttribute, headerAttribute, subheaderAttribute, startTimeAttribute, dayTypeAttribute, statusAttribute, spUserAssociation, shiftAssociation, shiftDateAttribute }) => {
	    const [dataState, setDataState] = React2.useState({
	        engineers: [],
	        shifts: [],
	        shiftsLoading: true,
	        error: null
	    });
	    // Validation helper
	    const validateConfiguration = React2.useCallback(() => {
	        if (!engineersSource) {
	            return { message: "Engineers data source is required", property: "engineers" };
	        }
	        if (engineersSource.status === "unavailable") {
	            return { message: "Engineers data source is unavailable", property: "engineers" };
	        }
	        if (!nameAttribute) {
	            return { message: "Name attribute is required for engineers", property: "nameAttribute" };
	        }
	        if (!headerAttribute) {
	            return { message: "Header attribute is required for engineers", property: "headerAttribute" };
	        }
	        // Validate shifts configuration if provided
	        if (shiftsSource && shiftsSource.status === "unavailable") {
	            return { message: "Shifts data source is unavailable", property: "shifts" };
	        }
	        if (shiftsSource && !startTimeAttribute) {
	            return {
	                message: "Start time attribute is required when shifts data source is provided",
	                property: "startTimeAttribute"
	            };
	        }
	        return null;
	    }, [engineersSource, shiftsSource, nameAttribute, headerAttribute, startTimeAttribute]);
	    // Transform Mendix engineers data with error handling
	    const transformedEngineers = React2.useMemo(() => {
	        try {
	            if (engineersSource.status !== "available" || !engineersSource.items) {
	                return [];
	            }
	            return engineersSource.items.map((item) => {
	                try {
	                    // Debug: Check attribute configuration (will be shown in main debug panel)
	                    // Store debug info to be displayed in main panel (no floating debug box)
	                    // Access SPUser properties through configured attributes
	                    const name = nameAttribute
	                        ? nameAttribute.get(item).status === "available"
	                            ? nameAttribute.get(item).value || "Unknown"
	                            : "Unknown"
	                        : "Unknown";
	                    const header = headerAttribute
	                        ? headerAttribute.get(item).status === "available"
	                            ? headerAttribute.get(item).value || "All Engineers"
	                            : "All Engineers"
	                        : "All Engineers";
	                    const subheader = subheaderAttribute
	                        ? subheaderAttribute.get(item).status === "available"
	                            ? subheaderAttribute.get(item).value || "General"
	                            : "General"
	                        : "General";
	                    return {
	                        id: item.id,
	                        name,
	                        header,
	                        subheader,
	                        mendixObject: item
	                    };
	                }
	                catch (error) {
	                    return {
	                        id: item.id,
	                        name: "Unknown",
	                        header: "Error",
	                        subheader: "General",
	                        mendixObject: item
	                    };
	                }
	            });
	        }
	        catch (error) {
	            return [];
	        }
	    }, [engineersSource, nameAttribute, headerAttribute, subheaderAttribute]);
	    // Transform Mendix shifts data with error handling
	    const transformedShifts = React2.useMemo(() => {
	        try {
	            if (!shiftsSource || shiftsSource.status !== "available" || !shiftsSource.items) {
	                return [];
	            }
	            // Debug counters (will be shown in debug panel if needed)
	            // let successfulAssociations = 0;
	            // let totalShifts = 0;
	            const shifts = shiftsSource.items
	                .map((item) => {
	                try {
	                    const startTime = startTimeAttribute?.get(item).value;
	                    const dayType = dayTypeAttribute?.get(item).value || "";
	                    const status = statusAttribute?.get(item).value;
	                    // Try to get the actual shift date from CalendarEvents_Shift/Shift/Date
	                    let shiftDate;
	                    if (shiftAssociation && shiftDateAttribute) {
	                        const shiftRef = shiftAssociation.get(item);
	                        if (shiftRef.status === "available" && shiftRef.value) {
	                            const shiftDateValue = shiftDateAttribute.get(shiftRef.value);
	                            if (shiftDateValue.status === "available" && shiftDateValue.value) {
	                                shiftDate = shiftDateValue.value;
	                            }
	                        }
	                    }
	                    // Debug: Association access (will be shown in main debug panel)
	                    // Try to get engineer ID through the SPUser association
	                    let engineerId;
	                    // Use the spUserAssociation to get the referenced SPUser
	                    if (spUserAssociation) {
	                        const spUserRef = spUserAssociation.get(item);
	                        if (spUserRef.status === "available" && spUserRef.value) {
	                            // Get the SPUser ID from the association
	                            engineerId = spUserRef.value.id;
	                            // successfulAssociations++;
	                            // Debug: Association successful (will be shown in main debug panel)
	                        }
	                    }
	                    // Fallback to shift ID if no association found
	                    if (!engineerId) {
	                        engineerId = item.id;
	                    }
	                    // totalShifts++;
	                    // Use shiftDate if available, otherwise fall back to startTime
	                    // If neither is available, skip this shift (don't show undefined events)
	                    const finalDate = shiftDate || startTime;
	                    if (!finalDate) {
	                        // Skip shifts without proper dates - don't show them
	                        return null;
	                    }
	                    return {
	                        id: item.id,
	                        date: finalDate.toISOString().split("T")[0],
	                        engineerId: engineerId || item.id,
	                        shift: dayType || "M",
	                        status,
	                        shiftDate: finalDate, // The actual shift date from CalendarEvents_Shift/Shift/Date
	                        mendixObject: item
	                    };
	                }
	                catch (error) {
	                    // Skip invalid shifts - don't show them with fake dates
	                    return null;
	                }
	            })
	                .filter((shift) => shift !== null);
	            // Debug: Association success rate (will be shown in main debug panel)
	            return shifts;
	        }
	        catch (error) {
	            return [];
	        }
	    }, [
	        shiftsSource,
	        startTimeAttribute,
	        dayTypeAttribute,
	        statusAttribute,
	        spUserAssociation,
	        shiftAssociation,
	        shiftDateAttribute
	    ]);
	    // Main data processing effect with validation
	    React2.useEffect(() => {
	        const validationError = validateConfiguration();
	        if (validationError) {
	            setDataState({
	                engineers: [],
	                shifts: [],
	                shiftsLoading: false,
	                error: validationError
	            });
	            return;
	        }
	        const shiftsLoading = shiftsSource?.status === "loading" || false;
	        setDataState({
	            engineers: transformedEngineers,
	            shifts: transformedShifts,
	            shiftsLoading,
	            error: null
	        });
	    }, [validateConfiguration, transformedEngineers, transformedShifts, engineersSource.status, shiftsSource?.status]);
	    // Enhanced helper methods with error handling
	    const getShiftsForEngineer = React2.useCallback((engineerId) => {
	        try {
	            return dataState.shifts.filter(shift => shift.engineerId === engineerId);
	        }
	        catch (error) {
	            return [];
	        }
	    }, [dataState.shifts]);
	    const getEngineersByTeam = React2.useCallback(() => {
	        try {
	            const headerGroups = {};
	            dataState.engineers.forEach(engineer => {
	                const headerName = engineer.header;
	                if (!headerGroups[headerName]) {
	                    headerGroups[headerName] = [];
	                }
	                headerGroups[headerName].push(engineer);
	            });
	            return headerGroups;
	        }
	        catch (error) {
	            return {};
	        }
	    }, [dataState.engineers]);
	    const getShiftForDate = React2.useCallback((engineerId, date) => {
	        try {
	            return dataState.shifts.find(shift => shift.engineerId === engineerId && shift.date === date);
	        }
	        catch (error) {
	            return undefined;
	        }
	    }, [dataState.shifts]);
	    const updateShift = React2.useCallback((shiftId, updates) => {
	        try {
	            setDataState(prev => ({
	                ...prev,
	                shifts: prev.shifts.map(shift => (shift.id === shiftId ? { ...shift, ...updates } : shift))
	            }));
	        }
	        catch (error) {
	            // Silently fail
	        }
	    }, []);
	    const getEngineerById = React2.useCallback((engineerId) => {
	        try {
	            return dataState.engineers.find(engineer => engineer.id === engineerId);
	        }
	        catch (error) {
	            return undefined;
	        }
	    }, [dataState.engineers]);
	    const getShiftsByDateRange = React2.useCallback((startDate, endDate) => {
	        try {
	            return dataState.shifts.filter(shift => shift.date >= startDate && shift.date <= endDate);
	        }
	        catch (error) {
	            return [];
	        }
	    }, [dataState.shifts]);
	    const refreshData = React2.useCallback(() => {
	        try {
	            // Force re-evaluation of data sources
	            setDataState(prev => ({ ...prev, loading: true, error: null }));
	            // In a real implementation, this would trigger data refresh
	            setTimeout(() => {
	                const validationError = validateConfiguration();
	                setDataState(prev => ({
	                    ...prev,
	                    loading: false,
	                    engineersLoading: false,
	                    shiftsLoading: false,
	                    error: validationError
	                }));
	            }, 100);
	        }
	        catch (error) {
	            setDataState(prev => ({
	                ...prev,
	                loading: false,
	                error: { message: "Failed to refresh data" }
	            }));
	        }
	    }, [validateConfiguration]);
	    // Calculate loading state when needed
	    const engineersLoading = engineersSource.status === "loading";
	    const loading = engineersLoading || dataState.shiftsLoading;
	    return {
	        engineers: dataState.engineers,
	        shifts: dataState.shifts,
	        loading,
	        shiftsLoading: dataState.shiftsLoading,
	        error: dataState.error,
	        getShiftsForEngineer,
	        getEngineersByTeam,
	        getShiftForDate,
	        updateShift,
	        getEngineerById,
	        getShiftsByDateRange,
	        refreshData,
	        debugInfo: {
	            attributesConfigured: {
	                name: !!nameAttribute,
	                header: !!headerAttribute,
	                subheader: !!subheaderAttribute,
	                spUserAssociation: !!spUserAssociation,
	                shiftAssociation: !!shiftAssociation,
	                shiftDate: !!shiftDateAttribute
	            }
	        }
	    };
	};

	function ShiftScheduler({ name, class: className, style, tabIndex, engineers, shifts, nameAttribute, headerAttribute, subheaderAttribute, showDebugInfo, startTimeAttribute, endTimeAttribute: _endTimeAttribute, dayTypeAttribute, eventTypeAttribute: _eventTypeAttribute, statusAttribute, spUserAssociation, spUserDatasource: _spUserDatasource, shiftAssociation, shiftDatasource: _shiftDatasource, shiftDateAttribute, onEditShift, onCreateShift, onDeleteShift, onBatchCreate, onBatchEdit, onBatchDelete }) {
	    const { engineers: engineerData, shifts: shiftsData, loading, shiftsLoading, error, getShiftsForEngineer, getEngineersByTeam, debugInfo } = useShiftData({
	        engineersSource: engineers,
	        shiftsSource: shifts,
	        nameAttribute,
	        headerAttribute,
	        subheaderAttribute,
	        startTimeAttribute,
	        dayTypeAttribute,
	        statusAttribute,
	        spUserAssociation,
	        shiftAssociation,
	        shiftDateAttribute
	    });
	    const handleEditShift = React2.useCallback((_shift) => {
	        if (onEditShift && onEditShift.canExecute && !onEditShift.isExecuting) {
	            onEditShift.execute();
	        }
	    }, [onEditShift]);
	    // Context menu action handlers
	    const handleCreateShift = React2.useCallback((_engineerId, _date) => {
	        if (onCreateShift && onCreateShift.canExecute && !onCreateShift.isExecuting) {
	            onCreateShift.execute();
	        }
	    }, [onCreateShift]);
	    const handleDeleteShift = React2.useCallback((_shift) => {
	        if (onDeleteShift && onDeleteShift.canExecute && !onDeleteShift.isExecuting) {
	            onDeleteShift.execute();
	        }
	    }, [onDeleteShift]);
	    const handleBatchEdit = React2.useCallback((selectedCells) => {
	        if (onBatchEdit && onBatchEdit.canExecute && !onBatchEdit.isExecuting) {
	            // Get event IDs for cells that have shifts
	            const eventIds = selectedCells
	                .map(cell => {
	                const shift = shiftsData.find(s => s.engineerId === cell.engineerId && s.date === cell.date);
	                return shift?.id;
	            })
	                .filter(Boolean)
	                .join(",");
	            if (eventIds) {
	                onBatchEdit.execute();
	            }
	        }
	    }, [onBatchEdit, shiftsData]);
	    const handleBatchDelete = React2.useCallback((selectedCells) => {
	        if (onBatchDelete && onBatchDelete.canExecute && !onBatchDelete.isExecuting) {
	            // Get event IDs for cells that have shifts
	            const eventIds = selectedCells
	                .map(cell => {
	                const shift = shiftsData.find(s => s.engineerId === cell.engineerId && s.date === cell.date);
	                return shift?.id;
	            })
	                .filter(Boolean)
	                .join(",");
	            if (eventIds) {
	                onBatchDelete.execute();
	            }
	        }
	    }, [onBatchDelete, shiftsData]);
	    const handleBatchCreate = React2.useCallback((selectedCells) => {
	        if (onBatchCreate && onBatchCreate.canExecute && !onBatchCreate.isExecuting) {
	            // Get empty cells (cells without shifts)
	            const emptyCells = selectedCells.filter(cell => {
	                const shift = shiftsData.find(s => s.engineerId === cell.engineerId && s.date === cell.date);
	                return !shift;
	            });
	            if (emptyCells.length > 0) {
	                onBatchCreate.execute();
	            }
	        }
	    }, [onBatchCreate, shiftsData]);
	    // Error state
	    if (error) {
	        return (React2.createElement("div", { className: `shift-scheduler ${className}`, style: style, tabIndex: tabIndex },
	            React2.createElement("div", { className: "shift-scheduler-error" },
	                React2.createElement("h3", null, "\u26A0\uFE0F Configuration Error"),
	                React2.createElement("p", null, error.message),
	                error.property && (React2.createElement("p", null,
	                    React2.createElement("small", null,
	                        "Check the ",
	                        error.property,
	                        " property in the widget configuration."))))));
	    }
	    // Loading state - only show if engineers haven't loaded yet
	    if (loading && (!engineerData || engineerData.length === 0)) {
	        return (React2.createElement("div", { className: `shift-scheduler ${className}`, style: style, tabIndex: tabIndex },
	            React2.createElement("div", { className: "shift-scheduler-loading" },
	                React2.createElement("div", { className: "loading-spinner" }),
	                React2.createElement("p", null, "Loading engineers..."))));
	    }
	    // Empty state
	    if (!engineerData || engineerData.length === 0) {
	        return (React2.createElement("div", { className: `shift-scheduler ${className}`, style: style, tabIndex: tabIndex },
	            React2.createElement("div", { className: "shift-scheduler-empty" },
	                React2.createElement("h3", null, "\uD83D\uDCC5 No Data Available"),
	                React2.createElement("p", null, "No engineers found. Please check your data source configuration."))));
	    }
	    return (React2.createElement("div", { className: `shift-scheduler ${className}`, style: style, tabIndex: tabIndex, "data-widget-name": name },
	        React2.createElement(ScheduleGrid$1, { engineers: engineerData, shifts: shiftsData, getShiftsForEngineer: getShiftsForEngineer, getEngineersByTeam: getEngineersByTeam, onEditShift: handleEditShift, onCreateShift: handleCreateShift, onDeleteShift: handleDeleteShift, onBatchCreate: handleBatchCreate, onBatchEdit: handleBatchEdit, onBatchDelete: handleBatchDelete, showDebugInfo: showDebugInfo, debugInfo: debugInfo, shiftsLoading: shiftsLoading })));
	}

	exports.ShiftScheduler = ShiftScheduler;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hpZnRTY2hlZHVsZXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9kYXlqcy9kYXlqcy5taW4uanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZGF5anMvcGx1Z2luL3V0Yy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9kYXlqcy9wbHVnaW4vdGltZXpvbmUuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZGF5anMvcGx1Z2luL2lzU2FtZU9yQmVmb3JlLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2RheWpzL3BsdWdpbi9pc1NhbWVPckFmdGVyLmpzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL2RhdGVIZWxwZXJzLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2hvb2tzL3VzZVNjcm9sbE5hdmlnYXRpb24udHMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvaG9va3MvdXNlVGVhbUFjY2Vzcy50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0xvYWRpbmdTdGF0ZXMudHN4IiwiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL3NoaWZ0SGVscGVycy50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0RheUNlbGwudHN4IiwiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvQ29udGV4dE1lbnUudHN4IiwiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvU2NoZWR1bGVHcmlkLnRzeCIsIi4uLy4uLy4uLy4uLy4uL3NyYy9ob29rcy91c2VTaGlmdERhdGEudHMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvU2hpZnRTY2hlZHVsZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIiFmdW5jdGlvbih0LGUpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPWUoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGUpOih0PVwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6dHx8c2VsZikuZGF5anM9ZSgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciB0PTFlMyxlPTZlNCxuPTM2ZTUscj1cIm1pbGxpc2Vjb25kXCIsaT1cInNlY29uZFwiLHM9XCJtaW51dGVcIix1PVwiaG91clwiLGE9XCJkYXlcIixvPVwid2Vla1wiLGM9XCJtb250aFwiLGY9XCJxdWFydGVyXCIsaD1cInllYXJcIixkPVwiZGF0ZVwiLGw9XCJJbnZhbGlkIERhdGVcIiwkPS9eKFxcZHs0fSlbLS9dPyhcXGR7MSwyfSk/Wy0vXT8oXFxkezAsMn0pW1R0XFxzXSooXFxkezEsMn0pPzo/KFxcZHsxLDJ9KT86PyhcXGR7MSwyfSk/Wy46XT8oXFxkKyk/JC8seT0vXFxbKFteXFxdXSspXXxZezEsNH18TXsxLDR9fER7MSwyfXxkezEsNH18SHsxLDJ9fGh7MSwyfXxhfEF8bXsxLDJ9fHN7MSwyfXxaezEsMn18U1NTL2csTT17bmFtZTpcImVuXCIsd2Vla2RheXM6XCJTdW5kYXlfTW9uZGF5X1R1ZXNkYXlfV2VkbmVzZGF5X1RodXJzZGF5X0ZyaWRheV9TYXR1cmRheVwiLnNwbGl0KFwiX1wiKSxtb250aHM6XCJKYW51YXJ5X0ZlYnJ1YXJ5X01hcmNoX0FwcmlsX01heV9KdW5lX0p1bHlfQXVndXN0X1NlcHRlbWJlcl9PY3RvYmVyX05vdmVtYmVyX0RlY2VtYmVyXCIuc3BsaXQoXCJfXCIpLG9yZGluYWw6ZnVuY3Rpb24odCl7dmFyIGU9W1widGhcIixcInN0XCIsXCJuZFwiLFwicmRcIl0sbj10JTEwMDtyZXR1cm5cIltcIit0KyhlWyhuLTIwKSUxMF18fGVbbl18fGVbMF0pK1wiXVwifX0sbT1mdW5jdGlvbih0LGUsbil7dmFyIHI9U3RyaW5nKHQpO3JldHVybiFyfHxyLmxlbmd0aD49ZT90OlwiXCIrQXJyYXkoZSsxLXIubGVuZ3RoKS5qb2luKG4pK3R9LHY9e3M6bSx6OmZ1bmN0aW9uKHQpe3ZhciBlPS10LnV0Y09mZnNldCgpLG49TWF0aC5hYnMoZSkscj1NYXRoLmZsb29yKG4vNjApLGk9biU2MDtyZXR1cm4oZTw9MD9cIitcIjpcIi1cIikrbShyLDIsXCIwXCIpK1wiOlwiK20oaSwyLFwiMFwiKX0sbTpmdW5jdGlvbiB0KGUsbil7aWYoZS5kYXRlKCk8bi5kYXRlKCkpcmV0dXJuLXQobixlKTt2YXIgcj0xMioobi55ZWFyKCktZS55ZWFyKCkpKyhuLm1vbnRoKCktZS5tb250aCgpKSxpPWUuY2xvbmUoKS5hZGQocixjKSxzPW4taTwwLHU9ZS5jbG9uZSgpLmFkZChyKyhzPy0xOjEpLGMpO3JldHVybisoLShyKyhuLWkpLyhzP2ktdTp1LWkpKXx8MCl9LGE6ZnVuY3Rpb24odCl7cmV0dXJuIHQ8MD9NYXRoLmNlaWwodCl8fDA6TWF0aC5mbG9vcih0KX0scDpmdW5jdGlvbih0KXtyZXR1cm57TTpjLHk6aCx3Om8sZDphLEQ6ZCxoOnUsbTpzLHM6aSxtczpyLFE6Zn1bdF18fFN0cmluZyh0fHxcIlwiKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL3MkLyxcIlwiKX0sdTpmdW5jdGlvbih0KXtyZXR1cm4gdm9pZCAwPT09dH19LGc9XCJlblwiLEQ9e307RFtnXT1NO3ZhciBwPVwiJGlzRGF5anNPYmplY3RcIixTPWZ1bmN0aW9uKHQpe3JldHVybiB0IGluc3RhbmNlb2YgX3x8ISghdHx8IXRbcF0pfSx3PWZ1bmN0aW9uIHQoZSxuLHIpe3ZhciBpO2lmKCFlKXJldHVybiBnO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlKXt2YXIgcz1lLnRvTG93ZXJDYXNlKCk7RFtzXSYmKGk9cyksbiYmKERbc109bixpPXMpO3ZhciB1PWUuc3BsaXQoXCItXCIpO2lmKCFpJiZ1Lmxlbmd0aD4xKXJldHVybiB0KHVbMF0pfWVsc2V7dmFyIGE9ZS5uYW1lO0RbYV09ZSxpPWF9cmV0dXJuIXImJmkmJihnPWkpLGl8fCFyJiZnfSxPPWZ1bmN0aW9uKHQsZSl7aWYoUyh0KSlyZXR1cm4gdC5jbG9uZSgpO3ZhciBuPVwib2JqZWN0XCI9PXR5cGVvZiBlP2U6e307cmV0dXJuIG4uZGF0ZT10LG4uYXJncz1hcmd1bWVudHMsbmV3IF8obil9LGI9djtiLmw9dyxiLmk9UyxiLnc9ZnVuY3Rpb24odCxlKXtyZXR1cm4gTyh0LHtsb2NhbGU6ZS4kTCx1dGM6ZS4kdSx4OmUuJHgsJG9mZnNldDplLiRvZmZzZXR9KX07dmFyIF89ZnVuY3Rpb24oKXtmdW5jdGlvbiBNKHQpe3RoaXMuJEw9dyh0LmxvY2FsZSxudWxsLCEwKSx0aGlzLnBhcnNlKHQpLHRoaXMuJHg9dGhpcy4keHx8dC54fHx7fSx0aGlzW3BdPSEwfXZhciBtPU0ucHJvdG90eXBlO3JldHVybiBtLnBhcnNlPWZ1bmN0aW9uKHQpe3RoaXMuJGQ9ZnVuY3Rpb24odCl7dmFyIGU9dC5kYXRlLG49dC51dGM7aWYobnVsbD09PWUpcmV0dXJuIG5ldyBEYXRlKE5hTik7aWYoYi51KGUpKXJldHVybiBuZXcgRGF0ZTtpZihlIGluc3RhbmNlb2YgRGF0ZSlyZXR1cm4gbmV3IERhdGUoZSk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUmJiEvWiQvaS50ZXN0KGUpKXt2YXIgcj1lLm1hdGNoKCQpO2lmKHIpe3ZhciBpPXJbMl0tMXx8MCxzPShyWzddfHxcIjBcIikuc3Vic3RyaW5nKDAsMyk7cmV0dXJuIG4/bmV3IERhdGUoRGF0ZS5VVEMoclsxXSxpLHJbM118fDEscls0XXx8MCxyWzVdfHwwLHJbNl18fDAscykpOm5ldyBEYXRlKHJbMV0saSxyWzNdfHwxLHJbNF18fDAscls1XXx8MCxyWzZdfHwwLHMpfX1yZXR1cm4gbmV3IERhdGUoZSl9KHQpLHRoaXMuaW5pdCgpfSxtLmluaXQ9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLiRkO3RoaXMuJHk9dC5nZXRGdWxsWWVhcigpLHRoaXMuJE09dC5nZXRNb250aCgpLHRoaXMuJEQ9dC5nZXREYXRlKCksdGhpcy4kVz10LmdldERheSgpLHRoaXMuJEg9dC5nZXRIb3VycygpLHRoaXMuJG09dC5nZXRNaW51dGVzKCksdGhpcy4kcz10LmdldFNlY29uZHMoKSx0aGlzLiRtcz10LmdldE1pbGxpc2Vjb25kcygpfSxtLiR1dGlscz1mdW5jdGlvbigpe3JldHVybiBifSxtLmlzVmFsaWQ9ZnVuY3Rpb24oKXtyZXR1cm4hKHRoaXMuJGQudG9TdHJpbmcoKT09PWwpfSxtLmlzU2FtZT1mdW5jdGlvbih0LGUpe3ZhciBuPU8odCk7cmV0dXJuIHRoaXMuc3RhcnRPZihlKTw9biYmbjw9dGhpcy5lbmRPZihlKX0sbS5pc0FmdGVyPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIE8odCk8dGhpcy5zdGFydE9mKGUpfSxtLmlzQmVmb3JlPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuZW5kT2YoZSk8Tyh0KX0sbS4kZz1mdW5jdGlvbih0LGUsbil7cmV0dXJuIGIudSh0KT90aGlzW2VdOnRoaXMuc2V0KG4sdCl9LG0udW5peD1mdW5jdGlvbigpe3JldHVybiBNYXRoLmZsb29yKHRoaXMudmFsdWVPZigpLzFlMyl9LG0udmFsdWVPZj1mdW5jdGlvbigpe3JldHVybiB0aGlzLiRkLmdldFRpbWUoKX0sbS5zdGFydE9mPWZ1bmN0aW9uKHQsZSl7dmFyIG49dGhpcyxyPSEhYi51KGUpfHxlLGY9Yi5wKHQpLGw9ZnVuY3Rpb24odCxlKXt2YXIgaT1iLncobi4kdT9EYXRlLlVUQyhuLiR5LGUsdCk6bmV3IERhdGUobi4keSxlLHQpLG4pO3JldHVybiByP2k6aS5lbmRPZihhKX0sJD1mdW5jdGlvbih0LGUpe3JldHVybiBiLncobi50b0RhdGUoKVt0XS5hcHBseShuLnRvRGF0ZShcInNcIiksKHI/WzAsMCwwLDBdOlsyMyw1OSw1OSw5OTldKS5zbGljZShlKSksbil9LHk9dGhpcy4kVyxNPXRoaXMuJE0sbT10aGlzLiRELHY9XCJzZXRcIisodGhpcy4kdT9cIlVUQ1wiOlwiXCIpO3N3aXRjaChmKXtjYXNlIGg6cmV0dXJuIHI/bCgxLDApOmwoMzEsMTEpO2Nhc2UgYzpyZXR1cm4gcj9sKDEsTSk6bCgwLE0rMSk7Y2FzZSBvOnZhciBnPXRoaXMuJGxvY2FsZSgpLndlZWtTdGFydHx8MCxEPSh5PGc/eSs3OnkpLWc7cmV0dXJuIGwocj9tLUQ6bSsoNi1EKSxNKTtjYXNlIGE6Y2FzZSBkOnJldHVybiAkKHYrXCJIb3Vyc1wiLDApO2Nhc2UgdTpyZXR1cm4gJCh2K1wiTWludXRlc1wiLDEpO2Nhc2UgczpyZXR1cm4gJCh2K1wiU2Vjb25kc1wiLDIpO2Nhc2UgaTpyZXR1cm4gJCh2K1wiTWlsbGlzZWNvbmRzXCIsMyk7ZGVmYXVsdDpyZXR1cm4gdGhpcy5jbG9uZSgpfX0sbS5lbmRPZj1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5zdGFydE9mKHQsITEpfSxtLiRzZXQ9ZnVuY3Rpb24odCxlKXt2YXIgbixvPWIucCh0KSxmPVwic2V0XCIrKHRoaXMuJHU/XCJVVENcIjpcIlwiKSxsPShuPXt9LG5bYV09ZitcIkRhdGVcIixuW2RdPWYrXCJEYXRlXCIsbltjXT1mK1wiTW9udGhcIixuW2hdPWYrXCJGdWxsWWVhclwiLG5bdV09ZitcIkhvdXJzXCIsbltzXT1mK1wiTWludXRlc1wiLG5baV09ZitcIlNlY29uZHNcIixuW3JdPWYrXCJNaWxsaXNlY29uZHNcIixuKVtvXSwkPW89PT1hP3RoaXMuJEQrKGUtdGhpcy4kVyk6ZTtpZihvPT09Y3x8bz09PWgpe3ZhciB5PXRoaXMuY2xvbmUoKS5zZXQoZCwxKTt5LiRkW2xdKCQpLHkuaW5pdCgpLHRoaXMuJGQ9eS5zZXQoZCxNYXRoLm1pbih0aGlzLiRELHkuZGF5c0luTW9udGgoKSkpLiRkfWVsc2UgbCYmdGhpcy4kZFtsXSgkKTtyZXR1cm4gdGhpcy5pbml0KCksdGhpc30sbS5zZXQ9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdGhpcy5jbG9uZSgpLiRzZXQodCxlKX0sbS5nZXQ9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXNbYi5wKHQpXSgpfSxtLmFkZD1mdW5jdGlvbihyLGYpe3ZhciBkLGw9dGhpcztyPU51bWJlcihyKTt2YXIgJD1iLnAoZikseT1mdW5jdGlvbih0KXt2YXIgZT1PKGwpO3JldHVybiBiLncoZS5kYXRlKGUuZGF0ZSgpK01hdGgucm91bmQodCpyKSksbCl9O2lmKCQ9PT1jKXJldHVybiB0aGlzLnNldChjLHRoaXMuJE0rcik7aWYoJD09PWgpcmV0dXJuIHRoaXMuc2V0KGgsdGhpcy4keStyKTtpZigkPT09YSlyZXR1cm4geSgxKTtpZigkPT09bylyZXR1cm4geSg3KTt2YXIgTT0oZD17fSxkW3NdPWUsZFt1XT1uLGRbaV09dCxkKVskXXx8MSxtPXRoaXMuJGQuZ2V0VGltZSgpK3IqTTtyZXR1cm4gYi53KG0sdGhpcyl9LG0uc3VidHJhY3Q9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdGhpcy5hZGQoLTEqdCxlKX0sbS5mb3JtYXQ9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcyxuPXRoaXMuJGxvY2FsZSgpO2lmKCF0aGlzLmlzVmFsaWQoKSlyZXR1cm4gbi5pbnZhbGlkRGF0ZXx8bDt2YXIgcj10fHxcIllZWVktTU0tRERUSEg6bW06c3NaXCIsaT1iLnoodGhpcykscz10aGlzLiRILHU9dGhpcy4kbSxhPXRoaXMuJE0sbz1uLndlZWtkYXlzLGM9bi5tb250aHMsZj1uLm1lcmlkaWVtLGg9ZnVuY3Rpb24odCxuLGkscyl7cmV0dXJuIHQmJih0W25dfHx0KGUscikpfHxpW25dLnNsaWNlKDAscyl9LGQ9ZnVuY3Rpb24odCl7cmV0dXJuIGIucyhzJTEyfHwxMix0LFwiMFwiKX0sJD1mfHxmdW5jdGlvbih0LGUsbil7dmFyIHI9dDwxMj9cIkFNXCI6XCJQTVwiO3JldHVybiBuP3IudG9Mb3dlckNhc2UoKTpyfTtyZXR1cm4gci5yZXBsYWNlKHksKGZ1bmN0aW9uKHQscil7cmV0dXJuIHJ8fGZ1bmN0aW9uKHQpe3N3aXRjaCh0KXtjYXNlXCJZWVwiOnJldHVybiBTdHJpbmcoZS4keSkuc2xpY2UoLTIpO2Nhc2VcIllZWVlcIjpyZXR1cm4gYi5zKGUuJHksNCxcIjBcIik7Y2FzZVwiTVwiOnJldHVybiBhKzE7Y2FzZVwiTU1cIjpyZXR1cm4gYi5zKGErMSwyLFwiMFwiKTtjYXNlXCJNTU1cIjpyZXR1cm4gaChuLm1vbnRoc1Nob3J0LGEsYywzKTtjYXNlXCJNTU1NXCI6cmV0dXJuIGgoYyxhKTtjYXNlXCJEXCI6cmV0dXJuIGUuJEQ7Y2FzZVwiRERcIjpyZXR1cm4gYi5zKGUuJEQsMixcIjBcIik7Y2FzZVwiZFwiOnJldHVybiBTdHJpbmcoZS4kVyk7Y2FzZVwiZGRcIjpyZXR1cm4gaChuLndlZWtkYXlzTWluLGUuJFcsbywyKTtjYXNlXCJkZGRcIjpyZXR1cm4gaChuLndlZWtkYXlzU2hvcnQsZS4kVyxvLDMpO2Nhc2VcImRkZGRcIjpyZXR1cm4gb1tlLiRXXTtjYXNlXCJIXCI6cmV0dXJuIFN0cmluZyhzKTtjYXNlXCJISFwiOnJldHVybiBiLnMocywyLFwiMFwiKTtjYXNlXCJoXCI6cmV0dXJuIGQoMSk7Y2FzZVwiaGhcIjpyZXR1cm4gZCgyKTtjYXNlXCJhXCI6cmV0dXJuICQocyx1LCEwKTtjYXNlXCJBXCI6cmV0dXJuICQocyx1LCExKTtjYXNlXCJtXCI6cmV0dXJuIFN0cmluZyh1KTtjYXNlXCJtbVwiOnJldHVybiBiLnModSwyLFwiMFwiKTtjYXNlXCJzXCI6cmV0dXJuIFN0cmluZyhlLiRzKTtjYXNlXCJzc1wiOnJldHVybiBiLnMoZS4kcywyLFwiMFwiKTtjYXNlXCJTU1NcIjpyZXR1cm4gYi5zKGUuJG1zLDMsXCIwXCIpO2Nhc2VcIlpcIjpyZXR1cm4gaX1yZXR1cm4gbnVsbH0odCl8fGkucmVwbGFjZShcIjpcIixcIlwiKX0pKX0sbS51dGNPZmZzZXQ9ZnVuY3Rpb24oKXtyZXR1cm4gMTUqLU1hdGgucm91bmQodGhpcy4kZC5nZXRUaW1lem9uZU9mZnNldCgpLzE1KX0sbS5kaWZmPWZ1bmN0aW9uKHIsZCxsKXt2YXIgJCx5PXRoaXMsTT1iLnAoZCksbT1PKHIpLHY9KG0udXRjT2Zmc2V0KCktdGhpcy51dGNPZmZzZXQoKSkqZSxnPXRoaXMtbSxEPWZ1bmN0aW9uKCl7cmV0dXJuIGIubSh5LG0pfTtzd2l0Y2goTSl7Y2FzZSBoOiQ9RCgpLzEyO2JyZWFrO2Nhc2UgYzokPUQoKTticmVhaztjYXNlIGY6JD1EKCkvMzticmVhaztjYXNlIG86JD0oZy12KS82MDQ4ZTU7YnJlYWs7Y2FzZSBhOiQ9KGctdikvODY0ZTU7YnJlYWs7Y2FzZSB1OiQ9Zy9uO2JyZWFrO2Nhc2UgczokPWcvZTticmVhaztjYXNlIGk6JD1nL3Q7YnJlYWs7ZGVmYXVsdDokPWd9cmV0dXJuIGw/JDpiLmEoJCl9LG0uZGF5c0luTW9udGg9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lbmRPZihjKS4kRH0sbS4kbG9jYWxlPWZ1bmN0aW9uKCl7cmV0dXJuIERbdGhpcy4kTF19LG0ubG9jYWxlPWZ1bmN0aW9uKHQsZSl7aWYoIXQpcmV0dXJuIHRoaXMuJEw7dmFyIG49dGhpcy5jbG9uZSgpLHI9dyh0LGUsITApO3JldHVybiByJiYobi4kTD1yKSxufSxtLmNsb25lPWZ1bmN0aW9uKCl7cmV0dXJuIGIudyh0aGlzLiRkLHRoaXMpfSxtLnRvRGF0ZT1mdW5jdGlvbigpe3JldHVybiBuZXcgRGF0ZSh0aGlzLnZhbHVlT2YoKSl9LG0udG9KU09OPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuaXNWYWxpZCgpP3RoaXMudG9JU09TdHJpbmcoKTpudWxsfSxtLnRvSVNPU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJGQudG9JU09TdHJpbmcoKX0sbS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLiRkLnRvVVRDU3RyaW5nKCl9LE19KCksaz1fLnByb3RvdHlwZTtyZXR1cm4gTy5wcm90b3R5cGU9ayxbW1wiJG1zXCIscl0sW1wiJHNcIixpXSxbXCIkbVwiLHNdLFtcIiRIXCIsdV0sW1wiJFdcIixhXSxbXCIkTVwiLGNdLFtcIiR5XCIsaF0sW1wiJERcIixkXV0uZm9yRWFjaCgoZnVuY3Rpb24odCl7a1t0WzFdXT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy4kZyhlLHRbMF0sdFsxXSl9fSkpLE8uZXh0ZW5kPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQuJGl8fCh0KGUsXyxPKSx0LiRpPSEwKSxPfSxPLmxvY2FsZT13LE8uaXNEYXlqcz1TLE8udW5peD1mdW5jdGlvbih0KXtyZXR1cm4gTygxZTMqdCl9LE8uZW49RFtnXSxPLkxzPUQsTy5wPXt9LE99KSk7IiwiIWZ1bmN0aW9uKHQsaSl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9aSgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoaSk6KHQ9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczp0fHxzZWxmKS5kYXlqc19wbHVnaW5fdXRjPWkoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgdD1cIm1pbnV0ZVwiLGk9L1srLV1cXGRcXGQoPzo6P1xcZFxcZCk/L2csZT0vKFsrLV18XFxkXFxkKS9nO3JldHVybiBmdW5jdGlvbihzLGYsbil7dmFyIHU9Zi5wcm90b3R5cGU7bi51dGM9ZnVuY3Rpb24odCl7dmFyIGk9e2RhdGU6dCx1dGM6ITAsYXJnczphcmd1bWVudHN9O3JldHVybiBuZXcgZihpKX0sdS51dGM9ZnVuY3Rpb24oaSl7dmFyIGU9bih0aGlzLnRvRGF0ZSgpLHtsb2NhbGU6dGhpcy4kTCx1dGM6ITB9KTtyZXR1cm4gaT9lLmFkZCh0aGlzLnV0Y09mZnNldCgpLHQpOmV9LHUubG9jYWw9ZnVuY3Rpb24oKXtyZXR1cm4gbih0aGlzLnRvRGF0ZSgpLHtsb2NhbGU6dGhpcy4kTCx1dGM6ITF9KX07dmFyIG89dS5wYXJzZTt1LnBhcnNlPWZ1bmN0aW9uKHQpe3QudXRjJiYodGhpcy4kdT0hMCksdGhpcy4kdXRpbHMoKS51KHQuJG9mZnNldCl8fCh0aGlzLiRvZmZzZXQ9dC4kb2Zmc2V0KSxvLmNhbGwodGhpcyx0KX07dmFyIHI9dS5pbml0O3UuaW5pdD1mdW5jdGlvbigpe2lmKHRoaXMuJHUpe3ZhciB0PXRoaXMuJGQ7dGhpcy4keT10LmdldFVUQ0Z1bGxZZWFyKCksdGhpcy4kTT10LmdldFVUQ01vbnRoKCksdGhpcy4kRD10LmdldFVUQ0RhdGUoKSx0aGlzLiRXPXQuZ2V0VVRDRGF5KCksdGhpcy4kSD10LmdldFVUQ0hvdXJzKCksdGhpcy4kbT10LmdldFVUQ01pbnV0ZXMoKSx0aGlzLiRzPXQuZ2V0VVRDU2Vjb25kcygpLHRoaXMuJG1zPXQuZ2V0VVRDTWlsbGlzZWNvbmRzKCl9ZWxzZSByLmNhbGwodGhpcyl9O3ZhciBhPXUudXRjT2Zmc2V0O3UudXRjT2Zmc2V0PWZ1bmN0aW9uKHMsZil7dmFyIG49dGhpcy4kdXRpbHMoKS51O2lmKG4ocykpcmV0dXJuIHRoaXMuJHU/MDpuKHRoaXMuJG9mZnNldCk/YS5jYWxsKHRoaXMpOnRoaXMuJG9mZnNldDtpZihcInN0cmluZ1wiPT10eXBlb2YgcyYmKHM9ZnVuY3Rpb24odCl7dm9pZCAwPT09dCYmKHQ9XCJcIik7dmFyIHM9dC5tYXRjaChpKTtpZighcylyZXR1cm4gbnVsbDt2YXIgZj0oXCJcIitzWzBdKS5tYXRjaChlKXx8W1wiLVwiLDAsMF0sbj1mWzBdLHU9NjAqK2ZbMV0rICtmWzJdO3JldHVybiAwPT09dT8wOlwiK1wiPT09bj91Oi11fShzKSxudWxsPT09cykpcmV0dXJuIHRoaXM7dmFyIHU9TWF0aC5hYnMocyk8PTE2PzYwKnM6cyxvPXRoaXM7aWYoZilyZXR1cm4gby4kb2Zmc2V0PXUsby4kdT0wPT09cyxvO2lmKDAhPT1zKXt2YXIgcj10aGlzLiR1P3RoaXMudG9EYXRlKCkuZ2V0VGltZXpvbmVPZmZzZXQoKTotMSp0aGlzLnV0Y09mZnNldCgpOyhvPXRoaXMubG9jYWwoKS5hZGQodStyLHQpKS4kb2Zmc2V0PXUsby4keC4kbG9jYWxPZmZzZXQ9cn1lbHNlIG89dGhpcy51dGMoKTtyZXR1cm4gb307dmFyIGg9dS5mb3JtYXQ7dS5mb3JtYXQ9ZnVuY3Rpb24odCl7dmFyIGk9dHx8KHRoaXMuJHU/XCJZWVlZLU1NLUREVEhIOm1tOnNzW1pdXCI6XCJcIik7cmV0dXJuIGguY2FsbCh0aGlzLGkpfSx1LnZhbHVlT2Y9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLiR1dGlscygpLnUodGhpcy4kb2Zmc2V0KT8wOnRoaXMuJG9mZnNldCsodGhpcy4keC4kbG9jYWxPZmZzZXR8fHRoaXMuJGQuZ2V0VGltZXpvbmVPZmZzZXQoKSk7cmV0dXJuIHRoaXMuJGQudmFsdWVPZigpLTZlNCp0fSx1LmlzVVRDPWZ1bmN0aW9uKCl7cmV0dXJuISF0aGlzLiR1fSx1LnRvSVNPU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudG9EYXRlKCkudG9JU09TdHJpbmcoKX0sdS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLnRvRGF0ZSgpLnRvVVRDU3RyaW5nKCl9O3ZhciBsPXUudG9EYXRlO3UudG9EYXRlPWZ1bmN0aW9uKHQpe3JldHVyblwic1wiPT09dCYmdGhpcy4kb2Zmc2V0P24odGhpcy5mb3JtYXQoXCJZWVlZLU1NLUREIEhIOm1tOnNzOlNTU1wiKSkudG9EYXRlKCk6bC5jYWxsKHRoaXMpfTt2YXIgYz11LmRpZmY7dS5kaWZmPWZ1bmN0aW9uKHQsaSxlKXtpZih0JiZ0aGlzLiR1PT09dC4kdSlyZXR1cm4gYy5jYWxsKHRoaXMsdCxpLGUpO3ZhciBzPXRoaXMubG9jYWwoKSxmPW4odCkubG9jYWwoKTtyZXR1cm4gYy5jYWxsKHMsZixpLGUpfX19KSk7IiwiIWZ1bmN0aW9uKHQsZSl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9ZSgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZSk6KHQ9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczp0fHxzZWxmKS5kYXlqc19wbHVnaW5fdGltZXpvbmU9ZSgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciB0PXt5ZWFyOjAsbW9udGg6MSxkYXk6Mixob3VyOjMsbWludXRlOjQsc2Vjb25kOjV9LGU9e307cmV0dXJuIGZ1bmN0aW9uKG4saSxvKXt2YXIgcixhPWZ1bmN0aW9uKHQsbixpKXt2b2lkIDA9PT1pJiYoaT17fSk7dmFyIG89bmV3IERhdGUodCkscj1mdW5jdGlvbih0LG4pe3ZvaWQgMD09PW4mJihuPXt9KTt2YXIgaT1uLnRpbWVab25lTmFtZXx8XCJzaG9ydFwiLG89dCtcInxcIitpLHI9ZVtvXTtyZXR1cm4gcnx8KHI9bmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoXCJlbi1VU1wiLHtob3VyMTI6ITEsdGltZVpvbmU6dCx5ZWFyOlwibnVtZXJpY1wiLG1vbnRoOlwiMi1kaWdpdFwiLGRheTpcIjItZGlnaXRcIixob3VyOlwiMi1kaWdpdFwiLG1pbnV0ZTpcIjItZGlnaXRcIixzZWNvbmQ6XCIyLWRpZ2l0XCIsdGltZVpvbmVOYW1lOml9KSxlW29dPXIpLHJ9KG4saSk7cmV0dXJuIHIuZm9ybWF0VG9QYXJ0cyhvKX0sdT1mdW5jdGlvbihlLG4pe2Zvcih2YXIgaT1hKGUsbikscj1bXSx1PTA7dTxpLmxlbmd0aDt1Kz0xKXt2YXIgZj1pW3VdLHM9Zi50eXBlLG09Zi52YWx1ZSxjPXRbc107Yz49MCYmKHJbY109cGFyc2VJbnQobSwxMCkpfXZhciBkPXJbM10sbD0yND09PWQ/MDpkLGg9clswXStcIi1cIityWzFdK1wiLVwiK3JbMl0rXCIgXCIrbCtcIjpcIityWzRdK1wiOlwiK3JbNV0rXCI6MDAwXCIsdj0rZTtyZXR1cm4oby51dGMoaCkudmFsdWVPZigpLSh2LT12JTFlMykpLzZlNH0sZj1pLnByb3RvdHlwZTtmLnR6PWZ1bmN0aW9uKHQsZSl7dm9pZCAwPT09dCYmKHQ9cik7dmFyIG4saT10aGlzLnV0Y09mZnNldCgpLGE9dGhpcy50b0RhdGUoKSx1PWEudG9Mb2NhbGVTdHJpbmcoXCJlbi1VU1wiLHt0aW1lWm9uZTp0fSksZj1NYXRoLnJvdW5kKChhLW5ldyBEYXRlKHUpKS8xZTMvNjApLHM9MTUqLU1hdGgucm91bmQoYS5nZXRUaW1lem9uZU9mZnNldCgpLzE1KS1mO2lmKCFOdW1iZXIocykpbj10aGlzLnV0Y09mZnNldCgwLGUpO2Vsc2UgaWYobj1vKHUse2xvY2FsZTp0aGlzLiRMfSkuJHNldChcIm1pbGxpc2Vjb25kXCIsdGhpcy4kbXMpLnV0Y09mZnNldChzLCEwKSxlKXt2YXIgbT1uLnV0Y09mZnNldCgpO249bi5hZGQoaS1tLFwibWludXRlXCIpfXJldHVybiBuLiR4LiR0aW1lem9uZT10LG59LGYub2Zmc2V0TmFtZT1mdW5jdGlvbih0KXt2YXIgZT10aGlzLiR4LiR0aW1lem9uZXx8by50ei5ndWVzcygpLG49YSh0aGlzLnZhbHVlT2YoKSxlLHt0aW1lWm9uZU5hbWU6dH0pLmZpbmQoKGZ1bmN0aW9uKHQpe3JldHVyblwidGltZXpvbmVuYW1lXCI9PT10LnR5cGUudG9Mb3dlckNhc2UoKX0pKTtyZXR1cm4gbiYmbi52YWx1ZX07dmFyIHM9Zi5zdGFydE9mO2Yuc3RhcnRPZj1mdW5jdGlvbih0LGUpe2lmKCF0aGlzLiR4fHwhdGhpcy4keC4kdGltZXpvbmUpcmV0dXJuIHMuY2FsbCh0aGlzLHQsZSk7dmFyIG49byh0aGlzLmZvcm1hdChcIllZWVktTU0tREQgSEg6bW06c3M6U1NTXCIpLHtsb2NhbGU6dGhpcy4kTH0pO3JldHVybiBzLmNhbGwobix0LGUpLnR6KHRoaXMuJHguJHRpbWV6b25lLCEwKX0sby50ej1mdW5jdGlvbih0LGUsbil7dmFyIGk9biYmZSxhPW58fGV8fHIsZj11KCtvKCksYSk7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIHQpcmV0dXJuIG8odCkudHooYSk7dmFyIHM9ZnVuY3Rpb24odCxlLG4pe3ZhciBpPXQtNjAqZSoxZTMsbz11KGksbik7aWYoZT09PW8pcmV0dXJuW2ksZV07dmFyIHI9dShpLT02MCooby1lKSoxZTMsbik7cmV0dXJuIG89PT1yP1tpLG9dOlt0LTYwKk1hdGgubWluKG8scikqMWUzLE1hdGgubWF4KG8scildfShvLnV0Yyh0LGkpLnZhbHVlT2YoKSxmLGEpLG09c1swXSxjPXNbMV0sZD1vKG0pLnV0Y09mZnNldChjKTtyZXR1cm4gZC4keC4kdGltZXpvbmU9YSxkfSxvLnR6Lmd1ZXNzPWZ1bmN0aW9uKCl7cmV0dXJuIEludGwuRGF0ZVRpbWVGb3JtYXQoKS5yZXNvbHZlZE9wdGlvbnMoKS50aW1lWm9uZX0sby50ei5zZXREZWZhdWx0PWZ1bmN0aW9uKHQpe3I9dH19fSkpOyIsIiFmdW5jdGlvbihlLGkpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPWkoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGkpOihlPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6ZXx8c2VsZikuZGF5anNfcGx1Z2luX2lzU2FtZU9yQmVmb3JlPWkoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtyZXR1cm4gZnVuY3Rpb24oZSxpKXtpLnByb3RvdHlwZS5pc1NhbWVPckJlZm9yZT1mdW5jdGlvbihlLGkpe3JldHVybiB0aGlzLmlzU2FtZShlLGkpfHx0aGlzLmlzQmVmb3JlKGUsaSl9fX0pKTsiLCIhZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz10KCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZSh0KTooZT1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOmV8fHNlbGYpLmRheWpzX3BsdWdpbl9pc1NhbWVPckFmdGVyPXQoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtyZXR1cm4gZnVuY3Rpb24oZSx0KXt0LnByb3RvdHlwZS5pc1NhbWVPckFmdGVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMuaXNTYW1lKGUsdCl8fHRoaXMuaXNBZnRlcihlLHQpfX19KSk7IiwiaW1wb3J0IGRheWpzIGZyb20gXCJkYXlqc1wiO1xuaW1wb3J0IHV0YyBmcm9tIFwiZGF5anMvcGx1Z2luL3V0Y1wiO1xuaW1wb3J0IHRpbWV6b25lIGZyb20gXCJkYXlqcy9wbHVnaW4vdGltZXpvbmVcIjtcbmltcG9ydCBpc1NhbWVPckJlZm9yZSBmcm9tIFwiZGF5anMvcGx1Z2luL2lzU2FtZU9yQmVmb3JlXCI7XG5pbXBvcnQgaXNTYW1lT3JBZnRlciBmcm9tIFwiZGF5anMvcGx1Z2luL2lzU2FtZU9yQWZ0ZXJcIjtcblxuLy8gRXh0ZW5kIGRheWpzIHdpdGggcGx1Z2luc1xuZGF5anMuZXh0ZW5kKHV0Yyk7XG5kYXlqcy5leHRlbmQodGltZXpvbmUpO1xuZGF5anMuZXh0ZW5kKGlzU2FtZU9yQmVmb3JlKTtcbmRheWpzLmV4dGVuZChpc1NhbWVPckFmdGVyKTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdERhdGUgPSAoZGF0ZTogRGF0ZSwgZm9ybWF0ID0gXCJZWVlZLU1NLUREIEhIOm1tXCIpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBkYXlqcyhkYXRlKS5mb3JtYXQoZm9ybWF0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBwYXJzZURhdGUgPSAoZGF0ZVN0cmluZzogc3RyaW5nKTogRGF0ZSA9PiB7XG4gICAgcmV0dXJuIGRheWpzKGRhdGVTdHJpbmcpLnRvRGF0ZSgpO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZERheXMgPSAoZGF0ZTogRGF0ZSwgZGF5czogbnVtYmVyKTogRGF0ZSA9PiB7XG4gICAgcmV0dXJuIGRheWpzKGRhdGUpLmFkZChkYXlzLCBcImRheVwiKS50b0RhdGUoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRIb3VycyA9IChkYXRlOiBEYXRlLCBob3VyczogbnVtYmVyKTogRGF0ZSA9PiB7XG4gICAgcmV0dXJuIGRheWpzKGRhdGUpLmFkZChob3VycywgXCJob3VyXCIpLnRvRGF0ZSgpO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzU2FtZURheSA9IChkYXRlMTogRGF0ZSwgZGF0ZTI6IERhdGUpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gZGF5anMoZGF0ZTEpLmlzU2FtZShkYXlqcyhkYXRlMiksIFwiZGF5XCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzV2l0aGluUmFuZ2UgPSAoZGF0ZTogRGF0ZSwgc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSk6IGJvb2xlYW4gPT4ge1xuICAgIGNvbnN0IGRheURhdGUgPSBkYXlqcyhkYXRlKTtcbiAgICByZXR1cm4gZGF5RGF0ZS5pc1NhbWVPckFmdGVyKGRheWpzKHN0YXJ0KSkgJiYgZGF5RGF0ZS5pc1NhbWVPckJlZm9yZShkYXlqcyhlbmQpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXREdXJhdGlvbkluTWludXRlcyA9IChzdGFydDogRGF0ZSwgZW5kOiBEYXRlKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gZGF5anMoZW5kKS5kaWZmKGRheWpzKHN0YXJ0KSwgXCJtaW51dGVcIik7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0V2Vla1JhbmdlID0gKGRhdGU6IERhdGUpOiB7IHN0YXJ0OiBEYXRlOyBlbmQ6IERhdGUgfSA9PiB7XG4gICAgY29uc3Qgc3RhcnRPZldlZWsgPSBkYXlqcyhkYXRlKS5zdGFydE9mKFwid2Vla1wiKTtcbiAgICBjb25zdCBlbmRPZldlZWsgPSBkYXlqcyhkYXRlKS5lbmRPZihcIndlZWtcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogc3RhcnRPZldlZWsudG9EYXRlKCksXG4gICAgICAgIGVuZDogZW5kT2ZXZWVrLnRvRGF0ZSgpXG4gICAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRNb250aFJhbmdlID0gKGRhdGU6IERhdGUpOiB7IHN0YXJ0OiBEYXRlOyBlbmQ6IERhdGUgfSA9PiB7XG4gICAgY29uc3Qgc3RhcnRPZk1vbnRoID0gZGF5anMoZGF0ZSkuc3RhcnRPZihcIm1vbnRoXCIpO1xuICAgIGNvbnN0IGVuZE9mTW9udGggPSBkYXlqcyhkYXRlKS5lbmRPZihcIm1vbnRoXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQ6IHN0YXJ0T2ZNb250aC50b0RhdGUoKSxcbiAgICAgICAgZW5kOiBlbmRPZk1vbnRoLnRvRGF0ZSgpXG4gICAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCByb3VuZFRvTmVhcmVzdE1pbnV0ZXMgPSAoZGF0ZTogRGF0ZSwgbWludXRlczogbnVtYmVyKTogRGF0ZSA9PiB7XG4gICAgY29uc3QgZGF5RGF0ZSA9IGRheWpzKGRhdGUpO1xuICAgIGNvbnN0IHJvdW5kZWRNaW51dGVzID0gTWF0aC5yb3VuZChkYXlEYXRlLm1pbnV0ZSgpIC8gbWludXRlcykgKiBtaW51dGVzO1xuICAgIHJldHVybiBkYXlEYXRlLm1pbnV0ZShyb3VuZGVkTWludXRlcykuc2Vjb25kKDApLm1pbGxpc2Vjb25kKDApLnRvRGF0ZSgpO1xufTtcblxuLy8gU2hpZnQtc3BlY2lmaWMgZGF0ZSBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBnZXRTaGlmdEJvdW5kYXJ5ID0gKGRhdGU6IERhdGUsIHNoaWZ0VHlwZTogc3RyaW5nKTogeyBzdGFydDogRGF0ZTsgZW5kOiBEYXRlIH0gPT4ge1xuICAgIGNvbnN0IGRheSA9IGRheWpzKGRhdGUpO1xuXG4gICAgc3dpdGNoIChzaGlmdFR5cGUpIHtcbiAgICAgICAgY2FzZSBcIk1cIjogLy8gTW9ybmluZyAoMDY6MDAtMTQ6MDApXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBkYXkuaG91cig2KS5taW51dGUoMCkuc2Vjb25kKDApLnRvRGF0ZSgpLFxuICAgICAgICAgICAgICAgIGVuZDogZGF5LmhvdXIoMTQpLm1pbnV0ZSgwKS5zZWNvbmQoMCkudG9EYXRlKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgXCJFXCI6IC8vIEV2ZW5pbmcgKDE0OjAwLTIyOjAwKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDogZGF5LmhvdXIoMTQpLm1pbnV0ZSgwKS5zZWNvbmQoMCkudG9EYXRlKCksXG4gICAgICAgICAgICAgICAgZW5kOiBkYXkuaG91cigyMikubWludXRlKDApLnNlY29uZCgwKS50b0RhdGUoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBcIk5cIjogLy8gTmlnaHQgKDIyOjAwLTA2OjAwIG5leHQgZGF5KVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDogZGF5LmhvdXIoMjIpLm1pbnV0ZSgwKS5zZWNvbmQoMCkudG9EYXRlKCksXG4gICAgICAgICAgICAgICAgZW5kOiBkYXkuYWRkKDEsIFwiZGF5XCIpLmhvdXIoNikubWludXRlKDApLnNlY29uZCgwKS50b0RhdGUoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgZGVmYXVsdDogLy8gRGF5IHNoaWZ0ICgwODowMC0xNzowMClcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IGRheS5ob3VyKDgpLm1pbnV0ZSgwKS5zZWNvbmQoMCkudG9EYXRlKCksXG4gICAgICAgICAgICAgICAgZW5kOiBkYXkuaG91cigxNykubWludXRlKDApLnNlY29uZCgwKS50b0RhdGUoKVxuICAgICAgICAgICAgfTtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0MzBEYXlSYW5nZSA9IChzdGFydERhdGU6IERhdGUpOiB7IHN0YXJ0OiBEYXRlOyBlbmQ6IERhdGUgfSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQ6IGRheWpzKHN0YXJ0RGF0ZSkuc3RhcnRPZihcImRheVwiKS50b0RhdGUoKSxcbiAgICAgICAgZW5kOiBkYXlqcyhzdGFydERhdGUpLmFkZCgyOSwgXCJkYXlzXCIpLmVuZE9mKFwiZGF5XCIpLnRvRGF0ZSgpXG4gICAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXREYXRlUmFuZ2VBcnJheSA9IChzdGFydDogRGF0ZSwgZW5kOiBEYXRlKTogRGF0ZVtdID0+IHtcbiAgICBjb25zdCBkYXRlczogRGF0ZVtdID0gW107XG4gICAgbGV0IGN1cnJlbnQgPSBkYXlqcyhzdGFydCk7XG4gICAgY29uc3QgZW5kRGF5ID0gZGF5anMoZW5kKTtcblxuICAgIHdoaWxlIChjdXJyZW50LmlzU2FtZU9yQmVmb3JlKGVuZERheSwgXCJkYXlcIikpIHtcbiAgICAgICAgZGF0ZXMucHVzaChjdXJyZW50LnRvRGF0ZSgpKTtcbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnQuYWRkKDEsIFwiZGF5XCIpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRlcztcbn07XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRTaGlmdERhdGUgPSAoZGF0ZTogRGF0ZSk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIGRheWpzKGRhdGUpLmZvcm1hdChcIk1NTSBERFwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRTaGlmdFdlZWtkYXkgPSAoZGF0ZTogRGF0ZSk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIGRheWpzKGRhdGUpLmZvcm1hdChcImRkZFwiKTtcbn07XG5cbi8vIExlZ2FjeSBjb21wYXRpYmlsaXR5IGZ1bmN0aW9ucyAoa2VlcGluZyBzYW1lIG5hbWVzIGFzIGRhdGUtZm5zIHZlcnNpb24pXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVEYXRlUmFuZ2UgPSAoc3RhcnREYXRlOiBEYXRlLCBkYXlzQ291bnQ6IG51bWJlcik6IERhdGVbXSA9PiB7XG4gICAgY29uc3QgZGF0ZXM6IERhdGVbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF5c0NvdW50OyBpKyspIHtcbiAgICAgICAgZGF0ZXMucHVzaChhZGREYXlzKHN0YXJ0RGF0ZSwgaSkpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0ZXM7XG59O1xuXG5leHBvcnQgY29uc3QgZm9ybWF0RGF0ZUZvclNoaWZ0ID0gKGRhdGU6IERhdGUpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBkYXlqcyhkYXRlKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzVG9kYXkgPSAoZGF0ZTogRGF0ZSk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBpc1NhbWVEYXkoZGF0ZSwgbmV3IERhdGUoKSk7XG59O1xuXG5leHBvcnQgY29uc3QgaXNXZWVrZW5kID0gKGRhdGU6IERhdGUpOiBib29sZWFuID0+IHtcbiAgICBjb25zdCBkYXkgPSBkYXlqcyhkYXRlKS5kYXkoKTtcbiAgICByZXR1cm4gZGF5ID09PSAwIHx8IGRheSA9PT0gNjsgLy8gU3VuZGF5ID0gMCwgU2F0dXJkYXkgPSA2XG59O1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVJlZiwgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlSW5WaWV3IH0gZnJvbSBcInJlYWN0LWludGVyc2VjdGlvbi1vYnNlcnZlclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVzZVNjcm9sbE5hdmlnYXRpb25SZXR1cm4ge1xuICAgIGhlYWRlclNjcm9sbFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50PjtcbiAgICBjb250ZW50U2Nyb2xsUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQ+O1xuICAgIGlzU2Nyb2xsaW5nOiBSZWFjdC5NdXRhYmxlUmVmT2JqZWN0PGJvb2xlYW4+O1xuICAgIGluZmluaXRlU2Nyb2xsUmVmOiAobm9kZT86IEVsZW1lbnQgfCBudWxsKSA9PiB2b2lkO1xuICAgIGlzSW5maW5pdGVTY3JvbGxWaXNpYmxlOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEN1c3RvbSBob29rIGZvciBtYW5hZ2luZyBzY3JvbGwgc3luY2hyb25pemF0aW9uIGFuZCBpbmZpbml0ZSBsb2FkaW5nXG4gKiBFbnN1cmVzIHVuaWZpZWQgc2Nyb2xsaW5nIGV4cGVyaWVuY2UgYW5kIGhhbmRsZXMgbGF6eSBsb2FkaW5nIG9mIGFkZGl0aW9uYWwgdGltZWxpbmUgZGF0YVxuICovXG5leHBvcnQgY29uc3QgdXNlU2Nyb2xsTmF2aWdhdGlvbiA9ICgpOiBVc2VTY3JvbGxOYXZpZ2F0aW9uUmV0dXJuID0+IHtcbiAgICAvLyBSZWZzIGZvciBzY3JvbGwgc3luY2hyb25pemF0aW9uXG4gICAgY29uc3QgaGVhZGVyU2Nyb2xsUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcbiAgICBjb25zdCBjb250ZW50U2Nyb2xsUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcbiAgICBjb25zdCBpc1Njcm9sbGluZyA9IHVzZVJlZihmYWxzZSk7XG5cbiAgICAvLyBJbmZpbml0ZSBzY3JvbGwgLyBsYXp5IGxvYWRpbmcgd2l0aCBpbnRlcnNlY3Rpb24gb2JzZXJ2ZXJcbiAgICBjb25zdCB7IHJlZjogaW5maW5pdGVTY3JvbGxSZWYsIGluVmlldzogaXNJbmZpbml0ZVNjcm9sbFZpc2libGUgfSA9IHVzZUluVmlldyh7XG4gICAgICAgIHJvb3RNYXJnaW46IFwiMHB4XCIsXG4gICAgICAgIHRocmVzaG9sZDogMVxuICAgIH0pO1xuXG4gICAgLy8gU2Nyb2xsIHN5bmNocm9uaXphdGlvbiBiZXR3ZWVuIGhlYWRlciBhbmQgY29udGVudFxuICAgIGNvbnN0IHN5bmNTY3JvbGwgPSB1c2VDYWxsYmFjaygoc291cmNlOiBIVE1MRGl2RWxlbWVudCwgdGFyZ2V0OiBIVE1MRGl2RWxlbWVudCkgPT4ge1xuICAgICAgICBpZiAoaXNTY3JvbGxpbmcuY3VycmVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlzU2Nyb2xsaW5nLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICB0YXJnZXQuc2Nyb2xsTGVmdCA9IHNvdXJjZS5zY3JvbGxMZWZ0O1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlzU2Nyb2xsaW5nLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgICAgfSwgMTApO1xuICAgIH0sIFtdKTtcblxuICAgIC8vIFNldCB1cCBzY3JvbGwgZXZlbnQgbGlzdGVuZXJzIGZvciBzeW5jaHJvbml6YXRpb25cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBoZWFkZXJFbCA9IGhlYWRlclNjcm9sbFJlZi5jdXJyZW50O1xuICAgICAgICBjb25zdCBjb250ZW50RWwgPSBjb250ZW50U2Nyb2xsUmVmLmN1cnJlbnQ7XG5cbiAgICAgICAgaWYgKCFoZWFkZXJFbCB8fCAhY29udGVudEVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBoYW5kbGVIZWFkZXJTY3JvbGwgPSAoKTogdm9pZCA9PiBzeW5jU2Nyb2xsKGhlYWRlckVsLCBjb250ZW50RWwpO1xuICAgICAgICBjb25zdCBoYW5kbGVDb250ZW50U2Nyb2xsID0gKCk6IHZvaWQgPT4gc3luY1Njcm9sbChjb250ZW50RWwsIGhlYWRlckVsKTtcblxuICAgICAgICBoZWFkZXJFbC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZUhlYWRlclNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgICAgICBjb250ZW50RWwuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVDb250ZW50U2Nyb2xsLCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGhlYWRlckVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlSGVhZGVyU2Nyb2xsKTtcbiAgICAgICAgICAgIGNvbnRlbnRFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZUNvbnRlbnRTY3JvbGwpO1xuICAgICAgICB9O1xuICAgIH0sIFtzeW5jU2Nyb2xsXSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBoZWFkZXJTY3JvbGxSZWYsXG4gICAgICAgIGNvbnRlbnRTY3JvbGxSZWYsXG4gICAgICAgIGlzU2Nyb2xsaW5nLFxuICAgICAgICBpbmZpbml0ZVNjcm9sbFJlZixcbiAgICAgICAgaXNJbmZpbml0ZVNjcm9sbFZpc2libGVcbiAgICB9O1xufTtcbiIsImltcG9ydCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEVuZ2luZWVyLCBTaGlmdEFzc2lnbm1lbnQgfSBmcm9tIFwiLi4vdHlwZXMvc2hpZnRTY2hlZHVsZXJcIjtcblxuZXhwb3J0IHR5cGUgVXNlclJvbGUgPSBcImVuZ2luZWVyXCIgfCBcInRlYW1fbGVhZGVyXCIgfCBcIm1hbmFnZXJcIiB8IFwiYWRtaW5cIjtcblxuZXhwb3J0IGludGVyZmFjZSBUZWFtQWNjZXNzQ29uZmlnIHtcbiAgICB1c2VyUm9sZTogVXNlclJvbGU7XG4gICAgdXNlclRlYW0/OiBzdHJpbmc7XG4gICAgdXNlcklkPzogc3RyaW5nO1xuICAgIGFsbG93Q3Jvc3NUZWFtVmlldz86IGJvb2xlYW47XG4gICAgYWxsb3dTaGlmdEVkaXRpbmc/OiBib29sZWFuO1xuICAgIGFsbG93QmF0Y2hPcGVyYXRpb25zPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVc2VUZWFtQWNjZXNzUmV0dXJuIHtcbiAgICBmaWx0ZXJlZEVuZ2luZWVyczogRW5naW5lZXJbXTtcbiAgICBmaWx0ZXJlZFNoaWZ0czogU2hpZnRBc3NpZ25tZW50W107XG4gICAgY2FuRWRpdFNoaWZ0OiAoc2hpZnQ6IFNoaWZ0QXNzaWdubWVudCkgPT4gYm9vbGVhbjtcbiAgICBjYW5DcmVhdGVTaGlmdDogKGVuZ2luZWVySWQ6IHN0cmluZykgPT4gYm9vbGVhbjtcbiAgICBjYW5EZWxldGVTaGlmdDogKHNoaWZ0OiBTaGlmdEFzc2lnbm1lbnQpID0+IGJvb2xlYW47XG4gICAgY2FuVmlld1RlYW06ICh0ZWFtTmFtZTogc3RyaW5nKSA9PiBib29sZWFuO1xuICAgIGNhblBlcmZvcm1CYXRjaE9wZXJhdGlvbnM6IGJvb2xlYW47XG4gICAgdXNlclBlcm1pc3Npb25zOiB7XG4gICAgICAgIHJlYWRPbmx5OiBib29sZWFuO1xuICAgICAgICBjYW5FZGl0OiBib29sZWFuO1xuICAgICAgICBjYW5DcmVhdGU6IGJvb2xlYW47XG4gICAgICAgIGNhbkRlbGV0ZTogYm9vbGVhbjtcbiAgICAgICAgY2FuQmF0Y2g6IGJvb2xlYW47XG4gICAgICAgIGNyb3NzVGVhbUFjY2VzczogYm9vbGVhbjtcbiAgICB9O1xufVxuXG4vKipcbiAqIEN1c3RvbSBob29rIGZvciBtYW5hZ2luZyB0ZWFtLWJhc2VkIGFjY2VzcyBjb250cm9sIGFuZCByb2xlLWJhc2VkIGZpbHRlcmluZ1xuICogSGFuZGxlcyBwZXJtaXNzaW9ucyBmb3IgZW5naW5lZXJzIHZzIHRlYW0gbGVhZGVycyB2cyBtYW5hZ2Vyc1xuICovXG5leHBvcnQgY29uc3QgdXNlVGVhbUFjY2VzcyA9IChcbiAgICBlbmdpbmVlcnM6IEVuZ2luZWVyW10sXG4gICAgc2hpZnRzOiBTaGlmdEFzc2lnbm1lbnRbXSxcbiAgICBjb25maWc6IFRlYW1BY2Nlc3NDb25maWdcbik6IFVzZVRlYW1BY2Nlc3NSZXR1cm4gPT4ge1xuICAgIC8vIERldGVybWluZSB1c2VyIHBlcm1pc3Npb25zIGJhc2VkIG9uIHJvbGVcbiAgICBjb25zdCB1c2VyUGVybWlzc2lvbnMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICAgICAgY29uc3QgYmFzZVBlcm1pc3Npb25zID0ge1xuICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgY2FuRWRpdDogZmFsc2UsXG4gICAgICAgICAgICBjYW5DcmVhdGU6IGZhbHNlLFxuICAgICAgICAgICAgY2FuRGVsZXRlOiBmYWxzZSxcbiAgICAgICAgICAgIGNhbkJhdGNoOiBmYWxzZSxcbiAgICAgICAgICAgIGNyb3NzVGVhbUFjY2VzczogZmFsc2VcbiAgICAgICAgfTtcblxuICAgICAgICBzd2l0Y2ggKGNvbmZpZy51c2VyUm9sZSkge1xuICAgICAgICAgICAgY2FzZSBcImFkbWluXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYmFzZVBlcm1pc3Npb25zLFxuICAgICAgICAgICAgICAgICAgICBjYW5FZGl0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjYW5DcmVhdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNhbkRlbGV0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2FuQmF0Y2g6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNyb3NzVGVhbUFjY2VzczogdHJ1ZVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNhc2UgXCJtYW5hZ2VyXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYmFzZVBlcm1pc3Npb25zLFxuICAgICAgICAgICAgICAgICAgICBjYW5FZGl0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjYW5DcmVhdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNhbkRlbGV0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2FuQmF0Y2g6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNyb3NzVGVhbUFjY2VzczogY29uZmlnLmFsbG93Q3Jvc3NUZWFtVmlldyA/PyB0cnVlXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY2FzZSBcInRlYW1fbGVhZGVyXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYmFzZVBlcm1pc3Npb25zLFxuICAgICAgICAgICAgICAgICAgICBjYW5FZGl0OiBjb25maWcuYWxsb3dTaGlmdEVkaXRpbmcgPz8gdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2FuQ3JlYXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjYW5EZWxldGU6IGNvbmZpZy5hbGxvd1NoaWZ0RWRpdGluZyA/PyB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjYW5CYXRjaDogY29uZmlnLmFsbG93QmF0Y2hPcGVyYXRpb25zID8/IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNyb3NzVGVhbUFjY2VzczogY29uZmlnLmFsbG93Q3Jvc3NUZWFtVmlldyA/PyBmYWxzZVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNhc2UgXCJlbmdpbmVlclwiOlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAuLi5iYXNlUGVybWlzc2lvbnMsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjcm9zc1RlYW1BY2Nlc3M6IGZhbHNlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sIFtjb25maWddKTtcblxuICAgIC8vIEZpbHRlciBlbmdpbmVlcnMgYmFzZWQgb24gdGVhbSBhY2Nlc3NcbiAgICBjb25zdCBmaWx0ZXJlZEVuZ2luZWVycyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgICAgICBpZiAodXNlclBlcm1pc3Npb25zLmNyb3NzVGVhbUFjY2VzcyB8fCAhY29uZmlnLnVzZXJUZWFtKSB7XG4gICAgICAgICAgICByZXR1cm4gZW5naW5lZXJzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmlsdGVyIHRvIHVzZXIncyB0ZWFtIG9ubHlcbiAgICAgICAgcmV0dXJuIGVuZ2luZWVycy5maWx0ZXIoZW5naW5lZXIgPT4gZW5naW5lZXIuaGVhZGVyID09PSBjb25maWcudXNlclRlYW0pO1xuICAgIH0sIFtlbmdpbmVlcnMsIHVzZXJQZXJtaXNzaW9ucy5jcm9zc1RlYW1BY2Nlc3MsIGNvbmZpZy51c2VyVGVhbV0pO1xuXG4gICAgLy8gRmlsdGVyIHNoaWZ0cyBiYXNlZCBvbiBhY2Nlc3NpYmxlIGVuZ2luZWVyc1xuICAgIGNvbnN0IGZpbHRlcmVkU2hpZnRzID0gdXNlTWVtbygoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjY2Vzc2libGVFbmdpbmVlcklkcyA9IG5ldyBTZXQoZmlsdGVyZWRFbmdpbmVlcnMubWFwKGUgPT4gZS5pZCkpO1xuICAgICAgICByZXR1cm4gc2hpZnRzLmZpbHRlcihzaGlmdCA9PiBhY2Nlc3NpYmxlRW5naW5lZXJJZHMuaGFzKHNoaWZ0LmVuZ2luZWVySWQpKTtcbiAgICB9LCBbc2hpZnRzLCBmaWx0ZXJlZEVuZ2luZWVyc10pO1xuXG4gICAgLy8gUGVybWlzc2lvbiBjaGVjayBmdW5jdGlvbnNcbiAgICBjb25zdCBjYW5WaWV3VGVhbSA9ICh0ZWFtTmFtZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIGlmICh1c2VyUGVybWlzc2lvbnMuY3Jvc3NUZWFtQWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGVhbU5hbWUgPT09IGNvbmZpZy51c2VyVGVhbTtcbiAgICB9O1xuXG4gICAgY29uc3QgY2FuRWRpdFNoaWZ0ID0gKHNoaWZ0OiBTaGlmdEFzc2lnbm1lbnQpOiBib29sZWFuID0+IHtcbiAgICAgICAgaWYgKCF1c2VyUGVybWlzc2lvbnMuY2FuRWRpdCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgc2hpZnQgYmVsb25ncyB0byBhbiBhY2Nlc3NpYmxlIGVuZ2luZWVyXG4gICAgICAgIGNvbnN0IGVuZ2luZWVyID0gZmlsdGVyZWRFbmdpbmVlcnMuZmluZChlID0+IGUuaWQgPT09IHNoaWZ0LmVuZ2luZWVySWQpO1xuICAgICAgICBpZiAoIWVuZ2luZWVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUZWFtIGxlYWRlcnMgY2FuIG9ubHkgZWRpdCBzaGlmdHMgaW4gdGhlaXIgdGVhbVxuICAgICAgICBpZiAoY29uZmlnLnVzZXJSb2xlID09PSBcInRlYW1fbGVhZGVyXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmdpbmVlci5oZWFkZXIgPT09IGNvbmZpZy51c2VyVGVhbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBjb25zdCBjYW5DcmVhdGVTaGlmdCA9IChlbmdpbmVlcklkOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICAgICAgaWYgKCF1c2VyUGVybWlzc2lvbnMuY2FuQ3JlYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBpZiBlbmdpbmVlciBpcyBhY2Nlc3NpYmxlXG4gICAgICAgIGNvbnN0IGVuZ2luZWVyID0gZmlsdGVyZWRFbmdpbmVlcnMuZmluZChlID0+IGUuaWQgPT09IGVuZ2luZWVySWQpO1xuICAgICAgICBpZiAoIWVuZ2luZWVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUZWFtIGxlYWRlcnMgY2FuIG9ubHkgY3JlYXRlIHNoaWZ0cyBmb3IgdGhlaXIgdGVhbVxuICAgICAgICBpZiAoY29uZmlnLnVzZXJSb2xlID09PSBcInRlYW1fbGVhZGVyXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmdpbmVlci5oZWFkZXIgPT09IGNvbmZpZy51c2VyVGVhbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBjb25zdCBjYW5EZWxldGVTaGlmdCA9IChzaGlmdDogU2hpZnRBc3NpZ25tZW50KTogYm9vbGVhbiA9PiB7XG4gICAgICAgIGlmICghdXNlclBlcm1pc3Npb25zLmNhbkRlbGV0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2FtZSBsb2dpYyBhcyBlZGl0XG4gICAgICAgIHJldHVybiBjYW5FZGl0U2hpZnQoc2hpZnQpO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmaWx0ZXJlZEVuZ2luZWVycyxcbiAgICAgICAgZmlsdGVyZWRTaGlmdHMsXG4gICAgICAgIGNhbkVkaXRTaGlmdCxcbiAgICAgICAgY2FuQ3JlYXRlU2hpZnQsXG4gICAgICAgIGNhbkRlbGV0ZVNoaWZ0LFxuICAgICAgICBjYW5WaWV3VGVhbSxcbiAgICAgICAgY2FuUGVyZm9ybUJhdGNoT3BlcmF0aW9uczogdXNlclBlcm1pc3Npb25zLmNhbkJhdGNoLFxuICAgICAgICB1c2VyUGVybWlzc2lvbnNcbiAgICB9O1xufTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIHVzZXIgcm9sZSBmcm9tIE1lbmRpeCB1c2VyIGNvbnRleHRcbiAqIFRoaXMgd291bGQgdHlwaWNhbGx5IGludGVncmF0ZSB3aXRoIE1lbmRpeCB1c2VyIHJvbGVzL2F0dHJpYnV0ZXNcbiAqL1xuZXhwb3J0IGNvbnN0IGdldFVzZXJSb2xlRnJvbU1lbmRpeCA9IChcbiAgICB1c2VyT2JqZWN0PzogYW55LCAvLyBNZW5kaXggdXNlciBvYmplY3RcbiAgICB0ZWFtQXR0cmlidXRlPzogc3RyaW5nLFxuICAgIHJvbGVBdHRyaWJ1dGU/OiBzdHJpbmdcbik6IFRlYW1BY2Nlc3NDb25maWcgPT4ge1xuICAgIC8vIERlZmF1bHQgY29uZmlndXJhdGlvbiBmb3IgZW5naW5lZXJzXG4gICAgY29uc3QgZGVmYXVsdENvbmZpZzogVGVhbUFjY2Vzc0NvbmZpZyA9IHtcbiAgICAgICAgdXNlclJvbGU6IFwiZW5naW5lZXJcIixcbiAgICAgICAgYWxsb3dDcm9zc1RlYW1WaWV3OiBmYWxzZSxcbiAgICAgICAgYWxsb3dTaGlmdEVkaXRpbmc6IGZhbHNlLFxuICAgICAgICBhbGxvd0JhdGNoT3BlcmF0aW9uczogZmFsc2VcbiAgICB9O1xuXG4gICAgaWYgKCF1c2VyT2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0Q29uZmlnO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIC8vIEV4dHJhY3Qgcm9sZSBmcm9tIE1lbmRpeCB1c2VyIG9iamVjdFxuICAgICAgICBjb25zdCByb2xlID0gcm9sZUF0dHJpYnV0ZSA/IHVzZXJPYmplY3Rbcm9sZUF0dHJpYnV0ZV0gOiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IHRlYW0gPSB0ZWFtQXR0cmlidXRlID8gdXNlck9iamVjdFt0ZWFtQXR0cmlidXRlXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QgdXNlcklkID0gdXNlck9iamVjdC5pZCB8fCB1c2VyT2JqZWN0LklkO1xuXG4gICAgICAgIC8vIE1hcCBNZW5kaXggcm9sZXMgdG8gb3VyIHJvbGUgc3lzdGVtXG4gICAgICAgIGxldCB1c2VyUm9sZTogVXNlclJvbGUgPSBcImVuZ2luZWVyXCI7XG4gICAgICAgIGlmIChyb2xlKSB7XG4gICAgICAgICAgICBjb25zdCByb2xlTG93ZXIgPSByb2xlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAocm9sZUxvd2VyLmluY2x1ZGVzKFwiYWRtaW5cIikpIHtcbiAgICAgICAgICAgICAgICB1c2VyUm9sZSA9IFwiYWRtaW5cIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocm9sZUxvd2VyLmluY2x1ZGVzKFwibWFuYWdlclwiKSkge1xuICAgICAgICAgICAgICAgIHVzZXJSb2xlID0gXCJtYW5hZ2VyXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJvbGVMb3dlci5pbmNsdWRlcyhcImxlYWRlclwiKSB8fCByb2xlTG93ZXIuaW5jbHVkZXMoXCJ0bFwiKSkge1xuICAgICAgICAgICAgICAgIHVzZXJSb2xlID0gXCJ0ZWFtX2xlYWRlclwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVzZXJSb2xlLFxuICAgICAgICAgICAgdXNlclRlYW06IHRlYW0sXG4gICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICBhbGxvd0Nyb3NzVGVhbVZpZXc6IHVzZXJSb2xlID09PSBcIm1hbmFnZXJcIiB8fCB1c2VyUm9sZSA9PT0gXCJhZG1pblwiLFxuICAgICAgICAgICAgYWxsb3dTaGlmdEVkaXRpbmc6IHVzZXJSb2xlICE9PSBcImVuZ2luZWVyXCIsXG4gICAgICAgICAgICBhbGxvd0JhdGNoT3BlcmF0aW9uczogdXNlclJvbGUgIT09IFwiZW5naW5lZXJcIlxuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIkVycm9yIGRldGVybWluaW5nIHVzZXIgcm9sZSBmcm9tIE1lbmRpeDpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4gZGVmYXVsdENvbmZpZztcbiAgICB9XG59O1xuIiwiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFZhbGlkYXRpb25FcnJvciB9IGZyb20gXCIuLi90eXBlcy9zaGlmdFNjaGVkdWxlclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRpbmdTdGF0ZXNQcm9wcyB7XG4gICAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICAgIHN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcztcbiAgICB0YWJJbmRleD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFcnJvclN0YXRlUHJvcHMgZXh0ZW5kcyBMb2FkaW5nU3RhdGVzUHJvcHMge1xuICAgIGVycm9yOiBWYWxpZGF0aW9uRXJyb3I7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW1wdHlTdGF0ZVByb3BzIGV4dGVuZHMgTG9hZGluZ1N0YXRlc1Byb3BzIHtcbiAgICBtZXNzYWdlPzogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIExvYWRpbmcgc3Bpbm5lciBjb21wb25lbnQgZm9yIGRhdGEgbG9hZGluZyBzdGF0ZXNcbiAqL1xuZXhwb3J0IGNvbnN0IExvYWRpbmdTdGF0ZTogUmVhY3QuRkM8TG9hZGluZ1N0YXRlc1Byb3BzPiA9ICh7IGNsYXNzTmFtZSA9IFwiXCIsIHN0eWxlLCB0YWJJbmRleCB9KSA9PiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2BzaGlmdC1zY2hlZHVsZXIgJHtjbGFzc05hbWV9YH0gc3R5bGU9e3N0eWxlfSB0YWJJbmRleD17dGFiSW5kZXh9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNoaWZ0LXNjaGVkdWxlci1sb2FkaW5nXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvYWRpbmctc3Bpbm5lclwiPjwvZGl2PlxuICAgICAgICAgICAgPHA+TG9hZGluZyBzY2hlZHVsZSBkYXRhLi4uPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbik7XG5cbi8qKlxuICogRXJyb3Igc3RhdGUgY29tcG9uZW50IHdpdGggZGV0YWlsZWQgZXJyb3IgaW5mb3JtYXRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IEVycm9yU3RhdGU6IFJlYWN0LkZDPEVycm9yU3RhdGVQcm9wcz4gPSAoeyBlcnJvciwgY2xhc3NOYW1lID0gXCJcIiwgc3R5bGUsIHRhYkluZGV4IH0pID0+IChcbiAgICA8ZGl2IGNsYXNzTmFtZT17YHNoaWZ0LXNjaGVkdWxlciAke2NsYXNzTmFtZX1gfSBzdHlsZT17c3R5bGV9IHRhYkluZGV4PXt0YWJJbmRleH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2hpZnQtc2NoZWR1bGVyLWVycm9yXCI+XG4gICAgICAgICAgICA8aDM+4pqg77iPIENvbmZpZ3VyYXRpb24gRXJyb3I8L2gzPlxuICAgICAgICAgICAgPHA+e2Vycm9yLm1lc3NhZ2V9PC9wPlxuICAgICAgICAgICAge2Vycm9yLnByb3BlcnR5ICYmIChcbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgPHNtYWxsPkNoZWNrIHRoZSB7ZXJyb3IucHJvcGVydHl9IHByb3BlcnR5IGluIHRoZSB3aWRnZXQgY29uZmlndXJhdGlvbi48L3NtYWxsPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8ZGV0YWlscyBjbGFzc05hbWU9XCJlcnJvci1kZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgPHN1bW1hcnk+VGVjaG5pY2FsIERldGFpbHM8L3N1bW1hcnk+XG4gICAgICAgICAgICAgICAgPHByZT57SlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpfTwvcHJlPlxuICAgICAgICAgICAgPC9kZXRhaWxzPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbik7XG5cbi8qKlxuICogRW1wdHkgc3RhdGUgY29tcG9uZW50IHdoZW4gbm8gZGF0YSBpcyBhdmFpbGFibGVcbiAqL1xuZXhwb3J0IGNvbnN0IEVtcHR5U3RhdGU6IFJlYWN0LkZDPEVtcHR5U3RhdGVQcm9wcz4gPSAoe1xuICAgIG1lc3NhZ2UgPSBcIk5vIERhdGEgQXZhaWxhYmxlXCIsXG4gICAgZGVzY3JpcHRpb24gPSBcIk5vIGVuZ2luZWVycyBmb3VuZC4gUGxlYXNlIGNoZWNrIHlvdXIgZGF0YSBzb3VyY2UgY29uZmlndXJhdGlvbi5cIixcbiAgICBjbGFzc05hbWUgPSBcIlwiLFxuICAgIHN0eWxlLFxuICAgIHRhYkluZGV4XG59KSA9PiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2BzaGlmdC1zY2hlZHVsZXIgJHtjbGFzc05hbWV9YH0gc3R5bGU9e3N0eWxlfSB0YWJJbmRleD17dGFiSW5kZXh9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNoaWZ0LXNjaGVkdWxlci1lbXB0eVwiPlxuICAgICAgICAgICAgPGgzPvCfk4Uge21lc3NhZ2V9PC9oMz5cbiAgICAgICAgICAgIDxwPntkZXNjcmlwdGlvbn08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuKTtcblxuLyoqXG4gKiBGYWxsYmFjayBlcnJvciBib3VuZGFyeSBjb21wb25lbnQgZm9yIHVuZXhwZWN0ZWQgZXJyb3JzXG4gKi9cbmludGVyZmFjZSBFcnJvckJvdW5kYXJ5U3RhdGUge1xuICAgIGhhc0Vycm9yOiBib29sZWFuO1xuICAgIGVycm9yPzogRXJyb3I7XG4gICAgZXJyb3JJbmZvPzogUmVhY3QuRXJyb3JJbmZvO1xufVxuXG5leHBvcnQgY2xhc3MgU2NoZWR1bGVyRXJyb3JCb3VuZGFyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxcbiAgICBSZWFjdC5Qcm9wc1dpdGhDaGlsZHJlbjxMb2FkaW5nU3RhdGVzUHJvcHM+LFxuICAgIEVycm9yQm91bmRhcnlTdGF0ZVxuPiB7XG4gICAgY29uc3RydWN0b3IocHJvcHM6IFJlYWN0LlByb3BzV2l0aENoaWxkcmVuPExvYWRpbmdTdGF0ZXNQcm9wcz4pIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0geyBoYXNFcnJvcjogZmFsc2UgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRDYXRjaChlcnJvcjogRXJyb3IsIGVycm9ySW5mbzogUmVhY3QuRXJyb3JJbmZvKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTaGlmdCBTY2hlZHVsZXIgRXJyb3IgQm91bmRhcnkgY2F1Z2h0IGFuIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBJbmZvOlwiLCBlcnJvckluZm8pO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaGFzRXJyb3I6IHRydWUsXG4gICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgIGVycm9ySW5mb1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKTogUmVhY3QuUmVhY3ROb2RlIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaGFzRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BzaGlmdC1zY2hlZHVsZXIgJHt0aGlzLnByb3BzLmNsYXNzTmFtZSB8fCBcIlwifWB9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGhpcy5wcm9wcy50YWJJbmRleH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2hpZnQtc2NoZWR1bGVyLWVycm9yLWJvdW5kYXJ5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDM+8J+boO+4jyBTb21ldGhpbmcgd2VudCB3cm9uZzwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5UaGUgU2hpZnQgU2NoZWR1bGVyIGVuY291bnRlcmVkIGFuIHVuZXhwZWN0ZWQgZXJyb3IuPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRldGFpbHMgY2xhc3NOYW1lPVwiZXJyb3ItYm91bmRhcnktZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdW1tYXJ5PkVycm9yIERldGFpbHM8L3N1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PkVycm9yOjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHByZT57dGhpcy5zdGF0ZS5lcnJvcj8udG9TdHJpbmcoKX08L3ByZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5lcnJvckluZm8gJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PkNvbXBvbmVudCBTdGFjazo8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHByZT57dGhpcy5zdGF0ZS5lcnJvckluZm8uY29tcG9uZW50U3RhY2t9PC9wcmU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IGhhc0Vycm9yOiBmYWxzZSwgZXJyb3I6IHVuZGVmaW5lZCwgZXJyb3JJbmZvOiB1bmRlZmluZWQgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZXJyb3ItYm91bmRhcnktcmV0cnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyeSBBZ2FpblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IoZXJyb3I6IEVycm9yKTogRXJyb3JCb3VuZGFyeVN0YXRlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhhc0Vycm9yOiB0cnVlLFxuICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8qKlxuICogSGlnaGVyLW9yZGVyIGNvbXBvbmVudCB0byB3cmFwIGFueSBjb21wb25lbnQgd2l0aCBlcnJvciBib3VuZGFyeVxuICovXG5leHBvcnQgY29uc3Qgd2l0aEVycm9yQm91bmRhcnkgPSA8UCBleHRlbmRzIG9iamVjdD4oXG4gICAgQ29tcG9uZW50OiBSZWFjdC5Db21wb25lbnRUeXBlPFA+XG4pOiBSZWFjdC5GQzxQICYgTG9hZGluZ1N0YXRlc1Byb3BzPiA9PiB7XG4gICAgY29uc3QgV3JhcHBlZENvbXBvbmVudDogUmVhY3QuRkM8UCAmIExvYWRpbmdTdGF0ZXNQcm9wcz4gPSBwcm9wcyA9PiAoXG4gICAgICAgIDxTY2hlZHVsZXJFcnJvckJvdW5kYXJ5IGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfSBzdHlsZT17cHJvcHMuc3R5bGV9IHRhYkluZGV4PXtwcm9wcy50YWJJbmRleH0+XG4gICAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz5cbiAgICAgICAgPC9TY2hlZHVsZXJFcnJvckJvdW5kYXJ5PlxuICAgICk7XG5cbiAgICBXcmFwcGVkQ29tcG9uZW50LmRpc3BsYXlOYW1lID0gYHdpdGhFcnJvckJvdW5kYXJ5KCR7Q29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC5uYW1lfSlgO1xuICAgIHJldHVybiBXcmFwcGVkQ29tcG9uZW50O1xufTtcbiIsImltcG9ydCB7IFNoaWZ0QXNzaWdubWVudCB9IGZyb20gXCIuLi90eXBlcy9zaGlmdFNjaGVkdWxlclwiO1xuXG4vLyBTaGlmdCBjb2xvciBtYXBwaW5nc1xuZXhwb3J0IGNvbnN0IFNISUZUX0NPTE9SUyA9IHtcbiAgICBNOiBcIiMyMTk2RjNcIiwgLy8gTW9ybmluZyAtIEJsdWVcbiAgICBFOiBcIiM0Q0FGNTBcIiwgLy8gRXZlbmluZyAtIEdyZWVuXG4gICAgTjogXCIjRkY5ODAwXCIsIC8vIE5pZ2h0IC0gT3JhbmdlXG4gICAgRDogXCIjRjQ0MzM2XCIsIC8vIERheSBvZmYgLSBSZWRcbiAgICBIOiBcIiM5RTlFOUVcIiwgLy8gSG9saWRheSAtIEdyYXlcbiAgICBUOiBcIiNGRkVCM0JcIiAvLyBUcmFpbmluZyAtIFllbGxvd1xufSBhcyBjb25zdDtcblxuLy8gUm9sZSBpbmRpY2F0b3JzXG5leHBvcnQgY29uc3QgUk9MRV9TVFlMRVMgPSB7XG4gICAgVEw6IFwic29saWRcIiwgLy8gVGVhbSBMZWFkZXIgLSBzb2xpZCBib3JkZXJcbiAgICBCVEw6IFwiZGFzaGVkXCIsIC8vIEJhY2t1cCBUZWFtIExlYWRlciAtIGRhc2hlZCBib3JkZXJcbiAgICBTUEU6IFwiZG90dGVkXCIsIC8vIFNwZWNpYWxpc3QgLSBkb3R0ZWQgYm9yZGVyXG4gICAgT1NJOiBcImRvdWJsZVwiIC8vIE90aGVyIC0gZG91YmxlIGJvcmRlclxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgU2hpZnRUeXBlID0ga2V5b2YgdHlwZW9mIFNISUZUX0NPTE9SUztcbmV4cG9ydCB0eXBlIFJvbGVUeXBlID0ga2V5b2YgdHlwZW9mIFJPTEVfU1RZTEVTO1xuXG4vKipcbiAqIEdldCB0aGUgY29sb3IgZm9yIGEgc2hpZnQgdHlwZVxuICovXG5leHBvcnQgY29uc3QgZ2V0U2hpZnRDb2xvciA9IChzaGlmdFR5cGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIFNISUZUX0NPTE9SU1tzaGlmdFR5cGUgYXMgU2hpZnRUeXBlXSB8fCBcIiM2MDdEOEJcIjsgLy8gRGVmYXVsdCBncmF5LWJsdWVcbn07XG5cbi8qKlxuICogR2V0IHRoZSBib3JkZXIgc3R5bGUgZm9yIGEgcm9sZVxuICovXG5leHBvcnQgY29uc3QgZ2V0Um9sZUJvcmRlclN0eWxlID0gKHJvbGU/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGlmICghcm9sZSkge1xuICAgICAgICByZXR1cm4gXCJzb2xpZFwiO1xuICAgIH1cbiAgICByZXR1cm4gUk9MRV9TVFlMRVNbcm9sZSBhcyBSb2xlVHlwZV0gfHwgXCJzb2xpZFwiO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBhIHNoaWZ0IGlzIGEgd29ya2luZyBzaGlmdCAobm90IGRheSBvZmYgb3IgaG9saWRheSlcbiAqL1xuZXhwb3J0IGNvbnN0IGlzV29ya2luZ1NoaWZ0ID0gKHNoaWZ0VHlwZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuICFbXCJEXCIsIFwiSFwiXS5pbmNsdWRlcyhzaGlmdFR5cGUpO1xufTtcblxuLyoqXG4gKiBHZXQgc2hpZnQgZGlzcGxheSBuYW1lXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRTaGlmdERpc3BsYXlOYW1lID0gKHNoaWZ0VHlwZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCBuYW1lcyA9IHtcbiAgICAgICAgTTogXCJNb3JuaW5nXCIsXG4gICAgICAgIEU6IFwiRXZlbmluZ1wiLFxuICAgICAgICBOOiBcIk5pZ2h0XCIsXG4gICAgICAgIEQ6IFwiRGF5IE9mZlwiLFxuICAgICAgICBIOiBcIkhvbGlkYXlcIixcbiAgICAgICAgVDogXCJUcmFpbmluZ1wiXG4gICAgfTtcbiAgICByZXR1cm4gbmFtZXNbc2hpZnRUeXBlIGFzIFNoaWZ0VHlwZV0gfHwgc2hpZnRUeXBlO1xufTtcblxuLyoqXG4gKiBHZXQgc2hvcnQgZGlzcGxheSB0ZXh0IGZvciBhIHNoaWZ0ICh1c2VkIGluIGRheSBjZWxscylcbiAqL1xuZXhwb3J0IGNvbnN0IGdldFNoaWZ0RGlzcGxheVRleHQgPSAoc2hpZnRUeXBlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBzaGlmdFR5cGUgfHwgXCI/XCI7XG59O1xuXG4vKipcbiAqIFZhbGlkYXRlIHNoaWZ0IGFzc2lnbm1lbnQgcnVsZXNcbiAqL1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlU2hpZnRBc3NpZ25tZW50ID0gKFxuICAgIGFzc2lnbm1lbnQ6IFBhcnRpYWw8U2hpZnRBc3NpZ25tZW50PixcbiAgICBleGlzdGluZ1NoaWZ0czogU2hpZnRBc3NpZ25tZW50W11cbik6IHsgaXNWYWxpZDogYm9vbGVhbjsgZXJyb3JzOiBzdHJpbmdbXSB9ID0+IHtcbiAgICBjb25zdCBlcnJvcnM6IHN0cmluZ1tdID0gW107XG5cbiAgICAvLyBDaGVjayBmb3Igb3ZlcmxhcHBpbmcgc2hpZnRzIG9uIHNhbWUgZGF0ZVxuICAgIGNvbnN0IHNhbWVEYXRlID0gZXhpc3RpbmdTaGlmdHMuZmlsdGVyKFxuICAgICAgICBzID0+IHMuZGF0ZSA9PT0gYXNzaWdubWVudC5kYXRlICYmIHMuZW5naW5lZXJJZCA9PT0gYXNzaWdubWVudC5lbmdpbmVlcklkICYmIHMuaWQgIT09IGFzc2lnbm1lbnQuaWRcbiAgICApO1xuXG4gICAgaWYgKHNhbWVEYXRlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZXJyb3JzLnB1c2goXCJFbmdpbmVlciBhbHJlYWR5IGhhcyBhIHNoaWZ0IGFzc2lnbmVkIGZvciB0aGlzIGRhdGVcIik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgbmlnaHQgc2hpZnQgZm9sbG93ZWQgYnkgbW9ybmluZyBzaGlmdCAoaW5zdWZmaWNpZW50IHJlc3QpXG4gICAgaWYgKGFzc2lnbm1lbnQuc2hpZnQgPT09IFwiTVwiKSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzRGF5ID0gbmV3IERhdGUoYXNzaWdubWVudC5kYXRlISk7XG4gICAgICAgIHByZXZpb3VzRGF5LnNldERhdGUocHJldmlvdXNEYXkuZ2V0RGF0ZSgpIC0gMSk7XG4gICAgICAgIGNvbnN0IHByZXZEYXlTdHJpbmcgPSBwcmV2aW91c0RheS50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKVswXTtcblxuICAgICAgICBjb25zdCBwcmV2TmlnaHRTaGlmdCA9IGV4aXN0aW5nU2hpZnRzLmZpbmQoXG4gICAgICAgICAgICBzID0+IHMuZGF0ZSA9PT0gcHJldkRheVN0cmluZyAmJiBzLmVuZ2luZWVySWQgPT09IGFzc2lnbm1lbnQuZW5naW5lZXJJZCAmJiBzLnNoaWZ0ID09PSBcIk5cIlxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChwcmV2TmlnaHRTaGlmdCkge1xuICAgICAgICAgICAgZXJyb3JzLnB1c2goXCJJbnN1ZmZpY2llbnQgcmVzdDogTmlnaHQgc2hpZnQgZm9sbG93ZWQgYnkgTW9ybmluZyBzaGlmdFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGlzVmFsaWQ6IGVycm9ycy5sZW5ndGggPT09IDAsXG4gICAgICAgIGVycm9yc1xuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCBzaGlmdCBzdGF0aXN0aWNzIGZvciBhbiBlbmdpbmVlciBvdmVyIGEgZGF0ZSByYW5nZVxuICovXG5leHBvcnQgY29uc3QgZ2V0U2hpZnRTdGF0cyA9IChcbiAgICBlbmdpbmVlcklkOiBzdHJpbmcsXG4gICAgc2hpZnRzOiBTaGlmdEFzc2lnbm1lbnRbXSxcbiAgICBzdGFydERhdGU6IHN0cmluZyxcbiAgICBlbmREYXRlOiBzdHJpbmdcbik6IHtcbiAgICB0b3RhbDogbnVtYmVyO1xuICAgIG1vcm5pbmc6IG51bWJlcjtcbiAgICBldmVuaW5nOiBudW1iZXI7XG4gICAgbmlnaHQ6IG51bWJlcjtcbiAgICBkYXlPZmY6IG51bWJlcjtcbiAgICBob2xpZGF5OiBudW1iZXI7XG4gICAgdHJhaW5pbmc6IG51bWJlcjtcbn0gPT4ge1xuICAgIGNvbnN0IGVuZ2luZWVyU2hpZnRzID0gc2hpZnRzLmZpbHRlcihzID0+IHMuZW5naW5lZXJJZCA9PT0gZW5naW5lZXJJZCAmJiBzLmRhdGUgPj0gc3RhcnREYXRlICYmIHMuZGF0ZSA8PSBlbmREYXRlKTtcblxuICAgIGNvbnN0IHN0YXRzID0ge1xuICAgICAgICB0b3RhbDogZW5naW5lZXJTaGlmdHMubGVuZ3RoLFxuICAgICAgICBtb3JuaW5nOiAwLFxuICAgICAgICBldmVuaW5nOiAwLFxuICAgICAgICBuaWdodDogMCxcbiAgICAgICAgZGF5T2ZmOiAwLFxuICAgICAgICBob2xpZGF5OiAwLFxuICAgICAgICB0cmFpbmluZzogMFxuICAgIH07XG5cbiAgICBlbmdpbmVlclNoaWZ0cy5mb3JFYWNoKHNoaWZ0ID0+IHtcbiAgICAgICAgc3dpdGNoIChzaGlmdC5zaGlmdCkge1xuICAgICAgICAgICAgY2FzZSBcIk1cIjpcbiAgICAgICAgICAgICAgICBzdGF0cy5tb3JuaW5nKys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRVwiOlxuICAgICAgICAgICAgICAgIHN0YXRzLmV2ZW5pbmcrKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJOXCI6XG4gICAgICAgICAgICAgICAgc3RhdHMubmlnaHQrKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJEXCI6XG4gICAgICAgICAgICAgICAgc3RhdHMuZGF5T2ZmKys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiSFwiOlxuICAgICAgICAgICAgICAgIHN0YXRzLmhvbGlkYXkrKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJUXCI6XG4gICAgICAgICAgICAgICAgc3RhdHMudHJhaW5pbmcrKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN0YXRzO1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBDU1MgY2xhc3MgbmFtZXMgZm9yIGEgc2hpZnQgY2VsbFxuICovXG5leHBvcnQgY29uc3QgZ2V0U2hpZnRDU1NDbGFzc2VzID0gKHNoaWZ0PzogU2hpZnRBc3NpZ25tZW50KTogc3RyaW5nID0+IHtcbiAgICBpZiAoIXNoaWZ0KSB7XG4gICAgICAgIHJldHVybiBcImRheS1jZWxsIGVtcHR5XCI7XG4gICAgfVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IFtcImRheS1jZWxsXCIsIFwiaGFzLXNoaWZ0XCJdO1xuXG4gICAgLy8gQWRkIHNoaWZ0IHR5cGUgY2xhc3NcbiAgICBjbGFzc2VzLnB1c2goYHNoaWZ0LSR7c2hpZnQuc2hpZnQ/LnRvTG93ZXJDYXNlKCkgfHwgXCJ1bmtub3duXCJ9YCk7XG5cbiAgICAvLyBBZGQgc3RhdHVzIGNsYXNzXG4gICAgaWYgKHNoaWZ0LnN0YXR1cykge1xuICAgICAgICBjbGFzc2VzLnB1c2goYHN0YXR1cy0ke3NoaWZ0LnN0YXR1cy50b0xvd2VyQ2FzZSgpfWApO1xuICAgIH1cblxuICAgIC8vIEFkZCBldmVudCB0eXBlIGNsYXNzXG4gICAgaWYgKHNoaWZ0LmV2ZW50VHlwZSkge1xuICAgICAgICBjbGFzc2VzLnB1c2goYGV2ZW50LSR7c2hpZnQuZXZlbnRUeXBlLnRvTG93ZXJDYXNlKCl9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzZXMuam9pbihcIiBcIik7XG59O1xuIiwiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUVsZW1lbnQsIE1vdXNlRXZlbnQsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IERheUNlbGxQcm9wcyB9IGZyb20gXCIuLi90eXBlcy9zaGlmdFNjaGVkdWxlclwiO1xuaW1wb3J0IHsgZ2V0U2hpZnRDb2xvciwgZ2V0U2hpZnREaXNwbGF5VGV4dCB9IGZyb20gXCIuLi91dGlscy9zaGlmdEhlbHBlcnNcIjtcblxuY29uc3QgRGF5Q2VsbDogUmVhY3QuRkM8RGF5Q2VsbFByb3BzPiA9ICh7XG4gICAgZGF0ZSxcbiAgICBlbmdpbmVlcixcbiAgICBzaGlmdCxcbiAgICBpc1RvZGF5ID0gZmFsc2UsXG4gICAgaXNXZWVrZW5kID0gZmFsc2UsXG4gICAgaXNTZWxlY3RlZCA9IGZhbHNlLFxuICAgIHNoaWZ0c0xvYWRpbmcgPSBmYWxzZSxcbiAgICBvbkRvdWJsZUNsaWNrLFxuICAgIG9uQ2VsbENsaWNrLFxuICAgIG9uQ29udGV4dE1lbnUsXG4gICAgcmVhZE9ubHkgPSBmYWxzZVxufSkgPT4ge1xuICAgIC8vIE1lbW9pemUgY2VsbCBzdHlsaW5nIGFuZCBjb250ZW50IGZvciBwZXJmb3JtYW5jZVxuICAgIGNvbnN0IGNlbGxEYXRhID0gdXNlTWVtbygoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRheU51bWJlciA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICBjb25zdCBzaGlmdENvbG9yID0gc2hpZnQgPyBnZXRTaGlmdENvbG9yKHNoaWZ0LnNoaWZ0KSA6IG51bGw7XG4gICAgICAgIGNvbnN0IHNoaWZ0VGV4dCA9IHNoaWZ0ID8gZ2V0U2hpZnREaXNwbGF5VGV4dChzaGlmdC5zaGlmdCkgOiBudWxsO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXlOdW1iZXIsXG4gICAgICAgICAgICBzaGlmdENvbG9yLFxuICAgICAgICAgICAgc2hpZnRUZXh0LFxuICAgICAgICAgICAgaGFzU2hpZnQ6ICEhc2hpZnQsXG4gICAgICAgICAgICBpc0Vycm9yOiBzaGlmdD8uc3RhdHVzID09PSBcImVycm9yXCJcbiAgICAgICAgfTtcbiAgICB9LCBbZGF0ZSwgc2hpZnRdKTtcblxuICAgIGNvbnN0IGhhbmRsZUNvbnRleHQgPSAoZTogTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKHJlYWRPbmx5IHx8ICFvbkNvbnRleHRNZW51KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IGRhdGUudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF07XG4gICAgICAgIG9uQ29udGV4dE1lbnUoZSwgZW5naW5lZXIsIGRhdGVTdHJpbmcsIHNoaWZ0KTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlRG91YmxlQ2xpY2sgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGlmIChyZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBvbkRvdWJsZUNsaWNrKCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBpbiBEYXlDZWxsIG9uRG91YmxlQ2xpY2sgZm9yICR7ZW5naW5lZXIubmFtZX0gb24gJHtkYXRlLnRvRGF0ZVN0cmluZygpfTpgLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoZTogTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pOiB2b2lkID0+IHtcbiAgICAgICAgLy8gUHJldmVudCB0ZXh0IHNlbGVjdGlvbiB3aGVuIHVzaW5nIFNoaWZ0K2NsaWNrIGZvciByYW5nZSBzZWxlY3Rpb25cbiAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBvbkNlbGxDbGljayhlKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGluIERheUNlbGwgb25DbGljayBmb3IgJHtlbmdpbmVlci5uYW1lfSBvbiAke2RhdGUudG9EYXRlU3RyaW5nKCl9OmAsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZURvd24gPSAoZTogTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pOiB2b2lkID0+IHtcbiAgICAgICAgLy8gUHJldmVudCB0ZXh0IHNlbGVjdGlvbiBvbiBtb3VzZWRvd24gZm9yIGFsbCBtb2RpZmllciBrZXkgY29tYmluYXRpb25zXG4gICAgICAgIGlmIChlLnNoaWZ0S2V5IHx8IGUuY3RybEtleSB8fCBlLm1ldGFLZXkpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBCdWlsZCBDU1MgY2xhc3Nlc1xuICAgIGNvbnN0IGNlbGxDbGFzc2VzID0gW1xuICAgICAgICBcImRheS1jZWxsXCIsXG4gICAgICAgIGlzVG9kYXkgJiYgXCJkYXktY2VsbC10b2RheVwiLFxuICAgICAgICBpc1dlZWtlbmQgJiYgXCJkYXktY2VsbC13ZWVrZW5kXCIsXG4gICAgICAgIGlzU2VsZWN0ZWQgJiYgXCJkYXktY2VsbC1zZWxlY3RlZFwiLFxuICAgICAgICBjZWxsRGF0YS5oYXNTaGlmdCAmJiBcImRheS1jZWxsLWhhcy1zaGlmdFwiLFxuICAgICAgICBjZWxsRGF0YS5pc0Vycm9yICYmIFwiZGF5LWNlbGwtZXJyb3JcIixcbiAgICAgICAgcmVhZE9ubHkgJiYgXCJkYXktY2VsbC1yZWFkb25seVwiXG4gICAgXVxuICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgIC5qb2luKFwiIFwiKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2VsbENsYXNzZXN9XG4gICAgICAgICAgICBvbkRvdWJsZUNsaWNrPXtoYW5kbGVEb3VibGVDbGlja31cbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNsaWNrfVxuICAgICAgICAgICAgb25Nb3VzZURvd249e2hhbmRsZU1vdXNlRG93bn1cbiAgICAgICAgICAgIG9uQ29udGV4dE1lbnU9e2hhbmRsZUNvbnRleHR9XG4gICAgICAgICAgICB0aXRsZT17YCR7ZW5naW5lZXIubmFtZX0gLSAke2RhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCl9JHtcbiAgICAgICAgICAgICAgICBzaGlmdCA/IGAgKCR7c2hpZnQuc2hpZnR9JHtzaGlmdC5zdGF0dXMgPyBgIC0gJHtzaGlmdC5zdGF0dXN9YCA6IFwiXCJ9KWAgOiBcIiAtIE5vIHNoaWZ0XCJcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNlbGxEYXRhLnNoaWZ0Q29sb3IgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGN1cnNvcjogcmVhZE9ubHkgPyBcImRlZmF1bHRcIiA6IFwicG9pbnRlclwiXG4gICAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRheS1udW1iZXJcIj57Y2VsbERhdGEuZGF5TnVtYmVyfTwvZGl2PlxuICAgICAgICAgICAge2NlbGxEYXRhLmhhc1NoaWZ0ID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2hpZnQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzaGlmdC10ZXh0XCI+e2NlbGxEYXRhLnNoaWZ0VGV4dH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIHtzaGlmdD8uc3RhdHVzID09PSBcImVycm9yXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic2hpZnQtZXJyb3ItaW5kaWNhdG9yXCIgdGl0bGU9XCJFcnJvciBsb2FkaW5nIHNoaWZ0IGRhdGFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDimqDvuI9cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiBzaGlmdHNMb2FkaW5nID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGF5LWNlbGwtbG9hZGluZ1wiIHRpdGxlPVwiTG9hZGluZyBzaGlmdHMuLi5cIj5cbiAgICAgICAgICAgICAgICAgICAgLi4uXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGF5LWNlbGwtZW1wdHlcIiB0aXRsZT1cIk5vIHNoaWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgIC1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEYXlDZWxsO1xuIiwiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUVsZW1lbnQsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBFbmdpbmVlciwgU2hpZnRBc3NpZ25tZW50IH0gZnJvbSBcIi4uL3R5cGVzL3NoaWZ0U2NoZWR1bGVyXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGV4dE1lbnVPcHRpb24ge1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgaWNvbj86IHN0cmluZztcbiAgICBhY3Rpb246ICgpID0+IHZvaWQ7XG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICAgIHNlcGFyYXRvcj86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGV4dE1lbnVQcm9wcyB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICBvcHRpb25zOiBDb250ZXh0TWVudU9wdGlvbltdO1xuICAgIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gICAgdmlzaWJsZTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IENvbnRleHRNZW51OiBSZWFjdC5GQzxDb250ZXh0TWVudVByb3BzPiA9ICh7IHgsIHksIG9wdGlvbnMsIG9uQ2xvc2UsIHZpc2libGUgfSkgPT4ge1xuICAgIGNvbnN0IG1lbnVSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgaGFuZGxlQ2xpY2tPdXRzaWRlID0gKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgICAgICAgICBpZiAobWVudVJlZi5jdXJyZW50ICYmICFtZW51UmVmLmN1cnJlbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIE5vZGUpKSB7XG4gICAgICAgICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGhhbmRsZUVzY2FwZSA9IChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgICAgICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodmlzaWJsZSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVDbGlja091dHNpZGUpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlRXNjYXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZUNsaWNrT3V0c2lkZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVFc2NhcGUpO1xuICAgICAgICB9O1xuICAgIH0sIFt2aXNpYmxlLCBvbkNsb3NlXSk7XG5cbiAgICBpZiAoIXZpc2libGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgcmVmPXttZW51UmVmfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiY29udGV4dC1tZW51XCJcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICAgICAgICAgICAgICBsZWZ0OiB4LFxuICAgICAgICAgICAgICAgIHRvcDogeSxcbiAgICAgICAgICAgICAgICB6SW5kZXg6IDEwMDBcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkNsaWNrPXtlID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9XG4gICAgICAgID5cbiAgICAgICAgICAgIHtvcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT5cbiAgICAgICAgICAgICAgICBvcHRpb24uc2VwYXJhdG9yID8gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aW5kZXh9IGNsYXNzTmFtZT1cImNvbnRleHQtbWVudS1zZXBhcmF0b3JcIiAvPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bjb250ZXh0LW1lbnUtaXRlbSAke29wdGlvbi5kaXNhYmxlZCA/IFwiZGlzYWJsZWRcIiA6IFwiXCJ9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24uYWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7b3B0aW9uLmljb24gJiYgPHNwYW4gY2xhc3NOYW1lPVwiY29udGV4dC1tZW51LWljb25cIj57b3B0aW9uLmljb259PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNvbnRleHQtbWVudS1sYWJlbFwiPntvcHRpb24ubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuLy8gQ29udGV4dCBtZW51IGZhY3RvcnkgZnVuY3Rpb25zXG5leHBvcnQgY29uc3QgY3JlYXRlRW1wdHlDZWxsTWVudSA9IChcbiAgICBlbmdpbmVlcjogRW5naW5lZXIsXG4gICAgZGF0ZTogc3RyaW5nLFxuICAgIG9uQ3JlYXRlU2hpZnQ6IChlbmdpbmVlcklkOiBzdHJpbmcsIGRhdGU6IHN0cmluZykgPT4gdm9pZFxuKTogQ29udGV4dE1lbnVPcHRpb25bXSA9PiBbXG4gICAge1xuICAgICAgICBsYWJlbDogYENyZWF0ZSBzaGlmdCBmb3IgJHtlbmdpbmVlci5uYW1lfWAsXG4gICAgICAgIGljb246IFwi4p6VXCIsXG4gICAgICAgIGFjdGlvbjogKCkgPT4gb25DcmVhdGVTaGlmdChlbmdpbmVlci5pZCwgZGF0ZSlcbiAgICB9XG5dO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRXhpc3RpbmdTaGlmdE1lbnUgPSAoXG4gICAgc2hpZnQ6IFNoaWZ0QXNzaWdubWVudCxcbiAgICBlbmdpbmVlcjogRW5naW5lZXIsXG4gICAgb25FZGl0U2hpZnQ6IChzaGlmdDogU2hpZnRBc3NpZ25tZW50KSA9PiB2b2lkLFxuICAgIG9uRGVsZXRlU2hpZnQ6IChzaGlmdDogU2hpZnRBc3NpZ25tZW50KSA9PiB2b2lkXG4pOiBDb250ZXh0TWVudU9wdGlvbltdID0+IFtcbiAgICB7XG4gICAgICAgIGxhYmVsOiBgJHtlbmdpbmVlci5uYW1lfSAtICR7c2hpZnQuZGF0ZX1gLFxuICAgICAgICBpY29uOiBcIvCfk4VcIixcbiAgICAgICAgYWN0aW9uOiAoKSA9PiB7fSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb25cbiAgICAgICAgZGlzYWJsZWQ6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbGFiZWw6IGAke3NoaWZ0LnNoaWZ0fSBTaGlmdGAsXG4gICAgICAgIGljb246IGdldFNoaWZ0SWNvbihzaGlmdC5zaGlmdCksXG4gICAgICAgIGFjdGlvbjogKCkgPT4ge30sIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWZ1bmN0aW9uXG4gICAgICAgIGRpc2FibGVkOiB0cnVlXG4gICAgfSxcbiAgICB7IHNlcGFyYXRvcjogdHJ1ZSB9IGFzIENvbnRleHRNZW51T3B0aW9uLFxuICAgIHtcbiAgICAgICAgbGFiZWw6IFwiRWRpdCBTaGlmdFwiLFxuICAgICAgICBpY29uOiBcIuKcj++4j1wiLFxuICAgICAgICBhY3Rpb246ICgpID0+IG9uRWRpdFNoaWZ0KHNoaWZ0KVxuICAgIH0sXG4gICAgeyBzZXBhcmF0b3I6IHRydWUgfSBhcyBDb250ZXh0TWVudU9wdGlvbixcbiAgICB7XG4gICAgICAgIGxhYmVsOiBcIkRlbGV0ZSBTaGlmdFwiLFxuICAgICAgICBpY29uOiBcIvCfl5HvuI9cIixcbiAgICAgICAgYWN0aW9uOiAoKSA9PiBvbkRlbGV0ZVNoaWZ0KHNoaWZ0KVxuICAgIH1cbl07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVNdWx0aVNlbGVjdE1lbnUgPSAoXG4gICAgc2VsZWN0ZWRDb3VudDogbnVtYmVyLFxuICAgIG9uQmF0Y2hDcmVhdGU6ICgpID0+IHZvaWQsXG4gICAgb25CYXRjaEVkaXQ6ICgpID0+IHZvaWQsXG4gICAgb25CYXRjaERlbGV0ZTogKCkgPT4gdm9pZCxcbiAgICBvbkNsZWFyU2VsZWN0aW9uOiAoKSA9PiB2b2lkXG4pOiBDb250ZXh0TWVudU9wdGlvbltdID0+IFtcbiAgICB7XG4gICAgICAgIGxhYmVsOiBgJHtzZWxlY3RlZENvdW50fSBjZWxscyBzZWxlY3RlZGAsXG4gICAgICAgIGljb246IFwi8J+TilwiLFxuICAgICAgICBhY3Rpb246ICgpID0+IHt9LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvblxuICAgICAgICBkaXNhYmxlZDogdHJ1ZVxuICAgIH0sXG4gICAgeyBzZXBhcmF0b3I6IHRydWUgfSBhcyBDb250ZXh0TWVudU9wdGlvbixcbiAgICB7XG4gICAgICAgIGxhYmVsOiBcIkJhdGNoIENyZWF0ZVwiLFxuICAgICAgICBpY29uOiBcIuKelVwiLFxuICAgICAgICBhY3Rpb246IG9uQmF0Y2hDcmVhdGVcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbGFiZWw6IFwiQmF0Y2ggRWRpdFwiLFxuICAgICAgICBpY29uOiBcIuKcj++4j1wiLFxuICAgICAgICBhY3Rpb246IG9uQmF0Y2hFZGl0XG4gICAgfSxcbiAgICB7IHNlcGFyYXRvcjogdHJ1ZSB9IGFzIENvbnRleHRNZW51T3B0aW9uLFxuICAgIHtcbiAgICAgICAgbGFiZWw6IFwiQmF0Y2ggRGVsZXRlXCIsXG4gICAgICAgIGljb246IFwi8J+Xke+4j1wiLFxuICAgICAgICBhY3Rpb246IG9uQmF0Y2hEZWxldGVcbiAgICB9LFxuICAgIHsgc2VwYXJhdG9yOiB0cnVlIH0gYXMgQ29udGV4dE1lbnVPcHRpb24sXG4gICAge1xuICAgICAgICBsYWJlbDogXCJDbGVhciBTZWxlY3Rpb25cIixcbiAgICAgICAgaWNvbjogXCLinYxcIixcbiAgICAgICAgYWN0aW9uOiBvbkNsZWFyU2VsZWN0aW9uXG4gICAgfVxuXTtcblxuZnVuY3Rpb24gZ2V0U2hpZnRJY29uKHNoaWZ0VHlwZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBzd2l0Y2ggKHNoaWZ0VHlwZSkge1xuICAgICAgICBjYXNlIFwiTVwiOlxuICAgICAgICAgICAgcmV0dXJuIFwi8J+MhVwiO1xuICAgICAgICBjYXNlIFwiRVwiOlxuICAgICAgICAgICAgcmV0dXJuIFwi8J+MhlwiO1xuICAgICAgICBjYXNlIFwiTlwiOlxuICAgICAgICAgICAgcmV0dXJuIFwi8J+MmVwiO1xuICAgICAgICBjYXNlIFwiRFwiOlxuICAgICAgICAgICAgcmV0dXJuIFwi8J+PoFwiO1xuICAgICAgICBjYXNlIFwiSFwiOlxuICAgICAgICAgICAgcmV0dXJuIFwi8J+Plu+4j1wiO1xuICAgICAgICBjYXNlIFwiVFwiOlxuICAgICAgICAgICAgcmV0dXJuIFwi8J+TmlwiO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIFwi4o+wXCI7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUVsZW1lbnQsIHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZU1lbW8sIHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBhZGREYXlzLCBnZXREdXJhdGlvbkluTWludXRlcywgZm9ybWF0RGF0ZUZvclNoaWZ0IH0gZnJvbSBcIi4uL3V0aWxzL2RhdGVIZWxwZXJzXCI7XG5pbXBvcnQgeyB1c2VTY3JvbGxOYXZpZ2F0aW9uIH0gZnJvbSBcIi4uL2hvb2tzL3VzZVNjcm9sbE5hdmlnYXRpb25cIjtcbmltcG9ydCB7IHVzZVRlYW1BY2Nlc3MsIFRlYW1BY2Nlc3NDb25maWcgfSBmcm9tIFwiLi4vaG9va3MvdXNlVGVhbUFjY2Vzc1wiO1xuaW1wb3J0IHsgRW1wdHlTdGF0ZSwgd2l0aEVycm9yQm91bmRhcnkgfSBmcm9tIFwiLi9Mb2FkaW5nU3RhdGVzXCI7XG5pbXBvcnQgRGF5Q2VsbCBmcm9tIFwiLi9EYXlDZWxsXCI7XG5pbXBvcnQge1xuICAgIENvbnRleHRNZW51LFxuICAgIENvbnRleHRNZW51T3B0aW9uLFxuICAgIGNyZWF0ZUVtcHR5Q2VsbE1lbnUsXG4gICAgY3JlYXRlRXhpc3RpbmdTaGlmdE1lbnUsXG4gICAgY3JlYXRlTXVsdGlTZWxlY3RNZW51XG59IGZyb20gXCIuL0NvbnRleHRNZW51XCI7XG5pbXBvcnQgeyBFbmdpbmVlciwgU2hpZnRBc3NpZ25tZW50IH0gZnJvbSBcIi4uL3R5cGVzL3NoaWZ0U2NoZWR1bGVyXCI7XG5cbmludGVyZmFjZSBTY2hlZHVsZUdyaWRQcm9wcyB7XG4gICAgZW5naW5lZXJzOiBFbmdpbmVlcltdO1xuICAgIHNoaWZ0czogU2hpZnRBc3NpZ25tZW50W107XG4gICAgZ2V0U2hpZnRzRm9yRW5naW5lZXI6IChlbmdpbmVlcklkOiBzdHJpbmcpID0+IFNoaWZ0QXNzaWdubWVudFtdO1xuICAgIGdldEVuZ2luZWVyc0J5VGVhbTogKCkgPT4geyBbdGVhbTogc3RyaW5nXTogRW5naW5lZXJbXSB9O1xuICAgIG9uRWRpdFNoaWZ0OiAoc2hpZnQ6IGFueSkgPT4gdm9pZDtcbiAgICBvbkNyZWF0ZVNoaWZ0PzogKGVuZ2luZWVySWQ6IHN0cmluZywgZGF0ZTogc3RyaW5nKSA9PiB2b2lkO1xuICAgIG9uRGVsZXRlU2hpZnQ/OiAoc2hpZnQ6IGFueSkgPT4gdm9pZDtcbiAgICBvbkJhdGNoQ3JlYXRlPzogKHNlbGVjdGVkQ2VsbHM6IGFueVtdKSA9PiB2b2lkO1xuICAgIG9uQmF0Y2hFZGl0PzogKHNlbGVjdGVkQ2VsbHM6IGFueVtdKSA9PiB2b2lkO1xuICAgIG9uQmF0Y2hEZWxldGU/OiAoc2VsZWN0ZWRDZWxsczogYW55W10pID0+IHZvaWQ7XG4gICAgcmVhZE9ubHk/OiBib29sZWFuO1xuICAgIGNsYXNzTmFtZT86IHN0cmluZztcbiAgICB0ZWFtQWNjZXNzPzogVGVhbUFjY2Vzc0NvbmZpZztcbiAgICBzaG93RGVidWdJbmZvPzogYm9vbGVhbjtcbiAgICBzaGlmdHNMb2FkaW5nPzogYm9vbGVhbjtcbiAgICBkZWJ1Z0luZm8/OiB7XG4gICAgICAgIGF0dHJpYnV0ZXNDb25maWd1cmVkOiB7XG4gICAgICAgICAgICBuYW1lOiBib29sZWFuO1xuICAgICAgICAgICAgaGVhZGVyOiBib29sZWFuO1xuICAgICAgICAgICAgc3ViaGVhZGVyOiBib29sZWFuO1xuICAgICAgICAgICAgc3BVc2VyQXNzb2NpYXRpb246IGJvb2xlYW47XG4gICAgICAgICAgICBzaGlmdEFzc29jaWF0aW9uOiBib29sZWFuO1xuICAgICAgICAgICAgc2hpZnREYXRlOiBib29sZWFuO1xuICAgICAgICB9O1xuICAgIH07XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIGRpc2FibGVkIGFjdGlvbnMgd2l0aCBjb3JyZWN0IHNpZ25hdHVyZXNcbmNvbnN0IG5vT3BTaGlmdEZ1bmN0aW9uID0gKF9zaGlmdDogYW55KTogdm9pZCA9PiB7XG4gICAgLy8gSW50ZW50aW9uYWxseSBlbXB0eSAtIHVzZWQgZm9yIGRpc2FibGVkIHNoaWZ0IG1lbnUgYWN0aW9uc1xufTtcblxuY29uc3Qgbm9PcEZ1bmN0aW9uID0gKCk6IHZvaWQgPT4ge1xuICAgIC8vIEludGVudGlvbmFsbHkgZW1wdHkgLSB1c2VkIGZvciBkaXNhYmxlZCBtZW51IGFjdGlvbnNcbn07XG5cbmNvbnN0IFNjaGVkdWxlR3JpZDogUmVhY3QuRkM8U2NoZWR1bGVHcmlkUHJvcHM+ID0gKHtcbiAgICBlbmdpbmVlcnM6IF9lbmdpbmVlcnMsXG4gICAgc2hpZnRzLFxuICAgIGdldFNoaWZ0c0ZvckVuZ2luZWVyOiBfZ2V0U2hpZnRzRm9yRW5naW5lZXIsXG4gICAgZ2V0RW5naW5lZXJzQnlUZWFtLFxuICAgIG9uRWRpdFNoaWZ0LFxuICAgIG9uQ3JlYXRlU2hpZnQsXG4gICAgb25EZWxldGVTaGlmdCxcbiAgICBvbkJhdGNoQ3JlYXRlLFxuICAgIG9uQmF0Y2hFZGl0LFxuICAgIG9uQmF0Y2hEZWxldGUsXG4gICAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgICBjbGFzc05hbWUgPSBcIlwiLFxuICAgIHRlYW1BY2Nlc3MsXG4gICAgc2hvd0RlYnVnSW5mbyxcbiAgICBzaGlmdHNMb2FkaW5nLFxuICAgIGRlYnVnSW5mb1xufSkgPT4ge1xuICAgIC8vIFRlYW0gYWNjZXNzIGNvbnRyb2wgLSB1c2UgcHJvdmlkZWQgY29uZmlnIG9yIGRlZmF1bHQgdG8gZW5naW5lZXIgcm9sZVxuICAgIGNvbnN0IGRlZmF1bHRUZWFtQWNjZXNzOiBUZWFtQWNjZXNzQ29uZmlnID0ge1xuICAgICAgICB1c2VyUm9sZTogXCJlbmdpbmVlclwiLFxuICAgICAgICBhbGxvd0Nyb3NzVGVhbVZpZXc6IGZhbHNlLFxuICAgICAgICBhbGxvd1NoaWZ0RWRpdGluZzogZmFsc2UsXG4gICAgICAgIGFsbG93QmF0Y2hPcGVyYXRpb25zOiBmYWxzZVxuICAgIH07XG5cbiAgICBjb25zdCBhY2Nlc3NDb25maWcgPSB0ZWFtQWNjZXNzIHx8IGRlZmF1bHRUZWFtQWNjZXNzO1xuICAgIGNvbnN0IHsgZmlsdGVyZWRTaGlmdHMsIGNhbkVkaXRTaGlmdCwgY2FuRGVsZXRlU2hpZnQsIGNhblBlcmZvcm1CYXRjaE9wZXJhdGlvbnMsIHVzZXJQZXJtaXNzaW9ucyB9ID0gdXNlVGVhbUFjY2VzcyhcbiAgICAgICAgX2VuZ2luZWVycyxcbiAgICAgICAgc2hpZnRzLFxuICAgICAgICBhY2Nlc3NDb25maWdcbiAgICApO1xuXG4gICAgLy8gVXNlIGZpbHRlcmVkIGRhdGEgYmFzZWQgb24gdXNlciBwZXJtaXNzaW9uc1xuICAgIC8vIFRPRE86IEZpbHRlciB0ZWFtc0RhdGEgdG8gcmVzcGVjdCB1c2VyIGFjY2VzcyBwZXJtaXNzaW9uc1xuICAgIGNvbnN0IGFjY2Vzc2libGVTaGlmdHMgPSBmaWx0ZXJlZFNoaWZ0cztcblxuICAgIC8vIENhbGN1bGF0ZSBkYXRlIHJhbmdlIGZyb20gYWNjZXNzaWJsZSBzaGlmdCBkYXRhXG4gICAgY29uc3QgZGF0ZVJhbmdlID0gdXNlTWVtbygoKSA9PiB7XG4gICAgICAgIGlmIChhY2Nlc3NpYmxlU2hpZnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDogbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICBlbmQ6IGFkZERheXMobmV3IERhdGUoKSwgMzApXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2hpZnREYXRlcyA9IGFjY2Vzc2libGVTaGlmdHMubWFwKHNoaWZ0ID0+IG5ldyBEYXRlKHNoaWZ0LmRhdGUpKS5maWx0ZXIoZGF0ZSA9PiAhaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKTtcbiAgICAgICAgaWYgKHNoaWZ0RGF0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgIGVuZDogYWRkRGF5cyhuZXcgRGF0ZSgpLCAzMClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlYXJsaWVzdERhdGUgPSBuZXcgRGF0ZShNYXRoLm1pbiguLi5zaGlmdERhdGVzLm1hcChkID0+IGQuZ2V0VGltZSgpKSkpO1xuICAgICAgICBjb25zdCBsYXRlc3REYXRlID0gbmV3IERhdGUoTWF0aC5tYXgoLi4uc2hpZnREYXRlcy5tYXAoZCA9PiBkLmdldFRpbWUoKSkpKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IGVhcmxpZXN0RGF0ZSxcbiAgICAgICAgICAgIGVuZDogbGF0ZXN0RGF0ZVxuICAgICAgICB9O1xuICAgIH0sIFthY2Nlc3NpYmxlU2hpZnRzXSk7XG5cbiAgICBjb25zdCBbc3RhcnREYXRlXSA9IHVzZVN0YXRlKGRhdGVSYW5nZS5zdGFydCk7XG4gICAgY29uc3QgW2VuZERhdGUsIHNldEVuZERhdGVdID0gdXNlU3RhdGUoZGF0ZVJhbmdlLmVuZCk7XG4gICAgY29uc3QgW3NlbGVjdGVkQ2VsbHMsIHNldFNlbGVjdGVkQ2VsbHNdID0gdXNlU3RhdGU8QXJyYXk8eyBlbmdpbmVlcklkOiBzdHJpbmc7IGRhdGU6IHN0cmluZyB9Pj4oW10pO1xuICAgIGNvbnN0IFtsYXN0U2VsZWN0ZWRDZWxsLCBzZXRMYXN0U2VsZWN0ZWRDZWxsXSA9IHVzZVN0YXRlPHsgZW5naW5lZXJJZDogc3RyaW5nOyBkYXRlOiBzdHJpbmcgfSB8IG51bGw+KG51bGwpO1xuXG4gICAgLy8gQ29udGV4dCBtZW51IHN0YXRlXG4gICAgY29uc3QgW2NvbnRleHRNZW51LCBzZXRDb250ZXh0TWVudV0gPSB1c2VTdGF0ZTx7XG4gICAgICAgIHZpc2libGU6IGJvb2xlYW47XG4gICAgICAgIHg6IG51bWJlcjtcbiAgICAgICAgeTogbnVtYmVyO1xuICAgICAgICBvcHRpb25zOiBDb250ZXh0TWVudU9wdGlvbltdO1xuICAgIH0+KHtcbiAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDAsXG4gICAgICAgIG9wdGlvbnM6IFtdXG4gICAgfSk7XG5cbiAgICAvLyBTY3JvbGwgbmF2aWdhdGlvbiBob29rIGZvciB1bmlmaWVkIHNjcm9sbGluZyBhbmQgaW5maW5pdGUgbG9hZGluZ1xuICAgIGNvbnN0IHsgaGVhZGVyU2Nyb2xsUmVmLCBjb250ZW50U2Nyb2xsUmVmLCBpbmZpbml0ZVNjcm9sbFJlZiwgaXNJbmZpbml0ZVNjcm9sbFZpc2libGUgfSA9IHVzZVNjcm9sbE5hdmlnYXRpb24oKTtcblxuICAgIC8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIG11bHRpLXNlbGVjdFxuICAgIGNvbnN0IGlzQ2VsbFNlbGVjdGVkID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChlbmdpbmVlcklkOiBzdHJpbmcsIGRhdGU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkQ2VsbHMuc29tZShjZWxsID0+IGNlbGwuZW5naW5lZXJJZCA9PT0gZW5naW5lZXJJZCAmJiBjZWxsLmRhdGUgPT09IGRhdGUpO1xuICAgICAgICB9LFxuICAgICAgICBbc2VsZWN0ZWRDZWxsc11cbiAgICApO1xuXG4gICAgLy8gSGFuZGxlIGluZmluaXRlIHNjcm9sbCBsb2FkaW5nIHdoZW4gc2VudGluZWwgY29tZXMgaW50byB2aWV3XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGlzSW5maW5pdGVTY3JvbGxWaXNpYmxlKSB7XG4gICAgICAgICAgICBzZXRFbmREYXRlKGQgPT4gYWRkRGF5cyhkLCAxNSkpO1xuICAgICAgICB9XG4gICAgfSwgW2lzSW5maW5pdGVTY3JvbGxWaXNpYmxlXSk7XG5cbiAgICAvLyBNZW1vaXplIHRlYW1zIGRhdGEgZm9yIHBlcmZvcm1hbmNlXG4gICAgY29uc3QgdGVhbXNEYXRhID0gdXNlTWVtbygoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0RW5naW5lZXJzQnlUZWFtKCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJFcnJvciBnZXR0aW5nIGVuZ2luZWVycyBieSB0ZWFtOlwiLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cbiAgICB9LCBbZ2V0RW5naW5lZXJzQnlUZWFtXSk7XG5cbiAgICAvLyBHcm91cCBlbmdpbmVlcnMgYnkgSGVhZGVyIOKGkiBTdWJoZWFkZXIg4oaSIEVuZ2luZWVycyAoZGF0YS1kcml2ZW4gd2l0aCBmYWxsYmFjaylcbiAgICBjb25zdCB7IGhlYWRlclN1YmhlYWRlclN0cnVjdHVyZSwgYWxsRW5naW5lZXJzLCBncm91cGluZ0RlYnVnSW5mbyB9ID0gdXNlTWVtbygoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRlYnVnTWVzc2FnZXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgd2UgaGF2ZSBhbnkgaGVhZGVyIGdyb3VwaW5nIGNvbmZpZ3VyZWRcbiAgICAgICAgY29uc3QgaGFzSGVhZGVyR3JvdXBpbmcgPSAhIWRlYnVnSW5mbyAmJiBkZWJ1Z0luZm8uYXR0cmlidXRlc0NvbmZpZ3VyZWQ/LmhlYWRlcjtcbiAgICAgICAgY29uc3QgaGFzU3ViaGVhZGVyR3JvdXBpbmcgPSAhIWRlYnVnSW5mbyAmJiBkZWJ1Z0luZm8uYXR0cmlidXRlc0NvbmZpZ3VyZWQ/LnN1YmhlYWRlcjtcblxuICAgICAgICBkZWJ1Z01lc3NhZ2VzLnB1c2goYFByb2Nlc3NpbmcgJHtPYmplY3Qua2V5cyh0ZWFtc0RhdGEpLmxlbmd0aH0gaGVhZGVyIGdyb3Vwc2ApO1xuICAgICAgICBkZWJ1Z01lc3NhZ2VzLnB1c2goYEhlYWRlciBncm91cGluZzogJHtoYXNIZWFkZXJHcm91cGluZyA/IFwi4pyFXCIgOiBcIuKdjFwifWApO1xuICAgICAgICBkZWJ1Z01lc3NhZ2VzLnB1c2goYFN1YmhlYWRlciBncm91cGluZzogJHtoYXNTdWJoZWFkZXJHcm91cGluZyA/IFwi4pyFXCIgOiBcIuKdjFwifWApO1xuXG4gICAgICAgIGlmICghaGFzSGVhZGVyR3JvdXBpbmcpIHtcbiAgICAgICAgICAgIC8vIE5vIGdyb3VwaW5nIC0gZmxhdCBsaXN0IG9mIGFsbCBlbmdpbmVlcnNcbiAgICAgICAgICAgIGNvbnN0IGZsYXRFbmdpbmVlcnMgPSBPYmplY3QudmFsdWVzKHRlYW1zRGF0YSkuZmxhdCgpO1xuICAgICAgICAgICAgZGVidWdNZXNzYWdlcy5wdXNoKFwiTm8gaGVhZGVyIGdyb3VwaW5nIC0gc2hvd2luZyBhbGwgZW5naW5lZXJzIGluIHNpbmdsZSBncm91cFwiKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJTdWJoZWFkZXJTdHJ1Y3R1cmU6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyTmFtZTogXCJBbGwgRW5naW5lZXJzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJJZDogXCJhbGwtZW5naW5lZXJzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJoZWFkZXJzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkdlbmVyYWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lZXJzOiBmbGF0RW5naW5lZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBhbGxFbmdpbmVlcnM6IGZsYXRFbmdpbmVlcnMsXG4gICAgICAgICAgICAgICAgZ3JvdXBpbmdEZWJ1Z0luZm86IGRlYnVnTWVzc2FnZXNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdHJ1Y3R1cmUgPSBPYmplY3QuZW50cmllcyh0ZWFtc0RhdGEpLm1hcCgoW2hlYWRlck5hbWUsIGVuZ2luZWVyc10pID0+IHtcbiAgICAgICAgICAgIGRlYnVnTWVzc2FnZXMucHVzaChgSGVhZGVyIFwiJHtoZWFkZXJOYW1lfVwiOiAke2VuZ2luZWVycy5sZW5ndGh9IGVuZ2luZWVyc2ApO1xuXG4gICAgICAgICAgICBpZiAoIWhhc1N1YmhlYWRlckdyb3VwaW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gT25seSBoZWFkZXIgZ3JvdXBpbmcgLSBubyBzdWJoZWFkZXIgZ3JvdXBpbmdcbiAgICAgICAgICAgICAgICBkZWJ1Z01lc3NhZ2VzLnB1c2goYCAgTm8gc3ViaGVhZGVyIGdyb3VwaW5nIGZvciAke2hlYWRlck5hbWV9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVySWQ6IGhlYWRlck5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiLVwiKSxcbiAgICAgICAgICAgICAgICAgICAgc3ViaGVhZGVyczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiR2VuZXJhbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZWVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQm90aCBoZWFkZXIgYW5kIHN1YmhlYWRlciBncm91cGluZ1xuICAgICAgICAgICAgY29uc3Qgc3ViaGVhZGVyR3JvdXBzOiB7IFtzdWJoZWFkZXI6IHN0cmluZ106IEVuZ2luZWVyW10gfSA9IHt9O1xuXG4gICAgICAgICAgICBlbmdpbmVlcnMuZm9yRWFjaCgoZW5naW5lZXIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gVXNlIGVuZ2luZWVyJ3Mgc3ViaGVhZGVyLCBkZWZhdWx0IHRvICdHZW5lcmFsJyBpZiBub3Qgc3BlY2lmaWVkXG4gICAgICAgICAgICAgICAgY29uc3QgZW5naW5lZXJTdWJoZWFkZXIgPSBlbmdpbmVlci5zdWJoZWFkZXIgfHwgXCJHZW5lcmFsXCI7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXN1YmhlYWRlckdyb3Vwc1tlbmdpbmVlclN1YmhlYWRlcl0pIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViaGVhZGVyR3JvdXBzW2VuZ2luZWVyU3ViaGVhZGVyXSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdWJoZWFkZXJHcm91cHNbZW5naW5lZXJTdWJoZWFkZXJdLnB1c2goZW5naW5lZXIpO1xuXG4gICAgICAgICAgICAgICAgLy8gRGVidWcgZmlyc3QgZmV3IGVuZ2luZWVyc1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVidWdNZXNzYWdlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgYCAgRW5naW5lZXIgJHtpbmRleH06ICR7ZW5naW5lZXIubmFtZX0gKCR7ZW5naW5lZXIuaGVhZGVyfS8ke2VuZ2luZWVyLnN1YmhlYWRlcn0pYFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBTb3J0IHN1YmhlYWRlcnMgYWxwaGFiZXRpY2FsbHkgKGRhdGEtZHJpdmVuLCBubyBoYXJkY29kZWQgb3JkZXIpXG4gICAgICAgICAgICBjb25zdCBzb3J0ZWRTdWJoZWFkZXJzID0gT2JqZWN0LmtleXMoc3ViaGVhZGVyR3JvdXBzKS5zb3J0KCk7XG4gICAgICAgICAgICBkZWJ1Z01lc3NhZ2VzLnB1c2goYCAgU3ViaGVhZGVyczogJHtzb3J0ZWRTdWJoZWFkZXJzLmpvaW4oXCIsIFwiKX1gKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJOYW1lLFxuICAgICAgICAgICAgICAgIGhlYWRlcklkOiBoZWFkZXJOYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIi1cIiksXG4gICAgICAgICAgICAgICAgc3ViaGVhZGVyczogc29ydGVkU3ViaGVhZGVycy5tYXAoc3ViaGVhZGVyID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHN1YmhlYWRlcixcbiAgICAgICAgICAgICAgICAgICAgZW5naW5lZXJzOiBzdWJoZWFkZXJHcm91cHNbc3ViaGVhZGVyXVxuICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZmxhdEVuZ2luZWVyczogRW5naW5lZXJbXSA9IHN0cnVjdHVyZS5mbGF0TWFwKGhlYWRlciA9PlxuICAgICAgICAgICAgaGVhZGVyLnN1YmhlYWRlcnMuZmxhdE1hcChzdWJoZWFkZXIgPT4gc3ViaGVhZGVyLmVuZ2luZWVycylcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4geyBoZWFkZXJTdWJoZWFkZXJTdHJ1Y3R1cmU6IHN0cnVjdHVyZSwgYWxsRW5naW5lZXJzOiBmbGF0RW5naW5lZXJzLCBncm91cGluZ0RlYnVnSW5mbzogZGVidWdNZXNzYWdlcyB9O1xuICAgIH0sIFt0ZWFtc0RhdGEsIGRlYnVnSW5mb10pO1xuXG4gICAgLy8gR2VuZXJhdGUgZGF0ZSBjb2x1bW5zXG4gICAgY29uc3QgZGF0ZUNvbHVtbnMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICAgICAgY29uc3QgZGF5c0NvdW50ID0gTWF0aC5jZWlsKGdldER1cmF0aW9uSW5NaW51dGVzKHN0YXJ0RGF0ZSwgZW5kRGF0ZSkgLyAoNjAgKiAyNCkpO1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogZGF5c0NvdW50IH0sIChfLCBpZHgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBhZGREYXlzKHN0YXJ0RGF0ZSwgaWR4KTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZGF0ZSxcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nOiBmb3JtYXREYXRlRm9yU2hpZnQoZGF0ZSksXG4gICAgICAgICAgICAgICAgaXNUb2RheTogZm9ybWF0RGF0ZUZvclNoaWZ0KGRhdGUpID09PSBmb3JtYXREYXRlRm9yU2hpZnQobmV3IERhdGUoKSksXG4gICAgICAgICAgICAgICAgaXNXZWVrZW5kOiBkYXRlLmdldERheSgpID09PSAwIHx8IGRhdGUuZ2V0RGF5KCkgPT09IDZcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH0sIFtzdGFydERhdGUsIGVuZERhdGVdKTtcblxuICAgIC8vIE11bHRpLXNlbGVjdCBjZWxsIGZ1bmN0aW9uIChkZWZpbmVkIGFmdGVyIGFsbEVuZ2luZWVycyBhbmQgZGF0ZUNvbHVtbnMgYXJlIGF2YWlsYWJsZSlcbiAgICBjb25zdCBzZWxlY3RDZWxsID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChlbmdpbmVlcklkOiBzdHJpbmcsIGRhdGU6IHN0cmluZywgY3RybEtleTogYm9vbGVhbiwgc2hpZnRLZXk6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0NlbGwgPSB7IGVuZ2luZWVySWQsIGRhdGUgfTtcblxuICAgICAgICAgICAgaWYgKHNoaWZ0S2V5ICYmIGxhc3RTZWxlY3RlZENlbGwpIHtcbiAgICAgICAgICAgICAgICAvLyBTaGlmdCtjbGljazogc2VsZWN0IHJhbmdlIGZyb20gbGFzdCBzZWxlY3RlZCB0byBjdXJyZW50XG4gICAgICAgICAgICAgICAgY29uc3QgZW5naW5lZXJTdGFydCA9IGFsbEVuZ2luZWVycy5maW5kSW5kZXgoZSA9PiBlLmlkID09PSBsYXN0U2VsZWN0ZWRDZWxsLmVuZ2luZWVySWQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuZ2luZWVyRW5kID0gYWxsRW5naW5lZXJzLmZpbmRJbmRleChlID0+IGUuaWQgPT09IGVuZ2luZWVySWQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVTdGFydCA9IGRhdGVDb2x1bW5zLmZpbmRJbmRleChkID0+IGQuZGF0ZVN0cmluZyA9PT0gbGFzdFNlbGVjdGVkQ2VsbC5kYXRlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlRW5kID0gZGF0ZUNvbHVtbnMuZmluZEluZGV4KGQgPT4gZC5kYXRlU3RyaW5nID09PSBkYXRlKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbkVuZ2luZWVyID0gTWF0aC5taW4oZW5naW5lZXJTdGFydCwgZW5naW5lZXJFbmQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1heEVuZ2luZWVyID0gTWF0aC5tYXgoZW5naW5lZXJTdGFydCwgZW5naW5lZXJFbmQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1pbkRhdGUgPSBNYXRoLm1pbihkYXRlU3RhcnQsIGRhdGVFbmQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1heERhdGUgPSBNYXRoLm1heChkYXRlU3RhcnQsIGRhdGVFbmQpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZ2VDZWxsczogQXJyYXk8eyBlbmdpbmVlcklkOiBzdHJpbmc7IGRhdGU6IHN0cmluZyB9PiA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGUgPSBtaW5FbmdpbmVlcjsgZSA8PSBtYXhFbmdpbmVlcjsgZSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGQgPSBtaW5EYXRlOyBkIDw9IG1heERhdGU7IGQrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFsbEVuZ2luZWVyc1tlXSAmJiBkYXRlQ29sdW1uc1tkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlQ2VsbHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZWVySWQ6IGFsbEVuZ2luZWVyc1tlXS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZTogZGF0ZUNvbHVtbnNbZF0uZGF0ZVN0cmluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGN0cmxLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ3RybCtTaGlmdDogYWRkIHJhbmdlIHRvIGV4aXN0aW5nIHNlbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZENlbGxzKHByZXYgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3U2VsZWN0aW9uID0gWy4uLnByZXZdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VDZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIW5ld1NlbGVjdGlvbi5zb21lKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcgPT4gZXhpc3RpbmcuZW5naW5lZXJJZCA9PT0gY2VsbC5lbmdpbmVlcklkICYmIGV4aXN0aW5nLmRhdGUgPT09IGNlbGwuZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NlbGVjdGlvbi5wdXNoKGNlbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld1NlbGVjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2hpZnQgb25seTogcmVwbGFjZSBzZWxlY3Rpb24gd2l0aCByYW5nZVxuICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZENlbGxzKHJhbmdlQ2VsbHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3RybEtleSkge1xuICAgICAgICAgICAgICAgIC8vIEN0cmwrY2xpY2s6IHRvZ2dsZSBzaW5nbGUgY2VsbFxuICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkQ2VsbHMocHJldiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBwcmV2LnNvbWUoY2VsbCA9PiBjZWxsLmVuZ2luZWVySWQgPT09IGVuZ2luZWVySWQgJiYgY2VsbC5kYXRlID09PSBkYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2LmZpbHRlcihjZWxsID0+ICEoY2VsbC5lbmdpbmVlcklkID09PSBlbmdpbmVlcklkICYmIGNlbGwuZGF0ZSA9PT0gZGF0ZSkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsuLi5wcmV2LCBuZXdDZWxsXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNldExhc3RTZWxlY3RlZENlbGwobmV3Q2VsbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFJlZ3VsYXIgY2xpY2s6IHNlbGVjdCBzaW5nbGUgY2VsbFxuICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkQ2VsbHMoW25ld0NlbGxdKTtcbiAgICAgICAgICAgICAgICBzZXRMYXN0U2VsZWN0ZWRDZWxsKG5ld0NlbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbbGFzdFNlbGVjdGVkQ2VsbCwgYWxsRW5naW5lZXJzLCBkYXRlQ29sdW1uc11cbiAgICApO1xuXG4gICAgLy8gQ29udGV4dCBtZW51IGhhbmRsZXJzXG4gICAgY29uc3QgaGFuZGxlQ2VsbENvbnRleHRNZW51ID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChlOiBSZWFjdC5Nb3VzZUV2ZW50LCBlbmdpbmVlcjogRW5naW5lZXIsIGRhdGU6IHN0cmluZywgc2hpZnQ/OiBTaGlmdEFzc2lnbm1lbnQpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIGxldCBvcHRpb25zOiBDb250ZXh0TWVudU9wdGlvbltdO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBwZXJtaXNzaW9ucyBiZWZvcmUgc2hvd2luZyBjb250ZXh0IG1lbnUgb3B0aW9uc1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkQ2VsbHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGlmIChjYW5QZXJmb3JtQmF0Y2hPcGVyYXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE11bHRpLXNlbGVjdGlvbiBjb250ZXh0IG1lbnUgKGZ1bGwgcGVybWlzc2lvbnMpXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBjcmVhdGVNdWx0aVNlbGVjdE1lbnUoXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENlbGxzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob25CYXRjaENyZWF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJhdGNoQ3JlYXRlKHNlbGVjdGVkQ2VsbHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uQmF0Y2hFZGl0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQmF0Y2hFZGl0KHNlbGVjdGVkQ2VsbHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uQmF0Y2hEZWxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25CYXRjaERlbGV0ZShzZWxlY3RlZENlbGxzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkQ2VsbHMoW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldExhc3RTZWxlY3RlZENlbGwobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTGltaXRlZCBtZW51IHdoZW4gbm8gYmF0Y2ggcGVybWlzc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogYCR7c2VsZWN0ZWRDZWxscy5sZW5ndGh9IGNlbGxzIHNlbGVjdGVkYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcIvCfk4pcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5vT3BGdW5jdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXBhcmF0b3I6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzZXBhcmF0b3I6IHRydWUgfSBhcyBDb250ZXh0TWVudU9wdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDbGVhciBTZWxlY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcIuKclVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZENlbGxzKFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TGFzdFNlbGVjdGVkQ2VsbChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXBhcmF0b3I6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkJhdGNoIG9wZXJhdGlvbnMgbm90IHBlcm1pdHRlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwi8J+UklwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbm9PcEZ1bmN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcGFyYXRvcjogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNoaWZ0KSB7XG4gICAgICAgICAgICAgICAgLy8gRXhpc3Rpbmcgc2hpZnQgY29udGV4dCBtZW51IChjaGVjayBlZGl0L2RlbGV0ZSBwZXJtaXNzaW9ucylcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gY3JlYXRlRXhpc3RpbmdTaGlmdE1lbnUoXG4gICAgICAgICAgICAgICAgICAgIHNoaWZ0LFxuICAgICAgICAgICAgICAgICAgICBlbmdpbmVlcixcbiAgICAgICAgICAgICAgICAgICAgY2FuRWRpdFNoaWZ0KHNoaWZ0KVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBzaGlmdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob25FZGl0U2hpZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVkaXRTaGlmdChzaGlmdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogbm9PcFNoaWZ0RnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIGNhbkRlbGV0ZVNoaWZ0KHNoaWZ0KVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBzaGlmdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob25EZWxldGVTaGlmdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlU2hpZnQoc2hpZnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA6IG5vT3BTaGlmdEZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob25DcmVhdGVTaGlmdCkge1xuICAgICAgICAgICAgICAgIC8vIEVtcHR5IGNlbGwgY29udGV4dCBtZW51IChvbmx5IGlmIGNyZWF0ZSBhY3Rpb24gaXMgYXZhaWxhYmxlKVxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBjcmVhdGVFbXB0eUNlbGxNZW51KGVuZ2luZWVyLCBkYXRlLCAoZW5naW5lZXJJZCwgZGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAob25DcmVhdGVTaGlmdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25DcmVhdGVTaGlmdChlbmdpbmVlcklkLCBkYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBObyBwZXJtaXNzaW9ucyAtIHNob3cgbGltaXRlZCBtZW51XG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTm8gcGVybWlzc2lvbnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwi8J+UklwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBub09wRnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcGFyYXRvcjogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldENvbnRleHRNZW51KHtcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHg6IGUuY2xpZW50WCxcbiAgICAgICAgICAgICAgICB5OiBlLmNsaWVudFksXG4gICAgICAgICAgICAgICAgb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICAgIG9uQ3JlYXRlU2hpZnQsXG4gICAgICAgICAgICBzZWxlY3RlZENlbGxzLFxuICAgICAgICAgICAgY2FuUGVyZm9ybUJhdGNoT3BlcmF0aW9ucyxcbiAgICAgICAgICAgIGNhbkVkaXRTaGlmdCxcbiAgICAgICAgICAgIGNhbkRlbGV0ZVNoaWZ0LFxuICAgICAgICAgICAgb25FZGl0U2hpZnQsXG4gICAgICAgICAgICBvbkRlbGV0ZVNoaWZ0LFxuICAgICAgICAgICAgb25CYXRjaENyZWF0ZSxcbiAgICAgICAgICAgIG9uQmF0Y2hFZGl0LFxuICAgICAgICAgICAgb25CYXRjaERlbGV0ZSxcbiAgICAgICAgICAgIHNldFNlbGVjdGVkQ2VsbHMsXG4gICAgICAgICAgICBzZXRMYXN0U2VsZWN0ZWRDZWxsXG4gICAgICAgIF1cbiAgICApO1xuXG4gICAgY29uc3QgY2xvc2VDb250ZXh0TWVudSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgc2V0Q29udGV4dE1lbnUocHJldiA9PiAoeyAuLi5wcmV2LCB2aXNpYmxlOiBmYWxzZSB9KSk7XG4gICAgfSwgW10pO1xuXG4gICAgLy8gQ3JlYXRlIHNoaWZ0IGxvb2t1cCBmb3IgcGVyZm9ybWFuY2Ugd2l0aCB0YXJnZXRlZCBkZWJ1Z2dpbmdcbiAgICBjb25zdCBzaGlmdExvb2t1cCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgICAgICBjb25zdCBsb29rdXA6IFJlY29yZDxzdHJpbmcsIFNoaWZ0QXNzaWdubWVudD4gPSB7fTtcblxuICAgICAgICAvLyBGb3JjZSBjb25zb2xlIG91dHB1dCBmb3IgY3JpdGljYWwgZGVidWdnaW5nXG4gICAgICAgIGNvbnNvbGUubG9nKFwi8J+UjSBTSElGVFMgREVCVUcgLSBUb3RhbCBzaGlmdHM6XCIsIGFjY2Vzc2libGVTaGlmdHMubGVuZ3RoKTtcblxuICAgICAgICBhY2Nlc3NpYmxlU2hpZnRzLmZvckVhY2goKHNoaWZ0LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7c2hpZnQuZW5naW5lZXJJZH0tJHtzaGlmdC5kYXRlfWA7XG4gICAgICAgICAgICBsb29rdXBba2V5XSA9IHNoaWZ0O1xuXG4gICAgICAgICAgICAvLyBEZWJ1ZyBvbmx5IGZpcnN0IDIgc2hpZnRzIGR1ZSB0byBsYXJnZSBkYXRhc2V0XG4gICAgICAgICAgICBpZiAoaW5kZXggPCAyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYPCflI0gU0hJRlQgJHtpbmRleH06YCwge1xuICAgICAgICAgICAgICAgICAgICBlbmdpbmVlcklkOiBzaGlmdC5lbmdpbmVlcklkLFxuICAgICAgICAgICAgICAgICAgICBkYXRlOiBzaGlmdC5kYXRlLFxuICAgICAgICAgICAgICAgICAgICBzaGlmdDogc2hpZnQuc2hpZnQsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGVvZiBzaGlmdC5kYXRlLFxuICAgICAgICAgICAgICAgICAgICBrZXlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCLwn5SNIExPT0tVUCBERUJVRyAtIFRvdGFsIGtleXM6XCIsIE9iamVjdC5rZXlzKGxvb2t1cCkubGVuZ3RoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCLwn5SNIFNBTVBMRSBLRVlTOlwiLCBPYmplY3Qua2V5cyhsb29rdXApLnNsaWNlKDAsIDMpKTtcblxuICAgICAgICByZXR1cm4gbG9va3VwO1xuICAgIH0sIFthY2Nlc3NpYmxlU2hpZnRzXSk7XG5cbiAgICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gZ2V0IHNoaWZ0IGZvciBlbmdpbmVlciBhbmQgZGF0ZVxuICAgIGNvbnN0IGdldFNoaWZ0ID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChlbmdpbmVlcklkOiBzdHJpbmcsIGRhdGVTdHJpbmc6IHN0cmluZyk6IFNoaWZ0QXNzaWdubWVudCB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtlbmdpbmVlcklkfS0ke2RhdGVTdHJpbmd9YDtcbiAgICAgICAgICAgIGNvbnN0IHNoaWZ0ID0gc2hpZnRMb29rdXBba2V5XTtcblxuICAgICAgICAgICAgLy8gRGVidWcgZmlyc3QgZmV3IGxvb2t1cHMgb25seVxuICAgICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjAwMSkge1xuICAgICAgICAgICAgICAgIC8vIFNhbXBsZSAwLjElIG9mIGxvb2t1cHNcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIvCflI0gTE9PS1VQIFRFU1Q6XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgZW5naW5lZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICBmb3VuZDogISFzaGlmdCxcbiAgICAgICAgICAgICAgICAgICAgc2hpZnQ6IHNoaWZ0ID8gYCR7c2hpZnQuc2hpZnR9YCA6IFwibm9uZVwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzaGlmdDtcbiAgICAgICAgfSxcbiAgICAgICAgW3NoaWZ0TG9va3VwXVxuICAgICk7XG5cbiAgICAvLyBFbmhhbmNlZCBjZWxsIGNsaWNrIGhhbmRsZXIgd2l0aCBtdWx0aS1zZWxlY3Qgc3VwcG9ydFxuICAgIGNvbnN0IGhhbmRsZUNlbGxDbGljayA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoZW5naW5lZXJJZDogc3RyaW5nLCBkYXRlU3RyaW5nOiBzdHJpbmcsIGN0cmxLZXk6IGJvb2xlYW4sIHNoaWZ0S2V5OiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICBzZWxlY3RDZWxsKGVuZ2luZWVySWQsIGRhdGVTdHJpbmcsIGN0cmxLZXksIHNoaWZ0S2V5KTtcbiAgICAgICAgfSxcbiAgICAgICAgW3NlbGVjdENlbGxdXG4gICAgKTtcblxuICAgIC8vIEtleWJvYXJkIG5hdmlnYXRpb24gd2l0aCBtdWx0aS1zZWxlY3Qgc3VwcG9ydFxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZTogS2V5Ym9hcmRFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkQ2VsbHMubGVuZ3RoID09PSAwIHx8IGFsbEVuZ2luZWVycy5sZW5ndGggPT09IDAgfHwgZGF0ZUNvbHVtbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVc2UgdGhlIGxhc3Qgc2VsZWN0ZWQgY2VsbCBmb3IgbmF2aWdhdGlvblxuICAgICAgICAgICAgY29uc3QgY3VycmVudENlbGwgPSBsYXN0U2VsZWN0ZWRDZWxsIHx8IHNlbGVjdGVkQ2VsbHNbc2VsZWN0ZWRDZWxscy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRFbmdpbmVlckluZGV4ID0gYWxsRW5naW5lZXJzLmZpbmRJbmRleChlbmcgPT4gZW5nLmlkID09PSBjdXJyZW50Q2VsbC5lbmdpbmVlcklkKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXRlSW5kZXggPSBkYXRlQ29sdW1ucy5maW5kSW5kZXgoY29sID0+IGNvbC5kYXRlU3RyaW5nID09PSBjdXJyZW50Q2VsbC5kYXRlKTtcblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRFbmdpbmVlckluZGV4ID09PSAtMSB8fCBjdXJyZW50RGF0ZUluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG5ld0VuZ2luZWVySW5kZXggPSBjdXJyZW50RW5naW5lZXJJbmRleDtcbiAgICAgICAgICAgIGxldCBuZXdEYXRlSW5kZXggPSBjdXJyZW50RGF0ZUluZGV4O1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGUua2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgICAgICAgICAgICAgbmV3RW5naW5lZXJJbmRleCA9IE1hdGgubWF4KDAsIGN1cnJlbnRFbmdpbmVlckluZGV4IC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICAgICAgICAgICAgICBuZXdFbmdpbmVlckluZGV4ID0gTWF0aC5taW4oYWxsRW5naW5lZXJzLmxlbmd0aCAtIDEsIGN1cnJlbnRFbmdpbmVlckluZGV4ICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgICAgICAgICAgICBuZXdEYXRlSW5kZXggPSBNYXRoLm1heCgwLCBjdXJyZW50RGF0ZUluZGV4IC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICAgICAgICAgICAgbmV3RGF0ZUluZGV4ID0gTWF0aC5taW4oZGF0ZUNvbHVtbnMubGVuZ3RoIC0gMSwgY3VycmVudERhdGVJbmRleCArIDEpO1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJFbnRlclwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCIgXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZENlbGxzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2luZ2xlIHNlbGVjdGlvbjogZWRpdCB0aGUgc2VsZWN0ZWQgY2VsbFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGlmdCA9IGdldFNoaWZ0KGN1cnJlbnRDZWxsLmVuZ2luZWVySWQsIGN1cnJlbnRDZWxsLmRhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkVkaXRTaGlmdCAmJiBzaGlmdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVkaXRTaGlmdChzaGlmdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW4ga2V5Ym9hcmQgZWRpdDpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTXVsdGktc2VsZWN0aW9uOiBjb3VsZCBiYXRjaCBlZGl0IG9yIHNob3cgY29udGV4dCBtZW51XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTXVsdGktZWRpdCBmb3IgJHtzZWxlY3RlZENlbGxzLmxlbmd0aH0gY2VsbHNgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJFc2NhcGVcIjpcbiAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRDZWxscyhbXSk7XG4gICAgICAgICAgICAgICAgICAgIHNldExhc3RTZWxlY3RlZENlbGwobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobmV3RW5naW5lZXJJbmRleCAhPT0gY3VycmVudEVuZ2luZWVySW5kZXggfHwgbmV3RGF0ZUluZGV4ICE9PSBjdXJyZW50RGF0ZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0Q2VsbChcbiAgICAgICAgICAgICAgICAgICAgYWxsRW5naW5lZXJzW25ld0VuZ2luZWVySW5kZXhdLmlkLFxuICAgICAgICAgICAgICAgICAgICBkYXRlQ29sdW1uc1tuZXdEYXRlSW5kZXhdLmRhdGVTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIGUuY3RybEtleSB8fCBlLm1ldGFLZXksXG4gICAgICAgICAgICAgICAgICAgIGUuc2hpZnRLZXlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleURvd24pO1xuICAgICAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlS2V5RG93bik7XG4gICAgfSwgW3NlbGVjdGVkQ2VsbHMsIGxhc3RTZWxlY3RlZENlbGwsIGFsbEVuZ2luZWVycywgZGF0ZUNvbHVtbnMsIGdldFNoaWZ0LCBvbkVkaXRTaGlmdCwgc2VsZWN0Q2VsbF0pO1xuXG4gICAgLy8gR2xvYmFsIGNsaWNrIGhhbmRsZXIgdG8gY2xvc2UgY29udGV4dCBtZW51XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgaGFuZGxlR2xvYmFsQ2xpY2sgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgICAgICBjbG9zZUNvbnRleHRNZW51KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGNvbnRleHRNZW51LnZpc2libGUpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVHbG9iYWxDbGljayk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUdsb2JhbENsaWNrKTtcbiAgICAgICAgfTtcbiAgICB9LCBbY29udGV4dE1lbnUudmlzaWJsZSwgY2xvc2VDb250ZXh0TWVudV0pO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHNoaWZ0IHN0YXRpc3RpY3NcbiAgICBjb25zdCBzaGlmdFN0YXRzID0gdXNlTWVtbygoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRzID0ge1xuICAgICAgICAgICAgTTogMCxcbiAgICAgICAgICAgIEU6IDAsXG4gICAgICAgICAgICBOOiAwLFxuICAgICAgICAgICAgRDogMCxcbiAgICAgICAgICAgIEg6IDAsXG4gICAgICAgICAgICBUOiAwLFxuICAgICAgICAgICAgdG90YWw6IGFjY2Vzc2libGVTaGlmdHMubGVuZ3RoXG4gICAgICAgIH07XG4gICAgICAgIGFjY2Vzc2libGVTaGlmdHMuZm9yRWFjaChzaGlmdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaGlmdFR5cGUgPSBzaGlmdC5zaGlmdC5jaGFyQXQoMCk7IC8vIEdldCBmaXJzdCBjaGFyYWN0ZXIgKE0sIEUsIE4sIEQsIEgsIFQpXG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0YXRzLCBzaGlmdFR5cGUpKSB7XG4gICAgICAgICAgICAgICAgc3RhdHNbc2hpZnRUeXBlIGFzIGtleW9mIHR5cGVvZiBzdGF0c10rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdGF0cztcbiAgICB9LCBbYWNjZXNzaWJsZVNoaWZ0c10pO1xuXG4gICAgLy8gRXJyb3IgaGFuZGxpbmcgZm9yIGVtcHR5IGRhdGFcbiAgICBpZiAoaGVhZGVyU3ViaGVhZGVyU3RydWN0dXJlLmxlbmd0aCA9PT0gMCB8fCBhbGxFbmdpbmVlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8RW1wdHlTdGF0ZVxuICAgICAgICAgICAgICAgIG1lc3NhZ2U9XCJObyBFbmdpbmVlcnMgQXZhaWxhYmxlXCJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbj17XG4gICAgICAgICAgICAgICAgICAgIHVzZXJQZXJtaXNzaW9ucy5jcm9zc1RlYW1BY2Nlc3NcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXCJObyBlbmdpbmVlcnMgZm91bmQuIFBsZWFzZSBjaGVjayB5b3VyIGRhdGEgY29uZmlndXJhdGlvbi5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgOiBcIk5vIGVuZ2luZWVycyBmb3VuZCBpbiB5b3VyIGFjY2Vzc2libGUgdGVhbXMuIENvbnRhY3QgeW91ciBhZG1pbmlzdHJhdG9yIGlmIHRoaXMgc2VlbXMgaW5jb3JyZWN0LlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHNoaWZ0LXNjaGVkdWxlci11bmlmaWVkICR7Y2xhc3NOYW1lfWB9PlxuICAgICAgICAgICAgey8qIEVuaGFuY2VkIGRlYnVnIGluZm8gcGFuZWwgKi99XG4gICAgICAgICAgICB7c2hvd0RlYnVnSW5mbyAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCIjZTBmMmZlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjEycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjExcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTogXCIxcHggc29saWQgIzAyODRjN1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiIzBjNGE2ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogXCJtb25vc3BhY2VcIlxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIPCflI0gRGVidWc6IEhlYWRlcnM6IHtoZWFkZXJTdWJoZWFkZXJTdHJ1Y3R1cmUubGVuZ3RofSwgRW5naW5lZXJzOiB7YWxsRW5naW5lZXJzLmxlbmd0aH0sIFNoaWZ0czp7XCIgXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICB7c2hpZnRzLmxlbmd0aH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+8J+TiiBTaGlmdCBMb29rdXAgS2V5czoge09iamVjdC5rZXlzKHNoaWZ0TG9va3VwKS5sZW5ndGh9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICDwn4+X77iPIEdyb3VwaW5nOntcIiBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtBcnJheS5pc0FycmF5KGdyb3VwaW5nRGVidWdJbmZvKSA/IGdyb3VwaW5nRGVidWdJbmZvLmpvaW4oXCIgfCBcIikgOiBcIkRlYnVnIGluZm8gdW5hdmFpbGFibGVcIn1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtkZWJ1Z0luZm8gJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDimpnvuI8gQ29uZmlnOiBOYW1lPXtkZWJ1Z0luZm8uYXR0cmlidXRlc0NvbmZpZ3VyZWQubmFtZSA/IFwi4pyFXCIgOiBcIuKdjFwifSwgSGVhZGVyPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkZWJ1Z0luZm8uYXR0cmlidXRlc0NvbmZpZ3VyZWQuaGVhZGVyID8gXCLinIVcIiA6IFwi4p2MXCJ9LCBTdWJoZWFkZXI9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2RlYnVnSW5mby5hdHRyaWJ1dGVzQ29uZmlndXJlZC5zdWJoZWFkZXIgPyBcIuKchVwiIDogXCLinYxcIn0sIFNQVXNlcj1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGVidWdJbmZvLmF0dHJpYnV0ZXNDb25maWd1cmVkLnNwVXNlckFzc29jaWF0aW9uID8gXCLinIVcIiA6IFwi4p2MXCJ9LCBTaGlmdD1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGVidWdJbmZvLmF0dHJpYnV0ZXNDb25maWd1cmVkLnNoaWZ0QXNzb2NpYXRpb24gPyBcIuKchVwiIDogXCLinYxcIn0sIFNoaWZ0RGF0ZT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGVidWdJbmZvLmF0dHJpYnV0ZXNDb25maWd1cmVkLnNoaWZ0RGF0ZSA/IFwi4pyFXCIgOiBcIuKdjFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHtzaGlmdHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIPCfjq8gRmlyc3QgU2hpZnQ6IElEPXtzaGlmdHNbMF0/LmVuZ2luZWVySWR9LCBEYXRlPXtzaGlmdHNbMF0/LmRhdGV9LCBUeXBlPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dHlwZW9mIHNoaWZ0c1swXT8uZGF0ZX0sIFNoaWZ0PXtzaGlmdHNbMF0/LnNoaWZ0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+8J+UkSBTYW1wbGUgS2V5czoge09iamVjdC5rZXlzKHNoaWZ0TG9va3VwKS5zbGljZSgwLCAzKS5qb2luKFwiLCBcIil9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAge2FsbEVuZ2luZWVycy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg8J+RpCBGaXJzdCBFbmdpbmVlcjogSUQ9e2FsbEVuZ2luZWVyc1swXT8uaWR9LCBOYW1lPXthbGxFbmdpbmVlcnNbMF0/Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAge2RhdGVDb2x1bW5zLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDwn5OFIFRpbWVsaW5lOiB7ZGF0ZUNvbHVtbnNbMF0/LmRhdGVTdHJpbmd9IHRve1wiIFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRlQ29sdW1uc1tkYXRlQ29sdW1ucy5sZW5ndGggLSAxXT8uZGF0ZVN0cmluZ30gKHtkYXRlQ29sdW1ucy5sZW5ndGh9IGRheXMpXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIPCflI0gVGVzdCBMb29rdXA6IEtleT17YWxsRW5naW5lZXJzWzBdPy5pZH0te2RhdGVDb2x1bW5zWzBdPy5kYXRlU3RyaW5nfSBGb3VuZD1cbiAgICAgICAgICAgICAgICAgICAgICAgIHshIXNoaWZ0TG9va3VwW2Ake2FsbEVuZ2luZWVyc1swXT8uaWR9LSR7ZGF0ZUNvbHVtbnNbMF0/LmRhdGVTdHJpbmd9YF19XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAg8J+UjSBFbmdpbmVlciBJRCBUeXBlczogRW5naW5lZXI9e3R5cGVvZiBhbGxFbmdpbmVlcnNbMF0/LmlkfSwgU2hpZnQ9XG4gICAgICAgICAgICAgICAgICAgICAgICB7dHlwZW9mIHNoaWZ0c1swXT8uZW5naW5lZXJJZH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICDwn5SNIERhdGUgTWF0Y2ggVGVzdDogVGltZWxpbmU9e2RhdGVDb2x1bW5zWzBdPy5kYXRlU3RyaW5nfSwgU2hpZnQ9e3NoaWZ0c1swXT8uZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICDwn5OIIFBlcmZvcm1hbmNlOiB7T2JqZWN0LmtleXMoc2hpZnRMb29rdXApLmxlbmd0aH0gbG9va3VwIGtleXMse1wiIFwifVxuICAgICAgICAgICAgICAgICAgICAgICAge2FsbEVuZ2luZWVycy5sZW5ndGggKiBkYXRlQ29sdW1ucy5sZW5ndGh9IHRvdGFsIGNlbGxzXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAg8J+TiiBTaGlmdCBTdGF0czogTTp7c2hpZnRTdGF0cy5NfSBFOntzaGlmdFN0YXRzLkV9IE46e3NoaWZ0U3RhdHMuTn0gRDp7c2hpZnRTdGF0cy5EfSBIOlxuICAgICAgICAgICAgICAgICAgICAgICAge3NoaWZ0U3RhdHMuSH0gVDp7c2hpZnRTdGF0cy5UfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkQ2VsbHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIPCfjq8gU2VsZWN0ZWQ6IHtzZWxlY3RlZENlbGxzLmxlbmd0aH0gY2VsbChzKXtcIiBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRDZWxscy5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgKCR7YWxsRW5naW5lZXJzLmZpbmQoZSA9PiBlLmlkID09PSBzZWxlY3RlZENlbGxzWzBdLmVuZ2luZWVySWQpPy5uYW1lfSBvbiAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENlbGxzWzBdLmRhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KWBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlwifXtcIiBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIEN0cmwrY2xpY2s6IHRvZ2dsZSwgU2hpZnQrY2xpY2s6IHJhbmdlLCBBcnJvd3M6IG5hdmlnYXRlLCBFbnRlci9TcGFjZTogZWRpdCwgRXNjOiBjbGVhclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiBcIjhweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI2YwZjBmMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjRweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+8J+UjSBGaW5kIGVuZ2luZWVycyB3aXRoIHNoaWZ0czo8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHByZSBzdHlsZT17eyBmb250U2l6ZTogXCI5cHhcIiwgb3ZlcmZsb3c6IFwiYXV0b1wiLCBtYXhIZWlnaHQ6IFwiODBweFwiIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmdpbmVlcnNXaXRoU2hpZnRzID0gYWxsRW5naW5lZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGVuZyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzU2hpZnQgPSBzaGlmdExvb2t1cFtgJHtlbmcuaWR9LSR7ZGF0ZUNvbHVtbnNbMF0/LmRhdGVTdHJpbmd9YF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhc1NoaWZ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSgwLCAzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVlcnNXaXRoU2hpZnRzLm1hcChlbmcgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogZW5nLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGVuZy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogZW5nLmhlYWRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJoZWFkZXI6IGVuZy5zdWJoZWFkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzU2hpZnRPbkZpcnN0RGF0ZTogISFzaGlmdExvb2t1cFtgJHtlbmcuaWR9LSR7ZGF0ZUNvbHVtbnNbMF0/LmRhdGVTdHJpbmd9YF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcHJlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiNHB4XCIgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz7wn5SNIFNhbXBsZSBzaGlmdCBlbmdpbmVlciBJRHM6PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwcmUgc3R5bGU9e3sgZm9udFNpemU6IFwiOXB4XCIsIG92ZXJmbG93OiBcImF1dG9cIiwgbWF4SGVpZ2h0OiBcIjgwcHhcIiB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0cy5zbGljZSgwLCA1KS5tYXAoc2hpZnQgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0SWQ6IHNoaWZ0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lZXJJZDogc2hpZnQuZW5naW5lZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0OiBzaGlmdC5zaGlmdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGU6IHNoaWZ0LmRhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcHJlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiNHB4XCIgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz7wn5KhIENoZWNrOiBEbyBhbnkgZW5naW5lZXIgSURzIG1hdGNoIHNoaWZ0IGVuZ2luZWVyIElEcz88L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHByZSBzdHlsZT17eyBmb250U2l6ZTogXCI5cHhcIiwgb3ZlcmZsb3c6IFwiYXV0b1wiLCBtYXhIZWlnaHQ6IFwiNjBweFwiIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGlmdEVuZ2luZWVySWRzID0gbmV3IFNldChzaGlmdHMubWFwKHMgPT4gcy5lbmdpbmVlcklkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVuZ2luZWVySWRzID0gbmV3IFNldChhbGxFbmdpbmVlcnMubWFwKGUgPT4gZS5pZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGVzID0gWy4uLnNoaWZ0RW5naW5lZXJJZHNdLmZpbHRlcihpZCA9PiBlbmdpbmVlcklkcy5oYXMoaWQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG90YWxTaGlmdEVuZ2luZWVycyA9IHNoaWZ0RW5naW5lZXJJZHMuc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG90YWxFbmdpbmVlcnMgPSBlbmdpbmVlcklkcy5zaXplO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGluZ0lkczogbWF0Y2hlcy5zbGljZSgwLCAzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3RhbE1hdGNoZXM6IG1hdGNoZXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsU2hpZnRFbmdpbmVlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxFbmdpbmVlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FtcGxlU2hpZnRJZHM6IFsuLi5zaGlmdEVuZ2luZWVySWRzXS5zbGljZSgwLCAzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYW1wbGVFbmdpbmVlcklkczogWy4uLmVuZ2luZWVySWRzXS5zbGljZSgwLCAzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcHJlPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogXCI4cHhcIiB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPvCflI0gUmF3IFNQVXNlciBPYmplY3QgUHJvcGVydGllczo8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHByZSBzdHlsZT17eyBmb250U2l6ZTogXCI5cHhcIiwgb3ZlcmZsb3c6IFwiYXV0b1wiLCBtYXhIZWlnaHQ6IFwiODBweFwiIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthbGxFbmdpbmVlcnMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IEpTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogYWxsRW5naW5lZXJzWzBdLm1lbmRpeE9iamVjdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbE93blByb3BlcnRpZXM6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFsbEVuZ2luZWVyc1swXS5tZW5kaXhPYmplY3QpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsUHJvdG90eXBlUHJvcGVydGllczogT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKGFsbEVuZ2luZWVyc1swXS5tZW5kaXhPYmplY3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0S2V5czogT2JqZWN0LmtleXMoYWxsRW5naW5lZXJzWzBdLm1lbmRpeE9iamVjdCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RBY2Nlc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVc2VybmFtZTogKGFsbEVuZ2luZWVyc1swXS5tZW5kaXhPYmplY3QgYXMgYW55KS5Vc2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOYW1lOiAoYWxsRW5naW5lZXJzWzBdLm1lbmRpeE9iamVjdCBhcyBhbnkpLk5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRW1haWw6IChhbGxFbmdpbmVlcnNbMF0ubWVuZGl4T2JqZWN0IGFzIGFueSkuRW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWJicmV2aWF0aW9uOiAoYWxsRW5naW5lZXJzWzBdLm1lbmRpeE9iamVjdCBhcyBhbnkpLkFiYnJldmlhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogKGFsbEVuZ2luZWVyc1swXS5tZW5kaXhPYmplY3QgYXMgYW55KS5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZkNoZWNrOiB0eXBlb2YgYWxsRW5naW5lZXJzWzBdLm1lbmRpeE9iamVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yTmFtZTogYWxsRW5naW5lZXJzWzBdLm1lbmRpeE9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJObyBlbmdpbmVlcnNcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcHJlPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogXCI4cHhcIiB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPvCflI0gUmF3IENhbGVuZGFyRXZlbnQgT2JqZWN0IFByb3BlcnRpZXM6PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwcmUgc3R5bGU9e3sgZm9udFNpemU6IFwiOXB4XCIsIG92ZXJmbG93OiBcImF1dG9cIiwgbWF4SGVpZ2h0OiBcIjgwcHhcIiB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2hpZnRzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHNoaWZ0c1swXS5tZW5kaXhPYmplY3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGxQcm9wZXJ0aWVzOiBPYmplY3Qua2V5cyhzaGlmdHNbMF0ubWVuZGl4T2JqZWN0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdEFjY2Vzczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNQVXNlcjogKHNoaWZ0c1swXS5tZW5kaXhPYmplY3QgYXMgYW55KS5TUFVzZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FsZW5kYXJFdmVudHNfU1BVc2VyOiAoc2hpZnRzWzBdLm1lbmRpeE9iamVjdCBhcyBhbnkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5DYWxlbmRhckV2ZW50c19TUFVzZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5naW5lZXI6IChzaGlmdHNbMF0ubWVuZGl4T2JqZWN0IGFzIGFueSkuRW5naW5lZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXNlcjogKHNoaWZ0c1swXS5tZW5kaXhPYmplY3QgYXMgYW55KS5Vc2VyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJObyBzaGlmdHNcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcHJlPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNjaGVkdWxlci1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICB7LyogSGVhZGVyIFJvdyAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNjaGVkdWxlci1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJlbmdpbmVlci1jb2x1bW4taGVhZGVyXCI+RW5naW5lZXI8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1jb250YWluZXJcIiByZWY9e2hlYWRlclNjcm9sbFJlZn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRlQ29sdW1ucy5tYXAoKGNvbCwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aWR4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZGF0ZS1oZWFkZXIgJHtjb2wuaXNUb2RheSA/IFwiZGF0ZS1oZWFkZXItdG9kYXlcIiA6IFwiXCJ9ICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sLmlzV2Vla2VuZCA/IFwiZGF0ZS1oZWFkZXItd2Vla2VuZFwiIDogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGF0ZS1kYXlcIj57Y29sLmRhdGUuZ2V0RGF0ZSgpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRlLW1vbnRoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbC5kYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuXCIsIHsgbW9udGg6IFwic2hvcnRcIiB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBDb250ZW50IEFyZWEgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzY2hlZHVsZXItY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImVuZ2luZWVyLW5hbWVzLWNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2hlYWRlclN1YmhlYWRlclN0cnVjdHVyZS5tYXAoaGVhZGVyRGF0YSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2hlYWRlckRhdGEuaGVhZGVySWR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlYW0tbmFtZS1jZWxsXCI+e2hlYWRlckRhdGEuaGVhZGVyTmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2hlYWRlckRhdGEuc3ViaGVhZGVycy5tYXAoc3ViaGVhZGVyID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtgJHtoZWFkZXJEYXRhLmhlYWRlcklkfS0ke3N1YmhlYWRlci5uYW1lfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFuZS1uYW1lLWNlbGxcIj57c3ViaGVhZGVyLm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3N1YmhlYWRlci5lbmdpbmVlcnMubWFwKGVuZ2luZWVyID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VuZ2luZWVyLmlkfSBjbGFzc05hbWU9XCJlbmdpbmVlci1uYW1lLWNlbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlbmdpbmVlci5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1jb250YWluZXJcIiByZWY9e2NvbnRlbnRTY3JvbGxSZWZ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2hlYWRlclN1YmhlYWRlclN0cnVjdHVyZS5tYXAoaGVhZGVyRGF0YSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtoZWFkZXJEYXRhLmhlYWRlcklkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGVhbS10aW1lbGluZS1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGF0ZUNvbHVtbnMubWFwKChfLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2lkeH0gY2xhc3NOYW1lPVwidGVhbS10aW1lbGluZS1jZWxsXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtoZWFkZXJEYXRhLnN1YmhlYWRlcnMubWFwKHN1YmhlYWRlciA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2Ake2hlYWRlckRhdGEuaGVhZGVySWR9LSR7c3ViaGVhZGVyLm5hbWV9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFuZS10aW1lbGluZS1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRlQ29sdW1ucy5tYXAoKF8sIGlkeCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpZHh9IGNsYXNzTmFtZT1cImxhbmUtdGltZWxpbmUtY2VsbFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c3ViaGVhZGVyLmVuZ2luZWVycy5tYXAoZW5naW5lZXIgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VuZ2luZWVyLmlkfSBjbGFzc05hbWU9XCJlbmdpbmVlci10aW1lbGluZS1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGF0ZUNvbHVtbnMubWFwKChjb2wsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGlmdCA9IGdldFNoaWZ0KGVuZ2luZWVyLmlkLCBjb2wuZGF0ZVN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RGF5Q2VsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17YCR7ZW5naW5lZXIuaWR9LSR7aWR4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZT17Y29sLmRhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lZXI9e2VuZ2luZWVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0PXtzaGlmdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1RvZGF5PXtjb2wuaXNUb2RheX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1dlZWtlbmQ9e2NvbC5pc1dlZWtlbmR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZD17aXNDZWxsU2VsZWN0ZWQoZW5naW5lZXIuaWQsIGNvbC5kYXRlU3RyaW5nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlmdHNMb2FkaW5nPXtzaGlmdHNMb2FkaW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRG91YmxlQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaGlmdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4aXN0aW5nIHNoaWZ0OiBlZGl0IGl0IChzYW1lIGFzIGNvbnRleHQgbWVudSBlZGl0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkVkaXRTaGlmdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVkaXRTaGlmdChzaGlmdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFbXB0eSBjZWxsOiBjcmVhdGUgbmV3IHNoaWZ0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uQ3JlYXRlU2hpZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DcmVhdGVTaGlmdChlbmdpbmVlci5pZCwgY29sLmRhdGVTdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYEVycm9yIGluIG9uRG91YmxlQ2xpY2sgZm9yICR7ZW5naW5lZXIubmFtZX06YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DZWxsQ2xpY2s9e2UgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQ2VsbENsaWNrKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lZXIuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2wuZGF0ZVN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuY3RybEtleSB8fCBlLm1ldGFLZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnNoaWZ0S2V5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db250ZXh0TWVudT17aGFuZGxlQ2VsbENvbnRleHRNZW51fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgcmVmPXtpbmZpbml0ZVNjcm9sbFJlZn0gY2xhc3NOYW1lPVwic2VudGluZWxcIiBzdHlsZT17eyBoZWlnaHQ6IFwiMjBweFwiLCB2aXNpYmlsaXR5OiBcImhpZGRlblwiIH19IC8+XG5cbiAgICAgICAgICAgIHsvKiBDb250ZXh0IE1lbnUgKi99XG4gICAgICAgICAgICA8Q29udGV4dE1lbnVcbiAgICAgICAgICAgICAgICB2aXNpYmxlPXtjb250ZXh0TWVudS52aXNpYmxlfVxuICAgICAgICAgICAgICAgIHg9e2NvbnRleHRNZW51Lnh9XG4gICAgICAgICAgICAgICAgeT17Y29udGV4dE1lbnUueX1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXtjb250ZXh0TWVudS5vcHRpb25zfVxuICAgICAgICAgICAgICAgIG9uQ2xvc2U9e2Nsb3NlQ29udGV4dE1lbnV9XG4gICAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuLy8gRXhwb3J0IHdpdGggZXJyb3IgYm91bmRhcnkgZm9yIHByb2R1Y3Rpb24gcmVzaWxpZW5jZVxuZXhwb3J0IGRlZmF1bHQgd2l0aEVycm9yQm91bmRhcnkoU2NoZWR1bGVHcmlkKTtcbiIsImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBMaXN0VmFsdWUsIE9iamVjdEl0ZW0sIExpc3RBdHRyaWJ1dGVWYWx1ZSwgTGlzdFJlZmVyZW5jZVZhbHVlIH0gZnJvbSBcIm1lbmRpeFwiO1xuaW1wb3J0IHsgVXNlU2hpZnREYXRhUmV0dXJuLCBFbmdpbmVlciwgU2hpZnRBc3NpZ25tZW50LCBTaGlmdFR5cGUsIFZhbGlkYXRpb25FcnJvciB9IGZyb20gXCIuLi90eXBlcy9zaGlmdFNjaGVkdWxlclwiO1xuXG5pbnRlcmZhY2UgRGF0YVN0YXRlIHtcbiAgICBlbmdpbmVlcnM6IEVuZ2luZWVyW107XG4gICAgc2hpZnRzOiBTaGlmdEFzc2lnbm1lbnRbXTtcbiAgICBzaGlmdHNMb2FkaW5nOiBib29sZWFuO1xuICAgIGVycm9yOiBWYWxpZGF0aW9uRXJyb3IgfCBudWxsO1xufVxuXG5pbnRlcmZhY2UgVXNlU2hpZnREYXRhUHJvcHMge1xuICAgIGVuZ2luZWVyc1NvdXJjZTogTGlzdFZhbHVlO1xuICAgIHNoaWZ0c1NvdXJjZT86IExpc3RWYWx1ZTtcbiAgICBuYW1lQXR0cmlidXRlPzogTGlzdEF0dHJpYnV0ZVZhbHVlPHN0cmluZz47XG4gICAgaGVhZGVyQXR0cmlidXRlPzogTGlzdEF0dHJpYnV0ZVZhbHVlPHN0cmluZz47XG4gICAgc3ViaGVhZGVyQXR0cmlidXRlPzogTGlzdEF0dHJpYnV0ZVZhbHVlPHN0cmluZz47XG4gICAgc3RhcnRUaW1lQXR0cmlidXRlPzogTGlzdEF0dHJpYnV0ZVZhbHVlPERhdGU+O1xuICAgIGRheVR5cGVBdHRyaWJ1dGU/OiBMaXN0QXR0cmlidXRlVmFsdWU8c3RyaW5nPjtcbiAgICBzdGF0dXNBdHRyaWJ1dGU/OiBMaXN0QXR0cmlidXRlVmFsdWU8c3RyaW5nPjtcbiAgICBzcFVzZXJBc3NvY2lhdGlvbj86IExpc3RSZWZlcmVuY2VWYWx1ZTtcbiAgICBzaGlmdEFzc29jaWF0aW9uPzogTGlzdFJlZmVyZW5jZVZhbHVlO1xuICAgIHNoaWZ0RGF0ZUF0dHJpYnV0ZT86IExpc3RBdHRyaWJ1dGVWYWx1ZTxEYXRlPjtcbn1cblxuZXhwb3J0IGNvbnN0IHVzZVNoaWZ0RGF0YSA9ICh7XG4gICAgZW5naW5lZXJzU291cmNlLFxuICAgIHNoaWZ0c1NvdXJjZSxcbiAgICBuYW1lQXR0cmlidXRlLFxuICAgIGhlYWRlckF0dHJpYnV0ZSxcbiAgICBzdWJoZWFkZXJBdHRyaWJ1dGUsXG4gICAgc3RhcnRUaW1lQXR0cmlidXRlLFxuICAgIGRheVR5cGVBdHRyaWJ1dGUsXG4gICAgc3RhdHVzQXR0cmlidXRlLFxuICAgIHNwVXNlckFzc29jaWF0aW9uLFxuICAgIHNoaWZ0QXNzb2NpYXRpb24sXG4gICAgc2hpZnREYXRlQXR0cmlidXRlXG59OiBVc2VTaGlmdERhdGFQcm9wcyk6IFVzZVNoaWZ0RGF0YVJldHVybiA9PiB7XG4gICAgY29uc3QgW2RhdGFTdGF0ZSwgc2V0RGF0YVN0YXRlXSA9IHVzZVN0YXRlPERhdGFTdGF0ZT4oe1xuICAgICAgICBlbmdpbmVlcnM6IFtdLFxuICAgICAgICBzaGlmdHM6IFtdLFxuICAgICAgICBzaGlmdHNMb2FkaW5nOiB0cnVlLFxuICAgICAgICBlcnJvcjogbnVsbFxuICAgIH0pO1xuXG4gICAgLy8gVmFsaWRhdGlvbiBoZWxwZXJcbiAgICBjb25zdCB2YWxpZGF0ZUNvbmZpZ3VyYXRpb24gPSB1c2VDYWxsYmFjaygoKTogVmFsaWRhdGlvbkVycm9yIHwgbnVsbCA9PiB7XG4gICAgICAgIGlmICghZW5naW5lZXJzU291cmNlKSB7XG4gICAgICAgICAgICByZXR1cm4geyBtZXNzYWdlOiBcIkVuZ2luZWVycyBkYXRhIHNvdXJjZSBpcyByZXF1aXJlZFwiLCBwcm9wZXJ0eTogXCJlbmdpbmVlcnNcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVuZ2luZWVyc1NvdXJjZS5zdGF0dXMgPT09IFwidW5hdmFpbGFibGVcIikge1xuICAgICAgICAgICAgcmV0dXJuIHsgbWVzc2FnZTogXCJFbmdpbmVlcnMgZGF0YSBzb3VyY2UgaXMgdW5hdmFpbGFibGVcIiwgcHJvcGVydHk6IFwiZW5naW5lZXJzXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbmFtZUF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgbWVzc2FnZTogXCJOYW1lIGF0dHJpYnV0ZSBpcyByZXF1aXJlZCBmb3IgZW5naW5lZXJzXCIsIHByb3BlcnR5OiBcIm5hbWVBdHRyaWJ1dGVcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFoZWFkZXJBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IG1lc3NhZ2U6IFwiSGVhZGVyIGF0dHJpYnV0ZSBpcyByZXF1aXJlZCBmb3IgZW5naW5lZXJzXCIsIHByb3BlcnR5OiBcImhlYWRlckF0dHJpYnV0ZVwiIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBWYWxpZGF0ZSBzaGlmdHMgY29uZmlndXJhdGlvbiBpZiBwcm92aWRlZFxuICAgICAgICBpZiAoc2hpZnRzU291cmNlICYmIHNoaWZ0c1NvdXJjZS5zdGF0dXMgPT09IFwidW5hdmFpbGFibGVcIikge1xuICAgICAgICAgICAgcmV0dXJuIHsgbWVzc2FnZTogXCJTaGlmdHMgZGF0YSBzb3VyY2UgaXMgdW5hdmFpbGFibGVcIiwgcHJvcGVydHk6IFwic2hpZnRzXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaGlmdHNTb3VyY2UgJiYgIXN0YXJ0VGltZUF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlN0YXJ0IHRpbWUgYXR0cmlidXRlIGlzIHJlcXVpcmVkIHdoZW4gc2hpZnRzIGRhdGEgc291cmNlIGlzIHByb3ZpZGVkXCIsXG4gICAgICAgICAgICAgICAgcHJvcGVydHk6IFwic3RhcnRUaW1lQXR0cmlidXRlXCJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LCBbZW5naW5lZXJzU291cmNlLCBzaGlmdHNTb3VyY2UsIG5hbWVBdHRyaWJ1dGUsIGhlYWRlckF0dHJpYnV0ZSwgc3RhcnRUaW1lQXR0cmlidXRlXSk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gTWVuZGl4IGVuZ2luZWVycyBkYXRhIHdpdGggZXJyb3IgaGFuZGxpbmdcbiAgICBjb25zdCB0cmFuc2Zvcm1lZEVuZ2luZWVycyA9IHVzZU1lbW8oKCk6IEVuZ2luZWVyW10gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGVuZ2luZWVyc1NvdXJjZS5zdGF0dXMgIT09IFwiYXZhaWxhYmxlXCIgfHwgIWVuZ2luZWVyc1NvdXJjZS5pdGVtcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGVuZ2luZWVyc1NvdXJjZS5pdGVtcy5tYXAoKGl0ZW06IE9iamVjdEl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAvLyBEZWJ1ZzogQ2hlY2sgYXR0cmlidXRlIGNvbmZpZ3VyYXRpb24gKHdpbGwgYmUgc2hvd24gaW4gbWFpbiBkZWJ1ZyBwYW5lbClcblxuICAgICAgICAgICAgICAgICAgICAvLyBTdG9yZSBkZWJ1ZyBpbmZvIHRvIGJlIGRpc3BsYXllZCBpbiBtYWluIHBhbmVsIChubyBmbG9hdGluZyBkZWJ1ZyBib3gpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQWNjZXNzIFNQVXNlciBwcm9wZXJ0aWVzIHRocm91Z2ggY29uZmlndXJlZCBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBuYW1lQXR0cmlidXRlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IG5hbWVBdHRyaWJ1dGUuZ2V0KGl0ZW0pLnN0YXR1cyA9PT0gXCJhdmFpbGFibGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gbmFtZUF0dHJpYnV0ZS5nZXQoaXRlbSkudmFsdWUgfHwgXCJVbmtub3duXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiVW5rbm93blwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiVW5rbm93blwiO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IGhlYWRlckF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBoZWFkZXJBdHRyaWJ1dGUuZ2V0KGl0ZW0pLnN0YXR1cyA9PT0gXCJhdmFpbGFibGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gaGVhZGVyQXR0cmlidXRlLmdldChpdGVtKS52YWx1ZSB8fCBcIkFsbCBFbmdpbmVlcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJBbGwgRW5naW5lZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogXCJBbGwgRW5naW5lZXJzXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViaGVhZGVyID0gc3ViaGVhZGVyQXR0cmlidXRlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHN1YmhlYWRlckF0dHJpYnV0ZS5nZXQoaXRlbSkuc3RhdHVzID09PSBcImF2YWlsYWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBzdWJoZWFkZXJBdHRyaWJ1dGUuZ2V0KGl0ZW0pLnZhbHVlIHx8IFwiR2VuZXJhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIkdlbmVyYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOiBcIkdlbmVyYWxcIjtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGl0ZW0uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViaGVhZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVuZGl4T2JqZWN0OiBpdGVtXG4gICAgICAgICAgICAgICAgICAgIH0gYXMgRW5naW5lZXI7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpdGVtLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJVbmtub3duXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmhlYWRlcjogXCJHZW5lcmFsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW5kaXhPYmplY3Q6IGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgfSBhcyBFbmdpbmVlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIH0sIFtlbmdpbmVlcnNTb3VyY2UsIG5hbWVBdHRyaWJ1dGUsIGhlYWRlckF0dHJpYnV0ZSwgc3ViaGVhZGVyQXR0cmlidXRlXSk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gTWVuZGl4IHNoaWZ0cyBkYXRhIHdpdGggZXJyb3IgaGFuZGxpbmdcbiAgICBjb25zdCB0cmFuc2Zvcm1lZFNoaWZ0cyA9IHVzZU1lbW8oKCk6IFNoaWZ0QXNzaWdubWVudFtdID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghc2hpZnRzU291cmNlIHx8IHNoaWZ0c1NvdXJjZS5zdGF0dXMgIT09IFwiYXZhaWxhYmxlXCIgfHwgIXNoaWZ0c1NvdXJjZS5pdGVtcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRGVidWcgY291bnRlcnMgKHdpbGwgYmUgc2hvd24gaW4gZGVidWcgcGFuZWwgaWYgbmVlZGVkKVxuICAgICAgICAgICAgLy8gbGV0IHN1Y2Nlc3NmdWxBc3NvY2lhdGlvbnMgPSAwO1xuICAgICAgICAgICAgLy8gbGV0IHRvdGFsU2hpZnRzID0gMDtcblxuICAgICAgICAgICAgY29uc3Qgc2hpZnRzID0gc2hpZnRzU291cmNlLml0ZW1zXG4gICAgICAgICAgICAgICAgLm1hcCgoaXRlbTogT2JqZWN0SXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gc3RhcnRUaW1lQXR0cmlidXRlPy5nZXQoaXRlbSkudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXlUeXBlID0gZGF5VHlwZUF0dHJpYnV0ZT8uZ2V0KGl0ZW0pLnZhbHVlIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXMgPSBzdGF0dXNBdHRyaWJ1dGU/LmdldChpdGVtKS52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJ5IHRvIGdldCB0aGUgYWN0dWFsIHNoaWZ0IGRhdGUgZnJvbSBDYWxlbmRhckV2ZW50c19TaGlmdC9TaGlmdC9EYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2hpZnREYXRlOiBEYXRlIHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNoaWZ0QXNzb2NpYXRpb24gJiYgc2hpZnREYXRlQXR0cmlidXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hpZnRSZWYgPSBzaGlmdEFzc29jaWF0aW9uLmdldChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hpZnRSZWYuc3RhdHVzID09PSBcImF2YWlsYWJsZVwiICYmIHNoaWZ0UmVmLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoaWZ0RGF0ZVZhbHVlID0gc2hpZnREYXRlQXR0cmlidXRlLmdldChzaGlmdFJlZi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaGlmdERhdGVWYWx1ZS5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCIgJiYgc2hpZnREYXRlVmFsdWUudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0RGF0ZSA9IHNoaWZ0RGF0ZVZhbHVlLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEZWJ1ZzogQXNzb2NpYXRpb24gYWNjZXNzICh3aWxsIGJlIHNob3duIGluIG1haW4gZGVidWcgcGFuZWwpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRyeSB0byBnZXQgZW5naW5lZXIgSUQgdGhyb3VnaCB0aGUgU1BVc2VyIGFzc29jaWF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW5naW5lZXJJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVc2UgdGhlIHNwVXNlckFzc29jaWF0aW9uIHRvIGdldCB0aGUgcmVmZXJlbmNlZCBTUFVzZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcFVzZXJBc3NvY2lhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwVXNlclJlZiA9IHNwVXNlckFzc29jaWF0aW9uLmdldChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BVc2VyUmVmLnN0YXR1cyA9PT0gXCJhdmFpbGFibGVcIiAmJiBzcFVzZXJSZWYudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBTUFVzZXIgSUQgZnJvbSB0aGUgYXNzb2NpYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lZXJJZCA9IHNwVXNlclJlZi52YWx1ZS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3VjY2Vzc2Z1bEFzc29jaWF0aW9ucysrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERlYnVnOiBBc3NvY2lhdGlvbiBzdWNjZXNzZnVsICh3aWxsIGJlIHNob3duIGluIG1haW4gZGVidWcgcGFuZWwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGYWxsYmFjayB0byBzaGlmdCBJRCBpZiBubyBhc3NvY2lhdGlvbiBmb3VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlbmdpbmVlcklkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lZXJJZCA9IGl0ZW0uaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvdGFsU2hpZnRzKys7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVzZSBzaGlmdERhdGUgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2UgZmFsbCBiYWNrIHRvIHN0YXJ0VGltZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgbmVpdGhlciBpcyBhdmFpbGFibGUsIHNraXAgdGhpcyBzaGlmdCAoZG9uJ3Qgc2hvdyB1bmRlZmluZWQgZXZlbnRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmluYWxEYXRlID0gc2hpZnREYXRlIHx8IHN0YXJ0VGltZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmluYWxEYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2tpcCBzaGlmdHMgd2l0aG91dCBwcm9wZXIgZGF0ZXMgLSBkb24ndCBzaG93IHRoZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaXRlbS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlOiBmaW5hbERhdGUudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lZXJJZDogZW5naW5lZXJJZCB8fCBpdGVtLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0OiAoZGF5VHlwZSBhcyBTaGlmdFR5cGUpIHx8IFwiTVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlmdERhdGU6IGZpbmFsRGF0ZSwgLy8gVGhlIGFjdHVhbCBzaGlmdCBkYXRlIGZyb20gQ2FsZW5kYXJFdmVudHNfU2hpZnQvU2hpZnQvRGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbmRpeE9iamVjdDogaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBhcyBTaGlmdEFzc2lnbm1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIGludmFsaWQgc2hpZnRzIC0gZG9uJ3Qgc2hvdyB0aGVtIHdpdGggZmFrZSBkYXRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKHNoaWZ0KTogc2hpZnQgaXMgU2hpZnRBc3NpZ25tZW50ID0+IHNoaWZ0ICE9PSBudWxsKTtcblxuICAgICAgICAgICAgLy8gRGVidWc6IEFzc29jaWF0aW9uIHN1Y2Nlc3MgcmF0ZSAod2lsbCBiZSBzaG93biBpbiBtYWluIGRlYnVnIHBhbmVsKVxuXG4gICAgICAgICAgICByZXR1cm4gc2hpZnRzO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgfSwgW1xuICAgICAgICBzaGlmdHNTb3VyY2UsXG4gICAgICAgIHN0YXJ0VGltZUF0dHJpYnV0ZSxcbiAgICAgICAgZGF5VHlwZUF0dHJpYnV0ZSxcbiAgICAgICAgc3RhdHVzQXR0cmlidXRlLFxuICAgICAgICBzcFVzZXJBc3NvY2lhdGlvbixcbiAgICAgICAgc2hpZnRBc3NvY2lhdGlvbixcbiAgICAgICAgc2hpZnREYXRlQXR0cmlidXRlXG4gICAgXSk7XG5cbiAgICAvLyBNYWluIGRhdGEgcHJvY2Vzc2luZyBlZmZlY3Qgd2l0aCB2YWxpZGF0aW9uXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbkVycm9yID0gdmFsaWRhdGVDb25maWd1cmF0aW9uKCk7XG5cbiAgICAgICAgaWYgKHZhbGlkYXRpb25FcnJvcikge1xuICAgICAgICAgICAgc2V0RGF0YVN0YXRlKHtcbiAgICAgICAgICAgICAgICBlbmdpbmVlcnM6IFtdLFxuICAgICAgICAgICAgICAgIHNoaWZ0czogW10sXG4gICAgICAgICAgICAgICAgc2hpZnRzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3I6IHZhbGlkYXRpb25FcnJvclxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaGlmdHNMb2FkaW5nID0gc2hpZnRzU291cmNlPy5zdGF0dXMgPT09IFwibG9hZGluZ1wiIHx8IGZhbHNlO1xuXG4gICAgICAgIHNldERhdGFTdGF0ZSh7XG4gICAgICAgICAgICBlbmdpbmVlcnM6IHRyYW5zZm9ybWVkRW5naW5lZXJzLFxuICAgICAgICAgICAgc2hpZnRzOiB0cmFuc2Zvcm1lZFNoaWZ0cyxcbiAgICAgICAgICAgIHNoaWZ0c0xvYWRpbmcsXG4gICAgICAgICAgICBlcnJvcjogbnVsbFxuICAgICAgICB9KTtcbiAgICB9LCBbdmFsaWRhdGVDb25maWd1cmF0aW9uLCB0cmFuc2Zvcm1lZEVuZ2luZWVycywgdHJhbnNmb3JtZWRTaGlmdHMsIGVuZ2luZWVyc1NvdXJjZS5zdGF0dXMsIHNoaWZ0c1NvdXJjZT8uc3RhdHVzXSk7XG5cbiAgICAvLyBFbmhhbmNlZCBoZWxwZXIgbWV0aG9kcyB3aXRoIGVycm9yIGhhbmRsaW5nXG4gICAgY29uc3QgZ2V0U2hpZnRzRm9yRW5naW5lZXIgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKGVuZ2luZWVySWQ6IHN0cmluZyk6IFNoaWZ0QXNzaWdubWVudFtdID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFTdGF0ZS5zaGlmdHMuZmlsdGVyKHNoaWZ0ID0+IHNoaWZ0LmVuZ2luZWVySWQgPT09IGVuZ2luZWVySWQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtkYXRhU3RhdGUuc2hpZnRzXVxuICAgICk7XG5cbiAgICBjb25zdCBnZXRFbmdpbmVlcnNCeVRlYW0gPSB1c2VDYWxsYmFjaygoKTogeyBbaGVhZGVyOiBzdHJpbmddOiBFbmdpbmVlcltdIH0gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyR3JvdXBzOiB7IFtoZWFkZXI6IHN0cmluZ106IEVuZ2luZWVyW10gfSA9IHt9O1xuICAgICAgICAgICAgZGF0YVN0YXRlLmVuZ2luZWVycy5mb3JFYWNoKGVuZ2luZWVyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJOYW1lID0gZW5naW5lZXIuaGVhZGVyO1xuICAgICAgICAgICAgICAgIGlmICghaGVhZGVyR3JvdXBzW2hlYWRlck5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckdyb3Vwc1toZWFkZXJOYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBoZWFkZXJHcm91cHNbaGVhZGVyTmFtZV0ucHVzaChlbmdpbmVlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBoZWFkZXJHcm91cHM7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cbiAgICB9LCBbZGF0YVN0YXRlLmVuZ2luZWVyc10pO1xuXG4gICAgY29uc3QgZ2V0U2hpZnRGb3JEYXRlID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChlbmdpbmVlcklkOiBzdHJpbmcsIGRhdGU6IHN0cmluZyk6IFNoaWZ0QXNzaWdubWVudCB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhU3RhdGUuc2hpZnRzLmZpbmQoc2hpZnQgPT4gc2hpZnQuZW5naW5lZXJJZCA9PT0gZW5naW5lZXJJZCAmJiBzaGlmdC5kYXRlID09PSBkYXRlKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW2RhdGFTdGF0ZS5zaGlmdHNdXG4gICAgKTtcblxuICAgIGNvbnN0IHVwZGF0ZVNoaWZ0ID0gdXNlQ2FsbGJhY2soKHNoaWZ0SWQ6IHN0cmluZywgdXBkYXRlczogUGFydGlhbDxTaGlmdEFzc2lnbm1lbnQ+KSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZXREYXRhU3RhdGUocHJldiA9PiAoe1xuICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgc2hpZnRzOiBwcmV2LnNoaWZ0cy5tYXAoc2hpZnQgPT4gKHNoaWZ0LmlkID09PSBzaGlmdElkID8geyAuLi5zaGlmdCwgLi4udXBkYXRlcyB9IDogc2hpZnQpKVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gU2lsZW50bHkgZmFpbFxuICAgICAgICB9XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3QgZ2V0RW5naW5lZXJCeUlkID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChlbmdpbmVlcklkOiBzdHJpbmcpOiBFbmdpbmVlciB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhU3RhdGUuZW5naW5lZXJzLmZpbmQoZW5naW5lZXIgPT4gZW5naW5lZXIuaWQgPT09IGVuZ2luZWVySWQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbZGF0YVN0YXRlLmVuZ2luZWVyc11cbiAgICApO1xuXG4gICAgY29uc3QgZ2V0U2hpZnRzQnlEYXRlUmFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKHN0YXJ0RGF0ZTogc3RyaW5nLCBlbmREYXRlOiBzdHJpbmcpOiBTaGlmdEFzc2lnbm1lbnRbXSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhU3RhdGUuc2hpZnRzLmZpbHRlcihzaGlmdCA9PiBzaGlmdC5kYXRlID49IHN0YXJ0RGF0ZSAmJiBzaGlmdC5kYXRlIDw9IGVuZERhdGUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtkYXRhU3RhdGUuc2hpZnRzXVxuICAgICk7XG5cbiAgICBjb25zdCByZWZyZXNoRGF0YSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIEZvcmNlIHJlLWV2YWx1YXRpb24gb2YgZGF0YSBzb3VyY2VzXG4gICAgICAgICAgICBzZXREYXRhU3RhdGUocHJldiA9PiAoeyAuLi5wcmV2LCBsb2FkaW5nOiB0cnVlLCBlcnJvcjogbnVsbCB9KSk7XG4gICAgICAgICAgICAvLyBJbiBhIHJlYWwgaW1wbGVtZW50YXRpb24sIHRoaXMgd291bGQgdHJpZ2dlciBkYXRhIHJlZnJlc2hcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25FcnJvciA9IHZhbGlkYXRlQ29uZmlndXJhdGlvbigpO1xuICAgICAgICAgICAgICAgIHNldERhdGFTdGF0ZShwcmV2ID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBlbmdpbmVlcnNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgc2hpZnRzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiB2YWxpZGF0aW9uRXJyb3JcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgc2V0RGF0YVN0YXRlKHByZXYgPT4gKHtcbiAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVycm9yOiB7IG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHJlZnJlc2ggZGF0YVwiIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgIH0sIFt2YWxpZGF0ZUNvbmZpZ3VyYXRpb25dKTtcblxuICAgIC8vIENhbGN1bGF0ZSBsb2FkaW5nIHN0YXRlIHdoZW4gbmVlZGVkXG4gICAgY29uc3QgZW5naW5lZXJzTG9hZGluZyA9IGVuZ2luZWVyc1NvdXJjZS5zdGF0dXMgPT09IFwibG9hZGluZ1wiO1xuICAgIGNvbnN0IGxvYWRpbmcgPSBlbmdpbmVlcnNMb2FkaW5nIHx8IGRhdGFTdGF0ZS5zaGlmdHNMb2FkaW5nO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZW5naW5lZXJzOiBkYXRhU3RhdGUuZW5naW5lZXJzLFxuICAgICAgICBzaGlmdHM6IGRhdGFTdGF0ZS5zaGlmdHMsXG4gICAgICAgIGxvYWRpbmcsXG4gICAgICAgIHNoaWZ0c0xvYWRpbmc6IGRhdGFTdGF0ZS5zaGlmdHNMb2FkaW5nLFxuICAgICAgICBlcnJvcjogZGF0YVN0YXRlLmVycm9yLFxuICAgICAgICBnZXRTaGlmdHNGb3JFbmdpbmVlcixcbiAgICAgICAgZ2V0RW5naW5lZXJzQnlUZWFtLFxuICAgICAgICBnZXRTaGlmdEZvckRhdGUsXG4gICAgICAgIHVwZGF0ZVNoaWZ0LFxuICAgICAgICBnZXRFbmdpbmVlckJ5SWQsXG4gICAgICAgIGdldFNoaWZ0c0J5RGF0ZVJhbmdlLFxuICAgICAgICByZWZyZXNoRGF0YSxcbiAgICAgICAgZGVidWdJbmZvOiB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzQ29uZmlndXJlZDoge1xuICAgICAgICAgICAgICAgIG5hbWU6ICEhbmFtZUF0dHJpYnV0ZSxcbiAgICAgICAgICAgICAgICBoZWFkZXI6ICEhaGVhZGVyQXR0cmlidXRlLFxuICAgICAgICAgICAgICAgIHN1YmhlYWRlcjogISFzdWJoZWFkZXJBdHRyaWJ1dGUsXG4gICAgICAgICAgICAgICAgc3BVc2VyQXNzb2NpYXRpb246ICEhc3BVc2VyQXNzb2NpYXRpb24sXG4gICAgICAgICAgICAgICAgc2hpZnRBc3NvY2lhdGlvbjogISFzaGlmdEFzc29jaWF0aW9uLFxuICAgICAgICAgICAgICAgIHNoaWZ0RGF0ZTogISFzaGlmdERhdGVBdHRyaWJ1dGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59O1xuIiwiaW1wb3J0IHsgUmVhY3RFbGVtZW50LCBjcmVhdGVFbGVtZW50LCB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgU2hpZnRTY2hlZHVsZXJDb250YWluZXJQcm9wcyB9IGZyb20gXCIuLi90eXBpbmdzL1NoaWZ0U2NoZWR1bGVyUHJvcHNcIjtcbmltcG9ydCBTY2hlZHVsZUdyaWQgZnJvbSBcIi4vY29tcG9uZW50cy9TY2hlZHVsZUdyaWRcIjtcbmltcG9ydCB7IHVzZVNoaWZ0RGF0YSB9IGZyb20gXCIuL2hvb2tzL3VzZVNoaWZ0RGF0YVwiO1xuaW1wb3J0IFwiLi91aS9TaGlmdFNjaGVkdWxlci5jc3NcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIFNoaWZ0U2NoZWR1bGVyKHtcbiAgICBuYW1lLFxuICAgIGNsYXNzOiBjbGFzc05hbWUsXG4gICAgc3R5bGUsXG4gICAgdGFiSW5kZXgsXG4gICAgZW5naW5lZXJzLFxuICAgIHNoaWZ0cyxcbiAgICBuYW1lQXR0cmlidXRlLFxuICAgIGhlYWRlckF0dHJpYnV0ZSxcbiAgICBzdWJoZWFkZXJBdHRyaWJ1dGUsXG4gICAgc2hvd0RlYnVnSW5mbyxcbiAgICBzdGFydFRpbWVBdHRyaWJ1dGUsXG4gICAgZW5kVGltZUF0dHJpYnV0ZTogX2VuZFRpbWVBdHRyaWJ1dGUsXG4gICAgZGF5VHlwZUF0dHJpYnV0ZSxcbiAgICBldmVudFR5cGVBdHRyaWJ1dGU6IF9ldmVudFR5cGVBdHRyaWJ1dGUsXG4gICAgc3RhdHVzQXR0cmlidXRlLFxuICAgIHNwVXNlckFzc29jaWF0aW9uLFxuICAgIHNwVXNlckRhdGFzb3VyY2U6IF9zcFVzZXJEYXRhc291cmNlLFxuICAgIHNoaWZ0QXNzb2NpYXRpb24sXG4gICAgc2hpZnREYXRhc291cmNlOiBfc2hpZnREYXRhc291cmNlLFxuICAgIHNoaWZ0RGF0ZUF0dHJpYnV0ZSxcbiAgICBvbkVkaXRTaGlmdCxcbiAgICBvbkNyZWF0ZVNoaWZ0LFxuICAgIG9uRGVsZXRlU2hpZnQsXG4gICAgb25CYXRjaENyZWF0ZSxcbiAgICBvbkJhdGNoRWRpdCxcbiAgICBvbkJhdGNoRGVsZXRlXG59OiBTaGlmdFNjaGVkdWxlckNvbnRhaW5lclByb3BzKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCB7XG4gICAgICAgIGVuZ2luZWVyczogZW5naW5lZXJEYXRhLFxuICAgICAgICBzaGlmdHM6IHNoaWZ0c0RhdGEsXG4gICAgICAgIGxvYWRpbmcsXG4gICAgICAgIHNoaWZ0c0xvYWRpbmcsXG4gICAgICAgIGVycm9yLFxuICAgICAgICBnZXRTaGlmdHNGb3JFbmdpbmVlcixcbiAgICAgICAgZ2V0RW5naW5lZXJzQnlUZWFtLFxuICAgICAgICBkZWJ1Z0luZm9cbiAgICB9ID0gdXNlU2hpZnREYXRhKHtcbiAgICAgICAgZW5naW5lZXJzU291cmNlOiBlbmdpbmVlcnMsXG4gICAgICAgIHNoaWZ0c1NvdXJjZTogc2hpZnRzLFxuICAgICAgICBuYW1lQXR0cmlidXRlLFxuICAgICAgICBoZWFkZXJBdHRyaWJ1dGUsXG4gICAgICAgIHN1YmhlYWRlckF0dHJpYnV0ZSxcbiAgICAgICAgc3RhcnRUaW1lQXR0cmlidXRlLFxuICAgICAgICBkYXlUeXBlQXR0cmlidXRlLFxuICAgICAgICBzdGF0dXNBdHRyaWJ1dGUsXG4gICAgICAgIHNwVXNlckFzc29jaWF0aW9uLFxuICAgICAgICBzaGlmdEFzc29jaWF0aW9uLFxuICAgICAgICBzaGlmdERhdGVBdHRyaWJ1dGVcbiAgICB9KTtcblxuICAgIGNvbnN0IGhhbmRsZUVkaXRTaGlmdCA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoX3NoaWZ0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChvbkVkaXRTaGlmdCAmJiBvbkVkaXRTaGlmdC5jYW5FeGVjdXRlICYmICFvbkVkaXRTaGlmdC5pc0V4ZWN1dGluZykge1xuICAgICAgICAgICAgICAgIG9uRWRpdFNoaWZ0LmV4ZWN1dGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW29uRWRpdFNoaWZ0XVxuICAgICk7XG5cbiAgICAvLyBDb250ZXh0IG1lbnUgYWN0aW9uIGhhbmRsZXJzXG4gICAgY29uc3QgaGFuZGxlQ3JlYXRlU2hpZnQgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKF9lbmdpbmVlcklkOiBzdHJpbmcsIF9kYXRlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmIChvbkNyZWF0ZVNoaWZ0ICYmIG9uQ3JlYXRlU2hpZnQuY2FuRXhlY3V0ZSAmJiAhb25DcmVhdGVTaGlmdC5pc0V4ZWN1dGluZykge1xuICAgICAgICAgICAgICAgIG9uQ3JlYXRlU2hpZnQuZXhlY3V0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbb25DcmVhdGVTaGlmdF1cbiAgICApO1xuXG4gICAgY29uc3QgaGFuZGxlRGVsZXRlU2hpZnQgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKF9zaGlmdDogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAob25EZWxldGVTaGlmdCAmJiBvbkRlbGV0ZVNoaWZ0LmNhbkV4ZWN1dGUgJiYgIW9uRGVsZXRlU2hpZnQuaXNFeGVjdXRpbmcpIHtcbiAgICAgICAgICAgICAgICBvbkRlbGV0ZVNoaWZ0LmV4ZWN1dGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW29uRGVsZXRlU2hpZnRdXG4gICAgKTtcblxuICAgIGNvbnN0IGhhbmRsZUJhdGNoRWRpdCA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoc2VsZWN0ZWRDZWxsczogQXJyYXk8eyBlbmdpbmVlcklkOiBzdHJpbmc7IGRhdGU6IHN0cmluZyB9PikgPT4ge1xuICAgICAgICAgICAgaWYgKG9uQmF0Y2hFZGl0ICYmIG9uQmF0Y2hFZGl0LmNhbkV4ZWN1dGUgJiYgIW9uQmF0Y2hFZGl0LmlzRXhlY3V0aW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IGV2ZW50IElEcyBmb3IgY2VsbHMgdGhhdCBoYXZlIHNoaWZ0c1xuICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50SWRzID0gc2VsZWN0ZWRDZWxsc1xuICAgICAgICAgICAgICAgICAgICAubWFwKGNlbGwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hpZnQgPSBzaGlmdHNEYXRhLmZpbmQocyA9PiBzLmVuZ2luZWVySWQgPT09IGNlbGwuZW5naW5lZXJJZCAmJiBzLmRhdGUgPT09IGNlbGwuZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2hpZnQ/LmlkO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKFwiLFwiKTtcblxuICAgICAgICAgICAgICAgIGlmIChldmVudElkcykge1xuICAgICAgICAgICAgICAgICAgICBvbkJhdGNoRWRpdC5leGVjdXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbb25CYXRjaEVkaXQsIHNoaWZ0c0RhdGFdXG4gICAgKTtcblxuICAgIGNvbnN0IGhhbmRsZUJhdGNoRGVsZXRlID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChzZWxlY3RlZENlbGxzOiBBcnJheTx7IGVuZ2luZWVySWQ6IHN0cmluZzsgZGF0ZTogc3RyaW5nIH0+KSA9PiB7XG4gICAgICAgICAgICBpZiAob25CYXRjaERlbGV0ZSAmJiBvbkJhdGNoRGVsZXRlLmNhbkV4ZWN1dGUgJiYgIW9uQmF0Y2hEZWxldGUuaXNFeGVjdXRpbmcpIHtcbiAgICAgICAgICAgICAgICAvLyBHZXQgZXZlbnQgSURzIGZvciBjZWxscyB0aGF0IGhhdmUgc2hpZnRzXG4gICAgICAgICAgICAgICAgY29uc3QgZXZlbnRJZHMgPSBzZWxlY3RlZENlbGxzXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoY2VsbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGlmdCA9IHNoaWZ0c0RhdGEuZmluZChzID0+IHMuZW5naW5lZXJJZCA9PT0gY2VsbC5lbmdpbmVlcklkICYmIHMuZGF0ZSA9PT0gY2VsbC5kYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzaGlmdD8uaWQ7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgICAgICAgICAgICAgICAgLmpvaW4oXCIsXCIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50SWRzKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uQmF0Y2hEZWxldGUuZXhlY3V0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW29uQmF0Y2hEZWxldGUsIHNoaWZ0c0RhdGFdXG4gICAgKTtcblxuICAgIGNvbnN0IGhhbmRsZUJhdGNoQ3JlYXRlID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChzZWxlY3RlZENlbGxzOiBBcnJheTx7IGVuZ2luZWVySWQ6IHN0cmluZzsgZGF0ZTogc3RyaW5nIH0+KSA9PiB7XG4gICAgICAgICAgICBpZiAob25CYXRjaENyZWF0ZSAmJiBvbkJhdGNoQ3JlYXRlLmNhbkV4ZWN1dGUgJiYgIW9uQmF0Y2hDcmVhdGUuaXNFeGVjdXRpbmcpIHtcbiAgICAgICAgICAgICAgICAvLyBHZXQgZW1wdHkgY2VsbHMgKGNlbGxzIHdpdGhvdXQgc2hpZnRzKVxuICAgICAgICAgICAgICAgIGNvbnN0IGVtcHR5Q2VsbHMgPSBzZWxlY3RlZENlbGxzLmZpbHRlcihjZWxsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hpZnQgPSBzaGlmdHNEYXRhLmZpbmQocyA9PiBzLmVuZ2luZWVySWQgPT09IGNlbGwuZW5naW5lZXJJZCAmJiBzLmRhdGUgPT09IGNlbGwuZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhc2hpZnQ7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZW1wdHlDZWxscy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uQmF0Y2hDcmVhdGUuZXhlY3V0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW29uQmF0Y2hDcmVhdGUsIHNoaWZ0c0RhdGFdXG4gICAgKTtcblxuICAgIC8vIEVycm9yIHN0YXRlXG4gICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHNoaWZ0LXNjaGVkdWxlciAke2NsYXNzTmFtZX1gfSBzdHlsZT17c3R5bGV9IHRhYkluZGV4PXt0YWJJbmRleH0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaGlmdC1zY2hlZHVsZXItZXJyb3JcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPuKaoO+4jyBDb25maWd1cmF0aW9uIEVycm9yPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPHA+e2Vycm9yLm1lc3NhZ2V9PC9wPlxuICAgICAgICAgICAgICAgICAgICB7ZXJyb3IucHJvcGVydHkgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsPkNoZWNrIHRoZSB7ZXJyb3IucHJvcGVydHl9IHByb3BlcnR5IGluIHRoZSB3aWRnZXQgY29uZmlndXJhdGlvbi48L3NtYWxsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gTG9hZGluZyBzdGF0ZSAtIG9ubHkgc2hvdyBpZiBlbmdpbmVlcnMgaGF2ZW4ndCBsb2FkZWQgeWV0XG4gICAgaWYgKGxvYWRpbmcgJiYgKCFlbmdpbmVlckRhdGEgfHwgZW5naW5lZXJEYXRhLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgc2hpZnQtc2NoZWR1bGVyICR7Y2xhc3NOYW1lfWB9IHN0eWxlPXtzdHlsZX0gdGFiSW5kZXg9e3RhYkluZGV4fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNoaWZ0LXNjaGVkdWxlci1sb2FkaW5nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9hZGluZy1zcGlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxwPkxvYWRpbmcgZW5naW5lZXJzLi4uPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gRW1wdHkgc3RhdGVcbiAgICBpZiAoIWVuZ2luZWVyRGF0YSB8fCBlbmdpbmVlckRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHNoaWZ0LXNjaGVkdWxlciAke2NsYXNzTmFtZX1gfSBzdHlsZT17c3R5bGV9IHRhYkluZGV4PXt0YWJJbmRleH0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaGlmdC1zY2hlZHVsZXItZW1wdHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPvCfk4UgTm8gRGF0YSBBdmFpbGFibGU8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8cD5ObyBlbmdpbmVlcnMgZm91bmQuIFBsZWFzZSBjaGVjayB5b3VyIGRhdGEgc291cmNlIGNvbmZpZ3VyYXRpb24uPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BzaGlmdC1zY2hlZHVsZXIgJHtjbGFzc05hbWV9YH0gc3R5bGU9e3N0eWxlfSB0YWJJbmRleD17dGFiSW5kZXh9IGRhdGEtd2lkZ2V0LW5hbWU9e25hbWV9PlxuICAgICAgICAgICAgPFNjaGVkdWxlR3JpZFxuICAgICAgICAgICAgICAgIGVuZ2luZWVycz17ZW5naW5lZXJEYXRhfVxuICAgICAgICAgICAgICAgIHNoaWZ0cz17c2hpZnRzRGF0YX1cbiAgICAgICAgICAgICAgICBnZXRTaGlmdHNGb3JFbmdpbmVlcj17Z2V0U2hpZnRzRm9yRW5naW5lZXJ9XG4gICAgICAgICAgICAgICAgZ2V0RW5naW5lZXJzQnlUZWFtPXtnZXRFbmdpbmVlcnNCeVRlYW19XG4gICAgICAgICAgICAgICAgb25FZGl0U2hpZnQ9e2hhbmRsZUVkaXRTaGlmdH1cbiAgICAgICAgICAgICAgICBvbkNyZWF0ZVNoaWZ0PXtoYW5kbGVDcmVhdGVTaGlmdH1cbiAgICAgICAgICAgICAgICBvbkRlbGV0ZVNoaWZ0PXtoYW5kbGVEZWxldGVTaGlmdH1cbiAgICAgICAgICAgICAgICBvbkJhdGNoQ3JlYXRlPXtoYW5kbGVCYXRjaENyZWF0ZX1cbiAgICAgICAgICAgICAgICBvbkJhdGNoRWRpdD17aGFuZGxlQmF0Y2hFZGl0fVxuICAgICAgICAgICAgICAgIG9uQmF0Y2hEZWxldGU9e2hhbmRsZUJhdGNoRGVsZXRlfVxuICAgICAgICAgICAgICAgIHNob3dEZWJ1Z0luZm89e3Nob3dEZWJ1Z0luZm99XG4gICAgICAgICAgICAgICAgZGVidWdJbmZvPXtkZWJ1Z0luZm99XG4gICAgICAgICAgICAgICAgc2hpZnRzTG9hZGluZz17c2hpZnRzTG9hZGluZ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG4iXSwibmFtZXMiOlsidCIsImUiLCJtb2R1bGUiLCJ0aGlzIiwibiIsInIiLCJpIiwicyIsInUiLCJhIiwibyIsImMiLCJmIiwiaCIsImQiLCJsIiwiJCIsInkiLCJNIiwibmFtZSIsIndlZWtkYXlzIiwic3BsaXQiLCJtb250aHMiLCJvcmRpbmFsIiwibSIsIlN0cmluZyIsImxlbmd0aCIsIkFycmF5Iiwiam9pbiIsInYiLCJ6IiwidXRjT2Zmc2V0IiwiTWF0aCIsImFicyIsImZsb29yIiwiZGF0ZSIsInllYXIiLCJtb250aCIsImNsb25lIiwiYWRkIiwiY2VpbCIsInAiLCJ3IiwiRCIsIm1zIiwiUSIsInRvTG93ZXJDYXNlIiwicmVwbGFjZSIsImciLCJTIiwiXyIsIk8iLCJhcmdzIiwiYXJndW1lbnRzIiwiYiIsImxvY2FsZSIsIiRMIiwidXRjIiwiJHUiLCJ4IiwiJHgiLCIkb2Zmc2V0IiwicGFyc2UiLCJwcm90b3R5cGUiLCIkZCIsIkRhdGUiLCJOYU4iLCJ0ZXN0IiwibWF0Y2giLCJzdWJzdHJpbmciLCJVVEMiLCJpbml0IiwiJHkiLCJnZXRGdWxsWWVhciIsIiRNIiwiZ2V0TW9udGgiLCIkRCIsImdldERhdGUiLCIkVyIsImdldERheSIsIiRIIiwiZ2V0SG91cnMiLCIkbSIsImdldE1pbnV0ZXMiLCIkcyIsImdldFNlY29uZHMiLCIkbXMiLCJnZXRNaWxsaXNlY29uZHMiLCIkdXRpbHMiLCJpc1ZhbGlkIiwidG9TdHJpbmciLCJpc1NhbWUiLCJzdGFydE9mIiwiZW5kT2YiLCJpc0FmdGVyIiwiaXNCZWZvcmUiLCIkZyIsInNldCIsInVuaXgiLCJ2YWx1ZU9mIiwiZ2V0VGltZSIsInRvRGF0ZSIsImFwcGx5Iiwic2xpY2UiLCIkbG9jYWxlIiwid2Vla1N0YXJ0IiwiJHNldCIsIm1pbiIsImRheXNJbk1vbnRoIiwiZ2V0IiwiTnVtYmVyIiwicm91bmQiLCJzdWJ0cmFjdCIsImZvcm1hdCIsImludmFsaWREYXRlIiwibWVyaWRpZW0iLCJtb250aHNTaG9ydCIsIndlZWtkYXlzTWluIiwid2Vla2RheXNTaG9ydCIsImdldFRpbWV6b25lT2Zmc2V0IiwiZGlmZiIsInRvSlNPTiIsInRvSVNPU3RyaW5nIiwidG9VVENTdHJpbmciLCJrIiwiZm9yRWFjaCIsImV4dGVuZCIsIiRpIiwiaXNEYXlqcyIsImVuIiwiTHMiLCJsb2NhbCIsImNhbGwiLCJnZXRVVENGdWxsWWVhciIsImdldFVUQ01vbnRoIiwiZ2V0VVRDRGF0ZSIsImdldFVUQ0RheSIsImdldFVUQ0hvdXJzIiwiZ2V0VVRDTWludXRlcyIsImdldFVUQ1NlY29uZHMiLCJnZXRVVENNaWxsaXNlY29uZHMiLCIkbG9jYWxPZmZzZXQiLCJpc1VUQyIsImRheSIsImhvdXIiLCJtaW51dGUiLCJzZWNvbmQiLCJ0aW1lWm9uZU5hbWUiLCJJbnRsIiwiRGF0ZVRpbWVGb3JtYXQiLCJob3VyMTIiLCJ0aW1lWm9uZSIsImZvcm1hdFRvUGFydHMiLCJ0eXBlIiwidmFsdWUiLCJwYXJzZUludCIsInR6IiwidG9Mb2NhbGVTdHJpbmciLCIkdGltZXpvbmUiLCJvZmZzZXROYW1lIiwiZ3Vlc3MiLCJmaW5kIiwibWF4IiwicmVzb2x2ZWRPcHRpb25zIiwic2V0RGVmYXVsdCIsImlzU2FtZU9yQmVmb3JlIiwiaXNTYW1lT3JBZnRlciIsInVzZVJlZiIsInVzZUNhbGxiYWNrIiwidXNlRWZmZWN0IiwidXNlTWVtbyIsImNyZWF0ZUVsZW1lbnQiLCJSZWFjdCIsInVzZVN0YXRlIiwiU2NoZWR1bGVHcmlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQUFBLEVBQUEsQ0FBQyxVQUFTQSxDQUFDLEVBQUNDLENBQUMsRUFBQztLQUFzREMsTUFBQUEsQ0FBQUEsT0FBQUEsR0FBZUQsQ0FBQyxFQUFFLENBQWdILENBQUE7SUFBQyxDQUFDRSxTQUFJLEVBQUUsWUFBVTs7S0FBYyxJQUFJSCxDQUFDLEdBQUMsR0FBRztPQUFDQyxDQUFDLEdBQUMsR0FBRztPQUFDRyxDQUFDLEdBQUMsSUFBSTtPQUFDQyxDQUFDLEdBQUMsYUFBYTtPQUFDQyxDQUFDLEdBQUMsUUFBUTtPQUFDQyxDQUFDLEdBQUMsUUFBUTtPQUFDQyxDQUFDLEdBQUMsTUFBTTtPQUFDQyxDQUFDLEdBQUMsS0FBSztPQUFDQyxDQUFDLEdBQUMsTUFBTTtPQUFDQyxDQUFDLEdBQUMsT0FBTztPQUFDQyxDQUFDLEdBQUMsU0FBUztPQUFDQyxDQUFDLEdBQUMsTUFBTTtPQUFDQyxDQUFDLEdBQUMsTUFBTTtPQUFDQyxDQUFDLEdBQUMsY0FBYztPQUFDQyxDQUFDLEdBQUMsNEZBQTRGO09BQUNDLENBQUMsR0FBQyxxRkFBcUY7Q0FBQ0MsTUFBQUEsQ0FBQyxHQUFDO1NBQUNDLElBQUksRUFBQyxJQUFJO0NBQUNDLFFBQUFBLFFBQVEsRUFBQywwREFBMEQsQ0FBQ0MsS0FBSyxDQUFDLEdBQUcsQ0FB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
