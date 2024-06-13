import React from "react";

type Props = {};

export default function Divider({}: Props) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-white/20" />
      </div>
    </div>
  );
}
