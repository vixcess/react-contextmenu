"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _monitor = require("../monitor");

var _monitor2 = _interopRequireDefault(_monitor);

var _Modal = require("react-overlays/lib/Modal");

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modalStyle = {
    position: "fixed",
    zIndex: 1040,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
},
    backdropStyle = _extends({}, modalStyle, {
    zIndex: "auto",
    backgroundColor: "transparent"
}),
    menuStyles = {
    position: "fixed",
    zIndex: "auto"
};

var ContextMenuWrapper = _react2.default.createClass({
    displayName: "ContextMenuWrapper",
    getInitialState: function getInitialState() {
        return {
            left: 0,
            top: 0
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var _this = this;

        if (nextProps.isVisible === nextProps.identifier) {
            var wrapper = window.requestAnimationFrame || setTimeout;

            wrapper(function () {
                _this.setState(_this.getMenuPosition(nextProps.x, nextProps.y));
                _this.menu.parentNode.addEventListener("contextmenu", _this.hideMenu);
            });
        }
    },
    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
        return this.props.isVisible !== nextProps.visible;
    },
    hideMenu: function hideMenu(e) {
        e.preventDefault();
        this.menu.parentNode.removeEventListener("contextmenu", this.hideMenu);
        _monitor2.default.hideMenu();
    },
    getMenuPosition: function getMenuPosition(x, y) {
        var _window = window,
            innerWidth = _window.innerWidth,
            innerHeight = _window.innerHeight,
            rect = this.menu.getBoundingClientRect(),
            menuStyles = {
            top: y,
            left: x
        };


        if (y + rect.height > innerHeight) {
            menuStyles.top -= rect.height;
        }

        if (x + rect.width > innerWidth) {
            menuStyles.left -= rect.width;
        }

        if (menuStyles.top < 0) {
            menuStyles.top = rect.height < innerHeight ? (innerHeight - rect.height) / 2 : 0;
        }

        if (menuStyles.left < 0) {
            menuStyles.left = rect.width < innerWidth ? (innerWidth - rect.width) / 2 : 0;
        }

        return menuStyles;
    },
    render: function render() {
        var _this2 = this;

        var _props = this.props,
            isVisible = _props.isVisible,
            identifier = _props.identifier,
            children = _props.children;


        var style = _extends({}, menuStyles, this.state);

        return _react2.default.createElement(
            _Modal2.default,
            { style: modalStyle, backdropStyle: backdropStyle,
                show: isVisible === identifier, onHide: function onHide() {
                    return _monitor2.default.hideMenu();
                } },
            _react2.default.createElement(
                "nav",
                { ref: function ref(c) {
                        return _this2.menu = c;
                    }, style: style,
                    className: "react-context-menu" },
                children
            )
        );
    }
});

exports.default = ContextMenuWrapper;