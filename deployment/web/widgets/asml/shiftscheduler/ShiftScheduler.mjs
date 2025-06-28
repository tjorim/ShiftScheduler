import * as React2 from 'react';
import React2__default, { useRef, useCallback, useEffect, useMemo, createElement, useState } from 'react';

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
 * Custom hook for managing team-based access control and role-based filtering
 * Handles permissions for engineers vs team leaders vs managers
 */
const useTeamAccess = (engineers, shifts, config) => {
    // Determine user permissions based on role
    const userPermissions = useMemo(() => {
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
    const filteredEngineers = useMemo(() => {
        if (userPermissions.crossTeamAccess || !config.userTeam) {
            return engineers;
        }
        // Filter to user's team only
        return engineers.filter(engineer => engineer.header === config.userTeam);
    }, [engineers, userPermissions.crossTeamAccess, config.userTeam]);
    // Filter shifts based on accessible engineers
    const filteredShifts = useMemo(() => {
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
        return (createElement(EmptyState, { message: "No Engineers Available", description: userPermissions.crossTeamAccess
                ? "No engineers found. Please check your data configuration."
                : "No engineers found in your accessible teams. Contact your administrator if this seems incorrect.", className: className }));
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
    const handleEditShift = useCallback((_shift) => {
        if (onEditShift && onEditShift.canExecute && !onEditShift.isExecuting) {
            onEditShift.execute();
        }
    }, [onEditShift]);
    // Context menu action handlers
    const handleCreateShift = useCallback((_engineerId, _date) => {
        if (onCreateShift && onCreateShift.canExecute && !onCreateShift.isExecuting) {
            onCreateShift.execute();
        }
    }, [onCreateShift]);
    const handleDeleteShift = useCallback((_shift) => {
        if (onDeleteShift && onDeleteShift.canExecute && !onDeleteShift.isExecuting) {
            onDeleteShift.execute();
        }
    }, [onDeleteShift]);
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
                onBatchEdit.execute();
            }
        }
    }, [onBatchEdit, shiftsData]);
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
                onBatchDelete.execute();
            }
        }
    }, [onBatchDelete, shiftsData]);
    const handleBatchCreate = useCallback((selectedCells) => {
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
        createElement(ScheduleGrid$1, { engineers: engineerData, shifts: shiftsData, getShiftsForEngineer: getShiftsForEngineer, getEngineersByTeam: getEngineersByTeam, onEditShift: handleEditShift, onCreateShift: handleCreateShift, onDeleteShift: handleDeleteShift, onBatchCreate: handleBatchCreate, onBatchEdit: handleBatchEdit, onBatchDelete: handleBatchDelete, showDebugInfo: showDebugInfo, debugInfo: debugInfo, shiftsLoading: shiftsLoading })));
}

