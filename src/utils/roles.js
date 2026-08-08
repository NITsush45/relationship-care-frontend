export const ROLES = {
  USER: "user",
  THERAPIST: "therapist",
};

export const ROLE_LABELS = {
  [ROLES.USER]: "User",
  [ROLES.THERAPIST]: "Therapist",
};

export function getUserRole(user) {
  if (!user) return null;
  return user.publicMetadata?.role || user.unsafeMetadata?.role || ROLES.USER;
}

export function isTherapist(user) {
  return getUserRole(user) === ROLES.THERAPIST;
}

export function isUser(user) {
  return getUserRole(user) === ROLES.USER;
}
