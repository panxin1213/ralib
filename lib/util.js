"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLocalStorage = useLocalStorage;
exports.useSessionStorage = useSessionStorage;
exports.setToken = setToken;
exports.getToken = getToken;
exports.setLoginUser = setLoginUser;
exports.getLoginUser = getLoginUser;
exports.hasPermission = hasPermission;
exports.isLogin = isLogin;
exports.isLoginPage = isLoginPage;
exports.setMainApp = setMainApp;
exports.getMainApp = getMainApp;
exports.getConfigValue = getConfigValue;
exports.getContainerId = getContainerId;
exports.isActiveApp = isActiveApp;
exports.getModelName = getModelName;
exports.formatMenus = formatMenus;
exports.getParentOrigin = getParentOrigin;
exports.storage = void 0;

var _react = require("react");

var _util = require("@ra-lib/util");

var _package = _interopRequireDefault(require("root/package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * ?????????????????????????????????????????????????????????
 * ???????????????????????????????????????????????????????????????
 * */
var PACKAGE_NAME = _package.default.name;
var LOGIN_USER_STORAGE_KEY = "".concat(PACKAGE_NAME, "_login_user");
var LOGIN_USER_ID_STORAGE_KEY = "".concat(PACKAGE_NAME, "_login_user_id");
var LOGIN_USER_TOKEN_STORAGE_KEY = "".concat(PACKAGE_NAME, "_login_user_token");
var MAIN_APP_KEY = "".concat(PACKAGE_NAME, "_main_app");
var userId = window.sessionStorage.getItem(LOGIN_USER_ID_STORAGE_KEY);
var STORAGE_PREFIX = "".concat(PACKAGE_NAME, "_").concat(userId || '', "_");
/**
 * ?????????????????? storage.local storage.session storage.global
 * storage.local.setItem(key, value) storage.local.getItem(key, value)
 * @type {Storage}
 */

var storage = new _util.Storage({
  prefix: STORAGE_PREFIX
});
/**
 * localStorage hook??????
 * @param key
 * @param defaultValue
 */

exports.storage = storage;

function useLocalStorage(key, defaultValue) {
  return useCreateStorageHook(storage.local, key, defaultValue);
}
/**
 * sessionStorage hook??????
 * @param key
 * @param defaultValue
 */


function useSessionStorage(key, defaultValue) {
  return useCreateStorageHook(storage.session, key, defaultValue);
}

function useCreateStorageHook(storageInstance, key, defaultValue) {
  var initState = storageInstance.getItem(key);
  if (initState === undefined) initState = defaultValue;

  var _useState = (0, _react.useState)(initState),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setInnerState = _useState2[1];

  var setState = (0, _react.useCallback)(function (value) {
    setInnerState(value);
    storageInstance.setItem(key, value);
  }, [key, storageInstance]);
  return [state, setState];
}
/**
 * ??????token???sessionStorage???loginUser???
 * @param token
 */


function setToken(token) {
  window.sessionStorage.setItem(LOGIN_USER_TOKEN_STORAGE_KEY, token);
}
/**
 * ??????token
 * token??????: queryString > sessionStorage > loginUser
 */


function getToken() {
  var query = (0, _util.queryParse)();
  if (query === null || query === void 0 ? void 0 : query.token) setToken(query.token);
  return (query === null || query === void 0 ? void 0 : query.token) || window.sessionStorage.getItem(LOGIN_USER_TOKEN_STORAGE_KEY);
}
/**
 * ????????????????????????
 * @param loginUser ????????????????????????
 */


function setLoginUser() {
  var loginUser = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!loginUser) return; // ????????????

  ['id', 'name' // 'token',
  // 'permissions',
  ].forEach(function (field) {
    if (!loginUser[field]) throw Error("loginUser must has ".concat(field, " property!"));
  }); // ?????????????????????????????????????????????????????????????????????????????????

  var userStr = JSON.stringify(_objectSpread({
    id: loginUser.id,
    name: loginUser.name,
    avatar: loginUser.avatar,
    token: loginUser.token,
    permissions: loginUser.permissions
  }, loginUser));
  window.sessionStorage.setItem(LOGIN_USER_STORAGE_KEY, userStr);
  window.sessionStorage.setItem(LOGIN_USER_ID_STORAGE_KEY, loginUser.id);
  setToken(loginUser.token);
}
/**
 * ????????????????????????
 * @returns {any}
 */


function getLoginUser() {
  var loginUser = window.sessionStorage.getItem(LOGIN_USER_STORAGE_KEY);
  return loginUser ? JSON.parse(loginUser) : undefined;
}
/**
 * ?????????????????????
 * @param code
 */


function hasPermission(code) {
  var _loginUser$permission;

  if (typeof code === 'boolean') return code;
  if (!code) return true;
  var loginUser = getLoginUser();
  return loginUser === null || loginUser === void 0 ? void 0 : (_loginUser$permission = loginUser.permissions) === null || _loginUser$permission === void 0 ? void 0 : _loginUser$permission.includes(code);
}
/**
 * ???????????????????????? ?????????????????????????????????token?????????????????????
 * @returns {boolean}
 */


function isLogin() {
  var _getMainApp;

  // ??????????????????????????????????????????????????????????????????
  return !!(getLoginUser() || getToken() || ((_getMainApp = getMainApp()) === null || _getMainApp === void 0 ? void 0 : _getMainApp.token));
}
/**
 * ???????????????????????????????????????
 * @param path
 * @returns {string|*|boolean}
 */


function isLoginPage() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.pathname;
  return path && path.endsWith('/login') || window.location.href.includes('/#/login');
}
/**
 * ???????????????????????????
 * @param mainApp
 */


