// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Private, PrivateSet } from '@redwoodjs/router';
import { Set, Router, Route } from '@redwoodjs/router';

import ScaffoldLayout from 'src/layouts/ScaffoldLayout';

import { useAuth } from './auth';
import AdminPageWrapper from './components/AdminPageWrapper/AdminPageWrapper';

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <PrivateSet unauthenticated="home" wrap={ScaffoldLayout}>
        <Route path="/inventory/rooms/{roomId:Int}/storage_units/{storageUnitId:Int}/drawers/{drawerId:Int}/items/{itemId:Int}" page={InventoryPage} name="inventoryItem" />
        <Route path="/inventory/rooms/{roomId:Int}/storage_units/{storageUnitId:Int}/drawers/{drawerId:Int}/items/new" page={InventoryPage} name="inventoryNewItem" />
        <Route path="/inventory/rooms/{roomId:Int}/storage_units/{storageUnitId:Int}/drawers/{drawerId:Int}" page={InventoryPage} name="inventoryDrawer" />
        <Route path="/inventory/rooms/{roomId:Int}/storage_units/{storageUnitId:Int}" page={InventoryPage} name="inventoryStorageUnit" />
        <Route path="/inventory/rooms/{roomId:Int}" page={InventoryPage} name="inventoryRoom" />
        <Route path="/inventory" page={InventoryPage} name="inventory" />

        <Route path="/storage-units/{id:Int}/edit" page={StorageUnitEditStorageUnitPage} name="editStorageUnit" />
        <Route path="/rooms/{id:Int}/edit" page={RoomEditRoomPage} name="editRoom" />
        <Route path="/drawers/{id:Int}/edit" page={DrawerEditDrawerPage} name="editDrawer" />
        <Route path="/items/{id:Int}/edit" page={ItemEditItemPage} name="editItem" />

        <Route path="/dashboard" page={DashboardPage} name="dashboard" />

        <Route path="/notes" page={NoteNotesPage} name="notes" />
        <Route path="/notes/{id:Int}" page={NoteNotePage} name="note" />
        <Route path="/notes/{id:Int}/edit" page={NoteEditNotePage} name="editNote" />

        <Route path="/journals/{id:Int}" page={JournalJournalPage} name="journal" />
        <Route path="/journals/new" page={JournalNewJournalPage} name="newJournal" />
        <Route path="/journals/{id:Int}/edit" page={JournalEditJournalPage} name="editJournal" />
        <Route path="/journals" page={JournalJournalsPage} name="journals" />

        <Route path="/scratch-pad" page={ScratchPadPage} name="scratchPad" />

        <Route path="/groceries/new" page={GroceryNewGroceryPage} name="newGrocery" />
        <Route path="/groceries/{id:Int}/edit" page={GroceryEditGroceryPage} name="editGrocery" />
        <Route path="/groceries/{id:Int}" page={GroceryGroceryPage} name="grocery" />
        <Route path="/groceries" page={GroceryGroceriesPage} name="groceries" />

        <Route path="/shopping-lists/new" page={ShoppingListNewShoppingListPage} name="newShoppingList" />
        <Route path="/shopping-lists/{id:Int}/edit" page={ShoppingListEditShoppingListPage} name="editShoppingList" />
        <Route path="/shopping-lists/{id:Int}" page={ShoppingListShoppingListPage} name="shoppingList" />
        <Route path="/shopping-lists" page={ShoppingListShoppingListsPage} name="shoppingLists" />

        <Set wrap={AdminPageWrapper}>
          <Route path="/item-types/new" page={ItemTypeNewItemTypePage} name="newItemType" />
          <Route path="/item-types/{id:Int}/edit" page={ItemTypeEditItemTypePage} name="editItemType" />
          <Route path="/item-types/{id:Int}" page={ItemTypeItemTypePage} name="itemType" />
          <Route path="/item-types" page={ItemTypeItemTypesPage} name="itemTypes" />

          <Route path="/colors/new" page={ColorNewColorPage} name="newColor" />
          <Route path="/colors/{id:Int}/edit" page={ColorEditColorPage} name="editColor" />
          <Route path="/colors/{id:Int}" page={ColorColorPage} name="color" />
          <Route path="/colors" page={ColorColorsPage} name="colors" />

          <Route path="/calendars/new" page={CalendarNewCalendarPage} name="newCalendar" />
          <Route path="/calendars/{id:Int}/edit" page={CalendarEditCalendarPage} name="editCalendar" />
          <Route path="/calendars/{id:Int}" page={CalendarCalendarPage} name="calendar" />
          <Route path="/calendars" page={CalendarCalendarsPage} name="calendars" />

          <Route path="/streaks/new" page={StreakNewStreakPage} name="newStreak" />
          <Route path="/streaks/{id:Int}/edit" page={StreakEditStreakPage} name="editStreak" />
          <Route path="/streaks/{id:Int}" page={StreakStreakPage} name="streak" />
          <Route path="/streaks" page={StreakStreaksPage} name="streaks" />

          <Route path="/people/new" page={PersonNewPersonPage} name="newPerson" />
          <Route path="/people/{id:Int}/edit" page={PersonEditPersonPage} name="editPerson" />
          <Route path="/people/{id:Int}" page={PersonPersonPage} name="person" />
          <Route path="/people" page={PersonPeoplePage} name="people" />

          <Route path="/person/{personId:Int}/call-logs/new" page={CallLogNewCallLogPage} name="newCallLog" />
          <Route path="/person/{personId:Int}/call-logs/{id:Int}/edit" page={CallLogEditCallLogPage} name="editCallLog" />
          <Route path="/person/{personId:Int}/call-logs/{id:Int}" page={CallLogCallLogPage} name="callLog" />
          <Route path="/person/{personId:Int}/call-logs" page={CallLogCallLogsPage} name="callLogs" />
        </Set>
      </PrivateSet>
      <Route path="/daily-buddy-login" page={LoginPage} name="login" />
      <Route path="/daily-buddy-signup" page={SignupPage} name="signup" />
      <Route path="/daily-buddy-forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/daily-buddy-reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  );
};

export default Routes;
