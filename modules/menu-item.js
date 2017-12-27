"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _objectAssign = require("object-assign");

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _monitor = require("./monitor");

var _monitor2 = _interopRequireDefault(_monitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PropTypes = _react2.default.PropTypes;


var MenuItem = _react2.default.createClass({
    displayName: "MenuItem",
    propTypes: {
        onClick: PropTypes.func.isRequired,
        data: PropTypes.object,
        disabled: PropTypes.bool,
        preventClose: PropTypes.bool
    },
    getDefaultProps: function getDefaultProps() {
        return {
            disabled: false,
            data: {},
            attributes: {}
        };
    },
    handleClick: function handleClick(event) {
        var _props = this.props,
            disabled = _props.disabled,
            onClick = _props.onClick,
            data = _props.data,
            preventClose = _props.preventClose;


        event.preventDefault();

        if (disabled) return;

        var newData = {};
        (0, _objectAssign2.default)(newData, data, _monitor2.default.getItem());

        if (typeof onClick === "function") {
            onClick(event, newData);
        }

        if (preventClose) return;

        _monitor2.default.hideMenu();
    },
    render: function render() {
        var _props2 = this.props,
            disabled = _props2.disabled,
            children = _props2.children,
            _props2$attributes = _props2.attributes,
            _props2$attributes$cl = _props2$attributes.className,
            className = _props2$attributes$cl === undefined ? "" : _props2$attributes$cl,
            props = _objectWithoutProperties(_props2$attributes, ["className"]),
            menuItemClassNames = "react-context-menu-item " + className;

        var classes = (0, _classnames2.default)({
            "react-context-menu-link": true,
            disabled: disabled
        });

        return _react2.default.createElement(
            "div",
            _extends({ className: menuItemClassNames }, props),
            _react2.default.createElement(
                "a",
                { href: "#", className: classes, onClick: this.handleClick },
                children
            )
        );
    }
});

exports.default = MenuItem;