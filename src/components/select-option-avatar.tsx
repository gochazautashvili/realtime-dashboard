import CustomAvatar from "./custom-avatar";
import { Text } from "./text";

interface Props {
  avatarUrl?: string;
  shape?: "circle" | "square";
  name: string;
}

const SelectOptionWithAvatar = ({ name, avatarUrl, shape }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <CustomAvatar shape={shape} name={name} src={avatarUrl} />
      <Text>{name}</Text>
    </div>
  );
};

export default SelectOptionWithAvatar;
