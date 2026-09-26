import Image from "next/image";
import { useMDXComponent } from "next-contentlayer2/hooks";

const components = {
  Image,
};

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  // Rendered once per page at build time on the server, so there is no state to lose.
  // eslint-disable-next-line react-hooks/static-components
  return <Component components={components} />;
}
