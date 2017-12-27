import React from "react";
import monitor from "../monitor";

import Modal from "react-overlays/lib/Modal";

const modalStyle = {
        position: "fixed",
        zIndex: 1040,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    backdropStyle = {
        ...modalStyle,
        zIndex: "auto",
        backgroundColor: "transparent"
    },
    menuStyles = {
        position: "fixed",
        zIndex: "auto"
    };

let ContextMenuWrapper = React.createClass({
    displayName: "ContextMenuWrapper",
    getInitialState() {
        return {
            left: 0,
            top: 0
        };
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.isVisible === nextProps.identifier) {
            const wrapper = window.requestAnimationFrame || setTimeout;

            wrapper(() => {
                this.setState(this.getMenuPosition(nextProps.x, nextProps.y));
                this.menu.parentNode.addEventListener("contextmenu", this.hideMenu);
            });
        }
    },
    shouldComponentUpdate(nextProps) {
        return this.props.isVisible !== nextProps.visible;
    },
    hideMenu(e) {
        e.preventDefault();
        this.menu.parentNode.removeEventListener("contextmenu", this.hideMenu);
        monitor.hideMenu();
    },
    getMenuPosition(x, y) {
        let { innerWidth, innerHeight } = window,
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
            menuStyles.top = (rect.height < innerHeight) ? (innerHeight - rect.height) / 2 : 0;
        }

        if (menuStyles.left < 0) {
            menuStyles.left = (rect.width < innerWidth) ? (innerWidth - rect.width) / 2 : 0;
        }

        return menuStyles;
    },
    render() {
        let { isVisible, identifier, children } = this.props;

        const style = {
            ...menuStyles,
            ...this.state
        };

        return (
            <Modal style={modalStyle} backdropStyle={backdropStyle}
                show={isVisible === identifier} onHide={() => monitor.hideMenu()}>
                <nav ref={(c) => (this.menu = c)} style={style}
                    className="react-context-menu">
                    {children}
                </nav>
            </Modal>
        );
    }
});

export default ContextMenuWrapper;
