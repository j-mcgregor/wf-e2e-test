/* eslint-disable jsx-a11y/anchor-is-valid */
import NextLink from 'next/link';
import React from 'react';
interface LinkProps {
  children: React.ReactNode;
  linkTo: string;
  className?: string;
  style?: React.CSSProperties;
}
const Link = ({ children, linkTo, className, style }: LinkProps) => {
  const regex = new RegExp('https?|wwww');
  const mailRegex = new RegExp('mailto');
  const phoneRegex = new RegExp('tel');
  const outward = regex.test(linkTo);
  const mail = mailRegex.test(linkTo);
  const tel = phoneRegex.test(linkTo);

  if (outward || mail || tel)
    return (
      <a
        href={linkTo}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {children}
      </a>
    );

  return (
    <NextLink href={linkTo}>
      <a className={className} style={style}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
