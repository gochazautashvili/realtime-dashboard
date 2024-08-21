import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import header from "./header";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ThemedLayoutV2
      Header={header}
      Title={(titleProp) => <ThemedTitleV2 text="Refine" {...titleProp} />}
    >
      {children}
    </ThemedLayoutV2>
  );
};

export default Layout;
