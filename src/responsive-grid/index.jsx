import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ConfigProvider from '../config-provider';
import Box from '../box';
import { obj, env } from '../util';
import createStyle, { getGridChildProps } from './create-style';
import Cell from './cell';

const { ieVersion } = env;
const { pickOthers, isReactFragment } = obj;

const createChildren = (children, device, gap) => {
    const array = React.Children.toArray(children);
    if (!children) {
        return null;
    }

    return array.map(child => {
        if (isReactFragment(child)) {
            return createChildren(child.props.children, device, gap);
        }

        if (
            React.isValidElement(child) &&
            ['function', 'object'].indexOf(typeof child.type) > -1 &&
            ['form_item', 'responsive_grid_cell'].indexOf(child.type._typeMark) > -1
        ) {
            return React.cloneElement(child, {
                style: {
                    ...getGridChildProps(child.props, device, gap),
                    ...(child.props.style || {}),
                },
            });
        }

        return child;
    });
};

const getStyle = (style = {}, props) => {
    return {
        ...createStyle({ display: 'grid', ...props }),
        ...style,
    };
};

/**
 * ResponsiveGrid
 */
class ResponsiveGrid extends Component {
    static _typeMark = 'responsive_grid';
    static propTypes = {
        prefix: PropTypes.string,
        className: PropTypes.any,
        /**
         * 设备，用来做自适应，默认为 PC
         * @enumdesc 手机, 平板, PC
         */
        device: PropTypes.oneOf(['phone', 'tablet', 'desktop']),
        rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * 分为几列， 默认是 12 列
         */
        columns: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * 每个 cell 之间的间距， [bottom&top, right&left]
         */
        gap: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
        /**
         * 设置标签类型
         */
        component: PropTypes.elementType,
        /**
         * 是否开启紧密模式，开启后尽可能能紧密填满，尽量不出现空格
         */
        dense: PropTypes.bool,
        style: PropTypes.object,
    };

    static defaultProps = {
        prefix: 'next-',
        component: 'div',
        device: 'desktop',
        dense: false,
    };

    render() {
        const {
            prefix,
            component: View,
            style,
            className,
            children,
            device,
            rows,
            columns,
            gap,
            rowSpan,
            colSpan,
            component,
            dense,
        } = this.props;
        const styleProps = {
            rows,
            columns,
            gap,
            device,
            rowSpan,
            colSpan,
            component,
            dense,
        };

        const others = pickOthers(Object.keys(ResponsiveGrid.propTypes), this.props);

        const styleSheet = getStyle(style, styleProps);

        const cls = classNames(
            {
                [`${prefix}responsive-grid`]: true,
                [`${prefix}responsive-grid-ie`]: ieVersion,
            },
            className
        );

        return ieVersion ? (
            <Box {...this.props} direction="row" wrap spacing={gap} children={createChildren(children, device, gap)} />
        ) : (
            <View style={styleSheet} className={cls} {...others}>
                {createChildren(children, device, gap)}
            </View>
        );
    }
}

ResponsiveGrid.Cell = Cell;

export default ConfigProvider.config(ResponsiveGrid);
