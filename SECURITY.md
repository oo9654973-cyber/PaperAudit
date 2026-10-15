# Security and privacy

PaperAudit is a static local-first web app. It does not contain a manuscript upload endpoint. The user's selected DOCX and images are parsed locally. Journal catalog links open external sites only after the user clicks them. Public Issue Forms may contain **public text**: never submit unpublished papers, personal information, credentials or unlicensed template files.

**Report vulnerabilities privately:** use GitHub's private vulnerability reporting feature when enabled in the repository Settings > Security. If unavailable, contact the maintainer through a non-public, mutually agreed communication channel. Do not post exploit payloads or confidential documents to public Issues.

Risk boundaries: uploaded files can be large or malicious; limits and ZIP checks reduce but do not eliminate resource-exhaustion risks. Do not treat any "pass" as a security or publication certification. External links and contributor-provided URLs are reviewed before adding them to the approved catalog.