function setMainApp(mainApp) {
  var _mainApp$loginUser;

  storage.global.setItem(MAIN_APP_KEY, mainApp);
  setLoginUser(mainApp === null || mainApp === void 0 ? void 0 : mainApp.loginUser);
  setToken((mainApp === null || mainApp === void 0 ? void 0 : mainApp.token) || (mainApp === null || mainApp === void 0 ? void 0 : (_mainApp$loginUser = mainApp.loginUser) === null || _mainApp$loginUser === void 0 ? void 0 : _mainApp$loginUser.token));
}
/**
 * ???????????????????????????
 */


function getMainApp() {
  return storage.global.getItem(MAIN_APP_KEY);
}
/**
 * ????????????
 * @param envConfig
 * @param key
 * @param defaultValue
 * @param parse
 * @returns {string|boolean|*}
 */


function getConfigValue(envConfig, key, defaultValue, parse) {
  var evnKey = "REACT_APP_".concat(key); // ??????????????? ???????????????

  var envValue = process.env[evnKey];

  if (envValue !== undefined) {
    if (parse) return parse(envValue);
    if (envValue === 'true') return true;
    if (envValue === 'false') return false;
    return envValue;
  } // ??????????????????


  var envConfigValue = envConfig[key];
  if (envConfigValue !== undefined) return envConfigValue; // ????????????

  return defaultValue;
}
/**
 * ?????????????????????id
 * @param name
 * @returns {string}
 */


function getContainerId(name) {
  return "_sub_app_id__".concat(name);
}
/**
 * ??????name?????????????????????????????????
 * @param app
 * @param pathname
 * @returns {*}
 */


function isActiveApp(app) {
  var pathname = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.pathname;
  return pathname.startsWith("/".concat(app.name));
}
/**
 * ???????????????
 * @param filePath
 */


function getModelName(filePath) {
  // models/page.js ??????
  var name = filePath.replace('./', '').replace('.js', '');
  var names = filePath.split('/');
  var fileName = names[names.length - 1];
  var folderName = names[names.length - 2]; // users/model.js ??????

  if (fileName === 'model.js') name = folderName; // users/center.model.js ??????

  if (fileName.endsWith('.model.js')) {
    name = fileName.replace('.model.js', '').replace(/\./g, '-');
  }

  return name.replace(/-(\w)/g, function (a, b) {
    return b.toUpperCase();
  });
}
/**
 * ??????????????????
 * @param menus
 * @returns {*}
 */


function formatMenus(menus) {
  // ?????????????????????id
  var someId = (0, _util.checkSameField)(menus, 'id');
  if (someId) throw Error("\u83DC\u5355\u4E2D\u6709\u91CD\u590Did \u300C ".concat(someId, " \u300D")); // ?????? order????????? ???????????????

  return loopMenus((0, _util.convertToTree)((0, _util.sort)(menus, function (a, b) {
    return b.order - a.order;
  })));
}
/**
 * ????????????????????????{}
 * @param menus
 * @param basePath
 */


function loopMenus(menus) {
  var basePath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  menus.forEach(function (item) {
    var path = item.path,
        target = item.target,
        children = item.children; // ????????????target??????
    // eslint-disable-next-line no-underscore-dangle,no-param-reassign

    item._target = target; // ????????????bashPath????????????
    // eslint-disable-next-line no-param-reassign

    if (basePath && !item.basePath) item.basePath = basePath; // ?????????????????????
    // eslint-disable-next-line no-param-reassign

    if (target === 'qiankun') item.basePath = "/".concat(item.name);
    var _basePath = item.basePath; // ??????????????????

    if (_basePath && path && (!path.startsWith('http') || !path.startsWith('//'))) {
      path = "".concat(_basePath).concat(path); // eslint-disable-next-line no-param-reassign

      item.path = path;
    } // ??????????????????????????????target???iframe???????????????????????????


    if (target === 'iframe') {
      // ???????????? : ??????iFrame
      // eslint-disable-next-line no-param-reassign
      item.path = "/iframe_page_/".concat(encodeURIComponent(path));
    }

    if (!['_self', '_blank'].includes(target)) {
      Reflect.deleteProperty(item, 'target');
    }

    if (children === null || children === void 0 ? void 0 : children.length) loopMenus(children, _basePath);
  });
  return menus;
}
/**
 * ??????iframe??????????????????????????????
 */


function getParentOrigin() {
  var url = '';
  var _window = window,
      parent = _window.parent;

  if (parent !== window) {
    try {
      url = parent.location.origin;
    } catch (e) {
      url = document.referrer;
    }
  }

  if (url.endsWith('/')) {
    return url.substring(0, url.length - 1);
  }

  return url;
}