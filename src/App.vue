<template>
  <div id="app">
    <!-- 登录页面 -->
    <router-view v-if="$route.path === '/login'" />
    
    <!-- 主应用布局 -->
    <el-container v-else>
      <el-aside width="200px" class="sidebar">
        <div class="sidebar-header">
          <h3>问卷调查系统</h3>
        </div>
        
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
        
        <div class="sidebar-footer">
          <el-button 
            type="danger" 
            size="small" 
            @click="handleLogout"
            class="logout-btn"
          >
            <el-icon><SwitchButton /></el-icon>
            退出登录
          </el-button>
        </div>
      </el-aside>
      
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, List, View, Delete, SwitchButton } from '@element-plus/icons-vue'

const router = useRouter()

// 退出登录
const handleLogout = async () => {
  try {
    await ElMessageBox.confirm(
      '确定要退出登录吗？',
      '退出确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    // 清除登录状态
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
    
    ElMessage.success('已退出登录')
    
    // 跳转到登录页
    router.push('/login')
  } catch (error) {
    // 用户取消退出
  }
}

</script>

<style scoped>
#app {
  height: 100vh;
}

.sidebar {
  background-color: #304156;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #3c4a5c;
}

.sidebar-header h3 {
  color: #fff;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.sidebar-menu {
  border-right: none;
  flex: 1;
}

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid #3c4a5c;
}

.logout-btn {
  width: 100%;
  justify-content: center;
}

.main-content {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: calc(100vh - 40px);
}
</style>
