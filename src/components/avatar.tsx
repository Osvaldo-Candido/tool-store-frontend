import { Image } from "react-native";
import { ImageProps } from "react-native";

type ImageType = ImageProps & {
  image: string
}

export function Avatar({image, ...rest}:ImageType)
{
  return (
    <Image source={{uri: image}} {...rest} />
  )
}