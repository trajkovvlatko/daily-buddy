// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router';

import ScaffoldLayout from 'src/layouts/ScaffoldLayout';

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout}>
        <Route path="/dashboard" page={DashboardPage} name="dashboard" />

        <Route path="/calendars/new" page={CalendarNewCalendarPage} name="newCalendar" />
        <Route path="/calendars/{id:Int}/edit" page={CalendarEditCalendarPage} name="editCalendar" />
        <Route path="/calendars/{id:Int}" page={CalendarCalendarPage} name="calendar" />
        <Route path="/calendars" page={CalendarCalendarsPage} name="calendars" />

        <Route path="/tasks/new" page={TaskNewTaskPage} name="newTask" />
        <Route path="/tasks/{id:Int}/edit" page={TaskEditTaskPage} name="editTask" />
        <Route path="/tasks/{id:Int}" page={TaskTaskPage} name="task" />
        <Route path="/tasks" page={TaskTasksPage} name="tasks" />

        <Route path="/notes/new" page={NoteNewNotePage} name="newNote" />
        <Route path="/notes/{id:Int}/edit" page={NoteEditNotePage} name="editNote" />
        <Route path="/notes/{id:Int}" page={NoteNotePage} name="note" />
        <Route path="/notes" page={NoteNotesPage} name="notes" />
      </Set>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  );
};

export default Routes;
