import { Link } from 'react-router-dom';
import { resolvePrimaryOrganization } from '@/data/organizations/resolve';

/**
 * Renders an organization name (and, if provided, its logo) as a link to
 * that Organization's page — used everywhere an org name appears (cards,
 * detail pages, timeline, etc.) so linking never has to be wired by hand.
 * Falls back to plain text if the name doesn't resolve to a known org.
 *
 * `organization` accepts the raw string already stored on the item
 * (e.g. experience.organization) — resolution happens automatically.
 */
export default function OrganizationLink({ organization, className = '', showLogo = false, logoClassName = 'w-6 h-6 rounded object-cover' }) {
  if (!organization) return null;
  const org = resolvePrimaryOrganization(organization);

  if (!org) {
    return <span className={className}>{organization}</span>;
  }

  return (
    <Link
      to={`/organizations/${org.id}`}
      className={`inline-flex items-center gap-2 hover:text-primary transition-premium ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {showLogo && (org.logo_url ? (
        <img src={org.logo_url} alt={org.name} className={logoClassName} />
      ) : (
        <span className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-[10px] font-semibold text-primary shrink-0">{org.name[0]}</span>
      ))}
      <span>{organization}</span>
    </Link>
  );
}
