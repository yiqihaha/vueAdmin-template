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
            <el-button @click="getCheckedNodes">通过 node 获取</el-button>
            <el-button @click="setCheckedNodes">通过 node 设置</el-button>
            <el-button @click="resetChecked">清空</el-button>
        </div>
    </div>
</template>

<script>
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

        data() {
            return {
                menu: [
                    {
                        id: 1,
                        label: 'Example',
                        path: '/example',
                        children: [
                            {
                                id: 100,
                                label: 'Form',
                                path: 'index'},
                            {
                                id: 101,
                                label: 'Tree',
                                path: 'tree' }
                        ]
                    },

                    {
                        id: 2,
                        label: 'Table',
                        path: '/table',
                        children: [
                            {   id: 200,
                                label: 'SimpleTable',
                                path: 'index'},
                            {
                                id: 201,
                                label: '综合table',
                                path: 'table', name: '综合table'}
                        ]
                    },
                    ],
                defaultProps: {
                    children: 'children',
                    label: 'label',
                    path: 'path'
                }
            };
        }
    };
</script>
