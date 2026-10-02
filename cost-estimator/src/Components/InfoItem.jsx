import React from 'react';

export default class InfoItem extends React.Component {
    render() {
        return (
        <p>
            <b>{this.props.label}:</b> {this.props.value}
        </p>
        );
    }
}