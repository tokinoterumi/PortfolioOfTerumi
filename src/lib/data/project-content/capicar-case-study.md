## 1. The Market Problem

Structural challenges exist for small-to-medium-sized e-commerce operations:

* **Shopify Admin Complexity**: The backend is overwhelming for warehouse staff, requiring high training costs. It also presents a structural security vulnerability, as granular access controls are lacking, giving all users too much power.
* **WES Overkill**: Existing Warehouse Execution Systems (WES) are too expensive and feature-heavy for small-scale operators.

Based on this analysis, the approach was to build a lightweight, focused operations layer that uses Shopify as a single source of truth.

## 2. The User Insight

An initial web app prototype was built, but field observation revealed critical constraints:

* The warehouse environment suffers from unstable network connectivity.
* Browser-based barcode scanning is slow and inaccurate.

This insight led to a core requirement: reliability and processing performance must be prioritized over all else.

## 3. The Strategic Pivot: Migrating to Native iOS

Based on the insight, the web app policy was retracted, and the product was redesigned as a native iOS application. This was not a simple technology change, but a fundamental product strategy pivot rooted in the user's real-world environment.

* **Solving Network Instability**: An Offline-First architecture was adopted. Using SwiftData, all operations are processed locally, ensuring stable, high-speed operation independent of network conditions.
* **Solving Performance Issues**: The Apple Vision Framework was integrated for high-speed, reliable barcode scanning.

## 4. The Product Design Policy

The CapiCar design policy is "The Cockpit, Not the Engine Room." The goal is to provide an operations environment where staff can focus purely on their tasks without ever touching the complex admin panel.

* **Guided UI**: The interface is centered on product images and SKUs. The design enables task completion through simple "confirmation" actions, not "memory or search," drastically reducing error rates and training costs.
* **Progress Visualization**: A real-time dashboard visualizes the shipping process, allowing the entire team to share a clear view of the current status.

## 5. Outcome & PoC Validation

The Proof of Concept (PoC) as a native application is complete. It has been verified to meet all key technical requirements and possesses the performance necessary for daily business operations.

**Cost Analysis**: The backend (Make.com, Airtable, Render) was assessed, confirming that continuous operation is possible for a low monthly cost, comparable to Render's basic plan.

**Deployment Readiness**: The product has reached a stage where it can deliver immediate value upon deployment, with minimal migration cost from current paper-based workflows.

## 6. The Reflection

The CapiCar project is a demonstration of managing the end-to-end product development lifecycle: from market problem discovery and user environment analysis to understanding technical constraints, making a strategic pivot, and validating the outcome.

The significance of this project is that every stage was consistently based on "field reality."

Ensuring reliability and performance, minimizing implementation cost, and establishing operational continuity—the balance of these three elements is the true condition for a practical and successful product.
