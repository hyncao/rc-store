"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = exports.Provider = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var context = _react["default"].createContext();

var Consumer = context.Consumer;

var Provider = function Provider(_ref) {
  var children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["children"]);

  var _useState = (0, _react.useState)(_objectSpread({}, rest)),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var update = (0, _react.useCallback)(function (state) {
    setData(function (prev) {
      var next = _objectSpread({}, prev);

      for (var key in state) {
        Object.assign(next[key], state[key]);
      }

      return next;
    });
  }, []);
  return _react["default"].createElement(context.Provider, {
    value: _objectSpread({
      update: update
    }, data)
  }, children);
};

exports.Provider = Provider;

var Connect = function Connect(_ref2) {
  var context = _ref2.context,
      originProps = _ref2.originProps,
      component = _ref2.component,
      name = _ref2.name;

  var dispatch = function dispatch(state) {
    if (Object.prototype.toString.call(state) !== '[object Object]') {
      return new Promise(function () {
        throw new Error('rc-store dispatch api need a Object param');
      });
    }

    var keys = Object.keys(state);
    var error;

    if (keys.every(function (i) {
      var res = name.includes(i);

      if (!res) {
        error = "Connect did not register \"".concat(i, "\", please check dispatch or connect in \"").concat(component.name, "\" Component");
      }

      return res;
    })) {
      var update = context.update;
      update(_objectSpread({}, state));
      return new Promise(function (res) {
        var newProps = _objectSpread({}, context);

        for (var key in state) {
          Object.assign(newProps[key], state[key]);
        }

        res(newProps);
      });
    } else {
      return new Promise(function () {
        throw new Error(error);
      });
    }
  };

  var props = _objectSpread({
    dispatch: dispatch
  }, originProps);

  name.forEach(function (i) {
    props[i] = _objectSpread({}, context[i]);
  });
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(component, _objectSpread({}, props)));
};

var connect = function connect() {
  for (var _len = arguments.length, name = new Array(_len), _key = 0; _key < _len; _key++) {
    name[_key] = arguments[_key];
  }

  return function (Component) {
    return function (props) {
      if (name.length === 0) {
        console.error('rc-store connect api need a String Array param');
      }

      if (!name.every(function (i) {
        return typeof i === 'string';
      })) {
        console.error('rc-store connect api need a String Array param');
      }

      return _react["default"].createElement(Consumer, null, function (context) {
        return _react["default"].createElement(Connect, {
          context: context,
          originProps: props,
          component: Component,
          name: name
        });
      });
    };
  };
};

exports.connect = connect;
