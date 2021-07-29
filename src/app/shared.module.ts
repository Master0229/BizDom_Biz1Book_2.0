import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

// basic acl
import { ACLComponent } from 'src/app/components/cleanui/system/ACL/acl.component'

// antd components module
import { AntdModule } from 'src/app/antd.module'

const MODULES = [CommonModule, RouterModule, AntdModule, TranslateModule]

@NgModule({
  imports: [...MODULES],
  declarations: [ACLComponent],
  exports: [...MODULES],
})
export class SharedModule {}
