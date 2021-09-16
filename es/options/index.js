function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState, useEffect } from 'react'; // 异步请求缓存字典

var cacheMap = new Map();
export function useOptions() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var _useState = useState(args.map(function () {
    return [];
  })),
      _useState2 = _slicedToArray(_useState, 2),
      result = _useState2[0],
      setResult = _useState2[1];

  useEffect(function () {
    _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var promises;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              promises = args.map(function (item) {
                if (typeof item === 'function') {
                  var res = item(); // 异步函数结果

                  if (res.then) return res; // 同步函数结果

                  return Promise.resolve(res);
                }

                if (item && item.then) return item; // 不是函数，原样返回

                return Promise.resolve(item);
              });
              Promise.allSettled(promises).then(function (results) {
                var options = results.map(function (item) {
                  if (item.status === 'fulfilled') {
                    return item.value;
                  } // eslint-disable-next-line no-console


                  console.error(item.reason);
                  return [];
                }); // 检测是否只含有 value label meta? 三个参数

                options.filter(function (item) {
                  return !!item;
                }).forEach(function (arr) {
                  return arr.forEach(function (obj) {
                    var keys = Object.keys(obj);
                    if (keys.length > 3 || keys.length === 3 && !keys.includes('meta')) throw Error("\u679A\u4E3E\u7C7B\u578B\u6570\u636E\uFF0C\u53EA\u80FD\u542B\u6709 value,label,meta \u4E09\u4E2A\u5C5E\u6027\uFF01\n".concat(JSON.stringify(obj, null, 4)));
                    if (!keys.includes('value') || !keys.includes('label')) throw Error("\u679A\u4E3E\u7C7B\u578B\u6570\u636E\uFF0C\u5FC5\u987B\u542B\u6709 value,label \u5C5E\u6027\uFF01\n".concat(JSON.stringify(obj, null, 4)));
                  });
                });
                setResult(options);
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))(); // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  return result.map(function (item) {
    return extendMethod(item);
  });
}
/**
 * 如果函数有参数，不会被缓存！！
 * ！
 * @param options
 * @param cacheTime
 *      false 不缓存
 *      true 浏览器刷新之后失效
 *      number 缓存number毫秒数，可以有效解决同一页面多次加载问题同时一定程度上避免脏数据
 * @returns {*}
 */

export function wrapperOptions(options, cacheTime) {
  // 处理缓存
  if (cacheTime !== false) {
    Object.entries(options).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          item = _ref3[1];

      if (typeof item === 'function') {
        // eslint-disable-next-line no-param-reassign
        options[key] = function newItem() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          // 如果有参数，不缓存
          if (args === null || args === void 0 ? void 0 : args.length) return item.apply(void 0, args);
          var cache = cacheMap.get(newItem);

          if (!cache) {
            cache = item();
            cacheMap.set(newItem, cache);

            if (typeof cacheTime === 'number') {
              setTimeout(function () {
                return cacheMap.delete(newItem);
              }, cacheTime);
            }
          }

          return cache;
        };
      }
    });
  } // 添加方法
  // eslint-disable-next-line no-param-reassign


  options.clearCache = function () {
    Object.values(options).forEach(function (item) {
      return cacheMap.delete(item);
    });
  };

  Object.values(options).forEach(function (item) {
    extendMethod(item);
  });
  return options;
}

function extendMethod(item) {
  var it = item;

  it.getOption = function (value) {
    return getField(it, value);
  };

  it.getTag = function (value) {
    return /*#__PURE__*/React.createElement(PromiseChildren, null, getField(it, value, 'tag'));
  };

  it.getLabel = function (value) {
    return /*#__PURE__*/React.createElement(PromiseChildren, null, getField(it, value, 'label'));
  };

  it.getMeta = function (value) {
    return getField(it, value, 'meta');
  };

  it.clearCache = function () {
    return cacheMap.delete(it);
  };

  return it;
}

function getField(item, value) {
  var field = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var opts = item;

  if (typeof item === 'function') {
    opts = cacheMap.get(item) || item();
  }

  if (Array.isArray(opts)) {
    var result = opts.find(function (i) {
      return i.value === value;
    }) || {};
    return field ? result[field] : result;
  } // 异步结果


  if (opts.then) {
    return opts.then(function (it) {
      var result = it.find(function (i) {
        return i.value === value;
      }) || {};
      return field ? result[field] : result;
    });
  }

  return null;
}

export function PromiseChildren(props) {
  var children = props.children;

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      result = _useState4[0],
      setResult = _useState4[1];

  useEffect(function () {
    _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var label;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!children.then) {
                _context2.next = 7;
                break;
              }

              _context2.next = 3;
              return children;

            case 3:
              label = _context2.sent;
              setResult(label);
              _context2.next = 8;
              break;

            case 7:
              setResult(children);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }, [children]);
  return result || null;
}