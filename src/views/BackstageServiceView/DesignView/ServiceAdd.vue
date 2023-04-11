

<template>
  <t-layout class="layoutArea">
    <t-aside class="leftAside">
      <t-divider align="left" theme="vertical">本地控件区域</t-divider>
      <!-- <div class="msg">{{ state.message }}</div> -->
      <div class="itxst">
        <div class="group">
          <draggable
            :list="state.modules.moddelDatas"
            ghost-class="ghost"
            handle=".move"
            filter=".forbid"
            :force-fallback="true"
            chosen-class="chosenClass"
            animation="300"
            @start="onStart"
            @end="onEnd"
            :group="state.groupA"
            :fallback-class="true"
            :fallback-on-body="true"
            :touch-start-threshold="50"
            :fallback-tolerance="50"
            :move="onMove"
            :sort="false"
          >
            <template #item="{ element }">
              <div class="item move">
                <label class="move"><t-icon :name="element.icon" /></label>
                <span v-html="element.name"></span>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </t-aside>
    <t-layout class="contentArea">
      <t-divider align="left" theme="vertical">UI 设计区域</t-divider>
      <t-content>
        <div class="group">
          <t-input
            v-moodel="input"
            placeholder="请输入内容（有默认值）"
            @enter="onEnter"
            @change="onChange"
          />

          <t-button>确定</t-button>
          <!-- <draggable
            :list="state.modules.dragDatas"
            ghost-class="ghost"
            chosen-class="chosenClass"
            animation="300"
            :group="itxst"
            :move="onMove"
            :sort="false"
            :start="dragItem"
            :add="addItem"
            :forceFallback="true"
          >
            <template #item="{ element }">
              <div class="item move">
                <label class="move">{{ element.name }}</label>
                <span>内容....</span>
                <t-input
                  v-moodel="input"
                  placeholder="请输入内容（有默认值）"
                  @enter="onEnter"
                  @change="onChange"
                />
              </div>
            </template>
          </draggable> -->
        </div>
      </t-content>
    </t-layout>

    <t-aside class="rightAside">
      <t-divider align="left" theme="vertical">属性编辑区</t-divider>
      <t-form labelAlign="top" requiredMark colon submitWithWarningMessage>
        <t-form-item label="名称" name="name" initial-data="TDesign">
          <t-input placeholder="请输入内容" />
        </t-form-item>
        <t-form-item label="提示内容" name="tel" initial-data="123456">
          <t-input placeholder="请输入内容" />
        </t-form-item>
        <t-form-item label="默认值与否" name="course" initial-data="['1']">
          <t-checkbox-group>
            <t-checkbox value="1">是</t-checkbox>
            <t-checkbox value="2">否</t-checkbox>
          </t-checkbox-group>
        </t-form-item>
      </t-form>
    </t-aside>
  </t-layout>
</template>
  
  
  
<script setup lang="tsx">
import { ref, reactive } from "vue";
//导入draggable组件
import draggable from "vuedraggable";
enum TYPE_MODEL {
  'TEXT' =  1,
  'INPUT' =  2,
  'BUTTON' =  3,
  'AVATOR' =  4,
}
interface DrageItem {
  name: string,
  type: number,
  icon: string,
  id?: number
}

const state = reactive({
  message: "A组只能往B组拖到一个元素",
  groupA: {
    name: "itxst",
    put: true, //允许拖入
    pull: () => {
      let res = state.modules.moddelDatas.length > 3;
      //当A组元素小于等于3个时，不允许再拖出元素了
      state.message = res ? "只能拖出1个" : "不能再拖了";
      return res;
    },
  },
  groupB: {
    name: "itxst",
    put: false, // 不允许拖入
    pull: false,
  },
  modules: {
    moddelDatas: [
      { name: "文本", type: TYPE_MODEL.TEXT, icon: "call" },
      { name: "输入框", type: TYPE_MODEL.INPUT, icon: "chat" },
      { name: "按钮", type: TYPE_MODEL.BUTTON, icon: "filter" },
      { name: "头像", type: TYPE_MODEL.AVATOR, icon: "file-excel" },
    ],
    dragDatas: [
      { name: "文本", type: TYPE_MODEL.TEXT, icon: "call", id: 123 }
    ],
  },
});

//拖拽开始的事件
const onStart = () => {
  console.log("开始拖拽");
};

//拖拽结束的事件
const onEnd = (e) => {
  console.log("结束拖拽", e);
  const { newDraggableIndex } = e;

  // if(state.modules.moddelDatas[newDraggableIndex]){
    createModelNode(state.modules.moddelDatas[newDraggableIndex])
  // }

};

const onMove = (e, originalEvent) => {
  //不允许停靠
  if (e.relatedContext.element.disabledPark == true) return false;

  return true;
};

const dragItem = (e) => {
  console.log("右边获取start", e);
};

const addItem = (e) => {
  console.log("右边添加组件", e);
};
const input = ref('有默认值');
const onEnter = () => {
  console.log('trigger enter');
};
const onChange = (val) => {
  console.log(val);
};
// 生成唯一id
const createId = () => {
  const value = Math.random().toString(16).slice(2);  
	return Number(value);
}
// 创建模型
const createModelNode = (data: DrageItem) => {
  console.log("创建模型", data);
  const id = createId()
  const { type } = data;
  switch (type) {
    case TYPE_MODEL.TEXT:
      break;
    case TYPE_MODEL.INPUT:
      state.modules.dragDatas.push({
        ...data,
        id
      })
      break;
    case TYPE_MODEL.BUTTON:
      break;
    case TYPE_MODEL.AVATOR:
      break;
    default:
      break;
  }
  console.log("state.modules.dragDatas", state.modules)
};
</script>
<style lang="scss">
.t-layout {
  height: 100%;
}
.layoutArea {
  display: flex;
  height: 100%;
  .leftAside,
  .rightAside {
    width: 300px;
    height: 100%;
    padding: 0 24px 24px 24px;
  }
  .contentArea {
    flex: 1;
    min-width: 0;
    height: 100%;
    margin: 0 20px;
    background-color: #fff;
    padding: 0 24px 24px 24px;
    .group {
      height: 100%;
      .uiDesignView {
        height: 100%;
      }
    }
  }
  .leftAside {
    .msg {
      padding: 10px 20px 0px 20px;
    }
    .itxst {
      background-color: #fff;
      display: flex;
      padding: 0 20px;
    }

    .group {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-content: center;
      width: 100%;
      .item {
        border: solid 1px #ddd;
        padding: 0px;
        text-align: left;
        background-color: #fff;
        margin-bottom: 10px;
        display: flex;
        height: 36px;
        user-select: none;
        cursor: pointer;
        &:hover {
          background-color: var(--td-brand-color-7);
          color: #fff !important;
        }
        label {
          padding: 6px 10px;
          color: #333;
        }
        span {
          padding: 6px 10px;
          color: #666;
        }
      }
    }

    .ghost {
      border: solid 1px rgb(19, 41, 239) !important;
    }
    .chosenClass {
      opacity: 1;
      border: solid 1px red;
    }
    .fallbackClass {
      background-color: aquamarine;
    }
  }
  .rightAside {
  }
}
</style>
  