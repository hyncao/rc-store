"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = exports.Provider = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var context = _react["default"].createContext();

var Consumer = context.Consumer;

var Provider = function Provider(_ref) {
  var children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["children"]);

  return _react["default"].createElement(context.Provider, {
    value: rest
  }, children);
};

exports.Provider = Provider;

var connect = function connect() {
  for (var _len = arguments.length, name = new Array(_len), _key = 0; _key < _len; _key++) {
    name[_key] = arguments[_key];
  }

  return function (Component) {
    return function (props) {
      var Connect =
      /*#__PURE__*/
      function (_React$Component) {
        _inherits(Connect, _React$Component);

        function Connect() {
          var _this;

          _classCallCheck(this, Connect);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(Connect).call(this));
          _this.state = {
            data: null
          };
          _this.dispatch = _this.dispatch.bind(_assertThisInitialized(_this));
          return _this;
        }

        _createClass(Connect, [{
          key: "componentDidMount",
          value: function componentDidMount() {
            var context = this.props.context;
            var injectObj = {};
            name.forEach(function (i) {
              injectObj[i] = context[i];
            });
            this.setState({
              data: _objectSpread({}, props, {}, injectObj, {
                dispatch: this.dispatch
              })
            });
          }
        }, {
          key: "dispatch",
          value: function dispatch(store) {
            var data = this.state.data;
            var keys = Object.keys(store);
            var error;

            if (keys.every(function (i) {
              var res = i in data;

              if (!res) {
                error = "Connect did not register \"".concat(i, "\", please check dispatch or connect in \"").concat(Component.name, "\" Component");
              }

              return res;
            })) {
              var newData = data;
              keys.forEach(function (i) {
                newData = _objectSpread({}, newData, _defineProperty({}, i, _objectSpread({}, newData[i], {}, store[i])));
              });
              this.setState({
                data: newData
              });
            } else {
              throw new Error(error);
            }
          }
        }, {
          key: "render",
          value: function render() {
            var data = this.state.data;

            if (data) {
              return _react["default"].createElement(Component, data);
            }

            return null;
          }
        }]);

        return Connect;
      }(_react["default"].Component);

      return _react["default"].createElement(Consumer, null, function (context) {
        return _react["default"].createElement(Connect, {
          context: context
        });
      });
    };
  };
};

exports.connect = connect;
