import React from 'react';

export default class StatusBadge extends React.Component {
    getStatusClass(status) {
        switch (status) {
            case "Completed":
                return "completed";
            case "In Progress":
                return "in-progress";
            case "Planning":
                return "planning";
            default:
                return "";
        }
    }

    render() {
        const statusClass = this.getStatusClass(this.props.status);
        return (
        <p>
            <b>Status:</b>{" "}
            <span className={`status ${statusClass}`}>{this.props.status}</span>
        </p>
        );
    }
}