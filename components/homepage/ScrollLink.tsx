"use client";

import React from "react";

type Props = React.PropsWithChildren<{
  href: string; // expects an id like #features
  className?: string;
  onClick?: () => void;
}>;

export default function ScrollLink({ href, className, children, onClick }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href?.startsWith("#")) {
      e.preventDefault();
      const id = href.substring(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    onClick?.();
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}

