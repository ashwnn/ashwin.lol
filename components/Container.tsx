function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className={`flex-grow`}>{children}</div>
    );
  }
  
  export default Container;
  