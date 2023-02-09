function Container({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex-grow font-Inter">{children}</div>
  );
}

export default Container;
