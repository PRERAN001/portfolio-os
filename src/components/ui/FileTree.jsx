import React, { useState } from "react";
import { Folder, FolderOpen, FileCode, FileJson, FileText, File } from "lucide-react";

function getIcon(name) {
  const ext = name.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "tsx":
    case "jsx":
    case "js":
    case "ts":
      return FileCode;
    case "json":
      return FileJson;
    case "md":
      return FileText;
    default:
      return File;
  }
}

function TreeNode({ item, depth = 0 }) {
  const [open, setOpen] = useState(item.defaultOpen ?? false);
  const isFolder = item.type === "folder";
  const Icon = isFolder ? (open ? FolderOpen : Folder) : getIcon(item.name);

  return (
    <div className="font-mono text-xs">
      <div
        className={`flex items-center gap-1.5 py-1 px-1.5 rounded cursor-pointer select-none hover:bg-zinc-100 transition-colors ${
          item.highlight ? "text-emerald-600" : "text-zinc-600"
        }`}
        style={{ paddingLeft: `${depth * 14 + 6}px` }}
        onClick={() => isFolder && setOpen((o) => !o)}
      >
        <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isFolder ? "text-zinc-500" : "text-zinc-400"}`} />
        <span className="truncate">{item.name}</span>
        {item.tag && (
          <span className="text-[10px] text-zinc-400 ml-auto">{item.tag}</span>
        )}
      </div>

      {isFolder && open && item.children && (
        <div>
          {item.children.map((child, i) => (
            <TreeNode key={i} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileTree({ items, className = "" }) {
  return (
    <div className={`rounded-lg border border-zinc-200 bg-white p-3 ${className}`}>
      {items.map((item, i) => (
        <TreeNode key={i} item={item} />
      ))}
    </div>
  );
}
