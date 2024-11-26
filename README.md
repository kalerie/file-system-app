<h1 align="center">DocSync: A File Management and Real-Time Collaboration App</h1>

<div align="center">
 A real-time collaborative editor that lets multiple users create, edit, and share documents seamlessly from anywhere. 
  <br/>See it in action —  <a href="https://file-system-app-beta.vercel.app/" target="_blank"><b>have a look here!</b></a>
  <br/><b>PS: To try out the app, users simply log in with their Google account for secure access.</b>
</div>
<br />

## 📋 <a name="table">Table of Contents</a>

- 📌 [Missions/Challenges](#challenge)
- ⚙️ [Tech Stack](#tech-stack)
- 🌟 [Process](#process)
- 🎯 [Result](#result)
- 🤸 [Quick Start (locally set up)](#quick-start)


## <a name="challenge">📌 Missions/Challenges</a>

👇 **Mission:**
   - To create a user-friendly file management application that integrates real-time editing and secure sharing functionalities, with an easy and secure Google account login.

👇 **Challenges:**
   - Building a robust file management system with real-time collaboration features.
   - Developing secure authentication and authorization using Google accounts.
   - Ensuring smooth, conflict-free updates during live edits.
   - Designing a responsive interface that works across devices.
   - Balancing simplicity with a rich suite of features for collaboration and file organization.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- TypeScript
- Liveblocks
- Lexical Editor
- ShadCN
- Tailwind CSS


## <a name="process">🌟 Process</a>

 1. ✔️ **Requirement Analysis:**
 
    - Focused on providing a secure and efficient file system that simplifies document organization and enhances team collaboration.
      
 2. ✔️ **Technology Selection:**
 
    - **Frontend:** Next.js with TypeScript for a scalable and high-performance user interface.
    - **Realtime Collaboration:** Liveblocks to enable live updates and active collaborator tracking.
    - **Editor Core:** Lexical Editor for a flexible and feature-rich text editor.
    - **Styling:** Tailwind CSS and ShadCN for responsive, accessible designs.
    - **Authentication:** Integrated Google OAuth for secure, user-friendly login.
   
 3. ✔️ **Development Approach:**
 
    - **Authentication:** Implemented secure sign-in with Google accounts using NextAuth for fast and reliable access.
    - **File Management:** Developed features to create, delete, search, and organize documents.
    - **Live Collaboration:** Enabled real-time editing with conflict resolution and presence indicators.
    - **Permissions & Sharing:** Allowed users to share documents via link or email with customized access levels.
    - **Comments & Notifications:** Added inline comments, threaded discussions, and activity notifications.
    - **Testing:** Conducted extensive testing for stability, performance, and usability across all devices.

4. ✔️ **UX/UI Refinement:**

   - Simplified navigation for intuitive file and collaboration management.
   - Prioritized responsive design for an optimized experience on desktops, tablets, and mobiles.


## <a name="result">🎯 Result</a>

👉 **Authentication**: User authentication using Google through Clerk, ensuring secure sign-in/out and session management.

👉 **Collaborative Text Editor**: Multiple users can edit the same document simultaneously with real-time updates.

👉 **Documents Management**
   - **Create Documents**: Users can create new documents, which are automatically saved and listed.
   - **Delete Documents**: Users can delete documents they own.
   - **Share Documents**: Users can share documents via email or link with view/edit permissions.
   - **List Documents**: Display all documents owned or shared with the user, with search and sorting functionalities.

👉 **Comments**: Users can add inline and general comments, with threading for discussions.

👉 **Seamless Collaboration on Text Editor**: Enabled live editing with real-time updates and active collaborator visibility.

👉 **Notifications**: Notify users of document shares, new comments, and collaborator activities.

👉 **Responsive**: The application is responsive across all devices.

👉 **Scalable Solution**: Delivered a modular and maintainable architecture, ready for future enhancements.


## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/kalerie/file-system-app.git
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
#Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

#Liveblocks
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=
LIVEBLOCKS_SECRET_KEY=
```

Replace the placeholder values with your actual Clerk & LiveBlocks credentials. You can obtain these credentials by signing up on the [Clerk](https://clerk.com/) and [Liveblocks](liveblocks.io/) website.

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

