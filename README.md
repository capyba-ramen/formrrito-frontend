<div align="center">
  <img width="96" src="https://github.com/capyba-ramen/formrrito-frontend/assets/68804592/ca8d637d-8a98-4092-b842-e4312d923be1" />
</div>

## 📖 Table of Contents

- [Summary](#-summary)
- [Introduction](#-introduction)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Management](#-project-management)
- [Future Plans](#-future-plans)

## 🌐 Summary

Welcome to Formrrito! This repository houses the frontend codebase for Formrrito, a platform designed to simplify the process of creating customized forms for various purposes such as events, party inquiries, or academic requirements. Just like wrapping your own burrito, Formrrito allows users to wrap their questions into personalized forms effortlessly.

## 📂 Introduction

Formrrito aims to streamline the form creation process by offering a user-friendly interface and a range of features to cater to diverse needs. Users have the flexibility to start from scratch or utilize pre-designed templates to create forms tailored to their specific requirements.

## 🎨 Features

#### Form Management
- **Create Forms:** Start from scratch or use pre-designed templates.
- **Sort and Infinite Scrolling:** Easily organize forms by last opened time and navigate seamlessly with infinite scrolling.
- **Remove Forms:** Delete unwanted forms effortlessly.

![form-list](https://github.com/capyba-ramen/formrrito-frontend/assets/68804592/b2424c3d-ebbc-410f-bec8-1e4d25b3f71b)

#### Form Editing
- **Question Customization:** Create, edit, remove, or duplicate questions with various types such as multiple choice, checkboxes, dropdowns, paragraphs, and short answers.
- **Option Management:** Tailor options for questions to suit your needs.
- **AI-powered Question Refinement and Option Generation:** Benefit from AI-generated suggestions for question titles, descriptions, and options.
- **URL Sharing:** Share short URLs for easy access to your forms.
- **Form Customization:** Edit form titles, descriptions, and drag-and-drop functionality to rearrange question order.
- **Validation Settings:** Add required validation to ensure accurate responses.
- **Media Upload:** Upload images for forms and questions to enhance visual appeal.
- **Response Control:** Manage acceptance of responses as needed.

![form-edit](https://github.com/capyba-ramen/formrrito-frontend/assets/68804592/e6759ab9-d68c-431a-8fca-3ca468780746)

![gpt](https://github.com/capyba-ramen/formrrito-frontend/assets/68804592/d1f61962-fa56-408b-9b55-418af73990fd)

![image](https://github.com/capyba-ramen/formrrito-frontend/assets/68804592/372f8af5-4a22-4479-ba66-0910beec8553)

![shorturl](https://github.com/capyba-ramen/formrrito-frontend/assets/68804592/459f3596-a65e-48e5-ae43-19a82f2a486f)


#### Form Filling
- **Submit Responses:** Easily fill out forms with a user-friendly interface.
- **Reset Fields:** Clear form fields with the option to reset values.

![fill-form](https://github.com/capyba-ramen/formrrito-frontend/assets/68804592/e2ff5b03-97c3-4f93-be55-5ba0b3d0256e)

#### Responses Management
- **Notification Email:** Users receive notification emails when someone responds to their forms.
- **Response Statistics:** Track responses with detailed statistics and interactive charts.
- **Export to Excel:** Export response data to Excel for further analysis.

![response-email](https://github.com/capyba-ramen/formrrito-frontend/assets/68804592/98032233-2dc6-4917-8450-74f09c192513)

![responses](https://github.com/capyba-ramen/formrrito-frontend/assets/68804592/3c55c853-bb02-4b95-a178-83e95dd00372)

![excel](https://github.com/capyba-ramen/formrrito-frontend/assets/68804592/4e49d8ac-480d-40e9-b0b3-63150e118d4f)


## 🤖 Tech Stack

Formrrito's frontend leverages a robust combination of technologies to ensure an efficient and seamless user experience. Built using TypeScript and Vite.js, with React.js as the core framework, it provides a solid foundation for dynamic and responsive web applications.

Frontend Technologies:
- Framework: React.js
- Build Tool: Vite.js
- Language: TypeScript
- UI Library: Material UI
- Date Utilities: Date-fns
- Form Management: React Hook Form
- Data Fetching: SWR
- Data Visualization: Chart.js

#### Continuous Integration and Deployment (CI/CD):
Formrrito utilizes GitHub Actions for seamless Continuous Integration and Deployment (CI/CD) pipelines. This automates the build, test, and deployment processes, ensuring efficient and reliable updates to the application.

####  Deployment:
Formrrito is deployed on AWS EC2 instances, providing a scalable and reliable hosting environment. Nginx is utilized as a reverse proxy server to efficiently route incoming requests to the application server.

#### Frontend and Backend Architecture:
Below is a simplified diagram showcasing the frontend and backend architecture of Formrrito:

![architecture_diagram](https://github.com/capyba-ramen/formrrito-frontend/assets/68804592/78ea8d4a-18b5-4f11-b8e6-132ec13ca23e)

- Backend Repository: https://github.com/capyba-ramen/formrrito-api-backend

## 🏃 Project Management

During the initial phase, which spanned approximately four weeks, our dedicated team of two members successfully completed phase 1 of this project. This phase laid the foundation for our platform, but we're not stopping there. We're excited to announce that we're planning to introduce additional features and enhancements in phase 2 and beyond.

_Task board showcasing our project management approach._

![board-view](https://github.com/capyba-ramen/formrrito-frontend/assets/68804592/264de4f6-eafa-4e17-8e71-0a22d2b34a4f)

_Figma screenshots demonstrating our design concepts and wireframes._

![figma](https://github.com/capyba-ramen/formrrito-frontend/assets/68804592/d1bae20b-1e15-47c7-b72d-c24136cf9b89)


## 🚀 Future Plans

#### Ideas for Phase 2 or 3:

1. **Expanded User Authentication:** Extend user authentication to cover the entire site, allowing surveyors to manage permissions and control access for anonymous users across all features and functionalities.
2. **Collaborative Editing:** Enable multiple users to collaborate on form creation and editing.
3. **Advanced Form Customization:**  Introduce more customization options for form layouts, themes, and styles, including the integration of an HTML rich text editor for enhanced content formatting capabilities.
4. **Conditional Logic:** Add support for conditional logic, allowing form questions to dynamically change based on previous responses.
5. **Localization:** Implement multi-language support to make Formrrito accessible to users worldwide.

These are just a few ideas to consider for phase 2 or 3. We're excited to continue improving Formrrito and delivering even more value to our users in the future!
