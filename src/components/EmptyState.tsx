import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  title: string;
  message: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<Props> = ({ icon: Icon, title, message, action }) => (
  <div className="empty-state">
    <div className="empty-state-icon">
      <Icon size={28} />
    </div>
    <h3>{title}</h3>
    <p>{message}</p>
    {action && <div style={{ marginTop: 8 }}>{action}</div>}
  </div>
);
