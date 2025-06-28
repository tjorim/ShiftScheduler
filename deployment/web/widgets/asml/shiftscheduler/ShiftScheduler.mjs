import * as React2 from 'react';
import React2__default, { useRef, useCallback, useEffect, createElement, useMemo, useState } from 'react';

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
  const [ref, setRef] = React2.useState(null);
  const callback = React2.useRef(onChange);
  const [state, setState] = React2.useState({
    inView: !!initialInView,
    entry: void 0
  });
  callback.current = onChange;
  React2.useEffect(() => {
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
  const previousEntryTarget = React2.useRef(void 0);
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
    const headerScrollRef = useRef(null);
    const contentScrollRef = useRef(null);
    const isScrolling = useRef(false);
    // Infinite scroll / lazy loading with intersection observer
    const { ref: infiniteScrollRef, inView: isInfiniteScrollVisible } = useInView({
        rootMargin: "0px",
        threshold: 1
    });
    // Scroll synchronization between header and content
    const syncScroll = useCallback((source, target) => {
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
    useEffect(() => {
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
const EmptyState = ({ message = "No Data Available", description = "No engineers found. Please check your data source configuration.", className = "", style, tabIndex }) => (createElement("div", { className: `shift-scheduler ${className}`, style: style, tabIndex: tabIndex },
    createElement("div", { className: "shift-scheduler-empty" },
        createElement("h3", null,
            "\uD83D\uDCC5 ",
            message),
        createElement("p", null, description))));
class SchedulerErrorBoundary extends React2__default.Component {
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
            return (createElement("div", { className: `shift-scheduler ${this.props.className || ""}`, style: this.props.style, tabIndex: this.props.tabIndex },
                createElement("div", { className: "shift-scheduler-error-boundary" },
                    createElement("h3", null, "\uD83D\uDEE0\uFE0F Something went wrong"),
                    createElement("p", null, "The Shift Scheduler encountered an unexpected error."),
                    createElement("details", { className: "error-boundary-details" },
                        createElement("summary", null, "Error Details"),
                        createElement("h4", null, "Error:"),
                        createElement("pre", null, this.state.error?.toString()),
                        this.state.errorInfo && (createElement("div", null,
                            createElement("h4", null, "Component Stack:"),
                            createElement("pre", null, this.state.errorInfo.componentStack)))),
                    createElement("button", { onClick: () => this.setState({ hasError: false, error: undefined, errorInfo: undefined }), className: "error-boundary-retry" }, "Try Again"))));
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
    const WrappedComponent = props => (createElement(SchedulerErrorBoundary, { className: props.className, style: props.style, tabIndex: props.tabIndex },
        createElement(Component, { ...props })));
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
    const cellData = useMemo(() => {
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
    return (createElement("div", { className: cellClasses, onDoubleClick: handleDoubleClick, onClick: handleClick, onMouseDown: handleMouseDown, onContextMenu: handleContext, title: `${engineer.name} - ${date.toLocaleDateString()}${shift ? ` (${shift.shift}${shift.status ? ` - ${shift.status}` : ""})` : " - No shift"}`, style: {
            backgroundColor: cellData.shiftColor || undefined,
            cursor: readOnly ? "default" : "pointer"
        } },
        createElement("div", { className: "day-number" }, cellData.dayNumber),
        cellData.hasShift ? (createElement("div", { className: "shift-content" },
            createElement("span", { className: "shift-text" }, cellData.shiftText),
            shift?.status === "error" && (createElement("span", { className: "shift-error-indicator", title: "Error loading shift data" }, "\u26A0\uFE0F")))) : shiftsLoading ? (createElement("div", { className: "day-cell-loading", title: "Loading shifts..." }, "...")) : (createElement("div", { className: "day-cell-empty", title: "No shift" }, "-"))));
};

const ContextMenu = ({ x, y, options, onClose, visible }) => {
    const menuRef = useRef(null);
    useEffect(() => {
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
    return (createElement("div", { ref: menuRef, className: "context-menu", style: {
            position: "fixed",
            left: x,
            top: y,
            zIndex: 1000
        }, onClick: e => e.stopPropagation() }, options.map((option, index) => option.separator ? (createElement("div", { key: index, className: "context-menu-separator" })) : (createElement("div", { key: index, className: `context-menu-item ${option.disabled ? "disabled" : ""}`, onClick: () => {
            if (!option.disabled) {
                option.action();
                onClose();
            }
        } },
        option.icon && createElement("span", { className: "context-menu-icon" }, option.icon),
        createElement("span", { className: "context-menu-label" }, option.label))))));
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
    const dateRange = useMemo(() => {
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
    const [startDate] = useState(dateRange.start);
    const [endDate, setEndDate] = useState(dateRange.end);
    const [selectedCells, setSelectedCells] = useState([]);
    const [lastSelectedCell, setLastSelectedCell] = useState(null);
    // Context menu state
    const [contextMenu, setContextMenu] = useState({
        visible: false,
        x: 0,
        y: 0,
        options: []
    });
    // Scroll navigation hook for unified scrolling and infinite loading
    const { headerScrollRef, contentScrollRef, infiniteScrollRef, isInfiniteScrollVisible } = useScrollNavigation();
    // Helper functions for multi-select
    const isCellSelected = useCallback((engineerId, date) => {
        return selectedCells.some(cell => cell.engineerId === engineerId && cell.date === date);
    }, [selectedCells]);
    // Handle infinite scroll loading when sentinel comes into view
    useEffect(() => {
        if (isInfiniteScrollVisible) {
            setEndDate(d => addDays(d, 15));
        }
    }, [isInfiniteScrollVisible]);
    // Memoize teams data for performance
    const teamsData = useMemo(() => {
        try {
            return getEngineersByTeam();
        }
        catch (error) {
            console.warn("Error getting engineers by team:", error);
            return {};
        }
    }, [getEngineersByTeam]);
    // Group engineers by Header → Subheader → Engineers (data-driven with fallback)
    const { headerSubheaderStructure, allEngineers, groupingDebugInfo } = useMemo(() => {
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
    const dateColumns = useMemo(() => {
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
    const selectCell = useCallback((engineerId, date, ctrlKey, shiftKey) => {
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
    const handleCellContextMenu = useCallback((e, engineer, date, shift) => {
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
    const closeContextMenu = useCallback(() => {
        setContextMenu(prev => ({ ...prev, visible: false }));
    }, []);
    // Create shift lookup for performance with targeted debugging
    const shiftLookup = useMemo(() => {
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
    const getShift = useCallback((engineerId, dateString) => {
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
    const handleCellClick = useCallback((engineerId, dateString, ctrlKey, shiftKey) => {
        selectCell(engineerId, dateString, ctrlKey, shiftKey);
    }, [selectCell]);
    // Keyboard navigation with multi-select support
    useEffect(() => {
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
    useEffect(() => {
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
    const shiftStats = useMemo(() => {
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
        return (createElement(EmptyState, { message: "No Engineers Available", description: "No engineers found. Please check your data configuration.", className: className }));
    }
    return (createElement("div", { className: `shift-scheduler-unified ${className}` },
        showDebugInfo && (createElement("div", { style: {
                background: "#e0f2fe",
                padding: "12px",
                fontSize: "11px",
                borderBottom: "1px solid #0284c7",
                color: "#0c4a6e",
                fontFamily: "monospace"
            } },
            createElement("div", null,
                "\uD83D\uDD0D Debug: Headers: ",
                headerSubheaderStructure.length,
                ", Engineers: ",
                allEngineers.length,
                ", Shifts:",
                " ",
                shifts.length),
            createElement("div", null,
                "\uD83D\uDCCA Shift Lookup Keys: ",
                Object.keys(shiftLookup).length),
            createElement("div", null,
                "\uD83C\uDFD7\uFE0F Grouping:",
                " ",
                Array.isArray(groupingDebugInfo) ? groupingDebugInfo.join(" | ") : "Debug info unavailable"),
            debugInfo && (createElement("div", null,
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
            shifts.length > 0 && (createElement("div", null,
                createElement("div", null,
                    "\uD83C\uDFAF First Shift: ID=",
                    shifts[0]?.engineerId,
                    ", Date=",
                    shifts[0]?.date,
                    ", Type=",
                    typeof shifts[0]?.date,
                    ", Shift=",
                    shifts[0]?.shift),
                createElement("div", null,
                    "\uD83D\uDD11 Sample Keys: ",
                    Object.keys(shiftLookup).slice(0, 3).join(", ")))),
            allEngineers.length > 0 && (createElement("div", null,
                "\uD83D\uDC64 First Engineer: ID=",
                allEngineers[0]?.id,
                ", Name=",
                allEngineers[0]?.name)),
            dateColumns.length > 0 && (createElement("div", null,
                "\uD83D\uDCC5 Timeline: ",
                dateColumns[0]?.dateString,
                " to",
                " ",
                dateColumns[dateColumns.length - 1]?.dateString,
                " (",
                dateColumns.length,
                " days)")),
            createElement("div", null,
                "\uD83D\uDD0D Test Lookup: Key=",
                allEngineers[0]?.id,
                "-",
                dateColumns[0]?.dateString,
                " Found=",
                !!shiftLookup[`${allEngineers[0]?.id}-${dateColumns[0]?.dateString}`]),
            createElement("div", null,
                "\uD83D\uDD0D Engineer ID Types: Engineer=",
                typeof allEngineers[0]?.id,
                ", Shift=",
                typeof shifts[0]?.engineerId),
            createElement("div", null,
                "\uD83D\uDD0D Date Match Test: Timeline=",
                dateColumns[0]?.dateString,
                ", Shift=",
                shifts[0]?.date),
            createElement("div", null,
                "\uD83D\uDCC8 Performance: ",
                Object.keys(shiftLookup).length,
                " lookup keys,",
                " ",
                allEngineers.length * dateColumns.length,
                " total cells"),
            createElement("div", null,
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
            selectedCells.length > 0 && (createElement("div", null,
                "\uD83C\uDFAF Selected: ",
                selectedCells.length,
                " cell(s)",
                " ",
                selectedCells.length === 1
                    ? `(${allEngineers.find(e => e.id === selectedCells[0].engineerId)?.name} on ${selectedCells[0].date})`
                    : "",
                " ",
                "- Ctrl+click: toggle, Shift+click: range, Arrows: navigate, Enter/Space: edit, Esc: clear")),
            createElement("div", { style: {
                    marginTop: "8px",
                    fontSize: "10px",
                    backgroundColor: "#f0f0f0",
                    padding: "8px",
                    borderRadius: "4px"
                } },
                createElement("div", null,
                    createElement("strong", null, "\uD83D\uDD0D Find engineers with shifts:")),
                createElement("pre", { style: { fontSize: "9px", overflow: "auto", maxHeight: "80px" } }, (() => {
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
                createElement("div", { style: { marginTop: "4px" } },
                    createElement("strong", null, "\uD83D\uDD0D Sample shift engineer IDs:")),
                createElement("pre", { style: { fontSize: "9px", overflow: "auto", maxHeight: "80px" } }, JSON.stringify(shifts.slice(0, 5).map(shift => ({
                    shiftId: shift.id,
                    engineerId: shift.engineerId,
                    shift: shift.shift,
                    date: shift.date
                })), null, 2)),
                createElement("div", { style: { marginTop: "4px" } },
                    createElement("strong", null, "\uD83D\uDCA1 Check: Do any engineer IDs match shift engineer IDs?")),
                createElement("pre", { style: { fontSize: "9px", overflow: "auto", maxHeight: "60px" } }, (() => {
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
                createElement("div", { style: { marginTop: "8px" } },
                    createElement("strong", null, "\uD83D\uDD0D Raw SPUser Object Properties:")),
                createElement("pre", { style: { fontSize: "9px", overflow: "auto", maxHeight: "80px" } }, allEngineers.length > 0
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
                createElement("div", { style: { marginTop: "8px" } },
                    createElement("strong", null, "\uD83D\uDD0D Raw CalendarEvent Object Properties:")),
                createElement("pre", { style: { fontSize: "9px", overflow: "auto", maxHeight: "80px" } }, shifts.length > 0
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
        createElement("div", { className: "scheduler-container" },
            createElement("div", { className: "scheduler-header" },
                createElement("div", { className: "engineer-column-header" }, "Engineer"),
                createElement("div", { className: "timeline-container", ref: headerScrollRef },
                    createElement("div", { className: "timeline-header" }, dateColumns.map((col, idx) => (createElement("div", { key: idx, className: `date-header ${col.isToday ? "date-header-today" : ""} ${col.isWeekend ? "date-header-weekend" : ""}` },
                        createElement("div", { className: "date-day" }, col.date.getDate()),
                        createElement("div", { className: "date-month" }, col.date.toLocaleDateString("en", { month: "short" })))))))),
            createElement("div", { className: "scheduler-content" },
                createElement("div", { className: "engineer-names-column" }, headerSubheaderStructure.map(headerData => (createElement("div", { key: headerData.headerId },
                    createElement("div", { className: "team-name-cell" }, headerData.headerName),
                    headerData.subheaders.map(subheader => (createElement("div", { key: `${headerData.headerId}-${subheader.name}` },
                        createElement("div", { className: "lane-name-cell" }, subheader.name),
                        subheader.engineers.map(engineer => (createElement("div", { key: engineer.id, className: "engineer-name-cell" }, engineer.name)))))))))),
                createElement("div", { className: "timeline-container", ref: contentScrollRef },
                    createElement("div", { className: "timeline-content" }, headerSubheaderStructure.map(headerData => (createElement("div", { key: headerData.headerId },
                        createElement("div", { className: "team-timeline-row" }, dateColumns.map((_, idx) => (createElement("div", { key: idx, className: "team-timeline-cell" })))),
                        headerData.subheaders.map(subheader => (createElement("div", { key: `${headerData.headerId}-${subheader.name}` },
                            createElement("div", { className: "lane-timeline-row" }, dateColumns.map((_, idx) => (createElement("div", { key: idx, className: "lane-timeline-cell" })))),
                            subheader.engineers.map(engineer => (createElement("div", { key: engineer.id, className: "engineer-timeline-row" }, dateColumns.map((col, idx) => {
                                const shift = getShift(engineer.id, col.dateString);
                                return (createElement(DayCell, { key: `${engineer.id}-${idx}`, date: col.date, engineer: engineer, shift: shift, isToday: col.isToday, isWeekend: col.isWeekend, isSelected: isCellSelected(engineer.id, col.dateString), shiftsLoading: shiftsLoading, onDoubleClick: () => {
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
        createElement("div", { ref: infiniteScrollRef, className: "sentinel", style: { height: "20px", visibility: "hidden" } }),
        createElement(ContextMenu, { visible: contextMenu.visible, x: contextMenu.x, y: contextMenu.y, options: contextMenu.options, onClose: closeContextMenu })));
};
// Export with error boundary for production resilience
var ScheduleGrid$1 = withErrorBoundary(ScheduleGrid);

const useShiftData = ({ engineersSource, shiftsSource, nameAttribute, headerAttribute, subheaderAttribute, startTimeAttribute, dayTypeAttribute, statusAttribute, spUserAssociation, shiftAssociation, shiftDateAttribute }) => {
    const [dataState, setDataState] = useState({
        engineers: [],
        shifts: [],
        shiftsLoading: true,
        error: null
    });
    // Validation helper
    const validateConfiguration = useCallback(() => {
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
    const transformedEngineers = useMemo(() => {
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
    const transformedShifts = useMemo(() => {
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
    useEffect(() => {
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
    const getShiftsForEngineer = useCallback((engineerId) => {
        try {
            return dataState.shifts.filter(shift => shift.engineerId === engineerId);
        }
        catch (error) {
            return [];
        }
    }, [dataState.shifts]);
    const getEngineersByTeam = useCallback(() => {
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
    const getShiftForDate = useCallback((engineerId, date) => {
        try {
            return dataState.shifts.find(shift => shift.engineerId === engineerId && shift.date === date);
        }
        catch (error) {
            return undefined;
        }
    }, [dataState.shifts]);
    const updateShift = useCallback((shiftId, updates) => {
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
    const getEngineerById = useCallback((engineerId) => {
        try {
            return dataState.engineers.find(engineer => engineer.id === engineerId);
        }
        catch (error) {
            return undefined;
        }
    }, [dataState.engineers]);
    const getShiftsByDateRange = useCallback((startDate, endDate) => {
        try {
            return dataState.shifts.filter(shift => shift.date >= startDate && shift.date <= endDate);
        }
        catch (error) {
            return [];
        }
    }, [dataState.shifts]);
    const refreshData = useCallback(() => {
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
    const handleBatchEdit = useCallback((selectedCells) => {
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
    const handleBatchDelete = useCallback((selectedCells) => {
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
    const handleBatchCreate = useCallback((selectedCells) => {
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
        return (createElement("div", { className: `shift-scheduler ${className}`, style: style, tabIndex: tabIndex },
            createElement("div", { className: "shift-scheduler-error" },
                createElement("h3", null, "\u26A0\uFE0F Configuration Error"),
                createElement("p", null, error.message),
                error.property && (createElement("p", null,
                    createElement("small", null,
                        "Check the ",
                        error.property,
                        " property in the widget configuration."))))));
    }
    // Loading state - only show if engineers haven't loaded yet
    if (loading && (!engineerData || engineerData.length === 0)) {
        return (createElement("div", { className: `shift-scheduler ${className}`, style: style, tabIndex: tabIndex },
            createElement("div", { className: "shift-scheduler-loading" },
                createElement("div", { className: "loading-spinner" }),
                createElement("p", null, "Loading engineers..."))));
    }
    // Empty state
    if (!engineerData || engineerData.length === 0) {
        return (createElement("div", { className: `shift-scheduler ${className}`, style: style, tabIndex: tabIndex },
            createElement("div", { className: "shift-scheduler-empty" },
                createElement("h3", null, "\uD83D\uDCC5 No Data Available"),
                createElement("p", null, "No engineers found. Please check your data source configuration."))));
    }
    return (createElement("div", { className: `shift-scheduler ${className}`, style: style, tabIndex: tabIndex, "data-widget-name": name },
        createElement(ScheduleGrid$1, { engineers: engineerData, shifts: shiftsData, getShiftsForEngineer: getShiftsForEngineer, getEngineersByTeam: getEngineersByTeam, onEditShift: onEditShift, onCreateShift: onCreateShift, onDeleteShift: onDeleteShift, contextShiftId: contextShiftId, contextEngineerId: contextEngineerId, contextDate: contextDate, contextSelectedCells: contextSelectedCells, onBatchCreate: handleBatchCreate, onBatchEdit: handleBatchEdit, onBatchDelete: handleBatchDelete, showDebugInfo: showDebugInfo, debugInfo: debugInfo, shiftsLoading: shiftsLoading })));
}

export { ShiftScheduler };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hpZnRTY2hlZHVsZXIubWpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZGF5anMvZGF5anMubWluLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2RheWpzL3BsdWdpbi91dGMuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZGF5anMvcGx1Z2luL3RpbWV6b25lLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2RheWpzL3BsdWdpbi9pc1NhbWVPckJlZm9yZS5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9kYXlqcy9wbHVnaW4vaXNTYW1lT3JBZnRlci5qcyIsIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9kYXRlSGVscGVycy50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9ob29rcy91c2VTY3JvbGxOYXZpZ2F0aW9uLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvTG9hZGluZ1N0YXRlcy50c3giLCIuLi8uLi8uLi8uLi8uLi9zcmMvdXRpbHMvc2hpZnRIZWxwZXJzLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRGF5Q2VsbC50c3giLCIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Db250ZXh0TWVudS50c3giLCIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9TY2hlZHVsZUdyaWQudHN4IiwiLi4vLi4vLi4vLi4vLi4vc3JjL2hvb2tzL3VzZVNoaWZ0RGF0YS50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9TaGlmdFNjaGVkdWxlci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiIWZ1bmN0aW9uKHQsZSl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9ZSgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZSk6KHQ9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczp0fHxzZWxmKS5kYXlqcz1lKCl9KHRoaXMsKGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQ9MWUzLGU9NmU0LG49MzZlNSxyPVwibWlsbGlzZWNvbmRcIixpPVwic2Vjb25kXCIscz1cIm1pbnV0ZVwiLHU9XCJob3VyXCIsYT1cImRheVwiLG89XCJ3ZWVrXCIsYz1cIm1vbnRoXCIsZj1cInF1YXJ0ZXJcIixoPVwieWVhclwiLGQ9XCJkYXRlXCIsbD1cIkludmFsaWQgRGF0ZVwiLCQ9L14oXFxkezR9KVstL10/KFxcZHsxLDJ9KT9bLS9dPyhcXGR7MCwyfSlbVHRcXHNdKihcXGR7MSwyfSk/Oj8oXFxkezEsMn0pPzo/KFxcZHsxLDJ9KT9bLjpdPyhcXGQrKT8kLyx5PS9cXFsoW15cXF1dKyldfFl7MSw0fXxNezEsNH18RHsxLDJ9fGR7MSw0fXxIezEsMn18aHsxLDJ9fGF8QXxtezEsMn18c3sxLDJ9fFp7MSwyfXxTU1MvZyxNPXtuYW1lOlwiZW5cIix3ZWVrZGF5czpcIlN1bmRheV9Nb25kYXlfVHVlc2RheV9XZWRuZXNkYXlfVGh1cnNkYXlfRnJpZGF5X1NhdHVyZGF5XCIuc3BsaXQoXCJfXCIpLG1vbnRoczpcIkphbnVhcnlfRmVicnVhcnlfTWFyY2hfQXByaWxfTWF5X0p1bmVfSnVseV9BdWd1c3RfU2VwdGVtYmVyX09jdG9iZXJfTm92ZW1iZXJfRGVjZW1iZXJcIi5zcGxpdChcIl9cIiksb3JkaW5hbDpmdW5jdGlvbih0KXt2YXIgZT1bXCJ0aFwiLFwic3RcIixcIm5kXCIsXCJyZFwiXSxuPXQlMTAwO3JldHVyblwiW1wiK3QrKGVbKG4tMjApJTEwXXx8ZVtuXXx8ZVswXSkrXCJdXCJ9fSxtPWZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1TdHJpbmcodCk7cmV0dXJuIXJ8fHIubGVuZ3RoPj1lP3Q6XCJcIitBcnJheShlKzEtci5sZW5ndGgpLmpvaW4obikrdH0sdj17czptLHo6ZnVuY3Rpb24odCl7dmFyIGU9LXQudXRjT2Zmc2V0KCksbj1NYXRoLmFicyhlKSxyPU1hdGguZmxvb3Iobi82MCksaT1uJTYwO3JldHVybihlPD0wP1wiK1wiOlwiLVwiKSttKHIsMixcIjBcIikrXCI6XCIrbShpLDIsXCIwXCIpfSxtOmZ1bmN0aW9uIHQoZSxuKXtpZihlLmRhdGUoKTxuLmRhdGUoKSlyZXR1cm4tdChuLGUpO3ZhciByPTEyKihuLnllYXIoKS1lLnllYXIoKSkrKG4ubW9udGgoKS1lLm1vbnRoKCkpLGk9ZS5jbG9uZSgpLmFkZChyLGMpLHM9bi1pPDAsdT1lLmNsb25lKCkuYWRkKHIrKHM/LTE6MSksYyk7cmV0dXJuKygtKHIrKG4taSkvKHM/aS11OnUtaSkpfHwwKX0sYTpmdW5jdGlvbih0KXtyZXR1cm4gdDwwP01hdGguY2VpbCh0KXx8MDpNYXRoLmZsb29yKHQpfSxwOmZ1bmN0aW9uKHQpe3JldHVybntNOmMseTpoLHc6byxkOmEsRDpkLGg6dSxtOnMsczppLG1zOnIsUTpmfVt0XXx8U3RyaW5nKHR8fFwiXCIpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvcyQvLFwiXCIpfSx1OmZ1bmN0aW9uKHQpe3JldHVybiB2b2lkIDA9PT10fX0sZz1cImVuXCIsRD17fTtEW2ddPU07dmFyIHA9XCIkaXNEYXlqc09iamVjdFwiLFM9ZnVuY3Rpb24odCl7cmV0dXJuIHQgaW5zdGFuY2VvZiBffHwhKCF0fHwhdFtwXSl9LHc9ZnVuY3Rpb24gdChlLG4scil7dmFyIGk7aWYoIWUpcmV0dXJuIGc7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUpe3ZhciBzPWUudG9Mb3dlckNhc2UoKTtEW3NdJiYoaT1zKSxuJiYoRFtzXT1uLGk9cyk7dmFyIHU9ZS5zcGxpdChcIi1cIik7aWYoIWkmJnUubGVuZ3RoPjEpcmV0dXJuIHQodVswXSl9ZWxzZXt2YXIgYT1lLm5hbWU7RFthXT1lLGk9YX1yZXR1cm4hciYmaSYmKGc9aSksaXx8IXImJmd9LE89ZnVuY3Rpb24odCxlKXtpZihTKHQpKXJldHVybiB0LmNsb25lKCk7dmFyIG49XCJvYmplY3RcIj09dHlwZW9mIGU/ZTp7fTtyZXR1cm4gbi5kYXRlPXQsbi5hcmdzPWFyZ3VtZW50cyxuZXcgXyhuKX0sYj12O2IubD13LGIuaT1TLGIudz1mdW5jdGlvbih0LGUpe3JldHVybiBPKHQse2xvY2FsZTplLiRMLHV0YzplLiR1LHg6ZS4keCwkb2Zmc2V0OmUuJG9mZnNldH0pfTt2YXIgXz1mdW5jdGlvbigpe2Z1bmN0aW9uIE0odCl7dGhpcy4kTD13KHQubG9jYWxlLG51bGwsITApLHRoaXMucGFyc2UodCksdGhpcy4keD10aGlzLiR4fHx0Lnh8fHt9LHRoaXNbcF09ITB9dmFyIG09TS5wcm90b3R5cGU7cmV0dXJuIG0ucGFyc2U9ZnVuY3Rpb24odCl7dGhpcy4kZD1mdW5jdGlvbih0KXt2YXIgZT10LmRhdGUsbj10LnV0YztpZihudWxsPT09ZSlyZXR1cm4gbmV3IERhdGUoTmFOKTtpZihiLnUoZSkpcmV0dXJuIG5ldyBEYXRlO2lmKGUgaW5zdGFuY2VvZiBEYXRlKXJldHVybiBuZXcgRGF0ZShlKTtpZihcInN0cmluZ1wiPT10eXBlb2YgZSYmIS9aJC9pLnRlc3QoZSkpe3ZhciByPWUubWF0Y2goJCk7aWYocil7dmFyIGk9clsyXS0xfHwwLHM9KHJbN118fFwiMFwiKS5zdWJzdHJpbmcoMCwzKTtyZXR1cm4gbj9uZXcgRGF0ZShEYXRlLlVUQyhyWzFdLGksclszXXx8MSxyWzRdfHwwLHJbNV18fDAscls2XXx8MCxzKSk6bmV3IERhdGUoclsxXSxpLHJbM118fDEscls0XXx8MCxyWzVdfHwwLHJbNl18fDAscyl9fXJldHVybiBuZXcgRGF0ZShlKX0odCksdGhpcy5pbml0KCl9LG0uaW5pdD1mdW5jdGlvbigpe3ZhciB0PXRoaXMuJGQ7dGhpcy4keT10LmdldEZ1bGxZZWFyKCksdGhpcy4kTT10LmdldE1vbnRoKCksdGhpcy4kRD10LmdldERhdGUoKSx0aGlzLiRXPXQuZ2V0RGF5KCksdGhpcy4kSD10LmdldEhvdXJzKCksdGhpcy4kbT10LmdldE1pbnV0ZXMoKSx0aGlzLiRzPXQuZ2V0U2Vjb25kcygpLHRoaXMuJG1zPXQuZ2V0TWlsbGlzZWNvbmRzKCl9LG0uJHV0aWxzPWZ1bmN0aW9uKCl7cmV0dXJuIGJ9LG0uaXNWYWxpZD1mdW5jdGlvbigpe3JldHVybiEodGhpcy4kZC50b1N0cmluZygpPT09bCl9LG0uaXNTYW1lPWZ1bmN0aW9uKHQsZSl7dmFyIG49Tyh0KTtyZXR1cm4gdGhpcy5zdGFydE9mKGUpPD1uJiZuPD10aGlzLmVuZE9mKGUpfSxtLmlzQWZ0ZXI9ZnVuY3Rpb24odCxlKXtyZXR1cm4gTyh0KTx0aGlzLnN0YXJ0T2YoZSl9LG0uaXNCZWZvcmU9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdGhpcy5lbmRPZihlKTxPKHQpfSxtLiRnPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gYi51KHQpP3RoaXNbZV06dGhpcy5zZXQobix0KX0sbS51bml4PWZ1bmN0aW9uKCl7cmV0dXJuIE1hdGguZmxvb3IodGhpcy52YWx1ZU9mKCkvMWUzKX0sbS52YWx1ZU9mPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJGQuZ2V0VGltZSgpfSxtLnN0YXJ0T2Y9ZnVuY3Rpb24odCxlKXt2YXIgbj10aGlzLHI9ISFiLnUoZSl8fGUsZj1iLnAodCksbD1mdW5jdGlvbih0LGUpe3ZhciBpPWIudyhuLiR1P0RhdGUuVVRDKG4uJHksZSx0KTpuZXcgRGF0ZShuLiR5LGUsdCksbik7cmV0dXJuIHI/aTppLmVuZE9mKGEpfSwkPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIGIudyhuLnRvRGF0ZSgpW3RdLmFwcGx5KG4udG9EYXRlKFwic1wiKSwocj9bMCwwLDAsMF06WzIzLDU5LDU5LDk5OV0pLnNsaWNlKGUpKSxuKX0seT10aGlzLiRXLE09dGhpcy4kTSxtPXRoaXMuJEQsdj1cInNldFwiKyh0aGlzLiR1P1wiVVRDXCI6XCJcIik7c3dpdGNoKGYpe2Nhc2UgaDpyZXR1cm4gcj9sKDEsMCk6bCgzMSwxMSk7Y2FzZSBjOnJldHVybiByP2woMSxNKTpsKDAsTSsxKTtjYXNlIG86dmFyIGc9dGhpcy4kbG9jYWxlKCkud2Vla1N0YXJ0fHwwLEQ9KHk8Zz95Kzc6eSktZztyZXR1cm4gbChyP20tRDptKyg2LUQpLE0pO2Nhc2UgYTpjYXNlIGQ6cmV0dXJuICQoditcIkhvdXJzXCIsMCk7Y2FzZSB1OnJldHVybiAkKHYrXCJNaW51dGVzXCIsMSk7Y2FzZSBzOnJldHVybiAkKHYrXCJTZWNvbmRzXCIsMik7Y2FzZSBpOnJldHVybiAkKHYrXCJNaWxsaXNlY29uZHNcIiwzKTtkZWZhdWx0OnJldHVybiB0aGlzLmNsb25lKCl9fSxtLmVuZE9mPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLnN0YXJ0T2YodCwhMSl9LG0uJHNldD1mdW5jdGlvbih0LGUpe3ZhciBuLG89Yi5wKHQpLGY9XCJzZXRcIisodGhpcy4kdT9cIlVUQ1wiOlwiXCIpLGw9KG49e30sblthXT1mK1wiRGF0ZVwiLG5bZF09ZitcIkRhdGVcIixuW2NdPWYrXCJNb250aFwiLG5baF09ZitcIkZ1bGxZZWFyXCIsblt1XT1mK1wiSG91cnNcIixuW3NdPWYrXCJNaW51dGVzXCIsbltpXT1mK1wiU2Vjb25kc1wiLG5bcl09ZitcIk1pbGxpc2Vjb25kc1wiLG4pW29dLCQ9bz09PWE/dGhpcy4kRCsoZS10aGlzLiRXKTplO2lmKG89PT1jfHxvPT09aCl7dmFyIHk9dGhpcy5jbG9uZSgpLnNldChkLDEpO3kuJGRbbF0oJCkseS5pbml0KCksdGhpcy4kZD15LnNldChkLE1hdGgubWluKHRoaXMuJEQseS5kYXlzSW5Nb250aCgpKSkuJGR9ZWxzZSBsJiZ0aGlzLiRkW2xdKCQpO3JldHVybiB0aGlzLmluaXQoKSx0aGlzfSxtLnNldD1mdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLmNsb25lKCkuJHNldCh0LGUpfSxtLmdldD1mdW5jdGlvbih0KXtyZXR1cm4gdGhpc1tiLnAodCldKCl9LG0uYWRkPWZ1bmN0aW9uKHIsZil7dmFyIGQsbD10aGlzO3I9TnVtYmVyKHIpO3ZhciAkPWIucChmKSx5PWZ1bmN0aW9uKHQpe3ZhciBlPU8obCk7cmV0dXJuIGIudyhlLmRhdGUoZS5kYXRlKCkrTWF0aC5yb3VuZCh0KnIpKSxsKX07aWYoJD09PWMpcmV0dXJuIHRoaXMuc2V0KGMsdGhpcy4kTStyKTtpZigkPT09aClyZXR1cm4gdGhpcy5zZXQoaCx0aGlzLiR5K3IpO2lmKCQ9PT1hKXJldHVybiB5KDEpO2lmKCQ9PT1vKXJldHVybiB5KDcpO3ZhciBNPShkPXt9LGRbc109ZSxkW3VdPW4sZFtpXT10LGQpWyRdfHwxLG09dGhpcy4kZC5nZXRUaW1lKCkrcipNO3JldHVybiBiLncobSx0aGlzKX0sbS5zdWJ0cmFjdD1mdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLmFkZCgtMSp0LGUpfSxtLmZvcm1hdD1mdW5jdGlvbih0KXt2YXIgZT10aGlzLG49dGhpcy4kbG9jYWxlKCk7aWYoIXRoaXMuaXNWYWxpZCgpKXJldHVybiBuLmludmFsaWREYXRlfHxsO3ZhciByPXR8fFwiWVlZWS1NTS1ERFRISDptbTpzc1pcIixpPWIueih0aGlzKSxzPXRoaXMuJEgsdT10aGlzLiRtLGE9dGhpcy4kTSxvPW4ud2Vla2RheXMsYz1uLm1vbnRocyxmPW4ubWVyaWRpZW0saD1mdW5jdGlvbih0LG4saSxzKXtyZXR1cm4gdCYmKHRbbl18fHQoZSxyKSl8fGlbbl0uc2xpY2UoMCxzKX0sZD1mdW5jdGlvbih0KXtyZXR1cm4gYi5zKHMlMTJ8fDEyLHQsXCIwXCIpfSwkPWZ8fGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj10PDEyP1wiQU1cIjpcIlBNXCI7cmV0dXJuIG4/ci50b0xvd2VyQ2FzZSgpOnJ9O3JldHVybiByLnJlcGxhY2UoeSwoZnVuY3Rpb24odCxyKXtyZXR1cm4gcnx8ZnVuY3Rpb24odCl7c3dpdGNoKHQpe2Nhc2VcIllZXCI6cmV0dXJuIFN0cmluZyhlLiR5KS5zbGljZSgtMik7Y2FzZVwiWVlZWVwiOnJldHVybiBiLnMoZS4keSw0LFwiMFwiKTtjYXNlXCJNXCI6cmV0dXJuIGErMTtjYXNlXCJNTVwiOnJldHVybiBiLnMoYSsxLDIsXCIwXCIpO2Nhc2VcIk1NTVwiOnJldHVybiBoKG4ubW9udGhzU2hvcnQsYSxjLDMpO2Nhc2VcIk1NTU1cIjpyZXR1cm4gaChjLGEpO2Nhc2VcIkRcIjpyZXR1cm4gZS4kRDtjYXNlXCJERFwiOnJldHVybiBiLnMoZS4kRCwyLFwiMFwiKTtjYXNlXCJkXCI6cmV0dXJuIFN0cmluZyhlLiRXKTtjYXNlXCJkZFwiOnJldHVybiBoKG4ud2Vla2RheXNNaW4sZS4kVyxvLDIpO2Nhc2VcImRkZFwiOnJldHVybiBoKG4ud2Vla2RheXNTaG9ydCxlLiRXLG8sMyk7Y2FzZVwiZGRkZFwiOnJldHVybiBvW2UuJFddO2Nhc2VcIkhcIjpyZXR1cm4gU3RyaW5nKHMpO2Nhc2VcIkhIXCI6cmV0dXJuIGIucyhzLDIsXCIwXCIpO2Nhc2VcImhcIjpyZXR1cm4gZCgxKTtjYXNlXCJoaFwiOnJldHVybiBkKDIpO2Nhc2VcImFcIjpyZXR1cm4gJChzLHUsITApO2Nhc2VcIkFcIjpyZXR1cm4gJChzLHUsITEpO2Nhc2VcIm1cIjpyZXR1cm4gU3RyaW5nKHUpO2Nhc2VcIm1tXCI6cmV0dXJuIGIucyh1LDIsXCIwXCIpO2Nhc2VcInNcIjpyZXR1cm4gU3RyaW5nKGUuJHMpO2Nhc2VcInNzXCI6cmV0dXJuIGIucyhlLiRzLDIsXCIwXCIpO2Nhc2VcIlNTU1wiOnJldHVybiBiLnMoZS4kbXMsMyxcIjBcIik7Y2FzZVwiWlwiOnJldHVybiBpfXJldHVybiBudWxsfSh0KXx8aS5yZXBsYWNlKFwiOlwiLFwiXCIpfSkpfSxtLnV0Y09mZnNldD1mdW5jdGlvbigpe3JldHVybiAxNSotTWF0aC5yb3VuZCh0aGlzLiRkLmdldFRpbWV6b25lT2Zmc2V0KCkvMTUpfSxtLmRpZmY9ZnVuY3Rpb24ocixkLGwpe3ZhciAkLHk9dGhpcyxNPWIucChkKSxtPU8ociksdj0obS51dGNPZmZzZXQoKS10aGlzLnV0Y09mZnNldCgpKSplLGc9dGhpcy1tLEQ9ZnVuY3Rpb24oKXtyZXR1cm4gYi5tKHksbSl9O3N3aXRjaChNKXtjYXNlIGg6JD1EKCkvMTI7YnJlYWs7Y2FzZSBjOiQ9RCgpO2JyZWFrO2Nhc2UgZjokPUQoKS8zO2JyZWFrO2Nhc2UgbzokPShnLXYpLzYwNDhlNTticmVhaztjYXNlIGE6JD0oZy12KS84NjRlNTticmVhaztjYXNlIHU6JD1nL247YnJlYWs7Y2FzZSBzOiQ9Zy9lO2JyZWFrO2Nhc2UgaTokPWcvdDticmVhaztkZWZhdWx0OiQ9Z31yZXR1cm4gbD8kOmIuYSgkKX0sbS5kYXlzSW5Nb250aD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVuZE9mKGMpLiREfSxtLiRsb2NhbGU9ZnVuY3Rpb24oKXtyZXR1cm4gRFt0aGlzLiRMXX0sbS5sb2NhbGU9ZnVuY3Rpb24odCxlKXtpZighdClyZXR1cm4gdGhpcy4kTDt2YXIgbj10aGlzLmNsb25lKCkscj13KHQsZSwhMCk7cmV0dXJuIHImJihuLiRMPXIpLG59LG0uY2xvbmU9ZnVuY3Rpb24oKXtyZXR1cm4gYi53KHRoaXMuJGQsdGhpcyl9LG0udG9EYXRlPWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBEYXRlKHRoaXMudmFsdWVPZigpKX0sbS50b0pTT049ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5pc1ZhbGlkKCk/dGhpcy50b0lTT1N0cmluZygpOm51bGx9LG0udG9JU09TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kZC50b0lTT1N0cmluZygpfSxtLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJGQudG9VVENTdHJpbmcoKX0sTX0oKSxrPV8ucHJvdG90eXBlO3JldHVybiBPLnByb3RvdHlwZT1rLFtbXCIkbXNcIixyXSxbXCIkc1wiLGldLFtcIiRtXCIsc10sW1wiJEhcIix1XSxbXCIkV1wiLGFdLFtcIiRNXCIsY10sW1wiJHlcIixoXSxbXCIkRFwiLGRdXS5mb3JFYWNoKChmdW5jdGlvbih0KXtrW3RbMV1dPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLiRnKGUsdFswXSx0WzFdKX19KSksTy5leHRlbmQ9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdC4kaXx8KHQoZSxfLE8pLHQuJGk9ITApLE99LE8ubG9jYWxlPXcsTy5pc0RheWpzPVMsTy51bml4PWZ1bmN0aW9uKHQpe3JldHVybiBPKDFlMyp0KX0sTy5lbj1EW2ddLE8uTHM9RCxPLnA9e30sT30pKTsiLCIhZnVuY3Rpb24odCxpKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1pKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShpKToodD1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOnR8fHNlbGYpLmRheWpzX3BsdWdpbl91dGM9aSgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciB0PVwibWludXRlXCIsaT0vWystXVxcZFxcZCg/Ojo/XFxkXFxkKT8vZyxlPS8oWystXXxcXGRcXGQpL2c7cmV0dXJuIGZ1bmN0aW9uKHMsZixuKXt2YXIgdT1mLnByb3RvdHlwZTtuLnV0Yz1mdW5jdGlvbih0KXt2YXIgaT17ZGF0ZTp0LHV0YzohMCxhcmdzOmFyZ3VtZW50c307cmV0dXJuIG5ldyBmKGkpfSx1LnV0Yz1mdW5jdGlvbihpKXt2YXIgZT1uKHRoaXMudG9EYXRlKCkse2xvY2FsZTp0aGlzLiRMLHV0YzohMH0pO3JldHVybiBpP2UuYWRkKHRoaXMudXRjT2Zmc2V0KCksdCk6ZX0sdS5sb2NhbD1mdW5jdGlvbigpe3JldHVybiBuKHRoaXMudG9EYXRlKCkse2xvY2FsZTp0aGlzLiRMLHV0YzohMX0pfTt2YXIgbz11LnBhcnNlO3UucGFyc2U9ZnVuY3Rpb24odCl7dC51dGMmJih0aGlzLiR1PSEwKSx0aGlzLiR1dGlscygpLnUodC4kb2Zmc2V0KXx8KHRoaXMuJG9mZnNldD10LiRvZmZzZXQpLG8uY2FsbCh0aGlzLHQpfTt2YXIgcj11LmluaXQ7dS5pbml0PWZ1bmN0aW9uKCl7aWYodGhpcy4kdSl7dmFyIHQ9dGhpcy4kZDt0aGlzLiR5PXQuZ2V0VVRDRnVsbFllYXIoKSx0aGlzLiRNPXQuZ2V0VVRDTW9udGgoKSx0aGlzLiREPXQuZ2V0VVRDRGF0ZSgpLHRoaXMuJFc9dC5nZXRVVENEYXkoKSx0aGlzLiRIPXQuZ2V0VVRDSG91cnMoKSx0aGlzLiRtPXQuZ2V0VVRDTWludXRlcygpLHRoaXMuJHM9dC5nZXRVVENTZWNvbmRzKCksdGhpcy4kbXM9dC5nZXRVVENNaWxsaXNlY29uZHMoKX1lbHNlIHIuY2FsbCh0aGlzKX07dmFyIGE9dS51dGNPZmZzZXQ7dS51dGNPZmZzZXQ9ZnVuY3Rpb24ocyxmKXt2YXIgbj10aGlzLiR1dGlscygpLnU7aWYobihzKSlyZXR1cm4gdGhpcy4kdT8wOm4odGhpcy4kb2Zmc2V0KT9hLmNhbGwodGhpcyk6dGhpcy4kb2Zmc2V0O2lmKFwic3RyaW5nXCI9PXR5cGVvZiBzJiYocz1mdW5jdGlvbih0KXt2b2lkIDA9PT10JiYodD1cIlwiKTt2YXIgcz10Lm1hdGNoKGkpO2lmKCFzKXJldHVybiBudWxsO3ZhciBmPShcIlwiK3NbMF0pLm1hdGNoKGUpfHxbXCItXCIsMCwwXSxuPWZbMF0sdT02MCorZlsxXSsgK2ZbMl07cmV0dXJuIDA9PT11PzA6XCIrXCI9PT1uP3U6LXV9KHMpLG51bGw9PT1zKSlyZXR1cm4gdGhpczt2YXIgdT1NYXRoLmFicyhzKTw9MTY/NjAqczpzLG89dGhpcztpZihmKXJldHVybiBvLiRvZmZzZXQ9dSxvLiR1PTA9PT1zLG87aWYoMCE9PXMpe3ZhciByPXRoaXMuJHU/dGhpcy50b0RhdGUoKS5nZXRUaW1lem9uZU9mZnNldCgpOi0xKnRoaXMudXRjT2Zmc2V0KCk7KG89dGhpcy5sb2NhbCgpLmFkZCh1K3IsdCkpLiRvZmZzZXQ9dSxvLiR4LiRsb2NhbE9mZnNldD1yfWVsc2Ugbz10aGlzLnV0YygpO3JldHVybiBvfTt2YXIgaD11LmZvcm1hdDt1LmZvcm1hdD1mdW5jdGlvbih0KXt2YXIgaT10fHwodGhpcy4kdT9cIllZWVktTU0tRERUSEg6bW06c3NbWl1cIjpcIlwiKTtyZXR1cm4gaC5jYWxsKHRoaXMsaSl9LHUudmFsdWVPZj1mdW5jdGlvbigpe3ZhciB0PXRoaXMuJHV0aWxzKCkudSh0aGlzLiRvZmZzZXQpPzA6dGhpcy4kb2Zmc2V0Kyh0aGlzLiR4LiRsb2NhbE9mZnNldHx8dGhpcy4kZC5nZXRUaW1lem9uZU9mZnNldCgpKTtyZXR1cm4gdGhpcy4kZC52YWx1ZU9mKCktNmU0KnR9LHUuaXNVVEM9ZnVuY3Rpb24oKXtyZXR1cm4hIXRoaXMuJHV9LHUudG9JU09TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy50b0RhdGUoKS50b0lTT1N0cmluZygpfSx1LnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudG9EYXRlKCkudG9VVENTdHJpbmcoKX07dmFyIGw9dS50b0RhdGU7dS50b0RhdGU9ZnVuY3Rpb24odCl7cmV0dXJuXCJzXCI9PT10JiZ0aGlzLiRvZmZzZXQ/bih0aGlzLmZvcm1hdChcIllZWVktTU0tREQgSEg6bW06c3M6U1NTXCIpKS50b0RhdGUoKTpsLmNhbGwodGhpcyl9O3ZhciBjPXUuZGlmZjt1LmRpZmY9ZnVuY3Rpb24odCxpLGUpe2lmKHQmJnRoaXMuJHU9PT10LiR1KXJldHVybiBjLmNhbGwodGhpcyx0LGksZSk7dmFyIHM9dGhpcy5sb2NhbCgpLGY9bih0KS5sb2NhbCgpO3JldHVybiBjLmNhbGwocyxmLGksZSl9fX0pKTsiLCIhZnVuY3Rpb24odCxlKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1lKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShlKToodD1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOnR8fHNlbGYpLmRheWpzX3BsdWdpbl90aW1lem9uZT1lKCl9KHRoaXMsKGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQ9e3llYXI6MCxtb250aDoxLGRheToyLGhvdXI6MyxtaW51dGU6NCxzZWNvbmQ6NX0sZT17fTtyZXR1cm4gZnVuY3Rpb24obixpLG8pe3ZhciByLGE9ZnVuY3Rpb24odCxuLGkpe3ZvaWQgMD09PWkmJihpPXt9KTt2YXIgbz1uZXcgRGF0ZSh0KSxyPWZ1bmN0aW9uKHQsbil7dm9pZCAwPT09biYmKG49e30pO3ZhciBpPW4udGltZVpvbmVOYW1lfHxcInNob3J0XCIsbz10K1wifFwiK2kscj1lW29dO3JldHVybiByfHwocj1uZXcgSW50bC5EYXRlVGltZUZvcm1hdChcImVuLVVTXCIse2hvdXIxMjohMSx0aW1lWm9uZTp0LHllYXI6XCJudW1lcmljXCIsbW9udGg6XCIyLWRpZ2l0XCIsZGF5OlwiMi1kaWdpdFwiLGhvdXI6XCIyLWRpZ2l0XCIsbWludXRlOlwiMi1kaWdpdFwiLHNlY29uZDpcIjItZGlnaXRcIix0aW1lWm9uZU5hbWU6aX0pLGVbb109cikscn0obixpKTtyZXR1cm4gci5mb3JtYXRUb1BhcnRzKG8pfSx1PWZ1bmN0aW9uKGUsbil7Zm9yKHZhciBpPWEoZSxuKSxyPVtdLHU9MDt1PGkubGVuZ3RoO3UrPTEpe3ZhciBmPWlbdV0scz1mLnR5cGUsbT1mLnZhbHVlLGM9dFtzXTtjPj0wJiYocltjXT1wYXJzZUludChtLDEwKSl9dmFyIGQ9clszXSxsPTI0PT09ZD8wOmQsaD1yWzBdK1wiLVwiK3JbMV0rXCItXCIrclsyXStcIiBcIitsK1wiOlwiK3JbNF0rXCI6XCIrcls1XStcIjowMDBcIix2PStlO3JldHVybihvLnV0YyhoKS52YWx1ZU9mKCktKHYtPXYlMWUzKSkvNmU0fSxmPWkucHJvdG90eXBlO2YudHo9ZnVuY3Rpb24odCxlKXt2b2lkIDA9PT10JiYodD1yKTt2YXIgbixpPXRoaXMudXRjT2Zmc2V0KCksYT10aGlzLnRvRGF0ZSgpLHU9YS50b0xvY2FsZVN0cmluZyhcImVuLVVTXCIse3RpbWVab25lOnR9KSxmPU1hdGgucm91bmQoKGEtbmV3IERhdGUodSkpLzFlMy82MCkscz0xNSotTWF0aC5yb3VuZChhLmdldFRpbWV6b25lT2Zmc2V0KCkvMTUpLWY7aWYoIU51bWJlcihzKSluPXRoaXMudXRjT2Zmc2V0KDAsZSk7ZWxzZSBpZihuPW8odSx7bG9jYWxlOnRoaXMuJEx9KS4kc2V0KFwibWlsbGlzZWNvbmRcIix0aGlzLiRtcykudXRjT2Zmc2V0KHMsITApLGUpe3ZhciBtPW4udXRjT2Zmc2V0KCk7bj1uLmFkZChpLW0sXCJtaW51dGVcIil9cmV0dXJuIG4uJHguJHRpbWV6b25lPXQsbn0sZi5vZmZzZXROYW1lPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuJHguJHRpbWV6b25lfHxvLnR6Lmd1ZXNzKCksbj1hKHRoaXMudmFsdWVPZigpLGUse3RpbWVab25lTmFtZTp0fSkuZmluZCgoZnVuY3Rpb24odCl7cmV0dXJuXCJ0aW1lem9uZW5hbWVcIj09PXQudHlwZS50b0xvd2VyQ2FzZSgpfSkpO3JldHVybiBuJiZuLnZhbHVlfTt2YXIgcz1mLnN0YXJ0T2Y7Zi5zdGFydE9mPWZ1bmN0aW9uKHQsZSl7aWYoIXRoaXMuJHh8fCF0aGlzLiR4LiR0aW1lem9uZSlyZXR1cm4gcy5jYWxsKHRoaXMsdCxlKTt2YXIgbj1vKHRoaXMuZm9ybWF0KFwiWVlZWS1NTS1ERCBISDptbTpzczpTU1NcIikse2xvY2FsZTp0aGlzLiRMfSk7cmV0dXJuIHMuY2FsbChuLHQsZSkudHoodGhpcy4keC4kdGltZXpvbmUsITApfSxvLnR6PWZ1bmN0aW9uKHQsZSxuKXt2YXIgaT1uJiZlLGE9bnx8ZXx8cixmPXUoK28oKSxhKTtpZihcInN0cmluZ1wiIT10eXBlb2YgdClyZXR1cm4gbyh0KS50eihhKTt2YXIgcz1mdW5jdGlvbih0LGUsbil7dmFyIGk9dC02MCplKjFlMyxvPXUoaSxuKTtpZihlPT09bylyZXR1cm5baSxlXTt2YXIgcj11KGktPTYwKihvLWUpKjFlMyxuKTtyZXR1cm4gbz09PXI/W2ksb106W3QtNjAqTWF0aC5taW4obyxyKSoxZTMsTWF0aC5tYXgobyxyKV19KG8udXRjKHQsaSkudmFsdWVPZigpLGYsYSksbT1zWzBdLGM9c1sxXSxkPW8obSkudXRjT2Zmc2V0KGMpO3JldHVybiBkLiR4LiR0aW1lem9uZT1hLGR9LG8udHouZ3Vlc3M9ZnVuY3Rpb24oKXtyZXR1cm4gSW50bC5EYXRlVGltZUZvcm1hdCgpLnJlc29sdmVkT3B0aW9ucygpLnRpbWVab25lfSxvLnR6LnNldERlZmF1bHQ9ZnVuY3Rpb24odCl7cj10fX19KSk7IiwiIWZ1bmN0aW9uKGUsaSl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9aSgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoaSk6KGU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczplfHxzZWxmKS5kYXlqc19wbHVnaW5faXNTYW1lT3JCZWZvcmU9aSgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3JldHVybiBmdW5jdGlvbihlLGkpe2kucHJvdG90eXBlLmlzU2FtZU9yQmVmb3JlPWZ1bmN0aW9uKGUsaSl7cmV0dXJuIHRoaXMuaXNTYW1lKGUsaSl8fHRoaXMuaXNCZWZvcmUoZSxpKX19fSkpOyIsIiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKHQpOihlPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6ZXx8c2VsZikuZGF5anNfcGx1Z2luX2lzU2FtZU9yQWZ0ZXI9dCgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3JldHVybiBmdW5jdGlvbihlLHQpe3QucHJvdG90eXBlLmlzU2FtZU9yQWZ0ZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5pc1NhbWUoZSx0KXx8dGhpcy5pc0FmdGVyKGUsdCl9fX0pKTsiLCJpbXBvcnQgZGF5anMgZnJvbSBcImRheWpzXCI7XG5pbXBvcnQgdXRjIGZyb20gXCJkYXlqcy9wbHVnaW4vdXRjXCI7XG5pbXBvcnQgdGltZXpvbmUgZnJvbSBcImRheWpzL3BsdWdpbi90aW1lem9uZVwiO1xuaW1wb3J0IGlzU2FtZU9yQmVmb3JlIGZyb20gXCJkYXlqcy9wbHVnaW4vaXNTYW1lT3JCZWZvcmVcIjtcbmltcG9ydCBpc1NhbWVPckFmdGVyIGZyb20gXCJkYXlqcy9wbHVnaW4vaXNTYW1lT3JBZnRlclwiO1xuXG4vLyBFeHRlbmQgZGF5anMgd2l0aCBwbHVnaW5zXG5kYXlqcy5leHRlbmQodXRjKTtcbmRheWpzLmV4dGVuZCh0aW1lem9uZSk7XG5kYXlqcy5leHRlbmQoaXNTYW1lT3JCZWZvcmUpO1xuZGF5anMuZXh0ZW5kKGlzU2FtZU9yQWZ0ZXIpO1xuXG5leHBvcnQgY29uc3QgZm9ybWF0RGF0ZSA9IChkYXRlOiBEYXRlLCBmb3JtYXQgPSBcIllZWVktTU0tREQgSEg6bW1cIik6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIGRheWpzKGRhdGUpLmZvcm1hdChmb3JtYXQpO1xufTtcblxuZXhwb3J0IGNvbnN0IHBhcnNlRGF0ZSA9IChkYXRlU3RyaW5nOiBzdHJpbmcpOiBEYXRlID0+IHtcbiAgICByZXR1cm4gZGF5anMoZGF0ZVN0cmluZykudG9EYXRlKCk7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkRGF5cyA9IChkYXRlOiBEYXRlLCBkYXlzOiBudW1iZXIpOiBEYXRlID0+IHtcbiAgICByZXR1cm4gZGF5anMoZGF0ZSkuYWRkKGRheXMsIFwiZGF5XCIpLnRvRGF0ZSgpO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZEhvdXJzID0gKGRhdGU6IERhdGUsIGhvdXJzOiBudW1iZXIpOiBEYXRlID0+IHtcbiAgICByZXR1cm4gZGF5anMoZGF0ZSkuYWRkKGhvdXJzLCBcImhvdXJcIikudG9EYXRlKCk7XG59O1xuXG5leHBvcnQgY29uc3QgaXNTYW1lRGF5ID0gKGRhdGUxOiBEYXRlLCBkYXRlMjogRGF0ZSk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBkYXlqcyhkYXRlMSkuaXNTYW1lKGRheWpzKGRhdGUyKSwgXCJkYXlcIik7XG59O1xuXG5leHBvcnQgY29uc3QgaXNXaXRoaW5SYW5nZSA9IChkYXRlOiBEYXRlLCBzdGFydDogRGF0ZSwgZW5kOiBEYXRlKTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgZGF5RGF0ZSA9IGRheWpzKGRhdGUpO1xuICAgIHJldHVybiBkYXlEYXRlLmlzU2FtZU9yQWZ0ZXIoZGF5anMoc3RhcnQpKSAmJiBkYXlEYXRlLmlzU2FtZU9yQmVmb3JlKGRheWpzKGVuZCkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldER1cmF0aW9uSW5NaW51dGVzID0gKHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUpOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiBkYXlqcyhlbmQpLmRpZmYoZGF5anMoc3RhcnQpLCBcIm1pbnV0ZVwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRXZWVrUmFuZ2UgPSAoZGF0ZTogRGF0ZSk6IHsgc3RhcnQ6IERhdGU7IGVuZDogRGF0ZSB9ID0+IHtcbiAgICBjb25zdCBzdGFydE9mV2VlayA9IGRheWpzKGRhdGUpLnN0YXJ0T2YoXCJ3ZWVrXCIpO1xuICAgIGNvbnN0IGVuZE9mV2VlayA9IGRheWpzKGRhdGUpLmVuZE9mKFwid2Vla1wiKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0OiBzdGFydE9mV2Vlay50b0RhdGUoKSxcbiAgICAgICAgZW5kOiBlbmRPZldlZWsudG9EYXRlKClcbiAgICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGdldE1vbnRoUmFuZ2UgPSAoZGF0ZTogRGF0ZSk6IHsgc3RhcnQ6IERhdGU7IGVuZDogRGF0ZSB9ID0+IHtcbiAgICBjb25zdCBzdGFydE9mTW9udGggPSBkYXlqcyhkYXRlKS5zdGFydE9mKFwibW9udGhcIik7XG4gICAgY29uc3QgZW5kT2ZNb250aCA9IGRheWpzKGRhdGUpLmVuZE9mKFwibW9udGhcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogc3RhcnRPZk1vbnRoLnRvRGF0ZSgpLFxuICAgICAgICBlbmQ6IGVuZE9mTW9udGgudG9EYXRlKClcbiAgICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHJvdW5kVG9OZWFyZXN0TWludXRlcyA9IChkYXRlOiBEYXRlLCBtaW51dGVzOiBudW1iZXIpOiBEYXRlID0+IHtcbiAgICBjb25zdCBkYXlEYXRlID0gZGF5anMoZGF0ZSk7XG4gICAgY29uc3Qgcm91bmRlZE1pbnV0ZXMgPSBNYXRoLnJvdW5kKGRheURhdGUubWludXRlKCkgLyBtaW51dGVzKSAqIG1pbnV0ZXM7XG4gICAgcmV0dXJuIGRheURhdGUubWludXRlKHJvdW5kZWRNaW51dGVzKS5zZWNvbmQoMCkubWlsbGlzZWNvbmQoMCkudG9EYXRlKCk7XG59O1xuXG4vLyBTaGlmdC1zcGVjaWZpYyBkYXRlIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IGdldFNoaWZ0Qm91bmRhcnkgPSAoZGF0ZTogRGF0ZSwgc2hpZnRUeXBlOiBzdHJpbmcpOiB7IHN0YXJ0OiBEYXRlOyBlbmQ6IERhdGUgfSA9PiB7XG4gICAgY29uc3QgZGF5ID0gZGF5anMoZGF0ZSk7XG5cbiAgICBzd2l0Y2ggKHNoaWZ0VHlwZSkge1xuICAgICAgICBjYXNlIFwiTVwiOiAvLyBNb3JuaW5nICgwNjowMC0xNDowMClcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IGRheS5ob3VyKDYpLm1pbnV0ZSgwKS5zZWNvbmQoMCkudG9EYXRlKCksXG4gICAgICAgICAgICAgICAgZW5kOiBkYXkuaG91cigxNCkubWludXRlKDApLnNlY29uZCgwKS50b0RhdGUoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBcIkVcIjogLy8gRXZlbmluZyAoMTQ6MDAtMjI6MDApXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBkYXkuaG91cigxNCkubWludXRlKDApLnNlY29uZCgwKS50b0RhdGUoKSxcbiAgICAgICAgICAgICAgICBlbmQ6IGRheS5ob3VyKDIyKS5taW51dGUoMCkuc2Vjb25kKDApLnRvRGF0ZSgpXG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIFwiTlwiOiAvLyBOaWdodCAoMjI6MDAtMDY6MDAgbmV4dCBkYXkpXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBkYXkuaG91cigyMikubWludXRlKDApLnNlY29uZCgwKS50b0RhdGUoKSxcbiAgICAgICAgICAgICAgICBlbmQ6IGRheS5hZGQoMSwgXCJkYXlcIikuaG91cig2KS5taW51dGUoMCkuc2Vjb25kKDApLnRvRGF0ZSgpXG4gICAgICAgICAgICB9O1xuICAgICAgICBkZWZhdWx0OiAvLyBEYXkgc2hpZnQgKDA4OjAwLTE3OjAwKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDogZGF5LmhvdXIoOCkubWludXRlKDApLnNlY29uZCgwKS50b0RhdGUoKSxcbiAgICAgICAgICAgICAgICBlbmQ6IGRheS5ob3VyKDE3KS5taW51dGUoMCkuc2Vjb25kKDApLnRvRGF0ZSgpXG4gICAgICAgICAgICB9O1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXQzMERheVJhbmdlID0gKHN0YXJ0RGF0ZTogRGF0ZSk6IHsgc3RhcnQ6IERhdGU7IGVuZDogRGF0ZSB9ID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogZGF5anMoc3RhcnREYXRlKS5zdGFydE9mKFwiZGF5XCIpLnRvRGF0ZSgpLFxuICAgICAgICBlbmQ6IGRheWpzKHN0YXJ0RGF0ZSkuYWRkKDI5LCBcImRheXNcIikuZW5kT2YoXCJkYXlcIikudG9EYXRlKClcbiAgICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGdldERhdGVSYW5nZUFycmF5ID0gKHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUpOiBEYXRlW10gPT4ge1xuICAgIGNvbnN0IGRhdGVzOiBEYXRlW10gPSBbXTtcbiAgICBsZXQgY3VycmVudCA9IGRheWpzKHN0YXJ0KTtcbiAgICBjb25zdCBlbmREYXkgPSBkYXlqcyhlbmQpO1xuXG4gICAgd2hpbGUgKGN1cnJlbnQuaXNTYW1lT3JCZWZvcmUoZW5kRGF5LCBcImRheVwiKSkge1xuICAgICAgICBkYXRlcy5wdXNoKGN1cnJlbnQudG9EYXRlKCkpO1xuICAgICAgICBjdXJyZW50ID0gY3VycmVudC5hZGQoMSwgXCJkYXlcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGVzO1xufTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdFNoaWZ0RGF0ZSA9IChkYXRlOiBEYXRlKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gZGF5anMoZGF0ZSkuZm9ybWF0KFwiTU1NIEREXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdFNoaWZ0V2Vla2RheSA9IChkYXRlOiBEYXRlKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gZGF5anMoZGF0ZSkuZm9ybWF0KFwiZGRkXCIpO1xufTtcblxuLy8gTGVnYWN5IGNvbXBhdGliaWxpdHkgZnVuY3Rpb25zIChrZWVwaW5nIHNhbWUgbmFtZXMgYXMgZGF0ZS1mbnMgdmVyc2lvbilcbmV4cG9ydCBjb25zdCBnZW5lcmF0ZURhdGVSYW5nZSA9IChzdGFydERhdGU6IERhdGUsIGRheXNDb3VudDogbnVtYmVyKTogRGF0ZVtdID0+IHtcbiAgICBjb25zdCBkYXRlczogRGF0ZVtdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXlzQ291bnQ7IGkrKykge1xuICAgICAgICBkYXRlcy5wdXNoKGFkZERheXMoc3RhcnREYXRlLCBpKSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRlcztcbn07XG5cbmV4cG9ydCBjb25zdCBmb3JtYXREYXRlRm9yU2hpZnQgPSAoZGF0ZTogRGF0ZSk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIGRheWpzKGRhdGUpLmZvcm1hdChcIllZWVktTU0tRERcIik7XG59O1xuXG5leHBvcnQgY29uc3QgaXNUb2RheSA9IChkYXRlOiBEYXRlKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIGlzU2FtZURheShkYXRlLCBuZXcgRGF0ZSgpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1dlZWtlbmQgPSAoZGF0ZTogRGF0ZSk6IGJvb2xlYW4gPT4ge1xuICAgIGNvbnN0IGRheSA9IGRheWpzKGRhdGUpLmRheSgpO1xuICAgIHJldHVybiBkYXkgPT09IDAgfHwgZGF5ID09PSA2OyAvLyBTdW5kYXkgPSAwLCBTYXR1cmRheSA9IDZcbn07XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlUmVmLCB1c2VDYWxsYmFjaywgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VJblZpZXcgfSBmcm9tIFwicmVhY3QtaW50ZXJzZWN0aW9uLW9ic2VydmVyXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlU2Nyb2xsTmF2aWdhdGlvblJldHVybiB7XG4gICAgaGVhZGVyU2Nyb2xsUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQ+O1xuICAgIGNvbnRlbnRTY3JvbGxSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudD47XG4gICAgaXNTY3JvbGxpbmc6IFJlYWN0Lk11dGFibGVSZWZPYmplY3Q8Ym9vbGVhbj47XG4gICAgaW5maW5pdGVTY3JvbGxSZWY6IChub2RlPzogRWxlbWVudCB8IG51bGwpID0+IHZvaWQ7XG4gICAgaXNJbmZpbml0ZVNjcm9sbFZpc2libGU6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQ3VzdG9tIGhvb2sgZm9yIG1hbmFnaW5nIHNjcm9sbCBzeW5jaHJvbml6YXRpb24gYW5kIGluZmluaXRlIGxvYWRpbmdcbiAqIEVuc3VyZXMgdW5pZmllZCBzY3JvbGxpbmcgZXhwZXJpZW5jZSBhbmQgaGFuZGxlcyBsYXp5IGxvYWRpbmcgb2YgYWRkaXRpb25hbCB0aW1lbGluZSBkYXRhXG4gKi9cbmV4cG9ydCBjb25zdCB1c2VTY3JvbGxOYXZpZ2F0aW9uID0gKCk6IFVzZVNjcm9sbE5hdmlnYXRpb25SZXR1cm4gPT4ge1xuICAgIC8vIFJlZnMgZm9yIHNjcm9sbCBzeW5jaHJvbml6YXRpb25cbiAgICBjb25zdCBoZWFkZXJTY3JvbGxSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuICAgIGNvbnN0IGNvbnRlbnRTY3JvbGxSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuICAgIGNvbnN0IGlzU2Nyb2xsaW5nID0gdXNlUmVmKGZhbHNlKTtcblxuICAgIC8vIEluZmluaXRlIHNjcm9sbCAvIGxhenkgbG9hZGluZyB3aXRoIGludGVyc2VjdGlvbiBvYnNlcnZlclxuICAgIGNvbnN0IHsgcmVmOiBpbmZpbml0ZVNjcm9sbFJlZiwgaW5WaWV3OiBpc0luZmluaXRlU2Nyb2xsVmlzaWJsZSB9ID0gdXNlSW5WaWV3KHtcbiAgICAgICAgcm9vdE1hcmdpbjogXCIwcHhcIixcbiAgICAgICAgdGhyZXNob2xkOiAxXG4gICAgfSk7XG5cbiAgICAvLyBTY3JvbGwgc3luY2hyb25pemF0aW9uIGJldHdlZW4gaGVhZGVyIGFuZCBjb250ZW50XG4gICAgY29uc3Qgc3luY1Njcm9sbCA9IHVzZUNhbGxiYWNrKChzb3VyY2U6IEhUTUxEaXZFbGVtZW50LCB0YXJnZXQ6IEhUTUxEaXZFbGVtZW50KSA9PiB7XG4gICAgICAgIGlmIChpc1Njcm9sbGluZy5jdXJyZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaXNTY3JvbGxpbmcuY3VycmVudCA9IHRydWU7XG4gICAgICAgIHRhcmdldC5zY3JvbGxMZWZ0ID0gc291cmNlLnNjcm9sbExlZnQ7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaXNTY3JvbGxpbmcuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICB9LCAxMCk7XG4gICAgfSwgW10pO1xuXG4gICAgLy8gU2V0IHVwIHNjcm9sbCBldmVudCBsaXN0ZW5lcnMgZm9yIHN5bmNocm9uaXphdGlvblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhlYWRlckVsID0gaGVhZGVyU2Nyb2xsUmVmLmN1cnJlbnQ7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRFbCA9IGNvbnRlbnRTY3JvbGxSZWYuY3VycmVudDtcblxuICAgICAgICBpZiAoIWhlYWRlckVsIHx8ICFjb250ZW50RWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGhhbmRsZUhlYWRlclNjcm9sbCA9ICgpOiB2b2lkID0+IHN5bmNTY3JvbGwoaGVhZGVyRWwsIGNvbnRlbnRFbCk7XG4gICAgICAgIGNvbnN0IGhhbmRsZUNvbnRlbnRTY3JvbGwgPSAoKTogdm9pZCA9PiBzeW5jU2Nyb2xsKGNvbnRlbnRFbCwgaGVhZGVyRWwpO1xuXG4gICAgICAgIGhlYWRlckVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlSGVhZGVyU2Nyb2xsLCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgICAgIGNvbnRlbnRFbC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZUNvbnRlbnRTY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgaGVhZGVyRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVIZWFkZXJTY3JvbGwpO1xuICAgICAgICAgICAgY29udGVudEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlQ29udGVudFNjcm9sbCk7XG4gICAgICAgIH07XG4gICAgfSwgW3N5bmNTY3JvbGxdKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGhlYWRlclNjcm9sbFJlZixcbiAgICAgICAgY29udGVudFNjcm9sbFJlZixcbiAgICAgICAgaXNTY3JvbGxpbmcsXG4gICAgICAgIGluZmluaXRlU2Nyb2xsUmVmLFxuICAgICAgICBpc0luZmluaXRlU2Nyb2xsVmlzaWJsZVxuICAgIH07XG59O1xuIiwiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFZhbGlkYXRpb25FcnJvciB9IGZyb20gXCIuLi90eXBlcy9zaGlmdFNjaGVkdWxlclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRpbmdTdGF0ZXNQcm9wcyB7XG4gICAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICAgIHN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcztcbiAgICB0YWJJbmRleD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFcnJvclN0YXRlUHJvcHMgZXh0ZW5kcyBMb2FkaW5nU3RhdGVzUHJvcHMge1xuICAgIGVycm9yOiBWYWxpZGF0aW9uRXJyb3I7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW1wdHlTdGF0ZVByb3BzIGV4dGVuZHMgTG9hZGluZ1N0YXRlc1Byb3BzIHtcbiAgICBtZXNzYWdlPzogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIExvYWRpbmcgc3Bpbm5lciBjb21wb25lbnQgZm9yIGRhdGEgbG9hZGluZyBzdGF0ZXNcbiAqL1xuZXhwb3J0IGNvbnN0IExvYWRpbmdTdGF0ZTogUmVhY3QuRkM8TG9hZGluZ1N0YXRlc1Byb3BzPiA9ICh7IGNsYXNzTmFtZSA9IFwiXCIsIHN0eWxlLCB0YWJJbmRleCB9KSA9PiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2BzaGlmdC1zY2hlZHVsZXIgJHtjbGFzc05hbWV9YH0gc3R5bGU9e3N0eWxlfSB0YWJJbmRleD17dGFiSW5kZXh9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNoaWZ0LXNjaGVkdWxlci1sb2FkaW5nXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvYWRpbmctc3Bpbm5lclwiPjwvZGl2PlxuICAgICAgICAgICAgPHA+TG9hZGluZyBzY2hlZHVsZSBkYXRhLi4uPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbik7XG5cbi8qKlxuICogRXJyb3Igc3RhdGUgY29tcG9uZW50IHdpdGggZGV0YWlsZWQgZXJyb3IgaW5mb3JtYXRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IEVycm9yU3RhdGU6IFJlYWN0LkZDPEVycm9yU3RhdGVQcm9wcz4gPSAoeyBlcnJvciwgY2xhc3NOYW1lID0gXCJcIiwgc3R5bGUsIHRhYkluZGV4IH0pID0+IChcbiAgICA8ZGl2IGNsYXNzTmFtZT17YHNoaWZ0LXNjaGVkdWxlciAke2NsYXNzTmFtZX1gfSBzdHlsZT17c3R5bGV9IHRhYkluZGV4PXt0YWJJbmRleH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2hpZnQtc2NoZWR1bGVyLWVycm9yXCI+XG4gICAgICAgICAgICA8aDM+4pqg77iPIENvbmZpZ3VyYXRpb24gRXJyb3I8L2gzPlxuICAgICAgICAgICAgPHA+e2Vycm9yLm1lc3NhZ2V9PC9wPlxuICAgICAgICAgICAge2Vycm9yLnByb3BlcnR5ICYmIChcbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgPHNtYWxsPkNoZWNrIHRoZSB7ZXJyb3IucHJvcGVydHl9IHByb3BlcnR5IGluIHRoZSB3aWRnZXQgY29uZmlndXJhdGlvbi48L3NtYWxsPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8ZGV0YWlscyBjbGFzc05hbWU9XCJlcnJvci1kZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgPHN1bW1hcnk+VGVjaG5pY2FsIERldGFpbHM8L3N1bW1hcnk+XG4gICAgICAgICAgICAgICAgPHByZT57SlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpfTwvcHJlPlxuICAgICAgICAgICAgPC9kZXRhaWxzPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbik7XG5cbi8qKlxuICogRW1wdHkgc3RhdGUgY29tcG9uZW50IHdoZW4gbm8gZGF0YSBpcyBhdmFpbGFibGVcbiAqL1xuZXhwb3J0IGNvbnN0IEVtcHR5U3RhdGU6IFJlYWN0LkZDPEVtcHR5U3RhdGVQcm9wcz4gPSAoe1xuICAgIG1lc3NhZ2UgPSBcIk5vIERhdGEgQXZhaWxhYmxlXCIsXG4gICAgZGVzY3JpcHRpb24gPSBcIk5vIGVuZ2luZWVycyBmb3VuZC4gUGxlYXNlIGNoZWNrIHlvdXIgZGF0YSBzb3VyY2UgY29uZmlndXJhdGlvbi5cIixcbiAgICBjbGFzc05hbWUgPSBcIlwiLFxuICAgIHN0eWxlLFxuICAgIHRhYkluZGV4XG59KSA9PiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2BzaGlmdC1zY2hlZHVsZXIgJHtjbGFzc05hbWV9YH0gc3R5bGU9e3N0eWxlfSB0YWJJbmRleD17dGFiSW5kZXh9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNoaWZ0LXNjaGVkdWxlci1lbXB0eVwiPlxuICAgICAgICAgICAgPGgzPvCfk4Uge21lc3NhZ2V9PC9oMz5cbiAgICAgICAgICAgIDxwPntkZXNjcmlwdGlvbn08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuKTtcblxuLyoqXG4gKiBGYWxsYmFjayBlcnJvciBib3VuZGFyeSBjb21wb25lbnQgZm9yIHVuZXhwZWN0ZWQgZXJyb3JzXG4gKi9cbmludGVyZmFjZSBFcnJvckJvdW5kYXJ5U3RhdGUge1xuICAgIGhhc0Vycm9yOiBib29sZWFuO1xuICAgIGVycm9yPzogRXJyb3I7XG4gICAgZXJyb3JJbmZvPzogUmVhY3QuRXJyb3JJbmZvO1xufVxuXG5leHBvcnQgY2xhc3MgU2NoZWR1bGVyRXJyb3JCb3VuZGFyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxcbiAgICBSZWFjdC5Qcm9wc1dpdGhDaGlsZHJlbjxMb2FkaW5nU3RhdGVzUHJvcHM+LFxuICAgIEVycm9yQm91bmRhcnlTdGF0ZVxuPiB7XG4gICAgY29uc3RydWN0b3IocHJvcHM6IFJlYWN0LlByb3BzV2l0aENoaWxkcmVuPExvYWRpbmdTdGF0ZXNQcm9wcz4pIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0geyBoYXNFcnJvcjogZmFsc2UgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRDYXRjaChlcnJvcjogRXJyb3IsIGVycm9ySW5mbzogUmVhY3QuRXJyb3JJbmZvKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTaGlmdCBTY2hlZHVsZXIgRXJyb3IgQm91bmRhcnkgY2F1Z2h0IGFuIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBJbmZvOlwiLCBlcnJvckluZm8pO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaGFzRXJyb3I6IHRydWUsXG4gICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgIGVycm9ySW5mb1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKTogUmVhY3QuUmVhY3ROb2RlIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaGFzRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BzaGlmdC1zY2hlZHVsZXIgJHt0aGlzLnByb3BzLmNsYXNzTmFtZSB8fCBcIlwifWB9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGhpcy5wcm9wcy50YWJJbmRleH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2hpZnQtc2NoZWR1bGVyLWVycm9yLWJvdW5kYXJ5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDM+8J+boO+4jyBTb21ldGhpbmcgd2VudCB3cm9uZzwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5UaGUgU2hpZnQgU2NoZWR1bGVyIGVuY291bnRlcmVkIGFuIHVuZXhwZWN0ZWQgZXJyb3IuPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRldGFpbHMgY2xhc3NOYW1lPVwiZXJyb3ItYm91bmRhcnktZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdW1tYXJ5PkVycm9yIERldGFpbHM8L3N1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PkVycm9yOjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHByZT57dGhpcy5zdGF0ZS5lcnJvcj8udG9TdHJpbmcoKX08L3ByZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5lcnJvckluZm8gJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PkNvbXBvbmVudCBTdGFjazo8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHByZT57dGhpcy5zdGF0ZS5lcnJvckluZm8uY29tcG9uZW50U3RhY2t9PC9wcmU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IGhhc0Vycm9yOiBmYWxzZSwgZXJyb3I6IHVuZGVmaW5lZCwgZXJyb3JJbmZvOiB1bmRlZmluZWQgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZXJyb3ItYm91bmRhcnktcmV0cnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyeSBBZ2FpblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IoZXJyb3I6IEVycm9yKTogRXJyb3JCb3VuZGFyeVN0YXRlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhhc0Vycm9yOiB0cnVlLFxuICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8qKlxuICogSGlnaGVyLW9yZGVyIGNvbXBvbmVudCB0byB3cmFwIGFueSBjb21wb25lbnQgd2l0aCBlcnJvciBib3VuZGFyeVxuICovXG5leHBvcnQgY29uc3Qgd2l0aEVycm9yQm91bmRhcnkgPSA8UCBleHRlbmRzIG9iamVjdD4oXG4gICAgQ29tcG9uZW50OiBSZWFjdC5Db21wb25lbnRUeXBlPFA+XG4pOiBSZWFjdC5GQzxQICYgTG9hZGluZ1N0YXRlc1Byb3BzPiA9PiB7XG4gICAgY29uc3QgV3JhcHBlZENvbXBvbmVudDogUmVhY3QuRkM8UCAmIExvYWRpbmdTdGF0ZXNQcm9wcz4gPSBwcm9wcyA9PiAoXG4gICAgICAgIDxTY2hlZHVsZXJFcnJvckJvdW5kYXJ5IGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfSBzdHlsZT17cHJvcHMuc3R5bGV9IHRhYkluZGV4PXtwcm9wcy50YWJJbmRleH0+XG4gICAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz5cbiAgICAgICAgPC9TY2hlZHVsZXJFcnJvckJvdW5kYXJ5PlxuICAgICk7XG5cbiAgICBXcmFwcGVkQ29tcG9uZW50LmRpc3BsYXlOYW1lID0gYHdpdGhFcnJvckJvdW5kYXJ5KCR7Q29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC5uYW1lfSlgO1xuICAgIHJldHVybiBXcmFwcGVkQ29tcG9uZW50O1xufTtcbiIsImltcG9ydCB7IFNoaWZ0QXNzaWdubWVudCB9IGZyb20gXCIuLi90eXBlcy9zaGlmdFNjaGVkdWxlclwiO1xuXG4vLyBTaGlmdCBjb2xvciBtYXBwaW5nc1xuZXhwb3J0IGNvbnN0IFNISUZUX0NPTE9SUyA9IHtcbiAgICBNOiBcIiMyMTk2RjNcIiwgLy8gTW9ybmluZyAtIEJsdWVcbiAgICBFOiBcIiM0Q0FGNTBcIiwgLy8gRXZlbmluZyAtIEdyZWVuXG4gICAgTjogXCIjRkY5ODAwXCIsIC8vIE5pZ2h0IC0gT3JhbmdlXG4gICAgRDogXCIjRjQ0MzM2XCIsIC8vIERheSBvZmYgLSBSZWRcbiAgICBIOiBcIiM5RTlFOUVcIiwgLy8gSG9saWRheSAtIEdyYXlcbiAgICBUOiBcIiNGRkVCM0JcIiAvLyBUcmFpbmluZyAtIFllbGxvd1xufSBhcyBjb25zdDtcblxuLy8gUm9sZSBpbmRpY2F0b3JzXG5leHBvcnQgY29uc3QgUk9MRV9TVFlMRVMgPSB7XG4gICAgVEw6IFwic29saWRcIiwgLy8gVGVhbSBMZWFkZXIgLSBzb2xpZCBib3JkZXJcbiAgICBCVEw6IFwiZGFzaGVkXCIsIC8vIEJhY2t1cCBUZWFtIExlYWRlciAtIGRhc2hlZCBib3JkZXJcbiAgICBTUEU6IFwiZG90dGVkXCIsIC8vIFNwZWNpYWxpc3QgLSBkb3R0ZWQgYm9yZGVyXG4gICAgT1NJOiBcImRvdWJsZVwiIC8vIE90aGVyIC0gZG91YmxlIGJvcmRlclxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgU2hpZnRUeXBlID0ga2V5b2YgdHlwZW9mIFNISUZUX0NPTE9SUztcbmV4cG9ydCB0eXBlIFJvbGVUeXBlID0ga2V5b2YgdHlwZW9mIFJPTEVfU1RZTEVTO1xuXG4vKipcbiAqIEdldCB0aGUgY29sb3IgZm9yIGEgc2hpZnQgdHlwZVxuICovXG5leHBvcnQgY29uc3QgZ2V0U2hpZnRDb2xvciA9IChzaGlmdFR5cGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIFNISUZUX0NPTE9SU1tzaGlmdFR5cGUgYXMgU2hpZnRUeXBlXSB8fCBcIiM2MDdEOEJcIjsgLy8gRGVmYXVsdCBncmF5LWJsdWVcbn07XG5cbi8qKlxuICogR2V0IHRoZSBib3JkZXIgc3R5bGUgZm9yIGEgcm9sZVxuICovXG5leHBvcnQgY29uc3QgZ2V0Um9sZUJvcmRlclN0eWxlID0gKHJvbGU/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGlmICghcm9sZSkge1xuICAgICAgICByZXR1cm4gXCJzb2xpZFwiO1xuICAgIH1cbiAgICByZXR1cm4gUk9MRV9TVFlMRVNbcm9sZSBhcyBSb2xlVHlwZV0gfHwgXCJzb2xpZFwiO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBhIHNoaWZ0IGlzIGEgd29ya2luZyBzaGlmdCAobm90IGRheSBvZmYgb3IgaG9saWRheSlcbiAqL1xuZXhwb3J0IGNvbnN0IGlzV29ya2luZ1NoaWZ0ID0gKHNoaWZ0VHlwZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuICFbXCJEXCIsIFwiSFwiXS5pbmNsdWRlcyhzaGlmdFR5cGUpO1xufTtcblxuLyoqXG4gKiBHZXQgc2hpZnQgZGlzcGxheSBuYW1lXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRTaGlmdERpc3BsYXlOYW1lID0gKHNoaWZ0VHlwZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCBuYW1lcyA9IHtcbiAgICAgICAgTTogXCJNb3JuaW5nXCIsXG4gICAgICAgIEU6IFwiRXZlbmluZ1wiLFxuICAgICAgICBOOiBcIk5pZ2h0XCIsXG4gICAgICAgIEQ6IFwiRGF5IE9mZlwiLFxuICAgICAgICBIOiBcIkhvbGlkYXlcIixcbiAgICAgICAgVDogXCJUcmFpbmluZ1wiXG4gICAgfTtcbiAgICByZXR1cm4gbmFtZXNbc2hpZnRUeXBlIGFzIFNoaWZ0VHlwZV0gfHwgc2hpZnRUeXBlO1xufTtcblxuLyoqXG4gKiBHZXQgc2hvcnQgZGlzcGxheSB0ZXh0IGZvciBhIHNoaWZ0ICh1c2VkIGluIGRheSBjZWxscylcbiAqL1xuZXhwb3J0IGNvbnN0IGdldFNoaWZ0RGlzcGxheVRleHQgPSAoc2hpZnRUeXBlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBzaGlmdFR5cGUgfHwgXCI/XCI7XG59O1xuXG4vKipcbiAqIFZhbGlkYXRlIHNoaWZ0IGFzc2lnbm1lbnQgcnVsZXNcbiAqL1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlU2hpZnRBc3NpZ25tZW50ID0gKFxuICAgIGFzc2lnbm1lbnQ6IFBhcnRpYWw8U2hpZnRBc3NpZ25tZW50PixcbiAgICBleGlzdGluZ1NoaWZ0czogU2hpZnRBc3NpZ25tZW50W11cbik6IHsgaXNWYWxpZDogYm9vbGVhbjsgZXJyb3JzOiBzdHJpbmdbXSB9ID0+IHtcbiAgICBjb25zdCBlcnJvcnM6IHN0cmluZ1tdID0gW107XG5cbiAgICAvLyBDaGVjayBmb3Igb3ZlcmxhcHBpbmcgc2hpZnRzIG9uIHNhbWUgZGF0ZVxuICAgIGNvbnN0IHNhbWVEYXRlID0gZXhpc3RpbmdTaGlmdHMuZmlsdGVyKFxuICAgICAgICBzID0+IHMuZGF0ZSA9PT0gYXNzaWdubWVudC5kYXRlICYmIHMuZW5naW5lZXJJZCA9PT0gYXNzaWdubWVudC5lbmdpbmVlcklkICYmIHMuaWQgIT09IGFzc2lnbm1lbnQuaWRcbiAgICApO1xuXG4gICAgaWYgKHNhbWVEYXRlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZXJyb3JzLnB1c2goXCJFbmdpbmVlciBhbHJlYWR5IGhhcyBhIHNoaWZ0IGFzc2lnbmVkIGZvciB0aGlzIGRhdGVcIik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgbmlnaHQgc2hpZnQgZm9sbG93ZWQgYnkgbW9ybmluZyBzaGlmdCAoaW5zdWZmaWNpZW50IHJlc3QpXG4gICAgaWYgKGFzc2lnbm1lbnQuc2hpZnQgPT09IFwiTVwiKSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzRGF5ID0gbmV3IERhdGUoYXNzaWdubWVudC5kYXRlISk7XG4gICAgICAgIHByZXZpb3VzRGF5LnNldERhdGUocHJldmlvdXNEYXkuZ2V0RGF0ZSgpIC0gMSk7XG4gICAgICAgIGNvbnN0IHByZXZEYXlTdHJpbmcgPSBwcmV2aW91c0RheS50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKVswXTtcblxuICAgICAgICBjb25zdCBwcmV2TmlnaHRTaGlmdCA9IGV4aXN0aW5nU2hpZnRzLmZpbmQoXG4gICAgICAgICAgICBzID0+IHMuZGF0ZSA9PT0gcHJldkRheVN0cmluZyAmJiBzLmVuZ2luZWVySWQgPT09IGFzc2lnbm1lbnQuZW5naW5lZXJJZCAmJiBzLnNoaWZ0ID09PSBcIk5cIlxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChwcmV2TmlnaHRTaGlmdCkge1xuICAgICAgICAgICAgZXJyb3JzLnB1c2goXCJJbnN1ZmZpY2llbnQgcmVzdDogTmlnaHQgc2hpZnQgZm9sbG93ZWQgYnkgTW9ybmluZyBzaGlmdFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGlzVmFsaWQ6IGVycm9ycy5sZW5ndGggPT09IDAsXG4gICAgICAgIGVycm9yc1xuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCBzaGlmdCBzdGF0aXN0aWNzIGZvciBhbiBlbmdpbmVlciBvdmVyIGEgZGF0ZSByYW5nZVxuICovXG5leHBvcnQgY29uc3QgZ2V0U2hpZnRTdGF0cyA9IChcbiAgICBlbmdpbmVlcklkOiBzdHJpbmcsXG4gICAgc2hpZnRzOiBTaGlmdEFzc2lnbm1lbnRbXSxcbiAgICBzdGFydERhdGU6IHN0cmluZyxcbiAgICBlbmREYXRlOiBzdHJpbmdcbik6IHtcbiAgICB0b3RhbDogbnVtYmVyO1xuICAgIG1vcm5pbmc6IG51bWJlcjtcbiAgICBldmVuaW5nOiBudW1iZXI7XG4gICAgbmlnaHQ6IG51bWJlcjtcbiAgICBkYXlPZmY6IG51bWJlcjtcbiAgICBob2xpZGF5OiBudW1iZXI7XG4gICAgdHJhaW5pbmc6IG51bWJlcjtcbn0gPT4ge1xuICAgIGNvbnN0IGVuZ2luZWVyU2hpZnRzID0gc2hpZnRzLmZpbHRlcihzID0+IHMuZW5naW5lZXJJZCA9PT0gZW5naW5lZXJJZCAmJiBzLmRhdGUgPj0gc3RhcnREYXRlICYmIHMuZGF0ZSA8PSBlbmREYXRlKTtcblxuICAgIGNvbnN0IHN0YXRzID0ge1xuICAgICAgICB0b3RhbDogZW5naW5lZXJTaGlmdHMubGVuZ3RoLFxuICAgICAgICBtb3JuaW5nOiAwLFxuICAgICAgICBldmVuaW5nOiAwLFxuICAgICAgICBuaWdodDogMCxcbiAgICAgICAgZGF5T2ZmOiAwLFxuICAgICAgICBob2xpZGF5OiAwLFxuICAgICAgICB0cmFpbmluZzogMFxuICAgIH07XG5cbiAgICBlbmdpbmVlclNoaWZ0cy5mb3JFYWNoKHNoaWZ0ID0+IHtcbiAgICAgICAgc3dpdGNoIChzaGlmdC5zaGlmdCkge1xuICAgICAgICAgICAgY2FzZSBcIk1cIjpcbiAgICAgICAgICAgICAgICBzdGF0cy5tb3JuaW5nKys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRVwiOlxuICAgICAgICAgICAgICAgIHN0YXRzLmV2ZW5pbmcrKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJOXCI6XG4gICAgICAgICAgICAgICAgc3RhdHMubmlnaHQrKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJEXCI6XG4gICAgICAgICAgICAgICAgc3RhdHMuZGF5T2ZmKys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiSFwiOlxuICAgICAgICAgICAgICAgIHN0YXRzLmhvbGlkYXkrKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJUXCI6XG4gICAgICAgICAgICAgICAgc3RhdHMudHJhaW5pbmcrKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN0YXRzO1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBDU1MgY2xhc3MgbmFtZXMgZm9yIGEgc2hpZnQgY2VsbFxuICovXG5leHBvcnQgY29uc3QgZ2V0U2hpZnRDU1NDbGFzc2VzID0gKHNoaWZ0PzogU2hpZnRBc3NpZ25tZW50KTogc3RyaW5nID0+IHtcbiAgICBpZiAoIXNoaWZ0KSB7XG4gICAgICAgIHJldHVybiBcImRheS1jZWxsIGVtcHR5XCI7XG4gICAgfVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IFtcImRheS1jZWxsXCIsIFwiaGFzLXNoaWZ0XCJdO1xuXG4gICAgLy8gQWRkIHNoaWZ0IHR5cGUgY2xhc3NcbiAgICBjbGFzc2VzLnB1c2goYHNoaWZ0LSR7c2hpZnQuc2hpZnQ/LnRvTG93ZXJDYXNlKCkgfHwgXCJ1bmtub3duXCJ9YCk7XG5cbiAgICAvLyBBZGQgc3RhdHVzIGNsYXNzXG4gICAgaWYgKHNoaWZ0LnN0YXR1cykge1xuICAgICAgICBjbGFzc2VzLnB1c2goYHN0YXR1cy0ke3NoaWZ0LnN0YXR1cy50b0xvd2VyQ2FzZSgpfWApO1xuICAgIH1cblxuICAgIC8vIEFkZCBldmVudCB0eXBlIGNsYXNzXG4gICAgaWYgKHNoaWZ0LmV2ZW50VHlwZSkge1xuICAgICAgICBjbGFzc2VzLnB1c2goYGV2ZW50LSR7c2hpZnQuZXZlbnRUeXBlLnRvTG93ZXJDYXNlKCl9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzZXMuam9pbihcIiBcIik7XG59O1xuIiwiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUVsZW1lbnQsIE1vdXNlRXZlbnQsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IERheUNlbGxQcm9wcyB9IGZyb20gXCIuLi90eXBlcy9zaGlmdFNjaGVkdWxlclwiO1xuaW1wb3J0IHsgZ2V0U2hpZnRDb2xvciwgZ2V0U2hpZnREaXNwbGF5VGV4dCB9IGZyb20gXCIuLi91dGlscy9zaGlmdEhlbHBlcnNcIjtcblxuY29uc3QgRGF5Q2VsbDogUmVhY3QuRkM8RGF5Q2VsbFByb3BzPiA9ICh7XG4gICAgZGF0ZSxcbiAgICBlbmdpbmVlcixcbiAgICBzaGlmdCxcbiAgICBpc1RvZGF5ID0gZmFsc2UsXG4gICAgaXNXZWVrZW5kID0gZmFsc2UsXG4gICAgaXNTZWxlY3RlZCA9IGZhbHNlLFxuICAgIHNoaWZ0c0xvYWRpbmcgPSBmYWxzZSxcbiAgICBvbkRvdWJsZUNsaWNrLFxuICAgIG9uQ2VsbENsaWNrLFxuICAgIG9uQ29udGV4dE1lbnUsXG4gICAgcmVhZE9ubHkgPSBmYWxzZVxufSkgPT4ge1xuICAgIC8vIE1lbW9pemUgY2VsbCBzdHlsaW5nIGFuZCBjb250ZW50IGZvciBwZXJmb3JtYW5jZVxuICAgIGNvbnN0IGNlbGxEYXRhID0gdXNlTWVtbygoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRheU51bWJlciA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICBjb25zdCBzaGlmdENvbG9yID0gc2hpZnQgPyBnZXRTaGlmdENvbG9yKHNoaWZ0LnNoaWZ0KSA6IG51bGw7XG4gICAgICAgIGNvbnN0IHNoaWZ0VGV4dCA9IHNoaWZ0ID8gZ2V0U2hpZnREaXNwbGF5VGV4dChzaGlmdC5zaGlmdCkgOiBudWxsO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXlOdW1iZXIsXG4gICAgICAgICAgICBzaGlmdENvbG9yLFxuICAgICAgICAgICAgc2hpZnRUZXh0LFxuICAgICAgICAgICAgaGFzU2hpZnQ6ICEhc2hpZnQsXG4gICAgICAgICAgICBpc0Vycm9yOiBzaGlmdD8uc3RhdHVzID09PSBcImVycm9yXCJcbiAgICAgICAgfTtcbiAgICB9LCBbZGF0ZSwgc2hpZnRdKTtcblxuICAgIGNvbnN0IGhhbmRsZUNvbnRleHQgPSAoZTogTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKHJlYWRPbmx5IHx8ICFvbkNvbnRleHRNZW51KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IGRhdGUudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF07XG4gICAgICAgIG9uQ29udGV4dE1lbnUoZSwgZW5naW5lZXIsIGRhdGVTdHJpbmcsIHNoaWZ0KTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlRG91YmxlQ2xpY2sgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGlmIChyZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBvbkRvdWJsZUNsaWNrKCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBpbiBEYXlDZWxsIG9uRG91YmxlQ2xpY2sgZm9yICR7ZW5naW5lZXIubmFtZX0gb24gJHtkYXRlLnRvRGF0ZVN0cmluZygpfTpgLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoZTogTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pOiB2b2lkID0+IHtcbiAgICAgICAgLy8gUHJldmVudCB0ZXh0IHNlbGVjdGlvbiB3aGVuIHVzaW5nIFNoaWZ0K2NsaWNrIGZvciByYW5nZSBzZWxlY3Rpb25cbiAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBvbkNlbGxDbGljayhlKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGluIERheUNlbGwgb25DbGljayBmb3IgJHtlbmdpbmVlci5uYW1lfSBvbiAke2RhdGUudG9EYXRlU3RyaW5nKCl9OmAsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZURvd24gPSAoZTogTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pOiB2b2lkID0+IHtcbiAgICAgICAgLy8gUHJldmVudCB0ZXh0IHNlbGVjdGlvbiBvbiBtb3VzZWRvd24gZm9yIGFsbCBtb2RpZmllciBrZXkgY29tYmluYXRpb25zXG4gICAgICAgIGlmIChlLnNoaWZ0S2V5IHx8IGUuY3RybEtleSB8fCBlLm1ldGFLZXkpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBCdWlsZCBDU1MgY2xhc3Nlc1xuICAgIGNvbnN0IGNlbGxDbGFzc2VzID0gW1xuICAgICAgICBcImRheS1jZWxsXCIsXG4gICAgICAgIGlzVG9kYXkgJiYgXCJkYXktY2VsbC10b2RheVwiLFxuICAgICAgICBpc1dlZWtlbmQgJiYgXCJkYXktY2VsbC13ZWVrZW5kXCIsXG4gICAgICAgIGlzU2VsZWN0ZWQgJiYgXCJkYXktY2VsbC1zZWxlY3RlZFwiLFxuICAgICAgICBjZWxsRGF0YS5oYXNTaGlmdCAmJiBcImRheS1jZWxsLWhhcy1zaGlmdFwiLFxuICAgICAgICBjZWxsRGF0YS5pc0Vycm9yICYmIFwiZGF5LWNlbGwtZXJyb3JcIixcbiAgICAgICAgcmVhZE9ubHkgJiYgXCJkYXktY2VsbC1yZWFkb25seVwiXG4gICAgXVxuICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgIC5qb2luKFwiIFwiKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2VsbENsYXNzZXN9XG4gICAgICAgICAgICBvbkRvdWJsZUNsaWNrPXtoYW5kbGVEb3VibGVDbGlja31cbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNsaWNrfVxuICAgICAgICAgICAgb25Nb3VzZURvd249e2hhbmRsZU1vdXNlRG93bn1cbiAgICAgICAgICAgIG9uQ29udGV4dE1lbnU9e2hhbmRsZUNvbnRleHR9XG4gICAgICAgICAgICB0aXRsZT17YCR7ZW5naW5lZXIubmFtZX0gLSAke2RhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCl9JHtcbiAgICAgICAgICAgICAgICBzaGlmdCA/IGAgKCR7c2hpZnQuc2hpZnR9JHtzaGlmdC5zdGF0dXMgPyBgIC0gJHtzaGlmdC5zdGF0dXN9YCA6IFwiXCJ9KWAgOiBcIiAtIE5vIHNoaWZ0XCJcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNlbGxEYXRhLnNoaWZ0Q29sb3IgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGN1cnNvcjogcmVhZE9ubHkgPyBcImRlZmF1bHRcIiA6IFwicG9pbnRlclwiXG4gICAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRheS1udW1iZXJcIj57Y2VsbERhdGEuZGF5TnVtYmVyfTwvZGl2PlxuICAgICAgICAgICAge2NlbGxEYXRhLmhhc1NoaWZ0ID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2hpZnQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzaGlmdC10ZXh0XCI+e2NlbGxEYXRhLnNoaWZ0VGV4dH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIHtzaGlmdD8uc3RhdHVzID09PSBcImVycm9yXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic2hpZnQtZXJyb3ItaW5kaWNhdG9yXCIgdGl0bGU9XCJFcnJvciBsb2FkaW5nIHNoaWZ0IGRhdGFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDimqDvuI9cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiBzaGlmdHNMb2FkaW5nID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGF5LWNlbGwtbG9hZGluZ1wiIHRpdGxlPVwiTG9hZGluZyBzaGlmdHMuLi5cIj5cbiAgICAgICAgICAgICAgICAgICAgLi4uXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGF5LWNlbGwtZW1wdHlcIiB0aXRsZT1cIk5vIHNoaWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgIC1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEYXlDZWxsO1xuIiwiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUVsZW1lbnQsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBFbmdpbmVlciwgU2hpZnRBc3NpZ25tZW50IH0gZnJvbSBcIi4uL3R5cGVzL3NoaWZ0U2NoZWR1bGVyXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGV4dE1lbnVPcHRpb24ge1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgaWNvbj86IHN0cmluZztcbiAgICBhY3Rpb246ICgpID0+IHZvaWQ7XG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICAgIHNlcGFyYXRvcj86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGV4dE1lbnVQcm9wcyB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICBvcHRpb25zOiBDb250ZXh0TWVudU9wdGlvbltdO1xuICAgIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gICAgdmlzaWJsZTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IENvbnRleHRNZW51OiBSZWFjdC5GQzxDb250ZXh0TWVudVByb3BzPiA9ICh7IHgsIHksIG9wdGlvbnMsIG9uQ2xvc2UsIHZpc2libGUgfSkgPT4ge1xuICAgIGNvbnN0IG1lbnVSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgaGFuZGxlQ2xpY2tPdXRzaWRlID0gKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgICAgICAgICBpZiAobWVudVJlZi5jdXJyZW50ICYmICFtZW51UmVmLmN1cnJlbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIE5vZGUpKSB7XG4gICAgICAgICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGhhbmRsZUVzY2FwZSA9IChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgICAgICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodmlzaWJsZSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVDbGlja091dHNpZGUpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlRXNjYXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZUNsaWNrT3V0c2lkZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVFc2NhcGUpO1xuICAgICAgICB9O1xuICAgIH0sIFt2aXNpYmxlLCBvbkNsb3NlXSk7XG5cbiAgICBpZiAoIXZpc2libGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgcmVmPXttZW51UmVmfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiY29udGV4dC1tZW51XCJcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICAgICAgICAgICAgICBsZWZ0OiB4LFxuICAgICAgICAgICAgICAgIHRvcDogeSxcbiAgICAgICAgICAgICAgICB6SW5kZXg6IDEwMDBcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkNsaWNrPXtlID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9XG4gICAgICAgID5cbiAgICAgICAgICAgIHtvcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT5cbiAgICAgICAgICAgICAgICBvcHRpb24uc2VwYXJhdG9yID8gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aW5kZXh9IGNsYXNzTmFtZT1cImNvbnRleHQtbWVudS1zZXBhcmF0b3JcIiAvPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bjb250ZXh0LW1lbnUtaXRlbSAke29wdGlvbi5kaXNhYmxlZCA/IFwiZGlzYWJsZWRcIiA6IFwiXCJ9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24uYWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7b3B0aW9uLmljb24gJiYgPHNwYW4gY2xhc3NOYW1lPVwiY29udGV4dC1tZW51LWljb25cIj57b3B0aW9uLmljb259PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNvbnRleHQtbWVudS1sYWJlbFwiPntvcHRpb24ubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuLy8gQ29udGV4dCBtZW51IGZhY3RvcnkgZnVuY3Rpb25zXG5leHBvcnQgY29uc3QgY3JlYXRlRW1wdHlDZWxsTWVudSA9IChcbiAgICBlbmdpbmVlcjogRW5naW5lZXIsXG4gICAgZGF0ZTogc3RyaW5nLFxuICAgIG9uQ3JlYXRlU2hpZnQ6IChlbmdpbmVlcklkOiBzdHJpbmcsIGRhdGU6IHN0cmluZykgPT4gdm9pZFxuKTogQ29udGV4dE1lbnVPcHRpb25bXSA9PiBbXG4gICAge1xuICAgICAgICBsYWJlbDogYENyZWF0ZSBzaGlmdCBmb3IgJHtlbmdpbmVlci5uYW1lfWAsXG4gICAgICAgIGljb246IFwi4p6VXCIsXG4gICAgICAgIGFjdGlvbjogKCkgPT4gb25DcmVhdGVTaGlmdChlbmdpbmVlci5pZCwgZGF0ZSlcbiAgICB9XG5dO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRXhpc3RpbmdTaGlmdE1lbnUgPSAoXG4gICAgc2hpZnQ6IFNoaWZ0QXNzaWdubWVudCxcbiAgICBlbmdpbmVlcjogRW5naW5lZXIsXG4gICAgb25FZGl0U2hpZnQ6IChzaGlmdDogU2hpZnRBc3NpZ25tZW50KSA9PiB2b2lkLFxuICAgIG9uRGVsZXRlU2hpZnQ6IChzaGlmdDogU2hpZnRBc3NpZ25tZW50KSA9PiB2b2lkXG4pOiBDb250ZXh0TWVudU9wdGlvbltdID0+IFtcbiAgICB7XG4gICAgICAgIGxhYmVsOiBgJHtlbmdpbmVlci5uYW1lfSAtICR7c2hpZnQuZGF0ZX1gLFxuICAgICAgICBpY29uOiBcIvCfk4VcIixcbiAgICAgICAgYWN0aW9uOiAoKSA9PiB7fSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb25cbiAgICAgICAgZGlzYWJsZWQ6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbGFiZWw6IGAke3NoaWZ0LnNoaWZ0fSBTaGlmdGAsXG4gICAgICAgIGljb246IGdldFNoaWZ0SWNvbihzaGlmdC5zaGlmdCksXG4gICAgICAgIGFjdGlvbjogKCkgPT4ge30sIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWZ1bmN0aW9uXG4gICAgICAgIGRpc2FibGVkOiB0cnVlXG4gICAgfSxcbiAgICB7IHNlcGFyYXRvcjogdHJ1ZSB9IGFzIENvbnRleHRNZW51T3B0aW9uLFxuICAgIHtcbiAgICAgICAgbGFiZWw6IFwiRWRpdCBTaGlmdFwiLFxuICAgICAgICBpY29uOiBcIuKcj++4j1wiLFxuICAgICAgICBhY3Rpb246ICgpID0+IG9uRWRpdFNoaWZ0KHNoaWZ0KVxuICAgIH0sXG4gICAgeyBzZXBhcmF0b3I6IHRydWUgfSBhcyBDb250ZXh0TWVudU9wdGlvbixcbiAgICB7XG4gICAgICAgIGxhYmVsOiBcIkRlbGV0ZSBTaGlmdFwiLFxuICAgICAgICBpY29uOiBcIvCfl5HvuI9cIixcbiAgICAgICAgYWN0aW9uOiAoKSA9PiBvbkRlbGV0ZVNoaWZ0KHNoaWZ0KVxuICAgIH1cbl07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVNdWx0aVNlbGVjdE1lbnUgPSAoXG4gICAgc2VsZWN0ZWRDb3VudDogbnVtYmVyLFxuICAgIG9uQmF0Y2hDcmVhdGU6ICgpID0+IHZvaWQsXG4gICAgb25CYXRjaEVkaXQ6ICgpID0+IHZvaWQsXG4gICAgb25CYXRjaERlbGV0ZTogKCkgPT4gdm9pZCxcbiAgICBvbkNsZWFyU2VsZWN0aW9uOiAoKSA9PiB2b2lkXG4pOiBDb250ZXh0TWVudU9wdGlvbltdID0+IFtcbiAgICB7XG4gICAgICAgIGxhYmVsOiBgJHtzZWxlY3RlZENvdW50fSBjZWxscyBzZWxlY3RlZGAsXG4gICAgICAgIGljb246IFwi8J+TilwiLFxuICAgICAgICBhY3Rpb246ICgpID0+IHt9LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvblxuICAgICAgICBkaXNhYmxlZDogdHJ1ZVxuICAgIH0sXG4gICAgeyBzZXBhcmF0b3I6IHRydWUgfSBhcyBDb250ZXh0TWVudU9wdGlvbixcbiAgICB7XG4gICAgICAgIGxhYmVsOiBcIkJhdGNoIENyZWF0ZVwiLFxuICAgICAgICBpY29uOiBcIuKelVwiLFxuICAgICAgICBhY3Rpb246IG9uQmF0Y2hDcmVhdGVcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbGFiZWw6IFwiQmF0Y2ggRWRpdFwiLFxuICAgICAgICBpY29uOiBcIuKcj++4j1wiLFxuICAgICAgICBhY3Rpb246IG9uQmF0Y2hFZGl0XG4gICAgfSxcbiAgICB7IHNlcGFyYXRvcjogdHJ1ZSB9IGFzIENvbnRleHRNZW51T3B0aW9uLFxuICAgIHtcbiAgICAgICAgbGFiZWw6IFwiQmF0Y2ggRGVsZXRlXCIsXG4gICAgICAgIGljb246IFwi8J+Xke+4j1wiLFxuICAgICAgICBhY3Rpb246IG9uQmF0Y2hEZWxldGVcbiAgICB9LFxuICAgIHsgc2VwYXJhdG9yOiB0cnVlIH0gYXMgQ29udGV4dE1lbnVPcHRpb24sXG4gICAge1xuICAgICAgICBsYWJlbDogXCJDbGVhciBTZWxlY3Rpb25cIixcbiAgICAgICAgaWNvbjogXCLinYxcIixcbiAgICAgICAgYWN0aW9uOiBvbkNsZWFyU2VsZWN0aW9uXG4gICAgfVxuXTtcblxuZnVuY3Rpb24gZ2V0U2hpZnRJY29uKHNoaWZ0VHlwZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBzd2l0Y2ggKHNoaWZ0VHlwZSkge1xuICAgICAgICBjYXNlIFwiTVwiOlxuICAgICAgICAgICAgcmV0dXJuIFwi8J+MhVwiO1xuICAgICAgICBjYXNlIFwiRVwiOlxuICAgICAgICAgICAgcmV0dXJuIFwi8J+MhlwiO1xuICAgICAgICBjYXNlIFwiTlwiOlxuICAgICAgICAgICAgcmV0dXJuIFwi8J+MmVwiO1xuICAgICAgICBjYXNlIFwiRFwiOlxuICAgICAgICAgICAgcmV0dXJuIFwi8J+PoFwiO1xuICAgICAgICBjYXNlIFwiSFwiOlxuICAgICAgICAgICAgcmV0dXJuIFwi8J+Plu+4j1wiO1xuICAgICAgICBjYXNlIFwiVFwiOlxuICAgICAgICAgICAgcmV0dXJuIFwi8J+TmlwiO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIFwi4o+wXCI7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUVsZW1lbnQsIHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZU1lbW8sIHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBhZGREYXlzLCBnZXREdXJhdGlvbkluTWludXRlcywgZm9ybWF0RGF0ZUZvclNoaWZ0IH0gZnJvbSBcIi4uL3V0aWxzL2RhdGVIZWxwZXJzXCI7XG5pbXBvcnQgeyB1c2VTY3JvbGxOYXZpZ2F0aW9uIH0gZnJvbSBcIi4uL2hvb2tzL3VzZVNjcm9sbE5hdmlnYXRpb25cIjtcbi8vIGltcG9ydCB7IHVzZVRlYW1BY2Nlc3MsIFRlYW1BY2Nlc3NDb25maWcgfSBmcm9tIFwiLi4vaG9va3MvdXNlVGVhbUFjY2Vzc1wiOyAvLyBObyBsb25nZXIgbmVlZGVkXG5pbXBvcnQgeyBFbXB0eVN0YXRlLCB3aXRoRXJyb3JCb3VuZGFyeSB9IGZyb20gXCIuL0xvYWRpbmdTdGF0ZXNcIjtcbmltcG9ydCBEYXlDZWxsIGZyb20gXCIuL0RheUNlbGxcIjtcbmltcG9ydCB7XG4gICAgQ29udGV4dE1lbnUsXG4gICAgQ29udGV4dE1lbnVPcHRpb24sXG4gICAgY3JlYXRlRW1wdHlDZWxsTWVudSxcbiAgICBjcmVhdGVFeGlzdGluZ1NoaWZ0TWVudSxcbiAgICBjcmVhdGVNdWx0aVNlbGVjdE1lbnVcbn0gZnJvbSBcIi4vQ29udGV4dE1lbnVcIjtcbmltcG9ydCB7IEVuZ2luZWVyLCBTaGlmdEFzc2lnbm1lbnQgfSBmcm9tIFwiLi4vdHlwZXMvc2hpZnRTY2hlZHVsZXJcIjtcblxuaW50ZXJmYWNlIFNjaGVkdWxlR3JpZFByb3BzIHtcbiAgICBlbmdpbmVlcnM6IEVuZ2luZWVyW107XG4gICAgc2hpZnRzOiBTaGlmdEFzc2lnbm1lbnRbXTtcbiAgICBnZXRTaGlmdHNGb3JFbmdpbmVlcjogKGVuZ2luZWVySWQ6IHN0cmluZykgPT4gU2hpZnRBc3NpZ25tZW50W107XG4gICAgZ2V0RW5naW5lZXJzQnlUZWFtOiAoKSA9PiB7IFt0ZWFtOiBzdHJpbmddOiBFbmdpbmVlcltdIH07XG4gICAgb25FZGl0U2hpZnQ/OiBhbnk7IC8vIEFjdGlvblZhbHVlXG4gICAgb25DcmVhdGVTaGlmdD86IGFueTsgLy8gQWN0aW9uVmFsdWVcbiAgICBvbkRlbGV0ZVNoaWZ0PzogYW55OyAvLyBBY3Rpb25WYWx1ZVxuICAgIC8vIENvbnRleHQgYXR0cmlidXRlcyBmb3IgcGFzc2luZyBkYXRhIHRvIG1pY3JvZmxvd3NcbiAgICBjb250ZXh0U2hpZnRJZD86IGFueTtcbiAgICBjb250ZXh0RW5naW5lZXJJZD86IGFueTtcbiAgICBjb250ZXh0RGF0ZT86IGFueTtcbiAgICBjb250ZXh0U2VsZWN0ZWRDZWxscz86IGFueTtcbiAgICBvbkJhdGNoQ3JlYXRlPzogKHNlbGVjdGVkQ2VsbHM6IGFueVtdKSA9PiB2b2lkO1xuICAgIG9uQmF0Y2hFZGl0PzogKHNlbGVjdGVkQ2VsbHM6IGFueVtdKSA9PiB2b2lkO1xuICAgIG9uQmF0Y2hEZWxldGU/OiAoc2VsZWN0ZWRDZWxsczogYW55W10pID0+IHZvaWQ7XG4gICAgcmVhZE9ubHk/OiBib29sZWFuO1xuICAgIGNsYXNzTmFtZT86IHN0cmluZztcbiAgICAvLyB0ZWFtQWNjZXNzPzogVGVhbUFjY2Vzc0NvbmZpZzsgLy8gTm8gbG9uZ2VyIG5lZWRlZFxuICAgIHNob3dEZWJ1Z0luZm8/OiBib29sZWFuO1xuICAgIHNoaWZ0c0xvYWRpbmc/OiBib29sZWFuO1xuICAgIGRlYnVnSW5mbz86IHtcbiAgICAgICAgYXR0cmlidXRlc0NvbmZpZ3VyZWQ6IHtcbiAgICAgICAgICAgIG5hbWU6IGJvb2xlYW47XG4gICAgICAgICAgICBoZWFkZXI6IGJvb2xlYW47XG4gICAgICAgICAgICBzdWJoZWFkZXI6IGJvb2xlYW47XG4gICAgICAgICAgICBzcFVzZXJBc3NvY2lhdGlvbjogYm9vbGVhbjtcbiAgICAgICAgICAgIHNoaWZ0QXNzb2NpYXRpb246IGJvb2xlYW47XG4gICAgICAgICAgICBzaGlmdERhdGU6IGJvb2xlYW47XG4gICAgICAgIH07XG4gICAgfTtcbn1cblxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgZGlzYWJsZWQgYWN0aW9ucyB3aXRoIGNvcnJlY3Qgc2lnbmF0dXJlc1xuY29uc3Qgbm9PcFNoaWZ0RnVuY3Rpb24gPSAoX3NoaWZ0OiBhbnkpOiB2b2lkID0+IHtcbiAgICAvLyBJbnRlbnRpb25hbGx5IGVtcHR5IC0gdXNlZCBmb3IgZGlzYWJsZWQgc2hpZnQgbWVudSBhY3Rpb25zXG59O1xuXG5jb25zdCBub09wRnVuY3Rpb24gPSAoKTogdm9pZCA9PiB7XG4gICAgLy8gSW50ZW50aW9uYWxseSBlbXB0eSAtIHVzZWQgZm9yIGRpc2FibGVkIG1lbnUgYWN0aW9uc1xufTtcblxuY29uc3QgU2NoZWR1bGVHcmlkOiBSZWFjdC5GQzxTY2hlZHVsZUdyaWRQcm9wcz4gPSAoe1xuICAgIGVuZ2luZWVyczogX2VuZ2luZWVycyxcbiAgICBzaGlmdHMsXG4gICAgZ2V0U2hpZnRzRm9yRW5naW5lZXI6IF9nZXRTaGlmdHNGb3JFbmdpbmVlcixcbiAgICBnZXRFbmdpbmVlcnNCeVRlYW0sXG4gICAgb25FZGl0U2hpZnQsXG4gICAgb25DcmVhdGVTaGlmdCxcbiAgICBvbkRlbGV0ZVNoaWZ0LFxuICAgIGNvbnRleHRTaGlmdElkLFxuICAgIGNvbnRleHRFbmdpbmVlcklkLFxuICAgIGNvbnRleHREYXRlLFxuICAgIGNvbnRleHRTZWxlY3RlZENlbGxzLFxuICAgIG9uQmF0Y2hDcmVhdGUsXG4gICAgb25CYXRjaEVkaXQsXG4gICAgb25CYXRjaERlbGV0ZSxcbiAgICByZWFkT25seSA9IGZhbHNlLFxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXG4gICAgLy8gdGVhbUFjY2VzcywgLy8gTm8gbG9uZ2VyIG5lZWRlZFxuICAgIHNob3dEZWJ1Z0luZm8sXG4gICAgc2hpZnRzTG9hZGluZyxcbiAgICBkZWJ1Z0luZm9cbn0pID0+IHtcbiAgICAvLyBVc2UgYWxsIHNoaWZ0cyBkYXRhIGRpcmVjdGx5IC0gc2VjdXJpdHkgaXMgaGFuZGxlZCBieSBBY3Rpb25WYWx1ZS5jYW5FeGVjdXRlXG4gICAgY29uc3QgYWNjZXNzaWJsZVNoaWZ0cyA9IHNoaWZ0cztcblxuICAgIC8vIENhbGN1bGF0ZSBkYXRlIHJhbmdlIGZyb20gYWNjZXNzaWJsZSBzaGlmdCBkYXRhXG4gICAgY29uc3QgZGF0ZVJhbmdlID0gdXNlTWVtbygoKSA9PiB7XG4gICAgICAgIGlmIChhY2Nlc3NpYmxlU2hpZnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDogbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICBlbmQ6IGFkZERheXMobmV3IERhdGUoKSwgMzApXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2hpZnREYXRlcyA9IGFjY2Vzc2libGVTaGlmdHMubWFwKHNoaWZ0ID0+IG5ldyBEYXRlKHNoaWZ0LmRhdGUpKS5maWx0ZXIoZGF0ZSA9PiAhaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKTtcbiAgICAgICAgaWYgKHNoaWZ0RGF0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgIGVuZDogYWRkRGF5cyhuZXcgRGF0ZSgpLCAzMClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlYXJsaWVzdERhdGUgPSBuZXcgRGF0ZShNYXRoLm1pbiguLi5zaGlmdERhdGVzLm1hcChkID0+IGQuZ2V0VGltZSgpKSkpO1xuICAgICAgICBjb25zdCBsYXRlc3REYXRlID0gbmV3IERhdGUoTWF0aC5tYXgoLi4uc2hpZnREYXRlcy5tYXAoZCA9PiBkLmdldFRpbWUoKSkpKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IGVhcmxpZXN0RGF0ZSxcbiAgICAgICAgICAgIGVuZDogbGF0ZXN0RGF0ZVxuICAgICAgICB9O1xuICAgIH0sIFthY2Nlc3NpYmxlU2hpZnRzXSk7XG5cbiAgICBjb25zdCBbc3RhcnREYXRlXSA9IHVzZVN0YXRlKGRhdGVSYW5nZS5zdGFydCk7XG4gICAgY29uc3QgW2VuZERhdGUsIHNldEVuZERhdGVdID0gdXNlU3RhdGUoZGF0ZVJhbmdlLmVuZCk7XG4gICAgY29uc3QgW3NlbGVjdGVkQ2VsbHMsIHNldFNlbGVjdGVkQ2VsbHNdID0gdXNlU3RhdGU8QXJyYXk8eyBlbmdpbmVlcklkOiBzdHJpbmc7IGRhdGU6IHN0cmluZyB9Pj4oW10pO1xuICAgIGNvbnN0IFtsYXN0U2VsZWN0ZWRDZWxsLCBzZXRMYXN0U2VsZWN0ZWRDZWxsXSA9IHVzZVN0YXRlPHsgZW5naW5lZXJJZDogc3RyaW5nOyBkYXRlOiBzdHJpbmcgfSB8IG51bGw+KG51bGwpO1xuXG4gICAgLy8gQ29udGV4dCBtZW51IHN0YXRlXG4gICAgY29uc3QgW2NvbnRleHRNZW51LCBzZXRDb250ZXh0TWVudV0gPSB1c2VTdGF0ZTx7XG4gICAgICAgIHZpc2libGU6IGJvb2xlYW47XG4gICAgICAgIHg6IG51bWJlcjtcbiAgICAgICAgeTogbnVtYmVyO1xuICAgICAgICBvcHRpb25zOiBDb250ZXh0TWVudU9wdGlvbltdO1xuICAgIH0+KHtcbiAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDAsXG4gICAgICAgIG9wdGlvbnM6IFtdXG4gICAgfSk7XG5cbiAgICAvLyBTY3JvbGwgbmF2aWdhdGlvbiBob29rIGZvciB1bmlmaWVkIHNjcm9sbGluZyBhbmQgaW5maW5pdGUgbG9hZGluZ1xuICAgIGNvbnN0IHsgaGVhZGVyU2Nyb2xsUmVmLCBjb250ZW50U2Nyb2xsUmVmLCBpbmZpbml0ZVNjcm9sbFJlZiwgaXNJbmZpbml0ZVNjcm9sbFZpc2libGUgfSA9IHVzZVNjcm9sbE5hdmlnYXRpb24oKTtcblxuICAgIC8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIG11bHRpLXNlbGVjdFxuICAgIGNvbnN0IGlzQ2VsbFNlbGVjdGVkID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChlbmdpbmVlcklkOiBzdHJpbmcsIGRhdGU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkQ2VsbHMuc29tZShjZWxsID0+IGNlbGwuZW5naW5lZXJJZCA9PT0gZW5naW5lZXJJZCAmJiBjZWxsLmRhdGUgPT09IGRhdGUpO1xuICAgICAgICB9LFxuICAgICAgICBbc2VsZWN0ZWRDZWxsc11cbiAgICApO1xuXG4gICAgLy8gSGFuZGxlIGluZmluaXRlIHNjcm9sbCBsb2FkaW5nIHdoZW4gc2VudGluZWwgY29tZXMgaW50byB2aWV3XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGlzSW5maW5pdGVTY3JvbGxWaXNpYmxlKSB7XG4gICAgICAgICAgICBzZXRFbmREYXRlKGQgPT4gYWRkRGF5cyhkLCAxNSkpO1xuICAgICAgICB9XG4gICAgfSwgW2lzSW5maW5pdGVTY3JvbGxWaXNpYmxlXSk7XG5cbiAgICAvLyBNZW1vaXplIHRlYW1zIGRhdGEgZm9yIHBlcmZvcm1hbmNlXG4gICAgY29uc3QgdGVhbXNEYXRhID0gdXNlTWVtbygoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0RW5naW5lZXJzQnlUZWFtKCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJFcnJvciBnZXR0aW5nIGVuZ2luZWVycyBieSB0ZWFtOlwiLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cbiAgICB9LCBbZ2V0RW5naW5lZXJzQnlUZWFtXSk7XG5cbiAgICAvLyBHcm91cCBlbmdpbmVlcnMgYnkgSGVhZGVyIOKGkiBTdWJoZWFkZXIg4oaSIEVuZ2luZWVycyAoZGF0YS1kcml2ZW4gd2l0aCBmYWxsYmFjaylcbiAgICBjb25zdCB7IGhlYWRlclN1YmhlYWRlclN0cnVjdHVyZSwgYWxsRW5naW5lZXJzLCBncm91cGluZ0RlYnVnSW5mbyB9ID0gdXNlTWVtbygoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRlYnVnTWVzc2FnZXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgd2UgaGF2ZSBhbnkgaGVhZGVyIGdyb3VwaW5nIGNvbmZpZ3VyZWRcbiAgICAgICAgY29uc3QgaGFzSGVhZGVyR3JvdXBpbmcgPSAhIWRlYnVnSW5mbyAmJiBkZWJ1Z0luZm8uYXR0cmlidXRlc0NvbmZpZ3VyZWQ/LmhlYWRlcjtcbiAgICAgICAgY29uc3QgaGFzU3ViaGVhZGVyR3JvdXBpbmcgPSAhIWRlYnVnSW5mbyAmJiBkZWJ1Z0luZm8uYXR0cmlidXRlc0NvbmZpZ3VyZWQ/LnN1YmhlYWRlcjtcblxuICAgICAgICBkZWJ1Z01lc3NhZ2VzLnB1c2goYFByb2Nlc3NpbmcgJHtPYmplY3Qua2V5cyh0ZWFtc0RhdGEpLmxlbmd0aH0gaGVhZGVyIGdyb3Vwc2ApO1xuICAgICAgICBkZWJ1Z01lc3NhZ2VzLnB1c2goYEhlYWRlciBncm91cGluZzogJHtoYXNIZWFkZXJHcm91cGluZyA/IFwi4pyFXCIgOiBcIuKdjFwifWApO1xuICAgICAgICBkZWJ1Z01lc3NhZ2VzLnB1c2goYFN1YmhlYWRlciBncm91cGluZzogJHtoYXNTdWJoZWFkZXJHcm91cGluZyA/IFwi4pyFXCIgOiBcIuKdjFwifWApO1xuXG4gICAgICAgIGlmICghaGFzSGVhZGVyR3JvdXBpbmcpIHtcbiAgICAgICAgICAgIC8vIE5vIGdyb3VwaW5nIC0gZmxhdCBsaXN0IG9mIGFsbCBlbmdpbmVlcnNcbiAgICAgICAgICAgIGNvbnN0IGZsYXRFbmdpbmVlcnMgPSBPYmplY3QudmFsdWVzKHRlYW1zRGF0YSkuZmxhdCgpO1xuICAgICAgICAgICAgZGVidWdNZXNzYWdlcy5wdXNoKFwiTm8gaGVhZGVyIGdyb3VwaW5nIC0gc2hvd2luZyBhbGwgZW5naW5lZXJzIGluIHNpbmdsZSBncm91cFwiKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJTdWJoZWFkZXJTdHJ1Y3R1cmU6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyTmFtZTogXCJBbGwgRW5naW5lZXJzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJJZDogXCJhbGwtZW5naW5lZXJzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJoZWFkZXJzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkdlbmVyYWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lZXJzOiBmbGF0RW5naW5lZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBhbGxFbmdpbmVlcnM6IGZsYXRFbmdpbmVlcnMsXG4gICAgICAgICAgICAgICAgZ3JvdXBpbmdEZWJ1Z0luZm86IGRlYnVnTWVzc2FnZXNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdHJ1Y3R1cmUgPSBPYmplY3QuZW50cmllcyh0ZWFtc0RhdGEpLm1hcCgoW2hlYWRlck5hbWUsIGVuZ2luZWVyc10pID0+IHtcbiAgICAgICAgICAgIGRlYnVnTWVzc2FnZXMucHVzaChgSGVhZGVyIFwiJHtoZWFkZXJOYW1lfVwiOiAke2VuZ2luZWVycy5sZW5ndGh9IGVuZ2luZWVyc2ApO1xuXG4gICAgICAgICAgICBpZiAoIWhhc1N1YmhlYWRlckdyb3VwaW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gT25seSBoZWFkZXIgZ3JvdXBpbmcgLSBubyBzdWJoZWFkZXIgZ3JvdXBpbmdcbiAgICAgICAgICAgICAgICBkZWJ1Z01lc3NhZ2VzLnB1c2goYCAgTm8gc3ViaGVhZGVyIGdyb3VwaW5nIGZvciAke2hlYWRlck5hbWV9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVySWQ6IGhlYWRlck5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiLVwiKSxcbiAgICAgICAgICAgICAgICAgICAgc3ViaGVhZGVyczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiR2VuZXJhbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZWVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQm90aCBoZWFkZXIgYW5kIHN1YmhlYWRlciBncm91cGluZ1xuICAgICAgICAgICAgY29uc3Qgc3ViaGVhZGVyR3JvdXBzOiB7IFtzdWJoZWFkZXI6IHN0cmluZ106IEVuZ2luZWVyW10gfSA9IHt9O1xuXG4gICAgICAgICAgICBlbmdpbmVlcnMuZm9yRWFjaCgoZW5naW5lZXIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gVXNlIGVuZ2luZWVyJ3Mgc3ViaGVhZGVyLCBkZWZhdWx0IHRvICdHZW5lcmFsJyBpZiBub3Qgc3BlY2lmaWVkXG4gICAgICAgICAgICAgICAgY29uc3QgZW5naW5lZXJTdWJoZWFkZXIgPSBlbmdpbmVlci5zdWJoZWFkZXIgfHwgXCJHZW5lcmFsXCI7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXN1YmhlYWRlckdyb3Vwc1tlbmdpbmVlclN1YmhlYWRlcl0pIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViaGVhZGVyR3JvdXBzW2VuZ2luZWVyU3ViaGVhZGVyXSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdWJoZWFkZXJHcm91cHNbZW5naW5lZXJTdWJoZWFkZXJdLnB1c2goZW5naW5lZXIpO1xuXG4gICAgICAgICAgICAgICAgLy8gRGVidWcgZmlyc3QgZmV3IGVuZ2luZWVyc1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVidWdNZXNzYWdlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgYCAgRW5naW5lZXIgJHtpbmRleH06ICR7ZW5naW5lZXIubmFtZX0gKCR7ZW5naW5lZXIuaGVhZGVyfS8ke2VuZ2luZWVyLnN1YmhlYWRlcn0pYFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBTb3J0IHN1YmhlYWRlcnMgYWxwaGFiZXRpY2FsbHkgKGRhdGEtZHJpdmVuLCBubyBoYXJkY29kZWQgb3JkZXIpXG4gICAgICAgICAgICBjb25zdCBzb3J0ZWRTdWJoZWFkZXJzID0gT2JqZWN0LmtleXMoc3ViaGVhZGVyR3JvdXBzKS5zb3J0KCk7XG4gICAgICAgICAgICBkZWJ1Z01lc3NhZ2VzLnB1c2goYCAgU3ViaGVhZGVyczogJHtzb3J0ZWRTdWJoZWFkZXJzLmpvaW4oXCIsIFwiKX1gKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJOYW1lLFxuICAgICAgICAgICAgICAgIGhlYWRlcklkOiBoZWFkZXJOYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIi1cIiksXG4gICAgICAgICAgICAgICAgc3ViaGVhZGVyczogc29ydGVkU3ViaGVhZGVycy5tYXAoc3ViaGVhZGVyID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHN1YmhlYWRlcixcbiAgICAgICAgICAgICAgICAgICAgZW5naW5lZXJzOiBzdWJoZWFkZXJHcm91cHNbc3ViaGVhZGVyXVxuICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZmxhdEVuZ2luZWVyczogRW5naW5lZXJbXSA9IHN0cnVjdHVyZS5mbGF0TWFwKGhlYWRlciA9PlxuICAgICAgICAgICAgaGVhZGVyLnN1YmhlYWRlcnMuZmxhdE1hcChzdWJoZWFkZXIgPT4gc3ViaGVhZGVyLmVuZ2luZWVycylcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4geyBoZWFkZXJTdWJoZWFkZXJTdHJ1Y3R1cmU6IHN0cnVjdHVyZSwgYWxsRW5naW5lZXJzOiBmbGF0RW5naW5lZXJzLCBncm91cGluZ0RlYnVnSW5mbzogZGVidWdNZXNzYWdlcyB9O1xuICAgIH0sIFt0ZWFtc0RhdGEsIGRlYnVnSW5mb10pO1xuXG4gICAgLy8gR2VuZXJhdGUgZGF0ZSBjb2x1bW5zXG4gICAgY29uc3QgZGF0ZUNvbHVtbnMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICAgICAgY29uc3QgZGF5c0NvdW50ID0gTWF0aC5jZWlsKGdldER1cmF0aW9uSW5NaW51dGVzKHN0YXJ0RGF0ZSwgZW5kRGF0ZSkgLyAoNjAgKiAyNCkpO1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogZGF5c0NvdW50IH0sIChfLCBpZHgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBhZGREYXlzKHN0YXJ0RGF0ZSwgaWR4KTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZGF0ZSxcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nOiBmb3JtYXREYXRlRm9yU2hpZnQoZGF0ZSksXG4gICAgICAgICAgICAgICAgaXNUb2RheTogZm9ybWF0RGF0ZUZvclNoaWZ0KGRhdGUpID09PSBmb3JtYXREYXRlRm9yU2hpZnQobmV3IERhdGUoKSksXG4gICAgICAgICAgICAgICAgaXNXZWVrZW5kOiBkYXRlLmdldERheSgpID09PSAwIHx8IGRhdGUuZ2V0RGF5KCkgPT09IDZcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH0sIFtzdGFydERhdGUsIGVuZERhdGVdKTtcblxuICAgIC8vIE11bHRpLXNlbGVjdCBjZWxsIGZ1bmN0aW9uIChkZWZpbmVkIGFmdGVyIGFsbEVuZ2luZWVycyBhbmQgZGF0ZUNvbHVtbnMgYXJlIGF2YWlsYWJsZSlcbiAgICBjb25zdCBzZWxlY3RDZWxsID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChlbmdpbmVlcklkOiBzdHJpbmcsIGRhdGU6IHN0cmluZywgY3RybEtleTogYm9vbGVhbiwgc2hpZnRLZXk6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0NlbGwgPSB7IGVuZ2luZWVySWQsIGRhdGUgfTtcblxuICAgICAgICAgICAgaWYgKHNoaWZ0S2V5ICYmIGxhc3RTZWxlY3RlZENlbGwpIHtcbiAgICAgICAgICAgICAgICAvLyBTaGlmdCtjbGljazogc2VsZWN0IHJhbmdlIGZyb20gbGFzdCBzZWxlY3RlZCB0byBjdXJyZW50XG4gICAgICAgICAgICAgICAgY29uc3QgZW5naW5lZXJTdGFydCA9IGFsbEVuZ2luZWVycy5maW5kSW5kZXgoZSA9PiBlLmlkID09PSBsYXN0U2VsZWN0ZWRDZWxsLmVuZ2luZWVySWQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuZ2luZWVyRW5kID0gYWxsRW5naW5lZXJzLmZpbmRJbmRleChlID0+IGUuaWQgPT09IGVuZ2luZWVySWQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVTdGFydCA9IGRhdGVDb2x1bW5zLmZpbmRJbmRleChkID0+IGQuZGF0ZVN0cmluZyA9PT0gbGFzdFNlbGVjdGVkQ2VsbC5kYXRlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlRW5kID0gZGF0ZUNvbHVtbnMuZmluZEluZGV4KGQgPT4gZC5kYXRlU3RyaW5nID09PSBkYXRlKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbkVuZ2luZWVyID0gTWF0aC5taW4oZW5naW5lZXJTdGFydCwgZW5naW5lZXJFbmQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1heEVuZ2luZWVyID0gTWF0aC5tYXgoZW5naW5lZXJTdGFydCwgZW5naW5lZXJFbmQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1pbkRhdGUgPSBNYXRoLm1pbihkYXRlU3RhcnQsIGRhdGVFbmQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1heERhdGUgPSBNYXRoLm1heChkYXRlU3RhcnQsIGRhdGVFbmQpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZ2VDZWxsczogQXJyYXk8eyBlbmdpbmVlcklkOiBzdHJpbmc7IGRhdGU6IHN0cmluZyB9PiA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGUgPSBtaW5FbmdpbmVlcjsgZSA8PSBtYXhFbmdpbmVlcjsgZSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGQgPSBtaW5EYXRlOyBkIDw9IG1heERhdGU7IGQrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFsbEVuZ2luZWVyc1tlXSAmJiBkYXRlQ29sdW1uc1tkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlQ2VsbHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZWVySWQ6IGFsbEVuZ2luZWVyc1tlXS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZTogZGF0ZUNvbHVtbnNbZF0uZGF0ZVN0cmluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGN0cmxLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ3RybCtTaGlmdDogYWRkIHJhbmdlIHRvIGV4aXN0aW5nIHNlbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZENlbGxzKHByZXYgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3U2VsZWN0aW9uID0gWy4uLnByZXZdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VDZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIW5ld1NlbGVjdGlvbi5zb21lKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcgPT4gZXhpc3RpbmcuZW5naW5lZXJJZCA9PT0gY2VsbC5lbmdpbmVlcklkICYmIGV4aXN0aW5nLmRhdGUgPT09IGNlbGwuZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NlbGVjdGlvbi5wdXNoKGNlbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld1NlbGVjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2hpZnQgb25seTogcmVwbGFjZSBzZWxlY3Rpb24gd2l0aCByYW5nZVxuICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZENlbGxzKHJhbmdlQ2VsbHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3RybEtleSkge1xuICAgICAgICAgICAgICAgIC8vIEN0cmwrY2xpY2s6IHRvZ2dsZSBzaW5nbGUgY2VsbFxuICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkQ2VsbHMocHJldiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBwcmV2LnNvbWUoY2VsbCA9PiBjZWxsLmVuZ2luZWVySWQgPT09IGVuZ2luZWVySWQgJiYgY2VsbC5kYXRlID09PSBkYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2LmZpbHRlcihjZWxsID0+ICEoY2VsbC5lbmdpbmVlcklkID09PSBlbmdpbmVlcklkICYmIGNlbGwuZGF0ZSA9PT0gZGF0ZSkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsuLi5wcmV2LCBuZXdDZWxsXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNldExhc3RTZWxlY3RlZENlbGwobmV3Q2VsbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFJlZ3VsYXIgY2xpY2s6IHNlbGVjdCBzaW5nbGUgY2VsbFxuICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkQ2VsbHMoW25ld0NlbGxdKTtcbiAgICAgICAgICAgICAgICBzZXRMYXN0U2VsZWN0ZWRDZWxsKG5ld0NlbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbbGFzdFNlbGVjdGVkQ2VsbCwgYWxsRW5naW5lZXJzLCBkYXRlQ29sdW1uc11cbiAgICApO1xuXG4gICAgLy8gQ29udGV4dCBtZW51IGhhbmRsZXJzXG4gICAgY29uc3QgaGFuZGxlQ2VsbENvbnRleHRNZW51ID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChlOiBSZWFjdC5Nb3VzZUV2ZW50LCBlbmdpbmVlcjogRW5naW5lZXIsIGRhdGU6IHN0cmluZywgc2hpZnQ/OiBTaGlmdEFzc2lnbm1lbnQpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIGxldCBvcHRpb25zOiBDb250ZXh0TWVudU9wdGlvbltdO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBwZXJtaXNzaW9ucyBiZWZvcmUgc2hvd2luZyBjb250ZXh0IG1lbnUgb3B0aW9uc1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkQ2VsbHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGFueSBiYXRjaCBvcGVyYXRpb24gaXMgYXZhaWxhYmxlXG4gICAgICAgICAgICAgICAgaWYgKG9uQmF0Y2hDcmVhdGUgfHwgb25CYXRjaEVkaXQgfHwgb25CYXRjaERlbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBNdWx0aS1zZWxlY3Rpb24gY29udGV4dCBtZW51IChmdWxsIHBlcm1pc3Npb25zKVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gY3JlYXRlTXVsdGlTZWxlY3RNZW51KFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDZWxscy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uQmF0Y2hDcmVhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25CYXRjaENyZWF0ZShzZWxlY3RlZENlbGxzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkJhdGNoRWRpdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJhdGNoRWRpdChzZWxlY3RlZENlbGxzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkJhdGNoRGVsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQmF0Y2hEZWxldGUoc2VsZWN0ZWRDZWxscyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZENlbGxzKFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRMYXN0U2VsZWN0ZWRDZWxsKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIExpbWl0ZWQgbWVudSB3aGVuIG5vIGJhdGNoIHBlcm1pc3Npb25zXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGAke3NlbGVjdGVkQ2VsbHMubGVuZ3RofSBjZWxscyBzZWxlY3RlZGAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCLwn5OKXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBub09wRnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VwYXJhdG9yOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc2VwYXJhdG9yOiB0cnVlIH0gYXMgQ29udGV4dE1lbnVPcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ2xlYXIgU2VsZWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCLinJVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRDZWxscyhbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldExhc3RTZWxlY3RlZENlbGwobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VwYXJhdG9yOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJCYXRjaCBvcGVyYXRpb25zIG5vdCBwZXJtaXR0ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcIvCflJJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5vT3BGdW5jdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXBhcmF0b3I6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChzaGlmdCkge1xuICAgICAgICAgICAgICAgIC8vIEV4aXN0aW5nIHNoaWZ0IGNvbnRleHQgbWVudSAoY2hlY2sgZWRpdC9kZWxldGUgcGVybWlzc2lvbnMpXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IGNyZWF0ZUV4aXN0aW5nU2hpZnRNZW51KFxuICAgICAgICAgICAgICAgICAgICBzaGlmdCxcbiAgICAgICAgICAgICAgICAgICAgZW5naW5lZXIsXG4gICAgICAgICAgICAgICAgICAgIG9uRWRpdFNoaWZ0Py5jYW5FeGVjdXRlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHNoaWZ0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkVkaXRTaGlmdD8uY2FuRXhlY3V0ZSAmJiAhb25FZGl0U2hpZnQuaXNFeGVjdXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dFNoaWZ0SWQ/LnNldFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRTaGlmdElkLnNldFZhbHVlKHNoaWZ0LmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FZGl0U2hpZnQuZXhlY3V0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA6IG5vT3BTaGlmdEZ1bmN0aW9uLFxuICAgICAgICAgICAgICAgICAgICBvbkRlbGV0ZVNoaWZ0Py5jYW5FeGVjdXRlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHNoaWZ0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkRlbGV0ZVNoaWZ0Py5jYW5FeGVjdXRlICYmICFvbkRlbGV0ZVNoaWZ0LmlzRXhlY3V0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHRTaGlmdElkPy5zZXRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0U2hpZnRJZC5zZXRWYWx1ZShzaGlmdC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlU2hpZnQuZXhlY3V0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA6IG5vT3BTaGlmdEZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob25DcmVhdGVTaGlmdD8uY2FuRXhlY3V0ZSkge1xuICAgICAgICAgICAgICAgIC8vIEVtcHR5IGNlbGwgY29udGV4dCBtZW51IChvbmx5IGlmIHVzZXIgY2FuIGV4ZWN1dGUgY3JlYXRlIGFjdGlvbilcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gY3JlYXRlRW1wdHlDZWxsTWVudShlbmdpbmVlciwgZGF0ZSwgKGVuZ2luZWVySWQsIGRhdGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9uQ3JlYXRlU2hpZnQ/LmNhbkV4ZWN1dGUgJiYgIW9uQ3JlYXRlU2hpZnQuaXNFeGVjdXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0RW5naW5lZXJJZD8uc2V0VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0RW5naW5lZXJJZC5zZXRWYWx1ZShlbmdpbmVlcklkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0RGF0ZT8uc2V0VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0RGF0ZS5zZXRWYWx1ZShkYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ3JlYXRlU2hpZnQuZXhlY3V0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE5vIHBlcm1pc3Npb25zIC0gc2hvdyBsaW1pdGVkIG1lbnVcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJObyBwZXJtaXNzaW9uc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCLwn5SSXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5vT3BGdW5jdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VwYXJhdG9yOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0Q29udGV4dE1lbnUoe1xuICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgeDogZS5jbGllbnRYLFxuICAgICAgICAgICAgICAgIHk6IGUuY2xpZW50WSxcbiAgICAgICAgICAgICAgICBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgICAgb25DcmVhdGVTaGlmdCxcbiAgICAgICAgICAgIG9uRWRpdFNoaWZ0LFxuICAgICAgICAgICAgb25EZWxldGVTaGlmdCxcbiAgICAgICAgICAgIGNvbnRleHRTaGlmdElkLFxuICAgICAgICAgICAgY29udGV4dEVuZ2luZWVySWQsXG4gICAgICAgICAgICBjb250ZXh0RGF0ZSxcbiAgICAgICAgICAgIGNvbnRleHRTZWxlY3RlZENlbGxzLFxuICAgICAgICAgICAgc2VsZWN0ZWRDZWxscyxcbiAgICAgICAgICAgIG9uQmF0Y2hDcmVhdGUsXG4gICAgICAgICAgICBvbkJhdGNoRWRpdCxcbiAgICAgICAgICAgIG9uQmF0Y2hEZWxldGUsXG4gICAgICAgICAgICBzZXRTZWxlY3RlZENlbGxzLFxuICAgICAgICAgICAgc2V0TGFzdFNlbGVjdGVkQ2VsbFxuICAgICAgICBdXG4gICAgKTtcblxuICAgIGNvbnN0IGNsb3NlQ29udGV4dE1lbnUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICAgIHNldENvbnRleHRNZW51KHByZXYgPT4gKHsgLi4ucHJldiwgdmlzaWJsZTogZmFsc2UgfSkpO1xuICAgIH0sIFtdKTtcblxuICAgIC8vIENyZWF0ZSBzaGlmdCBsb29rdXAgZm9yIHBlcmZvcm1hbmNlIHdpdGggdGFyZ2V0ZWQgZGVidWdnaW5nXG4gICAgY29uc3Qgc2hpZnRMb29rdXAgPSB1c2VNZW1vKCgpID0+IHtcbiAgICAgICAgY29uc3QgbG9va3VwOiBSZWNvcmQ8c3RyaW5nLCBTaGlmdEFzc2lnbm1lbnQ+ID0ge307XG5cbiAgICAgICAgLy8gRm9yY2UgY29uc29sZSBvdXRwdXQgZm9yIGNyaXRpY2FsIGRlYnVnZ2luZ1xuICAgICAgICBjb25zb2xlLmxvZyhcIvCflI0gU0hJRlRTIERFQlVHIC0gVG90YWwgc2hpZnRzOlwiLCBhY2Nlc3NpYmxlU2hpZnRzLmxlbmd0aCk7XG5cbiAgICAgICAgYWNjZXNzaWJsZVNoaWZ0cy5mb3JFYWNoKChzaGlmdCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke3NoaWZ0LmVuZ2luZWVySWR9LSR7c2hpZnQuZGF0ZX1gO1xuICAgICAgICAgICAgbG9va3VwW2tleV0gPSBzaGlmdDtcblxuICAgICAgICAgICAgLy8gRGVidWcgb25seSBmaXJzdCAyIHNoaWZ0cyBkdWUgdG8gbGFyZ2UgZGF0YXNldFxuICAgICAgICAgICAgaWYgKGluZGV4IDwgMikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGDwn5SNIFNISUZUICR7aW5kZXh9OmAsIHtcbiAgICAgICAgICAgICAgICAgICAgZW5naW5lZXJJZDogc2hpZnQuZW5naW5lZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogc2hpZnQuZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgc2hpZnQ6IHNoaWZ0LnNoaWZ0LFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlb2Ygc2hpZnQuZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAga2V5XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwi8J+UjSBMT09LVVAgREVCVUcgLSBUb3RhbCBrZXlzOlwiLCBPYmplY3Qua2V5cyhsb29rdXApLmxlbmd0aCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi8J+UjSBTQU1QTEUgS0VZUzpcIiwgT2JqZWN0LmtleXMobG9va3VwKS5zbGljZSgwLCAzKSk7XG5cbiAgICAgICAgcmV0dXJuIGxvb2t1cDtcbiAgICB9LCBbYWNjZXNzaWJsZVNoaWZ0c10pO1xuXG4gICAgLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGdldCBzaGlmdCBmb3IgZW5naW5lZXIgYW5kIGRhdGVcbiAgICBjb25zdCBnZXRTaGlmdCA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoZW5naW5lZXJJZDogc3RyaW5nLCBkYXRlU3RyaW5nOiBzdHJpbmcpOiBTaGlmdEFzc2lnbm1lbnQgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7ZW5naW5lZXJJZH0tJHtkYXRlU3RyaW5nfWA7XG4gICAgICAgICAgICBjb25zdCBzaGlmdCA9IHNoaWZ0TG9va3VwW2tleV07XG5cbiAgICAgICAgICAgIC8vIERlYnVnIGZpcnN0IGZldyBsb29rdXBzIG9ubHlcbiAgICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC4wMDEpIHtcbiAgICAgICAgICAgICAgICAvLyBTYW1wbGUgMC4xJSBvZiBsb29rdXBzXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLwn5SNIExPT0tVUCBURVNUOlwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGVuZ2luZWVySWQsXG4gICAgICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgZm91bmQ6ICEhc2hpZnQsXG4gICAgICAgICAgICAgICAgICAgIHNoaWZ0OiBzaGlmdCA/IGAke3NoaWZ0LnNoaWZ0fWAgOiBcIm5vbmVcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2hpZnQ7XG4gICAgICAgIH0sXG4gICAgICAgIFtzaGlmdExvb2t1cF1cbiAgICApO1xuXG4gICAgLy8gRW5oYW5jZWQgY2VsbCBjbGljayBoYW5kbGVyIHdpdGggbXVsdGktc2VsZWN0IHN1cHBvcnRcbiAgICBjb25zdCBoYW5kbGVDZWxsQ2xpY2sgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKGVuZ2luZWVySWQ6IHN0cmluZywgZGF0ZVN0cmluZzogc3RyaW5nLCBjdHJsS2V5OiBib29sZWFuLCBzaGlmdEtleTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgc2VsZWN0Q2VsbChlbmdpbmVlcklkLCBkYXRlU3RyaW5nLCBjdHJsS2V5LCBzaGlmdEtleSk7XG4gICAgICAgIH0sXG4gICAgICAgIFtzZWxlY3RDZWxsXVxuICAgICk7XG5cbiAgICAvLyBLZXlib2FyZCBuYXZpZ2F0aW9uIHdpdGggbXVsdGktc2VsZWN0IHN1cHBvcnRcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkID0+IHtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZENlbGxzLmxlbmd0aCA9PT0gMCB8fCBhbGxFbmdpbmVlcnMubGVuZ3RoID09PSAwIHx8IGRhdGVDb2x1bW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVXNlIHRoZSBsYXN0IHNlbGVjdGVkIGNlbGwgZm9yIG5hdmlnYXRpb25cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRDZWxsID0gbGFzdFNlbGVjdGVkQ2VsbCB8fCBzZWxlY3RlZENlbGxzW3NlbGVjdGVkQ2VsbHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RW5naW5lZXJJbmRleCA9IGFsbEVuZ2luZWVycy5maW5kSW5kZXgoZW5nID0+IGVuZy5pZCA9PT0gY3VycmVudENlbGwuZW5naW5lZXJJZCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RGF0ZUluZGV4ID0gZGF0ZUNvbHVtbnMuZmluZEluZGV4KGNvbCA9PiBjb2wuZGF0ZVN0cmluZyA9PT0gY3VycmVudENlbGwuZGF0ZSk7XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50RW5naW5lZXJJbmRleCA9PT0gLTEgfHwgY3VycmVudERhdGVJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBuZXdFbmdpbmVlckluZGV4ID0gY3VycmVudEVuZ2luZWVySW5kZXg7XG4gICAgICAgICAgICBsZXQgbmV3RGF0ZUluZGV4ID0gY3VycmVudERhdGVJbmRleDtcblxuICAgICAgICAgICAgc3dpdGNoIChlLmtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgICAgICAgICAgIG5ld0VuZ2luZWVySW5kZXggPSBNYXRoLm1heCgwLCBjdXJyZW50RW5naW5lZXJJbmRleCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgICAgICAgICAgICAgbmV3RW5naW5lZXJJbmRleCA9IE1hdGgubWluKGFsbEVuZ2luZWVycy5sZW5ndGggLSAxLCBjdXJyZW50RW5naW5lZXJJbmRleCArIDEpO1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICAgICAgICAgICAgbmV3RGF0ZUluZGV4ID0gTWF0aC5tYXgoMCwgY3VycmVudERhdGVJbmRleCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgICAgICAgICAgIG5ld0RhdGVJbmRleCA9IE1hdGgubWluKGRhdGVDb2x1bW5zLmxlbmd0aCAtIDEsIGN1cnJlbnREYXRlSW5kZXggKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiRW50ZXJcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiIFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRDZWxscy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpbmdsZSBzZWxlY3Rpb246IGVkaXQgdGhlIHNlbGVjdGVkIGNlbGxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hpZnQgPSBnZXRTaGlmdChjdXJyZW50Q2VsbC5lbmdpbmVlcklkLCBjdXJyZW50Q2VsbC5kYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob25FZGl0U2hpZnQgJiYgc2hpZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FZGl0U2hpZnQoc2hpZnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluIGtleWJvYXJkIGVkaXQ6XCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE11bHRpLXNlbGVjdGlvbjogY291bGQgYmF0Y2ggZWRpdCBvciBzaG93IGNvbnRleHQgbWVudVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYE11bHRpLWVkaXQgZm9yICR7c2VsZWN0ZWRDZWxscy5sZW5ndGh9IGNlbGxzYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiRXNjYXBlXCI6XG4gICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkQ2VsbHMoW10pO1xuICAgICAgICAgICAgICAgICAgICBzZXRMYXN0U2VsZWN0ZWRDZWxsKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld0VuZ2luZWVySW5kZXggIT09IGN1cnJlbnRFbmdpbmVlckluZGV4IHx8IG5ld0RhdGVJbmRleCAhPT0gY3VycmVudERhdGVJbmRleCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdENlbGwoXG4gICAgICAgICAgICAgICAgICAgIGFsbEVuZ2luZWVyc1tuZXdFbmdpbmVlckluZGV4XS5pZCxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZUNvbHVtbnNbbmV3RGF0ZUluZGV4XS5kYXRlU3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBlLmN0cmxLZXkgfHwgZS5tZXRhS2V5LFxuICAgICAgICAgICAgICAgICAgICBlLnNoaWZ0S2V5XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVLZXlEb3duKTtcbiAgICAgICAgcmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleURvd24pO1xuICAgIH0sIFtzZWxlY3RlZENlbGxzLCBsYXN0U2VsZWN0ZWRDZWxsLCBhbGxFbmdpbmVlcnMsIGRhdGVDb2x1bW5zLCBnZXRTaGlmdCwgb25FZGl0U2hpZnQsIHNlbGVjdENlbGxdKTtcblxuICAgIC8vIEdsb2JhbCBjbGljayBoYW5kbGVyIHRvIGNsb3NlIGNvbnRleHQgbWVudVxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZUdsb2JhbENsaWNrID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgY2xvc2VDb250ZXh0TWVudSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChjb250ZXh0TWVudS52aXNpYmxlKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlR2xvYmFsQ2xpY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVHbG9iYWxDbGljayk7XG4gICAgICAgIH07XG4gICAgfSwgW2NvbnRleHRNZW51LnZpc2libGUsIGNsb3NlQ29udGV4dE1lbnVdKTtcblxuICAgIC8vIENhbGN1bGF0ZSBzaGlmdCBzdGF0aXN0aWNzXG4gICAgY29uc3Qgc2hpZnRTdGF0cyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0cyA9IHtcbiAgICAgICAgICAgIE06IDAsXG4gICAgICAgICAgICBFOiAwLFxuICAgICAgICAgICAgTjogMCxcbiAgICAgICAgICAgIEQ6IDAsXG4gICAgICAgICAgICBIOiAwLFxuICAgICAgICAgICAgVDogMCxcbiAgICAgICAgICAgIHRvdGFsOiBhY2Nlc3NpYmxlU2hpZnRzLmxlbmd0aFxuICAgICAgICB9O1xuICAgICAgICBhY2Nlc3NpYmxlU2hpZnRzLmZvckVhY2goc2hpZnQgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2hpZnRUeXBlID0gc2hpZnQuc2hpZnQuY2hhckF0KDApOyAvLyBHZXQgZmlyc3QgY2hhcmFjdGVyIChNLCBFLCBOLCBELCBILCBUKVxuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdGF0cywgc2hpZnRUeXBlKSkge1xuICAgICAgICAgICAgICAgIHN0YXRzW3NoaWZ0VHlwZSBhcyBrZXlvZiB0eXBlb2Ygc3RhdHNdKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3RhdHM7XG4gICAgfSwgW2FjY2Vzc2libGVTaGlmdHNdKTtcblxuICAgIC8vIEVycm9yIGhhbmRsaW5nIGZvciBlbXB0eSBkYXRhXG4gICAgaWYgKGhlYWRlclN1YmhlYWRlclN0cnVjdHVyZS5sZW5ndGggPT09IDAgfHwgYWxsRW5naW5lZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEVtcHR5U3RhdGVcbiAgICAgICAgICAgICAgICBtZXNzYWdlPVwiTm8gRW5naW5lZXJzIEF2YWlsYWJsZVwiXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCJObyBlbmdpbmVlcnMgZm91bmQuIFBsZWFzZSBjaGVjayB5b3VyIGRhdGEgY29uZmlndXJhdGlvbi5cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHNoaWZ0LXNjaGVkdWxlci11bmlmaWVkICR7Y2xhc3NOYW1lfWB9PlxuICAgICAgICAgICAgey8qIEVuaGFuY2VkIGRlYnVnIGluZm8gcGFuZWwgKi99XG4gICAgICAgICAgICB7c2hvd0RlYnVnSW5mbyAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCIjZTBmMmZlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjEycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjExcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTogXCIxcHggc29saWQgIzAyODRjN1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiIzBjNGE2ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogXCJtb25vc3BhY2VcIlxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIPCflI0gRGVidWc6IEhlYWRlcnM6IHtoZWFkZXJTdWJoZWFkZXJTdHJ1Y3R1cmUubGVuZ3RofSwgRW5naW5lZXJzOiB7YWxsRW5naW5lZXJzLmxlbmd0aH0sIFNoaWZ0czp7XCIgXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICB7c2hpZnRzLmxlbmd0aH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+8J+TiiBTaGlmdCBMb29rdXAgS2V5czoge09iamVjdC5rZXlzKHNoaWZ0TG9va3VwKS5sZW5ndGh9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICDwn4+X77iPIEdyb3VwaW5nOntcIiBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtBcnJheS5pc0FycmF5KGdyb3VwaW5nRGVidWdJbmZvKSA/IGdyb3VwaW5nRGVidWdJbmZvLmpvaW4oXCIgfCBcIikgOiBcIkRlYnVnIGluZm8gdW5hdmFpbGFibGVcIn1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtkZWJ1Z0luZm8gJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDimpnvuI8gQ29uZmlnOiBOYW1lPXtkZWJ1Z0luZm8uYXR0cmlidXRlc0NvbmZpZ3VyZWQubmFtZSA/IFwi4pyFXCIgOiBcIuKdjFwifSwgSGVhZGVyPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkZWJ1Z0luZm8uYXR0cmlidXRlc0NvbmZpZ3VyZWQuaGVhZGVyID8gXCLinIVcIiA6IFwi4p2MXCJ9LCBTdWJoZWFkZXI9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2RlYnVnSW5mby5hdHRyaWJ1dGVzQ29uZmlndXJlZC5zdWJoZWFkZXIgPyBcIuKchVwiIDogXCLinYxcIn0sIFNQVXNlcj1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGVidWdJbmZvLmF0dHJpYnV0ZXNDb25maWd1cmVkLnNwVXNlckFzc29jaWF0aW9uID8gXCLinIVcIiA6IFwi4p2MXCJ9LCBTaGlmdD1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGVidWdJbmZvLmF0dHJpYnV0ZXNDb25maWd1cmVkLnNoaWZ0QXNzb2NpYXRpb24gPyBcIuKchVwiIDogXCLinYxcIn0sIFNoaWZ0RGF0ZT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGVidWdJbmZvLmF0dHJpYnV0ZXNDb25maWd1cmVkLnNoaWZ0RGF0ZSA/IFwi4pyFXCIgOiBcIuKdjFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHtzaGlmdHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIPCfjq8gRmlyc3QgU2hpZnQ6IElEPXtzaGlmdHNbMF0/LmVuZ2luZWVySWR9LCBEYXRlPXtzaGlmdHNbMF0/LmRhdGV9LCBUeXBlPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dHlwZW9mIHNoaWZ0c1swXT8uZGF0ZX0sIFNoaWZ0PXtzaGlmdHNbMF0/LnNoaWZ0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+8J+UkSBTYW1wbGUgS2V5czoge09iamVjdC5rZXlzKHNoaWZ0TG9va3VwKS5zbGljZSgwLCAzKS5qb2luKFwiLCBcIil9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAge2FsbEVuZ2luZWVycy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg8J+RpCBGaXJzdCBFbmdpbmVlcjogSUQ9e2FsbEVuZ2luZWVyc1swXT8uaWR9LCBOYW1lPXthbGxFbmdpbmVlcnNbMF0/Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAge2RhdGVDb2x1bW5zLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDwn5OFIFRpbWVsaW5lOiB7ZGF0ZUNvbHVtbnNbMF0/LmRhdGVTdHJpbmd9IHRve1wiIFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRlQ29sdW1uc1tkYXRlQ29sdW1ucy5sZW5ndGggLSAxXT8uZGF0ZVN0cmluZ30gKHtkYXRlQ29sdW1ucy5sZW5ndGh9IGRheXMpXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIPCflI0gVGVzdCBMb29rdXA6IEtleT17YWxsRW5naW5lZXJzWzBdPy5pZH0te2RhdGVDb2x1bW5zWzBdPy5kYXRlU3RyaW5nfSBGb3VuZD1cbiAgICAgICAgICAgICAgICAgICAgICAgIHshIXNoaWZ0TG9va3VwW2Ake2FsbEVuZ2luZWVyc1swXT8uaWR9LSR7ZGF0ZUNvbHVtbnNbMF0/LmRhdGVTdHJpbmd9YF19XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAg8J+UjSBFbmdpbmVlciBJRCBUeXBlczogRW5naW5lZXI9e3R5cGVvZiBhbGxFbmdpbmVlcnNbMF0/LmlkfSwgU2hpZnQ9XG4gICAgICAgICAgICAgICAgICAgICAgICB7dHlwZW9mIHNoaWZ0c1swXT8uZW5naW5lZXJJZH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICDwn5SNIERhdGUgTWF0Y2ggVGVzdDogVGltZWxpbmU9e2RhdGVDb2x1bW5zWzBdPy5kYXRlU3RyaW5nfSwgU2hpZnQ9e3NoaWZ0c1swXT8uZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICDwn5OIIFBlcmZvcm1hbmNlOiB7T2JqZWN0LmtleXMoc2hpZnRMb29rdXApLmxlbmd0aH0gbG9va3VwIGtleXMse1wiIFwifVxuICAgICAgICAgICAgICAgICAgICAgICAge2FsbEVuZ2luZWVycy5sZW5ndGggKiBkYXRlQ29sdW1ucy5sZW5ndGh9IHRvdGFsIGNlbGxzXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAg8J+TiiBTaGlmdCBTdGF0czogTTp7c2hpZnRTdGF0cy5NfSBFOntzaGlmdFN0YXRzLkV9IE46e3NoaWZ0U3RhdHMuTn0gRDp7c2hpZnRTdGF0cy5EfSBIOlxuICAgICAgICAgICAgICAgICAgICAgICAge3NoaWZ0U3RhdHMuSH0gVDp7c2hpZnRTdGF0cy5UfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkQ2VsbHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIPCfjq8gU2VsZWN0ZWQ6IHtzZWxlY3RlZENlbGxzLmxlbmd0aH0gY2VsbChzKXtcIiBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRDZWxscy5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgKCR7YWxsRW5naW5lZXJzLmZpbmQoZSA9PiBlLmlkID09PSBzZWxlY3RlZENlbGxzWzBdLmVuZ2luZWVySWQpPy5uYW1lfSBvbiAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENlbGxzWzBdLmRhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KWBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlwifXtcIiBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIEN0cmwrY2xpY2s6IHRvZ2dsZSwgU2hpZnQrY2xpY2s6IHJhbmdlLCBBcnJvd3M6IG5hdmlnYXRlLCBFbnRlci9TcGFjZTogZWRpdCwgRXNjOiBjbGVhclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiBcIjhweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI2YwZjBmMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjRweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+8J+UjSBGaW5kIGVuZ2luZWVycyB3aXRoIHNoaWZ0czo8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHByZSBzdHlsZT17eyBmb250U2l6ZTogXCI5cHhcIiwgb3ZlcmZsb3c6IFwiYXV0b1wiLCBtYXhIZWlnaHQ6IFwiODBweFwiIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmdpbmVlcnNXaXRoU2hpZnRzID0gYWxsRW5naW5lZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGVuZyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzU2hpZnQgPSBzaGlmdExvb2t1cFtgJHtlbmcuaWR9LSR7ZGF0ZUNvbHVtbnNbMF0/LmRhdGVTdHJpbmd9YF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhc1NoaWZ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSgwLCAzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVlcnNXaXRoU2hpZnRzLm1hcChlbmcgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogZW5nLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGVuZy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogZW5nLmhlYWRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJoZWFkZXI6IGVuZy5zdWJoZWFkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzU2hpZnRPbkZpcnN0RGF0ZTogISFzaGlmdExvb2t1cFtgJHtlbmcuaWR9LSR7ZGF0ZUNvbHVtbnNbMF0/LmRhdGVTdHJpbmd9YF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcHJlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiNHB4XCIgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz7wn5SNIFNhbXBsZSBzaGlmdCBlbmdpbmVlciBJRHM6PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwcmUgc3R5bGU9e3sgZm9udFNpemU6IFwiOXB4XCIsIG92ZXJmbG93OiBcImF1dG9cIiwgbWF4SGVpZ2h0OiBcIjgwcHhcIiB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0cy5zbGljZSgwLCA1KS5tYXAoc2hpZnQgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0SWQ6IHNoaWZ0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lZXJJZDogc2hpZnQuZW5naW5lZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0OiBzaGlmdC5zaGlmdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGU6IHNoaWZ0LmRhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcHJlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiNHB4XCIgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz7wn5KhIENoZWNrOiBEbyBhbnkgZW5naW5lZXIgSURzIG1hdGNoIHNoaWZ0IGVuZ2luZWVyIElEcz88L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHByZSBzdHlsZT17eyBmb250U2l6ZTogXCI5cHhcIiwgb3ZlcmZsb3c6IFwiYXV0b1wiLCBtYXhIZWlnaHQ6IFwiNjBweFwiIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGlmdEVuZ2luZWVySWRzID0gbmV3IFNldChzaGlmdHMubWFwKHMgPT4gcy5lbmdpbmVlcklkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVuZ2luZWVySWRzID0gbmV3IFNldChhbGxFbmdpbmVlcnMubWFwKGUgPT4gZS5pZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGVzID0gWy4uLnNoaWZ0RW5naW5lZXJJZHNdLmZpbHRlcihpZCA9PiBlbmdpbmVlcklkcy5oYXMoaWQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG90YWxTaGlmdEVuZ2luZWVycyA9IHNoaWZ0RW5naW5lZXJJZHMuc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG90YWxFbmdpbmVlcnMgPSBlbmdpbmVlcklkcy5zaXplO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGluZ0lkczogbWF0Y2hlcy5zbGljZSgwLCAzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3RhbE1hdGNoZXM6IG1hdGNoZXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsU2hpZnRFbmdpbmVlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxFbmdpbmVlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FtcGxlU2hpZnRJZHM6IFsuLi5zaGlmdEVuZ2luZWVySWRzXS5zbGljZSgwLCAzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYW1wbGVFbmdpbmVlcklkczogWy4uLmVuZ2luZWVySWRzXS5zbGljZSgwLCAzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcHJlPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogXCI4cHhcIiB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPvCflI0gUmF3IFNQVXNlciBPYmplY3QgUHJvcGVydGllczo8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHByZSBzdHlsZT17eyBmb250U2l6ZTogXCI5cHhcIiwgb3ZlcmZsb3c6IFwiYXV0b1wiLCBtYXhIZWlnaHQ6IFwiODBweFwiIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthbGxFbmdpbmVlcnMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IEpTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogYWxsRW5naW5lZXJzWzBdLm1lbmRpeE9iamVjdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbE93blByb3BlcnRpZXM6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFsbEVuZ2luZWVyc1swXS5tZW5kaXhPYmplY3QpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsUHJvdG90eXBlUHJvcGVydGllczogT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKGFsbEVuZ2luZWVyc1swXS5tZW5kaXhPYmplY3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0S2V5czogT2JqZWN0LmtleXMoYWxsRW5naW5lZXJzWzBdLm1lbmRpeE9iamVjdCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RBY2Nlc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVc2VybmFtZTogKGFsbEVuZ2luZWVyc1swXS5tZW5kaXhPYmplY3QgYXMgYW55KS5Vc2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOYW1lOiAoYWxsRW5naW5lZXJzWzBdLm1lbmRpeE9iamVjdCBhcyBhbnkpLk5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRW1haWw6IChhbGxFbmdpbmVlcnNbMF0ubWVuZGl4T2JqZWN0IGFzIGFueSkuRW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWJicmV2aWF0aW9uOiAoYWxsRW5naW5lZXJzWzBdLm1lbmRpeE9iamVjdCBhcyBhbnkpLkFiYnJldmlhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogKGFsbEVuZ2luZWVyc1swXS5tZW5kaXhPYmplY3QgYXMgYW55KS5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZkNoZWNrOiB0eXBlb2YgYWxsRW5naW5lZXJzWzBdLm1lbmRpeE9iamVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yTmFtZTogYWxsRW5naW5lZXJzWzBdLm1lbmRpeE9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJObyBlbmdpbmVlcnNcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcHJlPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogXCI4cHhcIiB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPvCflI0gUmF3IENhbGVuZGFyRXZlbnQgT2JqZWN0IFByb3BlcnRpZXM6PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwcmUgc3R5bGU9e3sgZm9udFNpemU6IFwiOXB4XCIsIG92ZXJmbG93OiBcImF1dG9cIiwgbWF4SGVpZ2h0OiBcIjgwcHhcIiB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2hpZnRzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHNoaWZ0c1swXS5tZW5kaXhPYmplY3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGxQcm9wZXJ0aWVzOiBPYmplY3Qua2V5cyhzaGlmdHNbMF0ubWVuZGl4T2JqZWN0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdEFjY2Vzczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNQVXNlcjogKHNoaWZ0c1swXS5tZW5kaXhPYmplY3QgYXMgYW55KS5TUFVzZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FsZW5kYXJFdmVudHNfU1BVc2VyOiAoc2hpZnRzWzBdLm1lbmRpeE9iamVjdCBhcyBhbnkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5DYWxlbmRhckV2ZW50c19TUFVzZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5naW5lZXI6IChzaGlmdHNbMF0ubWVuZGl4T2JqZWN0IGFzIGFueSkuRW5naW5lZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXNlcjogKHNoaWZ0c1swXS5tZW5kaXhPYmplY3QgYXMgYW55KS5Vc2VyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJObyBzaGlmdHNcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcHJlPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNjaGVkdWxlci1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICB7LyogSGVhZGVyIFJvdyAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNjaGVkdWxlci1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJlbmdpbmVlci1jb2x1bW4taGVhZGVyXCI+RW5naW5lZXI8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1jb250YWluZXJcIiByZWY9e2hlYWRlclNjcm9sbFJlZn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRlQ29sdW1ucy5tYXAoKGNvbCwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aWR4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZGF0ZS1oZWFkZXIgJHtjb2wuaXNUb2RheSA/IFwiZGF0ZS1oZWFkZXItdG9kYXlcIiA6IFwiXCJ9ICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sLmlzV2Vla2VuZCA/IFwiZGF0ZS1oZWFkZXItd2Vla2VuZFwiIDogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGF0ZS1kYXlcIj57Y29sLmRhdGUuZ2V0RGF0ZSgpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRlLW1vbnRoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbC5kYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuXCIsIHsgbW9udGg6IFwic2hvcnRcIiB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBDb250ZW50IEFyZWEgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzY2hlZHVsZXItY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImVuZ2luZWVyLW5hbWVzLWNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2hlYWRlclN1YmhlYWRlclN0cnVjdHVyZS5tYXAoaGVhZGVyRGF0YSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2hlYWRlckRhdGEuaGVhZGVySWR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlYW0tbmFtZS1jZWxsXCI+e2hlYWRlckRhdGEuaGVhZGVyTmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2hlYWRlckRhdGEuc3ViaGVhZGVycy5tYXAoc3ViaGVhZGVyID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtgJHtoZWFkZXJEYXRhLmhlYWRlcklkfS0ke3N1YmhlYWRlci5uYW1lfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFuZS1uYW1lLWNlbGxcIj57c3ViaGVhZGVyLm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3N1YmhlYWRlci5lbmdpbmVlcnMubWFwKGVuZ2luZWVyID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VuZ2luZWVyLmlkfSBjbGFzc05hbWU9XCJlbmdpbmVlci1uYW1lLWNlbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlbmdpbmVlci5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1jb250YWluZXJcIiByZWY9e2NvbnRlbnRTY3JvbGxSZWZ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2hlYWRlclN1YmhlYWRlclN0cnVjdHVyZS5tYXAoaGVhZGVyRGF0YSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtoZWFkZXJEYXRhLmhlYWRlcklkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGVhbS10aW1lbGluZS1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGF0ZUNvbHVtbnMubWFwKChfLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2lkeH0gY2xhc3NOYW1lPVwidGVhbS10aW1lbGluZS1jZWxsXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtoZWFkZXJEYXRhLnN1YmhlYWRlcnMubWFwKHN1YmhlYWRlciA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2Ake2hlYWRlckRhdGEuaGVhZGVySWR9LSR7c3ViaGVhZGVyLm5hbWV9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFuZS10aW1lbGluZS1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRlQ29sdW1ucy5tYXAoKF8sIGlkeCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpZHh9IGNsYXNzTmFtZT1cImxhbmUtdGltZWxpbmUtY2VsbFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c3ViaGVhZGVyLmVuZ2luZWVycy5tYXAoZW5naW5lZXIgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VuZ2luZWVyLmlkfSBjbGFzc05hbWU9XCJlbmdpbmVlci10aW1lbGluZS1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGF0ZUNvbHVtbnMubWFwKChjb2wsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGlmdCA9IGdldFNoaWZ0KGVuZ2luZWVyLmlkLCBjb2wuZGF0ZVN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RGF5Q2VsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17YCR7ZW5naW5lZXIuaWR9LSR7aWR4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZT17Y29sLmRhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lZXI9e2VuZ2luZWVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0PXtzaGlmdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1RvZGF5PXtjb2wuaXNUb2RheX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1dlZWtlbmQ9e2NvbC5pc1dlZWtlbmR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZD17aXNDZWxsU2VsZWN0ZWQoZW5naW5lZXIuaWQsIGNvbC5kYXRlU3RyaW5nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlmdHNMb2FkaW5nPXtzaGlmdHNMb2FkaW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRG91YmxlQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaGlmdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4aXN0aW5nIHNoaWZ0OiBlZGl0IGl0IChzYW1lIGFzIGNvbnRleHQgbWVudSBlZGl0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkVkaXRTaGlmdD8uY2FuRXhlY3V0ZSAmJiAhb25FZGl0U2hpZnQuaXNFeGVjdXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHRTaGlmdElkPy5zZXRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dFNoaWZ0SWQuc2V0VmFsdWUoc2hpZnQuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRWRpdFNoaWZ0LmV4ZWN1dGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVtcHR5IGNlbGw6IGNyZWF0ZSBuZXcgc2hpZnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob25DcmVhdGVTaGlmdD8uY2FuRXhlY3V0ZSAmJiAhb25DcmVhdGVTaGlmdC5pc0V4ZWN1dGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dEVuZ2luZWVySWQ/LnNldFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0RW5naW5lZXJJZC5zZXRWYWx1ZShlbmdpbmVlci5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHREYXRlPy5zZXRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dERhdGUuc2V0VmFsdWUoY29sLmRhdGVTdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ3JlYXRlU2hpZnQuZXhlY3V0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYEVycm9yIGluIG9uRG91YmxlQ2xpY2sgZm9yICR7ZW5naW5lZXIubmFtZX06YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DZWxsQ2xpY2s9e2UgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQ2VsbENsaWNrKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lZXIuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2wuZGF0ZVN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuY3RybEtleSB8fCBlLm1ldGFLZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnNoaWZ0S2V5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db250ZXh0TWVudT17aGFuZGxlQ2VsbENvbnRleHRNZW51fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgcmVmPXtpbmZpbml0ZVNjcm9sbFJlZn0gY2xhc3NOYW1lPVwic2VudGluZWxcIiBzdHlsZT17eyBoZWlnaHQ6IFwiMjBweFwiLCB2aXNpYmlsaXR5OiBcImhpZGRlblwiIH19IC8+XG5cbiAgICAgICAgICAgIHsvKiBDb250ZXh0IE1lbnUgKi99XG4gICAgICAgICAgICA8Q29udGV4dE1lbnVcbiAgICAgICAgICAgICAgICB2aXNpYmxlPXtjb250ZXh0TWVudS52aXNpYmxlfVxuICAgICAgICAgICAgICAgIHg9e2NvbnRleHRNZW51Lnh9XG4gICAgICAgICAgICAgICAgeT17Y29udGV4dE1lbnUueX1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXtjb250ZXh0TWVudS5vcHRpb25zfVxuICAgICAgICAgICAgICAgIG9uQ2xvc2U9e2Nsb3NlQ29udGV4dE1lbnV9XG4gICAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuLy8gRXhwb3J0IHdpdGggZXJyb3IgYm91bmRhcnkgZm9yIHByb2R1Y3Rpb24gcmVzaWxpZW5jZVxuZXhwb3J0IGRlZmF1bHQgd2l0aEVycm9yQm91bmRhcnkoU2NoZWR1bGVHcmlkKTtcbiIsImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBMaXN0VmFsdWUsIE9iamVjdEl0ZW0sIExpc3RBdHRyaWJ1dGVWYWx1ZSwgTGlzdFJlZmVyZW5jZVZhbHVlIH0gZnJvbSBcIm1lbmRpeFwiO1xuaW1wb3J0IHsgVXNlU2hpZnREYXRhUmV0dXJuLCBFbmdpbmVlciwgU2hpZnRBc3NpZ25tZW50LCBTaGlmdFR5cGUsIFZhbGlkYXRpb25FcnJvciB9IGZyb20gXCIuLi90eXBlcy9zaGlmdFNjaGVkdWxlclwiO1xuXG5pbnRlcmZhY2UgRGF0YVN0YXRlIHtcbiAgICBlbmdpbmVlcnM6IEVuZ2luZWVyW107XG4gICAgc2hpZnRzOiBTaGlmdEFzc2lnbm1lbnRbXTtcbiAgICBzaGlmdHNMb2FkaW5nOiBib29sZWFuO1xuICAgIGVycm9yOiBWYWxpZGF0aW9uRXJyb3IgfCBudWxsO1xufVxuXG5pbnRlcmZhY2UgVXNlU2hpZnREYXRhUHJvcHMge1xuICAgIGVuZ2luZWVyc1NvdXJjZTogTGlzdFZhbHVlO1xuICAgIHNoaWZ0c1NvdXJjZT86IExpc3RWYWx1ZTtcbiAgICBuYW1lQXR0cmlidXRlPzogTGlzdEF0dHJpYnV0ZVZhbHVlPHN0cmluZz47XG4gICAgaGVhZGVyQXR0cmlidXRlPzogTGlzdEF0dHJpYnV0ZVZhbHVlPHN0cmluZz47XG4gICAgc3ViaGVhZGVyQXR0cmlidXRlPzogTGlzdEF0dHJpYnV0ZVZhbHVlPHN0cmluZz47XG4gICAgc3RhcnRUaW1lQXR0cmlidXRlPzogTGlzdEF0dHJpYnV0ZVZhbHVlPERhdGU+O1xuICAgIGRheVR5cGVBdHRyaWJ1dGU/OiBMaXN0QXR0cmlidXRlVmFsdWU8c3RyaW5nPjtcbiAgICBzdGF0dXNBdHRyaWJ1dGU/OiBMaXN0QXR0cmlidXRlVmFsdWU8c3RyaW5nPjtcbiAgICBzcFVzZXJBc3NvY2lhdGlvbj86IExpc3RSZWZlcmVuY2VWYWx1ZTtcbiAgICBzaGlmdEFzc29jaWF0aW9uPzogTGlzdFJlZmVyZW5jZVZhbHVlO1xuICAgIHNoaWZ0RGF0ZUF0dHJpYnV0ZT86IExpc3RBdHRyaWJ1dGVWYWx1ZTxEYXRlPjtcbn1cblxuZXhwb3J0IGNvbnN0IHVzZVNoaWZ0RGF0YSA9ICh7XG4gICAgZW5naW5lZXJzU291cmNlLFxuICAgIHNoaWZ0c1NvdXJjZSxcbiAgICBuYW1lQXR0cmlidXRlLFxuICAgIGhlYWRlckF0dHJpYnV0ZSxcbiAgICBzdWJoZWFkZXJBdHRyaWJ1dGUsXG4gICAgc3RhcnRUaW1lQXR0cmlidXRlLFxuICAgIGRheVR5cGVBdHRyaWJ1dGUsXG4gICAgc3RhdHVzQXR0cmlidXRlLFxuICAgIHNwVXNlckFzc29jaWF0aW9uLFxuICAgIHNoaWZ0QXNzb2NpYXRpb24sXG4gICAgc2hpZnREYXRlQXR0cmlidXRlXG59OiBVc2VTaGlmdERhdGFQcm9wcyk6IFVzZVNoaWZ0RGF0YVJldHVybiA9PiB7XG4gICAgY29uc3QgW2RhdGFTdGF0ZSwgc2V0RGF0YVN0YXRlXSA9IHVzZVN0YXRlPERhdGFTdGF0ZT4oe1xuICAgICAgICBlbmdpbmVlcnM6IFtdLFxuICAgICAgICBzaGlmdHM6IFtdLFxuICAgICAgICBzaGlmdHNMb2FkaW5nOiB0cnVlLFxuICAgICAgICBlcnJvcjogbnVsbFxuICAgIH0pO1xuXG4gICAgLy8gVmFsaWRhdGlvbiBoZWxwZXJcbiAgICBjb25zdCB2YWxpZGF0ZUNvbmZpZ3VyYXRpb24gPSB1c2VDYWxsYmFjaygoKTogVmFsaWRhdGlvbkVycm9yIHwgbnVsbCA9PiB7XG4gICAgICAgIGlmICghZW5naW5lZXJzU291cmNlKSB7XG4gICAgICAgICAgICByZXR1cm4geyBtZXNzYWdlOiBcIkVuZ2luZWVycyBkYXRhIHNvdXJjZSBpcyByZXF1aXJlZFwiLCBwcm9wZXJ0eTogXCJlbmdpbmVlcnNcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVuZ2luZWVyc1NvdXJjZS5zdGF0dXMgPT09IFwidW5hdmFpbGFibGVcIikge1xuICAgICAgICAgICAgcmV0dXJuIHsgbWVzc2FnZTogXCJFbmdpbmVlcnMgZGF0YSBzb3VyY2UgaXMgdW5hdmFpbGFibGVcIiwgcHJvcGVydHk6IFwiZW5naW5lZXJzXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbmFtZUF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgbWVzc2FnZTogXCJOYW1lIGF0dHJpYnV0ZSBpcyByZXF1aXJlZCBmb3IgZW5naW5lZXJzXCIsIHByb3BlcnR5OiBcIm5hbWVBdHRyaWJ1dGVcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFoZWFkZXJBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IG1lc3NhZ2U6IFwiSGVhZGVyIGF0dHJpYnV0ZSBpcyByZXF1aXJlZCBmb3IgZW5naW5lZXJzXCIsIHByb3BlcnR5OiBcImhlYWRlckF0dHJpYnV0ZVwiIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBWYWxpZGF0ZSBzaGlmdHMgY29uZmlndXJhdGlvbiBpZiBwcm92aWRlZFxuICAgICAgICBpZiAoc2hpZnRzU291cmNlICYmIHNoaWZ0c1NvdXJjZS5zdGF0dXMgPT09IFwidW5hdmFpbGFibGVcIikge1xuICAgICAgICAgICAgcmV0dXJuIHsgbWVzc2FnZTogXCJTaGlmdHMgZGF0YSBzb3VyY2UgaXMgdW5hdmFpbGFibGVcIiwgcHJvcGVydHk6IFwic2hpZnRzXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaGlmdHNTb3VyY2UgJiYgIXN0YXJ0VGltZUF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlN0YXJ0IHRpbWUgYXR0cmlidXRlIGlzIHJlcXVpcmVkIHdoZW4gc2hpZnRzIGRhdGEgc291cmNlIGlzIHByb3ZpZGVkXCIsXG4gICAgICAgICAgICAgICAgcHJvcGVydHk6IFwic3RhcnRUaW1lQXR0cmlidXRlXCJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LCBbZW5naW5lZXJzU291cmNlLCBzaGlmdHNTb3VyY2UsIG5hbWVBdHRyaWJ1dGUsIGhlYWRlckF0dHJpYnV0ZSwgc3RhcnRUaW1lQXR0cmlidXRlXSk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gTWVuZGl4IGVuZ2luZWVycyBkYXRhIHdpdGggZXJyb3IgaGFuZGxpbmdcbiAgICBjb25zdCB0cmFuc2Zvcm1lZEVuZ2luZWVycyA9IHVzZU1lbW8oKCk6IEVuZ2luZWVyW10gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGVuZ2luZWVyc1NvdXJjZS5zdGF0dXMgIT09IFwiYXZhaWxhYmxlXCIgfHwgIWVuZ2luZWVyc1NvdXJjZS5pdGVtcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGVuZ2luZWVyc1NvdXJjZS5pdGVtcy5tYXAoKGl0ZW06IE9iamVjdEl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAvLyBEZWJ1ZzogQ2hlY2sgYXR0cmlidXRlIGNvbmZpZ3VyYXRpb24gKHdpbGwgYmUgc2hvd24gaW4gbWFpbiBkZWJ1ZyBwYW5lbClcblxuICAgICAgICAgICAgICAgICAgICAvLyBTdG9yZSBkZWJ1ZyBpbmZvIHRvIGJlIGRpc3BsYXllZCBpbiBtYWluIHBhbmVsIChubyBmbG9hdGluZyBkZWJ1ZyBib3gpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQWNjZXNzIFNQVXNlciBwcm9wZXJ0aWVzIHRocm91Z2ggY29uZmlndXJlZCBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBuYW1lQXR0cmlidXRlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IG5hbWVBdHRyaWJ1dGUuZ2V0KGl0ZW0pLnN0YXR1cyA9PT0gXCJhdmFpbGFibGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gbmFtZUF0dHJpYnV0ZS5nZXQoaXRlbSkudmFsdWUgfHwgXCJVbmtub3duXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiVW5rbm93blwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiVW5rbm93blwiO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IGhlYWRlckF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBoZWFkZXJBdHRyaWJ1dGUuZ2V0KGl0ZW0pLnN0YXR1cyA9PT0gXCJhdmFpbGFibGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gaGVhZGVyQXR0cmlidXRlLmdldChpdGVtKS52YWx1ZSB8fCBcIkFsbCBFbmdpbmVlcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJBbGwgRW5naW5lZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogXCJBbGwgRW5naW5lZXJzXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViaGVhZGVyID0gc3ViaGVhZGVyQXR0cmlidXRlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHN1YmhlYWRlckF0dHJpYnV0ZS5nZXQoaXRlbSkuc3RhdHVzID09PSBcImF2YWlsYWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBzdWJoZWFkZXJBdHRyaWJ1dGUuZ2V0KGl0ZW0pLnZhbHVlIHx8IFwiR2VuZXJhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIkdlbmVyYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOiBcIkdlbmVyYWxcIjtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGl0ZW0uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViaGVhZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVuZGl4T2JqZWN0OiBpdGVtXG4gICAgICAgICAgICAgICAgICAgIH0gYXMgRW5naW5lZXI7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpdGVtLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJVbmtub3duXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmhlYWRlcjogXCJHZW5lcmFsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW5kaXhPYmplY3Q6IGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgfSBhcyBFbmdpbmVlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIH0sIFtlbmdpbmVlcnNTb3VyY2UsIG5hbWVBdHRyaWJ1dGUsIGhlYWRlckF0dHJpYnV0ZSwgc3ViaGVhZGVyQXR0cmlidXRlXSk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gTWVuZGl4IHNoaWZ0cyBkYXRhIHdpdGggZXJyb3IgaGFuZGxpbmdcbiAgICBjb25zdCB0cmFuc2Zvcm1lZFNoaWZ0cyA9IHVzZU1lbW8oKCk6IFNoaWZ0QXNzaWdubWVudFtdID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghc2hpZnRzU291cmNlIHx8IHNoaWZ0c1NvdXJjZS5zdGF0dXMgIT09IFwiYXZhaWxhYmxlXCIgfHwgIXNoaWZ0c1NvdXJjZS5pdGVtcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRGVidWcgY291bnRlcnMgKHdpbGwgYmUgc2hvd24gaW4gZGVidWcgcGFuZWwgaWYgbmVlZGVkKVxuICAgICAgICAgICAgLy8gbGV0IHN1Y2Nlc3NmdWxBc3NvY2lhdGlvbnMgPSAwO1xuICAgICAgICAgICAgLy8gbGV0IHRvdGFsU2hpZnRzID0gMDtcblxuICAgICAgICAgICAgY29uc3Qgc2hpZnRzID0gc2hpZnRzU291cmNlLml0ZW1zXG4gICAgICAgICAgICAgICAgLm1hcCgoaXRlbTogT2JqZWN0SXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gc3RhcnRUaW1lQXR0cmlidXRlPy5nZXQoaXRlbSkudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXlUeXBlID0gZGF5VHlwZUF0dHJpYnV0ZT8uZ2V0KGl0ZW0pLnZhbHVlIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXMgPSBzdGF0dXNBdHRyaWJ1dGU/LmdldChpdGVtKS52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJ5IHRvIGdldCB0aGUgYWN0dWFsIHNoaWZ0IGRhdGUgZnJvbSBDYWxlbmRhckV2ZW50c19TaGlmdC9TaGlmdC9EYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2hpZnREYXRlOiBEYXRlIHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNoaWZ0QXNzb2NpYXRpb24gJiYgc2hpZnREYXRlQXR0cmlidXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hpZnRSZWYgPSBzaGlmdEFzc29jaWF0aW9uLmdldChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hpZnRSZWYuc3RhdHVzID09PSBcImF2YWlsYWJsZVwiICYmIHNoaWZ0UmVmLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoaWZ0RGF0ZVZhbHVlID0gc2hpZnREYXRlQXR0cmlidXRlLmdldChzaGlmdFJlZi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaGlmdERhdGVWYWx1ZS5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCIgJiYgc2hpZnREYXRlVmFsdWUudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0RGF0ZSA9IHNoaWZ0RGF0ZVZhbHVlLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEZWJ1ZzogQXNzb2NpYXRpb24gYWNjZXNzICh3aWxsIGJlIHNob3duIGluIG1haW4gZGVidWcgcGFuZWwpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRyeSB0byBnZXQgZW5naW5lZXIgSUQgdGhyb3VnaCB0aGUgU1BVc2VyIGFzc29jaWF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW5naW5lZXJJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVc2UgdGhlIHNwVXNlckFzc29jaWF0aW9uIHRvIGdldCB0aGUgcmVmZXJlbmNlZCBTUFVzZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcFVzZXJBc3NvY2lhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwVXNlclJlZiA9IHNwVXNlckFzc29jaWF0aW9uLmdldChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BVc2VyUmVmLnN0YXR1cyA9PT0gXCJhdmFpbGFibGVcIiAmJiBzcFVzZXJSZWYudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBTUFVzZXIgSUQgZnJvbSB0aGUgYXNzb2NpYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lZXJJZCA9IHNwVXNlclJlZi52YWx1ZS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3VjY2Vzc2Z1bEFzc29jaWF0aW9ucysrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERlYnVnOiBBc3NvY2lhdGlvbiBzdWNjZXNzZnVsICh3aWxsIGJlIHNob3duIGluIG1haW4gZGVidWcgcGFuZWwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGYWxsYmFjayB0byBzaGlmdCBJRCBpZiBubyBhc3NvY2lhdGlvbiBmb3VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlbmdpbmVlcklkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lZXJJZCA9IGl0ZW0uaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvdGFsU2hpZnRzKys7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVzZSBzaGlmdERhdGUgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2UgZmFsbCBiYWNrIHRvIHN0YXJ0VGltZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgbmVpdGhlciBpcyBhdmFpbGFibGUsIHNraXAgdGhpcyBzaGlmdCAoZG9uJ3Qgc2hvdyB1bmRlZmluZWQgZXZlbnRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmluYWxEYXRlID0gc2hpZnREYXRlIHx8IHN0YXJ0VGltZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmluYWxEYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2tpcCBzaGlmdHMgd2l0aG91dCBwcm9wZXIgZGF0ZXMgLSBkb24ndCBzaG93IHRoZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaXRlbS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlOiBmaW5hbERhdGUudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lZXJJZDogZW5naW5lZXJJZCB8fCBpdGVtLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0OiAoZGF5VHlwZSBhcyBTaGlmdFR5cGUpIHx8IFwiTVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlmdERhdGU6IGZpbmFsRGF0ZSwgLy8gVGhlIGFjdHVhbCBzaGlmdCBkYXRlIGZyb20gQ2FsZW5kYXJFdmVudHNfU2hpZnQvU2hpZnQvRGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbmRpeE9iamVjdDogaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBhcyBTaGlmdEFzc2lnbm1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIGludmFsaWQgc2hpZnRzIC0gZG9uJ3Qgc2hvdyB0aGVtIHdpdGggZmFrZSBkYXRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKHNoaWZ0KTogc2hpZnQgaXMgU2hpZnRBc3NpZ25tZW50ID0+IHNoaWZ0ICE9PSBudWxsKTtcblxuICAgICAgICAgICAgLy8gRGVidWc6IEFzc29jaWF0aW9uIHN1Y2Nlc3MgcmF0ZSAod2lsbCBiZSBzaG93biBpbiBtYWluIGRlYnVnIHBhbmVsKVxuXG4gICAgICAgICAgICByZXR1cm4gc2hpZnRzO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgfSwgW1xuICAgICAgICBzaGlmdHNTb3VyY2UsXG4gICAgICAgIHN0YXJ0VGltZUF0dHJpYnV0ZSxcbiAgICAgICAgZGF5VHlwZUF0dHJpYnV0ZSxcbiAgICAgICAgc3RhdHVzQXR0cmlidXRlLFxuICAgICAgICBzcFVzZXJBc3NvY2lhdGlvbixcbiAgICAgICAgc2hpZnRBc3NvY2lhdGlvbixcbiAgICAgICAgc2hpZnREYXRlQXR0cmlidXRlXG4gICAgXSk7XG5cbiAgICAvLyBNYWluIGRhdGEgcHJvY2Vzc2luZyBlZmZlY3Qgd2l0aCB2YWxpZGF0aW9uXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbkVycm9yID0gdmFsaWRhdGVDb25maWd1cmF0aW9uKCk7XG5cbiAgICAgICAgaWYgKHZhbGlkYXRpb25FcnJvcikge1xuICAgICAgICAgICAgc2V0RGF0YVN0YXRlKHtcbiAgICAgICAgICAgICAgICBlbmdpbmVlcnM6IFtdLFxuICAgICAgICAgICAgICAgIHNoaWZ0czogW10sXG4gICAgICAgICAgICAgICAgc2hpZnRzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3I6IHZhbGlkYXRpb25FcnJvclxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaGlmdHNMb2FkaW5nID0gc2hpZnRzU291cmNlPy5zdGF0dXMgPT09IFwibG9hZGluZ1wiIHx8IGZhbHNlO1xuXG4gICAgICAgIHNldERhdGFTdGF0ZSh7XG4gICAgICAgICAgICBlbmdpbmVlcnM6IHRyYW5zZm9ybWVkRW5naW5lZXJzLFxuICAgICAgICAgICAgc2hpZnRzOiB0cmFuc2Zvcm1lZFNoaWZ0cyxcbiAgICAgICAgICAgIHNoaWZ0c0xvYWRpbmcsXG4gICAgICAgICAgICBlcnJvcjogbnVsbFxuICAgICAgICB9KTtcbiAgICB9LCBbdmFsaWRhdGVDb25maWd1cmF0aW9uLCB0cmFuc2Zvcm1lZEVuZ2luZWVycywgdHJhbnNmb3JtZWRTaGlmdHMsIGVuZ2luZWVyc1NvdXJjZS5zdGF0dXMsIHNoaWZ0c1NvdXJjZT8uc3RhdHVzXSk7XG5cbiAgICAvLyBFbmhhbmNlZCBoZWxwZXIgbWV0aG9kcyB3aXRoIGVycm9yIGhhbmRsaW5nXG4gICAgY29uc3QgZ2V0U2hpZnRzRm9yRW5naW5lZXIgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKGVuZ2luZWVySWQ6IHN0cmluZyk6IFNoaWZ0QXNzaWdubWVudFtdID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFTdGF0ZS5zaGlmdHMuZmlsdGVyKHNoaWZ0ID0+IHNoaWZ0LmVuZ2luZWVySWQgPT09IGVuZ2luZWVySWQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtkYXRhU3RhdGUuc2hpZnRzXVxuICAgICk7XG5cbiAgICBjb25zdCBnZXRFbmdpbmVlcnNCeVRlYW0gPSB1c2VDYWxsYmFjaygoKTogeyBbaGVhZGVyOiBzdHJpbmddOiBFbmdpbmVlcltdIH0gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyR3JvdXBzOiB7IFtoZWFkZXI6IHN0cmluZ106IEVuZ2luZWVyW10gfSA9IHt9O1xuICAgICAgICAgICAgZGF0YVN0YXRlLmVuZ2luZWVycy5mb3JFYWNoKGVuZ2luZWVyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJOYW1lID0gZW5naW5lZXIuaGVhZGVyO1xuICAgICAgICAgICAgICAgIGlmICghaGVhZGVyR3JvdXBzW2hlYWRlck5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckdyb3Vwc1toZWFkZXJOYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBoZWFkZXJHcm91cHNbaGVhZGVyTmFtZV0ucHVzaChlbmdpbmVlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBoZWFkZXJHcm91cHM7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cbiAgICB9LCBbZGF0YVN0YXRlLmVuZ2luZWVyc10pO1xuXG4gICAgY29uc3QgZ2V0U2hpZnRGb3JEYXRlID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChlbmdpbmVlcklkOiBzdHJpbmcsIGRhdGU6IHN0cmluZyk6IFNoaWZ0QXNzaWdubWVudCB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhU3RhdGUuc2hpZnRzLmZpbmQoc2hpZnQgPT4gc2hpZnQuZW5naW5lZXJJZCA9PT0gZW5naW5lZXJJZCAmJiBzaGlmdC5kYXRlID09PSBkYXRlKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW2RhdGFTdGF0ZS5zaGlmdHNdXG4gICAgKTtcblxuICAgIGNvbnN0IHVwZGF0ZVNoaWZ0ID0gdXNlQ2FsbGJhY2soKHNoaWZ0SWQ6IHN0cmluZywgdXBkYXRlczogUGFydGlhbDxTaGlmdEFzc2lnbm1lbnQ+KSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZXREYXRhU3RhdGUocHJldiA9PiAoe1xuICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgc2hpZnRzOiBwcmV2LnNoaWZ0cy5tYXAoc2hpZnQgPT4gKHNoaWZ0LmlkID09PSBzaGlmdElkID8geyAuLi5zaGlmdCwgLi4udXBkYXRlcyB9IDogc2hpZnQpKVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gU2lsZW50bHkgZmFpbFxuICAgICAgICB9XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3QgZ2V0RW5naW5lZXJCeUlkID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChlbmdpbmVlcklkOiBzdHJpbmcpOiBFbmdpbmVlciB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhU3RhdGUuZW5naW5lZXJzLmZpbmQoZW5naW5lZXIgPT4gZW5naW5lZXIuaWQgPT09IGVuZ2luZWVySWQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbZGF0YVN0YXRlLmVuZ2luZWVyc11cbiAgICApO1xuXG4gICAgY29uc3QgZ2V0U2hpZnRzQnlEYXRlUmFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKHN0YXJ0RGF0ZTogc3RyaW5nLCBlbmREYXRlOiBzdHJpbmcpOiBTaGlmdEFzc2lnbm1lbnRbXSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhU3RhdGUuc2hpZnRzLmZpbHRlcihzaGlmdCA9PiBzaGlmdC5kYXRlID49IHN0YXJ0RGF0ZSAmJiBzaGlmdC5kYXRlIDw9IGVuZERhdGUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtkYXRhU3RhdGUuc2hpZnRzXVxuICAgICk7XG5cbiAgICBjb25zdCByZWZyZXNoRGF0YSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIEZvcmNlIHJlLWV2YWx1YXRpb24gb2YgZGF0YSBzb3VyY2VzXG4gICAgICAgICAgICBzZXREYXRhU3RhdGUocHJldiA9PiAoeyAuLi5wcmV2LCBsb2FkaW5nOiB0cnVlLCBlcnJvcjogbnVsbCB9KSk7XG4gICAgICAgICAgICAvLyBJbiBhIHJlYWwgaW1wbGVtZW50YXRpb24sIHRoaXMgd291bGQgdHJpZ2dlciBkYXRhIHJlZnJlc2hcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25FcnJvciA9IHZhbGlkYXRlQ29uZmlndXJhdGlvbigpO1xuICAgICAgICAgICAgICAgIHNldERhdGFTdGF0ZShwcmV2ID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBlbmdpbmVlcnNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgc2hpZnRzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiB2YWxpZGF0aW9uRXJyb3JcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgc2V0RGF0YVN0YXRlKHByZXYgPT4gKHtcbiAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVycm9yOiB7IG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHJlZnJlc2ggZGF0YVwiIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgIH0sIFt2YWxpZGF0ZUNvbmZpZ3VyYXRpb25dKTtcblxuICAgIC8vIENhbGN1bGF0ZSBsb2FkaW5nIHN0YXRlIHdoZW4gbmVlZGVkXG4gICAgY29uc3QgZW5naW5lZXJzTG9hZGluZyA9IGVuZ2luZWVyc1NvdXJjZS5zdGF0dXMgPT09IFwibG9hZGluZ1wiO1xuICAgIGNvbnN0IGxvYWRpbmcgPSBlbmdpbmVlcnNMb2FkaW5nIHx8IGRhdGFTdGF0ZS5zaGlmdHNMb2FkaW5nO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZW5naW5lZXJzOiBkYXRhU3RhdGUuZW5naW5lZXJzLFxuICAgICAgICBzaGlmdHM6IGRhdGFTdGF0ZS5zaGlmdHMsXG4gICAgICAgIGxvYWRpbmcsXG4gICAgICAgIHNoaWZ0c0xvYWRpbmc6IGRhdGFTdGF0ZS5zaGlmdHNMb2FkaW5nLFxuICAgICAgICBlcnJvcjogZGF0YVN0YXRlLmVycm9yLFxuICAgICAgICBnZXRTaGlmdHNGb3JFbmdpbmVlcixcbiAgICAgICAgZ2V0RW5naW5lZXJzQnlUZWFtLFxuICAgICAgICBnZXRTaGlmdEZvckRhdGUsXG4gICAgICAgIHVwZGF0ZVNoaWZ0LFxuICAgICAgICBnZXRFbmdpbmVlckJ5SWQsXG4gICAgICAgIGdldFNoaWZ0c0J5RGF0ZVJhbmdlLFxuICAgICAgICByZWZyZXNoRGF0YSxcbiAgICAgICAgZGVidWdJbmZvOiB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzQ29uZmlndXJlZDoge1xuICAgICAgICAgICAgICAgIG5hbWU6ICEhbmFtZUF0dHJpYnV0ZSxcbiAgICAgICAgICAgICAgICBoZWFkZXI6ICEhaGVhZGVyQXR0cmlidXRlLFxuICAgICAgICAgICAgICAgIHN1YmhlYWRlcjogISFzdWJoZWFkZXJBdHRyaWJ1dGUsXG4gICAgICAgICAgICAgICAgc3BVc2VyQXNzb2NpYXRpb246ICEhc3BVc2VyQXNzb2NpYXRpb24sXG4gICAgICAgICAgICAgICAgc2hpZnRBc3NvY2lhdGlvbjogISFzaGlmdEFzc29jaWF0aW9uLFxuICAgICAgICAgICAgICAgIHNoaWZ0RGF0ZTogISFzaGlmdERhdGVBdHRyaWJ1dGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59O1xuIiwiaW1wb3J0IHsgUmVhY3RFbGVtZW50LCBjcmVhdGVFbGVtZW50LCB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgU2hpZnRTY2hlZHVsZXJDb250YWluZXJQcm9wcyB9IGZyb20gXCIuLi90eXBpbmdzL1NoaWZ0U2NoZWR1bGVyUHJvcHNcIjtcbmltcG9ydCBTY2hlZHVsZUdyaWQgZnJvbSBcIi4vY29tcG9uZW50cy9TY2hlZHVsZUdyaWRcIjtcbmltcG9ydCB7IHVzZVNoaWZ0RGF0YSB9IGZyb20gXCIuL2hvb2tzL3VzZVNoaWZ0RGF0YVwiO1xuaW1wb3J0IFwiLi91aS9TaGlmdFNjaGVkdWxlci5jc3NcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIFNoaWZ0U2NoZWR1bGVyKHtcbiAgICBuYW1lLFxuICAgIGNsYXNzOiBjbGFzc05hbWUsXG4gICAgc3R5bGUsXG4gICAgdGFiSW5kZXgsXG4gICAgZW5naW5lZXJzLFxuICAgIHNoaWZ0cyxcbiAgICBuYW1lQXR0cmlidXRlLFxuICAgIGhlYWRlckF0dHJpYnV0ZSxcbiAgICBzdWJoZWFkZXJBdHRyaWJ1dGUsXG4gICAgc2hvd0RlYnVnSW5mbyxcbiAgICBzdGFydFRpbWVBdHRyaWJ1dGUsXG4gICAgZW5kVGltZUF0dHJpYnV0ZTogX2VuZFRpbWVBdHRyaWJ1dGUsXG4gICAgZGF5VHlwZUF0dHJpYnV0ZSxcbiAgICBldmVudFR5cGVBdHRyaWJ1dGU6IF9ldmVudFR5cGVBdHRyaWJ1dGUsXG4gICAgc3RhdHVzQXR0cmlidXRlLFxuICAgIHNwVXNlckFzc29jaWF0aW9uLFxuICAgIHNwVXNlckRhdGFzb3VyY2U6IF9zcFVzZXJEYXRhc291cmNlLFxuICAgIHNoaWZ0QXNzb2NpYXRpb24sXG4gICAgc2hpZnREYXRhc291cmNlOiBfc2hpZnREYXRhc291cmNlLFxuICAgIHNoaWZ0RGF0ZUF0dHJpYnV0ZSxcbiAgICBjb250ZXh0U2hpZnRJZCxcbiAgICBjb250ZXh0RW5naW5lZXJJZCxcbiAgICBjb250ZXh0RGF0ZSxcbiAgICBjb250ZXh0U2VsZWN0ZWRDZWxscyxcbiAgICBvbkVkaXRTaGlmdCxcbiAgICBvbkNyZWF0ZVNoaWZ0LFxuICAgIG9uRGVsZXRlU2hpZnQsXG4gICAgb25CYXRjaENyZWF0ZSxcbiAgICBvbkJhdGNoRWRpdCxcbiAgICBvbkJhdGNoRGVsZXRlXG59OiBTaGlmdFNjaGVkdWxlckNvbnRhaW5lclByb3BzKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCB7XG4gICAgICAgIGVuZ2luZWVyczogZW5naW5lZXJEYXRhLFxuICAgICAgICBzaGlmdHM6IHNoaWZ0c0RhdGEsXG4gICAgICAgIGxvYWRpbmcsXG4gICAgICAgIHNoaWZ0c0xvYWRpbmcsXG4gICAgICAgIGVycm9yLFxuICAgICAgICBnZXRTaGlmdHNGb3JFbmdpbmVlcixcbiAgICAgICAgZ2V0RW5naW5lZXJzQnlUZWFtLFxuICAgICAgICBkZWJ1Z0luZm9cbiAgICB9ID0gdXNlU2hpZnREYXRhKHtcbiAgICAgICAgZW5naW5lZXJzU291cmNlOiBlbmdpbmVlcnMsXG4gICAgICAgIHNoaWZ0c1NvdXJjZTogc2hpZnRzLFxuICAgICAgICBuYW1lQXR0cmlidXRlLFxuICAgICAgICBoZWFkZXJBdHRyaWJ1dGUsXG4gICAgICAgIHN1YmhlYWRlckF0dHJpYnV0ZSxcbiAgICAgICAgc3RhcnRUaW1lQXR0cmlidXRlLFxuICAgICAgICBkYXlUeXBlQXR0cmlidXRlLFxuICAgICAgICBzdGF0dXNBdHRyaWJ1dGUsXG4gICAgICAgIHNwVXNlckFzc29jaWF0aW9uLFxuICAgICAgICBzaGlmdEFzc29jaWF0aW9uLFxuICAgICAgICBzaGlmdERhdGVBdHRyaWJ1dGVcbiAgICB9KTtcblxuICAgIC8vIEFsbCBhY3Rpb24gaGFuZGxpbmcgbW92ZWQgdG8gU2NoZWR1bGVHcmlkIC0gbm8gd3JhcHBlciBoYW5kbGVycyBuZWVkZWRcblxuICAgIGNvbnN0IGhhbmRsZUJhdGNoRWRpdCA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoc2VsZWN0ZWRDZWxsczogQXJyYXk8eyBlbmdpbmVlcklkOiBzdHJpbmc7IGRhdGU6IHN0cmluZyB9PikgPT4ge1xuICAgICAgICAgICAgaWYgKG9uQmF0Y2hFZGl0ICYmIG9uQmF0Y2hFZGl0LmNhbkV4ZWN1dGUgJiYgIW9uQmF0Y2hFZGl0LmlzRXhlY3V0aW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IGV2ZW50IElEcyBmb3IgY2VsbHMgdGhhdCBoYXZlIHNoaWZ0c1xuICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50SWRzID0gc2VsZWN0ZWRDZWxsc1xuICAgICAgICAgICAgICAgICAgICAubWFwKGNlbGwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hpZnQgPSBzaGlmdHNEYXRhLmZpbmQocyA9PiBzLmVuZ2luZWVySWQgPT09IGNlbGwuZW5naW5lZXJJZCAmJiBzLmRhdGUgPT09IGNlbGwuZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2hpZnQ/LmlkO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKFwiLFwiKTtcblxuICAgICAgICAgICAgICAgIGlmIChldmVudElkcykge1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgY29udGV4dCBhdHRyaWJ1dGVzIGJlZm9yZSBjYWxsaW5nIG1pY3JvZmxvd1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dFNlbGVjdGVkQ2VsbHM/LnNldFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0U2VsZWN0ZWRDZWxscy5zZXRWYWx1ZShldmVudElkcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb25CYXRjaEVkaXQuZXhlY3V0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW29uQmF0Y2hFZGl0LCBzaGlmdHNEYXRhLCBjb250ZXh0U2VsZWN0ZWRDZWxsc11cbiAgICApO1xuXG4gICAgY29uc3QgaGFuZGxlQmF0Y2hEZWxldGUgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKHNlbGVjdGVkQ2VsbHM6IEFycmF5PHsgZW5naW5lZXJJZDogc3RyaW5nOyBkYXRlOiBzdHJpbmcgfT4pID0+IHtcbiAgICAgICAgICAgIGlmIChvbkJhdGNoRGVsZXRlICYmIG9uQmF0Y2hEZWxldGUuY2FuRXhlY3V0ZSAmJiAhb25CYXRjaERlbGV0ZS5pc0V4ZWN1dGluZykge1xuICAgICAgICAgICAgICAgIC8vIEdldCBldmVudCBJRHMgZm9yIGNlbGxzIHRoYXQgaGF2ZSBzaGlmdHNcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudElkcyA9IHNlbGVjdGVkQ2VsbHNcbiAgICAgICAgICAgICAgICAgICAgLm1hcChjZWxsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoaWZ0ID0gc2hpZnRzRGF0YS5maW5kKHMgPT4gcy5lbmdpbmVlcklkID09PSBjZWxsLmVuZ2luZWVySWQgJiYgcy5kYXRlID09PSBjZWxsLmRhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNoaWZ0Py5pZDtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAgICAgICAgICAgICAuam9pbihcIixcIik7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRJZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGNvbnRleHQgYXR0cmlidXRlcyBiZWZvcmUgY2FsbGluZyBtaWNyb2Zsb3dcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHRTZWxlY3RlZENlbGxzPy5zZXRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dFNlbGVjdGVkQ2VsbHMuc2V0VmFsdWUoZXZlbnRJZHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9uQmF0Y2hEZWxldGUuZXhlY3V0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW29uQmF0Y2hEZWxldGUsIHNoaWZ0c0RhdGEsIGNvbnRleHRTZWxlY3RlZENlbGxzXVxuICAgICk7XG5cbiAgICBjb25zdCBoYW5kbGVCYXRjaENyZWF0ZSA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoc2VsZWN0ZWRDZWxsczogQXJyYXk8eyBlbmdpbmVlcklkOiBzdHJpbmc7IGRhdGU6IHN0cmluZyB9PikgPT4ge1xuICAgICAgICAgICAgaWYgKG9uQmF0Y2hDcmVhdGUgJiYgb25CYXRjaENyZWF0ZS5jYW5FeGVjdXRlICYmICFvbkJhdGNoQ3JlYXRlLmlzRXhlY3V0aW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IGVtcHR5IGNlbGxzIChjZWxscyB3aXRob3V0IHNoaWZ0cylcbiAgICAgICAgICAgICAgICBjb25zdCBlbXB0eUNlbGxzID0gc2VsZWN0ZWRDZWxscy5maWx0ZXIoY2VsbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoaWZ0ID0gc2hpZnRzRGF0YS5maW5kKHMgPT4gcy5lbmdpbmVlcklkID09PSBjZWxsLmVuZ2luZWVySWQgJiYgcy5kYXRlID09PSBjZWxsLmRhdGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXNoaWZ0O1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVtcHR5Q2VsbHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgY29udGV4dCBhdHRyaWJ1dGVzIGJlZm9yZSBjYWxsaW5nIG1pY3JvZmxvd1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dFNlbGVjdGVkQ2VsbHM/LnNldFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0U2VsZWN0ZWRDZWxscy5zZXRWYWx1ZShKU09OLnN0cmluZ2lmeShlbXB0eUNlbGxzKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb25CYXRjaENyZWF0ZS5leGVjdXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbb25CYXRjaENyZWF0ZSwgc2hpZnRzRGF0YSwgY29udGV4dFNlbGVjdGVkQ2VsbHNdXG4gICAgKTtcblxuICAgIC8vIEVycm9yIHN0YXRlXG4gICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHNoaWZ0LXNjaGVkdWxlciAke2NsYXNzTmFtZX1gfSBzdHlsZT17c3R5bGV9IHRhYkluZGV4PXt0YWJJbmRleH0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaGlmdC1zY2hlZHVsZXItZXJyb3JcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPuKaoO+4jyBDb25maWd1cmF0aW9uIEVycm9yPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPHA+e2Vycm9yLm1lc3NhZ2V9PC9wPlxuICAgICAgICAgICAgICAgICAgICB7ZXJyb3IucHJvcGVydHkgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsPkNoZWNrIHRoZSB7ZXJyb3IucHJvcGVydHl9IHByb3BlcnR5IGluIHRoZSB3aWRnZXQgY29uZmlndXJhdGlvbi48L3NtYWxsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gTG9hZGluZyBzdGF0ZSAtIG9ubHkgc2hvdyBpZiBlbmdpbmVlcnMgaGF2ZW4ndCBsb2FkZWQgeWV0XG4gICAgaWYgKGxvYWRpbmcgJiYgKCFlbmdpbmVlckRhdGEgfHwgZW5naW5lZXJEYXRhLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgc2hpZnQtc2NoZWR1bGVyICR7Y2xhc3NOYW1lfWB9IHN0eWxlPXtzdHlsZX0gdGFiSW5kZXg9e3RhYkluZGV4fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNoaWZ0LXNjaGVkdWxlci1sb2FkaW5nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9hZGluZy1zcGlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxwPkxvYWRpbmcgZW5naW5lZXJzLi4uPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gRW1wdHkgc3RhdGVcbiAgICBpZiAoIWVuZ2luZWVyRGF0YSB8fCBlbmdpbmVlckRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHNoaWZ0LXNjaGVkdWxlciAke2NsYXNzTmFtZX1gfSBzdHlsZT17c3R5bGV9IHRhYkluZGV4PXt0YWJJbmRleH0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaGlmdC1zY2hlZHVsZXItZW1wdHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPvCfk4UgTm8gRGF0YSBBdmFpbGFibGU8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8cD5ObyBlbmdpbmVlcnMgZm91bmQuIFBsZWFzZSBjaGVjayB5b3VyIGRhdGEgc291cmNlIGNvbmZpZ3VyYXRpb24uPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BzaGlmdC1zY2hlZHVsZXIgJHtjbGFzc05hbWV9YH0gc3R5bGU9e3N0eWxlfSB0YWJJbmRleD17dGFiSW5kZXh9IGRhdGEtd2lkZ2V0LW5hbWU9e25hbWV9PlxuICAgICAgICAgICAgPFNjaGVkdWxlR3JpZFxuICAgICAgICAgICAgICAgIGVuZ2luZWVycz17ZW5naW5lZXJEYXRhfVxuICAgICAgICAgICAgICAgIHNoaWZ0cz17c2hpZnRzRGF0YX1cbiAgICAgICAgICAgICAgICBnZXRTaGlmdHNGb3JFbmdpbmVlcj17Z2V0U2hpZnRzRm9yRW5naW5lZXJ9XG4gICAgICAgICAgICAgICAgZ2V0RW5naW5lZXJzQnlUZWFtPXtnZXRFbmdpbmVlcnNCeVRlYW19XG4gICAgICAgICAgICAgICAgb25FZGl0U2hpZnQ9e29uRWRpdFNoaWZ0fVxuICAgICAgICAgICAgICAgIG9uQ3JlYXRlU2hpZnQ9e29uQ3JlYXRlU2hpZnR9XG4gICAgICAgICAgICAgICAgb25EZWxldGVTaGlmdD17b25EZWxldGVTaGlmdH1cbiAgICAgICAgICAgICAgICBjb250ZXh0U2hpZnRJZD17Y29udGV4dFNoaWZ0SWR9XG4gICAgICAgICAgICAgICAgY29udGV4dEVuZ2luZWVySWQ9e2NvbnRleHRFbmdpbmVlcklkfVxuICAgICAgICAgICAgICAgIGNvbnRleHREYXRlPXtjb250ZXh0RGF0ZX1cbiAgICAgICAgICAgICAgICBjb250ZXh0U2VsZWN0ZWRDZWxscz17Y29udGV4dFNlbGVjdGVkQ2VsbHN9XG4gICAgICAgICAgICAgICAgb25CYXRjaENyZWF0ZT17aGFuZGxlQmF0Y2hDcmVhdGV9XG4gICAgICAgICAgICAgICAgb25CYXRjaEVkaXQ9e2hhbmRsZUJhdGNoRWRpdH1cbiAgICAgICAgICAgICAgICBvbkJhdGNoRGVsZXRlPXtoYW5kbGVCYXRjaERlbGV0ZX1cbiAgICAgICAgICAgICAgICBzaG93RGVidWdJbmZvPXtzaG93RGVidWdJbmZvfVxuICAgICAgICAgICAgICAgIGRlYnVnSW5mbz17ZGVidWdJbmZvfVxuICAgICAgICAgICAgICAgIHNoaWZ0c0xvYWRpbmc9e3NoaWZ0c0xvYWRpbmd9XG4gICAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuIl0sIm5hbWVzIjpbInQiLCJlIiwibW9kdWxlIiwidGhpcyIsIm4iLCJyIiwiaSIsInMiLCJ1IiwiYSIsIm8iLCJjIiwiZiIsImgiLCJkIiwibCIsIiQiLCJ5IiwiTSIsIm5hbWUiLCJ3ZWVrZGF5cyIsInNwbGl0IiwibW9udGhzIiwib3JkaW5hbCIsIm0iLCJTdHJpbmciLCJsZW5ndGgiLCJBcnJheSIsImpvaW4iLCJ2IiwieiIsInV0Y09mZnNldCIsIk1hdGgiLCJhYnMiLCJmbG9vciIsImRhdGUiLCJ5ZWFyIiwibW9udGgiLCJjbG9uZSIsImFkZCIsImNlaWwiLCJwIiwidyIsIkQiLCJtcyIsIlEiLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJnIiwiUyIsIl8iLCJPIiwiYXJncyIsImFyZ3VtZW50cyIsImIiLCJsb2NhbGUiLCIkTCIsInV0YyIsIiR1IiwieCIsIiR4IiwiJG9mZnNldCIsInBhcnNlIiwicHJvdG90eXBlIiwiJGQiLCJEYXRlIiwiTmFOIiwidGVzdCIsIm1hdGNoIiwic3Vic3RyaW5nIiwiVVRDIiwiaW5pdCIsIiR5IiwiZ2V0RnVsbFllYXIiLCIkTSIsImdldE1vbnRoIiwiJEQiLCJnZXREYXRlIiwiJFciLCJnZXREYXkiLCIkSCIsImdldEhvdXJzIiwiJG0iLCJnZXRNaW51dGVzIiwiJHMiLCJnZXRTZWNvbmRzIiwiJG1zIiwiZ2V0TWlsbGlzZWNvbmRzIiwiJHV0aWxzIiwiaXNWYWxpZCIsInRvU3RyaW5nIiwiaXNTYW1lIiwic3RhcnRPZiIsImVuZE9mIiwiaXNBZnRlciIsImlzQmVmb3JlIiwiJGciLCJzZXQiLCJ1bml4IiwidmFsdWVPZiIsImdldFRpbWUiLCJ0b0RhdGUiLCJhcHBseSIsInNsaWNlIiwiJGxvY2FsZSIsIndlZWtTdGFydCIsIiRzZXQiLCJtaW4iLCJkYXlzSW5Nb250aCIsImdldCIsIk51bWJlciIsInJvdW5kIiwic3VidHJhY3QiLCJmb3JtYXQiLCJpbnZhbGlkRGF0ZSIsIm1lcmlkaWVtIiwibW9udGhzU2hvcnQiLCJ3ZWVrZGF5c01pbiIsIndlZWtkYXlzU2hvcnQiLCJnZXRUaW1lem9uZU9mZnNldCIsImRpZmYiLCJ0b0pTT04iLCJ0b0lTT1N0cmluZyIsInRvVVRDU3RyaW5nIiwiayIsImZvckVhY2giLCJleHRlbmQiLCIkaSIsImlzRGF5anMiLCJlbiIsIkxzIiwibG9jYWwiLCJjYWxsIiwiZ2V0VVRDRnVsbFllYXIiLCJnZXRVVENNb250aCIsImdldFVUQ0RhdGUiLCJnZXRVVENEYXkiLCJnZXRVVENIb3VycyIsImdldFVUQ01pbnV0ZXMiLCJnZXRVVENTZWNvbmRzIiwiZ2V0VVRDTWlsbGlzZWNvbmRzIiwiJGxvY2FsT2Zmc2V0IiwiaXNVVEMiLCJkYXkiLCJob3VyIiwibWludXRlIiwic2Vjb25kIiwidGltZVpvbmVOYW1lIiwiSW50bCIsIkRhdGVUaW1lRm9ybWF0IiwiaG91cjEyIiwidGltZVpvbmUiLCJmb3JtYXRUb1BhcnRzIiwidHlwZSIsInZhbHVlIiwicGFyc2VJbnQiLCJ0eiIsInRvTG9jYWxlU3RyaW5nIiwiJHRpbWV6b25lIiwib2Zmc2V0TmFtZSIsImd1ZXNzIiwiZmluZCIsIm1heCIsInJlc29sdmVkT3B0aW9ucyIsInNldERlZmF1bHQiLCJpc1NhbWVPckJlZm9yZSIsImlzU2FtZU9yQWZ0ZXIiLCJSZWFjdCIsIlNjaGVkdWxlR3JpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxFQUFBLENBQUMsVUFBU0EsQ0FBQyxFQUFDQyxDQUFDLEVBQUM7SUFBc0RDLE1BQUFBLENBQUFBLE9BQUFBLEdBQWVELENBQUMsRUFBRSxDQUFnSCxDQUFBO0dBQUMsQ0FBQ0UsU0FBSSxFQUFFLFlBQVU7O0lBQWMs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
