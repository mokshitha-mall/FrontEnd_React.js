import React from 'react';
import InfoItem from './InfoItem';
import StatusBadge from './StatusBadge';
import { formatMoney } from '../Utils/formatters';

export default class ProjectCard extends React.Component {
  render() {
    const { project, onView } = this.props;

    return (
      <div className="project-card">
        <h2>{project.name}</h2>
        <InfoItem label="Client" value={project.client} />
        <StatusBadge status={project.status} />
        <InfoItem label="Owner" value={project.owner} />
        <InfoItem label="Start Date" value={project.startDate} />
        <InfoItem label="End Date" value={project.endDate} />
        <InfoItem label="Hours" value={project.hours} />
        <InfoItem label="Cost" value={formatMoney(project.finalCost)} />
        
        {/* View button below Cost */}
        <button 
          type="button" 
          className="view-btn" 
          onClick={() => onView && onView(project)}
        >
          View Data
        </button>
      </div>
    );
  }
}