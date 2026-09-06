import {
  FaHeart,
  FaHeartBroken,
  FaGem,
  FaUserPlus,
  FaLeaf,
  FaBrain,
  FaUtensils,
  FaWind,
  FaBed,
  FaUserMd,
  FaComments,
  FaSync,
  FaStar,
  FaBullseye,
  FaUsers,
  FaUser,
  FaClock,
  FaRegSmile,
  FaYinYang,
} from "react-icons/fa";

/**
 * Centralized mapping from icon-name strings (stored in JSON data files)
 * to actual React Icon components. This keeps emoji/unicode symbols out of
 * data files while giving every card a consistent, professional icon.
 */
const IconMap = {
  FaHeart,
  FaHeartBroken,
  FaGem,
  FaUserPlus,
  FaLeaf,
  FaBrain,
  FaUtensils,
  FaWind,
  FaBed,
  FaUserMd,
  FaComments,
  FaSync,
  FaStar,
  FaBullseye,
  FaUsers,
  FaUser,
  FaClock,
  FaRegSmile,
  FaYinYang,
};

/**
 * Resolve an icon name (string) into a React Icon component.
 * Returns the component if found, otherwise `null` (caller should
 * render nothing rather than crashing).
 *
 * @param {string} iconName - e.g. "FaHeart"
 * @returns {React.ComponentType | null}
 */
export function getIcon(iconName) {
  if (!iconName || typeof iconName !== "string") return null;
  return IconMap[iconName] || null;
}

export default IconMap;
