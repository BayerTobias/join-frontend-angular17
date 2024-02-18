import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { HomeComponent } from './home/components/home/home.component';
import { SummaryComponent } from './home/components/summary/summary.component';
import { BoardComponent } from './home/components/board/board.component';
import { AddTaskComponent } from './home/components/add-task/add-task.component';
import { ContactsComponent } from './home/components/contacts/contacts.component';
import { HelpComponent } from './home/components/help/help.component';
import { LegalNoticeComponent } from './legal/components/legal-notice/legal-notice.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', component: SummaryComponent },
      { path: 'board', component: BoardComponent },
      { path: 'add-task', component: AddTaskComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'help', component: HelpComponent },
      { path: 'legal-notice', component: LegalNoticeComponent },
    ],
  },
];
