import _ from "lodash"

var arr = { foo: 1, bar: { baz: 2 }, bee: 3 };
console.log(Object.assign(
  {},
  ...function _flatten(o) {
    return [].concat(...Object.keys(o)
      .map(k =>
        typeof o[k] === 'object' ?
          _flatten(o[k]) :
          ({[k]: o[k]})
      )
    );
  }(arr)
))