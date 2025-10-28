## 1. The Challenge: Compliance Risks and Operational Chaos in Snow Monkey Town

The Yamanouchi Information Center, a vital hub for international visitors to Japan's "Snow Monkey Town," was trapped in a paper-based reality that created significant operational and compliance risks. Its core services—bike rentals, onsen passes, and luggage storage—were managed through disconnected manual processes.

### Critical Issues

* **Privacy Compliance Violations**: Paper registration forms exposed personal information to subsequent customers, creating potential violations of Japan's Personal Information Protection Act
* **Data Security Gaps**: Customer ID photos were stored locally on iPads with no systematic deletion policy, creating uncontrolled personal data retention
* **Workflow Inefficiency**: Manual paper processes required physical document management, filing, and manual status tracking across three different service types
* **Audit Trail Deficiency**: No systematic record-keeping for rental lifecycles, making it impossible to track equipment, resolve disputes, or analyze service patterns

The goal was to implement a comprehensive digital transformation that would ensure compliance, improve operational efficiency, and provide a professional customer experience—all within a zero-budget constraint using existing Google Workspace infrastructure.

## 2. The Solution: A Tale of Two Capybaras

I architected and built Capico, a production-ready digital operations system with distinct customer and staff interfaces powered by a unified SvelteKit backend. The system transforms traditional paper workflows into a structured, compliant, and efficient digital process through two specialized "capybara assistants."

### 2.1 The Tourist Capybara: Welcoming Digital Experience

**Customer Registration Interface**: A self-service Progressive Web App featuring:

* Visual service selection (bike rental, onsen passes, luggage storage) with bilingual UI (Japanese/English) using carefully chosen Kosugi and Outfit font pairing
* Streamlined data collection replacing multiple paper forms
* Integrated ID photo capture with direct Google Drive upload
* Local landscape photography as background (my own photography of Yamanouchi's snowy mountains) to enhance sense of place
* Custom mascot design: "Tourist Capybara" with onsen towel, reflecting the local hot spring culture

### 2.2 The Host Capybara: Pragmatic Operations Hub

The biggest technical challenge wasn't architectural—it was human. During user observation, I witnessed a staff member struggle to access the system after accidentally opening an incognito browser tab. This revealed that traditional web app deployment would create an adoption barrier for non-technical users.

**Staff Management Interface**: A comprehensive operations dashboard providing:

* Real-time visibility into all active rentals across service types using structured 55-field database schema
* Complete rental lifecycle management from check-in to return processing
* Google OAuth integration leveraging existing organizational accounts
* Strategic PWA deployment addressing staff technical literacy: the "Add to Home Screen" functionality creates native app icons, eliminating the need for staff to navigate browsers or remember URLs
* Distinct "Host Capybara" icon in traditional work clothes (samue), providing clear visual differentiation from the customer interface

### 2.3 Compliance-First Technical Architecture

#### 3-Tier Security Design

* **Presentation Layer**: SvelteKit client handling only UI logic and user interactions
* **Business Logic Layer**: Unified SvelteKit server managing all rental workflows, calculations, and data validation
* **Data Layer**: Google Workspace APIs accessed via Service Account with credentials stored as secure environment variables

#### Structured Data Management

* 55-field database schema in Google Sheets providing comprehensive rental record structure (rentalID, status, customerName, serviceType, expectedReturn, photoFileID, etc.)
* Automatic audit trails with timestamp tracking (submittedAt, lastUpdated, returnedAt)
* Service Account architecture ensuring API credentials never exposed to client-side code
* Systematic file management with Google Drive integration for secure ID photo storage

#### Cost-Effective Infrastructure Strategy
Leveraging the organization's existing Google Workspace subscription enabled deployment of a production-ready system with zero infrastructure costs through Google Sheets API for structured data storage, Google Drive API for secure file handling, and Google OAuth for seamless staff authentication.

## 3. Measurable Impact and Outcomes

### Compliance Achievement

* 100% elimination of personal data exposure risks through digital form isolation
* Systematic data retention policies replacing uncontrolled iPad storage
* Complete audit trails for all customer interactions and staff actions with structured timestamp tracking
* Standardized data collection ensuring consistent information capture across 55 data fields

### Operational Efficiency

* Unified workflow management for three distinct service types through single interface
* Real-time status visibility replacing manual paper-based tracking across rental lifecycle
* Automated calculations for pricing and duration tracking, eliminating manual errors
* Structured data queries enabling instant record retrieval and service history access

### Staff Experience

* Reduced training complexity through intuitive PWA interface eliminating browser navigation
* Foolproof system access via dedicated app icons on iPad home screens
* Integrated authentication using existing Google accounts without additional password management
* Comprehensive service oversight through unified dashboard managing all rental types

### Customer Experience

* Professional digital touchpoint replacing paper-based registration with bilingual interface
* Visual service selection reducing language barriers for international visitors
* Streamlined check-in process with immediate confirmation and secure data handling
* Localized design elements creating sense of place through regional photography and cultural mascot

## Technical Implementation and Architecture

**Frontend Architecture**: SvelteKit-based responsive interface with Progressive Web App capabilities, custom CSS design featuring local landscape photography, bilingual UI optimization, and context-aware mascot design reflecting local hot spring culture.

**Backend Integration**: Unified SvelteKit server providing RESTful API endpoints, comprehensive business logic for rental lifecycle management, secure Service Account integration with Google Workspace APIs, and structured data validation across 55-field schema.

**Security Implementation**: Service Account credentials stored as environment variables, client-side API credential protection, systematic file organization in Google Drive, and OAuth integration with existing organizational accounts.

## 4. Reflection and Key Learnings

This project demonstrated that effective digital transformation requires understanding actual user contexts rather than pursuing technical sophistication. The key insight came from direct user observation—witnessing staff struggle with browser navigation led to the PWA deployment strategy that ensured seamless adoption.

The solution succeeded by focusing on compliance requirements and workflow optimization within real-world constraints. By leveraging existing infrastructure capabilities and implementing security-first design patterns, the system delivers measurable business value while remaining maintainable and cost-effective.

The project reinforced that the most impactful solutions often emerge from pragmatic engineering decisions: creating purpose-built interfaces for distinct user groups, maintaining unified data integrity, and solving actual operational problems rather than pursuing technology for its own sake.