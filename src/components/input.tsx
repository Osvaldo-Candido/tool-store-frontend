import { TextInput, TextInputProps } from "react-native";

type Props = TextInputProps 

export function Input({...rest}:Props)
{
  return (
    <TextInput
    className="border border-gray-300 bg-gray-200 rounded-lg text-xl h-16 px-4"
    {...rest}
    />
  )
}