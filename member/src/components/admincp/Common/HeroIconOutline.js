import * as icons from "@heroicons/react/24/outline";

const HeroIconOutline = ({ icon, ...props }) => {
  const Icon = icons[icon];
  if (!Icon) return <></>;
  return <Icon aria-hidden="true" {...props} />;
};

export default HeroIconOutline;