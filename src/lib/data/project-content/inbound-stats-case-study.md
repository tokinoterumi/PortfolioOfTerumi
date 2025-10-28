## Design Philosophy & App Structure

### 1. Background & Design Philosophy

**Background**: The Yamanouchi Information Center, strategically located in front of Yudanaka Station serves as a vital hub for international visitors. Historically, the process for creating mandatory monthly visitor reports for the Japan National Tourism Organization (JNTO) was manual, paper-based, and faced the following critical challenges:

* **Operational Inefficiency**: Daily handwritten tallying and the subsequent manual data entry into a massive Excel table (approx. 2,800 cells) was a significantly cumbersome practice.
* **Incomplete Data**: The system lacked a method for recording non-JNTO-specified nationalities, resulting in a loss of valuable data.
* **Lack of Accuracy and Timeliness**: Manual aggregation was prone to human error and made real-time analysis impossible.

**Objective**: This web application was developed to fundamentally solve these issues. The goal extends beyond mere operational efficiency; it is to transform raw data into strategic assets that enable data-driven decision-making for local tourism initiatives.

#### Principle: Never make it more cumbersome than paper

The core principle of this project is "It must be simpler than paper." A digital tool that takes longer to use than a pen and tally sheet defeats its own purpose. That's why the form design prioritizes intuitive and minimal interactionjust type, select, and submit.

The first hard requirement was that the monthly summary output must exactly match the format used in official reports to JNTO (country name and visitor count). The app's logic and structure are entirely built around this format compliance.

### 2. Tech Stack & Architecture

#### Tech Stack: Google Apps Script + Google Sheets

Since the Information Center already uses Google Workspace, building the app with Google Apps Script and using Sheets as the database was the optimal choice. This approach eliminated all hosting costs and the need for a separate authentication system. User access is securely managed by existing Workspace permissions, allowing for rapid, zero-cost deployment.

#### Structure: A pseudo-Single-Page Application with 3 Key Modules

The application functions as a pseudo-Single-Page Application (SPA), providing a fast and seamless user experience. Navigation is handled on the client-side, switching between three core views without page reloads.

### 3. Data Structure

#### The Challenge: Balancing Data Integrity with Reporting Compliance

Previously, the paper-based system could only track countries specified by the JNTO (Japan National Tourism Organization), leading to incomplete data. This application was designed to include nearly 200 countries and territories, reducing ambiguous entries like "Unknown/Other" and establishing a foundation for more precise data analysis.

However, the system must also comply with the strict reporting format required by the JNTO, which lists specific countries in a specific order. To meet both of these requirements, the following master data structure was designed.

#### Master Data: The "Countries" Sheet

All nationality data is centrally managed in the Countries sheet, which is composed of four columns:

* **Name**: The country name, used as the primary key for data entry and aggregation.
* **Region**: The region name, used to group countries for an improved UI/UX.
* **Is Frequent**: A TRUE/FALSE flag to manage whether a country is a frequently tracked "major country" for JNTO reporting. This determines if a country is listed individually or grouped into "Rest of {Region}" in the summary.
* **Display Order**: A number that defines the manual sort order for the monthly summary report. This allows the application to generate a report that perfectly matches the official JNTO format's sequence.

#### Core Design: The Dual-Sorting Logic

To satisfy both usability and reporting requirements, the application implements two different sorting logics depending on the context:

* **Alphabetical Sort for Data Entry**: To help staff find countries quickly, the country selection dropdown in the data entry form is sorted alphabetically within the chosen region. This optimizes the daily workflow for speed and ease of use.
* **Manual Sort for Monthly Summary**: For the monthly summary display and the Excel export, countries are sorted based on the numeric value in the Display Order column. This ensures that the generated report is a one-to-one replica of the official JNTO format, fulfilling the primary requirement of the system.

This dual-sorting design is the core of the application's architecture, allowing it to achieve both "ease of use" for daily tasks and "strict compliance" for final reporting.

### 4. Key Features

#### Data Entry & Daily Log

* A clean form that accepts visitor nationality, count, accommodation area, and inquiry details.
* Submitted data immediately appears below in the "Recent Entries" log.
* Each entry includes "Edit" and "Delete" buttons to easily correct mistakes.

#### Monthly Summary

**The Problem**: Staff were manually tallying visitor counts daily on paper, simply to produce a monthly report. This daily work was redundant if the final goal was only a monthly total.

**The Solution**: By timestamping every entry, the application can aggregate totals on demand. The tedious daily paperwork is completely eliminated.

**Features**
* Users select a year and month to instantly calculate and display visitor totals by nationality.
* The results are presented in a format designed for easy reference when creating official JNTO reports.
* An "Export to Excel" button provides a one-click .xlsx download for administrative needs.

#### Inquiry Search & Knowledge Base

**The Problem**: Valuable staff knowledgehow to answer complex questionswas an intangible asset, lost if not recorded. New staff lacked a way to reference past successful interactions.

**The Solution**: Transform the "Inquiry Details" text field into a searchable knowledge base. The application becomes the organization's collective memory.

**Features**
* A keyword search bar instantly queries the entire history of inquiry logs.
* Staff can find how similar questions were handled in the past, standardizing service quality and empowering new team members.
* This log of real-world visitor questions becomes an invaluable asset for future big data and AI analysis.