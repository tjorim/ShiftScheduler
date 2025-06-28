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
	const ScheduleGrid = ({ engineers: _engineers, shifts, getShiftsForEngineer: _getShiftsForEngineer, getEngineersByTeam, onEditShift, onCreateShift, onDeleteShift, contextShiftId, contextEngineerId, contextDate, contextSelectedCells, onBatchCreate, onBatchEdit, onBatchDelete, readOnly = false, className = "", 
	// teamAccess, // No longer needed
	showDebugInfo, shiftsLoading, debugInfo }) => {
	    // Use all shifts data directly - security is handled by ActionValue.canExecute
	    const accessibleShifts = shifts;
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
	            // Check if any batch operation is available
	            if (onBatchCreate || onBatchEdit || onBatchDelete) {
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
	            options = createExistingShiftMenu(shift, engineer, onEditShift?.canExecute
	                ? shift => {
	                    if (onEditShift?.canExecute && !onEditShift.isExecuting) {
	                        if (contextShiftId?.setValue) {
	                            contextShiftId.setValue(shift.id);
	                        }
	                        onEditShift.execute();
	                    }
	                }
	                : noOpShiftFunction, onDeleteShift?.canExecute
	                ? shift => {
	                    if (onDeleteShift?.canExecute && !onDeleteShift.isExecuting) {
	                        if (contextShiftId?.setValue) {
	                            contextShiftId.setValue(shift.id);
	                        }
	                        onDeleteShift.execute();
	                    }
	                }
	                : noOpShiftFunction);
	        }
	        else if (onCreateShift?.canExecute) {
	            // Empty cell context menu (only if user can execute create action)
	            options = createEmptyCellMenu(engineer, date, (engineerId, date) => {
	                if (onCreateShift?.canExecute && !onCreateShift.isExecuting) {
	                    if (contextEngineerId?.setValue) {
	                        contextEngineerId.setValue(engineerId);
	                    }
	                    if (contextDate?.setValue) {
	                        contextDate.setValue(date);
	                    }
	                    onCreateShift.execute();
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
	        onEditShift,
	        onDeleteShift,
	        contextShiftId,
	        contextEngineerId,
	        contextDate,
	        contextSelectedCells,
	        selectedCells,
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
	        return (React2.createElement(EmptyState, { message: "No Engineers Available", description: "No engineers found. Please check your data configuration.", className: className }));
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
	                                                if (onEditShift?.canExecute && !onEditShift.isExecuting) {
	                                                    if (contextShiftId?.setValue) {
	                                                        contextShiftId.setValue(shift.id);
	                                                    }
	                                                    onEditShift.execute();
	                                                }
	                                            }
	                                            else {
	                                                // Empty cell: create new shift
	                                                if (onCreateShift?.canExecute && !onCreateShift.isExecuting) {
	                                                    if (contextEngineerId?.setValue) {
	                                                        contextEngineerId.setValue(engineer.id);
	                                                    }
	                                                    if (contextDate?.setValue) {
	                                                        contextDate.setValue(col.dateString);
	                                                    }
	                                                    onCreateShift.execute();
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

	function ShiftScheduler({ name, class: className, style, tabIndex, engineers, shifts, nameAttribute, headerAttribute, subheaderAttribute, showDebugInfo, startTimeAttribute, endTimeAttribute: _endTimeAttribute, dayTypeAttribute, eventTypeAttribute: _eventTypeAttribute, statusAttribute, spUserAssociation, spUserDatasource: _spUserDatasource, shiftAssociation, shiftDatasource: _shiftDatasource, shiftDateAttribute, contextShiftId, contextEngineerId, contextDate, contextSelectedCells, onEditShift, onCreateShift, onDeleteShift, onBatchCreate, onBatchEdit, onBatchDelete }) {
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
	    // All action handling moved to ScheduleGrid - no wrapper handlers needed
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
	                // Set context attributes before calling microflow
	                if (contextSelectedCells?.setValue) {
	                    contextSelectedCells.setValue(eventIds);
	                }
	                onBatchEdit.execute();
	            }
	        }
	    }, [onBatchEdit, shiftsData, contextSelectedCells]);
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
	                // Set context attributes before calling microflow
	                if (contextSelectedCells?.setValue) {
	                    contextSelectedCells.setValue(eventIds);
	                }
	                onBatchDelete.execute();
	            }
	        }
	    }, [onBatchDelete, shiftsData, contextSelectedCells]);
	    const handleBatchCreate = React2.useCallback((selectedCells) => {
	        if (onBatchCreate && onBatchCreate.canExecute && !onBatchCreate.isExecuting) {
	            // Get empty cells (cells without shifts)
	            const emptyCells = selectedCells.filter(cell => {
	                const shift = shiftsData.find(s => s.engineerId === cell.engineerId && s.date === cell.date);
	                return !shift;
	            });
	            if (emptyCells.length > 0) {
	                // Set context attributes before calling microflow
	                if (contextSelectedCells?.setValue) {
	                    contextSelectedCells.setValue(JSON.stringify(emptyCells));
	                }
	                onBatchCreate.execute();
	            }
	        }
	    }, [onBatchCreate, shiftsData, contextSelectedCells]);
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
	        React2.createElement(ScheduleGrid$1, { engineers: engineerData, shifts: shiftsData, getShiftsForEngineer: getShiftsForEngineer, getEngineersByTeam: getEngineersByTeam, onEditShift: onEditShift, onCreateShift: onCreateShift, onDeleteShift: onDeleteShift, contextShiftId: contextShiftId, contextEngineerId: contextEngineerId, contextDate: contextDate, contextSelectedCells: contextSelectedCells, onBatchCreate: handleBatchCreate, onBatchEdit: handleBatchEdit, onBatchDelete: handleBatchDelete, showDebugInfo: showDebugInfo, debugInfo: debugInfo, shiftsLoading: shiftsLoading })));
	}

	exports.ShiftScheduler = ShiftScheduler;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hpZnRTY2hlZHVsZXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9kYXlqcy9kYXlqcy5taW4uanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZGF5anMvcGx1Z2luL3V0Yy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9kYXlqcy9wbHVnaW4vdGltZXpvbmUuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZGF5anMvcGx1Z2luL2lzU2FtZU9yQmVmb3JlLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2RheWpzL3BsdWdpbi9pc1NhbWVPckFmdGVyLmpzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL2RhdGVIZWxwZXJzLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2hvb2tzL3VzZVNjcm9sbE5hdmlnYXRpb24udHMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Mb2FkaW5nU3RhdGVzLnRzeCIsIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9zaGlmdEhlbHBlcnMudHMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9EYXlDZWxsLnRzeCIsIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0NvbnRleHRNZW51LnRzeCIsIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1NjaGVkdWxlR3JpZC50c3giLCIuLi8uLi8uLi8uLi8uLi9zcmMvaG9va3MvdXNlU2hpZnREYXRhLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL1NoaWZ0U2NoZWR1bGVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIhZnVuY3Rpb24odCxlKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1lKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShlKToodD1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOnR8fHNlbGYpLmRheWpzPWUoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgdD0xZTMsZT02ZTQsbj0zNmU1LHI9XCJtaWxsaXNlY29uZFwiLGk9XCJzZWNvbmRcIixzPVwibWludXRlXCIsdT1cImhvdXJcIixhPVwiZGF5XCIsbz1cIndlZWtcIixjPVwibW9udGhcIixmPVwicXVhcnRlclwiLGg9XCJ5ZWFyXCIsZD1cImRhdGVcIixsPVwiSW52YWxpZCBEYXRlXCIsJD0vXihcXGR7NH0pWy0vXT8oXFxkezEsMn0pP1stL10/KFxcZHswLDJ9KVtUdFxcc10qKFxcZHsxLDJ9KT86PyhcXGR7MSwyfSk/Oj8oXFxkezEsMn0pP1suOl0/KFxcZCspPyQvLHk9L1xcWyhbXlxcXV0rKV18WXsxLDR9fE17MSw0fXxEezEsMn18ZHsxLDR9fEh7MSwyfXxoezEsMn18YXxBfG17MSwyfXxzezEsMn18WnsxLDJ9fFNTUy9nLE09e25hbWU6XCJlblwiLHdlZWtkYXlzOlwiU3VuZGF5X01vbmRheV9UdWVzZGF5X1dlZG5lc2RheV9UaHVyc2RheV9GcmlkYXlfU2F0dXJkYXlcIi5zcGxpdChcIl9cIiksbW9udGhzOlwiSmFudWFyeV9GZWJydWFyeV9NYXJjaF9BcHJpbF9NYXlfSnVuZV9KdWx5X0F1Z3VzdF9TZXB0ZW1iZXJfT2N0b2Jlcl9Ob3ZlbWJlcl9EZWNlbWJlclwiLnNwbGl0KFwiX1wiKSxvcmRpbmFsOmZ1bmN0aW9uKHQpe3ZhciBlPVtcInRoXCIsXCJzdFwiLFwibmRcIixcInJkXCJdLG49dCUxMDA7cmV0dXJuXCJbXCIrdCsoZVsobi0yMCklMTBdfHxlW25dfHxlWzBdKStcIl1cIn19LG09ZnVuY3Rpb24odCxlLG4pe3ZhciByPVN0cmluZyh0KTtyZXR1cm4hcnx8ci5sZW5ndGg+PWU/dDpcIlwiK0FycmF5KGUrMS1yLmxlbmd0aCkuam9pbihuKSt0fSx2PXtzOm0sejpmdW5jdGlvbih0KXt2YXIgZT0tdC51dGNPZmZzZXQoKSxuPU1hdGguYWJzKGUpLHI9TWF0aC5mbG9vcihuLzYwKSxpPW4lNjA7cmV0dXJuKGU8PTA/XCIrXCI6XCItXCIpK20ociwyLFwiMFwiKStcIjpcIittKGksMixcIjBcIil9LG06ZnVuY3Rpb24gdChlLG4pe2lmKGUuZGF0ZSgpPG4uZGF0ZSgpKXJldHVybi10KG4sZSk7dmFyIHI9MTIqKG4ueWVhcigpLWUueWVhcigpKSsobi5tb250aCgpLWUubW9udGgoKSksaT1lLmNsb25lKCkuYWRkKHIsYykscz1uLWk8MCx1PWUuY2xvbmUoKS5hZGQocisocz8tMToxKSxjKTtyZXR1cm4rKC0ocisobi1pKS8ocz9pLXU6dS1pKSl8fDApfSxhOmZ1bmN0aW9uKHQpe3JldHVybiB0PDA/TWF0aC5jZWlsKHQpfHwwOk1hdGguZmxvb3IodCl9LHA6ZnVuY3Rpb24odCl7cmV0dXJue006Yyx5OmgsdzpvLGQ6YSxEOmQsaDp1LG06cyxzOmksbXM6cixROmZ9W3RdfHxTdHJpbmcodHx8XCJcIikudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9zJC8sXCJcIil9LHU6ZnVuY3Rpb24odCl7cmV0dXJuIHZvaWQgMD09PXR9fSxnPVwiZW5cIixEPXt9O0RbZ109TTt2YXIgcD1cIiRpc0RheWpzT2JqZWN0XCIsUz1mdW5jdGlvbih0KXtyZXR1cm4gdCBpbnN0YW5jZW9mIF98fCEoIXR8fCF0W3BdKX0sdz1mdW5jdGlvbiB0KGUsbixyKXt2YXIgaTtpZighZSlyZXR1cm4gZztpZihcInN0cmluZ1wiPT10eXBlb2YgZSl7dmFyIHM9ZS50b0xvd2VyQ2FzZSgpO0Rbc10mJihpPXMpLG4mJihEW3NdPW4saT1zKTt2YXIgdT1lLnNwbGl0KFwiLVwiKTtpZighaSYmdS5sZW5ndGg+MSlyZXR1cm4gdCh1WzBdKX1lbHNle3ZhciBhPWUubmFtZTtEW2FdPWUsaT1hfXJldHVybiFyJiZpJiYoZz1pKSxpfHwhciYmZ30sTz1mdW5jdGlvbih0LGUpe2lmKFModCkpcmV0dXJuIHQuY2xvbmUoKTt2YXIgbj1cIm9iamVjdFwiPT10eXBlb2YgZT9lOnt9O3JldHVybiBuLmRhdGU9dCxuLmFyZ3M9YXJndW1lbnRzLG5ldyBfKG4pfSxiPXY7Yi5sPXcsYi5pPVMsYi53PWZ1bmN0aW9uKHQsZSl7cmV0dXJuIE8odCx7bG9jYWxlOmUuJEwsdXRjOmUuJHUseDplLiR4LCRvZmZzZXQ6ZS4kb2Zmc2V0fSl9O3ZhciBfPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gTSh0KXt0aGlzLiRMPXcodC5sb2NhbGUsbnVsbCwhMCksdGhpcy5wYXJzZSh0KSx0aGlzLiR4PXRoaXMuJHh8fHQueHx8e30sdGhpc1twXT0hMH12YXIgbT1NLnByb3RvdHlwZTtyZXR1cm4gbS5wYXJzZT1mdW5jdGlvbih0KXt0aGlzLiRkPWZ1bmN0aW9uKHQpe3ZhciBlPXQuZGF0ZSxuPXQudXRjO2lmKG51bGw9PT1lKXJldHVybiBuZXcgRGF0ZShOYU4pO2lmKGIudShlKSlyZXR1cm4gbmV3IERhdGU7aWYoZSBpbnN0YW5jZW9mIERhdGUpcmV0dXJuIG5ldyBEYXRlKGUpO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlJiYhL1okL2kudGVzdChlKSl7dmFyIHI9ZS5tYXRjaCgkKTtpZihyKXt2YXIgaT1yWzJdLTF8fDAscz0ocls3XXx8XCIwXCIpLnN1YnN0cmluZygwLDMpO3JldHVybiBuP25ldyBEYXRlKERhdGUuVVRDKHJbMV0saSxyWzNdfHwxLHJbNF18fDAscls1XXx8MCxyWzZdfHwwLHMpKTpuZXcgRGF0ZShyWzFdLGksclszXXx8MSxyWzRdfHwwLHJbNV18fDAscls2XXx8MCxzKX19cmV0dXJuIG5ldyBEYXRlKGUpfSh0KSx0aGlzLmluaXQoKX0sbS5pbml0PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy4kZDt0aGlzLiR5PXQuZ2V0RnVsbFllYXIoKSx0aGlzLiRNPXQuZ2V0TW9udGgoKSx0aGlzLiREPXQuZ2V0RGF0ZSgpLHRoaXMuJFc9dC5nZXREYXkoKSx0aGlzLiRIPXQuZ2V0SG91cnMoKSx0aGlzLiRtPXQuZ2V0TWludXRlcygpLHRoaXMuJHM9dC5nZXRTZWNvbmRzKCksdGhpcy4kbXM9dC5nZXRNaWxsaXNlY29uZHMoKX0sbS4kdXRpbHM9ZnVuY3Rpb24oKXtyZXR1cm4gYn0sbS5pc1ZhbGlkPWZ1bmN0aW9uKCl7cmV0dXJuISh0aGlzLiRkLnRvU3RyaW5nKCk9PT1sKX0sbS5pc1NhbWU9ZnVuY3Rpb24odCxlKXt2YXIgbj1PKHQpO3JldHVybiB0aGlzLnN0YXJ0T2YoZSk8PW4mJm48PXRoaXMuZW5kT2YoZSl9LG0uaXNBZnRlcj1mdW5jdGlvbih0LGUpe3JldHVybiBPKHQpPHRoaXMuc3RhcnRPZihlKX0sbS5pc0JlZm9yZT1mdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLmVuZE9mKGUpPE8odCl9LG0uJGc9ZnVuY3Rpb24odCxlLG4pe3JldHVybiBiLnUodCk/dGhpc1tlXTp0aGlzLnNldChuLHQpfSxtLnVuaXg9ZnVuY3Rpb24oKXtyZXR1cm4gTWF0aC5mbG9vcih0aGlzLnZhbHVlT2YoKS8xZTMpfSxtLnZhbHVlT2Y9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kZC5nZXRUaW1lKCl9LG0uc3RhcnRPZj1mdW5jdGlvbih0LGUpe3ZhciBuPXRoaXMscj0hIWIudShlKXx8ZSxmPWIucCh0KSxsPWZ1bmN0aW9uKHQsZSl7dmFyIGk9Yi53KG4uJHU/RGF0ZS5VVEMobi4keSxlLHQpOm5ldyBEYXRlKG4uJHksZSx0KSxuKTtyZXR1cm4gcj9pOmkuZW5kT2YoYSl9LCQ9ZnVuY3Rpb24odCxlKXtyZXR1cm4gYi53KG4udG9EYXRlKClbdF0uYXBwbHkobi50b0RhdGUoXCJzXCIpLChyP1swLDAsMCwwXTpbMjMsNTksNTksOTk5XSkuc2xpY2UoZSkpLG4pfSx5PXRoaXMuJFcsTT10aGlzLiRNLG09dGhpcy4kRCx2PVwic2V0XCIrKHRoaXMuJHU/XCJVVENcIjpcIlwiKTtzd2l0Y2goZil7Y2FzZSBoOnJldHVybiByP2woMSwwKTpsKDMxLDExKTtjYXNlIGM6cmV0dXJuIHI/bCgxLE0pOmwoMCxNKzEpO2Nhc2Ugbzp2YXIgZz10aGlzLiRsb2NhbGUoKS53ZWVrU3RhcnR8fDAsRD0oeTxnP3krNzp5KS1nO3JldHVybiBsKHI/bS1EOm0rKDYtRCksTSk7Y2FzZSBhOmNhc2UgZDpyZXR1cm4gJCh2K1wiSG91cnNcIiwwKTtjYXNlIHU6cmV0dXJuICQoditcIk1pbnV0ZXNcIiwxKTtjYXNlIHM6cmV0dXJuICQoditcIlNlY29uZHNcIiwyKTtjYXNlIGk6cmV0dXJuICQoditcIk1pbGxpc2Vjb25kc1wiLDMpO2RlZmF1bHQ6cmV0dXJuIHRoaXMuY2xvbmUoKX19LG0uZW5kT2Y9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuc3RhcnRPZih0LCExKX0sbS4kc2V0PWZ1bmN0aW9uKHQsZSl7dmFyIG4sbz1iLnAodCksZj1cInNldFwiKyh0aGlzLiR1P1wiVVRDXCI6XCJcIiksbD0obj17fSxuW2FdPWYrXCJEYXRlXCIsbltkXT1mK1wiRGF0ZVwiLG5bY109ZitcIk1vbnRoXCIsbltoXT1mK1wiRnVsbFllYXJcIixuW3VdPWYrXCJIb3Vyc1wiLG5bc109ZitcIk1pbnV0ZXNcIixuW2ldPWYrXCJTZWNvbmRzXCIsbltyXT1mK1wiTWlsbGlzZWNvbmRzXCIsbilbb10sJD1vPT09YT90aGlzLiREKyhlLXRoaXMuJFcpOmU7aWYobz09PWN8fG89PT1oKXt2YXIgeT10aGlzLmNsb25lKCkuc2V0KGQsMSk7eS4kZFtsXSgkKSx5LmluaXQoKSx0aGlzLiRkPXkuc2V0KGQsTWF0aC5taW4odGhpcy4kRCx5LmRheXNJbk1vbnRoKCkpKS4kZH1lbHNlIGwmJnRoaXMuJGRbbF0oJCk7cmV0dXJuIHRoaXMuaW5pdCgpLHRoaXN9LG0uc2V0PWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuY2xvbmUoKS4kc2V0KHQsZSl9LG0uZ2V0PWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzW2IucCh0KV0oKX0sbS5hZGQ9ZnVuY3Rpb24ocixmKXt2YXIgZCxsPXRoaXM7cj1OdW1iZXIocik7dmFyICQ9Yi5wKGYpLHk9ZnVuY3Rpb24odCl7dmFyIGU9TyhsKTtyZXR1cm4gYi53KGUuZGF0ZShlLmRhdGUoKStNYXRoLnJvdW5kKHQqcikpLGwpfTtpZigkPT09YylyZXR1cm4gdGhpcy5zZXQoYyx0aGlzLiRNK3IpO2lmKCQ9PT1oKXJldHVybiB0aGlzLnNldChoLHRoaXMuJHkrcik7aWYoJD09PWEpcmV0dXJuIHkoMSk7aWYoJD09PW8pcmV0dXJuIHkoNyk7dmFyIE09KGQ9e30sZFtzXT1lLGRbdV09bixkW2ldPXQsZClbJF18fDEsbT10aGlzLiRkLmdldFRpbWUoKStyKk07cmV0dXJuIGIudyhtLHRoaXMpfSxtLnN1YnRyYWN0PWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuYWRkKC0xKnQsZSl9LG0uZm9ybWF0PWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMsbj10aGlzLiRsb2NhbGUoKTtpZighdGhpcy5pc1ZhbGlkKCkpcmV0dXJuIG4uaW52YWxpZERhdGV8fGw7dmFyIHI9dHx8XCJZWVlZLU1NLUREVEhIOm1tOnNzWlwiLGk9Yi56KHRoaXMpLHM9dGhpcy4kSCx1PXRoaXMuJG0sYT10aGlzLiRNLG89bi53ZWVrZGF5cyxjPW4ubW9udGhzLGY9bi5tZXJpZGllbSxoPWZ1bmN0aW9uKHQsbixpLHMpe3JldHVybiB0JiYodFtuXXx8dChlLHIpKXx8aVtuXS5zbGljZSgwLHMpfSxkPWZ1bmN0aW9uKHQpe3JldHVybiBiLnMocyUxMnx8MTIsdCxcIjBcIil9LCQ9Znx8ZnVuY3Rpb24odCxlLG4pe3ZhciByPXQ8MTI/XCJBTVwiOlwiUE1cIjtyZXR1cm4gbj9yLnRvTG93ZXJDYXNlKCk6cn07cmV0dXJuIHIucmVwbGFjZSh5LChmdW5jdGlvbih0LHIpe3JldHVybiByfHxmdW5jdGlvbih0KXtzd2l0Y2godCl7Y2FzZVwiWVlcIjpyZXR1cm4gU3RyaW5nKGUuJHkpLnNsaWNlKC0yKTtjYXNlXCJZWVlZXCI6cmV0dXJuIGIucyhlLiR5LDQsXCIwXCIpO2Nhc2VcIk1cIjpyZXR1cm4gYSsxO2Nhc2VcIk1NXCI6cmV0dXJuIGIucyhhKzEsMixcIjBcIik7Y2FzZVwiTU1NXCI6cmV0dXJuIGgobi5tb250aHNTaG9ydCxhLGMsMyk7Y2FzZVwiTU1NTVwiOnJldHVybiBoKGMsYSk7Y2FzZVwiRFwiOnJldHVybiBlLiREO2Nhc2VcIkREXCI6cmV0dXJuIGIucyhlLiRELDIsXCIwXCIpO2Nhc2VcImRcIjpyZXR1cm4gU3RyaW5nKGUuJFcpO2Nhc2VcImRkXCI6cmV0dXJuIGgobi53ZWVrZGF5c01pbixlLiRXLG8sMik7Y2FzZVwiZGRkXCI6cmV0dXJuIGgobi53ZWVrZGF5c1Nob3J0LGUuJFcsbywzKTtjYXNlXCJkZGRkXCI6cmV0dXJuIG9bZS4kV107Y2FzZVwiSFwiOnJldHVybiBTdHJpbmcocyk7Y2FzZVwiSEhcIjpyZXR1cm4gYi5zKHMsMixcIjBcIik7Y2FzZVwiaFwiOnJldHVybiBkKDEpO2Nhc2VcImhoXCI6cmV0dXJuIGQoMik7Y2FzZVwiYVwiOnJldHVybiAkKHMsdSwhMCk7Y2FzZVwiQVwiOnJldHVybiAkKHMsdSwhMSk7Y2FzZVwibVwiOnJldHVybiBTdHJpbmcodSk7Y2FzZVwibW1cIjpyZXR1cm4gYi5zKHUsMixcIjBcIik7Y2FzZVwic1wiOnJldHVybiBTdHJpbmcoZS4kcyk7Y2FzZVwic3NcIjpyZXR1cm4gYi5zKGUuJHMsMixcIjBcIik7Y2FzZVwiU1NTXCI6cmV0dXJuIGIucyhlLiRtcywzLFwiMFwiKTtjYXNlXCJaXCI6cmV0dXJuIGl9cmV0dXJuIG51bGx9KHQpfHxpLnJlcGxhY2UoXCI6XCIsXCJcIil9KSl9LG0udXRjT2Zmc2V0PWZ1bmN0aW9uKCl7cmV0dXJuIDE1Ki1NYXRoLnJvdW5kKHRoaXMuJGQuZ2V0VGltZXpvbmVPZmZzZXQoKS8xNSl9LG0uZGlmZj1mdW5jdGlvbihyLGQsbCl7dmFyICQseT10aGlzLE09Yi5wKGQpLG09TyhyKSx2PShtLnV0Y09mZnNldCgpLXRoaXMudXRjT2Zmc2V0KCkpKmUsZz10aGlzLW0sRD1mdW5jdGlvbigpe3JldHVybiBiLm0oeSxtKX07c3dpdGNoKE0pe2Nhc2UgaDokPUQoKS8xMjticmVhaztjYXNlIGM6JD1EKCk7YnJlYWs7Y2FzZSBmOiQ9RCgpLzM7YnJlYWs7Y2FzZSBvOiQ9KGctdikvNjA0OGU1O2JyZWFrO2Nhc2UgYTokPShnLXYpLzg2NGU1O2JyZWFrO2Nhc2UgdTokPWcvbjticmVhaztjYXNlIHM6JD1nL2U7YnJlYWs7Y2FzZSBpOiQ9Zy90O2JyZWFrO2RlZmF1bHQ6JD1nfXJldHVybiBsPyQ6Yi5hKCQpfSxtLmRheXNJbk1vbnRoPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZW5kT2YoYykuJER9LG0uJGxvY2FsZT1mdW5jdGlvbigpe3JldHVybiBEW3RoaXMuJExdfSxtLmxvY2FsZT1mdW5jdGlvbih0LGUpe2lmKCF0KXJldHVybiB0aGlzLiRMO3ZhciBuPXRoaXMuY2xvbmUoKSxyPXcodCxlLCEwKTtyZXR1cm4gciYmKG4uJEw9ciksbn0sbS5jbG9uZT1mdW5jdGlvbigpe3JldHVybiBiLncodGhpcy4kZCx0aGlzKX0sbS50b0RhdGU9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IERhdGUodGhpcy52YWx1ZU9mKCkpfSxtLnRvSlNPTj1mdW5jdGlvbigpe3JldHVybiB0aGlzLmlzVmFsaWQoKT90aGlzLnRvSVNPU3RyaW5nKCk6bnVsbH0sbS50b0lTT1N0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLiRkLnRvSVNPU3RyaW5nKCl9LG0udG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kZC50b1VUQ1N0cmluZygpfSxNfSgpLGs9Xy5wcm90b3R5cGU7cmV0dXJuIE8ucHJvdG90eXBlPWssW1tcIiRtc1wiLHJdLFtcIiRzXCIsaV0sW1wiJG1cIixzXSxbXCIkSFwiLHVdLFtcIiRXXCIsYV0sW1wiJE1cIixjXSxbXCIkeVwiLGhdLFtcIiREXCIsZF1dLmZvckVhY2goKGZ1bmN0aW9uKHQpe2tbdFsxXV09ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuJGcoZSx0WzBdLHRbMV0pfX0pKSxPLmV4dGVuZD1mdW5jdGlvbih0LGUpe3JldHVybiB0LiRpfHwodChlLF8sTyksdC4kaT0hMCksT30sTy5sb2NhbGU9dyxPLmlzRGF5anM9UyxPLnVuaXg9ZnVuY3Rpb24odCl7cmV0dXJuIE8oMWUzKnQpfSxPLmVuPURbZ10sTy5Mcz1ELE8ucD17fSxPfSkpOyIsIiFmdW5jdGlvbih0LGkpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPWkoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGkpOih0PVwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6dHx8c2VsZikuZGF5anNfcGx1Z2luX3V0Yz1pKCl9KHRoaXMsKGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQ9XCJtaW51dGVcIixpPS9bKy1dXFxkXFxkKD86Oj9cXGRcXGQpPy9nLGU9LyhbKy1dfFxcZFxcZCkvZztyZXR1cm4gZnVuY3Rpb24ocyxmLG4pe3ZhciB1PWYucHJvdG90eXBlO24udXRjPWZ1bmN0aW9uKHQpe3ZhciBpPXtkYXRlOnQsdXRjOiEwLGFyZ3M6YXJndW1lbnRzfTtyZXR1cm4gbmV3IGYoaSl9LHUudXRjPWZ1bmN0aW9uKGkpe3ZhciBlPW4odGhpcy50b0RhdGUoKSx7bG9jYWxlOnRoaXMuJEwsdXRjOiEwfSk7cmV0dXJuIGk/ZS5hZGQodGhpcy51dGNPZmZzZXQoKSx0KTplfSx1LmxvY2FsPWZ1bmN0aW9uKCl7cmV0dXJuIG4odGhpcy50b0RhdGUoKSx7bG9jYWxlOnRoaXMuJEwsdXRjOiExfSl9O3ZhciBvPXUucGFyc2U7dS5wYXJzZT1mdW5jdGlvbih0KXt0LnV0YyYmKHRoaXMuJHU9ITApLHRoaXMuJHV0aWxzKCkudSh0LiRvZmZzZXQpfHwodGhpcy4kb2Zmc2V0PXQuJG9mZnNldCksby5jYWxsKHRoaXMsdCl9O3ZhciByPXUuaW5pdDt1LmluaXQ9ZnVuY3Rpb24oKXtpZih0aGlzLiR1KXt2YXIgdD10aGlzLiRkO3RoaXMuJHk9dC5nZXRVVENGdWxsWWVhcigpLHRoaXMuJE09dC5nZXRVVENNb250aCgpLHRoaXMuJEQ9dC5nZXRVVENEYXRlKCksdGhpcy4kVz10LmdldFVUQ0RheSgpLHRoaXMuJEg9dC5nZXRVVENIb3VycygpLHRoaXMuJG09dC5nZXRVVENNaW51dGVzKCksdGhpcy4kcz10LmdldFVUQ1NlY29uZHMoKSx0aGlzLiRtcz10LmdldFVUQ01pbGxpc2Vjb25kcygpfWVsc2Ugci5jYWxsKHRoaXMpfTt2YXIgYT11LnV0Y09mZnNldDt1LnV0Y09mZnNldD1mdW5jdGlvbihzLGYpe3ZhciBuPXRoaXMuJHV0aWxzKCkudTtpZihuKHMpKXJldHVybiB0aGlzLiR1PzA6bih0aGlzLiRvZmZzZXQpP2EuY2FsbCh0aGlzKTp0aGlzLiRvZmZzZXQ7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHMmJihzPWZ1bmN0aW9uKHQpe3ZvaWQgMD09PXQmJih0PVwiXCIpO3ZhciBzPXQubWF0Y2goaSk7aWYoIXMpcmV0dXJuIG51bGw7dmFyIGY9KFwiXCIrc1swXSkubWF0Y2goZSl8fFtcIi1cIiwwLDBdLG49ZlswXSx1PTYwKitmWzFdKyArZlsyXTtyZXR1cm4gMD09PXU/MDpcIitcIj09PW4/dTotdX0ocyksbnVsbD09PXMpKXJldHVybiB0aGlzO3ZhciB1PU1hdGguYWJzKHMpPD0xNj82MCpzOnMsbz10aGlzO2lmKGYpcmV0dXJuIG8uJG9mZnNldD11LG8uJHU9MD09PXMsbztpZigwIT09cyl7dmFyIHI9dGhpcy4kdT90aGlzLnRvRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KCk6LTEqdGhpcy51dGNPZmZzZXQoKTsobz10aGlzLmxvY2FsKCkuYWRkKHUrcix0KSkuJG9mZnNldD11LG8uJHguJGxvY2FsT2Zmc2V0PXJ9ZWxzZSBvPXRoaXMudXRjKCk7cmV0dXJuIG99O3ZhciBoPXUuZm9ybWF0O3UuZm9ybWF0PWZ1bmN0aW9uKHQpe3ZhciBpPXR8fCh0aGlzLiR1P1wiWVlZWS1NTS1ERFRISDptbTpzc1taXVwiOlwiXCIpO3JldHVybiBoLmNhbGwodGhpcyxpKX0sdS52YWx1ZU9mPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy4kdXRpbHMoKS51KHRoaXMuJG9mZnNldCk/MDp0aGlzLiRvZmZzZXQrKHRoaXMuJHguJGxvY2FsT2Zmc2V0fHx0aGlzLiRkLmdldFRpbWV6b25lT2Zmc2V0KCkpO3JldHVybiB0aGlzLiRkLnZhbHVlT2YoKS02ZTQqdH0sdS5pc1VUQz1mdW5jdGlvbigpe3JldHVybiEhdGhpcy4kdX0sdS50b0lTT1N0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLnRvRGF0ZSgpLnRvSVNPU3RyaW5nKCl9LHUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy50b0RhdGUoKS50b1VUQ1N0cmluZygpfTt2YXIgbD11LnRvRGF0ZTt1LnRvRGF0ZT1mdW5jdGlvbih0KXtyZXR1cm5cInNcIj09PXQmJnRoaXMuJG9mZnNldD9uKHRoaXMuZm9ybWF0KFwiWVlZWS1NTS1ERCBISDptbTpzczpTU1NcIikpLnRvRGF0ZSgpOmwuY2FsbCh0aGlzKX07dmFyIGM9dS5kaWZmO3UuZGlmZj1mdW5jdGlvbih0LGksZSl7aWYodCYmdGhpcy4kdT09PXQuJHUpcmV0dXJuIGMuY2FsbCh0aGlzLHQsaSxlKTt2YXIgcz10aGlzLmxvY2FsKCksZj1uKHQpLmxvY2FsKCk7cmV0dXJuIGMuY2FsbChzLGYsaSxlKX19fSkpOyIsIiFmdW5jdGlvbih0LGUpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPWUoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGUpOih0PVwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6dHx8c2VsZikuZGF5anNfcGx1Z2luX3RpbWV6b25lPWUoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgdD17eWVhcjowLG1vbnRoOjEsZGF5OjIsaG91cjozLG1pbnV0ZTo0LHNlY29uZDo1fSxlPXt9O3JldHVybiBmdW5jdGlvbihuLGksbyl7dmFyIHIsYT1mdW5jdGlvbih0LG4saSl7dm9pZCAwPT09aSYmKGk9e30pO3ZhciBvPW5ldyBEYXRlKHQpLHI9ZnVuY3Rpb24odCxuKXt2b2lkIDA9PT1uJiYobj17fSk7dmFyIGk9bi50aW1lWm9uZU5hbWV8fFwic2hvcnRcIixvPXQrXCJ8XCIraSxyPWVbb107cmV0dXJuIHJ8fChyPW5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KFwiZW4tVVNcIix7aG91cjEyOiExLHRpbWVab25lOnQseWVhcjpcIm51bWVyaWNcIixtb250aDpcIjItZGlnaXRcIixkYXk6XCIyLWRpZ2l0XCIsaG91cjpcIjItZGlnaXRcIixtaW51dGU6XCIyLWRpZ2l0XCIsc2Vjb25kOlwiMi1kaWdpdFwiLHRpbWVab25lTmFtZTppfSksZVtvXT1yKSxyfShuLGkpO3JldHVybiByLmZvcm1hdFRvUGFydHMobyl9LHU9ZnVuY3Rpb24oZSxuKXtmb3IodmFyIGk9YShlLG4pLHI9W10sdT0wO3U8aS5sZW5ndGg7dSs9MSl7dmFyIGY9aVt1XSxzPWYudHlwZSxtPWYudmFsdWUsYz10W3NdO2M+PTAmJihyW2NdPXBhcnNlSW50KG0sMTApKX12YXIgZD1yWzNdLGw9MjQ9PT1kPzA6ZCxoPXJbMF0rXCItXCIrclsxXStcIi1cIityWzJdK1wiIFwiK2wrXCI6XCIrcls0XStcIjpcIityWzVdK1wiOjAwMFwiLHY9K2U7cmV0dXJuKG8udXRjKGgpLnZhbHVlT2YoKS0odi09diUxZTMpKS82ZTR9LGY9aS5wcm90b3R5cGU7Zi50ej1mdW5jdGlvbih0LGUpe3ZvaWQgMD09PXQmJih0PXIpO3ZhciBuLGk9dGhpcy51dGNPZmZzZXQoKSxhPXRoaXMudG9EYXRlKCksdT1hLnRvTG9jYWxlU3RyaW5nKFwiZW4tVVNcIix7dGltZVpvbmU6dH0pLGY9TWF0aC5yb3VuZCgoYS1uZXcgRGF0ZSh1KSkvMWUzLzYwKSxzPTE1Ki1NYXRoLnJvdW5kKGEuZ2V0VGltZXpvbmVPZmZzZXQoKS8xNSktZjtpZighTnVtYmVyKHMpKW49dGhpcy51dGNPZmZzZXQoMCxlKTtlbHNlIGlmKG49byh1LHtsb2NhbGU6dGhpcy4kTH0pLiRzZXQoXCJtaWxsaXNlY29uZFwiLHRoaXMuJG1zKS51dGNPZmZzZXQocywhMCksZSl7dmFyIG09bi51dGNPZmZzZXQoKTtuPW4uYWRkKGktbSxcIm1pbnV0ZVwiKX1yZXR1cm4gbi4keC4kdGltZXpvbmU9dCxufSxmLm9mZnNldE5hbWU9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy4keC4kdGltZXpvbmV8fG8udHouZ3Vlc3MoKSxuPWEodGhpcy52YWx1ZU9mKCksZSx7dGltZVpvbmVOYW1lOnR9KS5maW5kKChmdW5jdGlvbih0KXtyZXR1cm5cInRpbWV6b25lbmFtZVwiPT09dC50eXBlLnRvTG93ZXJDYXNlKCl9KSk7cmV0dXJuIG4mJm4udmFsdWV9O3ZhciBzPWYuc3RhcnRPZjtmLnN0YXJ0T2Y9ZnVuY3Rpb24odCxlKXtpZighdGhpcy4keHx8IXRoaXMuJHguJHRpbWV6b25lKXJldHVybiBzLmNhbGwodGhpcyx0LGUpO3ZhciBuPW8odGhpcy5mb3JtYXQoXCJZWVlZLU1NLUREIEhIOm1tOnNzOlNTU1wiKSx7bG9jYWxlOnRoaXMuJEx9KTtyZXR1cm4gcy5jYWxsKG4sdCxlKS50eih0aGlzLiR4LiR0aW1lem9uZSwhMCl9LG8udHo9ZnVuY3Rpb24odCxlLG4pe3ZhciBpPW4mJmUsYT1ufHxlfHxyLGY9dSgrbygpLGEpO2lmKFwic3RyaW5nXCIhPXR5cGVvZiB0KXJldHVybiBvKHQpLnR6KGEpO3ZhciBzPWZ1bmN0aW9uKHQsZSxuKXt2YXIgaT10LTYwKmUqMWUzLG89dShpLG4pO2lmKGU9PT1vKXJldHVybltpLGVdO3ZhciByPXUoaS09NjAqKG8tZSkqMWUzLG4pO3JldHVybiBvPT09cj9baSxvXTpbdC02MCpNYXRoLm1pbihvLHIpKjFlMyxNYXRoLm1heChvLHIpXX0oby51dGModCxpKS52YWx1ZU9mKCksZixhKSxtPXNbMF0sYz1zWzFdLGQ9byhtKS51dGNPZmZzZXQoYyk7cmV0dXJuIGQuJHguJHRpbWV6b25lPWEsZH0sby50ei5ndWVzcz1mdW5jdGlvbigpe3JldHVybiBJbnRsLkRhdGVUaW1lRm9ybWF0KCkucmVzb2x2ZWRPcHRpb25zKCkudGltZVpvbmV9LG8udHouc2V0RGVmYXVsdD1mdW5jdGlvbih0KXtyPXR9fX0pKTsiLCIhZnVuY3Rpb24oZSxpKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1pKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShpKTooZT1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOmV8fHNlbGYpLmRheWpzX3BsdWdpbl9pc1NhbWVPckJlZm9yZT1pKCl9KHRoaXMsKGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7cmV0dXJuIGZ1bmN0aW9uKGUsaSl7aS5wcm90b3R5cGUuaXNTYW1lT3JCZWZvcmU9ZnVuY3Rpb24oZSxpKXtyZXR1cm4gdGhpcy5pc1NhbWUoZSxpKXx8dGhpcy5pc0JlZm9yZShlLGkpfX19KSk7IiwiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUodCk6KGU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczplfHxzZWxmKS5kYXlqc19wbHVnaW5faXNTYW1lT3JBZnRlcj10KCl9KHRoaXMsKGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7cmV0dXJuIGZ1bmN0aW9uKGUsdCl7dC5wcm90b3R5cGUuaXNTYW1lT3JBZnRlcj1mdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLmlzU2FtZShlLHQpfHx0aGlzLmlzQWZ0ZXIoZSx0KX19fSkpOyIsImltcG9ydCBkYXlqcyBmcm9tIFwiZGF5anNcIjtcbmltcG9ydCB1dGMgZnJvbSBcImRheWpzL3BsdWdpbi91dGNcIjtcbmltcG9ydCB0aW1lem9uZSBmcm9tIFwiZGF5anMvcGx1Z2luL3RpbWV6b25lXCI7XG5pbXBvcnQgaXNTYW1lT3JCZWZvcmUgZnJvbSBcImRheWpzL3BsdWdpbi9pc1NhbWVPckJlZm9yZVwiO1xuaW1wb3J0IGlzU2FtZU9yQWZ0ZXIgZnJvbSBcImRheWpzL3BsdWdpbi9pc1NhbWVPckFmdGVyXCI7XG5cbi8vIEV4dGVuZCBkYXlqcyB3aXRoIHBsdWdpbnNcbmRheWpzLmV4dGVuZCh1dGMpO1xuZGF5anMuZXh0ZW5kKHRpbWV6b25lKTtcbmRheWpzLmV4dGVuZChpc1NhbWVPckJlZm9yZSk7XG5kYXlqcy5leHRlbmQoaXNTYW1lT3JBZnRlcik7XG5cbmV4cG9ydCBjb25zdCBmb3JtYXREYXRlID0gKGRhdGU6IERhdGUsIGZvcm1hdCA9IFwiWVlZWS1NTS1ERCBISDptbVwiKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gZGF5anMoZGF0ZSkuZm9ybWF0KGZvcm1hdCk7XG59O1xuXG5leHBvcnQgY29uc3QgcGFyc2VEYXRlID0gKGRhdGVTdHJpbmc6IHN0cmluZyk6IERhdGUgPT4ge1xuICAgIHJldHVybiBkYXlqcyhkYXRlU3RyaW5nKS50b0RhdGUoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGREYXlzID0gKGRhdGU6IERhdGUsIGRheXM6IG51bWJlcik6IERhdGUgPT4ge1xuICAgIHJldHVybiBkYXlqcyhkYXRlKS5hZGQoZGF5cywgXCJkYXlcIikudG9EYXRlKCk7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkSG91cnMgPSAoZGF0ZTogRGF0ZSwgaG91cnM6IG51bWJlcik6IERhdGUgPT4ge1xuICAgIHJldHVybiBkYXlqcyhkYXRlKS5hZGQoaG91cnMsIFwiaG91clwiKS50b0RhdGUoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1NhbWVEYXkgPSAoZGF0ZTE6IERhdGUsIGRhdGUyOiBEYXRlKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIGRheWpzKGRhdGUxKS5pc1NhbWUoZGF5anMoZGF0ZTIpLCBcImRheVwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1dpdGhpblJhbmdlID0gKGRhdGU6IERhdGUsIHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUpOiBib29sZWFuID0+IHtcbiAgICBjb25zdCBkYXlEYXRlID0gZGF5anMoZGF0ZSk7XG4gICAgcmV0dXJuIGRheURhdGUuaXNTYW1lT3JBZnRlcihkYXlqcyhzdGFydCkpICYmIGRheURhdGUuaXNTYW1lT3JCZWZvcmUoZGF5anMoZW5kKSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RHVyYXRpb25Jbk1pbnV0ZXMgPSAoc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSk6IG51bWJlciA9PiB7XG4gICAgcmV0dXJuIGRheWpzKGVuZCkuZGlmZihkYXlqcyhzdGFydCksIFwibWludXRlXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFdlZWtSYW5nZSA9IChkYXRlOiBEYXRlKTogeyBzdGFydDogRGF0ZTsgZW5kOiBEYXRlIH0gPT4ge1xuICAgIGNvbnN0IHN0YXJ0T2ZXZWVrID0gZGF5anMoZGF0ZSkuc3RhcnRPZihcIndlZWtcIik7XG4gICAgY29uc3QgZW5kT2ZXZWVrID0gZGF5anMoZGF0ZSkuZW5kT2YoXCJ3ZWVrXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQ6IHN0YXJ0T2ZXZWVrLnRvRGF0ZSgpLFxuICAgICAgICBlbmQ6IGVuZE9mV2Vlay50b0RhdGUoKVxuICAgIH07XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0TW9udGhSYW5nZSA9IChkYXRlOiBEYXRlKTogeyBzdGFydDogRGF0ZTsgZW5kOiBEYXRlIH0gPT4ge1xuICAgIGNvbnN0IHN0YXJ0T2ZNb250aCA9IGRheWpzKGRhdGUpLnN0YXJ0T2YoXCJtb250aFwiKTtcbiAgICBjb25zdCBlbmRPZk1vbnRoID0gZGF5anMoZGF0ZSkuZW5kT2YoXCJtb250aFwiKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0OiBzdGFydE9mTW9udGgudG9EYXRlKCksXG4gICAgICAgIGVuZDogZW5kT2ZNb250aC50b0RhdGUoKVxuICAgIH07XG59O1xuXG5leHBvcnQgY29uc3Qgcm91bmRUb05lYXJlc3RNaW51dGVzID0gKGRhdGU6IERhdGUsIG1pbnV0ZXM6IG51bWJlcik6IERhdGUgPT4ge1xuICAgIGNvbnN0IGRheURhdGUgPSBkYXlqcyhkYXRlKTtcbiAgICBjb25zdCByb3VuZGVkTWludXRlcyA9IE1hdGgucm91bmQoZGF5RGF0ZS5taW51dGUoKSAvIG1pbnV0ZXMpICogbWludXRlcztcbiAgICByZXR1cm4gZGF5RGF0ZS5taW51dGUocm91bmRlZE1pbnV0ZXMpLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKS50b0RhdGUoKTtcbn07XG5cbi8vIFNoaWZ0LXNwZWNpZmljIGRhdGUgZnVuY3Rpb25zXG5leHBvcnQgY29uc3QgZ2V0U2hpZnRCb3VuZGFyeSA9IChkYXRlOiBEYXRlLCBzaGlmdFR5cGU6IHN0cmluZyk6IHsgc3RhcnQ6IERhdGU7IGVuZDogRGF0ZSB9ID0+IHtcbiAgICBjb25zdCBkYXkgPSBkYXlqcyhkYXRlKTtcblxuICAgIHN3aXRjaCAoc2hpZnRUeXBlKSB7XG4gICAgICAgIGNhc2UgXCJNXCI6IC8vIE1vcm5pbmcgKDA2OjAwLTE0OjAwKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDogZGF5LmhvdXIoNikubWludXRlKDApLnNlY29uZCgwKS50b0RhdGUoKSxcbiAgICAgICAgICAgICAgICBlbmQ6IGRheS5ob3VyKDE0KS5taW51dGUoMCkuc2Vjb25kKDApLnRvRGF0ZSgpXG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIFwiRVwiOiAvLyBFdmVuaW5nICgxNDowMC0yMjowMClcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IGRheS5ob3VyKDE0KS5taW51dGUoMCkuc2Vjb25kKDApLnRvRGF0ZSgpLFxuICAgICAgICAgICAgICAgIGVuZDogZGF5LmhvdXIoMjIpLm1pbnV0ZSgwKS5zZWNvbmQoMCkudG9EYXRlKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgXCJOXCI6IC8vIE5pZ2h0ICgyMjowMC0wNjowMCBuZXh0IGRheSlcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IGRheS5ob3VyKDIyKS5taW51dGUoMCkuc2Vjb25kKDApLnRvRGF0ZSgpLFxuICAgICAgICAgICAgICAgIGVuZDogZGF5LmFkZCgxLCBcImRheVwiKS5ob3VyKDYpLm1pbnV0ZSgwKS5zZWNvbmQoMCkudG9EYXRlKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIGRlZmF1bHQ6IC8vIERheSBzaGlmdCAoMDg6MDAtMTc6MDApXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBkYXkuaG91cig4KS5taW51dGUoMCkuc2Vjb25kKDApLnRvRGF0ZSgpLFxuICAgICAgICAgICAgICAgIGVuZDogZGF5LmhvdXIoMTcpLm1pbnV0ZSgwKS5zZWNvbmQoMCkudG9EYXRlKClcbiAgICAgICAgICAgIH07XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldDMwRGF5UmFuZ2UgPSAoc3RhcnREYXRlOiBEYXRlKTogeyBzdGFydDogRGF0ZTsgZW5kOiBEYXRlIH0gPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0OiBkYXlqcyhzdGFydERhdGUpLnN0YXJ0T2YoXCJkYXlcIikudG9EYXRlKCksXG4gICAgICAgIGVuZDogZGF5anMoc3RhcnREYXRlKS5hZGQoMjksIFwiZGF5c1wiKS5lbmRPZihcImRheVwiKS50b0RhdGUoKVxuICAgIH07XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RGF0ZVJhbmdlQXJyYXkgPSAoc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSk6IERhdGVbXSA9PiB7XG4gICAgY29uc3QgZGF0ZXM6IERhdGVbXSA9IFtdO1xuICAgIGxldCBjdXJyZW50ID0gZGF5anMoc3RhcnQpO1xuICAgIGNvbnN0IGVuZERheSA9IGRheWpzKGVuZCk7XG5cbiAgICB3aGlsZSAoY3VycmVudC5pc1NhbWVPckJlZm9yZShlbmREYXksIFwiZGF5XCIpKSB7XG4gICAgICAgIGRhdGVzLnB1c2goY3VycmVudC50b0RhdGUoKSk7XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LmFkZCgxLCBcImRheVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0ZXM7XG59O1xuXG5leHBvcnQgY29uc3QgZm9ybWF0U2hpZnREYXRlID0gKGRhdGU6IERhdGUpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBkYXlqcyhkYXRlKS5mb3JtYXQoXCJNTU0gRERcIik7XG59O1xuXG5leHBvcnQgY29uc3QgZm9ybWF0U2hpZnRXZWVrZGF5ID0gKGRhdGU6IERhdGUpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBkYXlqcyhkYXRlKS5mb3JtYXQoXCJkZGRcIik7XG59O1xuXG4vLyBMZWdhY3kgY29tcGF0aWJpbGl0eSBmdW5jdGlvbnMgKGtlZXBpbmcgc2FtZSBuYW1lcyBhcyBkYXRlLWZucyB2ZXJzaW9uKVxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlRGF0ZVJhbmdlID0gKHN0YXJ0RGF0ZTogRGF0ZSwgZGF5c0NvdW50OiBudW1iZXIpOiBEYXRlW10gPT4ge1xuICAgIGNvbnN0IGRhdGVzOiBEYXRlW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRheXNDb3VudDsgaSsrKSB7XG4gICAgICAgIGRhdGVzLnB1c2goYWRkRGF5cyhzdGFydERhdGUsIGkpKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGVzO1xufTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdERhdGVGb3JTaGlmdCA9IChkYXRlOiBEYXRlKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gZGF5anMoZGF0ZSkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1RvZGF5ID0gKGRhdGU6IERhdGUpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gaXNTYW1lRGF5KGRhdGUsIG5ldyBEYXRlKCkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzV2Vla2VuZCA9IChkYXRlOiBEYXRlKTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgZGF5ID0gZGF5anMoZGF0ZSkuZGF5KCk7XG4gICAgcmV0dXJuIGRheSA9PT0gMCB8fCBkYXkgPT09IDY7IC8vIFN1bmRheSA9IDAsIFNhdHVyZGF5ID0gNlxufTtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VSZWYsIHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUluVmlldyB9IGZyb20gXCJyZWFjdC1pbnRlcnNlY3Rpb24tb2JzZXJ2ZXJcIjtcblxuZXhwb3J0IGludGVyZmFjZSBVc2VTY3JvbGxOYXZpZ2F0aW9uUmV0dXJuIHtcbiAgICBoZWFkZXJTY3JvbGxSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudD47XG4gICAgY29udGVudFNjcm9sbFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50PjtcbiAgICBpc1Njcm9sbGluZzogUmVhY3QuTXV0YWJsZVJlZk9iamVjdDxib29sZWFuPjtcbiAgICBpbmZpbml0ZVNjcm9sbFJlZjogKG5vZGU/OiBFbGVtZW50IHwgbnVsbCkgPT4gdm9pZDtcbiAgICBpc0luZmluaXRlU2Nyb2xsVmlzaWJsZTogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBDdXN0b20gaG9vayBmb3IgbWFuYWdpbmcgc2Nyb2xsIHN5bmNocm9uaXphdGlvbiBhbmQgaW5maW5pdGUgbG9hZGluZ1xuICogRW5zdXJlcyB1bmlmaWVkIHNjcm9sbGluZyBleHBlcmllbmNlIGFuZCBoYW5kbGVzIGxhenkgbG9hZGluZyBvZiBhZGRpdGlvbmFsIHRpbWVsaW5lIGRhdGFcbiAqL1xuZXhwb3J0IGNvbnN0IHVzZVNjcm9sbE5hdmlnYXRpb24gPSAoKTogVXNlU2Nyb2xsTmF2aWdhdGlvblJldHVybiA9PiB7XG4gICAgLy8gUmVmcyBmb3Igc2Nyb2xsIHN5bmNocm9uaXphdGlvblxuICAgIGNvbnN0IGhlYWRlclNjcm9sbFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XG4gICAgY29uc3QgY29udGVudFNjcm9sbFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XG4gICAgY29uc3QgaXNTY3JvbGxpbmcgPSB1c2VSZWYoZmFsc2UpO1xuXG4gICAgLy8gSW5maW5pdGUgc2Nyb2xsIC8gbGF6eSBsb2FkaW5nIHdpdGggaW50ZXJzZWN0aW9uIG9ic2VydmVyXG4gICAgY29uc3QgeyByZWY6IGluZmluaXRlU2Nyb2xsUmVmLCBpblZpZXc6IGlzSW5maW5pdGVTY3JvbGxWaXNpYmxlIH0gPSB1c2VJblZpZXcoe1xuICAgICAgICByb290TWFyZ2luOiBcIjBweFwiLFxuICAgICAgICB0aHJlc2hvbGQ6IDFcbiAgICB9KTtcblxuICAgIC8vIFNjcm9sbCBzeW5jaHJvbml6YXRpb24gYmV0d2VlbiBoZWFkZXIgYW5kIGNvbnRlbnRcbiAgICBjb25zdCBzeW5jU2Nyb2xsID0gdXNlQ2FsbGJhY2soKHNvdXJjZTogSFRNTERpdkVsZW1lbnQsIHRhcmdldDogSFRNTERpdkVsZW1lbnQpID0+IHtcbiAgICAgICAgaWYgKGlzU2Nyb2xsaW5nLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpc1Njcm9sbGluZy5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgdGFyZ2V0LnNjcm9sbExlZnQgPSBzb3VyY2Uuc2Nyb2xsTGVmdDtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpc1Njcm9sbGluZy5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgIH0sIDEwKTtcbiAgICB9LCBbXSk7XG5cbiAgICAvLyBTZXQgdXAgc2Nyb2xsIGV2ZW50IGxpc3RlbmVycyBmb3Igc3luY2hyb25pemF0aW9uXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgaGVhZGVyRWwgPSBoZWFkZXJTY3JvbGxSZWYuY3VycmVudDtcbiAgICAgICAgY29uc3QgY29udGVudEVsID0gY29udGVudFNjcm9sbFJlZi5jdXJyZW50O1xuXG4gICAgICAgIGlmICghaGVhZGVyRWwgfHwgIWNvbnRlbnRFbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaGFuZGxlSGVhZGVyU2Nyb2xsID0gKCk6IHZvaWQgPT4gc3luY1Njcm9sbChoZWFkZXJFbCwgY29udGVudEVsKTtcbiAgICAgICAgY29uc3QgaGFuZGxlQ29udGVudFNjcm9sbCA9ICgpOiB2b2lkID0+IHN5bmNTY3JvbGwoY29udGVudEVsLCBoZWFkZXJFbCk7XG5cbiAgICAgICAgaGVhZGVyRWwuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVIZWFkZXJTY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgY29udGVudEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlQ29udGVudFNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBoZWFkZXJFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZUhlYWRlclNjcm9sbCk7XG4gICAgICAgICAgICBjb250ZW50RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVDb250ZW50U2Nyb2xsKTtcbiAgICAgICAgfTtcbiAgICB9LCBbc3luY1Njcm9sbF0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVhZGVyU2Nyb2xsUmVmLFxuICAgICAgICBjb250ZW50U2Nyb2xsUmVmLFxuICAgICAgICBpc1Njcm9sbGluZyxcbiAgICAgICAgaW5maW5pdGVTY3JvbGxSZWYsXG4gICAgICAgIGlzSW5maW5pdGVTY3JvbGxWaXNpYmxlXG4gICAgfTtcbn07XG4iLCJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgVmFsaWRhdGlvbkVycm9yIH0gZnJvbSBcIi4uL3R5cGVzL3NoaWZ0U2NoZWR1bGVyXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGluZ1N0YXRlc1Byb3BzIHtcbiAgICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gICAgc3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzO1xuICAgIHRhYkluZGV4PzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVycm9yU3RhdGVQcm9wcyBleHRlbmRzIExvYWRpbmdTdGF0ZXNQcm9wcyB7XG4gICAgZXJyb3I6IFZhbGlkYXRpb25FcnJvcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbXB0eVN0YXRlUHJvcHMgZXh0ZW5kcyBMb2FkaW5nU3RhdGVzUHJvcHMge1xuICAgIG1lc3NhZ2U/OiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogTG9hZGluZyBzcGlubmVyIGNvbXBvbmVudCBmb3IgZGF0YSBsb2FkaW5nIHN0YXRlc1xuICovXG5leHBvcnQgY29uc3QgTG9hZGluZ1N0YXRlOiBSZWFjdC5GQzxMb2FkaW5nU3RhdGVzUHJvcHM+ID0gKHsgY2xhc3NOYW1lID0gXCJcIiwgc3R5bGUsIHRhYkluZGV4IH0pID0+IChcbiAgICA8ZGl2IGNsYXNzTmFtZT17YHNoaWZ0LXNjaGVkdWxlciAke2NsYXNzTmFtZX1gfSBzdHlsZT17c3R5bGV9IHRhYkluZGV4PXt0YWJJbmRleH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2hpZnQtc2NoZWR1bGVyLWxvYWRpbmdcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9hZGluZy1zcGlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgICA8cD5Mb2FkaW5nIHNjaGVkdWxlIGRhdGEuLi48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuKTtcblxuLyoqXG4gKiBFcnJvciBzdGF0ZSBjb21wb25lbnQgd2l0aCBkZXRhaWxlZCBlcnJvciBpbmZvcm1hdGlvblxuICovXG5leHBvcnQgY29uc3QgRXJyb3JTdGF0ZTogUmVhY3QuRkM8RXJyb3JTdGF0ZVByb3BzPiA9ICh7IGVycm9yLCBjbGFzc05hbWUgPSBcIlwiLCBzdHlsZSwgdGFiSW5kZXggfSkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtgc2hpZnQtc2NoZWR1bGVyICR7Y2xhc3NOYW1lfWB9IHN0eWxlPXtzdHlsZX0gdGFiSW5kZXg9e3RhYkluZGV4fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaGlmdC1zY2hlZHVsZXItZXJyb3JcIj5cbiAgICAgICAgICAgIDxoMz7imqDvuI8gQ29uZmlndXJhdGlvbiBFcnJvcjwvaDM+XG4gICAgICAgICAgICA8cD57ZXJyb3IubWVzc2FnZX08L3A+XG4gICAgICAgICAgICB7ZXJyb3IucHJvcGVydHkgJiYgKFxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICA8c21hbGw+Q2hlY2sgdGhlIHtlcnJvci5wcm9wZXJ0eX0gcHJvcGVydHkgaW4gdGhlIHdpZGdldCBjb25maWd1cmF0aW9uLjwvc21hbGw+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxkZXRhaWxzIGNsYXNzTmFtZT1cImVycm9yLWRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICA8c3VtbWFyeT5UZWNobmljYWwgRGV0YWlsczwvc3VtbWFyeT5cbiAgICAgICAgICAgICAgICA8cHJlPntKU09OLnN0cmluZ2lmeShlcnJvciwgbnVsbCwgMil9PC9wcmU+XG4gICAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuKTtcblxuLyoqXG4gKiBFbXB0eSBzdGF0ZSBjb21wb25lbnQgd2hlbiBubyBkYXRhIGlzIGF2YWlsYWJsZVxuICovXG5leHBvcnQgY29uc3QgRW1wdHlTdGF0ZTogUmVhY3QuRkM8RW1wdHlTdGF0ZVByb3BzPiA9ICh7XG4gICAgbWVzc2FnZSA9IFwiTm8gRGF0YSBBdmFpbGFibGVcIixcbiAgICBkZXNjcmlwdGlvbiA9IFwiTm8gZW5naW5lZXJzIGZvdW5kLiBQbGVhc2UgY2hlY2sgeW91ciBkYXRhIHNvdXJjZSBjb25maWd1cmF0aW9uLlwiLFxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXG4gICAgc3R5bGUsXG4gICAgdGFiSW5kZXhcbn0pID0+IChcbiAgICA8ZGl2IGNsYXNzTmFtZT17YHNoaWZ0LXNjaGVkdWxlciAke2NsYXNzTmFtZX1gfSBzdHlsZT17c3R5bGV9IHRhYkluZGV4PXt0YWJJbmRleH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2hpZnQtc2NoZWR1bGVyLWVtcHR5XCI+XG4gICAgICAgICAgICA8aDM+8J+ThSB7bWVzc2FnZX08L2gzPlxuICAgICAgICAgICAgPHA+e2Rlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4pO1xuXG4vKipcbiAqIEZhbGxiYWNrIGVycm9yIGJvdW5kYXJ5IGNvbXBvbmVudCBmb3IgdW5leHBlY3RlZCBlcnJvcnNcbiAqL1xuaW50ZXJmYWNlIEVycm9yQm91bmRhcnlTdGF0ZSB7XG4gICAgaGFzRXJyb3I6IGJvb2xlYW47XG4gICAgZXJyb3I/OiBFcnJvcjtcbiAgICBlcnJvckluZm8/OiBSZWFjdC5FcnJvckluZm87XG59XG5cbmV4cG9ydCBjbGFzcyBTY2hlZHVsZXJFcnJvckJvdW5kYXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFxuICAgIFJlYWN0LlByb3BzV2l0aENoaWxkcmVuPExvYWRpbmdTdGF0ZXNQcm9wcz4sXG4gICAgRXJyb3JCb3VuZGFyeVN0YXRlXG4+IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogUmVhY3QuUHJvcHNXaXRoQ2hpbGRyZW48TG9hZGluZ1N0YXRlc1Byb3BzPikge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IGhhc0Vycm9yOiBmYWxzZSB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZENhdGNoKGVycm9yOiBFcnJvciwgZXJyb3JJbmZvOiBSZWFjdC5FcnJvckluZm8pOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlNoaWZ0IFNjaGVkdWxlciBFcnJvciBCb3VuZGFyeSBjYXVnaHQgYW4gZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIEluZm86XCIsIGVycm9ySW5mbyk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBoYXNFcnJvcjogdHJ1ZSxcbiAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgZXJyb3JJbmZvXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpOiBSZWFjdC5SZWFjdE5vZGUge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5oYXNFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHNoaWZ0LXNjaGVkdWxlciAke3RoaXMucHJvcHMuY2xhc3NOYW1lIHx8IFwiXCJ9YH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0aGlzLnByb3BzLnRhYkluZGV4fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaGlmdC1zY2hlZHVsZXItZXJyb3ItYm91bmRhcnlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMz7wn5ug77iPIFNvbWV0aGluZyB3ZW50IHdyb25nPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPlRoZSBTaGlmdCBTY2hlZHVsZXIgZW5jb3VudGVyZWQgYW4gdW5leHBlY3RlZCBlcnJvci48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGV0YWlscyBjbGFzc05hbWU9XCJlcnJvci1ib3VuZGFyeS1kZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN1bW1hcnk+RXJyb3IgRGV0YWlsczwvc3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQ+RXJyb3I6PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cHJlPnt0aGlzLnN0YXRlLmVycm9yPy50b1N0cmluZygpfTwvcHJlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVycm9ySW5mbyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQ+Q29tcG9uZW50IFN0YWNrOjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cHJlPnt0aGlzLnN0YXRlLmVycm9ySW5mby5jb21wb25lbnRTdGFja308L3ByZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgaGFzRXJyb3I6IGZhbHNlLCBlcnJvcjogdW5kZWZpbmVkLCBlcnJvckluZm86IHVuZGVmaW5lZCB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJlcnJvci1ib3VuZGFyeS1yZXRyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVHJ5IEFnYWluXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG4gICAgfVxuXG4gICAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21FcnJvcihlcnJvcjogRXJyb3IpOiBFcnJvckJvdW5kYXJ5U3RhdGUge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGFzRXJyb3I6IHRydWUsXG4gICAgICAgICAgICBlcnJvclxuICAgICAgICB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBIaWdoZXItb3JkZXIgY29tcG9uZW50IHRvIHdyYXAgYW55IGNvbXBvbmVudCB3aXRoIGVycm9yIGJvdW5kYXJ5XG4gKi9cbmV4cG9ydCBjb25zdCB3aXRoRXJyb3JCb3VuZGFyeSA9IDxQIGV4dGVuZHMgb2JqZWN0PihcbiAgICBDb21wb25lbnQ6IFJlYWN0LkNvbXBvbmVudFR5cGU8UD5cbik6IFJlYWN0LkZDPFAgJiBMb2FkaW5nU3RhdGVzUHJvcHM+ID0+IHtcbiAgICBjb25zdCBXcmFwcGVkQ29tcG9uZW50OiBSZWFjdC5GQzxQICYgTG9hZGluZ1N0YXRlc1Byb3BzPiA9IHByb3BzID0+IChcbiAgICAgICAgPFNjaGVkdWxlckVycm9yQm91bmRhcnkgY2xhc3NOYW1lPXtwcm9wcy5jbGFzc05hbWV9IHN0eWxlPXtwcm9wcy5zdHlsZX0gdGFiSW5kZXg9e3Byb3BzLnRhYkluZGV4fT5cbiAgICAgICAgICAgIDxDb21wb25lbnQgey4uLnByb3BzfSAvPlxuICAgICAgICA8L1NjaGVkdWxlckVycm9yQm91bmRhcnk+XG4gICAgKTtcblxuICAgIFdyYXBwZWRDb21wb25lbnQuZGlzcGxheU5hbWUgPSBgd2l0aEVycm9yQm91bmRhcnkoJHtDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50Lm5hbWV9KWA7XG4gICAgcmV0dXJuIFdyYXBwZWRDb21wb25lbnQ7XG59O1xuIiwiaW1wb3J0IHsgU2hpZnRBc3NpZ25tZW50IH0gZnJvbSBcIi4uL3R5cGVzL3NoaWZ0U2NoZWR1bGVyXCI7XG5cbi8vIFNoaWZ0IGNvbG9yIG1hcHBpbmdzXG5leHBvcnQgY29uc3QgU0hJRlRfQ09MT1JTID0ge1xuICAgIE06IFwiIzIxOTZGM1wiLCAvLyBNb3JuaW5nIC0gQmx1ZVxuICAgIEU6IFwiIzRDQUY1MFwiLCAvLyBFdmVuaW5nIC0gR3JlZW5cbiAgICBOOiBcIiNGRjk4MDBcIiwgLy8gTmlnaHQgLSBPcmFuZ2VcbiAgICBEOiBcIiNGNDQzMzZcIiwgLy8gRGF5IG9mZiAtIFJlZFxuICAgIEg6IFwiIzlFOUU5RVwiLCAvLyBIb2xpZGF5IC0gR3JheVxuICAgIFQ6IFwiI0ZGRUIzQlwiIC8vIFRyYWluaW5nIC0gWWVsbG93XG59IGFzIGNvbnN0O1xuXG4vLyBSb2xlIGluZGljYXRvcnNcbmV4cG9ydCBjb25zdCBST0xFX1NUWUxFUyA9IHtcbiAgICBUTDogXCJzb2xpZFwiLCAvLyBUZWFtIExlYWRlciAtIHNvbGlkIGJvcmRlclxuICAgIEJUTDogXCJkYXNoZWRcIiwgLy8gQmFja3VwIFRlYW0gTGVhZGVyIC0gZGFzaGVkIGJvcmRlclxuICAgIFNQRTogXCJkb3R0ZWRcIiwgLy8gU3BlY2lhbGlzdCAtIGRvdHRlZCBib3JkZXJcbiAgICBPU0k6IFwiZG91YmxlXCIgLy8gT3RoZXIgLSBkb3VibGUgYm9yZGVyXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBTaGlmdFR5cGUgPSBrZXlvZiB0eXBlb2YgU0hJRlRfQ09MT1JTO1xuZXhwb3J0IHR5cGUgUm9sZVR5cGUgPSBrZXlvZiB0eXBlb2YgUk9MRV9TVFlMRVM7XG5cbi8qKlxuICogR2V0IHRoZSBjb2xvciBmb3IgYSBzaGlmdCB0eXBlXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRTaGlmdENvbG9yID0gKHNoaWZ0VHlwZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gU0hJRlRfQ09MT1JTW3NoaWZ0VHlwZSBhcyBTaGlmdFR5cGVdIHx8IFwiIzYwN0Q4QlwiOyAvLyBEZWZhdWx0IGdyYXktYmx1ZVxufTtcblxuLyoqXG4gKiBHZXQgdGhlIGJvcmRlciBzdHlsZSBmb3IgYSByb2xlXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRSb2xlQm9yZGVyU3R5bGUgPSAocm9sZT86IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgaWYgKCFyb2xlKSB7XG4gICAgICAgIHJldHVybiBcInNvbGlkXCI7XG4gICAgfVxuICAgIHJldHVybiBST0xFX1NUWUxFU1tyb2xlIGFzIFJvbGVUeXBlXSB8fCBcInNvbGlkXCI7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGEgc2hpZnQgaXMgYSB3b3JraW5nIHNoaWZ0IChub3QgZGF5IG9mZiBvciBob2xpZGF5KVxuICovXG5leHBvcnQgY29uc3QgaXNXb3JraW5nU2hpZnQgPSAoc2hpZnRUeXBlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gIVtcIkRcIiwgXCJIXCJdLmluY2x1ZGVzKHNoaWZ0VHlwZSk7XG59O1xuXG4vKipcbiAqIEdldCBzaGlmdCBkaXNwbGF5IG5hbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGdldFNoaWZ0RGlzcGxheU5hbWUgPSAoc2hpZnRUeXBlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IG5hbWVzID0ge1xuICAgICAgICBNOiBcIk1vcm5pbmdcIixcbiAgICAgICAgRTogXCJFdmVuaW5nXCIsXG4gICAgICAgIE46IFwiTmlnaHRcIixcbiAgICAgICAgRDogXCJEYXkgT2ZmXCIsXG4gICAgICAgIEg6IFwiSG9saWRheVwiLFxuICAgICAgICBUOiBcIlRyYWluaW5nXCJcbiAgICB9O1xuICAgIHJldHVybiBuYW1lc1tzaGlmdFR5cGUgYXMgU2hpZnRUeXBlXSB8fCBzaGlmdFR5cGU7XG59O1xuXG4vKipcbiAqIEdldCBzaG9ydCBkaXNwbGF5IHRleHQgZm9yIGEgc2hpZnQgKHVzZWQgaW4gZGF5IGNlbGxzKVxuICovXG5leHBvcnQgY29uc3QgZ2V0U2hpZnREaXNwbGF5VGV4dCA9IChzaGlmdFR5cGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIHNoaWZ0VHlwZSB8fCBcIj9cIjtcbn07XG5cbi8qKlxuICogVmFsaWRhdGUgc2hpZnQgYXNzaWdubWVudCBydWxlc1xuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGVTaGlmdEFzc2lnbm1lbnQgPSAoXG4gICAgYXNzaWdubWVudDogUGFydGlhbDxTaGlmdEFzc2lnbm1lbnQ+LFxuICAgIGV4aXN0aW5nU2hpZnRzOiBTaGlmdEFzc2lnbm1lbnRbXVxuKTogeyBpc1ZhbGlkOiBib29sZWFuOyBlcnJvcnM6IHN0cmluZ1tdIH0gPT4ge1xuICAgIGNvbnN0IGVycm9yczogc3RyaW5nW10gPSBbXTtcblxuICAgIC8vIENoZWNrIGZvciBvdmVybGFwcGluZyBzaGlmdHMgb24gc2FtZSBkYXRlXG4gICAgY29uc3Qgc2FtZURhdGUgPSBleGlzdGluZ1NoaWZ0cy5maWx0ZXIoXG4gICAgICAgIHMgPT4gcy5kYXRlID09PSBhc3NpZ25tZW50LmRhdGUgJiYgcy5lbmdpbmVlcklkID09PSBhc3NpZ25tZW50LmVuZ2luZWVySWQgJiYgcy5pZCAhPT0gYXNzaWdubWVudC5pZFxuICAgICk7XG5cbiAgICBpZiAoc2FtZURhdGUubGVuZ3RoID4gMCkge1xuICAgICAgICBlcnJvcnMucHVzaChcIkVuZ2luZWVyIGFscmVhZHkgaGFzIGEgc2hpZnQgYXNzaWduZWQgZm9yIHRoaXMgZGF0ZVwiKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBuaWdodCBzaGlmdCBmb2xsb3dlZCBieSBtb3JuaW5nIHNoaWZ0IChpbnN1ZmZpY2llbnQgcmVzdClcbiAgICBpZiAoYXNzaWdubWVudC5zaGlmdCA9PT0gXCJNXCIpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNEYXkgPSBuZXcgRGF0ZShhc3NpZ25tZW50LmRhdGUhKTtcbiAgICAgICAgcHJldmlvdXNEYXkuc2V0RGF0ZShwcmV2aW91c0RheS5nZXREYXRlKCkgLSAxKTtcbiAgICAgICAgY29uc3QgcHJldkRheVN0cmluZyA9IHByZXZpb3VzRGF5LnRvSVNPU3RyaW5nKCkuc3BsaXQoXCJUXCIpWzBdO1xuXG4gICAgICAgIGNvbnN0IHByZXZOaWdodFNoaWZ0ID0gZXhpc3RpbmdTaGlmdHMuZmluZChcbiAgICAgICAgICAgIHMgPT4gcy5kYXRlID09PSBwcmV2RGF5U3RyaW5nICYmIHMuZW5naW5lZXJJZCA9PT0gYXNzaWdubWVudC5lbmdpbmVlcklkICYmIHMuc2hpZnQgPT09IFwiTlwiXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHByZXZOaWdodFNoaWZ0KSB7XG4gICAgICAgICAgICBlcnJvcnMucHVzaChcIkluc3VmZmljaWVudCByZXN0OiBOaWdodCBzaGlmdCBmb2xsb3dlZCBieSBNb3JuaW5nIHNoaWZ0XCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaXNWYWxpZDogZXJyb3JzLmxlbmd0aCA9PT0gMCxcbiAgICAgICAgZXJyb3JzXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IHNoaWZ0IHN0YXRpc3RpY3MgZm9yIGFuIGVuZ2luZWVyIG92ZXIgYSBkYXRlIHJhbmdlXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRTaGlmdFN0YXRzID0gKFxuICAgIGVuZ2luZWVySWQ6IHN0cmluZyxcbiAgICBzaGlmdHM6IFNoaWZ0QXNzaWdubWVudFtdLFxuICAgIHN0YXJ0RGF0ZTogc3RyaW5nLFxuICAgIGVuZERhdGU6IHN0cmluZ1xuKToge1xuICAgIHRvdGFsOiBudW1iZXI7XG4gICAgbW9ybmluZzogbnVtYmVyO1xuICAgIGV2ZW5pbmc6IG51bWJlcjtcbiAgICBuaWdodDogbnVtYmVyO1xuICAgIGRheU9mZjogbnVtYmVyO1xuICAgIGhvbGlkYXk6IG51bWJlcjtcbiAgICB0cmFpbmluZzogbnVtYmVyO1xufSA9PiB7XG4gICAgY29uc3QgZW5naW5lZXJTaGlmdHMgPSBzaGlmdHMuZmlsdGVyKHMgPT4gcy5lbmdpbmVlcklkID09PSBlbmdpbmVlcklkICYmIHMuZGF0ZSA+PSBzdGFydERhdGUgJiYgcy5kYXRlIDw9IGVuZERhdGUpO1xuXG4gICAgY29uc3Qgc3RhdHMgPSB7XG4gICAgICAgIHRvdGFsOiBlbmdpbmVlclNoaWZ0cy5sZW5ndGgsXG4gICAgICAgIG1vcm5pbmc6IDAsXG4gICAgICAgIGV2ZW5pbmc6IDAsXG4gICAgICAgIG5pZ2h0OiAwLFxuICAgICAgICBkYXlPZmY6IDAsXG4gICAgICAgIGhvbGlkYXk6IDAsXG4gICAgICAgIHRyYWluaW5nOiAwXG4gICAgfTtcblxuICAgIGVuZ2luZWVyU2hpZnRzLmZvckVhY2goc2hpZnQgPT4ge1xuICAgICAgICBzd2l0Y2ggKHNoaWZ0LnNoaWZ0KSB7XG4gICAgICAgICAgICBjYXNlIFwiTVwiOlxuICAgICAgICAgICAgICAgIHN0YXRzLm1vcm5pbmcrKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJFXCI6XG4gICAgICAgICAgICAgICAgc3RhdHMuZXZlbmluZysrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk5cIjpcbiAgICAgICAgICAgICAgICBzdGF0cy5uaWdodCsrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkRcIjpcbiAgICAgICAgICAgICAgICBzdGF0cy5kYXlPZmYrKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJIXCI6XG4gICAgICAgICAgICAgICAgc3RhdHMuaG9saWRheSsrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIlRcIjpcbiAgICAgICAgICAgICAgICBzdGF0cy50cmFpbmluZysrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3RhdHM7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIENTUyBjbGFzcyBuYW1lcyBmb3IgYSBzaGlmdCBjZWxsXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRTaGlmdENTU0NsYXNzZXMgPSAoc2hpZnQ/OiBTaGlmdEFzc2lnbm1lbnQpOiBzdHJpbmcgPT4ge1xuICAgIGlmICghc2hpZnQpIHtcbiAgICAgICAgcmV0dXJuIFwiZGF5LWNlbGwgZW1wdHlcIjtcbiAgICB9XG5cbiAgICBjb25zdCBjbGFzc2VzID0gW1wiZGF5LWNlbGxcIiwgXCJoYXMtc2hpZnRcIl07XG5cbiAgICAvLyBBZGQgc2hpZnQgdHlwZSBjbGFzc1xuICAgIGNsYXNzZXMucHVzaChgc2hpZnQtJHtzaGlmdC5zaGlmdD8udG9Mb3dlckNhc2UoKSB8fCBcInVua25vd25cIn1gKTtcblxuICAgIC8vIEFkZCBzdGF0dXMgY2xhc3NcbiAgICBpZiAoc2hpZnQuc3RhdHVzKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChgc3RhdHVzLSR7c2hpZnQuc3RhdHVzLnRvTG93ZXJDYXNlKCl9YCk7XG4gICAgfVxuXG4gICAgLy8gQWRkIGV2ZW50IHR5cGUgY2xhc3NcbiAgICBpZiAoc2hpZnQuZXZlbnRUeXBlKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChgZXZlbnQtJHtzaGlmdC5ldmVudFR5cGUudG9Mb3dlckNhc2UoKX1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xhc3Nlcy5qb2luKFwiIFwiKTtcbn07XG4iLCJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlRWxlbWVudCwgTW91c2VFdmVudCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgRGF5Q2VsbFByb3BzIH0gZnJvbSBcIi4uL3R5cGVzL3NoaWZ0U2NoZWR1bGVyXCI7XG5pbXBvcnQgeyBnZXRTaGlmdENvbG9yLCBnZXRTaGlmdERpc3BsYXlUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL3NoaWZ0SGVscGVyc1wiO1xuXG5jb25zdCBEYXlDZWxsOiBSZWFjdC5GQzxEYXlDZWxsUHJvcHM+ID0gKHtcbiAgICBkYXRlLFxuICAgIGVuZ2luZWVyLFxuICAgIHNoaWZ0LFxuICAgIGlzVG9kYXkgPSBmYWxzZSxcbiAgICBpc1dlZWtlbmQgPSBmYWxzZSxcbiAgICBpc1NlbGVjdGVkID0gZmFsc2UsXG4gICAgc2hpZnRzTG9hZGluZyA9IGZhbHNlLFxuICAgIG9uRG91YmxlQ2xpY2ssXG4gICAgb25DZWxsQ2xpY2ssXG4gICAgb25Db250ZXh0TWVudSxcbiAgICByZWFkT25seSA9IGZhbHNlXG59KSA9PiB7XG4gICAgLy8gTWVtb2l6ZSBjZWxsIHN0eWxpbmcgYW5kIGNvbnRlbnQgZm9yIHBlcmZvcm1hbmNlXG4gICAgY29uc3QgY2VsbERhdGEgPSB1c2VNZW1vKCgpID0+IHtcbiAgICAgICAgY29uc3QgZGF5TnVtYmVyID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgICAgIGNvbnN0IHNoaWZ0Q29sb3IgPSBzaGlmdCA/IGdldFNoaWZ0Q29sb3Ioc2hpZnQuc2hpZnQpIDogbnVsbDtcbiAgICAgICAgY29uc3Qgc2hpZnRUZXh0ID0gc2hpZnQgPyBnZXRTaGlmdERpc3BsYXlUZXh0KHNoaWZ0LnNoaWZ0KSA6IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRheU51bWJlcixcbiAgICAgICAgICAgIHNoaWZ0Q29sb3IsXG4gICAgICAgICAgICBzaGlmdFRleHQsXG4gICAgICAgICAgICBoYXNTaGlmdDogISFzaGlmdCxcbiAgICAgICAgICAgIGlzRXJyb3I6IHNoaWZ0Py5zdGF0dXMgPT09IFwiZXJyb3JcIlxuICAgICAgICB9O1xuICAgIH0sIFtkYXRlLCBzaGlmdF0pO1xuXG4gICAgY29uc3QgaGFuZGxlQ29udGV4dCA9IChlOiBNb3VzZUV2ZW50PEhUTUxEaXZFbGVtZW50Pik6IHZvaWQgPT4ge1xuICAgICAgICBpZiAocmVhZE9ubHkgfHwgIW9uQ29udGV4dE1lbnUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gZGF0ZS50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKVswXTtcbiAgICAgICAgb25Db250ZXh0TWVudShlLCBlbmdpbmVlciwgZGF0ZVN0cmluZywgc2hpZnQpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVEb3VibGVDbGljayA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKHJlYWRPbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG9uRG91YmxlQ2xpY2soKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGluIERheUNlbGwgb25Eb3VibGVDbGljayBmb3IgJHtlbmdpbmVlci5uYW1lfSBvbiAke2RhdGUudG9EYXRlU3RyaW5nKCl9OmAsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVDbGljayA9IChlOiBNb3VzZUV2ZW50PEhUTUxEaXZFbGVtZW50Pik6IHZvaWQgPT4ge1xuICAgICAgICAvLyBQcmV2ZW50IHRleHQgc2VsZWN0aW9uIHdoZW4gdXNpbmcgU2hpZnQrY2xpY2sgZm9yIHJhbmdlIHNlbGVjdGlvblxuICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG9uQ2VsbENsaWNrKGUpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgaW4gRGF5Q2VsbCBvbkNsaWNrIGZvciAke2VuZ2luZWVyLm5hbWV9IG9uICR7ZGF0ZS50b0RhdGVTdHJpbmcoKX06YCwgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlRG93biA9IChlOiBNb3VzZUV2ZW50PEhUTUxEaXZFbGVtZW50Pik6IHZvaWQgPT4ge1xuICAgICAgICAvLyBQcmV2ZW50IHRleHQgc2VsZWN0aW9uIG9uIG1vdXNlZG93biBmb3IgYWxsIG1vZGlmaWVyIGtleSBjb21iaW5hdGlvbnNcbiAgICAgICAgaWYgKGUuc2hpZnRLZXkgfHwgZS5jdHJsS2V5IHx8IGUubWV0YUtleSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIEJ1aWxkIENTUyBjbGFzc2VzXG4gICAgY29uc3QgY2VsbENsYXNzZXMgPSBbXG4gICAgICAgIFwiZGF5LWNlbGxcIixcbiAgICAgICAgaXNUb2RheSAmJiBcImRheS1jZWxsLXRvZGF5XCIsXG4gICAgICAgIGlzV2Vla2VuZCAmJiBcImRheS1jZWxsLXdlZWtlbmRcIixcbiAgICAgICAgaXNTZWxlY3RlZCAmJiBcImRheS1jZWxsLXNlbGVjdGVkXCIsXG4gICAgICAgIGNlbGxEYXRhLmhhc1NoaWZ0ICYmIFwiZGF5LWNlbGwtaGFzLXNoaWZ0XCIsXG4gICAgICAgIGNlbGxEYXRhLmlzRXJyb3IgJiYgXCJkYXktY2VsbC1lcnJvclwiLFxuICAgICAgICByZWFkT25seSAmJiBcImRheS1jZWxsLXJlYWRvbmx5XCJcbiAgICBdXG4gICAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgICAgLmpvaW4oXCIgXCIpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjZWxsQ2xhc3Nlc31cbiAgICAgICAgICAgIG9uRG91YmxlQ2xpY2s9e2hhbmRsZURvdWJsZUNsaWNrfVxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ2xpY2t9XG4gICAgICAgICAgICBvbk1vdXNlRG93bj17aGFuZGxlTW91c2VEb3dufVxuICAgICAgICAgICAgb25Db250ZXh0TWVudT17aGFuZGxlQ29udGV4dH1cbiAgICAgICAgICAgIHRpdGxlPXtgJHtlbmdpbmVlci5uYW1lfSAtICR7ZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoKX0ke1xuICAgICAgICAgICAgICAgIHNoaWZ0ID8gYCAoJHtzaGlmdC5zaGlmdH0ke3NoaWZ0LnN0YXR1cyA/IGAgLSAke3NoaWZ0LnN0YXR1c31gIDogXCJcIn0pYCA6IFwiIC0gTm8gc2hpZnRcIlxuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogY2VsbERhdGEuc2hpZnRDb2xvciB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgY3Vyc29yOiByZWFkT25seSA/IFwiZGVmYXVsdFwiIDogXCJwb2ludGVyXCJcbiAgICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGF5LW51bWJlclwiPntjZWxsRGF0YS5kYXlOdW1iZXJ9PC9kaXY+XG4gICAgICAgICAgICB7Y2VsbERhdGEuaGFzU2hpZnQgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaGlmdC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNoaWZ0LXRleHRcIj57Y2VsbERhdGEuc2hpZnRUZXh0fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAge3NoaWZ0Py5zdGF0dXMgPT09IFwiZXJyb3JcIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzaGlmdC1lcnJvci1pbmRpY2F0b3JcIiB0aXRsZT1cIkVycm9yIGxvYWRpbmcgc2hpZnQgZGF0YVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKaoO+4j1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSA6IHNoaWZ0c0xvYWRpbmcgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXktY2VsbC1sb2FkaW5nXCIgdGl0bGU9XCJMb2FkaW5nIHNoaWZ0cy4uLlwiPlxuICAgICAgICAgICAgICAgICAgICAuLi5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXktY2VsbC1lbXB0eVwiIHRpdGxlPVwiTm8gc2hpZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgLVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERheUNlbGw7XG4iLCJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlRWxlbWVudCwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEVuZ2luZWVyLCBTaGlmdEFzc2lnbm1lbnQgfSBmcm9tIFwiLi4vdHlwZXMvc2hpZnRTY2hlZHVsZXJcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDb250ZXh0TWVudU9wdGlvbiB7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICBpY29uPzogc3RyaW5nO1xuICAgIGFjdGlvbjogKCkgPT4gdm9pZDtcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XG4gICAgc2VwYXJhdG9yPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb250ZXh0TWVudVByb3BzIHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIG9wdGlvbnM6IENvbnRleHRNZW51T3B0aW9uW107XG4gICAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgICB2aXNpYmxlOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgQ29udGV4dE1lbnU6IFJlYWN0LkZDPENvbnRleHRNZW51UHJvcHM+ID0gKHsgeCwgeSwgb3B0aW9ucywgb25DbG9zZSwgdmlzaWJsZSB9KSA9PiB7XG4gICAgY29uc3QgbWVudVJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBoYW5kbGVDbGlja091dHNpZGUgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcbiAgICAgICAgICAgIGlmIChtZW51UmVmLmN1cnJlbnQgJiYgIW1lbnVSZWYuY3VycmVudC5jb250YWlucyhldmVudC50YXJnZXQgYXMgTm9kZSkpIHtcbiAgICAgICAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgaGFuZGxlRXNjYXBlID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh2aXNpYmxlKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZUNsaWNrT3V0c2lkZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVFc2NhcGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlQ2xpY2tPdXRzaWRlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUVzY2FwZSk7XG4gICAgICAgIH07XG4gICAgfSwgW3Zpc2libGUsIG9uQ2xvc2VdKTtcblxuICAgIGlmICghdmlzaWJsZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICByZWY9e21lbnVSZWZ9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJjb250ZXh0LW1lbnVcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgICAgICAgICAgICAgIGxlZnQ6IHgsXG4gICAgICAgICAgICAgICAgdG9wOiB5LFxuICAgICAgICAgICAgICAgIHpJbmRleDogMTAwMFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e2UgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX1cbiAgICAgICAgPlxuICAgICAgICAgICAge29wdGlvbnMubWFwKChvcHRpb24sIGluZGV4KSA9PlxuICAgICAgICAgICAgICAgIG9wdGlvbi5zZXBhcmF0b3IgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpbmRleH0gY2xhc3NOYW1lPVwiY29udGV4dC1tZW51LXNlcGFyYXRvclwiIC8+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGNvbnRleHQtbWVudS1pdGVtICR7b3B0aW9uLmRpc2FibGVkID8gXCJkaXNhYmxlZFwiIDogXCJcIn1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi5hY3Rpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtvcHRpb24uaWNvbiAmJiA8c3BhbiBjbGFzc05hbWU9XCJjb250ZXh0LW1lbnUtaWNvblwiPntvcHRpb24uaWNvbn08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY29udGV4dC1tZW51LWxhYmVsXCI+e29wdGlvbi5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuXG4vLyBDb250ZXh0IG1lbnUgZmFjdG9yeSBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBjcmVhdGVFbXB0eUNlbGxNZW51ID0gKFxuICAgIGVuZ2luZWVyOiBFbmdpbmVlcixcbiAgICBkYXRlOiBzdHJpbmcsXG4gICAgb25DcmVhdGVTaGlmdDogKGVuZ2luZWVySWQ6IHN0cmluZywgZGF0ZTogc3RyaW5nKSA9PiB2b2lkXG4pOiBDb250ZXh0TWVudU9wdGlvbltdID0+IFtcbiAgICB7XG4gICAgICAgIGxhYmVsOiBgQ3JlYXRlIHNoaWZ0IGZvciAke2VuZ2luZWVyLm5hbWV9YCxcbiAgICAgICAgaWNvbjogXCLinpVcIixcbiAgICAgICAgYWN0aW9uOiAoKSA9PiBvbkNyZWF0ZVNoaWZ0KGVuZ2luZWVyLmlkLCBkYXRlKVxuICAgIH1cbl07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVFeGlzdGluZ1NoaWZ0TWVudSA9IChcbiAgICBzaGlmdDogU2hpZnRBc3NpZ25tZW50LFxuICAgIGVuZ2luZWVyOiBFbmdpbmVlcixcbiAgICBvbkVkaXRTaGlmdDogKHNoaWZ0OiBTaGlmdEFzc2lnbm1lbnQpID0+IHZvaWQsXG4gICAgb25EZWxldGVTaGlmdDogKHNoaWZ0OiBTaGlmdEFzc2lnbm1lbnQpID0+IHZvaWRcbik6IENvbnRleHRNZW51T3B0aW9uW10gPT4gW1xuICAgIHtcbiAgICAgICAgbGFiZWw6IGAke2VuZ2luZWVyLm5hbWV9IC0gJHtzaGlmdC5kYXRlfWAsXG4gICAgICAgIGljb246IFwi8J+ThVwiLFxuICAgICAgICBhY3Rpb246ICgpID0+IHt9LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvblxuICAgICAgICBkaXNhYmxlZDogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgICBsYWJlbDogYCR7c2hpZnQuc2hpZnR9IFNoaWZ0YCxcbiAgICAgICAgaWNvbjogZ2V0U2hpZnRJY29uKHNoaWZ0LnNoaWZ0KSxcbiAgICAgICAgYWN0aW9uOiAoKSA9PiB7fSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb25cbiAgICAgICAgZGlzYWJsZWQ6IHRydWVcbiAgICB9LFxuICAgIHsgc2VwYXJhdG9yOiB0cnVlIH0gYXMgQ29udGV4dE1lbnVPcHRpb24sXG4gICAge1xuICAgICAgICBsYWJlbDogXCJFZGl0IFNoaWZ0XCIsXG4gICAgICAgIGljb246IFwi4pyP77iPXCIsXG4gICAgICAgIGFjdGlvbjogKCkgPT4gb25FZGl0U2hpZnQoc2hpZnQpXG4gICAgfSxcbiAgICB7IHNlcGFyYXRvcjogdHJ1ZSB9IGFzIENvbnRleHRNZW51T3B0aW9uLFxuICAgIHtcbiAgICAgICAgbGFiZWw6IFwiRGVsZXRlIFNoaWZ0XCIsXG4gICAgICAgIGljb246IFwi8J+Xke+4j1wiLFxuICAgICAgICBhY3Rpb246ICgpID0+IG9uRGVsZXRlU2hpZnQoc2hpZnQpXG4gICAgfVxuXTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU11bHRpU2VsZWN0TWVudSA9IChcbiAgICBzZWxlY3RlZENvdW50OiBudW1iZXIsXG4gICAgb25CYXRjaENyZWF0ZTogKCkgPT4gdm9pZCxcbiAgICBvbkJhdGNoRWRpdDogKCkgPT4gdm9pZCxcbiAgICBvbkJhdGNoRGVsZXRlOiAoKSA9PiB2b2lkLFxuICAgIG9uQ2xlYXJTZWxlY3Rpb246ICgpID0+IHZvaWRcbik6IENvbnRleHRNZW51T3B0aW9uW10gPT4gW1xuICAgIHtcbiAgICAgICAgbGFiZWw6IGAke3NlbGVjdGVkQ291bnR9IGNlbGxzIHNlbGVjdGVkYCxcbiAgICAgICAgaWNvbjogXCLwn5OKXCIsXG4gICAgICAgIGFjdGlvbjogKCkgPT4ge30sIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWZ1bmN0aW9uXG4gICAgICAgIGRpc2FibGVkOiB0cnVlXG4gICAgfSxcbiAgICB7IHNlcGFyYXRvcjogdHJ1ZSB9IGFzIENvbnRleHRNZW51T3B0aW9uLFxuICAgIHtcbiAgICAgICAgbGFiZWw6IFwiQmF0Y2ggQ3JlYXRlXCIsXG4gICAgICAgIGljb246IFwi4p6VXCIsXG4gICAgICAgIGFjdGlvbjogb25CYXRjaENyZWF0ZVxuICAgIH0sXG4gICAge1xuICAgICAgICBsYWJlbDogXCJCYXRjaCBFZGl0XCIsXG4gICAgICAgIGljb246IFwi4pyP77iPXCIsXG4gICAgICAgIGFjdGlvbjogb25CYXRjaEVkaXRcbiAgICB9LFxuICAgIHsgc2VwYXJhdG9yOiB0cnVlIH0gYXMgQ29udGV4dE1lbnVPcHRpb24sXG4gICAge1xuICAgICAgICBsYWJlbDogXCJCYXRjaCBEZWxldGVcIixcbiAgICAgICAgaWNvbjogXCLwn5eR77iPXCIsXG4gICAgICAgIGFjdGlvbjogb25CYXRjaERlbGV0ZVxuICAgIH0sXG4gICAgeyBzZXBhcmF0b3I6IHRydWUgfSBhcyBDb250ZXh0TWVudU9wdGlvbixcbiAgICB7XG4gICAgICAgIGxhYmVsOiBcIkNsZWFyIFNlbGVjdGlvblwiLFxuICAgICAgICBpY29uOiBcIuKdjFwiLFxuICAgICAgICBhY3Rpb246IG9uQ2xlYXJTZWxlY3Rpb25cbiAgICB9XG5dO1xuXG5mdW5jdGlvbiBnZXRTaGlmdEljb24oc2hpZnRUeXBlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAoc2hpZnRUeXBlKSB7XG4gICAgICAgIGNhc2UgXCJNXCI6XG4gICAgICAgICAgICByZXR1cm4gXCLwn4yFXCI7XG4gICAgICAgIGNhc2UgXCJFXCI6XG4gICAgICAgICAgICByZXR1cm4gXCLwn4yGXCI7XG4gICAgICAgIGNhc2UgXCJOXCI6XG4gICAgICAgICAgICByZXR1cm4gXCLwn4yZXCI7XG4gICAgICAgIGNhc2UgXCJEXCI6XG4gICAgICAgICAgICByZXR1cm4gXCLwn4+gXCI7XG4gICAgICAgIGNhc2UgXCJIXCI6XG4gICAgICAgICAgICByZXR1cm4gXCLwn4+W77iPXCI7XG4gICAgICAgIGNhc2UgXCJUXCI6XG4gICAgICAgICAgICByZXR1cm4gXCLwn5OaXCI7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gXCLij7BcIjtcbiAgICB9XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlRWxlbWVudCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSwgdXNlTWVtbywgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGFkZERheXMsIGdldER1cmF0aW9uSW5NaW51dGVzLCBmb3JtYXREYXRlRm9yU2hpZnQgfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZUhlbHBlcnNcIjtcbmltcG9ydCB7IHVzZVNjcm9sbE5hdmlnYXRpb24gfSBmcm9tIFwiLi4vaG9va3MvdXNlU2Nyb2xsTmF2aWdhdGlvblwiO1xuLy8gaW1wb3J0IHsgdXNlVGVhbUFjY2VzcywgVGVhbUFjY2Vzc0NvbmZpZyB9IGZyb20gXCIuLi9ob29rcy91c2VUZWFtQWNjZXNzXCI7IC8vIE5vIGxvbmdlciBuZWVkZWRcbmltcG9ydCB7IEVtcHR5U3RhdGUsIHdpdGhFcnJvckJvdW5kYXJ5IH0gZnJvbSBcIi4vTG9hZGluZ1N0YXRlc1wiO1xuaW1wb3J0IERheUNlbGwgZnJvbSBcIi4vRGF5Q2VsbFwiO1xuaW1wb3J0IHtcbiAgICBDb250ZXh0TWVudSxcbiAgICBDb250ZXh0TWVudU9wdGlvbixcbiAgICBjcmVhdGVFbXB0eUNlbGxNZW51LFxuICAgIGNyZWF0ZUV4aXN0aW5nU2hpZnRNZW51LFxuICAgIGNyZWF0ZU11bHRpU2VsZWN0TWVudVxufSBmcm9tIFwiLi9Db250ZXh0TWVudVwiO1xuaW1wb3J0IHsgRW5naW5lZXIsIFNoaWZ0QXNzaWdubWVudCB9IGZyb20gXCIuLi90eXBlcy9zaGlmdFNjaGVkdWxlclwiO1xuXG5pbnRlcmZhY2UgU2NoZWR1bGVHcmlkUHJvcHMge1xuICAgIGVuZ2luZWVyczogRW5naW5lZXJbXTtcbiAgICBzaGlmdHM6IFNoaWZ0QXNzaWdubWVudFtdO1xuICAgIGdldFNoaWZ0c0ZvckVuZ2luZWVyOiAoZW5naW5lZXJJZDogc3RyaW5nKSA9PiBTaGlmdEFzc2lnbm1lbnRbXTtcbiAgICBnZXRFbmdpbmVlcnNCeVRlYW06ICgpID0+IHsgW3RlYW06IHN0cmluZ106IEVuZ2luZWVyW10gfTtcbiAgICBvbkVkaXRTaGlmdD86IGFueTsgLy8gQWN0aW9uVmFsdWVcbiAgICBvbkNyZWF0ZVNoaWZ0PzogYW55OyAvLyBBY3Rpb25WYWx1ZVxuICAgIG9uRGVsZXRlU2hpZnQ/OiBhbnk7IC8vIEFjdGlvblZhbHVlXG4gICAgLy8gQ29udGV4dCBhdHRyaWJ1dGVzIGZvciBwYXNzaW5nIGRhdGEgdG8gbWljcm9mbG93c1xuICAgIGNvbnRleHRTaGlmdElkPzogYW55O1xuICAgIGNvbnRleHRFbmdpbmVlcklkPzogYW55O1xuICAgIGNvbnRleHREYXRlPzogYW55O1xuICAgIGNvbnRleHRTZWxlY3RlZENlbGxzPzogYW55O1xuICAgIG9uQmF0Y2hDcmVhdGU/OiAoc2VsZWN0ZWRDZWxsczogYW55W10pID0+IHZvaWQ7XG4gICAgb25CYXRjaEVkaXQ/OiAoc2VsZWN0ZWRDZWxsczogYW55W10pID0+IHZvaWQ7XG4gICAgb25CYXRjaERlbGV0ZT86IChzZWxlY3RlZENlbGxzOiBhbnlbXSkgPT4gdm9pZDtcbiAgICByZWFkT25seT86IGJvb2xlYW47XG4gICAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICAgIC8vIHRlYW1BY2Nlc3M/OiBUZWFtQWNjZXNzQ29uZmlnOyAvLyBObyBsb25nZXIgbmVlZGVkXG4gICAgc2hvd0RlYnVnSW5mbz86IGJvb2xlYW47XG4gICAgc2hpZnRzTG9hZGluZz86IGJvb2xlYW47XG4gICAgZGVidWdJbmZvPzoge1xuICAgICAgICBhdHRyaWJ1dGVzQ29uZmlndXJlZDoge1xuICAgICAgICAgICAgbmFtZTogYm9vbGVhbjtcbiAgICAgICAgICAgIGhlYWRlcjogYm9vbGVhbjtcbiAgICAgICAgICAgIHN1YmhlYWRlcjogYm9vbGVhbjtcbiAgICAgICAgICAgIHNwVXNlckFzc29jaWF0aW9uOiBib29sZWFuO1xuICAgICAgICAgICAgc2hpZnRBc3NvY2lhdGlvbjogYm9vbGVhbjtcbiAgICAgICAgICAgIHNoaWZ0RGF0ZTogYm9vbGVhbjtcbiAgICAgICAgfTtcbiAgICB9O1xufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciBkaXNhYmxlZCBhY3Rpb25zIHdpdGggY29ycmVjdCBzaWduYXR1cmVzXG5jb25zdCBub09wU2hpZnRGdW5jdGlvbiA9IChfc2hpZnQ6IGFueSk6IHZvaWQgPT4ge1xuICAgIC8vIEludGVudGlvbmFsbHkgZW1wdHkgLSB1c2VkIGZvciBkaXNhYmxlZCBzaGlmdCBtZW51IGFjdGlvbnNcbn07XG5cbmNvbnN0IG5vT3BGdW5jdGlvbiA9ICgpOiB2b2lkID0+IHtcbiAgICAvLyBJbnRlbnRpb25hbGx5IGVtcHR5IC0gdXNlZCBmb3IgZGlzYWJsZWQgbWVudSBhY3Rpb25zXG59O1xuXG5jb25zdCBTY2hlZHVsZUdyaWQ6IFJlYWN0LkZDPFNjaGVkdWxlR3JpZFByb3BzPiA9ICh7XG4gICAgZW5naW5lZXJzOiBfZW5naW5lZXJzLFxuICAgIHNoaWZ0cyxcbiAgICBnZXRTaGlmdHNGb3JFbmdpbmVlcjogX2dldFNoaWZ0c0ZvckVuZ2luZWVyLFxuICAgIGdldEVuZ2luZWVyc0J5VGVhbSxcbiAgICBvbkVkaXRTaGlmdCxcbiAgICBvbkNyZWF0ZVNoaWZ0LFxuICAgIG9uRGVsZXRlU2hpZnQsXG4gICAgY29udGV4dFNoaWZ0SWQsXG4gICAgY29udGV4dEVuZ2luZWVySWQsXG4gICAgY29udGV4dERhdGUsXG4gICAgY29udGV4dFNlbGVjdGVkQ2VsbHMsXG4gICAgb25CYXRjaENyZWF0ZSxcbiAgICBvbkJhdGNoRWRpdCxcbiAgICBvbkJhdGNoRGVsZXRlLFxuICAgIHJlYWRPbmx5ID0gZmFsc2UsXG4gICAgY2xhc3NOYW1lID0gXCJcIixcbiAgICAvLyB0ZWFtQWNjZXNzLCAvLyBObyBsb25nZXIgbmVlZGVkXG4gICAgc2hvd0RlYnVnSW5mbyxcbiAgICBzaGlmdHNMb2FkaW5nLFxuICAgIGRlYnVnSW5mb1xufSkgPT4ge1xuICAgIC8vIFVzZSBhbGwgc2hpZnRzIGRhdGEgZGlyZWN0bHkgLSBzZWN1cml0eSBpcyBoYW5kbGVkIGJ5IEFjdGlvblZhbHVlLmNhbkV4ZWN1dGVcbiAgICBjb25zdCBhY2Nlc3NpYmxlU2hpZnRzID0gc2hpZnRzO1xuXG4gICAgLy8gQ2FsY3VsYXRlIGRhdGUgcmFuZ2UgZnJvbSBhY2Nlc3NpYmxlIHNoaWZ0IGRhdGFcbiAgICBjb25zdCBkYXRlUmFuZ2UgPSB1c2VNZW1vKCgpID0+IHtcbiAgICAgICAgaWYgKGFjY2Vzc2libGVTaGlmdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgIGVuZDogYWRkRGF5cyhuZXcgRGF0ZSgpLCAzMClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaGlmdERhdGVzID0gYWNjZXNzaWJsZVNoaWZ0cy5tYXAoc2hpZnQgPT4gbmV3IERhdGUoc2hpZnQuZGF0ZSkpLmZpbHRlcihkYXRlID0+ICFpc05hTihkYXRlLmdldFRpbWUoKSkpO1xuICAgICAgICBpZiAoc2hpZnREYXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgZW5kOiBhZGREYXlzKG5ldyBEYXRlKCksIDMwKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVhcmxpZXN0RGF0ZSA9IG5ldyBEYXRlKE1hdGgubWluKC4uLnNoaWZ0RGF0ZXMubWFwKGQgPT4gZC5nZXRUaW1lKCkpKSk7XG4gICAgICAgIGNvbnN0IGxhdGVzdERhdGUgPSBuZXcgRGF0ZShNYXRoLm1heCguLi5zaGlmdERhdGVzLm1hcChkID0+IGQuZ2V0VGltZSgpKSkpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydDogZWFybGllc3REYXRlLFxuICAgICAgICAgICAgZW5kOiBsYXRlc3REYXRlXG4gICAgICAgIH07XG4gICAgfSwgW2FjY2Vzc2libGVTaGlmdHNdKTtcblxuICAgIGNvbnN0IFtzdGFydERhdGVdID0gdXNlU3RhdGUoZGF0ZVJhbmdlLnN0YXJ0KTtcbiAgICBjb25zdCBbZW5kRGF0ZSwgc2V0RW5kRGF0ZV0gPSB1c2VTdGF0ZShkYXRlUmFuZ2UuZW5kKTtcbiAgICBjb25zdCBbc2VsZWN0ZWRDZWxscywgc2V0U2VsZWN0ZWRDZWxsc10gPSB1c2VTdGF0ZTxBcnJheTx7IGVuZ2luZWVySWQ6IHN0cmluZzsgZGF0ZTogc3RyaW5nIH0+PihbXSk7XG4gICAgY29uc3QgW2xhc3RTZWxlY3RlZENlbGwsIHNldExhc3RTZWxlY3RlZENlbGxdID0gdXNlU3RhdGU8eyBlbmdpbmVlcklkOiBzdHJpbmc7IGRhdGU6IHN0cmluZyB9IHwgbnVsbD4obnVsbCk7XG5cbiAgICAvLyBDb250ZXh0IG1lbnUgc3RhdGVcbiAgICBjb25zdCBbY29udGV4dE1lbnUsIHNldENvbnRleHRNZW51XSA9IHVzZVN0YXRlPHtcbiAgICAgICAgdmlzaWJsZTogYm9vbGVhbjtcbiAgICAgICAgeDogbnVtYmVyO1xuICAgICAgICB5OiBudW1iZXI7XG4gICAgICAgIG9wdGlvbnM6IENvbnRleHRNZW51T3B0aW9uW107XG4gICAgfT4oe1xuICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMCxcbiAgICAgICAgb3B0aW9uczogW11cbiAgICB9KTtcblxuICAgIC8vIFNjcm9sbCBuYXZpZ2F0aW9uIGhvb2sgZm9yIHVuaWZpZWQgc2Nyb2xsaW5nIGFuZCBpbmZpbml0ZSBsb2FkaW5nXG4gICAgY29uc3QgeyBoZWFkZXJTY3JvbGxSZWYsIGNvbnRlbnRTY3JvbGxSZWYsIGluZmluaXRlU2Nyb2xsUmVmLCBpc0luZmluaXRlU2Nyb2xsVmlzaWJsZSB9ID0gdXNlU2Nyb2xsTmF2aWdhdGlvbigpO1xuXG4gICAgLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgbXVsdGktc2VsZWN0XG4gICAgY29uc3QgaXNDZWxsU2VsZWN0ZWQgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKGVuZ2luZWVySWQ6IHN0cmluZywgZGF0ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRDZWxscy5zb21lKGNlbGwgPT4gY2VsbC5lbmdpbmVlcklkID09PSBlbmdpbmVlcklkICYmIGNlbGwuZGF0ZSA9PT0gZGF0ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIFtzZWxlY3RlZENlbGxzXVxuICAgICk7XG5cbiAgICAvLyBIYW5kbGUgaW5maW5pdGUgc2Nyb2xsIGxvYWRpbmcgd2hlbiBzZW50aW5lbCBjb21lcyBpbnRvIHZpZXdcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoaXNJbmZpbml0ZVNjcm9sbFZpc2libGUpIHtcbiAgICAgICAgICAgIHNldEVuZERhdGUoZCA9PiBhZGREYXlzKGQsIDE1KSk7XG4gICAgICAgIH1cbiAgICB9LCBbaXNJbmZpbml0ZVNjcm9sbFZpc2libGVdKTtcblxuICAgIC8vIE1lbW9pemUgdGVhbXMgZGF0YSBmb3IgcGVyZm9ybWFuY2VcbiAgICBjb25zdCB0ZWFtc0RhdGEgPSB1c2VNZW1vKCgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBnZXRFbmdpbmVlcnNCeVRlYW0oKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkVycm9yIGdldHRpbmcgZW5naW5lZXJzIGJ5IHRlYW06XCIsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfVxuICAgIH0sIFtnZXRFbmdpbmVlcnNCeVRlYW1dKTtcblxuICAgIC8vIEdyb3VwIGVuZ2luZWVycyBieSBIZWFkZXIg4oaSIFN1YmhlYWRlciDihpIgRW5naW5lZXJzIChkYXRhLWRyaXZlbiB3aXRoIGZhbGxiYWNrKVxuICAgIGNvbnN0IHsgaGVhZGVyU3ViaGVhZGVyU3RydWN0dXJlLCBhbGxFbmdpbmVlcnMsIGdyb3VwaW5nRGVidWdJbmZvIH0gPSB1c2VNZW1vKCgpID0+IHtcbiAgICAgICAgY29uc3QgZGVidWdNZXNzYWdlczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICAvLyBDaGVjayBpZiB3ZSBoYXZlIGFueSBoZWFkZXIgZ3JvdXBpbmcgY29uZmlndXJlZFxuICAgICAgICBjb25zdCBoYXNIZWFkZXJHcm91cGluZyA9ICEhZGVidWdJbmZvICYmIGRlYnVnSW5mby5hdHRyaWJ1dGVzQ29uZmlndXJlZD8uaGVhZGVyO1xuICAgICAgICBjb25zdCBoYXNTdWJoZWFkZXJHcm91cGluZyA9ICEhZGVidWdJbmZvICYmIGRlYnVnSW5mby5hdHRyaWJ1dGVzQ29uZmlndXJlZD8uc3ViaGVhZGVyO1xuXG4gICAgICAgIGRlYnVnTWVzc2FnZXMucHVzaChgUHJvY2Vzc2luZyAke09iamVjdC5rZXlzKHRlYW1zRGF0YSkubGVuZ3RofSBoZWFkZXIgZ3JvdXBzYCk7XG4gICAgICAgIGRlYnVnTWVzc2FnZXMucHVzaChgSGVhZGVyIGdyb3VwaW5nOiAke2hhc0hlYWRlckdyb3VwaW5nID8gXCLinIVcIiA6IFwi4p2MXCJ9YCk7XG4gICAgICAgIGRlYnVnTWVzc2FnZXMucHVzaChgU3ViaGVhZGVyIGdyb3VwaW5nOiAke2hhc1N1YmhlYWRlckdyb3VwaW5nID8gXCLinIVcIiA6IFwi4p2MXCJ9YCk7XG5cbiAgICAgICAgaWYgKCFoYXNIZWFkZXJHcm91cGluZykge1xuICAgICAgICAgICAgLy8gTm8gZ3JvdXBpbmcgLSBmbGF0IGxpc3Qgb2YgYWxsIGVuZ2luZWVyc1xuICAgICAgICAgICAgY29uc3QgZmxhdEVuZ2luZWVycyA9IE9iamVjdC52YWx1ZXModGVhbXNEYXRhKS5mbGF0KCk7XG4gICAgICAgICAgICBkZWJ1Z01lc3NhZ2VzLnB1c2goXCJObyBoZWFkZXIgZ3JvdXBpbmcgLSBzaG93aW5nIGFsbCBlbmdpbmVlcnMgaW4gc2luZ2xlIGdyb3VwXCIpO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGhlYWRlclN1YmhlYWRlclN0cnVjdHVyZTogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJOYW1lOiBcIkFsbCBFbmdpbmVlcnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcklkOiBcImFsbC1lbmdpbmVlcnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmhlYWRlcnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiR2VuZXJhbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVlcnM6IGZsYXRFbmdpbmVlcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGFsbEVuZ2luZWVyczogZmxhdEVuZ2luZWVycyxcbiAgICAgICAgICAgICAgICBncm91cGluZ0RlYnVnSW5mbzogZGVidWdNZXNzYWdlc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHN0cnVjdHVyZSA9IE9iamVjdC5lbnRyaWVzKHRlYW1zRGF0YSkubWFwKChbaGVhZGVyTmFtZSwgZW5naW5lZXJzXSkgPT4ge1xuICAgICAgICAgICAgZGVidWdNZXNzYWdlcy5wdXNoKGBIZWFkZXIgXCIke2hlYWRlck5hbWV9XCI6ICR7ZW5naW5lZXJzLmxlbmd0aH0gZW5naW5lZXJzYCk7XG5cbiAgICAgICAgICAgIGlmICghaGFzU3ViaGVhZGVyR3JvdXBpbmcpIHtcbiAgICAgICAgICAgICAgICAvLyBPbmx5IGhlYWRlciBncm91cGluZyAtIG5vIHN1YmhlYWRlciBncm91cGluZ1xuICAgICAgICAgICAgICAgIGRlYnVnTWVzc2FnZXMucHVzaChgICBObyBzdWJoZWFkZXIgZ3JvdXBpbmcgZm9yICR7aGVhZGVyTmFtZX1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJOYW1lLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJJZDogaGVhZGVyTmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCItXCIpLFxuICAgICAgICAgICAgICAgICAgICBzdWJoZWFkZXJzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJHZW5lcmFsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBCb3RoIGhlYWRlciBhbmQgc3ViaGVhZGVyIGdyb3VwaW5nXG4gICAgICAgICAgICBjb25zdCBzdWJoZWFkZXJHcm91cHM6IHsgW3N1YmhlYWRlcjogc3RyaW5nXTogRW5naW5lZXJbXSB9ID0ge307XG5cbiAgICAgICAgICAgIGVuZ2luZWVycy5mb3JFYWNoKChlbmdpbmVlciwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBVc2UgZW5naW5lZXIncyBzdWJoZWFkZXIsIGRlZmF1bHQgdG8gJ0dlbmVyYWwnIGlmIG5vdCBzcGVjaWZpZWRcbiAgICAgICAgICAgICAgICBjb25zdCBlbmdpbmVlclN1YmhlYWRlciA9IGVuZ2luZWVyLnN1YmhlYWRlciB8fCBcIkdlbmVyYWxcIjtcblxuICAgICAgICAgICAgICAgIGlmICghc3ViaGVhZGVyR3JvdXBzW2VuZ2luZWVyU3ViaGVhZGVyXSkge1xuICAgICAgICAgICAgICAgICAgICBzdWJoZWFkZXJHcm91cHNbZW5naW5lZXJTdWJoZWFkZXJdID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN1YmhlYWRlckdyb3Vwc1tlbmdpbmVlclN1YmhlYWRlcl0ucHVzaChlbmdpbmVlcik7XG5cbiAgICAgICAgICAgICAgICAvLyBEZWJ1ZyBmaXJzdCBmZXcgZW5naW5lZXJzXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgMikge1xuICAgICAgICAgICAgICAgICAgICBkZWJ1Z01lc3NhZ2VzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICBgICBFbmdpbmVlciAke2luZGV4fTogJHtlbmdpbmVlci5uYW1lfSAoJHtlbmdpbmVlci5oZWFkZXJ9LyR7ZW5naW5lZXIuc3ViaGVhZGVyfSlgXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIFNvcnQgc3ViaGVhZGVycyBhbHBoYWJldGljYWxseSAoZGF0YS1kcml2ZW4sIG5vIGhhcmRjb2RlZCBvcmRlcilcbiAgICAgICAgICAgIGNvbnN0IHNvcnRlZFN1YmhlYWRlcnMgPSBPYmplY3Qua2V5cyhzdWJoZWFkZXJHcm91cHMpLnNvcnQoKTtcbiAgICAgICAgICAgIGRlYnVnTWVzc2FnZXMucHVzaChgICBTdWJoZWFkZXJzOiAke3NvcnRlZFN1YmhlYWRlcnMuam9pbihcIiwgXCIpfWApO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGhlYWRlck5hbWUsXG4gICAgICAgICAgICAgICAgaGVhZGVySWQ6IGhlYWRlck5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiLVwiKSxcbiAgICAgICAgICAgICAgICBzdWJoZWFkZXJzOiBzb3J0ZWRTdWJoZWFkZXJzLm1hcChzdWJoZWFkZXIgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogc3ViaGVhZGVyLFxuICAgICAgICAgICAgICAgICAgICBlbmdpbmVlcnM6IHN1YmhlYWRlckdyb3Vwc1tzdWJoZWFkZXJdXG4gICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBmbGF0RW5naW5lZXJzOiBFbmdpbmVlcltdID0gc3RydWN0dXJlLmZsYXRNYXAoaGVhZGVyID0+XG4gICAgICAgICAgICBoZWFkZXIuc3ViaGVhZGVycy5mbGF0TWFwKHN1YmhlYWRlciA9PiBzdWJoZWFkZXIuZW5naW5lZXJzKVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB7IGhlYWRlclN1YmhlYWRlclN0cnVjdHVyZTogc3RydWN0dXJlLCBhbGxFbmdpbmVlcnM6IGZsYXRFbmdpbmVlcnMsIGdyb3VwaW5nRGVidWdJbmZvOiBkZWJ1Z01lc3NhZ2VzIH07XG4gICAgfSwgW3RlYW1zRGF0YSwgZGVidWdJbmZvXSk7XG5cbiAgICAvLyBHZW5lcmF0ZSBkYXRlIGNvbHVtbnNcbiAgICBjb25zdCBkYXRlQ29sdW1ucyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgICAgICBjb25zdCBkYXlzQ291bnQgPSBNYXRoLmNlaWwoZ2V0RHVyYXRpb25Jbk1pbnV0ZXMoc3RhcnREYXRlLCBlbmREYXRlKSAvICg2MCAqIDI0KSk7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBkYXlzQ291bnQgfSwgKF8sIGlkeCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IGFkZERheXMoc3RhcnREYXRlLCBpZHgpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBkYXRlLFxuICAgICAgICAgICAgICAgIGRhdGVTdHJpbmc6IGZvcm1hdERhdGVGb3JTaGlmdChkYXRlKSxcbiAgICAgICAgICAgICAgICBpc1RvZGF5OiBmb3JtYXREYXRlRm9yU2hpZnQoZGF0ZSkgPT09IGZvcm1hdERhdGVGb3JTaGlmdChuZXcgRGF0ZSgpKSxcbiAgICAgICAgICAgICAgICBpc1dlZWtlbmQ6IGRhdGUuZ2V0RGF5KCkgPT09IDAgfHwgZGF0ZS5nZXREYXkoKSA9PT0gNlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfSwgW3N0YXJ0RGF0ZSwgZW5kRGF0ZV0pO1xuXG4gICAgLy8gTXVsdGktc2VsZWN0IGNlbGwgZnVuY3Rpb24gKGRlZmluZWQgYWZ0ZXIgYWxsRW5naW5lZXJzIGFuZCBkYXRlQ29sdW1ucyBhcmUgYXZhaWxhYmxlKVxuICAgIGNvbnN0IHNlbGVjdENlbGwgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKGVuZ2luZWVySWQ6IHN0cmluZywgZGF0ZTogc3RyaW5nLCBjdHJsS2V5OiBib29sZWFuLCBzaGlmdEtleTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3Q2VsbCA9IHsgZW5naW5lZXJJZCwgZGF0ZSB9O1xuXG4gICAgICAgICAgICBpZiAoc2hpZnRLZXkgJiYgbGFzdFNlbGVjdGVkQ2VsbCkge1xuICAgICAgICAgICAgICAgIC8vIFNoaWZ0K2NsaWNrOiBzZWxlY3QgcmFuZ2UgZnJvbSBsYXN0IHNlbGVjdGVkIHRvIGN1cnJlbnRcbiAgICAgICAgICAgICAgICBjb25zdCBlbmdpbmVlclN0YXJ0ID0gYWxsRW5naW5lZXJzLmZpbmRJbmRleChlID0+IGUuaWQgPT09IGxhc3RTZWxlY3RlZENlbGwuZW5naW5lZXJJZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZW5naW5lZXJFbmQgPSBhbGxFbmdpbmVlcnMuZmluZEluZGV4KGUgPT4gZS5pZCA9PT0gZW5naW5lZXJJZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVN0YXJ0ID0gZGF0ZUNvbHVtbnMuZmluZEluZGV4KGQgPT4gZC5kYXRlU3RyaW5nID09PSBsYXN0U2VsZWN0ZWRDZWxsLmRhdGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVFbmQgPSBkYXRlQ29sdW1ucy5maW5kSW5kZXgoZCA9PiBkLmRhdGVTdHJpbmcgPT09IGRhdGUpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbWluRW5naW5lZXIgPSBNYXRoLm1pbihlbmdpbmVlclN0YXJ0LCBlbmdpbmVlckVuZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF4RW5naW5lZXIgPSBNYXRoLm1heChlbmdpbmVlclN0YXJ0LCBlbmdpbmVlckVuZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWluRGF0ZSA9IE1hdGgubWluKGRhdGVTdGFydCwgZGF0ZUVuZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF4RGF0ZSA9IE1hdGgubWF4KGRhdGVTdGFydCwgZGF0ZUVuZCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByYW5nZUNlbGxzOiBBcnJheTx7IGVuZ2luZWVySWQ6IHN0cmluZzsgZGF0ZTogc3RyaW5nIH0+ID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZSA9IG1pbkVuZ2luZWVyOyBlIDw9IG1heEVuZ2luZWVyOyBlKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZCA9IG1pbkRhdGU7IGQgPD0gbWF4RGF0ZTsgZCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWxsRW5naW5lZXJzW2VdICYmIGRhdGVDb2x1bW5zW2RdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VDZWxscy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lZXJJZDogYWxsRW5naW5lZXJzW2VdLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlOiBkYXRlQ29sdW1uc1tkXS5kYXRlU3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY3RybEtleSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDdHJsK1NoaWZ0OiBhZGQgcmFuZ2UgdG8gZXhpc3Rpbmcgc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkQ2VsbHMocHJldiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdTZWxlY3Rpb24gPSBbLi4ucHJldl07XG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZUNlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhbmV3U2VsZWN0aW9uLnNvbWUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZyA9PiBleGlzdGluZy5lbmdpbmVlcklkID09PSBjZWxsLmVuZ2luZWVySWQgJiYgZXhpc3RpbmcuZGF0ZSA9PT0gY2VsbC5kYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2VsZWN0aW9uLnB1c2goY2VsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3U2VsZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBTaGlmdCBvbmx5OiByZXBsYWNlIHNlbGVjdGlvbiB3aXRoIHJhbmdlXG4gICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkQ2VsbHMocmFuZ2VDZWxscyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChjdHJsS2V5KSB7XG4gICAgICAgICAgICAgICAgLy8gQ3RybCtjbGljazogdG9nZ2xlIHNpbmdsZSBjZWxsXG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRDZWxscyhwcmV2ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHByZXYuc29tZShjZWxsID0+IGNlbGwuZW5naW5lZXJJZCA9PT0gZW5naW5lZXJJZCAmJiBjZWxsLmRhdGUgPT09IGRhdGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXYuZmlsdGVyKGNlbGwgPT4gIShjZWxsLmVuZ2luZWVySWQgPT09IGVuZ2luZWVySWQgJiYgY2VsbC5kYXRlID09PSBkYXRlKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWy4uLnByZXYsIG5ld0NlbGxdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2V0TGFzdFNlbGVjdGVkQ2VsbChuZXdDZWxsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUmVndWxhciBjbGljazogc2VsZWN0IHNpbmdsZSBjZWxsXG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRDZWxscyhbbmV3Q2VsbF0pO1xuICAgICAgICAgICAgICAgIHNldExhc3RTZWxlY3RlZENlbGwobmV3Q2VsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtsYXN0U2VsZWN0ZWRDZWxsLCBhbGxFbmdpbmVlcnMsIGRhdGVDb2x1bW5zXVxuICAgICk7XG5cbiAgICAvLyBDb250ZXh0IG1lbnUgaGFuZGxlcnNcbiAgICBjb25zdCBoYW5kbGVDZWxsQ29udGV4dE1lbnUgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKGU6IFJlYWN0Lk1vdXNlRXZlbnQsIGVuZ2luZWVyOiBFbmdpbmVlciwgZGF0ZTogc3RyaW5nLCBzaGlmdD86IFNoaWZ0QXNzaWdubWVudCkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgbGV0IG9wdGlvbnM6IENvbnRleHRNZW51T3B0aW9uW107XG5cbiAgICAgICAgICAgIC8vIENoZWNrIHBlcm1pc3Npb25zIGJlZm9yZSBzaG93aW5nIGNvbnRleHQgbWVudSBvcHRpb25zXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRDZWxscy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYW55IGJhdGNoIG9wZXJhdGlvbiBpcyBhdmFpbGFibGVcbiAgICAgICAgICAgICAgICBpZiAob25CYXRjaENyZWF0ZSB8fCBvbkJhdGNoRWRpdCB8fCBvbkJhdGNoRGVsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE11bHRpLXNlbGVjdGlvbiBjb250ZXh0IG1lbnUgKGZ1bGwgcGVybWlzc2lvbnMpXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBjcmVhdGVNdWx0aVNlbGVjdE1lbnUoXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENlbGxzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob25CYXRjaENyZWF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJhdGNoQ3JlYXRlKHNlbGVjdGVkQ2VsbHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uQmF0Y2hFZGl0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQmF0Y2hFZGl0KHNlbGVjdGVkQ2VsbHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uQmF0Y2hEZWxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25CYXRjaERlbGV0ZShzZWxlY3RlZENlbGxzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkQ2VsbHMoW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldExhc3RTZWxlY3RlZENlbGwobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTGltaXRlZCBtZW51IHdoZW4gbm8gYmF0Y2ggcGVybWlzc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogYCR7c2VsZWN0ZWRDZWxscy5sZW5ndGh9IGNlbGxzIHNlbGVjdGVkYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcIvCfk4pcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5vT3BGdW5jdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXBhcmF0b3I6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzZXBhcmF0b3I6IHRydWUgfSBhcyBDb250ZXh0TWVudU9wdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDbGVhciBTZWxlY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcIuKclVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZENlbGxzKFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TGFzdFNlbGVjdGVkQ2VsbChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXBhcmF0b3I6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkJhdGNoIG9wZXJhdGlvbnMgbm90IHBlcm1pdHRlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwi8J+UklwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbm9PcEZ1bmN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcGFyYXRvcjogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNoaWZ0KSB7XG4gICAgICAgICAgICAgICAgLy8gRXhpc3Rpbmcgc2hpZnQgY29udGV4dCBtZW51IChjaGVjayBlZGl0L2RlbGV0ZSBwZXJtaXNzaW9ucylcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gY3JlYXRlRXhpc3RpbmdTaGlmdE1lbnUoXG4gICAgICAgICAgICAgICAgICAgIHNoaWZ0LFxuICAgICAgICAgICAgICAgICAgICBlbmdpbmVlcixcbiAgICAgICAgICAgICAgICAgICAgb25FZGl0U2hpZnQ/LmNhbkV4ZWN1dGVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gc2hpZnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uRWRpdFNoaWZ0Py5jYW5FeGVjdXRlICYmICFvbkVkaXRTaGlmdC5pc0V4ZWN1dGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0U2hpZnRJZD8uc2V0VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dFNoaWZ0SWQuc2V0VmFsdWUoc2hpZnQuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVkaXRTaGlmdC5leGVjdXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogbm9PcFNoaWZ0RnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlU2hpZnQ/LmNhbkV4ZWN1dGVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gc2hpZnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uRGVsZXRlU2hpZnQ/LmNhbkV4ZWN1dGUgJiYgIW9uRGVsZXRlU2hpZnQuaXNFeGVjdXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dFNoaWZ0SWQ/LnNldFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRTaGlmdElkLnNldFZhbHVlKHNoaWZ0LmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EZWxldGVTaGlmdC5leGVjdXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogbm9PcFNoaWZ0RnVuY3Rpb25cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvbkNyZWF0ZVNoaWZ0Py5jYW5FeGVjdXRlKSB7XG4gICAgICAgICAgICAgICAgLy8gRW1wdHkgY2VsbCBjb250ZXh0IG1lbnUgKG9ubHkgaWYgdXNlciBjYW4gZXhlY3V0ZSBjcmVhdGUgYWN0aW9uKVxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBjcmVhdGVFbXB0eUNlbGxNZW51KGVuZ2luZWVyLCBkYXRlLCAoZW5naW5lZXJJZCwgZGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAob25DcmVhdGVTaGlmdD8uY2FuRXhlY3V0ZSAmJiAhb25DcmVhdGVTaGlmdC5pc0V4ZWN1dGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHRFbmdpbmVlcklkPy5zZXRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRFbmdpbmVlcklkLnNldFZhbHVlKGVuZ2luZWVySWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHREYXRlPy5zZXRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHREYXRlLnNldFZhbHVlKGRhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DcmVhdGVTaGlmdC5leGVjdXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTm8gcGVybWlzc2lvbnMgLSBzaG93IGxpbWl0ZWQgbWVudVxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5vIHBlcm1pc3Npb25zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcIvCflJJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbm9PcEZ1bmN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXBhcmF0b3I6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRDb250ZXh0TWVudSh7XG4gICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB4OiBlLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgeTogZS5jbGllbnRZLFxuICAgICAgICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgICBvbkNyZWF0ZVNoaWZ0LFxuICAgICAgICAgICAgb25FZGl0U2hpZnQsXG4gICAgICAgICAgICBvbkRlbGV0ZVNoaWZ0LFxuICAgICAgICAgICAgY29udGV4dFNoaWZ0SWQsXG4gICAgICAgICAgICBjb250ZXh0RW5naW5lZXJJZCxcbiAgICAgICAgICAgIGNvbnRleHREYXRlLFxuICAgICAgICAgICAgY29udGV4dFNlbGVjdGVkQ2VsbHMsXG4gICAgICAgICAgICBzZWxlY3RlZENlbGxzLFxuICAgICAgICAgICAgb25CYXRjaENyZWF0ZSxcbiAgICAgICAgICAgIG9uQmF0Y2hFZGl0LFxuICAgICAgICAgICAgb25CYXRjaERlbGV0ZSxcbiAgICAgICAgICAgIHNldFNlbGVjdGVkQ2VsbHMsXG4gICAgICAgICAgICBzZXRMYXN0U2VsZWN0ZWRDZWxsXG4gICAgICAgIF1cbiAgICApO1xuXG4gICAgY29uc3QgY2xvc2VDb250ZXh0TWVudSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgc2V0Q29udGV4dE1lbnUocHJldiA9PiAoeyAuLi5wcmV2LCB2aXNpYmxlOiBmYWxzZSB9KSk7XG4gICAgfSwgW10pO1xuXG4gICAgLy8gQ3JlYXRlIHNoaWZ0IGxvb2t1cCBmb3IgcGVyZm9ybWFuY2Ugd2l0aCB0YXJnZXRlZCBkZWJ1Z2dpbmdcbiAgICBjb25zdCBzaGlmdExvb2t1cCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgICAgICBjb25zdCBsb29rdXA6IFJlY29yZDxzdHJpbmcsIFNoaWZ0QXNzaWdubWVudD4gPSB7fTtcblxuICAgICAgICAvLyBGb3JjZSBjb25zb2xlIG91dHB1dCBmb3IgY3JpdGljYWwgZGVidWdnaW5nXG4gICAgICAgIGNvbnNvbGUubG9nKFwi8J+UjSBTSElGVFMgREVCVUcgLSBUb3RhbCBzaGlmdHM6XCIsIGFjY2Vzc2libGVTaGlmdHMubGVuZ3RoKTtcblxuICAgICAgICBhY2Nlc3NpYmxlU2hpZnRzLmZvckVhY2goKHNoaWZ0LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7c2hpZnQuZW5naW5lZXJJZH0tJHtzaGlmdC5kYXRlfWA7XG4gICAgICAgICAgICBsb29rdXBba2V5XSA9IHNoaWZ0O1xuXG4gICAgICAgICAgICAvLyBEZWJ1ZyBvbmx5IGZpcnN0IDIgc2hpZnRzIGR1ZSB0byBsYXJnZSBkYXRhc2V0XG4gICAgICAgICAgICBpZiAoaW5kZXggPCAyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYPCflI0gU0hJRlQgJHtpbmRleH06YCwge1xuICAgICAgICAgICAgICAgICAgICBlbmdpbmVlcklkOiBzaGlmdC5lbmdpbmVlcklkLFxuICAgICAgICAgICAgICAgICAgICBkYXRlOiBzaGlmdC5kYXRlLFxuICAgICAgICAgICAgICAgICAgICBzaGlmdDogc2hpZnQuc2hpZnQsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGVvZiBzaGlmdC5kYXRlLFxuICAgICAgICAgICAgICAgICAgICBrZXlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCLwn5SNIExPT0tVUCBERUJVRyAtIFRvdGFsIGtleXM6XCIsIE9iamVjdC5rZXlzKGxvb2t1cCkubGVuZ3RoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCLwn5SNIFNBTVBMRSBLRVlTOlwiLCBPYmplY3Qua2V5cyhsb29rdXApLnNsaWNlKDAsIDMpKTtcblxuICAgICAgICByZXR1cm4gbG9va3VwO1xuICAgIH0sIFthY2Nlc3NpYmxlU2hpZnRzXSk7XG5cbiAgICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gZ2V0IHNoaWZ0IGZvciBlbmdpbmVlciBhbmQgZGF0ZVxuICAgIGNvbnN0IGdldFNoaWZ0ID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChlbmdpbmVlcklkOiBzdHJpbmcsIGRhdGVTdHJpbmc6IHN0cmluZyk6IFNoaWZ0QXNzaWdubWVudCB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtlbmdpbmVlcklkfS0ke2RhdGVTdHJpbmd9YDtcbiAgICAgICAgICAgIGNvbnN0IHNoaWZ0ID0gc2hpZnRMb29rdXBba2V5XTtcblxuICAgICAgICAgICAgLy8gRGVidWcgZmlyc3QgZmV3IGxvb2t1cHMgb25seVxuICAgICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjAwMSkge1xuICAgICAgICAgICAgICAgIC8vIFNhbXBsZSAwLjElIG9mIGxvb2t1cHNcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIvCflI0gTE9PS1VQIFRFU1Q6XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgZW5naW5lZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICBmb3VuZDogISFzaGlmdCxcbiAgICAgICAgICAgICAgICAgICAgc2hpZnQ6IHNoaWZ0ID8gYCR7c2hpZnQuc2hpZnR9YCA6IFwibm9uZVwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzaGlmdDtcbiAgICAgICAgfSxcbiAgICAgICAgW3NoaWZ0TG9va3VwXVxuICAgICk7XG5cbiAgICAvLyBFbmhhbmNlZCBjZWxsIGNsaWNrIGhhbmRsZXIgd2l0aCBtdWx0aS1zZWxlY3Qgc3VwcG9ydFxuICAgIGNvbnN0IGhhbmRsZUNlbGxDbGljayA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoZW5naW5lZXJJZDogc3RyaW5nLCBkYXRlU3RyaW5nOiBzdHJpbmcsIGN0cmxLZXk6IGJvb2xlYW4sIHNoaWZ0S2V5OiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICBzZWxlY3RDZWxsKGVuZ2luZWVySWQsIGRhdGVTdHJpbmcsIGN0cmxLZXksIHNoaWZ0S2V5KTtcbiAgICAgICAgfSxcbiAgICAgICAgW3NlbGVjdENlbGxdXG4gICAgKTtcblxuICAgIC8vIEtleWJvYXJkIG5hdmlnYXRpb24gd2l0aCBtdWx0aS1zZWxlY3Qgc3VwcG9ydFxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZTogS2V5Ym9hcmRFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkQ2VsbHMubGVuZ3RoID09PSAwIHx8IGFsbEVuZ2luZWVycy5sZW5ndGggPT09IDAgfHwgZGF0ZUNvbHVtbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVc2UgdGhlIGxhc3Qgc2VsZWN0ZWQgY2VsbCBmb3IgbmF2aWdhdGlvblxuICAgICAgICAgICAgY29uc3QgY3VycmVudENlbGwgPSBsYXN0U2VsZWN0ZWRDZWxsIHx8IHNlbGVjdGVkQ2VsbHNbc2VsZWN0ZWRDZWxscy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRFbmdpbmVlckluZGV4ID0gYWxsRW5naW5lZXJzLmZpbmRJbmRleChlbmcgPT4gZW5nLmlkID09PSBjdXJyZW50Q2VsbC5lbmdpbmVlcklkKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXRlSW5kZXggPSBkYXRlQ29sdW1ucy5maW5kSW5kZXgoY29sID0+IGNvbC5kYXRlU3RyaW5nID09PSBjdXJyZW50Q2VsbC5kYXRlKTtcblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRFbmdpbmVlckluZGV4ID09PSAtMSB8fCBjdXJyZW50RGF0ZUluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG5ld0VuZ2luZWVySW5kZXggPSBjdXJyZW50RW5naW5lZXJJbmRleDtcbiAgICAgICAgICAgIGxldCBuZXdEYXRlSW5kZXggPSBjdXJyZW50RGF0ZUluZGV4O1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGUua2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgICAgICAgICAgICAgbmV3RW5naW5lZXJJbmRleCA9IE1hdGgubWF4KDAsIGN1cnJlbnRFbmdpbmVlckluZGV4IC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICAgICAgICAgICAgICBuZXdFbmdpbmVlckluZGV4ID0gTWF0aC5taW4oYWxsRW5naW5lZXJzLmxlbmd0aCAtIDEsIGN1cnJlbnRFbmdpbmVlckluZGV4ICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgICAgICAgICAgICBuZXdEYXRlSW5kZXggPSBNYXRoLm1heCgwLCBjdXJyZW50RGF0ZUluZGV4IC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICAgICAgICAgICAgbmV3RGF0ZUluZGV4ID0gTWF0aC5taW4oZGF0ZUNvbHVtbnMubGVuZ3RoIC0gMSwgY3VycmVudERhdGVJbmRleCArIDEpO1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJFbnRlclwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCIgXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZENlbGxzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2luZ2xlIHNlbGVjdGlvbjogZWRpdCB0aGUgc2VsZWN0ZWQgY2VsbFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGlmdCA9IGdldFNoaWZ0KGN1cnJlbnRDZWxsLmVuZ2luZWVySWQsIGN1cnJlbnRDZWxsLmRhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkVkaXRTaGlmdCAmJiBzaGlmdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVkaXRTaGlmdChzaGlmdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW4ga2V5Ym9hcmQgZWRpdDpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTXVsdGktc2VsZWN0aW9uOiBjb3VsZCBiYXRjaCBlZGl0IG9yIHNob3cgY29udGV4dCBtZW51XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTXVsdGktZWRpdCBmb3IgJHtzZWxlY3RlZENlbGxzLmxlbmd0aH0gY2VsbHNgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJFc2NhcGVcIjpcbiAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRDZWxscyhbXSk7XG4gICAgICAgICAgICAgICAgICAgIHNldExhc3RTZWxlY3RlZENlbGwobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobmV3RW5naW5lZXJJbmRleCAhPT0gY3VycmVudEVuZ2luZWVySW5kZXggfHwgbmV3RGF0ZUluZGV4ICE9PSBjdXJyZW50RGF0ZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0Q2VsbChcbiAgICAgICAgICAgICAgICAgICAgYWxsRW5naW5lZXJzW25ld0VuZ2luZWVySW5kZXhdLmlkLFxuICAgICAgICAgICAgICAgICAgICBkYXRlQ29sdW1uc1tuZXdEYXRlSW5kZXhdLmRhdGVTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIGUuY3RybEtleSB8fCBlLm1ldGFLZXksXG4gICAgICAgICAgICAgICAgICAgIGUuc2hpZnRLZXlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleURvd24pO1xuICAgICAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlS2V5RG93bik7XG4gICAgfSwgW3NlbGVjdGVkQ2VsbHMsIGxhc3RTZWxlY3RlZENlbGwsIGFsbEVuZ2luZWVycywgZGF0ZUNvbHVtbnMsIGdldFNoaWZ0LCBvbkVkaXRTaGlmdCwgc2VsZWN0Q2VsbF0pO1xuXG4gICAgLy8gR2xvYmFsIGNsaWNrIGhhbmRsZXIgdG8gY2xvc2UgY29udGV4dCBtZW51XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgaGFuZGxlR2xvYmFsQ2xpY2sgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgICAgICBjbG9zZUNvbnRleHRNZW51KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGNvbnRleHRNZW51LnZpc2libGUpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVHbG9iYWxDbGljayk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUdsb2JhbENsaWNrKTtcbiAgICAgICAgfTtcbiAgICB9LCBbY29udGV4dE1lbnUudmlzaWJsZSwgY2xvc2VDb250ZXh0TWVudV0pO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHNoaWZ0IHN0YXRpc3RpY3NcbiAgICBjb25zdCBzaGlmdFN0YXRzID0gdXNlTWVtbygoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRzID0ge1xuICAgICAgICAgICAgTTogMCxcbiAgICAgICAgICAgIEU6IDAsXG4gICAgICAgICAgICBOOiAwLFxuICAgICAgICAgICAgRDogMCxcbiAgICAgICAgICAgIEg6IDAsXG4gICAgICAgICAgICBUOiAwLFxuICAgICAgICAgICAgdG90YWw6IGFjY2Vzc2libGVTaGlmdHMubGVuZ3RoXG4gICAgICAgIH07XG4gICAgICAgIGFjY2Vzc2libGVTaGlmdHMuZm9yRWFjaChzaGlmdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaGlmdFR5cGUgPSBzaGlmdC5zaGlmdC5jaGFyQXQoMCk7IC8vIEdldCBmaXJzdCBjaGFyYWN0ZXIgKE0sIEUsIE4sIEQsIEgsIFQpXG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0YXRzLCBzaGlmdFR5cGUpKSB7XG4gICAgICAgICAgICAgICAgc3RhdHNbc2hpZnRUeXBlIGFzIGtleW9mIHR5cGVvZiBzdGF0c10rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdGF0cztcbiAgICB9LCBbYWNjZXNzaWJsZVNoaWZ0c10pO1xuXG4gICAgLy8gRXJyb3IgaGFuZGxpbmcgZm9yIGVtcHR5IGRhdGFcbiAgICBpZiAoaGVhZGVyU3ViaGVhZGVyU3RydWN0dXJlLmxlbmd0aCA9PT0gMCB8fCBhbGxFbmdpbmVlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8RW1wdHlTdGF0ZVxuICAgICAgICAgICAgICAgIG1lc3NhZ2U9XCJObyBFbmdpbmVlcnMgQXZhaWxhYmxlXCJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbj1cIk5vIGVuZ2luZWVycyBmb3VuZC4gUGxlYXNlIGNoZWNrIHlvdXIgZGF0YSBjb25maWd1cmF0aW9uLlwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgc2hpZnQtc2NoZWR1bGVyLXVuaWZpZWQgJHtjbGFzc05hbWV9YH0+XG4gICAgICAgICAgICB7LyogRW5oYW5jZWQgZGVidWcgaW5mbyBwYW5lbCAqL31cbiAgICAgICAgICAgIHtzaG93RGVidWdJbmZvICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBcIiNlMGYyZmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiMTJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTFweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tOiBcIjFweCBzb2xpZCAjMDI4NGM3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjMGM0YTZlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiBcIm1vbm9zcGFjZVwiXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAg8J+UjSBEZWJ1ZzogSGVhZGVyczoge2hlYWRlclN1YmhlYWRlclN0cnVjdHVyZS5sZW5ndGh9LCBFbmdpbmVlcnM6IHthbGxFbmdpbmVlcnMubGVuZ3RofSwgU2hpZnRzOntcIiBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzaGlmdHMubGVuZ3RofVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj7wn5OKIFNoaWZ0IExvb2t1cCBLZXlzOiB7T2JqZWN0LmtleXMoc2hpZnRMb29rdXApLmxlbmd0aH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIPCfj5fvuI8gR3JvdXBpbmc6e1wiIFwifVxuICAgICAgICAgICAgICAgICAgICAgICAge0FycmF5LmlzQXJyYXkoZ3JvdXBpbmdEZWJ1Z0luZm8pID8gZ3JvdXBpbmdEZWJ1Z0luZm8uam9pbihcIiB8IFwiKSA6IFwiRGVidWcgaW5mbyB1bmF2YWlsYWJsZVwifVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge2RlYnVnSW5mbyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKame+4jyBDb25maWc6IE5hbWU9e2RlYnVnSW5mby5hdHRyaWJ1dGVzQ29uZmlndXJlZC5uYW1lID8gXCLinIVcIiA6IFwi4p2MXCJ9LCBIZWFkZXI9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2RlYnVnSW5mby5hdHRyaWJ1dGVzQ29uZmlndXJlZC5oZWFkZXIgPyBcIuKchVwiIDogXCLinYxcIn0sIFN1YmhlYWRlcj1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGVidWdJbmZvLmF0dHJpYnV0ZXNDb25maWd1cmVkLnN1YmhlYWRlciA/IFwi4pyFXCIgOiBcIuKdjFwifSwgU1BVc2VyPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkZWJ1Z0luZm8uYXR0cmlidXRlc0NvbmZpZ3VyZWQuc3BVc2VyQXNzb2NpYXRpb24gPyBcIuKchVwiIDogXCLinYxcIn0sIFNoaWZ0PVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkZWJ1Z0luZm8uYXR0cmlidXRlc0NvbmZpZ3VyZWQuc2hpZnRBc3NvY2lhdGlvbiA/IFwi4pyFXCIgOiBcIuKdjFwifSwgU2hpZnREYXRlPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkZWJ1Z0luZm8uYXR0cmlidXRlc0NvbmZpZ3VyZWQuc2hpZnREYXRlID8gXCLinIVcIiA6IFwi4p2MXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAge3NoaWZ0cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg8J+OryBGaXJzdCBTaGlmdDogSUQ9e3NoaWZ0c1swXT8uZW5naW5lZXJJZH0sIERhdGU9e3NoaWZ0c1swXT8uZGF0ZX0sIFR5cGU9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0eXBlb2Ygc2hpZnRzWzBdPy5kYXRlfSwgU2hpZnQ9e3NoaWZ0c1swXT8uc2hpZnR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj7wn5SRIFNhbXBsZSBLZXlzOiB7T2JqZWN0LmtleXMoc2hpZnRMb29rdXApLnNsaWNlKDAsIDMpLmpvaW4oXCIsIFwiKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICB7YWxsRW5naW5lZXJzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDwn5GkIEZpcnN0IEVuZ2luZWVyOiBJRD17YWxsRW5naW5lZXJzWzBdPy5pZH0sIE5hbWU9e2FsbEVuZ2luZWVyc1swXT8ubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICB7ZGF0ZUNvbHVtbnMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIPCfk4UgVGltZWxpbmU6IHtkYXRlQ29sdW1uc1swXT8uZGF0ZVN0cmluZ30gdG97XCIgXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2RhdGVDb2x1bW5zW2RhdGVDb2x1bW5zLmxlbmd0aCAtIDFdPy5kYXRlU3RyaW5nfSAoe2RhdGVDb2x1bW5zLmxlbmd0aH0gZGF5cylcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAg8J+UjSBUZXN0IExvb2t1cDogS2V5PXthbGxFbmdpbmVlcnNbMF0/LmlkfS17ZGF0ZUNvbHVtbnNbMF0/LmRhdGVTdHJpbmd9IEZvdW5kPVxuICAgICAgICAgICAgICAgICAgICAgICAgeyEhc2hpZnRMb29rdXBbYCR7YWxsRW5naW5lZXJzWzBdPy5pZH0tJHtkYXRlQ29sdW1uc1swXT8uZGF0ZVN0cmluZ31gXX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICDwn5SNIEVuZ2luZWVyIElEIFR5cGVzOiBFbmdpbmVlcj17dHlwZW9mIGFsbEVuZ2luZWVyc1swXT8uaWR9LCBTaGlmdD1cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0eXBlb2Ygc2hpZnRzWzBdPy5lbmdpbmVlcklkfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIPCflI0gRGF0ZSBNYXRjaCBUZXN0OiBUaW1lbGluZT17ZGF0ZUNvbHVtbnNbMF0/LmRhdGVTdHJpbmd9LCBTaGlmdD17c2hpZnRzWzBdPy5kYXRlfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIPCfk4ggUGVyZm9ybWFuY2U6IHtPYmplY3Qua2V5cyhzaGlmdExvb2t1cCkubGVuZ3RofSBsb29rdXAga2V5cyx7XCIgXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICB7YWxsRW5naW5lZXJzLmxlbmd0aCAqIGRhdGVDb2x1bW5zLmxlbmd0aH0gdG90YWwgY2VsbHNcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICDwn5OKIFNoaWZ0IFN0YXRzOiBNOntzaGlmdFN0YXRzLk19IEU6e3NoaWZ0U3RhdHMuRX0gTjp7c2hpZnRTdGF0cy5OfSBEOntzaGlmdFN0YXRzLkR9IEg6XG4gICAgICAgICAgICAgICAgICAgICAgICB7c2hpZnRTdGF0cy5IfSBUOntzaGlmdFN0YXRzLlR9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRDZWxscy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg8J+OryBTZWxlY3RlZDoge3NlbGVjdGVkQ2VsbHMubGVuZ3RofSBjZWxsKHMpe1wiIFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZENlbGxzLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGAoJHthbGxFbmdpbmVlcnMuZmluZChlID0+IGUuaWQgPT09IHNlbGVjdGVkQ2VsbHNbMF0uZW5naW5lZXJJZCk/Lm5hbWV9IG9uICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2VsbHNbMF0uZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCJ9e1wiIFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gQ3RybCtjbGljazogdG9nZ2xlLCBTaGlmdCtjbGljazogcmFuZ2UsIEFycm93czogbmF2aWdhdGUsIEVudGVyL1NwYWNlOiBlZGl0LCBFc2M6IGNsZWFyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjZjBmMGYwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogXCI4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz7wn5SNIEZpbmQgZW5naW5lZXJzIHdpdGggc2hpZnRzOjwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cHJlIHN0eWxlPXt7IGZvbnRTaXplOiBcIjlweFwiLCBvdmVyZmxvdzogXCJhdXRvXCIsIG1heEhlaWdodDogXCI4MHB4XCIgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVuZ2luZWVyc1dpdGhTaGlmdHMgPSBhbGxFbmdpbmVlcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZW5nID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNTaGlmdCA9IHNoaWZ0TG9va3VwW2Ake2VuZy5pZH0tJHtkYXRlQ29sdW1uc1swXT8uZGF0ZVN0cmluZ31gXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzU2hpZnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDAsIDMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZWVyc1dpdGhTaGlmdHMubWFwKGVuZyA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBlbmcuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZW5nLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBlbmcuaGVhZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmhlYWRlcjogZW5nLnN1YmhlYWRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNTaGlmdE9uRmlyc3REYXRlOiAhIXNoaWZ0TG9va3VwW2Ake2VuZy5pZH0tJHtkYXRlQ29sdW1uc1swXT8uZGF0ZVN0cmluZ31gXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wcmU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogXCI0cHhcIiB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPvCflI0gU2FtcGxlIHNoaWZ0IGVuZ2luZWVyIElEczo8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHByZSBzdHlsZT17eyBmb250U2l6ZTogXCI5cHhcIiwgb3ZlcmZsb3c6IFwiYXV0b1wiLCBtYXhIZWlnaHQ6IFwiODBweFwiIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnRzLnNsaWNlKDAsIDUpLm1hcChzaGlmdCA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnRJZDogc2hpZnQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVlcklkOiBzaGlmdC5lbmdpbmVlcklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnQ6IHNoaWZ0LnNoaWZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZTogc2hpZnQuZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wcmU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogXCI0cHhcIiB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPvCfkqEgQ2hlY2s6IERvIGFueSBlbmdpbmVlciBJRHMgbWF0Y2ggc2hpZnQgZW5naW5lZXIgSURzPzwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cHJlIHN0eWxlPXt7IGZvbnRTaXplOiBcIjlweFwiLCBvdmVyZmxvdzogXCJhdXRvXCIsIG1heEhlaWdodDogXCI2MHB4XCIgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoaWZ0RW5naW5lZXJJZHMgPSBuZXcgU2V0KHNoaWZ0cy5tYXAocyA9PiBzLmVuZ2luZWVySWQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW5naW5lZXJJZHMgPSBuZXcgU2V0KGFsbEVuZ2luZWVycy5tYXAoZSA9PiBlLmlkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSBbLi4uc2hpZnRFbmdpbmVlcklkc10uZmlsdGVyKGlkID0+IGVuZ2luZWVySWRzLmhhcyhpZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b3RhbFNoaWZ0RW5naW5lZXJzID0gc2hpZnRFbmdpbmVlcklkcy5zaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b3RhbEVuZ2luZWVycyA9IGVuZ2luZWVySWRzLnNpemU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoaW5nSWRzOiBtYXRjaGVzLnNsaWNlKDAsIDMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsTWF0Y2hlczogbWF0Y2hlcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxTaGlmdEVuZ2luZWVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3RhbEVuZ2luZWVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYW1wbGVTaGlmdElkczogWy4uLnNoaWZ0RW5naW5lZXJJZHNdLnNsaWNlKDAsIDMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbXBsZUVuZ2luZWVySWRzOiBbLi4uZW5naW5lZXJJZHNdLnNsaWNlKDAsIDMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wcmU+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiBcIjhweFwiIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+8J+UjSBSYXcgU1BVc2VyIE9iamVjdCBQcm9wZXJ0aWVzOjwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cHJlIHN0eWxlPXt7IGZvbnRTaXplOiBcIjlweFwiLCBvdmVyZmxvdzogXCJhdXRvXCIsIG1heEhlaWdodDogXCI4MHB4XCIgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2FsbEVuZ2luZWVycy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBhbGxFbmdpbmVlcnNbMF0ubWVuZGl4T2JqZWN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsT3duUHJvcGVydGllczogT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYWxsRW5naW5lZXJzWzBdLm1lbmRpeE9iamVjdCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGxQcm90b3R5cGVQcm9wZXJ0aWVzOiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYWxsRW5naW5lZXJzWzBdLm1lbmRpeE9iamVjdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RLZXlzOiBPYmplY3Qua2V5cyhhbGxFbmdpbmVlcnNbMF0ubWVuZGl4T2JqZWN0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdEFjY2Vzczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVzZXJuYW1lOiAoYWxsRW5naW5lZXJzWzBdLm1lbmRpeE9iamVjdCBhcyBhbnkpLlVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5hbWU6IChhbGxFbmdpbmVlcnNbMF0ubWVuZGl4T2JqZWN0IGFzIGFueSkuTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbWFpbDogKGFsbEVuZ2luZWVyc1swXS5tZW5kaXhPYmplY3QgYXMgYW55KS5FbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBYmJyZXZpYXRpb246IChhbGxFbmdpbmVlcnNbMF0ubWVuZGl4T2JqZWN0IGFzIGFueSkuQWJicmV2aWF0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAoYWxsRW5naW5lZXJzWzBdLm1lbmRpeE9iamVjdCBhcyBhbnkpLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mQ2hlY2s6IHR5cGVvZiBhbGxFbmdpbmVlcnNbMF0ubWVuZGl4T2JqZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RydWN0b3JOYW1lOiBhbGxFbmdpbmVlcnNbMF0ubWVuZGl4T2JqZWN0LmNvbnN0cnVjdG9yLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIk5vIGVuZ2luZWVyc1wifVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wcmU+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiBcIjhweFwiIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+8J+UjSBSYXcgQ2FsZW5kYXJFdmVudCBPYmplY3QgUHJvcGVydGllczo8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHByZSBzdHlsZT17eyBmb250U2l6ZTogXCI5cHhcIiwgb3ZlcmZsb3c6IFwiYXV0b1wiLCBtYXhIZWlnaHQ6IFwiODBweFwiIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzaGlmdHMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IEpTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogc2hpZnRzWzBdLm1lbmRpeE9iamVjdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbFByb3BlcnRpZXM6IE9iamVjdC5rZXlzKHNoaWZ0c1swXS5tZW5kaXhPYmplY3QpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0QWNjZXNzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU1BVc2VyOiAoc2hpZnRzWzBdLm1lbmRpeE9iamVjdCBhcyBhbnkpLlNQVXNlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDYWxlbmRhckV2ZW50c19TUFVzZXI6IChzaGlmdHNbMF0ubWVuZGl4T2JqZWN0IGFzIGFueSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLkNhbGVuZGFyRXZlbnRzX1NQVXNlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbmdpbmVlcjogKHNoaWZ0c1swXS5tZW5kaXhPYmplY3QgYXMgYW55KS5FbmdpbmVlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVc2VyOiAoc2hpZnRzWzBdLm1lbmRpeE9iamVjdCBhcyBhbnkpLlVzZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIk5vIHNoaWZ0c1wifVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wcmU+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2NoZWR1bGVyLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIHsvKiBIZWFkZXIgUm93ICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2NoZWR1bGVyLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImVuZ2luZWVyLWNvbHVtbi1oZWFkZXJcIj5FbmdpbmVlcjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWNvbnRhaW5lclwiIHJlZj17aGVhZGVyU2Nyb2xsUmVmfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2RhdGVDb2x1bW5zLm1hcCgoY29sLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpZHh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BkYXRlLWhlYWRlciAke2NvbC5pc1RvZGF5ID8gXCJkYXRlLWhlYWRlci10b2RheVwiIDogXCJcIn0gJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2wuaXNXZWVrZW5kID8gXCJkYXRlLWhlYWRlci13ZWVrZW5kXCIgOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRlLWRheVwiPntjb2wuZGF0ZS5nZXREYXRlKCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRhdGUtbW9udGhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29sLmRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZW5cIiwgeyBtb250aDogXCJzaG9ydFwiIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIENvbnRlbnQgQXJlYSAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNjaGVkdWxlci1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZW5naW5lZXItbmFtZXMtY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aGVhZGVyU3ViaGVhZGVyU3RydWN0dXJlLm1hcChoZWFkZXJEYXRhID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aGVhZGVyRGF0YS5oZWFkZXJJZH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGVhbS1uYW1lLWNlbGxcIj57aGVhZGVyRGF0YS5oZWFkZXJOYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aGVhZGVyRGF0YS5zdWJoZWFkZXJzLm1hcChzdWJoZWFkZXIgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2Ake2hlYWRlckRhdGEuaGVhZGVySWR9LSR7c3ViaGVhZGVyLm5hbWV9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYW5lLW5hbWUtY2VsbFwiPntzdWJoZWFkZXIubmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c3ViaGVhZGVyLmVuZ2luZWVycy5tYXAoZW5naW5lZXIgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZW5naW5lZXIuaWR9IGNsYXNzTmFtZT1cImVuZ2luZWVyLW5hbWUtY2VsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2VuZ2luZWVyLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWNvbnRhaW5lclwiIHJlZj17Y29udGVudFNjcm9sbFJlZn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aGVhZGVyU3ViaGVhZGVyU3RydWN0dXJlLm1hcChoZWFkZXJEYXRhID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2hlYWRlckRhdGEuaGVhZGVySWR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZWFtLXRpbWVsaW5lLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRlQ29sdW1ucy5tYXAoKF8sIGlkeCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aWR4fSBjbGFzc05hbWU9XCJ0ZWFtLXRpbWVsaW5lLWNlbGxcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2hlYWRlckRhdGEuc3ViaGVhZGVycy5tYXAoc3ViaGVhZGVyID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17YCR7aGVhZGVyRGF0YS5oZWFkZXJJZH0tJHtzdWJoZWFkZXIubmFtZX1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYW5lLXRpbWVsaW5lLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2RhdGVDb2x1bW5zLm1hcCgoXywgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2lkeH0gY2xhc3NOYW1lPVwibGFuZS10aW1lbGluZS1jZWxsXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzdWJoZWFkZXIuZW5naW5lZXJzLm1hcChlbmdpbmVlciA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZW5naW5lZXIuaWR9IGNsYXNzTmFtZT1cImVuZ2luZWVyLXRpbWVsaW5lLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRlQ29sdW1ucy5tYXAoKGNvbCwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoaWZ0ID0gZ2V0U2hpZnQoZW5naW5lZXIuaWQsIGNvbC5kYXRlU3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEYXlDZWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtgJHtlbmdpbmVlci5pZH0tJHtpZHh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlPXtjb2wuZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVlcj17ZW5naW5lZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnQ9e3NoaWZ0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVG9kYXk9e2NvbC5pc1RvZGF5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzV2Vla2VuZD17Y29sLmlzV2Vla2VuZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkPXtpc0NlbGxTZWxlY3RlZChlbmdpbmVlci5pZCwgY29sLmRhdGVTdHJpbmcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0c0xvYWRpbmc9e3NoaWZ0c0xvYWRpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Eb3VibGVDbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNoaWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXhpc3Rpbmcgc2hpZnQ6IGVkaXQgaXQgKHNhbWUgYXMgY29udGV4dCBtZW51IGVkaXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uRWRpdFNoaWZ0Py5jYW5FeGVjdXRlICYmICFvbkVkaXRTaGlmdC5pc0V4ZWN1dGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dFNoaWZ0SWQ/LnNldFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0U2hpZnRJZC5zZXRWYWx1ZShzaGlmdC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FZGl0U2hpZnQuZXhlY3V0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRW1wdHkgY2VsbDogY3JlYXRlIG5ldyBzaGlmdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkNyZWF0ZVNoaWZ0Py5jYW5FeGVjdXRlICYmICFvbkNyZWF0ZVNoaWZ0LmlzRXhlY3V0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0RW5naW5lZXJJZD8uc2V0VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRFbmdpbmVlcklkLnNldFZhbHVlKGVuZ2luZWVyLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dERhdGU/LnNldFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0RGF0ZS5zZXRWYWx1ZShjb2wuZGF0ZVN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DcmVhdGVTaGlmdC5leGVjdXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgRXJyb3IgaW4gb25Eb3VibGVDbGljayBmb3IgJHtlbmdpbmVlci5uYW1lfTpgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNlbGxDbGljaz17ZSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVDZWxsQ2xpY2soXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbC5kYXRlU3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5jdHJsS2V5IHx8IGUubWV0YUtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc2hpZnRLZXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNvbnRleHRNZW51PXtoYW5kbGVDZWxsQ29udGV4dE1lbnV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiByZWY9e2luZmluaXRlU2Nyb2xsUmVmfSBjbGFzc05hbWU9XCJzZW50aW5lbFwiIHN0eWxlPXt7IGhlaWdodDogXCIyMHB4XCIsIHZpc2liaWxpdHk6IFwiaGlkZGVuXCIgfX0gLz5cblxuICAgICAgICAgICAgey8qIENvbnRleHQgTWVudSAqL31cbiAgICAgICAgICAgIDxDb250ZXh0TWVudVxuICAgICAgICAgICAgICAgIHZpc2libGU9e2NvbnRleHRNZW51LnZpc2libGV9XG4gICAgICAgICAgICAgICAgeD17Y29udGV4dE1lbnUueH1cbiAgICAgICAgICAgICAgICB5PXtjb250ZXh0TWVudS55fVxuICAgICAgICAgICAgICAgIG9wdGlvbnM9e2NvbnRleHRNZW51Lm9wdGlvbnN9XG4gICAgICAgICAgICAgICAgb25DbG9zZT17Y2xvc2VDb250ZXh0TWVudX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuXG4vLyBFeHBvcnQgd2l0aCBlcnJvciBib3VuZGFyeSBmb3IgcHJvZHVjdGlvbiByZXNpbGllbmNlXG5leHBvcnQgZGVmYXVsdCB3aXRoRXJyb3JCb3VuZGFyeShTY2hlZHVsZUdyaWQpO1xuIiwiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IExpc3RWYWx1ZSwgT2JqZWN0SXRlbSwgTGlzdEF0dHJpYnV0ZVZhbHVlLCBMaXN0UmVmZXJlbmNlVmFsdWUgfSBmcm9tIFwibWVuZGl4XCI7XG5pbXBvcnQgeyBVc2VTaGlmdERhdGFSZXR1cm4sIEVuZ2luZWVyLCBTaGlmdEFzc2lnbm1lbnQsIFNoaWZ0VHlwZSwgVmFsaWRhdGlvbkVycm9yIH0gZnJvbSBcIi4uL3R5cGVzL3NoaWZ0U2NoZWR1bGVyXCI7XG5cbmludGVyZmFjZSBEYXRhU3RhdGUge1xuICAgIGVuZ2luZWVyczogRW5naW5lZXJbXTtcbiAgICBzaGlmdHM6IFNoaWZ0QXNzaWdubWVudFtdO1xuICAgIHNoaWZ0c0xvYWRpbmc6IGJvb2xlYW47XG4gICAgZXJyb3I6IFZhbGlkYXRpb25FcnJvciB8IG51bGw7XG59XG5cbmludGVyZmFjZSBVc2VTaGlmdERhdGFQcm9wcyB7XG4gICAgZW5naW5lZXJzU291cmNlOiBMaXN0VmFsdWU7XG4gICAgc2hpZnRzU291cmNlPzogTGlzdFZhbHVlO1xuICAgIG5hbWVBdHRyaWJ1dGU/OiBMaXN0QXR0cmlidXRlVmFsdWU8c3RyaW5nPjtcbiAgICBoZWFkZXJBdHRyaWJ1dGU/OiBMaXN0QXR0cmlidXRlVmFsdWU8c3RyaW5nPjtcbiAgICBzdWJoZWFkZXJBdHRyaWJ1dGU/OiBMaXN0QXR0cmlidXRlVmFsdWU8c3RyaW5nPjtcbiAgICBzdGFydFRpbWVBdHRyaWJ1dGU/OiBMaXN0QXR0cmlidXRlVmFsdWU8RGF0ZT47XG4gICAgZGF5VHlwZUF0dHJpYnV0ZT86IExpc3RBdHRyaWJ1dGVWYWx1ZTxzdHJpbmc+O1xuICAgIHN0YXR1c0F0dHJpYnV0ZT86IExpc3RBdHRyaWJ1dGVWYWx1ZTxzdHJpbmc+O1xuICAgIHNwVXNlckFzc29jaWF0aW9uPzogTGlzdFJlZmVyZW5jZVZhbHVlO1xuICAgIHNoaWZ0QXNzb2NpYXRpb24/OiBMaXN0UmVmZXJlbmNlVmFsdWU7XG4gICAgc2hpZnREYXRlQXR0cmlidXRlPzogTGlzdEF0dHJpYnV0ZVZhbHVlPERhdGU+O1xufVxuXG5leHBvcnQgY29uc3QgdXNlU2hpZnREYXRhID0gKHtcbiAgICBlbmdpbmVlcnNTb3VyY2UsXG4gICAgc2hpZnRzU291cmNlLFxuICAgIG5hbWVBdHRyaWJ1dGUsXG4gICAgaGVhZGVyQXR0cmlidXRlLFxuICAgIHN1YmhlYWRlckF0dHJpYnV0ZSxcbiAgICBzdGFydFRpbWVBdHRyaWJ1dGUsXG4gICAgZGF5VHlwZUF0dHJpYnV0ZSxcbiAgICBzdGF0dXNBdHRyaWJ1dGUsXG4gICAgc3BVc2VyQXNzb2NpYXRpb24sXG4gICAgc2hpZnRBc3NvY2lhdGlvbixcbiAgICBzaGlmdERhdGVBdHRyaWJ1dGVcbn06IFVzZVNoaWZ0RGF0YVByb3BzKTogVXNlU2hpZnREYXRhUmV0dXJuID0+IHtcbiAgICBjb25zdCBbZGF0YVN0YXRlLCBzZXREYXRhU3RhdGVdID0gdXNlU3RhdGU8RGF0YVN0YXRlPih7XG4gICAgICAgIGVuZ2luZWVyczogW10sXG4gICAgICAgIHNoaWZ0czogW10sXG4gICAgICAgIHNoaWZ0c0xvYWRpbmc6IHRydWUsXG4gICAgICAgIGVycm9yOiBudWxsXG4gICAgfSk7XG5cbiAgICAvLyBWYWxpZGF0aW9uIGhlbHBlclxuICAgIGNvbnN0IHZhbGlkYXRlQ29uZmlndXJhdGlvbiA9IHVzZUNhbGxiYWNrKCgpOiBWYWxpZGF0aW9uRXJyb3IgfCBudWxsID0+IHtcbiAgICAgICAgaWYgKCFlbmdpbmVlcnNTb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB7IG1lc3NhZ2U6IFwiRW5naW5lZXJzIGRhdGEgc291cmNlIGlzIHJlcXVpcmVkXCIsIHByb3BlcnR5OiBcImVuZ2luZWVyc1wiIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW5naW5lZXJzU291cmNlLnN0YXR1cyA9PT0gXCJ1bmF2YWlsYWJsZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4geyBtZXNzYWdlOiBcIkVuZ2luZWVycyBkYXRhIHNvdXJjZSBpcyB1bmF2YWlsYWJsZVwiLCBwcm9wZXJ0eTogXCJlbmdpbmVlcnNcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFuYW1lQXR0cmlidXRlKSB7XG4gICAgICAgICAgICByZXR1cm4geyBtZXNzYWdlOiBcIk5hbWUgYXR0cmlidXRlIGlzIHJlcXVpcmVkIGZvciBlbmdpbmVlcnNcIiwgcHJvcGVydHk6IFwibmFtZUF0dHJpYnV0ZVwiIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWhlYWRlckF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgbWVzc2FnZTogXCJIZWFkZXIgYXR0cmlidXRlIGlzIHJlcXVpcmVkIGZvciBlbmdpbmVlcnNcIiwgcHJvcGVydHk6IFwiaGVhZGVyQXR0cmlidXRlXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFZhbGlkYXRlIHNoaWZ0cyBjb25maWd1cmF0aW9uIGlmIHByb3ZpZGVkXG4gICAgICAgIGlmIChzaGlmdHNTb3VyY2UgJiYgc2hpZnRzU291cmNlLnN0YXR1cyA9PT0gXCJ1bmF2YWlsYWJsZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4geyBtZXNzYWdlOiBcIlNoaWZ0cyBkYXRhIHNvdXJjZSBpcyB1bmF2YWlsYWJsZVwiLCBwcm9wZXJ0eTogXCJzaGlmdHNcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNoaWZ0c1NvdXJjZSAmJiAhc3RhcnRUaW1lQXR0cmlidXRlKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiU3RhcnQgdGltZSBhdHRyaWJ1dGUgaXMgcmVxdWlyZWQgd2hlbiBzaGlmdHMgZGF0YSBzb3VyY2UgaXMgcHJvdmlkZWRcIixcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogXCJzdGFydFRpbWVBdHRyaWJ1dGVcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sIFtlbmdpbmVlcnNTb3VyY2UsIHNoaWZ0c1NvdXJjZSwgbmFtZUF0dHJpYnV0ZSwgaGVhZGVyQXR0cmlidXRlLCBzdGFydFRpbWVBdHRyaWJ1dGVdKTtcblxuICAgIC8vIFRyYW5zZm9ybSBNZW5kaXggZW5naW5lZXJzIGRhdGEgd2l0aCBlcnJvciBoYW5kbGluZ1xuICAgIGNvbnN0IHRyYW5zZm9ybWVkRW5naW5lZXJzID0gdXNlTWVtbygoKTogRW5naW5lZXJbXSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoZW5naW5lZXJzU291cmNlLnN0YXR1cyAhPT0gXCJhdmFpbGFibGVcIiB8fCAhZW5naW5lZXJzU291cmNlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZW5naW5lZXJzU291cmNlLml0ZW1zLm1hcCgoaXRlbTogT2JqZWN0SXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIERlYnVnOiBDaGVjayBhdHRyaWJ1dGUgY29uZmlndXJhdGlvbiAod2lsbCBiZSBzaG93biBpbiBtYWluIGRlYnVnIHBhbmVsKVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFN0b3JlIGRlYnVnIGluZm8gdG8gYmUgZGlzcGxheWVkIGluIG1haW4gcGFuZWwgKG5vIGZsb2F0aW5nIGRlYnVnIGJveClcblxuICAgICAgICAgICAgICAgICAgICAvLyBBY2Nlc3MgU1BVc2VyIHByb3BlcnRpZXMgdGhyb3VnaCBjb25maWd1cmVkIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IG5hbWVBdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gbmFtZUF0dHJpYnV0ZS5nZXQoaXRlbSkuc3RhdHVzID09PSBcImF2YWlsYWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBuYW1lQXR0cmlidXRlLmdldChpdGVtKS52YWx1ZSB8fCBcIlVua25vd25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJVbmtub3duXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogXCJVbmtub3duXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gaGVhZGVyQXR0cmlidXRlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGhlYWRlckF0dHJpYnV0ZS5nZXQoaXRlbSkuc3RhdHVzID09PSBcImF2YWlsYWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBoZWFkZXJBdHRyaWJ1dGUuZ2V0KGl0ZW0pLnZhbHVlIHx8IFwiQWxsIEVuZ2luZWVyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIkFsbCBFbmdpbmVlcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOiBcIkFsbCBFbmdpbmVlcnNcIjtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJoZWFkZXIgPSBzdWJoZWFkZXJBdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gc3ViaGVhZGVyQXR0cmlidXRlLmdldChpdGVtKS5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHN1YmhlYWRlckF0dHJpYnV0ZS5nZXQoaXRlbSkudmFsdWUgfHwgXCJHZW5lcmFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiR2VuZXJhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiR2VuZXJhbFwiO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogaXRlbS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJoZWFkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW5kaXhPYmplY3Q6IGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgfSBhcyBFbmdpbmVlcjtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGl0ZW0uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlVua25vd25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJFcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViaGVhZGVyOiBcIkdlbmVyYWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbmRpeE9iamVjdDogaXRlbVxuICAgICAgICAgICAgICAgICAgICB9IGFzIEVuZ2luZWVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgfSwgW2VuZ2luZWVyc1NvdXJjZSwgbmFtZUF0dHJpYnV0ZSwgaGVhZGVyQXR0cmlidXRlLCBzdWJoZWFkZXJBdHRyaWJ1dGVdKTtcblxuICAgIC8vIFRyYW5zZm9ybSBNZW5kaXggc2hpZnRzIGRhdGEgd2l0aCBlcnJvciBoYW5kbGluZ1xuICAgIGNvbnN0IHRyYW5zZm9ybWVkU2hpZnRzID0gdXNlTWVtbygoKTogU2hpZnRBc3NpZ25tZW50W10gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCFzaGlmdHNTb3VyY2UgfHwgc2hpZnRzU291cmNlLnN0YXR1cyAhPT0gXCJhdmFpbGFibGVcIiB8fCAhc2hpZnRzU291cmNlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBEZWJ1ZyBjb3VudGVycyAod2lsbCBiZSBzaG93biBpbiBkZWJ1ZyBwYW5lbCBpZiBuZWVkZWQpXG4gICAgICAgICAgICAvLyBsZXQgc3VjY2Vzc2Z1bEFzc29jaWF0aW9ucyA9IDA7XG4gICAgICAgICAgICAvLyBsZXQgdG90YWxTaGlmdHMgPSAwO1xuXG4gICAgICAgICAgICBjb25zdCBzaGlmdHMgPSBzaGlmdHNTb3VyY2UuaXRlbXNcbiAgICAgICAgICAgICAgICAubWFwKChpdGVtOiBPYmplY3RJdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydFRpbWUgPSBzdGFydFRpbWVBdHRyaWJ1dGU/LmdldChpdGVtKS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRheVR5cGUgPSBkYXlUeXBlQXR0cmlidXRlPy5nZXQoaXRlbSkudmFsdWUgfHwgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHN0YXR1c0F0dHJpYnV0ZT8uZ2V0KGl0ZW0pLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUcnkgdG8gZ2V0IHRoZSBhY3R1YWwgc2hpZnQgZGF0ZSBmcm9tIENhbGVuZGFyRXZlbnRzX1NoaWZ0L1NoaWZ0L0RhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzaGlmdERhdGU6IERhdGUgfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hpZnRBc3NvY2lhdGlvbiAmJiBzaGlmdERhdGVBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGlmdFJlZiA9IHNoaWZ0QXNzb2NpYXRpb24uZ2V0KGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaGlmdFJlZi5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCIgJiYgc2hpZnRSZWYudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hpZnREYXRlVmFsdWUgPSBzaGlmdERhdGVBdHRyaWJ1dGUuZ2V0KHNoaWZ0UmVmLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNoaWZ0RGF0ZVZhbHVlLnN0YXR1cyA9PT0gXCJhdmFpbGFibGVcIiAmJiBzaGlmdERhdGVWYWx1ZS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnREYXRlID0gc2hpZnREYXRlVmFsdWUudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERlYnVnOiBBc3NvY2lhdGlvbiBhY2Nlc3MgKHdpbGwgYmUgc2hvd24gaW4gbWFpbiBkZWJ1ZyBwYW5lbClcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJ5IHRvIGdldCBlbmdpbmVlciBJRCB0aHJvdWdoIHRoZSBTUFVzZXIgYXNzb2NpYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbmdpbmVlcklkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVzZSB0aGUgc3BVc2VyQXNzb2NpYXRpb24gdG8gZ2V0IHRoZSByZWZlcmVuY2VkIFNQVXNlclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwVXNlckFzc29jaWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BVc2VyUmVmID0gc3BVc2VyQXNzb2NpYXRpb24uZ2V0KGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcFVzZXJSZWYuc3RhdHVzID09PSBcImF2YWlsYWJsZVwiICYmIHNwVXNlclJlZi52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIFNQVXNlciBJRCBmcm9tIHRoZSBhc3NvY2lhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVlcklkID0gc3BVc2VyUmVmLnZhbHVlLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdWNjZXNzZnVsQXNzb2NpYXRpb25zKys7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGVidWc6IEFzc29jaWF0aW9uIHN1Y2Nlc3NmdWwgKHdpbGwgYmUgc2hvd24gaW4gbWFpbiBkZWJ1ZyBwYW5lbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZhbGxiYWNrIHRvIHNoaWZ0IElEIGlmIG5vIGFzc29jaWF0aW9uIGZvdW5kXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVuZ2luZWVySWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVlcklkID0gaXRlbS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG90YWxTaGlmdHMrKztcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXNlIHNoaWZ0RGF0ZSBpZiBhdmFpbGFibGUsIG90aGVyd2lzZSBmYWxsIGJhY2sgdG8gc3RhcnRUaW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBuZWl0aGVyIGlzIGF2YWlsYWJsZSwgc2tpcCB0aGlzIHNoaWZ0IChkb24ndCBzaG93IHVuZGVmaW5lZCBldmVudHMpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaW5hbERhdGUgPSBzaGlmdERhdGUgfHwgc3RhcnRUaW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmaW5hbERhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIHNoaWZ0cyB3aXRob3V0IHByb3BlciBkYXRlcyAtIGRvbid0IHNob3cgdGhlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpdGVtLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGU6IGZpbmFsRGF0ZS50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVlcklkOiBlbmdpbmVlcklkIHx8IGl0ZW0uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnQ6IChkYXlUeXBlIGFzIFNoaWZ0VHlwZSkgfHwgXCJNXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0RGF0ZTogZmluYWxEYXRlLCAvLyBUaGUgYWN0dWFsIHNoaWZ0IGRhdGUgZnJvbSBDYWxlbmRhckV2ZW50c19TaGlmdC9TaGlmdC9EYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVuZGl4T2JqZWN0OiBpdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGFzIFNoaWZ0QXNzaWdubWVudDtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNraXAgaW52YWxpZCBzaGlmdHMgLSBkb24ndCBzaG93IHRoZW0gd2l0aCBmYWtlIGRhdGVzXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoc2hpZnQpOiBzaGlmdCBpcyBTaGlmdEFzc2lnbm1lbnQgPT4gc2hpZnQgIT09IG51bGwpO1xuXG4gICAgICAgICAgICAvLyBEZWJ1ZzogQXNzb2NpYXRpb24gc3VjY2VzcyByYXRlICh3aWxsIGJlIHNob3duIGluIG1haW4gZGVidWcgcGFuZWwpXG5cbiAgICAgICAgICAgIHJldHVybiBzaGlmdHM7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICB9LCBbXG4gICAgICAgIHNoaWZ0c1NvdXJjZSxcbiAgICAgICAgc3RhcnRUaW1lQXR0cmlidXRlLFxuICAgICAgICBkYXlUeXBlQXR0cmlidXRlLFxuICAgICAgICBzdGF0dXNBdHRyaWJ1dGUsXG4gICAgICAgIHNwVXNlckFzc29jaWF0aW9uLFxuICAgICAgICBzaGlmdEFzc29jaWF0aW9uLFxuICAgICAgICBzaGlmdERhdGVBdHRyaWJ1dGVcbiAgICBdKTtcblxuICAgIC8vIE1haW4gZGF0YSBwcm9jZXNzaW5nIGVmZmVjdCB3aXRoIHZhbGlkYXRpb25cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3IgPSB2YWxpZGF0ZUNvbmZpZ3VyYXRpb24oKTtcblxuICAgICAgICBpZiAodmFsaWRhdGlvbkVycm9yKSB7XG4gICAgICAgICAgICBzZXREYXRhU3RhdGUoe1xuICAgICAgICAgICAgICAgIGVuZ2luZWVyczogW10sXG4gICAgICAgICAgICAgICAgc2hpZnRzOiBbXSxcbiAgICAgICAgICAgICAgICBzaGlmdHNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogdmFsaWRhdGlvbkVycm9yXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNoaWZ0c0xvYWRpbmcgPSBzaGlmdHNTb3VyY2U/LnN0YXR1cyA9PT0gXCJsb2FkaW5nXCIgfHwgZmFsc2U7XG5cbiAgICAgICAgc2V0RGF0YVN0YXRlKHtcbiAgICAgICAgICAgIGVuZ2luZWVyczogdHJhbnNmb3JtZWRFbmdpbmVlcnMsXG4gICAgICAgICAgICBzaGlmdHM6IHRyYW5zZm9ybWVkU2hpZnRzLFxuICAgICAgICAgICAgc2hpZnRzTG9hZGluZyxcbiAgICAgICAgICAgIGVycm9yOiBudWxsXG4gICAgICAgIH0pO1xuICAgIH0sIFt2YWxpZGF0ZUNvbmZpZ3VyYXRpb24sIHRyYW5zZm9ybWVkRW5naW5lZXJzLCB0cmFuc2Zvcm1lZFNoaWZ0cywgZW5naW5lZXJzU291cmNlLnN0YXR1cywgc2hpZnRzU291cmNlPy5zdGF0dXNdKTtcblxuICAgIC8vIEVuaGFuY2VkIGhlbHBlciBtZXRob2RzIHdpdGggZXJyb3IgaGFuZGxpbmdcbiAgICBjb25zdCBnZXRTaGlmdHNGb3JFbmdpbmVlciA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoZW5naW5lZXJJZDogc3RyaW5nKTogU2hpZnRBc3NpZ25tZW50W10gPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVN0YXRlLnNoaWZ0cy5maWx0ZXIoc2hpZnQgPT4gc2hpZnQuZW5naW5lZXJJZCA9PT0gZW5naW5lZXJJZCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW2RhdGFTdGF0ZS5zaGlmdHNdXG4gICAgKTtcblxuICAgIGNvbnN0IGdldEVuZ2luZWVyc0J5VGVhbSA9IHVzZUNhbGxiYWNrKCgpOiB7IFtoZWFkZXI6IHN0cmluZ106IEVuZ2luZWVyW10gfSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBoZWFkZXJHcm91cHM6IHsgW2hlYWRlcjogc3RyaW5nXTogRW5naW5lZXJbXSB9ID0ge307XG4gICAgICAgICAgICBkYXRhU3RhdGUuZW5naW5lZXJzLmZvckVhY2goZW5naW5lZXIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlck5hbWUgPSBlbmdpbmVlci5oZWFkZXI7XG4gICAgICAgICAgICAgICAgaWYgKCFoZWFkZXJHcm91cHNbaGVhZGVyTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyR3JvdXBzW2hlYWRlck5hbWVdID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGhlYWRlckdyb3Vwc1toZWFkZXJOYW1lXS5wdXNoKGVuZ2luZWVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGhlYWRlckdyb3VwcztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfVxuICAgIH0sIFtkYXRhU3RhdGUuZW5naW5lZXJzXSk7XG5cbiAgICBjb25zdCBnZXRTaGlmdEZvckRhdGUgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKGVuZ2luZWVySWQ6IHN0cmluZywgZGF0ZTogc3RyaW5nKTogU2hpZnRBc3NpZ25tZW50IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFTdGF0ZS5zaGlmdHMuZmluZChzaGlmdCA9PiBzaGlmdC5lbmdpbmVlcklkID09PSBlbmdpbmVlcklkICYmIHNoaWZ0LmRhdGUgPT09IGRhdGUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbZGF0YVN0YXRlLnNoaWZ0c11cbiAgICApO1xuXG4gICAgY29uc3QgdXBkYXRlU2hpZnQgPSB1c2VDYWxsYmFjaygoc2hpZnRJZDogc3RyaW5nLCB1cGRhdGVzOiBQYXJ0aWFsPFNoaWZ0QXNzaWdubWVudD4pID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNldERhdGFTdGF0ZShwcmV2ID0+ICh7XG4gICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICBzaGlmdHM6IHByZXYuc2hpZnRzLm1hcChzaGlmdCA9PiAoc2hpZnQuaWQgPT09IHNoaWZ0SWQgPyB7IC4uLnNoaWZ0LCAuLi51cGRhdGVzIH0gOiBzaGlmdCkpXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyBTaWxlbnRseSBmYWlsXG4gICAgICAgIH1cbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCBnZXRFbmdpbmVlckJ5SWQgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKGVuZ2luZWVySWQ6IHN0cmluZyk6IEVuZ2luZWVyIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFTdGF0ZS5lbmdpbmVlcnMuZmluZChlbmdpbmVlciA9PiBlbmdpbmVlci5pZCA9PT0gZW5naW5lZXJJZCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtkYXRhU3RhdGUuZW5naW5lZXJzXVxuICAgICk7XG5cbiAgICBjb25zdCBnZXRTaGlmdHNCeURhdGVSYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoc3RhcnREYXRlOiBzdHJpbmcsIGVuZERhdGU6IHN0cmluZyk6IFNoaWZ0QXNzaWdubWVudFtdID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFTdGF0ZS5zaGlmdHMuZmlsdGVyKHNoaWZ0ID0+IHNoaWZ0LmRhdGUgPj0gc3RhcnREYXRlICYmIHNoaWZ0LmRhdGUgPD0gZW5kRGF0ZSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW2RhdGFTdGF0ZS5zaGlmdHNdXG4gICAgKTtcblxuICAgIGNvbnN0IHJlZnJlc2hEYXRhID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gRm9yY2UgcmUtZXZhbHVhdGlvbiBvZiBkYXRhIHNvdXJjZXNcbiAgICAgICAgICAgIHNldERhdGFTdGF0ZShwcmV2ID0+ICh7IC4uLnByZXYsIGxvYWRpbmc6IHRydWUsIGVycm9yOiBudWxsIH0pKTtcbiAgICAgICAgICAgIC8vIEluIGEgcmVhbCBpbXBsZW1lbnRhdGlvbiwgdGhpcyB3b3VsZCB0cmlnZ2VyIGRhdGEgcmVmcmVzaFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGlvbkVycm9yID0gdmFsaWRhdGVDb25maWd1cmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgc2V0RGF0YVN0YXRlKHByZXYgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGVuZ2luZWVyc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBzaGlmdHNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHZhbGlkYXRpb25FcnJvclxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBzZXREYXRhU3RhdGUocHJldiA9PiAoe1xuICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3I6IHsgbWVzc2FnZTogXCJGYWlsZWQgdG8gcmVmcmVzaCBkYXRhXCIgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgfSwgW3ZhbGlkYXRlQ29uZmlndXJhdGlvbl0pO1xuXG4gICAgLy8gQ2FsY3VsYXRlIGxvYWRpbmcgc3RhdGUgd2hlbiBuZWVkZWRcbiAgICBjb25zdCBlbmdpbmVlcnNMb2FkaW5nID0gZW5naW5lZXJzU291cmNlLnN0YXR1cyA9PT0gXCJsb2FkaW5nXCI7XG4gICAgY29uc3QgbG9hZGluZyA9IGVuZ2luZWVyc0xvYWRpbmcgfHwgZGF0YVN0YXRlLnNoaWZ0c0xvYWRpbmc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBlbmdpbmVlcnM6IGRhdGFTdGF0ZS5lbmdpbmVlcnMsXG4gICAgICAgIHNoaWZ0czogZGF0YVN0YXRlLnNoaWZ0cyxcbiAgICAgICAgbG9hZGluZyxcbiAgICAgICAgc2hpZnRzTG9hZGluZzogZGF0YVN0YXRlLnNoaWZ0c0xvYWRpbmcsXG4gICAgICAgIGVycm9yOiBkYXRhU3RhdGUuZXJyb3IsXG4gICAgICAgIGdldFNoaWZ0c0ZvckVuZ2luZWVyLFxuICAgICAgICBnZXRFbmdpbmVlcnNCeVRlYW0sXG4gICAgICAgIGdldFNoaWZ0Rm9yRGF0ZSxcbiAgICAgICAgdXBkYXRlU2hpZnQsXG4gICAgICAgIGdldEVuZ2luZWVyQnlJZCxcbiAgICAgICAgZ2V0U2hpZnRzQnlEYXRlUmFuZ2UsXG4gICAgICAgIHJlZnJlc2hEYXRhLFxuICAgICAgICBkZWJ1Z0luZm86IHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXNDb25maWd1cmVkOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogISFuYW1lQXR0cmlidXRlLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogISFoZWFkZXJBdHRyaWJ1dGUsXG4gICAgICAgICAgICAgICAgc3ViaGVhZGVyOiAhIXN1YmhlYWRlckF0dHJpYnV0ZSxcbiAgICAgICAgICAgICAgICBzcFVzZXJBc3NvY2lhdGlvbjogISFzcFVzZXJBc3NvY2lhdGlvbixcbiAgICAgICAgICAgICAgICBzaGlmdEFzc29jaWF0aW9uOiAhIXNoaWZ0QXNzb2NpYXRpb24sXG4gICAgICAgICAgICAgICAgc2hpZnREYXRlOiAhIXNoaWZ0RGF0ZUF0dHJpYnV0ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn07XG4iLCJpbXBvcnQgeyBSZWFjdEVsZW1lbnQsIGNyZWF0ZUVsZW1lbnQsIHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBTaGlmdFNjaGVkdWxlckNvbnRhaW5lclByb3BzIH0gZnJvbSBcIi4uL3R5cGluZ3MvU2hpZnRTY2hlZHVsZXJQcm9wc1wiO1xuaW1wb3J0IFNjaGVkdWxlR3JpZCBmcm9tIFwiLi9jb21wb25lbnRzL1NjaGVkdWxlR3JpZFwiO1xuaW1wb3J0IHsgdXNlU2hpZnREYXRhIH0gZnJvbSBcIi4vaG9va3MvdXNlU2hpZnREYXRhXCI7XG5pbXBvcnQgXCIuL3VpL1NoaWZ0U2NoZWR1bGVyLmNzc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gU2hpZnRTY2hlZHVsZXIoe1xuICAgIG5hbWUsXG4gICAgY2xhc3M6IGNsYXNzTmFtZSxcbiAgICBzdHlsZSxcbiAgICB0YWJJbmRleCxcbiAgICBlbmdpbmVlcnMsXG4gICAgc2hpZnRzLFxuICAgIG5hbWVBdHRyaWJ1dGUsXG4gICAgaGVhZGVyQXR0cmlidXRlLFxuICAgIHN1YmhlYWRlckF0dHJpYnV0ZSxcbiAgICBzaG93RGVidWdJbmZvLFxuICAgIHN0YXJ0VGltZUF0dHJpYnV0ZSxcbiAgICBlbmRUaW1lQXR0cmlidXRlOiBfZW5kVGltZUF0dHJpYnV0ZSxcbiAgICBkYXlUeXBlQXR0cmlidXRlLFxuICAgIGV2ZW50VHlwZUF0dHJpYnV0ZTogX2V2ZW50VHlwZUF0dHJpYnV0ZSxcbiAgICBzdGF0dXNBdHRyaWJ1dGUsXG4gICAgc3BVc2VyQXNzb2NpYXRpb24sXG4gICAgc3BVc2VyRGF0YXNvdXJjZTogX3NwVXNlckRhdGFzb3VyY2UsXG4gICAgc2hpZnRBc3NvY2lhdGlvbixcbiAgICBzaGlmdERhdGFzb3VyY2U6IF9zaGlmdERhdGFzb3VyY2UsXG4gICAgc2hpZnREYXRlQXR0cmlidXRlLFxuICAgIGNvbnRleHRTaGlmdElkLFxuICAgIGNvbnRleHRFbmdpbmVlcklkLFxuICAgIGNvbnRleHREYXRlLFxuICAgIGNvbnRleHRTZWxlY3RlZENlbGxzLFxuICAgIG9uRWRpdFNoaWZ0LFxuICAgIG9uQ3JlYXRlU2hpZnQsXG4gICAgb25EZWxldGVTaGlmdCxcbiAgICBvbkJhdGNoQ3JlYXRlLFxuICAgIG9uQmF0Y2hFZGl0LFxuICAgIG9uQmF0Y2hEZWxldGVcbn06IFNoaWZ0U2NoZWR1bGVyQ29udGFpbmVyUHJvcHMpOiBSZWFjdEVsZW1lbnQge1xuICAgIGNvbnN0IHtcbiAgICAgICAgZW5naW5lZXJzOiBlbmdpbmVlckRhdGEsXG4gICAgICAgIHNoaWZ0czogc2hpZnRzRGF0YSxcbiAgICAgICAgbG9hZGluZyxcbiAgICAgICAgc2hpZnRzTG9hZGluZyxcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIGdldFNoaWZ0c0ZvckVuZ2luZWVyLFxuICAgICAgICBnZXRFbmdpbmVlcnNCeVRlYW0sXG4gICAgICAgIGRlYnVnSW5mb1xuICAgIH0gPSB1c2VTaGlmdERhdGEoe1xuICAgICAgICBlbmdpbmVlcnNTb3VyY2U6IGVuZ2luZWVycyxcbiAgICAgICAgc2hpZnRzU291cmNlOiBzaGlmdHMsXG4gICAgICAgIG5hbWVBdHRyaWJ1dGUsXG4gICAgICAgIGhlYWRlckF0dHJpYnV0ZSxcbiAgICAgICAgc3ViaGVhZGVyQXR0cmlidXRlLFxuICAgICAgICBzdGFydFRpbWVBdHRyaWJ1dGUsXG4gICAgICAgIGRheVR5cGVBdHRyaWJ1dGUsXG4gICAgICAgIHN0YXR1c0F0dHJpYnV0ZSxcbiAgICAgICAgc3BVc2VyQXNzb2NpYXRpb24sXG4gICAgICAgIHNoaWZ0QXNzb2NpYXRpb24sXG4gICAgICAgIHNoaWZ0RGF0ZUF0dHJpYnV0ZVxuICAgIH0pO1xuXG4gICAgLy8gQWxsIGFjdGlvbiBoYW5kbGluZyBtb3ZlZCB0byBTY2hlZHVsZUdyaWQgLSBubyB3cmFwcGVyIGhhbmRsZXJzIG5lZWRlZFxuXG4gICAgY29uc3QgaGFuZGxlQmF0Y2hFZGl0ID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChzZWxlY3RlZENlbGxzOiBBcnJheTx7IGVuZ2luZWVySWQ6IHN0cmluZzsgZGF0ZTogc3RyaW5nIH0+KSA9PiB7XG4gICAgICAgICAgICBpZiAob25CYXRjaEVkaXQgJiYgb25CYXRjaEVkaXQuY2FuRXhlY3V0ZSAmJiAhb25CYXRjaEVkaXQuaXNFeGVjdXRpbmcpIHtcbiAgICAgICAgICAgICAgICAvLyBHZXQgZXZlbnQgSURzIGZvciBjZWxscyB0aGF0IGhhdmUgc2hpZnRzXG4gICAgICAgICAgICAgICAgY29uc3QgZXZlbnRJZHMgPSBzZWxlY3RlZENlbGxzXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoY2VsbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGlmdCA9IHNoaWZ0c0RhdGEuZmluZChzID0+IHMuZW5naW5lZXJJZCA9PT0gY2VsbC5lbmdpbmVlcklkICYmIHMuZGF0ZSA9PT0gY2VsbC5kYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzaGlmdD8uaWQ7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgICAgICAgICAgICAgICAgLmpvaW4oXCIsXCIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50SWRzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBjb250ZXh0IGF0dHJpYnV0ZXMgYmVmb3JlIGNhbGxpbmcgbWljcm9mbG93XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0U2VsZWN0ZWRDZWxscz8uc2V0VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRTZWxlY3RlZENlbGxzLnNldFZhbHVlKGV2ZW50SWRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvbkJhdGNoRWRpdC5leGVjdXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbb25CYXRjaEVkaXQsIHNoaWZ0c0RhdGEsIGNvbnRleHRTZWxlY3RlZENlbGxzXVxuICAgICk7XG5cbiAgICBjb25zdCBoYW5kbGVCYXRjaERlbGV0ZSA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoc2VsZWN0ZWRDZWxsczogQXJyYXk8eyBlbmdpbmVlcklkOiBzdHJpbmc7IGRhdGU6IHN0cmluZyB9PikgPT4ge1xuICAgICAgICAgICAgaWYgKG9uQmF0Y2hEZWxldGUgJiYgb25CYXRjaERlbGV0ZS5jYW5FeGVjdXRlICYmICFvbkJhdGNoRGVsZXRlLmlzRXhlY3V0aW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IGV2ZW50IElEcyBmb3IgY2VsbHMgdGhhdCBoYXZlIHNoaWZ0c1xuICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50SWRzID0gc2VsZWN0ZWRDZWxsc1xuICAgICAgICAgICAgICAgICAgICAubWFwKGNlbGwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hpZnQgPSBzaGlmdHNEYXRhLmZpbmQocyA9PiBzLmVuZ2luZWVySWQgPT09IGNlbGwuZW5naW5lZXJJZCAmJiBzLmRhdGUgPT09IGNlbGwuZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2hpZnQ/LmlkO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKFwiLFwiKTtcblxuICAgICAgICAgICAgICAgIGlmIChldmVudElkcykge1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgY29udGV4dCBhdHRyaWJ1dGVzIGJlZm9yZSBjYWxsaW5nIG1pY3JvZmxvd1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dFNlbGVjdGVkQ2VsbHM/LnNldFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0U2VsZWN0ZWRDZWxscy5zZXRWYWx1ZShldmVudElkcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb25CYXRjaERlbGV0ZS5leGVjdXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbb25CYXRjaERlbGV0ZSwgc2hpZnRzRGF0YSwgY29udGV4dFNlbGVjdGVkQ2VsbHNdXG4gICAgKTtcblxuICAgIGNvbnN0IGhhbmRsZUJhdGNoQ3JlYXRlID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChzZWxlY3RlZENlbGxzOiBBcnJheTx7IGVuZ2luZWVySWQ6IHN0cmluZzsgZGF0ZTogc3RyaW5nIH0+KSA9PiB7XG4gICAgICAgICAgICBpZiAob25CYXRjaENyZWF0ZSAmJiBvbkJhdGNoQ3JlYXRlLmNhbkV4ZWN1dGUgJiYgIW9uQmF0Y2hDcmVhdGUuaXNFeGVjdXRpbmcpIHtcbiAgICAgICAgICAgICAgICAvLyBHZXQgZW1wdHkgY2VsbHMgKGNlbGxzIHdpdGhvdXQgc2hpZnRzKVxuICAgICAgICAgICAgICAgIGNvbnN0IGVtcHR5Q2VsbHMgPSBzZWxlY3RlZENlbGxzLmZpbHRlcihjZWxsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hpZnQgPSBzaGlmdHNEYXRhLmZpbmQocyA9PiBzLmVuZ2luZWVySWQgPT09IGNlbGwuZW5naW5lZXJJZCAmJiBzLmRhdGUgPT09IGNlbGwuZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhc2hpZnQ7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZW1wdHlDZWxscy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBjb250ZXh0IGF0dHJpYnV0ZXMgYmVmb3JlIGNhbGxpbmcgbWljcm9mbG93XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0U2VsZWN0ZWRDZWxscz8uc2V0VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRTZWxlY3RlZENlbGxzLnNldFZhbHVlKEpTT04uc3RyaW5naWZ5KGVtcHR5Q2VsbHMpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvbkJhdGNoQ3JlYXRlLmV4ZWN1dGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtvbkJhdGNoQ3JlYXRlLCBzaGlmdHNEYXRhLCBjb250ZXh0U2VsZWN0ZWRDZWxsc11cbiAgICApO1xuXG4gICAgLy8gRXJyb3Igc3RhdGVcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgc2hpZnQtc2NoZWR1bGVyICR7Y2xhc3NOYW1lfWB9IHN0eWxlPXtzdHlsZX0gdGFiSW5kZXg9e3RhYkluZGV4fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNoaWZ0LXNjaGVkdWxlci1lcnJvclwiPlxuICAgICAgICAgICAgICAgICAgICA8aDM+4pqg77iPIENvbmZpZ3VyYXRpb24gRXJyb3I8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8cD57ZXJyb3IubWVzc2FnZX08L3A+XG4gICAgICAgICAgICAgICAgICAgIHtlcnJvci5wcm9wZXJ0eSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c21hbGw+Q2hlY2sgdGhlIHtlcnJvci5wcm9wZXJ0eX0gcHJvcGVydHkgaW4gdGhlIHdpZGdldCBjb25maWd1cmF0aW9uLjwvc21hbGw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBMb2FkaW5nIHN0YXRlIC0gb25seSBzaG93IGlmIGVuZ2luZWVycyBoYXZlbid0IGxvYWRlZCB5ZXRcbiAgICBpZiAobG9hZGluZyAmJiAoIWVuZ2luZWVyRGF0YSB8fCBlbmdpbmVlckRhdGEubGVuZ3RoID09PSAwKSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BzaGlmdC1zY2hlZHVsZXIgJHtjbGFzc05hbWV9YH0gc3R5bGU9e3N0eWxlfSB0YWJJbmRleD17dGFiSW5kZXh9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2hpZnQtc2NoZWR1bGVyLWxvYWRpbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2FkaW5nLXNwaW5uZXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPHA+TG9hZGluZyBlbmdpbmVlcnMuLi48L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBFbXB0eSBzdGF0ZVxuICAgIGlmICghZW5naW5lZXJEYXRhIHx8IGVuZ2luZWVyRGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgc2hpZnQtc2NoZWR1bGVyICR7Y2xhc3NOYW1lfWB9IHN0eWxlPXtzdHlsZX0gdGFiSW5kZXg9e3RhYkluZGV4fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNoaWZ0LXNjaGVkdWxlci1lbXB0eVwiPlxuICAgICAgICAgICAgICAgICAgICA8aDM+8J+ThSBObyBEYXRhIEF2YWlsYWJsZTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxwPk5vIGVuZ2luZWVycyBmb3VuZC4gUGxlYXNlIGNoZWNrIHlvdXIgZGF0YSBzb3VyY2UgY29uZmlndXJhdGlvbi48L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHNoaWZ0LXNjaGVkdWxlciAke2NsYXNzTmFtZX1gfSBzdHlsZT17c3R5bGV9IHRhYkluZGV4PXt0YWJJbmRleH0gZGF0YS13aWRnZXQtbmFtZT17bmFtZX0+XG4gICAgICAgICAgICA8U2NoZWR1bGVHcmlkXG4gICAgICAgICAgICAgICAgZW5naW5lZXJzPXtlbmdpbmVlckRhdGF9XG4gICAgICAgICAgICAgICAgc2hpZnRzPXtzaGlmdHNEYXRhfVxuICAgICAgICAgICAgICAgIGdldFNoaWZ0c0ZvckVuZ2luZWVyPXtnZXRTaGlmdHNGb3JFbmdpbmVlcn1cbiAgICAgICAgICAgICAgICBnZXRFbmdpbmVlcnNCeVRlYW09e2dldEVuZ2luZWVyc0J5VGVhbX1cbiAgICAgICAgICAgICAgICBvbkVkaXRTaGlmdD17b25FZGl0U2hpZnR9XG4gICAgICAgICAgICAgICAgb25DcmVhdGVTaGlmdD17b25DcmVhdGVTaGlmdH1cbiAgICAgICAgICAgICAgICBvbkRlbGV0ZVNoaWZ0PXtvbkRlbGV0ZVNoaWZ0fVxuICAgICAgICAgICAgICAgIGNvbnRleHRTaGlmdElkPXtjb250ZXh0U2hpZnRJZH1cbiAgICAgICAgICAgICAgICBjb250ZXh0RW5naW5lZXJJZD17Y29udGV4dEVuZ2luZWVySWR9XG4gICAgICAgICAgICAgICAgY29udGV4dERhdGU9e2NvbnRleHREYXRlfVxuICAgICAgICAgICAgICAgIGNvbnRleHRTZWxlY3RlZENlbGxzPXtjb250ZXh0U2VsZWN0ZWRDZWxsc31cbiAgICAgICAgICAgICAgICBvbkJhdGNoQ3JlYXRlPXtoYW5kbGVCYXRjaENyZWF0ZX1cbiAgICAgICAgICAgICAgICBvbkJhdGNoRWRpdD17aGFuZGxlQmF0Y2hFZGl0fVxuICAgICAgICAgICAgICAgIG9uQmF0Y2hEZWxldGU9e2hhbmRsZUJhdGNoRGVsZXRlfVxuICAgICAgICAgICAgICAgIHNob3dEZWJ1Z0luZm89e3Nob3dEZWJ1Z0luZm99XG4gICAgICAgICAgICAgICAgZGVidWdJbmZvPXtkZWJ1Z0luZm99XG4gICAgICAgICAgICAgICAgc2hpZnRzTG9hZGluZz17c2hpZnRzTG9hZGluZ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG4iXSwibmFtZXMiOlsidCIsImUiLCJtb2R1bGUiLCJ0aGlzIiwibiIsInIiLCJpIiwicyIsInUiLCJhIiwibyIsImMiLCJmIiwiaCIsImQiLCJsIiwiJCIsInkiLCJNIiwibmFtZSIsIndlZWtkYXlzIiwic3BsaXQiLCJtb250aHMiLCJvcmRpbmFsIiwibSIsIlN0cmluZyIsImxlbmd0aCIsIkFycmF5Iiwiam9pbiIsInYiLCJ6IiwidXRjT2Zmc2V0IiwiTWF0aCIsImFicyIsImZsb29yIiwiZGF0ZSIsInllYXIiLCJtb250aCIsImNsb25lIiwiYWRkIiwiY2VpbCIsInAiLCJ3IiwiRCIsIm1zIiwiUSIsInRvTG93ZXJDYXNlIiwicmVwbGFjZSIsImciLCJTIiwiXyIsIk8iLCJhcmdzIiwiYXJndW1lbnRzIiwiYiIsImxvY2FsZSIsIiRMIiwidXRjIiwiJHUiLCJ4IiwiJHgiLCIkb2Zmc2V0IiwicGFyc2UiLCJwcm90b3R5cGUiLCIkZCIsIkRhdGUiLCJOYU4iLCJ0ZXN0IiwibWF0Y2giLCJzdWJzdHJpbmciLCJVVEMiLCJpbml0IiwiJHkiLCJnZXRGdWxsWWVhciIsIiRNIiwiZ2V0TW9udGgiLCIkRCIsImdldERhdGUiLCIkVyIsImdldERheSIsIiRIIiwiZ2V0SG91cnMiLCIkbSIsImdldE1pbnV0ZXMiLCIkcyIsImdldFNlY29uZHMiLCIkbXMiLCJnZXRNaWxsaXNlY29uZHMiLCIkdXRpbHMiLCJpc1ZhbGlkIiwidG9TdHJpbmciLCJpc1NhbWUiLCJzdGFydE9mIiwiZW5kT2YiLCJpc0FmdGVyIiwiaXNCZWZvcmUiLCIkZyIsInNldCIsInVuaXgiLCJ2YWx1ZU9mIiwiZ2V0VGltZSIsInRvRGF0ZSIsImFwcGx5Iiwic2xpY2UiLCIkbG9jYWxlIiwid2Vla1N0YXJ0IiwiJHNldCIsIm1pbiIsImRheXNJbk1vbnRoIiwiZ2V0IiwiTnVtYmVyIiwicm91bmQiLCJzdWJ0cmFjdCIsImZvcm1hdCIsImludmFsaWREYXRlIiwibWVyaWRpZW0iLCJtb250aHNTaG9ydCIsIndlZWtkYXlzTWluIiwid2Vla2RheXNTaG9ydCIsImdldFRpbWV6b25lT2Zmc2V0IiwiZGlmZiIsInRvSlNPTiIsInRvSVNPU3RyaW5nIiwidG9VVENTdHJpbmciLCJrIiwiZm9yRWFjaCIsImV4dGVuZCIsIiRpIiwiaXNEYXlqcyIsImVuIiwiTHMiLCJsb2NhbCIsImNhbGwiLCJnZXRVVENGdWxsWWVhciIsImdldFVUQ01vbnRoIiwiZ2V0VVRDRGF0ZSIsImdldFVUQ0RheSIsImdldFVUQ0hvdXJzIiwiZ2V0VVRDTWludXRlcyIsImdldFVUQ1NlY29uZHMiLCJnZXRVVENNaWxsaXNlY29uZHMiLCIkbG9jYWxPZmZzZXQiLCJpc1VUQyIsImRheSIsImhvdXIiLCJtaW51dGUiLCJzZWNvbmQiLCJ0aW1lWm9uZU5hbWUiLCJJbnRsIiwiRGF0ZVRpbWVGb3JtYXQiLCJob3VyMTIiLCJ0aW1lWm9uZSIsImZvcm1hdFRvUGFydHMiLCJ0eXBlIiwidmFsdWUiLCJwYXJzZUludCIsInR6IiwidG9Mb2NhbGVTdHJpbmciLCIkdGltZXpvbmUiLCJvZmZzZXROYW1lIiwiZ3Vlc3MiLCJmaW5kIiwibWF4IiwicmVzb2x2ZWRPcHRpb25zIiwic2V0RGVmYXVsdCIsImlzU2FtZU9yQmVmb3JlIiwiaXNTYW1lT3JBZnRlciIsInVzZVJlZiIsInVzZUNhbGxiYWNrIiwidXNlRWZmZWN0IiwiY3JlYXRlRWxlbWVudCIsIlJlYWN0IiwidXNlTWVtbyIsInVzZVN0YXRlIiwiU2NoZWR1bGVHcmlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQUFBLEVBQUEsQ0FBQyxVQUFTQSxDQUFDLEVBQUNDLENBQUMs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LEVBQU8sQ0FBQTtpQkFDdkNBLG9CQUEyQixDQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsc0JBQUEsQ0FBQSxDQUN6QixDQUNKLEVBQ1I7TUFDTDs7S0FHRCxJQUFJLENBQUMsWUFBWSxJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0NBQzVDLFFBQUEsUUFDSUEsb0JBQUEsQ0FBQSxLQUFBLEVBQUEsRUFBSyxTQUFTLEVBQUUsbUJBQW1CLFNBQVMsQ0FBQSxDQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFBO2FBQzVFQSxvQkFBSyxDQUFBLEtBQUEsRUFBQSxFQUFBLFNBQVMsRUFBQyx1QkFBdUIsRUFBQTtpQkFDbENBLG9CQUE2QixDQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsZ0NBQUEsQ0FBQTtpQkFDN0JBLG9CQUF1RSxDQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsa0VBQUEsQ0FBQSxDQUNyRSxDQUNKLEVBQ1I7TUFDTDtDQUVELElBQUEsUUFDSUEsb0JBQUssQ0FBQSxLQUFBLEVBQUEsRUFBQSxTQUFTLEVBQUUsQ0FBQSxnQkFBQSxFQUFtQixTQUFTLENBQUUsQ0FBQSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsc0JBQW9CLElBQUksRUFBQTtDQUNwRyxRQUFBQSxvQkFBQSxDQUFDSSxjQUFZLEVBQUEsRUFDVCxTQUFTLEVBQUUsWUFBWSxFQUN2QixNQUFNLEVBQUUsVUFBVSxFQUNsQixvQkFBb0IsRUFBRSxvQkFBb0IsRUFDMUMsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQ3RDLFdBQVcsRUFBRSxXQUFXLEVBQ3hCLGFBQWEsRUFBRSxhQUFhLEVBQzVCLGFBQWEsRUFBRSxhQUFhLEVBQzVCLGNBQWMsRUFBRSxjQUFjLEVBQzlCLGlCQUFpQixFQUFFLGlCQUFpQixFQUNwQyxXQUFXLEVBQUUsV0FBVyxFQUN4QixvQkFBb0IsRUFBRSxvQkFBb0IsRUFDMUMsYUFBYSxFQUFFLGlCQUFpQixFQUNoQyxXQUFXLEVBQUUsZUFBZSxFQUM1QixhQUFhLEVBQUUsaUJBQWlCLEVBQ2hDLGFBQWEsRUFBRSxhQUFhLEVBQzVCLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLGFBQWEsRUFBRSxhQUFhLEVBQzlCLENBQUEsQ0FDQSxFQUNSO0NBQ047Ozs7Ozs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDEsMiwzLDRdfQ==
