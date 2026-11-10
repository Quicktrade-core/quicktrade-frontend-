"""
dump_frontend.py

Walks the src/ folder from the current directory and writes every
content (source) file's content into a single, well-structured text file.

- Only includes source/content files (js, ts, css, json, md, etc.)
- Skips ALL media: images, videos, audio, fonts, archives, lockfiles, binaries
- Output is structured: project tree -> TOC by folder -> file contents by folder

Usage:
    python dump_frontend.py

Output:
    frontend_dump.txt  (in the same directory)
"""

import os
from pathlib import Path
from datetime import datetime

# Root folder to walk, relative to where this script is run
TARGET_ROOT = "src"

# Content file extensions to include
INCLUDE_EXTS = {
    ".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs",
    ".css", ".scss", ".sass", ".less",
    ".json", ".md", ".mdx", ".txt",
    ".html", ".vue", ".svelte",
    ".graphql", ".gql",
    ".env", ".example",
}

# Media / binary / archive extensions to NEVER include
EXCLUDE_EXTS = {
    # images
    ".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".ico",
    ".bmp", ".tiff", ".avif", ".heic",
    # videos
    ".mp4", ".mov", ".avi", ".mkv", ".webm", ".flv", ".wmv", ".m4v",
    # audio
    ".mp3", ".wav", ".ogg", ".flac", ".aac", ".m4a",
    # fonts
    ".woff", ".woff2", ".ttf", ".otf", ".eot",
    # archives / binaries
    ".zip", ".tar", ".gz", ".rar", ".7z",
    ".pdf", ".exe", ".dll", ".so", ".dylib",
    ".pyc", ".class", ".o", ".a",
}

# Filenames to always skip
SKIP_FILES = {
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    ".DS_Store",
}

# Folders to skip anywhere in the tree
SKIP_DIRS = {
    "node_modules", ".next", "dist", "build", ".git",
    ".turbo", "coverage", ".cache", ".vercel",
}

OUTPUT_FILE = "frontend_dump.txt"


def should_include(path: Path) -> bool:
    name = path.name
    if name in SKIP_FILES:
        return False
    suffix = path.suffix.lower()
    # Hard-exclude media/binaries first
    if suffix in EXCLUDE_EXTS:
        return False
    # Allow known content extensions, or known content filenames (.env, etc.)
    if suffix in INCLUDE_EXTS:
        return True
    # e.g. ".env.example" -> suffix is ".example"
    if suffix == ".example":
        return True
    return False


def walk_and_collect(root: Path):
    """Return sorted list of (relative_path, absolute_path)."""
    target = root / TARGET_ROOT
    if not target.exists():
        print(f"⚠️  Folder not found: {TARGET_ROOT}/")
        return []

    collected = []
    for dirpath, dirnames, filenames in os.walk(target):
        dirnames[:] = sorted(d for d in dirnames if d not in SKIP_DIRS)
        for fname in sorted(filenames):
            abs_path = Path(dirpath) / fname
            if should_include(abs_path):
                rel_path = abs_path.relative_to(root)
                collected.append((rel_path, abs_path))
    # Sort by full path for a clean, folder-grouped order
    collected.sort(key=lambda x: str(x[0]).lower())
    return collected


def build_tree(paths):
    """Build a visual directory tree string from relative paths."""
    tree = {}
    for rel, _ in paths:
        parts = rel.parts
        node = tree
        for part in parts:
            node = node.setdefault(part, {})

    lines = []

    def render(node, prefix=""):
        entries = sorted(node.items(), key=lambda kv: (len(kv[1]) == 0, kv[0].lower()))
        # files first, then folders
        entries.sort(key=lambda kv: (not kv[1], kv[0].lower()))  # dirs first
        for i, (name, child) in enumerate(entries):
            last = i == len(entries) - 1
            connector = "└── " if last else "├── "
            is_file = not child
            lines.append(f"{prefix}{connector}{name}{'' if is_file else '/'}")
            if child:
                extension = "    " if last else "│   "
                render(child, prefix + extension)

    render(tree)
    return "\n".join(lines)


def main():
    root = Path.cwd()
    out_path = root / OUTPUT_FILE

    collected = walk_and_collect(root)

    if not collected:
        print(f"⚠️  No content files found in {TARGET_ROOT}/.")
        print("   Make sure you're running this from the project root.")
        return

    # Group by top-level folder under src/ for structured sections
    groups = {}
    for rel, abs_path in collected:
        # e.g. ('src', 'components', 'ui', 'Button.tsx') -> section 'src/components/ui'
        section = "/".join(rel.parts[:-1]) or "."
        groups.setdefault(section, []).append((rel, abs_path))

    print(f"📦 Found {len(collected)} files across {len(groups)} folders.")
    print(f"✍️  Writing to {OUTPUT_FILE}...\n")

    with out_path.open("w", encoding="utf-8") as f:
        # ---------------- HEADER ----------------
        f.write("=" * 80 + "\n")
        f.write("FRONTEND SOURCE DUMP\n")
        f.write(f"Generated: {datetime.now().isoformat(timespec='seconds')}\n")
        f.write(f"Root:      {root}\n")
        f.write(f"Folder:    {TARGET_ROOT}/\n")
        f.write(f"Files:     {len(collected)}\n")
        f.write(f"Folders:   {len(groups)}\n")
        f.write("=" * 80 + "\n\n")

        # ---------------- PROJECT TREE ----------------
        f.write("PROJECT STRUCTURE\n")
        f.write("-" * 80 + "\n")
        f.write(f"{TARGET_ROOT}/\n")
        f.write(build_tree(collected) + "\n\n")
        f.write("=" * 80 + "\n\n")

        # ---------------- TABLE OF CONTENTS (grouped by folder) ----------------
        f.write("TABLE OF CONTENTS (by folder)\n")
        f.write("-" * 80 + "\n")
        idx = 1
        for section in sorted(groups.keys(), key=str.lower):
            f.write(f"\n📁 {section}/\n")
            for rel, _ in sorted(groups[section], key=lambda x: str(x[0]).lower()):
                f.write(f"   [{idx:>3}] {rel.name}\n")
                idx += 1
        f.write("\n" + "=" * 80 + "\n\n")

        # ---------------- FILE CONTENTS (grouped by folder) ----------------
        idx = 1
        total = len(collected)
        for section in sorted(groups.keys(), key=str.lower):
            f.write("\n" + "#" * 80 + "\n")
            f.write(f"# FOLDER: {section}/\n")
            f.write("#" * 80 + "\n\n")

            for rel, abs_path in sorted(groups[section], key=lambda x: str(x[0]).lower()):
                try:
                    content = abs_path.read_text(encoding="utf-8")
                except (UnicodeDecodeError, OSError) as e:
                    print(f"⚠️  Skipping unreadable file: {rel}  ({e})")
                    idx += 1
                    continue

                f.write(f"[FILE {idx}/{total}]  {rel}\n")
                f.write("-" * 80 + "\n")
                f.write(content)
                if not content.endswith("\n"):
                    f.write("\n")
                f.write("-" * 80 + "\n\n")
                idx += 1

    size_kb = out_path.stat().st_size / 1024
    print(f"✅ Done. {out_path.name} — {size_kb:.1f} KB, {len(collected)} files.")
    print(f"   Full path: {out_path}")


if __name__ == "__main__":
    main()