#!/usr/bin/env python3
"""Deploy Adrijen Healthcare site to Hostinger via FTP.

Usage:
  FTP_HOST=89.117.27.81 \\
  FTP_USER='u576956637.adrijenhealthcare.com' \\
  FTP_PASS='your-ftp-password' \\
  python3 deploy.py
"""
from __future__ import annotations
import os, sys, ftplib, socket
from pathlib import Path

ROOT = Path(__file__).parent
# This Hostinger FTP user is chrooted into public_html, so PWD "/" *is* the web root.
REMOTE_BASE = "/"
# Stale files to remove on each deploy (Hostinger placeholder + retired assets).
PRE_DELETE = ["default.php", "images/favicon.svg", "images/logo.svg", "images/favicon-64.png"]

# Files / dirs to never upload
EXCLUDE_DIRS = {"pages", "__pycache__", ".git"}
EXCLUDE_FILES = {"build.py", "deploy.py", ".DS_Store"}

HOST = os.environ.get("FTP_HOST")
USER = os.environ.get("FTP_USER")
PASS = os.environ.get("FTP_PASS")
PORT = int(os.environ.get("FTP_PORT", "21"))

if not (HOST and USER and PASS):
    sys.exit("Set FTP_HOST, FTP_USER, FTP_PASS env vars.")


def ensure_dir(ftp: ftplib.FTP, path: str) -> None:
    parts = [p for p in path.strip("/").split("/") if p]
    here = ""
    for p in parts:
        here = f"{here}/{p}"
        try:
            ftp.cwd(here)
        except ftplib.error_perm:
            try:
                ftp.mkd(here)
                print(f"  + mkdir {here}")
            except ftplib.error_perm as e:
                print(f"  ! mkdir failed {here}: {e}")
    ftp.cwd("/")


def collect_files() -> list[Path]:
    out: list[Path] = []
    for p in ROOT.rglob("*"):
        if not p.is_file():
            continue
        rel_parts = p.relative_to(ROOT).parts
        if any(part in EXCLUDE_DIRS for part in rel_parts):
            continue
        if p.name in EXCLUDE_FILES:
            continue
        out.append(p)
    return sorted(out)


def main() -> None:
    files = collect_files()
    if not files:
        sys.exit("No files to upload.")
    print(f"Connecting to {HOST}:{PORT} as {USER} ...")
    ftp = ftplib.FTP()
    ftp.connect(HOST, PORT, timeout=30)
    ftp.login(USER, PASS)
    print("Logged in.")
    print("PWD:", ftp.pwd())

    try:
        ftp.cwd(REMOTE_BASE)
    except ftplib.error_perm:
        ensure_dir(ftp, REMOTE_BASE)
        ftp.cwd(REMOTE_BASE)
    print("Base dir:", ftp.pwd())

    for stale in PRE_DELETE:
        try:
            ftp.delete(stale)
            print(f"  - removed stale {stale}")
        except ftplib.error_perm:
            pass  # not present, fine

    # Pre-create remote directories
    remote_dirs = sorted({str(p.relative_to(ROOT).parent).replace("\\", "/")
                          for p in files if p.relative_to(ROOT).parent != Path(".")})
    for d in remote_dirs:
        ensure_dir(ftp, f"{REMOTE_BASE}/{d}")
    ftp.cwd(REMOTE_BASE)

    n_ok = n_fail = 0
    for fp in files:
        rel = fp.relative_to(ROOT).as_posix()
        try:
            with open(fp, "rb") as f:
                ftp.storbinary(f"STOR {rel}", f)
            print(f"  ✓ {rel}  ({fp.stat().st_size:,} B)")
            n_ok += 1
        except Exception as e:
            print(f"  ✗ {rel}: {type(e).__name__} {e}")
            n_fail += 1

    try:
        ftp.quit()
    except Exception:
        pass

    print()
    print(f"Done. Uploaded {n_ok} files, {n_fail} failed.")
    if n_fail:
        sys.exit(1)


if __name__ == "__main__":
    try:
        main()
    except (socket.timeout, ConnectionError) as e:
        sys.exit(f"Connection error: {e}")
    except ftplib.error_perm as e:
        sys.exit(f"FTP permission error: {e}")
