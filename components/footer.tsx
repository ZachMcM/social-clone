export function Footer() {
  return (
    <div className="w-full gap-4 flex items-center border-t p-4">
      <p className="font-medium text-xs">
        Built by{" "}
        <a className="underline" href="https://zachmcmullen.com">
          Zach McMullen
        </a>
        . Hosted on{" "}
        <a className="underline" href="https://vercel.com">
          Vercel
        </a>
        . Source code available on{" "}
        <a className="underline" href="https://github.com/ZachMcM/social-clone">
          GitHub
        </a>
        .
      </p>
    </div>
  );
}
