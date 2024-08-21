import { Text } from "@/components/text";
import { PlusOutlined } from "@ant-design/icons";
import { useDroppable, UseDroppableArguments } from "@dnd-kit/core";
import { Badge, Button, Space } from "antd";
import { ReactNode } from "react";

interface Props {
  id: string;
  title: string;
  count: number;
  children?: ReactNode;
  description?: ReactNode;
  data?: UseDroppableArguments["data"];
  onAddClick?: (args: { id: string }) => void;
}

const KanbanColumn = ({
  children,
  data,
  description,
  id,
  title,
  count,
  onAddClick,
}: Props) => {
  const { isOver, setNodeRef, active } = useDroppable({
    id,
    data,
  });

  const onAddClickHandler = () => {
    onAddClick?.({ id });
  };

  return (
    <div
      ref={setNodeRef}
      style={{ display: "flex", flexDirection: "column", padding: "0 16px" }}
    >
      <div style={{ padding: "12px" }}>
        <Space>
          <Text
            size="xs"
            strong
            style={{ textTransform: "uppercase", whiteSpace: "nowrap" }}
            ellipsis={{ tooltip: title }}
          >
            {title}
          </Text>
          {!!count && <Badge count={count} color="cyan" />}
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            onClick={onAddClickHandler}
          />
        </Space>
      </div>
      {description}
      <div
        style={{
          flex: 1,
          overflowY: active ? "unset" : "auto",
          border: "2px dashed transparent",
          borderColor: isOver ? "#000040" : "transparent",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;
