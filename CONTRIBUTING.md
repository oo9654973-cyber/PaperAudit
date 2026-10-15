# Contributing to PaperAudit

Thank you for helping develop a trustworthy, privacy-preserving manuscript checker.

1. Open a Bug Report or Feature Request to explain a reproducible problem. Use **synthetic or publicly shareable files**, never private manuscripts.
2. Create a branch, add a focused change, and provide positive and negative test cases.
3. Run `python -m pytest tests -q` and `node scripts/validate_catalog.mjs` before a PR. Browser tests require Python pytest/playwright and Chromium.
4. Journal author-guide entries must have official HTTPS provenance, scope, date, and redistribution rights; entries remain pending until maintainer review.
5. A clean audit is not journal acceptance or certification; report uncertain cases as `unverified`.

Maintainers review reproducibility, licensing, test results, user privacy and false-positive/false-negative risk before merging.
