## 1. The Challenge

The Yamanouchi Information Center (YIC) faced significant operational and legal challenges.

* **Compliance Risks**: Paper logs exposed previous customer data. ID photos were stored locally on iPads and the deletion relied on the manual action, creating a clear risk of violating privacy laws.
* **Operational Inefficiency**: Paper-based workflows were inefficient, untraceable, and impossible to audit.
* **Hard Constraint**: The project had zero budget and was required to leverage the existing Google Workspace infrastructure.

## 2. The User Insight

On-site observation revealed the critical problem. I witnessed a staff member, unfamiliar with browsers, struggle to log in, accidentally opening an incognito window.

This made it clear that the primary barrier was not technical, but a psychological barrier to digital tools. With staff (average age 50+) finding the system "difficult," successful adoption was the main risk.

## 3. The Product Strategy

Based on this insight and the zero-budget constraint, I developed a three-part strategy:

### 1. Design-Led Adoption

My first priority was to lower the psychological barrier.

* **For Guests**: I created forms with approachable visuals, using my own photography of the local mountains and a friendly capybara mascot.
* **For Staff**: I designed a simple, SaaS-like UI with a professional "host" capybara (in work clothes) to reduce the learning curve and feel less intimidating.

### 2. Pragmatic Tech for Compliance

I used realistic technology choices to manage cost and compliance.

* **Data Management**: Leveraged existing Google Sheets and Google Drive as a free, real-time database.
* **Compliance**: Deployed a Google Apps Script to automatically delete personal data and photos based on retention rules, completely eliminating the compliance risk.

### 3. PWA for Usability

To solve the "can't find the login page" problem, I adopted a PWA (Progressive Web App). Staff could access to the admin panel with one-tap, removing adoption friction.

## 4. The Impact

* **Data Governance**: Eliminated all personal data exposure risks and established automated data retention and deletion policies.
* **Operational Efficiency**: Consolidated three separate paper-based services into a single digital dashboard, enabling a full digital audit trail for the first time.
* **Successful Adoption**: Staff and visitors transitioned smoothly, achieving 100% digitization of the targeted workflows.

## 5. The Reflection

This project confirmed my core principles:

* **Product Management**: Solving the user's psychological barriers is a prerequisite for successful product adoption.
* **Development**: Pragmatic technology choices are more effective at solving real-world business problems than technical sophistication.
* **Design**: UI and visuals are powerful tools for building trust, reducing anxiety, and directly driving adoption.