# Firebase Security Specification: Inquiries Collection

## Phase 0: Payload-First Security Spec & Data Invariants

### 1. Data Invariants
- **Public Ingestion, Private Storage**: Anyone (prospective client) can submit a new inquiry via `/inquiries/{inquiryId}` without prior authentication.
- **Client Isolation**: Public users CANNOT read, query, list, modify, or delete existing inquiries. Only authorized administrators (Sayan) can read or update inquiry status.
- **Server Timestamps**: The `createdAt` property MUST strictly match `request.time`.
- **String Boundary Constraints**:
  - `fullName`: string, length between 2 and 100 characters.
  - `workEmail`: string, length between 5 and 120 characters, matching email format.
  - `companyUrl`: optional string, max 200 characters.
  - `selectedService`: string, max 100 characters.
  - `budgetRange`: string, max 100 characters.
  - `timeline`: string, max 100 characters.
  - `message`: string, length between 15 and 3000 characters.
  - `status`: optional string, restricted to `'new'` at creation time.
- **Strict Key Allowlisting**: Only known schema fields are accepted. Ghost fields or injected metadata are rejected.

### 2. The Dirty Dozen Payloads (Designed to break Identity, Integrity & State)
1. **Ghost Field Injection**: Payload contains extra field `{ "isAdmin": true, "hack": "payload" }` -> REJECTED.
2. **Client Timestamp Spoofing**: Payload provides `{ "createdAt": "2020-01-01T00:00:00Z" }` instead of `request.time` -> REJECTED.
3. **Empty / Sub-minimum Name**: `{ "fullName": "A" }` (< 2 chars) -> REJECTED.
4. **Denial of Wallet Name Buffer**: `{ "fullName": "A".repeat(500) }` (> 100 chars) -> REJECTED.
5. **Malformed Email Format**: `{ "workEmail": "invalid-email-string" }` -> REJECTED.
6. **Denial of Wallet Email Buffer**: `{ "workEmail": "a".repeat(300) + "@example.com" }` (> 120 chars) -> REJECTED.
7. **Short Spam Message**: `{ "message": "Hi there" }` (< 15 chars) -> REJECTED.
8. **Denial of Wallet Message Explosion**: `{ "message": "X".repeat(50000) }` (> 3000 chars) -> REJECTED.
9. **Invalid Status Escalation at Ingestion**: `{ "status": "reviewed" }` -> REJECTED.
10. **Public Scraping Attempt**: Unauthenticated client executes `list` or `get` on `/inquiries` -> PERMISSION_DENIED.
11. **Malicious Update Attempt**: Public client attempts to overwrite an existing inquiry -> PERMISSION_DENIED.
12. **Malicious Delete Attempt**: Public client attempts to purge inquiries -> PERMISSION_DENIED.
