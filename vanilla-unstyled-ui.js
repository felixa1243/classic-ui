var pa = Object.defineProperty;
var ha = (t, e, n) => e in t ? pa(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var m = (t, e, n) => ha(t, typeof e != "symbol" ? e + "" : e, n);
var ln = !1, cn = !1, he = [], un = -1;
function ma(t) {
  ga(t);
}
function ga(t) {
  he.includes(t) || he.push(t), _a();
}
function ya(t) {
  let e = he.indexOf(t);
  e !== -1 && e > un && he.splice(e, 1);
}
function _a() {
  !cn && !ln && (ln = !0, queueMicrotask(ba));
}
function ba() {
  ln = !1, cn = !0;
  for (let t = 0; t < he.length; t++)
    he[t](), un = t;
  he.length = 0, un = -1, cn = !1;
}
var Te, ve, Re, li, dn = !0;
function va(t) {
  dn = !1, t(), dn = !0;
}
function Sa(t) {
  Te = t.reactive, Re = t.release, ve = (e) => t.effect(e, { scheduler: (n) => {
    dn ? ma(n) : n();
  } }), li = t.raw;
}
function mr(t) {
  ve = t;
}
function wa(t) {
  let e = () => {
  };
  return [(r) => {
    let i = ve(r);
    return t._x_effects || (t._x_effects = /* @__PURE__ */ new Set(), t._x_runEffects = () => {
      t._x_effects.forEach((o) => o());
    }), t._x_effects.add(i), e = () => {
      i !== void 0 && (t._x_effects.delete(i), Re(i));
    }, i;
  }, () => {
    e();
  }];
}
function ci(t, e) {
  let n = !0, r, i = ve(() => {
    let o = t();
    JSON.stringify(o), n ? r = o : queueMicrotask(() => {
      e(o, r), r = o;
    }), n = !1;
  });
  return () => Re(i);
}
var ui = [], di = [], fi = [];
function Ca(t) {
  fi.push(t);
}
function Fn(t, e) {
  typeof e == "function" ? (t._x_cleanups || (t._x_cleanups = []), t._x_cleanups.push(e)) : (e = t, di.push(e));
}
function pi(t) {
  ui.push(t);
}
function hi(t, e, n) {
  t._x_attributeCleanups || (t._x_attributeCleanups = {}), t._x_attributeCleanups[e] || (t._x_attributeCleanups[e] = []), t._x_attributeCleanups[e].push(n);
}
function mi(t, e) {
  t._x_attributeCleanups && Object.entries(t._x_attributeCleanups).forEach(([n, r]) => {
    (e === void 0 || e.includes(n)) && (r.forEach((i) => i()), delete t._x_attributeCleanups[n]);
  });
}
function xa(t) {
  var e, n;
  for ((e = t._x_effects) == null || e.forEach(ya); (n = t._x_cleanups) != null && n.length; )
    t._x_cleanups.pop()();
}
var jn = new MutationObserver(Un), $n = !1;
function Gn() {
  jn.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), $n = !0;
}
function gi() {
  ka(), jn.disconnect(), $n = !1;
}
var De = [];
function ka() {
  let t = jn.takeRecords();
  De.push(() => t.length > 0 && Un(t));
  let e = De.length;
  queueMicrotask(() => {
    if (De.length === e)
      for (; De.length > 0; )
        De.shift()();
  });
}
function P(t) {
  if (!$n)
    return t();
  gi();
  let e = t();
  return Gn(), e;
}
var Hn = !1, _t = [];
function Aa() {
  Hn = !0;
}
function Ea() {
  Hn = !1, Un(_t), _t = [];
}
function Un(t) {
  if (Hn) {
    _t = _t.concat(t);
    return;
  }
  let e = [], n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (let o = 0; o < t.length; o++)
    if (!t[o].target._x_ignoreMutationObserver && (t[o].type === "childList" && (t[o].removedNodes.forEach((a) => {
      a.nodeType === 1 && a._x_marker && n.add(a);
    }), t[o].addedNodes.forEach((a) => {
      if (a.nodeType === 1) {
        if (n.has(a)) {
          n.delete(a);
          return;
        }
        a._x_marker || e.push(a);
      }
    })), t[o].type === "attributes")) {
      let a = t[o].target, s = t[o].attributeName, l = t[o].oldValue, c = () => {
        r.has(a) || r.set(a, []), r.get(a).push({ name: s, value: a.getAttribute(s) });
      }, u = () => {
        i.has(a) || i.set(a, []), i.get(a).push(s);
      };
      a.hasAttribute(s) && l === null ? c() : a.hasAttribute(s) ? (u(), c()) : u();
    }
  i.forEach((o, a) => {
    mi(a, o);
  }), r.forEach((o, a) => {
    ui.forEach((s) => s(a, o));
  });
  for (let o of n)
    e.some((a) => a.contains(o)) || di.forEach((a) => a(o));
  for (let o of e)
    o.isConnected && fi.forEach((a) => a(o));
  e = null, n = null, r = null, i = null;
}
function yi(t) {
  return Qe(ke(t));
}
function Xe(t, e, n) {
  return t._x_dataStack = [e, ...ke(n || t)], () => {
    t._x_dataStack = t._x_dataStack.filter((r) => r !== e);
  };
}
function ke(t) {
  return t._x_dataStack ? t._x_dataStack : typeof ShadowRoot == "function" && t instanceof ShadowRoot ? ke(t.host) : t.parentNode ? ke(t.parentNode) : [];
}
function Qe(t) {
  return new Proxy({ objects: t }, Ta);
}
var Ta = {
  ownKeys({ objects: t }) {
    return Array.from(
      new Set(t.flatMap((e) => Object.keys(e)))
    );
  },
  has({ objects: t }, e) {
    return e == Symbol.unscopables ? !1 : t.some(
      (n) => Object.prototype.hasOwnProperty.call(n, e) || Reflect.has(n, e)
    );
  },
  get({ objects: t }, e, n) {
    return e == "toJSON" ? Ra : Reflect.get(
      t.find(
        (r) => Reflect.has(r, e)
      ) || {},
      e,
      n
    );
  },
  set({ objects: t }, e, n, r) {
    const i = t.find(
      (a) => Object.prototype.hasOwnProperty.call(a, e)
    ) || t[t.length - 1], o = Object.getOwnPropertyDescriptor(i, e);
    return o != null && o.set && (o != null && o.get) ? o.set.call(r, n) || !0 : Reflect.set(i, e, n);
  }
};
function Ra() {
  return Reflect.ownKeys(this).reduce((e, n) => (e[n] = Reflect.get(this, n), e), {});
}
function _i(t) {
  let e = (r) => typeof r == "object" && !Array.isArray(r) && r !== null, n = (r, i = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(r)).forEach(([o, { value: a, enumerable: s }]) => {
      if (s === !1 || a === void 0 || typeof a == "object" && a !== null && a.__v_skip)
        return;
      let l = i === "" ? o : `${i}.${o}`;
      typeof a == "object" && a !== null && a._x_interceptor ? r[o] = a.initialize(t, l, o) : e(a) && a !== r && !(a instanceof Element) && n(a, l);
    });
  };
  return n(t);
}
function bi(t, e = () => {
}) {
  let n = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(r, i, o) {
      return t(this.initialValue, () => Na(r, i), (a) => fn(r, i, a), i, o);
    }
  };
  return e(n), (r) => {
    if (typeof r == "object" && r !== null && r._x_interceptor) {
      let i = n.initialize.bind(n);
      n.initialize = (o, a, s) => {
        let l = r.initialize(o, a, s);
        return n.initialValue = l, i(o, a, s);
      };
    } else
      n.initialValue = r;
    return n;
  };
}
function Na(t, e) {
  return e.split(".").reduce((n, r) => n[r], t);
}
function fn(t, e, n) {
  if (typeof e == "string" && (e = e.split(".")), e.length === 1)
    t[e[0]] = n;
  else {
    if (e.length === 0)
      throw error;
    return t[e[0]] || (t[e[0]] = {}), fn(t[e[0]], e.slice(1), n);
  }
}
var vi = {};
function Q(t, e) {
  vi[t] = e;
}
function pn(t, e) {
  let n = La(e);
  return Object.entries(vi).forEach(([r, i]) => {
    Object.defineProperty(t, `$${r}`, {
      get() {
        return i(e, n);
      },
      enumerable: !1
    });
  }), t;
}
function La(t) {
  let [e, n] = Ai(t), r = { interceptor: bi, ...e };
  return Fn(t, n), r;
}
function Pa(t, e, n, ...r) {
  try {
    return n(...r);
  } catch (i) {
    ze(i, t, e);
  }
}
function ze(t, e, n = void 0) {
  t = Object.assign(
    t ?? { message: "No error message given." },
    { el: e, expression: n }
  ), console.warn(`Alpine Expression Error: ${t.message}

${n ? 'Expression: "' + n + `"

` : ""}`, e), setTimeout(() => {
    throw t;
  }, 0);
}
var pt = !0;
function Si(t) {
  let e = pt;
  pt = !1;
  let n = t();
  return pt = e, n;
}
function me(t, e, n = {}) {
  let r;
  return U(t, e)((i) => r = i, n), r;
}
function U(...t) {
  return wi(...t);
}
var wi = Ci;
function Oa(t) {
  wi = t;
}
function Ci(t, e) {
  let n = {};
  pn(n, t);
  let r = [n, ...ke(t)], i = typeof e == "function" ? Ia(r, e) : Da(r, e, t);
  return Pa.bind(null, t, e, i);
}
function Ia(t, e) {
  return (n = () => {
  }, { scope: r = {}, params: i = [] } = {}) => {
    let o = e.apply(Qe([r, ...t]), i);
    bt(n, o);
  };
}
var Vt = {};
function Ma(t, e) {
  if (Vt[t])
    return Vt[t];
  let n = Object.getPrototypeOf(async function() {
  }).constructor, r = /^[\n\s]*if.*\(.*\)/.test(t.trim()) || /^(let|const)\s/.test(t.trim()) ? `(async()=>{ ${t} })()` : t, o = (() => {
    try {
      let a = new n(
        ["__self", "scope"],
        `with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`
      );
      return Object.defineProperty(a, "name", {
        value: `[Alpine] ${t}`
      }), a;
    } catch (a) {
      return ze(a, e, t), Promise.resolve();
    }
  })();
  return Vt[t] = o, o;
}
function Da(t, e, n) {
  let r = Ma(e, n);
  return (i = () => {
  }, { scope: o = {}, params: a = [] } = {}) => {
    r.result = void 0, r.finished = !1;
    let s = Qe([o, ...t]);
    if (typeof r == "function") {
      let l = r(r, s).catch((c) => ze(c, n, e));
      r.finished ? (bt(i, r.result, s, a, n), r.result = void 0) : l.then((c) => {
        bt(i, c, s, a, n);
      }).catch((c) => ze(c, n, e)).finally(() => r.result = void 0);
    }
  };
}
function bt(t, e, n, r, i) {
  if (pt && typeof e == "function") {
    let o = e.apply(n, r);
    o instanceof Promise ? o.then((a) => bt(t, a, n, r)).catch((a) => ze(a, i, e)) : t(o);
  } else typeof e == "object" && e instanceof Promise ? e.then((o) => t(o)) : t(e);
}
var qn = "x-";
function Ne(t = "") {
  return qn + t;
}
function Ba(t) {
  qn = t;
}
var vt = {};
function M(t, e) {
  return vt[t] = e, {
    before(n) {
      if (!vt[n]) {
        console.warn(String.raw`Cannot find directive \`${n}\`. \`${t}\` will use the default order of execution`);
        return;
      }
      const r = fe.indexOf(n);
      fe.splice(r >= 0 ? r : fe.indexOf("DEFAULT"), 0, t);
    }
  };
}
function Fa(t) {
  return Object.keys(vt).includes(t);
}
function Wn(t, e, n) {
  if (e = Array.from(e), t._x_virtualDirectives) {
    let o = Object.entries(t._x_virtualDirectives).map(([s, l]) => ({ name: s, value: l })), a = xi(o);
    o = o.map((s) => a.find((l) => l.name === s.name) ? {
      name: `x-bind:${s.name}`,
      value: `"${s.value}"`
    } : s), e = e.concat(o);
  }
  let r = {};
  return e.map(Ri((o, a) => r[o] = a)).filter(Li).map(Ga(r, n)).sort(Ha).map((o) => $a(t, o));
}
function xi(t) {
  return Array.from(t).map(Ri()).filter((e) => !Li(e));
}
var hn = !1, Ge = /* @__PURE__ */ new Map(), ki = Symbol();
function ja(t) {
  hn = !0;
  let e = Symbol();
  ki = e, Ge.set(e, []);
  let n = () => {
    for (; Ge.get(e).length; )
      Ge.get(e).shift()();
    Ge.delete(e);
  }, r = () => {
    hn = !1, n();
  };
  t(n), r();
}
function Ai(t) {
  let e = [], n = (s) => e.push(s), [r, i] = wa(t);
  return e.push(i), [{
    Alpine: Ze,
    effect: r,
    cleanup: n,
    evaluateLater: U.bind(U, t),
    evaluate: me.bind(me, t)
  }, () => e.forEach((s) => s())];
}
function $a(t, e) {
  let n = () => {
  }, r = vt[e.type] || n, [i, o] = Ai(t);
  hi(t, e.original, o);
  let a = () => {
    t._x_ignore || t._x_ignoreSelf || (r.inline && r.inline(t, e, i), r = r.bind(r, t, e, i), hn ? Ge.get(ki).push(r) : r());
  };
  return a.runCleanups = o, a;
}
var Ei = (t, e) => ({ name: n, value: r }) => (n.startsWith(t) && (n = n.replace(t, e)), { name: n, value: r }), Ti = (t) => t;
function Ri(t = () => {
}) {
  return ({ name: e, value: n }) => {
    let { name: r, value: i } = Ni.reduce((o, a) => a(o), { name: e, value: n });
    return r !== e && t(r, e), { name: r, value: i };
  };
}
var Ni = [];
function zn(t) {
  Ni.push(t);
}
function Li({ name: t }) {
  return Pi().test(t);
}
var Pi = () => new RegExp(`^${qn}([^:^.]+)\\b`);
function Ga(t, e) {
  return ({ name: n, value: r }) => {
    let i = n.match(Pi()), o = n.match(/:([a-zA-Z0-9\-_:]+)/), a = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], s = e || t[n] || n;
    return {
      type: i ? i[1] : null,
      value: o ? o[1] : null,
      modifiers: a.map((l) => l.replace(".", "")),
      expression: r,
      original: s
    };
  };
}
var mn = "DEFAULT", fe = [
  "ignore",
  "ref",
  "data",
  "id",
  "anchor",
  "bind",
  "init",
  "for",
  "model",
  "modelable",
  "transition",
  "show",
  "if",
  mn,
  "teleport"
];
function Ha(t, e) {
  let n = fe.indexOf(t.type) === -1 ? mn : t.type, r = fe.indexOf(e.type) === -1 ? mn : e.type;
  return fe.indexOf(n) - fe.indexOf(r);
}
function Ue(t, e, n = {}) {
  t.dispatchEvent(
    new CustomEvent(e, {
      detail: n,
      bubbles: !0,
      // Allows events to pass the shadow DOM barrier.
      composed: !0,
      cancelable: !0
    })
  );
}
function _e(t, e) {
  if (typeof ShadowRoot == "function" && t instanceof ShadowRoot) {
    Array.from(t.children).forEach((i) => _e(i, e));
    return;
  }
  let n = !1;
  if (e(t, () => n = !0), n)
    return;
  let r = t.firstElementChild;
  for (; r; )
    _e(r, e), r = r.nextElementSibling;
}
function J(t, ...e) {
  console.warn(`Alpine Warning: ${t}`, ...e);
}
var gr = !1;
function Ua() {
  gr && J("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."), gr = !0, document.body || J("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), Ue(document, "alpine:init"), Ue(document, "alpine:initializing"), Gn(), Ca((e) => ie(e, _e)), Fn((e) => Pe(e)), pi((e, n) => {
    Wn(e, n).forEach((r) => r());
  });
  let t = (e) => !Mt(e.parentElement, !0);
  Array.from(document.querySelectorAll(Mi().join(","))).filter(t).forEach((e) => {
    ie(e);
  }), Ue(document, "alpine:initialized"), setTimeout(() => {
    Ka();
  });
}
var Kn = [], Oi = [];
function Ii() {
  return Kn.map((t) => t());
}
function Mi() {
  return Kn.concat(Oi).map((t) => t());
}
function Di(t) {
  Kn.push(t);
}
function Bi(t) {
  Oi.push(t);
}
function Mt(t, e = !1) {
  return Le(t, (n) => {
    if ((e ? Mi() : Ii()).some((i) => n.matches(i)))
      return !0;
  });
}
function Le(t, e) {
  if (t) {
    if (e(t))
      return t;
    if (t._x_teleportBack && (t = t._x_teleportBack), !!t.parentElement)
      return Le(t.parentElement, e);
  }
}
function qa(t) {
  return Ii().some((e) => t.matches(e));
}
var Fi = [];
function Wa(t) {
  Fi.push(t);
}
var za = 1;
function ie(t, e = _e, n = () => {
}) {
  Le(t, (r) => r._x_ignore) || ja(() => {
    e(t, (r, i) => {
      r._x_marker || (n(r, i), Fi.forEach((o) => o(r, i)), Wn(r, r.attributes).forEach((o) => o()), r._x_ignore || (r._x_marker = za++), r._x_ignore && i());
    });
  });
}
function Pe(t, e = _e) {
  e(t, (n) => {
    xa(n), mi(n), delete n._x_marker;
  });
}
function Ka() {
  [
    ["ui", "dialog", ["[x-dialog], [x-popover]"]],
    ["anchor", "anchor", ["[x-anchor]"]],
    ["sort", "sort", ["[x-sort]"]]
  ].forEach(([e, n, r]) => {
    Fa(n) || r.some((i) => {
      if (document.querySelector(i))
        return J(`found "${i}", but missing ${e} plugin`), !0;
    });
  });
}
var gn = [], Vn = !1;
function Jn(t = () => {
}) {
  return queueMicrotask(() => {
    Vn || setTimeout(() => {
      yn();
    });
  }), new Promise((e) => {
    gn.push(() => {
      t(), e();
    });
  });
}
function yn() {
  for (Vn = !1; gn.length; )
    gn.shift()();
}
function Va() {
  Vn = !0;
}
function Yn(t, e) {
  return Array.isArray(e) ? yr(t, e.join(" ")) : typeof e == "object" && e !== null ? Ja(t, e) : typeof e == "function" ? Yn(t, e()) : yr(t, e);
}
function yr(t, e) {
  let n = (i) => i.split(" ").filter((o) => !t.classList.contains(o)).filter(Boolean), r = (i) => (t.classList.add(...i), () => {
    t.classList.remove(...i);
  });
  return e = e === !0 ? e = "" : e || "", r(n(e));
}
function Ja(t, e) {
  let n = (s) => s.split(" ").filter(Boolean), r = Object.entries(e).flatMap(([s, l]) => l ? n(s) : !1).filter(Boolean), i = Object.entries(e).flatMap(([s, l]) => l ? !1 : n(s)).filter(Boolean), o = [], a = [];
  return i.forEach((s) => {
    t.classList.contains(s) && (t.classList.remove(s), a.push(s));
  }), r.forEach((s) => {
    t.classList.contains(s) || (t.classList.add(s), o.push(s));
  }), () => {
    a.forEach((s) => t.classList.add(s)), o.forEach((s) => t.classList.remove(s));
  };
}
function Dt(t, e) {
  return typeof e == "object" && e !== null ? Ya(t, e) : Xa(t, e);
}
function Ya(t, e) {
  let n = {};
  return Object.entries(e).forEach(([r, i]) => {
    n[r] = t.style[r], r.startsWith("--") || (r = Qa(r)), t.style.setProperty(r, i);
  }), setTimeout(() => {
    t.style.length === 0 && t.removeAttribute("style");
  }), () => {
    Dt(t, n);
  };
}
function Xa(t, e) {
  let n = t.getAttribute("style", e);
  return t.setAttribute("style", e), () => {
    t.setAttribute("style", n || "");
  };
}
function Qa(t) {
  return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function _n(t, e = () => {
}) {
  let n = !1;
  return function() {
    n ? e.apply(this, arguments) : (n = !0, t.apply(this, arguments));
  };
}
M("transition", (t, { value: e, modifiers: n, expression: r }, { evaluate: i }) => {
  typeof r == "function" && (r = i(r)), r !== !1 && (!r || typeof r == "boolean" ? es(t, n, e) : Za(t, r, e));
});
function Za(t, e, n) {
  ji(t, Yn, ""), {
    enter: (i) => {
      t._x_transition.enter.during = i;
    },
    "enter-start": (i) => {
      t._x_transition.enter.start = i;
    },
    "enter-end": (i) => {
      t._x_transition.enter.end = i;
    },
    leave: (i) => {
      t._x_transition.leave.during = i;
    },
    "leave-start": (i) => {
      t._x_transition.leave.start = i;
    },
    "leave-end": (i) => {
      t._x_transition.leave.end = i;
    }
  }[n](e);
}
function es(t, e, n) {
  ji(t, Dt);
  let r = !e.includes("in") && !e.includes("out") && !n, i = r || e.includes("in") || ["enter"].includes(n), o = r || e.includes("out") || ["leave"].includes(n);
  e.includes("in") && !r && (e = e.filter((y, _) => _ < e.indexOf("out"))), e.includes("out") && !r && (e = e.filter((y, _) => _ > e.indexOf("out")));
  let a = !e.includes("opacity") && !e.includes("scale"), s = a || e.includes("opacity"), l = a || e.includes("scale"), c = s ? 0 : 1, u = l ? Be(e, "scale", 95) / 100 : 1, d = Be(e, "delay", 0) / 1e3, f = Be(e, "origin", "center"), p = "opacity, transform", h = Be(e, "duration", 150) / 1e3, C = Be(e, "duration", 75) / 1e3, g = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  i && (t._x_transition.enter.during = {
    transformOrigin: f,
    transitionDelay: `${d}s`,
    transitionProperty: p,
    transitionDuration: `${h}s`,
    transitionTimingFunction: g
  }, t._x_transition.enter.start = {
    opacity: c,
    transform: `scale(${u})`
  }, t._x_transition.enter.end = {
    opacity: 1,
    transform: "scale(1)"
  }), o && (t._x_transition.leave.during = {
    transformOrigin: f,
    transitionDelay: `${d}s`,
    transitionProperty: p,
    transitionDuration: `${C}s`,
    transitionTimingFunction: g
  }, t._x_transition.leave.start = {
    opacity: 1,
    transform: "scale(1)"
  }, t._x_transition.leave.end = {
    opacity: c,
    transform: `scale(${u})`
  });
}
function ji(t, e, n = {}) {
  t._x_transition || (t._x_transition = {
    enter: { during: n, start: n, end: n },
    leave: { during: n, start: n, end: n },
    in(r = () => {
    }, i = () => {
    }) {
      bn(t, e, {
        during: this.enter.during,
        start: this.enter.start,
        end: this.enter.end
      }, r, i);
    },
    out(r = () => {
    }, i = () => {
    }) {
      bn(t, e, {
        during: this.leave.during,
        start: this.leave.start,
        end: this.leave.end
      }, r, i);
    }
  });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(t, e, n, r) {
  const i = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
  let o = () => i(n);
  if (e) {
    t._x_transition && (t._x_transition.enter || t._x_transition.leave) ? t._x_transition.enter && (Object.entries(t._x_transition.enter.during).length || Object.entries(t._x_transition.enter.start).length || Object.entries(t._x_transition.enter.end).length) ? t._x_transition.in(n) : o() : t._x_transition ? t._x_transition.in(n) : o();
    return;
  }
  t._x_hidePromise = t._x_transition ? new Promise((a, s) => {
    t._x_transition.out(() => {
    }, () => a(r)), t._x_transitioning && t._x_transitioning.beforeCancel(() => s({ isFromCancelledTransition: !0 }));
  }) : Promise.resolve(r), queueMicrotask(() => {
    let a = $i(t);
    a ? (a._x_hideChildren || (a._x_hideChildren = []), a._x_hideChildren.push(t)) : i(() => {
      let s = (l) => {
        let c = Promise.all([
          l._x_hidePromise,
          ...(l._x_hideChildren || []).map(s)
        ]).then(([u]) => u == null ? void 0 : u());
        return delete l._x_hidePromise, delete l._x_hideChildren, c;
      };
      s(t).catch((l) => {
        if (!l.isFromCancelledTransition)
          throw l;
      });
    });
  });
};
function $i(t) {
  let e = t.parentNode;
  if (e)
    return e._x_hidePromise ? e : $i(e);
}
function bn(t, e, { during: n, start: r, end: i } = {}, o = () => {
}, a = () => {
}) {
  if (t._x_transitioning && t._x_transitioning.cancel(), Object.keys(n).length === 0 && Object.keys(r).length === 0 && Object.keys(i).length === 0) {
    o(), a();
    return;
  }
  let s, l, c;
  ts(t, {
    start() {
      s = e(t, r);
    },
    during() {
      l = e(t, n);
    },
    before: o,
    end() {
      s(), c = e(t, i);
    },
    after: a,
    cleanup() {
      l(), c();
    }
  });
}
function ts(t, e) {
  let n, r, i, o = _n(() => {
    P(() => {
      n = !0, r || e.before(), i || (e.end(), yn()), e.after(), t.isConnected && e.cleanup(), delete t._x_transitioning;
    });
  });
  t._x_transitioning = {
    beforeCancels: [],
    beforeCancel(a) {
      this.beforeCancels.push(a);
    },
    cancel: _n(function() {
      for (; this.beforeCancels.length; )
        this.beforeCancels.shift()();
      o();
    }),
    finish: o
  }, P(() => {
    e.start(), e.during();
  }), Va(), requestAnimationFrame(() => {
    if (n)
      return;
    let a = Number(getComputedStyle(t).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, s = Number(getComputedStyle(t).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    a === 0 && (a = Number(getComputedStyle(t).animationDuration.replace("s", "")) * 1e3), P(() => {
      e.before();
    }), r = !0, requestAnimationFrame(() => {
      n || (P(() => {
        e.end();
      }), yn(), setTimeout(t._x_transitioning.finish, a + s), i = !0);
    });
  });
}
function Be(t, e, n) {
  if (t.indexOf(e) === -1)
    return n;
  const r = t[t.indexOf(e) + 1];
  if (!r || e === "scale" && isNaN(r))
    return n;
  if (e === "duration" || e === "delay") {
    let i = r.match(/([0-9]+)ms/);
    if (i)
      return i[1];
  }
  return e === "origin" && ["top", "right", "left", "center", "bottom"].includes(t[t.indexOf(e) + 2]) ? [r, t[t.indexOf(e) + 2]].join(" ") : r;
}
var le = !1;
function ue(t, e = () => {
}) {
  return (...n) => le ? e(...n) : t(...n);
}
function ns(t) {
  return (...e) => le && t(...e);
}
var Gi = [];
function Bt(t) {
  Gi.push(t);
}
function rs(t, e) {
  Gi.forEach((n) => n(t, e)), le = !0, Hi(() => {
    ie(e, (n, r) => {
      r(n, () => {
      });
    });
  }), le = !1;
}
var vn = !1;
function is(t, e) {
  e._x_dataStack || (e._x_dataStack = t._x_dataStack), le = !0, vn = !0, Hi(() => {
    os(e);
  }), le = !1, vn = !1;
}
function os(t) {
  let e = !1;
  ie(t, (r, i) => {
    _e(r, (o, a) => {
      if (e && qa(o))
        return a();
      e = !0, i(o, a);
    });
  });
}
function Hi(t) {
  let e = ve;
  mr((n, r) => {
    let i = e(n);
    return Re(i), () => {
    };
  }), t(), mr(e);
}
function Ui(t, e, n, r = []) {
  switch (t._x_bindings || (t._x_bindings = Te({})), t._x_bindings[e] = n, e = r.includes("camel") ? ps(e) : e, e) {
    case "value":
      as(t, n);
      break;
    case "style":
      ls(t, n);
      break;
    case "class":
      ss(t, n);
      break;
    case "selected":
    case "checked":
      cs(t, e, n);
      break;
    default:
      qi(t, e, n);
      break;
  }
}
function as(t, e) {
  if (Ki(t))
    t.attributes.value === void 0 && (t.value = e), window.fromModel && (typeof e == "boolean" ? t.checked = ht(t.value) === e : t.checked = _r(t.value, e));
  else if (Xn(t))
    Number.isInteger(e) ? t.value = e : !Array.isArray(e) && typeof e != "boolean" && ![null, void 0].includes(e) ? t.value = String(e) : Array.isArray(e) ? t.checked = e.some((n) => _r(n, t.value)) : t.checked = !!e;
  else if (t.tagName === "SELECT")
    fs(t, e);
  else {
    if (t.value === e)
      return;
    t.value = e === void 0 ? "" : e;
  }
}
function ss(t, e) {
  t._x_undoAddedClasses && t._x_undoAddedClasses(), t._x_undoAddedClasses = Yn(t, e);
}
function ls(t, e) {
  t._x_undoAddedStyles && t._x_undoAddedStyles(), t._x_undoAddedStyles = Dt(t, e);
}
function cs(t, e, n) {
  qi(t, e, n), ds(t, e, n);
}
function qi(t, e, n) {
  [null, void 0, !1].includes(n) && ms(e) ? t.removeAttribute(e) : (Wi(e) && (n = e), us(t, e, n));
}
function us(t, e, n) {
  t.getAttribute(e) != n && t.setAttribute(e, n);
}
function ds(t, e, n) {
  t[e] !== n && (t[e] = n);
}
function fs(t, e) {
  const n = [].concat(e).map((r) => r + "");
  Array.from(t.options).forEach((r) => {
    r.selected = n.includes(r.value);
  });
}
function ps(t) {
  return t.toLowerCase().replace(/-(\w)/g, (e, n) => n.toUpperCase());
}
function _r(t, e) {
  return t == e;
}
function ht(t) {
  return [1, "1", "true", "on", "yes", !0].includes(t) ? !0 : [0, "0", "false", "off", "no", !1].includes(t) ? !1 : t ? !!t : null;
}
var hs = /* @__PURE__ */ new Set([
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "inert",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected",
  "shadowrootclonable",
  "shadowrootdelegatesfocus",
  "shadowrootserializable"
]);
function Wi(t) {
  return hs.has(t);
}
function ms(t) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(t);
}
function gs(t, e, n) {
  return t._x_bindings && t._x_bindings[e] !== void 0 ? t._x_bindings[e] : zi(t, e, n);
}
function ys(t, e, n, r = !0) {
  if (t._x_bindings && t._x_bindings[e] !== void 0)
    return t._x_bindings[e];
  if (t._x_inlineBindings && t._x_inlineBindings[e] !== void 0) {
    let i = t._x_inlineBindings[e];
    return i.extract = r, Si(() => me(t, i.expression));
  }
  return zi(t, e, n);
}
function zi(t, e, n) {
  let r = t.getAttribute(e);
  return r === null ? typeof n == "function" ? n() : n : r === "" ? !0 : Wi(e) ? !![e, "true"].includes(r) : r;
}
function Xn(t) {
  return t.type === "checkbox" || t.localName === "ui-checkbox" || t.localName === "ui-switch";
}
function Ki(t) {
  return t.type === "radio" || t.localName === "ui-radio";
}
function Vi(t, e) {
  var n;
  return function() {
    var r = this, i = arguments, o = function() {
      n = null, t.apply(r, i);
    };
    clearTimeout(n), n = setTimeout(o, e);
  };
}
function Ji(t, e) {
  let n;
  return function() {
    let r = this, i = arguments;
    n || (t.apply(r, i), n = !0, setTimeout(() => n = !1, e));
  };
}
function Yi({ get: t, set: e }, { get: n, set: r }) {
  let i = !0, o, a = ve(() => {
    let s = t(), l = n();
    if (i)
      r(Jt(s)), i = !1;
    else {
      let c = JSON.stringify(s), u = JSON.stringify(l);
      c !== o ? r(Jt(s)) : c !== u && e(Jt(l));
    }
    o = JSON.stringify(t()), JSON.stringify(n());
  });
  return () => {
    Re(a);
  };
}
function Jt(t) {
  return typeof t == "object" ? JSON.parse(JSON.stringify(t)) : t;
}
function _s(t) {
  (Array.isArray(t) ? t : [t]).forEach((n) => n(Ze));
}
var de = {}, br = !1;
function bs(t, e) {
  if (br || (de = Te(de), br = !0), e === void 0)
    return de[t];
  de[t] = e, _i(de[t]), typeof e == "object" && e !== null && e.hasOwnProperty("init") && typeof e.init == "function" && de[t].init();
}
function vs() {
  return de;
}
var Xi = {};
function Ss(t, e) {
  let n = typeof e != "function" ? () => e : e;
  return t instanceof Element ? Qi(t, n()) : (Xi[t] = n, () => {
  });
}
function ws(t) {
  return Object.entries(Xi).forEach(([e, n]) => {
    Object.defineProperty(t, e, {
      get() {
        return (...r) => n(...r);
      }
    });
  }), t;
}
function Qi(t, e, n) {
  let r = [];
  for (; r.length; )
    r.pop()();
  let i = Object.entries(e).map(([a, s]) => ({ name: a, value: s })), o = xi(i);
  return i = i.map((a) => o.find((s) => s.name === a.name) ? {
    name: `x-bind:${a.name}`,
    value: `"${a.value}"`
  } : a), Wn(t, i, n).map((a) => {
    r.push(a.runCleanups), a();
  }), () => {
    for (; r.length; )
      r.pop()();
  };
}
var Zi = {};
function Cs(t, e) {
  Zi[t] = e;
}
function xs(t, e) {
  return Object.entries(Zi).forEach(([n, r]) => {
    Object.defineProperty(t, n, {
      get() {
        return (...i) => r.bind(e)(...i);
      },
      enumerable: !1
    });
  }), t;
}
var ks = {
  get reactive() {
    return Te;
  },
  get release() {
    return Re;
  },
  get effect() {
    return ve;
  },
  get raw() {
    return li;
  },
  version: "3.14.9",
  flushAndStopDeferringMutations: Ea,
  dontAutoEvaluateFunctions: Si,
  disableEffectScheduling: va,
  startObservingMutations: Gn,
  stopObservingMutations: gi,
  setReactivityEngine: Sa,
  onAttributeRemoved: hi,
  onAttributesAdded: pi,
  closestDataStack: ke,
  skipDuringClone: ue,
  onlyDuringClone: ns,
  addRootSelector: Di,
  addInitSelector: Bi,
  interceptClone: Bt,
  addScopeToNode: Xe,
  deferMutations: Aa,
  mapAttributes: zn,
  evaluateLater: U,
  interceptInit: Wa,
  setEvaluator: Oa,
  mergeProxies: Qe,
  extractProp: ys,
  findClosest: Le,
  onElRemoved: Fn,
  closestRoot: Mt,
  destroyTree: Pe,
  interceptor: bi,
  // INTERNAL: not public API and is subject to change without major release.
  transition: bn,
  // INTERNAL
  setStyles: Dt,
  // INTERNAL
  mutateDom: P,
  directive: M,
  entangle: Yi,
  throttle: Ji,
  debounce: Vi,
  evaluate: me,
  initTree: ie,
  nextTick: Jn,
  prefixed: Ne,
  prefix: Ba,
  plugin: _s,
  magic: Q,
  store: bs,
  start: Ua,
  clone: is,
  // INTERNAL
  cloneNode: rs,
  // INTERNAL
  bound: gs,
  $data: yi,
  watch: ci,
  walk: _e,
  data: Cs,
  bind: Ss
}, Ze = ks;
function As(t, e) {
  const n = /* @__PURE__ */ Object.create(null), r = t.split(",");
  for (let i = 0; i < r.length; i++)
    n[r[i]] = !0;
  return (i) => !!n[i];
}
var Es = Object.freeze({}), Ts = Object.prototype.hasOwnProperty, Ft = (t, e) => Ts.call(t, e), ge = Array.isArray, qe = (t) => eo(t) === "[object Map]", Rs = (t) => typeof t == "string", Qn = (t) => typeof t == "symbol", jt = (t) => t !== null && typeof t == "object", Ns = Object.prototype.toString, eo = (t) => Ns.call(t), to = (t) => eo(t).slice(8, -1), Zn = (t) => Rs(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Ls = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, Ps = Ls((t) => t.charAt(0).toUpperCase() + t.slice(1)), no = (t, e) => t !== e && (t === t || e === e), Sn = /* @__PURE__ */ new WeakMap(), Fe = [], te, ye = Symbol("iterate"), wn = Symbol("Map key iterate");
function Os(t) {
  return t && t._isEffect === !0;
}
function Is(t, e = Es) {
  Os(t) && (t = t.raw);
  const n = Bs(t, e);
  return e.lazy || n(), n;
}
function Ms(t) {
  t.active && (ro(t), t.options.onStop && t.options.onStop(), t.active = !1);
}
var Ds = 0;
function Bs(t, e) {
  const n = function() {
    if (!n.active)
      return t();
    if (!Fe.includes(n)) {
      ro(n);
      try {
        return js(), Fe.push(n), te = n, t();
      } finally {
        Fe.pop(), io(), te = Fe[Fe.length - 1];
      }
    }
  };
  return n.id = Ds++, n.allowRecurse = !!e.allowRecurse, n._isEffect = !0, n.active = !0, n.raw = t, n.deps = [], n.options = e, n;
}
function ro(t) {
  const { deps: e } = t;
  if (e.length) {
    for (let n = 0; n < e.length; n++)
      e[n].delete(t);
    e.length = 0;
  }
}
var Ae = !0, er = [];
function Fs() {
  er.push(Ae), Ae = !1;
}
function js() {
  er.push(Ae), Ae = !0;
}
function io() {
  const t = er.pop();
  Ae = t === void 0 ? !0 : t;
}
function X(t, e, n) {
  if (!Ae || te === void 0)
    return;
  let r = Sn.get(t);
  r || Sn.set(t, r = /* @__PURE__ */ new Map());
  let i = r.get(n);
  i || r.set(n, i = /* @__PURE__ */ new Set()), i.has(te) || (i.add(te), te.deps.push(i), te.options.onTrack && te.options.onTrack({
    effect: te,
    target: t,
    type: e,
    key: n
  }));
}
function ce(t, e, n, r, i, o) {
  const a = Sn.get(t);
  if (!a)
    return;
  const s = /* @__PURE__ */ new Set(), l = (u) => {
    u && u.forEach((d) => {
      (d !== te || d.allowRecurse) && s.add(d);
    });
  };
  if (e === "clear")
    a.forEach(l);
  else if (n === "length" && ge(t))
    a.forEach((u, d) => {
      (d === "length" || d >= r) && l(u);
    });
  else
    switch (n !== void 0 && l(a.get(n)), e) {
      case "add":
        ge(t) ? Zn(n) && l(a.get("length")) : (l(a.get(ye)), qe(t) && l(a.get(wn)));
        break;
      case "delete":
        ge(t) || (l(a.get(ye)), qe(t) && l(a.get(wn)));
        break;
      case "set":
        qe(t) && l(a.get(ye));
        break;
    }
  const c = (u) => {
    u.options.onTrigger && u.options.onTrigger({
      effect: u,
      target: t,
      key: n,
      type: e,
      newValue: r,
      oldValue: i,
      oldTarget: o
    }), u.options.scheduler ? u.options.scheduler(u) : u();
  };
  s.forEach(c);
}
var $s = /* @__PURE__ */ As("__proto__,__v_isRef,__isVue"), oo = new Set(Object.getOwnPropertyNames(Symbol).map((t) => Symbol[t]).filter(Qn)), Gs = /* @__PURE__ */ ao(), Hs = /* @__PURE__ */ ao(!0), vr = /* @__PURE__ */ Us();
function Us() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...n) {
      const r = L(this);
      for (let o = 0, a = this.length; o < a; o++)
        X(r, "get", o + "");
      const i = r[e](...n);
      return i === -1 || i === !1 ? r[e](...n.map(L)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...n) {
      Fs();
      const r = L(this)[e].apply(this, n);
      return io(), r;
    };
  }), t;
}
function ao(t = !1, e = !1) {
  return function(r, i, o) {
    if (i === "__v_isReactive")
      return !t;
    if (i === "__v_isReadonly")
      return t;
    if (i === "__v_raw" && o === (t ? e ? rl : uo : e ? nl : co).get(r))
      return r;
    const a = ge(r);
    if (!t && a && Ft(vr, i))
      return Reflect.get(vr, i, o);
    const s = Reflect.get(r, i, o);
    return (Qn(i) ? oo.has(i) : $s(i)) || (t || X(r, "get", i), e) ? s : Cn(s) ? !a || !Zn(i) ? s.value : s : jt(s) ? t ? fo(s) : ir(s) : s;
  };
}
var qs = /* @__PURE__ */ Ws();
function Ws(t = !1) {
  return function(n, r, i, o) {
    let a = n[r];
    if (!t && (i = L(i), a = L(a), !ge(n) && Cn(a) && !Cn(i)))
      return a.value = i, !0;
    const s = ge(n) && Zn(r) ? Number(r) < n.length : Ft(n, r), l = Reflect.set(n, r, i, o);
    return n === L(o) && (s ? no(i, a) && ce(n, "set", r, i, a) : ce(n, "add", r, i)), l;
  };
}
function zs(t, e) {
  const n = Ft(t, e), r = t[e], i = Reflect.deleteProperty(t, e);
  return i && n && ce(t, "delete", e, void 0, r), i;
}
function Ks(t, e) {
  const n = Reflect.has(t, e);
  return (!Qn(e) || !oo.has(e)) && X(t, "has", e), n;
}
function Vs(t) {
  return X(t, "iterate", ge(t) ? "length" : ye), Reflect.ownKeys(t);
}
var Js = {
  get: Gs,
  set: qs,
  deleteProperty: zs,
  has: Ks,
  ownKeys: Vs
}, Ys = {
  get: Hs,
  set(t, e) {
    return console.warn(`Set operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  },
  deleteProperty(t, e) {
    return console.warn(`Delete operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  }
}, tr = (t) => jt(t) ? ir(t) : t, nr = (t) => jt(t) ? fo(t) : t, rr = (t) => t, $t = (t) => Reflect.getPrototypeOf(t);
function nt(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const i = L(t), o = L(e);
  e !== o && !n && X(i, "get", e), !n && X(i, "get", o);
  const { has: a } = $t(i), s = r ? rr : n ? nr : tr;
  if (a.call(i, e))
    return s(t.get(e));
  if (a.call(i, o))
    return s(t.get(o));
  t !== i && t.get(e);
}
function rt(t, e = !1) {
  const n = this.__v_raw, r = L(n), i = L(t);
  return t !== i && !e && X(r, "has", t), !e && X(r, "has", i), t === i ? n.has(t) : n.has(t) || n.has(i);
}
function it(t, e = !1) {
  return t = t.__v_raw, !e && X(L(t), "iterate", ye), Reflect.get(t, "size", t);
}
function Sr(t) {
  t = L(t);
  const e = L(this);
  return $t(e).has.call(e, t) || (e.add(t), ce(e, "add", t, t)), this;
}
function wr(t, e) {
  e = L(e);
  const n = L(this), { has: r, get: i } = $t(n);
  let o = r.call(n, t);
  o ? lo(n, r, t) : (t = L(t), o = r.call(n, t));
  const a = i.call(n, t);
  return n.set(t, e), o ? no(e, a) && ce(n, "set", t, e, a) : ce(n, "add", t, e), this;
}
function Cr(t) {
  const e = L(this), { has: n, get: r } = $t(e);
  let i = n.call(e, t);
  i ? lo(e, n, t) : (t = L(t), i = n.call(e, t));
  const o = r ? r.call(e, t) : void 0, a = e.delete(t);
  return i && ce(e, "delete", t, void 0, o), a;
}
function xr() {
  const t = L(this), e = t.size !== 0, n = qe(t) ? new Map(t) : new Set(t), r = t.clear();
  return e && ce(t, "clear", void 0, void 0, n), r;
}
function ot(t, e) {
  return function(r, i) {
    const o = this, a = o.__v_raw, s = L(a), l = e ? rr : t ? nr : tr;
    return !t && X(s, "iterate", ye), a.forEach((c, u) => r.call(i, l(c), l(u), o));
  };
}
function at(t, e, n) {
  return function(...r) {
    const i = this.__v_raw, o = L(i), a = qe(o), s = t === "entries" || t === Symbol.iterator && a, l = t === "keys" && a, c = i[t](...r), u = n ? rr : e ? nr : tr;
    return !e && X(o, "iterate", l ? wn : ye), {
      // iterator protocol
      next() {
        const { value: d, done: f } = c.next();
        return f ? { value: d, done: f } : {
          value: s ? [u(d[0]), u(d[1])] : u(d),
          done: f
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function ae(t) {
  return function(...e) {
    {
      const n = e[0] ? `on key "${e[0]}" ` : "";
      console.warn(`${Ps(t)} operation ${n}failed: target is readonly.`, L(this));
    }
    return t === "delete" ? !1 : this;
  };
}
function Xs() {
  const t = {
    get(o) {
      return nt(this, o);
    },
    get size() {
      return it(this);
    },
    has: rt,
    add: Sr,
    set: wr,
    delete: Cr,
    clear: xr,
    forEach: ot(!1, !1)
  }, e = {
    get(o) {
      return nt(this, o, !1, !0);
    },
    get size() {
      return it(this);
    },
    has: rt,
    add: Sr,
    set: wr,
    delete: Cr,
    clear: xr,
    forEach: ot(!1, !0)
  }, n = {
    get(o) {
      return nt(this, o, !0);
    },
    get size() {
      return it(this, !0);
    },
    has(o) {
      return rt.call(this, o, !0);
    },
    add: ae(
      "add"
      /* ADD */
    ),
    set: ae(
      "set"
      /* SET */
    ),
    delete: ae(
      "delete"
      /* DELETE */
    ),
    clear: ae(
      "clear"
      /* CLEAR */
    ),
    forEach: ot(!0, !1)
  }, r = {
    get(o) {
      return nt(this, o, !0, !0);
    },
    get size() {
      return it(this, !0);
    },
    has(o) {
      return rt.call(this, o, !0);
    },
    add: ae(
      "add"
      /* ADD */
    ),
    set: ae(
      "set"
      /* SET */
    ),
    delete: ae(
      "delete"
      /* DELETE */
    ),
    clear: ae(
      "clear"
      /* CLEAR */
    ),
    forEach: ot(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    t[o] = at(o, !1, !1), n[o] = at(o, !0, !1), e[o] = at(o, !1, !0), r[o] = at(o, !0, !0);
  }), [
    t,
    n,
    e,
    r
  ];
}
var [Qs, Zs, af, sf] = /* @__PURE__ */ Xs();
function so(t, e) {
  const n = t ? Zs : Qs;
  return (r, i, o) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? r : Reflect.get(Ft(n, i) && i in r ? n : r, i, o);
}
var el = {
  get: /* @__PURE__ */ so(!1)
}, tl = {
  get: /* @__PURE__ */ so(!0)
};
function lo(t, e, n) {
  const r = L(n);
  if (r !== n && e.call(t, r)) {
    const i = to(t);
    console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var co = /* @__PURE__ */ new WeakMap(), nl = /* @__PURE__ */ new WeakMap(), uo = /* @__PURE__ */ new WeakMap(), rl = /* @__PURE__ */ new WeakMap();
function il(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function ol(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : il(to(t));
}
function ir(t) {
  return t && t.__v_isReadonly ? t : po(t, !1, Js, el, co);
}
function fo(t) {
  return po(t, !0, Ys, tl, uo);
}
function po(t, e, n, r, i) {
  if (!jt(t))
    return console.warn(`value cannot be made reactive: ${String(t)}`), t;
  if (t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const o = i.get(t);
  if (o)
    return o;
  const a = ol(t);
  if (a === 0)
    return t;
  const s = new Proxy(t, a === 2 ? r : n);
  return i.set(t, s), s;
}
function L(t) {
  return t && L(t.__v_raw) || t;
}
function Cn(t) {
  return !!(t && t.__v_isRef === !0);
}
Q("nextTick", () => Jn);
Q("dispatch", (t) => Ue.bind(Ue, t));
Q("watch", (t, { evaluateLater: e, cleanup: n }) => (r, i) => {
  let o = e(r), s = ci(() => {
    let l;
    return o((c) => l = c), l;
  }, i);
  n(s);
});
Q("store", vs);
Q("data", (t) => yi(t));
Q("root", (t) => Mt(t));
Q("refs", (t) => (t._x_refs_proxy || (t._x_refs_proxy = Qe(al(t))), t._x_refs_proxy));
function al(t) {
  let e = [];
  return Le(t, (n) => {
    n._x_refs && e.push(n._x_refs);
  }), e;
}
var Yt = {};
function ho(t) {
  return Yt[t] || (Yt[t] = 0), ++Yt[t];
}
function sl(t, e) {
  return Le(t, (n) => {
    if (n._x_ids && n._x_ids[e])
      return !0;
  });
}
function ll(t, e) {
  t._x_ids || (t._x_ids = {}), t._x_ids[e] || (t._x_ids[e] = ho(e));
}
Q("id", (t, { cleanup: e }) => (n, r = null) => {
  let i = `${n}${r ? `-${r}` : ""}`;
  return cl(t, i, e, () => {
    let o = sl(t, n), a = o ? o._x_ids[n] : ho(n);
    return r ? `${n}-${a}-${r}` : `${n}-${a}`;
  });
});
Bt((t, e) => {
  t._x_id && (e._x_id = t._x_id);
});
function cl(t, e, n, r) {
  if (t._x_id || (t._x_id = {}), t._x_id[e])
    return t._x_id[e];
  let i = r();
  return t._x_id[e] = i, n(() => {
    delete t._x_id[e];
  }), i;
}
Q("el", (t) => t);
mo("Focus", "focus", "focus");
mo("Persist", "persist", "persist");
function mo(t, e, n) {
  Q(e, (r) => J(`You can't use [$${e}] without first installing the "${t}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
M("modelable", (t, { expression: e }, { effect: n, evaluateLater: r, cleanup: i }) => {
  let o = r(e), a = () => {
    let u;
    return o((d) => u = d), u;
  }, s = r(`${e} = __placeholder`), l = (u) => s(() => {
  }, { scope: { __placeholder: u } }), c = a();
  l(c), queueMicrotask(() => {
    if (!t._x_model)
      return;
    t._x_removeModelListeners.default();
    let u = t._x_model.get, d = t._x_model.set, f = Yi(
      {
        get() {
          return u();
        },
        set(p) {
          d(p);
        }
      },
      {
        get() {
          return a();
        },
        set(p) {
          l(p);
        }
      }
    );
    i(f);
  });
});
M("teleport", (t, { modifiers: e, expression: n }, { cleanup: r }) => {
  t.tagName.toLowerCase() !== "template" && J("x-teleport can only be used on a <template> tag", t);
  let i = kr(n), o = t.content.cloneNode(!0).firstElementChild;
  t._x_teleport = o, o._x_teleportBack = t, t.setAttribute("data-teleport-template", !0), o.setAttribute("data-teleport-target", !0), t._x_forwardEvents && t._x_forwardEvents.forEach((s) => {
    o.addEventListener(s, (l) => {
      l.stopPropagation(), t.dispatchEvent(new l.constructor(l.type, l));
    });
  }), Xe(o, {}, t);
  let a = (s, l, c) => {
    c.includes("prepend") ? l.parentNode.insertBefore(s, l) : c.includes("append") ? l.parentNode.insertBefore(s, l.nextSibling) : l.appendChild(s);
  };
  P(() => {
    a(o, i, e), ue(() => {
      ie(o);
    })();
  }), t._x_teleportPutBack = () => {
    let s = kr(n);
    P(() => {
      a(t._x_teleport, s, e);
    });
  }, r(
    () => P(() => {
      o.remove(), Pe(o);
    })
  );
});
var ul = document.createElement("div");
function kr(t) {
  let e = ue(() => document.querySelector(t), () => ul)();
  return e || J(`Cannot find x-teleport element for selector: "${t}"`), e;
}
var go = () => {
};
go.inline = (t, { modifiers: e }, { cleanup: n }) => {
  e.includes("self") ? t._x_ignoreSelf = !0 : t._x_ignore = !0, n(() => {
    e.includes("self") ? delete t._x_ignoreSelf : delete t._x_ignore;
  });
};
M("ignore", go);
M("effect", ue((t, { expression: e }, { effect: n }) => {
  n(U(t, e));
}));
function xn(t, e, n, r) {
  let i = t, o = (l) => r(l), a = {}, s = (l, c) => (u) => c(l, u);
  if (n.includes("dot") && (e = dl(e)), n.includes("camel") && (e = fl(e)), n.includes("passive") && (a.passive = !0), n.includes("capture") && (a.capture = !0), n.includes("window") && (i = window), n.includes("document") && (i = document), n.includes("debounce")) {
    let l = n[n.indexOf("debounce") + 1] || "invalid-wait", c = St(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
    o = Vi(o, c);
  }
  if (n.includes("throttle")) {
    let l = n[n.indexOf("throttle") + 1] || "invalid-wait", c = St(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
    o = Ji(o, c);
  }
  return n.includes("prevent") && (o = s(o, (l, c) => {
    c.preventDefault(), l(c);
  })), n.includes("stop") && (o = s(o, (l, c) => {
    c.stopPropagation(), l(c);
  })), n.includes("once") && (o = s(o, (l, c) => {
    l(c), i.removeEventListener(e, o, a);
  })), (n.includes("away") || n.includes("outside")) && (i = document, o = s(o, (l, c) => {
    t.contains(c.target) || c.target.isConnected !== !1 && (t.offsetWidth < 1 && t.offsetHeight < 1 || t._x_isShown !== !1 && l(c));
  })), n.includes("self") && (o = s(o, (l, c) => {
    c.target === t && l(c);
  })), (hl(e) || yo(e)) && (o = s(o, (l, c) => {
    ml(c, n) || l(c);
  })), i.addEventListener(e, o, a), () => {
    i.removeEventListener(e, o, a);
  };
}
function dl(t) {
  return t.replace(/-/g, ".");
}
function fl(t) {
  return t.toLowerCase().replace(/-(\w)/g, (e, n) => n.toUpperCase());
}
function St(t) {
  return !Array.isArray(t) && !isNaN(t);
}
function pl(t) {
  return [" ", "_"].includes(
    t
  ) ? t : t.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function hl(t) {
  return ["keydown", "keyup"].includes(t);
}
function yo(t) {
  return ["contextmenu", "click", "mouse"].some((e) => t.includes(e));
}
function ml(t, e) {
  let n = e.filter((o) => !["window", "document", "prevent", "stop", "once", "capture", "self", "away", "outside", "passive"].includes(o));
  if (n.includes("debounce")) {
    let o = n.indexOf("debounce");
    n.splice(o, St((n[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (n.includes("throttle")) {
    let o = n.indexOf("throttle");
    n.splice(o, St((n[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (n.length === 0 || n.length === 1 && Ar(t.key).includes(n[0]))
    return !1;
  const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((o) => n.includes(o));
  return n = n.filter((o) => !i.includes(o)), !(i.length > 0 && i.filter((a) => ((a === "cmd" || a === "super") && (a = "meta"), t[`${a}Key`])).length === i.length && (yo(t.type) || Ar(t.key).includes(n[0])));
}
function Ar(t) {
  if (!t)
    return [];
  t = pl(t);
  let e = {
    ctrl: "control",
    slash: "/",
    space: " ",
    spacebar: " ",
    cmd: "meta",
    esc: "escape",
    up: "arrow-up",
    down: "arrow-down",
    left: "arrow-left",
    right: "arrow-right",
    period: ".",
    comma: ",",
    equal: "=",
    minus: "-",
    underscore: "_"
  };
  return e[t] = t, Object.keys(e).map((n) => {
    if (e[n] === t)
      return n;
  }).filter((n) => n);
}
M("model", (t, { modifiers: e, expression: n }, { effect: r, cleanup: i }) => {
  let o = t;
  e.includes("parent") && (o = t.parentNode);
  let a = U(o, n), s;
  typeof n == "string" ? s = U(o, `${n} = __placeholder`) : typeof n == "function" && typeof n() == "string" ? s = U(o, `${n()} = __placeholder`) : s = () => {
  };
  let l = () => {
    let f;
    return a((p) => f = p), Er(f) ? f.get() : f;
  }, c = (f) => {
    let p;
    a((h) => p = h), Er(p) ? p.set(f) : s(() => {
    }, {
      scope: { __placeholder: f }
    });
  };
  typeof n == "string" && t.type === "radio" && P(() => {
    t.hasAttribute("name") || t.setAttribute("name", n);
  });
  var u = t.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(t.type) || e.includes("lazy") ? "change" : "input";
  let d = le ? () => {
  } : xn(t, u, e, (f) => {
    c(Xt(t, e, f, l()));
  });
  if (e.includes("fill") && ([void 0, null, ""].includes(l()) || Xn(t) && Array.isArray(l()) || t.tagName.toLowerCase() === "select" && t.multiple) && c(
    Xt(t, e, { target: t }, l())
  ), t._x_removeModelListeners || (t._x_removeModelListeners = {}), t._x_removeModelListeners.default = d, i(() => t._x_removeModelListeners.default()), t.form) {
    let f = xn(t.form, "reset", [], (p) => {
      Jn(() => t._x_model && t._x_model.set(Xt(t, e, { target: t }, l())));
    });
    i(() => f());
  }
  t._x_model = {
    get() {
      return l();
    },
    set(f) {
      c(f);
    }
  }, t._x_forceModelUpdate = (f) => {
    f === void 0 && typeof n == "string" && n.match(/\./) && (f = ""), window.fromModel = !0, P(() => Ui(t, "value", f)), delete window.fromModel;
  }, r(() => {
    let f = l();
    e.includes("unintrusive") && document.activeElement.isSameNode(t) || t._x_forceModelUpdate(f);
  });
});
function Xt(t, e, n, r) {
  return P(() => {
    if (n instanceof CustomEvent && n.detail !== void 0)
      return n.detail !== null && n.detail !== void 0 ? n.detail : n.target.value;
    if (Xn(t))
      if (Array.isArray(r)) {
        let i = null;
        return e.includes("number") ? i = Qt(n.target.value) : e.includes("boolean") ? i = ht(n.target.value) : i = n.target.value, n.target.checked ? r.includes(i) ? r : r.concat([i]) : r.filter((o) => !gl(o, i));
      } else
        return n.target.checked;
    else {
      if (t.tagName.toLowerCase() === "select" && t.multiple)
        return e.includes("number") ? Array.from(n.target.selectedOptions).map((i) => {
          let o = i.value || i.text;
          return Qt(o);
        }) : e.includes("boolean") ? Array.from(n.target.selectedOptions).map((i) => {
          let o = i.value || i.text;
          return ht(o);
        }) : Array.from(n.target.selectedOptions).map((i) => i.value || i.text);
      {
        let i;
        return Ki(t) ? n.target.checked ? i = n.target.value : i = r : i = n.target.value, e.includes("number") ? Qt(i) : e.includes("boolean") ? ht(i) : e.includes("trim") ? i.trim() : i;
      }
    }
  });
}
function Qt(t) {
  let e = t ? parseFloat(t) : null;
  return yl(e) ? e : t;
}
function gl(t, e) {
  return t == e;
}
function yl(t) {
  return !Array.isArray(t) && !isNaN(t);
}
function Er(t) {
  return t !== null && typeof t == "object" && typeof t.get == "function" && typeof t.set == "function";
}
M("cloak", (t) => queueMicrotask(() => P(() => t.removeAttribute(Ne("cloak")))));
Bi(() => `[${Ne("init")}]`);
M("init", ue((t, { expression: e }, { evaluate: n }) => typeof e == "string" ? !!e.trim() && n(e, {}, !1) : n(e, {}, !1)));
M("text", (t, { expression: e }, { effect: n, evaluateLater: r }) => {
  let i = r(e);
  n(() => {
    i((o) => {
      P(() => {
        t.textContent = o;
      });
    });
  });
});
M("html", (t, { expression: e }, { effect: n, evaluateLater: r }) => {
  let i = r(e);
  n(() => {
    i((o) => {
      P(() => {
        t.innerHTML = o, t._x_ignoreSelf = !0, ie(t), delete t._x_ignoreSelf;
      });
    });
  });
});
zn(Ei(":", Ti(Ne("bind:"))));
var _o = (t, { value: e, modifiers: n, expression: r, original: i }, { effect: o, cleanup: a }) => {
  if (!e) {
    let l = {};
    ws(l), U(t, r)((u) => {
      Qi(t, u, i);
    }, { scope: l });
    return;
  }
  if (e === "key")
    return _l(t, r);
  if (t._x_inlineBindings && t._x_inlineBindings[e] && t._x_inlineBindings[e].extract)
    return;
  let s = U(t, r);
  o(() => s((l) => {
    l === void 0 && typeof r == "string" && r.match(/\./) && (l = ""), P(() => Ui(t, e, l, n));
  })), a(() => {
    t._x_undoAddedClasses && t._x_undoAddedClasses(), t._x_undoAddedStyles && t._x_undoAddedStyles();
  });
};
_o.inline = (t, { value: e, modifiers: n, expression: r }) => {
  e && (t._x_inlineBindings || (t._x_inlineBindings = {}), t._x_inlineBindings[e] = { expression: r, extract: !1 });
};
M("bind", _o);
function _l(t, e) {
  t._x_keyExpression = e;
}
Di(() => `[${Ne("data")}]`);
M("data", (t, { expression: e }, { cleanup: n }) => {
  if (bl(t))
    return;
  e = e === "" ? "{}" : e;
  let r = {};
  pn(r, t);
  let i = {};
  xs(i, r);
  let o = me(t, e, { scope: i });
  (o === void 0 || o === !0) && (o = {}), pn(o, t);
  let a = Te(o);
  _i(a);
  let s = Xe(t, a);
  a.init && me(t, a.init), n(() => {
    a.destroy && me(t, a.destroy), s();
  });
});
Bt((t, e) => {
  t._x_dataStack && (e._x_dataStack = t._x_dataStack, e.setAttribute("data-has-alpine-state", !0));
});
function bl(t) {
  return le ? vn ? !0 : t.hasAttribute("data-has-alpine-state") : !1;
}
M("show", (t, { modifiers: e, expression: n }, { effect: r }) => {
  let i = U(t, n);
  t._x_doHide || (t._x_doHide = () => {
    P(() => {
      t.style.setProperty("display", "none", e.includes("important") ? "important" : void 0);
    });
  }), t._x_doShow || (t._x_doShow = () => {
    P(() => {
      t.style.length === 1 && t.style.display === "none" ? t.removeAttribute("style") : t.style.removeProperty("display");
    });
  });
  let o = () => {
    t._x_doHide(), t._x_isShown = !1;
  }, a = () => {
    t._x_doShow(), t._x_isShown = !0;
  }, s = () => setTimeout(a), l = _n(
    (d) => d ? a() : o(),
    (d) => {
      typeof t._x_toggleAndCascadeWithTransitions == "function" ? t._x_toggleAndCascadeWithTransitions(t, d, a, o) : d ? s() : o();
    }
  ), c, u = !0;
  r(() => i((d) => {
    !u && d === c || (e.includes("immediate") && (d ? s() : o()), l(d), c = d, u = !1);
  }));
});
M("for", (t, { expression: e }, { effect: n, cleanup: r }) => {
  let i = Sl(e), o = U(t, i.items), a = U(
    t,
    // the x-bind:key expression is stored for our use instead of evaluated.
    t._x_keyExpression || "index"
  );
  t._x_prevKeys = [], t._x_lookup = {}, n(() => vl(t, i, o, a)), r(() => {
    Object.values(t._x_lookup).forEach((s) => P(
      () => {
        Pe(s), s.remove();
      }
    )), delete t._x_prevKeys, delete t._x_lookup;
  });
});
function vl(t, e, n, r) {
  let i = (a) => typeof a == "object" && !Array.isArray(a), o = t;
  n((a) => {
    wl(a) && a >= 0 && (a = Array.from(Array(a).keys(), (g) => g + 1)), a === void 0 && (a = []);
    let s = t._x_lookup, l = t._x_prevKeys, c = [], u = [];
    if (i(a))
      a = Object.entries(a).map(([g, y]) => {
        let _ = Tr(e, y, g, a);
        r((w) => {
          u.includes(w) && J("Duplicate key on x-for", t), u.push(w);
        }, { scope: { index: g, ..._ } }), c.push(_);
      });
    else
      for (let g = 0; g < a.length; g++) {
        let y = Tr(e, a[g], g, a);
        r((_) => {
          u.includes(_) && J("Duplicate key on x-for", t), u.push(_);
        }, { scope: { index: g, ...y } }), c.push(y);
      }
    let d = [], f = [], p = [], h = [];
    for (let g = 0; g < l.length; g++) {
      let y = l[g];
      u.indexOf(y) === -1 && p.push(y);
    }
    l = l.filter((g) => !p.includes(g));
    let C = "template";
    for (let g = 0; g < u.length; g++) {
      let y = u[g], _ = l.indexOf(y);
      if (_ === -1)
        l.splice(g, 0, y), d.push([C, g]);
      else if (_ !== g) {
        let w = l.splice(g, 1)[0], A = l.splice(_ - 1, 1)[0];
        l.splice(g, 0, A), l.splice(_, 0, w), f.push([w, A]);
      } else
        h.push(y);
      C = y;
    }
    for (let g = 0; g < p.length; g++) {
      let y = p[g];
      y in s && (P(() => {
        Pe(s[y]), s[y].remove();
      }), delete s[y]);
    }
    for (let g = 0; g < f.length; g++) {
      let [y, _] = f[g], w = s[y], A = s[_], x = document.createElement("div");
      P(() => {
        A || J('x-for ":key" is undefined or invalid', o, _, s), A.after(x), w.after(A), A._x_currentIfEl && A.after(A._x_currentIfEl), x.before(w), w._x_currentIfEl && w.after(w._x_currentIfEl), x.remove();
      }), A._x_refreshXForScope(c[u.indexOf(_)]);
    }
    for (let g = 0; g < d.length; g++) {
      let [y, _] = d[g], w = y === "template" ? o : s[y];
      w._x_currentIfEl && (w = w._x_currentIfEl);
      let A = c[_], x = u[_], v = document.importNode(o.content, !0).firstElementChild, S = Te(A);
      Xe(v, S, o), v._x_refreshXForScope = (k) => {
        Object.entries(k).forEach(([R, T]) => {
          S[R] = T;
        });
      }, P(() => {
        w.after(v), ue(() => ie(v))();
      }), typeof x == "object" && J("x-for key cannot be an object, it must be a string or an integer", o), s[x] = v;
    }
    for (let g = 0; g < h.length; g++)
      s[h[g]]._x_refreshXForScope(c[u.indexOf(h[g])]);
    o._x_prevKeys = u;
  });
}
function Sl(t) {
  let e = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, n = /^\s*\(|\)\s*$/g, r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, i = t.match(r);
  if (!i)
    return;
  let o = {};
  o.items = i[2].trim();
  let a = i[1].replace(n, "").trim(), s = a.match(e);
  return s ? (o.item = a.replace(e, "").trim(), o.index = s[1].trim(), s[2] && (o.collection = s[2].trim())) : o.item = a, o;
}
function Tr(t, e, n, r) {
  let i = {};
  return /^\[.*\]$/.test(t.item) && Array.isArray(e) ? t.item.replace("[", "").replace("]", "").split(",").map((a) => a.trim()).forEach((a, s) => {
    i[a] = e[s];
  }) : /^\{.*\}$/.test(t.item) && !Array.isArray(e) && typeof e == "object" ? t.item.replace("{", "").replace("}", "").split(",").map((a) => a.trim()).forEach((a) => {
    i[a] = e[a];
  }) : i[t.item] = e, t.index && (i[t.index] = n), t.collection && (i[t.collection] = r), i;
}
function wl(t) {
  return !Array.isArray(t) && !isNaN(t);
}
function bo() {
}
bo.inline = (t, { expression: e }, { cleanup: n }) => {
  let r = Mt(t);
  r._x_refs || (r._x_refs = {}), r._x_refs[e] = t, n(() => delete r._x_refs[e]);
};
M("ref", bo);
M("if", (t, { expression: e }, { effect: n, cleanup: r }) => {
  t.tagName.toLowerCase() !== "template" && J("x-if can only be used on a <template> tag", t);
  let i = U(t, e), o = () => {
    if (t._x_currentIfEl)
      return t._x_currentIfEl;
    let s = t.content.cloneNode(!0).firstElementChild;
    return Xe(s, {}, t), P(() => {
      t.after(s), ue(() => ie(s))();
    }), t._x_currentIfEl = s, t._x_undoIf = () => {
      P(() => {
        Pe(s), s.remove();
      }), delete t._x_currentIfEl;
    }, s;
  }, a = () => {
    t._x_undoIf && (t._x_undoIf(), delete t._x_undoIf);
  };
  n(() => i((s) => {
    s ? o() : a();
  })), r(() => t._x_undoIf && t._x_undoIf());
});
M("id", (t, { expression: e }, { evaluate: n }) => {
  n(e).forEach((i) => ll(t, i));
});
Bt((t, e) => {
  t._x_ids && (e._x_ids = t._x_ids);
});
zn(Ei("@", Ti(Ne("on:"))));
M("on", ue((t, { value: e, modifiers: n, expression: r }, { cleanup: i }) => {
  let o = r ? U(t, r) : () => {
  };
  t.tagName.toLowerCase() === "template" && (t._x_forwardEvents || (t._x_forwardEvents = []), t._x_forwardEvents.includes(e) || t._x_forwardEvents.push(e));
  let a = xn(t, e, n, (s) => {
    o(() => {
    }, { scope: { $event: s }, params: [s] });
  });
  i(() => a());
}));
Gt("Collapse", "collapse", "collapse");
Gt("Intersect", "intersect", "intersect");
Gt("Focus", "trap", "focus");
Gt("Mask", "mask", "mask");
function Gt(t, e, n) {
  M(e, (r) => J(`You can't use [x-${e}] without first installing the "${t}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
Ze.setEvaluator(Ci);
Ze.setReactivityEngine({ reactive: ir, effect: Is, release: Ms, raw: L });
var Cl = Ze, ne = Cl, vo = ["input", "select", "textarea", "a[href]", "button", "[tabindex]:not(slot)", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])', "details>summary:first-of-type", "details"], wt = /* @__PURE__ */ vo.join(","), So = typeof Element > "u", be = So ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, kn = !So && Element.prototype.getRootNode ? function(t) {
  return t.getRootNode();
} : function(t) {
  return t.ownerDocument;
}, wo = function(e, n, r) {
  var i = Array.prototype.slice.apply(e.querySelectorAll(wt));
  return n && be.call(e, wt) && i.unshift(e), i = i.filter(r), i;
}, Co = function t(e, n, r) {
  for (var i = [], o = Array.from(e); o.length; ) {
    var a = o.shift();
    if (a.tagName === "SLOT") {
      var s = a.assignedElements(), l = s.length ? s : a.children, c = t(l, !0, r);
      r.flatten ? i.push.apply(i, c) : i.push({
        scope: a,
        candidates: c
      });
    } else {
      var u = be.call(a, wt);
      u && r.filter(a) && (n || !e.includes(a)) && i.push(a);
      var d = a.shadowRoot || // check for an undisclosed shadow
      typeof r.getShadowRoot == "function" && r.getShadowRoot(a), f = !r.shadowRootFilter || r.shadowRootFilter(a);
      if (d && f) {
        var p = t(d === !0 ? a.children : d.children, !0, r);
        r.flatten ? i.push.apply(i, p) : i.push({
          scope: a,
          candidates: p
        });
      } else
        o.unshift.apply(o, a.children);
    }
  }
  return i;
}, xo = function(e, n) {
  return e.tabIndex < 0 && (n || /^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || e.isContentEditable) && isNaN(parseInt(e.getAttribute("tabindex"), 10)) ? 0 : e.tabIndex;
}, xl = function(e, n) {
  return e.tabIndex === n.tabIndex ? e.documentOrder - n.documentOrder : e.tabIndex - n.tabIndex;
}, ko = function(e) {
  return e.tagName === "INPUT";
}, kl = function(e) {
  return ko(e) && e.type === "hidden";
}, Al = function(e) {
  var n = e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(r) {
    return r.tagName === "SUMMARY";
  });
  return n;
}, El = function(e, n) {
  for (var r = 0; r < e.length; r++)
    if (e[r].checked && e[r].form === n)
      return e[r];
}, Tl = function(e) {
  if (!e.name)
    return !0;
  var n = e.form || kn(e), r = function(s) {
    return n.querySelectorAll('input[type="radio"][name="' + s + '"]');
  }, i;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    i = r(window.CSS.escape(e.name));
  else
    try {
      i = r(e.name);
    } catch (a) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", a.message), !1;
    }
  var o = El(i, e.form);
  return !o || o === e;
}, Rl = function(e) {
  return ko(e) && e.type === "radio";
}, Nl = function(e) {
  return Rl(e) && !Tl(e);
}, Rr = function(e) {
  var n = e.getBoundingClientRect(), r = n.width, i = n.height;
  return r === 0 && i === 0;
}, Ll = function(e, n) {
  var r = n.displayCheck, i = n.getShadowRoot;
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  var o = be.call(e, "details>summary:first-of-type"), a = o ? e.parentElement : e;
  if (be.call(a, "details:not([open]) *"))
    return !0;
  var s = kn(e).host, l = (s == null ? void 0 : s.ownerDocument.contains(s)) || e.ownerDocument.contains(e);
  if (!r || r === "full") {
    if (typeof i == "function") {
      for (var c = e; e; ) {
        var u = e.parentElement, d = kn(e);
        if (u && !u.shadowRoot && i(u) === !0)
          return Rr(e);
        e.assignedSlot ? e = e.assignedSlot : !u && d !== e.ownerDocument ? e = d.host : e = u;
      }
      e = c;
    }
    if (l)
      return !e.getClientRects().length;
  } else if (r === "non-zero-area")
    return Rr(e);
  return !1;
}, Pl = function(e) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
    for (var n = e.parentElement; n; ) {
      if (n.tagName === "FIELDSET" && n.disabled) {
        for (var r = 0; r < n.children.length; r++) {
          var i = n.children.item(r);
          if (i.tagName === "LEGEND")
            return be.call(n, "fieldset[disabled] *") ? !0 : !i.contains(e);
        }
        return !0;
      }
      n = n.parentElement;
    }
  return !1;
}, Ct = function(e, n) {
  return !(n.disabled || kl(n) || Ll(n, e) || // For a details element with a summary, the summary element gets the focus
  Al(n) || Pl(n));
}, An = function(e, n) {
  return !(Nl(n) || xo(n) < 0 || !Ct(e, n));
}, Ol = function(e) {
  var n = parseInt(e.getAttribute("tabindex"), 10);
  return !!(isNaN(n) || n >= 0);
}, Il = function t(e) {
  var n = [], r = [];
  return e.forEach(function(i, o) {
    var a = !!i.scope, s = a ? i.scope : i, l = xo(s, a), c = a ? t(i.candidates) : s;
    l === 0 ? a ? n.push.apply(n, c) : n.push(s) : r.push({
      documentOrder: o,
      tabIndex: l,
      item: i,
      isScope: a,
      content: c
    });
  }), r.sort(xl).reduce(function(i, o) {
    return o.isScope ? i.push.apply(i, o.content) : i.push(o.content), i;
  }, []).concat(n);
}, Ml = function(e, n) {
  n = n || {};
  var r;
  return n.getShadowRoot ? r = Co([e], n.includeContainer, {
    filter: An.bind(null, n),
    flatten: !1,
    getShadowRoot: n.getShadowRoot,
    shadowRootFilter: Ol
  }) : r = wo(e, n.includeContainer, An.bind(null, n)), Il(r);
}, Ao = function(e, n) {
  n = n || {};
  var r;
  return n.getShadowRoot ? r = Co([e], n.includeContainer, {
    filter: Ct.bind(null, n),
    flatten: !0,
    getShadowRoot: n.getShadowRoot
  }) : r = wo(e, n.includeContainer, Ct.bind(null, n)), r;
}, st = function(e, n) {
  if (n = n || {}, !e)
    throw new Error("No node provided");
  return be.call(e, wt) === !1 ? !1 : An(n, e);
}, Dl = /* @__PURE__ */ vo.concat("iframe").join(","), mt = function(e, n) {
  if (n = n || {}, !e)
    throw new Error("No node provided");
  return be.call(e, Dl) === !1 ? !1 : Ct(n, e);
};
function Nr(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Lr(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Nr(Object(n), !0).forEach(function(r) {
      Bl(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Nr(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
function Bl(t, e, n) {
  return e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
var Pr = /* @__PURE__ */ function() {
  var t = [];
  return {
    activateTrap: function(n) {
      if (t.length > 0) {
        var r = t[t.length - 1];
        r !== n && r.pause();
      }
      var i = t.indexOf(n);
      i === -1 || t.splice(i, 1), t.push(n);
    },
    deactivateTrap: function(n) {
      var r = t.indexOf(n);
      r !== -1 && t.splice(r, 1), t.length > 0 && t[t.length - 1].unpause();
    }
  };
}(), Fl = function(e) {
  return e.tagName && e.tagName.toLowerCase() === "input" && typeof e.select == "function";
}, jl = function(e) {
  return e.key === "Escape" || e.key === "Esc" || e.keyCode === 27;
}, $l = function(e) {
  return e.key === "Tab" || e.keyCode === 9;
}, Or = function(e) {
  return setTimeout(e, 0);
}, Ir = function(e, n) {
  var r = -1;
  return e.every(function(i, o) {
    return n(i) ? (r = o, !1) : !0;
  }), r;
}, je = function(e) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return typeof e == "function" ? e.apply(void 0, r) : e;
}, lt = function(e) {
  return e.target.shadowRoot && typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
}, Gl = function(e, n) {
  var r = (n == null ? void 0 : n.document) || document, i = Lr({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0
  }, n), o = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   firstTabbableNode: HTMLElement|null,
    //   lastTabbableNode: HTMLElement|null,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: !1,
    paused: !1,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0
  }, a, s = function(v, S, k) {
    return v && v[S] !== void 0 ? v[S] : i[k || S];
  }, l = function(v) {
    return o.containerGroups.findIndex(function(S) {
      var k = S.container, R = S.tabbableNodes;
      return k.contains(v) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      R.find(function(T) {
        return T === v;
      });
    });
  }, c = function(v) {
    var S = i[v];
    if (typeof S == "function") {
      for (var k = arguments.length, R = new Array(k > 1 ? k - 1 : 0), T = 1; T < k; T++)
        R[T - 1] = arguments[T];
      S = S.apply(void 0, R);
    }
    if (S === !0 && (S = void 0), !S) {
      if (S === void 0 || S === !1)
        return S;
      throw new Error("`".concat(v, "` was specified but was not a node, or did not return a node"));
    }
    var D = S;
    if (typeof S == "string" && (D = r.querySelector(S), !D))
      throw new Error("`".concat(v, "` as selector refers to no known node"));
    return D;
  }, u = function() {
    var v = c("initialFocus");
    if (v === !1)
      return !1;
    if (v === void 0)
      if (l(r.activeElement) >= 0)
        v = r.activeElement;
      else {
        var S = o.tabbableGroups[0], k = S && S.firstTabbableNode;
        v = k || c("fallbackFocus");
      }
    if (!v)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return v;
  }, d = function() {
    if (o.containerGroups = o.containers.map(function(v) {
      var S = Ml(v, i.tabbableOptions), k = Ao(v, i.tabbableOptions);
      return {
        container: v,
        tabbableNodes: S,
        focusableNodes: k,
        firstTabbableNode: S.length > 0 ? S[0] : null,
        lastTabbableNode: S.length > 0 ? S[S.length - 1] : null,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(T) {
          var D = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, z = k.findIndex(function(Y) {
            return Y === T;
          });
          if (!(z < 0))
            return D ? k.slice(z + 1).find(function(Y) {
              return st(Y, i.tabbableOptions);
            }) : k.slice(0, z).reverse().find(function(Y) {
              return st(Y, i.tabbableOptions);
            });
        }
      };
    }), o.tabbableGroups = o.containerGroups.filter(function(v) {
      return v.tabbableNodes.length > 0;
    }), o.tabbableGroups.length <= 0 && !c("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
  }, f = function x(v) {
    if (v !== !1 && v !== r.activeElement) {
      if (!v || !v.focus) {
        x(u());
        return;
      }
      v.focus({
        preventScroll: !!i.preventScroll
      }), o.mostRecentlyFocusedNode = v, Fl(v) && v.select();
    }
  }, p = function(v) {
    var S = c("setReturnFocus", v);
    return S || (S === !1 ? !1 : v);
  }, h = function(v) {
    var S = lt(v);
    if (!(l(S) >= 0)) {
      if (je(i.clickOutsideDeactivates, v)) {
        a.deactivate({
          // if, on deactivation, we should return focus to the node originally-focused
          //  when the trap was activated (or the configured `setReturnFocus` node),
          //  then assume it's also OK to return focus to the outside node that was
          //  just clicked, causing deactivation, as long as that node is focusable;
          //  if it isn't focusable, then return focus to the original node focused
          //  on activation (or the configured `setReturnFocus` node)
          // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
          //  which will result in the outside click setting focus to the node
          //  that was clicked, whether it's focusable or not; by setting
          //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
          //  on activation (or the configured `setReturnFocus` node)
          returnFocus: i.returnFocusOnDeactivate && !mt(S, i.tabbableOptions)
        });
        return;
      }
      je(i.allowOutsideClick, v) || v.preventDefault();
    }
  }, C = function(v) {
    var S = lt(v), k = l(S) >= 0;
    k || S instanceof Document ? k && (o.mostRecentlyFocusedNode = S) : (v.stopImmediatePropagation(), f(o.mostRecentlyFocusedNode || u()));
  }, g = function(v) {
    var S = lt(v);
    d();
    var k = null;
    if (o.tabbableGroups.length > 0) {
      var R = l(S), T = R >= 0 ? o.containerGroups[R] : void 0;
      if (R < 0)
        v.shiftKey ? k = o.tabbableGroups[o.tabbableGroups.length - 1].lastTabbableNode : k = o.tabbableGroups[0].firstTabbableNode;
      else if (v.shiftKey) {
        var D = Ir(o.tabbableGroups, function(zt) {
          var Kt = zt.firstTabbableNode;
          return S === Kt;
        });
        if (D < 0 && (T.container === S || mt(S, i.tabbableOptions) && !st(S, i.tabbableOptions) && !T.nextTabbableNode(S, !1)) && (D = R), D >= 0) {
          var z = D === 0 ? o.tabbableGroups.length - 1 : D - 1, Y = o.tabbableGroups[z];
          k = Y.lastTabbableNode;
        }
      } else {
        var H = Ir(o.tabbableGroups, function(zt) {
          var Kt = zt.lastTabbableNode;
          return S === Kt;
        });
        if (H < 0 && (T.container === S || mt(S, i.tabbableOptions) && !st(S, i.tabbableOptions) && !T.nextTabbableNode(S)) && (H = R), H >= 0) {
          var oe = H === o.tabbableGroups.length - 1 ? 0 : H + 1, Me = o.tabbableGroups[oe];
          k = Me.firstTabbableNode;
        }
      }
    } else
      k = c("fallbackFocus");
    k && (v.preventDefault(), f(k));
  }, y = function(v) {
    if (jl(v) && je(i.escapeDeactivates, v) !== !1) {
      v.preventDefault(), a.deactivate();
      return;
    }
    if ($l(v)) {
      g(v);
      return;
    }
  }, _ = function(v) {
    var S = lt(v);
    l(S) >= 0 || je(i.clickOutsideDeactivates, v) || je(i.allowOutsideClick, v) || (v.preventDefault(), v.stopImmediatePropagation());
  }, w = function() {
    if (o.active)
      return Pr.activateTrap(a), o.delayInitialFocusTimer = i.delayInitialFocus ? Or(function() {
        f(u());
      }) : f(u()), r.addEventListener("focusin", C, !0), r.addEventListener("mousedown", h, {
        capture: !0,
        passive: !1
      }), r.addEventListener("touchstart", h, {
        capture: !0,
        passive: !1
      }), r.addEventListener("click", _, {
        capture: !0,
        passive: !1
      }), r.addEventListener("keydown", y, {
        capture: !0,
        passive: !1
      }), a;
  }, A = function() {
    if (o.active)
      return r.removeEventListener("focusin", C, !0), r.removeEventListener("mousedown", h, !0), r.removeEventListener("touchstart", h, !0), r.removeEventListener("click", _, !0), r.removeEventListener("keydown", y, !0), a;
  };
  return a = {
    get active() {
      return o.active;
    },
    get paused() {
      return o.paused;
    },
    activate: function(v) {
      if (o.active)
        return this;
      var S = s(v, "onActivate"), k = s(v, "onPostActivate"), R = s(v, "checkCanFocusTrap");
      R || d(), o.active = !0, o.paused = !1, o.nodeFocusedBeforeActivation = r.activeElement, S && S();
      var T = function() {
        R && d(), w(), k && k();
      };
      return R ? (R(o.containers.concat()).then(T, T), this) : (T(), this);
    },
    deactivate: function(v) {
      if (!o.active)
        return this;
      var S = Lr({
        onDeactivate: i.onDeactivate,
        onPostDeactivate: i.onPostDeactivate,
        checkCanReturnFocus: i.checkCanReturnFocus
      }, v);
      clearTimeout(o.delayInitialFocusTimer), o.delayInitialFocusTimer = void 0, A(), o.active = !1, o.paused = !1, Pr.deactivateTrap(a);
      var k = s(S, "onDeactivate"), R = s(S, "onPostDeactivate"), T = s(S, "checkCanReturnFocus"), D = s(S, "returnFocus", "returnFocusOnDeactivate");
      k && k();
      var z = function() {
        Or(function() {
          D && f(p(o.nodeFocusedBeforeActivation)), R && R();
        });
      };
      return D && T ? (T(p(o.nodeFocusedBeforeActivation)).then(z, z), this) : (z(), this);
    },
    pause: function() {
      return o.paused || !o.active ? this : (o.paused = !0, A(), this);
    },
    unpause: function() {
      return !o.paused || !o.active ? this : (o.paused = !1, d(), w(), this);
    },
    updateContainerElements: function(v) {
      var S = [].concat(v).filter(Boolean);
      return o.containers = S.map(function(k) {
        return typeof k == "string" ? r.querySelector(k) : k;
      }), o.active && d(), this;
    }
  }, a.updateContainerElements(e), a;
};
function Hl(t) {
  let e, n;
  window.addEventListener("focusin", () => {
    e = n, n = document.activeElement;
  }), t.magic("focus", (r) => {
    let i = r;
    return {
      __noscroll: !1,
      __wrapAround: !1,
      within(o) {
        return i = o, this;
      },
      withoutScrolling() {
        return this.__noscroll = !0, this;
      },
      noscroll() {
        return this.__noscroll = !0, this;
      },
      withWrapAround() {
        return this.__wrapAround = !0, this;
      },
      wrap() {
        return this.withWrapAround();
      },
      focusable(o) {
        return mt(o);
      },
      previouslyFocused() {
        return e;
      },
      lastFocused() {
        return e;
      },
      focused() {
        return n;
      },
      focusables() {
        return Array.isArray(i) ? i : Ao(i, { displayCheck: "none" });
      },
      all() {
        return this.focusables();
      },
      isFirst(o) {
        let a = this.all();
        return a[0] && a[0].isSameNode(o);
      },
      isLast(o) {
        let a = this.all();
        return a.length && a.slice(-1)[0].isSameNode(o);
      },
      getFirst() {
        return this.all()[0];
      },
      getLast() {
        return this.all().slice(-1)[0];
      },
      getNext() {
        let o = this.all(), a = document.activeElement;
        if (o.indexOf(a) !== -1)
          return this.__wrapAround && o.indexOf(a) === o.length - 1 ? o[0] : o[o.indexOf(a) + 1];
      },
      getPrevious() {
        let o = this.all(), a = document.activeElement;
        if (o.indexOf(a) !== -1)
          return this.__wrapAround && o.indexOf(a) === 0 ? o.slice(-1)[0] : o[o.indexOf(a) - 1];
      },
      first() {
        this.focus(this.getFirst());
      },
      last() {
        this.focus(this.getLast());
      },
      next() {
        this.focus(this.getNext());
      },
      previous() {
        this.focus(this.getPrevious());
      },
      prev() {
        return this.previous();
      },
      focus(o) {
        o && setTimeout(() => {
          o.hasAttribute("tabindex") || o.setAttribute("tabindex", "0"), o.focus({ preventScroll: this.__noscroll });
        });
      }
    };
  }), t.directive("trap", t.skipDuringClone(
    (r, { expression: i, modifiers: o }, { effect: a, evaluateLater: s, cleanup: l }) => {
      let c = s(i), u = !1, d = {
        escapeDeactivates: !1,
        allowOutsideClick: !0,
        fallbackFocus: () => r
      };
      if (o.includes("noautofocus"))
        d.initialFocus = !1;
      else {
        let g = r.querySelector("[autofocus]");
        g && (d.initialFocus = g);
      }
      let f = Gl(r, d), p = () => {
      }, h = () => {
      };
      const C = () => {
        p(), p = () => {
        }, h(), h = () => {
        }, f.deactivate({
          returnFocus: !o.includes("noreturn")
        });
      };
      a(() => c((g) => {
        u !== g && (g && !u && (o.includes("noscroll") && (h = Ul()), o.includes("inert") && (p = Mr(r)), setTimeout(() => {
          f.activate();
        }, 15)), !g && u && C(), u = !!g);
      })), l(C);
    },
    // When cloning, we only want to add aria-hidden attributes to the
    // DOM and not try to actually trap, as trapping can mess with the
    // live DOM and isn't just isolated to the cloned DOM.
    (r, { expression: i, modifiers: o }, { evaluate: a }) => {
      o.includes("inert") && a(i) && Mr(r);
    }
  ));
}
function Mr(t) {
  let e = [];
  return Eo(t, (n) => {
    let r = n.hasAttribute("aria-hidden");
    n.setAttribute("aria-hidden", "true"), e.push(() => r || n.removeAttribute("aria-hidden"));
  }), () => {
    for (; e.length; )
      e.pop()();
  };
}
function Eo(t, e) {
  t.isSameNode(document.body) || !t.parentNode || Array.from(t.parentNode.children).forEach((n) => {
    n.isSameNode(t) ? Eo(t.parentNode, e) : e(n);
  });
}
function Ul() {
  let t = document.documentElement.style.overflow, e = document.documentElement.style.paddingRight, n = window.innerWidth - document.documentElement.clientWidth;
  return document.documentElement.style.overflow = "hidden", document.documentElement.style.paddingRight = `${n}px`, () => {
    document.documentElement.style.overflow = t, document.documentElement.style.paddingRight = e;
  };
}
/*! Bundled license information:

tabbable/dist/index.esm.js:
  (*!
  * tabbable 5.3.3
  * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
  *)

focus-trap/dist/focus-trap.esm.js:
  (*!
  * focus-trap 6.9.4
  * @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
  *)
*/
function ql(t) {
  let e = () => {
    let n, r;
    try {
      r = localStorage;
    } catch (i) {
      console.error(i), console.warn("Alpine: $persist is using temporary storage since localStorage is unavailable.");
      let o = /* @__PURE__ */ new Map();
      r = {
        getItem: o.get.bind(o),
        setItem: o.set.bind(o)
      };
    }
    return t.interceptor((i, o, a, s, l) => {
      let c = n || `_x_${s}`, u = Dr(c, r) ? Br(c, r) : i;
      return a(u), t.effect(() => {
        let d = o();
        Fr(c, d, r), a(d);
      }), u;
    }, (i) => {
      i.as = (o) => (n = o, i), i.using = (o) => (r = o, i);
    });
  };
  Object.defineProperty(t, "$persist", { get: () => e() }), t.magic("persist", e), t.persist = (n, { get: r, set: i }, o = localStorage) => {
    let a = Dr(n, o) ? Br(n, o) : r();
    i(a), t.effect(() => {
      let s = r();
      Fr(n, s, o), i(s);
    });
  };
}
function Dr(t, e) {
  return e.getItem(t) !== null;
}
function Br(t, e) {
  let n = e.getItem(t, e);
  if (n !== void 0)
    return JSON.parse(n);
}
function Fr(t, e, n) {
  n.setItem(t, JSON.stringify(e));
}
let I = class extends Error {
  constructor(e) {
    super(e), this.name = "ShikiError";
  }
};
function Wl(t) {
  return or(t);
}
function or(t) {
  return Array.isArray(t) ? zl(t) : t instanceof RegExp ? t : typeof t == "object" ? Kl(t) : t;
}
function zl(t) {
  let e = [];
  for (let n = 0, r = t.length; n < r; n++)
    e[n] = or(t[n]);
  return e;
}
function Kl(t) {
  let e = {};
  for (let n in t)
    e[n] = or(t[n]);
  return e;
}
function To(t, ...e) {
  return e.forEach((n) => {
    for (let r in n)
      t[r] = n[r];
  }), t;
}
function Ro(t) {
  const e = ~t.lastIndexOf("/") || ~t.lastIndexOf("\\");
  return e === 0 ? t : ~e === t.length - 1 ? Ro(t.substring(0, t.length - 1)) : t.substr(~e + 1);
}
var Zt = /\$(\d+)|\${(\d+):\/(downcase|upcase)}/g, ct = class {
  static hasCaptures(t) {
    return t === null ? !1 : (Zt.lastIndex = 0, Zt.test(t));
  }
  static replaceCaptures(t, e, n) {
    return t.replace(Zt, (r, i, o, a) => {
      let s = n[parseInt(i || o, 10)];
      if (s) {
        let l = e.substring(s.start, s.end);
        for (; l[0] === "."; )
          l = l.substring(1);
        switch (a) {
          case "downcase":
            return l.toLowerCase();
          case "upcase":
            return l.toUpperCase();
          default:
            return l;
        }
      } else
        return r;
    });
  }
};
function No(t, e) {
  return t < e ? -1 : t > e ? 1 : 0;
}
function Lo(t, e) {
  if (t === null && e === null)
    return 0;
  if (!t)
    return -1;
  if (!e)
    return 1;
  let n = t.length, r = e.length;
  if (n === r) {
    for (let i = 0; i < n; i++) {
      let o = No(t[i], e[i]);
      if (o !== 0)
        return o;
    }
    return 0;
  }
  return n - r;
}
function jr(t) {
  return !!(/^#[0-9a-f]{6}$/i.test(t) || /^#[0-9a-f]{8}$/i.test(t) || /^#[0-9a-f]{3}$/i.test(t) || /^#[0-9a-f]{4}$/i.test(t));
}
function Po(t) {
  return t.replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&");
}
var Oo = class {
  constructor(t) {
    m(this, "cache", /* @__PURE__ */ new Map());
    this.fn = t;
  }
  get(t) {
    if (this.cache.has(t))
      return this.cache.get(t);
    const e = this.fn(t);
    return this.cache.set(t, e), e;
  }
}, xt = class {
  constructor(t, e, n) {
    m(this, "_cachedMatchRoot", new Oo(
      (t) => this._root.match(t)
    ));
    this._colorMap = t, this._defaults = e, this._root = n;
  }
  static createFromRawTheme(t, e) {
    return this.createFromParsedTheme(Yl(t), e);
  }
  static createFromParsedTheme(t, e) {
    return Ql(t, e);
  }
  getColorMap() {
    return this._colorMap.getColorMap();
  }
  getDefaults() {
    return this._defaults;
  }
  match(t) {
    if (t === null)
      return this._defaults;
    const e = t.scopeName, r = this._cachedMatchRoot.get(e).find(
      (i) => Vl(t.parent, i.parentScopes)
    );
    return r ? new Io(
      r.fontStyle,
      r.foreground,
      r.background
    ) : null;
  }
}, en = class gt {
  constructor(e, n) {
    this.parent = e, this.scopeName = n;
  }
  static push(e, n) {
    for (const r of n)
      e = new gt(e, r);
    return e;
  }
  static from(...e) {
    let n = null;
    for (let r = 0; r < e.length; r++)
      n = new gt(n, e[r]);
    return n;
  }
  push(e) {
    return new gt(this, e);
  }
  getSegments() {
    let e = this;
    const n = [];
    for (; e; )
      n.push(e.scopeName), e = e.parent;
    return n.reverse(), n;
  }
  toString() {
    return this.getSegments().join(" ");
  }
  extends(e) {
    return this === e ? !0 : this.parent === null ? !1 : this.parent.extends(e);
  }
  getExtensionIfDefined(e) {
    const n = [];
    let r = this;
    for (; r && r !== e; )
      n.push(r.scopeName), r = r.parent;
    return r === e ? n.reverse() : void 0;
  }
};
function Vl(t, e) {
  if (e.length === 0)
    return !0;
  for (let n = 0; n < e.length; n++) {
    let r = e[n], i = !1;
    if (r === ">") {
      if (n === e.length - 1)
        return !1;
      r = e[++n], i = !0;
    }
    for (; t && !Jl(t.scopeName, r); ) {
      if (i)
        return !1;
      t = t.parent;
    }
    if (!t)
      return !1;
    t = t.parent;
  }
  return !0;
}
function Jl(t, e) {
  return e === t || t.startsWith(e) && t[e.length] === ".";
}
var Io = class {
  constructor(t, e, n) {
    this.fontStyle = t, this.foregroundId = e, this.backgroundId = n;
  }
};
function Yl(t) {
  if (!t)
    return [];
  if (!t.settings || !Array.isArray(t.settings))
    return [];
  let e = t.settings, n = [], r = 0;
  for (let i = 0, o = e.length; i < o; i++) {
    let a = e[i];
    if (!a.settings)
      continue;
    let s;
    if (typeof a.scope == "string") {
      let d = a.scope;
      d = d.replace(/^[,]+/, ""), d = d.replace(/[,]+$/, ""), s = d.split(",");
    } else Array.isArray(a.scope) ? s = a.scope : s = [""];
    let l = -1;
    if (typeof a.settings.fontStyle == "string") {
      l = 0;
      let d = a.settings.fontStyle.split(" ");
      for (let f = 0, p = d.length; f < p; f++)
        switch (d[f]) {
          case "italic":
            l = l | 1;
            break;
          case "bold":
            l = l | 2;
            break;
          case "underline":
            l = l | 4;
            break;
          case "strikethrough":
            l = l | 8;
            break;
        }
    }
    let c = null;
    typeof a.settings.foreground == "string" && jr(a.settings.foreground) && (c = a.settings.foreground);
    let u = null;
    typeof a.settings.background == "string" && jr(a.settings.background) && (u = a.settings.background);
    for (let d = 0, f = s.length; d < f; d++) {
      let h = s[d].trim().split(" "), C = h[h.length - 1], g = null;
      h.length > 1 && (g = h.slice(0, h.length - 1), g.reverse()), n[r++] = new Xl(
        C,
        g,
        i,
        l,
        c,
        u
      );
    }
  }
  return n;
}
var Xl = class {
  constructor(t, e, n, r, i, o) {
    this.scope = t, this.parentScopes = e, this.index = n, this.fontStyle = r, this.foreground = i, this.background = o;
  }
}, G = /* @__PURE__ */ ((t) => (t[t.NotSet = -1] = "NotSet", t[t.None = 0] = "None", t[t.Italic = 1] = "Italic", t[t.Bold = 2] = "Bold", t[t.Underline = 4] = "Underline", t[t.Strikethrough = 8] = "Strikethrough", t))(G || {});
function Ql(t, e) {
  t.sort((l, c) => {
    let u = No(l.scope, c.scope);
    return u !== 0 || (u = Lo(l.parentScopes, c.parentScopes), u !== 0) ? u : l.index - c.index;
  });
  let n = 0, r = "#000000", i = "#ffffff";
  for (; t.length >= 1 && t[0].scope === ""; ) {
    let l = t.shift();
    l.fontStyle !== -1 && (n = l.fontStyle), l.foreground !== null && (r = l.foreground), l.background !== null && (i = l.background);
  }
  let o = new Zl(e), a = new Io(n, o.getId(r), o.getId(i)), s = new tc(new En(0, null, -1, 0, 0), []);
  for (let l = 0, c = t.length; l < c; l++) {
    let u = t[l];
    s.insert(0, u.scope, u.parentScopes, u.fontStyle, o.getId(u.foreground), o.getId(u.background));
  }
  return new xt(o, a, s);
}
var Zl = class {
  constructor(t) {
    m(this, "_isFrozen");
    m(this, "_lastColorId");
    m(this, "_id2color");
    m(this, "_color2id");
    if (this._lastColorId = 0, this._id2color = [], this._color2id = /* @__PURE__ */ Object.create(null), Array.isArray(t)) {
      this._isFrozen = !0;
      for (let e = 0, n = t.length; e < n; e++)
        this._color2id[t[e]] = e, this._id2color[e] = t[e];
    } else
      this._isFrozen = !1;
  }
  getId(t) {
    if (t === null)
      return 0;
    t = t.toUpperCase();
    let e = this._color2id[t];
    if (e)
      return e;
    if (this._isFrozen)
      throw new Error(`Missing color in color map - ${t}`);
    return e = ++this._lastColorId, this._color2id[t] = e, this._id2color[e] = t, e;
  }
  getColorMap() {
    return this._id2color.slice(0);
  }
}, ec = Object.freeze([]), En = class Mo {
  constructor(e, n, r, i, o) {
    m(this, "scopeDepth");
    m(this, "parentScopes");
    m(this, "fontStyle");
    m(this, "foreground");
    m(this, "background");
    this.scopeDepth = e, this.parentScopes = n || ec, this.fontStyle = r, this.foreground = i, this.background = o;
  }
  clone() {
    return new Mo(this.scopeDepth, this.parentScopes, this.fontStyle, this.foreground, this.background);
  }
  static cloneArr(e) {
    let n = [];
    for (let r = 0, i = e.length; r < i; r++)
      n[r] = e[r].clone();
    return n;
  }
  acceptOverwrite(e, n, r, i) {
    this.scopeDepth > e ? console.log("how did this happen?") : this.scopeDepth = e, n !== -1 && (this.fontStyle = n), r !== 0 && (this.foreground = r), i !== 0 && (this.background = i);
  }
}, tc = class Tn {
  constructor(e, n = [], r = {}) {
    m(this, "_rulesWithParentScopes");
    this._mainRule = e, this._children = r, this._rulesWithParentScopes = n;
  }
  static _cmpBySpecificity(e, n) {
    if (e.scopeDepth !== n.scopeDepth)
      return n.scopeDepth - e.scopeDepth;
    let r = 0, i = 0;
    for (; e.parentScopes[r] === ">" && r++, n.parentScopes[i] === ">" && i++, !(r >= e.parentScopes.length || i >= n.parentScopes.length); ) {
      const o = n.parentScopes[i].length - e.parentScopes[r].length;
      if (o !== 0)
        return o;
      r++, i++;
    }
    return n.parentScopes.length - e.parentScopes.length;
  }
  match(e) {
    if (e !== "") {
      let r = e.indexOf("."), i, o;
      if (r === -1 ? (i = e, o = "") : (i = e.substring(0, r), o = e.substring(r + 1)), this._children.hasOwnProperty(i))
        return this._children[i].match(o);
    }
    const n = this._rulesWithParentScopes.concat(this._mainRule);
    return n.sort(Tn._cmpBySpecificity), n;
  }
  insert(e, n, r, i, o, a) {
    if (n === "") {
      this._doInsertHere(e, r, i, o, a);
      return;
    }
    let s = n.indexOf("."), l, c;
    s === -1 ? (l = n, c = "") : (l = n.substring(0, s), c = n.substring(s + 1));
    let u;
    this._children.hasOwnProperty(l) ? u = this._children[l] : (u = new Tn(this._mainRule.clone(), En.cloneArr(this._rulesWithParentScopes)), this._children[l] = u), u.insert(e + 1, c, r, i, o, a);
  }
  _doInsertHere(e, n, r, i, o) {
    if (n === null) {
      this._mainRule.acceptOverwrite(e, r, i, o);
      return;
    }
    for (let a = 0, s = this._rulesWithParentScopes.length; a < s; a++) {
      let l = this._rulesWithParentScopes[a];
      if (Lo(l.parentScopes, n) === 0) {
        l.acceptOverwrite(e, r, i, o);
        return;
      }
    }
    r === -1 && (r = this._mainRule.fontStyle), i === 0 && (i = this._mainRule.foreground), o === 0 && (o = this._mainRule.background), this._rulesWithParentScopes.push(new En(e, n, r, i, o));
  }
}, Ee = class K {
  static toBinaryStr(e) {
    return e.toString(2).padStart(32, "0");
  }
  static print(e) {
    const n = K.getLanguageId(e), r = K.getTokenType(e), i = K.getFontStyle(e), o = K.getForeground(e), a = K.getBackground(e);
    console.log({
      languageId: n,
      tokenType: r,
      fontStyle: i,
      foreground: o,
      background: a
    });
  }
  static getLanguageId(e) {
    return (e & 255) >>> 0;
  }
  static getTokenType(e) {
    return (e & 768) >>> 8;
  }
  static containsBalancedBrackets(e) {
    return (e & 1024) !== 0;
  }
  static getFontStyle(e) {
    return (e & 30720) >>> 11;
  }
  static getForeground(e) {
    return (e & 16744448) >>> 15;
  }
  static getBackground(e) {
    return (e & 4278190080) >>> 24;
  }
  /**
   * Updates the fields in `metadata`.
   * A value of `0`, `NotSet` or `null` indicates that the corresponding field should be left as is.
   */
  static set(e, n, r, i, o, a, s) {
    let l = K.getLanguageId(e), c = K.getTokenType(e), u = K.containsBalancedBrackets(e) ? 1 : 0, d = K.getFontStyle(e), f = K.getForeground(e), p = K.getBackground(e);
    return n !== 0 && (l = n), r !== 8 && (c = r), i !== null && (u = i ? 1 : 0), o !== -1 && (d = o), a !== 0 && (f = a), s !== 0 && (p = s), (l << 0 | c << 8 | u << 10 | d << 11 | f << 15 | p << 24) >>> 0;
  }
};
function kt(t, e) {
  const n = [], r = nc(t);
  let i = r.next();
  for (; i !== null; ) {
    let l = 0;
    if (i.length === 2 && i.charAt(1) === ":") {
      switch (i.charAt(0)) {
        case "R":
          l = 1;
          break;
        case "L":
          l = -1;
          break;
        default:
          console.log(`Unknown priority ${i} in scope selector`);
      }
      i = r.next();
    }
    let c = a();
    if (n.push({ matcher: c, priority: l }), i !== ",")
      break;
    i = r.next();
  }
  return n;
  function o() {
    if (i === "-") {
      i = r.next();
      const l = o();
      return (c) => !!l && !l(c);
    }
    if (i === "(") {
      i = r.next();
      const l = s();
      return i === ")" && (i = r.next()), l;
    }
    if ($r(i)) {
      const l = [];
      do
        l.push(i), i = r.next();
      while ($r(i));
      return (c) => e(l, c);
    }
    return null;
  }
  function a() {
    const l = [];
    let c = o();
    for (; c; )
      l.push(c), c = o();
    return (u) => l.every((d) => d(u));
  }
  function s() {
    const l = [];
    let c = a();
    for (; c && (l.push(c), i === "|" || i === ","); ) {
      do
        i = r.next();
      while (i === "|" || i === ",");
      c = a();
    }
    return (u) => l.some((d) => d(u));
  }
}
function $r(t) {
  return !!t && !!t.match(/[\w\.:]+/);
}
function nc(t) {
  let e = /([LR]:|[\w\.:][\w\.:\-]*|[\,\|\-\(\)])/g, n = e.exec(t);
  return {
    next: () => {
      if (!n)
        return null;
      const r = n[0];
      return n = e.exec(t), r;
    }
  };
}
function Do(t) {
  typeof t.dispose == "function" && t.dispose();
}
var Ke = class {
  constructor(t) {
    this.scopeName = t;
  }
  toKey() {
    return this.scopeName;
  }
}, rc = class {
  constructor(t, e) {
    this.scopeName = t, this.ruleName = e;
  }
  toKey() {
    return `${this.scopeName}#${this.ruleName}`;
  }
}, ic = class {
  constructor() {
    m(this, "_references", []);
    m(this, "_seenReferenceKeys", /* @__PURE__ */ new Set());
    m(this, "visitedRule", /* @__PURE__ */ new Set());
  }
  get references() {
    return this._references;
  }
  add(t) {
    const e = t.toKey();
    this._seenReferenceKeys.has(e) || (this._seenReferenceKeys.add(e), this._references.push(t));
  }
}, oc = class {
  constructor(t, e) {
    m(this, "seenFullScopeRequests", /* @__PURE__ */ new Set());
    m(this, "seenPartialScopeRequests", /* @__PURE__ */ new Set());
    m(this, "Q");
    this.repo = t, this.initialScopeName = e, this.seenFullScopeRequests.add(this.initialScopeName), this.Q = [new Ke(this.initialScopeName)];
  }
  processQueue() {
    const t = this.Q;
    this.Q = [];
    const e = new ic();
    for (const n of t)
      ac(n, this.initialScopeName, this.repo, e);
    for (const n of e.references)
      if (n instanceof Ke) {
        if (this.seenFullScopeRequests.has(n.scopeName))
          continue;
        this.seenFullScopeRequests.add(n.scopeName), this.Q.push(n);
      } else {
        if (this.seenFullScopeRequests.has(n.scopeName) || this.seenPartialScopeRequests.has(n.toKey()))
          continue;
        this.seenPartialScopeRequests.add(n.toKey()), this.Q.push(n);
      }
  }
};
function ac(t, e, n, r) {
  const i = n.lookup(t.scopeName);
  if (!i) {
    if (t.scopeName === e)
      throw new Error(`No grammar provided for <${e}>`);
    return;
  }
  const o = n.lookup(e);
  t instanceof Ke ? yt({ baseGrammar: o, selfGrammar: i }, r) : Rn(
    t.ruleName,
    { baseGrammar: o, selfGrammar: i, repository: i.repository },
    r
  );
  const a = n.injections(t.scopeName);
  if (a)
    for (const s of a)
      r.add(new Ke(s));
}
function Rn(t, e, n) {
  if (e.repository && e.repository[t]) {
    const r = e.repository[t];
    At([r], e, n);
  }
}
function yt(t, e) {
  t.selfGrammar.patterns && Array.isArray(t.selfGrammar.patterns) && At(
    t.selfGrammar.patterns,
    { ...t, repository: t.selfGrammar.repository },
    e
  ), t.selfGrammar.injections && At(
    Object.values(t.selfGrammar.injections),
    { ...t, repository: t.selfGrammar.repository },
    e
  );
}
function At(t, e, n) {
  for (const r of t) {
    if (n.visitedRule.has(r))
      continue;
    n.visitedRule.add(r);
    const i = r.repository ? To({}, e.repository, r.repository) : e.repository;
    Array.isArray(r.patterns) && At(r.patterns, { ...e, repository: i }, n);
    const o = r.include;
    if (!o)
      continue;
    const a = Bo(o);
    switch (a.kind) {
      case 0:
        yt({ ...e, selfGrammar: e.baseGrammar }, n);
        break;
      case 1:
        yt(e, n);
        break;
      case 2:
        Rn(a.ruleName, { ...e, repository: i }, n);
        break;
      case 3:
      case 4:
        const s = a.scopeName === e.selfGrammar.scopeName ? e.selfGrammar : a.scopeName === e.baseGrammar.scopeName ? e.baseGrammar : void 0;
        if (s) {
          const l = { baseGrammar: e.baseGrammar, selfGrammar: s, repository: i };
          a.kind === 4 ? Rn(a.ruleName, l, n) : yt(l, n);
        } else
          a.kind === 4 ? n.add(new rc(a.scopeName, a.ruleName)) : n.add(new Ke(a.scopeName));
        break;
    }
  }
}
var sc = class {
  constructor() {
    m(this, "kind", 0);
  }
}, lc = class {
  constructor() {
    m(this, "kind", 1);
  }
}, cc = class {
  constructor(t) {
    m(this, "kind", 2);
    this.ruleName = t;
  }
}, uc = class {
  constructor(t) {
    m(this, "kind", 3);
    this.scopeName = t;
  }
}, dc = class {
  constructor(t, e) {
    m(this, "kind", 4);
    this.scopeName = t, this.ruleName = e;
  }
};
function Bo(t) {
  if (t === "$base")
    return new sc();
  if (t === "$self")
    return new lc();
  const e = t.indexOf("#");
  if (e === -1)
    return new uc(t);
  if (e === 0)
    return new cc(t.substring(1));
  {
    const n = t.substring(0, e), r = t.substring(e + 1);
    return new dc(n, r);
  }
}
var fc = /\\(\d+)/, Gr = /\\(\d+)/g, pc = -1, Fo = -2;
var et = class {
  constructor(t, e, n, r) {
    m(this, "$location");
    m(this, "id");
    m(this, "_nameIsCapturing");
    m(this, "_name");
    m(this, "_contentNameIsCapturing");
    m(this, "_contentName");
    this.$location = t, this.id = e, this._name = n || null, this._nameIsCapturing = ct.hasCaptures(this._name), this._contentName = r || null, this._contentNameIsCapturing = ct.hasCaptures(this._contentName);
  }
  get debugName() {
    const t = this.$location ? `${Ro(this.$location.filename)}:${this.$location.line}` : "unknown";
    return `${this.constructor.name}#${this.id} @ ${t}`;
  }
  getName(t, e) {
    return !this._nameIsCapturing || this._name === null || t === null || e === null ? this._name : ct.replaceCaptures(this._name, t, e);
  }
  getContentName(t, e) {
    return !this._contentNameIsCapturing || this._contentName === null ? this._contentName : ct.replaceCaptures(this._contentName, t, e);
  }
}, hc = class extends et {
  constructor(e, n, r, i, o) {
    super(e, n, r, i);
    m(this, "retokenizeCapturedWithRuleId");
    this.retokenizeCapturedWithRuleId = o;
  }
  dispose() {
  }
  collectPatterns(e, n) {
    throw new Error("Not supported!");
  }
  compile(e, n) {
    throw new Error("Not supported!");
  }
  compileAG(e, n, r, i) {
    throw new Error("Not supported!");
  }
}, mc = class extends et {
  constructor(e, n, r, i, o) {
    super(e, n, r, null);
    m(this, "_match");
    m(this, "captures");
    m(this, "_cachedCompiledPatterns");
    this._match = new Ve(i, this.id), this.captures = o, this._cachedCompiledPatterns = null;
  }
  dispose() {
    this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
  }
  get debugMatchRegExp() {
    return `${this._match.source}`;
  }
  collectPatterns(e, n) {
    n.push(this._match);
  }
  compile(e, n) {
    return this._getCachedCompiledPatterns(e).compile(e);
  }
  compileAG(e, n, r, i) {
    return this._getCachedCompiledPatterns(e).compileAG(e, r, i);
  }
  _getCachedCompiledPatterns(e) {
    return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new Je(), this.collectPatterns(e, this._cachedCompiledPatterns)), this._cachedCompiledPatterns;
  }
}, Hr = class extends et {
  constructor(e, n, r, i, o) {
    super(e, n, r, i);
    m(this, "hasMissingPatterns");
    m(this, "patterns");
    m(this, "_cachedCompiledPatterns");
    this.patterns = o.patterns, this.hasMissingPatterns = o.hasMissingPatterns, this._cachedCompiledPatterns = null;
  }
  dispose() {
    this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
  }
  collectPatterns(e, n) {
    for (const r of this.patterns)
      e.getRule(r).collectPatterns(e, n);
  }
  compile(e, n) {
    return this._getCachedCompiledPatterns(e).compile(e);
  }
  compileAG(e, n, r, i) {
    return this._getCachedCompiledPatterns(e).compileAG(e, r, i);
  }
  _getCachedCompiledPatterns(e) {
    return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new Je(), this.collectPatterns(e, this._cachedCompiledPatterns)), this._cachedCompiledPatterns;
  }
}, Nn = class extends et {
  constructor(e, n, r, i, o, a, s, l, c, u) {
    super(e, n, r, i);
    m(this, "_begin");
    m(this, "beginCaptures");
    m(this, "_end");
    m(this, "endHasBackReferences");
    m(this, "endCaptures");
    m(this, "applyEndPatternLast");
    m(this, "hasMissingPatterns");
    m(this, "patterns");
    m(this, "_cachedCompiledPatterns");
    this._begin = new Ve(o, this.id), this.beginCaptures = a, this._end = new Ve(s || "￿", -1), this.endHasBackReferences = this._end.hasBackReferences, this.endCaptures = l, this.applyEndPatternLast = c || !1, this.patterns = u.patterns, this.hasMissingPatterns = u.hasMissingPatterns, this._cachedCompiledPatterns = null;
  }
  dispose() {
    this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
  }
  get debugBeginRegExp() {
    return `${this._begin.source}`;
  }
  get debugEndRegExp() {
    return `${this._end.source}`;
  }
  getEndWithResolvedBackReferences(e, n) {
    return this._end.resolveBackReferences(e, n);
  }
  collectPatterns(e, n) {
    n.push(this._begin);
  }
  compile(e, n) {
    return this._getCachedCompiledPatterns(e, n).compile(e);
  }
  compileAG(e, n, r, i) {
    return this._getCachedCompiledPatterns(e, n).compileAG(e, r, i);
  }
  _getCachedCompiledPatterns(e, n) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new Je();
      for (const r of this.patterns)
        e.getRule(r).collectPatterns(e, this._cachedCompiledPatterns);
      this.applyEndPatternLast ? this._cachedCompiledPatterns.push(this._end.hasBackReferences ? this._end.clone() : this._end) : this._cachedCompiledPatterns.unshift(this._end.hasBackReferences ? this._end.clone() : this._end);
    }
    return this._end.hasBackReferences && (this.applyEndPatternLast ? this._cachedCompiledPatterns.setSource(this._cachedCompiledPatterns.length() - 1, n) : this._cachedCompiledPatterns.setSource(0, n)), this._cachedCompiledPatterns;
  }
}, Et = class extends et {
  constructor(e, n, r, i, o, a, s, l, c) {
    super(e, n, r, i);
    m(this, "_begin");
    m(this, "beginCaptures");
    m(this, "whileCaptures");
    m(this, "_while");
    m(this, "whileHasBackReferences");
    m(this, "hasMissingPatterns");
    m(this, "patterns");
    m(this, "_cachedCompiledPatterns");
    m(this, "_cachedCompiledWhilePatterns");
    this._begin = new Ve(o, this.id), this.beginCaptures = a, this.whileCaptures = l, this._while = new Ve(s, Fo), this.whileHasBackReferences = this._while.hasBackReferences, this.patterns = c.patterns, this.hasMissingPatterns = c.hasMissingPatterns, this._cachedCompiledPatterns = null, this._cachedCompiledWhilePatterns = null;
  }
  dispose() {
    this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null), this._cachedCompiledWhilePatterns && (this._cachedCompiledWhilePatterns.dispose(), this._cachedCompiledWhilePatterns = null);
  }
  get debugBeginRegExp() {
    return `${this._begin.source}`;
  }
  get debugWhileRegExp() {
    return `${this._while.source}`;
  }
  getWhileWithResolvedBackReferences(e, n) {
    return this._while.resolveBackReferences(e, n);
  }
  collectPatterns(e, n) {
    n.push(this._begin);
  }
  compile(e, n) {
    return this._getCachedCompiledPatterns(e).compile(e);
  }
  compileAG(e, n, r, i) {
    return this._getCachedCompiledPatterns(e).compileAG(e, r, i);
  }
  _getCachedCompiledPatterns(e) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new Je();
      for (const n of this.patterns)
        e.getRule(n).collectPatterns(e, this._cachedCompiledPatterns);
    }
    return this._cachedCompiledPatterns;
  }
  compileWhile(e, n) {
    return this._getCachedCompiledWhilePatterns(e, n).compile(e);
  }
  compileWhileAG(e, n, r, i) {
    return this._getCachedCompiledWhilePatterns(e, n).compileAG(e, r, i);
  }
  _getCachedCompiledWhilePatterns(e, n) {
    return this._cachedCompiledWhilePatterns || (this._cachedCompiledWhilePatterns = new Je(), this._cachedCompiledWhilePatterns.push(this._while.hasBackReferences ? this._while.clone() : this._while)), this._while.hasBackReferences && this._cachedCompiledWhilePatterns.setSource(0, n || "￿"), this._cachedCompiledWhilePatterns;
  }
}, jo = class $ {
  static createCaptureRule(e, n, r, i, o) {
    return e.registerRule((a) => new hc(n, a, r, i, o));
  }
  static getCompiledRuleId(e, n, r) {
    return e.id || n.registerRule((i) => {
      if (e.id = i, e.match)
        return new mc(
          e.$vscodeTextmateLocation,
          e.id,
          e.name,
          e.match,
          $._compileCaptures(e.captures, n, r)
        );
      if (typeof e.begin > "u") {
        e.repository && (r = To({}, r, e.repository));
        let o = e.patterns;
        return typeof o > "u" && e.include && (o = [{ include: e.include }]), new Hr(
          e.$vscodeTextmateLocation,
          e.id,
          e.name,
          e.contentName,
          $._compilePatterns(o, n, r)
        );
      }
      return e.while ? new Et(
        e.$vscodeTextmateLocation,
        e.id,
        e.name,
        e.contentName,
        e.begin,
        $._compileCaptures(e.beginCaptures || e.captures, n, r),
        e.while,
        $._compileCaptures(e.whileCaptures || e.captures, n, r),
        $._compilePatterns(e.patterns, n, r)
      ) : new Nn(
        e.$vscodeTextmateLocation,
        e.id,
        e.name,
        e.contentName,
        e.begin,
        $._compileCaptures(e.beginCaptures || e.captures, n, r),
        e.end,
        $._compileCaptures(e.endCaptures || e.captures, n, r),
        e.applyEndPatternLast,
        $._compilePatterns(e.patterns, n, r)
      );
    }), e.id;
  }
  static _compileCaptures(e, n, r) {
    let i = [];
    if (e) {
      let o = 0;
      for (const a in e) {
        if (a === "$vscodeTextmateLocation")
          continue;
        const s = parseInt(a, 10);
        s > o && (o = s);
      }
      for (let a = 0; a <= o; a++)
        i[a] = null;
      for (const a in e) {
        if (a === "$vscodeTextmateLocation")
          continue;
        const s = parseInt(a, 10);
        let l = 0;
        e[a].patterns && (l = $.getCompiledRuleId(e[a], n, r)), i[s] = $.createCaptureRule(n, e[a].$vscodeTextmateLocation, e[a].name, e[a].contentName, l);
      }
    }
    return i;
  }
  static _compilePatterns(e, n, r) {
    let i = [];
    if (e)
      for (let o = 0, a = e.length; o < a; o++) {
        const s = e[o];
        let l = -1;
        if (s.include) {
          const c = Bo(s.include);
          switch (c.kind) {
            case 0:
            case 1:
              l = $.getCompiledRuleId(r[s.include], n, r);
              break;
            case 2:
              let u = r[c.ruleName];
              u && (l = $.getCompiledRuleId(u, n, r));
              break;
            case 3:
            case 4:
              const d = c.scopeName, f = c.kind === 4 ? c.ruleName : null, p = n.getExternalGrammar(d, r);
              if (p)
                if (f) {
                  let h = p.repository[f];
                  h && (l = $.getCompiledRuleId(h, n, p.repository));
                } else
                  l = $.getCompiledRuleId(p.repository.$self, n, p.repository);
              break;
          }
        } else
          l = $.getCompiledRuleId(s, n, r);
        if (l !== -1) {
          const c = n.getRule(l);
          let u = !1;
          if ((c instanceof Hr || c instanceof Nn || c instanceof Et) && c.hasMissingPatterns && c.patterns.length === 0 && (u = !0), u)
            continue;
          i.push(l);
        }
      }
    return {
      patterns: i,
      hasMissingPatterns: (e ? e.length : 0) !== i.length
    };
  }
}, Ve = class $o {
  constructor(e, n) {
    m(this, "source");
    m(this, "ruleId");
    m(this, "hasAnchor");
    m(this, "hasBackReferences");
    m(this, "_anchorCache");
    if (e && typeof e == "string") {
      const r = e.length;
      let i = 0, o = [], a = !1;
      for (let s = 0; s < r; s++)
        if (e.charAt(s) === "\\" && s + 1 < r) {
          const c = e.charAt(s + 1);
          c === "z" ? (o.push(e.substring(i, s)), o.push("$(?!\\n)(?<!\\n)"), i = s + 2) : (c === "A" || c === "G") && (a = !0), s++;
        }
      this.hasAnchor = a, i === 0 ? this.source = e : (o.push(e.substring(i, r)), this.source = o.join(""));
    } else
      this.hasAnchor = !1, this.source = e;
    this.hasAnchor ? this._anchorCache = this._buildAnchorCache() : this._anchorCache = null, this.ruleId = n, typeof this.source == "string" ? this.hasBackReferences = fc.test(this.source) : this.hasBackReferences = !1;
  }
  clone() {
    return new $o(this.source, this.ruleId);
  }
  setSource(e) {
    this.source !== e && (this.source = e, this.hasAnchor && (this._anchorCache = this._buildAnchorCache()));
  }
  resolveBackReferences(e, n) {
    if (typeof this.source != "string")
      throw new Error("This method should only be called if the source is a string");
    let r = n.map((i) => e.substring(i.start, i.end));
    return Gr.lastIndex = 0, this.source.replace(Gr, (i, o) => Po(r[parseInt(o, 10)] || ""));
  }
  _buildAnchorCache() {
    if (typeof this.source != "string")
      throw new Error("This method should only be called if the source is a string");
    let e = [], n = [], r = [], i = [], o, a, s, l;
    for (o = 0, a = this.source.length; o < a; o++)
      s = this.source.charAt(o), e[o] = s, n[o] = s, r[o] = s, i[o] = s, s === "\\" && o + 1 < a && (l = this.source.charAt(o + 1), l === "A" ? (e[o + 1] = "￿", n[o + 1] = "￿", r[o + 1] = "A", i[o + 1] = "A") : l === "G" ? (e[o + 1] = "￿", n[o + 1] = "G", r[o + 1] = "￿", i[o + 1] = "G") : (e[o + 1] = l, n[o + 1] = l, r[o + 1] = l, i[o + 1] = l), o++);
    return {
      A0_G0: e.join(""),
      A0_G1: n.join(""),
      A1_G0: r.join(""),
      A1_G1: i.join("")
    };
  }
  resolveAnchors(e, n) {
    return !this.hasAnchor || !this._anchorCache || typeof this.source != "string" ? this.source : e ? n ? this._anchorCache.A1_G1 : this._anchorCache.A1_G0 : n ? this._anchorCache.A0_G1 : this._anchorCache.A0_G0;
  }
}, Je = class {
  constructor() {
    m(this, "_items");
    m(this, "_hasAnchors");
    m(this, "_cached");
    m(this, "_anchorCache");
    this._items = [], this._hasAnchors = !1, this._cached = null, this._anchorCache = {
      A0_G0: null,
      A0_G1: null,
      A1_G0: null,
      A1_G1: null
    };
  }
  dispose() {
    this._disposeCaches();
  }
  _disposeCaches() {
    this._cached && (this._cached.dispose(), this._cached = null), this._anchorCache.A0_G0 && (this._anchorCache.A0_G0.dispose(), this._anchorCache.A0_G0 = null), this._anchorCache.A0_G1 && (this._anchorCache.A0_G1.dispose(), this._anchorCache.A0_G1 = null), this._anchorCache.A1_G0 && (this._anchorCache.A1_G0.dispose(), this._anchorCache.A1_G0 = null), this._anchorCache.A1_G1 && (this._anchorCache.A1_G1.dispose(), this._anchorCache.A1_G1 = null);
  }
  push(t) {
    this._items.push(t), this._hasAnchors = this._hasAnchors || t.hasAnchor;
  }
  unshift(t) {
    this._items.unshift(t), this._hasAnchors = this._hasAnchors || t.hasAnchor;
  }
  length() {
    return this._items.length;
  }
  setSource(t, e) {
    this._items[t].source !== e && (this._disposeCaches(), this._items[t].setSource(e));
  }
  compile(t) {
    if (!this._cached) {
      let e = this._items.map((n) => n.source);
      this._cached = new Ur(t, e, this._items.map((n) => n.ruleId));
    }
    return this._cached;
  }
  compileAG(t, e, n) {
    return this._hasAnchors ? e ? n ? (this._anchorCache.A1_G1 || (this._anchorCache.A1_G1 = this._resolveAnchors(t, e, n)), this._anchorCache.A1_G1) : (this._anchorCache.A1_G0 || (this._anchorCache.A1_G0 = this._resolveAnchors(t, e, n)), this._anchorCache.A1_G0) : n ? (this._anchorCache.A0_G1 || (this._anchorCache.A0_G1 = this._resolveAnchors(t, e, n)), this._anchorCache.A0_G1) : (this._anchorCache.A0_G0 || (this._anchorCache.A0_G0 = this._resolveAnchors(t, e, n)), this._anchorCache.A0_G0) : this.compile(t);
  }
  _resolveAnchors(t, e, n) {
    let r = this._items.map((i) => i.resolveAnchors(e, n));
    return new Ur(t, r, this._items.map((i) => i.ruleId));
  }
}, Ur = class {
  constructor(t, e, n) {
    m(this, "scanner");
    this.regExps = e, this.rules = n, this.scanner = t.createOnigScanner(e);
  }
  dispose() {
    typeof this.scanner.dispose == "function" && this.scanner.dispose();
  }
  toString() {
    const t = [];
    for (let e = 0, n = this.rules.length; e < n; e++)
      t.push("   - " + this.rules[e] + ": " + this.regExps[e]);
    return t.join(`
`);
  }
  findNextMatchSync(t, e, n) {
    const r = this.scanner.findNextMatchSync(t, e, n);
    return r ? {
      ruleId: this.rules[r.index],
      captureIndices: r.captureIndices
    } : null;
  }
}, tn = class {
  constructor(t, e) {
    this.languageId = t, this.tokenType = e;
  }
}, re, gc = (re = class {
  constructor(e, n) {
    m(this, "_defaultAttributes");
    m(this, "_embeddedLanguagesMatcher");
    m(this, "_getBasicScopeAttributes", new Oo((e) => {
      const n = this._scopeToLanguage(e), r = this._toStandardTokenType(e);
      return new tn(n, r);
    }));
    this._defaultAttributes = new tn(
      e,
      8
      /* NotSet */
    ), this._embeddedLanguagesMatcher = new yc(Object.entries(n || {}));
  }
  getDefaultAttributes() {
    return this._defaultAttributes;
  }
  getBasicScopeAttributes(e) {
    return e === null ? re._NULL_SCOPE_METADATA : this._getBasicScopeAttributes.get(e);
  }
  /**
   * Given a produced TM scope, return the language that token describes or null if unknown.
   * e.g. source.html => html, source.css.embedded.html => css, punctuation.definition.tag.html => null
   */
  _scopeToLanguage(e) {
    return this._embeddedLanguagesMatcher.match(e) || 0;
  }
  _toStandardTokenType(e) {
    const n = e.match(re.STANDARD_TOKEN_TYPE_REGEXP);
    if (!n)
      return 8;
    switch (n[1]) {
      case "comment":
        return 1;
      case "string":
        return 2;
      case "regex":
        return 3;
      case "meta.embedded":
        return 0;
    }
    throw new Error("Unexpected match for standard token type!");
  }
}, m(re, "_NULL_SCOPE_METADATA", new tn(0, 0)), m(re, "STANDARD_TOKEN_TYPE_REGEXP", /\b(comment|string|regex|meta\.embedded)\b/), re), yc = class {
  constructor(t) {
    m(this, "values");
    m(this, "scopesRegExp");
    if (t.length === 0)
      this.values = null, this.scopesRegExp = null;
    else {
      this.values = new Map(t);
      const e = t.map(
        ([n, r]) => Po(n)
      );
      e.sort(), e.reverse(), this.scopesRegExp = new RegExp(
        `^((${e.join(")|(")}))($|\\.)`,
        ""
      );
    }
  }
  match(t) {
    if (!this.scopesRegExp)
      return;
    const e = t.match(this.scopesRegExp);
    if (e)
      return this.values.get(e[1]);
  }
};
typeof process < "u" && process.env.VSCODE_TEXTMATE_DEBUG;
var qr = class {
  constructor(t, e) {
    this.stack = t, this.stoppedEarly = e;
  }
};
function Go(t, e, n, r, i, o, a, s) {
  const l = e.content.length;
  let c = !1, u = -1;
  if (a) {
    const p = _c(
      t,
      e,
      n,
      r,
      i,
      o
    );
    i = p.stack, r = p.linePos, n = p.isFirstLine, u = p.anchorPosition;
  }
  const d = Date.now();
  for (; !c; ) {
    if (s !== 0 && Date.now() - d > s)
      return new qr(i, !0);
    f();
  }
  return new qr(i, !1);
  function f() {
    const p = bc(
      t,
      e,
      n,
      r,
      i,
      u
    );
    if (!p) {
      o.produce(i, l), c = !0;
      return;
    }
    const h = p.captureIndices, C = p.matchedRuleId, g = h && h.length > 0 ? h[0].end > r : !1;
    if (C === pc) {
      const y = i.getRule(t);
      o.produce(i, h[0].start), i = i.withContentNameScopesList(i.nameScopesList), He(
        t,
        e,
        n,
        i,
        o,
        y.endCaptures,
        h
      ), o.produce(i, h[0].end);
      const _ = i;
      if (i = i.parent, u = _.getAnchorPos(), !g && _.getEnterPos() === r) {
        i = _, o.produce(i, l), c = !0;
        return;
      }
    } else {
      const y = t.getRule(C);
      o.produce(i, h[0].start);
      const _ = i, w = y.getName(e.content, h), A = i.contentNameScopesList.pushAttributed(
        w,
        t
      );
      if (i = i.push(
        C,
        r,
        u,
        h[0].end === l,
        null,
        A,
        A
      ), y instanceof Nn) {
        const x = y;
        He(
          t,
          e,
          n,
          i,
          o,
          x.beginCaptures,
          h
        ), o.produce(i, h[0].end), u = h[0].end;
        const v = x.getContentName(
          e.content,
          h
        ), S = A.pushAttributed(
          v,
          t
        );
        if (i = i.withContentNameScopesList(S), x.endHasBackReferences && (i = i.withEndRule(
          x.getEndWithResolvedBackReferences(
            e.content,
            h
          )
        )), !g && _.hasSameRuleAs(i)) {
          i = i.pop(), o.produce(i, l), c = !0;
          return;
        }
      } else if (y instanceof Et) {
        const x = y;
        He(
          t,
          e,
          n,
          i,
          o,
          x.beginCaptures,
          h
        ), o.produce(i, h[0].end), u = h[0].end;
        const v = x.getContentName(
          e.content,
          h
        ), S = A.pushAttributed(
          v,
          t
        );
        if (i = i.withContentNameScopesList(S), x.whileHasBackReferences && (i = i.withEndRule(
          x.getWhileWithResolvedBackReferences(
            e.content,
            h
          )
        )), !g && _.hasSameRuleAs(i)) {
          i = i.pop(), o.produce(i, l), c = !0;
          return;
        }
      } else if (He(
        t,
        e,
        n,
        i,
        o,
        y.captures,
        h
      ), o.produce(i, h[0].end), i = i.pop(), !g) {
        i = i.safePop(), o.produce(i, l), c = !0;
        return;
      }
    }
    h[0].end > r && (r = h[0].end, n = !1);
  }
}
function _c(t, e, n, r, i, o) {
  let a = i.beginRuleCapturedEOL ? 0 : -1;
  const s = [];
  for (let l = i; l; l = l.pop()) {
    const c = l.getRule(t);
    c instanceof Et && s.push({
      rule: c,
      stack: l
    });
  }
  for (let l = s.pop(); l; l = s.pop()) {
    const { ruleScanner: c, findOptions: u } = wc(l.rule, t, l.stack.endRule, n, r === a), d = c.findNextMatchSync(e, r, u);
    if (d) {
      if (d.ruleId !== Fo) {
        i = l.stack.pop();
        break;
      }
      d.captureIndices && d.captureIndices.length && (o.produce(l.stack, d.captureIndices[0].start), He(t, e, n, l.stack, o, l.rule.whileCaptures, d.captureIndices), o.produce(l.stack, d.captureIndices[0].end), a = d.captureIndices[0].end, d.captureIndices[0].end > r && (r = d.captureIndices[0].end, n = !1));
    } else {
      i = l.stack.pop();
      break;
    }
  }
  return { stack: i, linePos: r, anchorPosition: a, isFirstLine: n };
}
function bc(t, e, n, r, i, o) {
  const a = vc(t, e, n, r, i, o), s = t.getInjections();
  if (s.length === 0)
    return a;
  const l = Sc(s, t, e, n, r, i, o);
  if (!l)
    return a;
  if (!a)
    return l;
  const c = a.captureIndices[0].start, u = l.captureIndices[0].start;
  return u < c || l.priorityMatch && u === c ? l : a;
}
function vc(t, e, n, r, i, o) {
  const a = i.getRule(t), { ruleScanner: s, findOptions: l } = Ho(a, t, i.endRule, n, r === o), c = s.findNextMatchSync(e, r, l);
  return c ? {
    captureIndices: c.captureIndices,
    matchedRuleId: c.ruleId
  } : null;
}
function Sc(t, e, n, r, i, o, a) {
  let s = Number.MAX_VALUE, l = null, c, u = 0;
  const d = o.contentNameScopesList.getScopeNames();
  for (let f = 0, p = t.length; f < p; f++) {
    const h = t[f];
    if (!h.matcher(d))
      continue;
    const C = e.getRule(h.ruleId), { ruleScanner: g, findOptions: y } = Ho(C, e, null, r, i === a), _ = g.findNextMatchSync(n, i, y);
    if (!_)
      continue;
    const w = _.captureIndices[0].start;
    if (!(w >= s) && (s = w, l = _.captureIndices, c = _.ruleId, u = h.priority, s === i))
      break;
  }
  return l ? {
    priorityMatch: u === -1,
    captureIndices: l,
    matchedRuleId: c
  } : null;
}
function Ho(t, e, n, r, i) {
  return {
    ruleScanner: t.compileAG(e, n, r, i),
    findOptions: 0
    /* None */
  };
}
function wc(t, e, n, r, i) {
  return {
    ruleScanner: t.compileWhileAG(e, n, r, i),
    findOptions: 0
    /* None */
  };
}
function He(t, e, n, r, i, o, a) {
  if (o.length === 0)
    return;
  const s = e.content, l = Math.min(o.length, a.length), c = [], u = a[0].end;
  for (let d = 0; d < l; d++) {
    const f = o[d];
    if (f === null)
      continue;
    const p = a[d];
    if (p.length === 0)
      continue;
    if (p.start > u)
      break;
    for (; c.length > 0 && c[c.length - 1].endPos <= p.start; )
      i.produceFromScopes(c[c.length - 1].scopes, c[c.length - 1].endPos), c.pop();
    if (c.length > 0 ? i.produceFromScopes(c[c.length - 1].scopes, p.start) : i.produce(r, p.start), f.retokenizeCapturedWithRuleId) {
      const C = f.getName(s, a), g = r.contentNameScopesList.pushAttributed(C, t), y = f.getContentName(s, a), _ = g.pushAttributed(y, t), w = r.push(f.retokenizeCapturedWithRuleId, p.start, -1, !1, null, g, _), A = t.createOnigString(s.substring(0, p.end));
      Go(
        t,
        A,
        n && p.start === 0,
        p.start,
        w,
        i,
        !1,
        /* no time limit */
        0
      ), Do(A);
      continue;
    }
    const h = f.getName(s, a);
    if (h !== null) {
      const g = (c.length > 0 ? c[c.length - 1].scopes : r.contentNameScopesList).pushAttributed(h, t);
      c.push(new Cc(g, p.end));
    }
  }
  for (; c.length > 0; )
    i.produceFromScopes(c[c.length - 1].scopes, c[c.length - 1].endPos), c.pop();
}
var Cc = class {
  constructor(t, e) {
    m(this, "scopes");
    m(this, "endPos");
    this.scopes = t, this.endPos = e;
  }
};
function xc(t, e, n, r, i, o, a, s) {
  return new Ac(
    t,
    e,
    n,
    r,
    i,
    o,
    a,
    s
  );
}
function Wr(t, e, n, r, i) {
  const o = kt(e, Tt), a = jo.getCompiledRuleId(n, r, i.repository);
  for (const s of o)
    t.push({
      debugSelector: e,
      matcher: s.matcher,
      ruleId: a,
      grammar: i,
      priority: s.priority
    });
}
function Tt(t, e) {
  if (e.length < t.length)
    return !1;
  let n = 0;
  return t.every((r) => {
    for (let i = n; i < e.length; i++)
      if (kc(e[i], r))
        return n = i + 1, !0;
    return !1;
  });
}
function kc(t, e) {
  if (!t)
    return !1;
  if (t === e)
    return !0;
  const n = e.length;
  return t.length > n && t.substr(0, n) === e && t[n] === ".";
}
var Ac = class {
  constructor(t, e, n, r, i, o, a, s) {
    m(this, "_rootId");
    m(this, "_lastRuleId");
    m(this, "_ruleId2desc");
    m(this, "_includedGrammars");
    m(this, "_grammarRepository");
    m(this, "_grammar");
    m(this, "_injections");
    m(this, "_basicScopeAttributesProvider");
    m(this, "_tokenTypeMatchers");
    if (this._rootScopeName = t, this.balancedBracketSelectors = o, this._onigLib = s, this._basicScopeAttributesProvider = new gc(
      n,
      r
    ), this._rootId = -1, this._lastRuleId = 0, this._ruleId2desc = [null], this._includedGrammars = {}, this._grammarRepository = a, this._grammar = zr(e, null), this._injections = null, this._tokenTypeMatchers = [], i)
      for (const l of Object.keys(i)) {
        const c = kt(l, Tt);
        for (const u of c)
          this._tokenTypeMatchers.push({
            matcher: u.matcher,
            type: i[l]
          });
      }
  }
  get themeProvider() {
    return this._grammarRepository;
  }
  dispose() {
    for (const t of this._ruleId2desc)
      t && t.dispose();
  }
  createOnigScanner(t) {
    return this._onigLib.createOnigScanner(t);
  }
  createOnigString(t) {
    return this._onigLib.createOnigString(t);
  }
  getMetadataForScope(t) {
    return this._basicScopeAttributesProvider.getBasicScopeAttributes(t);
  }
  _collectInjections() {
    const t = {
      lookup: (i) => i === this._rootScopeName ? this._grammar : this.getExternalGrammar(i),
      injections: (i) => this._grammarRepository.injections(i)
    }, e = [], n = this._rootScopeName, r = t.lookup(n);
    if (r) {
      const i = r.injections;
      if (i)
        for (let a in i)
          Wr(
            e,
            a,
            i[a],
            this,
            r
          );
      const o = this._grammarRepository.injections(n);
      o && o.forEach((a) => {
        const s = this.getExternalGrammar(a);
        if (s) {
          const l = s.injectionSelector;
          l && Wr(
            e,
            l,
            s,
            this,
            s
          );
        }
      });
    }
    return e.sort((i, o) => i.priority - o.priority), e;
  }
  getInjections() {
    return this._injections === null && (this._injections = this._collectInjections()), this._injections;
  }
  registerRule(t) {
    const e = ++this._lastRuleId, n = t(e);
    return this._ruleId2desc[e] = n, n;
  }
  getRule(t) {
    return this._ruleId2desc[t];
  }
  getExternalGrammar(t, e) {
    if (this._includedGrammars[t])
      return this._includedGrammars[t];
    if (this._grammarRepository) {
      const n = this._grammarRepository.lookup(t);
      if (n)
        return this._includedGrammars[t] = zr(
          n,
          e && e.$base
        ), this._includedGrammars[t];
    }
  }
  tokenizeLine(t, e, n = 0) {
    const r = this._tokenize(t, e, !1, n);
    return {
      tokens: r.lineTokens.getResult(r.ruleStack, r.lineLength),
      ruleStack: r.ruleStack,
      stoppedEarly: r.stoppedEarly
    };
  }
  tokenizeLine2(t, e, n = 0) {
    const r = this._tokenize(t, e, !0, n);
    return {
      tokens: r.lineTokens.getBinaryResult(r.ruleStack, r.lineLength),
      ruleStack: r.ruleStack,
      stoppedEarly: r.stoppedEarly
    };
  }
  _tokenize(t, e, n, r) {
    this._rootId === -1 && (this._rootId = jo.getCompiledRuleId(
      this._grammar.repository.$self,
      this,
      this._grammar.repository
    ), this.getInjections());
    let i;
    if (!e || e === Ln.NULL) {
      i = !0;
      const c = this._basicScopeAttributesProvider.getDefaultAttributes(), u = this.themeProvider.getDefaults(), d = Ee.set(
        0,
        c.languageId,
        c.tokenType,
        null,
        u.fontStyle,
        u.foregroundId,
        u.backgroundId
      ), f = this.getRule(this._rootId).getName(
        null,
        null
      );
      let p;
      f ? p = We.createRootAndLookUpScopeName(
        f,
        d,
        this
      ) : p = We.createRoot(
        "unknown",
        d
      ), e = new Ln(
        null,
        this._rootId,
        -1,
        -1,
        !1,
        null,
        p,
        p
      );
    } else
      i = !1, e.reset();
    t = t + `
`;
    const o = this.createOnigString(t), a = o.content.length, s = new Tc(
      n,
      t,
      this._tokenTypeMatchers,
      this.balancedBracketSelectors
    ), l = Go(
      this,
      o,
      i,
      0,
      e,
      s,
      !0,
      r
    );
    return Do(o), {
      lineLength: a,
      lineTokens: s,
      ruleStack: l.stack,
      stoppedEarly: l.stoppedEarly
    };
  }
};
function zr(t, e) {
  return t = Wl(t), t.repository = t.repository || {}, t.repository.$self = {
    $vscodeTextmateLocation: t.$vscodeTextmateLocation,
    patterns: t.patterns,
    name: t.scopeName
  }, t.repository.$base = e || t.repository.$self, t;
}
var We = class Z {
  /**
   * Invariant:
   * ```
   * if (parent && !scopePath.extends(parent.scopePath)) {
   * 	throw new Error();
   * }
   * ```
   */
  constructor(e, n, r) {
    this.parent = e, this.scopePath = n, this.tokenAttributes = r;
  }
  static fromExtension(e, n) {
    let r = e, i = (e == null ? void 0 : e.scopePath) ?? null;
    for (const o of n)
      i = en.push(i, o.scopeNames), r = new Z(r, i, o.encodedTokenAttributes);
    return r;
  }
  static createRoot(e, n) {
    return new Z(null, new en(null, e), n);
  }
  static createRootAndLookUpScopeName(e, n, r) {
    const i = r.getMetadataForScope(e), o = new en(null, e), a = r.themeProvider.themeMatch(o), s = Z.mergeAttributes(
      n,
      i,
      a
    );
    return new Z(null, o, s);
  }
  get scopeName() {
    return this.scopePath.scopeName;
  }
  toString() {
    return this.getScopeNames().join(" ");
  }
  equals(e) {
    return Z.equals(this, e);
  }
  static equals(e, n) {
    do {
      if (e === n || !e && !n)
        return !0;
      if (!e || !n || e.scopeName !== n.scopeName || e.tokenAttributes !== n.tokenAttributes)
        return !1;
      e = e.parent, n = n.parent;
    } while (!0);
  }
  static mergeAttributes(e, n, r) {
    let i = -1, o = 0, a = 0;
    return r !== null && (i = r.fontStyle, o = r.foregroundId, a = r.backgroundId), Ee.set(
      e,
      n.languageId,
      n.tokenType,
      null,
      i,
      o,
      a
    );
  }
  pushAttributed(e, n) {
    if (e === null)
      return this;
    if (e.indexOf(" ") === -1)
      return Z._pushAttributed(this, e, n);
    const r = e.split(/ /g);
    let i = this;
    for (const o of r)
      i = Z._pushAttributed(i, o, n);
    return i;
  }
  static _pushAttributed(e, n, r) {
    const i = r.getMetadataForScope(n), o = e.scopePath.push(n), a = r.themeProvider.themeMatch(o), s = Z.mergeAttributes(
      e.tokenAttributes,
      i,
      a
    );
    return new Z(e, o, s);
  }
  getScopeNames() {
    return this.scopePath.getSegments();
  }
  getExtensionIfDefined(e) {
    var i;
    const n = [];
    let r = this;
    for (; r && r !== e; )
      n.push({
        encodedTokenAttributes: r.tokenAttributes,
        scopeNames: r.scopePath.getExtensionIfDefined(((i = r.parent) == null ? void 0 : i.scopePath) ?? null)
      }), r = r.parent;
    return r === e ? n.reverse() : void 0;
  }
}, V, Ln = (V = class {
  /**
   * Invariant:
   * ```
   * if (contentNameScopesList !== nameScopesList && contentNameScopesList?.parent !== nameScopesList) {
   * 	throw new Error();
   * }
   * if (this.parent && !nameScopesList.extends(this.parent.contentNameScopesList)) {
   * 	throw new Error();
   * }
   * ```
   */
  constructor(e, n, r, i, o, a, s, l) {
    m(this, "_stackElementBrand");
    /**
     * The position on the current line where this state was pushed.
     * This is relevant only while tokenizing a line, to detect endless loops.
     * Its value is meaningless across lines.
     */
    m(this, "_enterPos");
    /**
     * The captured anchor position when this stack element was pushed.
     * This is relevant only while tokenizing a line, to restore the anchor position when popping.
     * Its value is meaningless across lines.
     */
    m(this, "_anchorPos");
    /**
     * The depth of the stack.
     */
    m(this, "depth");
    this.parent = e, this.ruleId = n, this.beginRuleCapturedEOL = o, this.endRule = a, this.nameScopesList = s, this.contentNameScopesList = l, this.depth = this.parent ? this.parent.depth + 1 : 1, this._enterPos = r, this._anchorPos = i;
  }
  equals(e) {
    return e === null ? !1 : V._equals(this, e);
  }
  static _equals(e, n) {
    return e === n ? !0 : this._structuralEquals(e, n) ? We.equals(e.contentNameScopesList, n.contentNameScopesList) : !1;
  }
  /**
   * A structural equals check. Does not take into account `scopes`.
   */
  static _structuralEquals(e, n) {
    do {
      if (e === n || !e && !n)
        return !0;
      if (!e || !n || e.depth !== n.depth || e.ruleId !== n.ruleId || e.endRule !== n.endRule)
        return !1;
      e = e.parent, n = n.parent;
    } while (!0);
  }
  clone() {
    return this;
  }
  static _reset(e) {
    for (; e; )
      e._enterPos = -1, e._anchorPos = -1, e = e.parent;
  }
  reset() {
    V._reset(this);
  }
  pop() {
    return this.parent;
  }
  safePop() {
    return this.parent ? this.parent : this;
  }
  push(e, n, r, i, o, a, s) {
    return new V(
      this,
      e,
      n,
      r,
      i,
      o,
      a,
      s
    );
  }
  getEnterPos() {
    return this._enterPos;
  }
  getAnchorPos() {
    return this._anchorPos;
  }
  getRule(e) {
    return e.getRule(this.ruleId);
  }
  toString() {
    const e = [];
    return this._writeString(e, 0), "[" + e.join(",") + "]";
  }
  _writeString(e, n) {
    var r, i;
    return this.parent && (n = this.parent._writeString(e, n)), e[n++] = `(${this.ruleId}, ${(r = this.nameScopesList) == null ? void 0 : r.toString()}, ${(i = this.contentNameScopesList) == null ? void 0 : i.toString()})`, n;
  }
  withContentNameScopesList(e) {
    return this.contentNameScopesList === e ? this : this.parent.push(
      this.ruleId,
      this._enterPos,
      this._anchorPos,
      this.beginRuleCapturedEOL,
      this.endRule,
      this.nameScopesList,
      e
    );
  }
  withEndRule(e) {
    return this.endRule === e ? this : new V(
      this.parent,
      this.ruleId,
      this._enterPos,
      this._anchorPos,
      this.beginRuleCapturedEOL,
      e,
      this.nameScopesList,
      this.contentNameScopesList
    );
  }
  // Used to warn of endless loops
  hasSameRuleAs(e) {
    let n = this;
    for (; n && n._enterPos === e._enterPos; ) {
      if (n.ruleId === e.ruleId)
        return !0;
      n = n.parent;
    }
    return !1;
  }
  toStateStackFrame() {
    var e, n, r;
    return {
      ruleId: this.ruleId,
      beginRuleCapturedEOL: this.beginRuleCapturedEOL,
      endRule: this.endRule,
      nameScopesList: ((n = this.nameScopesList) == null ? void 0 : n.getExtensionIfDefined(((e = this.parent) == null ? void 0 : e.nameScopesList) ?? null)) ?? [],
      contentNameScopesList: ((r = this.contentNameScopesList) == null ? void 0 : r.getExtensionIfDefined(this.nameScopesList)) ?? []
    };
  }
  static pushFrame(e, n) {
    const r = We.fromExtension((e == null ? void 0 : e.nameScopesList) ?? null, n.nameScopesList);
    return new V(
      e,
      n.ruleId,
      n.enterPos ?? -1,
      n.anchorPos ?? -1,
      n.beginRuleCapturedEOL,
      n.endRule,
      r,
      We.fromExtension(r, n.contentNameScopesList)
    );
  }
}, // TODO remove me
m(V, "NULL", new V(
  null,
  0,
  0,
  0,
  !1,
  null,
  null,
  null
)), V), Ec = class {
  constructor(t, e) {
    m(this, "balancedBracketScopes");
    m(this, "unbalancedBracketScopes");
    m(this, "allowAny", !1);
    this.balancedBracketScopes = t.flatMap(
      (n) => n === "*" ? (this.allowAny = !0, []) : kt(n, Tt).map((r) => r.matcher)
    ), this.unbalancedBracketScopes = e.flatMap(
      (n) => kt(n, Tt).map((r) => r.matcher)
    );
  }
  get matchesAlways() {
    return this.allowAny && this.unbalancedBracketScopes.length === 0;
  }
  get matchesNever() {
    return this.balancedBracketScopes.length === 0 && !this.allowAny;
  }
  match(t) {
    for (const e of this.unbalancedBracketScopes)
      if (e(t))
        return !1;
    for (const e of this.balancedBracketScopes)
      if (e(t))
        return !0;
    return this.allowAny;
  }
}, Tc = class {
  constructor(t, e, n, r) {
    m(this, "_emitBinaryTokens");
    /**
     * defined only if `false`.
     */
    m(this, "_lineText");
    /**
     * used only if `_emitBinaryTokens` is false.
     */
    m(this, "_tokens");
    /**
     * used only if `_emitBinaryTokens` is true.
     */
    m(this, "_binaryTokens");
    m(this, "_lastTokenEndIndex");
    m(this, "_tokenTypeOverrides");
    this.balancedBracketSelectors = r, this._emitBinaryTokens = t, this._tokenTypeOverrides = n, this._lineText = null, this._tokens = [], this._binaryTokens = [], this._lastTokenEndIndex = 0;
  }
  produce(t, e) {
    this.produceFromScopes(t.contentNameScopesList, e);
  }
  produceFromScopes(t, e) {
    var r;
    if (this._lastTokenEndIndex >= e)
      return;
    if (this._emitBinaryTokens) {
      let i = (t == null ? void 0 : t.tokenAttributes) ?? 0, o = !1;
      if ((r = this.balancedBracketSelectors) != null && r.matchesAlways && (o = !0), this._tokenTypeOverrides.length > 0 || this.balancedBracketSelectors && !this.balancedBracketSelectors.matchesAlways && !this.balancedBracketSelectors.matchesNever) {
        const a = (t == null ? void 0 : t.getScopeNames()) ?? [];
        for (const s of this._tokenTypeOverrides)
          s.matcher(a) && (i = Ee.set(
            i,
            0,
            s.type,
            null,
            -1,
            0,
            0
          ));
        this.balancedBracketSelectors && (o = this.balancedBracketSelectors.match(a));
      }
      if (o && (i = Ee.set(
        i,
        0,
        8,
        o,
        -1,
        0,
        0
      )), this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 1] === i) {
        this._lastTokenEndIndex = e;
        return;
      }
      this._binaryTokens.push(this._lastTokenEndIndex), this._binaryTokens.push(i), this._lastTokenEndIndex = e;
      return;
    }
    const n = (t == null ? void 0 : t.getScopeNames()) ?? [];
    this._tokens.push({
      startIndex: this._lastTokenEndIndex,
      endIndex: e,
      // value: lineText.substring(lastTokenEndIndex, endIndex),
      scopes: n
    }), this._lastTokenEndIndex = e;
  }
  getResult(t, e) {
    return this._tokens.length > 0 && this._tokens[this._tokens.length - 1].startIndex === e - 1 && this._tokens.pop(), this._tokens.length === 0 && (this._lastTokenEndIndex = -1, this.produce(t, e), this._tokens[this._tokens.length - 1].startIndex = 0), this._tokens;
  }
  getBinaryResult(t, e) {
    this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 2] === e - 1 && (this._binaryTokens.pop(), this._binaryTokens.pop()), this._binaryTokens.length === 0 && (this._lastTokenEndIndex = -1, this.produce(t, e), this._binaryTokens[this._binaryTokens.length - 2] = 0);
    const n = new Uint32Array(this._binaryTokens.length);
    for (let r = 0, i = this._binaryTokens.length; r < i; r++)
      n[r] = this._binaryTokens[r];
    return n;
  }
}, Rc = class {
  constructor(t, e) {
    m(this, "_grammars", /* @__PURE__ */ new Map());
    m(this, "_rawGrammars", /* @__PURE__ */ new Map());
    m(this, "_injectionGrammars", /* @__PURE__ */ new Map());
    m(this, "_theme");
    this._onigLib = e, this._theme = t;
  }
  dispose() {
    for (const t of this._grammars.values())
      t.dispose();
  }
  setTheme(t) {
    this._theme = t;
  }
  getColorMap() {
    return this._theme.getColorMap();
  }
  /**
   * Add `grammar` to registry and return a list of referenced scope names
   */
  addGrammar(t, e) {
    this._rawGrammars.set(t.scopeName, t), e && this._injectionGrammars.set(t.scopeName, e);
  }
  /**
   * Lookup a raw grammar.
   */
  lookup(t) {
    return this._rawGrammars.get(t);
  }
  /**
   * Returns the injections for the given grammar
   */
  injections(t) {
    return this._injectionGrammars.get(t);
  }
  /**
   * Get the default theme settings
   */
  getDefaults() {
    return this._theme.getDefaults();
  }
  /**
   * Match a scope in the theme.
   */
  themeMatch(t) {
    return this._theme.match(t);
  }
  /**
   * Lookup a grammar.
   */
  grammarForScopeName(t, e, n, r, i) {
    if (!this._grammars.has(t)) {
      let o = this._rawGrammars.get(t);
      if (!o)
        return null;
      this._grammars.set(t, xc(
        t,
        o,
        e,
        n,
        r,
        i,
        this,
        this._onigLib
      ));
    }
    return this._grammars.get(t);
  }
}, Nc = class {
  constructor(e) {
    m(this, "_options");
    m(this, "_syncRegistry");
    m(this, "_ensureGrammarCache");
    this._options = e, this._syncRegistry = new Rc(
      xt.createFromRawTheme(e.theme, e.colorMap),
      e.onigLib
    ), this._ensureGrammarCache = /* @__PURE__ */ new Map();
  }
  dispose() {
    this._syncRegistry.dispose();
  }
  /**
   * Change the theme. Once called, no previous `ruleStack` should be used anymore.
   */
  setTheme(e, n) {
    this._syncRegistry.setTheme(xt.createFromRawTheme(e, n));
  }
  /**
   * Returns a lookup array for color ids.
   */
  getColorMap() {
    return this._syncRegistry.getColorMap();
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   * Please do not use language id 0.
   */
  loadGrammarWithEmbeddedLanguages(e, n, r) {
    return this.loadGrammarWithConfiguration(e, n, { embeddedLanguages: r });
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   * Please do not use language id 0.
   */
  loadGrammarWithConfiguration(e, n, r) {
    return this._loadGrammar(
      e,
      n,
      r.embeddedLanguages,
      r.tokenTypes,
      new Ec(
        r.balancedBracketSelectors || [],
        r.unbalancedBracketSelectors || []
      )
    );
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   */
  loadGrammar(e) {
    return this._loadGrammar(e, 0, null, null, null);
  }
  _loadGrammar(e, n, r, i, o) {
    const a = new oc(this._syncRegistry, e);
    for (; a.Q.length > 0; )
      a.Q.map((s) => this._loadSingleGrammar(s.scopeName)), a.processQueue();
    return this._grammarForScopeName(
      e,
      n,
      r,
      i,
      o
    );
  }
  _loadSingleGrammar(e) {
    this._ensureGrammarCache.has(e) || (this._doLoadSingleGrammar(e), this._ensureGrammarCache.set(e, !0));
  }
  _doLoadSingleGrammar(e) {
    const n = this._options.loadGrammar(e);
    if (n) {
      const r = typeof this._options.getInjections == "function" ? this._options.getInjections(e) : void 0;
      this._syncRegistry.addGrammar(n, r);
    }
  }
  /**
   * Adds a rawGrammar.
   */
  addGrammar(e, n = [], r = 0, i = null) {
    return this._syncRegistry.addGrammar(e, n), this._grammarForScopeName(e.scopeName, r, i);
  }
  /**
   * Get the grammar for `scopeName`. The grammar must first be created via `loadGrammar` or `addGrammar`.
   */
  _grammarForScopeName(e, n = 0, r = null, i = null, o = null) {
    return this._syncRegistry.grammarForScopeName(
      e,
      n,
      r,
      i,
      o
    );
  }
}, Pn = Ln.NULL;
const Lc = [
  "area",
  "base",
  "basefont",
  "bgsound",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "image",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
class tt {
  /**
   * @param {SchemaType['property']} property
   *   Property.
   * @param {SchemaType['normal']} normal
   *   Normal.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Schema.
   */
  constructor(e, n, r) {
    this.normal = n, this.property = e, r && (this.space = r);
  }
}
tt.prototype.normal = {};
tt.prototype.property = {};
tt.prototype.space = void 0;
function Uo(t, e) {
  const n = {}, r = {};
  for (const i of t)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new tt(n, r, e);
}
function On(t) {
  return t.toLowerCase();
}
class q {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(e, n) {
    this.attribute = n, this.property = e;
  }
}
q.prototype.attribute = "";
q.prototype.booleanish = !1;
q.prototype.boolean = !1;
q.prototype.commaOrSpaceSeparated = !1;
q.prototype.commaSeparated = !1;
q.prototype.defined = !1;
q.prototype.mustUseProperty = !1;
q.prototype.number = !1;
q.prototype.overloadedBoolean = !1;
q.prototype.property = "";
q.prototype.spaceSeparated = !1;
q.prototype.space = void 0;
let Pc = 0;
const E = Se(), O = Se(), In = Se(), b = Se(), N = Se(), Ce = Se(), W = Se();
function Se() {
  return 2 ** ++Pc;
}
const Mn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: E,
  booleanish: O,
  commaOrSpaceSeparated: W,
  commaSeparated: Ce,
  number: b,
  overloadedBoolean: In,
  spaceSeparated: N
}, Symbol.toStringTag, { value: "Module" })), nn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Mn)
);
class ar extends q {
  /**
   * @constructor
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @param {number | null | undefined} [mask]
   *   Mask.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Info.
   */
  constructor(e, n, r, i) {
    let o = -1;
    if (super(e, n), Kr(this, "space", i), typeof r == "number")
      for (; ++o < nn.length; ) {
        const a = nn[o];
        Kr(this, nn[o], (r & Mn[a]) === Mn[a]);
      }
  }
}
ar.prototype.defined = !0;
function Kr(t, e, n) {
  n && (t[e] = n);
}
function Oe(t) {
  const e = {}, n = {};
  for (const [r, i] of Object.entries(t.properties)) {
    const o = new ar(
      r,
      t.transform(t.attributes || {}, r),
      i,
      t.space
    );
    t.mustUseProperty && t.mustUseProperty.includes(r) && (o.mustUseProperty = !0), e[r] = o, n[On(r)] = r, n[On(o.attribute)] = r;
  }
  return new tt(e, n, t.space);
}
const qo = Oe({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: O,
    ariaAutoComplete: null,
    ariaBusy: O,
    ariaChecked: O,
    ariaColCount: b,
    ariaColIndex: b,
    ariaColSpan: b,
    ariaControls: N,
    ariaCurrent: null,
    ariaDescribedBy: N,
    ariaDetails: null,
    ariaDisabled: O,
    ariaDropEffect: N,
    ariaErrorMessage: null,
    ariaExpanded: O,
    ariaFlowTo: N,
    ariaGrabbed: O,
    ariaHasPopup: null,
    ariaHidden: O,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: N,
    ariaLevel: b,
    ariaLive: null,
    ariaModal: O,
    ariaMultiLine: O,
    ariaMultiSelectable: O,
    ariaOrientation: null,
    ariaOwns: N,
    ariaPlaceholder: null,
    ariaPosInSet: b,
    ariaPressed: O,
    ariaReadOnly: O,
    ariaRelevant: null,
    ariaRequired: O,
    ariaRoleDescription: N,
    ariaRowCount: b,
    ariaRowIndex: b,
    ariaRowSpan: b,
    ariaSelected: O,
    ariaSetSize: b,
    ariaSort: null,
    ariaValueMax: b,
    ariaValueMin: b,
    ariaValueNow: b,
    ariaValueText: null,
    role: null
  },
  transform(t, e) {
    return e === "role" ? e : "aria-" + e.slice(4).toLowerCase();
  }
});
function Wo(t, e) {
  return e in t ? t[e] : e;
}
function zo(t, e) {
  return Wo(t, e.toLowerCase());
}
const Oc = Oe({
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: Ce,
    acceptCharset: N,
    accessKey: N,
    action: null,
    allow: null,
    allowFullScreen: E,
    allowPaymentRequest: E,
    allowUserMedia: E,
    alt: null,
    as: null,
    async: E,
    autoCapitalize: null,
    autoComplete: N,
    autoFocus: E,
    autoPlay: E,
    blocking: N,
    capture: null,
    charSet: null,
    checked: E,
    cite: null,
    className: N,
    cols: b,
    colSpan: null,
    content: null,
    contentEditable: O,
    controls: E,
    controlsList: N,
    coords: b | Ce,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: E,
    defer: E,
    dir: null,
    dirName: null,
    disabled: E,
    download: In,
    draggable: O,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: E,
    formTarget: null,
    headers: N,
    height: b,
    hidden: In,
    high: b,
    href: null,
    hrefLang: null,
    htmlFor: N,
    httpEquiv: N,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: E,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: E,
    itemId: null,
    itemProp: N,
    itemRef: N,
    itemScope: E,
    itemType: N,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: E,
    low: b,
    manifest: null,
    max: null,
    maxLength: b,
    media: null,
    method: null,
    min: null,
    minLength: b,
    multiple: E,
    muted: E,
    name: null,
    nonce: null,
    noModule: E,
    noValidate: E,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: E,
    optimum: b,
    pattern: null,
    ping: N,
    placeholder: null,
    playsInline: E,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: E,
    referrerPolicy: null,
    rel: N,
    required: E,
    reversed: E,
    rows: b,
    rowSpan: b,
    sandbox: N,
    scope: null,
    scoped: E,
    seamless: E,
    selected: E,
    shadowRootClonable: E,
    shadowRootDelegatesFocus: E,
    shadowRootMode: null,
    shape: null,
    size: b,
    sizes: null,
    slot: null,
    span: b,
    spellCheck: O,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: b,
    step: null,
    style: null,
    tabIndex: b,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: E,
    useMap: null,
    value: O,
    width: b,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: N,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: b,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: b,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: E,
    // Lists. Use CSS to reduce space between items instead
    declare: E,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: b,
    // `<img>` and `<object>`
    leftMargin: b,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: b,
    // `<body>`
    marginWidth: b,
    // `<body>`
    noResize: E,
    // `<frame>`
    noHref: E,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: E,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: E,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: b,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: O,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: b,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: b,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: E,
    disableRemotePlayback: E,
    prefix: null,
    property: null,
    results: b,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: zo
}), Ic = Oe({
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  properties: {
    about: W,
    accentHeight: b,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: b,
    amplitude: b,
    arabicForm: null,
    ascent: b,
    attributeName: null,
    attributeType: null,
    azimuth: b,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: b,
    by: null,
    calcMode: null,
    capHeight: b,
    className: N,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: b,
    diffuseConstant: b,
    direction: null,
    display: null,
    dur: null,
    divisor: b,
    dominantBaseline: null,
    download: E,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: b,
    enableBackground: null,
    end: null,
    event: null,
    exponent: b,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: b,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: Ce,
    g2: Ce,
    glyphName: Ce,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: b,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: b,
    horizOriginX: b,
    horizOriginY: b,
    id: null,
    ideographic: b,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: b,
    k: b,
    k1: b,
    k2: b,
    k3: b,
    k4: b,
    kernelMatrix: W,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: b,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: b,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: b,
    overlineThickness: b,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: b,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: N,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: b,
    pointsAtY: b,
    pointsAtZ: b,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: W,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: W,
    rev: W,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: W,
    requiredFeatures: W,
    requiredFonts: W,
    requiredFormats: W,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: b,
    specularExponent: b,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: b,
    strikethroughThickness: b,
    string: null,
    stroke: null,
    strokeDashArray: W,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: b,
    strokeOpacity: b,
    strokeWidth: null,
    style: null,
    surfaceScale: b,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: W,
    tabIndex: b,
    tableValues: null,
    target: null,
    targetX: b,
    targetY: b,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: W,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: b,
    underlineThickness: b,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: b,
    values: null,
    vAlphabetic: b,
    vMathematical: b,
    vectorEffect: null,
    vHanging: b,
    vIdeographic: b,
    version: null,
    vertAdvY: b,
    vertOriginX: b,
    vertOriginY: b,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: b,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: Wo
}), Ko = Oe({
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  },
  space: "xlink",
  transform(t, e) {
    return "xlink:" + e.slice(5).toLowerCase();
  }
}), Vo = Oe({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: zo
}), Jo = Oe({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(t, e) {
    return "xml:" + e.slice(3).toLowerCase();
  }
}), Mc = /[A-Z]/g, Vr = /-[a-z]/g, Dc = /^data[-\w.:]+$/i;
function Bc(t, e) {
  const n = On(e);
  let r = e, i = q;
  if (n in t.normal)
    return t.property[t.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Dc.test(e)) {
    if (e.charAt(4) === "-") {
      const o = e.slice(5).replace(Vr, jc);
      r = "data" + o.charAt(0).toUpperCase() + o.slice(1);
    } else {
      const o = e.slice(4);
      if (!Vr.test(o)) {
        let a = o.replace(Mc, Fc);
        a.charAt(0) !== "-" && (a = "-" + a), e = "data" + a;
      }
    }
    i = ar;
  }
  return new i(r, e);
}
function Fc(t) {
  return "-" + t.toLowerCase();
}
function jc(t) {
  return t.charAt(1).toUpperCase();
}
const $c = Uo([qo, Oc, Ko, Vo, Jo], "html"), Yo = Uo([qo, Ic, Ko, Vo, Jo], "svg"), Jr = {}.hasOwnProperty;
function Gc(t, e) {
  const n = e || {};
  function r(i, ...o) {
    let a = r.invalid;
    const s = r.handlers;
    if (i && Jr.call(i, t)) {
      const l = String(i[t]);
      a = Jr.call(s, l) ? s[l] : r.unknown;
    }
    if (a)
      return a.call(this, i, ...o);
  }
  return r.handlers = n.handlers || {}, r.invalid = n.invalid, r.unknown = n.unknown, r;
}
const Hc = /["&'<>`]/g, Uc = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, qc = (
  // eslint-disable-next-line no-control-regex, unicorn/no-hex-escape
  /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g
), Wc = /[|\\{}()[\]^$+*?.]/g, Yr = /* @__PURE__ */ new WeakMap();
function zc(t, e) {
  if (t = t.replace(
    e.subset ? Kc(e.subset) : Hc,
    r
  ), e.subset || e.escapeOnly)
    return t;
  return t.replace(Uc, n).replace(qc, r);
  function n(i, o, a) {
    return e.format(
      (i.charCodeAt(0) - 55296) * 1024 + i.charCodeAt(1) - 56320 + 65536,
      a.charCodeAt(o + 2),
      e
    );
  }
  function r(i, o, a) {
    return e.format(
      i.charCodeAt(0),
      a.charCodeAt(o + 1),
      e
    );
  }
}
function Kc(t) {
  let e = Yr.get(t);
  return e || (e = Vc(t), Yr.set(t, e)), e;
}
function Vc(t) {
  const e = [];
  let n = -1;
  for (; ++n < t.length; )
    e.push(t[n].replace(Wc, "\\$&"));
  return new RegExp("(?:" + e.join("|") + ")", "g");
}
const Jc = /[\dA-Fa-f]/;
function Yc(t, e, n) {
  const r = "&#x" + t.toString(16).toUpperCase();
  return n && e && !Jc.test(String.fromCharCode(e)) ? r : r + ";";
}
const Xc = /\d/;
function Qc(t, e, n) {
  const r = "&#" + String(t);
  return n && e && !Xc.test(String.fromCharCode(e)) ? r : r + ";";
}
const Zc = [
  "AElig",
  "AMP",
  "Aacute",
  "Acirc",
  "Agrave",
  "Aring",
  "Atilde",
  "Auml",
  "COPY",
  "Ccedil",
  "ETH",
  "Eacute",
  "Ecirc",
  "Egrave",
  "Euml",
  "GT",
  "Iacute",
  "Icirc",
  "Igrave",
  "Iuml",
  "LT",
  "Ntilde",
  "Oacute",
  "Ocirc",
  "Ograve",
  "Oslash",
  "Otilde",
  "Ouml",
  "QUOT",
  "REG",
  "THORN",
  "Uacute",
  "Ucirc",
  "Ugrave",
  "Uuml",
  "Yacute",
  "aacute",
  "acirc",
  "acute",
  "aelig",
  "agrave",
  "amp",
  "aring",
  "atilde",
  "auml",
  "brvbar",
  "ccedil",
  "cedil",
  "cent",
  "copy",
  "curren",
  "deg",
  "divide",
  "eacute",
  "ecirc",
  "egrave",
  "eth",
  "euml",
  "frac12",
  "frac14",
  "frac34",
  "gt",
  "iacute",
  "icirc",
  "iexcl",
  "igrave",
  "iquest",
  "iuml",
  "laquo",
  "lt",
  "macr",
  "micro",
  "middot",
  "nbsp",
  "not",
  "ntilde",
  "oacute",
  "ocirc",
  "ograve",
  "ordf",
  "ordm",
  "oslash",
  "otilde",
  "ouml",
  "para",
  "plusmn",
  "pound",
  "quot",
  "raquo",
  "reg",
  "sect",
  "shy",
  "sup1",
  "sup2",
  "sup3",
  "szlig",
  "thorn",
  "times",
  "uacute",
  "ucirc",
  "ugrave",
  "uml",
  "uuml",
  "yacute",
  "yen",
  "yuml"
], rn = {
  nbsp: " ",
  iexcl: "¡",
  cent: "¢",
  pound: "£",
  curren: "¤",
  yen: "¥",
  brvbar: "¦",
  sect: "§",
  uml: "¨",
  copy: "©",
  ordf: "ª",
  laquo: "«",
  not: "¬",
  shy: "­",
  reg: "®",
  macr: "¯",
  deg: "°",
  plusmn: "±",
  sup2: "²",
  sup3: "³",
  acute: "´",
  micro: "µ",
  para: "¶",
  middot: "·",
  cedil: "¸",
  sup1: "¹",
  ordm: "º",
  raquo: "»",
  frac14: "¼",
  frac12: "½",
  frac34: "¾",
  iquest: "¿",
  Agrave: "À",
  Aacute: "Á",
  Acirc: "Â",
  Atilde: "Ã",
  Auml: "Ä",
  Aring: "Å",
  AElig: "Æ",
  Ccedil: "Ç",
  Egrave: "È",
  Eacute: "É",
  Ecirc: "Ê",
  Euml: "Ë",
  Igrave: "Ì",
  Iacute: "Í",
  Icirc: "Î",
  Iuml: "Ï",
  ETH: "Ð",
  Ntilde: "Ñ",
  Ograve: "Ò",
  Oacute: "Ó",
  Ocirc: "Ô",
  Otilde: "Õ",
  Ouml: "Ö",
  times: "×",
  Oslash: "Ø",
  Ugrave: "Ù",
  Uacute: "Ú",
  Ucirc: "Û",
  Uuml: "Ü",
  Yacute: "Ý",
  THORN: "Þ",
  szlig: "ß",
  agrave: "à",
  aacute: "á",
  acirc: "â",
  atilde: "ã",
  auml: "ä",
  aring: "å",
  aelig: "æ",
  ccedil: "ç",
  egrave: "è",
  eacute: "é",
  ecirc: "ê",
  euml: "ë",
  igrave: "ì",
  iacute: "í",
  icirc: "î",
  iuml: "ï",
  eth: "ð",
  ntilde: "ñ",
  ograve: "ò",
  oacute: "ó",
  ocirc: "ô",
  otilde: "õ",
  ouml: "ö",
  divide: "÷",
  oslash: "ø",
  ugrave: "ù",
  uacute: "ú",
  ucirc: "û",
  uuml: "ü",
  yacute: "ý",
  thorn: "þ",
  yuml: "ÿ",
  fnof: "ƒ",
  Alpha: "Α",
  Beta: "Β",
  Gamma: "Γ",
  Delta: "Δ",
  Epsilon: "Ε",
  Zeta: "Ζ",
  Eta: "Η",
  Theta: "Θ",
  Iota: "Ι",
  Kappa: "Κ",
  Lambda: "Λ",
  Mu: "Μ",
  Nu: "Ν",
  Xi: "Ξ",
  Omicron: "Ο",
  Pi: "Π",
  Rho: "Ρ",
  Sigma: "Σ",
  Tau: "Τ",
  Upsilon: "Υ",
  Phi: "Φ",
  Chi: "Χ",
  Psi: "Ψ",
  Omega: "Ω",
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  omicron: "ο",
  pi: "π",
  rho: "ρ",
  sigmaf: "ς",
  sigma: "σ",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  thetasym: "ϑ",
  upsih: "ϒ",
  piv: "ϖ",
  bull: "•",
  hellip: "…",
  prime: "′",
  Prime: "″",
  oline: "‾",
  frasl: "⁄",
  weierp: "℘",
  image: "ℑ",
  real: "ℜ",
  trade: "™",
  alefsym: "ℵ",
  larr: "←",
  uarr: "↑",
  rarr: "→",
  darr: "↓",
  harr: "↔",
  crarr: "↵",
  lArr: "⇐",
  uArr: "⇑",
  rArr: "⇒",
  dArr: "⇓",
  hArr: "⇔",
  forall: "∀",
  part: "∂",
  exist: "∃",
  empty: "∅",
  nabla: "∇",
  isin: "∈",
  notin: "∉",
  ni: "∋",
  prod: "∏",
  sum: "∑",
  minus: "−",
  lowast: "∗",
  radic: "√",
  prop: "∝",
  infin: "∞",
  ang: "∠",
  and: "∧",
  or: "∨",
  cap: "∩",
  cup: "∪",
  int: "∫",
  there4: "∴",
  sim: "∼",
  cong: "≅",
  asymp: "≈",
  ne: "≠",
  equiv: "≡",
  le: "≤",
  ge: "≥",
  sub: "⊂",
  sup: "⊃",
  nsub: "⊄",
  sube: "⊆",
  supe: "⊇",
  oplus: "⊕",
  otimes: "⊗",
  perp: "⊥",
  sdot: "⋅",
  lceil: "⌈",
  rceil: "⌉",
  lfloor: "⌊",
  rfloor: "⌋",
  lang: "〈",
  rang: "〉",
  loz: "◊",
  spades: "♠",
  clubs: "♣",
  hearts: "♥",
  diams: "♦",
  quot: '"',
  amp: "&",
  lt: "<",
  gt: ">",
  OElig: "Œ",
  oelig: "œ",
  Scaron: "Š",
  scaron: "š",
  Yuml: "Ÿ",
  circ: "ˆ",
  tilde: "˜",
  ensp: " ",
  emsp: " ",
  thinsp: " ",
  zwnj: "‌",
  zwj: "‍",
  lrm: "‎",
  rlm: "‏",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  sbquo: "‚",
  ldquo: "“",
  rdquo: "”",
  bdquo: "„",
  dagger: "†",
  Dagger: "‡",
  permil: "‰",
  lsaquo: "‹",
  rsaquo: "›",
  euro: "€"
}, eu = [
  "cent",
  "copy",
  "divide",
  "gt",
  "lt",
  "not",
  "para",
  "times"
], Xo = {}.hasOwnProperty, Dn = {};
let ut;
for (ut in rn)
  Xo.call(rn, ut) && (Dn[rn[ut]] = ut);
const tu = /[^\dA-Za-z]/;
function nu(t, e, n, r) {
  const i = String.fromCharCode(t);
  if (Xo.call(Dn, i)) {
    const o = Dn[i], a = "&" + o;
    return n && Zc.includes(o) && !eu.includes(o) && (!r || e && e !== 61 && tu.test(String.fromCharCode(e))) ? a : a + ";";
  }
  return "";
}
function ru(t, e, n) {
  let r = Yc(t, e, n.omitOptionalSemicolons), i;
  if ((n.useNamedReferences || n.useShortestReferences) && (i = nu(
    t,
    e,
    n.omitOptionalSemicolons,
    n.attribute
  )), (n.useShortestReferences || !i) && n.useShortestReferences) {
    const o = Qc(t, e, n.omitOptionalSemicolons);
    o.length < r.length && (r = o);
  }
  return i && (!n.useShortestReferences || i.length < r.length) ? i : r;
}
function xe(t, e) {
  return zc(t, Object.assign({ format: ru }, e));
}
const iu = /^>|^->|<!--|-->|--!>|<!-$/g, ou = [">"], au = ["<", ">"];
function su(t, e, n, r) {
  return r.settings.bogusComments ? "<?" + xe(
    t.value,
    Object.assign({}, r.settings.characterReferences, {
      subset: ou
    })
  ) + ">" : "<!--" + t.value.replace(iu, i) + "-->";
  function i(o) {
    return xe(
      o,
      Object.assign({}, r.settings.characterReferences, {
        subset: au
      })
    );
  }
}
function lu(t, e, n, r) {
  return "<!" + (r.settings.upperDoctype ? "DOCTYPE" : "doctype") + (r.settings.tightDoctype ? "" : " ") + "html>";
}
function Xr(t, e) {
  const n = String(t);
  if (typeof e != "string")
    throw new TypeError("Expected character");
  let r = 0, i = n.indexOf(e);
  for (; i !== -1; )
    r++, i = n.indexOf(e, i + e.length);
  return r;
}
function cu(t, e) {
  const n = e || {};
  return (t[t.length - 1] === "" ? [...t, ""] : t).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
function uu(t) {
  return t.join(" ").trim();
}
const du = /[ \t\n\f\r]/g;
function sr(t) {
  return typeof t == "object" ? t.type === "text" ? Qr(t.value) : !1 : Qr(t);
}
function Qr(t) {
  return t.replace(du, "") === "";
}
const F = Zo(1), Qo = Zo(-1), fu = [];
function Zo(t) {
  return e;
  function e(n, r, i) {
    const o = n ? n.children : fu;
    let a = (r || 0) + t, s = o[a];
    if (!i)
      for (; s && sr(s); )
        a += t, s = o[a];
    return s;
  }
}
const pu = {}.hasOwnProperty;
function ea(t) {
  return e;
  function e(n, r, i) {
    return pu.call(t, n.tagName) && t[n.tagName](n, r, i);
  }
}
const lr = ea({
  body: mu,
  caption: on,
  colgroup: on,
  dd: bu,
  dt: _u,
  head: on,
  html: hu,
  li: yu,
  optgroup: vu,
  option: Su,
  p: gu,
  rp: Zr,
  rt: Zr,
  tbody: Cu,
  td: ei,
  tfoot: xu,
  th: ei,
  thead: wu,
  tr: ku
});
function on(t, e, n) {
  const r = F(n, e, !0);
  return !r || r.type !== "comment" && !(r.type === "text" && sr(r.value.charAt(0)));
}
function hu(t, e, n) {
  const r = F(n, e);
  return !r || r.type !== "comment";
}
function mu(t, e, n) {
  const r = F(n, e);
  return !r || r.type !== "comment";
}
function gu(t, e, n) {
  const r = F(n, e);
  return r ? r.type === "element" && (r.tagName === "address" || r.tagName === "article" || r.tagName === "aside" || r.tagName === "blockquote" || r.tagName === "details" || r.tagName === "div" || r.tagName === "dl" || r.tagName === "fieldset" || r.tagName === "figcaption" || r.tagName === "figure" || r.tagName === "footer" || r.tagName === "form" || r.tagName === "h1" || r.tagName === "h2" || r.tagName === "h3" || r.tagName === "h4" || r.tagName === "h5" || r.tagName === "h6" || r.tagName === "header" || r.tagName === "hgroup" || r.tagName === "hr" || r.tagName === "main" || r.tagName === "menu" || r.tagName === "nav" || r.tagName === "ol" || r.tagName === "p" || r.tagName === "pre" || r.tagName === "section" || r.tagName === "table" || r.tagName === "ul") : !n || // Confusing parent.
  !(n.type === "element" && (n.tagName === "a" || n.tagName === "audio" || n.tagName === "del" || n.tagName === "ins" || n.tagName === "map" || n.tagName === "noscript" || n.tagName === "video"));
}
function yu(t, e, n) {
  const r = F(n, e);
  return !r || r.type === "element" && r.tagName === "li";
}
function _u(t, e, n) {
  const r = F(n, e);
  return !!(r && r.type === "element" && (r.tagName === "dt" || r.tagName === "dd"));
}
function bu(t, e, n) {
  const r = F(n, e);
  return !r || r.type === "element" && (r.tagName === "dt" || r.tagName === "dd");
}
function Zr(t, e, n) {
  const r = F(n, e);
  return !r || r.type === "element" && (r.tagName === "rp" || r.tagName === "rt");
}
function vu(t, e, n) {
  const r = F(n, e);
  return !r || r.type === "element" && r.tagName === "optgroup";
}
function Su(t, e, n) {
  const r = F(n, e);
  return !r || r.type === "element" && (r.tagName === "option" || r.tagName === "optgroup");
}
function wu(t, e, n) {
  const r = F(n, e);
  return !!(r && r.type === "element" && (r.tagName === "tbody" || r.tagName === "tfoot"));
}
function Cu(t, e, n) {
  const r = F(n, e);
  return !r || r.type === "element" && (r.tagName === "tbody" || r.tagName === "tfoot");
}
function xu(t, e, n) {
  return !F(n, e);
}
function ku(t, e, n) {
  const r = F(n, e);
  return !r || r.type === "element" && r.tagName === "tr";
}
function ei(t, e, n) {
  const r = F(n, e);
  return !r || r.type === "element" && (r.tagName === "td" || r.tagName === "th");
}
const Au = ea({
  body: Ru,
  colgroup: Nu,
  head: Tu,
  html: Eu,
  tbody: Lu
});
function Eu(t) {
  const e = F(t, -1);
  return !e || e.type !== "comment";
}
function Tu(t) {
  const e = /* @__PURE__ */ new Set();
  for (const r of t.children)
    if (r.type === "element" && (r.tagName === "base" || r.tagName === "title")) {
      if (e.has(r.tagName)) return !1;
      e.add(r.tagName);
    }
  const n = t.children[0];
  return !n || n.type === "element";
}
function Ru(t) {
  const e = F(t, -1, !0);
  return !e || e.type !== "comment" && !(e.type === "text" && sr(e.value.charAt(0))) && !(e.type === "element" && (e.tagName === "meta" || e.tagName === "link" || e.tagName === "script" || e.tagName === "style" || e.tagName === "template"));
}
function Nu(t, e, n) {
  const r = Qo(n, e), i = F(t, -1, !0);
  return n && r && r.type === "element" && r.tagName === "colgroup" && lr(r, n.children.indexOf(r), n) ? !1 : !!(i && i.type === "element" && i.tagName === "col");
}
function Lu(t, e, n) {
  const r = Qo(n, e), i = F(t, -1);
  return n && r && r.type === "element" && (r.tagName === "thead" || r.tagName === "tbody") && lr(r, n.children.indexOf(r), n) ? !1 : !!(i && i.type === "element" && i.tagName === "tr");
}
const dt = {
  // See: <https://html.spec.whatwg.org/#attribute-name-state>.
  name: [
    [`	
\f\r &/=>`.split(""), `	
\f\r "&'/=>\``.split("")],
    [`\0	
\f\r "&'/<=>`.split(""), `\0	
\f\r "&'/<=>\``.split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(unquoted)-state>.
  unquoted: [
    [`	
\f\r &>`.split(""), `\0	
\f\r "&'<=>\``.split("")],
    [`\0	
\f\r "&'<=>\``.split(""), `\0	
\f\r "&'<=>\``.split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(single-quoted)-state>.
  single: [
    ["&'".split(""), "\"&'`".split("")],
    ["\0&'".split(""), "\0\"&'`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(double-quoted)-state>.
  double: [
    ['"&'.split(""), "\"&'`".split("")],
    ['\0"&'.split(""), "\0\"&'`".split("")]
  ]
};
function Pu(t, e, n, r) {
  const i = r.schema, o = i.space === "svg" ? !1 : r.settings.omitOptionalTags;
  let a = i.space === "svg" ? r.settings.closeEmptyElements : r.settings.voids.includes(t.tagName.toLowerCase());
  const s = [];
  let l;
  i.space === "html" && t.tagName === "svg" && (r.schema = Yo);
  const c = Ou(r, t.properties), u = r.all(
    i.space === "html" && t.tagName === "template" ? t.content : t
  );
  return r.schema = i, u && (a = !1), (c || !o || !Au(t, e, n)) && (s.push("<", t.tagName, c ? " " + c : ""), a && (i.space === "svg" || r.settings.closeSelfClosing) && (l = c.charAt(c.length - 1), (!r.settings.tightSelfClosing || l === "/" || l && l !== '"' && l !== "'") && s.push(" "), s.push("/")), s.push(">")), s.push(u), !a && (!o || !lr(t, e, n)) && s.push("</" + t.tagName + ">"), s.join("");
}
function Ou(t, e) {
  const n = [];
  let r = -1, i;
  if (e) {
    for (i in e)
      if (e[i] !== null && e[i] !== void 0) {
        const o = Iu(t, i, e[i]);
        o && n.push(o);
      }
  }
  for (; ++r < n.length; ) {
    const o = t.settings.tightAttributes ? n[r].charAt(n[r].length - 1) : void 0;
    r !== n.length - 1 && o !== '"' && o !== "'" && (n[r] += " ");
  }
  return n.join("");
}
function Iu(t, e, n) {
  const r = Bc(t.schema, e), i = t.settings.allowParseErrors && t.schema.space === "html" ? 0 : 1, o = t.settings.allowDangerousCharacters ? 0 : 1;
  let a = t.quote, s;
  if (r.overloadedBoolean && (n === r.attribute || n === "") ? n = !0 : (r.boolean || r.overloadedBoolean) && (typeof n != "string" || n === r.attribute || n === "") && (n = !!n), n == null || n === !1 || typeof n == "number" && Number.isNaN(n))
    return "";
  const l = xe(
    r.attribute,
    Object.assign({}, t.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: dt.name[i][o]
    })
  );
  return n === !0 || (n = Array.isArray(n) ? (r.commaSeparated ? cu : uu)(n, {
    padLeft: !t.settings.tightCommaSeparatedLists
  }) : String(n), t.settings.collapseEmptyAttributes && !n) ? l : (t.settings.preferUnquoted && (s = xe(
    n,
    Object.assign({}, t.settings.characterReferences, {
      attribute: !0,
      subset: dt.unquoted[i][o]
    })
  )), s !== n && (t.settings.quoteSmart && Xr(n, a) > Xr(n, t.alternative) && (a = t.alternative), s = a + xe(
    n,
    Object.assign({}, t.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: (a === "'" ? dt.single : dt.double)[i][o],
      attribute: !0
    })
  ) + a), l + (s && "=" + s));
}
const Mu = ["<", "&"];
function ta(t, e, n, r) {
  return n && n.type === "element" && (n.tagName === "script" || n.tagName === "style") ? t.value : xe(
    t.value,
    Object.assign({}, r.settings.characterReferences, {
      subset: Mu
    })
  );
}
function Du(t, e, n, r) {
  return r.settings.allowDangerousHtml ? t.value : ta(t, e, n, r);
}
function Bu(t, e, n, r) {
  return r.all(t);
}
const Fu = Gc("type", {
  invalid: ju,
  unknown: $u,
  handlers: { comment: su, doctype: lu, element: Pu, raw: Du, root: Bu, text: ta }
});
function ju(t) {
  throw new Error("Expected node, not `" + t + "`");
}
function $u(t) {
  const e = (
    /** @type {Nodes} */
    t
  );
  throw new Error("Cannot compile unknown node `" + e.type + "`");
}
const Gu = {}, Hu = {}, Uu = [];
function qu(t, e) {
  const n = e || Gu, r = n.quote || '"', i = r === '"' ? "'" : '"';
  if (r !== '"' && r !== "'")
    throw new Error("Invalid quote `" + r + "`, expected `'` or `\"`");
  return {
    one: Wu,
    all: zu,
    settings: {
      omitOptionalTags: n.omitOptionalTags || !1,
      allowParseErrors: n.allowParseErrors || !1,
      allowDangerousCharacters: n.allowDangerousCharacters || !1,
      quoteSmart: n.quoteSmart || !1,
      preferUnquoted: n.preferUnquoted || !1,
      tightAttributes: n.tightAttributes || !1,
      upperDoctype: n.upperDoctype || !1,
      tightDoctype: n.tightDoctype || !1,
      bogusComments: n.bogusComments || !1,
      tightCommaSeparatedLists: n.tightCommaSeparatedLists || !1,
      tightSelfClosing: n.tightSelfClosing || !1,
      collapseEmptyAttributes: n.collapseEmptyAttributes || !1,
      allowDangerousHtml: n.allowDangerousHtml || !1,
      voids: n.voids || Lc,
      characterReferences: n.characterReferences || Hu,
      closeSelfClosing: n.closeSelfClosing || !1,
      closeEmptyElements: n.closeEmptyElements || !1
    },
    schema: n.space === "svg" ? Yo : $c,
    quote: r,
    alternative: i
  }.one(
    Array.isArray(t) ? { type: "root", children: t } : t,
    void 0,
    void 0
  );
}
function Wu(t, e, n) {
  return Fu(t, e, n, this);
}
function zu(t) {
  const e = [], n = t && t.children || Uu;
  let r = -1;
  for (; ++r < n.length; )
    e[r] = this.one(n[r], r, t);
  return e.join("");
}
function Rt(t, e) {
  const n = typeof t == "string" ? {} : { ...t.colorReplacements }, r = typeof t == "string" ? t : t.name;
  for (const [i, o] of Object.entries((e == null ? void 0 : e.colorReplacements) || {}))
    typeof o == "string" ? n[i] = o : i === r && Object.assign(n, o);
  return n;
}
function se(t, e) {
  return t && ((e == null ? void 0 : e[t == null ? void 0 : t.toLowerCase()]) || t);
}
function Ku(t) {
  return Array.isArray(t) ? t : [t];
}
async function na(t) {
  return Promise.resolve(typeof t == "function" ? t() : t).then((e) => e.default || e);
}
function cr(t) {
  return !t || ["plaintext", "txt", "text", "plain"].includes(t);
}
function ra(t) {
  return t === "ansi" || cr(t);
}
function ur(t) {
  return t === "none";
}
function ia(t) {
  return ur(t);
}
function oa(t, e) {
  var r;
  if (!e)
    return t;
  t.properties || (t.properties = {}), (r = t.properties).class || (r.class = []), typeof t.properties.class == "string" && (t.properties.class = t.properties.class.split(/\s+/g)), Array.isArray(t.properties.class) || (t.properties.class = []);
  const n = Array.isArray(e) ? e : e.split(/\s+/g);
  for (const i of n)
    i && !t.properties.class.includes(i) && t.properties.class.push(i);
  return t;
}
function Ht(t, e = !1) {
  var o;
  const n = t.split(/(\r?\n)/g);
  let r = 0;
  const i = [];
  for (let a = 0; a < n.length; a += 2) {
    const s = e ? n[a] + (n[a + 1] || "") : n[a];
    i.push([s, r]), r += n[a].length, r += ((o = n[a + 1]) == null ? void 0 : o.length) || 0;
  }
  return i;
}
function Vu(t) {
  const e = Ht(t, !0).map(([i]) => i);
  function n(i) {
    if (i === t.length)
      return {
        line: e.length - 1,
        character: e[e.length - 1].length
      };
    let o = i, a = 0;
    for (const s of e) {
      if (o < s.length)
        break;
      o -= s.length, a++;
    }
    return { line: a, character: o };
  }
  function r(i, o) {
    let a = 0;
    for (let s = 0; s < i; s++)
      a += e[s].length;
    return a += o, a;
  }
  return {
    lines: e,
    indexToPos: n,
    posToIndex: r
  };
}
function Ju(t, e, n) {
  const r = /* @__PURE__ */ new Set();
  for (const o of t.matchAll(/lang=["']([\w-]+)["']/g))
    r.add(o[1]);
  for (const o of t.matchAll(/(?:```|~~~)([\w-]+)/g))
    r.add(o[1]);
  for (const o of t.matchAll(/\\begin\{([\w-]+)\}/g))
    r.add(o[1]);
  if (!n)
    return Array.from(r);
  const i = n.getBundledLanguages();
  return Array.from(r).filter((o) => o && i[o]);
}
const dr = "light-dark()", Yu = ["color", "background-color"];
function Xu(t, e) {
  let n = 0;
  const r = [];
  for (const i of e)
    i > n && r.push({
      ...t,
      content: t.content.slice(n, i),
      offset: t.offset + n
    }), n = i;
  return n < t.content.length && r.push({
    ...t,
    content: t.content.slice(n),
    offset: t.offset + n
  }), r;
}
function Qu(t, e) {
  const n = Array.from(e instanceof Set ? e : new Set(e)).sort((r, i) => r - i);
  return n.length ? t.map((r) => r.flatMap((i) => {
    const o = n.filter((a) => i.offset < a && a < i.offset + i.content.length).map((a) => a - i.offset).sort((a, s) => a - s);
    return o.length ? Xu(i, o) : i;
  })) : t;
}
function Zu(t, e, n, r, i = "css-vars") {
  const o = {
    content: t.content,
    explanation: t.explanation,
    offset: t.offset
  }, a = e.map((u) => Nt(t.variants[u])), s = new Set(a.flatMap((u) => Object.keys(u))), l = {}, c = (u, d) => {
    const f = d === "color" ? "" : d === "background-color" ? "-bg" : `-${d}`;
    return n + e[u] + (d === "color" ? "" : f);
  };
  return a.forEach((u, d) => {
    for (const f of s) {
      const p = u[f] || "inherit";
      if (d === 0 && r && Yu.includes(f))
        if (r === dr && a.length > 1) {
          const h = e.findIndex((_) => _ === "light"), C = e.findIndex((_) => _ === "dark");
          if (h === -1 || C === -1)
            throw new I('When using `defaultColor: "light-dark()"`, you must provide both `light` and `dark` themes');
          const g = a[h][f] || "inherit", y = a[C][f] || "inherit";
          l[f] = `light-dark(${g}, ${y})`, i === "css-vars" && (l[c(d, f)] = p);
        } else
          l[f] = p;
      else
        i === "css-vars" && (l[c(d, f)] = p);
    }
  }), o.htmlStyle = l, o;
}
function Nt(t) {
  const e = {};
  if (t.color && (e.color = t.color), t.bgColor && (e["background-color"] = t.bgColor), t.fontStyle) {
    t.fontStyle & G.Italic && (e["font-style"] = "italic"), t.fontStyle & G.Bold && (e["font-weight"] = "bold");
    const n = [];
    t.fontStyle & G.Underline && n.push("underline"), t.fontStyle & G.Strikethrough && n.push("line-through"), n.length && (e["text-decoration"] = n.join(" "));
  }
  return e;
}
function Bn(t) {
  return typeof t == "string" ? t : Object.entries(t).map(([e, n]) => `${e}:${n}`).join(";");
}
const aa = /* @__PURE__ */ new WeakMap();
function Ut(t, e) {
  aa.set(t, e);
}
function Ye(t) {
  return aa.get(t);
}
class Ie {
  constructor(...e) {
    /**
     * Theme to Stack mapping
     */
    m(this, "_stacks", {});
    m(this, "lang");
    if (e.length === 2) {
      const [n, r] = e;
      this.lang = r, this._stacks = n;
    } else {
      const [n, r, i] = e;
      this.lang = r, this._stacks = { [i]: n };
    }
  }
  get themes() {
    return Object.keys(this._stacks);
  }
  get theme() {
    return this.themes[0];
  }
  get _stack() {
    return this._stacks[this.theme];
  }
  /**
   * Static method to create a initial grammar state.
   */
  static initial(e, n) {
    return new Ie(
      Object.fromEntries(Ku(n).map((r) => [r, Pn])),
      e
    );
  }
  /**
   * Get the internal stack object.
   * @internal
   */
  getInternalStack(e = this.theme) {
    return this._stacks[e];
  }
  getScopes(e = this.theme) {
    return ed(this._stacks[e]);
  }
  toJSON() {
    return {
      lang: this.lang,
      theme: this.theme,
      themes: this.themes,
      scopes: this.getScopes()
    };
  }
}
function ed(t) {
  const e = [], n = /* @__PURE__ */ new Set();
  function r(i) {
    var a;
    if (n.has(i))
      return;
    n.add(i);
    const o = (a = i == null ? void 0 : i.nameScopesList) == null ? void 0 : a.scopeName;
    o && e.push(o), i.parent && r(i.parent);
  }
  return r(t), e;
}
function td(t, e) {
  if (!(t instanceof Ie))
    throw new I("Invalid grammar state");
  return t.getInternalStack(e);
}
function nd() {
  const t = /* @__PURE__ */ new WeakMap();
  function e(n) {
    if (!t.has(n.meta)) {
      let r = function(a) {
        if (typeof a == "number") {
          if (a < 0 || a > n.source.length)
            throw new I(`Invalid decoration offset: ${a}. Code length: ${n.source.length}`);
          return {
            ...i.indexToPos(a),
            offset: a
          };
        } else {
          const s = i.lines[a.line];
          if (s === void 0)
            throw new I(`Invalid decoration position ${JSON.stringify(a)}. Lines length: ${i.lines.length}`);
          if (a.character < 0 || a.character > s.length)
            throw new I(`Invalid decoration position ${JSON.stringify(a)}. Line ${a.line} length: ${s.length}`);
          return {
            ...a,
            offset: i.posToIndex(a.line, a.character)
          };
        }
      };
      const i = Vu(n.source), o = (n.options.decorations || []).map((a) => ({
        ...a,
        start: r(a.start),
        end: r(a.end)
      }));
      rd(o), t.set(n.meta, {
        decorations: o,
        converter: i,
        source: n.source
      });
    }
    return t.get(n.meta);
  }
  return {
    name: "shiki:decorations",
    tokens(n) {
      var a;
      if (!((a = this.options.decorations) != null && a.length))
        return;
      const i = e(this).decorations.flatMap((s) => [s.start.offset, s.end.offset]);
      return Qu(n, i);
    },
    code(n) {
      var u;
      if (!((u = this.options.decorations) != null && u.length))
        return;
      const r = e(this), i = Array.from(n.children).filter((d) => d.type === "element" && d.tagName === "span");
      if (i.length !== r.converter.lines.length)
        throw new I(`Number of lines in code element (${i.length}) does not match the number of lines in the source (${r.converter.lines.length}). Failed to apply decorations.`);
      function o(d, f, p, h) {
        const C = i[d];
        let g = "", y = -1, _ = -1;
        if (f === 0 && (y = 0), p === 0 && (_ = 0), p === Number.POSITIVE_INFINITY && (_ = C.children.length), y === -1 || _ === -1)
          for (let A = 0; A < C.children.length; A++)
            g += sa(C.children[A]), y === -1 && g.length === f && (y = A + 1), _ === -1 && g.length === p && (_ = A + 1);
        if (y === -1)
          throw new I(`Failed to find start index for decoration ${JSON.stringify(h.start)}`);
        if (_ === -1)
          throw new I(`Failed to find end index for decoration ${JSON.stringify(h.end)}`);
        const w = C.children.slice(y, _);
        if (!h.alwaysWrap && w.length === C.children.length)
          s(C, h, "line");
        else if (!h.alwaysWrap && w.length === 1 && w[0].type === "element")
          s(w[0], h, "token");
        else {
          const A = {
            type: "element",
            tagName: "span",
            properties: {},
            children: w
          };
          s(A, h, "wrapper"), C.children.splice(y, w.length, A);
        }
      }
      function a(d, f) {
        i[d] = s(i[d], f, "line");
      }
      function s(d, f, p) {
        var g;
        const h = f.properties || {}, C = f.transform || ((y) => y);
        return d.tagName = f.tagName || "span", d.properties = {
          ...d.properties,
          ...h,
          class: d.properties.class
        }, (g = f.properties) != null && g.class && oa(d, f.properties.class), d = C(d, p) || d, d;
      }
      const l = [], c = r.decorations.sort((d, f) => f.start.offset - d.start.offset || d.end.offset - f.end.offset);
      for (const d of c) {
        const { start: f, end: p } = d;
        if (f.line === p.line)
          o(f.line, f.character, p.character, d);
        else if (f.line < p.line) {
          o(f.line, f.character, Number.POSITIVE_INFINITY, d);
          for (let h = f.line + 1; h < p.line; h++)
            l.unshift(() => a(h, d));
          o(p.line, 0, p.character, d);
        }
      }
      l.forEach((d) => d());
    }
  };
}
function rd(t) {
  for (let e = 0; e < t.length; e++) {
    const n = t[e];
    if (n.start.offset > n.end.offset)
      throw new I(`Invalid decoration range: ${JSON.stringify(n.start)} - ${JSON.stringify(n.end)}`);
    for (let r = e + 1; r < t.length; r++) {
      const i = t[r], o = n.start.offset <= i.start.offset && i.start.offset < n.end.offset, a = n.start.offset < i.end.offset && i.end.offset <= n.end.offset, s = i.start.offset <= n.start.offset && n.start.offset < i.end.offset, l = i.start.offset < n.end.offset && n.end.offset <= i.end.offset;
      if (o || a || s || l) {
        if (o && a || s && l || s && n.start.offset === n.end.offset || a && i.start.offset === i.end.offset)
          continue;
        throw new I(`Decorations ${JSON.stringify(n.start)} and ${JSON.stringify(i.start)} intersect.`);
      }
    }
  }
}
function sa(t) {
  return t.type === "text" ? t.value : t.type === "element" ? t.children.map(sa).join("") : "";
}
const id = [
  /* @__PURE__ */ nd()
];
function Lt(t) {
  return [
    ...t.transformers || [],
    ...id
  ];
}
var pe = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "brightBlack",
  "brightRed",
  "brightGreen",
  "brightYellow",
  "brightBlue",
  "brightMagenta",
  "brightCyan",
  "brightWhite"
], an = {
  1: "bold",
  2: "dim",
  3: "italic",
  4: "underline",
  7: "reverse",
  8: "hidden",
  9: "strikethrough"
};
function od(t, e) {
  const n = t.indexOf("\x1B", e);
  if (n !== -1 && t[n + 1] === "[") {
    const r = t.indexOf("m", n);
    if (r !== -1)
      return {
        sequence: t.substring(n + 2, r).split(";"),
        startPosition: n,
        position: r + 1
      };
  }
  return {
    position: t.length
  };
}
function ti(t) {
  const e = t.shift();
  if (e === "2") {
    const n = t.splice(0, 3).map((r) => Number.parseInt(r));
    return n.length !== 3 || n.some((r) => Number.isNaN(r)) ? void 0 : {
      type: "rgb",
      rgb: n
    };
  } else if (e === "5") {
    const n = t.shift();
    if (n)
      return { type: "table", index: Number(n) };
  }
}
function ad(t) {
  const e = [];
  for (; t.length > 0; ) {
    const n = t.shift();
    if (!n)
      continue;
    const r = Number.parseInt(n);
    if (!Number.isNaN(r))
      if (r === 0)
        e.push({ type: "resetAll" });
      else if (r <= 9)
        an[r] && e.push({
          type: "setDecoration",
          value: an[r]
        });
      else if (r <= 29) {
        const i = an[r - 20];
        i && (e.push({
          type: "resetDecoration",
          value: i
        }), i === "dim" && e.push({
          type: "resetDecoration",
          value: "bold"
        }));
      } else if (r <= 37)
        e.push({
          type: "setForegroundColor",
          value: { type: "named", name: pe[r - 30] }
        });
      else if (r === 38) {
        const i = ti(t);
        i && e.push({
          type: "setForegroundColor",
          value: i
        });
      } else if (r === 39)
        e.push({
          type: "resetForegroundColor"
        });
      else if (r <= 47)
        e.push({
          type: "setBackgroundColor",
          value: { type: "named", name: pe[r - 40] }
        });
      else if (r === 48) {
        const i = ti(t);
        i && e.push({
          type: "setBackgroundColor",
          value: i
        });
      } else r === 49 ? e.push({
        type: "resetBackgroundColor"
      }) : r === 53 ? e.push({
        type: "setDecoration",
        value: "overline"
      }) : r === 55 ? e.push({
        type: "resetDecoration",
        value: "overline"
      }) : r >= 90 && r <= 97 ? e.push({
        type: "setForegroundColor",
        value: { type: "named", name: pe[r - 90 + 8] }
      }) : r >= 100 && r <= 107 && e.push({
        type: "setBackgroundColor",
        value: { type: "named", name: pe[r - 100 + 8] }
      });
  }
  return e;
}
function sd() {
  let t = null, e = null, n = /* @__PURE__ */ new Set();
  return {
    parse(r) {
      const i = [];
      let o = 0;
      do {
        const a = od(r, o), s = a.sequence ? r.substring(o, a.startPosition) : r.substring(o);
        if (s.length > 0 && i.push({
          value: s,
          foreground: t,
          background: e,
          decorations: new Set(n)
        }), a.sequence) {
          const l = ad(a.sequence);
          for (const c of l)
            c.type === "resetAll" ? (t = null, e = null, n.clear()) : c.type === "resetForegroundColor" ? t = null : c.type === "resetBackgroundColor" ? e = null : c.type === "resetDecoration" && n.delete(c.value);
          for (const c of l)
            c.type === "setForegroundColor" ? t = c.value : c.type === "setBackgroundColor" ? e = c.value : c.type === "setDecoration" && n.add(c.value);
        }
        o = a.position;
      } while (o < r.length);
      return i;
    }
  };
}
var ld = {
  black: "#000000",
  red: "#bb0000",
  green: "#00bb00",
  yellow: "#bbbb00",
  blue: "#0000bb",
  magenta: "#ff00ff",
  cyan: "#00bbbb",
  white: "#eeeeee",
  brightBlack: "#555555",
  brightRed: "#ff5555",
  brightGreen: "#00ff00",
  brightYellow: "#ffff55",
  brightBlue: "#5555ff",
  brightMagenta: "#ff55ff",
  brightCyan: "#55ffff",
  brightWhite: "#ffffff"
};
function cd(t = ld) {
  function e(s) {
    return t[s];
  }
  function n(s) {
    return `#${s.map((l) => Math.max(0, Math.min(l, 255)).toString(16).padStart(2, "0")).join("")}`;
  }
  let r;
  function i() {
    if (r)
      return r;
    r = [];
    for (let c = 0; c < pe.length; c++)
      r.push(e(pe[c]));
    let s = [0, 95, 135, 175, 215, 255];
    for (let c = 0; c < 6; c++)
      for (let u = 0; u < 6; u++)
        for (let d = 0; d < 6; d++)
          r.push(n([s[c], s[u], s[d]]));
    let l = 8;
    for (let c = 0; c < 24; c++, l += 10)
      r.push(n([l, l, l]));
    return r;
  }
  function o(s) {
    return i()[s];
  }
  function a(s) {
    switch (s.type) {
      case "named":
        return e(s.name);
      case "rgb":
        return n(s.rgb);
      case "table":
        return o(s.index);
    }
  }
  return {
    value: a
  };
}
function ud(t, e, n) {
  const r = Rt(t, n), i = Ht(e), o = cd(
    Object.fromEntries(
      pe.map((s) => {
        var l;
        return [
          s,
          (l = t.colors) == null ? void 0 : l[`terminal.ansi${s[0].toUpperCase()}${s.substring(1)}`]
        ];
      })
    )
  ), a = sd();
  return i.map(
    (s) => a.parse(s[0]).map((l) => {
      let c, u;
      l.decorations.has("reverse") ? (c = l.background ? o.value(l.background) : t.bg, u = l.foreground ? o.value(l.foreground) : t.fg) : (c = l.foreground ? o.value(l.foreground) : t.fg, u = l.background ? o.value(l.background) : void 0), c = se(c, r), u = se(u, r), l.decorations.has("dim") && (c = dd(c));
      let d = G.None;
      return l.decorations.has("bold") && (d |= G.Bold), l.decorations.has("italic") && (d |= G.Italic), l.decorations.has("underline") && (d |= G.Underline), l.decorations.has("strikethrough") && (d |= G.Strikethrough), {
        content: l.value,
        offset: s[1],
        // TODO: more accurate offset? might need to fork ansi-sequence-parser
        color: c,
        bgColor: u,
        fontStyle: d
      };
    })
  );
}
function dd(t) {
  const e = t.match(/#([0-9a-f]{3})([0-9a-f]{3})?([0-9a-f]{2})?/);
  if (e)
    if (e[3]) {
      const r = Math.round(Number.parseInt(e[3], 16) / 2).toString(16).padStart(2, "0");
      return `#${e[1]}${e[2]}${r}`;
    } else return e[2] ? `#${e[1]}${e[2]}80` : `#${Array.from(e[1]).map((r) => `${r}${r}`).join("")}80`;
  const n = t.match(/var\((--[\w-]+-ansi-[\w-]+)\)/);
  return n ? `var(${n[1]}-dim)` : t;
}
function fr(t, e, n = {}) {
  const {
    lang: r = "text",
    theme: i = t.getLoadedThemes()[0]
  } = n;
  if (cr(r) || ur(i))
    return Ht(e).map((l) => [{ content: l[0], offset: l[1] }]);
  const { theme: o, colorMap: a } = t.setTheme(i);
  if (r === "ansi")
    return ud(o, e, n);
  const s = t.getLanguage(r);
  if (n.grammarState) {
    if (n.grammarState.lang !== s.name)
      throw new I(`Grammar state language "${n.grammarState.lang}" does not match highlight language "${s.name}"`);
    if (!n.grammarState.themes.includes(o.name))
      throw new I(`Grammar state themes "${n.grammarState.themes}" do not contain highlight theme "${o.name}"`);
  }
  return pd(e, s, o, a, n);
}
function fd(...t) {
  if (t.length === 2)
    return Ye(t[1]);
  const [e, n, r = {}] = t, {
    lang: i = "text",
    theme: o = e.getLoadedThemes()[0]
  } = r;
  if (cr(i) || ur(o))
    throw new I("Plain language does not have grammar state");
  if (i === "ansi")
    throw new I("ANSI language does not have grammar state");
  const { theme: a, colorMap: s } = e.setTheme(o), l = e.getLanguage(i);
  return new Ie(
    Pt(n, l, a, s, r).stateStack,
    l.name,
    a.name
  );
}
function pd(t, e, n, r, i) {
  const o = Pt(t, e, n, r, i), a = new Ie(
    Pt(t, e, n, r, i).stateStack,
    e.name,
    n.name
  );
  return Ut(o.tokens, a), o.tokens;
}
function Pt(t, e, n, r, i) {
  const o = Rt(n, i), {
    tokenizeMaxLineLength: a = 0,
    tokenizeTimeLimit: s = 500
  } = i, l = Ht(t);
  let c = i.grammarState ? td(i.grammarState, n.name) ?? Pn : i.grammarContextCode != null ? Pt(
    i.grammarContextCode,
    e,
    n,
    r,
    {
      ...i,
      grammarState: void 0,
      grammarContextCode: void 0
    }
  ).stateStack : Pn, u = [];
  const d = [];
  for (let f = 0, p = l.length; f < p; f++) {
    const [h, C] = l[f];
    if (h === "") {
      u = [], d.push([]);
      continue;
    }
    if (a > 0 && h.length >= a) {
      u = [], d.push([{
        content: h,
        offset: C,
        color: "",
        fontStyle: 0
      }]);
      continue;
    }
    let g, y, _;
    i.includeExplanation && (g = e.tokenizeLine(h, c, s), y = g.tokens, _ = 0);
    const w = e.tokenizeLine2(h, c, s), A = w.tokens.length / 2;
    for (let x = 0; x < A; x++) {
      const v = w.tokens[2 * x], S = x + 1 < A ? w.tokens[2 * x + 2] : h.length;
      if (v === S)
        continue;
      const k = w.tokens[2 * x + 1], R = se(
        r[Ee.getForeground(k)],
        o
      ), T = Ee.getFontStyle(k), D = {
        content: h.substring(v, S),
        offset: C + v,
        color: R,
        fontStyle: T
      };
      if (i.includeExplanation) {
        const z = [];
        if (i.includeExplanation !== "scopeName")
          for (const H of n.settings) {
            let oe;
            switch (typeof H.scope) {
              case "string":
                oe = H.scope.split(/,/).map((Me) => Me.trim());
                break;
              case "object":
                oe = H.scope;
                break;
              default:
                continue;
            }
            z.push({
              settings: H,
              selectors: oe.map((Me) => Me.split(/ /))
            });
          }
        D.explanation = [];
        let Y = 0;
        for (; v + Y < S; ) {
          const H = y[_], oe = h.substring(
            H.startIndex,
            H.endIndex
          );
          Y += oe.length, D.explanation.push({
            content: oe,
            scopes: i.includeExplanation === "scopeName" ? hd(
              H.scopes
            ) : md(
              z,
              H.scopes
            )
          }), _ += 1;
        }
      }
      u.push(D);
    }
    d.push(u), u = [], c = w.ruleStack;
  }
  return {
    tokens: d,
    stateStack: c
  };
}
function hd(t) {
  return t.map((e) => ({ scopeName: e }));
}
function md(t, e) {
  const n = [];
  for (let r = 0, i = e.length; r < i; r++) {
    const o = e[r];
    n[r] = {
      scopeName: o,
      themeMatches: yd(t, o, e.slice(0, r))
    };
  }
  return n;
}
function ni(t, e) {
  return t === e || e.substring(0, t.length) === t && e[t.length] === ".";
}
function gd(t, e, n) {
  if (!ni(t[t.length - 1], e))
    return !1;
  let r = t.length - 2, i = n.length - 1;
  for (; r >= 0 && i >= 0; )
    ni(t[r], n[i]) && (r -= 1), i -= 1;
  return r === -1;
}
function yd(t, e, n) {
  const r = [];
  for (const { selectors: i, settings: o } of t)
    for (const a of i)
      if (gd(a, e, n)) {
        r.push(o);
        break;
      }
  return r;
}
function la(t, e, n) {
  const r = Object.entries(n.themes).filter((l) => l[1]).map((l) => ({ color: l[0], theme: l[1] })), i = r.map((l) => {
    const c = fr(t, e, {
      ...n,
      theme: l.theme
    }), u = Ye(c), d = typeof l.theme == "string" ? l.theme : l.theme.name;
    return {
      tokens: c,
      state: u,
      theme: d
    };
  }), o = _d(
    ...i.map((l) => l.tokens)
  ), a = o[0].map(
    (l, c) => l.map((u, d) => {
      const f = {
        content: u.content,
        variants: {},
        offset: u.offset
      };
      return "includeExplanation" in n && n.includeExplanation && (f.explanation = u.explanation), o.forEach((p, h) => {
        const {
          content: C,
          explanation: g,
          offset: y,
          ..._
        } = p[c][d];
        f.variants[r[h].color] = _;
      }), f;
    })
  ), s = i[0].state ? new Ie(
    Object.fromEntries(i.map((l) => {
      var c;
      return [l.theme, (c = l.state) == null ? void 0 : c.getInternalStack(l.theme)];
    })),
    i[0].state.lang
  ) : void 0;
  return s && Ut(a, s), a;
}
function _d(...t) {
  const e = t.map(() => []), n = t.length;
  for (let r = 0; r < t[0].length; r++) {
    const i = t.map((l) => l[r]), o = e.map(() => []);
    e.forEach((l, c) => l.push(o[c]));
    const a = i.map(() => 0), s = i.map((l) => l[0]);
    for (; s.every((l) => l); ) {
      const l = Math.min(...s.map((c) => c.content.length));
      for (let c = 0; c < n; c++) {
        const u = s[c];
        u.content.length === l ? (o[c].push(u), a[c] += 1, s[c] = i[c][a[c]]) : (o[c].push({
          ...u,
          content: u.content.slice(0, l)
        }), s[c] = {
          ...u,
          content: u.content.slice(l),
          offset: u.offset + l
        });
      }
    }
  }
  return e;
}
function Ot(t, e, n) {
  let r, i, o, a, s, l;
  if ("themes" in n) {
    const {
      defaultColor: c = "light",
      cssVariablePrefix: u = "--shiki-",
      colorsRendering: d = "css-vars"
    } = n, f = Object.entries(n.themes).filter((y) => y[1]).map((y) => ({ color: y[0], theme: y[1] })).sort((y, _) => y.color === c ? -1 : _.color === c ? 1 : 0);
    if (f.length === 0)
      throw new I("`themes` option must not be empty");
    const p = la(
      t,
      e,
      n
    );
    if (l = Ye(p), c && dr !== c && !f.find((y) => y.color === c))
      throw new I(`\`themes\` option must contain the defaultColor key \`${c}\``);
    const h = f.map((y) => t.getTheme(y.theme)), C = f.map((y) => y.color);
    o = p.map((y) => y.map((_) => Zu(_, C, u, c, d))), l && Ut(o, l);
    const g = f.map((y) => Rt(y.theme, n));
    i = ri(f, h, g, u, c, "fg", d), r = ri(f, h, g, u, c, "bg", d), a = `shiki-themes ${h.map((y) => y.name).join(" ")}`, s = c ? void 0 : [i, r].join(";");
  } else if ("theme" in n) {
    const c = Rt(n.theme, n);
    o = fr(
      t,
      e,
      n
    );
    const u = t.getTheme(n.theme);
    r = se(u.bg, c), i = se(u.fg, c), a = u.name, l = Ye(o);
  } else
    throw new I("Invalid options, either `theme` or `themes` must be provided");
  return {
    tokens: o,
    fg: i,
    bg: r,
    themeName: a,
    rootStyle: s,
    grammarState: l
  };
}
function ri(t, e, n, r, i, o, a) {
  return t.map((s, l) => {
    const c = se(e[l][o], n[l]) || "inherit", u = `${r + s.color}${o === "bg" ? "-bg" : ""}:${c}`;
    if (l === 0 && i) {
      if (i === dr && t.length > 1) {
        const d = t.findIndex((C) => C.color === "light"), f = t.findIndex((C) => C.color === "dark");
        if (d === -1 || f === -1)
          throw new I('When using `defaultColor: "light-dark()"`, you must provide both `light` and `dark` themes');
        const p = se(e[d][o], n[d]) || "inherit", h = se(e[f][o], n[f]) || "inherit";
        return `light-dark(${p}, ${h});${u}`;
      }
      return c;
    }
    return a === "css-vars" ? u : null;
  }).filter((s) => !!s).join(";");
}
function It(t, e, n, r = {
  meta: {},
  options: n,
  codeToHast: (i, o) => It(t, i, o),
  codeToTokens: (i, o) => Ot(t, i, o)
}) {
  var h, C;
  let i = e;
  for (const g of Lt(n))
    i = ((h = g.preprocess) == null ? void 0 : h.call(r, i, n)) || i;
  let {
    tokens: o,
    fg: a,
    bg: s,
    themeName: l,
    rootStyle: c,
    grammarState: u
  } = Ot(t, i, n);
  const {
    mergeWhitespaces: d = !0,
    mergeSameStyleTokens: f = !1
  } = n;
  d === !0 ? o = vd(o) : d === "never" && (o = Sd(o)), f && (o = wd(o));
  const p = {
    ...r,
    get source() {
      return i;
    }
  };
  for (const g of Lt(n))
    o = ((C = g.tokens) == null ? void 0 : C.call(p, o)) || o;
  return bd(
    o,
    {
      ...n,
      fg: a,
      bg: s,
      themeName: l,
      rootStyle: c
    },
    p,
    u
  );
}
function bd(t, e, n, r = Ye(t)) {
  var h, C, g;
  const i = Lt(e), o = [], a = {
    type: "root",
    children: []
  }, {
    structure: s = "classic",
    tabindex: l = "0"
  } = e;
  let c = {
    type: "element",
    tagName: "pre",
    properties: {
      class: `shiki ${e.themeName || ""}`,
      style: e.rootStyle || `background-color:${e.bg};color:${e.fg}`,
      ...l !== !1 && l != null ? {
        tabindex: l.toString()
      } : {},
      ...Object.fromEntries(
        Array.from(
          Object.entries(e.meta || {})
        ).filter(([y]) => !y.startsWith("_"))
      )
    },
    children: []
  }, u = {
    type: "element",
    tagName: "code",
    properties: {},
    children: o
  };
  const d = [], f = {
    ...n,
    structure: s,
    addClassToHast: oa,
    get source() {
      return n.source;
    },
    get tokens() {
      return t;
    },
    get options() {
      return e;
    },
    get root() {
      return a;
    },
    get pre() {
      return c;
    },
    get code() {
      return u;
    },
    get lines() {
      return d;
    }
  };
  if (t.forEach((y, _) => {
    var x, v;
    _ && (s === "inline" ? a.children.push({ type: "element", tagName: "br", properties: {}, children: [] }) : s === "classic" && o.push({ type: "text", value: `
` }));
    let w = {
      type: "element",
      tagName: "span",
      properties: { class: "line" },
      children: []
    }, A = 0;
    for (const S of y) {
      let k = {
        type: "element",
        tagName: "span",
        properties: {
          ...S.htmlAttrs
        },
        children: [{ type: "text", value: S.content }]
      };
      const R = Bn(S.htmlStyle || Nt(S));
      R && (k.properties.style = R);
      for (const T of i)
        k = ((x = T == null ? void 0 : T.span) == null ? void 0 : x.call(f, k, _ + 1, A, w, S)) || k;
      s === "inline" ? a.children.push(k) : s === "classic" && w.children.push(k), A += S.content.length;
    }
    if (s === "classic") {
      for (const S of i)
        w = ((v = S == null ? void 0 : S.line) == null ? void 0 : v.call(f, w, _ + 1)) || w;
      d.push(w), o.push(w);
    }
  }), s === "classic") {
    for (const y of i)
      u = ((h = y == null ? void 0 : y.code) == null ? void 0 : h.call(f, u)) || u;
    c.children.push(u);
    for (const y of i)
      c = ((C = y == null ? void 0 : y.pre) == null ? void 0 : C.call(f, c)) || c;
    a.children.push(c);
  }
  let p = a;
  for (const y of i)
    p = ((g = y == null ? void 0 : y.root) == null ? void 0 : g.call(f, p)) || p;
  return r && Ut(p, r), p;
}
function vd(t) {
  return t.map((e) => {
    const n = [];
    let r = "", i = 0;
    return e.forEach((o, a) => {
      const l = !(o.fontStyle && (o.fontStyle & G.Underline || o.fontStyle & G.Strikethrough));
      l && o.content.match(/^\s+$/) && e[a + 1] ? (i || (i = o.offset), r += o.content) : r ? (l ? n.push({
        ...o,
        offset: i,
        content: r + o.content
      }) : n.push(
        {
          content: r,
          offset: i
        },
        o
      ), i = 0, r = "") : n.push(o);
    }), n;
  });
}
function Sd(t) {
  return t.map((e) => e.flatMap((n) => {
    if (n.content.match(/^\s+$/))
      return n;
    const r = n.content.match(/^(\s*)(.*?)(\s*)$/);
    if (!r)
      return n;
    const [, i, o, a] = r;
    if (!i && !a)
      return n;
    const s = [{
      ...n,
      offset: n.offset + i.length,
      content: o
    }];
    return i && s.unshift({
      content: i,
      offset: n.offset
    }), a && s.push({
      content: a,
      offset: n.offset + i.length + o.length
    }), s;
  }));
}
function wd(t) {
  return t.map((e) => {
    const n = [];
    for (const r of e) {
      if (n.length === 0) {
        n.push({ ...r });
        continue;
      }
      const i = n[n.length - 1], o = Bn(i.htmlStyle || Nt(i)), a = Bn(r.htmlStyle || Nt(r)), s = i.fontStyle && (i.fontStyle & G.Underline || i.fontStyle & G.Strikethrough), l = r.fontStyle && (r.fontStyle & G.Underline || r.fontStyle & G.Strikethrough);
      !s && !l && o === a ? i.content += r.content : n.push({ ...r });
    }
    return n;
  });
}
const Cd = qu;
function xd(t, e, n) {
  var o;
  const r = {
    meta: {},
    options: n,
    codeToHast: (a, s) => It(t, a, s),
    codeToTokens: (a, s) => Ot(t, a, s)
  };
  let i = Cd(It(t, e, n, r));
  for (const a of Lt(n))
    i = ((o = a.postprocess) == null ? void 0 : o.call(r, i, n)) || i;
  return i;
}
const ii = { light: "#333333", dark: "#bbbbbb" }, oi = { light: "#fffffe", dark: "#1e1e1e" }, ai = "__shiki_resolved";
function pr(t) {
  var s, l, c, u, d;
  if (t != null && t[ai])
    return t;
  const e = {
    ...t
  };
  e.tokenColors && !e.settings && (e.settings = e.tokenColors, delete e.tokenColors), e.type || (e.type = "dark"), e.colorReplacements = { ...e.colorReplacements }, e.settings || (e.settings = []);
  let { bg: n, fg: r } = e;
  if (!n || !r) {
    const f = e.settings ? e.settings.find((p) => !p.name && !p.scope) : void 0;
    (s = f == null ? void 0 : f.settings) != null && s.foreground && (r = f.settings.foreground), (l = f == null ? void 0 : f.settings) != null && l.background && (n = f.settings.background), !r && ((c = e == null ? void 0 : e.colors) != null && c["editor.foreground"]) && (r = e.colors["editor.foreground"]), !n && ((u = e == null ? void 0 : e.colors) != null && u["editor.background"]) && (n = e.colors["editor.background"]), r || (r = e.type === "light" ? ii.light : ii.dark), n || (n = e.type === "light" ? oi.light : oi.dark), e.fg = r, e.bg = n;
  }
  e.settings[0] && e.settings[0].settings && !e.settings[0].scope || e.settings.unshift({
    settings: {
      foreground: e.fg,
      background: e.bg
    }
  });
  let i = 0;
  const o = /* @__PURE__ */ new Map();
  function a(f) {
    var h;
    if (o.has(f))
      return o.get(f);
    i += 1;
    const p = `#${i.toString(16).padStart(8, "0").toLowerCase()}`;
    return (h = e.colorReplacements) != null && h[`#${p}`] ? a(f) : (o.set(f, p), p);
  }
  e.settings = e.settings.map((f) => {
    var g, y;
    const p = ((g = f.settings) == null ? void 0 : g.foreground) && !f.settings.foreground.startsWith("#"), h = ((y = f.settings) == null ? void 0 : y.background) && !f.settings.background.startsWith("#");
    if (!p && !h)
      return f;
    const C = {
      ...f,
      settings: {
        ...f.settings
      }
    };
    if (p) {
      const _ = a(f.settings.foreground);
      e.colorReplacements[_] = f.settings.foreground, C.settings.foreground = _;
    }
    if (h) {
      const _ = a(f.settings.background);
      e.colorReplacements[_] = f.settings.background, C.settings.background = _;
    }
    return C;
  });
  for (const f of Object.keys(e.colors || {}))
    if ((f === "editor.foreground" || f === "editor.background" || f.startsWith("terminal.ansi")) && !((d = e.colors[f]) != null && d.startsWith("#"))) {
      const p = a(e.colors[f]);
      e.colorReplacements[p] = e.colors[f], e.colors[f] = p;
    }
  return Object.defineProperty(e, ai, {
    enumerable: !1,
    writable: !1,
    value: !0
  }), e;
}
async function ca(t) {
  return Array.from(new Set((await Promise.all(
    t.filter((e) => !ra(e)).map(async (e) => await na(e).then((n) => Array.isArray(n) ? n : [n]))
  )).flat()));
}
async function ua(t) {
  return (await Promise.all(
    t.map(
      async (n) => ia(n) ? null : pr(await na(n))
    )
  )).filter((n) => !!n);
}
let kd = 3;
function Ad(t, e = 3) {
  e > kd || console.trace(`[SHIKI DEPRECATE]: ${t}`);
}
let we = class extends Error {
  constructor(e) {
    super(e), this.name = "ShikiError";
  }
};
class Ed extends Nc {
  constructor(n, r, i, o = {}) {
    super(n);
    m(this, "_resolvedThemes", /* @__PURE__ */ new Map());
    m(this, "_resolvedGrammars", /* @__PURE__ */ new Map());
    m(this, "_langMap", /* @__PURE__ */ new Map());
    m(this, "_langGraph", /* @__PURE__ */ new Map());
    m(this, "_textmateThemeCache", /* @__PURE__ */ new WeakMap());
    m(this, "_loadedThemesCache", null);
    m(this, "_loadedLanguagesCache", null);
    this._resolver = n, this._themes = r, this._langs = i, this._alias = o, this._themes.map((a) => this.loadTheme(a)), this.loadLanguages(this._langs);
  }
  getTheme(n) {
    return typeof n == "string" ? this._resolvedThemes.get(n) : this.loadTheme(n);
  }
  loadTheme(n) {
    const r = pr(n);
    return r.name && (this._resolvedThemes.set(r.name, r), this._loadedThemesCache = null), r;
  }
  getLoadedThemes() {
    return this._loadedThemesCache || (this._loadedThemesCache = [...this._resolvedThemes.keys()]), this._loadedThemesCache;
  }
  // Override and re-implement this method to cache the textmate themes as `TextMateTheme.createFromRawTheme`
  // is expensive. Themes can switch often especially for dual-theme support.
  //
  // The parent class also accepts `colorMap` as the second parameter, but since we don't use that,
  // we omit here so it's easier to cache the themes.
  setTheme(n) {
    let r = this._textmateThemeCache.get(n);
    r || (r = xt.createFromRawTheme(n), this._textmateThemeCache.set(n, r)), this._syncRegistry.setTheme(r);
  }
  getGrammar(n) {
    if (this._alias[n]) {
      const r = /* @__PURE__ */ new Set([n]);
      for (; this._alias[n]; ) {
        if (n = this._alias[n], r.has(n))
          throw new we(`Circular alias \`${Array.from(r).join(" -> ")} -> ${n}\``);
        r.add(n);
      }
    }
    return this._resolvedGrammars.get(n);
  }
  loadLanguage(n) {
    var a, s, l, c;
    if (this.getGrammar(n.name))
      return;
    const r = new Set(
      [...this._langMap.values()].filter((u) => {
        var d;
        return (d = u.embeddedLangsLazy) == null ? void 0 : d.includes(n.name);
      })
    );
    this._resolver.addLanguage(n);
    const i = {
      balancedBracketSelectors: n.balancedBracketSelectors || ["*"],
      unbalancedBracketSelectors: n.unbalancedBracketSelectors || []
    };
    this._syncRegistry._rawGrammars.set(n.scopeName, n);
    const o = this.loadGrammarWithConfiguration(n.scopeName, 1, i);
    if (o.name = n.name, this._resolvedGrammars.set(n.name, o), n.aliases && n.aliases.forEach((u) => {
      this._alias[u] = n.name;
    }), this._loadedLanguagesCache = null, r.size)
      for (const u of r)
        this._resolvedGrammars.delete(u.name), this._loadedLanguagesCache = null, (s = (a = this._syncRegistry) == null ? void 0 : a._injectionGrammars) == null || s.delete(u.scopeName), (c = (l = this._syncRegistry) == null ? void 0 : l._grammars) == null || c.delete(u.scopeName), this.loadLanguage(this._langMap.get(u.name));
  }
  dispose() {
    super.dispose(), this._resolvedThemes.clear(), this._resolvedGrammars.clear(), this._langMap.clear(), this._langGraph.clear(), this._loadedThemesCache = null;
  }
  loadLanguages(n) {
    for (const o of n)
      this.resolveEmbeddedLanguages(o);
    const r = Array.from(this._langGraph.entries()), i = r.filter(([o, a]) => !a);
    if (i.length) {
      const o = r.filter(([a, s]) => {
        var l;
        return s && ((l = s.embeddedLangs) == null ? void 0 : l.some((c) => i.map(([u]) => u).includes(c)));
      }).filter((a) => !i.includes(a));
      throw new we(`Missing languages ${i.map(([a]) => `\`${a}\``).join(", ")}, required by ${o.map(([a]) => `\`${a}\``).join(", ")}`);
    }
    for (const [o, a] of r)
      this._resolver.addLanguage(a);
    for (const [o, a] of r)
      this.loadLanguage(a);
  }
  getLoadedLanguages() {
    return this._loadedLanguagesCache || (this._loadedLanguagesCache = [
      .../* @__PURE__ */ new Set([...this._resolvedGrammars.keys(), ...Object.keys(this._alias)])
    ]), this._loadedLanguagesCache;
  }
  resolveEmbeddedLanguages(n) {
    if (this._langMap.set(n.name, n), this._langGraph.set(n.name, n), n.embeddedLangs)
      for (const r of n.embeddedLangs)
        this._langGraph.set(r, this._langMap.get(r));
  }
}
class Td {
  constructor(e, n) {
    m(this, "_langs", /* @__PURE__ */ new Map());
    m(this, "_scopeToLang", /* @__PURE__ */ new Map());
    m(this, "_injections", /* @__PURE__ */ new Map());
    m(this, "_onigLib");
    this._onigLib = {
      createOnigScanner: (r) => e.createScanner(r),
      createOnigString: (r) => e.createString(r)
    }, n.forEach((r) => this.addLanguage(r));
  }
  get onigLib() {
    return this._onigLib;
  }
  getLangRegistration(e) {
    return this._langs.get(e);
  }
  loadGrammar(e) {
    return this._scopeToLang.get(e);
  }
  addLanguage(e) {
    this._langs.set(e.name, e), e.aliases && e.aliases.forEach((n) => {
      this._langs.set(n, e);
    }), this._scopeToLang.set(e.scopeName, e), e.injectTo && e.injectTo.forEach((n) => {
      this._injections.get(n) || this._injections.set(n, []), this._injections.get(n).push(e.scopeName);
    });
  }
  getInjections(e) {
    const n = e.split(".");
    let r = [];
    for (let i = 1; i <= n.length; i++) {
      const o = n.slice(0, i).join(".");
      r = [...r, ...this._injections.get(o) || []];
    }
    return r;
  }
}
let $e = 0;
function Rd(t) {
  $e += 1, t.warnings !== !1 && $e >= 10 && $e % 10 === 0 && console.warn(`[Shiki] ${$e} instances have been created. Shiki is supposed to be used as a singleton, consider refactoring your code to cache your highlighter instance; Or call \`highlighter.dispose()\` to release unused instances.`);
  let e = !1;
  if (!t.engine)
    throw new we("`engine` option is required for synchronous mode");
  const n = (t.langs || []).flat(1), r = (t.themes || []).flat(1).map(pr), i = new Td(t.engine, n), o = new Ed(i, r, n, t.langAlias);
  let a;
  function s(_) {
    g();
    const w = o.getGrammar(typeof _ == "string" ? _ : _.name);
    if (!w)
      throw new we(`Language \`${_}\` not found, you may need to load it first`);
    return w;
  }
  function l(_) {
    if (_ === "none")
      return { bg: "", fg: "", name: "none", settings: [], type: "dark" };
    g();
    const w = o.getTheme(_);
    if (!w)
      throw new we(`Theme \`${_}\` not found, you may need to load it first`);
    return w;
  }
  function c(_) {
    g();
    const w = l(_);
    a !== _ && (o.setTheme(w), a = _);
    const A = o.getColorMap();
    return {
      theme: w,
      colorMap: A
    };
  }
  function u() {
    return g(), o.getLoadedThemes();
  }
  function d() {
    return g(), o.getLoadedLanguages();
  }
  function f(..._) {
    g(), o.loadLanguages(_.flat(1));
  }
  async function p(..._) {
    return f(await ca(_));
  }
  function h(..._) {
    g();
    for (const w of _.flat(1))
      o.loadTheme(w);
  }
  async function C(..._) {
    return g(), h(await ua(_));
  }
  function g() {
    if (e)
      throw new we("Shiki instance has been disposed");
  }
  function y() {
    e || (e = !0, o.dispose(), $e -= 1);
  }
  return {
    setTheme: c,
    getTheme: l,
    getLanguage: s,
    getLoadedThemes: u,
    getLoadedLanguages: d,
    loadLanguage: p,
    loadLanguageSync: f,
    loadTheme: C,
    loadThemeSync: h,
    dispose: y,
    [Symbol.dispose]: y
  };
}
async function Nd(t) {
  t.engine || Ad("`engine` option is required. Use `createOnigurumaEngine` or `createJavaScriptRegexEngine` to create an engine.");
  const [
    e,
    n,
    r
  ] = await Promise.all([
    ua(t.themes || []),
    ca(t.langs || []),
    t.engine
  ]);
  return Rd({
    ...t,
    themes: e,
    langs: n,
    engine: r
  });
}
async function Ld(t) {
  const e = await Nd(t);
  return {
    getLastGrammarState: (...n) => fd(e, ...n),
    codeToTokensBase: (n, r) => fr(e, n, r),
    codeToTokensWithThemes: (n, r) => la(e, n, r),
    codeToTokens: (n, r) => Ot(e, n, r),
    codeToHast: (n, r) => It(e, n, r),
    codeToHtml: (n, r) => xd(e, n, r),
    getBundledLanguages: () => ({}),
    getBundledThemes: () => ({}),
    ...e,
    getInternalContext: () => e
  };
}
function Pd(t) {
  const e = t.langs, n = t.themes, r = t.engine;
  async function i(o) {
    function a(d) {
      var f;
      if (typeof d == "string") {
        if (ra(d))
          return [];
        d = ((f = o.langAlias) == null ? void 0 : f[d]) || d;
        const p = e[d];
        if (!p)
          throw new I(`Language \`${d}\` is not included in this bundle. You may want to load it from external source.`);
        return p;
      }
      return d;
    }
    function s(d) {
      if (ia(d))
        return "none";
      if (typeof d == "string") {
        const f = n[d];
        if (!f)
          throw new I(`Theme \`${d}\` is not included in this bundle. You may want to load it from external source.`);
        return f;
      }
      return d;
    }
    const l = (o.themes ?? []).map((d) => s(d)), c = (o.langs ?? []).map((d) => a(d)), u = await Ld({
      engine: o.engine ?? r(),
      ...o,
      themes: l,
      langs: c
    });
    return {
      ...u,
      loadLanguage(...d) {
        return u.loadLanguage(...d.map(a));
      },
      loadTheme(...d) {
        return u.loadTheme(...d.map(s));
      },
      getBundledLanguages() {
        return e;
      },
      getBundledThemes() {
        return n;
      }
    };
  }
  return i;
}
function Od(t) {
  let e;
  async function n(r = {}) {
    if (e) {
      const i = await e;
      return await Promise.all([
        i.loadTheme(...r.themes || []),
        i.loadLanguage(...r.langs || [])
      ]), i;
    } else
      return e = t({
        ...r,
        themes: r.themes || [],
        langs: r.langs || []
      }), e;
  }
  return n;
}
function Id(t, e) {
  const n = Od(t);
  async function r(i, o) {
    var l;
    const a = await n({
      langs: [o.lang],
      themes: "theme" in o ? [o.theme] : Object.values(o.themes)
    }), s = await ((l = e == null ? void 0 : e.guessEmbeddedLanguages) == null ? void 0 : l.call(e, i, o.lang, a));
    return s && await a.loadLanguage(...s), a;
  }
  return {
    getSingletonHighlighter(i) {
      return n(i);
    },
    async codeToHtml(i, o) {
      return (await r(i, o)).codeToHtml(i, o);
    },
    async codeToHast(i, o) {
      return (await r(i, o)).codeToHast(i, o);
    },
    async codeToTokens(i, o) {
      return (await r(i, o)).codeToTokens(i, o);
    },
    async codeToTokensBase(i, o) {
      return (await r(i, o)).codeToTokensBase(i, o);
    },
    async codeToTokensWithThemes(i, o) {
      return (await r(i, o)).codeToTokensWithThemes(i, o);
    },
    async getLastGrammarState(i, o) {
      return (await n({
        langs: [o.lang],
        themes: [o.theme]
      })).getLastGrammarState(i, o);
    }
  };
}
const da = [
  {
    id: "abap",
    name: "ABAP",
    import: () => import("./abap-Y8Dl9g_6.js")
  },
  {
    id: "actionscript-3",
    name: "ActionScript",
    import: () => import("./actionscript-3-DZzbMeqX.js")
  },
  {
    id: "ada",
    name: "Ada",
    import: () => import("./ada-vP6ak0IW.js")
  },
  {
    id: "angular-html",
    name: "Angular HTML",
    import: () => import("./angular-html-BmadGEgW.js").then((t) => t.f)
  },
  {
    id: "angular-ts",
    name: "Angular TypeScript",
    import: () => import("./angular-ts-D-QQnnGT.js")
  },
  {
    id: "apache",
    name: "Apache Conf",
    import: () => import("./apache-BUjz-sD2.js")
  },
  {
    id: "apex",
    name: "Apex",
    import: () => import("./apex-D_wPycVx.js")
  },
  {
    id: "apl",
    name: "APL",
    import: () => import("./apl-sitt7C8I.js")
  },
  {
    id: "applescript",
    name: "AppleScript",
    import: () => import("./applescript-BPx7YFFu.js")
  },
  {
    id: "ara",
    name: "Ara",
    import: () => import("./ara-Z2fSOxSw.js")
  },
  {
    id: "asciidoc",
    name: "AsciiDoc",
    aliases: [
      "adoc"
    ],
    import: () => import("./asciidoc-CZ3ccj42.js")
  },
  {
    id: "asm",
    name: "Assembly",
    import: () => import("./asm-BTWLY5ym.js")
  },
  {
    id: "astro",
    name: "Astro",
    import: () => import("./astro-DHnp0xIo.js")
  },
  {
    id: "awk",
    name: "AWK",
    import: () => import("./awk-Fb0P9dkn.js")
  },
  {
    id: "ballerina",
    name: "Ballerina",
    import: () => import("./ballerina-oZK-YekG.js")
  },
  {
    id: "bat",
    name: "Batch File",
    aliases: [
      "batch"
    ],
    import: () => import("./bat-0FvbqU9S.js")
  },
  {
    id: "beancount",
    name: "Beancount",
    import: () => import("./beancount-DEfTbbFX.js")
  },
  {
    id: "berry",
    name: "Berry",
    aliases: [
      "be"
    ],
    import: () => import("./berry-PwsHPR_K.js")
  },
  {
    id: "bibtex",
    name: "BibTeX",
    import: () => import("./bibtex-EULQRLY5.js")
  },
  {
    id: "bicep",
    name: "Bicep",
    import: () => import("./bicep-DFU2oTl7.js")
  },
  {
    id: "blade",
    name: "Blade",
    import: () => import("./blade-OPzGcV14.js")
  },
  {
    id: "bsl",
    name: "1C (Enterprise)",
    aliases: [
      "1c"
    ],
    import: () => import("./bsl-NkNNwerW.js")
  },
  {
    id: "c",
    name: "C",
    import: () => import("./c-eeMepfLm.js")
  },
  {
    id: "cadence",
    name: "Cadence",
    aliases: [
      "cdc"
    ],
    import: () => import("./cadence-DMRWHJp4.js")
  },
  {
    id: "cairo",
    name: "Cairo",
    import: () => import("./cairo-DM6WF2e3.js")
  },
  {
    id: "clarity",
    name: "Clarity",
    import: () => import("./clarity-BseSxcHx.js")
  },
  {
    id: "clojure",
    name: "Clojure",
    aliases: [
      "clj"
    ],
    import: () => import("./clojure-CXJfHrL3.js")
  },
  {
    id: "cmake",
    name: "CMake",
    import: () => import("./cmake-BJz8BOTU.js")
  },
  {
    id: "cobol",
    name: "COBOL",
    import: () => import("./cobol-4A8XjHhj.js")
  },
  {
    id: "codeowners",
    name: "CODEOWNERS",
    import: () => import("./codeowners-Bt9yU6NX.js")
  },
  {
    id: "codeql",
    name: "CodeQL",
    aliases: [
      "ql"
    ],
    import: () => import("./codeql-DHkodjjI.js")
  },
  {
    id: "coffee",
    name: "CoffeeScript",
    aliases: [
      "coffeescript"
    ],
    import: () => import("./coffee-Dl27lzbd.js")
  },
  {
    id: "common-lisp",
    name: "Common Lisp",
    aliases: [
      "lisp"
    ],
    import: () => import("./common-lisp-EVqT9Zhp.js")
  },
  {
    id: "coq",
    name: "Coq",
    import: () => import("./coq-B0L9upzn.js")
  },
  {
    id: "cpp",
    name: "C++",
    aliases: [
      "c++"
    ],
    import: () => import("./cpp-Cj177cuW.js")
  },
  {
    id: "crystal",
    name: "Crystal",
    import: () => import("./crystal-ymVvJzbZ.js")
  },
  {
    id: "csharp",
    name: "C#",
    aliases: [
      "c#",
      "cs"
    ],
    import: () => import("./csharp-DmxfTLWR.js")
  },
  {
    id: "css",
    name: "CSS",
    import: () => import("./css-CECN5uSL.js")
  },
  {
    id: "csv",
    name: "CSV",
    import: () => import("./csv-CmYOceLb.js")
  },
  {
    id: "cue",
    name: "CUE",
    import: () => import("./cue-ZzumE7IT.js")
  },
  {
    id: "cypher",
    name: "Cypher",
    aliases: [
      "cql"
    ],
    import: () => import("./cypher-jpdmjtA6.js")
  },
  {
    id: "d",
    name: "D",
    import: () => import("./d-CBagWSwH.js")
  },
  {
    id: "dart",
    name: "Dart",
    import: () => import("./dart-6ObCrKr9.js")
  },
  {
    id: "dax",
    name: "DAX",
    import: () => import("./dax-CcDT-8dH.js")
  },
  {
    id: "desktop",
    name: "Desktop",
    import: () => import("./desktop-B93p9R9O.js")
  },
  {
    id: "diff",
    name: "Diff",
    import: () => import("./diff-BxzP2J8R.js")
  },
  {
    id: "docker",
    name: "Dockerfile",
    aliases: [
      "dockerfile"
    ],
    import: () => import("./docker-CsHqm9tx.js")
  },
  {
    id: "dotenv",
    name: "dotEnv",
    import: () => import("./dotenv-BMjVjUL1.js")
  },
  {
    id: "dream-maker",
    name: "Dream Maker",
    import: () => import("./dream-maker-PAx17jaB.js")
  },
  {
    id: "edge",
    name: "Edge",
    import: () => import("./edge-_LvgTcmu.js")
  },
  {
    id: "elixir",
    name: "Elixir",
    import: () => import("./elixir-BTCUAmQk.js")
  },
  {
    id: "elm",
    name: "Elm",
    import: () => import("./elm-BtNbw_Cd.js")
  },
  {
    id: "emacs-lisp",
    name: "Emacs Lisp",
    aliases: [
      "elisp"
    ],
    import: () => import("./emacs-lisp-Cfxdx5D-.js")
  },
  {
    id: "erb",
    name: "ERB",
    import: () => import("./erb-D0PIpZCP.js")
  },
  {
    id: "erlang",
    name: "Erlang",
    aliases: [
      "erl"
    ],
    import: () => import("./erlang-xM7DPKQj.js")
  },
  {
    id: "fennel",
    name: "Fennel",
    import: () => import("./fennel-N4WcXuKx.js")
  },
  {
    id: "fish",
    name: "Fish",
    import: () => import("./fish-B6QqlqeT.js")
  },
  {
    id: "fluent",
    name: "Fluent",
    aliases: [
      "ftl"
    ],
    import: () => import("./fluent-BMXUxfv1.js")
  },
  {
    id: "fortran-fixed-form",
    name: "Fortran (Fixed Form)",
    aliases: [
      "f",
      "for",
      "f77"
    ],
    import: () => import("./fortran-fixed-form-DUsA-VGo.js")
  },
  {
    id: "fortran-free-form",
    name: "Fortran (Free Form)",
    aliases: [
      "f90",
      "f95",
      "f03",
      "f08",
      "f18"
    ],
    import: () => import("./fortran-free-form-DPIT_jbP.js")
  },
  {
    id: "fsharp",
    name: "F#",
    aliases: [
      "f#",
      "fs"
    ],
    import: () => import("./fsharp-BWendqAn.js")
  },
  {
    id: "gdresource",
    name: "GDResource",
    import: () => import("./gdresource-DLfsylRW.js")
  },
  {
    id: "gdscript",
    name: "GDScript",
    import: () => import("./gdscript-9lm8qppb.js")
  },
  {
    id: "gdshader",
    name: "GDShader",
    import: () => import("./gdshader-Bk8fF6yr.js")
  },
  {
    id: "genie",
    name: "Genie",
    import: () => import("./genie-DzUvd7U9.js")
  },
  {
    id: "gherkin",
    name: "Gherkin",
    import: () => import("./gherkin-DHRaV0YP.js")
  },
  {
    id: "git-commit",
    name: "Git Commit Message",
    import: () => import("./git-commit-Bd32YZ0K.js")
  },
  {
    id: "git-rebase",
    name: "Git Rebase Message",
    import: () => import("./git-rebase-ZWUFO_T4.js")
  },
  {
    id: "gleam",
    name: "Gleam",
    import: () => import("./gleam-Bv284lvN.js")
  },
  {
    id: "glimmer-js",
    name: "Glimmer JS",
    aliases: [
      "gjs"
    ],
    import: () => import("./glimmer-js-CkxRszZZ.js")
  },
  {
    id: "glimmer-ts",
    name: "Glimmer TS",
    aliases: [
      "gts"
    ],
    import: () => import("./glimmer-ts-Bi6BYQCn.js")
  },
  {
    id: "glsl",
    name: "GLSL",
    import: () => import("./glsl-CkUcVZNK.js")
  },
  {
    id: "gnuplot",
    name: "Gnuplot",
    import: () => import("./gnuplot-yPG9-sE_.js")
  },
  {
    id: "go",
    name: "Go",
    import: () => import("./go-ChxJuLYK.js")
  },
  {
    id: "graphql",
    name: "GraphQL",
    aliases: [
      "gql"
    ],
    import: () => import("./graphql-BLaPX4fU.js")
  },
  {
    id: "groovy",
    name: "Groovy",
    import: () => import("./groovy-CJQTphOW.js")
  },
  {
    id: "hack",
    name: "Hack",
    import: () => import("./hack-Bx1jMtBC.js")
  },
  {
    id: "haml",
    name: "Ruby Haml",
    import: () => import("./haml-6FagfhCM.js")
  },
  {
    id: "handlebars",
    name: "Handlebars",
    aliases: [
      "hbs"
    ],
    import: () => import("./handlebars-Bd5Y4M6I.js")
  },
  {
    id: "haskell",
    name: "Haskell",
    aliases: [
      "hs"
    ],
    import: () => import("./haskell-WeIwNIP6.js")
  },
  {
    id: "haxe",
    name: "Haxe",
    import: () => import("./haxe-TztHsm5T.js")
  },
  {
    id: "hcl",
    name: "HashiCorp HCL",
    import: () => import("./hcl-D438OF-I.js")
  },
  {
    id: "hjson",
    name: "Hjson",
    import: () => import("./hjson-DYBUbqOl.js")
  },
  {
    id: "hlsl",
    name: "HLSL",
    import: () => import("./hlsl-Bk8TCZNL.js")
  },
  {
    id: "html",
    name: "HTML",
    import: () => import("./html-7XVNRwN7.js")
  },
  {
    id: "html-derivative",
    name: "HTML (Derivative)",
    import: () => import("./html-derivative-BNxZ5Yf6.js")
  },
  {
    id: "http",
    name: "HTTP",
    import: () => import("./http-WC357zBG.js")
  },
  {
    id: "hxml",
    name: "HXML",
    import: () => import("./hxml-GbqSQCLa.js")
  },
  {
    id: "hy",
    name: "Hy",
    import: () => import("./hy-Brt5EZ7-.js")
  },
  {
    id: "imba",
    name: "Imba",
    import: () => import("./imba-CimUv-Uh.js")
  },
  {
    id: "ini",
    name: "INI",
    aliases: [
      "properties"
    ],
    import: () => import("./ini-BZIuRIvJ.js")
  },
  {
    id: "java",
    name: "Java",
    import: () => import("./java-DY6VlHhP.js")
  },
  {
    id: "javascript",
    name: "JavaScript",
    aliases: [
      "js"
    ],
    import: () => import("./javascript-Dp1Jmi5H.js")
  },
  {
    id: "jinja",
    name: "Jinja",
    import: () => import("./jinja-WEhOU5ES.js")
  },
  {
    id: "jison",
    name: "Jison",
    import: () => import("./jison-c2JI40PB.js")
  },
  {
    id: "json",
    name: "JSON",
    import: () => import("./json-DxJze_jm.js")
  },
  {
    id: "json5",
    name: "JSON5",
    import: () => import("./json5-BT4Fjg39.js")
  },
  {
    id: "jsonc",
    name: "JSON with Comments",
    import: () => import("./jsonc-CHjZD8gR.js")
  },
  {
    id: "jsonl",
    name: "JSON Lines",
    import: () => import("./jsonl-BGuvDmy9.js")
  },
  {
    id: "jsonnet",
    name: "Jsonnet",
    import: () => import("./jsonnet-Bx2cfsXg.js")
  },
  {
    id: "jssm",
    name: "JSSM",
    aliases: [
      "fsl"
    ],
    import: () => import("./jssm-BcADi6EI.js")
  },
  {
    id: "jsx",
    name: "JSX",
    import: () => import("./jsx-BtKADgXT.js")
  },
  {
    id: "julia",
    name: "Julia",
    aliases: [
      "jl"
    ],
    import: () => import("./julia-DcoDQokW.js")
  },
  {
    id: "kotlin",
    name: "Kotlin",
    aliases: [
      "kt",
      "kts"
    ],
    import: () => import("./kotlin-ByBMgTeR.js")
  },
  {
    id: "kusto",
    name: "Kusto",
    aliases: [
      "kql"
    ],
    import: () => import("./kusto-VWFLl2T0.js")
  },
  {
    id: "latex",
    name: "LaTeX",
    import: () => import("./latex-B1tlHE-u.js")
  },
  {
    id: "lean",
    name: "Lean 4",
    aliases: [
      "lean4"
    ],
    import: () => import("./lean-DXqEE_d1.js")
  },
  {
    id: "less",
    name: "Less",
    import: () => import("./less-B1GLI2Di.js")
  },
  {
    id: "liquid",
    name: "Liquid",
    import: () => import("./liquid-3HHuHOZ2.js")
  },
  {
    id: "llvm",
    name: "LLVM IR",
    import: () => import("./llvm-6RQLId6G.js")
  },
  {
    id: "log",
    name: "Log file",
    import: () => import("./log-Al8wyEFV.js")
  },
  {
    id: "logo",
    name: "Logo",
    import: () => import("./logo-DBa4JDzV.js")
  },
  {
    id: "lua",
    name: "Lua",
    import: () => import("./lua-kX5WP_P5.js")
  },
  {
    id: "luau",
    name: "Luau",
    import: () => import("./luau-BeoZWRh5.js")
  },
  {
    id: "make",
    name: "Makefile",
    aliases: [
      "makefile"
    ],
    import: () => import("./make-CsMclxtr.js")
  },
  {
    id: "markdown",
    name: "Markdown",
    aliases: [
      "md"
    ],
    import: () => import("./markdown-CiI2E98D.js")
  },
  {
    id: "marko",
    name: "Marko",
    import: () => import("./marko-BzENEf4R.js")
  },
  {
    id: "matlab",
    name: "MATLAB",
    import: () => import("./matlab-BOAaUVP0.js")
  },
  {
    id: "mdc",
    name: "MDC",
    import: () => import("./mdc-DPBWa7dN.js")
  },
  {
    id: "mdx",
    name: "MDX",
    import: () => import("./mdx-BOhZZUJ8.js")
  },
  {
    id: "mermaid",
    name: "Mermaid",
    aliases: [
      "mmd"
    ],
    import: () => import("./mermaid-B0ixDHKN.js")
  },
  {
    id: "mipsasm",
    name: "MIPS Assembly",
    aliases: [
      "mips"
    ],
    import: () => import("./mipsasm-CTx18fBl.js")
  },
  {
    id: "mojo",
    name: "Mojo",
    import: () => import("./mojo-BD611d7o.js")
  },
  {
    id: "move",
    name: "Move",
    import: () => import("./move-653S600C.js")
  },
  {
    id: "narrat",
    name: "Narrat Language",
    aliases: [
      "nar"
    ],
    import: () => import("./narrat-DmhDCBs-.js")
  },
  {
    id: "nextflow",
    name: "Nextflow",
    aliases: [
      "nf"
    ],
    import: () => import("./nextflow-D1Zd9cNl.js")
  },
  {
    id: "nginx",
    name: "Nginx",
    import: () => import("./nginx-5vhPAEw3.js")
  },
  {
    id: "nim",
    name: "Nim",
    import: () => import("./nim-Fi8wNe6i.js")
  },
  {
    id: "nix",
    name: "Nix",
    import: () => import("./nix-ceY58Dty.js")
  },
  {
    id: "nushell",
    name: "nushell",
    aliases: [
      "nu"
    ],
    import: () => import("./nushell-Be2rueDv.js")
  },
  {
    id: "objective-c",
    name: "Objective-C",
    aliases: [
      "objc"
    ],
    import: () => import("./objective-c-Itk8tzmv.js")
  },
  {
    id: "objective-cpp",
    name: "Objective-C++",
    import: () => import("./objective-cpp-DGt5UKRO.js")
  },
  {
    id: "ocaml",
    name: "OCaml",
    import: () => import("./ocaml-eSVK32Eg.js")
  },
  {
    id: "pascal",
    name: "Pascal",
    import: () => import("./pascal-xy8pJNns.js")
  },
  {
    id: "perl",
    name: "Perl",
    import: () => import("./perl-BoEn6HmT.js")
  },
  {
    id: "php",
    name: "PHP",
    import: () => import("./php-BRU9zhoN.js")
  },
  {
    id: "plsql",
    name: "PL/SQL",
    import: () => import("./plsql-pVbGZfOv.js")
  },
  {
    id: "po",
    name: "Gettext PO",
    aliases: [
      "pot",
      "potx"
    ],
    import: () => import("./po-BNfHvqmm.js")
  },
  {
    id: "polar",
    name: "Polar",
    import: () => import("./polar-CAZahv3u.js")
  },
  {
    id: "postcss",
    name: "PostCSS",
    import: () => import("./postcss-05aHdL-n.js")
  },
  {
    id: "powerquery",
    name: "PowerQuery",
    import: () => import("./powerquery-DI9HkTvs.js")
  },
  {
    id: "powershell",
    name: "PowerShell",
    aliases: [
      "ps",
      "ps1"
    ],
    import: () => import("./powershell-Clc4ydu-.js")
  },
  {
    id: "prisma",
    name: "Prisma",
    import: () => import("./prisma-FZjmVtSl.js")
  },
  {
    id: "prolog",
    name: "Prolog",
    import: () => import("./prolog-C5-yg4TO.js")
  },
  {
    id: "proto",
    name: "Protocol Buffer 3",
    aliases: [
      "protobuf"
    ],
    import: () => import("./proto-MmCPeFAD.js")
  },
  {
    id: "pug",
    name: "Pug",
    aliases: [
      "jade"
    ],
    import: () => import("./pug-CJWI-qSo.js")
  },
  {
    id: "puppet",
    name: "Puppet",
    import: () => import("./puppet-CUJHmnxV.js")
  },
  {
    id: "purescript",
    name: "PureScript",
    import: () => import("./purescript-CTuz6_OV.js")
  },
  {
    id: "python",
    name: "Python",
    aliases: [
      "py"
    ],
    import: () => import("./python-BFNSHbwJ.js")
  },
  {
    id: "qml",
    name: "QML",
    import: () => import("./qml-D3ATcgGh.js")
  },
  {
    id: "qmldir",
    name: "QML Directory",
    import: () => import("./qmldir-BInDYbpo.js")
  },
  {
    id: "qss",
    name: "Qt Style Sheets",
    import: () => import("./qss-AeJTysr_.js")
  },
  {
    id: "r",
    name: "R",
    import: () => import("./r-Bm0uF0U2.js")
  },
  {
    id: "racket",
    name: "Racket",
    import: () => import("./racket-B83wSAja.js")
  },
  {
    id: "raku",
    name: "Raku",
    aliases: [
      "perl6"
    ],
    import: () => import("./raku-nEQ4ZJJ7.js")
  },
  {
    id: "razor",
    name: "ASP.NET Razor",
    import: () => import("./razor-BPFYEoc9.js")
  },
  {
    id: "reg",
    name: "Windows Registry Script",
    import: () => import("./reg-m_s_Kiip.js")
  },
  {
    id: "regexp",
    name: "RegExp",
    aliases: [
      "regex"
    ],
    import: () => import("./regexp-BazyLpPg.js")
  },
  {
    id: "rel",
    name: "Rel",
    import: () => import("./rel-BcRfyd6Q.js")
  },
  {
    id: "riscv",
    name: "RISC-V",
    import: () => import("./riscv-Ce8MAQLP.js")
  },
  {
    id: "rst",
    name: "reStructuredText",
    import: () => import("./rst-B6mPMsKo.js")
  },
  {
    id: "ruby",
    name: "Ruby",
    aliases: [
      "rb"
    ],
    import: () => import("./ruby-DInklMmU.js")
  },
  {
    id: "rust",
    name: "Rust",
    aliases: [
      "rs"
    ],
    import: () => import("./rust-CLzF9zIN.js")
  },
  {
    id: "sas",
    name: "SAS",
    import: () => import("./sas-fpEvgATw.js")
  },
  {
    id: "sass",
    name: "Sass",
    import: () => import("./sass-DxHp5rTx.js")
  },
  {
    id: "scala",
    name: "Scala",
    import: () => import("./scala-D4grkFkl.js")
  },
  {
    id: "scheme",
    name: "Scheme",
    import: () => import("./scheme-BCRWuEm4.js")
  },
  {
    id: "scss",
    name: "SCSS",
    import: () => import("./scss-B1FaCqwR.js")
  },
  {
    id: "sdbl",
    name: "1C (Query)",
    aliases: [
      "1c-query"
    ],
    import: () => import("./sdbl-B7T8abf4.js")
  },
  {
    id: "shaderlab",
    name: "ShaderLab",
    aliases: [
      "shader"
    ],
    import: () => import("./shaderlab-Cr62-Wb4.js")
  },
  {
    id: "shellscript",
    name: "Shell",
    aliases: [
      "bash",
      "sh",
      "shell",
      "zsh"
    ],
    import: () => import("./shellscript-InADTalH.js")
  },
  {
    id: "shellsession",
    name: "Shell Session",
    aliases: [
      "console"
    ],
    import: () => import("./shellsession-DiDJNQdy.js")
  },
  {
    id: "smalltalk",
    name: "Smalltalk",
    import: () => import("./smalltalk-BlI1_OkM.js")
  },
  {
    id: "solidity",
    name: "Solidity",
    import: () => import("./solidity-CneOhxmR.js")
  },
  {
    id: "soy",
    name: "Closure Templates",
    aliases: [
      "closure-templates"
    ],
    import: () => import("./soy-LybuU3Y_.js")
  },
  {
    id: "sparql",
    name: "SPARQL",
    import: () => import("./sparql-B0KWFEri.js")
  },
  {
    id: "splunk",
    name: "Splunk Query Language",
    aliases: [
      "spl"
    ],
    import: () => import("./splunk-CRXR8A9s.js")
  },
  {
    id: "sql",
    name: "SQL",
    import: () => import("./sql-Cn_v3PB0.js")
  },
  {
    id: "ssh-config",
    name: "SSH Config",
    import: () => import("./ssh-config-DP-hNVbF.js")
  },
  {
    id: "stata",
    name: "Stata",
    import: () => import("./stata-B8c5fTjX.js")
  },
  {
    id: "stylus",
    name: "Stylus",
    aliases: [
      "styl"
    ],
    import: () => import("./stylus-CyKEU1Ej.js")
  },
  {
    id: "svelte",
    name: "Svelte",
    import: () => import("./svelte-BjDUPxZ1.js")
  },
  {
    id: "swift",
    name: "Swift",
    import: () => import("./swift-Cu-y7Uk9.js")
  },
  {
    id: "system-verilog",
    name: "SystemVerilog",
    import: () => import("./system-verilog-BCm7smPJ.js")
  },
  {
    id: "systemd",
    name: "Systemd Units",
    import: () => import("./systemd-C-4qm6XH.js")
  },
  {
    id: "talonscript",
    name: "TalonScript",
    aliases: [
      "talon"
    ],
    import: () => import("./talonscript-CFF3LF_O.js")
  },
  {
    id: "tasl",
    name: "Tasl",
    import: () => import("./tasl-Cg_WBUAe.js")
  },
  {
    id: "tcl",
    name: "Tcl",
    import: () => import("./tcl-DN7buRTF.js")
  },
  {
    id: "templ",
    name: "Templ",
    import: () => import("./templ-D1e9ljln.js")
  },
  {
    id: "terraform",
    name: "Terraform",
    aliases: [
      "tf",
      "tfvars"
    ],
    import: () => import("./terraform-DGvcn9zM.js")
  },
  {
    id: "tex",
    name: "TeX",
    import: () => import("./tex-CmrLTxbG.js")
  },
  {
    id: "toml",
    name: "TOML",
    import: () => import("./toml-DY62mUL_.js")
  },
  {
    id: "ts-tags",
    name: "TypeScript with Tags",
    aliases: [
      "lit"
    ],
    import: () => import("./ts-tags-CZMzuZh-.js")
  },
  {
    id: "tsv",
    name: "TSV",
    import: () => import("./tsv-BtvSkaG0.js")
  },
  {
    id: "tsx",
    name: "TSX",
    import: () => import("./tsx-B8rCNbgL.js")
  },
  {
    id: "turtle",
    name: "Turtle",
    import: () => import("./turtle-_H59FV7D.js")
  },
  {
    id: "twig",
    name: "Twig",
    import: () => import("./twig-GjIxYqCX.js")
  },
  {
    id: "typescript",
    name: "TypeScript",
    aliases: [
      "ts"
    ],
    import: () => import("./typescript-mg6ATTE8.js")
  },
  {
    id: "typespec",
    name: "TypeSpec",
    aliases: [
      "tsp"
    ],
    import: () => import("./typespec-Djmco60m.js")
  },
  {
    id: "typst",
    name: "Typst",
    aliases: [
      "typ"
    ],
    import: () => import("./typst-D_1QKWns.js")
  },
  {
    id: "v",
    name: "V",
    import: () => import("./v-BW14IZv7.js")
  },
  {
    id: "vala",
    name: "Vala",
    import: () => import("./vala-uxaPR7d1.js")
  },
  {
    id: "vb",
    name: "Visual Basic",
    aliases: [
      "cmd"
    ],
    import: () => import("./vb-D8_c5-KN.js")
  },
  {
    id: "verilog",
    name: "Verilog",
    import: () => import("./verilog-B-bybjPF.js")
  },
  {
    id: "vhdl",
    name: "VHDL",
    import: () => import("./vhdl-CUlNa8ac.js")
  },
  {
    id: "viml",
    name: "Vim Script",
    aliases: [
      "vim",
      "vimscript"
    ],
    import: () => import("./viml-DsfA-sWm.js")
  },
  {
    id: "vue",
    name: "Vue",
    import: () => import("./vue-D-ba2-Rx.js")
  },
  {
    id: "vue-html",
    name: "Vue HTML",
    import: () => import("./vue-html-Dn2ZoOSz.js")
  },
  {
    id: "vue-vine",
    name: "Vue Vine",
    import: () => import("./vue-vine-Jmfkm6lF.js")
  },
  {
    id: "vyper",
    name: "Vyper",
    aliases: [
      "vy"
    ],
    import: () => import("./vyper-CPQuu50u.js")
  },
  {
    id: "wasm",
    name: "WebAssembly",
    import: () => import("./wasm-BBXxrAl7.js")
  },
  {
    id: "wenyan",
    name: "Wenyan",
    aliases: [
      "文言"
    ],
    import: () => import("./wenyan-pbVjoM9_.js")
  },
  {
    id: "wgsl",
    name: "WGSL",
    import: () => import("./wgsl-DY4iK1q1.js")
  },
  {
    id: "wikitext",
    name: "Wikitext",
    aliases: [
      "mediawiki",
      "wiki"
    ],
    import: () => import("./wikitext-Z-MoUasO.js")
  },
  {
    id: "wit",
    name: "WebAssembly Interface Types",
    import: () => import("./wit-CQMQOlTg.js")
  },
  {
    id: "wolfram",
    name: "Wolfram",
    aliases: [
      "wl"
    ],
    import: () => import("./wolfram-Dz4KXISs.js")
  },
  {
    id: "xml",
    name: "XML",
    import: () => import("./xml-C2J0sS9M.js")
  },
  {
    id: "xsl",
    name: "XSL",
    import: () => import("./xsl-BmSZphgC.js")
  },
  {
    id: "yaml",
    name: "YAML",
    aliases: [
      "yml"
    ],
    import: () => import("./yaml-DaO7k5B1.js")
  },
  {
    id: "zenscript",
    name: "ZenScript",
    import: () => import("./zenscript-CxBjpf9c.js")
  },
  {
    id: "zig",
    name: "Zig",
    import: () => import("./zig-Vm0PO9wB.js")
  }
], Md = Object.fromEntries(da.map((t) => [t.id, t.import])), Dd = Object.fromEntries(da.flatMap((t) => {
  var e;
  return ((e = t.aliases) == null ? void 0 : e.map((n) => [n, t.import])) || [];
})), Bd = {
  ...Md,
  ...Dd
}, Fd = [
  {
    id: "andromeeda",
    displayName: "Andromeeda",
    type: "dark",
    import: () => import("./andromeeda-uXNdzNpk.js")
  },
  {
    id: "aurora-x",
    displayName: "Aurora X",
    type: "dark",
    import: () => import("./aurora-x-BwoVEUWZ.js")
  },
  {
    id: "ayu-dark",
    displayName: "Ayu Dark",
    type: "dark",
    import: () => import("./ayu-dark-CxPZkpb2.js")
  },
  {
    id: "catppuccin-frappe",
    displayName: "Catppuccin Frappé",
    type: "dark",
    import: () => import("./catppuccin-frappe-DlGpEc12.js")
  },
  {
    id: "catppuccin-latte",
    displayName: "Catppuccin Latte",
    type: "light",
    import: () => import("./catppuccin-latte-DDI4I_Rd.js")
  },
  {
    id: "catppuccin-macchiato",
    displayName: "Catppuccin Macchiato",
    type: "dark",
    import: () => import("./catppuccin-macchiato-BBzuZG5U.js")
  },
  {
    id: "catppuccin-mocha",
    displayName: "Catppuccin Mocha",
    type: "dark",
    import: () => import("./catppuccin-mocha-CwrFPXRy.js")
  },
  {
    id: "dark-plus",
    displayName: "Dark Plus",
    type: "dark",
    import: () => import("./dark-plus-pUHDTVV0.js")
  },
  {
    id: "dracula",
    displayName: "Dracula Theme",
    type: "dark",
    import: () => import("./dracula-BtZx2Kac.js")
  },
  {
    id: "dracula-soft",
    displayName: "Dracula Theme Soft",
    type: "dark",
    import: () => import("./dracula-soft-BKa-aqBv.js")
  },
  {
    id: "everforest-dark",
    displayName: "Everforest Dark",
    type: "dark",
    import: () => import("./everforest-dark-DMCBqXCK.js")
  },
  {
    id: "everforest-light",
    displayName: "Everforest Light",
    type: "light",
    import: () => import("./everforest-light-BbXl82Em.js")
  },
  {
    id: "github-dark",
    displayName: "GitHub Dark",
    type: "dark",
    import: () => import("./github-dark-DenFmJkN.js")
  },
  {
    id: "github-dark-default",
    displayName: "GitHub Dark Default",
    type: "dark",
    import: () => import("./github-dark-default-BJPUVz4H.js")
  },
  {
    id: "github-dark-dimmed",
    displayName: "GitHub Dark Dimmed",
    type: "dark",
    import: () => import("./github-dark-dimmed-DUshB20C.js")
  },
  {
    id: "github-dark-high-contrast",
    displayName: "GitHub Dark High Contrast",
    type: "dark",
    import: () => import("./github-dark-high-contrast-D3aGCnF8.js")
  },
  {
    id: "github-light",
    displayName: "GitHub Light",
    type: "light",
    import: () => import("./github-light-JYsPkUQd.js")
  },
  {
    id: "github-light-default",
    displayName: "GitHub Light Default",
    type: "light",
    import: () => import("./github-light-default-D99KPAby.js")
  },
  {
    id: "github-light-high-contrast",
    displayName: "GitHub Light High Contrast",
    type: "light",
    import: () => import("./github-light-high-contrast-BbmZE-Mp.js")
  },
  {
    id: "gruvbox-dark-hard",
    displayName: "Gruvbox Dark Hard",
    type: "dark",
    import: () => import("./gruvbox-dark-hard-C2ND4cMr.js")
  },
  {
    id: "gruvbox-dark-medium",
    displayName: "Gruvbox Dark Medium",
    type: "dark",
    import: () => import("./gruvbox-dark-medium-C8k4c8au.js")
  },
  {
    id: "gruvbox-dark-soft",
    displayName: "Gruvbox Dark Soft",
    type: "dark",
    import: () => import("./gruvbox-dark-soft-xx9Q6FaG.js")
  },
  {
    id: "gruvbox-light-hard",
    displayName: "Gruvbox Light Hard",
    type: "light",
    import: () => import("./gruvbox-light-hard-BpUXv5in.js")
  },
  {
    id: "gruvbox-light-medium",
    displayName: "Gruvbox Light Medium",
    type: "light",
    import: () => import("./gruvbox-light-medium-D3XFCoU1.js")
  },
  {
    id: "gruvbox-light-soft",
    displayName: "Gruvbox Light Soft",
    type: "light",
    import: () => import("./gruvbox-light-soft-u7hpfz6Z.js")
  },
  {
    id: "houston",
    displayName: "Houston",
    type: "dark",
    import: () => import("./houston-BDYrDoDW.js")
  },
  {
    id: "kanagawa-dragon",
    displayName: "Kanagawa Dragon",
    type: "dark",
    import: () => import("./kanagawa-dragon-CiKur4Hl.js")
  },
  {
    id: "kanagawa-lotus",
    displayName: "Kanagawa Lotus",
    type: "light",
    import: () => import("./kanagawa-lotus-BKu-smKu.js")
  },
  {
    id: "kanagawa-wave",
    displayName: "Kanagawa Wave",
    type: "dark",
    import: () => import("./kanagawa-wave-CQwozSzG.js")
  },
  {
    id: "laserwave",
    displayName: "LaserWave",
    type: "dark",
    import: () => import("./laserwave-6a00oqik.js")
  },
  {
    id: "light-plus",
    displayName: "Light Plus",
    type: "light",
    import: () => import("./light-plus-CZuVqSLX.js")
  },
  {
    id: "material-theme",
    displayName: "Material Theme",
    type: "dark",
    import: () => import("./material-theme-D6KBX41T.js")
  },
  {
    id: "material-theme-darker",
    displayName: "Material Theme Darker",
    type: "dark",
    import: () => import("./material-theme-darker-CkRroheE.js")
  },
  {
    id: "material-theme-lighter",
    displayName: "Material Theme Lighter",
    type: "light",
    import: () => import("./material-theme-lighter-BUBw43Yz.js")
  },
  {
    id: "material-theme-ocean",
    displayName: "Material Theme Ocean",
    type: "dark",
    import: () => import("./material-theme-ocean-ClGX14Ja.js")
  },
  {
    id: "material-theme-palenight",
    displayName: "Material Theme Palenight",
    type: "dark",
    import: () => import("./material-theme-palenight-C1RVm8K1.js")
  },
  {
    id: "min-dark",
    displayName: "Min Dark",
    type: "dark",
    import: () => import("./min-dark-C7ak0t6c.js")
  },
  {
    id: "min-light",
    displayName: "Min Light",
    type: "light",
    import: () => import("./min-light-CKFxVcPp.js")
  },
  {
    id: "monokai",
    displayName: "Monokai",
    type: "dark",
    import: () => import("./monokai-C1KBYcO0.js")
  },
  {
    id: "night-owl",
    displayName: "Night Owl",
    type: "dark",
    import: () => import("./night-owl-Bm2rzalh.js")
  },
  {
    id: "nord",
    displayName: "Nord",
    type: "dark",
    import: () => import("./nord-CC5OiUXg.js")
  },
  {
    id: "one-dark-pro",
    displayName: "One Dark Pro",
    type: "dark",
    import: () => import("./one-dark-pro-DTA3VF0_.js")
  },
  {
    id: "one-light",
    displayName: "One Light",
    type: "light",
    import: () => import("./one-light-D9sNaUtq.js")
  },
  {
    id: "plastic",
    displayName: "Plastic",
    type: "dark",
    import: () => import("./plastic-CSTz3KZp.js")
  },
  {
    id: "poimandres",
    displayName: "Poimandres",
    type: "dark",
    import: () => import("./poimandres-C-VADXHD.js")
  },
  {
    id: "red",
    displayName: "Red",
    type: "dark",
    import: () => import("./red-7y8PH7HH.js")
  },
  {
    id: "rose-pine",
    displayName: "Rosé Pine",
    type: "dark",
    import: () => import("./rose-pine-Cr4kwgAY.js")
  },
  {
    id: "rose-pine-dawn",
    displayName: "Rosé Pine Dawn",
    type: "light",
    import: () => import("./rose-pine-dawn-ClRRUdXX.js")
  },
  {
    id: "rose-pine-moon",
    displayName: "Rosé Pine Moon",
    type: "dark",
    import: () => import("./rose-pine-moon-ucNn3Gm8.js")
  },
  {
    id: "slack-dark",
    displayName: "Slack Dark",
    type: "dark",
    import: () => import("./slack-dark-i7wN4OET.js")
  },
  {
    id: "slack-ochin",
    displayName: "Slack Ochin",
    type: "light",
    import: () => import("./slack-ochin-ndHf0LoP.js")
  },
  {
    id: "snazzy-light",
    displayName: "Snazzy Light",
    type: "light",
    import: () => import("./snazzy-light-BlSJXAu4.js")
  },
  {
    id: "solarized-dark",
    displayName: "Solarized Dark",
    type: "dark",
    import: () => import("./solarized-dark-UTmkh7lw.js")
  },
  {
    id: "solarized-light",
    displayName: "Solarized Light",
    type: "light",
    import: () => import("./solarized-light-BheCkDPT.js")
  },
  {
    id: "synthwave-84",
    displayName: "Synthwave '84",
    type: "dark",
    import: () => import("./synthwave-84-NU3C_KFZ.js")
  },
  {
    id: "tokyo-night",
    displayName: "Tokyo Night",
    type: "dark",
    import: () => import("./tokyo-night-DP4TmcQl.js")
  },
  {
    id: "vesper",
    displayName: "Vesper",
    type: "dark",
    import: () => import("./vesper-BckBta1U.js")
  },
  {
    id: "vitesse-black",
    displayName: "Vitesse Black",
    type: "dark",
    import: () => import("./vitesse-black-BoGvW84i.js")
  },
  {
    id: "vitesse-dark",
    displayName: "Vitesse Dark",
    type: "dark",
    import: () => import("./vitesse-dark-Cym-eLtO.js")
  },
  {
    id: "vitesse-light",
    displayName: "Vitesse Light",
    type: "light",
    import: () => import("./vitesse-light-CcmG315c.js")
  }
], jd = Object.fromEntries(Fd.map((t) => [t.id, t.import]));
class hr extends Error {
  constructor(e) {
    super(e), this.name = "ShikiError";
  }
}
function $d() {
  return 2147483648;
}
function Gd() {
  return typeof performance < "u" ? performance.now() : Date.now();
}
const Hd = (t, e) => t + (e - t % e) % e;
async function Ud(t) {
  let e, n;
  const r = {};
  function i(p) {
    n = p, r.HEAPU8 = new Uint8Array(p), r.HEAPU32 = new Uint32Array(p);
  }
  function o(p, h, C) {
    r.HEAPU8.copyWithin(p, h, h + C);
  }
  function a(p) {
    try {
      return e.grow(p - n.byteLength + 65535 >>> 16), i(e.buffer), 1;
    } catch {
    }
  }
  function s(p) {
    const h = r.HEAPU8.length;
    p = p >>> 0;
    const C = $d();
    if (p > C)
      return !1;
    for (let g = 1; g <= 4; g *= 2) {
      let y = h * (1 + 0.2 / g);
      y = Math.min(y, p + 100663296);
      const _ = Math.min(C, Hd(Math.max(p, y), 65536));
      if (a(_))
        return !0;
    }
    return !1;
  }
  const l = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0;
  function c(p, h, C = 1024) {
    const g = h + C;
    let y = h;
    for (; p[y] && !(y >= g); ) ++y;
    if (y - h > 16 && p.buffer && l)
      return l.decode(p.subarray(h, y));
    let _ = "";
    for (; h < y; ) {
      let w = p[h++];
      if (!(w & 128)) {
        _ += String.fromCharCode(w);
        continue;
      }
      const A = p[h++] & 63;
      if ((w & 224) === 192) {
        _ += String.fromCharCode((w & 31) << 6 | A);
        continue;
      }
      const x = p[h++] & 63;
      if ((w & 240) === 224 ? w = (w & 15) << 12 | A << 6 | x : w = (w & 7) << 18 | A << 12 | x << 6 | p[h++] & 63, w < 65536)
        _ += String.fromCharCode(w);
      else {
        const v = w - 65536;
        _ += String.fromCharCode(55296 | v >> 10, 56320 | v & 1023);
      }
    }
    return _;
  }
  function u(p, h) {
    return p ? c(r.HEAPU8, p, h) : "";
  }
  const d = {
    emscripten_get_now: Gd,
    emscripten_memcpy_big: o,
    emscripten_resize_heap: s,
    fd_write: () => 0
  };
  async function f() {
    const h = await t({
      env: d,
      wasi_snapshot_preview1: d
    });
    e = h.memory, i(e.buffer), Object.assign(r, h), r.UTF8ToString = u;
  }
  return await f(), r;
}
var qd = Object.defineProperty, Wd = (t, e, n) => e in t ? qd(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, B = (t, e, n) => Wd(t, typeof e != "symbol" ? e + "" : e, n);
let j = null;
function zd(t) {
  throw new hr(t.UTF8ToString(t.getLastOnigError()));
}
class qt {
  constructor(e) {
    B(this, "utf16Length"), B(this, "utf8Length"), B(this, "utf16Value"), B(this, "utf8Value"), B(this, "utf16OffsetToUtf8"), B(this, "utf8OffsetToUtf16");
    const n = e.length, r = qt._utf8ByteLength(e), i = r !== n, o = i ? new Uint32Array(n + 1) : null;
    i && (o[n] = r);
    const a = i ? new Uint32Array(r + 1) : null;
    i && (a[r] = n);
    const s = new Uint8Array(r);
    let l = 0;
    for (let c = 0; c < n; c++) {
      const u = e.charCodeAt(c);
      let d = u, f = !1;
      if (u >= 55296 && u <= 56319 && c + 1 < n) {
        const p = e.charCodeAt(c + 1);
        p >= 56320 && p <= 57343 && (d = (u - 55296 << 10) + 65536 | p - 56320, f = !0);
      }
      i && (o[c] = l, f && (o[c + 1] = l), d <= 127 ? a[l + 0] = c : d <= 2047 ? (a[l + 0] = c, a[l + 1] = c) : d <= 65535 ? (a[l + 0] = c, a[l + 1] = c, a[l + 2] = c) : (a[l + 0] = c, a[l + 1] = c, a[l + 2] = c, a[l + 3] = c)), d <= 127 ? s[l++] = d : d <= 2047 ? (s[l++] = 192 | (d & 1984) >>> 6, s[l++] = 128 | (d & 63) >>> 0) : d <= 65535 ? (s[l++] = 224 | (d & 61440) >>> 12, s[l++] = 128 | (d & 4032) >>> 6, s[l++] = 128 | (d & 63) >>> 0) : (s[l++] = 240 | (d & 1835008) >>> 18, s[l++] = 128 | (d & 258048) >>> 12, s[l++] = 128 | (d & 4032) >>> 6, s[l++] = 128 | (d & 63) >>> 0), f && c++;
    }
    this.utf16Length = n, this.utf8Length = r, this.utf16Value = e, this.utf8Value = s, this.utf16OffsetToUtf8 = o, this.utf8OffsetToUtf16 = a;
  }
  static _utf8ByteLength(e) {
    let n = 0;
    for (let r = 0, i = e.length; r < i; r++) {
      const o = e.charCodeAt(r);
      let a = o, s = !1;
      if (o >= 55296 && o <= 56319 && r + 1 < i) {
        const l = e.charCodeAt(r + 1);
        l >= 56320 && l <= 57343 && (a = (o - 55296 << 10) + 65536 | l - 56320, s = !0);
      }
      a <= 127 ? n += 1 : a <= 2047 ? n += 2 : a <= 65535 ? n += 3 : n += 4, s && r++;
    }
    return n;
  }
  createString(e) {
    const n = e.omalloc(this.utf8Length);
    return e.HEAPU8.set(this.utf8Value, n), n;
  }
}
const Wt = class ee {
  constructor(e) {
    if (B(this, "id", ++ee.LAST_ID), B(this, "_onigBinding"), B(this, "content"), B(this, "utf16Length"), B(this, "utf8Length"), B(this, "utf16OffsetToUtf8"), B(this, "utf8OffsetToUtf16"), B(this, "ptr"), !j)
      throw new hr("Must invoke loadWasm first.");
    this._onigBinding = j, this.content = e;
    const n = new qt(e);
    this.utf16Length = n.utf16Length, this.utf8Length = n.utf8Length, this.utf16OffsetToUtf8 = n.utf16OffsetToUtf8, this.utf8OffsetToUtf16 = n.utf8OffsetToUtf16, this.utf8Length < 1e4 && !ee._sharedPtrInUse ? (ee._sharedPtr || (ee._sharedPtr = j.omalloc(1e4)), ee._sharedPtrInUse = !0, j.HEAPU8.set(n.utf8Value, ee._sharedPtr), this.ptr = ee._sharedPtr) : this.ptr = n.createString(j);
  }
  convertUtf8OffsetToUtf16(e) {
    return this.utf8OffsetToUtf16 ? e < 0 ? 0 : e > this.utf8Length ? this.utf16Length : this.utf8OffsetToUtf16[e] : e;
  }
  convertUtf16OffsetToUtf8(e) {
    return this.utf16OffsetToUtf8 ? e < 0 ? 0 : e > this.utf16Length ? this.utf8Length : this.utf16OffsetToUtf8[e] : e;
  }
  dispose() {
    this.ptr === ee._sharedPtr ? ee._sharedPtrInUse = !1 : this._onigBinding.ofree(this.ptr);
  }
};
B(Wt, "LAST_ID", 0);
B(Wt, "_sharedPtr", 0);
B(Wt, "_sharedPtrInUse", !1);
let fa = Wt;
class Kd {
  constructor(e) {
    if (B(this, "_onigBinding"), B(this, "_ptr"), !j)
      throw new hr("Must invoke loadWasm first.");
    const n = [], r = [];
    for (let s = 0, l = e.length; s < l; s++) {
      const c = new qt(e[s]);
      n[s] = c.createString(j), r[s] = c.utf8Length;
    }
    const i = j.omalloc(4 * e.length);
    j.HEAPU32.set(n, i / 4);
    const o = j.omalloc(4 * e.length);
    j.HEAPU32.set(r, o / 4);
    const a = j.createOnigScanner(i, o, e.length);
    for (let s = 0, l = e.length; s < l; s++)
      j.ofree(n[s]);
    j.ofree(o), j.ofree(i), a === 0 && zd(j), this._onigBinding = j, this._ptr = a;
  }
  dispose() {
    this._onigBinding.freeOnigScanner(this._ptr);
  }
  findNextMatchSync(e, n, r) {
    let i = 0;
    if (typeof r == "number" && (i = r), typeof e == "string") {
      e = new fa(e);
      const o = this._findNextMatchSync(e, n, !1, i);
      return e.dispose(), o;
    }
    return this._findNextMatchSync(e, n, !1, i);
  }
  _findNextMatchSync(e, n, r, i) {
    const o = this._onigBinding, a = o.findNextOnigScannerMatch(this._ptr, e.id, e.ptr, e.utf8Length, e.convertUtf16OffsetToUtf8(n), i);
    if (a === 0)
      return null;
    const s = o.HEAPU32;
    let l = a / 4;
    const c = s[l++], u = s[l++], d = [];
    for (let f = 0; f < u; f++) {
      const p = e.convertUtf8OffsetToUtf16(s[l++]), h = e.convertUtf8OffsetToUtf16(s[l++]);
      d[f] = {
        start: p,
        end: h,
        length: h - p
      };
    }
    return {
      index: c,
      captureIndices: d
    };
  }
}
function Vd(t) {
  return typeof t.instantiator == "function";
}
function Jd(t) {
  return typeof t.default == "function";
}
function Yd(t) {
  return typeof t.data < "u";
}
function Xd(t) {
  return typeof Response < "u" && t instanceof Response;
}
function Qd(t) {
  var e;
  return typeof ArrayBuffer < "u" && (t instanceof ArrayBuffer || ArrayBuffer.isView(t)) || typeof Buffer < "u" && ((e = Buffer.isBuffer) == null ? void 0 : e.call(Buffer, t)) || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer || typeof Uint32Array < "u" && t instanceof Uint32Array;
}
let ft;
function Zd(t) {
  if (ft)
    return ft;
  async function e() {
    j = await Ud(async (n) => {
      let r = t;
      return r = await r, typeof r == "function" && (r = await r(n)), typeof r == "function" && (r = await r(n)), Vd(r) ? r = await r.instantiator(n) : Jd(r) ? r = await r.default(n) : (Yd(r) && (r = r.data), Xd(r) ? typeof WebAssembly.instantiateStreaming == "function" ? r = await ef(r)(n) : r = await tf(r)(n) : Qd(r) ? r = await sn(r)(n) : r instanceof WebAssembly.Module ? r = await sn(r)(n) : "default" in r && r.default instanceof WebAssembly.Module && (r = await sn(r.default)(n))), "instance" in r && (r = r.instance), "exports" in r && (r = r.exports), r;
    });
  }
  return ft = e(), ft;
}
function sn(t) {
  return (e) => WebAssembly.instantiate(t, e);
}
function ef(t) {
  return (e) => WebAssembly.instantiateStreaming(t, e);
}
function tf(t) {
  return async (e) => {
    const n = await t.arrayBuffer();
    return WebAssembly.instantiate(n, e);
  };
}
async function nf(t) {
  return t && await Zd(t), {
    createScanner(e) {
      return new Kd(e.map((n) => typeof n == "string" ? n : n.source));
    },
    createString(e) {
      return new fa(e);
    }
  };
}
const rf = /* @__PURE__ */ Pd({
  langs: Bd,
  themes: jd,
  engine: () => nf(import("./wasm-DQxwEHae.js"))
}), {
  codeToHtml: si
} = /* @__PURE__ */ Id(
  rf,
  { guessEmbeddedLanguages: Ju }
);
window.Alpine = ne;
ne.plugin(Hl);
ne.plugin(ql);
window.addEventListener("alpine:init", () => {
  ne.data("vanilla_data", () => ({
    tabOpened: ne.$persist("buttons")
  })), ne.store("modal", {
    modalOpen: !1,
    modalHeader: null,
    modalBody: null,
    modalFooter: null,
    modalData: {},
    init() {
      const e = `
            <div x-show="$store.modal.modalOpen" x-transition x-cloak class="modal" @click.outside="modalOpen = false">
    <div class="modal-header" x-html="$store.modal.modalHeader">
    </div>
    <div class="modal-body" x-html="$store.modal.modalBody">
    </div>
    <div class="modal-footer" x-html="$store.modal.modalFooter">
    </div>
  </div>`, n = document.createElement("template");
      n.id = "default-modal-header", n.innerHTML = `<h5 class="text-2xl font-semibold">An example of Confirmation Modal</h5>
    <button type="button" class="text-2xl text-red-500 hover:text-red-600" @click="$store.modal.modalOpen = false">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"
          d="m8.464 15.535l7.072-7.07m-7.072 0l7.072 7.07" />
      </svg>
    </button>`;
      const r = document.createElement("template");
      r.id = "default-modal-body", r.innerHTML = `<p class="text-lg">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere aperiam suscipit, voluptatibus repellendus
      molestiae consectetur? Accusamus, amet cupiditate quidem, adipisci explicabo libero iste deleniti labore
      quibusdam tempore provident nisi fugiat quas illo illum similique sapiente aliquam eveniet perferendis fuga.
      Animi, consequuntur! Facere dolores modi voluptas, reiciendis autem libero magni at amet veniam doloremque?
      Suscipit nobis inventore nostrum quisquam nulla assumenda, sequi eaque eum. Minima, soluta dolorum quod eos
      consectetur asperiores amet ea numquam vitae tempora! Similique perspiciatis ratione, atque sit iusto incidunt
      ipsum quaerat eos ex. Repellat quidem itaque, expedita eaque consequuntur dolor, ducimus voluptatibus, cumque
      quae qui atque perspiciatis.
    </p>`;
      const i = document.createElement("template");
      i.id = "default-modal-footer", i.innerHTML = `<div class="flex gap-3">
      <button type="button" class="btn bg-gray-600"
        @click="()=>console.log('canceled');$store.modal.closeModal()">Cancel</button>
      <button type="button" class="btn" @click="()=>console.log('confirmed');$store.modal.closeModal()">Ok!</button>
    </div>`, document.body.appendChild(n), document.body.appendChild(r), document.body.appendChild(i), document.body.insertAdjacentHTML("beforeend", e);
    },
    openModal(e = "default-modal-header", n = "default-modal-body", r = "default-modal-footer") {
      var s, l, c, u, d, f;
      const i = document.querySelector("#" + e), o = document.querySelector("#" + n), a = document.querySelector("#" + r);
      this.modalHeader = ((l = (s = i == null ? void 0 : i.content) == null ? void 0 : s.cloneNode(!0).firstElementChild) == null ? void 0 : l.outerHTML) || "", this.modalBody = ((u = (c = o == null ? void 0 : o.content) == null ? void 0 : c.cloneNode(!0).firstElementChild) == null ? void 0 : u.outerHTML) || "", this.modalFooter = ((f = (d = a == null ? void 0 : a.content) == null ? void 0 : d.cloneNode(!0).firstElementChild) == null ? void 0 : f.outerHTML) || "", this.modalOpen = !0;
    },
    closeModal() {
      this.modalOpen = !1;
    }
  });
  function t({ templateId: e, withToggle: n = !1, withCopy: r = !1 }) {
    return {
      toggle: "Display",
      rawCode: "",
      highlightedCode: "",
      async init() {
        const i = document.getElementById(e);
        i && (this.rawCode = i.innerHTML.trim().replace(/'/g, '"'), this.highlightedCode = await si(this.rawCode, {
          lang: "html",
          theme: "andromeeda"
        }));
      },
      async toggleView() {
        n && (this.toggle = this.toggle === "Display" ? "Code" : "Display", this.toggle === "Code" && !this.highlightedCode && (this.highlightedCode = await si(this.rawCode, {
          lang: "html",
          theme: "andromeeda"
        })));
      },
      async handleCopy() {
        r && await navigator.clipboard.writeText(this.rawCode);
      }
    };
  }
  ne.data(
    "codePreviewComponent",
    (e) => t({ templateId: e, withToggle: !0, withCopy: !0 })
  ), ne.data(
    "renderSourceCode",
    (e) => t({ templateId: e })
  );
});
ne.start();
