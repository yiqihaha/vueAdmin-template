<template>
    <div class="app-container">
        <el-tree
                :data="data3"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps"
                style="width: 50%"
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
//                data2: [{
//                    id: 1,
//                    label: '一级 1',
//                    children: [{
//                        id: 4,
//                        label: '二级 1-1',
//                        children: [{
//                            id: 9,
//                            label: '三级 1-1-1'
//                        }, {
//                            id: 10,
//                            label: '三级 1-1-2'
//                        }]
//                    }]
//                }, {
//                    id: 2,
//                    label: '一级 2',
//                    children: [{
//                        id: 5,
//                        label: '二级 2-1'
//                    }, {
//                        id: 6,
//                        label: '二级 2-2'
//                    }]
//                }, {
//                    id: 3,
//                    label: '一级 3',
//                    children: [{
//                        id: 7,
//                        label: '二级 3-1'
//                    }, {
//                        id: 8,
//                        label: '二级 3-2'
//                    }]
//                }],
                data3: [
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
                        // noDropdown: true,
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