export { ShiftScheduler };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hpZnRTY2hlZHVsZXIubWpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZGF5anMvZGF5anMubWluLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2RheWpzL3BsdWdpbi91dGMuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZGF5anMvcGx1Z2luL3RpbWV6b25lLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2RheWpzL3BsdWdpbi9pc1NhbWVPckJlZm9yZS5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9kYXlqcy9wbHVnaW4vaXNTYW1lT3JBZnRlci5qcyIsIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9kYXRlSGVscGVycy50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9ob29rcy91c2VTY3JvbGxOYXZpZ2F0aW9uLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2hvb2tzL3VzZVRlYW1BY2Nlc3MudHMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Mb2FkaW5nU3RhdGVzLnRzeCIsIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9zaGlmdEhlbHBlcnMudHMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9EYXlDZWxsLnRzeCIsIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0NvbnRleHRNZW51LnRzeCIsIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1NjaGVkdWxlR3JpZC50c3giLCIuLi8uLi8uLi8uLi8uLi9zcmMvaG9va3MvdXNlU2hpZnREYXRhLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL1NoaWZ0U2NoZWR1bGVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIhZnVuY3Rpb24odCxlKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1lKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShlKToodD1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOnR8fHNlbGYpLmRheWpzPWUoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgdD0xZTMsZT02ZTQsbj0zNmU1LHI9XCJtaWxsaXNlY29uZFwiLGk9XCJzZWNvbmRcIixzPVwibWludXRlXCIsdT1cImhvdXJcIixhPVwiZGF5XCIsbz1cIndlZWtcIixjPVwibW9udGhcIixmPVwicXVhcnRlclwiLGg9XCJ5ZWFyXCIsZD1cImRhdGVcIixsPVwiSW52YWxpZCBEYXRlXCIsJD0vXihcXGR7NH0pWy0vXT8oXFxkezEsMn0pP1stL10/KFxcZHswLDJ9KVtUdFxcc10qKFxcZHsxLDJ9KT86PyhcXGR7MSwyfSk/Oj8oXFxkezEsMn0pP1suOl0/KFxcZCspPyQvLHk9L1xcWyhbXlxcXV0rKV18WXsxLDR9fE17MSw0fXxEezEsMn18ZHsxLDR9fEh7MSwyfXxoezEsMn18YXxBfG17MSwyfXxzezEsMn18WnsxLDJ9fFNTUy9nLE09e25hbWU6XCJlblwiLHdlZWtkYXlzOlwiU3VuZGF5X01vbmRheV9UdWVzZGF5X1dlZG5lc2RheV9UaHVyc2RheV9GcmlkYXlfU2F0dXJkYXlcIi5zcGxpdChcIl9cIiksbW9udGhzOlwiSmFudWFyeV9GZWJydWFyeV9NYXJjaF9BcHJpbF9NYXlfSnVuZV9KdWx5X0F1Z3VzdF9TZXB0ZW1iZXJfT2N0b2Jlcl9Ob3ZlbWJlcl9EZWNlbWJlclwiLnNwbGl0KFwiX1wiKSxvcmRpbmFsOmZ1bmN0aW9uKHQpe3ZhciBlPVtcInRoXCIsXCJzdFwiLFwibmRcIixcInJkXCJdLG49dCUxMDA7cmV0dXJuXCJbXCIrdCsoZVsobi0yMCklMTBdfHxlW25dfHxlWzBdKStcIl1cIn19LG09ZnVuY3Rpb24odCxlLG4pe3ZhciByPVN0cmluZyh0KTtyZXR1cm4hcnx8ci5sZW5ndGg+PWU/dDpcIlwiK0FycmF5KGUrMS1yLmxlbmd0aCkuam9pbihuKSt0fSx2PXtzOm0sejpmdW5jdGlvbih0KXt2YXIgZT0tdC51dGNPZmZzZXQoKSxuPU1hdGguYWJzKGUpLHI9TWF0aC5mbG9vcihuLzYwKSxpPW4lNjA7cmV0dXJuKGU8PTA/XCIrXCI6XCItXCIpK20ociwyLFwiMFwiKStcIjpcIittKGksMixcIjBcIil9LG06ZnVuY3Rpb24gdChlLG4pe2lmKGUuZGF0ZSgpPG4uZGF0ZSgpKXJldHVybi10KG4sZSk7dmFyIHI9MTIqKG4ueWVhcigpLWUueWVhcigpKSsobi5tb250aCgpLWUubW9udGgoKSksaT1lLmNsb25lKCkuYWRkKHIsYykscz1uLWk8MCx1PWUuY2xvbmUoKS5hZGQocisocz8tMToxKSxjKTtyZXR1cm4rKC0ocisobi1pKS8ocz9pLXU6dS1pKSl8fDApfSxhOmZ1bmN0aW9uKHQpe3JldHVybiB0PDA/TWF0aC5jZWlsKHQpfHwwOk1hdGguZmxvb3IodCl9LHA6ZnVuY3Rpb24odCl7cmV0dXJue006Yyx5OmgsdzpvLGQ6YSxEOmQsaDp1LG06cyxzOmksbXM6cixROmZ9W3RdfHxTdHJpbmcodHx8XCJcIikudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9zJC8sXCJcIil9LHU6ZnVuY3Rpb24odCl7cmV0dXJuIHZvaWQgMD09PXR9fSxnPVwiZW5cIixEPXt9O0RbZ109TTt2YXIgcD1cIiRpc0RheWpzT2JqZWN0XCIsUz1mdW5jdGlvbih0KXtyZXR1cm4gdCBpbnN0YW5jZW9mIF98fCEoIXR8fCF0W3BdKX0sdz1mdW5jdGlvbiB0KGUsbixyKXt2YXIgaTtpZighZSlyZXR1cm4gZztpZihcInN0cmluZ1wiPT10eXBlb2YgZSl7dmFyIHM9ZS50b0xvd2VyQ2FzZSgpO0Rbc10mJihpPXMpLG4mJihEW3NdPW4saT1zKTt2YXIgdT1lLnNwbGl0KFwiLVwiKTtpZighaSYmdS5sZW5ndGg+MSlyZXR1cm4gdCh1WzBdKX1lbHNle3ZhciBhPWUubmFtZTtEW2FdPWUsaT1hfXJldHVybiFyJiZpJiYoZz1pKSxpfHwhciYmZ30sTz1mdW5jdGlvbih0LGUpe2lmKFModCkpcmV0dXJuIHQuY2xvbmUoKTt2YXIgbj1cIm9iamVjdFwiPT10eXBlb2YgZT9lOnt9O3JldHVybiBuLmRhdGU9dCxuLmFyZ3M9YXJndW1lbnRzLG5ldyBfKG4pfSxiPXY7Yi5sPXcsYi5pPVMsYi53PWZ1bmN0aW9uKHQsZSl7cmV0dXJuIE8odCx7bG9jYWxlOmUuJEwsdXRjOmUuJHUseDplLiR4LCRvZmZzZXQ6ZS4kb2Zmc2V0fSl9O3ZhciBfPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gTSh0KXt0aGlzLiRMPXcodC5sb2NhbGUsbnVsbCwhMCksdGhpcy5wYXJzZSh0KSx0aGlzLiR4PXRoaXMuJHh8fHQueHx8e30sdGhpc1twXT0hMH12YXIgbT1NLnByb3RvdHlwZTtyZXR1cm4gbS5wYXJzZT1mdW5jdGlvbih0KXt0aGlzLiRkPWZ1bmN0aW9uKHQpe3ZhciBlPXQuZGF0ZSxuPXQudXRjO2lmKG51bGw9PT1lKXJldHVybiBuZXcgRGF0ZShOYU4pO2lmKGIudShlKSlyZXR1cm4gbmV3IERhdGU7aWYoZSBpbnN0YW5jZW9mIERhdGUpcmV0dXJuIG5ldyBEYXRlKGUpO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlJiYhL1okL2kudGVzdChlKSl7dmFyIHI9ZS5tYXRjaCgkKTtpZihyKXt2YXIgaT1yWzJdLTF8fDAscz0ocls3XXx8XCIwXCIpLnN1YnN0cmluZygwLDMpO3JldHVybiBuP25ldyBEYXRlKERhdGUuVVRDKHJbMV0saSxyWzNdfHwxLHJbNF18fDAscls1XXx8MCxyWzZdfHwwLHMpKTpuZXcgRGF0ZShyWzFdLGksclszXXx8MSxyWzRdfHwwLHJbNV18fDAscls2XXx8MCxzKX19cmV0dXJuIG5ldyBEYXRlKGUpfSh0KSx0aGlzLmluaXQoKX0sbS5pbml0PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy4kZDt0aGlzLiR5PXQuZ2V0RnVsbFllYXIoKSx0aGlzLiRNPXQuZ2V0TW9udGgoKSx0aGlzLiREPXQuZ2V0RGF0ZSgpLHRoaXMuJFc9dC5nZXREYXkoKSx0aGlzLiRIPXQuZ2V0SG91cnMoKSx0aGlzLiRtPXQuZ2V0TWludXRlcygpLHRoaXMuJHM9dC5nZXRTZWNvbmRzKCksdGhpcy4kbXM9dC5nZXRNaWxsaXNlY29uZHMoKX0sbS4kdXRpbHM9ZnVuY3Rpb24oKXtyZXR1cm4gYn0sbS5pc1ZhbGlkPWZ1bmN0aW9uKCl7cmV0dXJuISh0aGlzLiRkLnRvU3RyaW5nKCk9PT1sKX0sbS5pc1NhbWU9ZnVuY3Rpb24odCxlKXt2YXIgbj1PKHQpO3JldHVybiB0aGlzLnN0YXJ0T2YoZSk8PW4mJm48PXRoaXMuZW5kT2YoZSl9LG0uaXNBZnRlcj1mdW5jdGlvbih0LGUpe3JldHVybiBPKHQpPHRoaXMuc3RhcnRPZihlKX0sbS5pc0JlZm9yZT1mdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLmVuZE9mKGUpPE8odCl9LG0uJGc9ZnVuY3Rpb24odCxlLG4pe3JldHVybiBiLnUodCk/dGhpc1tlXTp0aGlzLnNldChuLHQpfSxtLnVuaXg9ZnVuY3Rpb24oKXtyZXR1cm4gTWF0aC5mbG9vcih0aGlzLnZhbHVlT2YoKS8xZTMpfSxtLnZhbHVlT2Y9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kZC5nZXRUaW1lKCl9LG0uc3RhcnRPZj1mdW5jdGlvbih0LGUpe3ZhciBuPXRoaXMscj0hIWIudShlKXx8ZSxmPWIucCh0KSxsPWZ1bmN0aW9uKHQsZSl7dmFyIGk9Yi53KG4uJHU/RGF0ZS5VVEMobi4keSxlLHQpOm5ldyBEYXRlKG4uJHksZSx0KSxuKTtyZXR1cm4gcj9pOmkuZW5kT2YoYSl9LCQ9ZnVuY3Rpb24odCxlKXtyZXR1cm4gYi53KG4udG9EYXRlKClbdF0uYXBwbHkobi50b0RhdGUoXCJzXCIpLChyP1swLDAsMCwwXTpbMjMsNTksNTksOTk5XSkuc2xpY2UoZSkpLG4pfSx5PXRoaXMuJFcsTT10aGlzLiRNLG09dGhpcy4kRCx2PVwic2V0XCIrKHRoaXMuJHU/XCJVVENcIjpcIlwiKTtzd2l0Y2goZil7Y2FzZSBoOnJldHVybiByP2woMSwwKTpsKDMxLDExKTtjYXNlIGM6cmV0dXJuIHI/bCgxLE0pOmwoMCxNKzEpO2Nhc2Ugbzp2YXIgZz10aGlzLiRsb2NhbGUoKS53ZWVrU3RhcnR8fDAsRD0oeTxnP3krNzp5KS1nO3JldHVybiBsKHI/bS1EOm0rKDYtRCksTSk7Y2FzZSBhOmNhc2UgZDpyZXR1cm4gJCh2K1wiSG91cnNcIiwwKTtjYXNlIHU6cmV0dXJuICQoditcIk1pbnV0ZXNcIiwxKTtjYXNlIHM6cmV0dXJuICQoditcIlNlY29uZHNcIiwyKTtjYXNlIGk6cmV0dXJuICQoditcIk1pbGxpc2Vjb25kc1wiLDMpO2RlZmF1bHQ6cmV0dXJuIHRoaXMuY2xvbmUoKX19LG0uZW5kT2Y9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuc3RhcnRPZih0LCExKX0sbS4kc2V0PWZ1bmN0aW9uKHQsZSl7dmFyIG4sbz1iLnAodCksZj1cInNldFwiKyh0aGlzLiR1P1wiVVRDXCI6XCJcIiksbD0obj17fSxuW2FdPWYrXCJEYXRlXCIsbltkXT1mK1wiRGF0ZVwiLG5bY109ZitcIk1vbnRoXCIsbltoXT1mK1wiRnVsbFllYXJcIixuW3VdPWYrXCJIb3Vyc1wiLG5bc109ZitcIk1pbnV0ZXNcIixuW2ldPWYrXCJTZWNvbmRzXCIsbltyXT1mK1wiTWlsbGlzZWNvbmRzXCIsbilbb10sJD1vPT09YT90aGlzLiREKyhlLXRoaXMuJFcpOmU7aWYobz09PWN8fG89PT1oKXt2YXIgeT10aGlzLmNsb25lKCkuc2V0KGQsMSk7eS4kZFtsXSgkKSx5LmluaXQoKSx0aGlzLiRkPXkuc2V0KGQsTWF0aC5taW4odGhpcy4kRCx5LmRheXNJbk1vbnRoKCkpKS4kZH1lbHNlIGwmJnRoaXMuJGRbbF0oJCk7cmV0dXJuIHRoaXMuaW5pdCgpLHRoaXN9LG0uc2V0PWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuY2xvbmUoKS4kc2V0KHQsZSl9LG0uZ2V0PWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzW2IucCh0KV0oKX0sbS5hZGQ9ZnVuY3Rpb24ocixmKXt2YXIgZCxsPXRoaXM7cj1OdW1iZXIocik7dmFyICQ9Yi5wKGYpLHk9ZnVuY3Rpb24odCl7dmFyIGU9TyhsKTtyZXR1cm4gYi53KGUuZGF0ZShlLmRhdGUoKStNYXRoLnJvdW5kKHQqcikpLGwpfTtpZigkPT09YylyZXR1cm4gdGhpcy5zZXQoYyx0aGlzLiRNK3IpO2lmKCQ9PT1oKXJldHVybiB0aGlzLnNldChoLHRoaXMuJHkrcik7aWYoJD09PWEpcmV0dXJuIHkoMSk7aWYoJD09PW8pcmV0dXJuIHkoNyk7dmFyIE09KGQ9e30sZFtzXT1lLGRbdV09bixkW2ldPXQsZClbJF18fDEsbT10aGlzLiRkLmdldFRpbWUoKStyKk07cmV0dXJuIGIudyhtLHRoaXMpfSxtLnN1YnRyYWN0PWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuYWRkKC0xKnQsZSl9LG0uZm9ybWF0PWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMsbj10aGlzLiRsb2NhbGUoKTtpZighdGhpcy5pc1ZhbGlkKCkpcmV0dXJuIG4uaW52YWxpZERhdGV8fGw7dmFyIHI9dHx8XCJZWVlZLU1NLUREVEhIOm1tOnNzWlwiLGk9Yi56KHRoaXMpLHM9dGhpcy4kSCx1PXRoaXMuJG0sYT10aGlzLiRNLG89bi53ZWVrZGF5cyxjPW4ubW9udGhzLGY9bi5tZXJpZGllbSxoPWZ1bmN0aW9uKHQsbixpLHMpe3JldHVybiB0JiYodFtuXXx8dChlLHIpKXx8aVtuXS5zbGljZSgwLHMpfSxkPWZ1bmN0aW9uKHQpe3JldHVybiBiLnMocyUxMnx8MTIsdCxcIjBcIil9LCQ9Znx8ZnVuY3Rpb24odCxlLG4pe3ZhciByPXQ8MTI/XCJBTVwiOlwiUE1cIjtyZXR1cm4gbj9yLnRvTG93ZXJDYXNlKCk6cn07cmV0dXJuIHIucmVwbGFjZSh5LChmdW5jdGlvbih0LHIpe3JldHVybiByfHxmdW5jdGlvbih0KXtzd2l0Y2godCl7Y2FzZVwiWVlcIjpyZXR1cm4gU3RyaW5nKGUuJHkpLnNsaWNlKC0yKTtjYXNlXCJZWVlZXCI6cmV0dXJuIGIucyhlLiR5LDQsXCIwXCIpO2Nhc2VcIk1cIjpyZXR1cm4gYSsxO2Nhc2VcIk1NXCI6cmV0dXJuIGIucyhhKzEsMixcIjBcIik7Y2FzZVwiTU1NXCI6cmV0dXJuIGgobi5tb250aHNTaG9ydCxhLGMsMyk7Y2FzZVwiTU1NTVwiOnJldHVybiBoKGMsYSk7Y2FzZVwiRFwiOnJldHVybiBlLiREO2Nhc2VcIkREXCI6cmV0dXJuIGIucyhlLiRELDIsXCIwXCIpO2Nhc2VcImRcIjpyZXR1cm4gU3RyaW5nKGUuJFcpO2Nhc2VcImRkXCI6cmV0dXJuIGgobi53ZWVrZGF5c01pbixlLiRXLG8sMik7Y2FzZVwiZGRkXCI6cmV0dXJuIGgobi53ZWVrZGF5c1Nob3J0LGUuJFcsbywzKTtjYXNlXCJkZGRkXCI6cmV0dXJuIG9bZS4kV107Y2FzZVwiSFwiOnJldHVybiBTdHJpbmcocyk7Y2FzZVwiSEhcIjpyZXR1cm4gYi5zKHMsMixcIjBcIik7Y2FzZVwiaFwiOnJldHVybiBkKDEpO2Nhc2VcImhoXCI6cmV0dXJuIGQoMik7Y2FzZVwiYVwiOnJldHVybiAkKHMsdSwhMCk7Y2FzZVwiQVwiOnJldHVybiAkKHMsdSwhMSk7Y2FzZVwibVwiOnJldHVybiBTdHJpbmcodSk7Y2FzZVwibW1cIjpyZXR1cm4gYi5zKHUsMixcIjBcIik7Y2FzZVwic1wiOnJldHVybiBTdHJpbmcoZS4kcyk7Y2FzZVwic3NcIjpyZXR1cm4gYi5zKGUuJHMsMixcIjBcIik7Y2FzZVwiU1NTXCI6cmV0dXJuIGIucyhlLiRtcywzLFwiMFwiKTtjYXNlXCJaXCI6cmV0dXJuIGl9cmV0dXJuIG51bGx9KHQpfHxpLnJlcGxhY2UoXCI6XCIsXCJcIil9KSl9LG0udXRjT2Zmc2V0PWZ1bmN0aW9uKCl7cmV0dXJuIDE1Ki1NYXRoLnJvdW5kKHRoaXMuJGQuZ2V0VGltZXpvbmVPZmZzZXQoKS8xNSl9LG0uZGlmZj1mdW5jdGlvbihyLGQsbCl7dmFyICQseT10aGlzLE09Yi5wKGQpLG09TyhyKSx2PShtLnV0Y09mZnNldCgpLXRoaXMudXRjT2Zmc2V0KCkpKmUsZz10aGlzLW0sRD1mdW5jdGlvbigpe3JldHVybiBiLm0oeSxtKX07c3dpdGNoKE0pe2Nhc2UgaDokPUQoKS8xMjticmVhaztjYXNlIGM6JD1EKCk7YnJlYWs7Y2FzZSBmOiQ9RCgpLzM7YnJlYWs7Y2FzZSBvOiQ9KGctdikvNjA0OGU1O2JyZWFrO2Nhc2UgYTokPShnLXYpLzg2NGU1O2JyZWFrO2Nhc2UgdTokPWcvbjticmVhaztjYXNlIHM6JD1nL2U7YnJlYWs7Y2FzZSBpOiQ9Zy90O2JyZWFrO2RlZmF1bHQ6JD1nfXJldHVybiBsPyQ6Yi5hKCQpfSxtLmRheXNJbk1vbnRoPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZW5kT2YoYykuJER9LG0uJGxvY2FsZT1mdW5jdGlvbigpe3JldHVybiBEW3RoaXMuJExdfSxtLmxvY2FsZT1mdW5jdGlvbih0LGUpe2lmKCF0KXJldHVybiB0aGlzLiRMO3ZhciBuPXRoaXMuY2xvbmUoKSxyPXcodCxlLCEwKTtyZXR1cm4gciYmKG4uJEw9ciksbn0sbS5jbG9uZT1mdW5jdGlvbigpe3JldHVybiBiLncodGhpcy4kZCx0aGlzKX0sbS50b0RhdGU9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IERhdGUodGhpcy52YWx1ZU9mKCkpfSxtLnRvSlNPTj1mdW5jdGlvbigpe3JldHVybiB0aGlzLmlzVmFsaWQoKT90aGlzLnRvSVNPU3RyaW5nKCk6bnVsbH0sbS50b0lTT1N0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLiRkLnRvSVNPU3RyaW5nKCl9LG0udG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kZC50b1VUQ1N0cmluZygpfSxNfSgpLGs9Xy5wcm90b3R5cGU7cmV0dXJuIE8ucHJvdG90eXBlPWssW1tcIiRtc1wiLHJdLFtcIiRzXCIsaV0sW1wiJG1cIixzXSxbXCIkSFwiLHVdLFtcIiRXXCIsYV0sW1wiJE1cIixjXSxbXCIkeVwiLGhdLFtcIiREXCIsZF1dLmZvckVhY2goKGZ1bmN0aW9uKHQpe2tbdFsxXV09ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuJGcoZSx0WzBdLHRbMV0pfX0pKSxPLmV4dGVuZD1mdW5jdGlvbih0LGUpe3JldHVybiB0LiRpfHwodChlLF8sTyksdC4kaT0hMCksT30sTy5sb2NhbGU9dyxPLmlzRGF5anM9UyxPLnVuaXg9ZnVuY3Rpb24odCl7cmV0dXJuIE8oMWUzKnQpfSxPLmVuPURbZ10sTy5Mcz1ELE8ucD17fSxPfSkpOyIsIiFmdW5jdGlvbih0LGkpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPWkoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGkpOih0PVwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6dHx8c2VsZikuZGF5anNfcGx1Z2luX3V0Yz1pKCl9KHRoaXMsKGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQ9XCJtaW51dGVcIixpPS9bKy1dXFxkXFxkKD86Oj9cXGRcXGQpPy9nLGU9LyhbKy1dfFxcZFxcZCkvZztyZXR1cm4gZnVuY3Rpb24ocyxmLG4pe3ZhciB1PWYucHJvdG90eXBlO24udXRjPWZ1bmN0aW9uKHQpe3ZhciBpPXtkYXRlOnQsdXRjOiEwLGFyZ3M6YXJndW1lbnRzfTtyZXR1cm4gbmV3IGYoaSl9LHUudXRjPWZ1bmN0aW9uKGkpe3ZhciBlPW4odGhpcy50b0RhdGUoKSx7bG9jYWxlOnRoaXMuJEwsdXRjOiEwfSk7cmV0dXJuIGk/ZS5hZGQodGhpcy51dGNPZmZzZXQoKSx0KTplfSx1LmxvY2FsPWZ1bmN0aW9uKCl7cmV0dXJuIG4odGhpcy50b0RhdGUoKSx7bG9jYWxlOnRoaXMuJEwsdXRjOiExfSl9O3ZhciBvPXUucGFyc2U7dS5wYXJzZT1mdW5jdGlvbih0KXt0LnV0YyYmKHRoaXMuJHU9ITApLHRoaXMuJHV0aWxzKCkudSh0LiRvZmZzZXQpfHwodGhpcy4kb2Zmc2V0PXQuJG9mZnNldCksby5jYWxsKHRoaXMsdCl9O3ZhciByPXUuaW5pdDt1LmluaXQ9ZnVuY3Rpb24oKXtpZih0aGlzLiR1KXt2YXIgdD10aGlzLiRkO3RoaXMuJHk9dC5nZXRVVENGdWxsWWVhcigpLHRoaXMuJE09dC5nZXRVVENNb250aCgpLHRoaXMuJEQ9dC5nZXRVVENEYXRlKCksdGhpcy4kVz10LmdldFVUQ0RheSgpLHRoaXMuJEg9dC5nZXRVVENIb3VycygpLHRoaXMuJG09dC5nZXRVVENNaW51dGVzKCksdGhpcy4kcz10LmdldFVUQ1NlY29uZHMoKSx0aGlzLiRtcz10LmdldFVUQ01pbGxpc2Vjb25kcygpfWVsc2Ugci5jYWxsKHRoaXMpfTt2YXIgYT11LnV0Y09mZnNldDt1LnV0Y09mZnNldD1mdW5jdGlvbihzLGYpe3ZhciBuPXRoaXMuJHV0aWxzKCkudTtpZihuKHMpKXJldHVybiB0aGlzLiR1PzA6bih0aGlzLiRvZmZzZXQpP2EuY2FsbCh0aGlzKTp0aGlzLiRvZmZzZXQ7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHMmJihzPWZ1bmN0aW9uKHQpe3ZvaWQgMD09PXQmJih0PVwiXCIpO3ZhciBzPXQubWF0Y2goaSk7aWYoIXMpcmV0dXJuIG51bGw7dmFyIGY9KFwiXCIrc1swXSkubWF0Y2goZSl8fFtcIi1cIiwwLDBdLG49ZlswXSx1PTYwKitmWzFdKyArZlsyXTtyZXR1cm4gMD09PXU/MDpcIitcIj09PW4/dTotdX0ocyksbnVsbD09PXMpKXJldHVybiB0aGlzO3ZhciB1PU1hdGguYWJzKHMpPD0xNj82MCpzOnMsbz10aGlzO2lmKGYpcmV0dXJuIG8uJG9mZnNldD11LG8uJHU9MD09PXMsbztpZigwIT09cyl7dmFyIHI9dGhpcy4kdT90aGlzLnRvRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KCk6LTEqdGhpcy51dGNPZmZzZXQoKTsobz10aGlzLmxvY2FsKCkuYWRkKHUrcix0KSkuJG9mZnNldD11LG8uJHguJGxvY2FsT2Zmc2V0PXJ9ZWxzZSBvPXRoaXMudXRjKCk7cmV0dXJuIG99O3ZhciBoPXUuZm9ybWF0O3UuZm9ybWF0PWZ1bmN0aW9uKHQpe3ZhciBpPXR8fCh0aGlzLiR1P1wiWVlZWS1NTS1ERFRISDptbTpzc1taXVwiOlwiXCIpO3JldHVybiBoLmNhbGwodGhpcyxpKX0sdS52YWx1ZU9mPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy4kdXRpbHMoKS51KHRoaXMuJG9mZnNldCk/MDp0aGlzLiRvZmZzZXQrKHRoaXMuJHguJGxvY2FsT2Zmc2V0fHx0aGlzLiRkLmdldFRpbWV6b25lT2Zmc2V0KCkpO3JldHVybiB0aGlzLiRkLnZhbHVlT2YoKS02ZTQqdH0sdS5pc1VUQz1mdW5jdGlvbigpe3JldHVybiEhdGhpcy4kdX0sdS50b0lTT1N0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLnRvRGF0ZSgpLnRvSVNPU3RyaW5nKCl9LHUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy50b0RhdGUoKS50b1VUQ1N0cmluZygpfTt2YXIgbD11LnRvRGF0ZTt1LnRvRGF0ZT1mdW5jdGlvbih0KXtyZXR1cm5cInNcIj09PXQmJnRoaXMuJG9mZnNldD9uKHRoaXMuZm9ybWF0KFwiWVlZWS1NTS1ERCBISDptbTpzczpTU1NcIikpLnRvRGF0ZSgpOmwuY2FsbCh0aGlzKX07dmFyIGM9dS5kaWZmO3UuZGlmZj1mdW5jdGlvbih0LGksZSl7aWYodCYmdGhpcy4kdT09PXQuJHUpcmV0dXJuIGMuY2FsbCh0aGlzLHQsaSxlKTt2YXIgcz10aGlzLmxvY2FsKCksZj1uKHQpLmxvY2FsKCk7cmV0dXJuIGMuY2FsbChzLGYsaSxlKX19fSkpOyIsIiFmdW5jdGlvbih0LGUpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPWUoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGUpOih0PVwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6dHx8c2VsZikuZGF5anNfcGx1Z2luX3RpbWV6b25lPWUoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgdD17eWVhcjowLG1vbnRoOjEsZGF5OjIsaG91cjozLG1pbnV0ZTo0LHNlY29uZDo1fSxlPXt9O3JldHVybiBmdW5jdGlvbihuLGksbyl7dmFyIHIsYT1mdW5jdGlvbih0LG4saSl7dm9pZCAwPT09aSYmKGk9e30pO3ZhciBvPW5ldyBEYXRlKHQpLHI9ZnVuY3Rpb24odCxuKXt2b2lkIDA9PT1uJiYobj17fSk7dmFyIGk9bi50aW1lWm9uZU5hbWV8fFwic2hvcnRcIixvPXQrXCJ8XCIraSxyPWVbb107cmV0dXJuIHJ8fChyPW5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KFwiZW4tVVNcIix7aG91cjEyOiExLHRpbWVab25lOnQseWVhcjpcIm51bWVyaWNcIixtb250aDpcIjItZGlnaXRcIixkYXk6XCIyLWRpZ2l0XCIsaG91cjpcIjItZGlnaXRcIixtaW51dGU6XCIyLWRpZ2l0XCIsc2Vjb25kOlwiMi1kaWdpdFwiLHRpbWVab25lTmFtZTppfSksZVtvXT1yKSxyfShuLGkpO3JldHVybiByLmZvcm1hdFRvUGFydHMobyl9LHU9ZnVuY3Rpb24oZSxuKXtmb3IodmFyIGk9YShlLG4pLHI9W10sdT0wO3U8aS5sZW5ndGg7dSs9MSl7dmFyIGY9aVt1XSxzPWYudHlwZSxtPWYudmFsdWUsYz10W3NdO2M+PTAmJihyW2NdPXBhcnNlSW50KG0sMTApKX12YXIgZD1yWzNdLGw9MjQ9PT1kPzA6ZCxoPXJbMF0rXCItXCIrclsxXStcIi1cIityWzJdK1wiIFwiK2wrXCI6XCIrcls0XStcIjpcIityWzVdK1wiOjAwMFwiLHY9K2U7cmV0dXJuKG8udXRjKGgpLnZhbHVlT2YoKS0odi09diUxZTMpKS82ZTR9LGY9aS5wcm90b3R5cGU7Zi50ej1mdW5jdGlvbih0LGUpe3ZvaWQgMD09PXQmJih0PXIpO3ZhciBuLGk9dGhpcy51dGNPZmZzZXQoKSxhPXRoaXMudG9EYXRlKCksdT1hLnRvTG9jYWxlU3RyaW5nKFwiZW4tVVNcIix7dGltZVpvbmU6dH0pLGY9TWF0aC5yb3VuZCgoYS1uZXcgRGF0ZSh1KSkvMWUzLzYwKSxzPTE1Ki1NYXRoLnJvdW5kKGEuZ2V0VGltZXpvbmVPZmZzZXQoKS8xNSktZjtpZighTnVtYmVyKHMpKW49dGhpcy51dGNPZmZzZXQoMCxlKTtlbHNlIGlmKG49byh1LHtsb2NhbGU6dGhpcy4kTH0pLiRzZXQoXCJtaWxsaXNlY29uZFwiLHRoaXMuJG1zKS51dGNPZmZzZXQocywhMCksZSl7dmFyIG09bi51dGNPZmZzZXQoKTtuPW4uYWRkKGktbSxcIm1pbnV0ZVwiKX1yZXR1cm4gbi4keC4kdGltZXpvbmU9dCxufSxmLm9mZnNldE5hbWU9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy4keC4kdGltZXpvbmV8fG8udHouZ3Vlc3MoKSxuPWEodGhpcy52YWx1ZU9mKCksZSx7dGltZVpvbmVOYW1lOnR9KS5maW5kKChmdW5jdGlvbih0KXtyZXR1cm5cInRpbWV6b25lbmFtZVwiPT09dC50eXBlLnRvTG93ZXJDYXNlKCl9KSk7cmV0dXJuIG4mJm4udmFsdWV9O3ZhciBzPWYuc3RhcnRPZjtmLnN0YXJ0T2Y9ZnVuY3Rpb24odCxlKXtpZighdGhpcy4keHx8IXRoaXMuJHguJHRpbWV6b25lKXJldHVybiBzLmNhbGwodGhpcyx0LGUpO3ZhciBuPW8odGhpcy5mb3JtYXQoXCJZWVlZLU1NLUREIEhIOm1tOnNzOlNTU1wiKSx7bG9jYWxlOnRoaXMuJEx9KTtyZXR1cm4gcy5jYWxsKG4sdCxlKS50eih0aGlzLiR4LiR0aW1lem9uZSwhMCl9LG8udHo9ZnVuY3Rpb24odCxlLG4pe3ZhciBpPW4mJmUsYT1ufHxlfHxyLGY9dSgrbygpLGEpO2lmKFwic3RyaW5nXCIhPXR5cGVvZiB0KXJldHVybiBvKHQpLnR6KGEpO3ZhciBzPWZ1bmN0aW9uKHQsZSxuKXt2YXIgaT10LTYwKmUqMWUzLG89dShpLG4pO2lmKGU9PT1vKXJldHVybltpLGVdO3ZhciByPXUoaS09NjAqKG8tZSkqMWUzLG4pO3JldHVybiBvPT09cj9baSxvXTpbdC02MCpNYXRoLm1pbihvLHIpKjFlMyxNYXRoLm1heChvLHIpXX0oby51dGModCxpKS52YWx1ZU9mKCksZixhKSxtPXNbMF0sYz1zWzFdLGQ9byhtKS51dGNPZmZzZXQoYyk7cmV0dXJuIGQuJHguJHRpbWV6b25lPWEsZH0sby50ei5ndWVzcz1mdW5jdGlvbigpe3JldHVybiBJbnRsLkRhdGVUaW1lRm9ybWF0KCkucmVzb2x2ZWRPcHRpb25zKCkudGltZVpvbmV9LG8udHouc2V0RGVmYXVsdD1mdW5jdGlvbih0KXtyPXR9fX0pKTsiLCIhZnVuY3Rpb24oZSxpKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1pKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShpKTooZT1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOmV8fHNlbGYpLmRheWpzX3BsdWdpbl9pc1NhbWVPckJlZm9yZT1pKCl9KHRoaXMsKGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7cmV0dXJuIGZ1bmN0aW9uKGUsaSl7aS5wcm90b3R5cGUuaXNTYW1lT3JCZWZvcmU9ZnVuY3Rpb24oZSxpKXtyZXR1cm4gdGhpcy5pc1NhbWUoZSxpKXx8dGhpcy5pc0JlZm9yZShlLGkpfX19KSk7IiwiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUodCk6KGU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczplfHxzZWxmKS5kYXlqc19wbHVnaW5faXNTYW1lT3JBZnRlcj10KCl9KHRoaXMsKGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7cmV0dXJuIGZ1bmN0aW9uKGUsdCl7dC5wcm90b3R5cGUuaXNTYW1lT3JBZnRlcj1mdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLmlzU2FtZShlLHQpfHx0aGlzLmlzQWZ0ZXIoZSx0KX19fSkpOyIsImltcG9ydCBkYXlqcyBmcm9tIFwiZGF5anNcIjtcbmltcG9ydCB1dGMgZnJvbSBcImRheWpzL3BsdWdpbi91dGNcIjtcbmltcG9ydCB0aW1lem9uZSBmcm9tIFwiZGF5anMvcGx1Z2luL3RpbWV6b25lXCI7XG5pbXBvcnQgaXNTYW1lT3JCZWZvcmUgZnJvbSBcImRheWpzL3BsdWdpbi9pc1NhbWVPckJlZm9yZVwiO1xuaW1wb3J0IGlzU2FtZU9yQWZ0ZXIgZnJvbSBcImRheWpzL3BsdWdpbi9pc1NhbWVPckFmdGVyXCI7XG5cbi8vIEV4dGVuZCBkYXlqcyB3aXRoIHBsdWdpbnNcbmRheWpzLmV4dGVuZCh1dGMpO1xuZGF5anMuZXh0ZW5kKHRpbWV6b25lKTtcbmRheWpzLmV4dGVuZChpc1NhbWVPckJlZm9yZSk7XG5kYXlqcy5leHRlbmQoaXNTYW1lT3JBZnRlcik7XG5cbmV4cG9ydCBjb25zdCBmb3JtYXREYXRlID0gKGRhdGU6IERhdGUsIGZvcm1hdCA9IFwiWVlZWS1NTS1ERCBISDptbVwiKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gZGF5anMoZGF0ZSkuZm9ybWF0KGZvcm1hdCk7XG59O1xuXG5leHBvcnQgY29uc3QgcGFyc2VEYXRlID0gKGRhdGVTdHJpbmc6IHN0cmluZyk6IERhdGUgPT4ge1xuICAgIHJldHVybiBkYXlqcyhkYXRlU3RyaW5nKS50b0RhdGUoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGREYXlzID0gKGRhdGU6IERhdGUsIGRheXM6IG51bWJlcik6IERhdGUgPT4ge1xuICAgIHJldHVybiBkYXlqcyhkYXRlKS5hZGQoZGF5cywgXCJkYXlcIikudG9EYXRlKCk7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkSG91cnMgPSAoZGF0ZTogRGF0ZSwgaG91cnM6IG51bWJlcik6IERhdGUgPT4ge1xuICAgIHJldHVybiBkYXlqcyhkYXRlKS5hZGQoaG91cnMsIFwiaG91clwiKS50b0RhdGUoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1NhbWVEYXkgPSAoZGF0ZTE6IERhdGUsIGRhdGUyOiBEYXRlKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIGRheWpzKGRhdGUxKS5pc1NhbWUoZGF5anMoZGF0ZTIpLCBcImRheVwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1dpdGhpblJhbmdlID0gKGRhdGU6IERhdGUsIHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUpOiBib29sZWFuID0+IHtcbiAgICBjb25zdCBkYXlEYXRlID0gZGF5anMoZGF0ZSk7XG4gICAgcmV0dXJuIGRheURhdGUuaXNTYW1lT3JBZnRlcihkYXlqcyhzdGFydCkpICYmIGRheURhdGUuaXNTYW1lT3JCZWZvcmUoZGF5anMoZW5kKSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RHVyYXRpb25Jbk1pbnV0ZXMgPSAoc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSk6IG51bWJlciA9PiB7XG4gICAgcmV0dXJuIGRheWpzKGVuZCkuZGlmZihkYXlqcyhzdGFydCksIFwibWludXRlXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFdlZWtSYW5nZSA9IChkYXRlOiBEYXRlKTogeyBzdGFydDogRGF0ZTsgZW5kOiBEYXRlIH0gPT4ge1xuICAgIGNvbnN0IHN0YXJ0T2ZXZWVrID0gZGF5anMoZGF0ZSkuc3RhcnRPZihcIndlZWtcIik7XG4gICAgY29uc3QgZW5kT2ZXZWVrID0gZGF5anMoZGF0ZSkuZW5kT2YoXCJ3ZWVrXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQ6IHN0YXJ0T2ZXZWVrLnRvRGF0ZSgpLFxuICAgICAgICBlbmQ6IGVuZE9mV2Vlay50b0RhdGUoKVxuICAgIH07XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0TW9udGhSYW5nZSA9IChkYXRlOiBEYXRlKTogeyBzdGFydDogRGF0ZTsgZW5kOiBEYXRlIH0gPT4ge1xuICAgIGNvbnN0IHN0YXJ0T2ZNb250aCA9IGRheWpzKGRhdGUpLnN0YXJ0T2YoXCJtb250aFwiKTtcbiAgICBjb25zdCBlbmRPZk1vbnRoID0gZGF5anMoZGF0ZSkuZW5kT2YoXCJtb250aFwiKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0OiBzdGFydE9mTW9udGgudG9EYXRlKCksXG4gICAgICAgIGVuZDogZW5kT2ZNb250aC50b0RhdGUoKVxuICAgIH07XG59O1xuXG5leHBvcnQgY29uc3Qgcm91bmRUb05lYXJlc3RNaW51dGVzID0gKGRhdGU6IERhdGUsIG1pbnV0ZXM6IG51bWJlcik6IERhdGUgPT4ge1xuICAgIGNvbnN0IGRheURhdGUgPSBkYXlqcyhkYXRlKTtcbiAgICBjb25zdCByb3VuZGVkTWludXRlcyA9IE1hdGgucm91bmQoZGF5RGF0ZS5taW51dGUoKSAvIG1pbnV0ZXMpICogbWludXRlcztcbiAgICByZXR1cm4gZGF5RGF0ZS5taW51dGUocm91bmRlZE1pbnV0ZXMpLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKS50b0RhdGUoKTtcbn07XG5cbi8vIFNoaWZ0LXNwZWNpZmljIGRhdGUgZnVuY3Rpb25zXG5leHBvcnQgY29uc3QgZ2V0U2hpZnRCb3VuZGFyeSA9IChkYXRlOiBEYXRlLCBzaGlmdFR5cGU6IHN0cmluZyk6IHsgc3RhcnQ6IERhdGU7IGVuZDogRGF0ZSB9ID0+IHtcbiAgICBjb25zdCBkYXkgPSBkYXlqcyhkYXRlKTtcblxuICAgIHN3aXRjaCAoc2hpZnRUeXBlKSB7XG4gICAgICAgIGNhc2UgXCJNXCI6IC8vIE1vcm5pbmcgKDA2OjAwLTE0OjAwKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDogZGF5LmhvdXIoNikubWludXRlKDApLnNlY29uZCgwKS50b0RhdGUoKSxcbiAgICAgICAgICAgICAgICBlbmQ6IGRheS5ob3VyKDE0KS5taW51dGUoMCkuc2Vjb25kKDApLnRvRGF0ZSgpXG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIFwiRVwiOiAvLyBFdmVuaW5nICgxNDowMC0yMjowMClcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IGRheS5ob3VyKDE0KS5taW51dGUoMCkuc2Vjb25kKDApLnRvRGF0ZSgpLFxuICAgICAgICAgICAgICAgIGVuZDogZGF5LmhvdXIoMjIpLm1pbnV0ZSgwKS5zZWNvbmQoMCkudG9EYXRlKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgXCJOXCI6IC8vIE5pZ2h0ICgyMjowMC0wNjowMCBuZXh0IGRheSlcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IGRheS5ob3VyKDIyKS5taW51dGUoMCkuc2Vjb25kKDApLnRvRGF0ZSgpLFxuICAgICAgICAgICAgICAgIGVuZDogZGF5LmFkZCgxLCBcImRheVwiKS5ob3VyKDYpLm1pbnV0ZSgwKS5zZWNvbmQoMCkudG9EYXRlKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIGRlZmF1bHQ6IC8vIERheSBzaGlmdCAoMDg6MDAtMTc6MDApXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBkYXkuaG91cig4KS5taW51dGUoMCkuc2Vjb25kKDApLnRvRGF0ZSgpLFxuICAgICAgICAgICAgICAgIGVuZDogZGF5LmhvdXIoMTcpLm1pbnV0ZSgwKS5zZWNvbmQoMCkudG9EYXRlKClcbiAgICAgICAgICAgIH07XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldDMwRGF5UmFuZ2UgPSAoc3RhcnREYXRlOiBEYXRlKTogeyBzdGFydDogRGF0ZTsgZW5kOiBEYXRlIH0gPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0OiBkYXlqcyhzdGFydERhdGUpLnN0YXJ0T2YoXCJkYXlcIikudG9EYXRlKCksXG4gICAgICAgIGVuZDogZGF5anMoc3RhcnREYXRlKS5hZGQoMjksIFwiZGF5c1wiKS5lbmRPZihcImRheVwiKS50b0RhdGUoKVxuICAgIH07XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RGF0ZVJhbmdlQXJyYXkgPSAoc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSk6IERhdGVbXSA9PiB7XG4gICAgY29uc3QgZGF0ZXM6IERhdGVbXSA9IFtdO1xuICAgIGxldCBjdXJyZW50ID0gZGF5anMoc3RhcnQpO1xuICAgIGNvbnN0IGVuZERheSA9IGRheWpzKGVuZCk7XG5cbiAgICB3aGlsZSAoY3VycmVudC5pc1NhbWVPckJlZm9yZShlbmREYXksIFwiZGF5XCIpKSB7XG4gICAgICAgIGRhdGVzLnB1c2goY3VycmVudC50b0RhdGUoKSk7XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LmFkZCgxLCBcImRheVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0ZXM7XG59O1xuXG5leHBvcnQgY29uc3QgZm9ybWF0U2hpZnREYXRlID0gKGRhdGU6IERhdGUpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBkYXlqcyhkYXRlKS5mb3JtYXQoXCJNTU0gRERcIik7XG59O1xuXG5leHBvcnQgY29uc3QgZm9ybWF0U2hpZnRXZWVrZGF5ID0gKGRhdGU6IERhdGUpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBkYXlqcyhkYXRlKS5mb3JtYXQoXCJkZGRcIik7XG59O1xuXG4vLyBMZWdhY3kgY29tcGF0aWJpbGl0eSBmdW5jdGlvbnMgKGtlZXBpbmcgc2FtZSBuYW1lcyBhcyBkYXRlLWZucyB2ZXJzaW9uKVxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlRGF0ZVJhbmdlID0gKHN0YXJ0RGF0ZTogRGF0ZSwgZGF5c0NvdW50OiBudW1iZXIpOiBEYXRlW10gPT4ge1xuICAgIGNvbnN0IGRhdGVzOiBEYXRlW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRheXNDb3VudDsgaSsrKSB7XG4gICAgICAgIGRhdGVzLnB1c2goYWRkRGF5cyhzdGFydERhdGUsIGkpKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGVzO1xufTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdERhdGVGb3JTaGlmdCA9IChkYXRlOiBEYXRlKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gZGF5anMoZGF0ZSkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1RvZGF5ID0gKGRhdGU6IERhdGUpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gaXNTYW1lRGF5KGRhdGUsIG5ldyBEYXRlKCkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzV2Vla2VuZCA9IChkYXRlOiBEYXRlKTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgZGF5ID0gZGF5anMoZGF0ZSkuZGF5KCk7XG4gICAgcmV0dXJuIGRheSA9PT0gMCB8fCBkYXkgPT09IDY7IC8vIFN1bmRheSA9IDAsIFNhdHVyZGF5ID0gNlxufTtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VSZWYsIHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUluVmlldyB9IGZyb20gXCJyZWFjdC1pbnRlcnNlY3Rpb24tb2JzZXJ2ZXJcIjtcblxuZXhwb3J0IGludGVyZmFjZSBVc2VTY3JvbGxOYXZpZ2F0aW9uUmV0dXJuIHtcbiAgICBoZWFkZXJTY3JvbGxSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudD47XG4gICAgY29udGVudFNjcm9sbFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50PjtcbiAgICBpc1Njcm9sbGluZzogUmVhY3QuTXV0YWJsZVJlZk9iamVjdDxib29sZWFuPjtcbiAgICBpbmZpbml0ZVNjcm9sbFJlZjogKG5vZGU/OiBFbGVtZW50IHwgbnVsbCkgPT4gdm9pZDtcbiAgICBpc0luZmluaXRlU2Nyb2xsVmlzaWJsZTogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBDdXN0b20gaG9vayBmb3IgbWFuYWdpbmcgc2Nyb2xsIHN5bmNocm9uaXphdGlvbiBhbmQgaW5maW5pdGUgbG9hZGluZ1xuICogRW5zdXJlcyB1bmlmaWVkIHNjcm9sbGluZyBleHBlcmllbmNlIGFuZCBoYW5kbGVzIGxhenkgbG9hZGluZyBvZiBhZGRpdGlvbmFsIHRpbWVsaW5lIGRhdGFcbiAqL1xuZXhwb3J0IGNvbnN0IHVzZVNjcm9sbE5hdmlnYXRpb24gPSAoKTogVXNlU2Nyb2xsTmF2aWdhdGlvblJldHVybiA9PiB7XG4gICAgLy8gUmVmcyBmb3Igc2Nyb2xsIHN5bmNocm9uaXphdGlvblxuICAgIGNvbnN0IGhlYWRlclNjcm9sbFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XG4gICAgY29uc3QgY29udGVudFNjcm9sbFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XG4gICAgY29uc3QgaXNTY3JvbGxpbmcgPSB1c2VSZWYoZmFsc2UpO1xuXG4gICAgLy8gSW5maW5pdGUgc2Nyb2xsIC8gbGF6eSBsb2FkaW5nIHdpdGggaW50ZXJzZWN0aW9uIG9ic2VydmVyXG4gICAgY29uc3QgeyByZWY6IGluZmluaXRlU2Nyb2xsUmVmLCBpblZpZXc6IGlzSW5maW5pdGVTY3JvbGxWaXNpYmxlIH0gPSB1c2VJblZpZXcoe1xuICAgICAgICByb290TWFyZ2luOiBcIjBweFwiLFxuICAgICAgICB0aHJlc2hvbGQ6IDFcbiAgICB9KTtcblxuICAgIC8vIFNjcm9sbCBzeW5jaHJvbml6YXRpb24gYmV0d2VlbiBoZWFkZXIgYW5kIGNvbnRlbnRcbiAgICBjb25zdCBzeW5jU2Nyb2xsID0gdXNlQ2FsbGJhY2soKHNvdXJjZTogSFRNTERpdkVsZW1lbnQsIHRhcmdldDogSFRNTERpdkVsZW1lbnQpID0+IHtcbiAgICAgICAgaWYgKGlzU2Nyb2xsaW5nLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpc1Njcm9sbGluZy5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgdGFyZ2V0LnNjcm9sbExlZnQgPSBzb3VyY2Uuc2Nyb2xsTGVmdDtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpc1Njcm9sbGluZy5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgIH0sIDEwKTtcbiAgICB9LCBbXSk7XG5cbiAgICAvLyBTZXQgdXAgc2Nyb2xsIGV2ZW50IGxpc3RlbmVycyBmb3Igc3luY2hyb25pemF0aW9uXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgaGVhZGVyRWwgPSBoZWFkZXJTY3JvbGxSZWYuY3VycmVudDtcbiAgICAgICAgY29uc3QgY29udGVudEVsID0gY29udGVudFNjcm9sbFJlZi5jdXJyZW50O1xuXG4gICAgICAgIGlmICghaGVhZGVyRWwgfHwgIWNvbnRlbnRFbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaGFuZGxlSGVhZGVyU2Nyb2xsID0gKCk6IHZvaWQgPT4gc3luY1Njcm9sbChoZWFkZXJFbCwgY29udGVudEVsKTtcbiAgICAgICAgY29uc3QgaGFuZGxlQ29udGVudFNjcm9sbCA9ICgpOiB2b2lkID0+IHN5bmNTY3JvbGwoY29udGVudEVsLCBoZWFkZXJFbCk7XG5cbiAgICAgICAgaGVhZGVyRWwuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVIZWFkZXJTY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgY29udGVudEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlQ29udGVudFNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBoZWFkZXJFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZUhlYWRlclNjcm9sbCk7XG4gICAgICAgICAgICBjb250ZW50RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVDb250ZW50U2Nyb2xsKTtcbiAgICAgICAgfTtcbiAgICB9LCBbc3luY1Njcm9sbF0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVhZGVyU2Nyb2xsUmVmLFxuICAgICAgICBjb250ZW50U2Nyb2xsUmVmLFxuICAgICAgICBpc1Njcm9sbGluZyxcbiAgICAgICAgaW5maW5pdGVTY3JvbGxSZWYsXG4gICAgICAgIGlzSW5maW5pdGVTY3JvbGxWaXNpYmxlXG4gICAgfTtcbn07XG4iLCJpbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBFbmdpbmVlciwgU2hpZnRBc3NpZ25tZW50IH0gZnJvbSBcIi4uL3R5cGVzL3NoaWZ0U2NoZWR1bGVyXCI7XG5cbmV4cG9ydCB0eXBlIFVzZXJSb2xlID0gXCJlbmdpbmVlclwiIHwgXCJ0ZWFtX2xlYWRlclwiIHwgXCJtYW5hZ2VyXCIgfCBcImFkbWluXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVhbUFjY2Vzc0NvbmZpZyB7XG4gICAgdXNlclJvbGU6IFVzZXJSb2xlO1xuICAgIHVzZXJUZWFtPzogc3RyaW5nO1xuICAgIHVzZXJJZD86IHN0cmluZztcbiAgICBhbGxvd0Nyb3NzVGVhbVZpZXc/OiBib29sZWFuO1xuICAgIGFsbG93U2hpZnRFZGl0aW5nPzogYm9vbGVhbjtcbiAgICBhbGxvd0JhdGNoT3BlcmF0aW9ucz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlVGVhbUFjY2Vzc1JldHVybiB7XG4gICAgZmlsdGVyZWRFbmdpbmVlcnM6IEVuZ2luZWVyW107XG4gICAgZmlsdGVyZWRTaGlmdHM6IFNoaWZ0QXNzaWdubWVudFtdO1xuICAgIGNhbkVkaXRTaGlmdDogKHNoaWZ0OiBTaGlmdEFzc2lnbm1lbnQpID0+IGJvb2xlYW47XG4gICAgY2FuQ3JlYXRlU2hpZnQ6IChlbmdpbmVlcklkOiBzdHJpbmcpID0+IGJvb2xlYW47XG4gICAgY2FuRGVsZXRlU2hpZnQ6IChzaGlmdDogU2hpZnRBc3NpZ25tZW50KSA9PiBib29sZWFuO1xuICAgIGNhblZpZXdUZWFtOiAodGVhbU5hbWU6IHN0cmluZykgPT4gYm9vbGVhbjtcbiAgICBjYW5QZXJmb3JtQmF0Y2hPcGVyYXRpb25zOiBib29sZWFuO1xuICAgIHVzZXJQZXJtaXNzaW9uczoge1xuICAgICAgICByZWFkT25seTogYm9vbGVhbjtcbiAgICAgICAgY2FuRWRpdDogYm9vbGVhbjtcbiAgICAgICAgY2FuQ3JlYXRlOiBib29sZWFuO1xuICAgICAgICBjYW5EZWxldGU6IGJvb2xlYW47XG4gICAgICAgIGNhbkJhdGNoOiBib29sZWFuO1xuICAgICAgICBjcm9zc1RlYW1BY2Nlc3M6IGJvb2xlYW47XG4gICAgfTtcbn1cblxuLyoqXG4gKiBDdXN0b20gaG9vayBmb3IgbWFuYWdpbmcgdGVhbS1iYXNlZCBhY2Nlc3MgY29udHJvbCBhbmQgcm9sZS1iYXNlZCBmaWx0ZXJpbmdcbiAqIEhhbmRsZXMgcGVybWlzc2lvbnMgZm9yIGVuZ2luZWVycyB2cyB0ZWFtIGxlYWRlcnMgdnMgbWFuYWdlcnNcbiAqL1xuZXhwb3J0IGNvbnN0IHVzZVRlYW1BY2Nlc3MgPSAoXG4gICAgZW5naW5lZXJzOiBFbmdpbmVlcltdLFxuICAgIHNoaWZ0czogU2hpZnRBc3NpZ25tZW50W10sXG4gICAgY29uZmlnOiBUZWFtQWNjZXNzQ29uZmlnXG4pOiBVc2VUZWFtQWNjZXNzUmV0dXJuID0+IHtcbiAgICAvLyBEZXRlcm1pbmUgdXNlciBwZXJtaXNzaW9ucyBiYXNlZCBvbiByb2xlXG4gICAgY29uc3QgdXNlclBlcm1pc3Npb25zID0gdXNlTWVtbygoKSA9PiB7XG4gICAgICAgIGNvbnN0IGJhc2VQZXJtaXNzaW9ucyA9IHtcbiAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSxcbiAgICAgICAgICAgIGNhbkVkaXQ6IGZhbHNlLFxuICAgICAgICAgICAgY2FuQ3JlYXRlOiBmYWxzZSxcbiAgICAgICAgICAgIGNhbkRlbGV0ZTogZmFsc2UsXG4gICAgICAgICAgICBjYW5CYXRjaDogZmFsc2UsXG4gICAgICAgICAgICBjcm9zc1RlYW1BY2Nlc3M6IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgc3dpdGNoIChjb25maWcudXNlclJvbGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJhZG1pblwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmJhc2VQZXJtaXNzaW9ucyxcbiAgICAgICAgICAgICAgICAgICAgY2FuRWRpdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2FuQ3JlYXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjYW5EZWxldGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNhbkJhdGNoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjcm9zc1RlYW1BY2Nlc3M6IHRydWVcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjYXNlIFwibWFuYWdlclwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmJhc2VQZXJtaXNzaW9ucyxcbiAgICAgICAgICAgICAgICAgICAgY2FuRWRpdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2FuQ3JlYXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjYW5EZWxldGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNhbkJhdGNoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjcm9zc1RlYW1BY2Nlc3M6IGNvbmZpZy5hbGxvd0Nyb3NzVGVhbVZpZXcgPz8gdHJ1ZVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNhc2UgXCJ0ZWFtX2xlYWRlclwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmJhc2VQZXJtaXNzaW9ucyxcbiAgICAgICAgICAgICAgICAgICAgY2FuRWRpdDogY29uZmlnLmFsbG93U2hpZnRFZGl0aW5nID8/IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNhbkNyZWF0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2FuRGVsZXRlOiBjb25maWcuYWxsb3dTaGlmdEVkaXRpbmcgPz8gdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2FuQmF0Y2g6IGNvbmZpZy5hbGxvd0JhdGNoT3BlcmF0aW9ucyA/PyB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjcm9zc1RlYW1BY2Nlc3M6IGNvbmZpZy5hbGxvd0Nyb3NzVGVhbVZpZXcgPz8gZmFsc2VcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjYXNlIFwiZW5naW5lZXJcIjpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYmFzZVBlcm1pc3Npb25zLFxuICAgICAgICAgICAgICAgICAgICByZWFkT25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3Jvc3NUZWFtQWNjZXNzOiBmYWxzZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9LCBbY29uZmlnXSk7XG5cbiAgICAvLyBGaWx0ZXIgZW5naW5lZXJzIGJhc2VkIG9uIHRlYW0gYWNjZXNzXG4gICAgY29uc3QgZmlsdGVyZWRFbmdpbmVlcnMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICAgICAgaWYgKHVzZXJQZXJtaXNzaW9ucy5jcm9zc1RlYW1BY2Nlc3MgfHwgIWNvbmZpZy51c2VyVGVhbSkge1xuICAgICAgICAgICAgcmV0dXJuIGVuZ2luZWVycztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbHRlciB0byB1c2VyJ3MgdGVhbSBvbmx5XG4gICAgICAgIHJldHVybiBlbmdpbmVlcnMuZmlsdGVyKGVuZ2luZWVyID0+IGVuZ2luZWVyLmhlYWRlciA9PT0gY29uZmlnLnVzZXJUZWFtKTtcbiAgICB9LCBbZW5naW5lZXJzLCB1c2VyUGVybWlzc2lvbnMuY3Jvc3NUZWFtQWNjZXNzLCBjb25maWcudXNlclRlYW1dKTtcblxuICAgIC8vIEZpbHRlciBzaGlmdHMgYmFzZWQgb24gYWNjZXNzaWJsZSBlbmdpbmVlcnNcbiAgICBjb25zdCBmaWx0ZXJlZFNoaWZ0cyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgICAgICBjb25zdCBhY2Nlc3NpYmxlRW5naW5lZXJJZHMgPSBuZXcgU2V0KGZpbHRlcmVkRW5naW5lZXJzLm1hcChlID0+IGUuaWQpKTtcbiAgICAgICAgcmV0dXJuIHNoaWZ0cy5maWx0ZXIoc2hpZnQgPT4gYWNjZXNzaWJsZUVuZ2luZWVySWRzLmhhcyhzaGlmdC5lbmdpbmVlcklkKSk7XG4gICAgfSwgW3NoaWZ0cywgZmlsdGVyZWRFbmdpbmVlcnNdKTtcblxuICAgIC8vIFBlcm1pc3Npb24gY2hlY2sgZnVuY3Rpb25zXG4gICAgY29uc3QgY2FuVmlld1RlYW0gPSAodGVhbU5hbWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgICAgICBpZiAodXNlclBlcm1pc3Npb25zLmNyb3NzVGVhbUFjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRlYW1OYW1lID09PSBjb25maWcudXNlclRlYW07XG4gICAgfTtcblxuICAgIGNvbnN0IGNhbkVkaXRTaGlmdCA9IChzaGlmdDogU2hpZnRBc3NpZ25tZW50KTogYm9vbGVhbiA9PiB7XG4gICAgICAgIGlmICghdXNlclBlcm1pc3Npb25zLmNhbkVkaXQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIHNoaWZ0IGJlbG9uZ3MgdG8gYW4gYWNjZXNzaWJsZSBlbmdpbmVlclxuICAgICAgICBjb25zdCBlbmdpbmVlciA9IGZpbHRlcmVkRW5naW5lZXJzLmZpbmQoZSA9PiBlLmlkID09PSBzaGlmdC5lbmdpbmVlcklkKTtcbiAgICAgICAgaWYgKCFlbmdpbmVlcikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGVhbSBsZWFkZXJzIGNhbiBvbmx5IGVkaXQgc2hpZnRzIGluIHRoZWlyIHRlYW1cbiAgICAgICAgaWYgKGNvbmZpZy51c2VyUm9sZSA9PT0gXCJ0ZWFtX2xlYWRlclwiKSB7XG4gICAgICAgICAgICByZXR1cm4gZW5naW5lZXIuaGVhZGVyID09PSBjb25maWcudXNlclRlYW07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgY29uc3QgY2FuQ3JlYXRlU2hpZnQgPSAoZW5naW5lZXJJZDogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIGlmICghdXNlclBlcm1pc3Npb25zLmNhbkNyZWF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgZW5naW5lZXIgaXMgYWNjZXNzaWJsZVxuICAgICAgICBjb25zdCBlbmdpbmVlciA9IGZpbHRlcmVkRW5naW5lZXJzLmZpbmQoZSA9PiBlLmlkID09PSBlbmdpbmVlcklkKTtcbiAgICAgICAgaWYgKCFlbmdpbmVlcikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGVhbSBsZWFkZXJzIGNhbiBvbmx5IGNyZWF0ZSBzaGlmdHMgZm9yIHRoZWlyIHRlYW1cbiAgICAgICAgaWYgKGNvbmZpZy51c2VyUm9sZSA9PT0gXCJ0ZWFtX2xlYWRlclwiKSB7XG4gICAgICAgICAgICByZXR1cm4gZW5naW5lZXIuaGVhZGVyID09PSBjb25maWcudXNlclRlYW07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgY29uc3QgY2FuRGVsZXRlU2hpZnQgPSAoc2hpZnQ6IFNoaWZ0QXNzaWdubWVudCk6IGJvb2xlYW4gPT4ge1xuICAgICAgICBpZiAoIXVzZXJQZXJtaXNzaW9ucy5jYW5EZWxldGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNhbWUgbG9naWMgYXMgZWRpdFxuICAgICAgICByZXR1cm4gY2FuRWRpdFNoaWZ0KHNoaWZ0KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmlsdGVyZWRFbmdpbmVlcnMsXG4gICAgICAgIGZpbHRlcmVkU2hpZnRzLFxuICAgICAgICBjYW5FZGl0U2hpZnQsXG4gICAgICAgIGNhbkNyZWF0ZVNoaWZ0LFxuICAgICAgICBjYW5EZWxldGVTaGlmdCxcbiAgICAgICAgY2FuVmlld1RlYW0sXG4gICAgICAgIGNhblBlcmZvcm1CYXRjaE9wZXJhdGlvbnM6IHVzZXJQZXJtaXNzaW9ucy5jYW5CYXRjaCxcbiAgICAgICAgdXNlclBlcm1pc3Npb25zXG4gICAgfTtcbn07XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGRldGVybWluZSB1c2VyIHJvbGUgZnJvbSBNZW5kaXggdXNlciBjb250ZXh0XG4gKiBUaGlzIHdvdWxkIHR5cGljYWxseSBpbnRlZ3JhdGUgd2l0aCBNZW5kaXggdXNlciByb2xlcy9hdHRyaWJ1dGVzXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRVc2VyUm9sZUZyb21NZW5kaXggPSAoXG4gICAgdXNlck9iamVjdD86IGFueSwgLy8gTWVuZGl4IHVzZXIgb2JqZWN0XG4gICAgdGVhbUF0dHJpYnV0ZT86IHN0cmluZyxcbiAgICByb2xlQXR0cmlidXRlPzogc3RyaW5nXG4pOiBUZWFtQWNjZXNzQ29uZmlnID0+IHtcbiAgICAvLyBEZWZhdWx0IGNvbmZpZ3VyYXRpb24gZm9yIGVuZ2luZWVyc1xuICAgIGNvbnN0IGRlZmF1bHRDb25maWc6IFRlYW1BY2Nlc3NDb25maWcgPSB7XG4gICAgICAgIHVzZXJSb2xlOiBcImVuZ2luZWVyXCIsXG4gICAgICAgIGFsbG93Q3Jvc3NUZWFtVmlldzogZmFsc2UsXG4gICAgICAgIGFsbG93U2hpZnRFZGl0aW5nOiBmYWxzZSxcbiAgICAgICAgYWxsb3dCYXRjaE9wZXJhdGlvbnM6IGZhbHNlXG4gICAgfTtcblxuICAgIGlmICghdXNlck9iamVjdCkge1xuICAgICAgICByZXR1cm4gZGVmYXVsdENvbmZpZztcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICAvLyBFeHRyYWN0IHJvbGUgZnJvbSBNZW5kaXggdXNlciBvYmplY3RcbiAgICAgICAgY29uc3Qgcm9sZSA9IHJvbGVBdHRyaWJ1dGUgPyB1c2VyT2JqZWN0W3JvbGVBdHRyaWJ1dGVdIDogdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCB0ZWFtID0gdGVhbUF0dHJpYnV0ZSA/IHVzZXJPYmplY3RbdGVhbUF0dHJpYnV0ZV0gOiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IHVzZXJJZCA9IHVzZXJPYmplY3QuaWQgfHwgdXNlck9iamVjdC5JZDtcblxuICAgICAgICAvLyBNYXAgTWVuZGl4IHJvbGVzIHRvIG91ciByb2xlIHN5c3RlbVxuICAgICAgICBsZXQgdXNlclJvbGU6IFVzZXJSb2xlID0gXCJlbmdpbmVlclwiO1xuICAgICAgICBpZiAocm9sZSkge1xuICAgICAgICAgICAgY29uc3Qgcm9sZUxvd2VyID0gcm9sZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHJvbGVMb3dlci5pbmNsdWRlcyhcImFkbWluXCIpKSB7XG4gICAgICAgICAgICAgICAgdXNlclJvbGUgPSBcImFkbWluXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJvbGVMb3dlci5pbmNsdWRlcyhcIm1hbmFnZXJcIikpIHtcbiAgICAgICAgICAgICAgICB1c2VyUm9sZSA9IFwibWFuYWdlclwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyb2xlTG93ZXIuaW5jbHVkZXMoXCJsZWFkZXJcIikgfHwgcm9sZUxvd2VyLmluY2x1ZGVzKFwidGxcIikpIHtcbiAgICAgICAgICAgICAgICB1c2VyUm9sZSA9IFwidGVhbV9sZWFkZXJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1c2VyUm9sZSxcbiAgICAgICAgICAgIHVzZXJUZWFtOiB0ZWFtLFxuICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgYWxsb3dDcm9zc1RlYW1WaWV3OiB1c2VyUm9sZSA9PT0gXCJtYW5hZ2VyXCIgfHwgdXNlclJvbGUgPT09IFwiYWRtaW5cIixcbiAgICAgICAgICAgIGFsbG93U2hpZnRFZGl0aW5nOiB1c2VyUm9sZSAhPT0gXCJlbmdpbmVlclwiLFxuICAgICAgICAgICAgYWxsb3dCYXRjaE9wZXJhdGlvbnM6IHVzZXJSb2xlICE9PSBcImVuZ2luZWVyXCJcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJFcnJvciBkZXRlcm1pbmluZyB1c2VyIHJvbGUgZnJvbSBNZW5kaXg6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRDb25maWc7XG4gICAgfVxufTtcbiIsImltcG9ydCBSZWFjdCwgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBWYWxpZGF0aW9uRXJyb3IgfSBmcm9tIFwiLi4vdHlwZXMvc2hpZnRTY2hlZHVsZXJcIjtcblxuZXhwb3J0IGludGVyZmFjZSBMb2FkaW5nU3RhdGVzUHJvcHMge1xuICAgIGNsYXNzTmFtZT86IHN0cmluZztcbiAgICBzdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXM7XG4gICAgdGFiSW5kZXg/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXJyb3JTdGF0ZVByb3BzIGV4dGVuZHMgTG9hZGluZ1N0YXRlc1Byb3BzIHtcbiAgICBlcnJvcjogVmFsaWRhdGlvbkVycm9yO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVtcHR5U3RhdGVQcm9wcyBleHRlbmRzIExvYWRpbmdTdGF0ZXNQcm9wcyB7XG4gICAgbWVzc2FnZT86IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcbn1cblxuLyoqXG4gKiBMb2FkaW5nIHNwaW5uZXIgY29tcG9uZW50IGZvciBkYXRhIGxvYWRpbmcgc3RhdGVzXG4gKi9cbmV4cG9ydCBjb25zdCBMb2FkaW5nU3RhdGU6IFJlYWN0LkZDPExvYWRpbmdTdGF0ZXNQcm9wcz4gPSAoeyBjbGFzc05hbWUgPSBcIlwiLCBzdHlsZSwgdGFiSW5kZXggfSkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtgc2hpZnQtc2NoZWR1bGVyICR7Y2xhc3NOYW1lfWB9IHN0eWxlPXtzdHlsZX0gdGFiSW5kZXg9e3RhYkluZGV4fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaGlmdC1zY2hlZHVsZXItbG9hZGluZ1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2FkaW5nLXNwaW5uZXJcIj48L2Rpdj5cbiAgICAgICAgICAgIDxwPkxvYWRpbmcgc2NoZWR1bGUgZGF0YS4uLjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4pO1xuXG4vKipcbiAqIEVycm9yIHN0YXRlIGNvbXBvbmVudCB3aXRoIGRldGFpbGVkIGVycm9yIGluZm9ybWF0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBFcnJvclN0YXRlOiBSZWFjdC5GQzxFcnJvclN0YXRlUHJvcHM+ID0gKHsgZXJyb3IsIGNsYXNzTmFtZSA9IFwiXCIsIHN0eWxlLCB0YWJJbmRleCB9KSA9PiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2BzaGlmdC1zY2hlZHVsZXIgJHtjbGFzc05hbWV9YH0gc3R5bGU9e3N0eWxlfSB0YWJJbmRleD17dGFiSW5kZXh9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNoaWZ0LXNjaGVkdWxlci1lcnJvclwiPlxuICAgICAgICAgICAgPGgzPuKaoO+4jyBDb25maWd1cmF0aW9uIEVycm9yPC9oMz5cbiAgICAgICAgICAgIDxwPntlcnJvci5tZXNzYWdlfTwvcD5cbiAgICAgICAgICAgIHtlcnJvci5wcm9wZXJ0eSAmJiAoXG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIDxzbWFsbD5DaGVjayB0aGUge2Vycm9yLnByb3BlcnR5fSBwcm9wZXJ0eSBpbiB0aGUgd2lkZ2V0IGNvbmZpZ3VyYXRpb24uPC9zbWFsbD5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPGRldGFpbHMgY2xhc3NOYW1lPVwiZXJyb3ItZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgIDxzdW1tYXJ5PlRlY2huaWNhbCBEZXRhaWxzPC9zdW1tYXJ5PlxuICAgICAgICAgICAgICAgIDxwcmU+e0pTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKX08L3ByZT5cbiAgICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4pO1xuXG4vKipcbiAqIEVtcHR5IHN0YXRlIGNvbXBvbmVudCB3aGVuIG5vIGRhdGEgaXMgYXZhaWxhYmxlXG4gKi9cbmV4cG9ydCBjb25zdCBFbXB0eVN0YXRlOiBSZWFjdC5GQzxFbXB0eVN0YXRlUHJvcHM+ID0gKHtcbiAgICBtZXNzYWdlID0gXCJObyBEYXRhIEF2YWlsYWJsZVwiLFxuICAgIGRlc2NyaXB0aW9uID0gXCJObyBlbmdpbmVlcnMgZm91bmQuIFBsZWFzZSBjaGVjayB5b3VyIGRhdGEgc291cmNlIGNvbmZpZ3VyYXRpb24uXCIsXG4gICAgY2xhc3NOYW1lID0gXCJcIixcbiAgICBzdHlsZSxcbiAgICB0YWJJbmRleFxufSkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtgc2hpZnQtc2NoZWR1bGVyICR7Y2xhc3NOYW1lfWB9IHN0eWxlPXtzdHlsZX0gdGFiSW5kZXg9e3RhYkluZGV4fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaGlmdC1zY2hlZHVsZXItZW1wdHlcIj5cbiAgICAgICAgICAgIDxoMz7wn5OFIHttZXNzYWdlfTwvaDM+XG4gICAgICAgICAgICA8cD57ZGVzY3JpcHRpb259PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbik7XG5cbi8qKlxuICogRmFsbGJhY2sgZXJyb3IgYm91bmRhcnkgY29tcG9uZW50IGZvciB1bmV4cGVjdGVkIGVycm9yc1xuICovXG5pbnRlcmZhY2UgRXJyb3JCb3VuZGFyeVN0YXRlIHtcbiAgICBoYXNFcnJvcjogYm9vbGVhbjtcbiAgICBlcnJvcj86IEVycm9yO1xuICAgIGVycm9ySW5mbz86IFJlYWN0LkVycm9ySW5mbztcbn1cblxuZXhwb3J0IGNsYXNzIFNjaGVkdWxlckVycm9yQm91bmRhcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8XG4gICAgUmVhY3QuUHJvcHNXaXRoQ2hpbGRyZW48TG9hZGluZ1N0YXRlc1Byb3BzPixcbiAgICBFcnJvckJvdW5kYXJ5U3RhdGVcbj4ge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBSZWFjdC5Qcm9wc1dpdGhDaGlsZHJlbjxMb2FkaW5nU3RhdGVzUHJvcHM+KSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgaGFzRXJyb3I6IGZhbHNlIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkQ2F0Y2goZXJyb3I6IEVycm9yLCBlcnJvckluZm86IFJlYWN0LkVycm9ySW5mbyk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiU2hpZnQgU2NoZWR1bGVyIEVycm9yIEJvdW5kYXJ5IGNhdWdodCBhbiBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgSW5mbzpcIiwgZXJyb3JJbmZvKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGhhc0Vycm9yOiB0cnVlLFxuICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICBlcnJvckluZm9cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmhhc0Vycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgc2hpZnQtc2NoZWR1bGVyICR7dGhpcy5wcm9wcy5jbGFzc05hbWUgfHwgXCJcIn1gfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RoaXMucHJvcHMudGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNoaWZ0LXNjaGVkdWxlci1lcnJvci1ib3VuZGFyeVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzPvCfm6DvuI8gU29tZXRoaW5nIHdlbnQgd3Jvbmc8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+VGhlIFNoaWZ0IFNjaGVkdWxlciBlbmNvdW50ZXJlZCBhbiB1bmV4cGVjdGVkIGVycm9yLjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkZXRhaWxzIGNsYXNzTmFtZT1cImVycm9yLWJvdW5kYXJ5LWRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3VtbWFyeT5FcnJvciBEZXRhaWxzPC9zdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoND5FcnJvcjo8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwcmU+e3RoaXMuc3RhdGUuZXJyb3I/LnRvU3RyaW5nKCl9PC9wcmU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZXJyb3JJbmZvICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoND5Db21wb25lbnQgU3RhY2s6PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwcmU+e3RoaXMuc3RhdGUuZXJyb3JJbmZvLmNvbXBvbmVudFN0YWNrfTwvcHJlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBoYXNFcnJvcjogZmFsc2UsIGVycm9yOiB1bmRlZmluZWQsIGVycm9ySW5mbzogdW5kZWZpbmVkIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImVycm9yLWJvdW5kYXJ5LXJldHJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUcnkgQWdhaW5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yKGVycm9yOiBFcnJvcik6IEVycm9yQm91bmRhcnlTdGF0ZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoYXNFcnJvcjogdHJ1ZSxcbiAgICAgICAgICAgIGVycm9yXG4gICAgICAgIH07XG4gICAgfVxufVxuXG4vKipcbiAqIEhpZ2hlci1vcmRlciBjb21wb25lbnQgdG8gd3JhcCBhbnkgY29tcG9uZW50IHdpdGggZXJyb3IgYm91bmRhcnlcbiAqL1xuZXhwb3J0IGNvbnN0IHdpdGhFcnJvckJvdW5kYXJ5ID0gPFAgZXh0ZW5kcyBvYmplY3Q+KFxuICAgIENvbXBvbmVudDogUmVhY3QuQ29tcG9uZW50VHlwZTxQPlxuKTogUmVhY3QuRkM8UCAmIExvYWRpbmdTdGF0ZXNQcm9wcz4gPT4ge1xuICAgIGNvbnN0IFdyYXBwZWRDb21wb25lbnQ6IFJlYWN0LkZDPFAgJiBMb2FkaW5nU3RhdGVzUHJvcHM+ID0gcHJvcHMgPT4gKFxuICAgICAgICA8U2NoZWR1bGVyRXJyb3JCb3VuZGFyeSBjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX0gc3R5bGU9e3Byb3BzLnN0eWxlfSB0YWJJbmRleD17cHJvcHMudGFiSW5kZXh9PlxuICAgICAgICAgICAgPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+XG4gICAgICAgIDwvU2NoZWR1bGVyRXJyb3JCb3VuZGFyeT5cbiAgICApO1xuXG4gICAgV3JhcHBlZENvbXBvbmVudC5kaXNwbGF5TmFtZSA9IGB3aXRoRXJyb3JCb3VuZGFyeSgke0NvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZX0pYDtcbiAgICByZXR1cm4gV3JhcHBlZENvbXBvbmVudDtcbn07XG4iLCJpbXBvcnQgeyBTaGlmdEFzc2lnbm1lbnQgfSBmcm9tIFwiLi4vdHlwZXMvc2hpZnRTY2hlZHVsZXJcIjtcblxuLy8gU2hpZnQgY29sb3IgbWFwcGluZ3NcbmV4cG9ydCBjb25zdCBTSElGVF9DT0xPUlMgPSB7XG4gICAgTTogXCIjMjE5NkYzXCIsIC8vIE1vcm5pbmcgLSBCbHVlXG4gICAgRTogXCIjNENBRjUwXCIsIC8vIEV2ZW5pbmcgLSBHcmVlblxuICAgIE46IFwiI0ZGOTgwMFwiLCAvLyBOaWdodCAtIE9yYW5nZVxuICAgIEQ6IFwiI0Y0NDMzNlwiLCAvLyBEYXkgb2ZmIC0gUmVkXG4gICAgSDogXCIjOUU5RTlFXCIsIC8vIEhvbGlkYXkgLSBHcmF5XG4gICAgVDogXCIjRkZFQjNCXCIgLy8gVHJhaW5pbmcgLSBZZWxsb3dcbn0gYXMgY29uc3Q7XG5cbi8vIFJvbGUgaW5kaWNhdG9yc1xuZXhwb3J0IGNvbnN0IFJPTEVfU1RZTEVTID0ge1xuICAgIFRMOiBcInNvbGlkXCIsIC8vIFRlYW0gTGVhZGVyIC0gc29saWQgYm9yZGVyXG4gICAgQlRMOiBcImRhc2hlZFwiLCAvLyBCYWNrdXAgVGVhbSBMZWFkZXIgLSBkYXNoZWQgYm9yZGVyXG4gICAgU1BFOiBcImRvdHRlZFwiLCAvLyBTcGVjaWFsaXN0IC0gZG90dGVkIGJvcmRlclxuICAgIE9TSTogXCJkb3VibGVcIiAvLyBPdGhlciAtIGRvdWJsZSBib3JkZXJcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFNoaWZ0VHlwZSA9IGtleW9mIHR5cGVvZiBTSElGVF9DT0xPUlM7XG5leHBvcnQgdHlwZSBSb2xlVHlwZSA9IGtleW9mIHR5cGVvZiBST0xFX1NUWUxFUztcblxuLyoqXG4gKiBHZXQgdGhlIGNvbG9yIGZvciBhIHNoaWZ0IHR5cGVcbiAqL1xuZXhwb3J0IGNvbnN0IGdldFNoaWZ0Q29sb3IgPSAoc2hpZnRUeXBlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBTSElGVF9DT0xPUlNbc2hpZnRUeXBlIGFzIFNoaWZ0VHlwZV0gfHwgXCIjNjA3RDhCXCI7IC8vIERlZmF1bHQgZ3JheS1ibHVlXG59O1xuXG4vKipcbiAqIEdldCB0aGUgYm9yZGVyIHN0eWxlIGZvciBhIHJvbGVcbiAqL1xuZXhwb3J0IGNvbnN0IGdldFJvbGVCb3JkZXJTdHlsZSA9IChyb2xlPzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBpZiAoIXJvbGUpIHtcbiAgICAgICAgcmV0dXJuIFwic29saWRcIjtcbiAgICB9XG4gICAgcmV0dXJuIFJPTEVfU1RZTEVTW3JvbGUgYXMgUm9sZVR5cGVdIHx8IFwic29saWRcIjtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBzaGlmdCBpcyBhIHdvcmtpbmcgc2hpZnQgKG5vdCBkYXkgb2ZmIG9yIGhvbGlkYXkpXG4gKi9cbmV4cG9ydCBjb25zdCBpc1dvcmtpbmdTaGlmdCA9IChzaGlmdFR5cGU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiAhW1wiRFwiLCBcIkhcIl0uaW5jbHVkZXMoc2hpZnRUeXBlKTtcbn07XG5cbi8qKlxuICogR2V0IHNoaWZ0IGRpc3BsYXkgbmFtZVxuICovXG5leHBvcnQgY29uc3QgZ2V0U2hpZnREaXNwbGF5TmFtZSA9IChzaGlmdFR5cGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgbmFtZXMgPSB7XG4gICAgICAgIE06IFwiTW9ybmluZ1wiLFxuICAgICAgICBFOiBcIkV2ZW5pbmdcIixcbiAgICAgICAgTjogXCJOaWdodFwiLFxuICAgICAgICBEOiBcIkRheSBPZmZcIixcbiAgICAgICAgSDogXCJIb2xpZGF5XCIsXG4gICAgICAgIFQ6IFwiVHJhaW5pbmdcIlxuICAgIH07XG4gICAgcmV0dXJuIG5hbWVzW3NoaWZ0VHlwZSBhcyBTaGlmdFR5cGVdIHx8IHNoaWZ0VHlwZTtcbn07XG5cbi8qKlxuICogR2V0IHNob3J0IGRpc3BsYXkgdGV4dCBmb3IgYSBzaGlmdCAodXNlZCBpbiBkYXkgY2VsbHMpXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRTaGlmdERpc3BsYXlUZXh0ID0gKHNoaWZ0VHlwZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gc2hpZnRUeXBlIHx8IFwiP1wiO1xufTtcblxuLyoqXG4gKiBWYWxpZGF0ZSBzaGlmdCBhc3NpZ25tZW50IHJ1bGVzXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVNoaWZ0QXNzaWdubWVudCA9IChcbiAgICBhc3NpZ25tZW50OiBQYXJ0aWFsPFNoaWZ0QXNzaWdubWVudD4sXG4gICAgZXhpc3RpbmdTaGlmdHM6IFNoaWZ0QXNzaWdubWVudFtdXG4pOiB7IGlzVmFsaWQ6IGJvb2xlYW47IGVycm9yczogc3RyaW5nW10gfSA9PiB7XG4gICAgY29uc3QgZXJyb3JzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgLy8gQ2hlY2sgZm9yIG92ZXJsYXBwaW5nIHNoaWZ0cyBvbiBzYW1lIGRhdGVcbiAgICBjb25zdCBzYW1lRGF0ZSA9IGV4aXN0aW5nU2hpZnRzLmZpbHRlcihcbiAgICAgICAgcyA9PiBzLmRhdGUgPT09IGFzc2lnbm1lbnQuZGF0ZSAmJiBzLmVuZ2luZWVySWQgPT09IGFzc2lnbm1lbnQuZW5naW5lZXJJZCAmJiBzLmlkICE9PSBhc3NpZ25tZW50LmlkXG4gICAgKTtcblxuICAgIGlmIChzYW1lRGF0ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGVycm9ycy5wdXNoKFwiRW5naW5lZXIgYWxyZWFkeSBoYXMgYSBzaGlmdCBhc3NpZ25lZCBmb3IgdGhpcyBkYXRlXCIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIG5pZ2h0IHNoaWZ0IGZvbGxvd2VkIGJ5IG1vcm5pbmcgc2hpZnQgKGluc3VmZmljaWVudCByZXN0KVxuICAgIGlmIChhc3NpZ25tZW50LnNoaWZ0ID09PSBcIk1cIikge1xuICAgICAgICBjb25zdCBwcmV2aW91c0RheSA9IG5ldyBEYXRlKGFzc2lnbm1lbnQuZGF0ZSEpO1xuICAgICAgICBwcmV2aW91c0RheS5zZXREYXRlKHByZXZpb3VzRGF5LmdldERhdGUoKSAtIDEpO1xuICAgICAgICBjb25zdCBwcmV2RGF5U3RyaW5nID0gcHJldmlvdXNEYXkudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF07XG5cbiAgICAgICAgY29uc3QgcHJldk5pZ2h0U2hpZnQgPSBleGlzdGluZ1NoaWZ0cy5maW5kKFxuICAgICAgICAgICAgcyA9PiBzLmRhdGUgPT09IHByZXZEYXlTdHJpbmcgJiYgcy5lbmdpbmVlcklkID09PSBhc3NpZ25tZW50LmVuZ2luZWVySWQgJiYgcy5zaGlmdCA9PT0gXCJOXCJcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAocHJldk5pZ2h0U2hpZnQpIHtcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKFwiSW5zdWZmaWNpZW50IHJlc3Q6IE5pZ2h0IHNoaWZ0IGZvbGxvd2VkIGJ5IE1vcm5pbmcgc2hpZnRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpc1ZhbGlkOiBlcnJvcnMubGVuZ3RoID09PSAwLFxuICAgICAgICBlcnJvcnNcbiAgICB9O1xufTtcblxuLyoqXG4gKiBHZXQgc2hpZnQgc3RhdGlzdGljcyBmb3IgYW4gZW5naW5lZXIgb3ZlciBhIGRhdGUgcmFuZ2VcbiAqL1xuZXhwb3J0IGNvbnN0IGdldFNoaWZ0U3RhdHMgPSAoXG4gICAgZW5naW5lZXJJZDogc3RyaW5nLFxuICAgIHNoaWZ0czogU2hpZnRBc3NpZ25tZW50W10sXG4gICAgc3RhcnREYXRlOiBzdHJpbmcsXG4gICAgZW5kRGF0ZTogc3RyaW5nXG4pOiB7XG4gICAgdG90YWw6IG51bWJlcjtcbiAgICBtb3JuaW5nOiBudW1iZXI7XG4gICAgZXZlbmluZzogbnVtYmVyO1xuICAgIG5pZ2h0OiBudW1iZXI7XG4gICAgZGF5T2ZmOiBudW1iZXI7XG4gICAgaG9saWRheTogbnVtYmVyO1xuICAgIHRyYWluaW5nOiBudW1iZXI7XG59ID0+IHtcbiAgICBjb25zdCBlbmdpbmVlclNoaWZ0cyA9IHNoaWZ0cy5maWx0ZXIocyA9PiBzLmVuZ2luZWVySWQgPT09IGVuZ2luZWVySWQgJiYgcy5kYXRlID49IHN0YXJ0RGF0ZSAmJiBzLmRhdGUgPD0gZW5kRGF0ZSk7XG5cbiAgICBjb25zdCBzdGF0cyA9IHtcbiAgICAgICAgdG90YWw6IGVuZ2luZWVyU2hpZnRzLmxlbmd0aCxcbiAgICAgICAgbW9ybmluZzogMCxcbiAgICAgICAgZXZlbmluZzogMCxcbiAgICAgICAgbmlnaHQ6IDAsXG4gICAgICAgIGRheU9mZjogMCxcbiAgICAgICAgaG9saWRheTogMCxcbiAgICAgICAgdHJhaW5pbmc6IDBcbiAgICB9O1xuXG4gICAgZW5naW5lZXJTaGlmdHMuZm9yRWFjaChzaGlmdCA9PiB7XG4gICAgICAgIHN3aXRjaCAoc2hpZnQuc2hpZnQpIHtcbiAgICAgICAgICAgIGNhc2UgXCJNXCI6XG4gICAgICAgICAgICAgICAgc3RhdHMubW9ybmluZysrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkVcIjpcbiAgICAgICAgICAgICAgICBzdGF0cy5ldmVuaW5nKys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTlwiOlxuICAgICAgICAgICAgICAgIHN0YXRzLm5pZ2h0Kys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRFwiOlxuICAgICAgICAgICAgICAgIHN0YXRzLmRheU9mZisrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkhcIjpcbiAgICAgICAgICAgICAgICBzdGF0cy5ob2xpZGF5Kys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiVFwiOlxuICAgICAgICAgICAgICAgIHN0YXRzLnRyYWluaW5nKys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBzdGF0cztcbn07XG5cbi8qKlxuICogR2VuZXJhdGUgQ1NTIGNsYXNzIG5hbWVzIGZvciBhIHNoaWZ0IGNlbGxcbiAqL1xuZXhwb3J0IGNvbnN0IGdldFNoaWZ0Q1NTQ2xhc3NlcyA9IChzaGlmdD86IFNoaWZ0QXNzaWdubWVudCk6IHN0cmluZyA9PiB7XG4gICAgaWYgKCFzaGlmdCkge1xuICAgICAgICByZXR1cm4gXCJkYXktY2VsbCBlbXB0eVwiO1xuICAgIH1cblxuICAgIGNvbnN0IGNsYXNzZXMgPSBbXCJkYXktY2VsbFwiLCBcImhhcy1zaGlmdFwiXTtcblxuICAgIC8vIEFkZCBzaGlmdCB0eXBlIGNsYXNzXG4gICAgY2xhc3Nlcy5wdXNoKGBzaGlmdC0ke3NoaWZ0LnNoaWZ0Py50b0xvd2VyQ2FzZSgpIHx8IFwidW5rbm93blwifWApO1xuXG4gICAgLy8gQWRkIHN0YXR1cyBjbGFzc1xuICAgIGlmIChzaGlmdC5zdGF0dXMpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKGBzdGF0dXMtJHtzaGlmdC5zdGF0dXMudG9Mb3dlckNhc2UoKX1gKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgZXZlbnQgdHlwZSBjbGFzc1xuICAgIGlmIChzaGlmdC5ldmVudFR5cGUpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKGBldmVudC0ke3NoaWZ0LmV2ZW50VHlwZS50b0xvd2VyQ2FzZSgpfWApO1xuICAgIH1cblxuICAgIHJldHVybiBjbGFzc2VzLmpvaW4oXCIgXCIpO1xufTtcbiIsImltcG9ydCBSZWFjdCwgeyBjcmVhdGVFbGVtZW50LCBNb3VzZUV2ZW50LCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBEYXlDZWxsUHJvcHMgfSBmcm9tIFwiLi4vdHlwZXMvc2hpZnRTY2hlZHVsZXJcIjtcbmltcG9ydCB7IGdldFNoaWZ0Q29sb3IsIGdldFNoaWZ0RGlzcGxheVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvc2hpZnRIZWxwZXJzXCI7XG5cbmNvbnN0IERheUNlbGw6IFJlYWN0LkZDPERheUNlbGxQcm9wcz4gPSAoe1xuICAgIGRhdGUsXG4gICAgZW5naW5lZXIsXG4gICAgc2hpZnQsXG4gICAgaXNUb2RheSA9IGZhbHNlLFxuICAgIGlzV2Vla2VuZCA9IGZhbHNlLFxuICAgIGlzU2VsZWN0ZWQgPSBmYWxzZSxcbiAgICBzaGlmdHNMb2FkaW5nID0gZmFsc2UsXG4gICAgb25Eb3VibGVDbGljayxcbiAgICBvbkNlbGxDbGljayxcbiAgICBvbkNvbnRleHRNZW51LFxuICAgIHJlYWRPbmx5ID0gZmFsc2Vcbn0pID0+IHtcbiAgICAvLyBNZW1vaXplIGNlbGwgc3R5bGluZyBhbmQgY29udGVudCBmb3IgcGVyZm9ybWFuY2VcbiAgICBjb25zdCBjZWxsRGF0YSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgICAgICBjb25zdCBkYXlOdW1iZXIgPSBkYXRlLmdldERhdGUoKTtcbiAgICAgICAgY29uc3Qgc2hpZnRDb2xvciA9IHNoaWZ0ID8gZ2V0U2hpZnRDb2xvcihzaGlmdC5zaGlmdCkgOiBudWxsO1xuICAgICAgICBjb25zdCBzaGlmdFRleHQgPSBzaGlmdCA/IGdldFNoaWZ0RGlzcGxheVRleHQoc2hpZnQuc2hpZnQpIDogbnVsbDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF5TnVtYmVyLFxuICAgICAgICAgICAgc2hpZnRDb2xvcixcbiAgICAgICAgICAgIHNoaWZ0VGV4dCxcbiAgICAgICAgICAgIGhhc1NoaWZ0OiAhIXNoaWZ0LFxuICAgICAgICAgICAgaXNFcnJvcjogc2hpZnQ/LnN0YXR1cyA9PT0gXCJlcnJvclwiXG4gICAgICAgIH07XG4gICAgfSwgW2RhdGUsIHNoaWZ0XSk7XG5cbiAgICBjb25zdCBoYW5kbGVDb250ZXh0ID0gKGU6IE1vdXNlRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KTogdm9pZCA9PiB7XG4gICAgICAgIGlmIChyZWFkT25seSB8fCAhb25Db250ZXh0TWVudSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBkYXRlLnRvSVNPU3RyaW5nKCkuc3BsaXQoXCJUXCIpWzBdO1xuICAgICAgICBvbkNvbnRleHRNZW51KGUsIGVuZ2luZWVyLCBkYXRlU3RyaW5nLCBzaGlmdCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZURvdWJsZUNsaWNrID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAocmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgb25Eb3VibGVDbGljaygpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgaW4gRGF5Q2VsbCBvbkRvdWJsZUNsaWNrIGZvciAke2VuZ2luZWVyLm5hbWV9IG9uICR7ZGF0ZS50b0RhdGVTdHJpbmcoKX06YCwgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZUNsaWNrID0gKGU6IE1vdXNlRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KTogdm9pZCA9PiB7XG4gICAgICAgIC8vIFByZXZlbnQgdGV4dCBzZWxlY3Rpb24gd2hlbiB1c2luZyBTaGlmdCtjbGljayBmb3IgcmFuZ2Ugc2VsZWN0aW9uXG4gICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgb25DZWxsQ2xpY2soZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBpbiBEYXlDZWxsIG9uQ2xpY2sgZm9yICR7ZW5naW5lZXIubmFtZX0gb24gJHtkYXRlLnRvRGF0ZVN0cmluZygpfTpgLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VEb3duID0gKGU6IE1vdXNlRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KTogdm9pZCA9PiB7XG4gICAgICAgIC8vIFByZXZlbnQgdGV4dCBzZWxlY3Rpb24gb24gbW91c2Vkb3duIGZvciBhbGwgbW9kaWZpZXIga2V5IGNvbWJpbmF0aW9uc1xuICAgICAgICBpZiAoZS5zaGlmdEtleSB8fCBlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gQnVpbGQgQ1NTIGNsYXNzZXNcbiAgICBjb25zdCBjZWxsQ2xhc3NlcyA9IFtcbiAgICAgICAgXCJkYXktY2VsbFwiLFxuICAgICAgICBpc1RvZGF5ICYmIFwiZGF5LWNlbGwtdG9kYXlcIixcbiAgICAgICAgaXNXZWVrZW5kICYmIFwiZGF5LWNlbGwtd2Vla2VuZFwiLFxuICAgICAgICBpc1NlbGVjdGVkICYmIFwiZGF5LWNlbGwtc2VsZWN0ZWRcIixcbiAgICAgICAgY2VsbERhdGEuaGFzU2hpZnQgJiYgXCJkYXktY2VsbC1oYXMtc2hpZnRcIixcbiAgICAgICAgY2VsbERhdGEuaXNFcnJvciAmJiBcImRheS1jZWxsLWVycm9yXCIsXG4gICAgICAgIHJlYWRPbmx5ICYmIFwiZGF5LWNlbGwtcmVhZG9ubHlcIlxuICAgIF1cbiAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAuam9pbihcIiBcIik7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NlbGxDbGFzc2VzfVxuICAgICAgICAgICAgb25Eb3VibGVDbGljaz17aGFuZGxlRG91YmxlQ2xpY2t9XG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDbGlja31cbiAgICAgICAgICAgIG9uTW91c2VEb3duPXtoYW5kbGVNb3VzZURvd259XG4gICAgICAgICAgICBvbkNvbnRleHRNZW51PXtoYW5kbGVDb250ZXh0fVxuICAgICAgICAgICAgdGl0bGU9e2Ake2VuZ2luZWVyLm5hbWV9IC0gJHtkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygpfSR7XG4gICAgICAgICAgICAgICAgc2hpZnQgPyBgICgke3NoaWZ0LnNoaWZ0fSR7c2hpZnQuc3RhdHVzID8gYCAtICR7c2hpZnQuc3RhdHVzfWAgOiBcIlwifSlgIDogXCIgLSBObyBzaGlmdFwiXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBjZWxsRGF0YS5zaGlmdENvbG9yIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBjdXJzb3I6IHJlYWRPbmx5ID8gXCJkZWZhdWx0XCIgOiBcInBvaW50ZXJcIlxuICAgICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXktbnVtYmVyXCI+e2NlbGxEYXRhLmRheU51bWJlcn08L2Rpdj5cbiAgICAgICAgICAgIHtjZWxsRGF0YS5oYXNTaGlmdCA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNoaWZ0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic2hpZnQtdGV4dFwiPntjZWxsRGF0YS5zaGlmdFRleHR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICB7c2hpZnQ/LnN0YXR1cyA9PT0gXCJlcnJvclwiICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNoaWZ0LWVycm9yLWluZGljYXRvclwiIHRpdGxlPVwiRXJyb3IgbG9hZGluZyBzaGlmdCBkYXRhXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg4pqg77iPXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogc2hpZnRzTG9hZGluZyA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRheS1jZWxsLWxvYWRpbmdcIiB0aXRsZT1cIkxvYWRpbmcgc2hpZnRzLi4uXCI+XG4gICAgICAgICAgICAgICAgICAgIC4uLlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRheS1jZWxsLWVtcHR5XCIgdGl0bGU9XCJObyBzaGlmdFwiPlxuICAgICAgICAgICAgICAgICAgICAtXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGF5Q2VsbDtcbiIsImltcG9ydCBSZWFjdCwgeyBjcmVhdGVFbGVtZW50LCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgRW5naW5lZXIsIFNoaWZ0QXNzaWdubWVudCB9IGZyb20gXCIuLi90eXBlcy9zaGlmdFNjaGVkdWxlclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbnRleHRNZW51T3B0aW9uIHtcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGljb24/OiBzdHJpbmc7XG4gICAgYWN0aW9uOiAoKSA9PiB2b2lkO1xuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgICBzZXBhcmF0b3I/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbnRleHRNZW51UHJvcHMge1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG4gICAgb3B0aW9uczogQ29udGV4dE1lbnVPcHRpb25bXTtcbiAgICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xuICAgIHZpc2libGU6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjb25zdCBDb250ZXh0TWVudTogUmVhY3QuRkM8Q29udGV4dE1lbnVQcm9wcz4gPSAoeyB4LCB5LCBvcHRpb25zLCBvbkNsb3NlLCB2aXNpYmxlIH0pID0+IHtcbiAgICBjb25zdCBtZW51UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZUNsaWNrT3V0c2lkZSA9IChldmVudDogTW91c2VFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgaWYgKG1lbnVSZWYuY3VycmVudCAmJiAhbWVudVJlZi5jdXJyZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBOb2RlKSkge1xuICAgICAgICAgICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBoYW5kbGVFc2NhcGUgPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgICAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlQ2xpY2tPdXRzaWRlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUVzY2FwZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVDbGlja091dHNpZGUpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlRXNjYXBlKTtcbiAgICAgICAgfTtcbiAgICB9LCBbdmlzaWJsZSwgb25DbG9zZV0pO1xuXG4gICAgaWYgKCF2aXNpYmxlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIHJlZj17bWVudVJlZn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImNvbnRleHQtbWVudVwiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gICAgICAgICAgICAgICAgbGVmdDogeCxcbiAgICAgICAgICAgICAgICB0b3A6IHksXG4gICAgICAgICAgICAgICAgekluZGV4OiAxMDAwXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25DbGljaz17ZSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfVxuICAgICAgICA+XG4gICAgICAgICAgICB7b3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+XG4gICAgICAgICAgICAgICAgb3B0aW9uLnNlcGFyYXRvciA/IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2luZGV4fSBjbGFzc05hbWU9XCJjb250ZXh0LW1lbnUtc2VwYXJhdG9yXCIgLz5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgY29udGV4dC1tZW51LWl0ZW0gJHtvcHRpb24uZGlzYWJsZWQgPyBcImRpc2FibGVkXCIgOiBcIlwifWB9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRpb24uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmFjdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge29wdGlvbi5pY29uICYmIDxzcGFuIGNsYXNzTmFtZT1cImNvbnRleHQtbWVudS1pY29uXCI+e29wdGlvbi5pY29ufTwvc3Bhbj59XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjb250ZXh0LW1lbnUtbGFiZWxcIj57b3B0aW9uLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5cbi8vIENvbnRleHQgbWVudSBmYWN0b3J5IGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUVtcHR5Q2VsbE1lbnUgPSAoXG4gICAgZW5naW5lZXI6IEVuZ2luZWVyLFxuICAgIGRhdGU6IHN0cmluZyxcbiAgICBvbkNyZWF0ZVNoaWZ0OiAoZW5naW5lZXJJZDogc3RyaW5nLCBkYXRlOiBzdHJpbmcpID0+IHZvaWRcbik6IENvbnRleHRNZW51T3B0aW9uW10gPT4gW1xuICAgIHtcbiAgICAgICAgbGFiZWw6IGBDcmVhdGUgc2hpZnQgZm9yICR7ZW5naW5lZXIubmFtZX1gLFxuICAgICAgICBpY29uOiBcIuKelVwiLFxuICAgICAgICBhY3Rpb246ICgpID0+IG9uQ3JlYXRlU2hpZnQoZW5naW5lZXIuaWQsIGRhdGUpXG4gICAgfVxuXTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV4aXN0aW5nU2hpZnRNZW51ID0gKFxuICAgIHNoaWZ0OiBTaGlmdEFzc2lnbm1lbnQsXG4gICAgZW5naW5lZXI6IEVuZ2luZWVyLFxuICAgIG9uRWRpdFNoaWZ0OiAoc2hpZnQ6IFNoaWZ0QXNzaWdubWVudCkgPT4gdm9pZCxcbiAgICBvbkRlbGV0ZVNoaWZ0OiAoc2hpZnQ6IFNoaWZ0QXNzaWdubWVudCkgPT4gdm9pZFxuKTogQ29udGV4dE1lbnVPcHRpb25bXSA9PiBbXG4gICAge1xuICAgICAgICBsYWJlbDogYCR7ZW5naW5lZXIubmFtZX0gLSAke3NoaWZ0LmRhdGV9YCxcbiAgICAgICAgaWNvbjogXCLwn5OFXCIsXG4gICAgICAgIGFjdGlvbjogKCkgPT4ge30sIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWZ1bmN0aW9uXG4gICAgICAgIGRpc2FibGVkOiB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGxhYmVsOiBgJHtzaGlmdC5zaGlmdH0gU2hpZnRgLFxuICAgICAgICBpY29uOiBnZXRTaGlmdEljb24oc2hpZnQuc2hpZnQpLFxuICAgICAgICBhY3Rpb246ICgpID0+IHt9LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvblxuICAgICAgICBkaXNhYmxlZDogdHJ1ZVxuICAgIH0sXG4gICAgeyBzZXBhcmF0b3I6IHRydWUgfSBhcyBDb250ZXh0TWVudU9wdGlvbixcbiAgICB7XG4gICAgICAgIGxhYmVsOiBcIkVkaXQgU2hpZnRcIixcbiAgICAgICAgaWNvbjogXCLinI/vuI9cIixcbiAgICAgICAgYWN0aW9uOiAoKSA9PiBvbkVkaXRTaGlmdChzaGlmdClcbiAgICB9LFxuICAgIHsgc2VwYXJhdG9yOiB0cnVlIH0gYXMgQ29udGV4dE1lbnVPcHRpb24sXG4gICAge1xuICAgICAgICBsYWJlbDogXCJEZWxldGUgU2hpZnRcIixcbiAgICAgICAgaWNvbjogXCLwn5eR77iPXCIsXG4gICAgICAgIGFjdGlvbjogKCkgPT4gb25EZWxldGVTaGlmdChzaGlmdClcbiAgICB9XG5dO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTXVsdGlTZWxlY3RNZW51ID0gKFxuICAgIHNlbGVjdGVkQ291bnQ6IG51bWJlcixcbiAgICBvbkJhdGNoQ3JlYXRlOiAoKSA9PiB2b2lkLFxuICAgIG9uQmF0Y2hFZGl0OiAoKSA9PiB2b2lkLFxuICAgIG9uQmF0Y2hEZWxldGU6ICgpID0+IHZvaWQsXG4gICAgb25DbGVhclNlbGVjdGlvbjogKCkgPT4gdm9pZFxuKTogQ29udGV4dE1lbnVPcHRpb25bXSA9PiBbXG4gICAge1xuICAgICAgICBsYWJlbDogYCR7c2VsZWN0ZWRDb3VudH0gY2VsbHMgc2VsZWN0ZWRgLFxuICAgICAgICBpY29uOiBcIvCfk4pcIixcbiAgICAgICAgYWN0aW9uOiAoKSA9PiB7fSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb25cbiAgICAgICAgZGlzYWJsZWQ6IHRydWVcbiAgICB9LFxuICAgIHsgc2VwYXJhdG9yOiB0cnVlIH0gYXMgQ29udGV4dE1lbnVPcHRpb24sXG4gICAge1xuICAgICAgICBsYWJlbDogXCJCYXRjaCBDcmVhdGVcIixcbiAgICAgICAgaWNvbjogXCLinpVcIixcbiAgICAgICAgYWN0aW9uOiBvbkJhdGNoQ3JlYXRlXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGxhYmVsOiBcIkJhdGNoIEVkaXRcIixcbiAgICAgICAgaWNvbjogXCLinI/vuI9cIixcbiAgICAgICAgYWN0aW9uOiBvbkJhdGNoRWRpdFxuICAgIH0sXG4gICAgeyBzZXBhcmF0b3I6IHRydWUgfSBhcyBDb250ZXh0TWVudU9wdGlvbixcbiAgICB7XG4gICAgICAgIGxhYmVsOiBcIkJhdGNoIERlbGV0ZVwiLFxuICAgICAgICBpY29uOiBcIvCfl5HvuI9cIixcbiAgICAgICAgYWN0aW9uOiBvbkJhdGNoRGVsZXRlXG4gICAgfSxcbiAgICB7IHNlcGFyYXRvcjogdHJ1ZSB9IGFzIENvbnRleHRNZW51T3B0aW9uLFxuICAgIHtcbiAgICAgICAgbGFiZWw6IFwiQ2xlYXIgU2VsZWN0aW9uXCIsXG4gICAgICAgIGljb246IFwi4p2MXCIsXG4gICAgICAgIGFjdGlvbjogb25DbGVhclNlbGVjdGlvblxuICAgIH1cbl07XG5cbmZ1bmN0aW9uIGdldFNoaWZ0SWNvbihzaGlmdFR5cGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgc3dpdGNoIChzaGlmdFR5cGUpIHtcbiAgICAgICAgY2FzZSBcIk1cIjpcbiAgICAgICAgICAgIHJldHVybiBcIvCfjIVcIjtcbiAgICAgICAgY2FzZSBcIkVcIjpcbiAgICAgICAgICAgIHJldHVybiBcIvCfjIZcIjtcbiAgICAgICAgY2FzZSBcIk5cIjpcbiAgICAgICAgICAgIHJldHVybiBcIvCfjJlcIjtcbiAgICAgICAgY2FzZSBcIkRcIjpcbiAgICAgICAgICAgIHJldHVybiBcIvCfj6BcIjtcbiAgICAgICAgY2FzZSBcIkhcIjpcbiAgICAgICAgICAgIHJldHVybiBcIvCfj5bvuI9cIjtcbiAgICAgICAgY2FzZSBcIlRcIjpcbiAgICAgICAgICAgIHJldHVybiBcIvCfk5pcIjtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBcIuKPsFwiO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZWFjdCwgeyBjcmVhdGVFbGVtZW50LCB1c2VFZmZlY3QsIHVzZVN0YXRlLCB1c2VNZW1vLCB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgYWRkRGF5cywgZ2V0RHVyYXRpb25Jbk1pbnV0ZXMsIGZvcm1hdERhdGVGb3JTaGlmdCB9IGZyb20gXCIuLi91dGlscy9kYXRlSGVscGVyc1wiO1xuaW1wb3J0IHsgdXNlU2Nyb2xsTmF2aWdhdGlvbiB9IGZyb20gXCIuLi9ob29rcy91c2VTY3JvbGxOYXZpZ2F0aW9uXCI7XG5pbXBvcnQgeyB1c2VUZWFtQWNjZXNzLCBUZWFtQWNjZXNzQ29uZmlnIH0gZnJvbSBcIi4uL2hvb2tzL3VzZVRlYW1BY2Nlc3NcIjtcbmltcG9ydCB7IEVtcHR5U3RhdGUsIHdpdGhFcnJvckJvdW5kYXJ5IH0gZnJvbSBcIi4vTG9hZGluZ1N0YXRlc1wiO1xuaW1wb3J0IERheUNlbGwgZnJvbSBcIi4vRGF5Q2VsbFwiO1xuaW1wb3J0IHtcbiAgICBDb250ZXh0TWVudSxcbiAgICBDb250ZXh0TWVudU9wdGlvbixcbiAgICBjcmVhdGVFbXB0eUNlbGxNZW51LFxuICAgIGNyZWF0ZUV4aXN0aW5nU2hpZnRNZW51LFxuICAgIGNyZWF0ZU11bHRpU2VsZWN0TWVudVxufSBmcm9tIFwiLi9Db250ZXh0TWVudVwiO1xuaW1wb3J0IHsgRW5naW5lZXIsIFNoaWZ0QXNzaWdubWVudCB9IGZyb20gXCIuLi90eXBlcy9zaGlmdFNjaGVkdWxlclwiO1xuXG5pbnRlcmZhY2UgU2NoZWR1bGVHcmlkUHJvcHMge1xuICAgIGVuZ2luZWVyczogRW5naW5lZXJbXTtcbiAgICBzaGlmdHM6IFNoaWZ0QXNzaWdubWVudFtdO1xuICAgIGdldFNoaWZ0c0ZvckVuZ2luZWVyOiAoZW5naW5lZXJJZDogc3RyaW5nKSA9PiBTaGlmdEFzc2lnbm1lbnRbXTtcbiAgICBnZXRFbmdpbmVlcnNCeVRlYW06ICgpID0+IHsgW3RlYW06IHN0cmluZ106IEVuZ2luZWVyW10gfTtcbiAgICBvbkVkaXRTaGlmdDogKHNoaWZ0OiBhbnkpID0+IHZvaWQ7XG4gICAgb25DcmVhdGVTaGlmdD86IChlbmdpbmVlcklkOiBzdHJpbmcsIGRhdGU6IHN0cmluZykgPT4gdm9pZDtcbiAgICBvbkRlbGV0ZVNoaWZ0PzogKHNoaWZ0OiBhbnkpID0+IHZvaWQ7XG4gICAgb25CYXRjaENyZWF0ZT86IChzZWxlY3RlZENlbGxzOiBhbnlbXSkgPT4gdm9pZDtcbiAgICBvbkJhdGNoRWRpdD86IChzZWxlY3RlZENlbGxzOiBhbnlbXSkgPT4gdm9pZDtcbiAgICBvbkJhdGNoRGVsZXRlPzogKHNlbGVjdGVkQ2VsbHM6IGFueVtdKSA9PiB2b2lkO1xuICAgIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gICAgdGVhbUFjY2Vzcz86IFRlYW1BY2Nlc3NDb25maWc7XG4gICAgc2hvd0RlYnVnSW5mbz86IGJvb2xlYW47XG4gICAgc2hpZnRzTG9hZGluZz86IGJvb2xlYW47XG4gICAgZGVidWdJbmZvPzoge1xuICAgICAgICBhdHRyaWJ1dGVzQ29uZmlndXJlZDoge1xuICAgICAgICAgICAgbmFtZTogYm9vbGVhbjtcbiAgICAgICAgICAgIGhlYWRlcjogYm9vbGVhbjtcbiAgICAgICAgICAgIHN1YmhlYWRlcjogYm9vbGVhbjtcbiAgICAgICAgICAgIHNwVXNlckFzc29jaWF0aW9uOiBib29sZWFuO1xuICAgICAgICAgICAgc2hpZnRBc3NvY2lhdGlvbjogYm9vbGVhbjtcbiAgICAgICAgICAgIHNoaWZ0RGF0ZTogYm9vbGVhbjtcbiAgICAgICAgfTtcbiAgICB9O1xufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciBkaXNhYmxlZCBhY3Rpb25zIHdpdGggY29ycmVjdCBzaWduYXR1cmVzXG5jb25zdCBub09wU2hpZnRGdW5jdGlvbiA9IChfc2hpZnQ6IGFueSk6IHZvaWQgPT4ge1xuICAgIC8vIEludGVudGlvbmFsbHkgZW1wdHkgLSB1c2VkIGZvciBkaXNhYmxlZCBzaGlmdCBtZW51IGFjdGlvbnNcbn07XG5cbmNvbnN0IG5vT3BGdW5jdGlvbiA9ICgpOiB2b2lkID0+IHtcbiAgICAvLyBJbnRlbnRpb25hbGx5IGVtcHR5IC0gdXNlZCBmb3IgZGlzYWJsZWQgbWVudSBhY3Rpb25zXG59O1xuXG5jb25zdCBTY2hlZHVsZUdyaWQ6IFJlYWN0LkZDPFNjaGVkdWxlR3JpZFByb3BzPiA9ICh7XG4gICAgZW5naW5lZXJzOiBfZW5naW5lZXJzLFxuICAgIHNoaWZ0cyxcbiAgICBnZXRTaGlmdHNGb3JFbmdpbmVlcjogX2dldFNoaWZ0c0ZvckVuZ2luZWVyLFxuICAgIGdldEVuZ2luZWVyc0J5VGVhbSxcbiAgICBvbkVkaXRTaGlmdCxcbiAgICBvbkNyZWF0ZVNoaWZ0LFxuICAgIG9uRGVsZXRlU2hpZnQsXG4gICAgb25CYXRjaENyZWF0ZSxcbiAgICBvbkJhdGNoRWRpdCxcbiAgICBvbkJhdGNoRGVsZXRlLFxuICAgIHJlYWRPbmx5ID0gZmFsc2UsXG4gICAgY2xhc3NOYW1lID0gXCJcIixcbiAgICB0ZWFtQWNjZXNzLFxuICAgIHNob3dEZWJ1Z0luZm8sXG4gICAgc2hpZnRzTG9hZGluZyxcbiAgICBkZWJ1Z0luZm9cbn0pID0+IHtcbiAgICAvLyBUZWFtIGFjY2VzcyBjb250cm9sIC0gdXNlIHByb3ZpZGVkIGNvbmZpZyBvciBkZWZhdWx0IHRvIGVuZ2luZWVyIHJvbGVcbiAgICBjb25zdCBkZWZhdWx0VGVhbUFjY2VzczogVGVhbUFjY2Vzc0NvbmZpZyA9IHtcbiAgICAgICAgdXNlclJvbGU6IFwiZW5naW5lZXJcIixcbiAgICAgICAgYWxsb3dDcm9zc1RlYW1WaWV3OiBmYWxzZSxcbiAgICAgICAgYWxsb3dTaGlmdEVkaXRpbmc6IGZhbHNlLFxuICAgICAgICBhbGxvd0JhdGNoT3BlcmF0aW9uczogZmFsc2VcbiAgICB9O1xuXG4gICAgY29uc3QgYWNjZXNzQ29uZmlnID0gdGVhbUFjY2VzcyB8fCBkZWZhdWx0VGVhbUFjY2VzcztcbiAgICBjb25zdCB7IGZpbHRlcmVkU2hpZnRzLCBjYW5FZGl0U2hpZnQsIGNhbkRlbGV0ZVNoaWZ0LCBjYW5QZXJmb3JtQmF0Y2hPcGVyYXRpb25zLCB1c2VyUGVybWlzc2lvbnMgfSA9IHVzZVRlYW1BY2Nlc3MoXG4gICAgICAgIF9lbmdpbmVlcnMsXG4gICAgICAgIHNoaWZ0cyxcbiAgICAgICAgYWNjZXNzQ29uZmlnXG4gICAgKTtcblxuICAgIC8vIFVzZSBmaWx0ZXJlZCBkYXRhIGJhc2VkIG9uIHVzZXIgcGVybWlzc2lvbnNcbiAgICAvLyBUT0RPOiBGaWx0ZXIgdGVhbXNEYXRhIHRvIHJlc3BlY3QgdXNlciBhY2Nlc3MgcGVybWlzc2lvbnNcbiAgICBjb25zdCBhY2Nlc3NpYmxlU2hpZnRzID0gZmlsdGVyZWRTaGlmdHM7XG5cbiAgICAvLyBDYWxjdWxhdGUgZGF0ZSByYW5nZSBmcm9tIGFjY2Vzc2libGUgc2hpZnQgZGF0YVxuICAgIGNvbnN0IGRhdGVSYW5nZSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgICAgICBpZiAoYWNjZXNzaWJsZVNoaWZ0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgZW5kOiBhZGREYXlzKG5ldyBEYXRlKCksIDMwKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNoaWZ0RGF0ZXMgPSBhY2Nlc3NpYmxlU2hpZnRzLm1hcChzaGlmdCA9PiBuZXcgRGF0ZShzaGlmdC5kYXRlKSkuZmlsdGVyKGRhdGUgPT4gIWlzTmFOKGRhdGUuZ2V0VGltZSgpKSk7XG4gICAgICAgIGlmIChzaGlmdERhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDogbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICBlbmQ6IGFkZERheXMobmV3IERhdGUoKSwgMzApXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZWFybGllc3REYXRlID0gbmV3IERhdGUoTWF0aC5taW4oLi4uc2hpZnREYXRlcy5tYXAoZCA9PiBkLmdldFRpbWUoKSkpKTtcbiAgICAgICAgY29uc3QgbGF0ZXN0RGF0ZSA9IG5ldyBEYXRlKE1hdGgubWF4KC4uLnNoaWZ0RGF0ZXMubWFwKGQgPT4gZC5nZXRUaW1lKCkpKSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiBlYXJsaWVzdERhdGUsXG4gICAgICAgICAgICBlbmQ6IGxhdGVzdERhdGVcbiAgICAgICAgfTtcbiAgICB9LCBbYWNjZXNzaWJsZVNoaWZ0c10pO1xuXG4gICAgY29uc3QgW3N0YXJ0RGF0ZV0gPSB1c2VTdGF0ZShkYXRlUmFuZ2Uuc3RhcnQpO1xuICAgIGNvbnN0IFtlbmREYXRlLCBzZXRFbmREYXRlXSA9IHVzZVN0YXRlKGRhdGVSYW5nZS5lbmQpO1xuICAgIGNvbnN0IFtzZWxlY3RlZENlbGxzLCBzZXRTZWxlY3RlZENlbGxzXSA9IHVzZVN0YXRlPEFycmF5PHsgZW5naW5lZXJJZDogc3RyaW5nOyBkYXRlOiBzdHJpbmcgfT4+KFtdKTtcbiAgICBjb25zdCBbbGFzdFNlbGVjdGVkQ2VsbCwgc2V0TGFzdFNlbGVjdGVkQ2VsbF0gPSB1c2VTdGF0ZTx7IGVuZ2luZWVySWQ6IHN0cmluZzsgZGF0ZTogc3RyaW5nIH0gfCBudWxsPihudWxsKTtcblxuICAgIC8vIENvbnRleHQgbWVudSBzdGF0ZVxuICAgIGNvbnN0IFtjb250ZXh0TWVudSwgc2V0Q29udGV4dE1lbnVdID0gdXNlU3RhdGU8e1xuICAgICAgICB2aXNpYmxlOiBib29sZWFuO1xuICAgICAgICB4OiBudW1iZXI7XG4gICAgICAgIHk6IG51bWJlcjtcbiAgICAgICAgb3B0aW9uczogQ29udGV4dE1lbnVPcHRpb25bXTtcbiAgICB9Pih7XG4gICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwLFxuICAgICAgICBvcHRpb25zOiBbXVxuICAgIH0pO1xuXG4gICAgLy8gU2Nyb2xsIG5hdmlnYXRpb24gaG9vayBmb3IgdW5pZmllZCBzY3JvbGxpbmcgYW5kIGluZmluaXRlIGxvYWRpbmdcbiAgICBjb25zdCB7IGhlYWRlclNjcm9sbFJlZiwgY29udGVudFNjcm9sbFJlZiwgaW5maW5pdGVTY3JvbGxSZWYsIGlzSW5maW5pdGVTY3JvbGxWaXNpYmxlIH0gPSB1c2VTY3JvbGxOYXZpZ2F0aW9uKCk7XG5cbiAgICAvLyBIZWxwZXIgZnVuY3Rpb25zIGZvciBtdWx0aS1zZWxlY3RcbiAgICBjb25zdCBpc0NlbGxTZWxlY3RlZCA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoZW5naW5lZXJJZDogc3RyaW5nLCBkYXRlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZENlbGxzLnNvbWUoY2VsbCA9PiBjZWxsLmVuZ2luZWVySWQgPT09IGVuZ2luZWVySWQgJiYgY2VsbC5kYXRlID09PSBkYXRlKTtcbiAgICAgICAgfSxcbiAgICAgICAgW3NlbGVjdGVkQ2VsbHNdXG4gICAgKTtcblxuICAgIC8vIEhhbmRsZSBpbmZpbml0ZSBzY3JvbGwgbG9hZGluZyB3aGVuIHNlbnRpbmVsIGNvbWVzIGludG8gdmlld1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChpc0luZmluaXRlU2Nyb2xsVmlzaWJsZSkge1xuICAgICAgICAgICAgc2V0RW5kRGF0ZShkID0+IGFkZERheXMoZCwgMTUpKTtcbiAgICAgICAgfVxuICAgIH0sIFtpc0luZmluaXRlU2Nyb2xsVmlzaWJsZV0pO1xuXG4gICAgLy8gTWVtb2l6ZSB0ZWFtcyBkYXRhIGZvciBwZXJmb3JtYW5jZVxuICAgIGNvbnN0IHRlYW1zRGF0YSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGdldEVuZ2luZWVyc0J5VGVhbSgpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiRXJyb3IgZ2V0dGluZyBlbmdpbmVlcnMgYnkgdGVhbTpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgfSwgW2dldEVuZ2luZWVyc0J5VGVhbV0pO1xuXG4gICAgLy8gR3JvdXAgZW5naW5lZXJzIGJ5IEhlYWRlciDihpIgU3ViaGVhZGVyIOKGkiBFbmdpbmVlcnMgKGRhdGEtZHJpdmVuIHdpdGggZmFsbGJhY2spXG4gICAgY29uc3QgeyBoZWFkZXJTdWJoZWFkZXJTdHJ1Y3R1cmUsIGFsbEVuZ2luZWVycywgZ3JvdXBpbmdEZWJ1Z0luZm8gfSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgICAgICBjb25zdCBkZWJ1Z01lc3NhZ2VzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHdlIGhhdmUgYW55IGhlYWRlciBncm91cGluZyBjb25maWd1cmVkXG4gICAgICAgIGNvbnN0IGhhc0hlYWRlckdyb3VwaW5nID0gISFkZWJ1Z0luZm8gJiYgZGVidWdJbmZvLmF0dHJpYnV0ZXNDb25maWd1cmVkPy5oZWFkZXI7XG4gICAgICAgIGNvbnN0IGhhc1N1YmhlYWRlckdyb3VwaW5nID0gISFkZWJ1Z0luZm8gJiYgZGVidWdJbmZvLmF0dHJpYnV0ZXNDb25maWd1cmVkPy5zdWJoZWFkZXI7XG5cbiAgICAgICAgZGVidWdNZXNzYWdlcy5wdXNoKGBQcm9jZXNzaW5nICR7T2JqZWN0LmtleXModGVhbXNEYXRhKS5sZW5ndGh9IGhlYWRlciBncm91cHNgKTtcbiAgICAgICAgZGVidWdNZXNzYWdlcy5wdXNoKGBIZWFkZXIgZ3JvdXBpbmc6ICR7aGFzSGVhZGVyR3JvdXBpbmcgPyBcIuKchVwiIDogXCLinYxcIn1gKTtcbiAgICAgICAgZGVidWdNZXNzYWdlcy5wdXNoKGBTdWJoZWFkZXIgZ3JvdXBpbmc6ICR7aGFzU3ViaGVhZGVyR3JvdXBpbmcgPyBcIuKchVwiIDogXCLinYxcIn1gKTtcblxuICAgICAgICBpZiAoIWhhc0hlYWRlckdyb3VwaW5nKSB7XG4gICAgICAgICAgICAvLyBObyBncm91cGluZyAtIGZsYXQgbGlzdCBvZiBhbGwgZW5naW5lZXJzXG4gICAgICAgICAgICBjb25zdCBmbGF0RW5naW5lZXJzID0gT2JqZWN0LnZhbHVlcyh0ZWFtc0RhdGEpLmZsYXQoKTtcbiAgICAgICAgICAgIGRlYnVnTWVzc2FnZXMucHVzaChcIk5vIGhlYWRlciBncm91cGluZyAtIHNob3dpbmcgYWxsIGVuZ2luZWVycyBpbiBzaW5nbGUgZ3JvdXBcIik7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaGVhZGVyU3ViaGVhZGVyU3RydWN0dXJlOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlck5hbWU6IFwiQWxsIEVuZ2luZWVyc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVySWQ6IFwiYWxsLWVuZ2luZWVyc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViaGVhZGVyczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJHZW5lcmFsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZWVyczogZmxhdEVuZ2luZWVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgYWxsRW5naW5lZXJzOiBmbGF0RW5naW5lZXJzLFxuICAgICAgICAgICAgICAgIGdyb3VwaW5nRGVidWdJbmZvOiBkZWJ1Z01lc3NhZ2VzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3RydWN0dXJlID0gT2JqZWN0LmVudHJpZXModGVhbXNEYXRhKS5tYXAoKFtoZWFkZXJOYW1lLCBlbmdpbmVlcnNdKSA9PiB7XG4gICAgICAgICAgICBkZWJ1Z01lc3NhZ2VzLnB1c2goYEhlYWRlciBcIiR7aGVhZGVyTmFtZX1cIjogJHtlbmdpbmVlcnMubGVuZ3RofSBlbmdpbmVlcnNgKTtcblxuICAgICAgICAgICAgaWYgKCFoYXNTdWJoZWFkZXJHcm91cGluZykge1xuICAgICAgICAgICAgICAgIC8vIE9ubHkgaGVhZGVyIGdyb3VwaW5nIC0gbm8gc3ViaGVhZGVyIGdyb3VwaW5nXG4gICAgICAgICAgICAgICAgZGVidWdNZXNzYWdlcy5wdXNoKGAgIE5vIHN1YmhlYWRlciBncm91cGluZyBmb3IgJHtoZWFkZXJOYW1lfWApO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcklkOiBoZWFkZXJOYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIi1cIiksXG4gICAgICAgICAgICAgICAgICAgIHN1YmhlYWRlcnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkdlbmVyYWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVlcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEJvdGggaGVhZGVyIGFuZCBzdWJoZWFkZXIgZ3JvdXBpbmdcbiAgICAgICAgICAgIGNvbnN0IHN1YmhlYWRlckdyb3VwczogeyBbc3ViaGVhZGVyOiBzdHJpbmddOiBFbmdpbmVlcltdIH0gPSB7fTtcblxuICAgICAgICAgICAgZW5naW5lZXJzLmZvckVhY2goKGVuZ2luZWVyLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFVzZSBlbmdpbmVlcidzIHN1YmhlYWRlciwgZGVmYXVsdCB0byAnR2VuZXJhbCcgaWYgbm90IHNwZWNpZmllZFxuICAgICAgICAgICAgICAgIGNvbnN0IGVuZ2luZWVyU3ViaGVhZGVyID0gZW5naW5lZXIuc3ViaGVhZGVyIHx8IFwiR2VuZXJhbFwiO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFzdWJoZWFkZXJHcm91cHNbZW5naW5lZXJTdWJoZWFkZXJdKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YmhlYWRlckdyb3Vwc1tlbmdpbmVlclN1YmhlYWRlcl0gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3ViaGVhZGVyR3JvdXBzW2VuZ2luZWVyU3ViaGVhZGVyXS5wdXNoKGVuZ2luZWVyKTtcblxuICAgICAgICAgICAgICAgIC8vIERlYnVnIGZpcnN0IGZldyBlbmdpbmVlcnNcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlYnVnTWVzc2FnZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIGAgIEVuZ2luZWVyICR7aW5kZXh9OiAke2VuZ2luZWVyLm5hbWV9ICgke2VuZ2luZWVyLmhlYWRlcn0vJHtlbmdpbmVlci5zdWJoZWFkZXJ9KWBcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gU29ydCBzdWJoZWFkZXJzIGFscGhhYmV0aWNhbGx5IChkYXRhLWRyaXZlbiwgbm8gaGFyZGNvZGVkIG9yZGVyKVxuICAgICAgICAgICAgY29uc3Qgc29ydGVkU3ViaGVhZGVycyA9IE9iamVjdC5rZXlzKHN1YmhlYWRlckdyb3Vwcykuc29ydCgpO1xuICAgICAgICAgICAgZGVidWdNZXNzYWdlcy5wdXNoKGAgIFN1YmhlYWRlcnM6ICR7c29ydGVkU3ViaGVhZGVycy5qb2luKFwiLCBcIil9YCk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaGVhZGVyTmFtZSxcbiAgICAgICAgICAgICAgICBoZWFkZXJJZDogaGVhZGVyTmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCItXCIpLFxuICAgICAgICAgICAgICAgIHN1YmhlYWRlcnM6IHNvcnRlZFN1YmhlYWRlcnMubWFwKHN1YmhlYWRlciA9PiAoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBzdWJoZWFkZXIsXG4gICAgICAgICAgICAgICAgICAgIGVuZ2luZWVyczogc3ViaGVhZGVyR3JvdXBzW3N1YmhlYWRlcl1cbiAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGZsYXRFbmdpbmVlcnM6IEVuZ2luZWVyW10gPSBzdHJ1Y3R1cmUuZmxhdE1hcChoZWFkZXIgPT5cbiAgICAgICAgICAgIGhlYWRlci5zdWJoZWFkZXJzLmZsYXRNYXAoc3ViaGVhZGVyID0+IHN1YmhlYWRlci5lbmdpbmVlcnMpXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHsgaGVhZGVyU3ViaGVhZGVyU3RydWN0dXJlOiBzdHJ1Y3R1cmUsIGFsbEVuZ2luZWVyczogZmxhdEVuZ2luZWVycywgZ3JvdXBpbmdEZWJ1Z0luZm86IGRlYnVnTWVzc2FnZXMgfTtcbiAgICB9LCBbdGVhbXNEYXRhLCBkZWJ1Z0luZm9dKTtcblxuICAgIC8vIEdlbmVyYXRlIGRhdGUgY29sdW1uc1xuICAgIGNvbnN0IGRhdGVDb2x1bW5zID0gdXNlTWVtbygoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRheXNDb3VudCA9IE1hdGguY2VpbChnZXREdXJhdGlvbkluTWludXRlcyhzdGFydERhdGUsIGVuZERhdGUpIC8gKDYwICogMjQpKTtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IGRheXNDb3VudCB9LCAoXywgaWR4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gYWRkRGF5cyhzdGFydERhdGUsIGlkeCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZzogZm9ybWF0RGF0ZUZvclNoaWZ0KGRhdGUpLFxuICAgICAgICAgICAgICAgIGlzVG9kYXk6IGZvcm1hdERhdGVGb3JTaGlmdChkYXRlKSA9PT0gZm9ybWF0RGF0ZUZvclNoaWZ0KG5ldyBEYXRlKCkpLFxuICAgICAgICAgICAgICAgIGlzV2Vla2VuZDogZGF0ZS5nZXREYXkoKSA9PT0gMCB8fCBkYXRlLmdldERheSgpID09PSA2XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9LCBbc3RhcnREYXRlLCBlbmREYXRlXSk7XG5cbiAgICAvLyBNdWx0aS1zZWxlY3QgY2VsbCBmdW5jdGlvbiAoZGVmaW5lZCBhZnRlciBhbGxFbmdpbmVlcnMgYW5kIGRhdGVDb2x1bW5zIGFyZSBhdmFpbGFibGUpXG4gICAgY29uc3Qgc2VsZWN0Q2VsbCA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoZW5naW5lZXJJZDogc3RyaW5nLCBkYXRlOiBzdHJpbmcsIGN0cmxLZXk6IGJvb2xlYW4sIHNoaWZ0S2V5OiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdDZWxsID0geyBlbmdpbmVlcklkLCBkYXRlIH07XG5cbiAgICAgICAgICAgIGlmIChzaGlmdEtleSAmJiBsYXN0U2VsZWN0ZWRDZWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gU2hpZnQrY2xpY2s6IHNlbGVjdCByYW5nZSBmcm9tIGxhc3Qgc2VsZWN0ZWQgdG8gY3VycmVudFxuICAgICAgICAgICAgICAgIGNvbnN0IGVuZ2luZWVyU3RhcnQgPSBhbGxFbmdpbmVlcnMuZmluZEluZGV4KGUgPT4gZS5pZCA9PT0gbGFzdFNlbGVjdGVkQ2VsbC5lbmdpbmVlcklkKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmdpbmVlckVuZCA9IGFsbEVuZ2luZWVycy5maW5kSW5kZXgoZSA9PiBlLmlkID09PSBlbmdpbmVlcklkKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlU3RhcnQgPSBkYXRlQ29sdW1ucy5maW5kSW5kZXgoZCA9PiBkLmRhdGVTdHJpbmcgPT09IGxhc3RTZWxlY3RlZENlbGwuZGF0ZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZUVuZCA9IGRhdGVDb2x1bW5zLmZpbmRJbmRleChkID0+IGQuZGF0ZVN0cmluZyA9PT0gZGF0ZSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBtaW5FbmdpbmVlciA9IE1hdGgubWluKGVuZ2luZWVyU3RhcnQsIGVuZ2luZWVyRW5kKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXhFbmdpbmVlciA9IE1hdGgubWF4KGVuZ2luZWVyU3RhcnQsIGVuZ2luZWVyRW5kKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtaW5EYXRlID0gTWF0aC5taW4oZGF0ZVN0YXJ0LCBkYXRlRW5kKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXhEYXRlID0gTWF0aC5tYXgoZGF0ZVN0YXJ0LCBkYXRlRW5kKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmdlQ2VsbHM6IEFycmF5PHsgZW5naW5lZXJJZDogc3RyaW5nOyBkYXRlOiBzdHJpbmcgfT4gPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlID0gbWluRW5naW5lZXI7IGUgPD0gbWF4RW5naW5lZXI7IGUrKykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBkID0gbWluRGF0ZTsgZCA8PSBtYXhEYXRlOyBkKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbGxFbmdpbmVlcnNbZV0gJiYgZGF0ZUNvbHVtbnNbZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZUNlbGxzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVlcklkOiBhbGxFbmdpbmVlcnNbZV0uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGU6IGRhdGVDb2x1bW5zW2RdLmRhdGVTdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjdHJsS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEN0cmwrU2hpZnQ6IGFkZCByYW5nZSB0byBleGlzdGluZyBzZWxlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRDZWxscyhwcmV2ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1NlbGVjdGlvbiA9IFsuLi5wcmV2XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlQ2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFuZXdTZWxlY3Rpb24uc29tZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nID0+IGV4aXN0aW5nLmVuZ2luZWVySWQgPT09IGNlbGwuZW5naW5lZXJJZCAmJiBleGlzdGluZy5kYXRlID09PSBjZWxsLmRhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdTZWxlY3Rpb24ucHVzaChjZWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdTZWxlY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNoaWZ0IG9ubHk6IHJlcGxhY2Ugc2VsZWN0aW9uIHdpdGggcmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRDZWxscyhyYW5nZUNlbGxzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN0cmxLZXkpIHtcbiAgICAgICAgICAgICAgICAvLyBDdHJsK2NsaWNrOiB0b2dnbGUgc2luZ2xlIGNlbGxcbiAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZENlbGxzKHByZXYgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gcHJldi5zb21lKGNlbGwgPT4gY2VsbC5lbmdpbmVlcklkID09PSBlbmdpbmVlcklkICYmIGNlbGwuZGF0ZSA9PT0gZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJldi5maWx0ZXIoY2VsbCA9PiAhKGNlbGwuZW5naW5lZXJJZCA9PT0gZW5naW5lZXJJZCAmJiBjZWxsLmRhdGUgPT09IGRhdGUpKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbLi4ucHJldiwgbmV3Q2VsbF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZXRMYXN0U2VsZWN0ZWRDZWxsKG5ld0NlbGwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSZWd1bGFyIGNsaWNrOiBzZWxlY3Qgc2luZ2xlIGNlbGxcbiAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZENlbGxzKFtuZXdDZWxsXSk7XG4gICAgICAgICAgICAgICAgc2V0TGFzdFNlbGVjdGVkQ2VsbChuZXdDZWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW2xhc3RTZWxlY3RlZENlbGwsIGFsbEVuZ2luZWVycywgZGF0ZUNvbHVtbnNdXG4gICAgKTtcblxuICAgIC8vIENvbnRleHQgbWVudSBoYW5kbGVyc1xuICAgIGNvbnN0IGhhbmRsZUNlbGxDb250ZXh0TWVudSA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoZTogUmVhY3QuTW91c2VFdmVudCwgZW5naW5lZXI6IEVuZ2luZWVyLCBkYXRlOiBzdHJpbmcsIHNoaWZ0PzogU2hpZnRBc3NpZ25tZW50KSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICBsZXQgb3B0aW9uczogQ29udGV4dE1lbnVPcHRpb25bXTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgcGVybWlzc2lvbnMgYmVmb3JlIHNob3dpbmcgY29udGV4dCBtZW51IG9wdGlvbnNcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZENlbGxzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FuUGVyZm9ybUJhdGNoT3BlcmF0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAvLyBNdWx0aS1zZWxlY3Rpb24gY29udGV4dCBtZW51IChmdWxsIHBlcm1pc3Npb25zKVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gY3JlYXRlTXVsdGlTZWxlY3RNZW51KFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDZWxscy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uQmF0Y2hDcmVhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25CYXRjaENyZWF0ZShzZWxlY3RlZENlbGxzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkJhdGNoRWRpdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJhdGNoRWRpdChzZWxlY3RlZENlbGxzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkJhdGNoRGVsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQmF0Y2hEZWxldGUoc2VsZWN0ZWRDZWxscyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZENlbGxzKFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRMYXN0U2VsZWN0ZWRDZWxsKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIExpbWl0ZWQgbWVudSB3aGVuIG5vIGJhdGNoIHBlcm1pc3Npb25zXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGAke3NlbGVjdGVkQ2VsbHMubGVuZ3RofSBjZWxscyBzZWxlY3RlZGAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCLwn5OKXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBub09wRnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VwYXJhdG9yOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc2VwYXJhdG9yOiB0cnVlIH0gYXMgQ29udGV4dE1lbnVPcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ2xlYXIgU2VsZWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCLinJVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRDZWxscyhbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldExhc3RTZWxlY3RlZENlbGwobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VwYXJhdG9yOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJCYXRjaCBvcGVyYXRpb25zIG5vdCBwZXJtaXR0ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcIvCflJJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5vT3BGdW5jdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXBhcmF0b3I6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChzaGlmdCkge1xuICAgICAgICAgICAgICAgIC8vIEV4aXN0aW5nIHNoaWZ0IGNvbnRleHQgbWVudSAoY2hlY2sgZWRpdC9kZWxldGUgcGVybWlzc2lvbnMpXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IGNyZWF0ZUV4aXN0aW5nU2hpZnRNZW51KFxuICAgICAgICAgICAgICAgICAgICBzaGlmdCxcbiAgICAgICAgICAgICAgICAgICAgZW5naW5lZXIsXG4gICAgICAgICAgICAgICAgICAgIGNhbkVkaXRTaGlmdChzaGlmdClcbiAgICAgICAgICAgICAgICAgICAgICAgID8gc2hpZnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uRWRpdFNoaWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FZGl0U2hpZnQoc2hpZnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA6IG5vT3BTaGlmdEZ1bmN0aW9uLFxuICAgICAgICAgICAgICAgICAgICBjYW5EZWxldGVTaGlmdChzaGlmdClcbiAgICAgICAgICAgICAgICAgICAgICAgID8gc2hpZnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uRGVsZXRlU2hpZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRlbGV0ZVNoaWZ0KHNoaWZ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBub09wU2hpZnRGdW5jdGlvblxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9uQ3JlYXRlU2hpZnQpIHtcbiAgICAgICAgICAgICAgICAvLyBFbXB0eSBjZWxsIGNvbnRleHQgbWVudSAob25seSBpZiBjcmVhdGUgYWN0aW9uIGlzIGF2YWlsYWJsZSlcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gY3JlYXRlRW1wdHlDZWxsTWVudShlbmdpbmVlciwgZGF0ZSwgKGVuZ2luZWVySWQsIGRhdGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9uQ3JlYXRlU2hpZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ3JlYXRlU2hpZnQoZW5naW5lZXJJZCwgZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTm8gcGVybWlzc2lvbnMgLSBzaG93IGxpbWl0ZWQgbWVudVxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5vIHBlcm1pc3Npb25zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcIvCflJJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbm9PcEZ1bmN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXBhcmF0b3I6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRDb250ZXh0TWVudSh7XG4gICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB4OiBlLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgeTogZS5jbGllbnRZLFxuICAgICAgICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgICBvbkNyZWF0ZVNoaWZ0LFxuICAgICAgICAgICAgc2VsZWN0ZWRDZWxscyxcbiAgICAgICAgICAgIGNhblBlcmZvcm1CYXRjaE9wZXJhdGlvbnMsXG4gICAgICAgICAgICBjYW5FZGl0U2hpZnQsXG4gICAgICAgICAgICBjYW5EZWxldGVTaGlmdCxcbiAgICAgICAgICAgIG9uRWRpdFNoaWZ0LFxuICAgICAgICAgICAgb25EZWxldGVTaGlmdCxcbiAgICAgICAgICAgIG9uQmF0Y2hDcmVhdGUsXG4gICAgICAgICAgICBvbkJhdGNoRWRpdCxcbiAgICAgICAgICAgIG9uQmF0Y2hEZWxldGUsXG4gICAgICAgICAgICBzZXRTZWxlY3RlZENlbGxzLFxuICAgICAgICAgICAgc2V0TGFzdFNlbGVjdGVkQ2VsbFxuICAgICAgICBdXG4gICAgKTtcblxuICAgIGNvbnN0IGNsb3NlQ29udGV4dE1lbnUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICAgIHNldENvbnRleHRNZW51KHByZXYgPT4gKHsgLi4ucHJldiwgdmlzaWJsZTogZmFsc2UgfSkpO1xuICAgIH0sIFtdKTtcblxuICAgIC8vIENyZWF0ZSBzaGlmdCBsb29rdXAgZm9yIHBlcmZvcm1hbmNlIHdpdGggdGFyZ2V0ZWQgZGVidWdnaW5nXG4gICAgY29uc3Qgc2hpZnRMb29rdXAgPSB1c2VNZW1vKCgpID0+IHtcbiAgICAgICAgY29uc3QgbG9va3VwOiBSZWNvcmQ8c3RyaW5nLCBTaGlmdEFzc2lnbm1lbnQ+ID0ge307XG5cbiAgICAgICAgLy8gRm9yY2UgY29uc29sZSBvdXRwdXQgZm9yIGNyaXRpY2FsIGRlYnVnZ2luZ1xuICAgICAgICBjb25zb2xlLmxvZyhcIvCflI0gU0hJRlRTIERFQlVHIC0gVG90YWwgc2hpZnRzOlwiLCBhY2Nlc3NpYmxlU2hpZnRzLmxlbmd0aCk7XG5cbiAgICAgICAgYWNjZXNzaWJsZVNoaWZ0cy5mb3JFYWNoKChzaGlmdCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke3NoaWZ0LmVuZ2luZWVySWR9LSR7c2hpZnQuZGF0ZX1gO1xuICAgICAgICAgICAgbG9va3VwW2tleV0gPSBzaGlmdDtcblxuICAgICAgICAgICAgLy8gRGVidWcgb25seSBmaXJzdCAyIHNoaWZ0cyBkdWUgdG8gbGFyZ2UgZGF0YXNldFxuICAgICAgICAgICAgaWYgKGluZGV4IDwgMikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGDwn5SNIFNISUZUICR7aW5kZXh9OmAsIHtcbiAgICAgICAgICAgICAgICAgICAgZW5naW5lZXJJZDogc2hpZnQuZW5naW5lZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogc2hpZnQuZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgc2hpZnQ6IHNoaWZ0LnNoaWZ0LFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlb2Ygc2hpZnQuZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAga2V5XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwi8J+UjSBMT09LVVAgREVCVUcgLSBUb3RhbCBrZXlzOlwiLCBPYmplY3Qua2V5cyhsb29rdXApLmxlbmd0aCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi8J+UjSBTQU1QTEUgS0VZUzpcIiwgT2JqZWN0LmtleXMobG9va3VwKS5zbGljZSgwLCAzKSk7XG5cbiAgICAgICAgcmV0dXJuIGxvb2t1cDtcbiAgICB9LCBbYWNjZXNzaWJsZVNoaWZ0c10pO1xuXG4gICAgLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGdldCBzaGlmdCBmb3IgZW5naW5lZXIgYW5kIGRhdGVcbiAgICBjb25zdCBnZXRTaGlmdCA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoZW5naW5lZXJJZDogc3RyaW5nLCBkYXRlU3RyaW5nOiBzdHJpbmcpOiBTaGlmdEFzc2lnbm1lbnQgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7ZW5naW5lZXJJZH0tJHtkYXRlU3RyaW5nfWA7XG4gICAgICAgICAgICBjb25zdCBzaGlmdCA9IHNoaWZ0TG9va3VwW2tleV07XG5cbiAgICAgICAgICAgIC8vIERlYnVnIGZpcnN0IGZldyBsb29rdXBzIG9ubHlcbiAgICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC4wMDEpIHtcbiAgICAgICAgICAgICAgICAvLyBTYW1wbGUgMC4xJSBvZiBsb29rdXBzXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLwn5SNIExPT0tVUCBURVNUOlwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGVuZ2luZWVySWQsXG4gICAgICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgZm91bmQ6ICEhc2hpZnQsXG4gICAgICAgICAgICAgICAgICAgIHNoaWZ0OiBzaGlmdCA/IGAke3NoaWZ0LnNoaWZ0fWAgOiBcIm5vbmVcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2hpZnQ7XG4gICAgICAgIH0sXG4gICAgICAgIFtzaGlmdExvb2t1cF1cbiAgICApO1xuXG4gICAgLy8gRW5oYW5jZWQgY2VsbCBjbGljayBoYW5kbGVyIHdpdGggbXVsdGktc2VsZWN0IHN1cHBvcnRcbiAgICBjb25zdCBoYW5kbGVDZWxsQ2xpY2sgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKGVuZ2luZWVySWQ6IHN0cmluZywgZGF0ZVN0cmluZzogc3RyaW5nLCBjdHJsS2V5OiBib29sZWFuLCBzaGlmdEtleTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgc2VsZWN0Q2VsbChlbmdpbmVlcklkLCBkYXRlU3RyaW5nLCBjdHJsS2V5LCBzaGlmdEtleSk7XG4gICAgICAgIH0sXG4gICAgICAgIFtzZWxlY3RDZWxsXVxuICAgICk7XG5cbiAgICAvLyBLZXlib2FyZCBuYXZpZ2F0aW9uIHdpdGggbXVsdGktc2VsZWN0IHN1cHBvcnRcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkID0+IHtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZENlbGxzLmxlbmd0aCA9PT0gMCB8fCBhbGxFbmdpbmVlcnMubGVuZ3RoID09PSAwIHx8IGRhdGVDb2x1bW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVXNlIHRoZSBsYXN0IHNlbGVjdGVkIGNlbGwgZm9yIG5hdmlnYXRpb25cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRDZWxsID0gbGFzdFNlbGVjdGVkQ2VsbCB8fCBzZWxlY3RlZENlbGxzW3NlbGVjdGVkQ2VsbHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RW5naW5lZXJJbmRleCA9IGFsbEVuZ2luZWVycy5maW5kSW5kZXgoZW5nID0+IGVuZy5pZCA9PT0gY3VycmVudENlbGwuZW5naW5lZXJJZCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RGF0ZUluZGV4ID0gZGF0ZUNvbHVtbnMuZmluZEluZGV4KGNvbCA9PiBjb2wuZGF0ZVN0cmluZyA9PT0gY3VycmVudENlbGwuZGF0ZSk7XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50RW5naW5lZXJJbmRleCA9PT0gLTEgfHwgY3VycmVudERhdGVJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBuZXdFbmdpbmVlckluZGV4ID0gY3VycmVudEVuZ2luZWVySW5kZXg7XG4gICAgICAgICAgICBsZXQgbmV3RGF0ZUluZGV4ID0gY3VycmVudERhdGVJbmRleDtcblxuICAgICAgICAgICAgc3dpdGNoIChlLmtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgICAgICAgICAgIG5ld0VuZ2luZWVySW5kZXggPSBNYXRoLm1heCgwLCBjdXJyZW50RW5naW5lZXJJbmRleCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgICAgICAgICAgICAgbmV3RW5naW5lZXJJbmRleCA9IE1hdGgubWluKGFsbEVuZ2luZWVycy5sZW5ndGggLSAxLCBjdXJyZW50RW5naW5lZXJJbmRleCArIDEpO1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICAgICAgICAgICAgbmV3RGF0ZUluZGV4ID0gTWF0aC5tYXgoMCwgY3VycmVudERhdGVJbmRleCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgICAgICAgICAgIG5ld0RhdGVJbmRleCA9IE1hdGgubWluKGRhdGVDb2x1bW5zLmxlbmd0aCAtIDEsIGN1cnJlbnREYXRlSW5kZXggKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiRW50ZXJcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiIFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRDZWxscy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpbmdsZSBzZWxlY3Rpb246IGVkaXQgdGhlIHNlbGVjdGVkIGNlbGxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hpZnQgPSBnZXRTaGlmdChjdXJyZW50Q2VsbC5lbmdpbmVlcklkLCBjdXJyZW50Q2VsbC5kYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob25FZGl0U2hpZnQgJiYgc2hpZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FZGl0U2hpZnQoc2hpZnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluIGtleWJvYXJkIGVkaXQ6XCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE11bHRpLXNlbGVjdGlvbjogY291bGQgYmF0Y2ggZWRpdCBvciBzaG93IGNvbnRleHQgbWVudVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYE11bHRpLWVkaXQgZm9yICR7c2VsZWN0ZWRDZWxscy5sZW5ndGh9IGNlbGxzYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiRXNjYXBlXCI6XG4gICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkQ2VsbHMoW10pO1xuICAgICAgICAgICAgICAgICAgICBzZXRMYXN0U2VsZWN0ZWRDZWxsKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld0VuZ2luZWVySW5kZXggIT09IGN1cnJlbnRFbmdpbmVlckluZGV4IHx8IG5ld0RhdGVJbmRleCAhPT0gY3VycmVudERhdGVJbmRleCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdENlbGwoXG4gICAgICAgICAgICAgICAgICAgIGFsbEVuZ2luZWVyc1tuZXdFbmdpbmVlckluZGV4XS5pZCxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZUNvbHVtbnNbbmV3RGF0ZUluZGV4XS5kYXRlU3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBlLmN0cmxLZXkgfHwgZS5tZXRhS2V5LFxuICAgICAgICAgICAgICAgICAgICBlLnNoaWZ0S2V5XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVLZXlEb3duKTtcbiAgICAgICAgcmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleURvd24pO1xuICAgIH0sIFtzZWxlY3RlZENlbGxzLCBsYXN0U2VsZWN0ZWRDZWxsLCBhbGxFbmdpbmVlcnMsIGRhdGVDb2x1bW5zLCBnZXRTaGlmdCwgb25FZGl0U2hpZnQsIHNlbGVjdENlbGxdKTtcblxuICAgIC8vIEdsb2JhbCBjbGljayBoYW5kbGVyIHRvIGNsb3NlIGNvbnRleHQgbWVudVxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZUdsb2JhbENsaWNrID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgY2xvc2VDb250ZXh0TWVudSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChjb250ZXh0TWVudS52aXNpYmxlKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlR2xvYmFsQ2xpY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVHbG9iYWxDbGljayk7XG4gICAgICAgIH07XG4gICAgfSwgW2NvbnRleHRNZW51LnZpc2libGUsIGNsb3NlQ29udGV4dE1lbnVdKTtcblxuICAgIC8vIENhbGN1bGF0ZSBzaGlmdCBzdGF0aXN0aWNzXG4gICAgY29uc3Qgc2hpZnRTdGF0cyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0cyA9IHtcbiAgICAgICAgICAgIE06IDAsXG4gICAgICAgICAgICBFOiAwLFxuICAgICAgICAgICAgTjogMCxcbiAgICAgICAgICAgIEQ6IDAsXG4gICAgICAgICAgICBIOiAwLFxuICAgICAgICAgICAgVDogMCxcbiAgICAgICAgICAgIHRvdGFsOiBhY2Nlc3NpYmxlU2hpZnRzLmxlbmd0aFxuICAgICAgICB9O1xuICAgICAgICBhY2Nlc3NpYmxlU2hpZnRzLmZvckVhY2goc2hpZnQgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2hpZnRUeXBlID0gc2hpZnQuc2hpZnQuY2hhckF0KDApOyAvLyBHZXQgZmlyc3QgY2hhcmFjdGVyIChNLCBFLCBOLCBELCBILCBUKVxuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdGF0cywgc2hpZnRUeXBlKSkge1xuICAgICAgICAgICAgICAgIHN0YXRzW3NoaWZ0VHlwZSBhcyBrZXlvZiB0eXBlb2Ygc3RhdHNdKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3RhdHM7XG4gICAgfSwgW2FjY2Vzc2libGVTaGlmdHNdKTtcblxuICAgIC8vIEVycm9yIGhhbmRsaW5nIGZvciBlbXB0eSBkYXRhXG4gICAgaWYgKGhlYWRlclN1YmhlYWRlclN0cnVjdHVyZS5sZW5ndGggPT09IDAgfHwgYWxsRW5naW5lZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEVtcHR5U3RhdGVcbiAgICAgICAgICAgICAgICBtZXNzYWdlPVwiTm8gRW5naW5lZXJzIEF2YWlsYWJsZVwiXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb249e1xuICAgICAgICAgICAgICAgICAgICB1c2VyUGVybWlzc2lvbnMuY3Jvc3NUZWFtQWNjZXNzXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFwiTm8gZW5naW5lZXJzIGZvdW5kLiBQbGVhc2UgY2hlY2sgeW91ciBkYXRhIGNvbmZpZ3VyYXRpb24uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogXCJObyBlbmdpbmVlcnMgZm91bmQgaW4geW91ciBhY2Nlc3NpYmxlIHRlYW1zLiBDb250YWN0IHlvdXIgYWRtaW5pc3RyYXRvciBpZiB0aGlzIHNlZW1zIGluY29ycmVjdC5cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BzaGlmdC1zY2hlZHVsZXItdW5pZmllZCAke2NsYXNzTmFtZX1gfT5cbiAgICAgICAgICAgIHsvKiBFbmhhbmNlZCBkZWJ1ZyBpbmZvIHBhbmVsICovfVxuICAgICAgICAgICAge3Nob3dEZWJ1Z0luZm8gJiYgKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwiI2UwZjJmZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogXCIxMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIxMXB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJCb3R0b206IFwiMXB4IHNvbGlkICMwMjg0YzdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiMwYzRhNmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IFwibW9ub3NwYWNlXCJcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICDwn5SNIERlYnVnOiBIZWFkZXJzOiB7aGVhZGVyU3ViaGVhZGVyU3RydWN0dXJlLmxlbmd0aH0sIEVuZ2luZWVyczoge2FsbEVuZ2luZWVycy5sZW5ndGh9LCBTaGlmdHM6e1wiIFwifVxuICAgICAgICAgICAgICAgICAgICAgICAge3NoaWZ0cy5sZW5ndGh9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PvCfk4ogU2hpZnQgTG9va3VwIEtleXM6IHtPYmplY3Qua2V5cyhzaGlmdExvb2t1cCkubGVuZ3RofTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAg8J+Pl++4jyBHcm91cGluZzp7XCIgXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICB7QXJyYXkuaXNBcnJheShncm91cGluZ0RlYnVnSW5mbykgPyBncm91cGluZ0RlYnVnSW5mby5qb2luKFwiIHwgXCIpIDogXCJEZWJ1ZyBpbmZvIHVuYXZhaWxhYmxlXCJ9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7ZGVidWdJbmZvICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg4pqZ77iPIENvbmZpZzogTmFtZT17ZGVidWdJbmZvLmF0dHJpYnV0ZXNDb25maWd1cmVkLm5hbWUgPyBcIuKchVwiIDogXCLinYxcIn0sIEhlYWRlcj1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGVidWdJbmZvLmF0dHJpYnV0ZXNDb25maWd1cmVkLmhlYWRlciA/IFwi4pyFXCIgOiBcIuKdjFwifSwgU3ViaGVhZGVyPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkZWJ1Z0luZm8uYXR0cmlidXRlc0NvbmZpZ3VyZWQuc3ViaGVhZGVyID8gXCLinIVcIiA6IFwi4p2MXCJ9LCBTUFVzZXI9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2RlYnVnSW5mby5hdHRyaWJ1dGVzQ29uZmlndXJlZC5zcFVzZXJBc3NvY2lhdGlvbiA/IFwi4pyFXCIgOiBcIuKdjFwifSwgU2hpZnQ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2RlYnVnSW5mby5hdHRyaWJ1dGVzQ29uZmlndXJlZC5zaGlmdEFzc29jaWF0aW9uID8gXCLinIVcIiA6IFwi4p2MXCJ9LCBTaGlmdERhdGU9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2RlYnVnSW5mby5hdHRyaWJ1dGVzQ29uZmlndXJlZC5zaGlmdERhdGUgPyBcIuKchVwiIDogXCLinYxcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICB7c2hpZnRzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDwn46vIEZpcnN0IFNoaWZ0OiBJRD17c2hpZnRzWzBdPy5lbmdpbmVlcklkfSwgRGF0ZT17c2hpZnRzWzBdPy5kYXRlfSwgVHlwZT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3R5cGVvZiBzaGlmdHNbMF0/LmRhdGV9LCBTaGlmdD17c2hpZnRzWzBdPy5zaGlmdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PvCflJEgU2FtcGxlIEtleXM6IHtPYmplY3Qua2V5cyhzaGlmdExvb2t1cCkuc2xpY2UoMCwgMykuam9pbihcIiwgXCIpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHthbGxFbmdpbmVlcnMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIPCfkaQgRmlyc3QgRW5naW5lZXI6IElEPXthbGxFbmdpbmVlcnNbMF0/LmlkfSwgTmFtZT17YWxsRW5naW5lZXJzWzBdPy5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHtkYXRlQ29sdW1ucy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg8J+ThSBUaW1lbGluZToge2RhdGVDb2x1bW5zWzBdPy5kYXRlU3RyaW5nfSB0b3tcIiBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGF0ZUNvbHVtbnNbZGF0ZUNvbHVtbnMubGVuZ3RoIC0gMV0/LmRhdGVTdHJpbmd9ICh7ZGF0ZUNvbHVtbnMubGVuZ3RofSBkYXlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICDwn5SNIFRlc3QgTG9va3VwOiBLZXk9e2FsbEVuZ2luZWVyc1swXT8uaWR9LXtkYXRlQ29sdW1uc1swXT8uZGF0ZVN0cmluZ30gRm91bmQ9XG4gICAgICAgICAgICAgICAgICAgICAgICB7ISFzaGlmdExvb2t1cFtgJHthbGxFbmdpbmVlcnNbMF0/LmlkfS0ke2RhdGVDb2x1bW5zWzBdPy5kYXRlU3RyaW5nfWBdfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIPCflI0gRW5naW5lZXIgSUQgVHlwZXM6IEVuZ2luZWVyPXt0eXBlb2YgYWxsRW5naW5lZXJzWzBdPy5pZH0sIFNoaWZ0PVxuICAgICAgICAgICAgICAgICAgICAgICAge3R5cGVvZiBzaGlmdHNbMF0/LmVuZ2luZWVySWR9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAg8J+UjSBEYXRlIE1hdGNoIFRlc3Q6IFRpbWVsaW5lPXtkYXRlQ29sdW1uc1swXT8uZGF0ZVN0cmluZ30sIFNoaWZ0PXtzaGlmdHNbMF0/LmRhdGV9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAg8J+TiCBQZXJmb3JtYW5jZToge09iamVjdC5rZXlzKHNoaWZ0TG9va3VwKS5sZW5ndGh9IGxvb2t1cCBrZXlzLHtcIiBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHthbGxFbmdpbmVlcnMubGVuZ3RoICogZGF0ZUNvbHVtbnMubGVuZ3RofSB0b3RhbCBjZWxsc1xuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIPCfk4ogU2hpZnQgU3RhdHM6IE06e3NoaWZ0U3RhdHMuTX0gRTp7c2hpZnRTdGF0cy5FfSBOOntzaGlmdFN0YXRzLk59IEQ6e3NoaWZ0U3RhdHMuRH0gSDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHtzaGlmdFN0YXRzLkh9IFQ6e3NoaWZ0U3RhdHMuVH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZENlbGxzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDwn46vIFNlbGVjdGVkOiB7c2VsZWN0ZWRDZWxscy5sZW5ndGh9IGNlbGwocyl7XCIgXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkQ2VsbHMubGVuZ3RoID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYCgke2FsbEVuZ2luZWVycy5maW5kKGUgPT4gZS5pZCA9PT0gc2VsZWN0ZWRDZWxsc1swXS5lbmdpbmVlcklkKT8ubmFtZX0gb24gJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDZWxsc1swXS5kYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJcIn17XCIgXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLSBDdHJsK2NsaWNrOiB0b2dnbGUsIFNoaWZ0K2NsaWNrOiByYW5nZSwgQXJyb3dzOiBuYXZpZ2F0ZSwgRW50ZXIvU3BhY2U6IGVkaXQsIEVzYzogY2xlYXJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogXCI4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNmMGYwZjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjhweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI0cHhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPvCflI0gRmluZCBlbmdpbmVlcnMgd2l0aCBzaGlmdHM6PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwcmUgc3R5bGU9e3sgZm9udFNpemU6IFwiOXB4XCIsIG92ZXJmbG93OiBcImF1dG9cIiwgbWF4SGVpZ2h0OiBcIjgwcHhcIiB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW5naW5lZXJzV2l0aFNoaWZ0cyA9IGFsbEVuZ2luZWVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihlbmcgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc1NoaWZ0ID0gc2hpZnRMb29rdXBbYCR7ZW5nLmlkfS0ke2RhdGVDb2x1bW5zWzBdPy5kYXRlU3RyaW5nfWBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNTaGlmdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoMCwgMyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lZXJzV2l0aFNoaWZ0cy5tYXAoZW5nID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGVuZy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBlbmcubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IGVuZy5oZWFkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViaGVhZGVyOiBlbmcuc3ViaGVhZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1NoaWZ0T25GaXJzdERhdGU6ICEhc2hpZnRMb29rdXBbYCR7ZW5nLmlkfS0ke2RhdGVDb2x1bW5zWzBdPy5kYXRlU3RyaW5nfWBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiBcIjRweFwiIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+8J+UjSBTYW1wbGUgc2hpZnQgZW5naW5lZXIgSURzOjwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cHJlIHN0eWxlPXt7IGZvbnRTaXplOiBcIjlweFwiLCBvdmVyZmxvdzogXCJhdXRvXCIsIG1heEhlaWdodDogXCI4MHB4XCIgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge0pTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlmdHMuc2xpY2UoMCwgNSkubWFwKHNoaWZ0ID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlmdElkOiBzaGlmdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZWVySWQ6IHNoaWZ0LmVuZ2luZWVySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlmdDogc2hpZnQuc2hpZnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlOiBzaGlmdC5kYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiBcIjRweFwiIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+8J+SoSBDaGVjazogRG8gYW55IGVuZ2luZWVyIElEcyBtYXRjaCBzaGlmdCBlbmdpbmVlciBJRHM/PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwcmUgc3R5bGU9e3sgZm9udFNpemU6IFwiOXB4XCIsIG92ZXJmbG93OiBcImF1dG9cIiwgbWF4SGVpZ2h0OiBcIjYwcHhcIiB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hpZnRFbmdpbmVlcklkcyA9IG5ldyBTZXQoc2hpZnRzLm1hcChzID0+IHMuZW5naW5lZXJJZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmdpbmVlcklkcyA9IG5ldyBTZXQoYWxsRW5naW5lZXJzLm1hcChlID0+IGUuaWQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IFsuLi5zaGlmdEVuZ2luZWVySWRzXS5maWx0ZXIoaWQgPT4gZW5naW5lZXJJZHMuaGFzKGlkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvdGFsU2hpZnRFbmdpbmVlcnMgPSBzaGlmdEVuZ2luZWVySWRzLnNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvdGFsRW5naW5lZXJzID0gZW5naW5lZXJJZHMuc2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hpbmdJZHM6IG1hdGNoZXMuc2xpY2UoMCwgMyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxNYXRjaGVzOiBtYXRjaGVzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3RhbFNoaWZ0RW5naW5lZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsRW5naW5lZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbXBsZVNoaWZ0SWRzOiBbLi4uc2hpZnRFbmdpbmVlcklkc10uc2xpY2UoMCwgMyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FtcGxlRW5naW5lZXJJZHM6IFsuLi5lbmdpbmVlcklkc10uc2xpY2UoMCwgMylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3ByZT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiOHB4XCIgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz7wn5SNIFJhdyBTUFVzZXIgT2JqZWN0IFByb3BlcnRpZXM6PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwcmUgc3R5bGU9e3sgZm9udFNpemU6IFwiOXB4XCIsIG92ZXJmbG93OiBcImF1dG9cIiwgbWF4SGVpZ2h0OiBcIjgwcHhcIiB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YWxsRW5naW5lZXJzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGFsbEVuZ2luZWVyc1swXS5tZW5kaXhPYmplY3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGxPd25Qcm9wZXJ0aWVzOiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhbGxFbmdpbmVlcnNbMF0ubWVuZGl4T2JqZWN0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbFByb3RvdHlwZVByb3BlcnRpZXM6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihhbGxFbmdpbmVlcnNbMF0ubWVuZGl4T2JqZWN0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdEtleXM6IE9iamVjdC5rZXlzKGFsbEVuZ2luZWVyc1swXS5tZW5kaXhPYmplY3QpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0QWNjZXNzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXNlcm5hbWU6IChhbGxFbmdpbmVlcnNbMF0ubWVuZGl4T2JqZWN0IGFzIGFueSkuVXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmFtZTogKGFsbEVuZ2luZWVyc1swXS5tZW5kaXhPYmplY3QgYXMgYW55KS5OYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVtYWlsOiAoYWxsRW5naW5lZXJzWzBdLm1lbmRpeE9iamVjdCBhcyBhbnkpLkVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFiYnJldmlhdGlvbjogKGFsbEVuZ2luZWVyc1swXS5tZW5kaXhPYmplY3QgYXMgYW55KS5BYmJyZXZpYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IChhbGxFbmdpbmVlcnNbMF0ubWVuZGl4T2JqZWN0IGFzIGFueSkuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2ZDaGVjazogdHlwZW9mIGFsbEVuZ2luZWVyc1swXS5tZW5kaXhPYmplY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdHJ1Y3Rvck5hbWU6IGFsbEVuZ2luZWVyc1swXS5tZW5kaXhPYmplY3QuY29uc3RydWN0b3IubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiTm8gZW5naW5lZXJzXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3ByZT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiOHB4XCIgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz7wn5SNIFJhdyBDYWxlbmRhckV2ZW50IE9iamVjdCBQcm9wZXJ0aWVzOjwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cHJlIHN0eWxlPXt7IGZvbnRTaXplOiBcIjlweFwiLCBvdmVyZmxvdzogXCJhdXRvXCIsIG1heEhlaWdodDogXCI4MHB4XCIgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3NoaWZ0cy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBzaGlmdHNbMF0ubWVuZGl4T2JqZWN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsUHJvcGVydGllczogT2JqZWN0LmtleXMoc2hpZnRzWzBdLm1lbmRpeE9iamVjdCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RBY2Nlc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTUFVzZXI6IChzaGlmdHNbMF0ubWVuZGl4T2JqZWN0IGFzIGFueSkuU1BVc2VyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENhbGVuZGFyRXZlbnRzX1NQVXNlcjogKHNoaWZ0c1swXS5tZW5kaXhPYmplY3QgYXMgYW55KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuQ2FsZW5kYXJFdmVudHNfU1BVc2VyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuZ2luZWVyOiAoc2hpZnRzWzBdLm1lbmRpeE9iamVjdCBhcyBhbnkpLkVuZ2luZWVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVzZXI6IChzaGlmdHNbMF0ubWVuZGl4T2JqZWN0IGFzIGFueSkuVXNlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiTm8gc2hpZnRzXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzY2hlZHVsZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgey8qIEhlYWRlciBSb3cgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzY2hlZHVsZXItaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZW5naW5lZXItY29sdW1uLWhlYWRlclwiPkVuZ2luZWVyPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtY29udGFpbmVyXCIgcmVmPXtoZWFkZXJTY3JvbGxSZWZ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGF0ZUNvbHVtbnMubWFwKChjb2wsIGlkeCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2lkeH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGRhdGUtaGVhZGVyICR7Y29sLmlzVG9kYXkgPyBcImRhdGUtaGVhZGVyLXRvZGF5XCIgOiBcIlwifSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbC5pc1dlZWtlbmQgPyBcImRhdGUtaGVhZGVyLXdlZWtlbmRcIiA6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRhdGUtZGF5XCI+e2NvbC5kYXRlLmdldERhdGUoKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGF0ZS1tb250aFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb2wuZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoXCJlblwiLCB7IG1vbnRoOiBcInNob3J0XCIgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogQ29udGVudCBBcmVhICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2NoZWR1bGVyLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJlbmdpbmVlci1uYW1lcy1jb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtoZWFkZXJTdWJoZWFkZXJTdHJ1Y3R1cmUubWFwKGhlYWRlckRhdGEgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtoZWFkZXJEYXRhLmhlYWRlcklkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZWFtLW5hbWUtY2VsbFwiPntoZWFkZXJEYXRhLmhlYWRlck5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtoZWFkZXJEYXRhLnN1YmhlYWRlcnMubWFwKHN1YmhlYWRlciA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17YCR7aGVhZGVyRGF0YS5oZWFkZXJJZH0tJHtzdWJoZWFkZXIubmFtZX1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhbmUtbmFtZS1jZWxsXCI+e3N1YmhlYWRlci5uYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzdWJoZWFkZXIuZW5naW5lZXJzLm1hcChlbmdpbmVlciA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtlbmdpbmVlci5pZH0gY2xhc3NOYW1lPVwiZW5naW5lZXItbmFtZS1jZWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZW5naW5lZXIubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtY29udGFpbmVyXCIgcmVmPXtjb250ZW50U2Nyb2xsUmVmfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtoZWFkZXJTdWJoZWFkZXJTdHJ1Y3R1cmUubWFwKGhlYWRlckRhdGEgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aGVhZGVyRGF0YS5oZWFkZXJJZH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlYW0tdGltZWxpbmUtcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2RhdGVDb2x1bW5zLm1hcCgoXywgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpZHh9IGNsYXNzTmFtZT1cInRlYW0tdGltZWxpbmUtY2VsbFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aGVhZGVyRGF0YS5zdWJoZWFkZXJzLm1hcChzdWJoZWFkZXIgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtgJHtoZWFkZXJEYXRhLmhlYWRlcklkfS0ke3N1YmhlYWRlci5uYW1lfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhbmUtdGltZWxpbmUtcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGF0ZUNvbHVtbnMubWFwKChfLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aWR4fSBjbGFzc05hbWU9XCJsYW5lLXRpbWVsaW5lLWNlbGxcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3N1YmhlYWRlci5lbmdpbmVlcnMubWFwKGVuZ2luZWVyID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtlbmdpbmVlci5pZH0gY2xhc3NOYW1lPVwiZW5naW5lZXItdGltZWxpbmUtcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2RhdGVDb2x1bW5zLm1hcCgoY29sLCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hpZnQgPSBnZXRTaGlmdChlbmdpbmVlci5pZCwgY29sLmRhdGVTdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPERheUNlbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2Ake2VuZ2luZWVyLmlkfS0ke2lkeH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGU9e2NvbC5kYXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZWVyPXtlbmdpbmVlcn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlmdD17c2hpZnR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNUb2RheT17Y29sLmlzVG9kYXl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNXZWVrZW5kPXtjb2wuaXNXZWVrZW5kfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQ9e2lzQ2VsbFNlbGVjdGVkKGVuZ2luZWVyLmlkLCBjb2wuZGF0ZVN0cmluZyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnRzTG9hZGluZz17c2hpZnRzTG9hZGluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRvdWJsZUNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hpZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFeGlzdGluZyBzaGlmdDogZWRpdCBpdCAoc2FtZSBhcyBjb250ZXh0IG1lbnUgZWRpdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob25FZGl0U2hpZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FZGl0U2hpZnQoc2hpZnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRW1wdHkgY2VsbDogY3JlYXRlIG5ldyBzaGlmdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkNyZWF0ZVNoaWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ3JlYXRlU2hpZnQoZW5naW5lZXIuaWQsIGNvbC5kYXRlU3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBFcnJvciBpbiBvbkRvdWJsZUNsaWNrIGZvciAke2VuZ2luZWVyLm5hbWV9OmAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2VsbENsaWNrPXtlID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUNlbGxDbGljayhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZWVyLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sLmRhdGVTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmN0cmxLZXkgfHwgZS5tZXRhS2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zaGlmdEtleVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29udGV4dE1lbnU9e2hhbmRsZUNlbGxDb250ZXh0TWVudX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHJlZj17aW5maW5pdGVTY3JvbGxSZWZ9IGNsYXNzTmFtZT1cInNlbnRpbmVsXCIgc3R5bGU9e3sgaGVpZ2h0OiBcIjIwcHhcIiwgdmlzaWJpbGl0eTogXCJoaWRkZW5cIiB9fSAvPlxuXG4gICAgICAgICAgICB7LyogQ29udGV4dCBNZW51ICovfVxuICAgICAgICAgICAgPENvbnRleHRNZW51XG4gICAgICAgICAgICAgICAgdmlzaWJsZT17Y29udGV4dE1lbnUudmlzaWJsZX1cbiAgICAgICAgICAgICAgICB4PXtjb250ZXh0TWVudS54fVxuICAgICAgICAgICAgICAgIHk9e2NvbnRleHRNZW51Lnl9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17Y29udGV4dE1lbnUub3B0aW9uc31cbiAgICAgICAgICAgICAgICBvbkNsb3NlPXtjbG9zZUNvbnRleHRNZW51fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5cbi8vIEV4cG9ydCB3aXRoIGVycm9yIGJvdW5kYXJ5IGZvciBwcm9kdWN0aW9uIHJlc2lsaWVuY2VcbmV4cG9ydCBkZWZhdWx0IHdpdGhFcnJvckJvdW5kYXJ5KFNjaGVkdWxlR3JpZCk7XG4iLCJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgTGlzdFZhbHVlLCBPYmplY3RJdGVtLCBMaXN0QXR0cmlidXRlVmFsdWUsIExpc3RSZWZlcmVuY2VWYWx1ZSB9IGZyb20gXCJtZW5kaXhcIjtcbmltcG9ydCB7IFVzZVNoaWZ0RGF0YVJldHVybiwgRW5naW5lZXIsIFNoaWZ0QXNzaWdubWVudCwgU2hpZnRUeXBlLCBWYWxpZGF0aW9uRXJyb3IgfSBmcm9tIFwiLi4vdHlwZXMvc2hpZnRTY2hlZHVsZXJcIjtcblxuaW50ZXJmYWNlIERhdGFTdGF0ZSB7XG4gICAgZW5naW5lZXJzOiBFbmdpbmVlcltdO1xuICAgIHNoaWZ0czogU2hpZnRBc3NpZ25tZW50W107XG4gICAgc2hpZnRzTG9hZGluZzogYm9vbGVhbjtcbiAgICBlcnJvcjogVmFsaWRhdGlvbkVycm9yIHwgbnVsbDtcbn1cblxuaW50ZXJmYWNlIFVzZVNoaWZ0RGF0YVByb3BzIHtcbiAgICBlbmdpbmVlcnNTb3VyY2U6IExpc3RWYWx1ZTtcbiAgICBzaGlmdHNTb3VyY2U/OiBMaXN0VmFsdWU7XG4gICAgbmFtZUF0dHJpYnV0ZT86IExpc3RBdHRyaWJ1dGVWYWx1ZTxzdHJpbmc+O1xuICAgIGhlYWRlckF0dHJpYnV0ZT86IExpc3RBdHRyaWJ1dGVWYWx1ZTxzdHJpbmc+O1xuICAgIHN1YmhlYWRlckF0dHJpYnV0ZT86IExpc3RBdHRyaWJ1dGVWYWx1ZTxzdHJpbmc+O1xuICAgIHN0YXJ0VGltZUF0dHJpYnV0ZT86IExpc3RBdHRyaWJ1dGVWYWx1ZTxEYXRlPjtcbiAgICBkYXlUeXBlQXR0cmlidXRlPzogTGlzdEF0dHJpYnV0ZVZhbHVlPHN0cmluZz47XG4gICAgc3RhdHVzQXR0cmlidXRlPzogTGlzdEF0dHJpYnV0ZVZhbHVlPHN0cmluZz47XG4gICAgc3BVc2VyQXNzb2NpYXRpb24/OiBMaXN0UmVmZXJlbmNlVmFsdWU7XG4gICAgc2hpZnRBc3NvY2lhdGlvbj86IExpc3RSZWZlcmVuY2VWYWx1ZTtcbiAgICBzaGlmdERhdGVBdHRyaWJ1dGU/OiBMaXN0QXR0cmlidXRlVmFsdWU8RGF0ZT47XG59XG5cbmV4cG9ydCBjb25zdCB1c2VTaGlmdERhdGEgPSAoe1xuICAgIGVuZ2luZWVyc1NvdXJjZSxcbiAgICBzaGlmdHNTb3VyY2UsXG4gICAgbmFtZUF0dHJpYnV0ZSxcbiAgICBoZWFkZXJBdHRyaWJ1dGUsXG4gICAgc3ViaGVhZGVyQXR0cmlidXRlLFxuICAgIHN0YXJ0VGltZUF0dHJpYnV0ZSxcbiAgICBkYXlUeXBlQXR0cmlidXRlLFxuICAgIHN0YXR1c0F0dHJpYnV0ZSxcbiAgICBzcFVzZXJBc3NvY2lhdGlvbixcbiAgICBzaGlmdEFzc29jaWF0aW9uLFxuICAgIHNoaWZ0RGF0ZUF0dHJpYnV0ZVxufTogVXNlU2hpZnREYXRhUHJvcHMpOiBVc2VTaGlmdERhdGFSZXR1cm4gPT4ge1xuICAgIGNvbnN0IFtkYXRhU3RhdGUsIHNldERhdGFTdGF0ZV0gPSB1c2VTdGF0ZTxEYXRhU3RhdGU+KHtcbiAgICAgICAgZW5naW5lZXJzOiBbXSxcbiAgICAgICAgc2hpZnRzOiBbXSxcbiAgICAgICAgc2hpZnRzTG9hZGluZzogdHJ1ZSxcbiAgICAgICAgZXJyb3I6IG51bGxcbiAgICB9KTtcblxuICAgIC8vIFZhbGlkYXRpb24gaGVscGVyXG4gICAgY29uc3QgdmFsaWRhdGVDb25maWd1cmF0aW9uID0gdXNlQ2FsbGJhY2soKCk6IFZhbGlkYXRpb25FcnJvciB8IG51bGwgPT4ge1xuICAgICAgICBpZiAoIWVuZ2luZWVyc1NvdXJjZSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgbWVzc2FnZTogXCJFbmdpbmVlcnMgZGF0YSBzb3VyY2UgaXMgcmVxdWlyZWRcIiwgcHJvcGVydHk6IFwiZW5naW5lZXJzXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbmdpbmVlcnNTb3VyY2Uuc3RhdHVzID09PSBcInVuYXZhaWxhYmxlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB7IG1lc3NhZ2U6IFwiRW5naW5lZXJzIGRhdGEgc291cmNlIGlzIHVuYXZhaWxhYmxlXCIsIHByb3BlcnR5OiBcImVuZ2luZWVyc1wiIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW5hbWVBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IG1lc3NhZ2U6IFwiTmFtZSBhdHRyaWJ1dGUgaXMgcmVxdWlyZWQgZm9yIGVuZ2luZWVyc1wiLCBwcm9wZXJ0eTogXCJuYW1lQXR0cmlidXRlXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaGVhZGVyQXR0cmlidXRlKSB7XG4gICAgICAgICAgICByZXR1cm4geyBtZXNzYWdlOiBcIkhlYWRlciBhdHRyaWJ1dGUgaXMgcmVxdWlyZWQgZm9yIGVuZ2luZWVyc1wiLCBwcm9wZXJ0eTogXCJoZWFkZXJBdHRyaWJ1dGVcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVmFsaWRhdGUgc2hpZnRzIGNvbmZpZ3VyYXRpb24gaWYgcHJvdmlkZWRcbiAgICAgICAgaWYgKHNoaWZ0c1NvdXJjZSAmJiBzaGlmdHNTb3VyY2Uuc3RhdHVzID09PSBcInVuYXZhaWxhYmxlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB7IG1lc3NhZ2U6IFwiU2hpZnRzIGRhdGEgc291cmNlIGlzIHVuYXZhaWxhYmxlXCIsIHByb3BlcnR5OiBcInNoaWZ0c1wiIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2hpZnRzU291cmNlICYmICFzdGFydFRpbWVBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJTdGFydCB0aW1lIGF0dHJpYnV0ZSBpcyByZXF1aXJlZCB3aGVuIHNoaWZ0cyBkYXRhIHNvdXJjZSBpcyBwcm92aWRlZFwiLFxuICAgICAgICAgICAgICAgIHByb3BlcnR5OiBcInN0YXJ0VGltZUF0dHJpYnV0ZVwiXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSwgW2VuZ2luZWVyc1NvdXJjZSwgc2hpZnRzU291cmNlLCBuYW1lQXR0cmlidXRlLCBoZWFkZXJBdHRyaWJ1dGUsIHN0YXJ0VGltZUF0dHJpYnV0ZV0pO1xuXG4gICAgLy8gVHJhbnNmb3JtIE1lbmRpeCBlbmdpbmVlcnMgZGF0YSB3aXRoIGVycm9yIGhhbmRsaW5nXG4gICAgY29uc3QgdHJhbnNmb3JtZWRFbmdpbmVlcnMgPSB1c2VNZW1vKCgpOiBFbmdpbmVlcltdID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChlbmdpbmVlcnNTb3VyY2Uuc3RhdHVzICE9PSBcImF2YWlsYWJsZVwiIHx8ICFlbmdpbmVlcnNTb3VyY2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBlbmdpbmVlcnNTb3VyY2UuaXRlbXMubWFwKChpdGVtOiBPYmplY3RJdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRGVidWc6IENoZWNrIGF0dHJpYnV0ZSBjb25maWd1cmF0aW9uICh3aWxsIGJlIHNob3duIGluIG1haW4gZGVidWcgcGFuZWwpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU3RvcmUgZGVidWcgaW5mbyB0byBiZSBkaXNwbGF5ZWQgaW4gbWFpbiBwYW5lbCAobm8gZmxvYXRpbmcgZGVidWcgYm94KVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIEFjY2VzcyBTUFVzZXIgcHJvcGVydGllcyB0aHJvdWdoIGNvbmZpZ3VyZWQgYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gbmFtZUF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBuYW1lQXR0cmlidXRlLmdldChpdGVtKS5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IG5hbWVBdHRyaWJ1dGUuZ2V0KGl0ZW0pLnZhbHVlIHx8IFwiVW5rbm93blwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlVua25vd25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlVua25vd25cIjtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXIgPSBoZWFkZXJBdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gaGVhZGVyQXR0cmlidXRlLmdldChpdGVtKS5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGhlYWRlckF0dHJpYnV0ZS5nZXQoaXRlbSkudmFsdWUgfHwgXCJBbGwgRW5naW5lZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiQWxsIEVuZ2luZWVyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiQWxsIEVuZ2luZWVyc1wiO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1YmhlYWRlciA9IHN1YmhlYWRlckF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBzdWJoZWFkZXJBdHRyaWJ1dGUuZ2V0KGl0ZW0pLnN0YXR1cyA9PT0gXCJhdmFpbGFibGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gc3ViaGVhZGVyQXR0cmlidXRlLmdldChpdGVtKS52YWx1ZSB8fCBcIkdlbmVyYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJHZW5lcmFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogXCJHZW5lcmFsXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpdGVtLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmhlYWRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbmRpeE9iamVjdDogaXRlbVxuICAgICAgICAgICAgICAgICAgICB9IGFzIEVuZ2luZWVyO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogaXRlbS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiVW5rbm93blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJoZWFkZXI6IFwiR2VuZXJhbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVuZGl4T2JqZWN0OiBpdGVtXG4gICAgICAgICAgICAgICAgICAgIH0gYXMgRW5naW5lZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICB9LCBbZW5naW5lZXJzU291cmNlLCBuYW1lQXR0cmlidXRlLCBoZWFkZXJBdHRyaWJ1dGUsIHN1YmhlYWRlckF0dHJpYnV0ZV0pO1xuXG4gICAgLy8gVHJhbnNmb3JtIE1lbmRpeCBzaGlmdHMgZGF0YSB3aXRoIGVycm9yIGhhbmRsaW5nXG4gICAgY29uc3QgdHJhbnNmb3JtZWRTaGlmdHMgPSB1c2VNZW1vKCgpOiBTaGlmdEFzc2lnbm1lbnRbXSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXNoaWZ0c1NvdXJjZSB8fCBzaGlmdHNTb3VyY2Uuc3RhdHVzICE9PSBcImF2YWlsYWJsZVwiIHx8ICFzaGlmdHNTb3VyY2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERlYnVnIGNvdW50ZXJzICh3aWxsIGJlIHNob3duIGluIGRlYnVnIHBhbmVsIGlmIG5lZWRlZClcbiAgICAgICAgICAgIC8vIGxldCBzdWNjZXNzZnVsQXNzb2NpYXRpb25zID0gMDtcbiAgICAgICAgICAgIC8vIGxldCB0b3RhbFNoaWZ0cyA9IDA7XG5cbiAgICAgICAgICAgIGNvbnN0IHNoaWZ0cyA9IHNoaWZ0c1NvdXJjZS5pdGVtc1xuICAgICAgICAgICAgICAgIC5tYXAoKGl0ZW06IE9iamVjdEl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0VGltZSA9IHN0YXJ0VGltZUF0dHJpYnV0ZT8uZ2V0KGl0ZW0pLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF5VHlwZSA9IGRheVR5cGVBdHRyaWJ1dGU/LmdldChpdGVtKS52YWx1ZSB8fCBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0gc3RhdHVzQXR0cmlidXRlPy5nZXQoaXRlbSkudmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRyeSB0byBnZXQgdGhlIGFjdHVhbCBzaGlmdCBkYXRlIGZyb20gQ2FsZW5kYXJFdmVudHNfU2hpZnQvU2hpZnQvRGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNoaWZ0RGF0ZTogRGF0ZSB8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaGlmdEFzc29jaWF0aW9uICYmIHNoaWZ0RGF0ZUF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoaWZ0UmVmID0gc2hpZnRBc3NvY2lhdGlvbi5nZXQoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNoaWZ0UmVmLnN0YXR1cyA9PT0gXCJhdmFpbGFibGVcIiAmJiBzaGlmdFJlZi52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGlmdERhdGVWYWx1ZSA9IHNoaWZ0RGF0ZUF0dHJpYnV0ZS5nZXQoc2hpZnRSZWYudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hpZnREYXRlVmFsdWUuc3RhdHVzID09PSBcImF2YWlsYWJsZVwiICYmIHNoaWZ0RGF0ZVZhbHVlLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlmdERhdGUgPSBzaGlmdERhdGVWYWx1ZS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGVidWc6IEFzc29jaWF0aW9uIGFjY2VzcyAod2lsbCBiZSBzaG93biBpbiBtYWluIGRlYnVnIHBhbmVsKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUcnkgdG8gZ2V0IGVuZ2luZWVyIElEIHRocm91Z2ggdGhlIFNQVXNlciBhc3NvY2lhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVuZ2luZWVySWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXNlIHRoZSBzcFVzZXJBc3NvY2lhdGlvbiB0byBnZXQgdGhlIHJlZmVyZW5jZWQgU1BVc2VyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BVc2VyQXNzb2NpYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzcFVzZXJSZWYgPSBzcFVzZXJBc3NvY2lhdGlvbi5nZXQoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwVXNlclJlZi5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCIgJiYgc3BVc2VyUmVmLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgU1BVc2VyIElEIGZyb20gdGhlIGFzc29jaWF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZWVySWQgPSBzcFVzZXJSZWYudmFsdWUuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN1Y2Nlc3NmdWxBc3NvY2lhdGlvbnMrKztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEZWJ1ZzogQXNzb2NpYXRpb24gc3VjY2Vzc2Z1bCAod2lsbCBiZSBzaG93biBpbiBtYWluIGRlYnVnIHBhbmVsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmFsbGJhY2sgdG8gc2hpZnQgSUQgaWYgbm8gYXNzb2NpYXRpb24gZm91bmRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZW5naW5lZXJJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZWVySWQgPSBpdGVtLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0b3RhbFNoaWZ0cysrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVc2Ugc2hpZnREYXRlIGlmIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIGZhbGwgYmFjayB0byBzdGFydFRpbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIG5laXRoZXIgaXMgYXZhaWxhYmxlLCBza2lwIHRoaXMgc2hpZnQgKGRvbid0IHNob3cgdW5kZWZpbmVkIGV2ZW50cylcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbmFsRGF0ZSA9IHNoaWZ0RGF0ZSB8fCBzdGFydFRpbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbmFsRGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNraXAgc2hpZnRzIHdpdGhvdXQgcHJvcGVyIGRhdGVzIC0gZG9uJ3Qgc2hvdyB0aGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGl0ZW0uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZTogZmluYWxEYXRlLnRvSVNPU3RyaW5nKCkuc3BsaXQoXCJUXCIpWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZWVySWQ6IGVuZ2luZWVySWQgfHwgaXRlbS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlmdDogKGRheVR5cGUgYXMgU2hpZnRUeXBlKSB8fCBcIk1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnREYXRlOiBmaW5hbERhdGUsIC8vIFRoZSBhY3R1YWwgc2hpZnQgZGF0ZSBmcm9tIENhbGVuZGFyRXZlbnRzX1NoaWZ0L1NoaWZ0L0RhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW5kaXhPYmplY3Q6IGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgU2hpZnRBc3NpZ25tZW50O1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2tpcCBpbnZhbGlkIHNoaWZ0cyAtIGRvbid0IHNob3cgdGhlbSB3aXRoIGZha2UgZGF0ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChzaGlmdCk6IHNoaWZ0IGlzIFNoaWZ0QXNzaWdubWVudCA9PiBzaGlmdCAhPT0gbnVsbCk7XG5cbiAgICAgICAgICAgIC8vIERlYnVnOiBBc3NvY2lhdGlvbiBzdWNjZXNzIHJhdGUgKHdpbGwgYmUgc2hvd24gaW4gbWFpbiBkZWJ1ZyBwYW5lbClcblxuICAgICAgICAgICAgcmV0dXJuIHNoaWZ0cztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIH0sIFtcbiAgICAgICAgc2hpZnRzU291cmNlLFxuICAgICAgICBzdGFydFRpbWVBdHRyaWJ1dGUsXG4gICAgICAgIGRheVR5cGVBdHRyaWJ1dGUsXG4gICAgICAgIHN0YXR1c0F0dHJpYnV0ZSxcbiAgICAgICAgc3BVc2VyQXNzb2NpYXRpb24sXG4gICAgICAgIHNoaWZ0QXNzb2NpYXRpb24sXG4gICAgICAgIHNoaWZ0RGF0ZUF0dHJpYnV0ZVxuICAgIF0pO1xuXG4gICAgLy8gTWFpbiBkYXRhIHByb2Nlc3NpbmcgZWZmZWN0IHdpdGggdmFsaWRhdGlvblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25FcnJvciA9IHZhbGlkYXRlQ29uZmlndXJhdGlvbigpO1xuXG4gICAgICAgIGlmICh2YWxpZGF0aW9uRXJyb3IpIHtcbiAgICAgICAgICAgIHNldERhdGFTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZW5naW5lZXJzOiBbXSxcbiAgICAgICAgICAgICAgICBzaGlmdHM6IFtdLFxuICAgICAgICAgICAgICAgIHNoaWZ0c0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVycm9yOiB2YWxpZGF0aW9uRXJyb3JcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2hpZnRzTG9hZGluZyA9IHNoaWZ0c1NvdXJjZT8uc3RhdHVzID09PSBcImxvYWRpbmdcIiB8fCBmYWxzZTtcblxuICAgICAgICBzZXREYXRhU3RhdGUoe1xuICAgICAgICAgICAgZW5naW5lZXJzOiB0cmFuc2Zvcm1lZEVuZ2luZWVycyxcbiAgICAgICAgICAgIHNoaWZ0czogdHJhbnNmb3JtZWRTaGlmdHMsXG4gICAgICAgICAgICBzaGlmdHNMb2FkaW5nLFxuICAgICAgICAgICAgZXJyb3I6IG51bGxcbiAgICAgICAgfSk7XG4gICAgfSwgW3ZhbGlkYXRlQ29uZmlndXJhdGlvbiwgdHJhbnNmb3JtZWRFbmdpbmVlcnMsIHRyYW5zZm9ybWVkU2hpZnRzLCBlbmdpbmVlcnNTb3VyY2Uuc3RhdHVzLCBzaGlmdHNTb3VyY2U/LnN0YXR1c10pO1xuXG4gICAgLy8gRW5oYW5jZWQgaGVscGVyIG1ldGhvZHMgd2l0aCBlcnJvciBoYW5kbGluZ1xuICAgIGNvbnN0IGdldFNoaWZ0c0ZvckVuZ2luZWVyID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChlbmdpbmVlcklkOiBzdHJpbmcpOiBTaGlmdEFzc2lnbm1lbnRbXSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhU3RhdGUuc2hpZnRzLmZpbHRlcihzaGlmdCA9PiBzaGlmdC5lbmdpbmVlcklkID09PSBlbmdpbmVlcklkKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbZGF0YVN0YXRlLnNoaWZ0c11cbiAgICApO1xuXG4gICAgY29uc3QgZ2V0RW5naW5lZXJzQnlUZWFtID0gdXNlQ2FsbGJhY2soKCk6IHsgW2hlYWRlcjogc3RyaW5nXTogRW5naW5lZXJbXSB9ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlckdyb3VwczogeyBbaGVhZGVyOiBzdHJpbmddOiBFbmdpbmVlcltdIH0gPSB7fTtcbiAgICAgICAgICAgIGRhdGFTdGF0ZS5lbmdpbmVlcnMuZm9yRWFjaChlbmdpbmVlciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyTmFtZSA9IGVuZ2luZWVyLmhlYWRlcjtcbiAgICAgICAgICAgICAgICBpZiAoIWhlYWRlckdyb3Vwc1toZWFkZXJOYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJHcm91cHNbaGVhZGVyTmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaGVhZGVyR3JvdXBzW2hlYWRlck5hbWVdLnB1c2goZW5naW5lZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gaGVhZGVyR3JvdXBzO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgfSwgW2RhdGFTdGF0ZS5lbmdpbmVlcnNdKTtcblxuICAgIGNvbnN0IGdldFNoaWZ0Rm9yRGF0ZSA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoZW5naW5lZXJJZDogc3RyaW5nLCBkYXRlOiBzdHJpbmcpOiBTaGlmdEFzc2lnbm1lbnQgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVN0YXRlLnNoaWZ0cy5maW5kKHNoaWZ0ID0+IHNoaWZ0LmVuZ2luZWVySWQgPT09IGVuZ2luZWVySWQgJiYgc2hpZnQuZGF0ZSA9PT0gZGF0ZSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtkYXRhU3RhdGUuc2hpZnRzXVxuICAgICk7XG5cbiAgICBjb25zdCB1cGRhdGVTaGlmdCA9IHVzZUNhbGxiYWNrKChzaGlmdElkOiBzdHJpbmcsIHVwZGF0ZXM6IFBhcnRpYWw8U2hpZnRBc3NpZ25tZW50PikgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2V0RGF0YVN0YXRlKHByZXYgPT4gKHtcbiAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgIHNoaWZ0czogcHJldi5zaGlmdHMubWFwKHNoaWZ0ID0+IChzaGlmdC5pZCA9PT0gc2hpZnRJZCA/IHsgLi4uc2hpZnQsIC4uLnVwZGF0ZXMgfSA6IHNoaWZ0KSlcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIFNpbGVudGx5IGZhaWxcbiAgICAgICAgfVxuICAgIH0sIFtdKTtcblxuICAgIGNvbnN0IGdldEVuZ2luZWVyQnlJZCA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoZW5naW5lZXJJZDogc3RyaW5nKTogRW5naW5lZXIgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVN0YXRlLmVuZ2luZWVycy5maW5kKGVuZ2luZWVyID0+IGVuZ2luZWVyLmlkID09PSBlbmdpbmVlcklkKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW2RhdGFTdGF0ZS5lbmdpbmVlcnNdXG4gICAgKTtcblxuICAgIGNvbnN0IGdldFNoaWZ0c0J5RGF0ZVJhbmdlID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChzdGFydERhdGU6IHN0cmluZywgZW5kRGF0ZTogc3RyaW5nKTogU2hpZnRBc3NpZ25tZW50W10gPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVN0YXRlLnNoaWZ0cy5maWx0ZXIoc2hpZnQgPT4gc2hpZnQuZGF0ZSA+PSBzdGFydERhdGUgJiYgc2hpZnQuZGF0ZSA8PSBlbmREYXRlKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbZGF0YVN0YXRlLnNoaWZ0c11cbiAgICApO1xuXG4gICAgY29uc3QgcmVmcmVzaERhdGEgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBGb3JjZSByZS1ldmFsdWF0aW9uIG9mIGRhdGEgc291cmNlc1xuICAgICAgICAgICAgc2V0RGF0YVN0YXRlKHByZXYgPT4gKHsgLi4ucHJldiwgbG9hZGluZzogdHJ1ZSwgZXJyb3I6IG51bGwgfSkpO1xuICAgICAgICAgICAgLy8gSW4gYSByZWFsIGltcGxlbWVudGF0aW9uLCB0aGlzIHdvdWxkIHRyaWdnZXIgZGF0YSByZWZyZXNoXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3IgPSB2YWxpZGF0ZUNvbmZpZ3VyYXRpb24oKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhU3RhdGUocHJldiA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZW5naW5lZXJzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHNoaWZ0c0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogdmFsaWRhdGlvbkVycm9yXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHNldERhdGFTdGF0ZShwcmV2ID0+ICh7XG4gICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogeyBtZXNzYWdlOiBcIkZhaWxlZCB0byByZWZyZXNoIGRhdGFcIiB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICB9LCBbdmFsaWRhdGVDb25maWd1cmF0aW9uXSk7XG5cbiAgICAvLyBDYWxjdWxhdGUgbG9hZGluZyBzdGF0ZSB3aGVuIG5lZWRlZFxuICAgIGNvbnN0IGVuZ2luZWVyc0xvYWRpbmcgPSBlbmdpbmVlcnNTb3VyY2Uuc3RhdHVzID09PSBcImxvYWRpbmdcIjtcbiAgICBjb25zdCBsb2FkaW5nID0gZW5naW5lZXJzTG9hZGluZyB8fCBkYXRhU3RhdGUuc2hpZnRzTG9hZGluZztcblxuICAgIHJldHVybiB7XG4gICAgICAgIGVuZ2luZWVyczogZGF0YVN0YXRlLmVuZ2luZWVycyxcbiAgICAgICAgc2hpZnRzOiBkYXRhU3RhdGUuc2hpZnRzLFxuICAgICAgICBsb2FkaW5nLFxuICAgICAgICBzaGlmdHNMb2FkaW5nOiBkYXRhU3RhdGUuc2hpZnRzTG9hZGluZyxcbiAgICAgICAgZXJyb3I6IGRhdGFTdGF0ZS5lcnJvcixcbiAgICAgICAgZ2V0U2hpZnRzRm9yRW5naW5lZXIsXG4gICAgICAgIGdldEVuZ2luZWVyc0J5VGVhbSxcbiAgICAgICAgZ2V0U2hpZnRGb3JEYXRlLFxuICAgICAgICB1cGRhdGVTaGlmdCxcbiAgICAgICAgZ2V0RW5naW5lZXJCeUlkLFxuICAgICAgICBnZXRTaGlmdHNCeURhdGVSYW5nZSxcbiAgICAgICAgcmVmcmVzaERhdGEsXG4gICAgICAgIGRlYnVnSW5mbzoge1xuICAgICAgICAgICAgYXR0cmlidXRlc0NvbmZpZ3VyZWQ6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAhIW5hbWVBdHRyaWJ1dGUsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiAhIWhlYWRlckF0dHJpYnV0ZSxcbiAgICAgICAgICAgICAgICBzdWJoZWFkZXI6ICEhc3ViaGVhZGVyQXR0cmlidXRlLFxuICAgICAgICAgICAgICAgIHNwVXNlckFzc29jaWF0aW9uOiAhIXNwVXNlckFzc29jaWF0aW9uLFxuICAgICAgICAgICAgICAgIHNoaWZ0QXNzb2NpYXRpb246ICEhc2hpZnRBc3NvY2lhdGlvbixcbiAgICAgICAgICAgICAgICBzaGlmdERhdGU6ICEhc2hpZnREYXRlQXR0cmlidXRlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcbiIsImltcG9ydCB7IFJlYWN0RWxlbWVudCwgY3JlYXRlRWxlbWVudCwgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFNoaWZ0U2NoZWR1bGVyQ29udGFpbmVyUHJvcHMgfSBmcm9tIFwiLi4vdHlwaW5ncy9TaGlmdFNjaGVkdWxlclByb3BzXCI7XG5pbXBvcnQgU2NoZWR1bGVHcmlkIGZyb20gXCIuL2NvbXBvbmVudHMvU2NoZWR1bGVHcmlkXCI7XG5pbXBvcnQgeyB1c2VTaGlmdERhdGEgfSBmcm9tIFwiLi9ob29rcy91c2VTaGlmdERhdGFcIjtcbmltcG9ydCBcIi4vdWkvU2hpZnRTY2hlZHVsZXIuY3NzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBTaGlmdFNjaGVkdWxlcih7XG4gICAgbmFtZSxcbiAgICBjbGFzczogY2xhc3NOYW1lLFxuICAgIHN0eWxlLFxuICAgIHRhYkluZGV4LFxuICAgIGVuZ2luZWVycyxcbiAgICBzaGlmdHMsXG4gICAgbmFtZUF0dHJpYnV0ZSxcbiAgICBoZWFkZXJBdHRyaWJ1dGUsXG4gICAgc3ViaGVhZGVyQXR0cmlidXRlLFxuICAgIHNob3dEZWJ1Z0luZm8sXG4gICAgc3RhcnRUaW1lQXR0cmlidXRlLFxuICAgIGVuZFRpbWVBdHRyaWJ1dGU6IF9lbmRUaW1lQXR0cmlidXRlLFxuICAgIGRheVR5cGVBdHRyaWJ1dGUsXG4gICAgZXZlbnRUeXBlQXR0cmlidXRlOiBfZXZlbnRUeXBlQXR0cmlidXRlLFxuICAgIHN0YXR1c0F0dHJpYnV0ZSxcbiAgICBzcFVzZXJBc3NvY2lhdGlvbixcbiAgICBzcFVzZXJEYXRhc291cmNlOiBfc3BVc2VyRGF0YXNvdXJjZSxcbiAgICBzaGlmdEFzc29jaWF0aW9uLFxuICAgIHNoaWZ0RGF0YXNvdXJjZTogX3NoaWZ0RGF0YXNvdXJjZSxcbiAgICBzaGlmdERhdGVBdHRyaWJ1dGUsXG4gICAgb25FZGl0U2hpZnQsXG4gICAgb25DcmVhdGVTaGlmdCxcbiAgICBvbkRlbGV0ZVNoaWZ0LFxuICAgIG9uQmF0Y2hDcmVhdGUsXG4gICAgb25CYXRjaEVkaXQsXG4gICAgb25CYXRjaERlbGV0ZVxufTogU2hpZnRTY2hlZHVsZXJDb250YWluZXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3Qge1xuICAgICAgICBlbmdpbmVlcnM6IGVuZ2luZWVyRGF0YSxcbiAgICAgICAgc2hpZnRzOiBzaGlmdHNEYXRhLFxuICAgICAgICBsb2FkaW5nLFxuICAgICAgICBzaGlmdHNMb2FkaW5nLFxuICAgICAgICBlcnJvcixcbiAgICAgICAgZ2V0U2hpZnRzRm9yRW5naW5lZXIsXG4gICAgICAgIGdldEVuZ2luZWVyc0J5VGVhbSxcbiAgICAgICAgZGVidWdJbmZvXG4gICAgfSA9IHVzZVNoaWZ0RGF0YSh7XG4gICAgICAgIGVuZ2luZWVyc1NvdXJjZTogZW5naW5lZXJzLFxuICAgICAgICBzaGlmdHNTb3VyY2U6IHNoaWZ0cyxcbiAgICAgICAgbmFtZUF0dHJpYnV0ZSxcbiAgICAgICAgaGVhZGVyQXR0cmlidXRlLFxuICAgICAgICBzdWJoZWFkZXJBdHRyaWJ1dGUsXG4gICAgICAgIHN0YXJ0VGltZUF0dHJpYnV0ZSxcbiAgICAgICAgZGF5VHlwZUF0dHJpYnV0ZSxcbiAgICAgICAgc3RhdHVzQXR0cmlidXRlLFxuICAgICAgICBzcFVzZXJBc3NvY2lhdGlvbixcbiAgICAgICAgc2hpZnRBc3NvY2lhdGlvbixcbiAgICAgICAgc2hpZnREYXRlQXR0cmlidXRlXG4gICAgfSk7XG5cbiAgICBjb25zdCBoYW5kbGVFZGl0U2hpZnQgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKF9zaGlmdDogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAob25FZGl0U2hpZnQgJiYgb25FZGl0U2hpZnQuY2FuRXhlY3V0ZSAmJiAhb25FZGl0U2hpZnQuaXNFeGVjdXRpbmcpIHtcbiAgICAgICAgICAgICAgICBvbkVkaXRTaGlmdC5leGVjdXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtvbkVkaXRTaGlmdF1cbiAgICApO1xuXG4gICAgLy8gQ29udGV4dCBtZW51IGFjdGlvbiBoYW5kbGVyc1xuICAgIGNvbnN0IGhhbmRsZUNyZWF0ZVNoaWZ0ID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChfZW5naW5lZXJJZDogc3RyaW5nLCBfZGF0ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAob25DcmVhdGVTaGlmdCAmJiBvbkNyZWF0ZVNoaWZ0LmNhbkV4ZWN1dGUgJiYgIW9uQ3JlYXRlU2hpZnQuaXNFeGVjdXRpbmcpIHtcbiAgICAgICAgICAgICAgICBvbkNyZWF0ZVNoaWZ0LmV4ZWN1dGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW29uQ3JlYXRlU2hpZnRdXG4gICAgKTtcblxuICAgIGNvbnN0IGhhbmRsZURlbGV0ZVNoaWZ0ID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChfc2hpZnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKG9uRGVsZXRlU2hpZnQgJiYgb25EZWxldGVTaGlmdC5jYW5FeGVjdXRlICYmICFvbkRlbGV0ZVNoaWZ0LmlzRXhlY3V0aW5nKSB7XG4gICAgICAgICAgICAgICAgb25EZWxldGVTaGlmdC5leGVjdXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtvbkRlbGV0ZVNoaWZ0XVxuICAgICk7XG5cbiAgICBjb25zdCBoYW5kbGVCYXRjaEVkaXQgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKHNlbGVjdGVkQ2VsbHM6IEFycmF5PHsgZW5naW5lZXJJZDogc3RyaW5nOyBkYXRlOiBzdHJpbmcgfT4pID0+IHtcbiAgICAgICAgICAgIGlmIChvbkJhdGNoRWRpdCAmJiBvbkJhdGNoRWRpdC5jYW5FeGVjdXRlICYmICFvbkJhdGNoRWRpdC5pc0V4ZWN1dGluZykge1xuICAgICAgICAgICAgICAgIC8vIEdldCBldmVudCBJRHMgZm9yIGNlbGxzIHRoYXQgaGF2ZSBzaGlmdHNcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudElkcyA9IHNlbGVjdGVkQ2VsbHNcbiAgICAgICAgICAgICAgICAgICAgLm1hcChjZWxsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoaWZ0ID0gc2hpZnRzRGF0YS5maW5kKHMgPT4gcy5lbmdpbmVlcklkID09PSBjZWxsLmVuZ2luZWVySWQgJiYgcy5kYXRlID09PSBjZWxsLmRhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNoaWZ0Py5pZDtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAgICAgICAgICAgICAuam9pbihcIixcIik7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRJZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgb25CYXRjaEVkaXQuZXhlY3V0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW29uQmF0Y2hFZGl0LCBzaGlmdHNEYXRhXVxuICAgICk7XG5cbiAgICBjb25zdCBoYW5kbGVCYXRjaERlbGV0ZSA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoc2VsZWN0ZWRDZWxsczogQXJyYXk8eyBlbmdpbmVlcklkOiBzdHJpbmc7IGRhdGU6IHN0cmluZyB9PikgPT4ge1xuICAgICAgICAgICAgaWYgKG9uQmF0Y2hEZWxldGUgJiYgb25CYXRjaERlbGV0ZS5jYW5FeGVjdXRlICYmICFvbkJhdGNoRGVsZXRlLmlzRXhlY3V0aW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IGV2ZW50IElEcyBmb3IgY2VsbHMgdGhhdCBoYXZlIHNoaWZ0c1xuICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50SWRzID0gc2VsZWN0ZWRDZWxsc1xuICAgICAgICAgICAgICAgICAgICAubWFwKGNlbGwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hpZnQgPSBzaGlmdHNEYXRhLmZpbmQocyA9PiBzLmVuZ2luZWVySWQgPT09IGNlbGwuZW5naW5lZXJJZCAmJiBzLmRhdGUgPT09IGNlbGwuZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2hpZnQ/LmlkO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKFwiLFwiKTtcblxuICAgICAgICAgICAgICAgIGlmIChldmVudElkcykge1xuICAgICAgICAgICAgICAgICAgICBvbkJhdGNoRGVsZXRlLmV4ZWN1dGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtvbkJhdGNoRGVsZXRlLCBzaGlmdHNEYXRhXVxuICAgICk7XG5cbiAgICBjb25zdCBoYW5kbGVCYXRjaENyZWF0ZSA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoc2VsZWN0ZWRDZWxsczogQXJyYXk8eyBlbmdpbmVlcklkOiBzdHJpbmc7IGRhdGU6IHN0cmluZyB9PikgPT4ge1xuICAgICAgICAgICAgaWYgKG9uQmF0Y2hDcmVhdGUgJiYgb25CYXRjaENyZWF0ZS5jYW5FeGVjdXRlICYmICFvbkJhdGNoQ3JlYXRlLmlzRXhlY3V0aW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IGVtcHR5IGNlbGxzIChjZWxscyB3aXRob3V0IHNoaWZ0cylcbiAgICAgICAgICAgICAgICBjb25zdCBlbXB0eUNlbGxzID0gc2VsZWN0ZWRDZWxscy5maWx0ZXIoY2VsbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoaWZ0ID0gc2hpZnRzRGF0YS5maW5kKHMgPT4gcy5lbmdpbmVlcklkID09PSBjZWxsLmVuZ2luZWVySWQgJiYgcy5kYXRlID09PSBjZWxsLmRhdGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXNoaWZ0O1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVtcHR5Q2VsbHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBvbkJhdGNoQ3JlYXRlLmV4ZWN1dGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtvbkJhdGNoQ3JlYXRlLCBzaGlmdHNEYXRhXVxuICAgICk7XG5cbiAgICAvLyBFcnJvciBzdGF0ZVxuICAgIGlmIChlcnJvcikge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BzaGlmdC1zY2hlZHVsZXIgJHtjbGFzc05hbWV9YH0gc3R5bGU9e3N0eWxlfSB0YWJJbmRleD17dGFiSW5kZXh9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2hpZnQtc2NoZWR1bGVyLWVycm9yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMz7imqDvuI8gQ29uZmlndXJhdGlvbiBFcnJvcjwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxwPntlcnJvci5tZXNzYWdlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAge2Vycm9yLnByb3BlcnR5ICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzbWFsbD5DaGVjayB0aGUge2Vycm9yLnByb3BlcnR5fSBwcm9wZXJ0eSBpbiB0aGUgd2lkZ2V0IGNvbmZpZ3VyYXRpb24uPC9zbWFsbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIExvYWRpbmcgc3RhdGUgLSBvbmx5IHNob3cgaWYgZW5naW5lZXJzIGhhdmVuJ3QgbG9hZGVkIHlldFxuICAgIGlmIChsb2FkaW5nICYmICghZW5naW5lZXJEYXRhIHx8IGVuZ2luZWVyRGF0YS5sZW5ndGggPT09IDApKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHNoaWZ0LXNjaGVkdWxlciAke2NsYXNzTmFtZX1gfSBzdHlsZT17c3R5bGV9IHRhYkluZGV4PXt0YWJJbmRleH0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaGlmdC1zY2hlZHVsZXItbG9hZGluZ1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvYWRpbmctc3Bpbm5lclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8cD5Mb2FkaW5nIGVuZ2luZWVycy4uLjwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIEVtcHR5IHN0YXRlXG4gICAgaWYgKCFlbmdpbmVlckRhdGEgfHwgZW5naW5lZXJEYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BzaGlmdC1zY2hlZHVsZXIgJHtjbGFzc05hbWV9YH0gc3R5bGU9e3N0eWxlfSB0YWJJbmRleD17dGFiSW5kZXh9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2hpZnQtc2NoZWR1bGVyLWVtcHR5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMz7wn5OFIE5vIERhdGEgQXZhaWxhYmxlPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPHA+Tm8gZW5naW5lZXJzIGZvdW5kLiBQbGVhc2UgY2hlY2sgeW91ciBkYXRhIHNvdXJjZSBjb25maWd1cmF0aW9uLjwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgc2hpZnQtc2NoZWR1bGVyICR7Y2xhc3NOYW1lfWB9IHN0eWxlPXtzdHlsZX0gdGFiSW5kZXg9e3RhYkluZGV4fSBkYXRhLXdpZGdldC1uYW1lPXtuYW1lfT5cbiAgICAgICAgICAgIDxTY2hlZHVsZUdyaWRcbiAgICAgICAgICAgICAgICBlbmdpbmVlcnM9e2VuZ2luZWVyRGF0YX1cbiAgICAgICAgICAgICAgICBzaGlmdHM9e3NoaWZ0c0RhdGF9XG4gICAgICAgICAgICAgICAgZ2V0U2hpZnRzRm9yRW5naW5lZXI9e2dldFNoaWZ0c0ZvckVuZ2luZWVyfVxuICAgICAgICAgICAgICAgIGdldEVuZ2luZWVyc0J5VGVhbT17Z2V0RW5naW5lZXJzQnlUZWFtfVxuICAgICAgICAgICAgICAgIG9uRWRpdFNoaWZ0PXtoYW5kbGVFZGl0U2hpZnR9XG4gICAgICAgICAgICAgICAgb25DcmVhdGVTaGlmdD17aGFuZGxlQ3JlYXRlU2hpZnR9XG4gICAgICAgICAgICAgICAgb25EZWxldGVTaGlmdD17aGFuZGxlRGVsZXRlU2hpZnR9XG4gICAgICAgICAgICAgICAgb25CYXRjaENyZWF0ZT17aGFuZGxlQmF0Y2hDcmVhdGV9XG4gICAgICAgICAgICAgICAgb25CYXRjaEVkaXQ9e2hhbmRsZUJhdGNoRWRpdH1cbiAgICAgICAgICAgICAgICBvbkJhdGNoRGVsZXRlPXtoYW5kbGVCYXRjaERlbGV0ZX1cbiAgICAgICAgICAgICAgICBzaG93RGVidWdJbmZvPXtzaG93RGVidWdJbmZvfVxuICAgICAgICAgICAgICAgIGRlYnVnSW5mbz17ZGVidWdJbmZvfVxuICAgICAgICAgICAgICAgIHNoaWZ0c0xvYWRpbmc9e3NoaWZ0c0xvYWRpbmd9XG4gICAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuIl0sIm5hbWVzIjpbInQiLCJlIiwibW9kdWxlIiwidGhpcyIsIm4iLCJyIiwiaSIsInMiLCJ1IiwiYSIsIm8iLCJjIiwiZiIsImgiLCJkIiwibCIsIiQiLCJ5IiwiTSIsIm5hbWUiLCJ3ZWVrZGF5cyIsInNwbGl0IiwibW9udGhzIiwib3JkaW5hbCIsIm0iLCJTdHJpbmciLCJsZW5ndGgiLCJBcnJheSIsImpvaW4iLCJ2IiwieiIsInV0Y09mZnNldCIsIk1hdGgiLCJhYnMiLCJmbG9vciIsImRhdGUiLCJ5ZWFyIiwibW9udGgiLCJjbG9uZSIsImFkZCIsImNlaWwiLCJwIiwidyIsIkQiLCJtcyIsIlEiLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJnIiwiUyIsIl8iLCJPIiwiYXJncyIsImFyZ3VtZW50cyIsImIiLCJsb2NhbGUiLCIkTCIsInV0YyIsIiR1IiwieCIsIiR4IiwiJG9mZnNldCIsInBhcnNlIiwicHJvdG90eXBlIiwiJGQiLCJEYXRlIiwiTmFOIiwidGVzdCIsIm1hdGNoIiwic3Vic3RyaW5nIiwiVVRDIiwiaW5pdCIsIiR5IiwiZ2V0RnVsbFllYXIiLCIkTSIsImdldE1vbnRoIiwiJEQiLCJnZXREYXRlIiwiJFciLCJnZXREYXkiLCIkSCIsImdldEhvdXJzIiwiJG0iLCJnZXRNaW51dGVzIiwiJHMiLCJnZXRTZWNvbmRzIiwiJG1zIiwiZ2V0TWlsbGlzZWNvbmRzIiwiJHV0aWxzIiwiaXNWYWxpZCIsInRvU3RyaW5nIiwiaXNTYW1lIiwic3RhcnRPZiIsImVuZE9mIiwiaXNBZnRlciIsImlzQmVmb3JlIiwiJGciLCJzZXQiLCJ1bml4IiwidmFsdWVPZiIsImdldFRpbWUiLCJ0b0RhdGUiLCJhcHBseSIsInNsaWNlIiwiJGxvY2FsZSIsIndlZWtTdGFydCIsIiRzZXQiLCJtaW4iLCJkYXlzSW5Nb250aCIsImdldCIsIk51bWJlciIsInJvdW5kIiwic3VidHJhY3QiLCJmb3JtYXQiLCJpbnZhbGlkRGF0ZSIsIm1lcmlkaWVtIiwibW9udGhzU2hvcnQiLCJ3ZWVrZGF5c01pbiIsIndlZWtkYXlzU2hvcnQiLCJnZXRUaW1lem9uZU9mZnNldCIsImRpZmYiLCJ0b0pTT04iLCJ0b0lTT1N0cmluZyIsInRvVVRDU3RyaW5nIiwiayIsImZvckVhY2giLCJleHRlbmQiLCIkaSIsImlzRGF5anMiLCJlbiIsIkxzIiwibG9jYWwiLCJjYWxsIiwiZ2V0VVRDRnVsbFllYXIiLCJnZXRVVENNb250aCIsImdldFVUQ0RhdGUiLCJnZXRVVENEYXkiLCJnZXRVVENIb3VycyIsImdldFVUQ01pbnV0ZXMiLCJnZXRVVENTZWNvbmRzIiwiZ2V0VVRDTWlsbGlzZWNvbmRzIiwiJGxvY2FsT2Zmc2V0IiwiaXNVVEMiLCJkYXkiLCJob3VyIiwibWludXRlIiwic2Vjb25kIiwidGltZVpvbmVOYW1lIiwiSW50bCIsIkRhdGVUaW1lRm9ybWF0IiwiaG91cjEyIiwidGltZVpvbmUiLCJmb3JtYXRUb1BhcnRzIiwidHlwZSIsInZhbHVlIiwicGFyc2VJbnQiLCJ0eiIsInRvTG9jYWxlU3RyaW5nIiwiJHRpbWV6b25lIiwib2Zmc2V0TmFtZSIsImd1ZXNzIiwiZmluZCIsIm1heCIsInJlc29sdmVkT3B0aW9ucyIsInNldERlZmF1bHQiLCJpc1NhbWVPckJlZm9yZSIsImlzU2FtZU9yQWZ0ZXIiLCJSZWFjdCIsIlNjaGVkdWxlR3JpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxFQUFBLENBQUMsVUFBU0EsQ0FBQyxFQUFDQyxDQUFDLEVBQUM7SUFBc0RDLE1BQUFBLENBQUFBLE9BQUFBLEdBQWVELENBQUMsRUFBRSxDQUFnSCxDQUFBO0dBQUMsQ0FBQ0UsU0FBSSxFQUFFLFlBQVU7O0lBQWMsSUFBSUgsQ0FBQyxHQUFDLEdBQUc7TUFBQ0MsQ0FBQyxHQUFDLEdBQUc7TUFBQ0csQ0FBQyxHQUFDLElBQUk7TUFBQ0MsQ0FBQyxHQUFDLGFBQWE7TUFBQ0MsQ0FBQyxHQUFDLFFBQVE7TUFBQ0MsQ0FBQyxHQUFDLFFBQVE7TUFBQ0MsQ0FBQyxHQUFDLE1BQU07TUFBQ0MsQ0FBQyxHQUFDLEtBQUs7TUFBQ0MsQ0FBQyxHQUFDLE1BQU07TUFBQ0MsQ0FBQyxHQUFDLE9BQU87TUFBQ0MsQ0FBQyxHQUFDLFNBQVM7TUFBQ0MsQ0FBQyxHQUFDLE1BQU07TUFBQ0MsQ0FBQyxHQUFDLE1BQU07TUFBQ0MsQ0FBQyxHQUFDLGNBQWM7TUFBQ0MsQ0FBQyxHQUFDLDRGQUE0RjtNQUFDQyxDQUFDLEdBQUMscUZBQXFGO0FBQUNDLE1BQUFBLENBQUMsR0FBQztRQUFDQyxJQUFJLEVBQUMsSUFBSTtBQUFDQyxRQUFBQSxRQUFRLEVBQUMsMERBQTBELENBQUNDLEtBQUssQ0FBQyxHQUFHLENBQUM7QUFBQ0MsUUFBQUEsTUFBTSxFQUFDLHVGQUF1RixDQUFDRCxLQUFLLENBQUMsR0FBRyxDQUFDO0FBQUNFLFFBQUFBLE9BQU8sRUFBQyxVQUFTdkIsQ0FB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QUUsUUFBUSxFQUFFLFFBQVEsRUFBQTtZQUM1RSxhQUFLLENBQUEsS0FBQSxFQUFBLEVBQUEsU0FBUyxFQUFDLHlCQUF5QixFQUFBO2dCQUNwQyxhQUFLLENBQUEsS0FBQSxFQUFBLEVBQUEsU0FBUyxFQUFDLGlCQUFpQixFQUFPLENBQUE7Z0JBQ3ZDLGFBQTJCLENBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxzQkFBQSxDQUFBLENBQ3pCLENBQ0osRUFDUjtLQUNMOztJQUdELElBQUksQ0FBQyxZQUFZLElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDNUMsUUFBQSxRQUNJLGFBQUEsQ0FBQSxLQUFBLEVBQUEsRUFBSyxTQUFTLEVBQUUsbUJBQW1CLFNBQVMsQ0FBQSxDQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFBO1lBQzVFLGFBQUssQ0FBQSxLQUFBLEVBQUEsRUFBQSxTQUFTLEVBQUMsdUJBQXVCLEVBQUE7Z0JBQ2xDLGFBQTZCLENBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxnQ0FBQSxDQUFBO2dCQUM3QixhQUF1RSxDQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsa0VBQUEsQ0FBQSxDQUNyRSxDQUNKLEVBQ1I7S0FDTDtBQUVELElBQUEsUUFDSSxhQUFLLENBQUEsS0FBQSxFQUFBLEVBQUEsU0FBUyxFQUFFLENBQUEsZ0JBQUEsRUFBbUIsU0FBUyxDQUFFLENBQUEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLHNCQUFvQixJQUFJLEVBQUE7UUFDcEcsYUFBQyxDQUFBQyxjQUFZLEVBQ1QsRUFBQSxTQUFTLEVBQUUsWUFBWSxFQUN2QixNQUFNLEVBQUUsVUFBVSxFQUNsQixvQkFBb0IsRUFBRSxvQkFBb0IsRUFDMUMsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQ3RDLFdBQVcsRUFBRSxlQUFlLEVBQzVCLGFBQWEsRUFBRSxpQkFBaUIsRUFDaEMsYUFBYSxFQUFFLGlCQUFpQixFQUNoQyxhQUFhLEVBQUUsaUJBQWlCLEVBQ2hDLFdBQVcsRUFBRSxlQUFlLEVBQzVCLGFBQWEsRUFBRSxpQkFBaUIsRUFDaEMsYUFBYSxFQUFFLGFBQWEsRUFDNUIsU0FBUyxFQUFFLFNBQVMsRUFDcEIsYUFBYSxFQUFFLGFBQWEsRUFBQSxDQUM5QixDQUNBLEVBQ1I7QUFDTjs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsMyw0XX0=
