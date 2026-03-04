const AuthDivider = () => {
  return (
    <div className="flex items-center gap-3">
      <hr className="w-full border-border" />
      <span className="text-xs text-muted-foreground uppercase">or</span>
      <hr className="w-full border-border" />
    </div>
  );
};

export default AuthDivider;
