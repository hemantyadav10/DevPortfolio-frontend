import { Text } from "@radix-ui/themes";
import { MdCode } from "react-icons/md";
import { Link } from "react-router";

function Logo({
  color = "var(--text)",
  className = ''
}) {
  return (
    <Link to={'/'} className={`flex items-end gap-2 ${className}`} style={{ color }}>
      <MdCode size={28} className="hidden sm:block"/>
      <Text
        as="span"
        size={'5'}
        weight={'bold'}
      >
        DevPortfolio
      </Text>
    </Link>
  )
}

export default Logo
