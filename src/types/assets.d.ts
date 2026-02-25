declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}

declare module "*.mp3" {
  const src: string;
  export default src;
}

declare module "*.svg?react" {
  import { FunctionComponent, SVGProps } from "react";

  const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
