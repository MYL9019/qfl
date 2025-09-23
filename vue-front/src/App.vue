<script setup>
</script>

<template>
  <div class="app-container">
    <nav class="nav-bar">
      <router-link 
        to="/survey-form"
        class="nav-btn"
        active-class="active"
      >
        填写问卷
      </router-link>
      <router-link 
        to="/survey-history"
        class="nav-btn"
        active-class="active"
      >
        历史记录
      </router-link>
      <router-link 
        to="/survey-management"
        class="nav-btn"
        active-class="active"
      >
        问卷管理
      </router-link>
    </nav>

    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #f0f2f5;
}

.app-container {
  min-height: 100vh;
}

.nav-bar {
  background: linear-gradient(135deg, #1a73e8, #289af0);
  padding: 20px;
  display: flex;
  justify-content: center;
  gap: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  margin-bottom: 30px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-btn {
  padding: 12px 25px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.nav-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.nav-btn:hover::before {
  transform: translateX(0);
}

.nav-btn.active {
  background: white;
  color: #1a73e8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(26, 115, 232, 0.2);
}

.main-content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
