import ListProvider from "../context/listContext";

const wrapperProvider = ({ children }: any) => (
  <ListProvider>{children}</ListProvider>
);

export { wrapperProvider };
