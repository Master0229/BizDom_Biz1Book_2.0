import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/shared.module'

import { KitAntdButtonExampleComponent } from './button/button.component'
import { KitAntdIconExampleComponent } from './icon/icon.component'
import { KitAntdGridExampleComponent } from './grid/grid.component'
import { KitAntdLayoutExampleComponent } from './layout/layout.component'
import { KitAntdAvatarExampleComponent } from './avatar/avatar.component'
import { KitAntdBadgeExampleComponent } from './badge/badge.component'
import { KitAntdCommentExampleComponent } from './comment/comment.component'
import { KitAntdCollapseExampleComponent } from './collapse/collapse.component'
import { KitAntdCarouselExampleComponent } from './carousel/carousel.component'
import { KitAntdCardExampleComponent } from './card/card.component'
import { KitAntdCalendarExampleComponent } from './calendar/calendar.component'
import { KitAntdListExampleComponent } from './list/list.component'
import { KitAntdPopoverExampleComponent } from './popover/popover.component'
import { KitAntdTreeExampleComponent } from './tree/tree.component'
import { KitAntdTooltipExampleComponent } from './tooltip/tooltip.component'
import { KitAntdTimelineExampleComponent } from './timeline/timeline.component'
import { KitAntdTagExampleComponent } from './tag/tag.component'
import { KitAntdTabsExampleComponent } from './tabs/tabs.component'
import { KitAntdTableExampleComponent } from './table/table.component'
import { KitAntdAutoCompleteExampleComponent } from './autocomplete/autocomplete.component'
import { KitAntdCheckboxExampleComponent } from './checkbox/checkbox.component'
import { KitAntdCascaderExampleComponent } from './cascader/cascader.component'
import { KitAntdDatePickerExampleComponent } from './datepicker/datepicker.component'
import { KitAntdFormExampleComponent } from './form/form.component'
import { KitAntdInputNumberExampleComponent } from './inputnumber/inputnumber.component'
import { KitAntdInputExampleComponent } from './input/input.component'
import { KitAntdMentionExampleComponent } from './mention/mention.component'
import { KitAntdRateExampleComponent } from './rate/rate.component'
import { KitAntdRadioExampleComponent } from './radio/radio.component'
import { KitAntdSwitchExampleComponent } from './switch/switch.component'
import { KitAntdSliderExampleComponent } from './slider/slider.component'
import { KitAntdSelectExampleComponent } from './select/select.component'
import { KitAntdTreeSelectExampleComponent } from './treeselect/treeselect.component'
import { KitAntdTransferExampleComponent } from './transfer/transfer.component'
import { KitAntdTimePickerExampleComponent } from './timepicker/timepicker.component'
import { KitAntdUploadExampleComponent } from './upload/upload.component'
import { KitAntdAlertExampleComponent } from './alert/alert.component'
import { KitAntdDrawerExampleComponent } from './drawer/drawer.component'
import { KitAntdModalExampleComponent } from './modal/modal.component'
import { KitAntdMessageExampleComponent } from './message/message.component'
import { KitAntdNotificationExampleComponent } from './notification/notification.component'
import { KitAntdProgressExampleComponent } from './progress/progress.component'
import { KitAntdPopconfirmExampleComponent } from './popconfirm/popconfirm.component'
import { KitAntdSpinExampleComponent } from './spin/spin.component'
import { KitAntdSkeletonExampleComponent } from './skeleton/skeleton.component'
import { KitAntdAffixExampleComponent } from './affix/affix.component'
import { KitAntdBreadcrumbExampleComponent } from './breadcrumb/breadcrumb.component'
import { KitAntdDropdownExampleComponent } from './dropdown/dropdown.component'
import { KitAntdMenuExampleComponent } from './menu/menu.component'
import { KitAntdPaginationExampleComponent } from './pagination/pagination.component'
import { KitAntdStepsExampleComponent } from './steps/steps.component'
import { KitAntdAnchorExampleComponent } from './anchor/anchor.component'
import { KitAntdBackTopExampleComponent } from './backtop/backtop.component'
import { KitAntdDividerExampleComponent } from './divider/divider.component'

const COMPONENTS = [
  KitAntdButtonExampleComponent,
  KitAntdIconExampleComponent,
  KitAntdGridExampleComponent,
  KitAntdLayoutExampleComponent,
  KitAntdAvatarExampleComponent,
  KitAntdBadgeExampleComponent,
  KitAntdCommentExampleComponent,
  KitAntdCollapseExampleComponent,
  KitAntdCarouselExampleComponent,
  KitAntdCardExampleComponent,
  KitAntdCalendarExampleComponent,
  KitAntdListExampleComponent,
  KitAntdPopoverExampleComponent,
  KitAntdTreeExampleComponent,
  KitAntdTooltipExampleComponent,
  KitAntdTimelineExampleComponent,
  KitAntdTagExampleComponent,
  KitAntdTabsExampleComponent,
  KitAntdTableExampleComponent,
  KitAntdAutoCompleteExampleComponent,
  KitAntdCheckboxExampleComponent,
  KitAntdCascaderExampleComponent,
  KitAntdDatePickerExampleComponent,
  KitAntdFormExampleComponent,
  KitAntdInputNumberExampleComponent,
  KitAntdInputExampleComponent,
  KitAntdMentionExampleComponent,
  KitAntdRateExampleComponent,
  KitAntdRadioExampleComponent,
  KitAntdSwitchExampleComponent,
  KitAntdSliderExampleComponent,
  KitAntdSelectExampleComponent,
  KitAntdTreeSelectExampleComponent,
  KitAntdTransferExampleComponent,
  KitAntdTimePickerExampleComponent,
  KitAntdUploadExampleComponent,
  KitAntdAlertExampleComponent,
  KitAntdDrawerExampleComponent,
  KitAntdModalExampleComponent,
  KitAntdMessageExampleComponent,
  KitAntdNotificationExampleComponent,
  KitAntdProgressExampleComponent,
  KitAntdPopconfirmExampleComponent,
  KitAntdSpinExampleComponent,
  KitAntdSkeletonExampleComponent,
  KitAntdAffixExampleComponent,
  KitAntdBreadcrumbExampleComponent,
  KitAntdDropdownExampleComponent,
  KitAntdMenuExampleComponent,
  KitAntdPaginationExampleComponent,
  KitAntdStepsExampleComponent,
  KitAntdAnchorExampleComponent,
  KitAntdBackTopExampleComponent,
  KitAntdDividerExampleComponent,
]

@NgModule({
  imports: [SharedModule, FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class AntdUIKitExamplesModule {}
