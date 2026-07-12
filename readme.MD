
### ZPUB_READER // v1.2

Automated EPUB Vault for Ubuntu Server. High-leverage, local-first asset
management.

Quick Start

cd backend
npm install
node server.js

System Configuration

| Key         | Specification                    |
| :---------- | :------------------------------- |
| **Host**    | HP Elitebook (Ubuntu)            |
| **Backend** | Node.js / Express                |
| **Ledger**  | SQLite3 (`vault.db`)             |
| **Root**    | `/public`                        |
| **UI**      | SQLite.org / Japanese Minimalist |

File Infrastructure

/zpub_reader
├── /backend            # Logic & Ledger
│   ├── server.js       # Core Engine
│   └── vault.db        # SQLite Database
└── /public             # Static Perimeter
    ├── /html_files     # UI Entry
    ├── /css_files      # Stylesheet
    ├── /fonts          # Typography
    └── /assets         # EPUB Storage

Operational Directives

  - Absolute Paths: All assets must be referenced from the /public root.
  - Audit Logging: All requests are logged to stdout for loss prevention.
  - Portability: System is a self-contained folder asset.

Status: OPERATIONAL Admin: 5cr4ppyz