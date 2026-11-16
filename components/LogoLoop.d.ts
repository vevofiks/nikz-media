import type { CSSProperties, Key, ReactNode } from "react";

export type LogoItem =
  | {
      node: ReactNode;
      title?: string;
      href?: string;
      hoverColor?: string;
      ariaLabel?: string;
    }
  | {
      src: string;
      alt?: string;
      title?: string;
      href?: string;
      hoverColor?: string;
      srcSet?: string;
      sizes?: string;
      width?: number | string;
      height?: number | string;
    };

export type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutWidth?: number;
  scaleOnHover?: boolean;
  layout?: "line" | "wave" | "arc" | "orbit";
  bend?: number;
  focus?: number;
  magnify?: number;
  tiltX?: number;
  tiltY?: number;
  step?: boolean;
  muted?: number;
  labels?: "none" | "inline" | "below" | "hover";
  draggable?: boolean;
  scrollBoost?: number;
  intro?: boolean;
  renderItem?: (item: LogoItem, key: Key) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

declare const LogoLoop: import("react").MemoExoticComponent<
  (props: LogoLoopProps) => JSX.Element
>;

export default LogoLoop;
