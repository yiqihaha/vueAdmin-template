<template>
    <div class="app-container">
        <el-tree
                :data="menu"
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
            <el-button @click="getCheckedKeys">通过 key 获取</el-button>
            <el-button @click="setCheckedKeys">通过 key 设置</el-button>
            <el-button @click="resetChecked">清空</el-button>
        </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    methods: {
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedKeys() {
        console.log(this.auths.split(','));
        this.$refs.tree.setCheckedKeys(this.auths.split(','));
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      }
    },
    computed: {
      ...mapGetters({
        menu: 'menu',
        auths: 'auths'
      })
    },
    data() {
      return {
        treeAuths: [],
        defaultProps: {
          children: 'children',
          label: 'label',
          parentId: 'parentId'
        }
      };
    }
  };
</script>
