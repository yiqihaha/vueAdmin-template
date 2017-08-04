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
                style="width: 40%"
        >
        </el-tree>

        <div class="buttons">
            <el-button @click="saveCheckedKeys">保存权限设置</el-button>
            <!--<el-button @click="setCheckedKeys">设置</el-button>-->
            <!--<el-button @click="resetChecked">清空</el-button>-->
        </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {saveMenuForRole} from '@/api/login'

  export default {
    methods: {
      saveCheckedKeys() {
        const req = {
          roleId : 2,
          authList: this.$refs.tree.getCheckedKeys()
        }
        console.log(this.$refs.tree.getCheckedKeys())
        saveMenuForRole(req)
      },
      setCheckedKeys() {
        let authMenuToTree = [];
        authMenuToTree =this.auths.split(',').filter(id => parseInt(id) > 99).map(id => parseInt(id));
        this.$refs.tree.setCheckedKeys(authMenuToTree);
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
    mounted() {
     this.setCheckedKeys();
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
