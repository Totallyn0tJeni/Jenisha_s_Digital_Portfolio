import { Navigate } from 'react-router-dom';

// Leadership content now lives inside the Experience page (Leadership Experience
// section) as part of the unified professional-experience hub. This route is kept
// as a redirect so old links/bookmarks to /leadership still resolve correctly,
// without maintaining a second, duplicate implementation.
export default function Leadership() {
  return <Navigate to="/experience" replace />;
}
