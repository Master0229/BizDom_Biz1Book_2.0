import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// Apps
import { AppsMessagingComponent } from 'src/app/pages/apps/messaging/messaging.component'
import { AppsCalendarComponent } from 'src/app/pages/apps/calendar/calendar.component'
import { AppsProfileComponent } from 'src/app/pages/apps/profile/profile.component'
import { AppsGalleryComponent } from 'src/app/pages/apps/gallery/gallery.component'
import { AppsMailComponent } from 'src/app/pages/apps/mail/mail.component'
import { GithubExploreComponent } from 'src/app/pages/apps/github-explore/github-explore.component'
import { GithubDiscussComponent } from 'src/app/pages/apps/github-discuss/github-discuss.component'
import { JiraDashboardComponent } from 'src/app/pages/apps/jira-dashboard/jira-dashboard.component'
import { JiraAgileBoardComponent } from 'src/app/pages/apps/jira-agile-board/jira-agile-board.component'
import { TodoistListComponent } from 'src/app/pages/apps/todoist-list/todoist-list.component'
import { DigitaloceanDropletsComponent } from 'src/app/pages/apps/digitalocean-droplets/digitalocean-droplets.component'
import { DigitaloceanCreateComponent } from 'src/app/pages/apps/digitalocean-create/digitalocean-create.component'
import { GoogleAnalyticsComponent } from 'src/app/pages/apps/google-analytics/google-analytics.component'
import { HelpdeskDashboardComponent } from 'src/app/pages/apps/helpdesk-dashboard/helpdesk-dashboard.component'
import { WordpressPostComponent } from 'src/app/pages/apps/wordpress-post/wordpress-post.component'
import { WordpressPostsComponent } from 'src/app/pages/apps/wordpress-posts/wordpress-posts.component'
import { WordpressAddComponent } from 'src/app/pages/apps/wordpress-add/wordpress-add.component'
import { PricebookComponent } from './pricebook/pricebook.component'
import { OrderComponent } from './order/order.component'
import { ReceiptComponent } from './receipt/receipt.component';
import { SettingComponent } from './setting/setting.component';
import { CustomerComponent } from './customer/customer.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { UrbanpiperComponent } from "./urbanpiper/urbanpiper.component";
import { UpdaterComponent } from './updater/updater.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ReportComponent } from './report/report.component';
// import { SalesReportComponent } from '../advanced/sales-report/sales-report.component'

const routes: Routes = [
  {
    path: 'messaging',
    component: AppsMessagingComponent,
    data: { title: 'Messaging App' },
  },
  {
    path: 'calendar',
    component: AppsCalendarComponent,
    data: { title: 'Calendar App' },
  },
  {
    path: 'profile',
    component: AppsProfileComponent,
    data: { title: 'Profile App' },
  },
  {
    path: 'gallery',
    component: AppsGalleryComponent,
    data: { title: 'Gallery App' },
  },
  {
    path: 'mail',
    component: AppsMailComponent,
    data: { title: 'Mail App' },
  },
  {
    path: 'github-explore',
    component: GithubExploreComponent,
    data: { title: 'Github Explore' },
  },
  {
    path: 'github-discuss',
    component: GithubDiscussComponent,
    data: { title: 'Github Discuss' },
  },
  {
    path: 'jira-dashboard',
    component: JiraDashboardComponent,
    data: { title: 'Jira Dashboard' },
  },
  {
    path: 'jira-agile-board',
    component: JiraAgileBoardComponent,
    data: { title: 'Jira Agile Board' },
  },
  {
    path: 'todoist-list',
    component: TodoistListComponent,
    data: { title: 'Todoist List' },
  },
  {
    path: 'digitalocean-droplets',
    component: DigitaloceanDropletsComponent,
    data: { title: 'Digitalocean Droplets' },
  },
  {
    path: 'digitalocean-create',
    component: DigitaloceanCreateComponent,
    data: { title: 'Digitalocean Create' },
  },
  {
    path: 'google-analytics',
    component: GoogleAnalyticsComponent,
    data: { title: 'Google Analytics' },
  },
  {
    path: 'helpdesk-dashboard',
    component: HelpdeskDashboardComponent,
    data: { title: 'Helpdesk Dashboard' },
  },
  {
    path: 'wordpress-post',
    component: WordpressPostComponent,
    data: { title: 'Wordpress Post' },
  },
  {
    path: 'wordpress-posts',
    component: WordpressPostsComponent,
    data: { title: 'Wordpress Posts' },
  },
  {
    path: 'wordpress-add',
    component: WordpressAddComponent,
    data: { title: 'Wordpress Add' },
  },
  {
    path: 'order',
    component: OrderComponent,
    data: { title: 'Sell' },
  },
  {
    path: 'pricebook',
    component: PricebookComponent,
    data: { title: 'Price Book' },
  },

  {
    path: 'receipt',
    component: ReceiptComponent,
    data: { title: 'receipt' },
  },
  {
    path: 'setting',
    component: SettingComponent,
    data: { title: 'setting' },
  },
  {
    path: 'customer',
    component: CustomerComponent,
    data: { title: 'customer' },
  },
  {
    path: 'expenses',
    component: ExpensesComponent,
    data: { title: 'expenses' },
  },
  {
    path: 'urbanpiper',
    component: UrbanpiperComponent,
    data: { title: 'urbanpiper' },
  },

  {
    path: 'updater',
    component: UpdaterComponent,
    data: { title: 'updater' },
  },

  {
    path: 'aboutus',
    component: AboutusComponent,
    data: { title: 'aboutus' },
  },
  {
    path: 'report',
    component: ReportComponent,
    data: { title: 'report' },
  },
  // {
  //   path: 'sales-report',
  //   component: SalesReportComponent,
  //   data: { title: 'sales-report' },
  // }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AppsRouterModule { }
