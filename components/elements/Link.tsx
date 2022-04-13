/* eslint-disable jsx-a11y/anchor-is-valid */
import NextLink from 'next/link';
import React from 'react';
interface LinkProps {
  children: React.ReactNode;
  linkTo?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
  download?: boolean;
}
const Link = ({
  children,
  linkTo,
  className,
  style,
  onClick,
  disabled,
  download,
  ...rest
}: LinkProps) => {
  // who added this?
  if (disabled) {
    return <>{children}</>;
  }
  if (onClick) {
    return (
      <button className={className} style={style} onClick={onClick} {...rest}>
        {children}
      </button>
    );
  }
  if (!linkTo) {
    return <a {...rest}>{children}</a>;
  }
  const regex = new RegExp('https?|wwww');
  const mailRegex = new RegExp('mailto');
  const phoneRegex = new RegExp('tel');
  const outward = regex.test(linkTo);
  const mail = mailRegex.test(linkTo);
  const tel = phoneRegex.test(linkTo);

  if (outward || mail || tel || download)
    return (
      <a
        href={linkTo}
        download
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
        {...rest}
      >
        {children}
      </a>
    );

  return (
    <NextLink href={linkTo}>
      <a className={className} style={style} {...rest}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
