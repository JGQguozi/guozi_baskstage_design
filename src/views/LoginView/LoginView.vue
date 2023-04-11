<template>
  <t-space direction="vertical">
    <!-- 按钮操作区域 -->
    <t-radio-group v-model="size" variant="default-filled">
      <t-radio-button value="small">小尺寸</t-radio-button>
      <t-radio-button value="medium">中尺寸</t-radio-button>
      <t-radio-button value="large">大尺寸</t-radio-button>
    </t-radio-group>

    <t-space>
      <t-checkbox v-model="stripe"> 显示斑马纹 </t-checkbox>
      <t-checkbox v-model="bordered"> 显示表格边框 </t-checkbox>
      <t-checkbox v-model="hover"> 显示悬浮效果 </t-checkbox>
      <t-checkbox v-model="tableLayout"> 宽度自适应 </t-checkbox>
      <t-checkbox v-model="showHeader"> 显示表头 </t-checkbox>
    </t-space>

    <!-- 当数据为空需要占位时，会显示 cellEmptyContent -->
    <t-table
      row-key="index"
      :data="tableData"
      :columns="columns"
      :stripe="stripe"
      :bordered="bordered"
      :hover="hover"
      :table-layout="tableLayout ? 'auto' : 'fixed'"
      :size="size"
      :pagination="pagination"
      :show-header="true"
      cell-empty-content="-"
      @row-click="handleRowClick"
    >
    </t-table>
  </t-space>
</template>
  
  <script setup lang="tsx">
  import { Epaas, IEpaas } from '@exe-app-design/sdk';
  import { ref, reactive, onMounted } from 'vue';
  //QueryResponse接口
  interface PageInfo {
    page: number;
    pageSize: number;
    totalPage: number;
    totalRow: number;
  }

  const stripe = ref(true);
  const bordered = ref(true);
  const hover = ref(false);
  const tableLayout = ref(false);
  const size = ref('medium');
  const showHeader = ref(true);
  const tableData = ref([])
  let pageInfo: PageInfo
  const pagination = {
    defaultCurrent: 1,
    defaultPageSize: 10,
    total: 0,
  };
  const columns = ref([
    { colKey: 'user_name', title: '姓名', width: '100' },
    {
      colKey: 'id',
      title: 'ID',
    },
    { colKey: 'change_version', title: '状态' },
    { colKey: 'create_time', title: '创建时间', ellipsis: true },
    { colKey: 'update_time', title: '更新时间' },
  ]);
  const handleRowClick = ((e: any)=>{
    console.log('点击事件')
  })
  onMounted(()=>{
    // 启动 Epaas 服务
    //基础用法
    //直接使用内部默认的四个服务
    const epaas: IEpaas = new Epaas('https://t-cloud-gateway.exexm.com');
    epaas.staticToken('JxDMl7z4W%2bWf15h5eXXUoZZAfzxAeZBOfnli51HLiOZu5TvToOVwYO7LivBXQp6D')//可直接使用epass对象存储token
    //创建model对象
    const model = epaas.model('63f01b5f44386b470b01bd25');
    model.require({function: {}, biz: {}}).then((result) => console.log("result==>", result));
    //创建数据对象
    const kcm = epaas.items('p_exe_user_center');
    //查询单笔数据
    // kcm.findOne('62c800d1e1c4472cfbd06733').then(data => console.log(data));
    //也可以使用下面方式查询
    kcm.findAndCount({ variables: { page: 1, pageSize: 10 } }).then((result) => {
      console.log(result)
      const { success, data: { totalRow, list, page, pageSize, totalPage } } = result
      if(success){
        tableData.value.push(...list)
        pageInfo = {
          totalRow, page, pageSize, totalPage
        }
        pagination.total = totalPage
        console.log("tableData", tableData, pageInfo )
      }

    });//QueryResponse
    // kcm.delete('aaaa')
  

  

  })
  

  </script>
  