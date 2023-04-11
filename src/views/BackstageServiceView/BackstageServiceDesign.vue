

<template>
    <t-layout>
      <t-header>
        <t-head-menu theme="dark" value="item1" height="120px">
          <template #logo>
            <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-dark.png" alt="logo" />
          </template>
          <t-menu-item value="item1"> 后台设计器 </t-menu-item>
          <t-menu-item value="item2"> 远程组件 </t-menu-item>
          <t-menu-item value="item3"> 界面模块 </t-menu-item>
          <t-menu-item value="item4" :disabled="true"> 限制模块 </t-menu-item>
          <template #operations>
            <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="search" /></a>
            <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="notification-filled" /></a>
            <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="home" /></a>
            <img class="avator" src="../../assets/img/avator.png" alt="">
          </template>
        </t-head-menu>
      </t-header>
      <t-content>

        <router-view/>

      </t-content>
      <t-footer> Copyright @ 2019-{{ new Date().getFullYear() }} Tencent. All Rights Reserved </t-footer>
    </t-layout>
  </template>
  
  
  
  <script setup lang="tsx">
  import { Epaas, IEpaas } from '@exe-app-design/sdk';
  import { ref, reactive, onMounted } from 'vue';
  //QueryResponse接口
//   interface PageInfo {
//     page: number;
//     pageSize: number;
//     totalPage: number;
//     totalRow: number;
//   }

//   const stripe = ref(true);
//   const bordered = ref(true);
//   const hover = ref(false);
//   const tableLayout = ref(false);
//   const size = ref('medium');
//   const showHeader = ref(true);
//   const tableData = ref([])
//   let pageInfo: PageInfo
//   const pagination = {
//     defaultCurrent: 1,
//     defaultPageSize: 10,
//     total: 0,
//   };
//   const columns = ref([
//     { colKey: 'user_name', title: '姓名', width: '100' },
//     {
//       colKey: 'id',
//       title: 'ID',
//     },
//     { colKey: 'change_version', title: '状态' },
//     { colKey: 'create_time', title: '创建时间', ellipsis: true },
//     { colKey: 'update_time', title: '更新时间' },
//   ]);
//   const handleRowClick = ((e: any)=>{
//     console.log('点击事件')
//   })
//   onMounted(()=>{ })
  

  </script>
  <style lang="scss">

  .t-layout__header{
    img.avator {
      --s: 50px; /* image size */
      --b: 2px; /* border thickness */
      --c: #C02942; /* border color */
      --f: 1; /* initial scale */
    
      --_g: 50% / calc(100% / var(--f)) 100% no-repeat content-box;
      --_o: calc((1 / var(--f) - 1) * var(--s) / 2 - var(--b));
  
      width: var(--s);
      aspect-ratio: 1;
      cursor: pointer;
      border-radius: 0 0 999px 999px;
      outline: var(--b) solid var(--c);
      outline-offset: var(--_o);
      background: 
          radial-gradient(
            circle closest-side,
            #ECD078 calc(99% - var(--b)),
            var(--c) calc(100% - var(--b)) 99%,
            #0000) var(--_g);
        mask:
          linear-gradient(#000 0 0) no-repeat
          50% calc(-1 * var(--_o)) / calc(100% / var(--f) - 2 * var(--b)) 50%,
          radial-gradient(
            circle closest-side,
            #000 99%,
            #0000) var(--_g);
        transform: scale(var(--f));
        transition: .5s;
    }
    img.avator:hover {
      --f: 1.35; /* hover scale */
    }
  }
  
  

  
  </style>