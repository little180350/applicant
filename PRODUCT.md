# Product

<!-- impeccable:product-schema 1 -->

## Platform
web

## Users
Employees use the system to review welfare benefits and manage employee information. Heads or managers submit welfare requests on behalf of employees.

## Product Purpose
The system provides employee welfare information and workflows for submitting and tracking welfare requests.

## Positioning
Open: no differentiating product position has been established.

## Operating Context
The application includes workflows for reviewing welfare benefits, submitting requests, tracking request status, viewing employee profiles, and viewing organizational structure.

## Capabilities and Constraints
- The manager-submitted welfare request flow selects an employee, records request details, attaches supporting documents, and confirms submission.
- Long request content is divided into two steps within the same route.
- The `/HeadEm` page is desktop-only and does not need responsive layouts.
- Existing application routes are implemented with Next.js.

## Evidence on Hand
- Existing application pages and navigation under `app/` demonstrate welfare, profile, status, and organization workflows.
- The user-provided screenshot is the reference for the manager-submitted welfare request page.
