import useProfile from './useProfile';

export default function useSelectedOrganization() {
  const profile = useProfile();

  return profile?.selected_organization;
}
