
import StatusBadge from './StatusBadge';
import { formatMoney } from '../Utils/formatters';

export default function ProjectDetails({ project, onBack }) {
    return (
    <div className="container">
        <button className="back-btn" onClick={onBack}>
        &larr; Back to Projects
        </button>
        <div className="details-card">
        <h1>{project.name}</h1>
        <hr className="divider" />
        <div className="details-grid">
            <div className="details-item">
            <span className="details-label">Client</span>
            <span className="details-value">{project.client}</span>
            </div>
            <div className="details-item">
            <span className="details-label">Status</span>
            <span className="details-value">
            <StatusBadge status={project.status} />
            </span>
        </div>

        <div className="details-item">
            <span className="details-label">Owner</span>
            <span className="details-value">{project.owner}</span>
        </div>

        <div className="details-item">
            <span className="details-label">Start Date</span>
            <span className="details-value">{project.startDate}</span>
        </div>

        <div className="details-item">
            <span className="details-label">End Date</span>
            <span className="details-value">{project.endDate}</span>
        </div>

        <div className="details-item">
            <span className="details-label">Total Hours</span>
            <span className="details-value">{project.hours} hrs</span>
        </div>

        <div className="details-item">
            <span className="details-label">Estimated Cost</span>
            <span className="details-value cost-value">
                {formatMoney(project.finalCost)}
            </span>
        </div>
        </div>
    </div>
    </div>
);
}