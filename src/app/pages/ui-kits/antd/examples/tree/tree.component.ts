import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { NzFormatEmitEvent, NzTreeNodeOptions, NzTreeComponent } from 'ng-zorro-antd/tree'

@Component({
  selector: 'kit-antd-tree-example',
  templateUrl: './tree.component.html',
})
export class KitAntdTreeExampleComponent implements OnInit, AfterViewInit {
  @ViewChild('nzTreeComponent') nzTreeComponent: NzTreeComponent
  defaultCheckedKeys = ['10020']
  defaultSelectedKeys = ['10010']
  defaultExpandedKeys = ['100', '1001']

  nodes: NzTreeNodeOptions[] = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          disabled: true,
          children: [
            { title: 'leaf 1-0-0', key: '10010', disableCheckbox: true, isLeaf: true },
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true },
          ],
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [
            { title: 'leaf 1-1-0', key: '10020', isLeaf: true },
            { title: 'leaf 1-1-1', key: '10021', isLeaf: true },
          ],
        },
      ],
    },
  ]

  nodesDef = [
    {
      title: '0-0',
      key: '00',
      expanded: true,
      children: [
        {
          title: '0-0-0',
          key: '000',
          expanded: true,
          children: [
            { title: '0-0-0-0', key: '0000', isLeaf: true },
            { title: '0-0-0-1', key: '0001', isLeaf: true },
            { title: '0-0-0-2', key: '0002', isLeaf: true },
          ],
        },
        {
          title: '0-0-1',
          key: '001',
          children: [
            { title: '0-0-1-0', key: '0010', isLeaf: true },
            { title: '0-0-1-1', key: '0011', isLeaf: true },
            { title: '0-0-1-2', key: '0012', isLeaf: true },
          ],
        },
        {
          title: '0-0-2',
          key: '002',
        },
      ],
    },
    {
      title: '0-1',
      key: '01',
      children: [
        {
          title: '0-1-0',
          key: '010',
          children: [
            { title: '0-1-0-0', key: '0100', isLeaf: true },
            { title: '0-1-0-1', key: '0101', isLeaf: true },
            { title: '0-1-0-2', key: '0102', isLeaf: true },
          ],
        },
        {
          title: '0-1-1',
          key: '011',
          children: [
            { title: '0-1-1-0', key: '0110', isLeaf: true },
            { title: '0-1-1-1', key: '0111', isLeaf: true },
            { title: '0-1-1-2', key: '0112', isLeaf: true },
          ],
        },
      ],
    },
    {
      title: '0-2',
      key: '02',
      isLeaf: true,
    },
  ]

  nodesFiles = [
    {
      title: 'parent 1',
      key: '100',
      expanded: true,
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          expanded: true,
          children: [
            { title: 'leaf', key: '10010', isLeaf: true },
            { title: 'leaf', key: '10011', isLeaf: true },
            { title: 'leaf', key: '10012', isLeaf: true },
          ],
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf', key: '10020', isLeaf: true }],
        },
        {
          title: 'parent 1-2',
          key: '1003',
          children: [
            { title: 'leaf', key: '10030', isLeaf: true },
            { title: 'leaf', key: '10031', isLeaf: true },
          ],
        },
      ],
    },
  ]

  nzClick(event: NzFormatEmitEvent): void {
    console.log(event)
  }

  nzCheck(event: NzFormatEmitEvent): void {
    console.log(event)
  }

  // nzSelectedKeys change
  nzSelect(keys: string[]): void {
    console.log(keys, this.nzTreeComponent.getSelectedNodeList())
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // get node by key: '10011'
    console.log(this.nzTreeComponent.getTreeNodeByKey('10011'))
    // use tree methods
    console.log(
      this.nzTreeComponent.getTreeNodes(),
      this.nzTreeComponent.getCheckedNodeList(),
      this.nzTreeComponent.getSelectedNodeList(),
      this.nzTreeComponent.getExpandedNodeList(),
    )
  }
}
