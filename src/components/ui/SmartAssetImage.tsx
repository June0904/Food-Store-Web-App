import type { CSSProperties } from "react";
import { resolveAssetImage } from "../../data/customImageMap";

interface Props {
  folderPath: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}

export function SmartAssetImage({ folderPath, alt, className, style }: Props) {
  return <img src={resolveAssetImage(folderPath)} alt={alt} className={className} style={style} loading="lazy" />;
}