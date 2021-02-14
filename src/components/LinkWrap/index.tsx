import {
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode
} from "react";
import NextLink from "next/link";

function LinkWrap({ children, referenceAs, ...props }: Props, reference) {
  if (referenceAs) {
    // eslint-disable-next-line no-param-reassign
    props[referenceAs] = reference;
  }
  return <>{isValidElement(children) ? cloneElement(children, props) : null}</>;
}

const LinkWrapper = forwardRef(LinkWrap);
type Props = {
  children: ReactNode;
  referenceAs?: any;
  href?: any;
  as?: string;
};
function Link({ referenceAs, children, ...props }: Props): ReactElement {
  const { href } = props;
  return (
    <NextLink href={href} {...props}>
      <LinkWrapper referenceAs={referenceAs}>{children}</LinkWrapper>
    </NextLink>
  );
}
export default Link;
