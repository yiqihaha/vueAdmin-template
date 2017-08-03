<template>
    <div class="app-container">
        <el-tree
                :data="data"
                :span="4"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps"
        >
        </el-tree>

        <div class="buttons">
            <el-button @click="getCheckedNodes">通过 node 获取</el-button>
            <el-button @click="setCheckedNodes">通过 node 设置</el-button>
            <el-button @click="resetChecked">清空</el-button>
        </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    methods: {
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 9,
          label: '三级 1-1-1'
        }]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      }
    },
    computed: {
      ...mapGetters({
        menu: 'menu'
      })
    },
    mounted() {
      console.log(JSON.stringify(this.menu));
      this.data = this.menu;
    },
    data() {
      return {
        data: undefined,
        defaultProps: {
          children: 'children',
          label: 'label',
          menuId: 'menuId'
        }
      };
    }
  };
</script>
