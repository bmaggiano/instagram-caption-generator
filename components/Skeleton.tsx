import { Skeleton } from 'antd';

interface ImagePlaceholderProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export default function ImagePlaceholder({ className, width, height }: ImagePlaceholderProps) {
  return <Skeleton.Image className={className} style={{ width, height }} />;
}
