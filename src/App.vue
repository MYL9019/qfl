<template>
  <div id="app">
    <el-container>
      <el-aside width="200px" class="sidebar">
        <el-menu
          :default-active="$route.path"
          class="sidebar-menu"
          router
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
        >
          <el-menu-item index="/create">
            <el-icon><Plus /></el-icon>
            <span>创建问卷</span>
          </el-menu-item>
          <el-menu-item index="/list">
            <el-icon><List /></el-icon>
            <span>问卷列表</span>
          </el-menu-item>
          <el-menu-item index="/detail">
            <el-icon><View /></el-icon>
            <span>问卷详情</span>
          </el-menu-item>
          <el-menu-item index="/delete">
            <el-icon><Delete /></el-icon>
            <span>删除问卷</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { Plus, List, View, Delete } from '@element-plus/icons-vue'
</script>

<style scoped>
#app {
  height: 100vh;
}

.sidebar {
  background-color: #304156;
  height: 100vh;
}

.sidebar-menu {
  border-right: none;
  height: 100%;
}

.main-content {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: calc(100vh - 40px);
}
</style>
