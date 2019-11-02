import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import GetApp from '@material-ui/icons/GetApp';

import { Button, GET_MANY } from 'react-admin';

const sanitizeRestProps = ({
    dispatchExportMany,
    exporter,
    icon,
    label,
    onClick,
    resource,
    selectedIds,
    ...rest
}) => rest;

const crudExportMany = (resource, ids, callback) => ({
    type: 'RAX/CRUD_GET_MANY_FOR_EXPORT',
    payload: { ids },
    meta: {
        resource,
        fetch: GET_MANY,
        onSuccess: {
            notification: {
                body: 'rax.notification.exporting',
                level: 'info',
                messageArgs: {
                    smart_count: ids.length,
                },
            },
            callback,
        },
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
});

class BulkExportButton extends Component {
    static propTypes = {
        dispatchExportMany: PropTypes.func.isRequired,
        exporter: PropTypes.func.isRequired,
        icon: PropTypes.element,
        label: PropTypes.string,
        onClick: PropTypes.func,
        resource: PropTypes.string.isRequired,
        selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
    };

    static defaultProps = {
        label: 'ra.action.export',
        icon: <GetApp />,
    };

    theCallbackForExporting = ({ payload }) => {
        const { exporter } = this.props;

        exporter(payload.data);
    };

    handleClick = () => {
        const {
            dispatchExportMany,
            resource,
            selectedIds,
            onClick,
        } = this.props;
        dispatchExportMany(resource, selectedIds, this.theCallbackForExporting);

        if (typeof onClick === 'function') {
            onClick();
        }
    };

    render() {
        const { label, icon, ...rest } = this.props;
        return (
            <Button
                onClick={this.handleClick}
                label={label}
                {...sanitizeRestProps(rest)}
            >
                {icon}
            </Button>
        );
    }
}

const EnhancedBulkExportButton = compose(
    connect(
        undefined,
        {
            dispatchExportMany: crudExportMany,
        }
    )
)(BulkExportButton);

export default EnhancedBulkExportButton;
