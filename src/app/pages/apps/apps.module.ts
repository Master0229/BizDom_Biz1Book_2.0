import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { AppsRouterModule } from './apps-routing.module'
import { FormsModule } from '@angular/forms'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { QuillModule } from 'ngx-quill'
import { SortablejsModule } from 'ngx-sortablejs'
import { NestableModule } from 'ngx-nestable'
import { WidgetsComponentsModule } from 'src/app/components/kit/widgets/widgets-components.module'

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
import { ReceiptComponent } from './receipt/receipt.component'
import { SettingComponent } from './setting/setting.component'
import { CustomerComponent } from './customer/customer.component'
import { ExpensesComponent } from './expenses/expenses.component'
import { UrbanpiperComponent } from './urbanpiper/urbanpiper.component'
import { UpdaterComponent } from './updater/updater.component'
import { AboutusComponent } from './aboutus/aboutus.component'
import { ReportComponent } from './report/report.component'
import { ElectronService } from 'ngx-electron'
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material'
import { FilterPipe } from '../../pipes/filter/filter.pipe'
import {
  ProductfilterPipe,
  ParentcategoryfilterPipe,
  OrderTypePipe,
  DiningTablePipe,
  PrepTimePipe,
  StampPipe,
} from '../../pipes/order/orderfilter.pipe'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { JwtInterceptor } from 'src/app/services/interceptors/jwt.interceptor'
import { AutocompleteLibModule } from 'angular-ng-autocomplete'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { LongPress } from 'src/app/directives/longpress/long-press.directive'
import { ClipboardModule } from '@angular/cdk/clipboard'
// import { SalesReportComponent } from '../advanced/sales-report/sales-report.component'
const COMPONENTS = [
  AppsMessagingComponent,
  AppsCalendarComponent,
  AppsProfileComponent,
  AppsGalleryComponent,
  AppsMailComponent,
  GithubExploreComponent,
  GithubDiscussComponent,
  JiraDashboardComponent,
  JiraAgileBoardComponent,
  TodoistListComponent,
  DigitaloceanDropletsComponent,
  DigitaloceanCreateComponent,
  GoogleAnalyticsComponent,
  HelpdeskDashboardComponent,
  WordpressPostComponent,
  WordpressPostsComponent,
  WordpressAddComponent,
  FilterPipe,
  ProductfilterPipe,
  ParentcategoryfilterPipe,
  PricebookComponent,
  OrderComponent,
  ReceiptComponent,
  SettingComponent,
  CustomerComponent,
  ExpensesComponent,
  UrbanpiperComponent,
  UpdaterComponent,
  AboutusComponent,
  ReportComponent,
  OrderTypePipe,
  DiningTablePipe,
  PrepTimePipe,
  StampPipe,
]

@NgModule({
  imports: [
    SharedModule,
    AppsRouterModule,
    FormsModule,
    PerfectScrollbarModule,
    WidgetsComponentsModule,
    QuillModule.forRoot(),
    SortablejsModule,
    NestableModule,
    NgxDaterangepickerMd.forRoot(),
    AutocompleteLibModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    ...COMPONENTS,
    LongPress,
    // SalesReportComponent
  ],
  providers: [
    ElectronService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
})
export class AppsModule {}
